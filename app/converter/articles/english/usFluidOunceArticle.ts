import type { UnitArticle } from "../../unitArticles";

export const usFluidOunceArticle: UnitArticle = {
  slug: "fluid-ounce",
  introduction: [
    "The US fluid ounce is a unit of liquid volume in the US customary system. One US fluid ounce equals exactly 29.5735295625 milliliters.",
    "A fluid ounce measures volume, not mass. It differs from an ounce used for weight, and it is also different from the smaller Imperial fluid ounce.",
  ],
  keyFacts: [
    { label: "Unit name", value: "US fluid ounce" },
    { label: "Symbol", value: "US fl oz" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "29.5735295625 milliliters exactly" },
    { label: "US subdivisions", value: "8 fluid ounces = 1 US cup" },
    { label: "US pint relationship", value: "16 fluid ounces" },
  ],
  sections: [
    {
      title: "What is a US fluid ounce?",
      paragraphs: [
        "The US fluid ounce is a unit for liquid capacity. It is one sixteenth of a US liquid pint, one eighth of a US cup and one one-hundred-twenty-eighth of a US liquid gallon.",
        "It is common on US beverage, food, cosmetic and recipe labels. The abbreviation fl oz distinguishes it from oz, which is normally used for an ounce of mass.",
        "For an international audience, milliliters provide a clearer shared reference. A value in fl oz should also state whether it is US or Imperial when that is not obvious from the source.",
      ],
    },
    {
      title: "US fluid ounces, Imperial fluid ounces and ounces of mass",
      paragraphs: [
        "One US fluid ounce is exactly 29.5735295625 milliliters. One Imperial fluid ounce is 28.4130625 milliliters, so the two fluid-volume units are not interchangeable.",
        "An ounce of mass measures mass, while a fluid ounce measures volume. A conversion from fluid ounces to grams depends on the density of the actual ingredient or material.",
        "Water-based shortcuts can be misleading for oils, syrups, powders and other materials. Use a recipe's stated ingredient weight or a reliable density value when mass matters.",
      ],
    },
    {
      title: "Converting US fluid ounces",
      paragraphs: [
        "To convert US fluid ounces to milliliters, multiply by 29.5735295625. For example, 8 US fluid ounces equal exactly 236.5882365 milliliters.",
        "To convert milliliters to US fluid ounces, divide by 29.5735295625. Round only at the level appropriate for the recipe, product label or technical requirement.",
        "For medicine, follow the product label and use a supplied or recommended measuring device. A general volume converter does not provide dosage advice.",
      ],
    },
  ],
  timeline: [
    { year: "Customary system", title: "A nested liquid-capacity unit", description: "The US fluid ounce is defined through the US cup, pint, quart and gallon relationships." },
    { year: "Metric comparison", title: "Milliliters support international comparison", description: "The exact milliliter relationship distinguishes US fluid ounces from Imperial fluid ounces." },
    { year: "Today", title: "Volume and mass still need separate units", description: "Fluid ounces are used for capacity and should not be treated as ounces of mass." },
  ],
  questions: [
    { question: "How many milliliters are in one US fluid ounce?", answer: "One US fluid ounce is exactly equal to 29.5735295625 milliliters." },
    { question: "How many US fluid ounces are in one cup?", answer: "One US cup equals exactly 8 US fluid ounces." },
    { question: "Is a US fluid ounce the same as an Imperial fluid ounce?", answer: "No. A US fluid ounce is 29.5735295625 milliliters, while an Imperial fluid ounce is 28.4130625 milliliters." },
    { question: "Is a fluid ounce the same as an ounce of weight?", answer: "No. A fluid ounce measures volume, while an ounce of weight measures mass." },
    { question: "Can fluid ounces be converted directly to grams?", answer: "Not without knowing the material. The conversion requires density because volume and mass are different quantities." },
  ],
};
