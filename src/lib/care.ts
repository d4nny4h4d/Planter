import type { CareAction, Plant, Season, Weather } from './types'
import { DAY, daysFromToday } from './util'

export interface CareContext {
  season: Season
  weather?: Weather
}

export function seasonFor(date = new Date(), lat = 25): Season {
  const m = date.getMonth()
  const north: Season = m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter'
  if (lat >= 0) return north
  return ({ spring: 'autumn', summer: 'winter', autumn: 'spring', winter: 'summer' } as const)[north]
}

/** Pots dry faster in heat: scale the reference interval by today's forecast high. */
export function heatFactor(maxC: number | undefined) {
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
  const factor = where === 'outdoor' ? heatFactor(ctx.weather?.maxC) : 1
  return Math.max(1, Math.round(base * factor))
}

export function waterInterval(plant: Plant, ctx: CareContext) {
  if (plant.waterEveryDays) return plant.waterEveryDays
  return adjustedInterval(baseWaterInterval(plant, ctx.season), plant.where, ctx)
}

/** Days between feeds, or null when the plant should not be fed this season. */
export function feedInterval(plant: Plant, ctx: CareContext) {
  if (plant.feedEveryDays) return plant.feedEveryDays
  if (ctx.season === 'winter') return null
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
  const push = (action: CareAction, label: string, dueAt: number) => {
    const due = Math.max(dueAt, plant.snooze?.[action] ?? 0)
    out.push({ key: `${plant.id}:${action}`, plantId: plant.id, action, label, dueAt: due, inDays: daysFromToday(due) })
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
      push('unwire', 'Check wire for biting in', wired.at + plant.bonsai.wiring.checkAfterWeeks * 7 * DAY)
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
