import { Bug, Droplets, FlaskConical, Layers, MapPin, Scissors, ShieldAlert, Sprout, Sun, Thermometer, TreePine, Waves, Wind, CalendarDays, Cable, Shovel, Flame } from 'lucide-react'
import { BONSAI_STYLES } from '../data/bonsai'
import { adjustedInterval, drivingHigh, type CareContext } from '../lib/care'
import { useCareContext } from '../lib/hooks'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { BonsaiProfile, CareProfile, Problem, Season } from '../lib/types'
import { cap, everyLabel, temp } from '../lib/util'
import { Callout, Chip, MixChart, RangeBar, Section } from './ui'

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

function SeasonGrid({ intervalDays, season }: { intervalDays: Record<Season, number>; season: Season }) {
  return (
    <div className="season-grid">
      {SEASONS.map((s) => (
        <div key={s} className={`season-cell ${s === season ? 'current' : ''}`}>
          <span>{cap(s)}</span>
          <b>{intervalDays[s]}d</b>
        </div>
      ))}
    </div>
  )
}

function WateringBlock({ intervalDays, where, ctx, planned }: { intervalDays: Record<Season, number>; where: 'indoor' | 'outdoor'; ctx: CareContext; planned?: boolean }) {
  const place = useStore((s) => s.settings.place)
  const units = useStore((s) => s.settings.units)
  const base = intervalDays[ctx.season]
  const now = adjustedInterval(base, where, ctx)
  const adjusted = now !== base
  if (planned)
    return (
      <>
        <p className="muted small">Typical for the species, by season. Your personal plan above sets this plant’s actual schedule.</p>
        <SeasonGrid intervalDays={intervalDays} season={ctx.season} />
      </>
    )
  return (
    <>
      <div className="where-row">
        <MapPin size={16} />
        {place ? (
          <>
            <span>{place.name}</span>
            {ctx.weather && <b>{temp(ctx.weather.tempC, units)}</b>}
          </>
        ) : (
          <button className="link" onClick={() => navigate('/settings')}>
            Set your location for weather-adjusted watering
          </button>
        )}
      </div>
      <p className="muted small">
        {place ? `For a plant kept ${where}s in ${cap(ctx.season)}, water` : `In ${ctx.season}, water`}
      </p>
      <div className="big-fact">{everyLabel(now)}</div>
      <p className="muted small">
        About every {now} {now === 1 ? 'day' : 'days'}
        {adjusted && ctx.weather ? ` — adjusted from ${base} for highs around ${temp(drivingHigh(ctx.weather) ?? ctx.weather.maxC, units)}.` : '.'} Check the soil first; this is a starting point.
      </p>
      <SeasonGrid intervalDays={intervalDays} season={ctx.season} />
    </>
  )
}

function Problems({ items }: { items: Problem[] }) {
  return (
    <div className="problems">
      {items.map((p) => (
        <div key={p.name} className="problem">
          <h4>{p.name}</h4>
          <p>
            <span className="tag">Signs</span> {p.signs}
          </p>
          <p>
            <span className="tag">Fix</span> {p.fix}
          </p>
        </div>
      ))}
    </div>
  )
}

function TempBlock({ idealMinC, idealMaxC, hardinessMinC }: { idealMinC: number; idealMaxC: number; hardinessMinC: number }) {
  const units = useStore((s) => s.settings.units)
  const weather = useStore((s) => s.weather)
  return (
    <>
      <RangeBar min={-5} max={48} lo={idealMinC} hi={idealMaxC} tone="warm" marker={weather?.tempC} label={`${temp(idealMinC, units)} – ${temp(idealMaxC, units)}`} />
      <p className="muted small">
        Ideal range{weather ? ' · the dot is the temperature outside now' : ''}. Protect below {temp(hardinessMinC, units)}.
      </p>
    </>
  )
}

export function CareSheet({ profile, where, planned }: { profile: CareProfile; where: 'indoor' | 'outdoor'; planned?: boolean }) {
  const ctx = useCareContext()
  const p = profile
  return (
    <div className="sheet-stack">
      <Section icon={<Droplets />} title="Watering" hint={p.watering.summary}>
        <WateringBlock intervalDays={p.watering.intervalDays} where={where} ctx={ctx} planned={planned} />
        <p>{p.watering.detail}</p>
      </Section>

      <Section icon={<Thermometer />} title="Temperature" hint={p.temperature.label}>
        <TempBlock {...p.temperature} />
        <p>{p.temperature.detail}</p>
      </Section>

      <Section icon={<Sun />} title="Sunlight" hint={cap(p.sunlight.level)}>
        <div className="big-fact">{p.sunlight.hours}</div>
        <p>{p.sunlight.detail}</p>
        <Callout>{p.sunlight.tip}</Callout>
      </Section>

      <Section icon={<FlaskConical />} title="Fertilizer" hint={p.fertilizer.summary}>
        <div className="fact-row">
          <div>
            <span className="muted small">NPK</span>
            <b>{p.fertilizer.npk}</b>
          </div>
          <div>
            <span className="muted small">In season</span>
            <b>every {p.fertilizer.intervalWeeks} wk</b>
          </div>
        </div>
        <p>{p.fertilizer.detail}</p>
        <h4>How much</h4>
        <p>{p.fertilizer.amount}</p>
      </Section>

      <Section icon={<Layers />} title="Soil" hint={p.soil.summary}>
        <p>{p.soil.detail}</p>
        <h4>Ideal mix</h4>
        <MixChart mix={p.soil.mix} />
        {p.soil.alternatives.length > 0 && (
          <>
            <h4>Also works</h4>
            <div className="chips">
              {p.soil.alternatives.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          </>
        )}
        <h4>Soil pH</h4>
        <RangeBar min={4} max={9} lo={p.soil.phMin} hi={p.soil.phMax} label={`pH ${p.soil.phMin} – ${p.soil.phMax}`} />
      </Section>

      <Section icon={<Wind />} title="Humidity" hint={`Prefers ${p.humidity.level} humidity`}>
        <RangeBar min={0} max={100} lo={p.humidity.minPct} hi={p.humidity.maxPct} tone="blue" marker={ctx.weather?.humidity} label={`${p.humidity.minPct}% – ${p.humidity.maxPct}%`} />
        <p>{p.humidity.detail}</p>
        <Callout>{p.humidity.tip}</Callout>
      </Section>

      <Section icon={<Scissors />} title="Pruning" hint={p.pruning.bestTime} defaultOpen={false}>
        <p>{p.pruning.detail}</p>
      </Section>

      <Section icon={<Sprout />} title="Propagation" hint={p.propagation.methods.map(cap).join(' · ')} defaultOpen={false}>
        <p>{p.propagation.detail}</p>
      </Section>

      {p.problems.length > 0 && (
        <Section icon={<Bug />} title="Common problems" hint={p.problems.map((x) => x.name).join(' · ')} defaultOpen={false}>
          <Problems items={p.problems} />
        </Section>
      )}

      <Section icon={<ShieldAlert />} title="Safety & more" hint={p.toxicity.pets || p.toxicity.humans ? 'Toxic if eaten' : 'Non-toxic'}>
        <div className="chips">
          <Chip tone={p.toxicity.pets ? 'bad' : 'good'}>{p.toxicity.pets ? 'Toxic to pets' : 'Pet safe'}</Chip>
          <Chip tone={p.toxicity.humans ? 'bad' : 'good'}>{p.toxicity.humans ? 'Toxic to people' : 'Safe for people'}</Chip>
        </div>
        <p>{p.toxicity.detail}</p>
        {p.precautions.length > 0 && (
          <>
            <h4>Precautions</h4>
            <ul className="bullets">
              {p.precautions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </>
        )}
        {p.uses && (
          <>
            <h4>Traditional uses</h4>
            <p>{p.uses}</p>
            <p className="muted small">For interest only, not medical advice.</p>
          </>
        )}
      </Section>
    </div>
  )
}

export function BonsaiSheet({ profile, where, planned }: { profile: BonsaiProfile; where: 'indoor' | 'outdoor'; planned?: boolean }) {
  const ctx = useCareContext()
  const p = profile
  const styles = BONSAI_STYLES.filter((s) => p.styles.includes(s.id))
  return (
    <div className="sheet-stack">
      <Section icon={<CalendarDays />} title="Seasonal calendar" hint={`Now: ${cap(ctx.season)}`}>
        {SEASONS.map((s) => (
          <div key={s} className={`cal-row ${s === ctx.season ? 'current' : ''}`}>
            <h4>{cap(s)}</h4>
            <ul className="bullets">
              {p.calendar[s].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section icon={<Sun />} title="Placement" hint={p.indoorSuitable ? 'Indoor or outdoor' : 'Outdoor tree'}>
        <p>{p.placement}</p>
        <Callout tone="warn">
          <Flame size={16} /> <b>Hot climates:</b> {p.hotClimateNote}
        </Callout>
      </Section>

      <Section icon={<Droplets />} title="Watering" hint="Never on a fixed timetable">
        <WateringBlock intervalDays={p.watering.intervalDays} where={where} ctx={ctx} planned={planned} />
        <p>{p.watering.detail}</p>
      </Section>

      <Section icon={<FlaskConical />} title="Feeding" hint={`Every ${p.fertilizing.intervalWeeks} weeks in growth`}>
        <p>{p.fertilizing.detail}</p>
      </Section>

      <Section icon={<Scissors />} title="Pruning">
        <h4>Structural</h4>
        <p>{p.pruning.structural}</p>
        <h4>Maintenance</h4>
        <p>{p.pruning.maintenance}</p>
      </Section>

      <Section icon={<Cable />} title="Wiring" hint={p.wiring.bestTime}>
        <p>{p.wiring.detail}</p>
        <Callout>Check the wire after about {p.wiring.checkAfterWeeks} weeks. Log “Wire” on the tree and the app reminds you.</Callout>
      </Section>

      <Section icon={<Shovel />} title="Repotting & soil" hint={`Every ${p.repotting.everyYears} ${p.repotting.everyYears === 1 ? 'year' : 'years'} · ${p.repotting.bestTime}`}>
        <p>{p.repotting.detail}</p>
        <h4>Soil mix</h4>
        <MixChart mix={p.repotting.soilMix} />
      </Section>

      <Section icon={<Thermometer />} title="Temperature" defaultOpen={false}>
        <TempBlock {...p.temperature} />
        <p>{p.temperature.detail}</p>
      </Section>

      {styles.length > 0 && (
        <Section icon={<TreePine />} title="Suitable styles" hint={styles.map((s) => s.name).join(' · ')} defaultOpen={false}>
          <div className="link-list">
            {styles.map((s) => (
              <button key={s.id} onClick={() => navigate(`/style/${s.id}`)}>
                <b>{s.name}</b>
                <span className="muted">{s.japanese}</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section icon={<Waves />} title="Propagation" defaultOpen={false}>
        <p>{p.propagation}</p>
      </Section>

      {p.problems.length > 0 && (
        <Section icon={<Bug />} title="Pests & problems" hint={p.problems.map((x) => x.name).join(' · ')} defaultOpen={false}>
          <Problems items={p.problems} />
        </Section>
      )}

      <Section icon={<ShieldAlert />} title="Safety" defaultOpen={false}>
        <p>{p.toxicity}</p>
      </Section>
    </div>
  )
}
