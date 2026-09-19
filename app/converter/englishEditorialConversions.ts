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
