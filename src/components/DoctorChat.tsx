import { ClipboardList, Copy, ExternalLink, MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import { doctorInstructions, isClaudeLink, plantBrief } from '../lib/agent'
import { useCareContext } from '../lib/hooks'
import { useStore } from '../lib/store'

async function copyText(text: string, done: string) {
  const { showToast } = useStore.getState()
  try {
    await navigator.clipboard.writeText(text)
    navigator.vibrate?.(10)
    showToast(done)
    return true
  } catch {
    return false
  }
}

/** Set up and open a "Dr. Green" project in the grower's own Claude account. */
export function DoctorChat({ plantId }: { plantId?: string }) {
  const plants = useStore((s) => s.plants)
  const place = useStore((s) => s.settings.place)
  const saved = useStore((s) => s.settings.doctorUrl)
  const ctx = useCareContext()
  const [setup, setSetup] = useState(!saved)
  const [url, setUrl] = useState(saved ?? '')
  const [fallback, setFallback] = useState<string>()
  const [selected, setSelected] = useState<string | undefined>(() => (plantId && plants.some((p) => p.id === plantId) ? plantId : undefined))
  const plant = plants.find((p) => p.id === selected)

  const copy = async (text: string, done: string) => {
    setFallback(undefined)
    if (!(await copyText(text, done))) setFallback(text)
  }

  const saveLink = () => {
    const { setSettings, showToast } = useStore.getState()
    if (!isClaudeLink(url)) return showToast('That is not a claude.ai link')
    setSettings({ doctorUrl: url.trim() })
    setSetup(false)
    showToast('Dr. Green linked')
  }

  return (
    <section className="card plan">
      <header className="plan-head">
        <span className="section-icon">
          <MessageSquareText />
        </span>
        <div className="section-titles">
          <span className="section-title">Chat with Dr. Green</span>
          <span className="section-hint">In your own Claude app, on your plan</span>
        </div>
      </header>

      <div className="plan-body">
        {saved && !setup ? (
          <>
            <p>Open the chat, add your photos, and ask. Come back to the same chat with new photos to follow a plant’s recovery.</p>
            <a className="btn primary block" href={saved} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Open Dr. Green
            </a>
          </>
        ) : (
          <>
            <p>Set up once, about two minutes. After that you just open the chat and send photos.</p>
            <ol className="steps">
              <li>
                Tap <b>Copy instructions</b> below.
              </li>
              <li>
                Open Claude, go to <b>Projects</b>, and create a project named <b>Dr. Green</b>.
              </li>
              <li>
                In the project, open its <b>instructions</b>, paste, and save.
              </li>
              <li>Copy the project’s link from your browser or the share menu and paste it here, so Treecko can open it in one tap.</li>
            </ol>
            <div className="two">
              <button className="btn primary" onClick={() => void copy(doctorInstructions(place), 'Instructions copied')}>
                <Copy /> Copy instructions
              </button>
              <a className="btn" href="https://claude.ai/projects" target="_blank" rel="noopener noreferrer">
                <ExternalLink /> Open Claude
              </a>
            </div>
            <div className="form">
              <label>
                <span>Link to your Dr. Green project</span>
                <div className="input-row">
                  <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://claude.ai/project/…" inputMode="url" autoCapitalize="none" spellCheck={false} />
                </div>
              </label>
              <button className="btn block" disabled={!url.trim()} onClick={saveLink}>
                Save link
              </button>
            </div>
            {!place && <p className="muted small">Tip: set your location in Settings first, so the instructions tell Dr. Green your climate.</p>}
          </>
        )}

        {plants.length > 0 && (
          <div className="plan-row">
            <span className="plan-icon">
              <ClipboardList />
            </span>
            <div>
              <h4>Tell Dr. Green about a plant</h4>
              <p className="muted small">Copies its species, spot, watering schedule and recent care, to paste as your first message with the photos.</p>
              <div className="plant-pick">
                {plants.map((p) => (
                  <button key={p.id} className={`chip ${p.id === selected ? 'chip-on' : 'chip-plain'}`} aria-pressed={p.id === selected} onClick={() => setSelected(p.id)}>
                    {p.nickname}
                  </button>
                ))}
              </div>
              <button className="btn" disabled={!plant} onClick={() => plant && void copy(plantBrief(plant, ctx), 'Plant details copied')}>
                <Copy /> Copy plant details
              </button>
            </div>
          </div>
        )}

        {fallback && (
          <div className="form">
            <label>
              <span>Copying was blocked. Select all of this and copy it</span>
              <textarea rows={5} readOnly value={fallback} onFocus={(e) => e.target.select()} />
            </label>
          </div>
        )}

        {saved && !setup && (
          <button
            className="link tap"
            onClick={() => {
              setUrl(saved)
              setSetup(true)
            }}
          >
            Set up again or change the link
          </button>
        )}
      </div>
    </section>
  )
}
