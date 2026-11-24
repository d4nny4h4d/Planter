import { Camera, CalendarClock, ChevronRight, CircleCheck, ShieldAlert, ShoppingBasket, Sprout, Stethoscope, Trash2, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Callout, Chip, Empty, Screen, Sheet, TopBar, usePhoto } from '../components/ui'
import { AiError, diagnose } from '../lib/ai'
import { fileToDataUrl, savePhoto } from '../lib/image'
import { back, navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { DoctorReport } from '../lib/types'
import { cap, DAY, formatDate, relativeDay, uid } from '../lib/util'

const SYMPTOMS = [
  'Yellow leaves',
  'Brown tips or edges',
  'Spots on leaves',
  'Wilting or drooping',
  'Leaves dropping',
  'White powder or fuzz',
  'Sticky residue',
  'Insects or webbing',
  'Holes or chewed leaves',
  'Soft or black stem',
  'Mould on soil',
  'No new growth',
]

const STATUS = {
  healthy: ['Looks healthy', 'good', 'status-healthy'],
  minor: ['Minor issue', 'warn', 'status-minor'],
  'needs treatment': ['Needs treatment', 'bad', 'status-needs'],
  critical: ['Critical', 'bad', 'status-critical'],
} as const

const MAX_PHOTOS = 4

export function Doctor({ plantId }: { plantId: string | null }) {
  const plants = useStore((s) => s.plants)
  const reports = useStore((s) => s.reports)
  const hasKey = useStore((s) => !!s.settings.apiKey)
  const [selected, setSelected] = useState<string | undefined>(() => (plantId && plants.some((p) => p.id === plantId) ? plantId : undefined))
  const [photos, setPhotos] = useState<string[]>([])
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<AiError>()
  const picker = useRef<HTMLInputElement>(null)
  const abort = useRef<AbortController>(null)
  useEffect(() => () => abort.current?.abort(), [])

  const plant = plants.find((p) => p.id === selected)

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return
    setError(undefined)
    const room = MAX_PHOTOS - photos.length
    try {
      const next = await Promise.all([...files].slice(0, room).map((f) => fileToDataUrl(f)))
      setPhotos((p) => [...p, ...next].slice(0, MAX_PHOTOS))
    } catch {
      setError(new AiError('One of those images could not be opened. Try another photo.'))
    }
  }

  const run = async () => {
    abort.current?.abort()
    const ctl = (abort.current = new AbortController())
    setBusy(true)
    setError(undefined)
    try {
      const found = await diagnose({ photos, plant, symptoms, notes: notes.trim() }, ctl.signal)
      if (ctl.signal.aborted) return
      const { identifiedAs, ...rest } = found
      const photoIds = await Promise.all(photos.map(savePhoto))
      const report: DoctorReport = {
        ...rest,
        id: uid(),
        at: Date.now(),
        plantId: plant?.id,
        plantName: plant?.nickname ?? identifiedAs,
        photoIds,
        symptoms,
        notes: notes.trim(),
      }
      const { addReport, logCare } = useStore.getState()
      addReport(report)
      if (plant) logCare(plant.id, 'note', `Dr. Green: ${report.headline}. ${report.summary}`)
      navigator.vibrate?.(20)
      setPhotos([])
      setSymptoms([])
      setNotes('')
      navigate(`/report/${report.id}`)
    } catch (e) {
      if (ctl.signal.aborted) return
      setError(e instanceof AiError ? e : new AiError('Something went wrong. Please try again.'))
    } finally {
      if (!ctl.signal.aborted) setBusy(false)
    }
  }

  return (
    <Screen id="/doctor" tab>
      <header className="page-head">
        <h1>Dr. Green</h1>
      </header>
      <p className="muted">Photograph a plant that looks unwell. You get a diagnosis, a step-by-step cure and what to expect as it recovers.</p>

      {!hasKey && (
        <Callout tone="warn">
          Dr. Green needs your Anthropic API key.{' '}
          <button className="link" onClick={() => navigate('/settings')}>
            Add it in Settings
          </button>
        </Callout>
      )}

      <section className="group">
        <h2 className="group-title">
          1 · Photos <span>{photos.length}/{MAX_PHOTOS}</span>
        </h2>
        <div className="shots">
          {photos.map((src, i) => (
            <div key={i} className="shot">
              <img src={src} alt={`Photo ${i + 1}`} />
              <button aria-label={`Remove photo ${i + 1}`} disabled={busy} onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}>
                <span>
                  <X size={15} />
                </span>
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button className={`shot-add ${photos.length === 0 ? 'first' : ''}`} disabled={busy} onClick={() => picker.current?.click()}>
              <Camera />
              {photos.length === 0 ? 'Take or choose photos' : 'Add'}
            </button>
          )}
        </div>
        <p className="muted small">
          Best results: one close-up of the damage, one of a leaf underside, and one of the whole plant with its soil. Daylight, no flash.
        </p>
        <input
          ref={picker}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            void addPhotos(e.target.files)
            e.target.value = ''
          }}
        />
      </section>

      <section className="group">
        <h2 className="group-title">2 · Which plant?</h2>
        <div className="plant-pick">
          <button className={`chip ${!selected ? 'chip-on' : 'chip-plain'}`} aria-pressed={!selected} onClick={() => setSelected(undefined)}>
            Another plant
          </button>
          {plants.map((p) => (
            <button key={p.id} className={`chip ${p.id === selected ? 'chip-on' : 'chip-plain'}`} aria-pressed={p.id === selected} onClick={() => setSelected(p.id)}>
              {p.emoji} {p.nickname}
            </button>
          ))}
        </div>
        <p className="muted small">
          {plant
            ? 'Its species, spot, care plan and watering history are taken into account.'
            : 'Dr. Green will identify it from the photos. Pick one of your plants for a diagnosis that uses its care history.'}
        </p>
      </section>

      <section className="group">
        <h2 className="group-title">3 · What have you noticed? (optional)</h2>
        <div className="chips pick">
          {SYMPTOMS.map((s) => {
            const on = symptoms.includes(s)
            return (
              <button key={s} className={`chip ${on ? 'chip-on' : 'chip-plain'}`} aria-pressed={on} onClick={() => setSymptoms((x) => (on ? x.filter((y) => y !== s) : [...x, s]))}>
                {s}
              </button>
            )
          })}
        </div>
        <div className="form">
          <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="When it started, anything you changed recently (repotting, moving it, new fertiliser)…" />
        </div>
      </section>

      {error && (
        <p className="error" role="alert">
          {error.message}{' '}
          {error.needsKey && (
            <button className="link" onClick={() => navigate('/settings')}>
              Open Settings
            </button>
          )}
        </p>
      )}

      <button className="btn primary block" disabled={busy || photos.length === 0} onClick={() => void run()}>
        {busy ? <span className="spinner" /> : <Stethoscope />} {busy ? 'Examining the photos…' : 'Diagnose'}
      </button>
      {busy && <p className="muted small center">Usually 20–40 seconds. Keep the app open.</p>}

      {reports.length > 0 && (
        <section className="group">
          <h2 className="group-title">
            Past check-ups <span>{reports.length}</span>
          </h2>
          <div className="card list">
            {reports.map((r) => (
              <ReportRow key={r.id} report={r} />
            ))}
          </div>
        </section>
      )}
    </Screen>
  )
}

function ReportRow({ report }: { report: DoctorReport }) {
  const src = usePhoto(report.photoIds[0])
  return (
    <button className="row" onClick={() => navigate(`/report/${report.id}`)}>
      <span className="avatar avatar-sm">{src ? <img src={src} alt="" /> : <Stethoscope size={22} />}</span>
      <span className="row-text">
        <b>{report.plantName}</b>
        <span className="muted small">
          {report.resolved ? 'Recovered' : STATUS[report.status][0]} · {report.headline}
        </span>
        <span className="muted small">{formatDate(report.at)}</span>
      </span>
      <ChevronRight className="row-chev" />
    </button>
  )
}

function Photo({ id }: { id: string }) {
  const src = usePhoto(id)
  return src ? <img src={src} alt="" /> : null
}

function Steps({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="card pad rx">
      <h4>
        {icon} {title}
      </h4>
      <ol className="steps">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  )
}

export function Report({ id }: { id: string }) {
  const report = useStore((s) => s.reports.find((r) => r.id === id))
  const hasPlant = useStore((s) => !!report?.plantId && s.plants.some((p) => p.id === report.plantId))
  const [confirm, setConfirm] = useState(false)
  const likelihood = useMemo(() => ({ likely: 'bad', possible: 'warn', unlikely: 'plain' }) as const, [])

  if (!report)
    return (
      <Screen id="report-missing">
        <TopBar title="Check-up" />
        <Empty emoji="🍂" title="Check-up not found" />
      </Screen>
    )

  const { updateReport, removeReport, showToast } = useStore.getState()
  const [label, tone, cls] = STATUS[report.status]
  const recheckAt = report.at + report.recheckDays * DAY

  return (
    <Screen id={`/report/${id}`}>
      <TopBar
        title="Check-up"
        right={
          <button className="icon-btn" aria-label="Delete check-up" onClick={() => setConfirm(true)}>
            <Trash2 size={20} />
          </button>
        }
      />

      {report.photoIds.length > 0 && (
        <div className="report-photos">
          {report.photoIds.map((ph) => (
            <Photo key={ph} id={ph} />
          ))}
        </div>
      )}

      <div className={`status ${report.resolved ? 'status-healthy' : cls}`}>
        <p className="eyebrow">
          {report.plantName} · {formatDate(report.at)}
        </p>
        <h2>{report.headline}</h2>
        <div className="chips">
          <Chip tone={report.resolved ? 'good' : tone}>{report.resolved ? 'Recovered' : label}</Chip>
        </div>
        <p>{report.summary}</p>
      </div>

      {report.diagnoses.length > 0 && (
        <section className="group">
          <h2 className="group-title">Diagnosis</h2>
          <div className="card list">
            {report.diagnoses.map((d) => (
              <div key={d.name} className="dx">
                <div className="dx-head">
                  <h4>{d.name}</h4>
                  <Chip tone={likelihood[d.likelihood]}>{cap(d.likelihood)}</Chip>
                </div>
                <p className="muted small">{cap(d.category)}</p>
                <p>
                  <span className="tag">Seen</span> {d.evidence}
                </p>
                <p>
                  <span className="tag">Cause</span> {d.cause}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {report.treatment.now.length + report.treatment.thisWeek.length + report.treatment.ongoing.length > 0 && (
        <section className="group">
          <h2 className="group-title">How to cure it</h2>
          <Steps icon={<Stethoscope size={18} />} title="Do today" items={report.treatment.now} />
          <Steps icon={<CalendarClock size={18} />} title="This week" items={report.treatment.thisWeek} />
          <Steps icon={<Sprout size={18} />} title="Until it recovers" items={report.treatment.ongoing} />
        </section>
      )}

      {report.products.length > 0 && (
        <div className="card pad rx">
          <h4>
            <ShoppingBasket size={18} /> What you need
          </h4>
          <ul className="bullets">
            {report.products.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}

      {report.contagion && (
        <Callout tone="warn">
          <ShieldAlert size={16} /> <b>Other plants:</b> {report.contagion}
        </Callout>
      )}

      {report.recovery && (
        <div className="card pad rx">
          <h4>Recovery</h4>
          <p>{report.recovery}</p>
          {report.recheckDays > 0 && !report.resolved && (
            <p className="muted small">
              Check again {relativeDay(recheckAt)} ({formatDate(recheckAt)}).{hasPlant ? ' A reminder appears on Today.' : ''}
            </p>
          )}
        </div>
      )}

      {report.prevention.length > 0 && (
        <div className="card pad rx">
          <h4>Stop it coming back</h4>
          <ul className="bullets">
            {report.prevention.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="stack">
        <button className="btn primary block" onClick={() => navigate(report.plantId && hasPlant ? `/doctor?plant=${report.plantId}` : '/doctor', { replace: true })}>
          <Camera /> Check again with new photos
        </button>
        {report.status !== 'healthy' && (
          <button
            className="btn block"
            onClick={() => {
              updateReport(report.id, { resolved: !report.resolved })
              showToast(report.resolved ? 'Marked as still being treated' : 'Marked as recovered')
            }}
          >
            <CircleCheck /> {report.resolved ? 'Not recovered after all' : 'Mark as recovered'}
          </button>
        )}
        {hasPlant && (
          <button className="btn block" onClick={() => navigate(`/plant/${report.plantId}`)}>
            Open {report.plantName}
          </button>
        )}
      </div>
      <p className="muted small center">A diagnosis from photos, not a lab test. If a treatment is not working after two rounds, check again.</p>

      <Sheet open={confirm} onClose={() => setConfirm(false)} title="Delete this check-up?">
        <p className="muted">Its photos are deleted too.</p>
        <div className="stack">
          <button
            className="btn danger block"
            onClick={() => {
              setConfirm(false)
              setTimeout(() => back('/doctor'), 80)
              setTimeout(() => {
                removeReport(report.id)
                showToast('Check-up deleted')
              }, 380)
            }}
          >
            Delete
          </button>
          <button className="btn block" onClick={() => setConfirm(false)}>
            Keep
          </button>
        </div>
      </Sheet>
    </Screen>
  )
}
