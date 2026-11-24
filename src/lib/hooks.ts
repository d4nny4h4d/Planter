import { useMemo } from 'react'
import { seasonFor, type CareContext } from './care'
import { useStore } from './store'

export function useCareContext(): CareContext {
  const lat = useStore((s) => s.settings.place?.lat)
  const weather = useStore((s) => s.weather)
  return useMemo(() => ({ season: seasonFor(new Date(), lat), weather }), [lat, weather])
}
