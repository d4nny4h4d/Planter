import type { LibraryBonsai, BonsaiStyle, BonsaiTechnique } from '../lib/types'

export const BONSAI_STYLES: BonsaiStyle[] = [
  {
    id: 'formal-upright',
    name: 'Formal upright',
    japanese: 'Chokkan',
    description:
      'A perfectly straight, vertical trunk that tapers evenly from a wide base to the apex. Branches are arranged in a regular pattern, longest at the bottom and shortening toward the top.',
    keyPoints: [
      'Trunk is dead straight with clear taper and a visible radial root flare',
      'First branch sits roughly one third of the way up; branches alternate left, right and back',
      'Apex stands directly above the base of the trunk',
    ],
  },
  {
    id: 'informal-upright',
    name: 'Informal upright',
    japanese: 'Moyogi',
    description:
      'The trunk rises in gentle curves but the apex still ends up above the base. It is the most common and forgiving style, and suits almost every species.',
    keyPoints: [
      'Curves get tighter and smaller as they approach the apex',
      'Branches emerge from the outside of each bend, never the inside',
      'Apex leans slightly toward the viewer and sits over the root base',
    ],
  },
  {
    id: 'slanting',
    name: 'Slanting',
    japanese: 'Shakan',
    description:
      'The whole trunk leans to one side at roughly 45–70 degrees from the soil, as if pushed by steady wind or reaching for light. Strong roots on the side opposite the lean visually anchor the tree.',
    keyPoints: [
      'Roots are heavier on the side away from the lean to balance the composition',
      'First branch usually grows opposite the direction of the lean',
      'Apex sits clearly outside the base of the trunk but the tree must still look stable',
    ],
  },
  {
    id: 'cascade',
    name: 'Cascade',
    japanese: 'Kengai',
    description:
      'The trunk bends sharply downward and the tip falls below the bottom of the pot, like a tree hanging from a cliff face. It is grown in a tall pot to give the cascade room.',
    keyPoints: [
      'Lowest point of the tree drops below the base of the pot',
      'Use a deep, heavy pot and place it on a stand so the tail hangs free',
      'Keep the lower growth strong by pruning the top harder, since vigour naturally moves upward',
    ],
  },
  {
    id: 'semi-cascade',
    name: 'Semi-cascade',
    japanese: 'Han-kengai',
    description:
      'The trunk grows outward and dips below the pot rim, but never below the bottom of the pot. It suggests a tree leaning out over water or a riverbank.',
    keyPoints: [
      'The tip ends between the rim and the base of the pot',
      'A small upright crown above the pot balances the outstretched trunk',
      'A medium-depth pot gives enough visual and physical counterweight',
    ],
  },
  {
    id: 'literati',
    name: 'Literati',
    japanese: 'Bunjingi',
    description:
      'A tall, slender trunk with almost no lower branches and a sparse crown near the top. The style is about line and restraint, echoing trees that survive in crowded or harsh places.',
    keyPoints: [
      'The trunk line carries the design, so keep it thin, long and full of character',
      'Foliage is limited to a few small pads in the upper third',
      'Use a small, shallow, often round pot that does not compete with the trunk',
    ],
  },
  {
    id: 'broom',
    name: 'Broom',
    japanese: 'Hokidachi',
    description:
      'A straight trunk that divides into many fine branches at about one third of its height, forming a rounded, dome-shaped crown. It suits fine-twigged deciduous trees and looks best in winter silhouette.',
    keyPoints: [
      'Trunk is straight and branches fan out from one zone rather than along the trunk',
      'Build the crown by repeated clip-and-grow to get dense, even ramification',
      'Keep the outline a smooth dome with no branch dominating',
    ],
  },
  {
    id: 'windswept',
    name: 'Windswept',
    japanese: 'Fukinagashi',
    description:
      'Trunk and every branch sweep in one direction, as if shaped by a constant strong wind. Branches on the windward side are bent back across the trunk or reduced to deadwood.',
    keyPoints: [
      'All movement flows one way, including the branch tips',
      'Windward branches are short, sparse or turned into jin',
      'Plant the tree off-centre in the pot, leaving open space on the leeward side',
    ],
  },
  {
    id: 'forest',
    name: 'Forest',
    japanese: 'Yose-ue',
    description:
      'Several trees of one species planted together in a wide, shallow pot or on a slab to look like a woodland. Trees vary in height and thickness to create depth.',
    keyPoints: [
      'Use an odd number of trees, with the tallest and thickest placed slightly off-centre',
      'Put smaller trees at the back and edges to exaggerate perspective',
      'No three trunks should line up, and no trunk should hide another from the front',
    ],
  },
  {
    id: 'root-over-rock',
    name: 'Root-over-rock',
    japanese: 'Sekijoju',
    description:
      'The roots clasp a rock and run down its surface into the soil below. It takes several years of growing with the roots bound to the stone before they grip and thicken.',
    keyPoints: [
      'Choose a rough, textured rock with grooves the roots can follow',
      'Bind long young roots tightly to the rock and bury the lot for a few seasons before exposing them gradually',
      'Roots must look fused to the stone, with no gaps between root and rock',
    ],
  },
]

export const BONSAI_LIBRARY: LibraryBonsai[] = [
  {
    id: 'chinese-banyan',
    emoji: '🌳',
    commonName: 'Chinese banyan (Ficus)',
    scientificName: 'Ficus microcarpa',
    category: 'tropical',
    indoorSuitable: true,
    difficulty: 'easy',
    description:
      'A vigorous tropical fig with glossy leaves, smooth grey bark and a habit of throwing aerial roots in humid air. It forgives pruning and watering mistakes, back-buds on old wood and is the best first bonsai for warm climates.',
    placement:
      'Give it the brightest spot you have: outdoors in sun to light shade whenever nights stay above 12°C, or right against a sunny window indoors. Avoid moving it often, as sudden changes in light cause leaf drop.',
    watering: {
      detail:
        'Water thoroughly when the top centimetre of soil feels dry, and never let the root ball dry out completely. It tolerates the odd lapse, but constantly soggy soil leads to root rot and yellow leaves.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 4 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced liquid fertilizer every two weeks while it is growing, or use slow-release organic pellets. Drop to monthly in winter if it keeps growing indoors, and stop if growth stalls.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Cut back heavy branches and reduce the trunk in late spring to early summer when growth is strongest; seal large cuts, as they bleed white latex. It buds readily from bare wood on a healthy tree.',
      maintenance:
        'Let shoots extend to 6–8 leaves, then cut back to 2. Remove oversized leaves and any shoots growing straight up or down.',
    },
    wiring: {
      detail:
        'Branches are flexible and set fast, but the bark is soft and scars quickly. Wire young shoots loosely and use guy wires for thick branches.',
      bestTime: 'Late spring through summer, during active growth',
      checkAfterWeeks: 6,
    },
    repotting: {
      detail:
        'Repot when roots circle the pot, removing up to a third of the root mass. Keep it warm, humid and out of strong sun for two to three weeks afterwards.',
      everyYears: 2,
      bestTime: 'Late spring to early summer, once nights are reliably above 15°C',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 18,
      idealMaxC: 32,
      hardinessMinC: 5,
      detail:
        'It grows best in steady warmth and stops below about 12°C. Protect it from frost and from cold draughts, which trigger leaf drop.',
    },
    propagation:
      'Cuttings of almost any size root easily in warm, humid conditions, and air layers take within a couple of months in summer.',
    problems: [
      {
        name: 'Sudden leaf drop',
        signs: 'Many green or yellow leaves fall within days of a move, a cold draught or a drop in light.',
        fix: 'Put it in a bright, stable position, water only as the soil dries and wait; new leaves follow within a few weeks.',
      },
      {
        name: 'Scale insects',
        signs: 'Brown or white bumps on stems and leaf undersides, with sticky honeydew on the leaves below.',
        fix: 'Scrape or wipe them off with alcohol on a cotton bud, then spray horticultural oil every 10 days for three rounds.',
      },
      {
        name: 'Root rot',
        signs: 'Yellowing leaves, sour-smelling soil that stays wet and soft black roots.',
        fix: 'Repot into a free-draining mix, cut away dead roots and water only when the surface has dried.',
      },
    ],
    styles: ['informal-upright', 'root-over-rock', 'broom', 'slanting', 'forest'],
    calendar: {
      spring: ['Move outdoors once nights stay above 12°C', 'Start fortnightly feeding', 'Repot in late spring if root-bound'],
      summer: ['Water daily in heat', 'Cut shoots back to 2 leaves', 'Wire and check wire every few weeks', 'Defoliate strong trees in early summer'],
      autumn: ['Reduce feeding as growth slows', 'Remove wire that is biting', 'Bring indoors before nights fall below 10°C'],
      winter: ['Keep in the brightest window available', 'Water less but never let it dry out', 'Watch for scale and spider mites'],
    },
    hotClimateNote:
      'This is the easiest bonsai for the Gulf and it grows outdoors all year in Abu Dhabi. From June to September give it morning sun and afternoon shade or 30–50% shade cloth, water every morning and again in the evening if the pot dries, and do heavy pruning and repotting in March–April or October rather than in peak heat.',
    toxicity: 'The milky sap irritates skin and the leaves are mildly toxic to cats and dogs if chewed.',
  },
  {
    id: 'bougainvillea',
    emoji: '🌸',
    commonName: 'Bougainvillea',
    scientificName: 'Bougainvillea glabra',
    category: 'flowering',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A thorny, sun-loving climber that trunks up well and covers itself in papery coloured bracts. It flowers on new growth and performs best when kept slightly dry and slightly hungry for nitrogen.',
    placement:
      'Keep it outdoors in full sun; it needs at least six hours of direct light to flower. Shelter it from frost and from long spells of cold rain.',
    watering: {
      detail:
        'Water deeply, then let the top few centimetres dry before watering again. A short dry spell encourages flowering, but do not let the leaves wilt badly, and never leave the pot standing in water.',
      intervalDays: { spring: 3, summer: 2, autumn: 3, winter: 7 },
    },
    fertilizing: {
      detail:
        'Use a balanced feed while building branches, then switch to a low-nitrogen, higher-potassium fertilizer before and during flowering. Too much nitrogen gives leaves and no bracts.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Cut back hard after a flowering flush or in late spring; it shoots strongly from old wood. Seal large wounds, as the soft wood rots easily and does not callus well.',
      maintenance:
        'After each flush of bracts fades, shorten shoots to 2–3 leaves. Stop pruning about 8 weeks before you want a display, since flowers form at the shoot tips.',
    },
    wiring: {
      detail:
        'Wire only green or freshly hardened shoots; older wood is brittle and snaps at the base. Wrap around the thorns rather than over them.',
      bestTime: 'Late spring to summer, on new shoots as they begin to harden',
      checkAfterWeeks: 5,
    },
    repotting: {
      detail:
        'The roots are fine and fragile, so tease the soil out gently and remove no more than a quarter of the root mass. Keep it slightly dry and shaded for two weeks afterwards.',
      everyYears: 3,
      bestTime: 'Late spring, when nights stay above 15°C',
      soilMix: [
        { ingredient: 'Pumice', parts: 2 },
        { ingredient: 'Akadama', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 18,
      idealMaxC: 38,
      hardinessMinC: 0,
      detail:
        'It thrives in heat and tolerates temperatures well above 40°C when watered. It drops leaves below about 10°C and frost kills young growth.',
    },
    propagation:
      'Take semi-hardwood or thick hardwood cuttings in early summer and root them in warm, barely moist pumice; even trunk-sized cuttings will strike.',
    problems: [
      {
        name: 'No flowers',
        signs: 'Lots of lush green growth but few or no coloured bracts.',
        fix: 'Move it into full sun, cut nitrogen, let it dry a little between waterings and stop tip-pruning for two months.',
      },
      {
        name: 'Root and trunk rot',
        signs: 'Soft, dark patches on the trunk or at old cuts, and leaves yellowing while the soil stays wet.',
        fix: 'Carve back to sound wood, treat with wood hardener or cut paste, and repot into a grittier mix.',
      },
      {
        name: 'Bougainvillea looper and aphids',
        signs: 'Scalloped notches eaten from leaf edges, or clusters of soft insects on shoot tips.',
        fix: 'Pick caterpillars off at dusk or spray Bacillus thuringiensis; wash aphids off with water or insecticidal soap.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'semi-cascade', 'cascade'],
    calendar: {
      spring: ['Move into full sun after the last frost', 'Hard prune and repot in late spring', 'Start balanced feeding'],
      summer: ['Shorten shoots after each flowering flush', 'Switch to low-nitrogen feed', 'Wire new shoots while still green'],
      autumn: ['Enjoy the autumn flush and stop pruning', 'Reduce watering as nights cool', 'Protect before the first frost'],
      winter: ['Keep frost-free and on the dry side', 'Stop feeding', 'Remove dead twigs and old bracts'],
    },
    hotClimateNote:
      'Bougainvillea loves Abu Dhabi and takes full sun for most of the year, flowering best from October to May. In July and August a small pot can overheat, so shade the pot itself or give light afternoon shade, water daily, and expect flowering to pause until the nights cool.',
    toxicity: 'The sap can cause a skin rash and the thorns scratch badly; leaves are mildly toxic to pets if eaten.',
  },
  {
    id: 'desert-rose',
    emoji: '🌹',
    commonName: 'Desert rose',
    scientificName: 'Adenium obesum',
    category: 'flowering',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A succulent shrub from Arabia and East Africa with a swollen water-storing base (caudex) and trumpet flowers in pink, red or white. It is shaped mostly by pruning and by raising the caudex at each repot rather than by wiring.',
    placement:
      'Give it full sun outdoors in warm weather; it needs strong direct light to stay compact and to flower. Keep it dry and above 10°C in winter.',
    watering: {
      detail:
        'Water generously in hot weather while it is in leaf, letting the mix dry almost completely between waterings. When it drops its leaves in the cool season, water only lightly every few weeks, because a wet, cold caudex rots.',
      intervalDays: { spring: 5, summer: 3, autumn: 7, winter: 21 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced or slightly high-potassium fertilizer at half strength while it is in active growth. Do not feed a dormant, leafless plant.',
      intervalWeeks: 3,
    },
    pruning: {
      structural:
        'Cut thick branches back in late spring to force branching lower down, cutting at a slight angle so water runs off. Let cuts dry in the open and wear gloves, as the sap is poisonous.',
      maintenance:
        'Shorten leggy shoots after a flowering flush to keep the crown compact. Flowers form at the tips of new growth, so do not prune just before the main bloom.',
    },
    wiring: {
      detail:
        'Stems are soft, fleshy and bruise easily, so wiring is rarely worth it. If you must, use thick, loosely applied wire or soft ties on young branches only.',
      bestTime: 'Early summer, on young flexible growth',
      checkAfterWeeks: 6,
    },
    repotting: {
      detail:
        'Lift the plant a little higher at each repot to expose more of the caudex and thick roots. Trim roots lightly, let cuts dry for several days and wait a week before the first watering.',
      everyYears: 2,
      bestTime: 'Late spring, at the start of warm-season growth',
      soilMix: [
        { ingredient: 'Pumice', parts: 2 },
        { ingredient: 'Lava rock', parts: 1 },
        { ingredient: 'Coarse coco coir or pine bark', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 20,
      idealMaxC: 38,
      hardinessMinC: 5,
      detail:
        'It needs heat to grow and goes dormant below about 15°C. Cold combined with wet soil is the usual cause of death.',
    },
    propagation:
      'Seed gives the fattest caudex and germinates within a week in warmth; cuttings root after drying for a few days but form a thinner base.',
    problems: [
      {
        name: 'Caudex rot',
        signs: 'The base feels soft or squashy, leaves yellow and drop, and the skin may wrinkle or darken.',
        fix: 'Unpot, cut out all soft tissue to clean white flesh, dust with sulfur or cinnamon, dry for a week and replant in dry gritty mix.',
      },
      {
        name: 'Spider mites',
        signs: 'Fine pale stippling and webbing on leaves, followed by early leaf drop in hot, dry air.',
        fix: 'Hose the undersides of the leaves and apply a miticide or horticultural oil in the evening, repeating weekly.',
      },
      {
        name: 'Leggy growth with no flowers',
        signs: 'Long thin branches, large pale leaves and few buds.',
        fix: 'Move it into full sun, prune back after the weather warms and cut back on nitrogen.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'broom'],
    calendar: {
      spring: ['Resume watering as leaves appear', 'Repot and raise the caudex', 'Prune back long branches'],
      summer: ['Water freely in heat', 'Feed every 3 weeks', 'Check for spider mites'],
      autumn: ['Reduce watering as nights cool', 'Stop feeding', 'Move under cover before cold rain'],
      winter: ['Keep nearly dry above 10°C', 'Give maximum light', 'Check the caudex is firm'],
    },
    hotClimateNote:
      'Desert rose is native to the region and is one of the few bonsai subjects that takes full Abu Dhabi sun all year. Even so, shade the pot in July and August so the roots do not cook, water every two to three days in summer, and keep it under cover from winter rain when it is leafless.',
    toxicity:
      'All parts, and especially the sap, contain cardiac glycosides and are highly toxic to people and pets; wear gloves when pruning and keep it away from children and animals.',
  },
  {
    id: 'orange-jasmine',
    emoji: '🌼',
    commonName: 'Orange jasmine',
    scientificName: 'Murraya paniculata',
    category: 'flowering',
    indoorSuitable: true,
    difficulty: 'moderate',
    description:
      'An evergreen citrus relative with small glossy compound leaves, pale bark and strongly scented white flowers followed by red berries. It grows slowly but ramifies well and flowers several times a year in warmth.',
    placement:
      'Grow it outdoors in sun to light shade when nights are above 12°C, or in a very bright window indoors. It flowers best with a few hours of direct sun.',
    watering: {
      detail:
        'Keep the soil evenly moist, watering as the surface begins to dry. It resents both drought and waterlogging, and hard alkaline water causes yellow leaves over time.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 4 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced fertilizer through the growing season and add chelated iron a few times a year if new leaves turn yellow between the veins.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Do heavy cuts in late spring. The wood is hard and heals slowly, so cut cleanly and seal wounds.',
      maintenance:
        'Let shoots grow 6–8 leaves, then cut back to 2. Trim after a flowering flush so you do not remove the next set of buds.',
    },
    wiring: {
      detail:
        'Wire young shoots before they lignify, as older branches are stiff and brittle. Bend gradually and support the bend with your thumbs.',
      bestTime: 'Late spring to midsummer',
      checkAfterWeeks: 8,
    },
    repotting: {
      detail:
        'Repot when the pot is full of roots, removing no more than a quarter. Use a mix that holds moisture but drains freely and stays slightly acidic.',
      everyYears: 3,
      bestTime: 'Late spring',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Composted pine bark', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 18,
      idealMaxC: 32,
      hardinessMinC: 2,
      detail:
        'It prefers warm, humid conditions and slows right down below 12°C. It survives a brief touch near freezing but loses leaves.',
    },
    propagation:
      'Sow fresh seed from ripe berries, or root semi-hardwood cuttings in summer with bottom heat; air layering also works on thicker branches.',
    problems: [
      {
        name: 'Iron chlorosis',
        signs: 'New leaves turn yellow while the veins stay green, usually where the water is hard.',
        fix: 'Apply chelated iron, use an acidifying fertilizer and water with rain or filtered water when you can.',
      },
      {
        name: 'Scale and whitefly',
        signs: 'Sticky leaves, sooty mould, or small white insects that fly up when the plant is disturbed.',
        fix: 'Spray horticultural oil or insecticidal soap on leaf undersides weekly for three weeks.',
      },
      {
        name: 'Bud and flower drop',
        signs: 'Flower buds fall before opening after a move or a dry spell.',
        fix: 'Keep watering even, avoid relocating it while in bud and raise humidity.',
      },
    ],
    styles: ['informal-upright', 'broom', 'slanting', 'forest'],
    calendar: {
      spring: ['Start fortnightly feeding', 'Repot in late spring if needed', 'Do structural pruning'],
      summer: ['Water daily', 'Trim shoots after flowering', 'Wire young growth', 'Apply chelated iron if leaves yellow'],
      autumn: ['Ease off feeding', 'Remove wire that is tight', 'Bring indoors before nights drop below 10°C'],
      winter: ['Give maximum light', 'Keep soil just moist', 'Check for scale'],
    },
    hotClimateNote:
      'Orange jasmine is a common hedge plant in the UAE and handles the heat well, but in a bonsai pot it needs afternoon shade from May to September and daily watering. Desalinated tap water is alkaline and salty, so flush the pot heavily once a month and treat with chelated iron when the leaves yellow.',
    toxicity: 'It is generally regarded as non-toxic to people and pets, though the berries are not meant for eating.',
  },
  {
    id: 'fukien-tea',
    emoji: '🍃',
    commonName: 'Fukien tea',
    scientificName: 'Carmona retusa',
    category: 'tropical',
    indoorSuitable: true,
    difficulty: 'demanding',
    description:
      'A small-leaved tropical evergreen with dark glossy leaves, tiny white flowers through much of the year and little red fruits. It looks mature early but is fussy about watering, light and sudden change.',
    placement:
      'Keep it warm and very bright: outdoors in morning sun and afternoon shade in warm weather, or in the sunniest window indoors. Keep it away from air-conditioning vents, heaters and draughts.',
    watering: {
      detail:
        'Water as soon as the soil surface starts to dry and never let the root ball dry out, but do not keep it sodden either. It reacts to both extremes by dropping leaves.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 3 },
    },
    fertilizing: {
      detail:
        'Use a gentle organic or half-strength liquid fertilizer during growth, always on moist soil. Its roots burn easily, so never feed a dry or stressed tree.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Make larger cuts in late spring to early summer and seal them. Reduce in stages rather than all at once, as weak trees may not back-bud.',
      maintenance:
        'Let shoots reach 6–8 leaves and cut back to 2–3. Trim regularly through the warm months to build dense pads.',
    },
    wiring: {
      detail:
        'Young shoots bend easily but older wood is brittle and breaks without warning. Much of the shaping is better done by clip-and-grow.',
      bestTime: 'Late spring to summer, on young shoots',
      checkAfterWeeks: 8,
    },
    repotting: {
      detail:
        'Repot gently and remove no more than a fifth of the roots. Keep it warm, humid and shaded for three weeks, and do not fertilize for a month.',
      everyYears: 2,
      bestTime: 'Late spring to early summer, in settled warm weather',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Composted pine bark', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 7,
      detail:
        'It wants steady warmth and humidity all year. Growth stops below 15°C and it is damaged by anything close to 5°C.',
    },
    propagation:
      'Root softwood cuttings in summer under high humidity with bottom heat, or sow the seeds from ripe red fruit while fresh.',
    problems: [
      {
        name: 'Leaf drop',
        signs: 'Leaves turn yellow or black and fall after the soil dries out, stays waterlogged or the tree is moved.',
        fix: 'Stabilise light and temperature, water by checking the soil daily and avoid feeding until new growth appears.',
      },
      {
        name: 'Aphids, mealybugs and scale',
        signs: 'Sticky, distorted new growth, white cottony tufts in leaf axils or brown bumps on stems.',
        fix: 'Remove what you can by hand and treat with insecticidal soap; test any oil spray on a few leaves first, as the foliage marks easily.',
      },
      {
        name: 'Spider mites',
        signs: 'Dull, speckled leaves and fine webbing in dry indoor air.',
        fix: 'Rinse the foliage, raise humidity with a wet gravel tray and spray a miticide weekly for three weeks.',
      },
    ],
    styles: ['informal-upright', 'broom', 'slanting', 'forest'],
    calendar: {
      spring: ['Move to a brighter spot as days lengthen', 'Begin light feeding', 'Repot in late spring only if root-bound'],
      summer: ['Check soil moisture daily', 'Trim shoots back to 2–3 leaves', 'Wire young shoots'],
      autumn: ['Bring indoors before nights fall below 15°C', 'Reduce feeding', 'Inspect for pests before moving inside'],
      winter: ['Keep above 15°C in bright light', 'Keep away from heaters and draughts', 'Raise humidity with a gravel tray'],
    },
    hotClimateNote:
      'It enjoys Gulf warmth and humidity but cannot take direct midday summer sun, and dry air-conditioned rooms are just as hard on it. Keep it outdoors in bright shade or morning sun from October to May, and in summer either in deep shade outside or by a bright window away from the AC stream.',
    toxicity: 'It is not known to be toxic to people or pets.',
  },
  {
    id: 'dwarf-jade',
    emoji: '🪴',
    commonName: 'Jade (Dwarf jade)',
    scientificName: 'Portulacaria afra',
    category: 'broadleaf evergreen',
    indoorSuitable: true,
    difficulty: 'easy',
    description:
      'A South African succulent with small round leaves and thick reddish-brown stems that store water. It grows fast in heat, shrugs off missed waterings and responds very well to clip-and-grow.',
    placement:
      'Put it in full sun to light shade outdoors in warm weather, or in your sunniest window indoors. Low light makes it leggy with large, widely spaced leaves.',
    watering: {
      detail:
        'Water thoroughly, then wait until the soil is nearly dry and the leaves just begin to lose their plumpness. In active summer growth it drinks more than most succulents, but in cool weather keep it quite dry.',
      intervalDays: { spring: 5, summer: 3, autumn: 6, winter: 14 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced fertilizer at normal strength while it is growing in warm weather. Stop feeding in winter.',
      intervalWeeks: 3,
    },
    pruning: {
      structural:
        'Cut back hard in late spring or summer; it buds from bare wood. Leave cuts unsealed, because cut paste traps moisture and causes rot, and hold off watering for a few days after big cuts.',
      maintenance:
        'Let each shoot make 4–6 pairs of leaves, then cut back to 1–2 pairs. Pinch constantly in summer to build fine branching.',
    },
    wiring: {
      detail:
        'Branches are soft and mark quickly, and they snap when full of water. Wire when the plant is slightly dry, use loose coils and remove the wire early.',
      bestTime: 'Late spring to summer',
      checkAfterWeeks: 4,
    },
    repotting: {
      detail:
        'Repot into dry, gritty mix and trim roots as needed; it tolerates heavy root reduction. Wait about a week before the first watering so the cut roots seal.',
      everyYears: 2,
      bestTime: 'Late spring to early summer',
      soilMix: [
        { ingredient: 'Pumice', parts: 2 },
        { ingredient: 'Lava rock', parts: 1 },
        { ingredient: 'Akadama', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 15,
      idealMaxC: 35,
      hardinessMinC: 2,
      detail:
        'It grows fastest in heat and takes temperatures above 40°C if the roots are not waterlogged. Frost turns the stems to mush.',
    },
    propagation:
      'Cuttings of any size root within a few weeks: let them dry for two or three days, then set them in barely moist pumice.',
    problems: [
      {
        name: 'Root and stem rot',
        signs: 'Soft, translucent stems and leaves dropping while the soil is wet, usually in cool weather.',
        fix: 'Cut back to firm tissue, let it dry for a week and replant in dry gritty mix; water sparingly until it grows.',
      },
      {
        name: 'Leaf drop from drought',
        signs: 'Leaves wrinkle, yellow and fall after a long dry period.',
        fix: 'Soak the pot thoroughly and resume regular watering; it re-leafs quickly in warmth.',
      },
      {
        name: 'Mealybugs',
        signs: 'White cottony tufts in leaf joints and on roots.',
        fix: 'Dab with alcohol on a cotton bud and repeat weekly, or use a systemic insecticide for heavy infestations.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'cascade', 'semi-cascade', 'root-over-rock'],
    calendar: {
      spring: ['Increase watering as growth restarts', 'Move outdoors after the last frost', 'Repot in late spring'],
      summer: ['Pinch shoots back to 1–2 leaf pairs', 'Feed every 3 weeks', 'Wire when slightly dry', 'Take cuttings'],
      autumn: ['Reduce watering', 'Stop feeding', 'Bring indoors before nights fall below 5°C'],
      winter: ['Water sparingly', 'Give as much direct light as possible', 'Check leaf joints for mealybugs'],
    },
    hotClimateNote:
      'Dwarf jade is an excellent choice for Abu Dhabi and grows outdoors all year. It takes full sun from October to April, but in peak summer give it shade from about 11am to 4pm to prevent leaf scorch, and water every one to two days because a small pot dries fast at 45°C.',
    toxicity:
      'It is non-toxic to people and pets and the leaves are edible, unlike the true jade plant (Crassula ovata), which is toxic to cats and dogs.',
  },
  {
    id: 'olive',
    emoji: '🫒',
    commonName: 'Olive',
    scientificName: 'Olea europaea',
    category: 'broadleaf evergreen',
    indoorSuitable: false,
    difficulty: 'easy',
    description:
      'A tough Mediterranean evergreen with grey-green leaves and bark that turns gnarled and fissured with age. It buds back on very old wood, carries deadwood convincingly and tolerates heat, wind and drought.',
    placement:
      'Keep it outdoors in full sun all year. In cold regions, protect the pot when temperatures fall below about -5°C.',
    watering: {
      detail:
        'Water thoroughly when the top of the soil has dried. It tolerates short dry spells better than constantly wet roots, but a potted olive in summer still needs regular water.',
      intervalDays: { spring: 3, summer: 1, autumn: 3, winter: 7 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced fertilizer from spring to autumn, pausing during extreme summer heat. Use solid organic pellets or liquid feed.',
      intervalWeeks: 4,
    },
    pruning: {
      structural:
        'Do heavy pruning in late winter to early spring before growth starts; strong trees can be cut back to bare stumps and will resprout. Seal large cuts.',
      maintenance:
        'Let shoots grow 6–8 pairs of leaves, then cut back to 2–3 pairs. Rub off unwanted buds on the trunk as they appear.',
    },
    wiring: {
      detail:
        'Wire shoots while they are young and still slightly green; hardened branches are stiff and split at the fork. Protect the bark with raffia for heavier bends.',
      bestTime: 'Autumn through early spring, or on new shoots in early summer',
      checkAfterWeeks: 10,
    },
    repotting: {
      detail:
        'Repot as buds begin to move, removing up to a third of the roots. Use a very free-draining, mostly inorganic mix.',
      everyYears: 3,
      bestTime: 'Early to mid spring',
      soilMix: [
        { ingredient: 'Pumice', parts: 2 },
        { ingredient: 'Akadama', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 10,
      idealMaxC: 35,
      hardinessMinC: -5,
      detail:
        'It handles heat above 40°C and light frost. A cool winter period around 5–12°C helps it rest and is needed for flowering and fruit.',
    },
    propagation:
      'Semi-hardwood cuttings root in summer, large hardwood cuttings and air layers also take, and collected stumps re-establish reliably.',
    problems: [
      {
        name: 'Olive scale',
        signs: 'Small brown or black bumps on stems and leaf undersides, with sticky honeydew and sooty mould.',
        fix: 'Scrub off with a soft brush and spray horticultural oil in the cooler part of the day, repeating after two weeks.',
      },
      {
        name: 'Root rot',
        signs: 'Leaves yellow and drop from the inside of the tree, and the soil stays wet for days.',
        fix: 'Repot into a grittier mix, cut out dead roots and let the surface dry between waterings.',
      },
      {
        name: 'Peacock spot',
        signs: 'Dark circular spots with a yellow halo on leaves, followed by leaf fall in damp weather.',
        fix: 'Remove affected leaves, improve air flow and apply a copper fungicide in autumn and late winter.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'literati', 'windswept', 'broom'],
    calendar: {
      spring: ['Repot as buds swell', 'Start feeding', 'Do structural pruning before growth'],
      summer: ['Water daily in heat', 'Cut shoots back to 2–3 leaf pairs', 'Rub off unwanted trunk buds'],
      autumn: ['Wire branches', 'Continue feeding until growth stops', 'Apply copper spray if leaf spot appeared'],
      winter: ['Protect the pot below -5°C', 'Water sparingly', 'Carve and treat deadwood'],
    },
    hotClimateNote:
      'Olives are well suited to Abu Dhabi and take full sun for most of the year. The weak point is the pot: in July and August shade the container or sink it into a larger one, water every morning, and do repotting and heavy pruning in February–March instead of in the heat.',
    toxicity: 'It is non-toxic to people and pets.',
  },
  {
    id: 'pomegranate',
    emoji: '🌺',
    commonName: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'flowering',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A deciduous shrub with a naturally twisting trunk, coppery new leaves, orange-red flowers and, on older trees, small fruit. The dwarf form (var. nana) keeps leaves, flowers and fruit in scale.',
    placement:
      'Grow it outdoors in full sun; it needs heat and strong light to flower. In cold-winter areas, shelter the pot from hard frost.',
    watering: {
      detail:
        'Water freely while it is in leaf and especially when in flower and fruit, as drying out makes buds and fruit drop. Once it is leafless, keep the soil only just moist.',
      intervalDays: { spring: 2, summer: 1, autumn: 3, winter: 7 },
    },
    fertilizing: {
      detail:
        'Use a balanced feed in spring, then switch to a lower-nitrogen, higher-potassium fertilizer from early summer to support flowers and fruit.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Prune hard in late winter while leafless, or just as buds swell. Large wounds heal slowly, so seal them or plan them as deadwood.',
      maintenance:
        'Flowers form at the tips of short new shoots, so let growth extend and flower before cutting back to 2–3 leaves. Remove suckers from the base and most of the fruit on small trees.',
    },
    wiring: {
      detail:
        'Old branches are brittle and break cleanly; wire shoots in their first year while still supple. Unwired clip-and-grow suits the angular character of the species.',
      bestTime: 'Late spring to early summer on new shoots, or late winter before bud break',
      checkAfterWeeks: 8,
    },
    repotting: {
      detail:
        'Repot as the buds begin to swell, removing up to a third of the roots. It flowers better when slightly pot-bound, so do not over-pot.',
      everyYears: 3,
      bestTime: 'Early spring, at bud swell',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 12,
      idealMaxC: 38,
      hardinessMinC: -5,
      detail:
        'It thrives in long, hot summers and tolerates light frost when dormant. A cool, dry winter rest improves flowering.',
    },
    propagation:
      'Hardwood cuttings taken in late winter root readily, as do softwood cuttings in summer; seed is easy but slow to flower.',
    problems: [
      {
        name: 'Flower and fruit drop',
        signs: 'Buds, flowers or young fruit fall before maturing.',
        fix: 'Keep watering even, give full sun, reduce nitrogen and thin the crop to a few fruit.',
      },
      {
        name: 'Aphids and whitefly',
        signs: 'Curled, sticky shoot tips or clouds of tiny white insects under the leaves.',
        fix: 'Wash off with a firm spray of water and follow with insecticidal soap weekly until clear.',
      },
      {
        name: 'Twig dieback',
        signs: 'Fine twigs die over winter or after the soil has dried out.',
        fix: 'Cut back to live wood in spring and keep the root ball from drying completely, even in dormancy.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'literati', 'windswept', 'semi-cascade'],
    calendar: {
      spring: ['Repot at bud swell', 'Start balanced feeding', 'Wire new shoots as they firm up'],
      summer: ['Water daily while flowering', 'Switch to low-nitrogen feed', 'Cut back shoots after flowering', 'Thin fruit'],
      autumn: ['Reduce watering as leaves colour', 'Stop feeding', 'Remove remaining fruit'],
      winter: ['Prune structure while leafless', 'Keep soil just moist', 'Protect the pot below -5°C'],
    },
    hotClimateNote:
      'Pomegranate has been grown across the Gulf for centuries and enjoys the heat in full sun. In a bonsai pot it needs watering once or twice a day in summer and some shade on the container, and in a mild Abu Dhabi winter it may only partly drop its leaves, so do your hard pruning and repotting in January–February.',
    toxicity:
      'The fruit is edible and the plant is not considered toxic to pets, though the root and stem bark contain alkaloids and should not be eaten.',
  },
  {
    id: 'chinese-elm',
    emoji: '🌳',
    commonName: 'Chinese elm',
    scientificName: 'Ulmus parvifolia',
    category: 'deciduous',
    indoorSuitable: true,
    difficulty: 'easy',
    description:
      'A fine-twigged elm with small serrated leaves and flaking bark, deciduous in cold climates and semi-evergreen in mild ones. It grows fast, buds back anywhere and builds ramification quickly.',
    placement:
      'Best outdoors in sun to light shade all year. It will live indoors in a very bright, cool window, but growth is weaker and more prone to pests.',
    watering: {
      detail:
        'Keep the soil evenly moist and water when the surface starts to dry. It dislikes both drying out completely and sitting permanently wet.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 5 },
    },
    fertilizing: {
      detail:
        'Feed generously with a balanced fertilizer from the time leaves harden in spring until autumn. Stop while the tree is dormant.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Cut back thick branches in late winter before buds open, or in early summer after the first flush hardens. It heals well and sprouts all around cuts.',
      maintenance:
        'Let shoots extend to 4–6 leaves, then trim back to 1–2. Repeat through the season and thin crowded twigs at the tips.',
    },
    wiring: {
      detail:
        'Branches bend easily, but the tree thickens fast and wire bites within weeks in the growing season. Combine light wiring with clip-and-grow.',
      bestTime: 'Late winter before bud break, or early summer after leaves harden',
      checkAfterWeeks: 6,
    },
    repotting: {
      detail:
        'Repot as buds swell, combing out and shortening the thick, rubbery roots. Arrange surface roots radially each time to build the root flare.',
      everyYears: 2,
      bestTime: 'Early spring, at bud swell',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 10,
      idealMaxC: 30,
      hardinessMinC: -8,
      detail:
        'It adapts to a wide range of climates. Trees raised in warm regions are less hardy, so protect the pot from hard frost.',
    },
    propagation:
      'Softwood cuttings root in early summer and root cuttings taken at repotting sprout readily; air layers are quick.',
    problems: [
      {
        name: 'Spider mites',
        signs: 'Leaves look dusty, speckled and bronzed, often on trees kept indoors or in hot, dry air.',
        fix: 'Hose down the foliage regularly, including the undersides, and apply a miticide weekly for three weeks.',
      },
      {
        name: 'Black spot',
        signs: 'Black blotches on leaves that then yellow and fall, mostly in wet weather.',
        fix: 'Remove infected leaves, water the soil rather than the foliage and spray a fungicide.',
      },
      {
        name: 'Leaf drop after a move',
        signs: 'Leaves yellow and fall when the tree goes from outdoors to indoors or into low light.',
        fix: 'Give it more light and keep watering moderate; it re-leafs once it adjusts.',
      },
    ],
    styles: ['informal-upright', 'broom', 'slanting', 'forest', 'root-over-rock'],
    calendar: {
      spring: ['Repot at bud swell', 'Begin feeding once leaves harden', 'Trim new shoots to 1–2 leaves'],
      summer: ['Water daily', 'Keep trimming shoots', 'Check wire every few weeks', 'Hose foliage to deter mites'],
      autumn: ['Feed until leaves colour', 'Remove wire', 'Thin crowded twigs'],
      winter: ['Prune and wire the bare structure', 'Protect the pot from hard frost', 'Keep soil just moist'],
    },
    hotClimateNote:
      'Chinese elm copes with Gulf heat better than most temperate trees and stays semi-evergreen in Abu Dhabi. Give it morning sun only from May to September, keep it watered daily and mist or hose the foliage to hold off spider mites; it will rest briefly in January, which is the time to repot.',
    toxicity: 'It is non-toxic to people and pets.',
  },
  {
    id: 'brazilian-rain-tree',
    emoji: '💧',
    commonName: 'Brazilian rain tree',
    scientificName: 'Pithecellobium tortum',
    category: 'tropical',
    indoorSuitable: true,
    difficulty: 'moderate',
    description:
      'A tropical legume with fine compound leaves that fold up at night and in strong heat, and a trunk that becomes fluted and muscular with age. It grows quickly in warmth and has small thorns on young shoots.',
    placement:
      'Keep it outdoors in sun to light shade when nights are above 12°C, and in a very bright window otherwise. Give it good air movement and steady warmth.',
    watering: {
      detail:
        'Keep it consistently moist; it is thirsty in warm weather and drops leaflets fast if the soil dries. Leaves folding in the middle of the day mean heat or water stress.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 3 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced fertilizer through the growing season. Being a legume it fixes some of its own nitrogen, so moderate strength is enough.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Prune in late spring or summer and always leave a stub of 1–2 cm, because branches die back from the cut. Remove the dry stub flush a few months later.',
      maintenance:
        'Let shoots grow to 6–8 leaves, then cut back to 2–3, again leaving a short stub. Trim often in summer, as it grows fast.',
    },
    wiring: {
      detail:
        'Wire shoots while still green and flexible; once they turn woody they become stiff and snap. Growth is fast, so wire marks appear quickly.',
      bestTime: 'Late spring to summer, on green shoots',
      checkAfterWeeks: 5,
    },
    repotting: {
      detail:
        'Repot in warm weather, removing up to a third of the roots, and keep it shaded and humid for two weeks. Do not repot in cool conditions.',
      everyYears: 2,
      bestTime: 'Late spring to early summer, with nights above 15°C',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 18,
      idealMaxC: 32,
      hardinessMinC: 7,
      detail:
        'It needs warmth all year and suffers below 10°C. Growth is strongest in warm, humid conditions.',
    },
    propagation:
      'Softwood and semi-hardwood cuttings root in summer heat, and scarified seed germinates quickly.',
    problems: [
      {
        name: 'Dieback after pruning',
        signs: 'A branch dies back past the cut to the next node or further.',
        fix: 'Always leave a stub when cutting and remove it only once it has dried out.',
      },
      {
        name: 'Leaflet drop',
        signs: 'Leaves stay folded, yellow and shed after the soil dries out or the tree gets cold.',
        fix: 'Restore even moisture and warmth; healthy trees push new leaves within a few weeks.',
      },
      {
        name: 'Root nematodes and mealybugs',
        signs: 'Weak growth with swollen knots on roots, or white cottony clusters in branch forks.',
        fix: 'Cut out badly galled roots and replace all the soil at repotting; treat mealybugs with alcohol or a systemic insecticide.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'broom', 'forest'],
    calendar: {
      spring: ['Move outside once nights stay above 12°C', 'Start fortnightly feeding', 'Repot in late spring'],
      summer: ['Water daily and never let it dry out', 'Trim shoots, leaving stubs', 'Wire green shoots'],
      autumn: ['Bring indoors before nights fall below 12°C', 'Reduce feeding', 'Remove dried pruning stubs'],
      winter: ['Keep warm and bright', 'Keep soil evenly moist', 'Watch for mealybugs'],
    },
    hotClimateNote:
      'It likes the Gulf warmth and can stay outdoors all year in Abu Dhabi, but the thin leaflets scorch in direct summer sun. From May to September keep it under 50% shade cloth or in bright shade, water morning and evening, and expect the leaves to fold during the hottest hours.',
    toxicity: 'It has no documented toxicity to people or pets, but the thorns on young shoots are sharp.',
  },
  {
    id: 'premna',
    emoji: '🌱',
    commonName: 'Premna',
    scientificName: 'Premna microphylla',
    category: 'tropical',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A fast-growing subtropical shrub prized in Southeast Asian bonsai for its small leaves, quick ramification and trunks that develop natural hollows and deadwood. The leaves have a strong musky smell when crushed.',
    placement:
      'Grow it outdoors in full sun to light shade through the warm months. Protect it from frost, and expect it to lose some or all of its leaves in a cool winter.',
    watering: {
      detail:
        'Water generously during growth and do not let it dry out, as it wilts quickly. Reduce watering when it is leafless or resting in cool weather.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 5 },
    },
    fertilizing: {
      detail:
        'It is a heavy feeder in warm weather; use a balanced fertilizer regularly while it is growing. Stop when growth pauses in the cool season.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Make big cuts in late spring to summer when it is growing strongly. Avoid heavy pruning in cool weather, when branches tend to die back.',
      maintenance:
        'Cut shoots back to 1–2 pairs of leaves once they have made 4–6 pairs. It needs trimming every few weeks in summer.',
    },
    wiring: {
      detail:
        'Young shoots are flexible, but older wood is brittle and breaks at the joint. Wire early and use clip-and-grow for the fine branching.',
      bestTime: 'Late spring to summer',
      checkAfterWeeks: 5,
    },
    repotting: {
      detail:
        'Repot in warm weather as growth begins, removing up to a third of the roots. Root growth is vigorous, so check the pot every year.',
      everyYears: 2,
      bestTime: 'Late spring',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 15,
      idealMaxC: 34,
      hardinessMinC: 0,
      detail:
        'It grows best in heat and humidity. Keep the pot frost-free; cold, wet roots cause dieback.',
    },
    propagation:
      'Softwood cuttings and root cuttings strike easily in summer, and thick branches air layer quickly.',
    problems: [
      {
        name: 'Winter dieback',
        signs: 'Fine twigs or whole branches fail to leaf out after a cold spell or winter pruning.',
        fix: 'Keep it frost-free, prune only in the warm season and cut back to live wood once growth resumes.',
      },
      {
        name: 'Caterpillars and leaf miners',
        signs: 'Chewed leaves or pale winding trails inside the leaf.',
        fix: 'Pick off caterpillars, remove mined leaves and use a suitable insecticide if damage continues.',
      },
      {
        name: 'Wilting',
        signs: 'Soft new shoots droop by midday in hot, dry weather.',
        fix: 'Water more often, add afternoon shade and move to a slightly deeper pot or more water-retentive mix.',
      },
    ],
    styles: ['informal-upright', 'slanting', 'windswept', 'semi-cascade', 'root-over-rock'],
    calendar: {
      spring: ['Repot as growth starts', 'Begin feeding', 'Cut back to live wood'],
      summer: ['Water daily', 'Trim shoots every few weeks', 'Wire young shoots', 'Feed every two weeks'],
      autumn: ['Stop heavy pruning', 'Reduce feeding', 'Remove tight wire'],
      winter: ['Keep frost-free', 'Water sparingly while resting', 'Refine deadwood and hollows'],
    },
    hotClimateNote:
      'Premna is grown widely in tropical Asia and handles Abu Dhabi heat well, growing almost all year. Give it full sun in the cooler months and afternoon shade from June to September, and be ready to water twice a day in summer because it wilts fast in a shallow pot.',
    toxicity: 'It is not known to be toxic to people or pets.',
  },
  {
    id: 'dwarf-schefflera',
    emoji: '🌴',
    commonName: 'Dwarf schefflera',
    scientificName: 'Schefflera arboricola',
    category: 'tropical',
    indoorSuitable: true,
    difficulty: 'easy',
    description:
      'A tough tropical with glossy umbrella-shaped compound leaves that tolerates low light and dry indoor air better than almost any other bonsai. In humidity it produces aerial roots, making it a natural for banyan and root-over-rock designs.',
    placement:
      'Indoors, keep it near a bright window; outdoors, give it bright shade or morning sun when nights are above 12°C. It survives low light but grows leggy.',
    watering: {
      detail:
        'Water thoroughly, then let the top few centimetres of soil dry before watering again. It tolerates some drought but rots if kept wet.',
      intervalDays: { spring: 3, summer: 2, autumn: 4, winter: 7 },
    },
    fertilizing: {
      detail:
        'Feed with a balanced liquid fertilizer while it is growing, less often in winter or in low light.',
      intervalWeeks: 3,
    },
    pruning: {
      structural:
        'Cut the trunk or branches back hard in late spring or summer; it reshoots just below the cut. This is the main way to get branching, as it rarely branches by itself.',
      maintenance:
        'Remove the largest leaves and cut back long shoots regularly. Healthy trees can be fully defoliated in summer to reduce leaf size.',
    },
    wiring: {
      detail:
        'Stems are soft, stay green for a long time and do not hold wire well; they scar and snap easily. Shape by pruning for direction, with only light wire or guy lines on young shoots.',
      bestTime: 'Summer, on young shoots',
      checkAfterWeeks: 6,
    },
    repotting: {
      detail:
        'Repot in warm weather and trim up to a third of the roots. It adapts well to shallow pots and rock plantings.',
      everyYears: 2,
      bestTime: 'Late spring to summer',
      soilMix: [
        { ingredient: 'Pumice', parts: 2 },
        { ingredient: 'Akadama', parts: 1 },
        { ingredient: 'Composted pine bark', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 16,
      idealMaxC: 30,
      hardinessMinC: 7,
      detail:
        'Normal room temperatures suit it all year. Keep it above 10°C and away from cold draughts.',
    },
    propagation:
      'Stem cuttings root readily in water or moist mix in warm conditions, and air layers are reliable.',
    problems: [
      {
        name: 'Root rot',
        signs: 'Leaves turn yellow or black and drop, and stems soften at the base in wet soil.',
        fix: 'Let the soil dry, cut away soft roots and stems, and repot into a faster-draining mix.',
      },
      {
        name: 'Scale and mealybugs',
        signs: 'Sticky leaves with brown bumps or white cottony tufts along stems and leaf stalks.',
        fix: 'Wipe off with alcohol and spray horticultural oil or insecticidal soap, repeating every 10 days.',
      },
      {
        name: 'Leggy growth',
        signs: 'Long bare stems with large leaves only at the tips.',
        fix: 'Move it into brighter light and cut the stems back hard in the growing season.',
      },
    ],
    styles: ['informal-upright', 'root-over-rock', 'forest', 'slanting'],
    calendar: {
      spring: ['Increase watering and feeding', 'Move to brighter light', 'Repot in late spring'],
      summer: ['Cut back hard to force branching', 'Defoliate healthy trees', 'Mist to encourage aerial roots'],
      autumn: ['Bring indoors before nights fall below 12°C', 'Reduce feeding', 'Check for pests'],
      winter: ['Water only when the top soil is dry', 'Keep away from cold draughts', 'Wipe dust from leaves'],
    },
    hotClimateNote:
      'It is one of the best indoor bonsai for an air-conditioned Gulf home, because it tolerates dry air and modest light. Outdoors in Abu Dhabi keep it in full shade from May to September, as direct summer sun burns the leaves within a day, and give it morning sun during the winter.',
    toxicity:
      'It contains calcium oxalate crystals and is toxic to cats and dogs, causing mouth irritation and vomiting; the sap can irritate skin.',
  },
  {
    id: 'juniper',
    emoji: '🌲',
    commonName: 'Juniper',
    scientificName: "Juniperus procumbens 'Nana'",
    category: 'conifer',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A low, spreading dwarf juniper with dense needle-like foliage and flexible branches, and the most common beginner conifer. It takes dramatic bends and deadwood well, but must live outdoors all year.',
    placement:
      'Keep it outdoors in full sun with good air movement, in every season. It needs a cold winter rest and will slowly die if kept indoors.',
    watering: {
      detail:
        'Water thoroughly when the top of the soil is slightly dry. Junipers dislike permanently wet roots but should never dry out fully, and a stressed tree stays green for weeks before showing it.',
      intervalDays: { spring: 3, summer: 1, autumn: 3, winter: 7 },
    },
    fertilizing: {
      detail:
        'Feed with solid organic fertilizer or a balanced liquid from spring to autumn. Hold back in the hottest part of summer and do not feed in winter.',
      intervalWeeks: 4,
    },
    pruning: {
      structural:
        'Remove unwanted branches in early spring or autumn, and convert stubs to jin instead of cutting flush. Never strip a branch of all its foliage, because bare juniper wood does not bud back.',
      maintenance:
        'Cut overlong shoots back to a side shoot with scissors, working inside the pad. Do not pinch all the growing tips, as that weakens the tree and browns the foliage.',
    },
    wiring: {
      detail:
        'Branches are very flexible and can be bent heavily, with raffia for severe bends. They take a long time to set, so wire often stays on for a full season.',
      bestTime: 'Autumn through late winter',
      checkAfterWeeks: 14,
    },
    repotting: {
      detail:
        'Repot before growth starts, removing no more than a third of the roots and never bare-rooting the tree. Keep some old soil for its beneficial fungi.',
      everyYears: 3,
      bestTime: 'Early spring',
      soilMix: [
        { ingredient: 'Akadama', parts: 1 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 5,
      idealMaxC: 28,
      hardinessMinC: -10,
      detail:
        'It is hardy and needs several weeks of cold below about 7°C each winter. Protect the pot from deep freezes and from drying winter wind.',
    },
    propagation:
      'Take semi-hardwood heel cuttings in summer or early autumn and root them in pumice; air layering works on thicker branches.',
    problems: [
      {
        name: 'Spider mites',
        signs: 'Foliage turns dull grey-green, then yellow and brown; tapping a branch over white paper shows moving specks.',
        fix: 'Hose the foliage forcefully every few days and apply a miticide three times at weekly intervals.',
      },
      {
        name: 'Tip blight',
        signs: 'Shoot tips turn brown and die back in warm, wet weather.',
        fix: 'Cut out affected tips with sterilised scissors, keep foliage dry and apply a copper or systemic fungicide.',
      },
      {
        name: 'Root rot',
        signs: 'Slow, general browning from the inside out, with soil that stays wet.',
        fix: 'Repot into a coarse inorganic mix in the right season and water only as the surface dries.',
      },
    ],
    styles: ['cascade', 'semi-cascade', 'informal-upright', 'windswept', 'literati'],
    calendar: {
      spring: ['Repot before growth starts', 'Begin feeding', 'Remove unwanted branches'],
      summer: ['Water daily in heat', 'Trim long shoots with scissors', 'Hose foliage to deter mites', 'Create and treat deadwood'],
      autumn: ['Wire and style', 'Thin old inner foliage', 'Give the last feed'],
      winter: ['Leave outdoors for dormancy', 'Protect the pot from deep freezes', 'Check wire and soil moisture'],
    },
    hotClimateNote:
      'Be realistic: junipers struggle in Abu Dhabi, because the summer heat cooks the roots and the winter is too warm for proper dormancy, so most decline over a few years. If you try one, keep it outside under 50% shade cloth from April to October, shade the pot, water in the early morning, never prune or repot in summer and put it in the coolest, most exposed spot you have in winter.',
    toxicity: 'The foliage can irritate skin and it is mildly toxic to pets and people if eaten.',
  },
  {
    id: 'japanese-black-pine',
    emoji: '🌲',
    commonName: 'Japanese black pine',
    scientificName: 'Pinus thunbergii',
    category: 'conifer',
    indoorSuitable: false,
    difficulty: 'demanding',
    description:
      'A powerful two-needle pine with dark green needles, white candles and deeply plated bark, regarded as the classic bonsai pine. Managing its vigour through seasonal candle and needle work takes practice.',
    placement:
      'Keep it outdoors in full sun all year, in an open, airy position. Shade weakens it and lengthens the needles.',
    watering: {
      detail:
        'Water thoroughly, then let the surface of the soil dry before watering again. It needs excellent drainage and resents constantly wet roots, but must not dry out completely in summer.',
      intervalDays: { spring: 3, summer: 1, autumn: 3, winter: 7 },
    },
    fertilizing: {
      detail:
        'Feed heavily with organic fertilizer from early spring until decandling, stop for about a month, then resume in late summer through autumn. Strong feeding is what makes the tree able to take decandling.',
      intervalWeeks: 4,
    },
    pruning: {
      structural:
        'Remove large branches in autumn or late winter, leaving a stub to dry or become jin. Always leave healthy needles on any branch you want to keep.',
      maintenance:
        'On healthy, well-fed trees, cut off the new spring candles in early summer to force a second, shorter flush. In late autumn, thin the new shoots to two per tip and pull old needles to balance strength.',
    },
    wiring: {
      detail:
        'Wire when sap flow is low so the bark does not separate. Branches set slowly, and wire commonly stays on for a year, so watch for swelling in the growing season.',
      bestTime: 'Late autumn through winter',
      checkAfterWeeks: 16,
    },
    repotting: {
      detail:
        'Repot as the buds begin to swell, removing no more than a third of the roots. Never bare-root it; keep some old soil to carry over the mycorrhizal fungi.',
      everyYears: 4,
      bestTime: 'Early spring, before candles extend',
      soilMix: [
        { ingredient: 'Akadama', parts: 1 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 5,
      idealMaxC: 32,
      hardinessMinC: -10,
      detail:
        'It enjoys hot summers and is hardy in winter, though the pot should be protected in prolonged deep cold. It needs a cool winter rest to stay vigorous.',
    },
    propagation:
      'Grow from seed sown in spring, which gives the best root base; cuttings rarely root and grafting is used for named varieties.',
    problems: [
      {
        name: 'Needle cast',
        signs: 'Yellow or brown bands on needles that later drop, usually on older foliage.',
        fix: 'Remove fallen and affected needles, improve air flow and spray copper fungicide in spring and autumn.',
      },
      {
        name: 'Root rot',
        signs: 'Needles yellow evenly and candles are weak, with soil that stays wet.',
        fix: 'Tilt the pot to improve drainage, water less often and repot into coarse mix at the next spring.',
      },
      {
        name: 'Aphids and scale',
        signs: 'Sticky needles, sooty mould or white flecks along the needles.',
        fix: 'Hose off aphids and treat scale with horticultural oil during cooler weather.',
      },
    ],
    styles: ['informal-upright', 'formal-upright', 'slanting', 'literati', 'cascade'],
    calendar: {
      spring: ['Repot before candles extend', 'Start heavy feeding', 'Spray copper against needle cast'],
      summer: ['Decandle healthy trees in early summer', 'Pause feeding for a month after decandling', 'Water daily in heat'],
      autumn: ['Thin new shoots to two per tip', 'Pull old needles', 'Resume feeding', 'Wire from late autumn'],
      winter: ['Wire and style', 'Protect the pot in deep cold', 'Water only when the surface is dry'],
    },
    hotClimateNote:
      'Black pine tolerates heat better than most conifers and is grown in subtropical regions, but Abu Dhabi is at the edge of what it accepts. Keep the needles in sun and the pot in shade, give 30% shade cloth in July and August, water at dawn, and accept that mild winters limit dormancy, so the tree may weaken over the years and should only be decandled when it is clearly vigorous.',
    toxicity: 'It has low toxicity, but chewed needles can upset the stomach of cats and dogs, and the resin can irritate skin.',
  },
  {
    id: 'japanese-maple',
    emoji: '🍁',
    commonName: 'Japanese maple',
    scientificName: 'Acer palmatum',
    category: 'deciduous',
    indoorSuitable: false,
    difficulty: 'demanding',
    description:
      'A delicate deciduous tree grown for its hand-shaped leaves, fine branching and strong spring and autumn colour. It needs cool roots, shelter from hot wind and a cold winter to stay healthy.',
    placement:
      'Keep it outdoors all year in morning sun and afternoon shade, sheltered from strong wind. Protect new leaves from late frost.',
    watering: {
      detail:
        'Keep the soil evenly moist and never let it dry out in leaf, as the leaf edges scorch quickly. Avoid waterlogging, and use rainwater if your tap water is hard.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 6 },
    },
    fertilizing: {
      detail:
        'Start feeding once the first leaves have hardened, using a gentle organic fertilizer. Keep nitrogen low on refined trees to hold short internodes, and stop feeding in mid-autumn.',
      intervalWeeks: 3,
    },
    pruning: {
      structural:
        'Cut large branches in late autumn after leaf fall or in early summer after the first flush hardens, and seal every wound. Avoid heavy cuts in late winter and early spring, when maples bleed sap.',
      maintenance:
        'On refined trees, pinch out the centre shoot as each bud opens to keep internodes short. Later, cut extending shoots back to one pair of leaves.',
    },
    wiring: {
      detail:
        'The bark is thin and marks easily, so use aluminium wire, apply it loosely and consider wrapping it in paper tape. Branches swell fast in spring.',
      bestTime: 'Late autumn after leaf fall, or early summer after partial defoliation',
      checkAfterWeeks: 6,
    },
    repotting: {
      detail:
        'Repot just as the buds swell and before leaves open, removing up to a third of the roots. Spread the surface roots flat and radially to build the root flare.',
      everyYears: 2,
      bestTime: 'Early spring, at bud swell',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 5,
      idealMaxC: 26,
      hardinessMinC: -10,
      detail:
        'It prefers mild summers and needs a real winter dormancy with many weeks below about 7°C. Leaves scorch above roughly 32°C, especially in dry wind.',
    },
    propagation:
      'Sow stratified seed in spring, take softwood cuttings in early summer or air layer in late spring once the leaves have hardened.',
    problems: [
      {
        name: 'Leaf scorch',
        signs: 'Leaf tips and edges turn brown and crisp in sun, heat or wind.',
        fix: 'Move it into afternoon shade and shelter, keep the soil evenly moist and avoid wetting leaves in strong sun.',
      },
      {
        name: 'Verticillium wilt',
        signs: 'A branch wilts and dies suddenly, and the cut wood shows dark streaks.',
        fix: 'Cut out affected branches well below the staining, sterilise tools between cuts and repot into fresh soil; there is no cure.',
      },
      {
        name: 'Aphids',
        signs: 'Clusters of small insects on soft new shoots, with curled, sticky leaves.',
        fix: 'Wash them off with water or use insecticidal soap, repeating until new growth is clean.',
      },
    ],
    styles: ['informal-upright', 'broom', 'forest', 'slanting', 'root-over-rock'],
    calendar: {
      spring: ['Repot at bud swell', 'Pinch new shoots on refined trees', 'Protect new leaves from late frost'],
      summer: ['Move into afternoon shade', 'Water daily', 'Partially defoliate strong trees in early summer'],
      autumn: ['Enjoy autumn colour', 'Stop feeding', 'Prune and wire after leaf fall'],
      winter: ['Keep outdoors for dormancy', 'Protect the pot from deep freezes', 'Refine the twig structure'],
    },
    hotClimateNote:
      'Japanese maple is not suited to Abu Dhabi: it scorches above about 32°C and needs a cold winter that the Gulf does not provide, so even well-kept trees usually fail within a few years. If you want to try, keep it in deep shade or a cool, bright room in summer, and give it 6–8 weeks of artificial dormancy at 2–5°C in a refrigerator each winter; otherwise choose a ficus or pomegranate instead.',
    toxicity: 'It is non-toxic to people, cats and dogs.',
  },
  {
    id: 'trident-maple',
    emoji: '🍂',
    commonName: 'Trident maple',
    scientificName: 'Acer buergerianum',
    category: 'deciduous',
    indoorSuitable: false,
    difficulty: 'moderate',
    description:
      'A vigorous maple with small three-lobed leaves, flaking bark and roots that fuse into a broad plate. It tolerates more sun and heat than Japanese maple and thickens fast, making it the standard species for root-over-rock.',
    placement:
      'Keep it outdoors in full sun for most of the year, with light afternoon shade in the hottest weeks. It needs winter cold, but the fleshy roots must be protected from hard freezing.',
    watering: {
      detail:
        'It is thirsty in leaf, so water as soon as the surface begins to dry, often daily or more in summer. Keep the soil only just moist when dormant.',
      intervalDays: { spring: 2, summer: 1, autumn: 2, winter: 6 },
    },
    fertilizing: {
      detail:
        'Feed heavily while developing the trunk, starting when the leaves harden. On refined trees, feed lightly and later to keep growth fine.',
      intervalWeeks: 2,
    },
    pruning: {
      structural:
        'Cut back hard after leaf fall or in early summer and seal the wounds; it calluses quickly. Avoid big cuts just before bud break, when the sap runs.',
      maintenance:
        'Trim extending shoots back to one or two pairs of leaves throughout the season. Thin crowded shoot tips to two at each junction.',
    },
    wiring: {
      detail:
        'Branches thicken very fast and wire bites in as little as three or four weeks in spring. Wire loosely, check often and rewire if needed.',
      bestTime: 'Late autumn after leaf fall, or early summer after defoliation',
      checkAfterWeeks: 4,
    },
    repotting: {
      detail:
        'Repot at bud swell; it tolerates hard root pruning, so cut downward roots away and spread the rest flat. Young trees fill a pot within a year.',
      everyYears: 2,
      bestTime: 'Early spring, at bud swell',
      soilMix: [
        { ingredient: 'Akadama', parts: 2 },
        { ingredient: 'Pumice', parts: 1 },
        { ingredient: 'Lava rock', parts: 1 },
      ],
    },
    temperature: {
      idealMinC: 5,
      idealMaxC: 30,
      hardinessMinC: -10,
      detail:
        'It copes with warm summers but needs a cold dormant period each winter. The water-filled roots are damaged if the pot freezes hard, so insulate it below about -5°C.',
    },
    propagation:
      'Sow stratified seed in spring, root softwood cuttings in early summer, or air layer; all are reliable.',
    problems: [
      {
        name: 'Leaf scorch',
        signs: 'Brown, dry leaf margins after hot sun, drying wind or a missed watering.',
        fix: 'Give afternoon shade in peak heat and water more often; a strong tree can be defoliated to regrow clean leaves.',
      },
      {
        name: 'Frozen roots',
        signs: 'Buds fail to open or shoots collapse in spring after a hard freeze.',
        fix: 'Protect the pot in a cold frame or mulch it into the ground whenever a hard freeze is forecast.',
      },
      {
        name: 'Aphids and powdery mildew',
        signs: 'Sticky, curled shoot tips, or a white powdery film on leaves in late summer.',
        fix: 'Wash off aphids with water or soap spray, improve air flow and use a fungicide for mildew.',
      },
    ],
    styles: ['root-over-rock', 'informal-upright', 'broom', 'forest', 'formal-upright'],
    calendar: {
      spring: ['Repot and root-prune at bud swell', 'Trim shoots to 1–2 leaf pairs', 'Check wire every few weeks'],
      summer: ['Water at least daily', 'Defoliate healthy trees in early summer', 'Give afternoon shade in heatwaves'],
      autumn: ['Reduce feeding', 'Prune and wire after leaf fall', 'Seal all cuts'],
      winter: ['Keep outdoors for dormancy', 'Insulate the pot below -5°C', 'Thin crowded twigs'],
    },
    hotClimateNote:
      'Trident maple handles heat far better than Japanese maple, but it still needs a cold winter that Abu Dhabi cannot give, so expect weak bud break and gradual decline after a few seasons. To give it a chance, keep it under 50% shade cloth and water twice a day from May to September, and chill it at 2–5°C for 6–8 weeks in midwinter once the leaves have dropped.',
    toxicity: 'It is non-toxic to people, cats and dogs.',
  },
]

export const BONSAI_TECHNIQUES: BonsaiTechnique[] = [
  {
    id: 'watering',
    name: 'Watering',
    summary:
      'Water when the tree needs it, not by the calendar: check the soil every day and soak the whole root ball once the surface has started to dry.',
    steps: [
      'Check the soil daily by pushing a finger about 1 cm into it, or by lifting the pot to judge its weight.',
      'Water when the top layer feels slightly dry, or sooner for thirsty species and later for succulents.',
      'Use a fine rose and water gently over the whole surface until water runs freely from the drainage holes.',
      'Wait a minute and water a second time, so that dry pockets inside the root ball are wetted.',
      'In hot weather water in the early morning, and check again in late afternoon.',
      'If the root ball has dried out completely, stand the pot in a basin of water for 10 minutes to rewet it.',
    ],
    mistakes: [
      'Watering on a fixed schedule regardless of weather, season or how fast the tree is drinking.',
      'Giving small sips that wet only the surface and leave the core of the root ball dry.',
      'Leaving the pot standing in a saucer of water, which suffocates the roots.',
    ],
  },
  {
    id: 'structural-pruning',
    name: 'Structural pruning',
    summary:
      'Structural pruning removes or shortens large branches to set the trunk line and the basic branch framework. Do it at the right time for the species, on a healthy tree only.',
    steps: [
      'Clear weeds and loose soil from the base, choose the front of the tree and study the trunk line before cutting anything.',
      'Remove dead branches, then obvious faults: two branches at the same height, branches crossing the trunk and thick branches high in the tree.',
      'Shorten the remaining branches so they are longest and thickest at the bottom and shorter toward the apex.',
      'Cut with concave cutters so the wound sits slightly hollow, and clean ragged edges with a sharp knife.',
      'Seal cuts larger than a pencil with cut paste, except on succulents such as dwarf jade.',
      'Keep the tree out of strong sun and wind for a few weeks and hold off repotting until it has recovered.',
    ],
    mistakes: [
      'Removing more than about a third of the foliage at once, or cutting conifers back to bare wood with no green left.',
      'Heavy pruning and repotting a weak tree in the same season.',
      'Cutting flush on species that die back, instead of leaving a short stub to remove later.',
    ],
  },
  {
    id: 'maintenance-pruning',
    name: 'Maintenance pruning',
    summary:
      'Regular trimming through the growing season keeps the outline, pushes energy to inner and lower shoots and builds fine branching.',
    steps: [
      'Let new shoots extend to 6–8 leaves so the tree gains strength before you cut.',
      'Cut each shoot back to 1–3 leaves, ending on a leaf or bud that points in the direction you want the next shoot to grow.',
      'Trim the top and outer areas harder than the lower and inner branches, since trees send most energy upward and outward.',
      'Remove shoots growing straight up, straight down or back toward the trunk.',
      'Thin dense pads so light and air reach the interior, keeping two shoots at each junction.',
    ],
    mistakes: [
      'Shearing the outline like a hedge, which leaves cut leaves and a dense shell with a dead interior.',
      'Trimming a weak tree constantly so that it never gets to rebuild strength.',
      'Pinching juniper tips with your fingers across the whole tree, which browns and weakens the foliage.',
    ],
  },
  {
    id: 'wiring',
    name: 'Wiring',
    summary:
      'Wrapping branches with aluminium or copper wire lets you bend them into place and hold them until they set. The wire must come off before it cuts into the bark.',
    steps: [
      'Choose wire about one third the thickness of the branch: annealed aluminium for most species, copper for conifers.',
      'Anchor the wire by wrapping it at least once around the trunk or by wiring two branches of similar size with one piece.',
      'Wind the wire along the branch at about 45 degrees, snug but not tight, without trapping leaves or needles.',
      'Bend slowly with both hands, supporting the outside of the bend with your thumbs, and place the wire so it runs along the outside of the curve.',
      'Keep the tree in light shade for a couple of weeks and check the wire regularly during the growing season.',
      'Remove the wire by cutting it at every turn with wire cutters; do not unwind it.',
    ],
    mistakes: [
      'Leaving wire on until it bites in and leaves spiral scars that take years to fade.',
      'Crossing wires or wrapping too loosely, so the wire neither holds nor protects the branch.',
      'Bending brittle or freshly watered, sap-filled branches sharply and snapping them.',
    ],
  },
  {
    id: 'repotting',
    name: 'Repotting',
    summary:
      'Repotting renews the soil and prunes the roots so the tree does not become pot-bound and starved of air. Most species are repotted every two to four years, just as growth is about to start.',
    steps: [
      'Prepare the pot first: cover the drainage holes with mesh and thread tie-down wires through the base.',
      'Cut the old tie wires, lift the tree out and rake the old soil away from the outside and underside with a root hook or chopstick.',
      'Prune thick downward roots and trim the remaining roots, removing no more than about a third of the root mass.',
      'Spread a drainage layer of coarse mix, set the tree slightly off-centre at the right height and angle, and wire it firmly so it cannot rock.',
      'Fill with fresh soil and work it between the roots with a chopstick until there are no air pockets.',
      'Water until it runs clear, then keep the tree in shade and out of wind for 2–4 weeks and do not fertilize for a month.',
    ],
    mistakes: [
      'Repotting at the wrong time of year, such as in midsummer heat or deep dormancy.',
      'Bare-rooting pines and junipers, which removes the fungi their roots depend on.',
      'Leaving the tree loose in the pot, so new roots tear every time it moves.',
    ],
  },
  {
    id: 'defoliation',
    name: 'Defoliation',
    summary:
      'Removing some or all of the leaves in early summer forces a second flush of smaller leaves and finer twigs. It is stressful and is only for vigorous deciduous and broadleaf tropical trees.',
    steps: [
      'Confirm the tree is healthy and strong, and that it has not been repotted this year.',
      'Wait until the spring leaves have fully hardened, usually in early summer.',
      'Cut through each leaf stalk with fine scissors, leaving the stalk attached to protect the bud at its base.',
      'Defoliate strong areas such as the top and outer branches fully, and leave more leaves on weak and inner branches.',
      'Use the bare view to wire and to prune out crowded twigs.',
      'Give light shade and water less until new leaves open in 2–4 weeks, then resume normal care and feeding.',
    ],
    mistakes: [
      'Defoliating conifers, weak trees or species that resent it, which can kill branches or the whole tree.',
      'Doing it too late in the season, leaving too little time for the new leaves to mature.',
      'Watering as heavily as before, although a leafless tree uses far less water.',
    ],
  },
  {
    id: 'deadwood',
    name: 'Deadwood (jin & shari)',
    summary:
      'Jin is a branch or apex stripped of bark, and shari is a strip of bare wood along the trunk; both suggest age and hardship. They suit conifers and tough species such as olive, and should follow the natural lines of the tree.',
    steps: [
      'Decide what to create and mark it with chalk, making sure a continuous live vein of bark connects the roots to every living branch.',
      'For a jin, cut a ring through the bark at the base of the branch, crush the bark with jin pliers and peel it off; this is easiest in the growing season.',
      'Shape the jin by gripping slivers of wood with pliers and tearing them back along the grain, so that it tapers naturally.',
      'For a shari, score the outline with a sharp knife, peel the bark between the lines and start narrow; you can widen it in later years.',
      'Refine the surface with gravers or a wire brush, following the grain and avoiding obvious tool marks.',
      'Let the wood dry for a few weeks, then brush on lime sulfur on a dry day to bleach and preserve it, keeping it off the soil and foliage.',
    ],
    mistakes: [
      'Cutting through the live vein that feeds a branch, which kills everything above it.',
      'Making deadwood smooth, symmetrical or too wide, so it looks carved, not weathered.',
      'Adding deadwood to species that rot quickly or do not form it naturally, without treating the wood.',
    ],
  },
  {
    id: 'fertilizing',
    name: 'Fertilizing',
    summary:
      'Bonsai soil holds few nutrients, so regular feeding during the growing season is essential. Match the amount to your goal: feed heavily to thicken trunks and lightly to keep refined trees compact.',
    steps: [
      'Start feeding when new growth has opened and hardened in spring, and stop when growth ends for the season.',
      'Choose solid organic pellets or cakes for slow, steady release, or a liquid fertilizer for faster control.',
      'Water the tree first, then apply liquid feed at the label rate or weaker; place solid fertilizer on the soil surface away from the trunk.',
      'Use a balanced feed for general growth, and switch to lower nitrogen with more potassium for flowering and fruiting species before they bloom.',
      'Replace solid fertilizer every 4–6 weeks, and flush the pot with plain water once a month to clear built-up salts.',
    ],
    mistakes: [
      'Fertilizing a dry, sick or freshly repotted tree, which burns the roots.',
      'Giving high-nitrogen feed to a refined tree, producing long internodes and oversized leaves.',
      'Continuing to feed during dormancy or extreme heat, when the tree cannot use it.',
    ],
  },
]
