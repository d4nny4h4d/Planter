import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'
import { BONSAI_STYLES } from '../data/bonsai'
import { seasonFor, spotKey } from './care'
import { base64Of } from './image'
import { useStore } from './store'
import type { Advice, BonsaiProfile, CareProfile, CarePlan, Plant } from './types'

const seasons = z.object({ spring: z.number(), summer: z.number(), autumn: z.number(), winter: z.number() })
const mix = z.array(z.object({ ingredient: z.string(), parts: z.number() }))
const problems = z.array(z.object({ name: z.string(), signs: z.string(), fix: z.string() }))
const difficulty = z.enum(['easy', 'moderate', 'demanding'])

const careProfile = z.object({
  commonName: z.string(),
  scientificName: z.string(),
  family: z.string(),
  otherNames: z.array(z.string()),
  description: z.string(),
  placement: z.enum(['indoor', 'outdoor', 'both']),
  difficulty,
  watering: z.object({ summary: z.string(), detail: z.string(), intervalDays: seasons }),
  temperature: z.object({
    label: z.string(),
    idealMinC: z.number(),
    idealMaxC: z.number(),
    hardinessMinC: z.number(),
    detail: z.string(),
  }),
  sunlight: z.object({
    level: z.enum(['full sun', 'partial sun', 'bright indirect', 'low light']),
    hours: z.string(),
    detail: z.string(),
    tip: z.string(),
  }),
  fertilizer: z.object({
    summary: z.string(),
    npk: z.string(),
    intervalWeeks: z.number(),
    detail: z.string(),
    amount: z.string(),
  }),
  soil: z.object({
    summary: z.string(),
    detail: z.string(),
    mix,
    phMin: z.number(),
    phMax: z.number(),
    alternatives: z.array(z.string()),
  }),
  humidity: z.object({
    level: z.enum(['low', 'medium', 'high']),
    minPct: z.number(),
    maxPct: z.number(),
    detail: z.string(),
    tip: z.string(),
  }),
  pruning: z.object({ bestTime: z.string(), detail: z.string() }),
  propagation: z.object({ methods: z.array(z.string()), detail: z.string() }),
  problems,
  toxicity: z.object({ pets: z.boolean(), humans: z.boolean(), detail: z.string() }),
  precautions: z.array(z.string()),
  uses: z.string(),
})

const bonsaiProfile = z.object({
  commonName: z.string(),
  scientificName: z.string(),
  category: z.enum(['conifer', 'deciduous', 'broadleaf evergreen', 'tropical', 'flowering']),
  indoorSuitable: z.boolean(),
  difficulty,
  description: z.string(),
  placement: z.string(),
  watering: z.object({ detail: z.string(), intervalDays: seasons }),
  fertilizing: z.object({ detail: z.string(), intervalWeeks: z.number() }),
  pruning: z.object({ structural: z.string(), maintenance: z.string() }),
  wiring: z.object({ detail: z.string(), bestTime: z.string(), checkAfterWeeks: z.number() }),
  repotting: z.object({ detail: z.string(), everyYears: z.number(), bestTime: z.string(), soilMix: mix }),
  temperature: z.object({
    idealMinC: z.number(),
    idealMaxC: z.number(),
    hardinessMinC: z.number(),
    detail: z.string(),
  }),
  propagation: z.string(),
  problems,
  styles: z.array(z.string()),
  calendar: z.object({
    spring: z.array(z.string()),
    summer: z.array(z.string()),
    autumn: z.array(z.string()),
    winter: z.array(z.string()),
  }),
  hotClimateNote: z.string(),
  toxicity: z.string(),
})

const identification = {
  found: z.boolean(),
  confidence: z.enum(['high', 'medium', 'low']),
  reasoning: z.string(),
  alternatives: z.array(z.object({ commonName: z.string(), scientificName: z.string() })),
  emoji: z.string(),
}

const plantResult = z.object({ ...identification, profile: careProfile.nullable() })
const bonsaiResult = z.object({ ...identification, suggestedStyle: z.string(), profile: bonsaiProfile.nullable() })

const advice = z.object({
  headline: z.string(),
  summary: z.string(),
  findings: z.array(
    z.object({ title: z.string(), severity: z.enum(['info', 'watch', 'act']), detail: z.string(), action: z.string() }),
  ),
})

const carePlan = z.object({
  headline: z.string(),
  watering: z.object({
    everyDays: z.object({ cool: z.number(), mild: z.number(), hot: z.number(), extreme: z.number() }),
    amount: z.string(),
    method: z.string(),
    bestTime: z.string(),
    why: z.string(),
  }),
  placement: z.object({ verdict: z.enum(['ideal', 'workable', 'move it']), advice: z.string() }),
  light: z.string(),
  climate: z.string(),
  humidity: z.string(),
  feeding: z.object({ everyWeeks: z.number(), advice: z.string() }),
  thisMonth: z.array(z.string()),
  watchFor: z.array(z.string()),
})

export class AiError extends Error {
  needsKey: boolean
  constructor(message: string, needsKey = false) {
    super(message)
    this.needsKey = needsKey
  }
}

export const MODELS = [
  { id: 'claude-opus-5-5', name: 'Claude Opus 5.5', note: 'Most accurate identification' },
  { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', note: 'Faster, about half the cost' },
  { id: 'claude-haiku-5-5', name: 'Claude Haiku 5.5', note: 'Fastest and cheapest' },
]

type ImageBlock = Anthropic.Beta.BetaImageBlockParam
type Content = Array<ImageBlock | Anthropic.Beta.BetaTextBlockParam>

const image = (dataUrl: string): ImageBlock => ({
  type: 'image',
  source: { type: 'base64', media_type: 'image/jpeg', data: base64Of(dataUrl) },
})

function situation() {
  const { settings, weather } = useStore.getState()
  const place = settings.place
  const now = new Date()
  const lines = [
    `Date: ${now.toLocaleDateString('en', { month: 'long', year: 'numeric' })} (${seasonFor(now, place?.lat)} by the calendar).`,
  ]
  if (place) lines.push(`Grower's location: ${place.name} (latitude ${place.lat}).`)
  if (weather) {
    lines.push(`Outdoor conditions now: ${Math.round(weather.tempC)}°C, high of ${Math.round(weather.maxC)}°C, ${weather.humidity}% humidity.`)
    if (weather.highs?.length)
      lines.push(`Seven-day forecast highs: ${weather.highs.map(Math.round).join(', ')}°C; lows: ${(weather.lows ?? []).map(Math.round).join(', ')}°C.`)
  }
  return lines.join(' ')
}

const HOUSE_STYLE = `Write for a home grower: practical, specific, second person, no filler. Keep each prose field to one to three sentences. Use metric units and °C. Numbers must be realistic for an established plant in a pot: watering intervalDays is the days between waterings in a temperate reference climate for each calendar season (the app shortens it for heat on its own). Toxicity must be accurate; when unsure, say so and err on the side of caution. Describe traditional uses as tradition, not medical advice.`

async function ask<T>(schema: z.ZodType<T>, system: string, content: Content, signal?: AbortSignal): Promise<T> {
  const { apiKey, model } = useStore.getState().settings
  if (!apiKey) throw new AiError('Add your Anthropic API key in Settings to use photo recognition.', true)
  if (!navigator.onLine) throw new AiError('You are offline. Photo recognition needs a connection.')

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 })
  // Server-side fallback reruns a declined request on another model; Haiku does not support it.
  const fallback = model.includes('haiku')
    ? {}
    : { betas: ['server-side-fallback-2026-07-01' as const], fallbacks: 'default' as const }

  const format = betaZodOutputFormat(schema)
  try {
    // Thinking shares max_tokens with the answer, so leave generous room and check how the turn ended before parsing.
    const res = await client.beta.messages.create(
      {
        model,
        max_tokens: 16000,
        system,
        messages: [{ role: 'user', content }],
        output_config: { format, effort: 'medium' },
        ...fallback,
      },
      { signal },
    )
    if (res.stop_reason === 'refusal') throw new AiError('The model declined this request. Try a different photo.')
    if (res.stop_reason === 'max_tokens') throw new AiError('The answer was cut off. Please try again.')
    const text = res.content.find((b) => b.type === 'text')?.text
    if (!text) throw new AiError('The answer came back empty. Please try again.')
    return format.parse(text)
  } catch (e) {
    if (e instanceof AiError) throw e
    if (e instanceof Anthropic.APIUserAbortError) throw new AiError('Cancelled.')
    if (e instanceof Anthropic.AuthenticationError) throw new AiError('That API key was rejected. Check it in Settings.', true)
    if (e instanceof Anthropic.PermissionDeniedError) throw new AiError('This API key cannot use the selected model. Pick another model in Settings.', true)
    if (e instanceof Anthropic.NotFoundError) throw new AiError('The selected model is not available to this API key. Pick another model in Settings.', true)
    if (e instanceof Anthropic.RateLimitError) throw new AiError('Rate limit reached. Wait a minute and try again.')
    if (e instanceof Anthropic.BadRequestError)
      throw new AiError(
        /credit|billing/i.test(e.message)
          ? 'Your Anthropic account is out of credit. Top it up at platform.claude.com, then try again.'
          : 'The request was rejected. Try a different photo, or another model in Settings.',
      )
    if (e instanceof Anthropic.APIConnectionError) throw new AiError('Could not reach the recognition service. Check your connection.')
    if (e instanceof Anthropic.APIError) throw new AiError('The recognition service is having trouble. Try again shortly.')
    throw new AiError('The answer could not be read. Please try again.')
  }
}

const styleIds = BONSAI_STYLES.map((s) => s.id)
const cleanStyles = (ids: string[]) => ids.filter((id) => styleIds.includes(id))

export interface Identified<P> {
  profile: P
  confidence: 'high' | 'medium' | 'low'
  reasoning: string
  alternatives: { commonName: string; scientificName: string }[]
  emoji: string
  suggestedStyle?: string
}

const NOT_FOUND = 'No plant could be made out in that photo. Fill the frame with the leaves or flowers and try again.'

export async function identifyPlant(photo: string, signal?: AbortSignal): Promise<Identified<CareProfile>> {
  const r = await ask(
    plantResult,
    `You are an expert botanist and horticulturist identifying a plant from a photo for a personal plant-care app, then writing its care sheet.

Identify to species (and cultivar when it is clearly visible). In "reasoning", name the visible features that led to the identification in one or two sentences. Set confidence honestly; list up to three look-alike alternatives when it is not high. If the photo shows no plant, set found=false and profile=null. "emoji" is one emoji that suits the plant.

${HOUSE_STYLE}

${situation()} Account for this climate in the prose advice (for example afternoon shade or indoor summering in desert heat).`,
    [image(photo), { type: 'text', text: 'Identify this plant and write its care sheet.' }],
    signal,
  )
  if (!r.found || !r.profile) throw new AiError(NOT_FOUND)
  return { ...r, profile: r.profile }
}

const BONSAI_RULES = `"styles" must only use these ids: ${styleIds.join(', ')}. "calendar" holds two to four short imperative tasks per season. "wiring.checkAfterWeeks" is how long until wire typically starts to bite on this species. "hotClimateNote" is honest advice for growing this species in the grower's climate.`

export async function identifyBonsai(photo: string, signal?: AbortSignal): Promise<Identified<BonsaiProfile>> {
  const r = await ask(
    bonsaiResult,
    `You are a bonsai professional identifying the species of a bonsai or pre-bonsai tree from a photo for a personal bonsai-care app, then writing its bonsai care sheet.

Identify the species. In "reasoning", name the visible features (foliage, bark, growth habit) behind the identification and comment briefly on the tree's current stage of development. Set confidence honestly; list up to three alternatives when it is not high. "suggestedStyle" is the single style id this particular tree is closest to or best suited for. If the photo shows no tree or plant, set found=false and profile=null. "emoji" is one emoji that suits the tree.

${BONSAI_RULES}

${HOUSE_STYLE}

${situation()}`,
    [image(photo), { type: 'text', text: 'Identify this tree and write its bonsai care sheet.' }],
    signal,
  )
  if (!r.found || !r.profile) throw new AiError(NOT_FOUND)
  return {
    ...r,
    profile: { ...r.profile, styles: cleanStyles(r.profile.styles) },
    suggestedStyle: styleIds.includes(r.suggestedStyle) ? r.suggestedStyle : undefined,
  }
}

export async function lookupPlant(name: string, signal?: AbortSignal): Promise<Identified<CareProfile>> {
  const r = await ask(
    plantResult,
    `You are an expert horticulturist writing a care sheet for a personal plant-care app. The grower gives a plant name (common or scientific, possibly misspelled). Resolve it to the most likely species. If it is not a plant, set found=false and profile=null. "reasoning" explains in one sentence which plant you resolved the name to. "emoji" is one emoji that suits the plant.

${HOUSE_STYLE}

${situation()} Account for this climate in the prose advice.`,
    [{ type: 'text', text: `Plant name: ${name}` }],
    signal,
  )
  if (!r.found || !r.profile) throw new AiError(`"${name}" was not recognised as a plant. Check the spelling or try the scientific name.`)
  return { ...r, profile: r.profile }
}

export async function lookupBonsai(name: string, signal?: AbortSignal): Promise<Identified<BonsaiProfile>> {
  const r = await ask(
    bonsaiResult,
    `You are a bonsai professional writing a bonsai care sheet for a personal bonsai-care app. The grower gives a species name (common or scientific, possibly misspelled). Resolve it to the most likely species grown as bonsai. If it is not a plant, set found=false and profile=null. "reasoning" explains in one sentence which species you resolved the name to. "suggestedStyle" is the style id most typical for it. "emoji" is one emoji that suits the tree.

${BONSAI_RULES}

${HOUSE_STYLE}

${situation()}`,
    [{ type: 'text', text: `Species name: ${name}` }],
    signal,
  )
  if (!r.found || !r.profile) throw new AiError(`"${name}" was not recognised as a tree species. Check the spelling or try the scientific name.`)
  return {
    ...r,
    profile: { ...r.profile, styles: cleanStyles(r.profile.styles) },
    suggestedStyle: styleIds.includes(r.suggestedStyle) ? r.suggestedStyle : undefined,
  }
}

function describe(plant: Plant) {
  const name = plant.profile
    ? `${plant.profile.commonName} (${plant.profile.scientificName})`
    : `${plant.bonsai!.commonName} (${plant.bonsai!.scientificName}) grown as bonsai`
  const recent = [...plant.log]
    .sort((a, b) => b.at - a.at)
    .slice(0, 12)
    .map((e) => `${new Date(e.at).toISOString().slice(0, 10)} ${e.action}${e.note ? ` — ${e.note}` : ''}`)
  return `Plant: ${name}. Kept ${plant.where}s. ${recent.length ? `Recent care log:\n${recent.join('\n')}` : 'No care logged yet.'}${plant.notes ? `\nGrower's notes: ${plant.notes}` : ''}`
}

export function healthCheck(plant: Plant, photo: string): Promise<Advice> {
  return ask(
    advice,
    `You are a plant pathologist and horticulturist reviewing a photo of a grower's plant for a personal plant-care app. Look for pests, disease, nutrient problems, watering or light stress, and physical damage. Report only what the photo and care log support; if the plant looks healthy, say so plainly and return few or no findings. For each finding give what you see, the most likely cause, and one concrete action. Severity: "act" needs action this week, "watch" is worth monitoring, "info" is a neutral observation. "headline" is at most six words.

${situation()}`,
    [image(photo), { type: 'text', text: describe(plant) }],
  )
}

export function stylingAdvice(plant: Plant, photo: string): Promise<Advice> {
  return ask(
    advice,
    `You are a bonsai professional giving a design critique of a grower's tree from a photo for a personal bonsai-care app. Assess the trunk line, nebari, primary branch placement, apex, foliage pads and pot. Recommend a direction (front, style, what to grow out, what to remove, what to wire) as three to six findings ordered by priority, each with one concrete action and the right season to do it for this species. Severity: "act" is the next job to do, "watch" is a later-stage refinement, "info" is an observation. Be honest about faults and about what cannot be judged from a single photo. "headline" is at most six words.

${situation()}`,
    [image(photo), { type: 'text', text: `${describe(plant)}${plant.style ? `\nCurrent style goal: ${plant.style}.` : ''}` }],
  )
}

function describeSpot(plant: Plant) {
  const s = plant.spot ?? {}
  const lines = [`Kept ${plant.where}s.`]
  if (s.pot) lines.push(`Container: ${s.pot}${s.potCm ? `, about ${s.potCm} cm across` : ''}.`)
  else if (s.potCm) lines.push(`Pot about ${s.potCm} cm across.`)
  if (plant.where === 'indoor') {
    if (s.windowFacing) lines.push(`Nearest window: ${s.windowFacing}.`)
    if (s.windowDistance) lines.push(`Distance from that window: ${s.windowDistance}.`)
    if (s.ac) lines.push(`Air conditioning: ${s.ac}${s.acTempC ? `, set to ${s.acTempC}°C` : ''}.`)
    if (s.nearVent != null) lines.push(s.nearVent ? 'It sits in the direct airflow of an AC vent.' : 'It is out of the direct AC airflow.')
  } else {
    if (s.exposure) lines.push(`Sun exposure: ${s.exposure}.`)
    if (s.shelter) lines.push(`Shelter: ${s.shelter}.`)
  }
  if (s.notes) lines.push(`Grower's description: ${s.notes}`)
  return lines.join(' ')
}

/** A care plan for one plant in its actual spot, climate and season. */
export async function writeCarePlan(plant: Plant, signal?: AbortSignal): Promise<CarePlan> {
  const { settings } = useStore.getState()
  const species = plant.profile ?? plant.bonsai
  const r = await ask(
    carePlan,
    `You are an expert horticulturist${plant.bonsai ? ' and bonsai professional' : ''} writing a personal care plan for one specific plant in a personal plant-care app. You are given the species care sheet, exactly where the plant lives, the grower's location, the season, current weather and the week's forecast. Tailor every line to those facts; do not restate generic species advice.

Be specific and quantified. Give water volumes in millilitres or litres scaled to the stated pot size, distances from windows in metres, AC set-points and airflow advice in °C and metres, hours of sun, and named times of day. Where the spot is wrong for the species, say so plainly and say exactly where to move it. Where a detail was not given, state the assumption you made in the relevant field rather than hedging.

Fields:
- headline: one sentence, the single most important thing for this plant in this spot right now.
- watering.everyDays: days between waterings for THIS plant in THIS spot at four levels of outdoor daily high: cool (under 20°C), mild (20–29°C), hot (30–37°C), extreme (38°C or more). The app picks the band from the live forecast, so the schedule shifts automatically as the weather changes. For an indoor plant, account for how the stated air conditioning use decouples it from the outdoor heat (and for AC drying the air and the pot). Whole numbers, minimum 1.
- watering.amount, method, bestTime: how much, how, and when in the day. watering.why: one or two sentences on why this schedule fits this spot.
- placement.verdict and advice: judge the current spot for this species (light, heat, airflow) and give the exact adjustment if any.
- light: what this spot's light means for this species at this latitude and season, and what to change.
- climate: for indoor plants, the air conditioning advice (set-point, distance from vents, what happens when the AC is off or the household travels); for outdoor plants, heat, sun-scorch, wind and cold protection for this location and season.
- humidity: what the current indoor or outdoor humidity means here and what, if anything, to do.
- feeding.everyWeeks: weeks between feeds right now (0 means do not feed this season). feeding.advice: product type, dilution, and timing.
- thisMonth: three to five concrete jobs for this month for this plant.
- watchFor: two to four early warning signs specific to this spot and season, each with what it means.

Keep each prose field to one to three sentences. Metric units and °C.

${situation()}`,
    [
      {
        type: 'text',
        text: `Plant: ${plant.nickname}\n\nWhere it lives: ${describeSpot(plant)}\n\n${describe(plant)}\n\nSpecies care sheet:\n${JSON.stringify(species)}`,
      },
    ],
    signal,
  )
  const days = (n: number) => Math.min(60, Math.max(1, Math.round(n) || 1))
  return {
    ...r,
    watering: {
      ...r.watering,
      everyDays: { cool: days(r.watering.everyDays.cool), mild: days(r.watering.everyDays.mild), hot: days(r.watering.everyDays.hot), extreme: days(r.watering.everyDays.extreme) },
    },
    feeding: { ...r.feeding, everyWeeks: Math.max(0, Math.round(r.feeding.everyWeeks) || 0) },
    createdAt: Date.now(),
    basis: { season: seasonFor(new Date(), settings.place?.lat), place: settings.place?.name ?? '', spotKey: spotKey(plant.where, plant.spot) },
  }
}
