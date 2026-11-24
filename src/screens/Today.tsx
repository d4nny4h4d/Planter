import { CloudSun, MapPin, ScanLine } from 'lucide-react'
import { useMemo } from 'react'
import { TaskRow } from '../components/TaskRow'
import { Empty, Screen } from '../components/ui'
import { tasksFor, type Task } from '../lib/care'
import { useCareContext } from '../lib/hooks'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import { cap, temp } from '../lib/util'

function greeting() {
  const h = new Date().getHours()
  return h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export function Today() {
  const plants = useStore((s) => s.plants)
  const settings = useStore((s) => s.settings)
  const ctx = useCareContext()

  const { overdue, today, soon } = useMemo(() => {
    const all = plants.flatMap((p) => tasksFor(p, ctx)).sort((a, b) => a.dueAt - b.dueAt)
    return {
      overdue: all.filter((t) => t.inDays < 0),
      today: all.filter((t) => t.inDays === 0),
      soon: all.filter((t) => t.inDays > 0 && t.inDays <= 7),
    }
  }, [plants, ctx])

  const byId = useMemo(() => new Map(plants.map((p) => [p.id, p])), [plants])
  const dueNow = overdue.length + today.length
  const trees = plants.filter((p) => p.bonsai)
  const hot = ctx.weather && ctx.weather.maxC >= 38

  const group = (title: string, tasks: Task[]) =>
    tasks.length > 0 && (
      <section className="group">
        <h2 className="group-title">
          {title} <span>{tasks.length}</span>
        </h2>
        <div className="card list">
          {tasks.map((t) => (
            <TaskRow key={t.key} task={t} plant={byId.get(t.plantId)!} />
          ))}
        </div>
      </section>
    )

  return (
    <Screen id="/" tab>
      <header className="hero-head">
        <p className="eyebrow">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1>{greeting()}</h1>
        <button className="weather-pill" onClick={() => navigate('/settings')}>
          {settings.place ? (
            <>
              <MapPin size={15} /> {settings.place.name}
              {ctx.weather && (
                <>
                  <span className="dot" />
                  <CloudSun size={15} /> {temp(ctx.weather.tempC, settings.units)} · {ctx.weather.humidity}%
                </>
              )}
              <span className="dot" /> {cap(ctx.season)}
            </>
          ) : (
            <>
              <MapPin size={15} /> Set location for local care advice
            </>
          )}
        </button>
      </header>

      {plants.length === 0 ? (
        <Empty
          emoji="🪴"
          title="Start your collection"
          action={
            <div className="stack">
              <button className="btn primary" onClick={() => navigate('/scan')}>
                <ScanLine /> Scan a plant
              </button>
              <button className="btn" onClick={() => navigate('/plants', { replace: true })}>
                Browse the plant library
              </button>
            </div>
          }
        >
          Point the camera at a plant to identify it and get a full care sheet, or pick one from the library.
        </Empty>
      ) : (
        <>
          <div className="summary card">
            <div className="summary-num">{dueNow}</div>
            <div>
              <b>{dueNow === 0 ? 'All caught up' : dueNow === 1 ? 'task needs you today' : 'tasks need you today'}</b>
              <p className="muted small">
                {plants.length} {plants.length === 1 ? 'plant' : 'plants'} in your care
                {soon.length > 0 ? ` · ${soon.length} more this week` : ''}
              </p>
            </div>
          </div>

          {hot && (
            <div className="callout callout-warn">
              <b>Heat alert:</b> {temp(ctx.weather!.maxC, settings.units)} today. Outdoor pots dry fast, so watering intervals are shortened. Water early morning or after sunset.
            </div>
          )}

          {group('Overdue', overdue)}
          {group('Today', today)}
          {group('Coming up', soon)}

          {trees.length > 0 && (
            <section className="group">
              <h2 className="group-title">{cap(ctx.season)} bonsai work</h2>
              <div className="card pad">
                {trees.slice(0, 4).map((t) => (
                  <button key={t.id} className="season-tree" onClick={() => navigate(`/plant/${t.id}`)}>
                    <b>{t.nickname}</b>
                    <ul className="bullets">
                      {t.bonsai!.calendar[ctx.season].slice(0, 3).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Screen>
  )
}
