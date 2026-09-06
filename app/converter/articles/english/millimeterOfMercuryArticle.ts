import type { UnitArticle } from "../../unitArticles";

export const millimeterOfMercuryArticle: UnitArticle = {
  slug: "millimeter-of-mercury",

  introduction: [
    "The millimeter of mercury (mmHg) is a non-SI pressure unit equal to the pressure produced by a one-millimeter-high column of mercury. It remains the worldwide standard unit for measuring blood pressure in medicine.",
    "mmHg is a unit inherited from the era when mercury barometers and manometers were common. Although non-SI, it has retained its place in medical devices and some vacuum applications.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "mmHg (sometimes used interchangeably with Torr)",
    },
    {
      label: "1 mmHg",
      value: "133.322387415 Pa (conventional, exact value)",
    },
    {
      label: "1 mmHg",
      value: "≈ 0.00131579 atm (1/760 atm)",
    },
    {
      label: "1 mmHg",
      value: "≈ 0.0193368 psi",
    },
    {
      label: "Unit system",
      value: "Non-SI, historical and medical engineering unit",
    },
  ],

  sections: [
    {
      title: "What is mmHg, and how is it derived?",
      paragraphs: [
        "The millimeter of mercury equals the pressure produced at the base of a mercury column, inside a closed tube, by a one-millimeter height of that column. This pressure is calculated using the hydrostatic relationship P = ρ·g·h, where ρ is the density of mercury, g is gravitational acceleration and h is the column height.",
        "The size of the mmHg unit stems directly from mercury's high density: because mercury is about 13.6 times denser than water, a relatively short mercury column can produce a pressure equivalent to a much taller water column. This property historically made mmHg convenient for compact barometer and manometer designs.",
        "mmHg values are expressed in everyday medical measurements as small, easily readable numbers — a typical blood pressure reading, for example, is shown as two values, such as 120/80 mmHg.",
      ],
    },
    {
      title: "The exact definition of mmHg: conventional mercury density",
      paragraphs: [
        "The modern exact value of mmHg is derived from the product of the conventional density of mercury (13,595.1 kg/m³) and standard gravitational acceleration (9.80665 m/s²): 1 mmHg = 13,595.1 kg/m³ × 9.80665 m/s² × 0.001 m = 133.322387415 Pa.",
        "The mercury density used in this definition is not the result of an actual measurement, but a conventional reference value adopted at 0°C. Real mercury density varies slightly with temperature, but the mmHg unit rests on a fixed definition independent of that variability.",
        "This approach, like the standard and technical atmosphere units, is an example of turning the behavior of a historical measuring instrument into a modern, repeatable, fixed definition.",
      ],
    },
    {
      title: "The tiny difference between mmHg and the Torr",
      paragraphs: [
        "The Torr unit was named in the 1950s in honor of Evangelista Torricelli and defined as exactly 1/760 of the standard atmosphere: 1 Torr = 101,325 Pa / 760 = 133.322368421... Pa.",
        "The difference between conventional mmHg (133.322387415 Pa) and the Torr (133.322368421 Pa) is about 0.000019 Pa — a relative difference on the order of a few parts per million (about 0.14 ppm). This difference produces no measurable effect in any practical application.",
        "This tiny distinction arises because the two units are defined independently — one through mercury density, the other as an exact fraction of the standard atmosphere. In everyday and clinical use, mmHg and Torr are treated as interchangeable.",
      ],
    },
    {
      title: "Why is blood pressure still measured in mmHg?",
      paragraphs: [
        "Blood pressure has been reported in mmHg since the mercury sphygmomanometer entered clinical practice in the late 19th century. This tradition has become deeply embedded worldwide in medical education, clinical guidelines and diagnostic threshold values (such as 120/80 mmHg).",
        "Although the World Health Organization and various metrology bodies have occasionally encouraged a shift to the SI-aligned kilopascal (kPa), mmHg remains the dominant unit in clinical practice — largely because existing reference values and device calibrations are built around it.",
        "Modern digital blood pressure monitors no longer contain mercury, but they still display results in mmHg for the sake of historical continuity and clinical comparability.",
      ],
    },
    {
      title: "mmHg and other pressure units",
      paragraphs: [
        "1 mmHg is exactly equal to 133.322387415 Pa. The standard atmosphere is taken as approximately equal to 760 mmHg, but because the two units are defined independently, they are not mathematically exactly equal.",
        "In bar, 1 mmHg equals approximately 0.00133322 bar, and in psi, approximately 0.0193368 psi. These small values are one reason mmHg is often preferred for low-pressure and vacuum measurements.",
        "In vacuum technology, mmHg (or Torr) remains widely used to express intuitively how far below atmospheric pressure a system has reached; \"high vacuum\", for example, generally refers to pressures below 10⁻³ Torr.",
      ],
    },
  ],

  timeline: [
    {
      year: "1896",
      title: "The Riva-Rocci sphygmomanometer",
      description:
        "Italian physician Scipione Riva-Rocci developed the sphygmomanometer, using a mercury manometer and an arm cuff, standardizing the clinical measurement of blood pressure in mmHg.",
    },
    {
      year: "1950s",
      title: "The Torr unit is named",
      description:
        "In vacuum physics circles, the unit \"Torr\" was named in honor of Evangelista Torricelli and defined as exactly 1/760 of the standard atmosphere.",
    },
  ],

  questions: [
    {
      question: "How many pascals is 1 mmHg?",
      answer:
        "1 mmHg is exactly equal to 133.322387415 Pa, defined through the conventional density of mercury and standard gravitational acceleration.",
    },
    {
      question: "Is mmHg exactly the same as the Torr?",
      answer:
        "No, but they are extremely close. mmHg is defined through mercury density, while the Torr is defined as exactly 1/760 of the standard atmosphere; the difference between them is on the order of a few parts per million and negligible in practice.",
    },
    {
      question: "Why is blood pressure still measured in mmHg?",
      answer:
        "Blood pressure measurement became standardized in mmHg historically through the mercury sphygmomanometer. Because clinical guidelines, diagnostic thresholds and device calibrations are built on this unit, its use continues today.",
    },
    {
      question: "How many bar is 1 mmHg?",
      answer:
        "1 mmHg is approximately equal to 0.00133322 bar. To convert mmHg to bar, multiply the value by approximately 0.00133322.",
    },
  ],
};
