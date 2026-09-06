import type { UnitArticle } from "../../unitArticles";

export const cubicCentimeterArticle: UnitArticle = {
  slug: "cubic-centimeter",

  introduction: [
    "The cubic centimeter (cm³) is a small volume unit equal to one millionth of a cubic meter, and is numerically identical to the milliliter (mL). It has a wide range of uses, from laboratory measurements to engine displacement.",
    "In Turkey, the displacement of motorcycle and car engines is usually expressed in \"cc\" (the abbreviation for cubic centimeter), which is why cubic-centimeter-to-liter conversion is frequently sought by vehicle buyers.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "cm³ (cc)",
    },
    {
      label: "1 cm³",
      value: "1 mL",
    },
    {
      label: "1 cm³",
      value: "0.001 liters",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, subunit)",
    },
    {
      label: "1 liter",
      value: "1,000 cm³",
    },
  ],

  sections: [
    {
      title: "What is a cubic centimeter?",
      paragraphs: [
        "A cubic centimeter equals the volume of a cube with sides one centimeter long, and corresponds to one millionth of a cubic meter (m³). Thanks to the metric system's decimal structure, converting it to other volume units is extremely simple.",
        "By definition, the cubic centimeter is numerically identical to the milliliter (mL), which is why the two units are often used interchangeably in everyday use, especially for measuring liquid and gas volumes.",
        "Its abbreviation, \"cc\" (cubic centimeter), is one of the most widely used international notations for expressing engine displacement, especially in the automotive industry.",
      ],
    },
    {
      title: "The cubic centimeter in engine displacement",
      paragraphs: [
        "The displacement of an internal combustion engine's cylinders is the total volume swept during the piston's up-and-down motion, and is generally specified in cubic centimeters (cc). A 125cc motorcycle engine, for example, has a displacement of 125 cubic centimeters.",
        "As engine displacement increases, the power an engine can produce generally increases too, though fuel consumption may rise in parallel. This is why the cc value gives an important clue about a vehicle's balance of performance and economy when buying.",
        "In Turkey, motorcycle license classes are also determined by engine displacement (such as the 125cc limit), giving the cubic-centimeter unit practical everyday importance.",
      ],
    },
    {
      title: "The cubic centimeter and other volume units",
      paragraphs: [
        "1 cubic centimeter is exactly equal to 1 milliliter and to 0.001 liters. This means a 1,000cc engine displacement is the same as a 1-liter engine displacement — which is why \"liter\" and \"cc\" convert easily into one another in the automotive industry.",
        "Its imperial-system counterpart is the cubic inch (in³); 1 cubic inch is approximately equal to 16.387 cubic centimeters. Classic US-originated automobile engine displacements are often expressed in cubic inches.",
        "In laboratory settings, the cubic centimeter, alongside the milliliter, is the most commonly used unit for measuring the volume of liquid samples, chemicals and small solid objects.",
      ],
    },
  ],

  timeline: [
    {
      year: "1795",
      title: "The metric system is adopted",
      description:
        "With the adoption of the metric system, the centimeter and its derived cubic-centimeter unit became a standard reference for volume measurement.",
    },
    {
      year: "Early 20th century",
      title: "The use of cc in the automotive industry",
      description:
        "With the spread of internal combustion engines, expressing engine displacement in cubic centimeters (cc) became an international standard.",
    },
  ],

  questions: [
    {
      question: "How many milliliters is 1 cubic centimeter?",
      answer:
        "1 cubic centimeter (cm³) is exactly equal to 1 milliliter (mL). The two units are numerically identical.",
    },
    {
      question: "How many liters is 1 cubic centimeter?",
      answer:
        "1 cubic centimeter is equal to 0.001 liters. To convert cubic centimeters to liters, divide the value by 1,000.",
    },
    {
      question: "How many liters is 125cc?",
      answer:
        "125cc (cubic centimeters) is equal to 0.125 liters. To express an engine's displacement in liters, divide the cc value by 1,000.",
    },
    {
      question: "Are cc and cm³ the same thing?",
      answer:
        "Yes, cc (cubic centimeter) is the abbreviation for cubic centimeter and refers to exactly the same unit as cm³.",
    },
  ],
};
