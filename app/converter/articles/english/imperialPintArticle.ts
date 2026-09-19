import type { UnitArticle } from "../../unitArticles";

export const imperialPintArticle: UnitArticle = {
  slug: "imperial-pint",

  introduction: [
    "The Imperial pint is a volume unit in the British Imperial system. One Imperial pint equals exactly 568.26125 milliliters, or 0.56826125 liters.",
    "It is larger than a US liquid pint. When a label, recipe, drink measure or technical document says only \"pint\", check whether it uses the Imperial or US customary system before converting.",
  ],

  keyFacts: [
    { label: "Unit name", value: "Imperial pint" },
    { label: "Symbol", value: "imp pt" },
    { label: "Physical quantity", value: "Volume / capacity" },
    { label: "Metric relationship", value: "568.26125 milliliters exactly" },
    { label: "Imperial subdivisions", value: "20 fluid ounces" },
    { label: "Imperial gallon relationship", value: "8 Imperial pints" },
  ],

  sections: [
    {
      title: "What is an Imperial pint?",
      paragraphs: [
        "The Imperial pint is a capacity unit equal to one eighth of an Imperial gallon. Because an Imperial gallon is exactly 4.54609 liters, one Imperial pint is exactly 0.56826125 liters.",
        "It belongs to the British Imperial system and can appear in UK-related historical material, drink measures and product specifications. The source should state the measurement system whenever the value affects a decision.",
        "Writing imp pt or Imperial pint is clearer than using pt alone, because the same short form can be used for the smaller US liquid pint.",
      ],
    },
    {
      title: "Imperial pint versus US liquid pint",
      paragraphs: [
        "An Imperial pint is 568.26125 milliliters, while a US liquid pint is approximately 473.176 milliliters. The Imperial pint is therefore about 20% larger.",
        "The difference comes from two different gallon standards. An Imperial gallon contains eight Imperial pints; a US liquid gallon contains eight US liquid pints, but the gallons themselves have different volumes.",
        "This is not a small rounding difference. For recipes, servings, container capacities and fuel-related figures, use the named system rather than assuming all pints are interchangeable.",
      ],
    },
    {
      title: "Converting Imperial pints",
      paragraphs: [
        "To convert Imperial pints to milliliters, multiply by 568.26125. For example, 2 Imperial pints equal 1,136.5225 milliliters.",
        "To convert milliliters to Imperial pints, divide by 568.26125. Use enough decimal places for the task, especially when comparing a measured capacity against a stated product requirement.",
        "Pints and fluid ounces measure volume. They cannot be converted directly to grams, kilograms or ounces of mass unless the material's density is known.",
      ],
    },
    {
      title: "Capacity and practical limits",
      paragraphs: [
        "A pint conversion changes the unit used to express a volume; it does not determine a safe fill level, product serving, medical amount or regulatory allowance.",
        "For medicine, transport, compliance or safety-related decisions, follow the original label, manufacturer instructions and applicable local requirements.",
      ],
    },
  ],

  timeline: [
    {
      year: "Imperial system",
      title: "The pint became a defined subdivision of the gallon",
      description:
        "The Imperial pint is one eighth of an Imperial gallon and fits into a nested system of quarts and fluid ounces.",
    },
    {
      year: "Metric comparison",
      title: "Milliliters provide a shared reference",
      description:
        "The exact metric relationship makes it possible to distinguish Imperial pints from US liquid pints reliably.",
    },
    {
      year: "Today",
      title: "Clear system names prevent mistakes",
      description:
        "US and Imperial pints remain different units, so the country or measurement system must be part of the conversion context.",
    },
  ],

  questions: [
    {
      question: "How many milliliters are in one Imperial pint?",
      answer:
        "One Imperial pint is exactly equal to 568.26125 milliliters. Multiply Imperial pints by 568.26125 to convert them to milliliters.",
    },
    {
      question: "Is an Imperial pint the same as a US pint?",
      answer:
        "No. An Imperial pint is 568.26125 milliliters, while a US liquid pint is approximately 473.176 milliliters.",
    },
    {
      question: "How many fluid ounces are in one Imperial pint?",
      answer:
        "One Imperial pint equals exactly 20 Imperial fluid ounces. These are different from US fluid ounces.",
    },
    {
      question: "How do you convert milliliters to Imperial pints?",
      answer:
        "Divide the milliliter value by 568.26125. For example, 1,136.5225 milliliters equal 2 Imperial pints.",
    },
    {
      question: "Can an Imperial pint be converted directly to kilograms?",
      answer:
        "Not without knowing the material. An Imperial pint measures volume and kilograms measure mass, so density is required.",
    },
  ],
};
