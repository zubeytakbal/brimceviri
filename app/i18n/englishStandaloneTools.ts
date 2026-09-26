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
  | "fuelEconomyConverter";

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
    | "idealWeightCalculator";
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
      "Calculate how much paint you need from room dimensions, the number of doors and windows, and the number of coats.",
    intro:
      "Enter the room's length, width and height to get the paintable area and the approximate liters of paint needed instantly.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription: "Calculates wall and ceiling area and the expected amount of paint.",
    articleSections: [
      {
        title: "What does this tool calculate?",
        body: "The calculator subtracts the area of doors and windows from the wall area, then multiplies the result by the number of coats you plan to apply.",
      },
      {
        title: "When is it useful?",
        body: "Before buying paint, this page helps you estimate the quantity more quickly and avoid buying too little or too much.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "tile-calculator",
    englishPath: "/en/tile-calculator",
    turkishPath: "/fayans-hesaplama",
    title: "Tile Calculator",
    description:
      "Calculate the number of tiles needed, including a waste allowance, based on the area and tile dimensions.",
    intro:
      "Enter the installation area, tile dimensions and waste percentage to get an approximate number of tiles to buy.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription: "Calculates the right amount of tile, accounting for waste.",
    articleSections: [
      {
        title: "Why include a waste percentage?",
        body: "Cutting tiles around corners and edges usually wastes some material, so it's best to include a realistic waste margin in the calculation.",
      },
      {
        title: "How do you use the result?",
        body: "You can compare the resulting count against the pieces per box at your supplier to see approximately how many boxes you need.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "brick-calculator",
    englishPath: "/en/brick-calculator",
    turkishPath: "/tugla-hesaplama",
    title: "Brick Calculator",
    description:
      "Calculate the number of bricks needed, including mortar joint thickness and a waste allowance, for a given wall area.",
    intro:
      "This tool is suited for a quick initial estimate before buying materials or comparing supplier quotes.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription: "Calculates the approximate brick requirement, including joints and waste.",
    articleSections: [
      {
        title: "What affects the final count?",
        body: "Brick dimensions, mortar joint thickness between bricks, and the safety margin you choose all noticeably change the required quantity.",
      },
      {
        title: "Is the result final?",
        body: "The result is suitable for initial planning, but actual construction may vary depending on building method, site conditions and wall type.",
      },
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
      "Quickly calculate the net amount, the tax and the total in both directions.",
    intro:
      "Choose the calculation direction and the tax rate to clearly see the pre-tax price or the total price.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription: "Calculates the price before and after tax, and the tax amount itself.",
    articleSections: [
      {
        title: "When is it useful?",
        body: "It's handy for quotes, invoices and everyday prices whenever you want to quickly separate the base amount from the tax amount.",
      },
      {
        title: "What's the difference between net and gross?",
        body: "The net amount is the price before tax; the gross amount is the final price after tax is added.",
      },
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
      "Calculate the number of laminate flooring packages needed, including a waste allowance, from the area to be covered.",
    intro:
      "Enter the floor area, the area covered by one package and your waste percentage to get the number of packages to buy.",
    component: "laminateCalculator",
    iconName: "laminateCalculator",
    cardDescription: "Calculates the laminate flooring packages needed, including waste.",
    articleSections: [
      {
        title: "Why include a waste allowance?",
        body: "Cutting boards to fit along walls and around corners wastes some material, so a realistic waste margin avoids running short mid-installation.",
      },
      {
        title: "How do you use the result?",
        body: "Compare the total area needed against the coverage per package listed by your supplier to know exactly how many packages to buy.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "wallpaper-calculator",
    englishPath: "/en/wallpaper-calculator",
    turkishPath: "/duvar-kagidi-hesaplama",
    title: "Wallpaper Calculator",
    description:
      "Calculate the number of wallpaper rolls needed from room dimensions and roll size, including a waste allowance.",
    intro:
      "Enter your wall widths, ceiling height and roll dimensions to get the number of rolls to buy.",
    component: "wallpaperCalculator",
    iconName: "wallpaperCalculator",
    cardDescription: "Calculates the wallpaper rolls needed for a room, including waste.",
    articleSections: [
      {
        title: "What does this tool calculate?",
        body: "It adds up your wall areas, divides by the usable area of a single roll, and adds your chosen waste percentage for pattern matching and trimming.",
      },
      {
        title: "Why does pattern matching matter?",
        body: "Wallpapers with a repeating pattern usually need a higher waste allowance than plain wallpaper, since each strip has to align with the next.",
      },
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
];

export function findEnglishStandaloneToolBySlug(slug: string) {
  return englishStandaloneTools.find((tool) => tool.slug === slug);
}

export function findEnglishStandaloneToolByTurkishPath(turkishPath: string) {
  return englishStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
