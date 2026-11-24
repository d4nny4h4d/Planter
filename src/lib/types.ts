export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type Difficulty = 'easy' | 'moderate' | 'demanding'
export type SunLevel = 'full sun' | 'partial sun' | 'bright indirect' | 'low light'
export type HumidityLevel = 'low' | 'medium' | 'high'

export interface MixPart {
  ingredient: string
  parts: number
}

export interface Problem {
  name: string
  signs: string
  fix: string
}

/** Care sheet for a general (non-bonsai) plant. Built-in entries and AI results share this shape. */
export interface CareProfile {
  commonName: string
  scientificName: string
  family: string
  otherNames: string[]
  description: string
  placement: 'indoor' | 'outdoor' | 'both'
  difficulty: Difficulty
  watering: {
    /** One short line, e.g. "Deep and infrequent" */
    summary: string
    detail: string
    /** Days between waterings for an established plant, per season */
    intervalDays: Record<Season, number>
  }
  temperature: {
    /** e.g. "Warm climate preferred" */
    label: string
    idealMinC: number
    idealMaxC: number
    /** Lowest temperature the plant survives */
    hardinessMinC: number
    detail: string
  }
  sunlight: {
    level: SunLevel
    /** e.g. "4–6 hours of direct sun" */
    hours: string
    detail: string
    /** One practical tip (rotation, acclimatising, etc.) */
    tip: string
  }
  fertilizer: {
    /** e.g. "Every 4–6 weeks in the growing season" */
    summary: string
    npk: string
    /** Weeks between feeds during the growing season */
    intervalWeeks: number
    detail: string
    amount: string
  }
  soil: {
    summary: string
    detail: string
    mix: MixPart[]
    phMin: number
    phMax: number
    alternatives: string[]
  }
  humidity: {
    level: HumidityLevel
    minPct: number
    maxPct: number
    detail: string
    tip: string
  }
  pruning: {
    bestTime: string
    detail: string
  }
  propagation: {
    methods: string[]
    detail: string
  }
  problems: Problem[]
  toxicity: {
    pets: boolean
    humans: boolean
    detail: string
  }
  precautions: string[]
  /** Traditional / practical uses. Informational only. */
  uses: string
}

export interface LibraryPlant extends CareProfile {
  id: string
  /** Emoji used as a placeholder avatar when there is no photo */
  emoji: string
}

export type BonsaiCategory = 'conifer' | 'deciduous' | 'broadleaf evergreen' | 'tropical' | 'flowering'

export interface BonsaiProfile {
  commonName: string
  scientificName: string
  category: BonsaiCategory
  indoorSuitable: boolean
  difficulty: Difficulty
  description: string
  placement: string
  watering: {
    detail: string
    intervalDays: Record<Season, number>
  }
  fertilizing: {
    detail: string
    intervalWeeks: number
  }
  pruning: {
    structural: string
    maintenance: string
  }
  wiring: {
    detail: string
    bestTime: string
    /** Weeks after wiring when the wire should be checked for biting in */
    checkAfterWeeks: number
  }
  repotting: {
    detail: string
    everyYears: number
    bestTime: string
    soilMix: MixPart[]
  }
  temperature: {
    idealMinC: number
    idealMaxC: number
    hardinessMinC: number
    detail: string
  }
  propagation: string
  problems: Problem[]
  /** Style ids from BONSAI_STYLES that suit this species */
  styles: string[]
  /** 2–4 short tasks per season */
  calendar: Record<Season, string[]>
  /** Advice for keeping this species in a hot desert climate (Gulf summers) */
  hotClimateNote: string
  toxicity: string
}

export interface LibraryBonsai extends BonsaiProfile {
  id: string
  emoji: string
}

export interface BonsaiStyle {
  id: string
  name: string
  japanese: string
  description: string
  keyPoints: string[]
}

export interface BonsaiTechnique {
  id: string
  name: string
  summary: string
  steps: string[]
  mistakes: string[]
}

export type CareAction = 'water' | 'fertilize' | 'mist' | 'rotate' | 'prune' | 'wire' | 'unwire' | 'repot' | 'note'

export interface CareEvent {
  id: string
  action: CareAction
  at: number
  note?: string
}

export interface PlantPhoto {
  id: string
  at: number
}

/** The grower's description of where one plant actually lives. */
export interface Spot {
  potCm?: number
  pot?: string
  /** Indoor */
  windowFacing?: string
  windowDistance?: string
  ac?: string
  acTempC?: number
  nearVent?: boolean
  /** Outdoor */
  exposure?: string
  shelter?: string
  notes?: string
}

export type HeatBand = 'cool' | 'mild' | 'hot' | 'extreme'

/** Care plan written by Claude for one plant in its spot, climate and season. */
export interface CarePlan {
  createdAt: number
  /** What the plan was written for; used to tell when it has gone stale */
  basis: { season: Season; place: string; spotKey: string }
  headline: string
  watering: {
    /** Days between waterings by outdoor daily high: cool <20°C, mild 20–29, hot 30–37, extreme 38+ */
    everyDays: Record<HeatBand, number>
    amount: string
    method: string
    bestTime: string
    why: string
  }
  placement: { verdict: 'ideal' | 'workable' | 'move it'; advice: string }
  light: string
  climate: string
  humidity: string
  feeding: { everyWeeks: number; advice: string }
  thisMonth: string[]
  watchFor: string[]
}

export interface Plant {
  id: string
  kind: 'plant' | 'bonsai'
  nickname: string
  profile?: CareProfile
  bonsai?: BonsaiProfile
  emoji: string
  where: 'indoor' | 'outdoor'
  addedAt: number
  /** Newest last. photos[last] is the cover. */
  photos: PlantPhoto[]
  log: CareEvent[]
  notes: string
  spot?: Spot
  plan?: CarePlan
  /** User overrides, in days. Unset = derive from profile + season + weather */
  waterEveryDays?: number
  feedEveryDays?: number
  /** Bonsai only */
  style?: string
  yearStarted?: number
  /** Per-action "not before" timestamps set by snoozing a task */
  snooze?: Partial<Record<CareAction, number>>
}

export interface Place {
  name: string
  lat: number
  lon: number
}

export interface Weather {
  tempC: number
  /** Today's forecast high — drives watering adjustments */
  maxC: number
  humidity: number
  /** Forecast highs and lows for the coming week, today first */
  highs?: number[]
  lows?: number[]
  fetchedAt: number
}

export interface Settings {
  apiKey: string
  model: string
  units: 'C' | 'F'
  place?: Place
}

export interface Finding {
  title: string
  severity: 'info' | 'watch' | 'act'
  detail: string
  action: string
}

export interface Advice {
  headline: string
  summary: string
  findings: Finding[]
}

export type DiagnosisCategory = 'pest' | 'fungal' | 'bacterial' | 'viral' | 'nutrient' | 'watering' | 'light' | 'environment' | 'physical'

export interface Diagnosis {
  name: string
  category: DiagnosisCategory
  likelihood: 'likely' | 'possible' | 'unlikely'
  /** What in the photos points to it */
  evidence: string
  cause: string
}

/** One Dr. Plant check-up. */
export interface DoctorReport {
  id: string
  at: number
  plantId?: string
  plantName: string
  photoIds: string[]
  symptoms: string[]
  notes: string
  status: 'healthy' | 'minor' | 'needs treatment' | 'critical'
  headline: string
  summary: string
  diagnoses: Diagnosis[]
  treatment: { now: string[]; thisWeek: string[]; ongoing: string[] }
  products: string[]
  contagion: string
  prevention: string[]
  recovery: string
  /** Days until the plant should be looked at again; 0 = no follow-up needed */
  recheckDays: number
  resolved?: boolean
}
