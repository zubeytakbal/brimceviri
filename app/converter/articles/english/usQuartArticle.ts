import type { UnitArticle } from "../../unitArticles";

export const usQuartArticle: UnitArticle = {
  slug: "quart",
  introduction: [
    "The US liquid quart is a volume unit in the US customary system. One US liquid quart is approximately 0.946353 liters, or 946.353 milliliters.",
    "A quart is not a universal value. The US liquid quart differs from the Imperial quart and the US dry quart, so the source must identify the system before a conversion is used.",
  ],
  keyFacts: [
    { label: "Unit name", value: "US liquid quart" },
    { label: "Symbol", value: "US qt" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "≈ 0.946353 liters" },
    { label: "US subdivisions", value: "2 pints = 4 cups = 32 fluid ounces" },
    { label: "US gallon relationship", value: "4 US liquid quarts" },
  ],
  sections: [
    {
      title: "What is a US liquid quart?",
      paragraphs: [
        "The US liquid quart is one quarter of a US liquid gallon. It equals two US liquid pints, four US cups or 32 US fluid ounces.",
        "It appears on US food, drink, household and automotive-product labels. In a liquid-capacity context, a US source that says \"quart\" commonly means the US liquid quart.",
        "Use the full name or US qt when clarity matters. The abbreviation qt on its own does not state whether the value is US liquid, US dry or Imperial.",
      ],
    },
    {
      title: "US liquid quart, Imperial quart and dry quart",
      paragraphs: [
        "A US liquid quart is approximately 0.946353 liters. An Imperial quart is 1.1365225 liters, so the Imperial unit is about 20% larger.",
        "The US dry quart is also a separate unit. A package, recipe or product description should name liquid or dry capacity when that distinction affects the result.",
        "For cross-country comparisons, convert the named quart to liters or milliliters rather than treating similarly named units as interchangeable.",
      ],
    },
    {
      title: "Converting US liquid quarts",
      paragraphs: [
        "To convert US liquid quarts to liters, multiply by approximately 0.946353. For example, 4 US liquid quarts equal about 3.78541 liters.",
        "To convert liters to US liquid quarts, divide by approximately 0.946353. Keep the original measurement system visible in a calculation or report.",
        "Quarts measure volume. They cannot be converted to grams or kilograms without the density of the liquid or material.",
      ],
    },
    {
      title: "Use the source's capacity standard",
      paragraphs: [
        "A conversion tells you the equivalent volume, not a product's safe fill level, a recipe's intended yield or a medical dosage. Follow the original product and safety instructions when those details matter.",
        "If a label is ambiguous, look for an explicit US, Imperial, liquid or dry designation before choosing a conversion factor.",
      ],
    },
  ],
  timeline: [
    { year: "Customary system", title: "A quarter-gallon capacity unit", description: "The US liquid quart is nested within the US liquid gallon, pint, cup and fluid-ounce system." },
    { year: "Metric comparison", title: "Liters expose the system difference", description: "Metric values make the difference between US liquid and Imperial quarts clear." },
    { year: "Today", title: "System labels remain necessary", description: "US liquid, US dry and Imperial quarts remain different capacity units." },
  ],
  questions: [
    { question: "How many liters are in one US liquid quart?", answer: "One US liquid quart is approximately equal to 0.946353 liters." },
    { question: "How many cups are in one US liquid quart?", answer: "One US liquid quart equals exactly 4 US cups. It also equals 2 US liquid pints and 32 US fluid ounces." },
    { question: "Is a US liquid quart the same as an Imperial quart?", answer: "No. A US liquid quart is approximately 0.946353 liters, while an Imperial quart is 1.1365225 liters." },
    { question: "Is a US dry quart the same as a US liquid quart?", answer: "No. US dry and US liquid quarts are separate capacity units. Check the source before converting." },
    { question: "Can US liquid quarts be converted directly to kilograms?", answer: "Not without knowing the material. Quarts measure volume and kilograms measure mass, so density is required." },
  ],
};
