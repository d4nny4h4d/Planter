import { useEffect, useMemo, useState } from 'react'
import { seasonFor, type CareContext } from './care'
import { useStore } from './store'
import { DAY, startOfDay } from './util'

/** Today's date as a start-of-day timestamp, refreshed when the app comes back to the foreground. */
export function useToday() {
  const [day, setDay] = useState(() => startOfDay())
  useEffect(() => {
    const check = () => setDay(startOfDay())
    document.addEventListener('visibilitychange', check)
    const timer = setInterval(check, 60_000)
    return () => {
      document.removeEventListener('visibilitychange', check)
      clearInterval(timer)
    }
  }, [])
  return day
}

export function useCareContext(): CareContext {
  const lat = useStore((s) => s.settings.place?.lat)
  const weather = useStore((s) => s.weather)
  const day = useToday()
  return useMemo(() => {
    // A reading from days ago says nothing about today's heat.
    const fresh = weather && day - weather.fetchedAt < 2 * DAY ? weather : undefined
    return { season: seasonFor(new Date(day), lat), weather: fresh, day }
  }, [lat, weather, day])
}
