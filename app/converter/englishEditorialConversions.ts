export type EnglishEditorialConversion = {
  slug: string;
  title: string;
  paragraphs: readonly string[];
  note?: string;
  related: readonly {
    href: string;
    label: string;
  }[];
};

/**
 * Hand-written context for the first English search-focused conversion set.
 *
 * These pages attract queries where the measurement system matters. The
 * calculator and table answer the numerical question; this copy explains the
 * distinction that a generic conversion template cannot safely infer.
 */
export const englishEditorialConversions: readonly EnglishEditorialConversion[] = [
  {
    slug: "meters-to-kilometers",
    title: "Meters and kilometers in the metric system",
    paragraphs: [
      "One kilometer is exactly 1,000 meters. Meters are practical for room dimensions, building work and short distances, while kilometers are more useful for road distances, routes and larger geographic measurements.",
      "Because metric length units scale by powers of ten, this conversion does not use an offset: divide meters by 1,000 to get kilometers. Keep every length in the same unit before calculating an area, speed or rate.",
    ],
    related: [
      { href: "/en/kilometers-to-meters", label: "Kilometers to meters" },
      { href: "/en/meters-to-feet", label: "Meters to feet" },
      { href: "/en/units/meter", label: "Meter unit guide" },
    ],
  },
  {
    slug: "meters-to-feet",
    title: "Meters and feet in everyday use",
    paragraphs: [
      "Meters are used in the metric system, while feet are common in US customary measurements and in many building, aviation and personal-height contexts. One meter is exactly 3.28084 feet.",
      "For room sizes and construction drawings, make sure that every dimension uses the same unit before calculating area or volume. Converting just one side of a measurement can produce a misleading result.",
    ],
    related: [
      { href: "/en/feet-to-meters", label: "Feet to meters" },
      { href: "/en/centimeters-to-inches", label: "Centimeters to inches" },
      { href: "/en/units/meter", label: "Meter unit guide" },
    ],
  },
  {
    slug: "kilograms-to-pounds",
    title: "Kilograms and pounds",
    paragraphs: [
      "Kilograms are the standard metric unit of mass. Pounds are widely used in the United States and may appear on body-weight, food and product labels. One kilogram equals approximately 2.20462 pounds.",
      "A pound is a unit of mass in this converter. Do not confuse lb with pound-force, which is a force unit used in engineering and is not interchangeable with a body-weight value.",
    ],
    related: [
      { href: "/en/pounds-to-kilograms", label: "Pounds to kilograms" },
      { href: "/en/units/kilogram", label: "Kilogram unit guide" },
      { href: "/en/categories/mass", label: "All mass conversions" },
    ],
  },
  {
    slug: "gallon-to-liters",
    title: "US liquid gallons, not Imperial gallons",
    paragraphs: [
      "This converter uses the US liquid gallon, which is approximately 3.78541 liters. It is the gallon used on most US fuel, food and consumer-product labels.",
      "An Imperial gallon equals exactly 4.54609 liters and is about 20% larger. Check whether a source is US customary or Imperial before converting a fuel figure, container capacity or recipe.",
    ],
    note: "Use this page for US liquid gallons. For UK or Imperial gallons, use the Imperial gallons converter below.",
    related: [
      { href: "/en/imperial-gallons-to-liters", label: "Imperial gallons to liters" },
      { href: "/en/liters-to-gallon", label: "Liters to US gallons" },
      { href: "/en/units/gallon", label: "US liquid gallon unit guide" },
    ],
  },
  {
    slug: "imperial-gallons-to-liters",
    title: "Imperial gallons are not US gallons",
    paragraphs: [
      "An Imperial gallon is used in the British Imperial system and equals exactly 4.54609 liters. It is larger than a US liquid gallon, which equals 3.78541 liters.",
      "Check the source before converting fuel economy, container capacity or a recipe. A label that says only 'gallon' can be ambiguous when the country or measurement system is not stated.",
    ],
    note: "Use this page for Imperial or UK gallons. For US liquid gallons, use the US gallons converter below.",
    related: [
      { href: "/en/gallon-to-liters", label: "US gallons to liters" },
      { href: "/en/liters-to-imperial-gallons", label: "Liters to Imperial gallons" },
      { href: "/en/imperial-pints-to-milliliters", label: "Imperial pints to milliliters" },
    ],
  },
  {
    slug: "us-pints-to-milliliters",
    title: "US pints and Imperial pints",
    paragraphs: [
      "A US liquid pint equals about 473.176 milliliters. It is smaller than an Imperial pint, which equals about 568.261 milliliters.",
      "For recipes, drinks and food packaging, identify whether the source is American or British before converting. The difference is large enough to affect a recipe or serving calculation.",
    ],
    note: "Use this page for US liquid pints, not dry pints or Imperial pints.",
    related: [
      { href: "/en/imperial-pints-to-milliliters", label: "Imperial pints to milliliters" },
      { href: "/en/milliliters-to-us-pints", label: "Milliliters to US pints" },
      { href: "/en/kitchen-measurement-converter", label: "Kitchen measurement converter" },
    ],
  },
  {
    slug: "imperial-pints-to-milliliters",
    title: "Converting an Imperial pint",
    paragraphs: [
      "An Imperial pint equals approximately 568.261 milliliters. This is the pint traditionally used in the United Kingdom and is larger than a US liquid pint.",
      "The word 'pint' alone is not enough to determine the value. Check whether a recipe, drink menu or product specification uses the Imperial or US system before relying on a conversion.",
    ],
    note: "Use this page for UK or Imperial pints. For US pints, select the US pint converter instead.",
    related: [
      { href: "/en/us-pints-to-milliliters", label: "US pints to milliliters" },
      { href: "/en/milliliters-to-imperial-pints", label: "Milliliters to Imperial pints" },
      { href: "/en/imperial-gallons-to-liters", label: "Imperial gallons to liters" },
    ],
  },
  {
    slug: "us-quarts-to-liters",
    title: "US liquid quarts",
    paragraphs: [
      "A US liquid quart equals approximately 0.946353 liters. It is one quarter of a US liquid gallon and is commonly used for liquid capacity in the United States.",
      "US liquid quarts and Imperial quarts have different values. When a measurement comes from a US recipe, product manual or container label, the US liquid quart is usually the intended unit.",
    ],
    related: [
      { href: "/en/imperial-quarts-to-liters", label: "Imperial quarts to liters" },
      { href: "/en/liters-to-us-quarts", label: "Liters to US quarts" },
      { href: "/en/gallon-to-liters", label: "US gallons to liters" },
    ],
  },
  {
    slug: "imperial-quarts-to-liters",
    title: "Imperial quarts",
    paragraphs: [
      "An Imperial quart equals approximately 1.13652 liters. It is one quarter of an Imperial gallon and is larger than a US liquid quart.",
      "Because the unit name is shared by two systems, use the country or system named in the original source as part of the measurement. This is especially important for cooking, beverage and capacity specifications.",
    ],
    related: [
      { href: "/en/us-quarts-to-liters", label: "US quarts to liters" },
      { href: "/en/liters-to-imperial-quarts", label: "Liters to Imperial quarts" },
      { href: "/en/imperial-gallons-to-liters", label: "Imperial gallons to liters" },
    ],
  },
  {
    slug: "us-fluid-ounces-to-milliliters",
    title: "US fluid ounces and milliliters",
    paragraphs: [
      "One US fluid ounce equals approximately 29.5735 milliliters. It measures liquid volume and should not be confused with an ounce used to measure mass.",
      "US fluid ounces appear often in American recipes, nutrition labels and beverage containers. If the source is British, check whether it instead uses the larger Imperial fluid ounce.",
    ],
    note: "A fluid ounce measures volume. Its value cannot be used to convert the weight of an ingredient without knowing that ingredient's density.",
    related: [
      { href: "/en/imperial-fluid-ounces-to-milliliters", label: "Imperial fluid ounces to milliliters" },
      { href: "/en/milliliters-to-us-fluid-ounces", label: "Milliliters to US fluid ounces" },
      { href: "/en/teaspoons-to-milliliters", label: "Teaspoons to milliliters" },
    ],
  },
  {
    slug: "imperial-fluid-ounces-to-milliliters",
    title: "Imperial fluid ounces and milliliters",
    paragraphs: [
      "One Imperial fluid ounce equals approximately 28.4131 milliliters. It is slightly smaller than a US fluid ounce, so the two should not be substituted in recipes or product specifications.",
      "Use the original source's country or measurement system to choose the correct fluid ounce. A UK source may use Imperial units, whereas US packaging normally uses US customary units.",
    ],
    related: [
      { href: "/en/us-fluid-ounces-to-milliliters", label: "US fluid ounces to milliliters" },
      { href: "/en/milliliters-to-imperial-fluid-ounces", label: "Milliliters to Imperial fluid ounces" },
      { href: "/en/imperial-pints-to-milliliters", label: "Imperial pints to milliliters" },
    ],
  },
  {
    slug: "teaspoons-to-milliliters",
    title: "Teaspoons in recipes and medicine",
    paragraphs: [
      "A standard metric teaspoon is 5 milliliters. That is the value commonly used in nutrition labels, medicine directions and many modern recipes.",
      "Kitchen spoons are not reliable measuring tools because their physical size can vary. For medicine and baking, use a marked measuring spoon, oral syringe or measuring cup when accuracy matters.",
    ],
    note: "For medication, follow the product label and a healthcare professional's directions; this calculator does not replace dosage advice.",
    related: [
      { href: "/en/milliliters-to-teaspoons", label: "Milliliters to teaspoons" },
      { href: "/en/us-fluid-ounces-to-milliliters", label: "US fluid ounces to milliliters" },
      { href: "/en/recipe-converter", label: "Recipe converter" },
    ],
  },
  {
    slug: "grams-to-carats",
    title: "Carat (ct) is not the same as karat (K)",
    paragraphs: [
      "This converter uses the metric carat for gemstones: 1 carat (ct) is exactly 0.2 grams, so 1 gram = 5 carats. A 0.5 g diamond is 2.5 ct.",
      "Gold purity uses a different word with a similar sound: the karat (K). 24K is pure gold, 22K is 91.6% gold (hallmark 916) and 18K is 75% (750). Karat says nothing about weight — 10 grams of 22K gold is still 10 grams. To work out pure gold content or a jewellery price, use the gold tools below.",
    ],
    note: "Diamonds and gemstones are weighed in carats; gold is weighed in grams (or tola) and graded in karats.",
    related: [
      { href: "/en/carats-to-grams", label: "Carats to grams" },
      { href: "/en/22k-gold-to-24k-gold", label: "22K to 24K gold" },
      { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India)" },
    ],
  },
  {
    slug: "carats-to-grams",
    title: "Carats for gemstones, grams for gold",
    paragraphs: [
      "1 metric carat is exactly 0.2 grams (200 milligrams). Multiply carats by 0.2 to get grams: a 1.5 ct stone weighs 0.3 g.",
      "The karat (K) used for gold is a purity scale, not a weight. 22K gold (916) contains 91.6% gold whatever it weighs.",
    ],
    related: [
      { href: "/en/grams-to-carats", label: "Grams to carats" },
      { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India)" },
      { href: "/en/grain-to-grams", label: "Grains to grams" },
    ],
  },
  {
    slug: "22k-gold-to-24k-gold",
    title: "22K (916) gold and its pure gold content",
    paragraphs: [
      "22K gold is 22 parts gold out of 24, about 91.67% in theory; in India, BIS-hallmarked 22K jewellery is stamped 916, meaning at least 91.6% gold. This converter uses 22/24.",
      "Example: 10 grams of 22K gold contains 10 × 22 ÷ 24 = 9.17 grams of pure (24K) gold. That is why the 22K rate per gram is lower than the 24K rate. To price jewellery with making charges and GST, use the gold price calculator.",
    ],
    note: "When you sell or exchange old jewellery, the buyer tests the actual purity; the value is based on the pure gold content, usually after a deduction.",
    related: [
      { href: "/en/24k-gold-to-22k-gold", label: "24K to 22K gold" },
      { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India)" },
      { href: "/en/22k-gold-to-18k-gold", label: "22K to 18K gold" },
    ],
  },
  {
    slug: "24k-gold-to-22k-gold",
    title: "Making 22K gold from pure gold",
    paragraphs: [
      "22K gold is 22/24 gold (about 91.67%). Pure 24K gold is too soft for most jewellery, so it is alloyed with copper, silver or zinc.",
      "Formula: 22K weight = 24K weight × 24 ÷ 22. Example: 9.17 grams of pure gold makes 9.17 × 24 ÷ 22 = 10 grams of 22K gold. The extra 0.83 g is the alloy metal.",
    ],
    related: [
      { href: "/en/22k-gold-to-24k-gold", label: "22K to 24K gold" },
      { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India)" },
      { href: "/en/18k-gold-to-22k-gold", label: "18K to 22K gold" },
    ],
  },
  {
    slug: "milliamperes-to-amperes",
    title: "Milliamps in everyday electronics",
    paragraphs: [
      "Milli means one thousandth, so 1 mA = 0.001 A and 1 A = 1,000 mA. To convert, divide the milliamp value by 1,000: 250 mA = 0.25 A.",
      "Small currents are usually written in milliamps: a standard indicator LED runs at about 10–20 mA, and a microcontroller pin is often limited to around 20–40 mA. Chargers and fuses are rated in amps, so a 2 A charger can supply 2,000 mA.",
      "Battery capacity in mAh follows the same rule: a 5,000 mAh power bank stores 5 Ah of charge at its cell voltage.",
    ],
    related: [
      { href: "/en/amperes-to-milliamperes", label: "Amps to milliamps" },
      { href: "/en/volts-to-millivolt", label: "Volts to millivolts" },
      { href: "/en/kiloohm-to-ohm", label: "Kiloohms to ohms" },
    ],
  },
  {
    slug: "cubic-feet-per-minute-to-cubic-meter-per-second",
    title: "CFM, CMS and CMH in HVAC and fans",
    paragraphs: [
      "1 CFM (cubic foot per minute) = 0.000471947 m³/s. In the other direction, 1 m³/s — often written CMS — is about 2,118.88 CFM.",
      "Duct and fan catalogues also use m³/h (CMH): 1 CFM ≈ 1.699 m³/h, so a 1,000 CFM fan moves about 1,699 m³/h or 0.472 m³/s.",
    ],
    note: "Fan ratings are usually given at zero static pressure; real airflow in a duct system is lower.",
    related: [
      { href: "/en/cubic-meter-per-second-to-cubic-feet-per-minute", label: "m³/s to CFM" },
      { href: "/en/gallons-per-minute-to-cubic-meter-per-second", label: "GPM to m³/s" },
      { href: "/en/engineering-calculators", label: "Engineering calculators" },
    ],
  },
  {
    slug: "pascals-to-millibar",
    title: "Pascals, millibars and hectopascals",
    paragraphs: [
      "1 mbar = 100 Pa, so divide pascals by 100 to get millibars: 101,325 Pa = 1,013.25 mbar, the standard atmosphere.",
      "A millibar is exactly one hectopascal (hPa). Weather maps use hPa, while vacuum gauges and older instruments often show mbar — the numbers are identical.",
    ],
    related: [
      { href: "/en/millibar-to-pascals", label: "Millibar to pascals" },
      { href: "/en/hectopascals-to-pascals", label: "Hectopascals to pascals" },
      { href: "/en/pascals-to-bars", label: "Pascals to bar" },
    ],
  },
  {
    slug: "centipoise-to-pascal-second",
    title: "Centipoise, mPa·s and Pa·s",
    paragraphs: [
      "1 cP = 0.001 Pa·s = 1 mPa·s, so a viscosity written in centipoise has the same number in millipascal-seconds.",
      "Water at 20 °C is about 1.0 cP (0.001 Pa·s). Honey is several thousand cP, which is why data sheets for oils, paints and resins often switch to Pa·s for thick liquids.",
    ],
    note: "This is dynamic viscosity. Kinematic viscosity (centistokes) also depends on density.",
    related: [
      { href: "/en/pascal-second-to-centipoise", label: "Pa·s to centipoise" },
      { href: "/en/square-meter-per-second-to-centistoke", label: "m²/s to centistokes" },
      { href: "/en/engineering-calculators", label: "Engineering calculators" },
    ],
  },
  {
    slug: "radian-per-second-to-rpm",
    title: "Angular speed: rad/s and rpm",
    paragraphs: [
      "One revolution is 2π radians and a minute has 60 seconds, so rpm = rad/s × 60 ÷ 2π ≈ rad/s × 9.5493.",
      "Example: a motor shaft at 157 rad/s turns at about 1,500 rpm. The reverse is rad/s = rpm × 2π ÷ 60 ≈ rpm × 0.10472.",
    ],
    related: [
      { href: "/en/rpm-to-radian-per-second", label: "rpm to rad/s" },
      { href: "/en/degree-per-second-to-rpm", label: "Degrees per second to rpm" },
      { href: "/en/radian-to-degree", label: "Radians to degrees" },
    ],
  },
  {
    slug: "micrometer-to-nanometer",
    title: "Micrometers and nanometers in practice",
    paragraphs: [
      "1 µm = 1,000 nm, so multiply micrometers by 1,000: 0.55 µm = 550 nm.",
      "Visible light spans roughly 380–750 nm (0.38–0.75 µm). Bacteria are a few micrometers long, while chip features, viruses and thin films are described in nanometers.",
    ],
    related: [
      { href: "/en/nanometer-to-micrometer", label: "Nanometers to micrometers" },
      { href: "/en/micrometer-to-millimeters", label: "Micrometers to millimeters" },
      { href: "/en/angstrom-to-nanometer", label: "Ångström to nanometers" },
    ],
  },
  {
    slug: "bigha-to-square-meters",
    title: "Which bigha does this page use?",
    paragraphs: [
      "This page uses the bigha of West Bengal, Assam and Bangladesh: 1 bigha = 20 katha = 14,400 sq ft = 1,337.8 m² (about 0.33 acre).",
      "In other states the bigha is larger or smaller — for example about 27,225 sq ft in Bihar and Jharkhand, 27,000 sq ft in eastern Uttar Pradesh, 17,424 sq ft in Gujarat and 8,712 sq ft in Himachal Pradesh. Use the India land area converter to choose your state.",
    ],
    note: "For registration, loans or a sale deed, confirm the size used in your local land records.",
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/bigha-to-katha", label: "Bigha to katha" },
      { href: "/en/acre-to-square-meters", label: "Acres to square meters" },
    ],
  },
  {
    slug: "square-meters-to-bigha",
    title: "Square meters to bigha: check your state",
    paragraphs: [
      "This page converts to the West Bengal / Assam bigha of 1,337.8 m² (14,400 sq ft). 1,000 m² is about 0.75 of this bigha.",
      "The same area is a smaller number of bigha in states with a larger bigha, such as Bihar (about 2,529 m²) or eastern Uttar Pradesh. Use the India land area converter to pick your state.",
    ],
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/bigha-to-square-meters", label: "Bigha to square meters" },
      { href: "/en/square-meters-to-katha", label: "Square meters to katha" },
    ],
  },
  {
    slug: "bigha-to-katha",
    title: "Bigha and katha differ between states",
    paragraphs: [
      "In West Bengal, Bihar and Bangladesh, 1 bigha = 20 katha, which is what this page uses. In Assam, however, 1 bigha = 5 katha, because the Assam katha is much larger (2,880 sq ft).",
      "The size of the katha also follows the local bigha: 720 sq ft in West Bengal but about 1,361 sq ft in Bihar.",
    ],
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/katha-to-square-meters", label: "Katha to square meters" },
      { href: "/en/bigha-to-square-meters", label: "Bigha to square meters" },
    ],
  },
  {
    slug: "grain-to-grams",
    title: "Grains in jewellery, medicine and ammunition",
    paragraphs: [
      "The grain is the smallest unit of the imperial and troy systems and is identical in both: 1 grain = 64.79891 milligrams, so about 15.43 grains make 1 gram.",
      "It is still used for bullets and gunpowder, some medicine doses (for example 5 grains of aspirin ≈ 324 mg) and, historically, for gold and pearls. Do not confuse it with the carat (0.2 g) used for gemstones.",
    ],
    related: [
      { href: "/en/grams-to-grain", label: "Grams to grains" },
      { href: "/en/grams-to-carats", label: "Grams to carats" },
      { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India)" },
    ],
  },
  {
    slug: "bigha-to-square-feet",
    title: "1 bigha in square feet depends on the state",
    paragraphs: [
      "This page uses the bigha of West Bengal, Assam and Bangladesh: 1 bigha = 20 katha = 14,400 sq ft (1,600 gaj, about 0.33 acre).",
      "In other states the bigha is larger or smaller — about 27,225 sq ft in Bihar and Jharkhand, 27,000 sq ft in eastern Uttar Pradesh, 17,424 sq ft in Gujarat, 12,000 sq ft in Madhya Pradesh and 8,712 sq ft in Himachal Pradesh. Use the India land area converter to pick your state.",
    ],
    note: "For a sale deed, registration or loan, confirm the size used in your local land records.",
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/bigha-to-acre", label: "Bigha to acres" },
      { href: "/en/katha-to-square-feet", label: "Katha to square feet" },
    ],
  },
  {
    slug: "square-feet-to-bigha",
    title: "Square feet to bigha: choose the right bigha",
    paragraphs: [
      "This page converts to the West Bengal / Assam bigha of 14,400 sq ft, so 10,000 sq ft is about 0.69 bigha and 1 acre (43,560 sq ft) is 3.025 bigha.",
      "In other states the bigha is larger or smaller — about 27,225 sq ft in Bihar and Jharkhand, 27,000 sq ft in eastern Uttar Pradesh, 17,424 sq ft in Gujarat, 12,000 sq ft in Madhya Pradesh and 8,712 sq ft in Himachal Pradesh. Use the India land area converter to pick your state.",
    ],
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/bigha-to-square-feet", label: "Bigha to square feet" },
      { href: "/en/square-feet-to-katha", label: "Square feet to katha" },
    ],
  },
  {
    slug: "bigha-to-acre",
    title: "Bigha to acres",
    paragraphs: [
      "With the West Bengal / Assam bigha of 14,400 sq ft, 1 bigha = 0.3306 acre and 1 acre = 3.025 bigha.",
      "Where the bigha is about 27,225 sq ft (Bihar, Jharkhand, pucca bigha of Rajasthan), 1 bigha is 0.625 acre, so 1 acre is only 1.6 bigha. Use the India land area converter for your state.",
    ],
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/acre-to-bigha", label: "Acres to bigha" },
      { href: "/en/acre-to-square-feet", label: "Acres to square feet" },
    ],
  },
  {
    slug: "acre-to-bigha",
    title: "Acres to bigha",
    paragraphs: [
      "1 acre = 43,560 sq ft, which is 3.025 bigha of 14,400 sq ft (West Bengal, Assam).",
      "In Bihar and Jharkhand 1 acre is 1.6 bigha, in Gujarat 2.5 bigha and in Himachal Pradesh 5 bigha, because the bigha is a different size there. Use the India land area converter to choose your state.",
    ],
    related: [
      { href: "/en/india-land-area-converter", label: "India land area converter (all states)" },
      { href: "/en/bigha-to-acre", label: "Bigha to acres" },
      { href: "/en/acres-to-hectares", label: "Acres to hectares" },
    ],
  },
  {
    slug: "marla-to-square-feet",
    title: "Which marla?",
    paragraphs: [
      "This page uses the revenue marla of 272.25 sq ft (1/160 acre), common in Punjab and Haryana land records; 20 marla make 1 kanal of 5,445 sq ft.",
      "Housing schemes in Pakistan, especially in Lahore, often use a smaller marla of 225 sq ft, and some developers use 250 sq ft. Check which marla a plot advertisement uses before comparing prices.",
    ],
    related: [
      { href: "/en/kanal-to-square-feet", label: "Kanal to square feet" },
      { href: "/en/india-land-area-converter", label: "India land area converter" },
      { href: "/en/square-feet-to-marla", label: "Square feet to marla" },
    ],
  },
  {
    slug: "square-yards-to-square-feet",
    title: "Gaj and square yards",
    paragraphs: [
      "In India a gaj is the same as a square yard: 1 gaj = 9 sq ft = 0.836 m². Plot sizes in North India are often quoted in gaj, for example a 100 gaj plot is 900 sq ft.",
      "1 acre = 4,840 gaj and 1 guntha = 121 gaj.",
    ],
    related: [
      { href: "/en/square-feet-to-square-yards", label: "Square feet to gaj" },
      { href: "/en/india-land-area-converter", label: "India land area converter" },
      { href: "/en/acre-to-square-feet", label: "Acres to square feet" },
    ],
  },
];

export const featuredEnglishConversions = englishEditorialConversions.map(
  ({ slug, title }) => ({
    href: `/en/${slug}`,
    title,
  }),
);

export function getEnglishEditorialConversion(slug: string) {
  return englishEditorialConversions.find((conversion) => conversion.slug === slug);
}
