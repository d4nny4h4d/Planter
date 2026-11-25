/** Line art used wherever there is no photo. Colours come from CSS so both themes work. */

export function BonsaiMark({ size = 96 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="art" aria-hidden="true">
      <g className="art-leaf">
        <ellipse cx="74" cy="26" rx="22" ry="10" />
        <ellipse cx="42" cy="44" rx="20" ry="8.5" />
        <ellipse cx="88" cy="54" rx="16" ry="7" />
        <ellipse cx="58" cy="15" rx="12" ry="6" />
      </g>
      <path className="art-trunk" d="M56 92c-2-12 6-18 2-28-3-8-10-10-14-14m18 20c6-6 16-6 22-12M60 60c2-12 10-18 12-28" />
      <path className="art-pot" d="M30 92h60l-5 12a4 4 0 0 1-4 3H39a4 4 0 0 1-4-3z" />
      <path className="art-line" d="M24 92h72" />
    </svg>
  )
}

export function Sprig({ size = 96 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="art" aria-hidden="true">
      <path className="art-trunk thin" d="M60 92V40" />
      <g className="art-leaf">
        <path d="M60 44c-2-16 6-26 20-30 2 16-6 26-20 30z" />
        <path d="M60 58c-16 0-26-8-28-22 16-1 26 8 28 22z" />
        <path d="M60 74c2-14 12-21 26-20-2 14-12 21-26 20z" />
      </g>
      <path className="art-pot" d="M38 92h44l-4 12a4 4 0 0 1-4 3H46a4 4 0 0 1-4-3z" />
      <path className="art-line" d="M32 92h56" />
    </svg>
  )
}

/** A brushed circle, left open, as in ink painting. */
export function Enso({ size = 72, children }: { size?: number; children?: React.ReactNode }) {
  return (
    <span className="enso" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M71 13C48 2 19 13 10 38c-9 26 6 53 33 57 27 4 49-17 48-42-1-15-8-26-17-33" />
      </svg>
      <span>{children}</span>
    </span>
  )
}

export function Mono({ text }: { text: string }) {
  return <span className="mono">{(text.trim()[0] ?? '·').toUpperCase()}</span>
}

export function Placeholder({ kind, size }: { kind: 'plant' | 'bonsai'; size?: number }) {
  return kind === 'bonsai' ? <BonsaiMark size={size} /> : <Sprig size={size} />
}
