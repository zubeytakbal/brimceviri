import type { UnitArticle } from "../../unitArticles";

export const psiArticle: UnitArticle = {
  slug: "psi",

  introduction: [
    "PSI (pound-force per square inch) is a pressure unit represented by the symbol psi. It is equal to the pressure produced when a force of one pound-force is distributed evenly over an area of one square inch: 1 psi = 1 lbf/in².",
    "PSI is a non-SI unit rooted in British and American engineering tradition, but it remains widely used worldwide in automotive, hydraulic and industrial process equipment.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "psi",
    },
    {
      label: "1 psi",
      value: "6,894.757293168 Pa (defined, exact value)",
    },
    {
      label: "1 bar",
      value: "≈ 14.5038 psi",
    },
    {
      label: "Unit system",
      value: "Non-SI, British/American engineering unit",
    },
    {
      label: "Pressure-type distinction",
      value: "Split into gauge (psig) and absolute (psia)",
    },
  ],

  sections: [
    {
      title: "The definition and derivation of PSI",
      paragraphs: [
        "PSI is a pressure unit in which the force acting perpendicular to a surface is measured in pound-force (lbf), and the area over which that force is spread is measured in square inches (in²). Its name comes from the abbreviation of \"pound-force per square inch\".",
        "Because pound-force and the inch are the base force and length units of the imperial measurement system, PSI naturally emerges as that system's pressure unit. Since the 1959 International Yard and Pound Agreement defined the pound and inch exactly in terms of SI units, 1 psi was also fixed at exactly 6,894.757293168 Pa.",
        "PSI values are usually expressed with small numbers in everyday life — a car tire, for example, is typically inflated to 30-35 psi. In industrial hydraulic systems, however, values can reach into the thousands of psi.",
      ],
    },
    {
      title: "Automotive use: tire pressure",
      paragraphs: [
        "The pressure of car, motorcycle and bicycle tires is widely specified in PSI around the world, even in countries where SI units are official. A passenger car tire is typically inflated to 30-35 psi, while bicycle tires can range well above 40 to 100 psi.",
        "Tire manufacturers usually display recommended pressure values on the vehicle's door-frame label and in the owner's manual in both PSI and bar or kilopascal. This dual display reflects PSI's deep-rooted use in the global automotive industry.",
        "Most vehicle tire-pressure gauges measure gauge pressure (psig), zeroed against the surrounding atmospheric pressure — meaning the value shown on the display is the difference obtained by subtracting atmospheric pressure from the absolute pressure inside the tire.",
      ],
    },
    {
      title: "PSI, bar and pascal — a numerical comparison",
      paragraphs: [
        "1 psi is exactly equal to 6,894.757293168 Pa. Because this value is derived from the exact SI definitions of pound-force and the inch, it is an exact ratio, not a measured approximation.",
        "Expressed in bar, 1 psi corresponds to approximately 0.0689476 bar; conversely, 1 bar equals approximately 14.5038 psi. Because of this, the numerical value changes substantially when converting between bar and psi.",
        "Although pascal, bar and psi all express the same physical quantity (pressure), their use varies by region and industry tradition: pascal and bar are more common in European-centered engineering and meteorology, while psi is more common in Anglo-American automotive and industrial applications.",
      ],
    },
    {
      title: "The difference between gauge pressure (psig) and absolute pressure (psia)",
      paragraphs: [
        "PSIG (pound-force per square inch gauge) expresses gauge pressure, zeroed against the surrounding atmospheric pressure. A pressure gauge takes the atmospheric pressure at the measurement location as its reference (zero) point.",
        "PSIA (pound-force per square inch absolute), on the other hand, expresses absolute pressure, referenced against a perfect vacuum (zero pressure). Since standard atmospheric pressure at sea level is about 14.696 psi, the psia value is calculated by adding this constant to the psig value: psia = psig + 14.696.",
        "This distinction matters especially in vacuum systems, flight-altitude calculations and thermodynamic equations, since relationships such as the ideal gas law require absolute pressure, not gauge pressure.",
      ],
    },
    {
      title: "PSI in engineering contexts",
      paragraphs: [
        "In the process industry, design pressures for reactors, pipelines and pressure vessels are frequently specified in PSI, especially under US-originated standards such as ASME. Working pressure classes can then be directly compared with material-strength calculations in the same unit family.",
        "In materials engineering, quantities such as tensile strength, yield strength and elastic modulus are often expressed in ksi (kilopsi, 1,000 psi). Mild steel's yield strength, for example, is on the order of about 36 ksi.",
        "In aerospace and automotive engineering, hydraulic system pressures and some structural test values are also reported in PSI, reflecting the influence of US-based technical standards across global supply chains.",
      ],
    },
  ],

  timeline: [
    {
      year: "1959",
      title: "The International Yard and Pound Agreement",
      description:
        "The pound and inch were defined exactly in terms of SI units (1 pound = 0.45359237 kg, 1 inch = 25.4 mm), forming the basis for PSI's exact value in pascals (6,894.757293168 Pa).",
    },
  ],

  questions: [
    {
      question: "How many PSI is 1 bar?",
      answer:
        "1 bar is approximately equal to 14.5038 psi. To convert bar to psi, multiply the value by approximately 14.5038.",
    },
    {
      question: "What is the difference between PSIG and PSIA?",
      answer:
        "PSIG expresses gauge pressure, zeroed against atmospheric pressure; PSIA expresses absolute pressure, measured against a perfect vacuum. At sea level, the psia value is found by adding approximately 14.696 to the psig value.",
    },
    {
      question: "Why is tire pressure measured in PSI?",
      answer:
        "Tire pressure measurement historically became standardized in PSI within the Anglo-American automotive industry. Because this tradition continues in the global automotive industry, tire labels in many countries still show a PSI value.",
    },
    {
      question: "How many pascals is 1 PSI?",
      answer:
        "1 psi is exactly equal to 6,894.757293168 Pa — a fixed ratio derived from the exact SI definitions of pound-force and the inch.",
    },
  ],
};
