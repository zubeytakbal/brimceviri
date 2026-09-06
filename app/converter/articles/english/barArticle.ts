import type { UnitArticle } from "../../unitArticles";

export const barArticle: UnitArticle = {
  slug: "bar",

  introduction: [
    "The bar is a non-SI pressure unit equal to exactly 100,000 pascals, represented by the symbol bar. Thanks to its round, easy-to-calculate value, it is used in industry and everyday engineering practice about as often as the pascal — and in some fields, even more often.",
    "The bar is used across meteorology, hydraulic systems, compressors and tire pressure labels. It is not an official SI unit, but its use alongside SI is widely accepted.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "bar",
    },
    {
      label: "1 bar",
      value: "100,000 Pa (defined, exact value)",
    },
    {
      label: "1 bar",
      value: "≈ 0.986923 atm",
    },
    {
      label: "1 bar",
      value: "≈ 14.5038 psi",
    },
    {
      label: "Unit system",
      value: "Non-SI, accepted for use with SI",
    },
  ],

  sections: [
    {
      title: "What is the bar?",
      paragraphs: [
        "The bar is a pressure unit equal to exactly 100,000 pascals. This round numerical value keeps the bar in an easy relationship with the pascal — converting a value from pascals to bar simply requires dividing by 100,000.",
        "The bar's smaller unit, the millibar (mbar), is exactly equal to 100 Pa, which is numerically identical to the hectopascal (hPa). This is why millibar and hectopascal are used interchangeably in meteorology.",
        "The bar is close to, but distinct from, the standard atmosphere (101,325 Pa). This closeness lets the bar express everyday pressure values on an intuitive scale close to atmospheric conditions.",
      ],
    },
    {
      title: "The origin of the bar: William Napier Shaw and meteorological pressure",
      paragraphs: [
        "The term bar comes from the ancient Greek word \"baros\", meaning weight. The unit was proposed in 1903 by the British meteorologist William Napier Shaw for use in meteorological pressure measurements.",
        "Napier Shaw also introduced the millibar, one thousandth of a bar, at the same time. The millibar became the standard unit in weather reports and pressure charts throughout the 20th century.",
        "Today, meteorology largely prefers the hectopascal (hPa), which is numerically identical to the millibar, but the bar and millibar names remain a legacy of this meteorological origin.",
      ],
    },
    {
      title: "The bar in industrial and hydraulic systems",
      paragraphs: [
        "In many countries, especially in Europe, compressors, hydraulic systems, pneumatic equipment and process lines are rated in bar. Industrial compressed-air systems typically operate in the 6-10 bar range.",
        "In the automotive sector, tire pressure is commonly labeled in bar in Europe; a typical passenger car tire is inflated to about 2-2.5 bar. This differs from the US and UK tradition of expressing the same quantity in PSI.",
        "High-pressure water-jet cutting systems, hydraulic presses and some industrial cleaning equipment can operate at pressures from a few hundred to several thousand bar; technical datasheets for this kind of equipment almost always use bar as the rating unit.",
      ],
    },
    {
      title: "Why isn't the bar an official SI unit, despite being a round power of ten?",
      paragraphs: [
        "Because the bar equals exactly 10⁵ pascals, it is numerically compatible with the SI's decimal structure. Even so, the SI defines the official prefixed pressure units as hectopascal, kilopascal or megapascal, and does not adopt the bar directly.",
        "The reason is historical and institutional: the bar was already an independently established unit in meteorological and industrial practice before the SI was formalized. The BIPM (International Bureau of Weights and Measures) classifies the bar as a \"non-SI unit accepted for use with SI\", allowing this usage to continue.",
        "In practice this distinction does not affect everyday use — converting between bar and pascal is always exact and simple. Official scientific publications and SI-aligned reporting, however, generally prefer the pascal and its multiples.",
      ],
    },
  ],

  timeline: [
    {
      year: "1903",
      title: "The bar and millibar are proposed",
      description:
        "British meteorologist William Napier Shaw proposed the bar and its one-thousandth unit, the millibar, for meteorological pressure measurements.",
    },
  ],

  questions: [
    {
      question: "How many pascals is 1 bar?",
      answer:
        "1 bar is exactly equal to 100,000 Pa. This is an exact, defined value, not a measured one.",
    },
    {
      question: "How many atmospheres is 1 bar?",
      answer:
        "1 bar is approximately equal to 0.986923 standard atmospheres. The bar is close to, but distinct from, the standard atmosphere.",
    },
    {
      question: "How many PSI is 1 bar?",
      answer:
        "1 bar is approximately equal to 14.5038 psi. To convert bar to psi, multiply the value by approximately 14.5038.",
    },
    {
      question:
        "What is the relationship between bar and millibar, and why do weather reports use hPa?",
      answer:
        "1 millibar (mbar) is exactly 1/1,000 of a bar, or 100 Pa. This value is numerically identical to the hectopascal (hPa), which is why meteorology now mostly uses the SI-aligned hPa notation instead.",
    },
  ],
};
