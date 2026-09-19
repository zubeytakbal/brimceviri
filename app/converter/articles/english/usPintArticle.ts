import type { UnitArticle } from "../../unitArticles";

export const usPintArticle: UnitArticle = {
  slug: "pint",

  introduction: [
    "The US liquid pint is a volume unit in the US customary system. One US liquid pint is approximately 473.176 milliliters, or about 0.473 liters.",
    "A pint is not a universal value. The US liquid pint is smaller than the Imperial pint, and it is also different from the US dry pint. Use the system named by the original source before converting.",
  ],

  keyFacts: [
    { label: "Unit name", value: "US liquid pint" },
    { label: "Symbol", value: "US pt" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "≈ 473.176 milliliters" },
    { label: "US subdivisions", value: "2 cups = 16 US fluid ounces" },
    { label: "US gallon relationship", value: "8 US liquid pints" },
  ],

  sections: [
    {
      title: "What is a US liquid pint?",
      paragraphs: [
        "The US liquid pint is a capacity unit used for liquids in the United States. It is one eighth of a US liquid gallon, one half of a US liquid quart and two US cups.",
        "It is commonly seen in recipes, beverage containers, food packaging and product descriptions. When a US source uses the word \"pint\" for a liquid, it usually means the US liquid pint.",
        "The symbol pt alone may not tell you which system is intended. Writing US pt or using the full name US liquid pint removes that ambiguity.",
      ],
    },
    {
      title: "US pint, Imperial pint and dry pint",
      paragraphs: [
        "One US liquid pint is approximately 473.176 milliliters. One Imperial pint is 568.26125 milliliters, so substituting an Imperial pint for a US pint changes the volume by about 20%.",
        "The United States also has a dry pint used for dry goods such as produce. A dry pint is a different unit from a US liquid pint, so a recipe, package or market listing should specify the type when it matters.",
        "For cooking and serving quantities, convert to milliliters or liters when comparing sources from different countries. These metric units provide a clear shared reference.",
      ],
    },
    {
      title: "Converting US liquid pints",
      paragraphs: [
        "To convert US liquid pints to milliliters, multiply by approximately 473.176. For example, 2 US liquid pints are about 946.353 milliliters.",
        "To convert milliliters to US liquid pints, divide by approximately 473.176. Use the precision appropriate to the task: a recipe may allow rounding, while a product specification can require the exact stated standard.",
        "Fluid ounces and pints measure volume. They cannot be converted directly to grams or ounces of mass unless the density of the ingredient or material is known.",
      ],
    },
    {
      title: "Using pint values safely",
      paragraphs: [
        "A unit conversion only expresses the same volume in another unit. It does not determine a food serving, medication amount, fill limit or the usable capacity of a container.",
        "For medical directions, follow the product label and use the measuring device supplied or recommended by a healthcare professional. Do not infer a dosage from a kitchen-volume conversion.",
      ],
    },
  ],

  timeline: [
    {
      year: "Customary system",
      title: "The liquid pint became a nested capacity unit",
      description:
        "The US liquid pint is defined through its relationship to the US liquid gallon, quart, cup and fluid ounce.",
    },
    {
      year: "Metric comparison",
      title: "Milliliters made cross-system comparison clearer",
      description:
        "Expressing pints in milliliters helps distinguish US liquid, US dry and Imperial capacity units.",
    },
    {
      year: "Today",
      title: "Labels need a stated system",
      description:
        "US and Imperial pints remain different units, so clear system names prevent conversion mistakes.",
    },
  ],

  questions: [
    {
      question: "How many milliliters are in one US liquid pint?",
      answer:
        "One US liquid pint is approximately equal to 473.176 milliliters. Multiply US liquid pints by 473.176 to convert them to milliliters.",
    },
    {
      question: "How many US cups are in one US liquid pint?",
      answer:
        "One US liquid pint equals exactly 2 US cups. It also equals 16 US fluid ounces.",
    },
    {
      question: "Is a US pint the same as an Imperial pint?",
      answer:
        "No. A US liquid pint is approximately 473.176 milliliters, while an Imperial pint is 568.26125 milliliters.",
    },
    {
      question: "Is a US dry pint the same as a US liquid pint?",
      answer:
        "No. US dry and liquid pints are separate volume units. Check the label or source before converting.",
    },
    {
      question: "Can pints be converted directly to grams?",
      answer:
        "Not without knowing the material. Pints measure volume and grams measure mass, so the material's density is needed.",
    },
  ],
};
