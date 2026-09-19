import type { UnitArticle } from "../../unitArticles";

export const literArticle: UnitArticle = {
  slug: "liter",

  introduction: [
    "The liter is a widely used metric unit of volume. It is equal to one cubic decimeter, or one thousandth of a cubic meter, and its symbol is L.",
    "Although the liter is not an SI base or derived unit, it is accepted for use with the SI. It is used for liquids, gases, containers, fuel, laboratory work and many everyday measurements.",
  ],

  keyFacts: [
    { label: "Unit name", value: "Liter" },
    { label: "Symbol", value: "L" },
    { label: "Physical quantity", value: "Volume" },
    { label: "SI status", value: "Accepted for use with the SI" },
    { label: "Metric relationship", value: "1 dm³ = 0.001 m³" },
    { label: "Metric subdivision", value: "1,000 milliliters" },
  ],

  sections: [
    {
      title: "What is a liter?",
      paragraphs: [
        "A liter measures volume: the amount of three-dimensional space occupied by a substance or available inside a container. A one-liter bottle, for example, has a capacity of one liter when filled to its stated reference level.",
        "The liter is defined exactly as one cubic decimeter. A cube that is 10 centimeters long, 10 centimeters wide and 10 centimeters high therefore has a volume of one liter.",
        "The spelling \"liter\" is standard in US English, while \"litre\" is common in British and many other forms of English. Both refer to the same unit.",
      ],
    },
    {
      title: "Liters, milliliters and cubic meters",
      paragraphs: [
        "Metric volume units scale by powers of ten. One liter equals 1,000 milliliters, and one milliliter equals one cubic centimeter. These exact relationships make common laboratory, recipe and packaging conversions straightforward.",
        "For larger volumes, one cubic meter equals exactly 1,000 liters. Cubic meters are usually more practical for rooms, tanks, shipping and process equipment, while liters are easier to read for bottles, fuel and household quantities.",
        "A liter can be converted to US customary or Imperial units, but the system must be named. A US liquid gallon and an Imperial gallon are different volumes, so a label that says only \"gallon\" needs additional context.",
      ],
    },
    {
      title: "Why the symbol is L",
      paragraphs: [
        "The uppercase symbol L is widely used because it is less likely to be confused with the numeral 1 than a lowercase l. Write a space between a number and its unit symbol, such as 2 L or 250 mL.",
        "Unit symbols are not made plural: write 5 L rather than 5 Ls. Prefixes are part of the symbol, so mL means milliliter and should not be written as ml when a formal SI-style symbol is needed.",
      ],
    },
    {
      title: "Capacity, volume and mass",
      paragraphs: [
        "A liter describes volume or capacity, not mass. One liter of water has a mass close to one kilogram under familiar conditions, but this is not a general conversion rule for every liquid or material.",
        "To convert a volume into mass, the material's density and the relevant temperature or condition may be needed. For example, one liter of oil, fuel or compressed gas does not necessarily have the same mass as one liter of water.",
      ],
    },
  ],

  timeline: [
    {
      year: "1790s",
      title: "Metric volume relationships emerge",
      description:
        "The metric system established decimal relationships between length and volume, including the cubic decimeter used for the liter.",
    },
    {
      year: "1901–1964",
      title: "A water-based definition was used",
      description:
        "For high-accuracy historical data from this period, the former water-based liter definition differs slightly from one cubic decimeter.",
    },
    {
      year: "Today",
      title: "Exact cubic-decimeter relationship",
      description:
        "The liter is used with the SI as exactly one cubic decimeter, equal to 0.001 cubic meters.",
    },
  ],

  questions: [
    {
      question: "How many milliliters are in one liter?",
      answer:
        "One liter is exactly equal to 1,000 milliliters. Multiply liters by 1,000 to convert them to milliliters.",
    },
    {
      question: "How many cubic meters are in one liter?",
      answer:
        "One liter is exactly equal to 0.001 cubic meters. Divide liters by 1,000 to convert them to cubic meters.",
    },
    {
      question: "Is a liter an SI unit?",
      answer:
        "The liter is not an SI base or derived unit, but it is accepted for use with the SI. Its exact value is 1 dm³, or 0.001 m³.",
    },
    {
      question: "Is one milliliter the same as one cubic centimeter?",
      answer:
        "Yes. One milliliter is exactly equal to one cubic centimeter (1 mL = 1 cm³).",
    },
    {
      question: "Can liters be converted directly to kilograms?",
      answer:
        "Not without knowing the material. Liters measure volume and kilograms measure mass, so the material's density is needed for the conversion.",
    },
  ],
};
