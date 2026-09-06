export type EnglishStandaloneToolComponentKey =
  | "paintCalculator"
  | "tileCalculator"
  | "brickCalculator"
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
  | "laminateCalculator"
  | "wallpaperCalculator"
  | "movingBoxCalculator"
  | "naturalGasCalculator"
  | "evChargingCalculator";

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
    | "laminateCalculator"
    | "wallpaperCalculator"
    | "movingBoxCalculator"
    | "naturalGasCalculator"
    | "evChargingCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
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
];

export function findEnglishStandaloneToolBySlug(slug: string) {
  return englishStandaloneTools.find((tool) => tool.slug === slug);
}

export function findEnglishStandaloneToolByTurkishPath(turkishPath: string) {
  return englishStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
