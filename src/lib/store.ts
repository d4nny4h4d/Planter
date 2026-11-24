import { get, set } from 'idb-keyval'
import { create } from 'zustand'
import { deletePhoto } from './image'
import type { BonsaiProfile, CareAction, CareEvent, CareProfile, Plant, Settings, Weather } from './types'
import { uid } from './util'

const KEY = 'planter-state-v1'

/** An identification that has not been saved to the collection yet. */
export interface Draft {
  kind: 'plant' | 'bonsai'
  photo?: string
  profile?: CareProfile
  bonsai?: BonsaiProfile
  confidence?: 'high' | 'medium' | 'low'
  reasoning?: string
  alternatives?: { commonName: string; scientificName: string }[]
  suggestedStyle?: string
  emoji?: string
}

interface Persisted {
  plants: Plant[]
  settings: Settings
  weather?: Weather
}

interface State extends Persisted {
  ready: boolean
  /** Saved data could not be read; nothing is written until a retry succeeds */
  loadFailed: boolean
  draft?: Draft
  toast?: { id: number; text: string; undo?: () => void }
  hydrate: () => Promise<void>
  setDraft: (d?: Draft) => void
  addPlant: (p: Omit<Plant, 'id' | 'addedAt' | 'log' | 'notes' | 'photos'> & { photoId?: string }) => string
  updatePlant: (id: string, patch: Partial<Plant>) => void
  removePlant: (id: string) => void
  logCare: (plantId: string, action: CareAction, note?: string, at?: number) => string
  removeEvent: (plantId: string, eventId: string) => void
  snooze: (plantId: string, action: CareAction, until: number) => void
  setSettings: (patch: Partial<Settings>) => void
  setWeather: (w?: Weather) => void
  showToast: (text: string, undo?: () => void) => void
  clearToast: () => void
  replaceAll: (data: Persisted) => void
}

export const DEFAULT_MODEL = 'claude-opus-5-5'

const defaults: Persisted = {
  plants: [],
  settings: { apiKey: '', model: DEFAULT_MODEL, units: 'C' },
}

const mapPlant = (plants: Plant[], id: string, fn: (p: Plant) => Plant) => plants.map((p) => (p.id === id ? fn(p) : p))

export const useStore = create<State>((setState, getState) => ({
  ...defaults,
  ready: false,
  loadFailed: false,

  hydrate: async () => {
    try {
      const saved = await get<Persisted>(KEY)
      if (saved) setState({ plants: saved.plants ?? [], settings: { ...defaults.settings, ...saved.settings }, weather: saved.weather })
      setState({ ready: true, loadFailed: false })
    } catch {
      // Never mark ready here: an empty state would overwrite the saved collection on the next change.
      setState({ loadFailed: true })
    }
  },

  setDraft: (draft) => setState({ draft }),

  addPlant: ({ photoId, ...p }) => {
    const id = uid()
    const now = Date.now()
    const plant: Plant = { ...p, id, addedAt: now, log: [], notes: '', photos: photoId ? [{ id: photoId, at: now }] : [] }
    setState((s) => ({ plants: [plant, ...s.plants] }))
    return id
  },

  updatePlant: (id, patch) => setState((s) => ({ plants: mapPlant(s.plants, id, (p) => ({ ...p, ...patch })) })),

  removePlant: (id) => {
    const plant = getState().plants.find((p) => p.id === id)
    plant?.photos.forEach((ph) => void deletePhoto(ph.id))
    setState((s) => ({ plants: s.plants.filter((p) => p.id !== id) }))
  },

  logCare: (plantId, action, note, at = Date.now()) => {
    const event: CareEvent = { id: uid(), action, at, ...(note ? { note } : {}) }
    setState((s) => ({
      plants: mapPlant(s.plants, plantId, (p) => {
        const snooze = { ...p.snooze }
        delete snooze[action]
        return { ...p, log: [...p.log, event], snooze }
      }),
    }))
    return event.id
  },

  removeEvent: (plantId, eventId) =>
    setState((s) => ({ plants: mapPlant(s.plants, plantId, (p) => ({ ...p, log: p.log.filter((e) => e.id !== eventId) })) })),

  snooze: (plantId, action, until) =>
    setState((s) => ({ plants: mapPlant(s.plants, plantId, (p) => ({ ...p, snooze: { ...p.snooze, [action]: until } })) })),

  setSettings: (patch) => setState((s) => ({ settings: { ...s.settings, ...patch } })),
  setWeather: (weather) => setState({ weather }),

  showToast: (text, undo) => setState({ toast: { id: Date.now(), text, undo } }),
  clearToast: () => setState({ toast: undefined }),

  replaceAll: (data) => setState({ plants: data.plants ?? [], settings: { ...defaults.settings, ...data.settings }, weather: data.weather }),
}))

let timer: ReturnType<typeof setTimeout> | undefined
function persist() {
  const { plants, settings, weather, ready } = useStore.getState()
  if (!ready) return
  set(KEY, { plants, settings, weather } satisfies Persisted).catch(() =>
    useStore.getState().showToast('Could not save. Device storage may be full.'),
  )
}

useStore.subscribe((s, prev) => {
  if (s.plants === prev.plants && s.settings === prev.settings && s.weather === prev.weather) return
  clearTimeout(timer)
  timer = setTimeout(persist, 250)
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    clearTimeout(timer)
    persist()
  }
})
