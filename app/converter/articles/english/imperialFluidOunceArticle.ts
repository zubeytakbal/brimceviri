import type { UnitArticle } from "../../unitArticles";

export const imperialFluidOunceArticle: UnitArticle = {
  slug: "imperial-fluid-ounce",
  introduction: [
    "The Imperial fluid ounce is a volume unit in the British Imperial system. One Imperial fluid ounce equals exactly 28.4130625 milliliters.",
    "It is smaller than a US fluid ounce and must not be confused with an ounce of mass. The original source should state Imperial or US fluid ounces before a conversion is made.",
  ],
  keyFacts: [
    { label: "Unit name", value: "Imperial fluid ounce" },
    { label: "Symbol", value: "imp fl oz" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "28.4130625 milliliters exactly" },
    { label: "Imperial subdivisions", value: "20 fluid ounces = 1 Imperial pint" },
    { label: "Imperial gallon relationship", value: "160 fluid ounces" },
  ],
  sections: [
    {
      title: "What is an Imperial fluid ounce?",
      paragraphs: [
        "An Imperial fluid ounce is one twentieth of an Imperial pint and one one-hundred-sixtieth of an Imperial gallon. It is a capacity unit for liquids and containers.",
        "The clear abbreviation is imp fl oz. Using only fl oz can be ambiguous because US fluid ounces are a different size.",
        "Convert to milliliters when comparing values across countries, recipes, packaging systems or technical documents.",
      ],
    },
    {
      title: "Imperial fluid ounces versus US fluid ounces",
      paragraphs: [
        "An Imperial fluid ounce equals 28.4130625 milliliters. A US fluid ounce equals 29.5735295625 milliliters, making the US unit slightly larger.",
        "The difference follows from the two gallon systems. Each system divides its gallon into related pints and fluid ounces, but the underlying gallon has a different volume.",
        "Do not use one system as an approximation for the other when a recipe, product specification or filling requirement needs a stated quantity.",
      ],
    },
    {
      title: "Converting Imperial fluid ounces",
      paragraphs: [
        "To convert Imperial fluid ounces to milliliters, multiply by 28.4130625. For example, 20 Imperial fluid ounces equal exactly 568.26125 milliliters.",
        "To convert milliliters to Imperial fluid ounces, divide by 28.4130625. Keep the capacity system visible when recording or sharing the result.",
        "Fluid ounces describe volume, not mass. A conversion to grams or kilograms also requires material density.",
      ],
    },
  ],
  timeline: [
    { year: "Imperial system", title: "A defined subdivision of the pint", description: "The Imperial fluid ounce is one twentieth of an Imperial pint and one one-hundred-sixtieth of an Imperial gallon." },
    { year: "Metric comparison", title: "Milliliters make the difference visible", description: "The exact milliliter value separates Imperial fluid ounces from US fluid ounces." },
    { year: "Today", title: "The system name remains part of the unit", description: "A fluid-ounce conversion is reliable only when the Imperial or US standard is known." },
  ],
  questions: [
    { question: "How many milliliters are in one Imperial fluid ounce?", answer: "One Imperial fluid ounce is exactly equal to 28.4130625 milliliters." },
    { question: "How many Imperial fluid ounces are in one Imperial pint?", answer: "One Imperial pint equals exactly 20 Imperial fluid ounces." },
    { question: "Is an Imperial fluid ounce the same as a US fluid ounce?", answer: "No. An Imperial fluid ounce is 28.4130625 milliliters, while a US fluid ounce is 29.5735295625 milliliters." },
    { question: "Is an Imperial fluid ounce an ounce of mass?", answer: "No. An Imperial fluid ounce measures volume, while an ounce of mass measures mass." },
    { question: "Can Imperial fluid ounces be converted directly to grams?", answer: "Not without knowing the material. Volume-to-mass conversion requires density." },
  ],
};
