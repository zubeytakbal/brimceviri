import type { UnitArticle } from "../../unitArticles";

export const imperialGallonArticle: UnitArticle = {
  slug: "imperial-gallon",

  introduction: [
    "The Imperial gallon is a unit of capacity in the British Imperial system. One Imperial gallon equals exactly 4.54609 liters, making it larger than a US liquid gallon.",
    "The word \"gallon\" is ambiguous unless the measurement system is stated. For an accurate conversion, distinguish Imperial gallons from US liquid gallons before using a fuel figure, container size, recipe or technical specification.",
  ],

  keyFacts: [
    { label: "Unit name", value: "Imperial gallon" },
    { label: "Symbol", value: "imp gal" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "4.54609 liters exactly" },
    { label: "Imperial subdivisions", value: "4 quarts = 8 pints" },
    { label: "Compared with US gallon", value: "≈ 1.201 US liquid gallons" },
  ],

  sections: [
    {
      title: "What is an Imperial gallon?",
      paragraphs: [
        "An Imperial gallon is a capacity unit defined as exactly 4.54609 cubic decimeters. Because one cubic decimeter is one liter, the same value is exactly 4.54609 liters.",
        "It belongs to the British Imperial measurement system. The unit may appear in UK historical material, some product specifications and fuel-economy discussions, but the original source should always identify the system being used.",
        "The symbol imp gal makes the distinction explicit. When a label uses only gal or gallon, do not assume it means the Imperial value without checking the context.",
      ],
    },
    {
      title: "Imperial gallons and US liquid gallons",
      paragraphs: [
        "A US liquid gallon is approximately 3.78541 liters, while an Imperial gallon is exactly 4.54609 liters. The Imperial gallon is therefore about 20% larger.",
        "The same distinction continues through related units. An Imperial quart is one quarter of an Imperial gallon, an Imperial pint is one eighth, and an Imperial fluid ounce is one one-hundred-sixtieth.",
        "Use a converter with clearly labelled US and Imperial options. Replacing one system with the other can materially change a recipe, tank capacity or fuel-consumption calculation.",
      ],
    },
    {
      title: "Converting Imperial gallons",
      paragraphs: [
        "To convert Imperial gallons to liters, multiply by 4.54609. For example, 10 Imperial gallons equal 45.4609 liters.",
        "To convert liters to Imperial gallons, divide by 4.54609. Keep enough decimal places for the situation: a rough household estimate needs less precision than a technical capacity calculation.",
        "Volume is not mass. Converting gallons to kilograms requires the density of the material and, when relevant, its temperature or composition.",
      ],
    },
    {
      title: "Capacity labels and measurement context",
      paragraphs: [
        "A capacity unit describes volume, not necessarily the usable fill level of a product or vessel. Product labels, tank ratings and regulations can specify separate filling limits, headspace or temperature conditions.",
        "For travel, trade, medical, safety or compliance decisions, use the original standard or manufacturer documentation rather than relying only on a unit conversion.",
      ],
    },
  ],

  timeline: [
    {
      year: "19th century",
      title: "Imperial capacity measures were standardized",
      description:
        "The British Imperial system established a common gallon and related capacity units such as quarts, pints and fluid ounces.",
    },
    {
      year: "Metric era",
      title: "Liter relationships made comparisons simpler",
      description:
        "The exact relationship of 4.54609 liters provides a clear metric reference for the Imperial gallon.",
    },
    {
      year: "Today",
      title: "System labels remain essential",
      description:
        "US liquid and Imperial gallons continue to be different units, so conversion tools must state which one they use.",
    },
  ],

  questions: [
    {
      question: "How many liters are in one Imperial gallon?",
      answer:
        "One Imperial gallon is exactly equal to 4.54609 liters. Multiply Imperial gallons by 4.54609 to convert them to liters.",
    },
    {
      question: "Is an Imperial gallon the same as a US gallon?",
      answer:
        "No. An Imperial gallon is 4.54609 liters, while a US liquid gallon is approximately 3.78541 liters. The Imperial gallon is about 20% larger.",
    },
    {
      question: "How many Imperial pints are in one Imperial gallon?",
      answer:
        "One Imperial gallon equals exactly 8 Imperial pints. It also equals 4 Imperial quarts and 160 Imperial fluid ounces.",
    },
    {
      question: "How do you convert liters to Imperial gallons?",
      answer:
        "Divide the liter value by 4.54609. For example, 45.4609 liters equal 10 Imperial gallons.",
    },
    {
      question: "Can Imperial gallons be converted directly to kilograms?",
      answer:
        "Not without knowing the material. Gallons measure volume and kilograms measure mass, so the material's density is required.",
    },
  ],
};
