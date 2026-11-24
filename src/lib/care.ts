import type { CareAction, HeatBand, Plant, Season, Spot, Weather } from './types'
import { DAY, daysFromToday } from './util'

export interface CareContext {
  season: Season
  weather?: Weather
  /** Start-of-day timestamp; changes at midnight so due dates recompute */
  day?: number
}

export function seasonFor(date = new Date(), lat = 25): Season {
  const m = date.getMonth()
  const north: Season = m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter'
  if (lat >= 0) return north
  return ({ spring: 'autumn', summer: 'winter', autumn: 'spring', winter: 'summer' } as const)[north]
}

/** Pots dry faster in heat: scale the reference interval by today's forecast high. */
export function heatFactor(maxC: number | undefined) {
  if (maxC != null) maxC = Math.round(maxC)
  if (maxC == null) return 1
  if (maxC >= 40) return 0.45
  if (maxC >= 35) return 0.6
  if (maxC >= 30) return 0.75
  if (maxC >= 26) return 0.9
  if (maxC <= 10) return 1.4
  return 1
}

export function baseWaterInterval(plant: Plant, season: Season) {
  return plant.profile?.watering.intervalDays[season] ?? plant.bonsai?.watering.intervalDays[season] ?? 7
}

/** Reference interval adjusted for where the plant lives and today's heat. */
export function adjustedInterval(base: number, where: 'indoor' | 'outdoor', ctx: CareContext) {
  const factor = where === 'outdoor' ? heatFactor(drivingHigh(ctx.weather)) : 1
  return Math.max(1, Math.round(base * factor))
}

/** The high that drives watering: the mean of the next three days, so one odd day does not flip the schedule. */
export function drivingHigh(weather: Weather | undefined) {
  if (!weather) return undefined
  const next = weather.highs?.slice(0, 3).filter((n) => typeof n === 'number')
  return next?.length ? next.reduce((a, b) => a + b, 0) / next.length : weather.maxC
}

export function heatBand(ctx: CareContext): HeatBand {
  const high = drivingHigh(ctx.weather)
  if (high == null) return ctx.season === 'summer' ? 'hot' : ctx.season === 'winter' ? 'cool' : 'mild'
  return high >= 38 ? 'extreme' : high >= 30 ? 'hot' : high >= 20 ? 'mild' : 'cool'
}

export const BAND_LABEL: Record<HeatBand, [string, string]> = {
  cool: ['Cool', 'under 20°'],
  mild: ['Mild', '20–29°'],
  hot: ['Hot', '30–37°'],
  extreme: ['Extreme', '38°+'],
}

export const spotKey = (where: string, spot: Spot | undefined) => JSON.stringify([where, spot ?? {}])

/** Why a plan should be rewritten, or undefined while it still fits. */
export function planStale(plant: Plant, ctx: CareContext, place: string | undefined) {
  const plan = plant.plan
  if (!plan) return undefined
  if (plan.basis.spotKey !== spotKey(plant.where, plant.spot)) return 'its spot changed'
  if (plan.basis.season !== ctx.season) return `it is now ${ctx.season}`
  if (place && plan.basis.place !== place) return 'your location changed'
  if (Date.now() - plan.createdAt > 30 * DAY) return 'it is over a month old'
  return undefined
}

export function waterInterval(plant: Plant, ctx: CareContext) {
  if (plant.waterEveryDays) return plant.waterEveryDays
  const planned = plant.plan?.watering.everyDays[heatBand(ctx)]
  if (planned && planned > 0) return Math.max(1, Math.round(planned))
  return adjustedInterval(baseWaterInterval(plant, ctx.season), plant.where, ctx)
}

/** Days between feeds, or null when the plant should not be fed this season. */
export function feedInterval(plant: Plant, ctx: CareContext) {
  if (plant.feedEveryDays) return plant.feedEveryDays
  if (plant.plan) return plant.plan.feeding.everyWeeks > 0 ? Math.max(7, Math.round(plant.plan.feeding.everyWeeks * 7)) : null
  // Skip winter feeding, except where winters stay warm enough for growth (the Gulf's main growing season).
  if (ctx.season === 'winter' && !(ctx.weather && ctx.weather.maxC >= 20)) return null
  const weeks = plant.profile?.fertilizer.intervalWeeks ?? plant.bonsai?.fertilizing.intervalWeeks
  return weeks ? Math.max(7, Math.round(weeks * 7)) : null
}

export function lastEvent(plant: Plant, action: CareAction) {
  let best: Plant['log'][number] | undefined
  for (const e of plant.log) if (e.action === action && (!best || e.at > best.at)) best = e
  return best
}

export interface Task {
  key: string
  /** A reminder to inspect rather than a job that is simply done */
  check?: boolean
  plantId: string
  /** What gets logged when the task is ticked off */
  action: CareAction
  label: string
  dueAt: number
  /** Calendar days until due; negative = overdue */
  inDays: number
}

export const ACTION_LABEL: Record<CareAction, string> = {
  water: 'Water',
  fertilize: 'Feed',
  mist: 'Mist',
  rotate: 'Rotate',
  prune: 'Prune',
  wire: 'Wire',
  unwire: 'Remove wire',
  repot: 'Repot',
  note: 'Note',
}

export const ACTION_PAST: Record<CareAction, string> = {
  water: 'Watered',
  fertilize: 'Fed',
  mist: 'Misted',
  rotate: 'Rotated',
  prune: 'Pruned',
  wire: 'Wired',
  unwire: 'Wire removed',
  repot: 'Repotted',
  note: 'Note',
}

export function tasksFor(plant: Plant, ctx: CareContext): Task[] {
  const out: Task[] = []
  const push = (action: CareAction, label: string, dueAt: number, check = false) => {
    const due = Math.max(dueAt, plant.snooze?.[action] ?? 0)
    out.push({ key: `${plant.id}:${action}`, plantId: plant.id, action, label, dueAt: due, inDays: daysFromToday(due), check })
  }
  const since = (action: CareAction) => lastEvent(plant, action)?.at ?? plant.addedAt

  push('water', 'Water', since('water') + waterInterval(plant, ctx) * DAY)

  const feed = feedInterval(plant, ctx)
  if (feed) push('fertilize', 'Feed', since('fertilize') + feed * DAY)

  if (plant.kind === 'plant' && plant.where === 'indoor') push('rotate', 'Rotate a quarter turn', since('rotate') + 14 * DAY)

  if (plant.bonsai) {
    const wired = lastEvent(plant, 'wire')
    const unwired = lastEvent(plant, 'unwire')
    if (wired && (!unwired || unwired.at < wired.at)) {
      push('unwire', 'Check wire for biting in', wired.at + plant.bonsai.wiring.checkAfterWeeks * 7 * DAY, true)
    }
    push('repot', 'Repot', since('repot') + plant.bonsai.repotting.everyYears * 365 * DAY)
  }
  return out.sort((a, b) => a.dueAt - b.dueAt)
}

export function isWired(plant: Plant) {
  const wired = lastEvent(plant, 'wire')
  const unwired = lastEvent(plant, 'unwire')
  return !!wired && (!unwired || unwired.at < wired.at)
}

export function speciesName(plant: Plant) {
  return plant.profile?.commonName ?? plant.bonsai?.commonName ?? 'Plant'
}

export function scientificName(plant: Plant) {
  return plant.profile?.scientificName ?? plant.bonsai?.scientificName ?? ''
}
