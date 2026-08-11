import type { UnitArticle } from "./unitArticles";
import { kilometerArticle } from "./articles/english/kilometerArticle";

const meterArticle: UnitArticle = {
  slug: "meter",

  introduction: [
    "The meter is the base unit of length in the International System of Units and is represented by the symbol m. It is used in everyday measurements, construction, engineering, scientific research, manufacturing and geographical work.",
    "The meter is no longer defined by the length of a physical bar. Its modern definition is based on the speed of light in vacuum and the scientific definition of the second. This allows national measurement laboratories to realize the meter with extremely high accuracy.",
  ],

  keyFacts: [
    {
      label: "Unit name",
      value: "Meter",
    },
    {
      label: "Symbol",
      value: "m",
    },
    {
      label: "Physical quantity",
      value: "Length",
    },
    {
      label: "Measurement system",
      value: "International System of Units (SI)",
    },
    {
      label: "One meter",
      value: "100 centimeters",
    },
    {
      label: "One kilometer",
      value: "1,000 meters",
    },
    {
      label: "Dimension symbol",
      value: "L",
    },
  ],

  sections: [
    {
      title: "What is a meter?",
      paragraphs: [
        "The meter is the SI base unit used to express length and distance. The length of an object, the distance between two points, the height of a building and the dimensions of a room may all be expressed in meters.",
        "The meter also provides the foundation for units such as the kilometer, centimeter and millimeter. One centimeter is one hundredth of a meter, one millimeter is one thousandth of a meter and one kilometer is equal to 1,000 meters.",
        "Because the metric system uses decimal relationships, conversions between meter-based units can usually be performed using powers of ten.",
      ],
    },
    {
      title: "Why was the meter created?",
      paragraphs: [
        "Before the metric system, regions used units based on feet, arms, paces and other local standards. The value of a unit could differ between countries, cities and trades, even when the same unit name was used.",
        "These inconsistencies caused difficulties in commerce, taxation, construction and scientific communication. During the late eighteenth century, the idea of a universal measurement system based on nature became increasingly important.",
        "The proposed standard was intended to be independent of a particular ruler, country or human body. This principle became one of the foundations of the metric system.",
      ],
    },
    {
      title: "The original definition of the meter",
      paragraphs: [
        "In 1791, the meter was conceived as one ten-millionth of the distance from the equator to the North Pole along a meridian passing through Paris.",
        "Pierre Méchain and Jean-Baptiste Delambre measured the section of the Paris meridian between Dunkirk and Barcelona. Their work took several years and was complicated by the scientific, geographical and political conditions of the period.",
        "The results were used to produce a platinum meter standard in 1799. This artifact became known as the Metre des Archives.",
      ],
    },
    {
      title: "Physical meter prototypes",
      paragraphs: [
        "As international science and trade expanded during the nineteenth century, countries required more consistent measurement standards. The Metre Convention of 1875 established a framework for international cooperation in metrology.",
        "In 1889, the meter was defined by the distance between two engraved lines on an international platinum-iridium prototype under specified conditions.",
        "A physical artifact can be damaged, contaminated or altered by extremely small dimensional changes. Increasing demands for precision encouraged scientists to replace the artifact with a definition based on reproducible physical phenomena.",
      ],
    },
    {
      title: "The wavelength definition",
      paragraphs: [
        "In 1960, the international prototype was replaced by a definition based on the wavelength of radiation produced by a specified transition in krypton-86 atoms.",
        "This allowed appropriately equipped laboratories to reproduce the length standard without relying on a single metal bar stored in one location.",
        "Developments in lasers, atomic clocks and precision time measurement later made it possible to connect length to an even more stable physical constant.",
      ],
    },
    {
      title: "The modern scientific definition of the meter",
      paragraphs: [
        "In 1983, the meter was defined as the length of the path traveled by light in vacuum during a time interval of 1/299,792,458 of a second.",
        "Under this definition, the speed of light in vacuum has the fixed exact value of 299,792,458 meters per second. The speed of light is therefore not measured in order to determine the meter; its fixed value is used as part of the definition.",
        "The revised International System of Units introduced in 2019 retained this approach. The meter remains connected to the fixed numerical value of the speed of light and to the realization of the second.",
      ],
    },
    {
      title: "How is the meter realized in a laboratory?",
      paragraphs: [
        "A definition states what a unit means, while realization describes how the unit is produced in practice. Modern realizations of the meter use stabilized lasers, interferometry and highly accurate frequency or time measurements.",
        "Interferometry uses the wave properties of light to compare distances with known wavelengths. National metrology institutes maintain measurement standards and provide traceability for laboratories, industries and calibration organizations.",
        "The achievable uncertainty depends on the equipment, environmental control, optical setup and the length being measured.",
      ],
    },
    {
      title: "How should the meter symbol be written?",
      paragraphs: [
        "The international symbol for the meter is the lowercase letter m. A space should normally be placed between the numerical value and the unit symbol, as in 5 m.",
        "Unit symbols do not take plural forms. Five meters is written as 5 m, not 5 ms. A unit symbol is followed by punctuation only when required by the sentence.",
        "The symbols m, m² and m³ represent different physical quantities. The meter measures length, the square meter measures area and the cubic meter measures volume.",
      ],
    },
    {
      title: "Where is the meter used?",
      paragraphs: [
        "The meter is used in construction, architecture, mechanical engineering, surveying, sports, textile production, manufacturing and everyday measurements.",
        "Smaller units such as centimeters, millimeters, micrometers and nanometers are more convenient for short lengths. Kilometers are generally preferred for roads and geographical distances.",
        "Using standardized SI units allows measurements made by scientists, engineers and organizations in different countries to be compared consistently.",
      ],
    },
    {
      title: "Meter conversions",
      paragraphs: [
        "One meter is equal to 100 centimeters, 1,000 millimeters and 0.001 kilometers. It is approximately equal to 3.28084 feet and 39.3701 inches.",
        "One international foot is exactly 0.3048 meters, while one international mile is exactly 1,609.344 meters. A nautical mile is exactly 1,852 meters.",
        "When converting to a smaller unit, the numerical value generally becomes larger. When converting to a larger unit, such as the kilometer, the numerical value generally becomes smaller.",
      ],
    },
    {
      title: "Common meter measurement mistakes",
      paragraphs: [
        "A meter and a square meter do not represent the same quantity. A meter expresses one-dimensional length, while a square meter expresses two-dimensional area.",
        "A meter should not be confused with a nautical mile. The nautical mile is a separate unit used primarily in navigation and aviation.",
        "Length cannot be directly converted into mass, time or temperature. A meter can be converted only into another compatible unit of length unless an additional physical relationship is provided.",
      ],
    },
    {
      title: "Measurement uncertainty and traceability",
      paragraphs: [
        "Every physical measurement has uncertainty. Instrument resolution, calibration, temperature, alignment, material expansion and measurement technique can influence a reported length.",
        "Measurement traceability creates a documented chain of calibrations connecting an instrument to recognized national or international standards.",
        "In precision engineering, a length value should be reported with its unit, appropriate number of significant figures and, when necessary, an uncertainty statement.",
      ],
    },
  ],

  timeline: [
    {
      year: "1791",
      title: "A natural standard was proposed",
      description:
        "The meter was proposed as one ten-millionth of the meridian distance between the equator and the North Pole.",
    },
    {
      year: "1799",
      title: "Metre des Archives",
      description:
        "A platinum physical meter standard was produced using the results of the meridian measurements.",
    },
    {
      year: "1875",
      title: "Metre Convention",
      description:
        "An international framework for coordinating measurement standards was established.",
    },
    {
      year: "1889",
      title: "International prototype",
      description:
        "A platinum-iridium prototype became the international definition of the meter.",
    },
    {
      year: "1960",
      title: "Krypton-86 definition",
      description:
        "The meter was redefined using the wavelength of radiation associated with krypton-86.",
    },
    {
      year: "1983",
      title: "Definition based on light speed",
      description:
        "The meter was defined using the distance traveled by light in vacuum during a specified time interval.",
    },
    {
      year: "2019",
      title: "Revised SI",
      description:
        "The revised SI retained the definition connected to the fixed numerical value of the speed of light.",
    },
  ],

  questions: [
    {
      question: "How many centimeters are in one meter?",
      answer:
        "One meter is equal to 100 centimeters. Multiply a meter value by 100 to convert it to centimeters.",
    },
    {
      question: "How many millimeters are in one meter?",
      answer:
        "One meter is equal to 1,000 millimeters. Multiply a meter value by 1,000 to convert it to millimeters.",
    },
    {
      question: "How many kilometers are in one meter?",
      answer:
        "One meter is equal to 0.001 kilometers. Divide a meter value by 1,000 to convert it to kilometers.",
    },
    {
      question: "Who invented the meter?",
      answer:
        "The meter was not invented by one person at a single moment. It developed through measurement and standardization work carried out by French scientists and institutions. Pierre Méchain and Jean-Baptiste Delambre played important roles in the original meridian survey.",
    },
    {
      question: "What is the current definition of the meter?",
      answer:
        "The meter is the length of the path traveled by light in vacuum during a time interval of 1/299,792,458 of a second.",
    },
    {
      question: "Why is the meter represented by m?",
      answer:
        "The lowercase letter m is the internationally accepted SI unit symbol for the meter. It is written without a plural ending.",
    },
    {
      question: "Is a meter the same as a square meter?",
      answer:
        "No. A meter is a unit of length, while a square meter is a unit of area.",
    },
    {
      question: "How many feet are in one meter?",
      answer:
        "One meter is approximately equal to 3.28084 feet.",
    },
  ],
};

export const englishUnitArticles: UnitArticle[] = [
  meterArticle,
  kilometerArticle,
];

export function findEnglishUnitArticle(slug: string) {
  return englishUnitArticles.find(
    (article) => article.slug === slug
  );
}