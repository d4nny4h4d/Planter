import { Camera, Droplets, FlaskConical, HeartPulse, MoreHorizontal, Pencil, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { BonsaiSheet, CareSheet } from '../components/CareSheet'
import { TaskRow } from '../components/TaskRow'
import { Chip, Empty, Screen, Segmented, Sheet, TopBar, usePhoto } from '../components/ui'
import { BONSAI_STYLES } from '../data/bonsai'
import { ACTION_LABEL, ACTION_PAST, isWired, scientificName, speciesName, tasksFor, waterInterval } from '../lib/care'
import { useCareContext } from '../lib/hooks'
import { deletePhoto, fileToDataUrl, savePhoto } from '../lib/image'
import { back, navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { CareAction, Plant, PlantPhoto } from '../lib/types'
import { everyLabel, formatDate, relativeDay } from '../lib/util'

type Tab = 'care' | 'journal' | 'photos'

const toInputDate = (t: number) => {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function PlantDetail({ id }: { id: string }) {
  const plant = useStore((s) => s.plants.find((p) => p.id === id))
  const ctx = useCareContext()
  const [tab, setTab] = useState<Tab>('care')
  const [menu, setMenu] = useState(false)
  const [logging, setLogging] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editRun, setEditRun] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const picker = useRef<HTMLInputElement>(null)
  const cover = usePhoto(plant?.photos.at(-1)?.id)
  const tasks = useMemo(() => (plant ? tasksFor(plant, ctx) : []), [plant, ctx])

  if (!plant)
    return (
      <Screen id="plant-missing">
        <TopBar />
        <Empty emoji="🍂" title="Plant not found" />
      </Screen>
    )

  const { logCare, removeEvent, showToast, updatePlant, removePlant } = useStore.getState()

  const quick = (action: CareAction) => {
    const eventId = logCare(plant.id, action)
    navigator.vibrate?.(12)
    showToast(`${ACTION_PAST[action]} · ${plant.nickname}`, () => removeEvent(plant.id, eventId))
  }

  const addPhoto = async (file: File | undefined) => {
    if (!file) return
    try {
      const photoId = await savePhoto(await fileToDataUrl(file))
      const current = useStore.getState().plants.find((x) => x.id === plant.id)
      if (current) updatePlant(plant.id, { photos: [...current.photos, { id: photoId, at: Date.now() }] })
      showToast('Photo added')
    } catch {
      showToast('That photo could not be saved')
    }
  }

  const style = BONSAI_STYLES.find((s) => s.id === plant.style)
  const upcoming = tasks.filter((t) => t.inDays <= 30)

  return (
    <Screen id={`/plant/${id}`}>
      <div className={`detail-hero ${cover ? '' : 'no-photo'}`}>
        {cover ? <img src={cover} alt="" /> : <span className="detail-emoji">{plant.emoji}</span>}
        <div className="detail-hero-bar">
          <button className="icon-btn glass" aria-label="Back" onClick={() => back(plant.kind === 'bonsai' ? '/bonsai' : '/plants')}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className="icon-btn glass" aria-label="More" onClick={() => setMenu(true)}>
            <MoreHorizontal />
          </button>
        </div>
      </div>

      <div className="detail-body">
        <h1>{plant.nickname}</h1>
        <p className="sci">
          {speciesName(plant) !== plant.nickname && `${speciesName(plant)} · `}
          <i>{scientificName(plant)}</i>
        </p>
        <div className="chips">
          <Chip>{plant.where === 'indoor' ? 'Indoors' : 'Outdoors'}</Chip>
          <Chip>Water: {everyLabel(waterInterval(plant, ctx)).toLowerCase()}</Chip>
          {style && <Chip>{style.name}</Chip>}
          {plant.bonsai && isWired(plant) && <Chip tone="warn">Wired</Chip>}
          {plant.yearStarted && <Chip>Since {plant.yearStarted}</Chip>}
        </div>

        <div className="quick">
          <button onClick={() => quick('water')}>
            <Droplets />
            <span>Water</span>
          </button>
          <button onClick={() => quick('fertilize')}>
            <FlaskConical />
            <span>Feed</span>
          </button>
          <button onClick={() => picker.current?.click()}>
            <Camera />
            <span>Photo</span>
          </button>
          <button onClick={() => setLogging(true)}>
            <Plus />
            <span>Log</span>
          </button>
        </div>
        <input
          ref={picker}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            void addPhoto(e.target.files?.[0])
            e.target.value = ''
          }}
        />

        {upcoming.length > 0 && (
          <section className="group">
            <h2 className="group-title">Up next</h2>
            <div className="card list">
              {upcoming.map((t) => (
                <TaskRow key={t.key} task={t} plant={plant} showPlant={false} />
              ))}
            </div>
          </section>
        )}

        <div className="ai-row">
          <button className="btn" onClick={() => navigate(`/advice/${plant.id}?mode=health`)}>
            <HeartPulse /> Health check
          </button>
          {plant.bonsai && (
            <button className="btn" onClick={() => navigate(`/advice/${plant.id}?mode=styling`)}>
              <Sparkles /> Styling advice
            </button>
          )}
        </div>

        {plant.notes && (
          <div className="card pad">
            <h4>Notes</h4>
            <p className="pre">{plant.notes}</p>
          </div>
        )}

        <Segmented<Tab>
          value={tab}
          onChange={setTab}
          options={[
            { value: 'care', label: 'Care' },
            { value: 'journal', label: `Journal${plant.log.length ? ` (${plant.log.length})` : ''}` },
            { value: 'photos', label: `Photos${plant.photos.length ? ` (${plant.photos.length})` : ''}` },
          ]}
        />

        <div className="view" key={tab}>
          {tab === 'care' && plant.profile && <CareSheet profile={plant.profile} where={plant.where} />}
          {tab === 'care' && plant.bonsai && <BonsaiSheet profile={plant.bonsai} where={plant.where} />}

          {tab === 'journal' &&
            (plant.log.length === 0 ? (
              <Empty emoji="📓" title="Nothing logged yet">
                Watering, feeding, pruning, wiring and repotting show up here as you log them.
              </Empty>
            ) : (
              <div className="card list">
                {[...plant.log]
                  .sort((a, b) => b.at - a.at)
                  .map((e) => (
                    <div key={e.id} className="journal-row">
                      <span className="journal-text">
                        <b>{ACTION_PAST[e.action]}</b>
                        <span className="muted small">
                          {formatDate(e.at)} · {relativeDay(e.at)}
                        </span>
                        {e.note && <span className="pre">{e.note}</span>}
                      </span>
                      <button
                        className="icon-btn"
                        aria-label="Delete entry"
                        onClick={() => {
                          removeEvent(plant.id, e.id)
                          showToast('Entry deleted', () =>
                            updatePlant(plant.id, { log: [...(useStore.getState().plants.find((p) => p.id === plant.id)?.log ?? []), e] }),
                          )
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            ))}

          {tab === 'photos' &&
            (plant.photos.length === 0 ? (
              <Empty
                emoji="📷"
                title="No photos yet"
                action={
                  <button className="btn primary" onClick={() => picker.current?.click()}>
                    <Camera /> Add a photo
                  </button>
                }
              >
                Add one every few weeks to watch it grow.
              </Empty>
            ) : (
              <div className="photo-grid">
                {[...plant.photos].reverse().map((ph) => (
                  <PhotoTile
                    key={ph.id}
                    photo={ph}
                    onDelete={() => {
                      updatePlant(plant.id, { photos: plant.photos.filter((x) => x.id !== ph.id) })
                      void deletePhoto(ph.id)
                      showToast('Photo deleted')
                    }}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>

      <Sheet open={menu} onClose={() => setMenu(false)} title={plant.nickname}>
        <div className="menu">
          <button
            onClick={() => {
              setMenu(false)
              setEditRun((n) => n + 1)
              setEditing(true)
            }}
          >
            <Pencil size={18} /> Edit details & schedule
          </button>
          <button
            className="danger"
            onClick={() => {
              setMenu(false)
              setConfirmDelete(true)
            }}
          >
            <Trash2 size={18} /> Delete {plant.kind === 'bonsai' ? 'tree' : 'plant'}
          </button>
        </div>
      </Sheet>

      <Sheet open={confirmDelete} onClose={() => setConfirmDelete(false)} title={`Delete ${plant.nickname}?`}>
        <p className="muted">Its journal and photos are deleted too. This cannot be undone.</p>
        <div className="stack">
          <button
            className="btn danger block"
            onClick={() => {
              // Let the sheet give up its history entry first, then leave the page, then delete.
              setConfirmDelete(false)
              setTimeout(() => back(plant.kind === 'bonsai' ? '/bonsai' : '/plants'), 80)
              setTimeout(() => {
                removePlant(plant.id)
                showToast(`${plant.nickname} deleted`)
              }, 380)
            }}
          >
            Delete
          </button>
          <button className="btn block" onClick={() => setConfirmDelete(false)}>
            Keep
          </button>
        </div>
      </Sheet>

      <LogSheet plant={plant} open={logging} onClose={() => setLogging(false)} />
      <EditSheet key={editRun} plant={plant} open={editing} onClose={() => setEditing(false)} />
    </Screen>
  )
}

function PhotoTile({ photo, onDelete }: { photo: PlantPhoto; onDelete: () => void }) {
  const src = usePhoto(photo.id)
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="photo-tile" onClick={() => setOpen(true)}>
        {src && <img src={src} alt="" loading="lazy" />}
        <span>{formatDate(photo.at)}</span>
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title={formatDate(photo.at)}>
        {src && <img className="photo-full" src={src} alt="" />}
        <button
          className="btn danger block"
          onClick={() => {
            setOpen(false)
            onDelete()
          }}
        >
          <Trash2 /> Delete photo
        </button>
      </Sheet>
    </>
  )
}

function LogSheet({ plant, open, onClose }: { plant: Plant; open: boolean; onClose: () => void }) {
  const actions: CareAction[] = plant.bonsai
    ? ['water', 'fertilize', 'prune', 'wire', 'unwire', 'repot', 'mist', 'note']
    : ['water', 'fertilize', 'prune', 'repot', 'mist', 'rotate', 'note']
  const [action, setAction] = useState<CareAction>('prune')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(() => toInputDate(Date.now()))
  const today = toInputDate(Date.now())

  const save = () => {
    const { logCare, showToast } = useStore.getState()
    const at = date === today ? Date.now() : new Date(`${date}T12:00:00`).getTime()
    logCare(plant.id, action, note.trim() || undefined, at)
    showToast(`${ACTION_PAST[action]} logged`)
    setNote('')
    setDate(today)
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title="Log care">
      <div className="form">
        <div className="chips pick">
          {actions.map((a) => (
            <button key={a} className={`chip ${a === action ? 'chip-on' : 'chip-plain'}`} aria-pressed={a === action} onClick={() => setAction(a)}>
              {ACTION_LABEL[a]}
            </button>
          ))}
        </div>
        <label>
          <span>When</span>
          <input type="date" value={date} max={today} onChange={(e) => setDate(e.target.value || today)} />
        </label>
        <label>
          <span>Note {action === 'note' ? '' : '(optional)'}</span>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={action === 'wire' ? 'e.g. 2 mm aluminium on the first two branches' : 'Anything worth remembering'} />
        </label>
        <button className="btn primary block" disabled={action === 'note' && !note.trim()} onClick={save}>
          Save
        </button>
      </div>
    </Sheet>
  )
}

function EditSheet({ plant, open, onClose }: { plant: Plant; open: boolean; onClose: () => void }) {
  const ctx = useCareContext()
  const [nickname, setNickname] = useState(plant.nickname)
  const [where, setWhere] = useState(plant.where)
  const [water, setWater] = useState(plant.waterEveryDays ? String(plant.waterEveryDays) : '')
  const [feed, setFeed] = useState(plant.feedEveryDays ? String(plant.feedEveryDays) : '')
  const [style, setStyle] = useState(plant.style ?? '')
  const [year, setYear] = useState(plant.yearStarted ? String(plant.yearStarted) : '')
  const [notes, setNotes] = useState(plant.notes)

  const num = (v: string, min: number, max: number) => {
    const n = Math.round(Number(v))
    return v.trim() && Number.isFinite(n) && n >= min && n <= max ? n : undefined
  }

  const save = () => {
    useStore.getState().updatePlant(plant.id, {
      nickname: nickname.trim() || plant.nickname,
      where,
      waterEveryDays: num(water, 1, 120),
      feedEveryDays: num(feed, 1, 365),
      style: style || undefined,
      yearStarted: num(year, 1800, new Date().getFullYear()),
      notes: notes.trim(),
    })
    useStore.getState().showToast('Saved')
    onClose()
  }

  const auto = waterInterval({ ...plant, where, waterEveryDays: undefined }, ctx)

  return (
    <Sheet open={open} onClose={onClose} title="Edit">
      <div className="form">
        <label>
          <span>Nickname</span>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={40} />
        </label>
        <div>
          <span className="label">Where does it live?</span>
          <Segmented
            value={where}
            onChange={setWhere}
            options={[
              { value: 'outdoor', label: 'Outdoors' },
              { value: 'indoor', label: 'Indoors' },
            ]}
          />
        </div>
        <div className="two">
          <label>
            <span>Water every (days)</span>
            <input inputMode="numeric" value={water} onChange={(e) => setWater(e.target.value)} placeholder={`Auto · ${auto}`} />
          </label>
          <label>
            <span>Feed every (days)</span>
            <input inputMode="numeric" value={feed} onChange={(e) => setFeed(e.target.value)} placeholder="Auto" />
          </label>
        </div>
        <p className="muted small">Leave blank for automatic: the species’ seasonal schedule, shortened on hot days for outdoor plants.</p>
        {plant.bonsai && (
          <div className="two">
            <label>
              <span>Style</span>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option value="">Not decided</option>
                {BONSAI_STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>In training since</span>
              <input inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
            </label>
          </div>
        )}
        <label>
          <span>Notes</span>
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Where you got it, pot size, quirks…" />
        </label>
        <button className="btn primary block" onClick={save}>
          Save
        </button>
      </div>
    </Sheet>
  )
}
