import type { UnitArticle } from "../../unitArticles";

export const kilogramArticle: UnitArticle = {
  slug: "kilogram",

  introduction: [
    "The kilogram is the SI base unit of mass and uses the symbol kg. It is the standard metric unit for body mass, goods, engineering materials, laboratory samples and many scientific calculations.",
    "One kilogram equals exactly 1,000 grams. The kilogram measures mass; everyday language often calls this weight, but weight is technically a force that also depends on gravity.",
  ],

  keyFacts: [
    { label: "Unit name", value: "Kilogram" },
    { label: "Symbol", value: "kg" },
    { label: "Physical quantity", value: "Mass" },
    { label: "SI status", value: "SI base unit" },
    { label: "Metric relationship", value: "1,000 grams exactly" },
    { label: "US customary relationship", value: "≈ 2.20462 pounds" },
  ],

  sections: [
    {
      title: "What is a kilogram?",
      paragraphs: [
        "Mass describes how much matter an object contains and how strongly it resists a change in motion. The kilogram is the SI base unit used to report that quantity.",
        "Kilograms are practical for many everyday values: people, food packages, luggage, building materials and vehicle payloads. Grams and milligrams are usually more convenient for smaller values, while metric tons are used for large masses.",
        "The symbol kg is written in lowercase. Write a space between a number and the symbol, such as 5 kg, and do not add a plural ending to the symbol.",
      ],
    },
    {
      title: "The modern definition of the kilogram",
      paragraphs: [
        "The kilogram is defined by fixing the numerical value of the Planck constant, h, at exactly 6.62607015 × 10⁻³⁴ joule seconds. Together with the definitions of the meter and second, this defines the unit of mass.",
        "This definition does not depend on a single physical object. National metrology laboratories can realize the kilogram through experiments traceable to fundamental constants, rather than relying on one stored metal prototype.",
        "For normal weighing, this scientific definition is invisible: a calibrated scale and suitable reference masses provide the practical measurement chain. It matters because it keeps the worldwide mass standard stable and reproducible.",
      ],
    },
    {
      title: "Kilograms, grams and metric prefixes",
      paragraphs: [
        "The kilogram is unusual among SI base units because its name already contains the prefix kilo. To form smaller or larger mass units, prefixes are attached to gram, not kilogram: 1 mg is one milligram, not one microkilogram.",
        "One kilogram equals 1,000 grams, one gram equals 1,000 milligrams, and one metric ton equals 1,000 kilograms. These exact decimal relationships make conversions within the metric system straightforward.",
      ],
    },
    {
      title: "Mass is not weight or force",
      paragraphs: [
        "In daily speech, a person's \"weight\" is commonly reported in kilograms. In physics, the kilogram is mass, while weight is the gravitational force acting on that mass and is measured in newtons.",
        "Near Earth's surface, a 1 kg mass experiences a weight force of roughly 9.81 newtons. The mass stays the same on the Moon or in orbit, while the weight force changes with local gravity.",
        "Do not substitute kilograms for newtons in an engineering force calculation. If a drawing, test report or specification says kgf, it refers to kilogram-force, which is a distinct force unit.",
      ],
    },
    {
      title: "Kilograms and pounds",
      paragraphs: [
        "Pounds are common on US consumer labels, body-mass discussions and shipping documents. One kilogram is approximately 2.20462 pounds, while one pound is exactly 0.45359237 kilograms.",
        "For a quick comparison, convert the value using the stated unit and retain an appropriate number of decimal places. A unit conversion changes the label of the same mass; it does not account for packaging, tare mass or scale uncertainty.",
      ],
    },
  ],

  timeline: [
    {
      year: "19th century",
      title: "A physical mass standard",
      description:
        "International mass comparisons were based on a carefully controlled prototype kilogram made from platinum-iridium.",
    },
    {
      year: "2018",
      title: "A constant-based definition was adopted",
      description:
        "The General Conference on Weights and Measures adopted the revised SI definition based on the fixed value of the Planck constant.",
    },
    {
      year: "2019",
      title: "The revised SI took effect",
      description:
        "The kilogram became part of a system of SI units defined through fixed fundamental constants.",
    },
  ],

  questions: [
    {
      question: "How many grams are in one kilogram?",
      answer:
        "One kilogram is exactly equal to 1,000 grams. Multiply kilograms by 1,000 to convert them to grams.",
    },
    {
      question: "How many pounds are in one kilogram?",
      answer:
        "One kilogram is approximately equal to 2.20462 pounds. Multiply kilograms by 2.20462 for a rounded conversion to pounds.",
    },
    {
      question: "Is a kilogram a unit of mass or weight?",
      answer:
        "A kilogram is a unit of mass. Everyday speech often uses kilograms for weight, but force due to gravity is measured in newtons.",
    },
    {
      question: "Why is kilogram abbreviated kg?",
      answer:
        "kg is the internationally defined symbol for kilogram. It is written in lowercase and is not pluralized after a number.",
    },
    {
      question: "Why are milligrams based on grams rather than kilograms?",
      answer:
        "Because kilogram already contains the prefix kilo, SI prefixes for mass are attached to gram. One milligram is written mg, not μkg.",
    },
  ],
};
