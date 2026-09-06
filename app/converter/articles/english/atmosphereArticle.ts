import type { UnitArticle } from "../../unitArticles";

export const atmosphereArticle: UnitArticle = {
  slug: "atmosphere",

  introduction: [
    "The atmosphere is a pressure unit represented by the symbol atm. It is based on a reference value close to the average sea-level pressure of Earth's atmosphere, and is generally known as the \"standard atmosphere\".",
    "The standard atmosphere is, by definition, exactly equal to 101,325 pascals. It is not an SI unit itself, but it is a reference unit accepted for use alongside the SI in fields such as chemistry, meteorology, aviation and diving.",
  ],

  keyFacts: [
    {
      label: "Unit name",
      value: "Atmosphere (standard atmosphere)",
    },
    {
      label: "Symbol",
      value: "atm",
    },
    {
      label: "Physical quantity",
      value: "Pressure",
    },
    {
      label: "Unit system",
      value: "Non-SI, accepted for use with SI",
    },
    {
      label: "1 atmosphere",
      value: "101,325 Pa (defined, exact value)",
    },
    {
      label: "1 atmosphere",
      value: "1.01325 bar",
    },
    {
      label: "1 atmosphere",
      value: "≈ 14.6959 PSI",
    },
  ],

  sections: [
    {
      title: "What is the atmosphere?",
      paragraphs: [
        "The atmosphere is a pressure unit based on a reference value close to Earth's average sea-level air pressure. The standard atmosphere is not the name for real, variable air pressure — it is the name of an exact reference value fixed by definition.",
        "The actual atmospheric pressure at a given location constantly changes with altitude, temperature and momentary weather conditions. The standard atmosphere, by contrast, is a fixed numerical value used for comparison and calibration, independent of this variability.",
        "The atmosphere unit is mostly used to express absolute pressure — that is, the pressure inside a vessel or system measured against a vacuum (zero absolute pressure) as the reference.",
      ],
    },
    {
      title: "Why was the atmosphere unit created?",
      paragraphs: [
        "After the invention of the mercury barometer in the 17th century, scientists noticed that sea-level air pressure produced a definite, repeatable height of mercury column on the barometer. This observation offered a natural reference point for expressing pressure.",
        "Chemistry and physics experiments needed a common reference pressure to compare the volume, temperature and pressure relationships of gases. A value close to typical sea-level air pressure became a practical starting point for these comparisons.",
        "Over time, this reference value came to be called \"one atmosphere\" and became a standard comparison unit in laboratory measurements, engineering calculations and later in meteorology.",
      ],
    },
    {
      title: "Torricelli and the invention of the mercury barometer",
      paragraphs: [
        "In 1643, the Italian scientist Evangelista Torricelli created the first mercury barometer by filling a glass tube closed at one end with mercury and inverting the open end into a dish of mercury. The mercury in the tube settled at a certain height, leaving a vacuum above it — now known as the Torricellian vacuum.",
        "Torricelli proposed that the height of the mercury column was balanced by the weight of the surrounding air. This idea formed the experimental basis for the view that air has measurable weight and, therefore, pressure.",
        "Torricelli's experiment enabled, for the first time, the systematic and repeatable measurement of atmospheric pressure. This discovery also laid the groundwork for later associating pressure units with the height of a mercury column.",
      ],
    },
    {
      title: "How the standard atmosphere came to be defined",
      paragraphs: [
        "Before 1954, \"one atmosphere\" was defined as the pressure produced by a column of mercury 760 millimeters high at 0°C under standard gravitational acceleration. This definition depended on the conventional density of mercury and on standard gravity.",
        "In 1954, at the 10th General Conference on Weights and Measures (CGPM), the standard atmosphere was freed from a measurement-based definition and given an exact numerical value: precisely 101,325 pascals.",
        "With this change, the standard atmosphere became an internationally fixed reference tied directly to an exact multiple of the pascal, rather than to the physical properties of a substance such as mercury.",
      ],
    },
    {
      title: "How atmospheric pressure changes with altitude",
      paragraphs: [
        "Atmospheric pressure results from the weight of the air column above a given point. As altitude increases, the amount of air remaining above decreases, so pressure decreases too — this relationship is not linear, but roughly exponential.",
        "In 1952, the International Civil Aviation Organization (ICAO) published the International Standard Atmosphere (ISA) model, which assumes a sea-level pressure of 1 standard atmosphere and a temperature of 15°C. This model provides a common reference for altitude measurement and aircraft performance calculations in aviation.",
        "Pressure altimeters calculate approximate flight altitude by comparing outside air pressure with the expected values from the ISA model. This makes the standard atmosphere a reference used not only in laboratory measurements, but directly in everyday air transport.",
      ],
    },
    {
      title: "How is the atmosphere symbol written?",
      paragraphs: [
        "The international symbol for the atmosphere unit is written in lowercase as atm. A space is recommended between the numerical value and the unit symbol: 2 atm is a correct example of usage.",
        "The symbol does not take a plural ending; two atmospheres is written 2 atm, not \"2 atms\". The symbol atm should not be confused with the symbol at, which denotes the technical atmosphere — these two units correspond to different values.",
        "In scientific texts, the full term \"standard atmosphere\" is used, while the symbol atm is used in abbreviations. Whether a pressure value is absolute or gauge is usually stated separately.",
      ],
    },
    {
      title: "Where is the atmosphere used?",
      paragraphs: [
        "In chemistry, standard temperature and pressure (STP) conditions were historically defined with reference to 1 atmosphere of pressure. Many reference table values, such as the molar volume of gases, were calculated against this reference.",
        "In diving and underwater engineering, the extra pressure caused by water depth is commonly expressed in atmospheres; roughly every 10 meters of seawater depth adds pressure close to sea-level air pressure.",
        "In vacuum technology, gas storage systems and industrial pressure-vessel design, the atmosphere unit is often preferred for its intuitive way of expressing absolute pressure. In meteorology, current air pressure is usually compared against hectopascal values close to the standard atmosphere.",
      ],
    },
    {
      title: "The difference between the standard atmosphere and the technical atmosphere",
      paragraphs: [
        "The standard atmosphere (atm) and the technical atmosphere (at) have similar names but are two distinct units based on different definitions. The technical atmosphere is defined as the pressure produced by 1 kilogram-force acting on an area of 1 square centimeter, and equals exactly 98,066.5 pascals.",
        "The standard atmosphere, on the other hand, is a separate reference value derived from barometric measurement, equal to 101,325 pascals. Although the difference between the two units is small (about 3.3%), it is important to specify which one is being used in precise engineering calculations.",
        "In practice, the term \"atmosphere\" usually refers to the standard atmosphere (atm); the technical atmosphere (at) is mostly associated with older European engineering tradition and the kgf/cm² unit.",
      ],
    },
    {
      title: "The atmosphere and other pressure units",
      paragraphs: [
        "1 standard atmosphere is exactly equal to 101,325 Pa and to 1.01325 bar. These values are exact by definition, not approximate measured values.",
        "1 atmosphere corresponds to approximately 14.6959 PSI and approximately 760 millimeters of mercury (mmHg). Because the conventional definition of the millimeter of mercury and the definition of the standard atmosphere were fixed independently of each other, the value 760 mmHg is extremely close to, but not mathematically exactly equal to, 1 atm.",
        "When converting, it is important to note whether a value is absolute or gauge pressure. For example, a tire pressure gauge reading of \"2 atm\" usually indicates gauge pressure relative to the atmosphere; converting it to absolute pressure requires adding the standard atmosphere value separately.",
      ],
    },
  ],

  timeline: [
    {
      year: "1643",
      title: "The mercury barometer is invented",
      description:
        "Evangelista Torricelli built the first barometer showing air pressure by the height of a mercury column.",
    },
    {
      year: "1648",
      title: "The Puy-de-Dôme experiment",
      description:
        "At Blaise Pascal's suggestion, Florin Périer's mountain experiment showed that atmospheric pressure decreases with altitude.",
    },
    {
      year: "1875",
      title: "The Metre Convention",
      description:
        "The treaty establishing the institutional foundation of the CGPM and BIPM for international coordination of measurement units was signed.",
    },
    {
      year: "1952",
      title: "The International Standard Atmosphere (ISA)",
      description:
        "ICAO published the International Standard Atmosphere model, referencing a sea-level pressure of 1 atm.",
    },
    {
      year: "1954",
      title: "The exact definition of the standard atmosphere",
      description:
        "The 10th CGPM defined the standard atmosphere as exactly 101,325 Pa, freeing it from mercury-column measurements.",
    },
    {
      year: "1971",
      title: "The pascal is adopted into the SI",
      description:
        "The 14th CGPM adopted the pascal as the SI pressure unit; the atmosphere remained a non-SI unit accepted for use with SI.",
    },
    {
      year: "1982",
      title: "IUPAC updates the standard-pressure reference",
      description:
        "IUPAC proposed updating the reference pressure in the standard temperature and pressure (STP) definition from 1 atmosphere to 100,000 Pa (1 bar).",
    },
  ],

  questions: [
    {
      question: "How many pascals is 1 atmosphere?",
      answer:
        "1 standard atmosphere is exactly equal to 101,325 Pa. This is an internationally defined exact value, not a measured one.",
    },
    {
      question: "How many bar is 1 atmosphere?",
      answer:
        "1 atmosphere is equal to 1.01325 bar. To convert atmosphere to bar, multiply the value by 1.01325.",
    },
    {
      question: "How many PSI is 1 atmosphere?",
      answer:
        "1 atmosphere is approximately equal to 14.6959 PSI (pound-force per square inch).",
    },
    {
      question:
        "What is the difference between the standard atmosphere and the technical atmosphere?",
      answer:
        "The standard atmosphere (atm) equals 101,325 Pa, while the technical atmosphere (at), based on kilogram-force, equals 98,066.5 Pa. Despite their similar names, they are two distinct units based on different reference values.",
    },
    {
      question: "Is the atmosphere an SI unit?",
      answer:
        "No. The atmosphere is not an official unit of the International System of Units (SI), but it is one of the units — like the bar and mmHg — accepted for use alongside the SI.",
    },
    {
      question: "Is real atmospheric pressure always exactly 1 atm?",
      answer:
        "No. Real air pressure constantly changes with altitude, temperature and weather conditions. The standard atmosphere is the name of a fixed reference value, not of this variable pressure.",
    },
  ],
};
