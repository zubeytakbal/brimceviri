import type { UnitArticle } from "../../unitArticles";

export const kilopascalArticle: UnitArticle = {
  slug: "kilopascal",

  introduction: [
    "The kilopascal (kPa) is an official SI-prefixed unit equal to 1,000 times the pascal. Because the pascal is often too small a unit for everyday engineering pressures, the kilopascal is used more often than the pascal in practice.",
    "The kilopascal is used as a readable, field-appropriate pressure unit across a wide range of fields, from geotechnical engineering to HVAC systems, from structural load calculations to medical measurements.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "kPa",
    },
    {
      label: "1 kilopascal",
      value: "1,000 Pa (exact, SI prefix)",
    },
    {
      label: "1 kilopascal",
      value: "≈ 0.00987 atm",
    },
    {
      label: "1 kilopascal",
      value: "≈ 0.145038 psi",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, multiple unit)",
    },
  ],

  sections: [
    {
      title: "What is a kilopascal, and why is it preferred?",
      paragraphs: [
        "The kilopascal is formed by applying the SI prefix \"kilo\" to the pascal, and is exactly equal to 1,000 pascals. Thanks to the SI prefix system, converting between kilopascal and pascal is as simple as shifting the decimal point three places.",
        "The pascal is usually a very small unit for expressing everyday engineering pressures — for example, standard atmospheric pressure is expressed as the somewhat unwieldy figure of 101,325 Pa. The same value becomes far more readable expressed in kilopascals, at about 101.325 kPa.",
        "This readability advantage is the main reason the kilopascal appears far more often than the pascal in engineering reports, technical datasheets and field measurements.",
      ],
    },
    {
      title: "Which engineering fields use the kilopascal as standard?",
      paragraphs: [
        "In geotechnical engineering, soil bearing capacity, consolidation pressure and stress values are almost always reported in kilopascals; typical soil bearing capacities are on the order of a few hundred kilopascals.",
        "In structural engineering, distributed loads such as wind load and snow load are expressed in kilopascals. In HVAC systems, duct static pressure and fan performance curves are typically shown in units between pascal and kilopascal, chosen according to the scale of the application.",
        "In countries where SI units are standard, the kilopascal is also used in medical measurements — for example, partial pressures in blood gas analysis (such as oxygen and carbon dioxide pressure) may be reported in kilopascals.",
      ],
    },
    {
      title: "The pascal prefix family: when to use hPa, kPa, MPa",
      paragraphs: [
        "The prefixed units in the pascal family are chosen according to the magnitude of the pressure being measured. The hectopascal (hPa, 100 Pa) is preferred in meteorology to express atmospheric pressure; this value is numerically identical to the older millibar unit.",
        "The kilopascal (kPa, 1,000 Pa) is an appropriate scale for everyday engineering pressures, soil mechanics and HVAC. The megapascal (MPa, 1,000,000 Pa), meanwhile, is used for much larger values, such as material stress, elastic modulus and high-pressure hydraulic systems.",
        "Choosing the right prefix improves the readability of a number and avoids an unnecessary string of zeros. The same physical pressure value can be expressed in hPa, kPa or MPa depending on context — which one is used is simply a matter of practicality.",
      ],
    },
    {
      title: "The kilopascal and other pressure units",
      paragraphs: [
        "1 kilopascal is exactly equal to 0.01 bar, which makes conversion between kilopascal and bar extremely simple. 1 kilopascal is also approximately equal to 0.00987 standard atmospheres.",
        "In PSI, 1 kilopascal is approximately equal to 0.145038 psi, and in millimeters of mercury, approximately 7.50062 mmHg. These values are all derived from the kilopascal's exact definition in terms of the pascal.",
        "When converting between the kilopascal and other units, it helps to remember that the kilopascal is already an exact multiple of the pascal — so conversion precision is identical to calculations done directly in pascals.",
      ],
    },
    {
      title: "Common points of confusion with the kilopascal",
      paragraphs: [
        "The kilopascal (kPa) is sometimes confused with kilogram-force per square centimeter (kgf/cm²), even though these are units of different magnitude. 1 kgf/cm² is approximately equal to 98.0665 kPa — a numerical difference of roughly 100 times.",
        "Tire pressure labels sometimes show kPa, bar and psi values all at once; misreading the wrong unit can lead to serious pressure errors. For example, there is roughly a 14-fold difference between 200 kPa and 200 psi.",
        "The distinction between gauge and absolute pressure also applies to the kilopascal; whether a device's \"kPa\" reading is gauge or absolute pressure should be stated separately in technical documentation.",
      ],
    },
  ],

  timeline: [
    {
      year: "1960",
      title: "The SI prefix system is formalized",
      description:
        "The 11th CGPM formally adopted the International System of Units (SI), including standard prefixes such as kilo; this system was later applied to the pascal unit in 1971.",
    },
  ],

  questions: [
    {
      question: "How many pascals is 1 kilopascal?",
      answer:
        "1 kilopascal is exactly equal to 1,000 Pa. This is an exact value by definition of the SI prefix system.",
    },
    {
      question: "How many bar is 1 kilopascal?",
      answer:
        "1 kilopascal is exactly equal to 0.01 bar. To convert kilopascal to bar, divide the value by 100.",
    },
    {
      question: "How many PSI is 1 kilopascal?",
      answer:
        "1 kilopascal is approximately equal to 0.145038 psi. To convert kilopascal to psi, multiply the value by approximately 0.145038.",
    },
    {
      question:
        "Why are some pressure values shown in kilopascals instead of pascals?",
      answer:
        "The pascal is usually too small a unit for everyday engineering pressures and results in unwieldy numbers. The kilopascal expresses the same values with fewer digits and better readability.",
    },
  ],
};
