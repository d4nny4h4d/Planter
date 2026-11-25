import { Image as ImageIcon, Leaf, TreePine, X, Zap, ZapOff } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiError, identifyBonsai, identifyPlant } from '../lib/ai'
import { fileToDataUrl, videoFrameToDataUrl } from '../lib/image'
import { back, navigate } from '../lib/router'
import { useStore } from '../lib/store'

type Mode = 'plant' | 'bonsai'
const STEPS = ['Looking at leaves and stems…', 'Comparing species…', 'Checking your climate…', 'Writing the care sheet…']

export function Scan({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [shot, setShot] = useState<string>()
  const [error, setError] = useState<AiError>()
  const [camError, setCamError] = useState<string>()
  const [live, setLive] = useState(false)
  const [torch, setTorch] = useState<boolean | null>(null)
  const [step, setStep] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const stream = useRef<MediaStream>(null)
  const picker = useRef<HTMLInputElement>(null)
  const run = useRef(0)
  const camRun = useRef(0)
  const busy = useRef(false)
  const abort = useRef<AbortController>(null)
  const hasKey = useStore((s) => !!s.settings.apiKey)
  const setDraft = useStore((s) => s.setDraft)

  const stop = useCallback(() => {
    camRun.current++
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    setLive(false)
  }, [])

  const start = useCallback(async () => {
    setCamError(undefined)
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamError('Live camera is not available here. Use the gallery button to take or choose a photo.')
      return
    }
    const id = ++camRun.current
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      })
      // The screen closed, or a photo was taken, while the camera was still starting: release it.
      if (id !== camRun.current || busy.current) {
        s.getTracks().forEach((t) => t.stop())
        return
      }
      stream.current?.getTracks().forEach((t) => t.stop())
      stream.current = s
      if (video.current) {
        video.current.srcObject = s
        await video.current.play().catch(() => {})
      }
      const caps = s.getVideoTracks()[0]?.getCapabilities?.() as { torch?: boolean } | undefined
      setTorch(caps?.torch ? false : null)
      setLive(true)
    } catch (e) {
      if (id !== camRun.current) return
      const denied = e instanceof DOMException && e.name === 'NotAllowedError'
      setCamError(
        denied
          ? 'Camera permission is off. Allow it in your browser settings, or use the gallery button.'
          : 'The camera could not be started. Use the gallery button to take or choose a photo.',
      )
    }
  }, [])

  useEffect(() => {
    void start()
    const onVis = () => {
      if (document.visibilityState === 'hidden') stop()
      else if (!stream.current && !busy.current) void start()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      run.current++
      abort.current?.abort()
      stop()
    }
  }, [start, stop])

  useEffect(() => {
    if (!shot || error) return
    setStep(0)
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 6000)
    return () => clearInterval(t)
  }, [shot, error])

  const analyse = async (photo: string) => {
    const id = ++run.current
    busy.current = true
    setShot(photo)
    setError(undefined)
    stop()
    abort.current?.abort()
    const ctl = (abort.current = new AbortController())
    try {
      if (mode === 'plant') {
        const r = await identifyPlant(photo, ctl.signal)
        if (id !== run.current) return
        setDraft({ kind: 'plant', photo, profile: r.profile, confidence: r.confidence, reasoning: r.reasoning, alternatives: r.alternatives, emoji: r.emoji })
      } else {
        const r = await identifyBonsai(photo, ctl.signal)
        if (id !== run.current) return
        setDraft({ kind: 'bonsai', photo, bonsai: r.profile, confidence: r.confidence, reasoning: r.reasoning, alternatives: r.alternatives, emoji: r.emoji, suggestedStyle: r.suggestedStyle })
      }
      navigator.vibrate?.(20)
      navigate('/result', { replace: true })
    } catch (e) {
      if (id !== run.current) return
      setError(e instanceof AiError ? e : new AiError('Something went wrong. Please try again.'))
    }
  }

  const capture = () => {
    if (!video.current || !live || !video.current.videoWidth) return
    navigator.vibrate?.(10)
    void analyse(videoFrameToDataUrl(video.current))
  }

  const pick = async (file: File | undefined) => {
    if (!file) return
    try {
      await analyse(await fileToDataUrl(file))
    } catch {
      setCamError('That image could not be opened. Try another photo.')
    }
  }

  const toggleTorch = async () => {
    const track = stream.current?.getVideoTracks()[0]
    if (!track || torch === null) return
    try {
      await track.applyConstraints({ advanced: [{ torch: !torch } as MediaTrackConstraintSet] })
      setTorch(!torch)
    } catch {
      setTorch(null)
    }
  }

  const retake = () => {
    run.current++
    abort.current?.abort()
    busy.current = false
    setShot(undefined)
    setError(undefined)
    void start()
  }

  return (
    <div className="scan">
      <video ref={video} className="scan-video" playsInline muted hidden={!!shot} />
      {shot && <img src={shot} alt="" className="scan-video" />}
      <div className={`scan-shade ${shot ? 'busy' : ''}`} />

      <div className="scan-top">
        <button className="icon-btn glass" aria-label="Close" onClick={() => back()}>
          <X />
        </button>
        {!shot && torch !== null && (
          <button className="icon-btn glass" aria-label={torch ? 'Turn flash off' : 'Turn flash on'} onClick={toggleTorch}>
            {torch ? <Zap /> : <ZapOff />}
          </button>
        )}
      </div>

      {!shot && (
        <>
          <div className="scan-frame" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="scan-hint">
            {!hasKey ? (
              <button className="scan-notice" onClick={() => navigate(`/claude?task=${mode}`, { replace: true })}>
                No API key set. Identify it with your Claude app instead →
              </button>
            ) : camError ? (
              <span className="scan-notice">{camError}</span>
            ) : (
              <span>{mode === 'plant' ? 'Fill the frame with leaves or flowers' : 'Frame the whole tree, front on'}</span>
            )}
          </div>
          <div className="scan-controls">
            <div className="scan-modes" role="tablist">
              <button role="tab" aria-selected={mode === 'plant'} onClick={() => setMode('plant')}>
                <Leaf size={16} /> Plant
              </button>
              <button role="tab" aria-selected={mode === 'bonsai'} onClick={() => setMode('bonsai')}>
                <TreePine size={16} /> Bonsai
              </button>
            </div>
            <div className="scan-row">
              <button className="scan-side" onClick={() => picker.current?.click()}>
                <ImageIcon />
                <span>Gallery</span>
              </button>
              <button className="shutter" aria-label="Take photo" disabled={!live} onClick={capture}>
                <span />
              </button>
              <span className="scan-side" />
            </div>
          </div>
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
        </>
      )}

      {shot && !error && (
        <div className="scan-busy" role="status">
          <div className="scan-line" />
          <div className="scan-busy-card">
            <span className="spinner light" />
            <div>
              <b>Identifying…</b>
              <p>{STEPS[step]}</p>
            </div>
            <button className="link light tap" onClick={retake}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {shot && error && (
        <div className="scan-busy">
          <div className="scan-error" role="alert">
            <b>Couldn’t identify that</b>
            <p>{error.message}</p>
            <div className="stack">
              {error.needsKey ? (
                <button className="btn primary" onClick={() => navigate('/settings')}>
                  Open Settings
                </button>
              ) : (
                <button className="btn primary" onClick={() => void analyse(shot)}>
                  Try again
                </button>
              )}
              <button className="btn" onClick={retake}>
                Take another photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
