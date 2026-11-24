export const DAY = 86_400_000

export const uid = () =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)

export function startOfDay(t: number | Date = Date.now()) {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/** Whole calendar days from today to t (negative = past) */
export function daysFromToday(t: number) {
  return Math.round((startOfDay(t) - startOfDay()) / DAY)
}

export function relativeDay(t: number) {
  const d = daysFromToday(t)
  if (d === 0) return 'today'
  if (d === 1) return 'tomorrow'
  if (d === -1) return 'yesterday'
  if (d < 0) return `${-d} days ago`
  if (d < 14) return `in ${d} days`
  if (d < 60) return `in ${Math.round(d / 7)} weeks`
  if (d < 365) return `in ${Math.round(d / 30)} months`
  return `in ${(d / 365).toFixed(1).replace('.0', '')} years`
}

export function formatDate(t: number) {
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export function everyLabel(days: number) {
  if (days <= 1) return 'Every day'
  if (days === 2) return 'Every other day'
  if (days <= 4) return 'Twice a week'
  if (days <= 8) return 'Once a week'
  if (days <= 11) return 'Every 10 days'
  if (days <= 17) return 'Twice a month'
  if (days <= 24) return 'Every 3 weeks'
  if (days <= 45) return 'Once a month'
  return `Every ${Math.round(days / 30)} months`
}

export function temp(c: number, units: 'C' | 'F') {
  return units === 'F' ? `${Math.round((c * 9) / 5 + 32)}°F` : `${Math.round(c)}°C`
}

export const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)
