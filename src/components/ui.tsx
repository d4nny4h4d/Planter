import { ChevronDown, ChevronLeft, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cachedPhoto, loadPhoto } from '../lib/image'
import { back, wasPop } from '../lib/router'
import { BonsaiMark, Mono, Placeholder } from './art'
import { useStore } from '../lib/store'
import type { MixPart, Plant } from '../lib/types'

const scrollMemory = new Map<string, number>()

/** A full-height scrolling page. Remembers its scroll position when you come back to it. */
export function Screen({ id, tab, children, className = '' }: { id: string; tab?: boolean; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = ref.current!
    if (wasPop()) el.scrollTop = scrollMemory.get(id) ?? 0
    const save = () => scrollMemory.set(id, el.scrollTop)
    el.addEventListener('scroll', save, { passive: true })
    return () => el.removeEventListener('scroll', save)
  }, [id])
  return (
    <div ref={ref} className={`screen ${tab ? 'screen-tab' : 'screen-push'} ${className}`}>
      {children}
    </div>
  )
}

export function TopBar({ title, right, onBack }: { title?: string; right?: ReactNode; onBack?: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Back" onClick={onBack ?? (() => back())}>
        <ChevronLeft />
      </button>
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-right">{right}</div>
    </header>
  )
}

export function Section({
  icon,
  title,
  hint,
  children,
  defaultOpen = true,
}: {
  icon: ReactNode
  title: string
  hint?: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className={`card section ${open ? 'open' : ''}`}>
      <button className="section-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="section-icon">{icon}</span>
        <span className="section-titles">
          <span className="section-title">{title}</span>
          {hint && <span className="section-hint">{hint}</span>}
        </span>
        <ChevronDown className="section-chev" />
      </button>
      <div className="section-wrap">
        <div className="section-body">
          <div className="section-inner">{children}</div>
        </div>
      </div>
    </section>
  )
}

/** A highlighted band on a fixed scale, e.g. ideal temperature within 0–45 °C. */
export function RangeBar({ min, max, lo, hi, label, tone = 'green', marker }: { min: number; max: number; lo: number; hi: number; label: string; tone?: 'green' | 'warm' | 'blue'; marker?: number }) {
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100))
  const left = pct(lo)
  const width = Math.max(6, pct(hi) - left)
  return (
    <div className="range">
      <div className="range-label">{label}</div>
      <div className={`range-track tone-${tone}`}>
        <div className="range-fill" style={{ left: `${left}%`, width: `${width}%` }} />
        {marker != null && <div className="range-marker" style={{ left: `${pct(marker)}%` }} />}
      </div>
    </div>
  )
}

const MIX_COLORS = ['#8a5a36', '#2f2a26', '#c9a26b', '#b7b0a3', '#6f7f4f', '#a8552f']

export function MixChart({ mix }: { mix: MixPart[] }) {
  const total = mix.reduce((n, m) => n + m.parts, 0) || 1
  const r = 38
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="mix">
      <svg viewBox="0 0 100 100" className="mix-donut" role="img" aria-label="Soil mix proportions">
        {mix.map((m, i) => {
          const len = (m.parts / total) * c
          const el = (
            <circle
              key={m.ingredient}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={MIX_COLORS[i % MIX_COLORS.length]}
              strokeWidth="18"
              strokeDasharray={`${Math.max(0, len - 1.5)} ${c}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 50 50)"
            />
          )
          offset += len
          return el
        })}
      </svg>
      <ul className="mix-legend">
        {mix.map((m, i) => (
          <li key={m.ingredient}>
            <span className="mix-swatch" style={{ background: MIX_COLORS[i % MIX_COLORS.length] }} />
            <b>
              {m.parts} {m.parts === 1 ? 'part' : 'parts'}
            </b>{' '}
            {m.ingredient}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(raf)
    }
    setShown(false)
    const t = setTimeout(() => setMounted(false), 260)
    return () => clearTimeout(t)
  }, [open])
  const close = useRef(onClose)
  useEffect(() => {
    close.current = onClose
  })
  useEffect(() => {
    if (!open) return
    // Give the sheet its own history entry so the phone's back button closes it instead of leaving the page.
    const token = `${Date.now()}-${Math.random()}`
    if (window.history.state?.sheet) window.history.replaceState({ sheet: token }, '')
    else window.history.pushState({ sheet: token }, '')
    const onPop = () => close.current()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close.current()
    window.addEventListener('popstate', onPop)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('keydown', onKey)
      // Deferred so a sheet opening in the same update can take over this entry instead.
      setTimeout(() => {
        if (window.history.state?.sheet === token) window.history.back()
      }, 0)
    }
  }, [open])
  if (!mounted) return null
  return createPortal(
    <div className={`sheet-root ${shown ? 'shown' : ''}`}>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-grip" />
        {title && (
          <div className="sheet-head">
            <h2>{title}</h2>
            <button className="icon-btn" aria-label="Close" onClick={onClose}>
              <X />
            </button>
          </div>
        )}
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export function Toast() {
  const toast = useStore((s) => s.toast)
  const clear = useStore((s) => s.clearToast)
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(clear, toast.undo ? 5000 : 2600)
    return () => clearTimeout(t)
  }, [toast, clear])
  if (!toast) return null
  return (
    <div className="toast" key={toast.id} role="status">
      <span>{toast.text}</span>
      {toast.undo && (
        <button
          onClick={() => {
            toast.undo!()
            clear()
          }}
        >
          Undo
        </button>
      )}
    </div>
  )
}

export function usePhoto(id: string | undefined) {
  const [src, setSrc] = useState(() => (id ? cachedPhoto(id) : undefined))
  useEffect(() => {
    let live = true
    setSrc(id ? cachedPhoto(id) : undefined)
    if (id && !cachedPhoto(id)) void loadPhoto(id).then((d) => live && setSrc(d))
    return () => {
      live = false
    }
  }, [id])
  return src
}

export function Avatar({ plant, size = 'sm' }: { plant: Pick<Plant, 'photos' | 'kind' | 'nickname'>; size?: 'sm' | 'fill' }) {
  const src = usePhoto(plant.photos.at(-1)?.id)
  return (
    <span className={`avatar avatar-${size}`}>
      {src ? <img src={src} alt="" /> : size === 'sm' ? <Mono text={plant.nickname} /> : <Placeholder kind={plant.kind} size={92} />}
    </span>
  )
}

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  return (
    <div className="segmented" role="tablist" style={{ ['--n' as string]: options.length, ['--i' as string]: index }}>
      <span className="segmented-thumb" />
      {options.map((o) => (
        <button key={o.value} role="tab" aria-selected={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Empty({ title, children, action }: { emoji?: string; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <BonsaiMark size={104} />
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}

export function Chip({ children, tone }: { children: ReactNode; tone?: 'good' | 'warn' | 'bad' | 'plain' }) {
  return <span className={`chip chip-${tone ?? 'plain'}`}>{children}</span>
}

export function Callout({ tone = 'tip', children }: { tone?: 'tip' | 'warn'; children: ReactNode }) {
  return <div className={`callout callout-${tone}`}>{children}</div>
}
