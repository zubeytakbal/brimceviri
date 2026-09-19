import type { UnitArticle } from "../../unitArticles";

export const imperialQuartArticle: UnitArticle = {
  slug: "imperial-quart",
  introduction: [
    "The Imperial quart is a volume unit in the British Imperial system. One Imperial quart equals exactly 1.1365225 liters, or 1,136.5225 milliliters.",
    "It is larger than a US liquid quart. A measurement described only as \"quart\" needs a stated system before it can be converted reliably.",
  ],
  keyFacts: [
    { label: "Unit name", value: "Imperial quart" },
    { label: "Symbol", value: "imp qt" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "1.1365225 liters exactly" },
    { label: "Imperial subdivisions", value: "2 pints = 40 fluid ounces" },
    { label: "Imperial gallon relationship", value: "4 Imperial quarts" },
  ],
  sections: [
    {
      title: "What is an Imperial quart?",
      paragraphs: [
        "An Imperial quart is one quarter of an Imperial gallon. It equals two Imperial pints and 40 Imperial fluid ounces.",
        "Because the Imperial gallon equals exactly 4.54609 liters, an Imperial quart equals exactly 1.1365225 liters. This is a fixed capacity relationship, not a rounding convention.",
        "Use imp qt or the full name Imperial quart where a US reader could otherwise interpret qt as a US liquid quart.",
      ],
    },
    {
      title: "Imperial quart versus US liquid quart",
      paragraphs: [
        "An Imperial quart is 1.1365225 liters. A US liquid quart is approximately 0.946353 liters, so the Imperial quart is about 20% larger.",
        "The difference follows from the gallon standards: both systems contain four quarts per gallon, but the Imperial gallon is larger than the US liquid gallon.",
        "For recipes, product capacities and fuel figures, use a converter that names the system explicitly instead of assuming a quart has one shared value.",
      ],
    },
    {
      title: "Converting Imperial quarts",
      paragraphs: [
        "To convert Imperial quarts to liters, multiply by 1.1365225. For example, 4 Imperial quarts equal 4.54609 liters.",
        "To convert liters to Imperial quarts, divide by 1.1365225. The meaningful precision depends on the original measurement and the use of the result.",
        "Volume cannot be converted directly to mass. A conversion to grams or kilograms also needs the density and, when relevant, the temperature or composition of the material.",
      ],
    },
    {
      title: "Capacity labels and limits",
      paragraphs: [
        "A quart conversion does not establish a container's permitted fill level, a serving size or a compliance requirement. Those are determined by the original specification or rule.",
        "When the result affects safety, transport, medicine or trade, verify the stated standard and the source documentation in addition to converting the unit.",
      ],
    },
  ],
  timeline: [
    { year: "Imperial system", title: "A quarter-gallon capacity unit", description: "The Imperial quart is a defined subdivision of the Imperial gallon and pint system." },
    { year: "Metric comparison", title: "Exact liter relationships simplify conversion", description: "The Imperial quart has an exact relationship of 1.1365225 liters." },
    { year: "Today", title: "The named system remains part of the unit", description: "Imperial and US liquid quarts are still different volumes." },
  ],
  questions: [
    { question: "How many liters are in one Imperial quart?", answer: "One Imperial quart is exactly equal to 1.1365225 liters." },
    { question: "How many Imperial pints are in one Imperial quart?", answer: "One Imperial quart equals exactly 2 Imperial pints. It also equals 40 Imperial fluid ounces." },
    { question: "Is an Imperial quart the same as a US liquid quart?", answer: "No. An Imperial quart is 1.1365225 liters, while a US liquid quart is approximately 0.946353 liters." },
    { question: "How do you convert liters to Imperial quarts?", answer: "Divide the liter value by 1.1365225. For example, 4.54609 liters equal 4 Imperial quarts." },
    { question: "Can Imperial quarts be converted directly to kilograms?", answer: "Not without knowing the material. Quarts measure volume and kilograms measure mass, so density is required." },
  ],
};
