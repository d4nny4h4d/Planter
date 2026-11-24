import type { LibraryPlant } from '../lib/types'

export const PLANT_LIBRARY: LibraryPlant[] = [
  // ───────────────────────── Outdoor / Gulf ─────────────────────────
  {
    id: 'bougainvillea',
    emoji: '🌸',
    commonName: 'Bougainvillea',
    scientificName: 'Bougainvillea × buttiana',
    family: 'Nyctaginaceae',
    otherNames: ['Paper flower', 'Jahanamiya'],
    description:
      'A vigorous, thorny scrambling shrub covered in papery coloured bracts for much of the year. It thrives on heat, sun and a little neglect, which makes it one of the most reliable flowering plants in the Gulf.',
    placement: 'outdoor',
    difficulty: 'easy',
    watering: {
      summary: 'Deep, then let it dry',
      detail:
        'Soak the root ball thoroughly, then wait until the top 5 cm of soil is dry before watering again. Slight drought stress triggers flowering, while constantly wet soil gives you leaves and root rot instead of colour.',
      intervalDays: { spring: 7, summer: 4, autumn: 8, winter: 14 },
    },
    temperature: {
      label: 'Heat lover',
      idealMinC: 18,
      idealMaxC: 38,
      hardinessMinC: 0,
      detail:
        'It grows and flowers best in warm to hot weather and shrugs off Gulf summers once established. Frost burns the foliage and a hard freeze can kill the plant to the ground.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6+ hours of direct sun',
      detail:
        'Flowering depends almost entirely on light. In shade it grows long green shoots and very few bracts.',
      tip: 'Put it against the sunniest wall you have; reflected heat that scorches other plants suits it well.',
    },
    fertilizer: {
      summary: 'Every 4 weeks while growing',
      npk: '6-8-10',
      intervalWeeks: 4,
      detail:
        'Use a feed that is modest in nitrogen and higher in potassium, with added iron and magnesium. Too much nitrogen pushes leafy growth at the expense of bracts.',
      amount: 'Half the label rate for pots; one handful of granules per square metre in the ground',
    },
    soil: {
      summary: 'Gritty, fast draining',
      detail:
        'Roots are fine and brittle and rot quickly in heavy soil. Use an open, sandy mix and a pot with generous drainage holes.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Coarse sand', parts: 2 },
        { ingredient: 'Perlite or pumice', parts: 1 },
        { ingredient: 'Composted bark', parts: 1 },
      ],
      phMin: 5.5,
      phMax: 6.5,
      alternatives: ['Cactus mix with one third compost', 'Sweet soil blended 1:1 with washed sand'],
    },
    humidity: {
      level: 'low',
      minPct: 25,
      maxPct: 60,
      detail: 'Dry air is no problem. Persistent humidity with poor airflow can encourage leaf spot.',
      tip: 'Water at the base in the morning rather than wetting the foliage.',
    },
    pruning: {
      bestTime: 'After each flush of bracts fades, with a harder cut in late winter',
      detail:
        'It flowers on new growth, so shorten the long whippy shoots by a third after each bloom cycle. Remove weak inner twigs to keep air moving through the plant.',
    },
    propagation: {
      methods: ['Semi-hardwood cuttings', 'Air layering'],
      detail:
        'Take 15 cm cuttings of firm, pencil-thick wood in warm weather, dip in rooting hormone and set in damp sand and perlite. Rooting takes 6-10 weeks and is slower for some varieties.',
    },
    problems: [
      {
        name: 'No flowers',
        signs: 'Lush green growth with few or no coloured bracts.',
        fix: 'Move to full sun, cut back on water and nitrogen, and let the soil dry between waterings.',
      },
      {
        name: 'Iron chlorosis',
        signs: 'Young leaves turn yellow while the veins stay green.',
        fix: 'Apply chelated iron (EDDHA type for alkaline water) and flush salts from the pot with a long soak.',
      },
      {
        name: 'Bougainvillea looper and aphids',
        signs: 'Scalloped leaf edges, or sticky clusters of insects on soft tips.',
        fix: 'Pick caterpillars at dusk or use Bt spray; knock aphids off with water or insecticidal soap.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail:
        'Not considered poisonous, but the sap can cause a mild skin rash and eating a lot of leaves may upset a pet stomach. The thorns are the real hazard.',
    },
    precautions: [
      'Wear thick gloves and long sleeves when pruning; thorn scratches can become inflamed.',
      'Disturb the roots as little as possible when repotting.',
      'Keep away from paths and play areas where thorns can catch skin.',
    ],
    uses: 'Grown as a hedge, screen, pergola cover and bonsai subject. In parts of Latin America the bracts are traditionally steeped as a tea.',
  },
  {
    id: 'orange-jasmine',
    emoji: '🌼',
    commonName: 'Orange jasmine',
    scientificName: 'Murraya paniculata',
    family: 'Rutaceae',
    otherNames: ['Orange jessamine', 'Mock orange', 'Kamini'],
    description:
      'A dense evergreen shrub with glossy dark leaves and clusters of white flowers that smell of orange blossom, followed by small red berries. It is widely used for hedging in warm climates.',
    placement: 'outdoor',
    difficulty: 'easy',
    watering: {
      summary: 'Evenly moist, never soggy',
      detail:
        'Water when the top 2-3 cm of soil has dried. It tolerates short dry spells once established but drops leaves and buds if the root ball dries right out.',
      intervalDays: { spring: 5, summer: 3, autumn: 6, winter: 10 },
    },
    temperature: {
      label: 'Warm climate preferred',
      idealMinC: 16,
      idealMaxC: 34,
      hardinessMinC: -1,
      detail:
        'It grows through warm weather and flowers in several flushes a year. Light frost scorches the leaves and prolonged cold below freezing can kill it.',
    },
    sunlight: {
      level: 'partial sun',
      hours: '4-6 hours of direct sun',
      detail:
        'It flowers best with plenty of sun but appreciates shade from the fiercest afternoon light in very hot summers.',
      tip: 'In the Gulf, give it morning sun and filtered light after midday from June to September.',
    },
    fertilizer: {
      summary: 'Every 6 weeks in the growing season',
      npk: '10-10-10',
      intervalWeeks: 6,
      detail:
        'A balanced feed with trace elements keeps the foliage dark. Like its citrus relatives it yellows quickly when short of iron or magnesium.',
      amount: 'Label rate for shrubs; half rate for containers',
    },
    soil: {
      summary: 'Rich and well drained',
      detail:
        'It likes a fertile, slightly acidic to neutral soil that holds moisture without staying wet.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Coarse sand', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1 },
        { ingredient: 'Well-rotted manure or leaf mould', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.5,
      alternatives: ['Citrus potting mix', 'Loam-based compost with added grit'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 70,
      detail: 'Moderate humidity suits it. In very dry heat the leaf tips can brown and spider mites move in.',
      tip: 'Mulch the root zone and hose the foliage in the early morning during dry spells.',
    },
    pruning: {
      bestTime: 'Straight after a flush of flowers',
      detail:
        'It takes clipping well and can be shaped as a hedge or small standard. Trim lightly and often rather than cutting hard into old wood.',
    },
    propagation: {
      methods: ['Semi-hardwood cuttings', 'Seed'],
      detail:
        'Root 10 cm cuttings in warm, humid conditions, or sow the cleaned seed from ripe red berries while fresh. Seedlings flower within two to three years.',
    },
    problems: [
      {
        name: 'Yellow leaves',
        signs: 'Pale new growth with green veins, or overall yellowing.',
        fix: 'Apply chelated iron and a magnesium supplement, and check that the pot is draining freely.',
      },
      {
        name: 'Scale and sooty mould',
        signs: 'Brown bumps on stems with black, sticky film on the leaves.',
        fix: 'Spray with horticultural oil in the cool of the evening and repeat after two weeks.',
      },
      {
        name: 'Citrus psyllid',
        signs: 'Twisted, notched new leaves with tiny waxy insects on the tips.',
        fix: 'Prune off infested tips and treat new growth with neem or insecticidal soap.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Not known to be toxic to cats, dogs or people. The berries are not a food crop and are best left uneaten.',
    },
    precautions: [
      'It can host the citrus psyllid, so inspect it regularly if you also grow citrus.',
      'The scent is strong in the evening; site it away from bedroom windows if you are sensitive to perfume.',
    ],
    uses: 'Planted for scented hedges and as a bonsai subject. The flowers are traditionally used in garlands and the hard, fine-grained wood for small carved items.',
  },
  {
    id: 'frangipani',
    emoji: '💮',
    commonName: 'Frangipani',
    scientificName: 'Plumeria rubra',
    family: 'Apocynaceae',
    otherNames: ['Plumeria', 'Temple tree'],
    description:
      'A small tree with thick succulent branches, long leathery leaves and intensely fragrant waxy flowers in white, yellow, pink or red. It rests leafless in the cooler months and returns with the heat.',
    placement: 'outdoor',
    difficulty: 'easy',
    watering: {
      summary: 'Generous in growth, dry at rest',
      detail:
        'Water deeply when the top few centimetres are dry while it is in leaf. Once the leaves fall, keep it almost dry until new growth appears.',
      intervalDays: { spring: 7, summer: 5, autumn: 10, winter: 28 },
    },
    temperature: {
      label: 'Tropical warmth',
      idealMinC: 18,
      idealMaxC: 35,
      hardinessMinC: 2,
      detail:
        'It needs warmth to grow and flower and goes dormant below about 12 °C. Frost turns the branch tips to mush.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6+ hours of direct sun',
      detail: 'Full sun is needed for flowering. Shaded plants grow leggy and bloom poorly.',
      tip: 'In peak Gulf summer, shade the trunk of young plants from late afternoon sun to prevent bark scald.',
    },
    fertilizer: {
      summary: 'Every 3 weeks from spring to early autumn',
      npk: '10-30-10',
      intervalWeeks: 3,
      detail:
        'A high-phosphorus feed encourages flower clusters rather than leaf. Stop feeding when the leaves start to yellow and drop.',
      amount: 'Label rate diluted in the watering can; none while dormant',
    },
    soil: {
      summary: 'Very free draining',
      detail: 'Treat it like a succulent: the mix should drain within seconds and never stay wet around the stem base.',
      mix: [
        { ingredient: 'Cactus compost', parts: 3 },
        { ingredient: 'Pumice or perlite', parts: 2 },
        { ingredient: 'Coarse sand', parts: 1 },
        { ingredient: 'Composted bark', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Half potting compost, half perlite', 'Coco chips with pumice'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 80,
      detail: 'It is happy in humid coastal air and tolerates dry air if well watered.',
      tip: 'Good airflow matters more than humidity; space plants so the leaves dry quickly.',
    },
    pruning: {
      bestTime: 'Late winter, before new leaves appear',
      detail:
        'Prune only to shape or remove damaged wood, cutting back to a fork. Each cut usually produces two or three new branches, but those tips will not flower for a year or so.',
    },
    propagation: {
      methods: ['Stem cuttings', 'Seed', 'Grafting'],
      detail:
        'Take 30 cm tip cuttings in warm weather and let the cut end dry for one to two weeks before setting in barely damp gritty mix. Do not water until leaves begin to grow.',
    },
    problems: [
      {
        name: 'Frangipani rust',
        signs: 'Orange powdery pustules on the underside of leaves, followed by early leaf drop.',
        fix: 'Collect and bin fallen leaves, improve airflow and apply a suitable fungicide if it returns every year.',
      },
      {
        name: 'Stem rot',
        signs: 'Soft, wrinkled or blackened branch tips or base, often after a cold, wet spell.',
        fix: 'Cut back to firm white tissue, let it dry and keep the plant dry and warm.',
      },
      {
        name: 'Spider mites and mealybugs',
        signs: 'Fine stippling and webbing, or white cottony clusters at leaf bases.',
        fix: 'Hose down the foliage and treat with insecticidal soap or horticultural oil.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'The milky sap irritates skin and eyes, and eating any part can cause drooling, vomiting and diarrhoea in pets and people.',
    },
    precautions: [
      'Wear gloves when cutting; wash sap off skin promptly.',
      'Never water a leafless plant heavily.',
      'Branches are brittle, so shelter it from strong wind.',
    ],
    uses: 'The flowers are used for leis, garlands and temple offerings, and the scent is a classic perfumery note.',
  },
  {
    id: 'desert-rose',
    emoji: '🌹',
    commonName: 'Desert rose',
    scientificName: 'Adenium obesum',
    family: 'Apocynaceae',
    otherNames: ['Adenium', 'Sabi star', 'Impala lily'],
    description:
      'A succulent shrub with a swollen water-storing base (caudex) and trumpet flowers in pink, red or white. It is native to arid parts of Africa and Arabia and is superbly suited to desert heat.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Soak and dry; dry in winter',
      detail:
        'In warm weather water thoroughly whenever the mix has dried out completely. When it drops its leaves in cool weather, stop almost entirely; a wet caudex in the cold rots fast.',
      intervalDays: { spring: 8, summer: 5, autumn: 12, winter: 30 },
    },
    temperature: {
      label: 'Hot and dry',
      idealMinC: 20,
      idealMaxC: 38,
      hardinessMinC: 5,
      detail:
        'It grows only in real warmth and goes dormant below about 15 °C. Temperatures under 5 °C can kill it, especially if the soil is damp.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6+ hours of direct sun',
      detail: 'Strong sun keeps growth compact and flowering heavy. Indoors it rarely gets enough light to bloom.',
      tip: 'When you raise the caudex at repotting, shade the newly exposed skin for a few weeks so it does not sunburn.',
    },
    fertilizer: {
      summary: 'Every 4 weeks in warm months',
      npk: '5-10-10',
      intervalWeeks: 4,
      detail: 'Use a diluted low-nitrogen feed while it is in leaf and growing. Do not feed a dormant or leafless plant.',
      amount: 'Half the label rate in the watering can',
    },
    soil: {
      summary: 'Mineral, sharply drained',
      detail: 'Use a mostly inorganic mix in a shallow pot so the roots dry within a few days.',
      mix: [
        { ingredient: 'Pumice or perlite', parts: 3 },
        { ingredient: 'Cactus compost', parts: 2 },
        { ingredient: 'Coarse sand or fine gravel', parts: 1.5 },
        { ingredient: 'Coco coir', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Bonsai mix of pumice, lava rock and bark', 'Cactus mix cut 1:1 with perlite'],
    },
    humidity: {
      level: 'low',
      minPct: 20,
      maxPct: 55,
      detail: 'Dry air is ideal. High humidity combined with wet soil is the usual cause of rot.',
      tip: 'In humid summer months water in the morning and let the surface dry by evening.',
    },
    pruning: {
      bestTime: 'Early in the warm growing season',
      detail:
        'Cut long bare stems back by a third to encourage branching and more flowering tips. Let cuts dry in the open and keep water off them for a few days.',
    },
    propagation: {
      methods: ['Seed', 'Stem cuttings', 'Grafting'],
      detail:
        'Seed germinates in about a week at 28-30 °C and gives the fattest caudex. Cuttings root readily after drying for a few days but form a less swollen base.',
    },
    problems: [
      {
        name: 'Caudex rot',
        signs: 'The base turns soft and squashy, and leaves yellow and fall.',
        fix: 'Unpot, cut away all soft tissue, dust with sulphur or cinnamon, dry for a week and replant in fresh dry mix.',
      },
      {
        name: 'Spider mites',
        signs: 'Dull, speckled leaves with fine webbing in hot dry weather.',
        fix: 'Rinse the undersides of leaves and apply a miticide or insecticidal soap weekly for three weeks.',
      },
      {
        name: 'Mealybugs',
        signs: 'White fluffy patches in leaf joints and on flower buds.',
        fix: 'Dab with alcohol on a cotton bud and follow up with horticultural oil.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'All parts and especially the sap contain cardiac glycosides and are highly poisonous if eaten. The sap can also irritate skin and eyes.',
    },
    precautions: [
      'Wear gloves when pruning and wash tools and hands afterwards.',
      'Keep well out of reach of children and pets.',
      'Never leave it sitting in a saucer of water.',
    ],
    uses: 'Grown as an ornamental and bonsai-style specimen. The sap was traditionally used as an arrow poison in parts of Africa, which shows how toxic it is.',
  },
  {
    id: 'hibiscus',
    emoji: '🌺',
    commonName: 'Hibiscus',
    scientificName: 'Hibiscus rosa-sinensis',
    family: 'Malvaceae',
    otherNames: ['Chinese hibiscus', 'Shoe flower', 'Rose of China'],
    description:
      'An evergreen shrub with glossy leaves and large, short-lived flowers in almost every warm colour. Each bloom lasts a day or two, but a healthy plant produces them continuously in warm weather.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Regular and consistent',
      detail:
        'Keep the soil evenly moist in warm weather and water when the top 2 cm has dried. Swings between drought and flood make it drop buds.',
      intervalDays: { spring: 4, summer: 2, autumn: 5, winter: 9 },
    },
    temperature: {
      label: 'Warm climate preferred',
      idealMinC: 16,
      idealMaxC: 32,
      hardinessMinC: 1,
      detail:
        'It flowers best between 18 and 32 °C. Above about 38 °C buds often abort, and frost kills the top growth.',
    },
    sunlight: {
      level: 'full sun',
      hours: '5-6 hours of direct sun',
      detail: 'It needs strong light to flower, but in extreme heat the leaves and blooms scorch in all-day sun.',
      tip: 'Give it morning sun and light afternoon shade in the Gulf summer, and full sun in winter.',
    },
    fertilizer: {
      summary: 'Every 2 weeks while flowering',
      npk: '17-5-24',
      intervalWeeks: 2,
      detail:
        'Hibiscus is a heavy feeder that wants high potassium, moderate nitrogen and low phosphorus. Excess phosphorus builds up and locks out other nutrients.',
      amount: 'Half the label rate with every second watering',
    },
    soil: {
      summary: 'Moist but well drained, slightly acidic',
      detail: 'Use a rich mix that holds water yet lets air reach the roots.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Coco coir', parts: 2 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Composted bark', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Peat-free multipurpose compost with a third perlite', 'Loam-based compost with added leaf mould'],
    },
    humidity: {
      level: 'medium',
      minPct: 45,
      maxPct: 75,
      detail: 'It enjoys humid air and sulks in hot, dry wind, which also invites spider mites.',
      tip: 'Group it with other plants and mulch the pot surface to keep the roots cool.',
    },
    pruning: {
      bestTime: 'Late winter to early spring',
      detail:
        'Flowers form on new wood, so cut each branch back by about a third to a outward-facing bud. Pinch tips during the season for a bushier plant.',
    },
    propagation: {
      methods: ['Softwood cuttings', 'Semi-hardwood cuttings', 'Grafting'],
      detail:
        'Take 10-12 cm tip cuttings in warm weather, strip the lower leaves and root under a clear cover in perlite and coir. Roots form in four to six weeks.',
    },
    problems: [
      {
        name: 'Bud drop',
        signs: 'Buds yellow and fall before opening.',
        fix: 'Even out the watering, shade from extreme afternoon heat and check for thrips inside the buds.',
      },
      {
        name: 'Mealybugs and aphids',
        signs: 'Cottony masses or clusters of soft insects on shoot tips, with sticky leaves.',
        fix: 'Wash off with a firm jet of water and treat with insecticidal soap or neem every week until clear.',
      },
      {
        name: 'Yellow leaves',
        signs: 'Older leaves turn yellow and drop in numbers.',
        fix: 'Usually stress from a sudden change in water, light or temperature; restore steady care and feed lightly.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Generally regarded as non-toxic; the flowers are edible. A pet that eats a large amount may have mild stomach upset.',
    },
    precautions: [
      'Avoid moving it while in bud; a change of position often causes bud drop.',
      'Check the undersides of leaves weekly for pests in hot weather.',
      'Do not use high-phosphorus bloom boosters.',
    ],
    uses: 'The flowers are used as an edible garnish and in traditional hair rinses, and the petals were once used to blacken shoes, hence the name shoe flower.',
  },
  {
    id: 'arabian-jasmine',
    emoji: '🤍',
    commonName: 'Arabian jasmine',
    scientificName: 'Jasminum sambac',
    family: 'Oleaceae',
    otherNames: ['Full', 'Mogra', 'Sampaguita'],
    description:
      'A sprawling evergreen shrub with small white flowers that carry one of the richest scents in the plant world. It blooms in waves through the warm months and is a traditional favourite in Gulf gardens.',
    placement: 'outdoor',
    difficulty: 'easy',
    watering: {
      summary: 'Keep evenly moist',
      detail:
        'Water when the surface feels dry, keeping the root ball moist through the flowering season. Ease off in the cooler months when growth slows.',
      intervalDays: { spring: 4, summer: 2, autumn: 5, winter: 10 },
    },
    temperature: {
      label: 'Warm and humid',
      idealMinC: 18,
      idealMaxC: 35,
      hardinessMinC: -1,
      detail:
        'It flowers hardest in hot, humid weather and slows right down below 15 °C. A light frost burns the leaves but established plants usually reshoot.',
    },
    sunlight: {
      level: 'full sun',
      hours: '4-6 hours of direct sun',
      detail: 'Sun drives flowering, though it also blooms well with half a day of direct light.',
      tip: 'Against a west-facing wall in the Gulf, use shade cloth in midsummer to stop the leaves bleaching.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, spring to autumn',
      npk: '7-9-5',
      intervalWeeks: 4,
      detail: 'A feed slightly higher in phosphorus supports repeat flowering. Add chelated iron if the new leaves pale.',
      amount: 'Label rate for flowering shrubs; half rate in pots',
    },
    soil: {
      summary: 'Fertile, moist, well drained',
      detail: 'It likes organic-rich soil that never dries hard or stays waterlogged.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Coco coir', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Well-rotted manure', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.5,
      alternatives: ['Loam-based compost with grit', 'Multipurpose compost with a quarter coarse sand'],
    },
    humidity: {
      level: 'medium',
      minPct: 45,
      maxPct: 80,
      detail: 'Humid air suits it and improves flower size. In dry air, buds may brown before opening.',
      tip: 'Hose the foliage in the early morning in dry weather, which also keeps mites down.',
    },
    pruning: {
      bestTime: 'After each main flush of flowers',
      detail:
        'Cut flowered shoots back by a third to promote branching, because blooms form at the tips of new growth. Tie in or shorten long wandering stems to keep it tidy.',
    },
    propagation: {
      methods: ['Semi-hardwood cuttings', 'Layering'],
      detail:
        'Cuttings of 10-15 cm root in four to six weeks in warm, humid conditions. Low stems pegged to the soil root on their own and can be cut free after a couple of months.',
    },
    problems: [
      {
        name: 'Few flowers',
        signs: 'Plenty of leafy growth, little bloom.',
        fix: 'Increase direct sun, prune after flowering and switch to a lower-nitrogen feed.',
      },
      {
        name: 'Spider mites',
        signs: 'Fine yellow speckling and dusty webbing on leaf undersides.',
        fix: 'Rinse the foliage regularly and apply neem or a miticide in the evening.',
      },
      {
        name: 'Bud borer and whitefly',
        signs: 'Buds with small holes that fail to open, or clouds of tiny white insects when disturbed.',
        fix: 'Remove affected buds, hang yellow sticky traps and spray with neem weekly.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'True jasmines are not known to be toxic to cats, dogs or people.',
    },
    precautions: [
      'Do not confuse it with unrelated toxic plants also called jasmine, such as yellow jessamine.',
      'Only use flowers for tea if the plant has never been sprayed with pesticide.',
    ],
    uses: 'The flowers scent jasmine tea, are strung into garlands and are a major source of perfume oil. It is the national flower of the Philippines and one of the national flowers of Indonesia.',
  },
  {
    id: 'date-palm',
    emoji: '🌴',
    commonName: 'Date palm',
    scientificName: 'Phoenix dactylifera',
    family: 'Arecaceae',
    otherNames: ['Nakhl', 'True date palm'],
    description:
      'The iconic palm of Arabia, with a tall rough trunk and a crown of stiff, grey-green feather fronds. It is extremely tolerant of heat, drought and salty soil, and female trees bear dates when pollinated.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Deep and infrequent',
      detail:
        'Soak the whole root zone, then let the top layer dry. It survives drought, but steady deep watering in the hot months is what gives good growth and fruit.',
      intervalDays: { spring: 10, summer: 6, autumn: 12, winter: 21 },
    },
    temperature: {
      label: 'Desert heat',
      idealMinC: 20,
      idealMaxC: 45,
      hardinessMinC: -8,
      detail:
        'It needs long, very hot summers to ripen fruit and copes with 50 °C when well watered. Mature palms survive brief frosts to around -8 °C, though fronds are damaged.',
    },
    sunlight: {
      level: 'full sun',
      hours: '8+ hours of direct sun',
      detail: 'It wants open, unshaded sun all day and does not make a long-term indoor plant.',
      tip: 'Plant it clear of buildings and overhead cables; the crown eventually spreads 6 m or more.',
    },
    fertilizer: {
      summary: 'Every 12 weeks in the warm season',
      npk: '8-2-12',
      intervalWeeks: 12,
      detail:
        'Use a slow-release palm fertiliser with magnesium, manganese and boron. Add well-rotted manure around the basin in winter, as is traditional in date gardens.',
      amount: 'About 1 kg per mature palm per application, spread under the crown; a tablespoon for a potted seedling',
    },
    soil: {
      summary: 'Deep sandy loam',
      detail: 'It tolerates salinity and alkaline soil better than almost any fruit tree but must have drainage below the roots.',
      mix: [
        { ingredient: 'Washed sand', parts: 3 },
        { ingredient: 'Loam or sweet soil', parts: 3 },
        { ingredient: 'Compost or rotted manure', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1 },
      ],
      phMin: 7,
      phMax: 8.5,
      alternatives: ['Palm and cactus potting mix', 'Native sandy soil improved with one quarter compost'],
    },
    humidity: {
      level: 'low',
      minPct: 15,
      maxPct: 60,
      detail: 'It prefers dry air, especially while fruit is ripening. Humid weather at that stage can cause fruit to split or rot.',
      tip: 'Keep irrigation at ground level; do not spray water into the crown.',
    },
    pruning: {
      bestTime: 'After harvest or in winter',
      detail:
        'Remove only fully brown fronds and old fruit stalks, cutting close to the trunk. Leave green fronds, because over-trimming weakens the palm and attracts weevils.',
    },
    propagation: {
      methods: ['Offshoots', 'Seed'],
      detail:
        'Rooted offshoots cut from the base of a known variety come true and fruit in four to five years. Seeds sprout easily in warmth but give unpredictable fruit and half the seedlings are male.',
    },
    problems: [
      {
        name: 'Red palm weevil',
        signs: 'Oozing brown sap, chewed fibre and tunnels in the trunk, with a sour smell and collapsing crown.',
        fix: 'Report and treat immediately with a licensed pest service; avoid fresh wounds, and seal pruning cuts.',
      },
      {
        name: 'Dubas bug and scale',
        signs: 'Sticky honeydew, yellow spotting and crusty white or brown scales on fronds.',
        fix: 'Wash fronds with a strong jet of water and apply horticultural oil in the cooler months.',
      },
      {
        name: 'Frond tip burn',
        signs: 'Leaflet tips brown and brittle on younger fronds.',
        fix: 'Water more deeply to flush salts below the roots and check for potassium or magnesium deficiency.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'The palm is non-toxic and the fruit is edible. The danger is physical, from the long sharp spines at the base of each frond.',
    },
    precautions: [
      'Wear eye protection and heavy gloves when working near the frond bases; spine punctures infect easily.',
      'Disinfect pruning tools between palms to limit the spread of weevil and disease.',
      'Remove fallen fruit, which attracts wasps and rodents.',
    ],
    uses: 'Dates are a staple food and the customary way to break the fast. Fronds are woven into mats and baskets (khoos) and the trunks and midribs were traditionally used in arish houses.',
  },
  {
    id: 'oleander',
    emoji: '🌷',
    commonName: 'Oleander',
    scientificName: 'Nerium oleander',
    family: 'Apocynaceae',
    otherNames: ['Rose bay', 'Difla'],
    description:
      'A tough evergreen shrub with narrow leathery leaves and clusters of pink, white or red flowers through the hot months. It tolerates heat, drought, wind and salt, but every part of it is dangerously poisonous.',
    placement: 'outdoor',
    difficulty: 'easy',
    watering: {
      summary: 'Drought tolerant; deep soaks',
      detail:
        'Established plants survive on little water but flower far better with a deep soak whenever the top 5 cm of soil is dry. Potted plants need regular water in summer.',
      intervalDays: { spring: 7, summer: 4, autumn: 9, winter: 16 },
    },
    temperature: {
      label: 'Heat tolerant',
      idealMinC: 15,
      idealMaxC: 40,
      hardinessMinC: -8,
      detail: 'It flowers best in long hot summers and is unbothered by desert heat. Mature plants tolerate short frosts to about -8 °C.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6+ hours of direct sun',
      detail: 'Full sun gives dense growth and heavy flowering; in shade it becomes sparse and leggy.',
      tip: 'It is one of the few shrubs that can take reflected heat from walls and paving all day.',
    },
    fertilizer: {
      summary: 'Every 8 weeks, spring to early autumn',
      npk: '10-10-10',
      intervalWeeks: 8,
      detail: 'It needs little feeding in the ground. A light balanced feed keeps container plants flowering.',
      amount: 'Half the label rate; one small handful of granules for a large pot',
    },
    soil: {
      summary: 'Almost any well-drained soil',
      detail: 'It accepts poor, sandy, alkaline and salty ground. Only permanently waterlogged soil is a problem.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Coarse sand', parts: 2 },
        { ingredient: 'Loam or garden soil', parts: 2 },
        { ingredient: 'Perlite', parts: 1 },
      ],
      phMin: 6,
      phMax: 8.3,
      alternatives: ['Native sandy soil with a little compost', 'Loam-based shrub compost with grit'],
    },
    humidity: {
      level: 'low',
      minPct: 20,
      maxPct: 65,
      detail: 'Dry air suits it and it also copes with humid coastal summers.',
      tip: 'Thin congested stems so air can move through and the leaves dry quickly.',
    },
    pruning: {
      bestTime: 'Late winter, or straight after flowering',
      detail:
        'Shorten flowered stems by a third and remove a few of the oldest canes at the base each year to renew the plant. Bag the cuttings; never burn or compost them.',
    },
    propagation: {
      methods: ['Semi-hardwood cuttings', 'Seed'],
      detail: 'Cuttings of 15 cm root easily in damp sand or even a jar of water in warm weather. Handle cuttings with gloves.',
    },
    problems: [
      {
        name: 'Oleander aphid',
        signs: 'Bright yellow aphids crowding new shoots and flower stalks.',
        fix: 'Blast them off with water or prune out the worst tips; they rarely cause lasting harm.',
      },
      {
        name: 'Scale insects',
        signs: 'Flat pale or brown discs on leaves and stems with sticky honeydew.',
        fix: 'Spray with horticultural oil in cool weather and repeat after two to three weeks.',
      },
      {
        name: 'Bacterial knot',
        signs: 'Rough, dark galls on stems, leaves and flower stalks.',
        fix: 'Cut out affected stems well below the gall in dry weather and disinfect blades between cuts.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'Extremely toxic. All parts, fresh or dried, contain cardiac glycosides that can cause fatal heart problems in people, pets and livestock, and the sap irritates skin and eyes.',
    },
    precautions: [
      'Always wear gloves and wash hands and tools after handling.',
      'Never burn prunings; the smoke is toxic.',
      'Do not plant where children or animals play, and never use stems as skewers or stirrers.',
      'Seek urgent medical or veterinary help if any part is swallowed.',
    ],
    uses: 'Used for roadside screens, windbreaks and tough hedges in hot, dry regions. It has no safe home use beyond ornament.',
  },
  {
    id: 'ixora',
    emoji: '🔥',
    commonName: 'Ixora',
    scientificName: 'Ixora coccinea',
    family: 'Rubiaceae',
    otherNames: ['Jungle geranium', 'Flame of the woods', 'West Indian jasmine'],
    description:
      'A compact tropical evergreen with glossy leaves and rounded clusters of small star-shaped flowers in red, orange, pink or yellow. It is popular for low hedges but insists on acidic soil.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Constantly moist',
      detail:
        'Keep the soil evenly damp and do not let it dry out fully. Hard, alkaline tap water gradually raises the soil pH, so use rainwater or acidify occasionally if leaves yellow.',
      intervalDays: { spring: 4, summer: 2, autumn: 5, winter: 8 },
    },
    temperature: {
      label: 'Tropical warmth',
      idealMinC: 18,
      idealMaxC: 32,
      hardinessMinC: 4,
      detail: 'It grows in steady warmth and suffers leaf drop below about 10 °C. It will not survive frost.',
    },
    sunlight: {
      level: 'partial sun',
      hours: '4-6 hours of direct sun',
      detail: 'Good light is needed for flowers, but midday desert sun bleaches the leaves.',
      tip: 'Morning sun with afternoon shade is the best position in the Gulf.',
    },
    fertilizer: {
      summary: 'Every 4 weeks in the growing season',
      npk: '12-6-8',
      intervalWeeks: 4,
      detail:
        'Use an acid-forming fertiliser made for azaleas or gardenias, with iron and manganese. Chelated iron drenches correct yellowing quickly.',
      amount: 'Label rate for acid-loving shrubs; half rate in pots',
    },
    soil: {
      summary: 'Acidic and rich in organic matter',
      detail: 'Soil above pH 7 locks up iron and manganese, so the choice of mix matters more than for most shrubs.',
      mix: [
        { ingredient: 'Ericaceous (acidic) compost', parts: 4 },
        { ingredient: 'Composted pine bark', parts: 2 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Coco coir', parts: 1 },
      ],
      phMin: 5,
      phMax: 6,
      alternatives: ['Azalea and camellia potting mix', 'Peat moss with pine bark and perlite'],
    },
    humidity: {
      level: 'high',
      minPct: 50,
      maxPct: 85,
      detail: 'It is a humid-tropics plant and the leaf edges brown in dry air.',
      tip: 'Mulch with pine bark and grow it among other plants to hold moisture around the leaves.',
    },
    pruning: {
      bestTime: 'After a flush of flowers, in warm weather',
      detail:
        'Flowers form at the stem tips, so frequent shearing removes the buds. Instead, shorten individual stems by a few nodes once or twice a year.',
    },
    propagation: {
      methods: ['Semi-hardwood cuttings'],
      detail: 'Take 8-10 cm cuttings in warm weather, use rooting hormone and keep them humid with bottom warmth. Rooting is slow, often six to eight weeks.',
    },
    problems: [
      {
        name: 'Chlorosis',
        signs: 'New leaves yellow with green veins; older leaves may show dark spots.',
        fix: 'Lower the pH with an acidic feed, apply chelated iron and manganese, and repot into acidic mix if needed.',
      },
      {
        name: 'Scale, mealybugs and aphids',
        signs: 'Sticky leaves, black sooty mould and clusters of insects on stems.',
        fix: 'Treat with horticultural oil or insecticidal soap, repeating fortnightly.',
      },
      {
        name: 'Leaf drop',
        signs: 'Sudden shedding of leaves after a cold night or drying out.',
        fix: 'Protect from cold draughts, keep moisture steady and wait; it normally reshoots in warmth.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Not considered toxic to cats, dogs or people.',
    },
    precautions: [
      'Avoid planting next to concrete walls or paths, which leach lime and raise soil pH.',
      'Do not shear it like a formal hedge if you want flowers.',
    ],
    uses: 'Used for low flowering hedges and pot displays. The flowers are offered in Hindu worship and feature in South Asian folk tradition.',
  },
  {
    id: 'lemon-tree',
    emoji: '🍋',
    commonName: 'Lemon tree',
    scientificName: 'Citrus × limon',
    family: 'Rutaceae',
    otherNames: ['Lemon', 'Laymoun'],
    description:
      'A small evergreen tree with fragrant white blossom and fruit that can hang on the branches for months. It grows well in a large pot and fruits reliably if it gets sun, steady water and regular feeding.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Deep, then partly dry',
      detail:
        'Water thoroughly until it runs from the base, then wait until the top 3-5 cm is dry. Irregular watering causes fruit drop and split fruit.',
      intervalDays: { spring: 6, summer: 3, autumn: 7, winter: 12 },
    },
    temperature: {
      label: 'Warm, frost free',
      idealMinC: 13,
      idealMaxC: 32,
      hardinessMinC: -2,
      detail:
        'Growth is best between 20 and 30 °C. Above about 38 °C flowers and young fruit may drop, and frost below -2 °C damages wood and fruit.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6-8 hours of direct sun',
      detail: 'Fruit needs sun to form and ripen. Exposed fruit and bark can sunburn in desert summers.',
      tip: 'Use 30-40% shade cloth in midsummer, or place the tree where it gets shade after 2 pm.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, early spring to autumn',
      npk: '12-6-6',
      intervalWeeks: 4,
      detail:
        'Citrus are hungry for nitrogen and for iron, zinc, manganese and magnesium. Use a dedicated citrus feed and correct pale leaves with a chelated trace-element drench.',
      amount: 'Label rate for citrus; roughly 1 tablespoon of granules per 10 litres of pot volume',
    },
    soil: {
      summary: 'Open, slightly acidic',
      detail: 'Roots need air as much as water. Keep the graft union and the top of the root flare above the soil surface.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Composted pine bark', parts: 2 },
        { ingredient: 'Perlite or pumice', parts: 1.5 },
        { ingredient: 'Coarse sand', parts: 1 },
      ],
      phMin: 5.5,
      phMax: 6.5,
      alternatives: ['Bagged citrus mix', 'Loam-based compost with a quarter grit'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 70,
      detail: 'Moderate humidity is ideal. Very dry, hot wind dries the blossom and encourages mites.',
      tip: 'Mulch the pot, keeping the mulch a few centimetres away from the trunk.',
    },
    pruning: {
      bestTime: 'Late winter, after the main harvest',
      detail:
        'Remove dead, crossing and inward-growing shoots and any growth from below the graft. Keep the canopy fairly dense in hot climates so the leaves shade the branches.',
    },
    propagation: {
      methods: ['Grafting or budding', 'Semi-hardwood cuttings', 'Seed'],
      detail:
        'Named varieties are budded onto a rootstock for vigour and disease resistance. Cuttings will root and seeds sprout readily, but seedlings take many years to fruit.',
    },
    problems: [
      {
        name: 'Citrus leaf miner',
        signs: 'Silvery winding trails in young leaves, which curl and distort.',
        fix: 'Mostly cosmetic on mature trees; spray new flushes with horticultural oil and avoid heavy nitrogen in peak season.',
      },
      {
        name: 'Nutrient deficiency',
        signs: 'Yellow leaves with green veins, or mottled yellow patches between veins.',
        fix: 'Apply chelated iron, zinc and manganese and check that the soil pH has not climbed with hard water.',
      },
      {
        name: 'Fruit and flower drop',
        signs: 'Blossom or marble-sized fruit falling in quantity.',
        fix: 'Some thinning is natural; reduce stress by steady watering, shade in extreme heat and regular feeding.',
      },
    ],
    toxicity: {
      pets: true,
      humans: false,
      detail:
        'The fruit is edible for people, but the essential oils and psoralens in leaves, peel and stems can cause vomiting, diarrhoea and skin sensitivity in cats and dogs.',
    },
    precautions: [
      'Many varieties have sharp thorns; wear gloves when pruning.',
      'Never let the pot stand in water.',
      'Do not bury the graft union when repotting.',
    ],
    uses: 'The juice, zest and preserved fruit are used in cooking and drinks, and dried limes and lemons flavour Gulf dishes. The leaves and peel are also used to scent the home.',
  },
  {
    id: 'aloe-vera',
    emoji: '🌵',
    commonName: 'Aloe vera',
    scientificName: 'Aloe vera',
    family: 'Asphodelaceae',
    otherNames: ['Barbados aloe', 'Sabr', 'Medicinal aloe'],
    description:
      'A stemless succulent with thick, toothed, grey-green leaves full of clear gel. It is thought to originate from the Arabian Peninsula and needs very little care beyond light and drainage.',
    placement: 'both',
    difficulty: 'easy',
    watering: {
      summary: 'Soak, then dry out fully',
      detail:
        'Water deeply and then leave it until the mix is dry all the way down. Thin, curling leaves mean thirst; soft, translucent leaves mean too much water.',
      intervalDays: { spring: 14, summer: 10, autumn: 18, winter: 30 },
    },
    temperature: {
      label: 'Warm and dry',
      idealMinC: 13,
      idealMaxC: 32,
      hardinessMinC: 2,
      detail: 'It grows best in warm weather and may rest in extreme summer heat. Frost turns the leaves to jelly.',
    },
    sunlight: {
      level: 'partial sun',
      hours: '4-6 hours of sun, or very bright indirect light',
      detail: 'It needs strong light to stay compact, but harsh midday desert sun turns the leaves bronze or brown.',
      tip: 'Outdoors in the Gulf give morning sun only; move an indoor plant into stronger light gradually over two weeks.',
    },
    fertilizer: {
      summary: 'Every 8 weeks in spring and summer',
      npk: '2-7-7',
      intervalWeeks: 8,
      detail: 'It needs very little. A weak cactus feed a few times a year is plenty.',
      amount: 'Quarter to half the label rate',
    },
    soil: {
      summary: 'Gritty cactus mix',
      detail: 'Use a shallow, wide pot, ideally terracotta, and a mix that is at least half mineral grit.',
      mix: [
        { ingredient: 'Cactus compost', parts: 3 },
        { ingredient: 'Pumice or perlite', parts: 2 },
        { ingredient: 'Coarse sand', parts: 1.5 },
      ],
      phMin: 6,
      phMax: 8,
      alternatives: ['Half potting compost, half perlite', 'Sandy garden soil in a raised bed'],
    },
    humidity: {
      level: 'low',
      minPct: 20,
      maxPct: 50,
      detail: 'Dry air is ideal. In humid weather it needs less water and more airflow.',
      tip: 'Never mist it; water sitting in the rosette invites rot.',
    },
    pruning: {
      bestTime: 'Any time in the warm season',
      detail: 'Remove dried outer leaves and spent flower stalks at the base with a clean knife. Harvest only the oldest outer leaves.',
    },
    propagation: {
      methods: ['Offsets (pups)'],
      detail:
        'Separate pups that are at least 8-10 cm tall with a few roots of their own. Let the wound dry for two or three days, pot in dry gritty mix and water after a week.',
    },
    problems: [
      {
        name: 'Root and crown rot',
        signs: 'Mushy, brown leaves at the base and a plant that wobbles in its pot.',
        fix: 'Remove rotten tissue, dry the plant for several days and repot into fresh gritty mix; water much less often.',
      },
      {
        name: 'Sunburn',
        signs: 'Leaves turn reddish-brown or develop dry bleached patches.',
        fix: 'Move to bright shade or morning sun; the colour usually returns to green in a few weeks.',
      },
      {
        name: 'Mealybugs and scale',
        signs: 'White fluff or brown bumps at the leaf bases.',
        fix: 'Wipe off with alcohol on a cotton bud and repeat weekly until clear.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'The yellow latex under the leaf skin contains anthraquinones that cause vomiting and diarrhoea in cats and dogs and cramps in people if swallowed. The clear inner gel is the part traditionally used on skin.',
    },
    precautions: [
      'Drain and rinse away the yellow latex before using the gel.',
      'Test a small patch of skin first; some people react to it.',
      'Keep out of reach of pets that chew plants.',
    ],
    uses: 'The gel is traditionally applied to soothe minor burns and dry skin and is a common ingredient in cosmetics.',
  },
  {
    id: 'basil',
    emoji: '🌿',
    commonName: 'Basil',
    scientificName: 'Ocimum basilicum',
    family: 'Lamiaceae',
    otherNames: ['Sweet basil', 'Rayhan'],
    description:
      'A fast-growing, tender annual herb with soft aromatic leaves. It loves warmth and regular picking, and in the Gulf it is easiest from autumn to spring.',
    placement: 'both',
    difficulty: 'easy',
    watering: {
      summary: 'Little and often',
      detail:
        'Keep the soil consistently moist but not wet, watering at the base in the morning. It wilts dramatically when dry but recovers quickly if caught early.',
      intervalDays: { spring: 3, summer: 2, autumn: 3, winter: 5 },
    },
    temperature: {
      label: 'Warm, no cold',
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 4,
      detail: 'It stops growing below about 12 °C and blackens near freezing. Above 35 °C it bolts to flower and the leaves turn tough.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6 hours of direct sun',
      detail: 'Sun gives the best flavour. In intense heat the leaves scorch without some afternoon shade.',
      tip: 'On a windowsill, turn the pot every few days so it does not lean to the glass.',
    },
    fertilizer: {
      summary: 'Every 3 weeks while cropping',
      npk: '10-5-5',
      intervalWeeks: 3,
      detail: 'A light nitrogen-rich liquid feed keeps leaves coming. Overfeeding dilutes the flavour.',
      amount: 'Half the label rate of a liquid feed',
    },
    soil: {
      summary: 'Rich, moist, free draining',
      detail: 'Use fresh potting compost with extra drainage, in a pot at least 20 cm wide.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Worm castings or fine compost', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.5,
      alternatives: ['Vegetable potting mix', 'Coco coir with compost and perlite'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 65,
      detail: 'Average humidity is fine. Damp, still air encourages downy mildew and grey mould.',
      tip: 'Space plants so air can move between them and keep the leaves dry when you water.',
    },
    pruning: {
      bestTime: 'Continuously, once the plant has six pairs of leaves',
      detail:
        'Pinch each stem just above a pair of leaves to make it branch, and never take more than a third at once. Remove flower spikes as soon as they appear to keep it leafy.',
    },
    propagation: {
      methods: ['Seed', 'Stem cuttings in water'],
      detail: 'Seed germinates in five to ten days at 20-25 °C. A 10 cm tip cutting roots in a glass of water within about two weeks.',
    },
    problems: [
      {
        name: 'Bolting',
        signs: 'Flower spikes form, leaves shrink and turn bitter.',
        fix: 'Pinch out flowers early, give afternoon shade in heat and sow a fresh batch every few weeks.',
      },
      {
        name: 'Downy mildew',
        signs: 'Yellow patches on top of the leaf with grey fuzz underneath.',
        fix: 'Remove affected plants, water at the base only and improve airflow; choose resistant varieties next time.',
      },
      {
        name: 'Aphids and whitefly',
        signs: 'Sticky, curled young leaves with small insects underneath.',
        fix: 'Rinse off with water or use insecticidal soap, and wash leaves before eating.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Non-toxic to cats, dogs and people, and a common culinary herb.',
    },
    precautions: [
      'Use only food-safe pest treatments and observe the harvest interval on the label.',
      'Supermarket pots hold many crowded seedlings; split them into several pots to keep them alive.',
    ],
    uses: 'A staple fresh herb for salads, sauces and pesto. In the Gulf, sprigs of rayhan are traditionally used for their scent and in herbal drinks.',
  },
  {
    id: 'mint',
    emoji: '🍃',
    commonName: 'Mint',
    scientificName: 'Mentha spicata',
    family: 'Lamiaceae',
    otherNames: ['Spearmint', 'Garden mint', 'Na\'na'],
    description:
      'A vigorous perennial herb that spreads by creeping runners and has bright, crinkled, sweetly scented leaves. It is very easy to grow as long as it never dries out.',
    placement: 'both',
    difficulty: 'easy',
    watering: {
      summary: 'Keep it moist',
      detail:
        'Mint likes steadily damp soil and should be watered as soon as the surface begins to dry. It is one of the few herbs that forgives heavy watering, provided the pot drains.',
      intervalDays: { spring: 3, summer: 2, autumn: 3, winter: 6 },
    },
    temperature: {
      label: 'Cool to warm',
      idealMinC: 13,
      idealMaxC: 27,
      hardinessMinC: -25,
      detail:
        'It grows best in mild weather and dies back to the roots in cold winters. In heat above about 35 °C growth thins and it needs shade and extra water.',
    },
    sunlight: {
      level: 'partial sun',
      hours: '3-5 hours of direct sun',
      detail: 'It grows in sun or part shade. In hot climates shade keeps the leaves soft and green.',
      tip: 'In the Gulf summer, move it to bright shade or an indoor windowsill.',
    },
    fertilizer: {
      summary: 'Every 5 weeks in the growing season',
      npk: '10-10-10',
      intervalWeeks: 5,
      detail: 'A light balanced feed is enough. Too much fertiliser gives lush growth with weak flavour.',
      amount: 'Half the label rate of a liquid feed',
    },
    soil: {
      summary: 'Moisture-retentive and rich',
      detail: 'Use a wide, shallow container, because the runners travel sideways rather than down.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Coco coir', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1 },
        { ingredient: 'Garden compost', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.5,
      alternatives: ['Multipurpose compost on its own', 'Loam-based compost with leaf mould'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 70,
      detail: 'It tolerates a wide range, but hot dry air brings spider mites and crisp leaf edges.',
      tip: 'Stand the pot on a tray of damp pebbles in very dry weather.',
    },
    pruning: {
      bestTime: 'Throughout the growing season',
      detail:
        'Harvest by cutting stems back to just above a leaf pair. Shear the whole plant to 5 cm when it gets leggy or starts to flower and it will regrow fresh.',
    },
    propagation: {
      methods: ['Division', 'Stem cuttings in water', 'Runners'],
      detail: 'Any piece of stem or runner with a node will root within a week or two in water or damp compost. Divide and repot crowded clumps every year.',
    },
    problems: [
      {
        name: 'Mint rust',
        signs: 'Orange or brown pustules under the leaves and distorted shoots.',
        fix: 'Cut the plant to the ground, bin the foliage and replant clean runners in fresh compost if it returns.',
      },
      {
        name: 'Spider mites',
        signs: 'Pale stippled leaves and fine webbing in hot, dry conditions.',
        fix: 'Shear back hard, rinse well and keep the plant cooler and better watered.',
      },
      {
        name: 'Bare, woody centre',
        signs: 'Growth only at the pot edge with a dead middle.',
        fix: 'The clump is pot-bound; split it and replant young outer pieces in fresh mix.',
      },
    ],
    toxicity: {
      pets: true,
      humans: false,
      detail:
        'Safe for people as a culinary herb. The essential oils can cause vomiting and diarrhoea in cats and dogs if they eat a lot of it.',
    },
    precautions: [
      'Grow it in its own pot; in a shared bed it will overrun everything else.',
      'Do not let it dry out completely in summer.',
      'Keep concentrated mint oil away from pets.',
    ],
    uses: 'Used fresh in tea, salads such as tabbouleh, yoghurt dishes and drinks. Mint tea is a traditional after-meal drink across the Arab world.',
  },
  {
    id: 'rosemary',
    emoji: '🌱',
    commonName: 'Rosemary',
    scientificName: 'Salvia rosmarinus',
    family: 'Lamiaceae',
    otherNames: ['Rosmarinus officinalis', 'Iklil al-jabal'],
    description:
      'A woody Mediterranean shrub with resinous needle-like leaves and small blue flowers. It wants sun, sharp drainage and dry air, and is killed far more often by overwatering than by drought.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Sparing; dry between waterings',
      detail:
        'Water well, then let the top half of the pot dry before watering again. Wet roots, especially in warm humid weather, cause sudden browning and death.',
      intervalDays: { spring: 8, summer: 5, autumn: 10, winter: 16 },
    },
    temperature: {
      label: 'Mild and dry',
      idealMinC: 10,
      idealMaxC: 30,
      hardinessMinC: -10,
      detail:
        'It is happiest in mild, sunny weather and tolerates dry heat. The combination of high heat and high humidity is what it struggles with.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6-8 hours of direct sun',
      detail: 'Full sun keeps it dense and aromatic. It grows weak and mildew-prone in shade.',
      tip: 'In humid Gulf summers, give it morning sun, afternoon shade and the breeziest spot you have.',
    },
    fertilizer: {
      summary: 'Every 8 weeks in spring and early summer',
      npk: '5-5-5',
      intervalWeeks: 8,
      detail: 'It is adapted to poor soil and needs little feeding. A light balanced feed in the growing season is enough for pots.',
      amount: 'Half the label rate, two or three times a year',
    },
    soil: {
      summary: 'Lean, gritty, alkaline-tolerant',
      detail: 'Use a terracotta pot and a sandy mix that dries quickly.',
      mix: [
        { ingredient: 'Potting compost', parts: 2 },
        { ingredient: 'Coarse sand or grit', parts: 2 },
        { ingredient: 'Perlite or pumice', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.5,
      alternatives: ['Cactus mix with a little compost', 'Loam-based compost with one third grit'],
    },
    humidity: {
      level: 'low',
      minPct: 25,
      maxPct: 50,
      detail: 'It prefers dry, moving air. Still, humid air leads to powdery mildew and root disease.',
      tip: 'Top the pot with gravel instead of organic mulch to keep the crown dry.',
    },
    pruning: {
      bestTime: 'After flowering, in spring',
      detail: 'Trim the soft green growth by up to a third to keep it bushy. Do not cut into bare brown wood, which rarely reshoots.',
    },
    propagation: {
      methods: ['Softwood or semi-hardwood cuttings', 'Layering'],
      detail: 'Take 8-10 cm tip cuttings, strip the lower half and root in gritty mix kept just damp. Seed is slow and unreliable.',
    },
    problems: [
      {
        name: 'Root rot',
        signs: 'Tips droop, needles turn brown from the base up and the plant dies within days.',
        fix: 'Rarely curable; take healthy cuttings, and grow replacements in grittier mix with less water.',
      },
      {
        name: 'Powdery mildew',
        signs: 'White dusty coating on leaves in humid, still conditions.',
        fix: 'Thin the plant, move it to more sun and airflow and avoid wetting the foliage.',
      },
      {
        name: 'Spider mites',
        signs: 'Dull, speckled needles with webbing, usually on indoor plants.',
        fix: 'Rinse thoroughly and move the plant outdoors into fresh air.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Non-toxic to cats and dogs and safe for people in culinary amounts.',
    },
    precautions: [
      'Do not stand the pot in a saucer of water.',
      'Avoid repotting or root disturbance in hot weather.',
      'The concentrated essential oil is not for internal use.',
    ],
    uses: 'A culinary herb for roast meats, potatoes and bread. It is traditionally associated with remembrance and used in hair rinses and scented sachets.',
  },
  {
    id: 'tomato',
    emoji: '🍅',
    commonName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    otherNames: ['Love apple', 'Tamatim'],
    description:
      'A fast-growing fruiting annual that rewards sun, steady water and regular feeding. In the Gulf it is a cool-season crop, sown in early autumn and harvested from winter to spring.',
    placement: 'outdoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Steady and deep',
      detail:
        'Keep the soil evenly moist, watering at the base whenever the top 2 cm is dry. Swinging between dry and soaked causes split fruit and blossom end rot.',
      intervalDays: { spring: 3, summer: 2, autumn: 3, winter: 5 },
    },
    temperature: {
      label: 'Warm days, mild nights',
      idealMinC: 15,
      idealMaxC: 29,
      hardinessMinC: 1,
      detail:
        'Fruit sets best with days of 21-29 °C and nights of 15-21 °C. Pollen fails above about 32 °C by day or 24 °C at night, and frost kills the plant.',
    },
    sunlight: {
      level: 'full sun',
      hours: '6-8 hours of direct sun',
      detail: 'Sun is essential for strong plants and sweet fruit.',
      tip: 'Late in the Gulf season, hang 30% shade cloth to extend cropping by a few weeks.',
    },
    fertilizer: {
      summary: 'Every 2 weeks once flowering starts',
      npk: '4-3-8',
      intervalWeeks: 2,
      detail:
        'Start with a balanced feed, then switch to a high-potassium tomato feed when the first flowers open. Make sure calcium is available by keeping moisture steady.',
      amount: 'Label rate of liquid tomato feed, about 2 litres of solution per plant',
    },
    soil: {
      summary: 'Deep, rich, moisture-holding',
      detail: 'Give each plant at least 20-30 litres of mix and bury the stem deeply at planting, because it roots along its length.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Garden compost or rotted manure', parts: 2 },
        { ingredient: 'Coco coir', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1 },
      ],
      phMin: 6,
      phMax: 6.8,
      alternatives: ['Grow bags or bagged vegetable mix', 'Raised-bed soil with one third compost'],
    },
    humidity: {
      level: 'medium',
      minPct: 50,
      maxPct: 70,
      detail: 'Moderate humidity helps pollination. Very humid air clumps the pollen and encourages blight and mould.',
      tip: 'Tap or gently shake the flower trusses at midday to improve fruit set.',
    },
    pruning: {
      bestTime: 'Weekly through the growing season',
      detail:
        'On tall (cordon) varieties, pinch out the side shoots that form between leaf and stem and tie the main stem to a stake. Bush varieties need no pinching; just remove leaves touching the soil.',
    },
    propagation: {
      methods: ['Seed', 'Side-shoot cuttings'],
      detail: 'Sow seed 0.5 cm deep at 21-27 °C; it sprouts in about a week. Removed side shoots root in water or damp compost within ten days.',
    },
    problems: [
      {
        name: 'Blossom end rot',
        signs: 'A dark, sunken leathery patch on the bottom of the fruit.',
        fix: 'Caused by uneven watering limiting calcium uptake; water regularly, mulch and remove affected fruit.',
      },
      {
        name: 'Whitefly and leaf curl virus',
        signs: 'Tiny white insects under leaves; new growth yellow, curled and stunted.',
        fix: 'Use insect netting and yellow sticky traps, remove virus-infected plants and choose resistant varieties.',
      },
      {
        name: 'Blight and leaf spot',
        signs: 'Brown spots with yellow halos spreading up from the lower leaves.',
        fix: 'Strip affected leaves, water only at the base and keep foliage dry and well spaced.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'Ripe fruit is safe to eat, but the leaves, stems and unripe green fruit contain tomatine and solanine, which cause stomach upset, drooling and lethargy in pets and can sicken people in quantity.',
    },
    precautions: [
      'Do not eat the leaves or stems, and keep pets from chewing the plant.',
      'Avoid growing tomatoes in the same soil year after year.',
      'Wash hands after handling tobacco before touching plants, to avoid spreading mosaic virus.',
    ],
    uses: 'One of the most widely used cooking ingredients, eaten fresh, cooked, dried or preserved as sauce and paste.',
  },

  // ───────────────────────────── Indoor ─────────────────────────────
  {
    id: 'monstera-deliciosa',
    emoji: '🪴',
    commonName: 'Monstera',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    otherNames: ['Swiss cheese plant', 'Split-leaf philodendron'],
    description:
      'A climbing rainforest aroid with large glossy leaves that develop splits and holes as the plant matures. It is forgiving, fast-growing and looks best trained up a support.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'When the top third is dry',
      detail:
        'Water thoroughly once the top 5 cm of mix has dried, and empty the saucer afterwards. It copes better with slight dryness than with wet feet.',
      intervalDays: { spring: 8, summer: 7, autumn: 10, winter: 14 },
    },
    temperature: {
      label: 'Warm room temperature',
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 5,
      detail: 'It grows steadily in normal indoor warmth and stalls below 13 °C. Keep it out of the direct blast of the air conditioner.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '6+ hours of bright filtered light',
      detail: 'Bright light without direct midday sun gives large, well-split leaves. In dim corners new leaves stay small and whole.',
      tip: 'Wipe the leaves with a damp cloth monthly; dust noticeably cuts the light they receive.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, spring to early autumn',
      npk: '3-1-2',
      intervalWeeks: 4,
      detail: 'A balanced foliage feed supports its fast growth. Skip feeding in winter if growth has stopped.',
      amount: 'Half the label rate of a liquid houseplant feed',
    },
    soil: {
      summary: 'Chunky aroid mix',
      detail: 'Its thick roots need air pockets, so add bark and perlite rather than using dense compost alone.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Orchid bark', parts: 2 },
        { ingredient: 'Perlite', parts: 2 },
        { ingredient: 'Coco coir', parts: 1 },
        { ingredient: 'Horticultural charcoal', parts: 0.5 },
      ],
      phMin: 5.5,
      phMax: 7,
      alternatives: ['Bagged aroid mix', 'Houseplant compost with one third orchid bark'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 70,
      detail: 'It tolerates average room air but grows larger leaves with more humidity. Very dry air browns the leaf edges.',
      tip: 'A small humidifier nearby works far better than misting.',
    },
    pruning: {
      bestTime: 'Spring and summer',
      detail:
        'Cut back long or leggy stems just above a node to control size, and remove yellowing leaves at the base. Guide aerial roots into the pot or onto a moss pole rather than cutting them all off.',
    },
    propagation: {
      methods: ['Stem cuttings with a node', 'Air layering'],
      detail: 'A cutting must include a node, ideally with an aerial root; a leaf and stalk alone will not grow. Root it in water, moss or damp mix in warmth.',
    },
    problems: [
      {
        name: 'Yellowing leaves',
        signs: 'Lower leaves yellow and the soil stays wet for more than a week.',
        fix: 'Water less often, check the drainage hole and repot into a chunkier mix if roots are brown and soft.',
      },
      {
        name: 'No splits in new leaves',
        signs: 'Small, solid leaves on long stretched stems.',
        fix: 'Move to brighter light and give it a pole to climb; splits come with maturity and light.',
      },
      {
        name: 'Thrips and spider mites',
        signs: 'Silvery streaks, tiny black specks or fine webbing on leaves.',
        fix: 'Shower the plant, then treat with insecticidal soap weekly for at least four weeks.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'Leaves and stems contain insoluble calcium oxalate crystals that cause mouth pain, drooling and swelling if chewed, and the sap can irritate skin.',
    },
    precautions: [
      'Keep out of reach of pets and small children who chew leaves.',
      'Wear gloves if the sap irritates your skin.',
      'Stake it securely; a mature plant is top-heavy.',
    ],
    uses: 'Grown mainly as a foliage plant. In its native range the fully ripe fruit is eaten, but unripe fruit is irritating and indoor plants rarely produce it.',
  },
  {
    id: 'golden-pothos',
    emoji: '💚',
    commonName: 'Golden pothos',
    scientificName: 'Epipremnum aureum',
    family: 'Araceae',
    otherNames: ['Devil\'s ivy', 'Money plant'],
    description:
      'A trailing or climbing vine with heart-shaped leaves splashed with yellow. It tolerates low light, missed waterings and dry air better than almost any other houseplant.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'When the top half is dry',
      detail:
        'Water thoroughly when the top 3-5 cm is dry or the leaves just begin to soften. Constantly wet mix causes yellow leaves and black stems.',
      intervalDays: { spring: 8, summer: 7, autumn: 10, winter: 14 },
    },
    temperature: {
      label: 'Warm room temperature',
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 10,
      detail: 'It is comfortable wherever you are. Growth stops below about 13 °C and cold draughts blacken the leaves.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '4-6 hours of bright filtered light',
      detail: 'It survives in low light but loses its gold variegation and grows slowly. Direct hot sun scorches the leaves.',
      tip: 'If the vines go green and sparse, move the pot closer to a window.',
    },
    fertilizer: {
      summary: 'Every 6 weeks, spring to autumn',
      npk: '3-1-2',
      intervalWeeks: 6,
      detail: 'A light feed is enough; it is not a hungry plant.',
      amount: 'Half the label rate of a liquid houseplant feed',
    },
    soil: {
      summary: 'Light, airy potting mix',
      detail: 'Any good houseplant compost works if you open it up with perlite.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Orchid bark', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Coco coir with perlite', 'Water culture in a vase, with occasional liquid feed'],
    },
    humidity: {
      level: 'medium',
      minPct: 35,
      maxPct: 70,
      detail: 'It handles air-conditioned rooms well and simply grows faster in humid ones.',
      tip: 'Trim brown tips with scissors and move it away from the AC vent.',
    },
    pruning: {
      bestTime: 'Any time during active growth',
      detail: 'Cut bare or over-long vines back to just above a leaf to make the plant branch. Push the cuttings back into the same pot for a fuller look.',
    },
    propagation: {
      methods: ['Stem cuttings in water', 'Stem cuttings in soil'],
      detail: 'Cut below a node so each piece has one or two leaves and a root nub. Roots appear in water within one to two weeks.',
    },
    problems: [
      {
        name: 'Overwatering',
        signs: 'Yellow leaves, soft black stem bases and a sour smell from the pot.',
        fix: 'Let it dry, cut out rotted stems and re-root healthy tips in fresh mix.',
      },
      {
        name: 'Leggy growth',
        signs: 'Long bare vines with leaves only at the ends.',
        fix: 'Prune back hard and give more light.',
      },
      {
        name: 'Mealybugs',
        signs: 'White cottony tufts in the leaf joints.',
        fix: 'Wipe with alcohol and spray with insecticidal soap weekly until gone.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'Contains insoluble calcium oxalate crystals. Chewing causes burning of the mouth, drooling and vomiting in pets and irritation in people.',
    },
    precautions: [
      'Hang or shelve it out of reach of cats, dogs and toddlers.',
      'Wash hands after pruning if you have sensitive skin.',
      'Do not plant it outdoors in tropical regions, where it can become invasive.',
    ],
    uses: 'A classic hanging and shelf plant, often grown in water. In South Asia it is kept as a money plant for good fortune.',
  },
  {
    id: 'snake-plant',
    emoji: '🐍',
    commonName: 'Snake plant',
    scientificName: 'Dracaena trifasciata',
    family: 'Asparagaceae',
    otherNames: ['Mother-in-law\'s tongue', 'Sansevieria'],
    description:
      'An upright succulent with stiff, sword-shaped leaves banded in green and often edged in yellow. It tolerates low light and long droughts and is very hard to kill except by overwatering.',
    placement: 'both',
    difficulty: 'easy',
    watering: {
      summary: 'Rarely; dry right through',
      detail:
        'Water only when the mix is completely dry to the bottom of the pot. Pour around the edge rather than into the centre of the rosette.',
      intervalDays: { spring: 14, summer: 12, autumn: 21, winter: 35 },
    },
    temperature: {
      label: 'Warm, tolerates heat',
      idealMinC: 18,
      idealMaxC: 32,
      hardinessMinC: 5,
      detail: 'It is content in any warm room and on shaded Gulf balconies. Cold below 10 °C with damp soil causes the leaves to collapse.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: 'Anything from low light to a few hours of gentle sun',
      detail: 'It survives in dim corners but grows faster and colours better in bright indirect light.',
      tip: 'Water even less often in low light, where the pot takes much longer to dry.',
    },
    fertilizer: {
      summary: 'Every 8 weeks in spring and summer',
      npk: '10-10-10',
      intervalWeeks: 8,
      detail: 'It needs very little. Feed lightly a few times in the warm season and not at all in winter.',
      amount: 'Half the label rate of a cactus or houseplant feed',
    },
    soil: {
      summary: 'Free-draining succulent mix',
      detail: 'Use a heavy pot with drainage holes; tall plants become top-heavy and the rhizomes can crack thin plastic.',
      mix: [
        { ingredient: 'Cactus compost', parts: 3 },
        { ingredient: 'Perlite or pumice', parts: 2 },
        { ingredient: 'Coarse sand', parts: 1 },
      ],
      phMin: 5.5,
      phMax: 7.5,
      alternatives: ['Houseplant compost cut 1:1 with perlite', 'Coco chips with pumice'],
    },
    humidity: {
      level: 'low',
      minPct: 25,
      maxPct: 55,
      detail: 'Dry indoor air is ideal and it needs no misting.',
      tip: 'Keep water out of the leaf funnels to prevent rot.',
    },
    pruning: {
      bestTime: 'Spring or summer',
      detail: 'Remove damaged or flopped leaves by cutting them off at soil level. A cut leaf tip does not regrow, so remove the whole leaf for a clean look.',
    },
    propagation: {
      methods: ['Division', 'Leaf cuttings'],
      detail:
        'Split crowded clumps with a clean knife, keeping roots on each piece. Leaf sections root slowly in gritty mix, but yellow-edged varieties revert to plain green this way.',
    },
    problems: [
      {
        name: 'Root rot',
        signs: 'Leaves turn soft, yellow and fall over at the base.',
        fix: 'Cut away mushy parts, dry the rhizome for a few days and repot in dry gritty mix.',
      },
      {
        name: 'Wrinkled or curling leaves',
        signs: 'Leaves pucker lengthwise and feel thin.',
        fix: 'It is very dry; give one deep soak and let it drain fully.',
      },
      {
        name: 'Mealybugs and spider mites',
        signs: 'White fluff at leaf bases or fine pale speckling.',
        fix: 'Wipe the leaves with a damp cloth and a little soap, repeating weekly.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail: 'Contains saponins that cause nausea, vomiting and diarrhoea in cats and dogs and mild stomach upset in people if eaten.',
    },
    precautions: [
      'Keep away from pets that chew leaves.',
      'When in doubt, do not water.',
      'Leaf tips are sharp; position tall plants away from eye level of children.',
    ],
    uses: 'A durable office and bedroom plant. The leaf fibres were traditionally used for bowstrings and cordage, giving the old name bowstring hemp.',
  },
  {
    id: 'zz-plant',
    emoji: '✨',
    commonName: 'ZZ plant',
    scientificName: 'Zamioculcas zamiifolia',
    family: 'Araceae',
    otherNames: ['Zanzibar gem', 'Zuzu plant'],
    description:
      'A slow-growing aroid with arching stems of thick, glossy leaflets rising from potato-like rhizomes that store water. It thrives on neglect and handles low light and dry air.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'Infrequent; dry right through',
      detail:
        'Let the mix dry out completely, then water thoroughly and drain. The rhizomes hold weeks of water, so overwatering is the only common way to lose it.',
      intervalDays: { spring: 14, summer: 14, autumn: 21, winter: 30 },
    },
    temperature: {
      label: 'Warm room temperature',
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 7,
      detail: 'It does best in steady warmth and stops growing below about 15 °C. Protect it from cold draughts.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: 'Low light to bright filtered light',
      detail: 'It tolerates dim rooms but grows faster and stays more upright in bright indirect light. Direct sun scorches the leaflets.',
      tip: 'Rotate the pot a quarter turn each month so the stems do not lean.',
    },
    fertilizer: {
      summary: 'Every 8 weeks in the warm season',
      npk: '10-10-10',
      intervalWeeks: 8,
      detail: 'It is a light feeder. Two to four diluted feeds a year are enough.',
      amount: 'Half the label rate of a liquid houseplant feed',
    },
    soil: {
      summary: 'Open and fast draining',
      detail: 'Use a mix that does not hold water around the rhizomes, and repot only when they press against the pot.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Perlite or pumice', parts: 2 },
        { ingredient: 'Orchid bark', parts: 1 },
        { ingredient: 'Coarse sand', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Cactus and succulent mix', 'Houseplant compost cut 1:1 with perlite'],
    },
    humidity: {
      level: 'low',
      minPct: 30,
      maxPct: 60,
      detail: 'It is unfazed by air-conditioned rooms.',
      tip: 'Dust the leaflets with a soft damp cloth instead of using leaf-shine sprays.',
    },
    pruning: {
      bestTime: 'Any time; best in spring',
      detail: 'It needs little pruning. Cut yellowed or leaning stems off at the base.',
    },
    propagation: {
      methods: ['Division', 'Stem cuttings', 'Leaflet cuttings'],
      detail:
        'Dividing the rhizomes gives instant plants. Leaflets pushed into damp gritty mix form a small tuber over several months, so patience is required.',
    },
    problems: [
      {
        name: 'Rhizome rot',
        signs: 'Several stems yellow at once and the base turns mushy.',
        fix: 'Unpot, remove soft rhizomes, dry for a few days and replant in fresh dry mix.',
      },
      {
        name: 'Leaning, stretched stems',
        signs: 'Long, widely spaced leaflets reaching toward a window.',
        fix: 'Move to brighter indirect light and rotate regularly.',
      },
      {
        name: 'Scale insects',
        signs: 'Small brown bumps along the stems and leaf midribs.',
        fix: 'Scrape off or wipe with alcohol, then apply horticultural oil.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail: 'All parts contain calcium oxalate crystals that irritate the mouth and stomach if chewed, and the sap may irritate skin.',
    },
    precautions: [
      'Keep out of reach of pets and children.',
      'Wash hands after cutting or dividing it.',
      'Do not water on a calendar; check that the pot is dry first.',
    ],
    uses: 'Valued as a near-indestructible plant for offices, corridors and low-light rooms.',
  },
  {
    id: 'peace-lily',
    emoji: '🕊️',
    commonName: 'Peace lily',
    scientificName: 'Spathiphyllum wallisii',
    family: 'Araceae',
    otherNames: ['White sails', 'Spathe flower'],
    description:
      'A clump-forming aroid with deep green leaves and white hooded flowers. It tolerates shade and tells you clearly when it is thirsty by drooping.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'Keep lightly moist',
      detail:
        'Water when the top 2 cm is dry or as soon as the leaves start to sag. It is sensitive to chlorine and salts, so use filtered or rested water if the leaf tips brown.',
      intervalDays: { spring: 6, summer: 5, autumn: 7, winter: 10 },
    },
    temperature: {
      label: 'Warm room temperature',
      idealMinC: 18,
      idealMaxC: 28,
      hardinessMinC: 10,
      detail: 'It likes stable indoor warmth. Leaves blacken in cold draughts or below about 12 °C.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: 'Medium to bright filtered light',
      detail: 'It survives in low light but needs medium to bright indirect light to flower. Direct sun bleaches and burns the leaves.',
      tip: 'If it has not flowered for a year, move it nearer a bright window out of direct sun.',
    },
    fertilizer: {
      summary: 'Every 6 weeks, spring to autumn',
      npk: '20-20-20',
      intervalWeeks: 6,
      detail: 'Feed lightly; excess fertiliser burns the leaf tips and can turn flowers green.',
      amount: 'Quarter to half the label rate of a balanced liquid feed',
    },
    soil: {
      summary: 'Moist, peaty, well aerated',
      detail: 'It wants a mix that stays damp but not sodden.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Coco coir', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Orchid bark', parts: 1 },
      ],
      phMin: 5.8,
      phMax: 6.5,
      alternatives: ['Houseplant compost with a quarter perlite', 'Bagged aroid mix'],
    },
    humidity: {
      level: 'high',
      minPct: 50,
      maxPct: 80,
      detail: 'It prefers humid air, and brown crispy tips are common in air-conditioned rooms.',
      tip: 'Stand it on a pebble tray or keep it in a bathroom with a window.',
    },
    pruning: {
      bestTime: 'Whenever flowers or leaves fade',
      detail: 'Cut spent flower stalks and yellow leaves off as close to the base as you can. No other pruning is needed.',
    },
    propagation: {
      methods: ['Division'],
      detail: 'Tip the plant out in spring and tease or cut the clump into sections, each with several leaves and roots. Pot them separately and keep moist.',
    },
    problems: [
      {
        name: 'Brown leaf tips',
        signs: 'Dry brown tips and margins on otherwise healthy leaves.',
        fix: 'Switch to filtered water, flush the pot monthly, feed less and raise humidity.',
      },
      {
        name: 'Repeated wilting',
        signs: 'Leaves collapse every few days even after watering.',
        fix: 'It is pot-bound or the roots have rotted; check the root ball and repot or trim as needed.',
      },
      {
        name: 'No flowers',
        signs: 'Healthy foliage but no white spathes.',
        fix: 'Give more indirect light and a light feed in spring.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail:
        'Contains calcium oxalate crystals that cause mouth pain, drooling and vomiting if chewed. It is not a true lily and does not cause the kidney failure in cats that true lilies do.',
    },
    precautions: [
      'Keep out of reach of pets and small children.',
      'Do not leave it standing in water for long periods.',
      'Wipe up fallen pollen, which can stain surfaces.',
    ],
    uses: 'A popular gift and office plant, widely associated with peace and sympathy.',
  },
  {
    id: 'fiddle-leaf-fig',
    emoji: '🎻',
    commonName: 'Fiddle-leaf fig',
    scientificName: 'Ficus lyrata',
    family: 'Moraceae',
    otherNames: ['Banjo fig', 'Lyre-leaf fig'],
    description:
      'A West African fig with huge, leathery, violin-shaped leaves, usually grown as an indoor tree. It is striking but dislikes change and reacts to poor light, draughts and erratic watering by dropping leaves.',
    placement: 'indoor',
    difficulty: 'demanding',
    watering: {
      summary: 'Thorough, then partly dry',
      detail:
        'Water until it drains freely once the top 5 cm of mix is dry, then empty the saucer. Stick to a consistent routine; both drought and soggy soil cause brown patches.',
      intervalDays: { spring: 8, summer: 7, autumn: 10, winter: 14 },
    },
    temperature: {
      label: 'Steady warmth',
      idealMinC: 18,
      idealMaxC: 29,
      hardinessMinC: 10,
      detail: 'It wants stable warmth with no sudden swings. Cold air from an AC vent or open door often triggers leaf drop.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '6+ hours of very bright light, with some gentle direct sun',
      detail: 'It needs more light than most houseplants and should sit right beside a large window. A few hours of morning sun is beneficial.',
      tip: 'Choose its spot carefully and leave it there, rotating a quarter turn monthly for even growth.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, spring to early autumn',
      npk: '3-1-2',
      intervalWeeks: 4,
      detail: 'A nitrogen-leaning foliage feed suits its large leaves. Stop in winter when growth pauses.',
      amount: 'Half the label rate of a liquid feed',
    },
    soil: {
      summary: 'Well-aerated, quick draining',
      detail: 'Dense, wet compost leads to root rot, so add plenty of coarse material.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Orchid or pine bark', parts: 2 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Coco coir', parts: 1 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Bagged ficus or aroid mix', 'Houseplant compost with one third perlite'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 65,
      detail: 'Average to moderately humid air is best. Very dry air cracks new leaves as they unfurl and invites spider mites.',
      tip: 'Run a humidifier nearby when new leaves are opening.',
    },
    pruning: {
      bestTime: 'Late spring to early summer',
      detail:
        'Cut the main stem just above a leaf to make it branch, and remove damaged leaves at the stalk. Protect floors from the dripping white sap.',
    },
    propagation: {
      methods: ['Stem cuttings', 'Air layering'],
      detail: 'Root tip cuttings with two or three leaves in water or damp mix in warm, bright conditions. Air layering is the most reliable way to shorten a tall bare plant.',
    },
    problems: [
      {
        name: 'Brown spots from root rot',
        signs: 'Dark brown patches spreading from the centre or base of lower leaves.',
        fix: 'Let the pot dry, check the roots, trim rotten ones and repot in a chunkier mix with better light.',
      },
      {
        name: 'Leaf drop',
        signs: 'Healthy-looking leaves fall after a move, repot or cold draught.',
        fix: 'Restore steady conditions and wait; avoid further changes while it recovers.',
      },
      {
        name: 'Spider mites',
        signs: 'Tiny pale dots and fine webbing under the leaves.',
        fix: 'Wipe both sides of every leaf and treat with insecticidal soap weekly for a month.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail: 'The milky sap contains irritant compounds that cause mouth and stomach upset in pets if chewed and can irritate human skin and eyes.',
    },
    precautions: [
      'Wear gloves when pruning; people with latex allergy may react to the sap.',
      'Keep away from air-conditioning vents and exterior doors.',
      'Avoid moving it once it has settled.',
    ],
    uses: 'Grown as an indoor statement tree. In its native West Africa it is a large shade tree.',
  },
  {
    id: 'rubber-plant',
    emoji: '🌳',
    commonName: 'Rubber plant',
    scientificName: 'Ficus elastica',
    family: 'Moraceae',
    otherNames: ['Rubber fig', 'India rubber tree'],
    description:
      'A sturdy fig with thick, glossy oval leaves in dark green, burgundy or variegated forms. It is more tolerant than its fiddle-leaf cousin and grows into an indoor tree with good light.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'When the top third is dry',
      detail: 'Water thoroughly once the top 5 cm has dried and tip out any water left in the saucer. Lower leaves yellow and drop if it stays wet.',
      intervalDays: { spring: 9, summer: 7, autumn: 12, winter: 16 },
    },
    temperature: {
      label: 'Warm room temperature',
      idealMinC: 16,
      idealMaxC: 30,
      hardinessMinC: 5,
      detail: 'It grows well in ordinary indoor warmth and tolerates brief cool spells. Sudden cold draughts cause leaf drop.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '6+ hours of bright filtered light',
      detail: 'Bright light keeps it compact and richly coloured; variegated forms need the most. In low light it grows lanky and sheds lower leaves.',
      tip: 'Wipe the broad leaves with a damp cloth every few weeks so they can use the light.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, spring to early autumn',
      npk: '3-1-2',
      intervalWeeks: 4,
      detail: 'A balanced or slightly nitrogen-rich feed supports leaf growth. Do not feed in winter.',
      amount: 'Half the label rate of a liquid houseplant feed',
    },
    soil: {
      summary: 'Well-drained potting mix',
      detail: 'Use a compost with added bark and perlite so the roots get air.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Pine bark', parts: 1.5 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Coarse sand', parts: 1 },
      ],
      phMin: 5.5,
      phMax: 7,
      alternatives: ['Houseplant compost with one third perlite', 'Bagged ficus mix'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 60,
      detail: 'Normal room humidity is fine, and it copes with air conditioning better than most figs.',
      tip: 'Keep the leaves clean; dusty leaves in dry air attract spider mites.',
    },
    pruning: {
      bestTime: 'Late spring to summer',
      detail: 'Cut the top off just above a leaf to stop upward growth and encourage side branches. Dab the cut with a damp tissue to stop the sap dripping.',
    },
    propagation: {
      methods: ['Stem cuttings', 'Air layering'],
      detail: 'Tip cuttings root in warm, humid conditions after the sap has been rinsed off. Air layering works very well on thick, leggy stems.',
    },
    problems: [
      {
        name: 'Lower leaf drop',
        signs: 'Older leaves yellow and fall, leaving a bare stem.',
        fix: 'Usually overwatering or low light; let it dry more and move to a brighter spot.',
      },
      {
        name: 'Scale and mealybugs',
        signs: 'Brown bumps or white fluff along stems and leaf veins with sticky residue.',
        fix: 'Wipe off with alcohol and apply horticultural oil, repeating after two weeks.',
      },
      {
        name: 'Leaf edge browning',
        signs: 'Dry brown margins, often on variegated types.',
        fix: 'Water more evenly, keep out of hot direct sun and away from AC vents.',
      },
    ],
    toxicity: {
      pets: true,
      humans: true,
      detail: 'The latex sap irritates skin and eyes and causes drooling, vomiting and stomach upset if chewed by pets or children.',
    },
    precautions: [
      'Wear gloves when pruning, especially if you have a latex allergy.',
      'Protect floors and furniture from sap, which stains.',
      'Keep out of reach of pets.',
    ],
    uses: 'Its latex was once tapped as a source of natural rubber. In north-east India its aerial roots are trained into living bridges.',
  },
  {
    id: 'spider-plant',
    emoji: '🕷️',
    commonName: 'Spider plant',
    scientificName: 'Chlorophytum comosum',
    family: 'Asparagaceae',
    otherNames: ['Airplane plant', 'Ribbon plant', 'Spider ivy'],
    description:
      'A fountain of narrow, arching leaves, usually striped green and cream, that sends out long stems carrying baby plantlets. It is adaptable, quick to multiply and safe around pets.',
    placement: 'indoor',
    difficulty: 'easy',
    watering: {
      summary: 'When the top is dry',
      detail:
        'Water when the top 2-3 cm of mix is dry. Its fleshy roots store water, so it tolerates the odd missed watering; use filtered water if the tips brown.',
      intervalDays: { spring: 7, summer: 5, autumn: 8, winter: 12 },
    },
    temperature: {
      label: 'Mild to warm',
      idealMinC: 15,
      idealMaxC: 27,
      hardinessMinC: 2,
      detail: 'It prefers mild room temperatures and slows in real heat. It survives cool rooms but not frost.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '4-6 hours of bright filtered light',
      detail: 'Bright indirect light gives the best striping and most plantlets. Direct hot sun scorches the leaves, and deep shade fades the variegation.',
      tip: 'Hang it near an east-facing window so the runners can trail freely.',
    },
    fertilizer: {
      summary: 'Every 4 weeks, spring to autumn',
      npk: '10-10-10',
      intervalWeeks: 4,
      detail: 'Feed lightly. Excess fertiliser salts are a common cause of brown tips.',
      amount: 'Half the label rate of a liquid houseplant feed',
    },
    soil: {
      summary: 'General-purpose, free draining',
      detail: 'Ordinary houseplant compost with extra perlite is all it needs. Repot when the thick roots start lifting the plant out of the pot.',
      mix: [
        { ingredient: 'Potting compost', parts: 4 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Coco coir', parts: 1 },
      ],
      phMin: 6,
      phMax: 7.2,
      alternatives: ['Loam-based houseplant compost', 'Multipurpose compost with a quarter grit'],
    },
    humidity: {
      level: 'medium',
      minPct: 40,
      maxPct: 65,
      detail: 'Average room humidity suits it. In very dry air the tips brown more readily.',
      tip: 'Snip brown tips at an angle to keep the natural leaf shape.',
    },
    pruning: {
      bestTime: 'Any time',
      detail: 'Pull or cut away dead leaves at the base and remove runners if you want the mother plant to bulk up.',
    },
    propagation: {
      methods: ['Plantlets', 'Division'],
      detail: 'Pin a plantlet onto a small pot of damp mix while it is still attached and cut the runner once it has rooted, or stand detached plantlets in water for a week or two.',
    },
    problems: [
      {
        name: 'Brown leaf tips',
        signs: 'Dry brown ends on many leaves.',
        fix: 'Use filtered or rain water, flush the pot to remove salts and feed less.',
      },
      {
        name: 'Pale, limp leaves',
        signs: 'Washed-out colour and floppy growth.',
        fix: 'Check for waterlogged roots or too much direct sun; adjust and repot if root-bound.',
      },
      {
        name: 'No plantlets',
        signs: 'A mature plant that never sends out runners.',
        fix: 'Give brighter light and let it become slightly pot-bound.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Non-toxic to cats, dogs and people. Cats often enjoy chewing it, which may cause mild vomiting but no poisoning.',
    },
    precautions: [
      'Hang it up if your cat keeps grazing it, to protect the plant.',
      'Avoid fluoridated or softened water where possible.',
    ],
    uses: 'A classic hanging-basket plant that is easy to share, and a common first plant for children.',
  },
  {
    id: 'areca-palm',
    emoji: '🎋',
    commonName: 'Areca palm',
    scientificName: 'Dypsis lutescens',
    family: 'Arecaceae',
    otherNames: ['Butterfly palm', 'Golden cane palm', 'Yellow palm'],
    description:
      'A clumping palm with slender golden-green canes and soft, arching feather fronds. It makes a graceful indoor screen and also grows outdoors in shade in warm climates.',
    placement: 'both',
    difficulty: 'moderate',
    watering: {
      summary: 'Lightly moist in growth',
      detail:
        'Water when the top 2-3 cm is dry, keeping the mix lightly moist in the warm season and a little drier in winter. It is sensitive to salts and fluoride, so flush the pot regularly.',
      intervalDays: { spring: 6, summer: 4, autumn: 7, winter: 10 },
    },
    temperature: {
      label: 'Warm and stable',
      idealMinC: 18,
      idealMaxC: 30,
      hardinessMinC: 2,
      detail: 'It likes steady warmth and suffers leaf spotting below about 10 °C. Keep it away from cold AC draughts.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: '6+ hours of bright filtered light',
      detail: 'Bright filtered light keeps the fronds green; hot direct sun turns them yellow and scorched.',
      tip: 'Outdoors in the Gulf, grow it in bright shade under trees or a north-facing wall.',
    },
    fertilizer: {
      summary: 'Every 6 weeks, spring to early autumn',
      npk: '8-2-12',
      intervalWeeks: 6,
      detail: 'Use a palm fertiliser with magnesium, iron and manganese. Avoid heavy doses, which burn the roots and tips.',
      amount: 'Half the label rate for potted palms',
    },
    soil: {
      summary: 'Rich but free draining',
      detail: 'It likes a slightly acidic, moisture-holding mix that still drains quickly. Palms resent root disturbance, so repot only when crowded.',
      mix: [
        { ingredient: 'Potting compost', parts: 3 },
        { ingredient: 'Coco coir', parts: 2 },
        { ingredient: 'Perlite', parts: 1.5 },
        { ingredient: 'Pine bark', parts: 1 },
      ],
      phMin: 6,
      phMax: 6.8,
      alternatives: ['Bagged palm mix', 'Houseplant compost with a quarter coarse sand'],
    },
    humidity: {
      level: 'high',
      minPct: 50,
      maxPct: 75,
      detail: 'Humid air keeps the frond tips green. Dry indoor air browns them and brings spider mites.',
      tip: 'Shower the whole plant with lukewarm water once a month.',
    },
    pruning: {
      bestTime: 'Any time, as fronds die',
      detail: 'Remove only fronds that are completely brown, cutting close to the cane. Never cut the top of a cane, because it cannot regrow from below.',
    },
    propagation: {
      methods: ['Division', 'Seed'],
      detail: 'Separate a few rooted canes from the edge of the clump in spring with a sharp knife and pot them together. Seed germinates slowly over two to six months in warmth.',
    },
    problems: [
      {
        name: 'Brown tips',
        signs: 'Frond tips dry and brown across the plant.',
        fix: 'Raise humidity, use filtered water and flush the pot to remove fertiliser salts.',
      },
      {
        name: 'Spider mites',
        signs: 'Dusty, yellow-speckled fronds with fine webbing.',
        fix: 'Shower the foliage thoroughly and apply insecticidal soap weekly for three to four weeks.',
      },
      {
        name: 'Yellowing fronds',
        signs: 'Whole fronds turn yellow, often with dark spots.',
        fix: 'Check for waterlogging or too much direct sun, and feed with a palm fertiliser containing magnesium and potassium.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Non-toxic to cats, dogs and people.',
    },
    precautions: [
      'Do not trim green fronds or cut cane tops.',
      'Avoid leaf-shine products, which damage palm fronds.',
      'Keep the pot out of standing water.',
    ],
    uses: 'Used as a soft indoor screen and in shaded courtyards, and often chosen for homes with pets.',
  },
  {
    id: 'moth-orchid',
    emoji: '🦋',
    commonName: 'Moth orchid',
    scientificName: 'Phalaenopsis',
    family: 'Orchidaceae',
    otherNames: ['Phal', 'Moon orchid'],
    description:
      'An epiphytic orchid with broad fleshy leaves, silvery aerial roots and arching sprays of flat flowers that last for months. It is the easiest orchid to keep and rebloom in a home.',
    placement: 'indoor',
    difficulty: 'moderate',
    watering: {
      summary: 'Soak when roots turn silver',
      detail:
        'Water when the roots in the pot change from green to silvery-grey and the bark feels nearly dry, then let it drain completely. Keep water out of the crown, where it causes rot.',
      intervalDays: { spring: 7, summer: 6, autumn: 8, winter: 10 },
    },
    temperature: {
      label: 'Warm days, cooler nights',
      idealMinC: 18,
      idealMaxC: 29,
      hardinessMinC: 10,
      detail:
        'It is comfortable at normal room temperature. A few weeks of nights around 15-18 °C in autumn helps trigger a new flower spike.',
    },
    sunlight: {
      level: 'bright indirect',
      hours: 'Bright shade all day; no hot direct sun',
      detail: 'Leaves should be mid-green; dark green means too little light and yellowish or red-tinged means too much.',
      tip: 'An east window or a sheer-curtained south or west window is ideal.',
    },
    fertilizer: {
      summary: 'Every 2 weeks while growing',
      npk: '20-20-20',
      intervalWeeks: 2,
      detail: 'Feed weakly and often with an orchid fertiliser, and flush the pot with plain water once a month to clear salts.',
      amount: 'Quarter of the label rate',
    },
    soil: {
      summary: 'Coarse bark, not soil',
      detail: 'The roots need air and must never be packed in ordinary compost. Use a clear pot so you can see root colour, and renew the bark every two years.',
      mix: [
        { ingredient: 'Medium orchid bark', parts: 4 },
        { ingredient: 'Sphagnum moss', parts: 1 },
        { ingredient: 'Perlite', parts: 1 },
        { ingredient: 'Horticultural charcoal', parts: 0.5 },
      ],
      phMin: 5.5,
      phMax: 6.5,
      alternatives: ['Pure sphagnum moss, watered less often', 'Bark with coconut husk chips'],
    },
    humidity: {
      level: 'high',
      minPct: 50,
      maxPct: 80,
      detail: 'It prefers humid air with gentle movement. In dry rooms buds may shrivel and drop before opening.',
      tip: 'Set the pot on a tray of wet pebbles, keeping the base above the water line.',
    },
    pruning: {
      bestTime: 'After the last flower drops',
      detail:
        'If the spike is still green, cut just above the second or third node from the base to encourage a side spray; if it has turned brown, cut it off at the base. Trim only roots that are papery or mushy.',
    },
    propagation: {
      methods: ['Keikis (plantlets)'],
      detail: 'Occasionally a baby plant forms on a flower spike. Detach it once it has two or three roots about 5 cm long and pot it in fine bark.',
    },
    problems: [
      {
        name: 'Root rot',
        signs: 'Brown, mushy roots and limp, wrinkled leaves despite watering.',
        fix: 'Cut off dead roots with sterile scissors and repot in fresh bark; water only when roots are silver.',
      },
      {
        name: 'Bud blast',
        signs: 'Buds yellow and fall before opening.',
        fix: 'Avoid draughts, sudden temperature changes, dry air and ripening fruit nearby.',
      },
      {
        name: 'Crown rot',
        signs: 'The centre of the plant turns black and leaves pull away.',
        fix: 'Blot water from the crown after watering, improve airflow and treat early with cinnamon or a fungicide.',
      },
    ],
    toxicity: {
      pets: false,
      humans: false,
      detail: 'Non-toxic to cats, dogs and people.',
    },
    precautions: [
      'Do not water with ice cubes or let the pot sit in water.',
      'Sterilise blades before cutting to avoid spreading virus between orchids.',
      'Keep away from the direct flow of the air conditioner.',
    ],
    uses: 'One of the most popular gift and display plants in the world, grown for its long-lasting flowers.',
  },
  {
    id: 'jade-plant',
    emoji: '💎',
    commonName: 'Jade plant',
    scientificName: 'Crassula ovata',
    family: 'Crassulaceae',
    otherNames: ['Money tree', 'Lucky plant', 'Friendship tree'],
    description:
      'A long-lived South African succulent with thick woody stems and plump, glossy oval leaves, often edged red in strong light. With time it forms a miniature tree.',
    placement: 'both',
    difficulty: 'easy',
    watering: {
      summary: 'Soak, then dry out',
      detail:
        'Water thoroughly when the mix has dried out and the leaves feel slightly less firm. Keep it much drier in winter and in extreme summer heat, when it rests.',
      intervalDays: { spring: 12, summer: 10, autumn: 14, winter: 28 },
    },
    temperature: {
      label: 'Mild and dry',
      idealMinC: 13,
      idealMaxC: 28,
      hardinessMinC: 2,
      detail:
        'It grows best in mild weather with cooler nights. It tolerates heat if kept shaded and fairly dry, but frost destroys the water-filled leaves.',
    },
    sunlight: {
      level: 'partial sun',
      hours: '4-6 hours of direct sun',
      detail: 'It needs several hours of sun to stay compact; in low light the stems stretch and droop. Fierce midday desert sun can scorch the leaves.',
      tip: 'Indoors, use your sunniest window; outdoors in the Gulf, give morning sun and afternoon shade.',
    },
    fertilizer: {
      summary: 'Every 8 weeks in spring and summer',
      npk: '5-10-5',
      intervalWeeks: 8,
      detail: 'Feed lightly onto damp soil a few times a year. It does not need feeding in winter.',
      amount: 'Half the label rate of a cactus feed',
    },
    soil: {
      summary: 'Gritty succulent mix',
      detail: 'Use a heavy terracotta pot to balance the weighty top growth and a mix that dries within a week.',
      mix: [
        { ingredient: 'Cactus compost', parts: 3 },
        { ingredient: 'Pumice or perlite', parts: 2 },
        { ingredient: 'Coarse sand or grit', parts: 1.5 },
      ],
      phMin: 6,
      phMax: 7,
      alternatives: ['Houseplant compost cut 1:1 with grit', 'Bonsai mix with a little compost'],
    },
    humidity: {
      level: 'low',
      minPct: 25,
      maxPct: 50,
      detail: 'Dry air suits it. In humid conditions give extra airflow and less water.',
      tip: 'Do not mist; wipe dust off the leaves with a dry soft cloth.',
    },
    pruning: {
      bestTime: 'Spring to early summer',
      detail: 'Shorten leggy branches just above a leaf ring to thicken the trunk and build a tree shape. Let the cuts dry in open air.',
    },
    propagation: {
      methods: ['Stem cuttings', 'Leaf cuttings'],
      detail: 'Leave cuttings or whole leaves to dry for several days until callused, then set them on barely damp gritty mix. They root within a few weeks.',
    },
    problems: [
      {
        name: 'Root rot',
        signs: 'Soft, yellowing leaves that drop and a blackening stem base.',
        fix: 'Take healthy cuttings, discard rotten parts and repot in dry gritty mix; water far less.',
      },
      {
        name: 'Mealybugs',
        signs: 'White woolly clusters in leaf joints.',
        fix: 'Dab with alcohol on a cotton bud; avoid oil sprays in strong sun, which can mark the leaves.',
      },
      {
        name: 'Shrivelled or dropping leaves',
        signs: 'Leaves wrinkle, thin and fall while the soil is bone dry.',
        fix: 'Give a deep soak and resume regular watering once the mix dries.',
      },
    ],
    toxicity: {
      pets: true,
      humans: false,
      detail:
        'Toxic to cats and dogs, causing vomiting, lethargy and loss of coordination. In people it is only mildly irritating, with possible stomach upset if eaten.',
    },
    precautions: [
      'Keep out of reach of pets.',
      'Branches snap easily, so handle with care when moving.',
      'Never leave water standing in the saucer.',
    ],
    uses: 'Kept as a symbol of luck and prosperity, often given as a housewarming gift, and popular as an easy bonsai subject.',
  },
]
