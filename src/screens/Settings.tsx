import { Download, Eye, EyeOff, LocateFixed, Upload } from 'lucide-react'
import { get, set } from 'idb-keyval'
import { useRef, useState } from 'react'
import { SearchField } from '../components/collection'
import { Screen, Segmented, TopBar } from '../components/ui'
import { MODELS } from '../lib/ai'
import { useStore } from '../lib/store'
import type { Place } from '../lib/types'
import { fetchWeather, locate, searchPlaces } from '../lib/weather'
import { temp } from '../lib/util'

export function Settings() {
  const settings = useStore((s) => s.settings)
  const weather = useStore((s) => s.weather)
  const plants = useStore((s) => s.plants)
  const reports = useStore((s) => s.reports)
  const { setSettings, setWeather, showToast, replaceAll } = useStore.getState()
  const [showKey, setShowKey] = useState(false)
  const [q, setQ] = useState('')
  const [places, setPlaces] = useState<Place[]>()
  const [busy, setBusy] = useState<string>()
  const importer = useRef<HTMLInputElement>(null)
  const searchRun = useRef(0)

  const choose = async (place: Place) => {
    setSettings({ place })
    setWeather(undefined)
    setPlaces(undefined)
    setQ('')
    try {
      setWeather(await fetchWeather(place))
    } catch {
      showToast('Location saved, but the weather could not be loaded')
    }
  }

  const useDevice = async () => {
    setBusy('locate')
    try {
      await choose(await locate())
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Could not get your location')
    } finally {
      setBusy(undefined)
    }
  }

  const search = async (value: string) => {
    setQ(value)
    const id = ++searchRun.current
    if (value.trim().length < 2) return setPlaces(undefined)
    try {
      const found = await searchPlaces(value.trim())
      if (id === searchRun.current) setPlaces(found)
    } catch {
      if (id === searchRun.current) setPlaces([])
    }
  }

  const exportData = async () => {
    setBusy('export')
    try {
      const photos: Record<string, string> = {}
      const ids = [...plants.flatMap((p) => p.photos.map((ph) => ph.id)), ...reports.flatMap((r) => r.photoIds)]
      for (const id of ids) {
        const data = await get<string>(`photo:${id}`)
        if (data) photos[id] = data
      }
      // The API key is deliberately left out of backups.
      const blob = new Blob([JSON.stringify({ app: 'planter', version: 1, plants, reports, settings: { ...settings, apiKey: '' }, photos })], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `treecko-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 5000)
    } finally {
      setBusy(undefined)
    }
  }

  const importData = async (file: File | undefined) => {
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      if (data.app !== 'planter' || !Array.isArray(data.plants)) throw new Error('bad file')
      if (plants.length > 0 && !window.confirm(`Replace your ${plants.length} current plants with the ${data.plants.length} in this backup?`)) return
      for (const [id, url] of Object.entries(data.photos ?? {})) await set(`photo:${id}`, url)
      replaceAll({ plants: data.plants, reports: Array.isArray(data.reports) ? data.reports : [], settings: { ...data.settings, apiKey: settings.apiKey }, weather })
      showToast(`Restored ${data.plants.length} plants`)
    } catch {
      showToast('That file is not a Treecko backup')
    }
  }

  return (
    <Screen id="/settings">
      <TopBar title="Settings" />

      <section className="group">
        <h2 className="group-title">Photo recognition</h2>
        <div className="card pad form">
          <label>
            <span>Anthropic API key</span>
            <div className="input-row">
              <input
                type={showKey ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => setSettings({ apiKey: e.target.value.trim() })}
                placeholder="sk-ant-…"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              <button className="icon-btn" aria-label={showKey ? 'Hide key' : 'Show key'} onClick={() => setShowKey(!showKey)}>
                {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          <p className="muted small">
            Identification, name look-ups, personal care plans, Dr. Green and styling advice use Claude. Create a key at platform.claude.com. It is stored only on this device and sent only to Anthropic. Everything else works without one.
          </p>
          <div>
            <span className="label">Model</span>
            <div className="radio-list">
              {MODELS.map((m) => (
                <label key={m.id} className={settings.model === m.id ? 'on' : ''}>
                  <input type="radio" name="model" checked={settings.model === m.id} onChange={() => setSettings({ model: m.id })} />
                  <span>
                    <b>{m.name}</b>
                    <span className="muted small">{m.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="group">
        <h2 className="group-title">Location & climate</h2>
        <div className="card pad form">
          <p>
            {settings.place ? (
              <>
                <b>{settings.place.name}</b>
                {weather && <span className="muted"> · {temp(weather.tempC, settings.units)}, high {temp(weather.maxC, settings.units)}, {weather.humidity}% humidity</span>}
              </>
            ) : (
              <span className="muted">Not set. Watering schedules use the species’ defaults.</span>
            )}
          </p>
          <button className="btn" disabled={busy === 'locate'} onClick={useDevice}>
            {busy === 'locate' ? <span className="spinner" /> : <LocateFixed />} Use my current location
          </button>
          <SearchField value={q} onChange={(v) => void search(v)} placeholder="Or search for a city" />
          {places &&
            (places.length === 0 ? (
              <p className="muted small">No places found.</p>
            ) : (
              <div className="menu">
                {places.map((p) => (
                  <button key={`${p.lat},${p.lon}`} onClick={() => void choose(p)}>
                    {p.name}
                  </button>
                ))}
              </div>
            ))}
          <div>
            <span className="label">Temperature units</span>
            <Segmented
              value={settings.units}
              onChange={(units) => setSettings({ units })}
              options={[
                { value: 'C', label: 'Celsius' },
                { value: 'F', label: 'Fahrenheit' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="group">
        <h2 className="group-title">Backup</h2>
        <div className="card pad form">
          <p className="muted small">Your collection lives only on this device. Export a backup file now and then; it includes photos but not your API key.</p>
          <div className="two">
            <button className="btn" disabled={busy === 'export' || plants.length === 0} onClick={exportData}>
              <Download /> Export
            </button>
            <button className="btn" onClick={() => importer.current?.click()}>
              <Upload /> Restore
            </button>
          </div>
          <input
            ref={importer}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              void importData(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </div>
      </section>

      <p className="muted small center">Treecko · personal plant & bonsai care</p>
    </Screen>
  )
}
