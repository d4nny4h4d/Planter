import { Camera, NotebookPen } from 'lucide-react'
import { useRef, useState } from 'react'
import { Chip, Empty, Screen, TopBar } from '../components/ui'
import { AiError, healthCheck, stylingAdvice } from '../lib/ai'
import { fileToDataUrl } from '../lib/image'
import { back, navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { Advice as AdviceResult } from '../lib/types'

const SEVERITY = { act: ['Act now', 'bad'], watch: ['Keep an eye on', 'warn'], info: ['Note', 'plain'] } as const

export function Advice({ id, mode }: { id: string; mode: 'health' | 'styling' }) {
  const plant = useStore((s) => s.plants.find((p) => p.id === id))
  const logCare = useStore((s) => s.logCare)
  const showToast = useStore((s) => s.showToast)
  const [photo, setPhoto] = useState<string>()
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<AdviceResult>()
  const [error, setError] = useState<AiError>()
  const [saved, setSaved] = useState(false)
  const picker = useRef<HTMLInputElement>(null)

  if (!plant) return <Screen id="advice"><TopBar /><Empty emoji="🍂" title="Plant not found" /></Screen>

  const title = mode === 'health' ? 'Health check' : 'Styling advice'

  const run = async (img: string) => {
    setBusy(true)
    setError(undefined)
    setResult(undefined)
    setSaved(false)
    try {
      setResult(await (mode === 'health' ? healthCheck(plant, img) : stylingAdvice(plant, img)))
    } catch (e) {
      setError(e instanceof AiError ? e : new AiError('Something went wrong. Please try again.'))
    } finally {
      setBusy(false)
    }
  }

  const pick = async (file: File | undefined) => {
    if (!file) return
    try {
      const img = await fileToDataUrl(file)
      setPhoto(img)
      await run(img)
    } catch {
      setError(new AiError('That image could not be opened. Try another photo.'))
    }
  }

  return (
    <Screen id={`/advice/${id}`}>
      <TopBar title={title} />
      <div className="guide">
        <h1>{plant.nickname}</h1>
        <p className="muted">
          {mode === 'health'
            ? 'Take a clear, close photo of the part that worries you: a damaged leaf, a spot, a pest, or the whole plant if it is drooping.'
            : 'Photograph the tree from its front at trunk height, against a plain background if you can.'}
        </p>

        {photo && <img className="advice-photo" src={photo} alt="" />}

        <button className={`btn ${photo ? '' : 'primary'} block`} disabled={busy} onClick={() => picker.current?.click()}>
          <Camera /> {photo ? 'Use a different photo' : 'Take or choose a photo'}
        </button>
        <input
          ref={picker}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            void pick(e.target.files?.[0])
            e.target.value = ''
          }}
        />

        {busy && (
          <div className="card pad busy-row" role="status">
            <span className="spinner" />
            <div>
              <b>{mode === 'health' ? 'Examining the photo…' : 'Studying the tree…'}</b>
              <p className="muted small">This usually takes 15–30 seconds.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="card pad" role="alert">
            <p className="error">{error.message}</p>
            <div className="stack">
              {error.needsKey ? (
                <button className="btn primary" onClick={() => navigate('/settings')}>Open Settings</button>
              ) : (
                photo && <button className="btn primary" onClick={() => void run(photo)}>Try again</button>
              )}
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="card pad">
              <h2 className="advice-headline">{result.headline}</h2>
              <p>{result.summary}</p>
            </div>
            {result.findings.map((f) => (
              <div key={f.title} className="card pad finding">
                <Chip tone={SEVERITY[f.severity][1]}>{SEVERITY[f.severity][0]}</Chip>
                <h4>{f.title}</h4>
                <p>{f.detail}</p>
                <p>
                  <span className="tag">Do</span> {f.action}
                </p>
              </div>
            ))}
            <button
              className="btn block"
              disabled={saved}
              onClick={() => {
                logCare(plant.id, 'note', `${title}: ${result.headline}. ${result.summary}`)
                setSaved(true)
                showToast('Saved to journal')
              }}
            >
              <NotebookPen /> {saved ? 'Saved to journal' : 'Save summary to journal'}
            </button>
            <button className="btn block" onClick={() => back()}>Done</button>
            <p className="muted small center">A photo-based opinion, not a lab diagnosis.</p>
          </>
        )}
      </div>
    </Screen>
  )
}
