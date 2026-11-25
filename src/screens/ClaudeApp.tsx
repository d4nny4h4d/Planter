import { Camera, ClipboardPaste, Copy, ExternalLink, Import, X } from 'lucide-react'
import { useState } from 'react'
import { Callout, Screen, TopBar } from '../components/ui'
import { AiError, diagnose, identifyBonsai, identifyPlant, lookupBonsai, lookupPlant, manualRequest, manualResult, PHOTO_ELSEWHERE, writeCarePlan } from '../lib/ai'
import { SYMPTOMS, saveReport } from '../lib/doctor'
import { fileToDataUrl } from '../lib/image'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'

type Task = 'plant' | 'bonsai' | 'plan' | 'doctor'

const TASKS: { id: Task; label: string; blurb: string }[] = [
  { id: 'plant', label: 'Identify a plant', blurb: 'A care sheet for a plant from its photo or its name.' },
  { id: 'bonsai', label: 'Identify a bonsai', blurb: 'A bonsai care sheet for a tree from its photo or its species name.' },
  { id: 'plan', label: 'Personal care plan', blurb: 'A plan for one of your plants in its spot. No photo needed.' },
  { id: 'doctor', label: 'Dr. Green check-up', blurb: 'A diagnosis and cure from photos of a plant that looks unwell.' },
]

const isTask = (v: string | null): v is Task => TASKS.some((t) => t.id === v)

export function ClaudeApp({ initialTask, initialPlant }: { initialTask: string | null; initialPlant: string | null }) {
  const plants = useStore((s) => s.plants)
  const [task, setTask] = useState<Task>(isTask(initialTask) ? initialTask : 'plant')
  const [plantId, setPlantId] = useState<string | undefined>(() => (initialPlant && plants.some((p) => p.id === initialPlant) ? initialPlant : undefined))
  const [name, setName] = useState('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [request, setRequest] = useState<string>()
  const [copied, setCopied] = useState(false)
  const [reply, setReply] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()

  const plant = plants.find((p) => p.id === plantId)
  const usesName = (task === 'plant' || task === 'bonsai') && name.trim().length > 0
  const needsPhoto = (task === 'plant' || task === 'bonsai') && !usesName
  const photoLimit = task === 'doctor' ? 4 : 1
  const blocked = task === 'plan' && !plant ? 'Choose which plant the plan is for.' : undefined

  // The same call the app would make with an API key; in manual mode it is captured or replayed instead of sent.
  const call = () => {
    const n = name.trim()
    if (task === 'plant') return n ? lookupPlant(n) : identifyPlant(PHOTO_ELSEWHERE)
    if (task === 'bonsai') return n ? lookupBonsai(n) : identifyBonsai(PHOTO_ELSEWHERE)
    if (task === 'plan') return writeCarePlan(plant!)
    return diagnose({ photos: Array(Math.max(1, photos.length)).fill(PHOTO_ELSEWHERE), plant, symptoms, notes: notes.trim() })
  }

  const reset = () => {
    setRequest(undefined)
    setCopied(false)
    setError(undefined)
  }

  const copy = async () => {
    setError(undefined)
    try {
      const text = await manualRequest(call)
      setRequest(text)
      await navigator.clipboard.writeText(text)
      setCopied(true)
      navigator.vibrate?.(10)
    } catch (e) {
      if (e instanceof AiError) setError(e.message)
      else setCopied(false) // clipboard refused: the request is shown below to copy by hand
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setReply(text)
    } catch {
      setError('Paste was not allowed. Long-press in the box below and choose Paste.')
    }
  }

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return
    try {
      const next = await Promise.all([...files].slice(0, photoLimit - photos.length).map((f) => fileToDataUrl(f)))
      setPhotos((p) => [...p, ...next].slice(0, photoLimit))
    } catch {
      setError('That image could not be opened.')
    }
  }

  const importReply = async () => {
    setBusy(true)
    setError(undefined)
    const { setDraft, updatePlant, showToast } = useStore.getState()
    try {
      if (task === 'plant') {
        const r = await manualResult(() => (usesName ? lookupPlant(name.trim()) : identifyPlant(PHOTO_ELSEWHERE)), reply)
        setDraft({ kind: 'plant', photo: photos[0], profile: r.profile, confidence: usesName ? undefined : r.confidence, reasoning: r.reasoning, alternatives: r.alternatives, emoji: r.emoji })
        navigate('/result')
      } else if (task === 'bonsai') {
        const r = await manualResult(() => (usesName ? lookupBonsai(name.trim()) : identifyBonsai(PHOTO_ELSEWHERE)), reply)
        setDraft({ kind: 'bonsai', photo: photos[0], bonsai: r.profile, confidence: usesName ? undefined : r.confidence, reasoning: r.reasoning, alternatives: r.alternatives, emoji: r.emoji, suggestedStyle: r.suggestedStyle })
        navigate('/result')
      } else if (task === 'plan') {
        const plan = await manualResult(() => writeCarePlan(plant!), reply)
        updatePlant(plant!.id, { plan })
        showToast('Care plan saved')
        navigate(`/plant/${plant!.id}`)
      } else {
        const found = await manualResult(call as () => ReturnType<typeof diagnose>, reply)
        const id = await saveReport(found, { plant, photos, symptoms, notes: notes.trim() })
        navigate(`/report/${id}`)
      }
      setReply('')
      reset()
    } catch (e) {
      setError(e instanceof AiError ? e.message : 'That answer could not be read. Copy Claude’s whole reply and paste it again.')
    } finally {
      setBusy(false)
    }
  }

  const pickPlant = (
    <div className="plant-pick">
      {task === 'doctor' && (
        <button className={`chip ${!plantId ? 'chip-on' : 'chip-plain'}`} aria-pressed={!plantId} onClick={() => (setPlantId(undefined), reset())}>
          Another plant
        </button>
      )}
      {plants.map((p) => (
        <button key={p.id} className={`chip ${p.id === plantId ? 'chip-on' : 'chip-plain'}`} aria-pressed={p.id === plantId} onClick={() => (setPlantId(p.id), reset())}>
          {p.nickname}
        </button>
      ))}
    </div>
  )

  return (
    <Screen id="/claude">
      <TopBar title="Claude app" />
      <div className="guide">
        <h1>Use your Claude app</h1>
        <p className="muted">
          No API key or credit needed. Treecko writes the request, you send it from the Claude app on your own plan, and Claude’s answer comes back here as a care sheet, plan or check-up.
        </p>
      </div>

      <section className="group">
        <h2 className="group-title">1 · What do you need?</h2>
        <div className="radio-list">
          {TASKS.map((t) => (
            <label key={t.id} className={task === t.id ? 'on' : ''}>
              <input type="radio" name="task" checked={task === t.id} onChange={() => (setTask(t.id), setPhotos([]), reset())} />
              <span>
                <b>{t.label}</b>
                <span className="muted small">{t.blurb}</span>
              </span>
            </label>
          ))}
        </div>

        {(task === 'plant' || task === 'bonsai') && (
          <div className="form">
            <label>
              <span>Know its name? (optional)</span>
              <input value={name} onChange={(e) => (setName(e.target.value), reset())} placeholder="Leave empty to identify it from a photo" autoCapitalize="none" />
            </label>
          </div>
        )}

        {task === 'plan' &&
          (plants.length === 0 ? (
            <Callout tone="warn">Add a plant first, then come back for its plan.</Callout>
          ) : (
            <>
              {pickPlant}
              {plant && !plant.spot && (
                <Callout tone="warn">
                  This plant’s spot has not been described yet, so the plan would be generic.{' '}
                  <button className="link" onClick={() => navigate(`/plant/${plant.id}`)}>
                    Describe its spot first
                  </button>
                </Callout>
              )}
            </>
          ))}

        {task === 'doctor' && (
          <>
            {pickPlant}
            <div className="chips pick">
              {SYMPTOMS.map((s) => {
                const on = symptoms.includes(s)
                return (
                  <button key={s} className={`chip ${on ? 'chip-on' : 'chip-plain'}`} aria-pressed={on} onClick={() => (setSymptoms((x) => (on ? x.filter((y) => y !== s) : [...x, s])), reset())}>
                    {s}
                  </button>
                )
              })}
            </div>
            <div className="form">
              <textarea rows={2} value={notes} onChange={(e) => (setNotes(e.target.value), reset())} placeholder="When it started, anything you changed recently…" />
            </div>
          </>
        )}
      </section>

      <section className="group">
        <h2 className="group-title">2 · Send it from Claude</h2>
        <ol className="steps">
          <li>Copy the request.</li>
          <li>
            Open Claude and paste it into a new chat.
            {needsPhoto ? ' Attach your photo of the plant.' : task === 'doctor' ? ' Attach up to four photos: the damage close up, a leaf underside, the whole plant.' : ''}
          </li>
          <li>Send it, then copy Claude’s whole reply.</li>
        </ol>
        {blocked && <p className="muted small">{blocked}</p>}
        <div className="two">
          <button className="btn primary" disabled={!!blocked} onClick={() => void copy()}>
            <Copy /> {copied ? 'Copied' : 'Copy request'}
          </button>
          <a className="btn" href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Open Claude
          </a>
        </div>
        {request && !copied && (
          <div className="form">
            <label>
              <span>Copying was blocked. Select all of this and copy it</span>
              <textarea rows={5} readOnly value={request} onFocus={(e) => e.target.select()} />
            </label>
          </div>
        )}
      </section>

      <section className="group">
        <h2 className="group-title">3 · Bring the answer back</h2>
        <div className="form">
          <textarea rows={5} value={reply} onChange={(e) => (setReply(e.target.value), setError(undefined))} placeholder="Paste Claude’s reply here" spellCheck={false} />
        </div>
        <button className="btn" onClick={() => void pasteFromClipboard()}>
          <ClipboardPaste /> Paste from clipboard
        </button>

        {task !== 'plan' && !usesName && (
          <>
            <p className="muted small">
              Optional: add the same {photoLimit > 1 ? 'photos' : 'photo'} here so {task === 'doctor' ? 'they are kept with the check-up' : 'it becomes the plant’s picture'}.
            </p>
            <div className="shots">
              {photos.map((src, i) => (
                <div key={i} className="shot">
                  <img src={src} alt={`Photo ${i + 1}`} />
                  <button aria-label={`Remove photo ${i + 1}`} onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}>
                    <span>
                      <X size={15} />
                    </span>
                  </button>
                </div>
              ))}
              {photos.length < photoLimit && (
                <label className="shot-add">
                  <Camera />
                  Add
                  <input
                    type="file"
                    accept="image/*"
                    multiple={photoLimit > 1}
                    hidden
                    onChange={(e) => {
                      void addPhotos(e.target.files)
                      e.target.value = ''
                    }}
                  />
                </label>
              )}
            </div>
          </>
        )}

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="btn primary block" disabled={busy || !reply.trim() || !!blocked} onClick={() => void importReply()}>
          <Import /> Import answer
        </button>
      </section>
    </Screen>
  )
}
