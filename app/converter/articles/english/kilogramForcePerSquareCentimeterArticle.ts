import type { UnitArticle } from "../../unitArticles";

export const kilogramForcePerSquareCentimeterArticle: UnitArticle = {
  slug: "kilogram-force-per-square-centimeter",

  introduction: [
    "Kilogram-force per square centimeter (kgf/cm²) is a non-SI pressure unit equal to the pressure exerted by one kilogram-force over an area of one square centimeter. The same quantity is also known, especially in European engineering tradition, as the \"technical atmosphere\" (symbol at).",
    "kgf/cm² and the technical atmosphere are two names for the same unit, exactly equal to 98,066.5 pascals. It is a separate, mass-based reference value that should not be confused with the standard atmosphere (101,325 Pa).",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "kgf/cm² (at, for technical atmosphere)",
    },
    {
      label: "1 kgf/cm²",
      value: "98,066.5 Pa (defined, exact value)",
    },
    {
      label: "1 kgf/cm²",
      value: "0.980665 bar (exact)",
    },
    {
      label: "Unit system",
      value: "Non-SI, older gravitational metric engineering unit",
    },
    {
      label: "Relation to standard atmosphere",
      value: "1 at ≈ 0.967841 atm (not the same unit)",
    },
  ],

  sections: [
    {
      title: "What is kgf/cm² (technical atmosphere)?",
      paragraphs: [
        "kgf/cm² is a unit equal to the pressure exerted perpendicular to a surface by one kilogram-force acting over an area of one square centimeter. Kilogram-force, in turn, is the weight force that standard gravitational acceleration exerts on a mass of one kilogram.",
        "This unit is a product of what is known as the \"gravitational metric system\", an older engineering approach that defines force directly through mass. The same quantity is also called the \"technical atmosphere\", especially in Europe, and is denoted by the symbol at.",
        "The name \"technical atmosphere\" reflects an intent to offer a more \"practical\", rounder engineering reference close to — but distinct from — the standard atmosphere (101,325 Pa). The two units are not interchangeable, however.",
      ],
    },
    {
      title: "Why did kilogram-force become a separate force unit?",
      paragraphs: [
        "In the SI system, the unit of force is the newton, defined independently of mass directly through F = m·a. In the late 19th and early 20th centuries, however, engineering practice commonly expressed force in the more everyday-familiar kilogram unit.",
        "Under this approach, one kilogram-force was defined as the weight of a one-kilogram mass under standard gravity. Because standard gravitational acceleration (g₀ = 9.80665 m/s²) is taken as constant, kilogram-force also acquired an exact value: 1 kgf = 9.80665 N.",
        "This definition also contributed to the everyday confusion between mass and force; one of the reasons the SI adopted the newton as its base force unit was to eliminate this conceptual ambiguity.",
      ],
    },
    {
      title: "Don't confuse the technical atmosphere with the standard atmosphere",
      paragraphs: [
        "The technical atmosphere (at, 98,066.5 Pa) and the standard atmosphere (atm, 101,325 Pa) have similar names but are two separate reference values differing by about 3.3%. The standard atmosphere is derived from barometric measurement, while the technical atmosphere derives from the definition of kilogram-force.",
        "Confusing these two units can lead to calculation errors, particularly in older European-originated technical documents and calibration certificates. When it is not made explicit whether a value is \"at\" or \"atm\", conversion ambiguity results.",
        "In everyday use, the word \"atmosphere\" mostly refers to the standard atmosphere (atm); the technical atmosphere (at) is a narrower term associated specifically with older engineering tradition and the kgf/cm² unit.",
      ],
    },
    {
      title: "Where is kgf/cm² used?",
      paragraphs: [
        "kgf/cm² is a unit still occasionally found on pump, compressor and boiler gauges dating from before SI units became fully established. It appears especially on labels and manuals of older European- and Japanese-made industrial equipment.",
        "Automotive service manuals and some hydraulic system documents may also historically contain pressure values in kgf/cm²; today these values are usually shown alongside or replaced by bar or kilopascal values.",
        "In newly designed systems, kgf/cm² is no longer preferred; SI-aligned units such as bar, kilopascal or megapascal have become the standard in current engineering documentation.",
      ],
    },
    {
      title: "The close relationship between kgf/cm² and bar",
      paragraphs: [
        "1 kgf/cm² is exactly equal to 0.980665 bar — meaning the two units are numerically very close, though not exactly equal. This closeness has led some older sources to carelessly use the two interchangeably.",
        "This numerical proximity (a difference of less than about 2%) usually causes no issues in small-scale, non-critical applications. In precise engineering calculations, calibration work or systems with tight safety margins, however, this small difference should not be ignored.",
        "To convert a kgf/cm² value to bar, multiply by 0.980665; to convert it to pascal, multiply by 98,066.5.",
      ],
    },
  ],

  timeline: [
    {
      year: "1901",
      title: "Standard gravity is defined",
      description:
        "The 3rd CGPM defined standard gravitational acceleration as g₀ = 9.80665 m/s², forming the basis for the exact definitions of kilogram-force and, in turn, the technical atmosphere.",
    },
  ],

  questions: [
    {
      question: "How many bar is 1 kgf/cm²?",
      answer:
        "1 kgf/cm² is exactly equal to 0.980665 bar. To convert kgf/cm² to bar, multiply the value by 0.980665.",
    },
    {
      question: "How many pascals is 1 kgf/cm²?",
      answer:
        "1 kgf/cm² (technical atmosphere) is exactly equal to 98,066.5 Pa, a value derived directly from the exact definition of standard gravitational acceleration.",
    },
    {
      question:
        "What is the difference between the technical atmosphere (at) and the standard atmosphere (atm)?",
      answer:
        "The technical atmosphere equals 98,066.5 Pa, while the standard atmosphere equals 101,325 Pa. Despite their similar names, they are two independently defined reference values differing by about 3.3%.",
    },
    {
      question: "Is kgf/cm² still used today?",
      answer:
        "kgf/cm² is no longer preferred in newly designed systems, but it can still be found on older pump, compressor and boiler gauges, in some service manuals and on calibration certificates.",
    },
  ],
};
