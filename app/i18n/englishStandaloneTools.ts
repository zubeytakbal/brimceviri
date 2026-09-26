export type EnglishStandaloneToolComponentKey =
  | "paintCalculator"
  | "tileCalculator"
  | "brickCalculator"
  | "concreteCalculator"
  | "stairCalculator"
  | "aggregateCalculator"
  | "roofingCalculator"
  | "dateCalculator"
  | "vatCalculator"
  | "bmiCalculator"
  | "pregnancyCalculator"
  | "lengthComparison"
  | "weightComparison"
  | "paceCalculator"
  | "acCapacityCalculator"
  | "electricityConsumptionCalculator"
  | "sleepCalculator"
  | "fuelConsumptionCalculator"
  | "tireSizeCalculator"
  | "numberBaseCalculator"
  | "pixelCalculator"
  | "videoBitrateCalculator"
  | "oneRepMaxCalculator"
  | "laminateCalculator"
  | "wallpaperCalculator"
  | "movingBoxCalculator"
  | "naturalGasCalculator"
  | "evChargingCalculator"
  | "heightConverter"
  | "gradeCalculator"
  | "calorieCalculator"
  | "bodyFatCalculator"
  | "idealWeightCalculator"
  | "fuelEconomyConverter"
  | "squareFootageCalculator"
  | "cubicYardCalculator"
  | "mulchCalculator"
  | "boardFootCalculator"
  | "colorConverter"
  | "unixTimestampConverter"
  | "poolVolumeCalculator"
  | "poolChlorineCalculator"
  | "standardDrinkCalculator"
  | "awgConverter"
  | "psuCalculator"
  | "ivDripRateCalculator"
  | "depreciationCalculator";

export type EnglishStandaloneTool = {
  slug: string;
  englishPath: string;
  turkishPath: string;
  title: string;
  description: string;
  intro: string;
  component: EnglishStandaloneToolComponentKey;
  iconName:
    | "paintCalculator"
    | "tileCalculator"
    | "brickCalculator"
    | "concreteCalculator"
    | "stairCalculator"
    | "aggregateCalculator"
    | "roofingCalculator"
    | "dateCalculator"
    | "vatCalculator"
    | "bmiCalculator"
    | "pregnancyCalculator"
    | "length"
    | "mass"
    | "paceCalculator"
    | "acCapacityCalculator"
    | "electricityConsumptionCalculator"
    | "sleepCalculator"
  | "fuelConsumptionCalculator"
  | "tireSizeCalculator"
  | "numberBaseCalculator"
  | "pixelCalculator"
  | "videoBitrateCalculator"
  | "oneRepMaxCalculator"
    | "laminateCalculator"
    | "wallpaperCalculator"
    | "movingBoxCalculator"
    | "naturalGasCalculator"
    | "evChargingCalculator"
    | "gradeCalculator"
    | "calorieCalculator"
    | "bodyFatCalculator"
    | "idealWeightCalculator"
    | "area"
    | "volume"
    | "peyzajHub"
    | "marangozHub"
    | "colorCodeCalculator"
    | "unixTimestampCalculator"
    | "poolVolumeCalculator"
    | "chlorineDoseCalculator"
    | "abvCalculator"
    | "awgConverter"
    | "psuCalculator"
    | "ivDripRateCalculator"
    | "amortismanCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
  relatedHub?: {
    href: string;
    label: string;
  };
  isEnglishOnly?: boolean;
  /** Visible FAQ, also published as FAQPage structured data. */
  faq?: Array<{ question: string; answer: string }>;
  priority: number;
};

export const englishStandaloneTools: EnglishStandaloneTool[] = [
  {
    slug: "paint-calculator",
    englishPath: "/en/paint-calculator",
    turkishPath: "/boya-hesaplama",
    title: "Paint Calculator",
    description:
      "How many gallons of paint does a room need? Enter the size, doors, windows, coats and coverage for a gallons + quarts shopping list.",
    intro:
      "Enter the room size and wall height in feet, the number of doors and windows and the coverage from your paint can. The calculator subtracts openings, multiplies by the number of coats and tells you what to buy.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription: "Calculates wall and ceiling area and the expected amount of paint.",
    articleSections: [
      {
        title: "How to calculate how much paint you need",
        body: "Wall area = 2 × (length + width) × wall height. Subtract about 21 sq ft for each door (3 × 7 ft) and 15 sq ft for each window (3 × 5 ft). Multiply by the number of coats and divide by the coverage on the can, typically 350–400 sq ft per gallon. Add the ceiling (length × width) if you are painting it too.",
      },
      {
        title: "Worked example: a 12 × 14 ft bedroom",
        body: "With 8 ft walls the wall area is 2 × (12 + 14) × 8 = 416 sq ft. One door and one window leave 416 − 21 − 15 = 380 sq ft. Two coats make 760 sq ft, and at 350 sq ft per gallon that is 2.17 gallons — buy 2 gallons plus 1 quart.",
      },
      {
        title: "How many coats do you need?",
        body: "Two coats is the norm for an even finish, especially when changing color. One coat can be enough when repainting the same color in good condition. Going from a dark color to a light one, or painting new drywall, usually needs a coat of primer first.",
      },
      {
        title: "Coverage and buying tips",
        body: "Smooth, previously painted walls get close to the coverage on the label; textured, porous or patched surfaces use more. Buying 1 extra quart is cheaper than a second gallon, but if you would need 3 or more quarts, a gallon is usually the better buy — the calculator rounds this for you.",
      },
    ],
    faq: [
      { question: "How much paint do I need for a 12 × 12 room?", answer: "With 8 ft walls, one door and one window, the walls are about 348 sq ft. Two coats at 350 sq ft per gallon need about 2 gallons." },
      { question: "How many square feet does a gallon of paint cover?", answer: "Most interior paints cover about 350–400 sq ft per gallon per coat on smooth walls. Check the label of your product and enter that figure." },
      { question: "How much paint do I need for a ceiling?", answer: "A 12 × 14 ft ceiling is 168 sq ft. Two coats at 350 sq ft per gallon need about 1 gallon." },
      { question: "Do I need to subtract doors and windows?", answer: "Yes for an accurate estimate. The calculator removes 21 sq ft per door and 15 sq ft per window; with very large windows or sliding doors, measure them and lower the count accordingly." },
    ],
    priority: 0.7,
  },
  {
    slug: "tile-calculator",
    englishPath: "/en/tile-calculator",
    turkishPath: "/fayans-hesaplama",
    title: "Tile Calculator",
    description:
      "How many tiles and boxes do you need? Enter the area, tile size (12×24, 24×24, subway), grout joint and waste allowance. US and metric units.",
    intro:
      "Enter the area in square feet, the tile size in inches and the grout width. The calculator adds your waste allowance and rounds up to whole tiles and boxes.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription: "Calculates the right amount of tile, accounting for waste.",
    articleSections: [
      {
        title: "How to calculate how many tiles you need",
        body: "Measure the area first: multiply length × width in feet, and split L-shaped rooms into rectangles and add them up. Next, work out what one tile covers including its grout joint: (tile width + grout) × (tile length + grout) ÷ 144 gives square feet. Multiply the area by 1.10 for a 10% waste allowance, divide by the coverage of one tile and round up. Divide the tile count by the pieces per box and round up again to get the number of boxes.",
      },
      {
        title: "Worked example: a 10 × 12 ft bathroom floor",
        body: "The floor is 120 sq ft. A 12 × 24 in tile with a 1/8 in grout joint covers (12.125 × 24.125) ÷ 144 = 2.03 sq ft. With 10% waste you need 132 sq ft ÷ 2.03 = 64.98, so 65 tiles. At 8 tiles per box that is 8.1 boxes, so you buy 9 boxes.",
      },
      {
        title: "How much extra tile should I buy?",
        body: "Add 10% for a straight layout in a simple room. Add 15% for diagonal or herringbone patterns, rooms with many cuts, and large-format tile (24 in and up), which breaks more easily when cut. Natural stone and handmade tile vary more from piece to piece, so many installers add 15–20%. Keep a few spare tiles after the job: finding the same color batch years later is difficult.",
      },
      {
        title: "Common tile sizes and coverage",
        body: "Coverage per tile before grout: 12 × 12 in = 1 sq ft; 12 × 24 in = 2 sq ft; 24 × 24 in = 4 sq ft; 6 × 24 in plank = 1 sq ft; 3 × 6 in subway = 0.125 sq ft (8 per sq ft); 4 × 4 in = 0.111 sq ft (9 per sq ft). Grout joints make each tile cover slightly more, so the real count is a little lower — the calculator includes this.",
      },
    ],
    faq: [
      { question: "How many 12 × 24 tiles do I need for 100 square feet?", answer: "Each 12 × 24 in tile covers 2 sq ft, so 100 sq ft takes 50 tiles before waste. With a 10% waste allowance, plan on 55 tiles." },
      { question: "How many subway tiles are in a square foot?", answer: "A 3 × 6 in subway tile covers 0.125 sq ft, so there are 8 tiles per square foot. With 1/16 in grout joints it works out to about 7.8 per square foot." },
      { question: "Does grout width change how many tiles I need?", answer: "Yes, slightly. A wider joint means each tile plus its joint covers more area, so you need fewer tiles. The effect is small for large tiles and noticeable for small mosaics and subway tile." },
      { question: "Should I buy extra tile boxes?", answer: "Yes. Round up to whole boxes, include a 10–15% waste allowance and keep at least a few spare tiles from the same lot for future repairs." },
    ],
    priority: 0.7,
  },
  {
    slug: "brick-calculator",
    englishPath: "/en/brick-calculator",
    turkishPath: "/tugla-hesaplama",
    title: "Brick Calculator",
    description:
      "Estimate how many bricks you need for a wall from its area, brick size and mortar joint. Defaults to US modular brick (about 6.86 per sq ft); metric units too.",
    intro:
      "Enter the wall area and the area of doors and windows. The calculator works out how many bricks fit in one square foot including the mortar joint, then adds a waste allowance.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription: "Calculates the approximate brick requirement, including joints and waste.",
    articleSections: [
      {
        title: "How the brick count is calculated",
        body: "Each brick plus its mortar joint takes up (brick length + joint) × (brick height + joint). A US modular brick is 7⅝ × 2¼ in; with ⅜ in joints that is 8 × 2⅝ = 21 sq in, so one square foot (144 sq in) holds 144 ÷ 21 = 6.86 bricks. Multiply by the net wall area (wall minus openings) and add 5–10% for breakage and cuts.",
      },
      {
        title: "Worked example: a 25 × 8 ft garden wall",
        body: "The wall is 200 sq ft. 200 × 6.857 = 1,371.4 bricks; with 5% waste that is 1,440 bricks. If the wall has a 40 sq ft opening, the net area is 160 sq ft and you need 1,098 bricks before waste.",
      },
      {
        title: "Common US brick sizes",
        body: "Use the actual size, not the nominal size, together with your joint width. With ⅜ in joints: modular (7⅝ × 2¼ in face) is about 6.86 bricks per sq ft; king size (about 9⅝ × 2⅝ in) about 4.8 per sq ft; utility (11⅝ × 3⅝ in) about 3.0 per sq ft. Sizes vary between manufacturers, so check the product sheet.",
      },
      {
        title: "Single or double wythe?",
        body: "The count above is for one layer of brick (single wythe), as used for veneer and most garden walls. A solid double-wythe wall needs twice as many bricks. For structural walls, retaining walls and anything over a few feet tall, follow local building codes and an engineer's design.",
      },
    ],
    faq: [
      { question: "How many bricks are in a square foot?", answer: "About 6.86 standard US modular bricks per square foot of single-wythe wall with ⅜ in mortar joints. Larger bricks need fewer: roughly 4.8 king size or 3.0 utility bricks per square foot." },
      { question: "How many bricks do I need for a 10 × 10 ft wall?", answer: "100 sq ft × 6.86 = about 686 modular bricks. With a 5% waste allowance, buy about 720." },
      { question: "How much waste should I add for bricks?", answer: "Around 5% for a simple wall and up to 10% for walls with many openings, corners or cut bricks." },
      { question: "Do I subtract doors and windows?", answer: "Yes. Enter their total area in the doors and windows field so only the brick surface is counted." },
    ],
    priority: 0.7,
  },
  {
    slug: "concrete-calculator",
    englishPath: "/en/concrete-calculator",
    turkishPath: "/beton-hesaplama",
    title: "Concrete Calculator",
    description:
      "Calculate concrete volume for a slab, footing or column in US customary or metric units, including a waste allowance.",
    intro:
      "Enter the dimensions of a rectangular pour or circular column to estimate the concrete volume you need before ordering.",
    component: "concreteCalculator",
    iconName: "concreteCalculator",
    cardDescription:
      "Estimates concrete volume in cubic yards or cubic meters, with a clear waste allowance.",
    articleSections: [
      {
        title: "What does this calculator estimate?",
        body: "Choose a rectangular slab or footing, or a circular column. The calculator multiplies the dimensions, then applies the waste allowance you choose so you can plan the required ready-mix volume.",
      },
      {
        title: "Why are the material figures only estimates?",
        body: "Concrete mix designs and bag yields vary by product, strength class, aggregate and job conditions. Use the volume result as the ordering basis and confirm the final order with your supplier or project specification.",
      },
    ],
    relatedHub: {
      href: "/en/construction-calculators",
      label: "Construction Calculators",
    },
    priority: 0.8,
  },
  {
    slug: "stair-calculator",
    englishPath: "/en/stair-calculator",
    turkishPath: "/merdiven-hesaplama",
    title: "Stair Calculator",
    description:
      "Estimate the number of risers, riser height, tread depth and total run for a straight stair in US customary or metric units.",
    intro:
      "Enter the total rise and a target riser height to produce a first-pass straight-stair proportion before detailed design.",
    component: "stairCalculator",
    iconName: "stairCalculator",
    cardDescription:
      "Estimates straight-stair risers, tread depth and total run for early planning.",
    articleSections: [
      {
        title: "How is the stair proportion estimated?",
        body: "The calculator rounds to a practical number of risers, then derives the actual riser height and uses the Blondel relationship to estimate tread depth and the total horizontal run.",
      },
      {
        title: "Can this verify a stair design?",
        body: "No. Local building codes, structural design, headroom, landings, handrails, guards and accessibility requirements must be checked separately for the actual project.",
      },
    ],
    relatedHub: {
      href: "/en/construction-calculators",
      label: "Construction Calculators",
    },
    priority: 0.75,
  },
  {
    slug: "gravel-soil-calculator",
    englishPath: "/en/gravel-soil-calculator",
    turkishPath: "/kazı-hacmi-hesaplama",
    title: "Gravel & Soil Calculator",
    description:
      "Estimate gravel, soil or aggregate volume and order weight from dimensions, waste allowance and your supplier's bulk density.",
    intro:
      "Enter the area dimensions and the material depth to estimate cubic yards or cubic meters, then adjust the density to match the material you are ordering.",
    component: "aggregateCalculator",
    iconName: "concreteCalculator",
    cardDescription:
      "Estimates material volume and weight with an editable bulk-density assumption.",
    articleSections: [
      {
        title: "Why is bulk density an input?",
        body: "Gravel, crushed stone, soil and mulch do not share one universal weight per cubic yard. Moisture, particle size, compaction and material type all change the delivered weight, so the supplier's density should replace the planning default.",
      },
      {
        title: "How should I use the result?",
        body: "Use the volume-with-waste figure as a first ordering estimate. Confirm compaction, delivery minimums, material grade and the final quantity with the supplier or project team before purchase.",
      },
    ],
    relatedHub: {
      href: "/en/construction-calculators",
      label: "Construction Calculators",
    },
    isEnglishOnly: true,
    priority: 0.76,
  },
  {
    slug: "roofing-calculator",
    englishPath: "/en/roofing-calculator",
    turkishPath: "/cati-hesaplama",
    title: "Roofing Calculator",
    description:
      "Estimate sloped roof area, roofing squares and bundle count for a simple gable roof using your own pitch, waste and product coverage.",
    intro:
      "Enter a building footprint, eave overhang and roof pitch to estimate material coverage for an early roofing plan.",
    component: "roofingCalculator",
    iconName: "concreteCalculator",
    cardDescription:
      "Estimates gable-roof area, roofing squares and bundles with editable product coverage.",
    articleSections: [
      {
        title: "What does this roof estimate assume?",
        body: "The tool treats the roof as a simple symmetric gable. It applies the pitch to the plan area, then adds the waste allowance you choose before converting the area into roofing squares and bundles.",
      },
      {
        title: "What should be verified before ordering?",
        body: "Complex roof features, product-specific coverage, starter courses, ridge caps, flashing, decking condition and local requirements can materially change the final order. Confirm the takeoff with the supplier or qualified project team.",
      },
    ],
    relatedHub: {
      href: "/en/construction-calculators",
      label: "Construction Calculators",
    },
    isEnglishOnly: true,
    priority: 0.77,
  },
  {
    slug: "age-calculator",
    englishPath: "/en/age-calculator",
    turkishPath: "/yas-hesaplama",
    title: "Age Calculator",
    description:
      "Precisely calculate the difference between two dates in years, months and days, along with running totals.",
    intro:
      "Useful for calculating age, the duration between two dates, or the time remaining until the next anniversary.",
    component: "dateCalculator",
    iconName: "dateCalculator",
    cardDescription: "Calculates age or the difference between two dates, plus extra totals.",
    articleSections: [
      {
        title: "Why not just show the number of days?",
        body: "In many cases, a years-months-days breakdown is clearer and more useful than a single total day count.",
      },
      {
        title: "What else does the page show?",
        body: "Alongside the exact difference, you'll see the total in days, weeks and months, as well as the date of the next anniversary.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "vat-calculator",
    englishPath: "/en/vat-calculator",
    turkishPath: "/kdv-hesaplama",
    title: "VAT Calculator",
    description:
      "Add or remove VAT from any price: enter the amount and the rate (20%, 5%, 0% or a custom rate) to get the net price, the VAT amount and the gross total.",
    intro:
      "Choose whether your amount excludes or includes VAT, pick the rate and see the net amount, the VAT and the total. Works with any currency.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription: "Calculates the price before and after tax, and the tax amount itself.",
    articleSections: [
      {
        title: "How to add VAT to a price",
        body: "Multiply the net price by (1 + VAT rate). At 20%, £100 × 1.20 = £120: £100 net plus £20 VAT. At 5%, £100 × 1.05 = £105.",
      },
      {
        title: "How to remove VAT from a price",
        body: "Divide the gross price by (1 + VAT rate) — do not simply take the percentage off. £120 including 20% VAT ÷ 1.20 = £100 net, so the VAT is £20. Taking 20% off £120 would wrongly give £96. A quick check: at 20% the VAT is always 1/6 of the gross price; at 5% it is 1/21.",
      },
      {
        title: "UK VAT rates",
        body: "The UK has three VAT rates: the standard rate of 20% applies to most goods and services; the reduced rate of 5% applies to some items such as domestic energy and children's car seats; the zero rate of 0% applies to most food, books and children's clothes. Some goods and services are exempt from VAT altogether. Check GOV.UK for the rate on a specific product.",
      },
      {
        title: "Other countries",
        body: "Enter any other rate with the custom option. For example, Ireland's standard rate is 23% and the UAE's is 5%. The US has no VAT; states and cities charge a sales tax instead, which is added at the checkout — you can still use the calculator with your local sales tax rate.",
      },
    ],
    faq: [
      { question: "How do I calculate 20% VAT?", answer: "Multiply the net amount by 0.20 to get the VAT, or by 1.20 to get the total including VAT. £250 net → £50 VAT → £300 total." },
      { question: "How do I work out the VAT from a price that includes VAT?", answer: "Divide the gross price by 6 for 20% VAT (or by 21 for 5% VAT). A £90 price including 20% VAT contains £15 VAT and £75 net." },
      { question: "Why can't I just subtract 20% to remove VAT?", answer: "Because the 20% was calculated on the net price, not the gross price. Removing it means dividing by 1.20; subtracting 20% of the gross price gives too low a net figure." },
      { question: "Does the US have VAT?", answer: "No. The US uses state and local sales taxes instead of VAT. Enter your sales tax rate as a custom rate to see the tax and the total." },
    ],
    priority: 0.75,
  },
  {
    slug: "bmi-calculator",
    englishPath: "/en/bmi-calculator",
    turkishPath: "/bmi-hesaplama",
    title: "BMI Calculator",
    description:
      "Calculate your body mass index, basal metabolic rate and approximate daily calorie needs.",
    intro:
      "Using your height, weight, age, sex and activity level, you'll get a quick and useful reading.",
    component: "bmiCalculator",
    iconName: "bmiCalculator",
    cardDescription: "Calculates BMI and your approximate daily calorie needs.",
    articleSections: [
      {
        title: "What does BMI mean?",
        body: "It's a quick index relating weight to height, useful for forming an initial impression, though it does not replace specialized health assessment.",
      },
      {
        title: "Why does activity level appear?",
        body: "Because daily energy expenditure doesn't depend on weight and height alone — how much you move also affects it.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "pregnancy-week-calculator",
    englishPath: "/en/pregnancy-week-calculator",
    turkishPath: "/gebelik-haftasi-hesaplama",
    title: "Pregnancy Week Calculator",
    description:
      "Calculate the current pregnancy week, expected trimester and estimated due date.",
    intro:
      "The calculator uses the first day of your last menstrual period to give a quick, clear estimate.",
    component: "pregnancyCalculator",
    iconName: "pregnancyCalculator",
    cardDescription: "Shows the current pregnancy week, trimester and estimated due date.",
    articleSections: [
      {
        title: "How is the calculation done?",
        body: "The common medical method starts from the first day of the last menstrual period, and gestational age is calculated forward from that date.",
      },
      {
        title: "Is this tool enough on its own?",
        body: "It's a good starting guide, but it does not replace a doctor's visit or approved medical follow-up.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "length-comparison",
    englishPath: "/en/length-comparison",
    turkishPath: "/uzunluk-karsilastirma",
    title: "Length Comparison",
    description:
      "Compare any length to familiar references, such as a person's height, a giraffe, a football field or the Eiffel Tower.",
    intro:
      "This kind of comparison makes numbers much easier to visualize and understand.",
    component: "lengthComparison",
    iconName: "length",
    cardDescription: "Turns a length value into understandable visual comparisons.",
    articleSections: [
      {
        title: "Why is a reference comparison useful?",
        body: "Many people find it hard to picture numbers like 25 meters or 330 meters without connecting them to something familiar.",
      },
      {
        title: "How are the results ordered?",
        body: "The reference closest in proportion to your entered value appears first, followed by the rest of the comparisons.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "weight-comparison",
    englishPath: "/en/weight-comparison",
    turkishPath: "/agirlik-karsilastirma",
    title: "Weight Comparison",
    description:
      "Compare a weight to familiar values, such as a cat, a person, a car or a blue whale.",
    intro:
      "The goal here isn't absolute scientific precision, but turning numbers into something easier to grasp.",
    component: "weightComparison",
    iconName: "mass",
    cardDescription: "Compares a weight against everyday and large-scale examples.",
    articleSections: [
      {
        title: "When is this page useful?",
        body: "When reading the weight of products, loads or large measurements, reference comparisons help you quickly understand the real scale.",
      },
      {
        title: "Are the values exact?",
        body: "The values are approximate averages, intended for illustration and quick comparison rather than final scientific measurement.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "running-pace-calculator",
    englishPath: "/en/running-pace-calculator",
    turkishPath: "/kosu-pace-hesaplama",
    title: "Running Pace Calculator",
    description:
      "Calculate pace, distance or time, and see estimates for 5K, 10K, half-marathon and marathon races.",
    intro:
      "Useful for training, race planning and understanding the relationship between time, distance and pace.",
    component: "paceCalculator",
    iconName: "paceCalculator",
    cardDescription: "Calculates running pace, time and distance, with estimates for known race distances.",
    articleSections: [
      {
        title: "What can be calculated?",
        body: "If you know any two of time, distance or pace, the tool can directly find the third value.",
      },
      {
        title: "How should you read the race estimates?",
        body: "They're estimates based on the assumption that your current pace stays constant across the full distance, so treat them as an approximate reference, not a guarantee.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "ac-btu-calculator",
    englishPath: "/en/ac-btu-calculator",
    turkishPath: "/klima-btu-hesaplama",
    title: "AC BTU Calculator",
    description:
      "Calculate the right air conditioner capacity based on room area, number of people and sun exposure.",
    intro:
      "This page helps you get an initial estimate before choosing the right air conditioning unit.",
    component: "acCapacityCalculator",
    iconName: "acCapacityCalculator",
    cardDescription: "Estimates the right air conditioner capacity for a room, in BTU.",
    articleSections: [
      {
        title: "Why isn't area alone enough?",
        body: "Because the number of people, the room's sun exposure, and whether it's a top-floor room all increase the actual heat load.",
      },
      {
        title: "Is this a final purchase decision?",
        body: "It's a great estimate to start from, but it's also worth comparing against the manufacturer's own data and your specific site conditions.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "electricity-consumption-calculator",
    englishPath: "/en/electricity-consumption-calculator",
    turkishPath: "/elektrik-tuketimi-hesaplama",
    title: "Electricity Consumption Calculator",
    description:
      "Calculate daily, monthly and yearly consumption plus estimated cost using your electricity price per kWh.",
    intro:
      "It helps you quickly understand how running different appliances affects your bill.",
    component: "electricityConsumptionCalculator",
    iconName: "electricityConsumptionCalculator",
    cardDescription: "Shows consumption and approximate cost for electrical appliances.",
    articleSections: [
      {
        title: "When is it useful?",
        body: "When comparing heaters, air conditioners, home appliances or any device that runs for long hours and you want to know its financial impact.",
      },
      {
        title: "Why is the electricity price optional?",
        body: "You can get value from knowing the consumption even without a price, then add your tariff later for a cost estimate.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "sleep-calculator",
    englishPath: "/en/sleep-calculator",
    turkishPath: "/uyku-hesaplama",
    title: "Sleep Calculator",
    description:
      "Calculate suggested bedtimes or wake-up times based on roughly 90-minute sleep cycles.",
    intro:
      "The page shows several practical options and highlights the durations closest to healthy, adequate sleep.",
    component: "sleepCalculator",
    iconName: "sleepCalculator",
    cardDescription: "Suggests bedtimes and wake-up times based on sleep cycles.",
    articleSections: [
      {
        title: "Why do sleep cycles matter?",
        body: "Waking near the end of a cycle is generally easier than waking in the middle of a deep-sleep phase.",
      },
      {
        title: "What does the recommended option mean?",
        body: "It's the option closest to the commonly cited healthy sleep range for adults, offered as a practical reference rather than a strict rule.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "fuel-consumption-calculator",
    englishPath: "/en/fuel-consumption-calculator",
    turkishPath: "/yakit-tuketimi-hesaplama",
    title: "Fuel Consumption Calculator",
    description:
      "Convert between km/L, L/100km and mpg, and calculate trip cost from distance and fuel price.",
    intro:
      "Enter whichever fuel-consumption figure you know to see it converted into the other common formats, plus an estimated trip cost.",
    component: "fuelConsumptionCalculator",
    iconName: "fuelConsumptionCalculator",
    cardDescription: "Converts between km/L, L/100km and mpg, and estimates trip cost.",
    articleSections: [
      {
        title: "Why so many different units?",
        body: "Europe typically uses L/100km, the US and UK use mpg, and some regions use km/L — this tool lets you move between all of them instantly.",
      },
      {
        title: "How is trip cost calculated?",
        body: "Using your consumption figure and the distance you plan to drive, the tool estimates how much fuel you'll need and its approximate cost.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "tire-size-calculator",
    englishPath: "/en/tire-size-calculator",
    turkishPath: "/lastik-ebati-hesaplama",
    title: "Tire Size Calculator",
    description: "Compare tire dimensions, circumference, revolutions and estimated speedometer difference between two tire sizes.",
    intro: "Enter an original and replacement tire size to compare rolling dimensions before discussing fitment with a qualified tire professional.",
    component: "tireSizeCalculator",
    iconName: "fuelConsumptionCalculator",
    cardDescription: "Compares tire diameter, circumference and estimated speedometer difference.",
    articleSections: [
      {
        title: "What does the size comparison calculate?",
        body: "It derives sidewall height from the width and aspect ratio, then adds the rim diameter to calculate the outer diameter and circumference. The circumference difference is used to estimate the change in indicated versus actual speed.",
      },
      {
        title: "Why is this not a fitment decision?",
        body: "Tire size alone does not establish wheel clearance, approved load index, speed rating, axle compatibility, brake clearance or legal compliance. Check the vehicle placard, owner manual and a qualified tire professional before changing sizes.",
      },
    ],
    relatedHub: {
      href: "/en/automotive-calculators",
      label: "Automotive Calculators",
    },
    priority: 0.73,
  },
  {
    slug: "number-base-calculator",
    englishPath: "/en/number-base-calculator",
    turkishPath: "/sayi-tabani-cevirici",
    title: "Number Base Calculator",
    description: "Convert whole numbers between binary, octal, decimal and hexadecimal, and perform basic binary arithmetic.",
    intro: "Enter a whole number in its known base to see its equivalent binary, octal, decimal and hexadecimal forms.",
    component: "numberBaseCalculator",
    iconName: "numberBaseCalculator",
    cardDescription: "Converts binary, octal, decimal and hexadecimal whole numbers, with basic binary arithmetic.",
    articleSections: [
      { title: "Which number bases are supported?", body: "The calculator accepts non-negative whole numbers written in base 2, 8, 10 or 16. Hexadecimal uses digits 0–9 and letters A–F." },
      { title: "What are the arithmetic limits?", body: "The arithmetic panel works with two non-negative binary whole numbers. It does not evaluate fractions, signed values, algebraic expressions or floating-point notation." },
    ],
    relatedHub: { href: "/en/data-computing-calculators", label: "Data & Computing Calculators" },
    priority: 0.72,
  },
  {
    slug: "one-rep-max-calculator",
    englishPath: "/en/one-rep-max-calculator",
    turkishPath: "/1rm-hesaplama",
    title: "One Rep Max Calculator",
    description: "Estimate a one-repetition maximum and a percentage-based training-load table from a submaximal set.",
    intro: "Enter a weight and repetitions from one controlled set to estimate your 1RM with the Epley formula.",
    component: "oneRepMaxCalculator",
    iconName: "oneRepMaxCalculator",
    cardDescription: "Estimates 1RM and a percentage-based training-load reference in kg or lb.",
    articleSections: [
      { title: "How is the estimate calculated?", body: "The Epley equation estimates one-repetition maximum as weight × (1 + repetitions / 30). It is intended for a controlled submaximal set and the same unit is retained in the result." },
      { title: "Why is it only an estimate?", body: "The relationship between repetitions and maximum load varies with exercise, technique, range of motion, fatigue and experience. Avoid treating the result as a guarantee or a reason to attempt an unsafe maximal lift." },
    ],
    relatedHub: { href: "/en/fitness-calculators", label: "Fitness Calculators" },
    priority: 0.7,
  },
  {
    slug: "pixel-dpi-calculator",
    englishPath: "/en/pixel-dpi-calculator",
    turkishPath: "/piksel-cm-dpi-hesaplama",
    title: "Pixel, DPI & Print Size Calculator",
    description: "Calculate pixel count, physical size or DPI/PPI from the other two measurements.",
    intro: "Use two known image or print measurements to find the third: pixels, physical size or pixel density.",
    component: "pixelCalculator",
    iconName: "pixelCalculator",
    cardDescription: "Find pixels, physical size or DPI/PPI for a stated image dimension.",
    articleSections: [
      { title: "How are pixels and print size related?", body: "Physical size in inches multiplied by DPI gives the pixel count along one dimension. The calculation can use centimetres or inches for the physical measurement." },
      { title: "What does DPI not determine?", body: "DPI/PPI describes density at a stated physical size. It does not improve image detail, color quality, crop composition or printer capability." },
    ],
    relatedHub: { href: "/en/data-computing-calculators", label: "Data & Computing Calculators" },
    priority: 0.7,
  },
  {
    slug: "video-bitrate-calculator",
    englishPath: "/en/video-bitrate-calculator",
    turkishPath: "/video-bit-hizi-hesaplama",
    title: "Video Bitrate Calculator",
    description: "Estimate video file size from bitrate and duration, or the bitrate from file size and duration.",
    intro: "Enter a video duration and either a target bitrate or file size to make a first-pass export estimate.",
    component: "videoBitrateCalculator",
    iconName: "videoBitrateCalculator",
    cardDescription: "Estimates video file size or bitrate using duration and decimal MB/Mbps units.",
    articleSections: [
      { title: "How is the estimate calculated?", body: "The tool uses file size in MB = bitrate in Mbps × duration in seconds ÷ 8, because a byte contains eight bits." },
      { title: "Why can the exported size differ?", body: "Audio tracks, container overhead, metadata, variable bitrate and the encoder settings can all alter the final output file." },
    ],
    relatedHub: { href: "/en/data-computing-calculators", label: "Data & Computing Calculators" },
    priority: 0.7,
  },
  {
    slug: "laminate-flooring-calculator",
    englishPath: "/en/laminate-flooring-calculator",
    turkishPath: "/parke-hesaplama",
    title: "Laminate Flooring Calculator",
    description:
      "How many boxes of laminate or vinyl plank flooring to buy, from the room size, coverage per box and waste allowance — plus leftover and cost.",
    intro:
      "Enter the floor area and the square feet printed on one box. The calculator adds a waste allowance, rounds up to whole boxes and shows what will be left over.",
    component: "laminateCalculator",
    iconName: "laminateCalculator",
    cardDescription: "Calculates the laminate flooring packages needed, including waste.",
    articleSections: [
      {
        title: "How to calculate flooring boxes",
        body: "Measure each room in feet and multiply length × width; add closets and alcoves separately. Multiply the total by 1.10 for a 10% waste allowance, divide by the coverage printed on the box (for example 22.5 sq ft) and round up to a whole box.",
      },
      {
        title: "Worked example: a 12 × 15 ft living room",
        body: "The room is 180 sq ft. With 10% waste that is 198 sq ft. At 22.5 sq ft per box you need 198 ÷ 22.5 = 8.8, so 9 boxes. You will buy 202.5 sq ft and have about 22.5 sq ft left over after installation. At $45 per box the flooring costs $405.",
      },
      {
        title: "How much waste to allow",
        body: "10% is standard for rectangular rooms with the planks laid straight. Use 15% for rooms with many corners, closets or hallways and for diagonal layouts, because more planks are cut. Keep one unopened box for future repairs — the same color and batch can be hard to find later.",
      },
      {
        title: "Before you install",
        body: "Check the manufacturer's instructions for acclimating the boxes in the room, the expansion gap to leave at walls and whether an underlayment is required. Underlayment is bought for the same floor area.",
      },
    ],
    faq: [
      { question: "How many square feet are in a box of laminate flooring?", answer: "It depends on the product; many laminate and vinyl plank boxes cover about 15–25 sq ft. The exact figure is printed on the box and on the product page — enter it in the calculator." },
      { question: "How much extra flooring should I buy?", answer: "Buy about 10% extra for a simple room and 15% for rooms with many cuts or a diagonal layout, then round up to a whole box." },
      { question: "How many boxes do I need for 200 square feet?", answer: "With 10% waste you need 220 sq ft. At 22.5 sq ft per box that is 9.8, so 10 boxes; at 20 sq ft per box it is 11 boxes." },
      { question: "Can I use this for vinyl plank or engineered wood?", answer: "Yes. The calculation is the same for any flooring sold by the box: area plus waste, divided by the coverage per box." },
    ],
    priority: 0.7,
  },
  {
    slug: "wallpaper-calculator",
    englishPath: "/en/wallpaper-calculator",
    turkishPath: "/duvar-kagidi-hesaplama",
    title: "Wallpaper Calculator",
    description:
      "How many rolls of wallpaper do you need? Strip-method calculator with room size, wall height, openings, roll size and pattern repeat.",
    intro:
      "Enter the room size, wall height, the width of doors and windows, the roll size and the pattern repeat. The calculator counts full-height strips, the strips each roll gives and the rolls to buy.",
    component: "wallpaperCalculator",
    iconName: "wallpaperCalculator",
    cardDescription: "Calculates the wallpaper rolls needed for a room, including waste.",
    articleSections: [
      {
        title: "How the strip method works",
        body: "Wallpaper is hung in full-height strips, so counting strips is more accurate than dividing square feet. Wall width to cover = the room perimeter minus the width of doors and windows. Strips needed = wall width ÷ roll width, rounded up. Each strip is as long as the wall is high plus one pattern repeat for matching, and strips per roll = roll length ÷ strip length, rounded down. Rolls = strips needed ÷ strips per roll, rounded up.",
      },
      {
        title: "Worked example: a 12 × 14 ft room with 8 ft walls",
        body: "The perimeter is 52 ft; minus 6 ft of doors and windows leaves 46 ft (552 in). With a 20.5 in wide roll you need 552 ÷ 20.5 = 26.9, so 27 strips. A 33 ft double roll gives 4 strips of 8 ft, so you need 27 ÷ 4 = 6.75, rounded up to 7 double rolls.",
      },
      {
        title: "Why pattern repeat matters",
        body: "A patterned paper has to line up from strip to strip, so each strip is cut longer. In the same room, a 21 in pattern repeat makes each strip 9 ft 9 in long, a 33 ft roll then gives only 3 strips and you need 9 double rolls instead of 7. The repeat is printed on the label.",
      },
      {
        title: "Single rolls, double rolls and European rolls",
        body: "In the US, wallpaper is usually priced per single roll but packaged as double rolls: a double roll is typically 20.5 in × 33 ft, about 56 sq ft. A standard European roll is 0.53 × 10.05 m, about 5.3 m². Always enter the width and length printed on the label, and buy all rolls from the same batch number.",
      },
    ],
    faq: [
      { question: "How many rolls of wallpaper do I need for a 12 × 12 room?", answer: "With 8 ft walls and about 6 ft of doors and windows, the wall width is 42 ft, which takes 25 strips of a 20.5 in roll. At 4 strips per 33 ft double roll you need 7 double rolls with no pattern repeat." },
      { question: "How much does one double roll of wallpaper cover?", answer: "A typical US double roll (20.5 in × 33 ft) is about 56 sq ft, but the usable area is lower after trimming and pattern matching — which is why the strip method is used." },
      { question: "Should I subtract doors and windows?", answer: "Subtract the width of large openings such as doors, patio doors and wide windows. Small windows are usually ignored because the strips above and below them still need to be hung." },
      { question: "Should I buy an extra roll?", answer: "Yes. Buy one extra roll from the same batch for mistakes and future repairs; rolls from a different batch can differ slightly in color." },
    ],
    priority: 0.7,
  },
  {
    slug: "moving-box-calculator",
    englishPath: "/en/moving-box-calculator",
    turkishPath: "/tasinma-kutusu-hesaplama",
    title: "Moving Box Calculator",
    description:
      "See the estimated number of moving boxes and truck volume needed, based on your home size.",
    intro:
      "Choose your home type to instantly see typical small-box and large-box counts, plus an estimated truck size.",
    component: "movingBoxCalculator",
    iconName: "movingBoxCalculator",
    cardDescription: "Estimates moving box counts and truck volume based on home size.",
    articleSections: [
      {
        title: "How accurate are these numbers?",
        body: "They're industry-average estimates for a typical home of that size — a household with unusually many or few belongings will need more or fewer boxes.",
      },
      {
        title: "What's the truck volume for?",
        body: "It gives you a starting point for comparing moving-truck or van sizes before you book one.",
      },
    ],
    priority: 0.65,
  },
  {
    slug: "natural-gas-cost-calculator",
    englishPath: "/en/natural-gas-cost-calculator",
    turkishPath: "/dogalgaz-tuketimi-hesaplama",
    title: "Natural Gas Cost Calculator",
    description:
      "Calculate the total cost and approximate kWh equivalent from your natural gas consumption in cubic meters.",
    intro:
      "Enter your consumption and unit price to see the total cost and an approximate energy equivalent in kWh.",
    component: "naturalGasCalculator",
    iconName: "naturalGasCalculator",
    cardDescription: "Calculates natural gas cost and its approximate kWh equivalent.",
    articleSections: [
      {
        title: "Why is the kWh value approximate?",
        body: "The exact conversion factor between cubic meters and kWh depends on the calorific value of the gas supplied, which varies slightly by region and supplier.",
      },
      {
        title: "When is this useful?",
        body: "It helps you compare a gas bill against other energy sources, or estimate cost before a billing cycle ends.",
      },
    ],
    priority: 0.65,
  },
  {
    slug: "ev-charging-calculator",
    englishPath: "/en/ev-charging-calculator",
    turkishPath: "/elektrikli-arac-sarj-hesaplama",
    title: "EV Charging Calculator",
    description:
      "Calculate electric vehicle charging time from battery capacity and charger power, or estimate driving range from consumption.",
    intro:
      "Switch between charging-time and range mode to plan your EV charging or estimate how far a full charge will take you.",
    component: "evChargingCalculator",
    iconName: "evChargingCalculator",
    cardDescription: "Calculates EV charging time or estimated driving range.",
    articleSections: [
      {
        title: "What does charging efficiency mean?",
        body: "Not all the energy drawn from the charger reaches the battery — some is lost as heat during conversion, which is why efficiency is factored into the charging-time estimate.",
      },
      {
        title: "How is range estimated?",
        body: "Range is calculated by dividing usable battery capacity by your vehicle's real-world consumption per 100 km, giving an approximate driving distance.",
      },
    ],
    priority: 0.65,
  },
  {
    slug: "height-converter",
    englishPath: "/en/height-converter",
    turkishPath: "/uzunluk-karsilastirma",
    title: "Height Converter: cm to Feet and Inches",
    description:
      "Convert height from centimeters to feet and inches (5'9\") or from feet and inches to cm, with a chart of common heights.",
    intro:
      "Enter your height in centimeters to see it in feet and inches, or switch direction to convert feet and inches to cm. A chart of common heights is included below.",
    component: "heightConverter",
    iconName: "length",
    cardDescription: "Converts height between cm and feet + inches, with a height chart.",
    articleSections: [
      {
        title: "How to convert cm to feet and inches",
        body: "Divide the height in centimeters by 2.54 to get total inches, then divide by 12. The whole number is feet and the remainder is inches. For example, 175 cm ÷ 2.54 = 68.9 inches, which is 5 feet 8.9 inches – usually written 5′9″.",
      },
      {
        title: "How to convert feet and inches to cm",
        body: "Multiply the feet by 12, add the inches and multiply the total by 2.54. For example, 5 ft 7 in = 67 inches × 2.54 = 170.18 cm. Because an inch is defined as exactly 2.54 cm, the result is exact.",
      },
      {
        title: "Where each system is used",
        body: "Height is written in feet and inches in the United States and, informally, in the United Kingdom and Canada. Most other countries, and medical records almost everywhere, use centimeters. This converter is useful for passports, dating profiles, sports rosters and size charts.",
      },
    ],
    faq: [
      { question: "How tall is 170 cm in feet?", answer: "170 cm is 5 feet 6.9 inches, usually rounded to 5′7″." },
      { question: "How tall is 180 cm in feet?", answer: "180 cm is 5 feet 10.9 inches, usually rounded to 5′11″." },
      { question: "What is 5 feet 7 inches in cm?", answer: "5 feet 7 inches is 170.18 cm (67 inches × 2.54)." },
      { question: "What is 6 feet in cm?", answer: "6 feet is exactly 182.88 cm (72 inches × 2.54)." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "grade-calculator",
    englishPath: "/en/grade-calculator",
    turkishPath: "/harf-notu-hesaplama",
    title: "Grade Calculator: Weighted & Final Exam Grade",
    description:
      "Calculate your weighted class grade and letter grade, and find the score you need on the final exam to reach your target grade.",
    intro:
      "Add your assignments, quizzes and exams with their grades and weights to see your current class grade and letter grade. Then find out what you need on the final exam.",
    component: "gradeCalculator",
    iconName: "gradeCalculator",
    cardDescription: "Weighted class grade, letter grade and final exam score needed.",
    articleSections: [
      {
        title: "How a weighted grade is calculated",
        body: "Each grade is multiplied by its weight, the results are added together and the sum is divided by the total weight. For example, homework 92% (20%), quizzes 85% (20%) and a midterm 78% (30%) give (92×20 + 85×20 + 78×30) ÷ 70 = 84%, a B.",
      },
      {
        title: "How the final exam calculator works",
        body: "If the final exam counts for w% of the course, the score you need is (target − current × (1 − w)) ÷ w. With a current grade of 84%, a 30% final and a 90% target, you would need 104% – so an A− would need extra credit, but a B+ (87%) would need 94%.",
      },
      {
        title: "Letter grade scales differ",
        body: "The table uses a common US scale (A = 93–96, A− = 90–92 and so on). Many schools use their own cut-offs or a plain 90/80/70/60 scale, so always check your syllabus.",
      },
    ],
    faq: [
      { question: "Do the weights have to add up to 100%?", answer: "No. The calculator divides by the total weight you have entered, so you can see your current grade before all work is graded." },
      { question: "What grade do I need on my final?", answer: "Enter your current grades, your target grade and the weight of the final exam; the calculator shows the minimum final exam score needed." },
      { question: "What percentage is a B+?", answer: "On a common US scale a B+ is 87–89%. Your school may use different cut-offs." },
      { question: "How do I calculate my grade without weights?", answer: "Give every assignment the same weight (for example 1); the calculator then returns a simple average." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "calorie-calculator",
    englishPath: "/en/calorie-calculator",
    turkishPath: "/bmi-hesaplama",
    title: "Calorie Calculator: TDEE & Weight Loss",
    description:
      "Estimate your daily calorie needs (TDEE) and BMR with the Mifflin-St Jeor equation, plus calorie targets to lose, maintain or gain weight.",
    intro:
      "Enter your age, sex, height, weight and activity level to estimate how many calories you burn per day and how many to eat to lose, maintain or gain weight. US and metric units are supported.",
    component: "calorieCalculator",
    iconName: "calorieCalculator",
    cardDescription: "Daily calories (TDEE), BMR and targets to lose or gain weight.",
    articleSections: [
      {
        title: "BMR and TDEE",
        body: "Basal metabolic rate (BMR) is the energy your body uses at complete rest. Total daily energy expenditure (TDEE) is BMR multiplied by an activity factor from 1.2 (sedentary) to 1.9 (very active). Eating at your TDEE keeps your weight roughly stable.",
      },
      {
        title: "The Mifflin-St Jeor equation",
        body: "BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5 for men, or − 161 for women. Studies have found it to be the most accurate of the common equations for most adults, typically within about 10% of measured values.",
      },
      {
        title: "Calories for weight loss",
        body: "A deficit of about 500 kcal per day leads to roughly 1 lb (0.45 kg) of weight loss per week, although real progress varies. The calculator does not suggest targets below 1,200 kcal (women) or 1,500 kcal (men) per day without medical supervision.",
      },
    ],
    faq: [
      { question: "How many calories should I eat to lose weight?", answer: "Roughly 500 kcal below your TDEE per day for about 1 lb (0.45 kg) of loss per week. The calculator shows this and other goals." },
      { question: "What is the difference between BMR and TDEE?", answer: "BMR is what your body burns at rest; TDEE adds the energy used in daily activity and exercise." },
      { question: "Which activity level should I choose?", answer: "Pick sedentary for a desk job with little exercise, moderate for exercise 3–5 days a week and active for 6–7 days. Most people overestimate their activity, so choose the lower level if unsure." },
      { question: "How accurate is a calorie calculator?", answer: "It is an estimate. Track your weight for 2–3 weeks and adjust your intake by 100–200 kcal if the trend differs from your goal." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "body-fat-calculator",
    englishPath: "/en/body-fat-calculator",
    turkishPath: "/vucut-yag-orani-hesaplama",
    title: "Body Fat Calculator (US Navy Method)",
    description:
      "Estimate your body fat percentage from height, neck, waist and hip measurements with the US Navy tape method, plus fat and lean mass.",
    intro:
      "Measure your neck, waist (and hips for women) with a tape measure and enter them with your height to estimate your body fat percentage. US and metric units are supported.",
    component: "bodyFatCalculator",
    iconName: "bodyFatCalculator",
    cardDescription: "Body fat percentage from tape measurements (US Navy method).",
    articleSections: [
      {
        title: "How the US Navy method works",
        body: "The US Navy formula estimates body fat from circumference measurements and height using logarithms. It was developed for military fitness standards because it needs only a tape measure, and it is usually within a few percentage points of more expensive methods such as DEXA scans.",
      },
      {
        title: "How to measure correctly",
        body: "Measure in the morning before eating. Men measure the waist horizontally at the navel; women at the narrowest point. Measure the neck just below the larynx and, for women, the hips at the widest point. Take each measurement twice and use the average.",
      },
      {
        title: "Healthy body fat ranges",
        body: "According to the American Council on Exercise, 14–24% is typical for fit to average men and 21–31% for women. Essential fat alone is about 2–5% for men and 10–13% for women, so very low values are not a healthy target.",
      },
    ],
    faq: [
      { question: "What is a healthy body fat percentage?", answer: "Roughly 14–24% for men and 21–31% for women fall in the fitness and average ranges of the American Council on Exercise." },
      { question: "How accurate is the US Navy body fat calculator?", answer: "It is typically within about 3–4 percentage points of DEXA results; accuracy depends a lot on measuring correctly." },
      { question: "Why do women also need a hip measurement?", answer: "The female version of the formula uses waist + hip − neck because women store more fat around the hips." },
      { question: "How do I calculate fat mass?", answer: "Multiply your weight by the body fat percentage. Enter your weight in the optional field to see fat mass and lean mass." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "ideal-weight-calculator",
    englishPath: "/en/ideal-weight-calculator",
    turkishPath: "/ideal-kilo-hesaplama",
    title: "Ideal Weight Calculator",
    description:
      "Find your ideal body weight for your height with the Robinson, Miller, Devine and Hamwi formulas and the healthy BMI weight range.",
    intro:
      "Enter your height and sex to compare four ideal body weight formulas and see the healthy weight range for your height based on BMI.",
    component: "idealWeightCalculator",
    iconName: "idealWeightCalculator",
    cardDescription: "Ideal weight by four formulas and the healthy BMI range.",
    articleSections: [
      {
        title: "Ideal weight formulas",
        body: "Devine (1974), Robinson (1983), Miller (1983) and Hamwi (1964) all start from a base weight at 5 feet and add a fixed amount for each inch above it. For example, Devine gives 50 kg + 2.3 kg per inch for men and 45.5 kg + 2.3 kg per inch for women.",
      },
      {
        title: "Healthy weight range by BMI",
        body: "A body mass index between 18.5 and 24.9 is considered a healthy weight for adults. For a height of 5 ft 6 in (168 cm) that is about 115–154 lb (52–70 kg). The range is often more useful than a single ideal number.",
      },
      {
        title: "Limitations",
        body: "These formulas were created to estimate medication doses, not to set weight goals. They ignore muscle mass, frame size, age and ethnicity, so athletes and older adults may be healthy outside the results.",
      },
    ],
    faq: [
      { question: "What is the ideal weight for a 5'6\" woman?", answer: "About 129–135 lb (59–61 kg) by the four common formulas; the healthy BMI range at that height is about 115–154 lb." },
      { question: "What is the ideal weight for a 6' man?", answer: "About 161–177 lb (73–80 kg) by the four common formulas; the healthy BMI range at that height is about 136–184 lb." },
      { question: "Which ideal weight formula is best?", answer: "None is clearly best. Devine is the most used in medicine; comparing all four with the BMI range gives a more balanced view." },
      { question: "Does ideal weight depend on age?", answer: "The formulas do not include age. Some research suggests slightly higher BMI values may be healthy for older adults." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "mpg-to-l-100km",
    englishPath: "/en/mpg-to-l-100km",
    turkishPath: "/yakit-tuketimi-hesaplama",
    title: "MPG to L/100 km Converter (US & UK)",
    description:
      "Convert fuel economy between miles per gallon (US and UK), liters per 100 km and km per liter, with a quick reference table.",
    intro:
      "Enter a fuel economy value in mpg (US or UK), L/100 km or km/L to convert it to the other units instantly. The table below lists common mpg values in L/100 km.",
    component: "fuelEconomyConverter",
    iconName: "fuelConsumptionCalculator",
    cardDescription: "Converts mpg (US/UK), L/100 km and km/L.",
    articleSections: [
      {
        title: "Why mpg and L/100 km are inverse",
        body: "Miles per gallon measures distance per unit of fuel, while liters per 100 km measures fuel per unit of distance. That is why a higher mpg is better but a lower L/100 km is better, and why the conversion is a division: L/100 km = 235.215 ÷ mpg (US).",
      },
      {
        title: "US and UK gallons are different",
        body: "A US gallon is 3.785 liters and an imperial (UK) gallon is 4.546 liters. The same car therefore shows about 20% more mpg in the UK than in the US: 30 mpg (US) is 36 mpg (UK). Always check which gallon a figure uses.",
      },
      {
        title: "Formulas",
        body: "L/100 km = 235.215 ÷ mpg (US) = 282.481 ÷ mpg (UK). km/L = 100 ÷ L/100 km. mpg (US) = 2.352 × km/L.",
      },
    ],
    faq: [
      { question: "How do you convert mpg to L/100 km?", answer: "Divide 235.215 by the US mpg value, or 282.481 by the UK mpg value. For example, 30 mpg (US) = 7.84 L/100 km." },
      { question: "What is 40 mpg in L/100 km?", answer: "40 mpg (US) is 5.88 L/100 km; 40 mpg (UK) is 7.06 L/100 km." },
      { question: "What is 8 L/100 km in mpg?", answer: "8 L/100 km is 29.4 mpg (US) or 35.3 mpg (UK)." },
      { question: "Is a higher L/100 km better?", answer: "No. L/100 km is fuel used per distance, so a lower number means better fuel economy." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "square-footage-calculator",
    englishPath: "/en/square-footage-calculator",
    turkishPath: "/fayans-hesaplama",
    title: "Square Footage Calculator",
    description:
      "Calculate square feet for rooms, floors and yards – rectangles, triangles, circles and L-shaped spaces – with waste allowance and cost.",
    intro:
      "Enter the length and width of each part of the space in feet and inches. Add as many areas as you need for L-shaped or irregular rooms, then add a waste allowance and price per square foot.",
    component: "squareFootageCalculator",
    iconName: "area",
    cardDescription: "Square feet for rooms and yards, with waste and cost.",
    articleSections: [
      {
        title: "How to calculate square footage",
        body: "Multiply the length by the width in feet. A 12 ft × 15 ft room is 180 sq ft. If a measurement has inches, convert them to feet first: 12 ft 6 in = 12.5 ft. For a triangle use base × height ÷ 2, and for a circle π × (diameter ÷ 2)².",
      },
      {
        title: "L-shaped and irregular rooms",
        body: "Split the room into rectangles that do not overlap, calculate each one and add them up. For example, an L-shaped room of 12 × 15 ft plus 6 × 8 ft is 180 + 48 = 228 sq ft.",
      },
      {
        title: "Why add a waste allowance",
        body: "Flooring, tile and sod are cut at walls and corners. Contractors usually add 5–10% for straight layouts and 15% or more for diagonal patterns or many corners.",
      },
    ],
    faq: [
      { question: "How do I calculate square feet?", answer: "Multiply length by width in feet. For example, 10 ft × 12 ft = 120 sq ft." },
      { question: "How many square feet is a 12x12 room?", answer: "A 12 ft × 12 ft room is 144 square feet." },
      { question: "How do I convert square feet to square meters?", answer: "Divide by 10.764. For example, 200 sq ft is 18.58 m²." },
      { question: "How many square feet are in an acre?", answer: "One acre is 43,560 square feet." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "cubic-yard-calculator",
    englishPath: "/en/cubic-yard-calculator",
    turkishPath: "/hafriyat-hesaplama",
    title: "Cubic Yard Calculator",
    description:
      "Calculate cubic yards from length, width and depth for dirt, gravel, topsoil, mulch or fill – for rectangular and round areas, with cost.",
    intro:
      "Enter the length and width in feet and the depth in inches to find how many cubic yards of material to order. Round areas and an optional price per cubic yard are supported.",
    component: "cubicYardCalculator",
    iconName: "volume",
    cardDescription: "Cubic yards from length, width and depth, with cost.",
    articleSections: [
      {
        title: "How to calculate cubic yards",
        body: "Multiply length (ft) × width (ft) × depth (ft) to get cubic feet, then divide by 27, because a cubic yard is 3 ft × 3 ft × 3 ft = 27 cu ft. Depth is usually measured in inches, so divide it by 12 first: a 10 × 10 ft area 4 in deep is 10 × 10 × 0.333 ÷ 27 = 1.23 cu yd.",
      },
      {
        title: "Ordering bulk material",
        body: "Landscape suppliers usually sell in whole, half or quarter yards. Round up and add about 5–10% for settling and uneven ground.",
      },
    ],
    faq: [
      { question: "How many cubic feet are in a cubic yard?", answer: "27 cubic feet (3 ft × 3 ft × 3 ft)." },
      { question: "How do I convert cubic yards to cubic meters?", answer: "Multiply by 0.7646. One cubic yard is about 0.76 m³." },
      { question: "How many square feet does a cubic yard cover?", answer: "324 sq ft at 1 inch deep, 162 sq ft at 2 inches, 108 sq ft at 3 inches and 81 sq ft at 4 inches." },
      { question: "How much does a cubic yard of dirt weigh?", answer: "Roughly 1 to 1.5 tons depending on moisture. Use the gravel and soil calculator to convert volume to weight." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "mulch-calculator",
    englishPath: "/en/mulch-calculator",
    turkishPath: "/gubre-ihtiyaci-hesaplama",
    title: "Mulch Calculator: Cubic Yards & Bags",
    description:
      "Find how much mulch you need in cubic yards and bags (1.5, 2 and 3 cu ft) for a garden bed, from its size and mulch depth.",
    intro:
      "Enter the size of the bed and the depth of mulch you want to see how many cubic yards to order in bulk, or how many bags to buy.",
    component: "mulchCalculator",
    iconName: "peyzajHub",
    cardDescription: "Mulch in cubic yards and bags for a garden bed.",
    articleSections: [
      {
        title: "The mulch formula",
        body: "Cubic yards = square feet × depth (in) ÷ 324. One cubic yard covers 324 sq ft at 1 inch, 162 sq ft at 2 inches or 108 sq ft at 3 inches. For bags, divide the cubic feet by the bag size: a 200 sq ft bed at 3 inches needs 50 cu ft, or 25 bags of 2 cu ft.",
      },
      {
        title: "How deep should mulch be?",
        body: "2–3 inches is right for most flower beds. Thinner layers do not stop weeds well, and more than 4 inches can keep roots too wet. Keep mulch a few inches away from tree trunks and plant stems.",
      },
      {
        title: "Bulk or bags?",
        body: "Bags are convenient for small beds. Above about 2–3 cubic yards bulk delivery is usually cheaper, even with a delivery fee. Prices vary a lot by region and material, so enter your local price to compare.",
      },
    ],
    faq: [
      { question: "How much area does a yard of mulch cover?", answer: "About 324 sq ft at 1 inch deep, 162 sq ft at 2 inches and 108 sq ft at 3 inches." },
      { question: "How many bags of mulch are in a yard?", answer: "A cubic yard is 27 cu ft: about 13.5 bags of 2 cu ft or 9 bags of 3 cu ft." },
      { question: "How much mulch do I need for a 10x10 bed?", answer: "A 10 × 10 ft bed (100 sq ft) at 3 inches needs 25 cu ft, about 0.93 cubic yards or 13 bags of 2 cu ft." },
      { question: "How deep should mulch be?", answer: "Usually 2–3 inches for garden beds and 3–4 inches for paths and around trees." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "board-foot-calculator",
    englishPath: "/en/board-foot-calculator",
    turkishPath: "/kereste-hesaplama",
    title: "Board Foot Calculator for Lumber",
    description:
      "Calculate board feet of lumber from thickness, width, length and quantity, with total volume and cost per board foot.",
    intro:
      "Enter the thickness and width in inches, the length in feet and the number of boards. Add several sizes to total a whole lumber order and estimate its cost.",
    component: "boardFootCalculator",
    iconName: "marangozHub",
    cardDescription: "Board feet and cost for a lumber order.",
    articleSections: [
      {
        title: "What is a board foot?",
        body: "A board foot is a volume of wood 1 inch thick, 12 inches wide and 12 inches long – 144 cubic inches. Hardwood lumber is usually priced per board foot, while construction lumber is often sold per piece.",
      },
      {
        title: "The board foot formula",
        body: "Board feet = thickness (in) × width (in) × length (ft) ÷ 12. A 2 × 4 that is 8 ft long is 2 × 4 × 8 ÷ 12 = 5.33 board feet. Multiply by the number of boards for the total.",
      },
      {
        title: "Nominal vs actual size",
        body: "Board feet are normally calculated with nominal dimensions (2 × 4), not the smaller actual dimensions after planing (1.5 × 3.5 in). Rough hardwood thickness is given in quarters: 4/4 is 1 inch and 8/4 is 2 inches.",
      },
    ],
    faq: [
      { question: "How many board feet are in a 2x4x8?", answer: "5.33 board feet (2 × 4 × 8 ÷ 12)." },
      { question: "How many board feet are in a 2x6x10?", answer: "10 board feet (2 × 6 × 10 ÷ 12)." },
      { question: "How do I calculate board feet?", answer: "Multiply thickness (in) by width (in) by length (ft) and divide by 12." },
      { question: "How many cubic feet is a board foot?", answer: "One board foot is 1/12 of a cubic foot (144 cubic inches), or about 0.00236 m³." },
    ],
    isEnglishOnly: true,
    priority: 0.8,
  },
  {
    slug: "color-converter",
    englishPath: "/en/color-converter",
    turkishPath: "/renk-kodu-cevirici",
    title: "Color Converter: HEX to RGB and HSL",
    description: "Convert color codes between HEX, RGB and HSL instantly, with a live color preview. Type in any field to update the others.",
    intro: "Type a HEX code, an RGB value or an HSL value – the other two formats and the color preview update as you type.",
    component: "colorConverter",
    iconName: "colorCodeCalculator",
    cardDescription: "Converts HEX, RGB and HSL color codes with a preview.",
    articleSections: [
      { title: "HEX, RGB and HSL", body: "HEX writes the red, green and blue channels as three two-digit hexadecimal numbers (#FF5733). RGB gives the same channels as numbers from 0 to 255 (255, 87, 51). HSL describes the color as hue (0–360°), saturation and lightness (%), which is easier for making lighter or darker shades." },
      { title: "How to convert HEX to RGB", body: "Split the six digits into pairs and convert each pair from base 16 to base 10: FF = 255, 57 = 87, 33 = 51. Three-digit shorthand codes double each digit, so #F53 is #FF5533." },
    ],
    faq: [
      { question: "What is #FF5733 in RGB?", answer: "#FF5733 is rgb(255, 87, 51), or hsl(11, 100%, 60%)." },
      { question: "What is white and black in HEX?", answer: "White is #FFFFFF (255, 255, 255) and black is #000000 (0, 0, 0)." },
      { question: "Is HEX the same as RGB?", answer: "Yes, both describe the same red, green and blue values; HEX writes them in base 16 and RGB in base 10." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "unix-timestamp-converter",
    englishPath: "/en/unix-timestamp-converter",
    turkishPath: "/unix-zaman-damgasi-cevirici",
    title: "Unix Timestamp Converter (Epoch Time)",
    description: "Convert Unix timestamps (epoch time) in seconds or milliseconds to a readable date in your time zone and UTC, and dates back to timestamps.",
    intro: "Paste a Unix timestamp to see the date in your local time zone, UTC and ISO 8601 – or pick a date to get its timestamp. Seconds and milliseconds are detected automatically.",
    component: "unixTimestampConverter",
    iconName: "unixTimestampCalculator",
    cardDescription: "Epoch time to date and date to Unix timestamp.",
    articleSections: [
      { title: "What is a Unix timestamp?", body: "A Unix timestamp is the number of seconds since 00:00:00 UTC on January 1, 1970 (the Unix epoch), not counting leap seconds. It is the same everywhere in the world, which makes it ideal for storing times in databases and APIs." },
      { title: "Seconds or milliseconds?", body: "Most systems use seconds (10 digits today), while JavaScript and many APIs use milliseconds (13 digits). The converter treats values of 12 or more digits as milliseconds." },
      { title: "The year 2038 problem", body: "Systems that store the timestamp as a signed 32-bit integer overflow after 2,147,483,647, which is 03:14:07 UTC on January 19, 2038. Modern systems use 64-bit values." },
    ],
    faq: [
      { question: "What date is Unix timestamp 1700000000?", answer: "1700000000 is November 14, 2023 at 22:13:20 UTC." },
      { question: "How do I get the current Unix timestamp?", answer: "The current value is shown on this page. In code: Math.floor(Date.now() / 1000) in JavaScript or time.time() in Python." },
      { question: "Is a Unix timestamp in UTC?", answer: "Yes. A timestamp is the same moment everywhere; only its display changes with the time zone." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "pool-volume-calculator",
    englishPath: "/en/pool-volume-calculator",
    turkishPath: "/havuz-hacmi-hesaplama",
    title: "Pool Volume Calculator (Gallons)",
    description: "Calculate how many gallons of water your pool holds – rectangular, round or oval, with a shallow and deep end.",
    intro: "Enter the pool's size in feet and its shallow and deep end depths to see how many US gallons it holds. You need this number to dose chemicals and size pumps and heaters.",
    component: "poolVolumeCalculator",
    iconName: "poolVolumeCalculator",
    cardDescription: "Pool gallons for rectangular, round and oval pools.",
    articleSections: [
      { title: "Pool volume formulas", body: "Rectangle: length × width × average depth × 7.48. Round: 3.14 × radius² × depth × 7.48. Oval: 3.14 × (length ÷ 2) × (width ÷ 2) × depth × 7.48. The factor 7.48 is the number of US gallons in one cubic foot." },
      { title: "Average depth", body: "For a pool with a sloped floor, add the shallow and deep end depths and divide by 2. A pool 3.5 ft to 8 ft deep has an average depth of 5.75 ft. Measure to the water line, not the top of the wall." },
    ],
    faq: [
      { question: "How many gallons is a 16x32 pool?", answer: "A 16 × 32 ft pool with an average depth of 5.5 ft holds about 21,065 US gallons." },
      { question: "How many gallons is a 24 ft round pool?", answer: "A 24 ft round pool with 4 ft of water holds about 13,536 gallons." },
      { question: "How many gallons are in a cubic foot?", answer: "7.48 US gallons." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "pool-chlorine-calculator",
    englishPath: "/en/pool-chlorine-calculator",
    turkishPath: "/klor-dozaji-hesaplama",
    title: "Pool Chlorine Calculator",
    description: "Calculate how much liquid chlorine, bleach, cal-hypo, dichlor or trichlor to add to raise your pool's free chlorine to the target ppm.",
    intro: "Enter the pool volume in gallons, the current and target free chlorine in ppm and the product you use to see how much to add.",
    component: "poolChlorineCalculator",
    iconName: "chlorineDoseCalculator",
    cardDescription: "How much chlorine to add to reach a target ppm.",
    articleSections: [
      { title: "How the dose is calculated", body: "1 ppm is 1 mg per liter. The chlorine needed is the ppm increase × the pool volume in liters. That amount is divided by the product strength: 12.5% liquid chlorine contains about 12.5 g of available chlorine per 100 mL, and 65% cal-hypo contains 65 g per 100 g." },
      { title: "Typical free chlorine levels", body: "Many pool guides recommend 1–3 ppm of free chlorine for residential pools, higher when using cyanuric acid (stabilizer). Shocking raises it much higher temporarily. Test the water before and after adding chemicals." },
    ],
    faq: [
      { question: "How much liquid chlorine to raise 1 ppm in 10,000 gallons?", answer: "About 10.2 fl oz of 12.5% liquid chlorine or 12.8 fl oz of 10% liquid chlorine." },
      { question: "How much cal-hypo to raise chlorine 1 ppm?", answer: "About 2 oz of 65% cal-hypo per 10,000 gallons." },
      { question: "Can I use household bleach?", answer: "Yes, if it is plain unscented bleach. It is weaker (about 6%), so you need roughly twice as much as 12.5% liquid chlorine." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "standard-drink-calculator",
    englishPath: "/en/standard-drink-calculator",
    turkishPath: "/abv-standart-icki-hesaplama",
    title: "Standard Drink Calculator (US, UK Units)",
    description: "Calculate how many standard drinks or alcohol units are in a beer, wine or spirit from its size and ABV – US, UK and Australian definitions.",
    intro: "Enter the serving size and ABV printed on the label to see the grams of pure alcohol, US standard drinks, UK units and Australian standard drinks.",
    component: "standardDrinkCalculator",
    iconName: "abvCalculator",
    cardDescription: "Standard drinks and UK units from volume and ABV.",
    articleSections: [
      { title: "What is a standard drink?", body: "In the US a standard drink contains 14 g (0.6 fl oz) of pure alcohol – about 12 fl oz of 5% beer, 5 fl oz of 12% wine or 1.5 fl oz of 40% spirits. A UK unit is 10 mL (8 g) of alcohol and an Australian standard drink is 10 g." },
      { title: "The formula", body: "Pure alcohol (g) = volume (mL) × ABV ÷ 100 × 0.789, the density of ethanol. Divide by 14 for US standard drinks. UK units = volume (mL) × ABV ÷ 1,000." },
    ],
    faq: [
      { question: "How many standard drinks are in a bottle of wine?", answer: "A 750 mL bottle of 13% wine has about 77 g of alcohol: 5.5 US standard drinks or 9.75 UK units." },
      { question: "How many standard drinks is a 16 oz IPA?", answer: "A 16 fl oz can of 7% IPA is about 1.9 US standard drinks." },
      { question: "How many units are in a pint of beer?", answer: "A UK pint (568 mL) of 4% beer is 2.3 units; at 5% it is 2.8 units." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "awg-to-mm2-converter",
    englishPath: "/en/awg-to-mm2-converter",
    turkishPath: "/awg-mm2-cevirici",
    title: "AWG to mm² Wire Gauge Converter",
    description: "Convert American Wire Gauge (AWG) sizes to mm² and diameter in mm and inches, or find the AWG size for a metric wire, with a size chart.",
    intro: "Enter an AWG size (for example 12 or 4/0) to see its cross-section in mm² and its diameter, or enter mm² to find the equivalent gauge.",
    component: "awgConverter",
    iconName: "awgConverter",
    cardDescription: "AWG wire sizes to mm², diameter and back.",
    articleSections: [
      { title: "How AWG works", body: "AWG is defined by a formula: diameter (in) = 0.005 × 92^((36 − n) ÷ 39). A smaller number means a thicker wire, and every 3 gauges roughly halve or double the cross-section. Sizes thicker than 0 AWG are written 1/0 to 4/0." },
      { title: "Metric and AWG sizes are not identical", body: "Metric cables come in standard sizes such as 1.5, 2.5 and 4 mm², which fall between AWG sizes. When replacing a wire, choose the size that is not smaller than the required cross-section." },
    ],
    faq: [
      { question: "What is 12 AWG in mm²?", answer: "12 AWG is 3.31 mm², with a diameter of 2.05 mm (0.081 in)." },
      { question: "What AWG is 2.5 mm²?", answer: "2.5 mm² is about 13.2 AWG. Its closest common building-wire size that is not smaller is 12 AWG." },
      { question: "What is 14 AWG and 10 AWG in mm²?", answer: "14 AWG is 2.08 mm² and 10 AWG is 5.26 mm²." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "psu-calculator",
    englishPath: "/en/psu-calculator",
    turkishPath: "/psu-guc-hesaplama",
    title: "PSU Calculator: Power Supply Wattage",
    description: "Estimate the power supply wattage your PC build needs from the CPU, graphics card and other components, with headroom and a suggested PSU size.",
    intro: "Enter the power of your CPU, graphics card and other parts to estimate the total load and the power supply size to buy.",
    component: "psuCalculator",
    iconName: "psuCalculator",
    cardDescription: "PC power supply wattage with headroom.",
    articleSections: [
      { title: "How much headroom?", body: "Add 20–30% above the estimated load. It covers short power spikes from modern graphics cards, keeps the PSU in its efficient range (usually around 50% load) and leaves room for upgrades." },
      { title: "Use the right numbers", body: "For the graphics card use the total board power (TBP) from the manufacturer, not the chip's TDP. Many CPUs can exceed their TDP under boost, so check the maximum package power for high-end models." },
    ],
    faq: [
      { question: "What PSU do I need for a 285 W GPU?", answer: "With a 125 W CPU and 75 W for other parts the load is about 485 W; with 30% headroom a 650 W PSU is a good fit." },
      { question: "Is a bigger PSU wasteful?", answer: "Not much. A good PSU is efficient across a wide range, but buying far more than you need mainly costs more money." },
      { question: "What does 80 Plus mean?", answer: "It is an efficiency rating. Higher levels (Gold, Platinum) waste less power as heat but do not change how many watts the PSU can deliver." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "iv-drip-rate-calculator",
    englishPath: "/en/iv-drip-rate-calculator",
    turkishPath: "/iv-damla-hizi-hesaplama",
    title: "IV Drip Rate Calculator (gtt/min)",
    description: "Calculate the IV drip rate in drops per minute (gtt/min) and the flow rate in mL/hr from volume, time and the tubing drop factor.",
    intro: "Enter the volume to infuse, the infusion time and the drop factor printed on the IV tubing to get the drip rate in gtt/min and the equivalent pump rate in mL/hr.",
    component: "ivDripRateCalculator",
    iconName: "ivDripRateCalculator",
    cardDescription: "Drops per minute and mL/hr for IV infusions.",
    articleSections: [
      { title: "The drip rate formula", body: "gtt/min = volume (mL) × drop factor (gtt/mL) ÷ time (min). For 1,000 mL over 8 hours with 15 gtt/mL tubing: 1,000 × 15 ÷ 480 = 31.25, so about 31 drops per minute. The flow rate is 1,000 ÷ 8 = 125 mL/hr." },
      { title: "Macrodrip and microdrip", body: "Macrodrip sets deliver 10, 15 or 20 drops per mL and are used for routine adult infusions. Microdrip sets deliver 60 drops per mL, so the drip rate equals the mL/hr rate – useful for small, precise volumes." },
    ],
    faq: [
      { question: "What is the drip rate for 1000 mL over 8 hours?", answer: "With 15 gtt/mL tubing it is about 31 gtt/min (125 mL/hr)." },
      { question: "How do I calculate mL per hour?", answer: "Divide the volume in mL by the time in hours. 500 mL over 4 hours is 125 mL/hr." },
      { question: "Why does a microdrip set give the same number as mL/hr?", answer: "Because 60 drops per mL and 60 minutes per hour cancel out." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
  {
    slug: "depreciation-calculator",
    englishPath: "/en/depreciation-calculator",
    turkishPath: "/amortisman-hesaplama",
    title: "Depreciation Calculator",
    description: "Calculate asset depreciation with straight-line, double-declining balance or sum-of-the-years' digits methods, with a year-by-year schedule.",
    intro: "Enter the asset cost, salvage value and useful life, then choose a method to see yearly depreciation, accumulated depreciation and book value.",
    component: "depreciationCalculator",
    iconName: "amortismanCalculator",
    cardDescription: "Straight-line and accelerated depreciation schedules.",
    articleSections: [
      { title: "Straight-line depreciation", body: "(Cost − salvage value) ÷ useful life. A $30,000 asset with a $5,000 salvage value and a 5-year life depreciates $5,000 per year." },
      { title: "Accelerated methods", body: "Double-declining balance applies twice the straight-line rate (2 ÷ life) to the remaining book value – 40% a year for a 5-year asset – and never goes below salvage value. Sum-of-the-years' digits multiplies the depreciable amount by a falling fraction: 5/15, 4/15, 3/15 and so on." },
    ],
    faq: [
      { question: "How do you calculate straight-line depreciation?", answer: "Subtract the salvage value from the cost and divide by the useful life in years." },
      { question: "What is double-declining balance?", answer: "An accelerated method that depreciates 2 ÷ life of the remaining book value each year, so more is expensed in the early years." },
      { question: "Is this the same as MACRS?", answer: "No. MACRS is the US tax system with IRS tables and conventions; these calculations are for book accounting." },
    ],
    isEnglishOnly: true,
    priority: 0.7,
  },
];

export function findEnglishStandaloneToolBySlug(slug: string) {
  return englishStandaloneTools.find((tool) => tool.slug === slug);
}

export function findEnglishStandaloneToolByTurkishPath(turkishPath: string) {
  return englishStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
