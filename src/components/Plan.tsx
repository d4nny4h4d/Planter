import { AirVent, CalendarCheck, Droplets, Eye, FlaskConical, MapPin, RefreshCw, SlidersHorizontal, Sparkles, Sun, Wind } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AiError, writeCarePlan } from '../lib/ai'
import { BAND_LABEL, drivingHigh, heatBand, planStale, waterInterval } from '../lib/care'
import { useCareContext } from '../lib/hooks'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { HeatBand, Plant, Spot } from '../lib/types'
import { relativeDay, temp } from '../lib/util'
import { Callout, Chip, Segmented, Sheet } from './ui'

const BANDS: HeatBand[] = ['cool', 'mild', 'hot', 'extreme']
const VERDICT = { ideal: ['Good spot', 'good'], workable: ['Workable spot', 'warn'], 'move it': ['Move it', 'bad'] } as const

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="plan-row">
      <span className="plan-icon">{icon}</span>
      <div>
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  )
}

export function PlanCard({ plant }: { plant: Plant }) {
  const ctx = useCareContext()
  const place = useStore((s) => s.settings.place)
  const units = useStore((s) => s.settings.units)
  const hasKey = useStore((s) => !!s.settings.apiKey)
  const [spotOpen, setSpotOpen] = useState(false)
  const [spotRun, setSpotRun] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<AiError>()
  const abort = useRef<AbortController>(null)
  const autoTried = useRef(false)
  useEffect(() => () => abort.current?.abort(), [])

  const plan = plant.plan
  const stale = planStale(plant, ctx, place?.name)

  const generate = async () => {
    const current = useStore.getState().plants.find((p) => p.id === plant.id)
    if (!current) return
    abort.current?.abort()
    const ctl = (abort.current = new AbortController())
    setBusy(true)
    setError(undefined)
    try {
      const next = await writeCarePlan(current, ctl.signal)
      if (ctl.signal.aborted) return
      useStore.getState().updatePlant(plant.id, { plan: next })
    } catch (e) {
      if (ctl.signal.aborted) return
      setError(e instanceof AiError ? e : new AiError('Something went wrong. Please try again.'))
    } finally {
      if (!ctl.signal.aborted) setBusy(false)
    }
  }

  // Rewrite the plan by itself when the season, location or spot has moved on; once per visit so a failure cannot loop.
  useEffect(() => {
    if (!stale || !hasKey || busy || autoTried.current || !navigator.onLine) return
    autoTried.current = true
    void generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stale, hasKey])

  const openSpot = () => {
    setSpotRun((n) => n + 1)
    setSpotOpen(true)
  }

  const band = heatBand(ctx)
  const every = waterInterval(plant, ctx)
  const high = drivingHigh(ctx.weather)

  return (
    <section className="card plan">
      <header className="plan-head">
        <span className="section-icon">
          <Sparkles />
        </span>
        <div className="section-titles">
          <span className="section-title">Personal care plan</span>
          <span className="section-hint">
            {plan ? `Written ${relativeDay(plan.createdAt)}${plan.basis.place ? ` for ${plan.basis.place}` : ''}` : 'For this plant, in its spot, in your climate'}
          </span>
        </div>
        <button className="icon-btn" aria-label="Edit its spot" onClick={openSpot}>
          <SlidersHorizontal size={20} />
        </button>
      </header>

      <div className="plan-body">
        {!plan && !busy && (
          <>
            <p>
              Tell the app where this plant lives (window, distance, air conditioning, pot) and it writes a plan for exactly those conditions, with a watering schedule that follows the weather.
            </p>
            <button className="btn primary block" onClick={openSpot}>
              <MapPin /> Describe its spot
            </button>
          </>
        )}

        {busy && (
          <div className="busy-row plan-busy" role="status">
            <span className="spinner" />
            <div>
              <b>{plan ? 'Updating the plan…' : 'Writing the plan…'}</b>
              <p className="muted small">{stale && plan ? `Because ${stale}. ` : ''}Usually 20–40 seconds.</p>
            </div>
          </div>
        )}

        {error && (
          <p className="error">
            {error.message}{' '}
            {error.needsKey && (
              <button className="link" onClick={() => navigate('/settings')}>
                Open Settings
              </button>
            )}
          </p>
        )}

        {plan && (
          <>
            <Callout>{plan.headline}</Callout>

            <Row icon={<Droplets />} title="Watering">
              <div className="big-fact">{every === 1 ? 'Every day' : `Every ${every} days`}</div>
              <p className="muted small">
                {plant.waterEveryDays ? 'Your own setting.' : high != null ? `Right now, for highs around ${temp(high, units)}.` : 'Right now.'} The schedule moves with the forecast:
              </p>
              <div className="season-grid">
                {BANDS.map((b) => (
                  <div key={b} className={`season-cell ${b === band && !plant.waterEveryDays ? 'current' : ''}`}>
                    <span>{BAND_LABEL[b][0]}</span>
                    <span>{BAND_LABEL[b][1]}</span>
                    <b>{plan.watering.everyDays[b]}d</b>
                  </div>
                ))}
              </div>
              <dl className="plan-facts">
                <dt>How much</dt>
                <dd>{plan.watering.amount}</dd>
                <dt>How</dt>
                <dd>{plan.watering.method}</dd>
                <dt>When</dt>
                <dd>{plan.watering.bestTime}</dd>
              </dl>
              <p>{plan.watering.why}</p>
            </Row>

            <Row icon={<MapPin />} title="Placement">
              <Chip tone={VERDICT[plan.placement.verdict][1]}>{VERDICT[plan.placement.verdict][0]}</Chip>
              <p>{plan.placement.advice}</p>
            </Row>

            <Row icon={<Sun />} title="Light">
              <p>{plan.light}</p>
            </Row>

            <Row icon={<AirVent />} title={plant.where === 'indoor' ? 'Air conditioning' : 'Heat & weather'}>
              <p>{plan.climate}</p>
            </Row>

            <Row icon={<Wind />} title="Humidity">
              <p>{plan.humidity}</p>
            </Row>

            <Row icon={<FlaskConical />} title="Feeding">
              <Chip>{plan.feeding.everyWeeks > 0 ? `Every ${plan.feeding.everyWeeks} weeks` : 'Hold off for now'}</Chip>
              <p>{plan.feeding.advice}</p>
            </Row>

            <Row icon={<CalendarCheck />} title="This month">
              <ul className="bullets">
                {plan.thisMonth.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Row>

            <Row icon={<Eye />} title="Watch for">
              <ul className="bullets">
                {plan.watchFor.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Row>

            {stale && !busy && <Callout tone="warn">This plan may be out of date because {stale}.</Callout>}
            <button className="btn block" disabled={busy} onClick={() => void generate()}>
              <RefreshCw /> Update plan for current conditions
            </button>
          </>
        )}
      </div>

      <SpotSheet
        key={spotRun}
        plant={plant}
        open={spotOpen}
        onClose={() => setSpotOpen(false)}
        onSaved={() => {
          autoTried.current = true
          if (hasKey) void generate()
          else setError(new AiError('Spot saved. Add your Anthropic API key in Settings to get the personal plan.', true))
        }}
      />
    </section>
  )
}

function Pick({ label, value, options, onChange }: { label: string; value: string | undefined; options: string[]; onChange: (v: string | undefined) => void }) {
  return (
    <div>
      <span className="label">{label}</span>
      <div className="chips pick">
        {options.map((o) => (
          <button key={o} className={`chip ${o === value ? 'chip-on' : 'chip-plain'}`} aria-pressed={o === value} onClick={() => onChange(o === value ? undefined : o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function SpotSheet({ plant, open, onClose, onSaved }: { plant: Plant; open: boolean; onClose: () => void; onSaved: () => void }) {
  const [where, setWhere] = useState(plant.where)
  const [spot, setSpot] = useState<Spot>(plant.spot ?? {})
  const [potCm, setPotCm] = useState(plant.spot?.potCm ? String(plant.spot.potCm) : '')
  const [acTemp, setAcTemp] = useState(plant.spot?.acTempC ? String(plant.spot.acTempC) : '')
  const set = (patch: Partial<Spot>) => setSpot((s) => ({ ...s, ...patch }))
  const num = (v: string, min: number, max: number) => {
    const n = Number(v)
    return v.trim() && Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : undefined
  }

  const save = () => {
    const indoor = where === 'indoor'
    const clean: Spot = {
      pot: spot.pot,
      potCm: num(potCm, 3, 300),
      notes: spot.notes?.trim() || undefined,
      ...(indoor
        ? { windowFacing: spot.windowFacing, windowDistance: spot.windowDistance, ac: spot.ac, acTempC: num(acTemp, 14, 32), nearVent: spot.nearVent }
        : { exposure: spot.exposure, shelter: spot.shelter }),
    }
    useStore.getState().updatePlant(plant.id, { where, spot: clean })
    onClose()
    onSaved()
  }

  return (
    <Sheet open={open} onClose={onClose} title="Where it lives">
      <div className="form">
        <Segmented
          value={where}
          onChange={setWhere}
          options={[
            { value: 'outdoor', label: 'Outdoors' },
            { value: 'indoor', label: 'Indoors' },
          ]}
        />

        {where === 'indoor' ? (
          <>
            <Pick label="Nearest window faces" value={spot.windowFacing} onChange={(v) => set({ windowFacing: v })} options={['North', 'East', 'South', 'West', 'No window nearby']} />
            <Pick label="Distance from that window" value={spot.windowDistance} onChange={(v) => set({ windowDistance: v })} options={['On the sill', 'Within 1 m', '1–3 m', 'Over 3 m']} />
            <Pick label="Air conditioning in this room" value={spot.ac} onChange={(v) => set({ ac: v })} options={['On all day and night', 'Daytime only', 'Evenings and nights only', 'Rarely on']} />
            <div className="two">
              <label>
                <span>AC set to (°C)</span>
                <input inputMode="numeric" value={acTemp} onChange={(e) => setAcTemp(e.target.value)} placeholder="e.g. 23" />
              </label>
              <div>
                <span className="label">In the AC airflow?</span>
                <Segmented
                  value={spot.nearVent ? 'yes' : 'no'}
                  onChange={(v) => set({ nearVent: v === 'yes' })}
                  options={[
                    { value: 'no', label: 'No' },
                    { value: 'yes', label: 'Yes' },
                  ]}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Pick label="Sun it gets" value={spot.exposure} onChange={(v) => set({ exposure: v })} options={['Full sun all day', 'Morning sun, afternoon shade', 'Afternoon sun', 'Bright shade', 'Deep shade']} />
            <Pick label="Shelter" value={spot.shelter} onChange={(v) => set({ shelter: v })} options={['Open and windy', 'Sheltered balcony or wall', 'Under a roof or pergola']} />
          </>
        )}

        <Pick label="Container" value={spot.pot} onChange={(v) => set({ pot: v })} options={plant.bonsai ? ['Bonsai pot', 'Training pot', 'Plastic pot', 'In the ground'] : ['Plastic pot', 'Terracotta pot', 'Glazed ceramic pot', 'Self-watering pot', 'In the ground']} />
        <label>
          <span>Pot width (cm)</span>
          <input inputMode="numeric" value={potCm} onChange={(e) => setPotCm(e.target.value)} placeholder="e.g. 30" />
        </label>
        <label>
          <span>Anything else about the spot</span>
          <textarea rows={2} value={spot.notes ?? ''} onChange={(e) => set({ notes: e.target.value })} placeholder="e.g. behind a sheer curtain, on a tiled balcony that gets very hot" />
        </label>
        <button className="btn primary block" onClick={save}>
          Save and write my plan
        </button>
      </div>
    </Sheet>
  )
}
