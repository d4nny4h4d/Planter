import { ChevronRight, Droplets, Search, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { AiError, lookupBonsai, lookupPlant } from '../lib/ai'
import { speciesName, tasksFor } from '../lib/care'
import { useCareContext } from '../lib/hooks'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { Plant } from '../lib/types'
import { relativeDay } from '../lib/util'
import { Avatar } from './ui'

export function PlantGrid({ plants }: { plants: Plant[] }) {
  const ctx = useCareContext()
  return (
    <div className="grid">
      {plants.map((p) => {
        const water = tasksFor(p, ctx).find((t) => t.action === 'water')
        return (
          <button key={p.id} className="plant-card" onClick={() => navigate(`/plant/${p.id}`)}>
            <Avatar plant={p} size="fill" />
            <span className="plant-card-body">
              <b>{p.nickname}</b>
              <span className="muted small">{speciesName(p)}</span>
              {water && (
                <span className={`water-chip ${water.inDays <= 0 ? 'due' : ''}`}>
                  <Droplets size={13} /> {water.inDays < 0 ? 'Overdue' : cap1(relativeDay(water.dueAt))}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

const cap1 = (s: string) => s[0].toUpperCase() + s.slice(1)

export function SearchField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="search">
      <Search size={18} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} enterKeyHint="search" autoCapitalize="none" autoCorrect="off" />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}
    </label>
  )
}

export function LibraryRow({ emoji, title, subtitle, onClick }: { emoji: string; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button className="row" onClick={onClick}>
      <span className="avatar avatar-sm">
        <span className="avatar-emoji">{emoji}</span>
      </span>
      <span className="row-text">
        <b>{title}</b>
        <span className="muted small">{subtitle}</span>
      </span>
      <ChevronRight className="row-chev" />
    </button>
  )
}

/** "Not in the library? Ask Claude for a care sheet by name." */
export function AiLookup({ kind, name }: { kind: 'plant' | 'bonsai'; name: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<AiError>()
  const setDraft = useStore((s) => s.setDraft)

  const run = async () => {
    setBusy(true)
    setError(undefined)
    try {
      if (kind === 'plant') {
        const r = await lookupPlant(name)
        setDraft({ kind, profile: r.profile, reasoning: r.reasoning, emoji: r.emoji })
      } else {
        const r = await lookupBonsai(name)
        setDraft({ kind, bonsai: r.profile, reasoning: r.reasoning, emoji: r.emoji, suggestedStyle: r.suggestedStyle })
      }
      navigate('/result')
    } catch (e) {
      setError(e instanceof AiError ? e : new AiError('Something went wrong. Please try again.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card pad ai-lookup">
      <p>
        Not in the built-in library? Get a full care sheet for <b>“{name}”</b>.
      </p>
      <button className="btn primary" disabled={busy} onClick={run}>
        {busy ? <span className="spinner" /> : <Sparkles />} {busy ? 'Writing care sheet…' : 'Look it up'}
      </button>
      {busy && <p className="muted small">This usually takes 20–40 seconds.</p>}
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
    </div>
  )
}
