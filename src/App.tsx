import { Home, Leaf, ScanLine, Settings as Cog, TreePine } from 'lucide-react'
import { useEffect } from 'react'
import { Toast } from './components/ui'
import { navigate, useRoute } from './lib/router'
import { useStore } from './lib/store'
import { fetchWeather } from './lib/weather'
import { Advice } from './screens/Advice'
import { Bonsai } from './screens/Bonsai'
import { StyleGuide, TechniqueGuide } from './screens/Guides'
import { PlantDetail } from './screens/PlantDetail'
import { Plants } from './screens/Plants'
import { Result } from './screens/Result'
import { Scan } from './screens/Scan'
import { Settings } from './screens/Settings'
import { Today } from './screens/Today'

const TABS = [
  { path: '/', label: 'Today', icon: Home },
  { path: '/plants', label: 'Plants', icon: Leaf },
  { path: '/bonsai', label: 'Bonsai', icon: TreePine },
  { path: '/settings', label: 'Settings', icon: Cog },
]

function useWeatherRefresh() {
  const place = useStore((s) => s.settings.place)
  const ready = useStore((s) => s.ready)
  useEffect(() => {
    if (!ready || !place) return
    const refresh = () => {
      const { weather, setWeather } = useStore.getState()
      if (document.visibilityState !== 'visible') return
      if (weather && Date.now() - weather.fetchedAt < 45 * 60_000) return
      fetchWeather(place).then(setWeather, () => {})
    }
    refresh()
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [place, ready])
}

export default function App() {
  const route = useRoute()
  const ready = useStore((s) => s.ready)
  useWeatherRefresh()

  if (!ready) return <div className="boot">🌿</div>

  const [a, b] = route.parts
  const isTab = TABS.some((t) => t.path === route.path)
  let screen
  if (route.path === '/') screen = <Today />
  else if (a === 'plants') screen = <Plants />
  else if (a === 'bonsai') screen = <Bonsai view={route.query.get('view')} />
  else if (a === 'settings') screen = <Settings />
  else if (a === 'scan') screen = <Scan initialMode={route.query.get('mode') === 'bonsai' ? 'bonsai' : 'plant'} />
  else if (a === 'result') screen = <Result />
  else if (a === 'plant' && b) screen = <PlantDetail key={b} id={b} />
  else if (a === 'advice' && b) screen = <Advice id={b} mode={route.query.get('mode') === 'styling' ? 'styling' : 'health'} />
  else if (a === 'style' && b) screen = <StyleGuide id={b} />
  else if (a === 'technique' && b) screen = <TechniqueGuide id={b} />
  else screen = <Today />

  const scanMode = route.path === '/bonsai' ? 'bonsai' : 'plant'

  return (
    <div className="app">
      <main className="stage" key={route.path}>
        {screen}
      </main>
      {isTab && (
        <nav className="tabbar" aria-label="Main">
          {TABS.slice(0, 2).map((t) => (
            <TabButton key={t.path} {...t} active={route.path === t.path} />
          ))}
          <button className="tab-scan" aria-label="Scan a plant" onClick={() => navigate(`/scan?mode=${scanMode}`)}>
            <ScanLine />
          </button>
          {TABS.slice(2).map((t) => (
            <TabButton key={t.path} {...t} active={route.path === t.path} />
          ))}
        </nav>
      )}
      <Toast />
    </div>
  )
}

function TabButton({ path, label, icon: Icon, active }: (typeof TABS)[number] & { active: boolean }) {
  return (
    <button className={`tab ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => navigate(path, { replace: true })}>
      <Icon />
      <span>{label}</span>
    </button>
  )
}
