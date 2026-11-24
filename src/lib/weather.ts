import type { Place, Weather } from './types'

export async function fetchWeather(place: Place): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}` +
    `&current=temperature_2m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather service unavailable')
  const j = await res.json()
  return {
    tempC: j.current.temperature_2m,
    maxC: j.daily?.temperature_2m_max?.[0] ?? j.current.temperature_2m,
    humidity: j.current.relative_humidity_2m,
    highs: j.daily?.temperature_2m_max,
    lows: j.daily?.temperature_2m_min,
    fetchedAt: Date.now(),
  }
}

export async function searchPlaces(query: string): Promise<Place[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en`,
  )
  if (!res.ok) throw new Error('Place search unavailable')
  const j = await res.json()
  return (j.results ?? []).map((r: { name: string; country?: string; latitude: number; longitude: number }) => ({
    name: r.country ? `${r.name}, ${r.country}` : r.name,
    lat: r.latitude,
    lon: r.longitude,
  }))
}

/** Ask the device for its position. The coordinates stay on the device apart from the weather lookup. */
export function locate(): Promise<Place> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Location is not available on this device'))
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = +pos.coords.latitude.toFixed(2)
        const lon = +pos.coords.longitude.toFixed(2)
        let name = 'My location'
        try {
          const r = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          )
          const j = await r.json()
          name = j.city || j.locality || j.principalSubdivision || name
        } catch {
          /* name is cosmetic */
        }
        resolve({ name, lat, lon })
      },
      (err) => reject(new Error(err.code === err.PERMISSION_DENIED ? 'Location permission was denied' : 'Could not get your location')),
      { timeout: 10_000, maximumAge: 3_600_000 },
    )
  })
}
