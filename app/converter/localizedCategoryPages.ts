export type LocalizedCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedCategoryPage = {
  locale: "en";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedCategoryFact[];
  sections: LocalizedCategorySection[];
};

export const englishCategoryPages: LocalizedCategoryPage[] = [
  {
    locale: "en",
    slug: "length",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Length Units and Conversions",
    description:
      "Learn about metric and imperial length units and convert between meters, kilometers, centimeters, millimeters, inches, yards, miles and feet.",

    introduction: [
      "Length is a physical quantity used to describe the distance between two points or the size of an object along a particular direction. It is one of the fundamental quantities used in science, engineering and everyday measurement.",
      "The meter is the base unit of length in the International System of Units. Other metric length units are connected to the meter through decimal prefixes, while imperial and United States customary units use separately defined conversion relationships.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Length",
      },
      {
        label: "SI base unit",
        value: "Meter",
      },
      {
        label: "SI symbol",
        value: "m",
      },
      {
        label: "Dimension symbol",
        value: "L",
      },
      {
        label: "Modern definition",
        value:
          "Distance traveled by light in vacuum during 1/299,792,458 of a second",
      },
    ],

    sections: [
      {
        title: "What is length?",
        paragraphs: [
          "Length describes a one-dimensional extent. Depending on the direction being measured, it may represent distance, height, width, depth, thickness or diameter.",
          "In dimensional analysis, length is represented by the symbol L. Many derived physical quantities, including area, volume, speed, acceleration and pressure, contain a length dimension.",
        ],
      },
      {
        title: "The meter as the SI base unit",
        paragraphs: [
          "The meter is one of the seven base units of the International System of Units. It provides the reference from which metric length units and many derived units are constructed.",
          "The modern meter is linked to the fixed value of the speed of light in vacuum. This makes the definition reproducible without depending on a physical measuring bar or a particular location on Earth.",
        ],
      },
      {
        title: "Metric length units",
        paragraphs: [
          "Metric length units use prefixes that represent powers of ten. One kilometer equals 1,000 meters, one centimeter equals 0.01 meters and one millimeter equals 0.001 meters.",
          "For extremely small measurements, units such as the micrometer and nanometer are used. Large geographical and road distances are commonly expressed in kilometers.",
        ],
      },
      {
        title: "Imperial and US customary length units",
        paragraphs: [
          "The foot, mile, inch and yard are widely recognized non-metric length units. They are used primarily in the United States and in selected applications in the United Kingdom and other countries.",
          "One international foot is exactly 0.3048 meters, while one international mile is exactly 1,609.344 meters. These exact definitions provide reliable conversion factors.",
        ],
      },
      {
        title: "How are length units converted?",
        paragraphs: [
          "A length conversion changes the numerical value and unit while preserving the physical distance being represented. The original value is multiplied by the conversion factor between the two units.",
          "Metric conversions often involve powers of ten. Conversions between metric and imperial systems require defined factors such as 2.54 centimeters per inch or 1,609.344 meters per mile.",
        ],
      },
      {
        title: "Length measurement and uncertainty",
        paragraphs: [
          "Length may be measured using rulers, tape measures, calipers, micrometers, laser distance meters and optical instruments. The appropriate instrument depends on the size of the object and the required precision.",
          "Every physical measurement has uncertainty. Instrument resolution, calibration, temperature, measurement technique and environmental conditions can all affect the reported value.",
        ],
      },
    ],
  },

  {
    locale: "en",
    slug: "mass",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Mass Units and Conversions",
    description:
      "Learn about mass units and convert between kilograms, grams, milligrams, tonnes, pounds and ounces with formulas and conversion tools.",

    introduction: [
      "Mass is a physical quantity associated with the amount of matter and the inertia of an object. The kilogram is the base unit of mass in the International System of Units.",
      "Mass units are used in science, engineering, commerce, medicine, manufacturing and everyday measurements. Metric units use decimal relationships, while units such as the pound belong to imperial and United States customary systems.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Mass",
      },
      {
        label: "SI base unit",
        value: "Kilogram",
      },
      {
        label: "SI symbol",
        value: "kg",
      },
      {
        label: "Dimension symbol",
        value: "M",
      },
      {
        label: "Modern definition",
        value:
          "Defined by fixing the numerical value of the Planck constant",
      },
    ],

    sections: [
      {
        title: "What is mass?",
        paragraphs: [
          "Mass is a fundamental physical quantity related to an object's resistance to acceleration. It also acts as a source of gravitational interaction.",
          "In dimensional analysis, mass is represented by M. It appears in derived quantities such as density, momentum, force, pressure and energy.",
        ],
      },
      {
        title: "Mass and weight are not the same",
        paragraphs: [
          "Mass describes an intrinsic property of an object, while weight is the gravitational force acting on that mass. The mass of an object remains the same when its location changes, but its weight can vary with gravitational acceleration.",
          "In the International System of Units, mass is measured in kilograms and force is measured in newtons. Everyday language often uses the word weight when technically referring to mass.",
        ],
      },
      {
        title: "The kilogram as the SI base unit",
        paragraphs: [
          "The kilogram is the SI base unit of mass. Unlike the names of most base units, its name already contains the metric prefix kilo.",
          "Since 2019, the kilogram has been defined by fixing the numerical value of the Planck constant. This replaced the earlier definition based on a physical metal prototype.",
        ],
      },
      {
        title: "Metric mass units",
        paragraphs: [
          "One kilogram equals 1,000 grams. One gram equals 1,000 milligrams, so one kilogram equals one million milligrams.",
          "Grams are commonly used for food and laboratory materials, while milligrams are suitable for medicines, chemicals and other small quantities.",
        ],
      },
      {
        title: "The pound and other non-metric units",
        paragraphs: [
          "The pound is used in the imperial and United States customary measurement systems. One international avoirdupois pound is exactly 0.45359237 kilograms.",
          "The lb symbol originates from the Latin word libra. Because several historical pound definitions existed, modern calculations should use the standardized international pound.",
        ],
      },
      {
        title: "How are mass units converted?",
        paragraphs: [
          "A mass conversion preserves the physical mass while expressing it with another unit. The numerical value is multiplied by the defined relationship between the source and target units.",
          "Metric mass conversions use decimal factors. Converting between kilograms and pounds requires the exact relationship of one pound to 0.45359237 kilograms.",
        ],
      },
      {
        title: "Measuring mass accurately",
        paragraphs: [
          "Mass is measured with balances and scales designed for different capacities and precision levels. Laboratory balances may detect milligram or microgram differences, while industrial scales measure much larger loads.",
          "Reliable measurements require appropriate calibration, stable environmental conditions and correct handling of the measured material.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "pressure",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Pressure Conversions",
    description:
      "Learn how pressure conversions work and convert between pascal, kilopascal, bar, PSI, atmospheres, mmHg and kgf/cm² with practical formulas and reference relationships.",

    introduction: [
      "Pressure describes how much force is distributed over a given area. It is a central quantity in fluid mechanics, thermodynamics, structural engineering, meteorology and many industrial processes.",
      "The SI derived unit of pressure is the pascal, but practical work often also uses kilopascal, bar and PSI. Understanding the relationships between these units makes it easier to compare readings from scientific instruments, industrial equipment and automotive gauges.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Pressure",
      },
      {
        label: "SI derived unit",
        value: "Pascal",
      },
      {
        label: "SI symbol",
        value: "Pa",
      },
      {
        label: "Dimension formula",
        value: "M L⁻¹ T⁻²",
      },
      {
        label: "Definition of 1 pascal",
        value: "1 newton per square meter",
      },
    ],

    sections: [
      {
        title: "What is pressure?",
        paragraphs: [
          "Pressure is the amount of force applied per unit area. When the same force acts on a smaller area, the pressure increases; when it is spread over a larger area, the pressure decreases.",
          "In physics and engineering, pressure appears in gases, liquids, hydraulic systems, weather measurements, material loading and many other applications where forces act across surfaces.",
        ],
      },
      {
        title: "The pascal as the SI pressure unit",
        paragraphs: [
          "The pascal is the SI derived unit of pressure and is defined as one newton per square meter. This definition connects pressure directly to the SI units of force and area.",
          "Because the pascal is a relatively small unit, larger multiples such as the kilopascal are often used in practical measurement and engineering documents.",
        ],
      },
      {
        title: "Kilopascal, bar and PSI",
        paragraphs: [
          "One kilopascal equals 1,000 pascals, making it convenient for building loads, atmospheric values and many engineering measurements. One bar equals 100,000 pascals and is widely used in compressors, hydraulics and industrial pressure systems.",
          "PSI, or pound-force per square inch, belongs to Anglo-American engineering usage and remains common for tire pressure, hydraulic equipment and service manuals. These units coexist in practice, so accurate conversions are essential.",
        ],
      },
      {
        title: "How are pressure units converted?",
        paragraphs: [
          "A pressure conversion preserves the same physical pressure while expressing it with another unit. The numerical value changes according to the defined factor between the two units.",
          "For example, one bar equals 100 kilopascals, and one PSI equals 6,894.757293168 pascals. Using exact factors helps avoid cumulative error in engineering calculations and reporting.",
        ],
      },
      {
        title: "Where are pressure units used?",
        paragraphs: [
          "Pressure units are used in weather observations, gas cylinders, pumps, boilers, hydraulic circuits, pneumatic systems, process engineering and automotive maintenance. The preferred unit often depends on industry standards and local practice.",
          "Scientific and regulatory documents often prefer pascals or kilopascals, while equipment labels and gauges may use bar or PSI. This is why a clear reference table and reliable converter are useful.",
        ],
      },
    ],
  },
];

export function findEnglishCategoryPage(slug: string) {
  return englishCategoryPages.find(
    (categoryPage) => categoryPage.slug === slug
  );
}

export function findEnglishCategoryPageByTurkishSlug(
  sourceSlug: string
) {
  return englishCategoryPages.find(
    (categoryPage) =>
      categoryPage.sourceSlug === sourceSlug
  );
}
