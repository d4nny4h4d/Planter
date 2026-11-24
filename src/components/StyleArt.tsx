/** Small line drawings of each classic bonsai style. */
const ART: Record<string, { trunk: string; pads: [number, number, number, number][]; pot?: [number, number]; extra?: string }> = {
  'formal-upright': { trunk: 'M50 82 L50 20', pads: [[50, 22, 12, 7], [36, 40, 14, 7], [64, 52, 16, 7], [34, 62, 13, 6]] },
  'informal-upright': { trunk: 'M48 82 C40 66 62 58 52 44 C46 34 56 28 52 18', pads: [[52, 20, 13, 7], [36, 42, 13, 6], [68, 52, 14, 6], [38, 62, 11, 5]] },
  slanting: { trunk: 'M38 82 L66 24', pads: [[68, 24, 13, 7], [42, 44, 12, 6], [74, 48, 12, 6]] },
  cascade: { trunk: 'M46 46 C56 30 70 40 70 56 C70 74 80 82 82 94', pads: [[52, 34, 10, 5], [74, 60, 10, 5], [80, 78, 10, 5], [84, 94, 9, 5]], pot: [46, 46] },
  'semi-cascade': { trunk: 'M42 62 C46 44 62 46 72 54 C80 60 86 62 92 64', pads: [[48, 46, 11, 6], [72, 52, 11, 5], [90, 64, 10, 5]], pot: [42, 62] },
  literati: { trunk: 'M46 82 C42 60 58 50 52 34 C50 26 58 22 64 16', pads: [[66, 16, 10, 5], [56, 30, 8, 4]] },
  broom: { trunk: 'M50 82 L50 52 M50 52 L36 32 M50 52 L50 28 M50 52 L64 32 M50 58 L42 40 M50 58 L58 40', pads: [[50, 30, 24, 14]] },
  windswept: { trunk: 'M36 82 C40 62 50 50 70 40', pads: [[78, 36, 14, 5], [70, 50, 14, 5], [60, 60, 12, 4]] },
  forest: { trunk: 'M50 82 L50 22 M32 82 L32 40 M66 82 L66 36 M20 82 L20 54 M80 82 L80 52', pads: [[50, 26, 10, 10], [32, 44, 8, 8], [66, 40, 8, 8], [20, 56, 6, 6], [80, 54, 6, 6]] },
  'root-over-rock': { trunk: 'M50 58 C46 44 56 36 52 22 M50 58 L40 82 M50 58 L52 82 M50 58 L62 82', pads: [[52, 24, 13, 7], [38, 40, 11, 5], [66, 44, 11, 5]], extra: 'M36 82 Q38 62 50 60 Q64 62 66 82 Z' },
}

export function StyleArt({ id, size = 72 }: { id: string; size?: number }) {
  const art = ART[id]
  if (!art) return null
  const [px, py] = art.pot ?? [50, 82]
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="style-art" aria-hidden="true">
      {art.extra && <path d={art.extra} className="rock" />}
      {art.pads.map(([cx, cy, rx, ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} className="pad" />
      ))}
      <path d={art.trunk} className="trunk" />
      <rect x={px - 22} y={py} width="44" height="9" rx="2.5" className="pot" />
    </svg>
  )
}
