import type { UnitPage } from "./unitPages";
import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type LocalizedUnitPage = UnitPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
};

export const englishUnitPages: LocalizedUnitPage[] = [
  {
    locale: "en",
    sourceSlug: "metre",
    slug: "meter",
    category: "uzunluk",
    categoryName: "Length",
    unit: "m",
    name: "Meter",
    symbol: "m",
    shortDescription:
      "The meter is the base unit of length in the International System of Units. It is used to express distance and size across science, engineering and everyday life.",
    historySummary:
      "The meter was created as part of the late eighteenth-century effort to establish a universal measurement system. Today it is defined through the distance traveled by light in vacuum over a specified time interval.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI unit of length",
    commonUses: "Construction, science, manufacturing and general measurement",
  },
  {
    locale: "en",
    sourceSlug: "kilometre",
    slug: "kilometer",
    category: "uzunluk",
    categoryName: "Length",
    unit: "km",
    name: "Kilometer",
    symbol: "km",
    shortDescription:
      "The kilometer is a unit of length equal to 1,000 meters. It is commonly used for roads, cities and geographical distances.",
    historySummary:
      "The kilometer emerged naturally within the decimal metric system and became a standard way to express larger terrestrial distances.",
    measurementSystem: "International System of Units (SI, multiple unit)",
    siEquivalent: "1 km = 1000 m",
    commonUses: "Road distances, geography, mapping and infrastructure",
  },
  {
    locale: "en",
    sourceSlug: "santimetre",
    slug: "centimeter",
    category: "uzunluk",
    categoryName: "Length",
    unit: "cm",
    name: "Centimeter",
    symbol: "cm",
    shortDescription:
      "The centimeter is a unit of length equal to one hundredth of a meter. It is widely used for everyday dimensions and small objects.",
    historySummary:
      "The centimeter developed as a decimal subdivision of the meter and became a practical unit for shorter lengths in education, commerce and daily life.",
    measurementSystem: "International System of Units (SI, subunit)",
    siEquivalent: "1 cm = 0.01 m",
    commonUses: "Furniture, clothing, anthropometry and daily measurements",
  },
  {
    locale: "en",
    sourceSlug: "milimetre",
    slug: "millimeter",
    category: "uzunluk",
    categoryName: "Length",
    unit: "mm",
    name: "Millimeter",
    symbol: "mm",
    shortDescription:
      "The millimeter is a unit of length equal to one thousandth of a meter. It is widely used in technical and precision work.",
    historySummary:
      "The millimeter became especially important as manufacturing and engineering required tighter tolerances and repeatable precision.",
    measurementSystem: "International System of Units (SI, subunit)",
    siEquivalent: "1 mm = 0.001 m",
    commonUses: "Mechanical production, technical drawing and machining tolerances",
  },
  {
    locale: "en",
    sourceSlug: "mil",
    slug: "mile",
    category: "uzunluk",
    categoryName: "Length",
    unit: "mi",
    name: "Mile",
    symbol: "mi",
    shortDescription:
      "The mile is a non-metric unit of length commonly used in the United States and the United Kingdom. One international mile is exactly 1,609.344 meters.",
    historySummary:
      "The mile traces back to Roman distance conventions and later evolved through regional variants before the international mile was standardized in 1959.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 mi = 1609.344 m",
    commonUses: "Road distances, navigation and field-scale measurement",
  },
  {
    locale: "en",
    sourceSlug: "fit",
    slug: "foot",
    category: "uzunluk",
    categoryName: "Length",
    unit: "ft",
    name: "Foot",
    symbol: "ft",
    shortDescription:
      "The foot is a unit of length used in imperial and United States customary measurement systems. One international foot is exactly 0.3048 meters.",
    historySummary:
      "The foot developed from older body-based measurement traditions. Its modern international value was fixed in 1959.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 ft = 0.3048 m",
    commonUses: "Architecture, elevations, aviation and site work",
  },
  {
    locale: "en",
    sourceSlug: "inc",
    slug: "inch",
    category: "uzunluk",
    categoryName: "Length",
    unit: "in",
    name: "Inch",
    symbol: "in",
    shortDescription:
      "The inch is a short unit of length used in imperial and United States customary systems. One inch is exactly 2.54 centimeters.",
    historySummary:
      "The inch developed from older local measures tied to the body. The modern international inch has been fixed at exactly 25.4 millimeters since 1959.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 in = 25.4 mm = 2.54 cm",
    commonUses: "Displays, piping, fasteners and technical catalogs",
  },
  {
    locale: "en",
    sourceSlug: "yarda",
    slug: "yard",
    category: "uzunluk",
    categoryName: "Length",
    unit: "yd",
    name: "Yard",
    symbol: "yd",
    shortDescription:
      "The yard is a unit of length used in imperial and United States customary systems. One yard is exactly 0.9144 meters.",
    historySummary:
      "The yard grew out of older land and body-related measuring traditions. Its modern value is defined through international agreement.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 yd = 0.9144 m",
    commonUses: "Sports fields, textiles, landscaping and site layout",
  },
  {
    locale: "en",
    sourceSlug: "kilogram",
    slug: "kilogram",
    category: "kutle",
    categoryName: "Mass",
    unit: "kg",
    name: "Kilogram",
    symbol: "kg",
    shortDescription:
      "The kilogram is the base unit of mass in the International System of Units. It is central to science, commerce and engineering.",
    historySummary:
      "The kilogram was first related to water, then to a physical prototype, and since 2019 has been defined by fixing the numerical value of the Planck constant.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI unit of mass",
    commonUses: "Commerce, transport, laboratories and process calculations",
  },
  {
    locale: "en",
    sourceSlug: "gram",
    slug: "gram",
    category: "kutle",
    categoryName: "Mass",
    unit: "g",
    name: "Gram",
    symbol: "g",
    shortDescription:
      "The gram is a unit of mass equal to one thousandth of a kilogram. It is widely used for food, laboratory materials and small quantities.",
    historySummary:
      "The gram became established as a smaller metric mass unit during the development of the decimal measurement system.",
    measurementSystem: "International System of Units (SI, subunit)",
    siEquivalent: "1 g = 0.001 kg",
    commonUses: "Food, chemistry, pharmacy and precise weighing",
  },
  {
    locale: "en",
    sourceSlug: "miligram",
    slug: "milligram",
    category: "kutle",
    categoryName: "Mass",
    unit: "mg",
    name: "Milligram",
    symbol: "mg",
    shortDescription:
      "The milligram is a very small unit of mass equal to one thousandth of a gram. It is essential in medicine and laboratory work.",
    historySummary:
      "Its importance grew with the rise of analytical balances, dosage control and laboratory precision.",
    measurementSystem: "International System of Units (SI, subunit)",
    siEquivalent: "1 mg = 0.000001 kg",
    commonUses: "Medicine doses, analytical chemistry and precision formulations",
  },
  {
    locale: "en",
    sourceSlug: "pound",
    slug: "pound",
    category: "kutle",
    categoryName: "Mass",
    unit: "lb",
    name: "Pound",
    symbol: "lb",
    shortDescription:
      "The pound is a unit of mass used in imperial and United States customary systems. One international pound is exactly 0.45359237 kilograms.",
    historySummary:
      "The pound and its lb symbol derive from the Roman libra. The modern avoirdupois pound was internationally standardized in 1959.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 lb = 0.45359237 kg",
    commonUses: "Retail, shipping, nutrition labels and industrial catalogs",
  },
  {
    locale: "en",
    sourceSlug: "ton",
    slug: "tonne",
    category: "kutle",
    categoryName: "Mass",
    unit: "ton",
    name: "Tonne",
    symbol: "t",
    shortDescription:
      "The metric tonne is a large mass unit equal to 1,000 kilograms. It is widely used for heavy loads and industrial quantities.",
    historySummary:
      "The tonne became a practical way to express large metric masses in logistics, trade and heavy industry.",
    measurementSystem: "Metric system, accepted with SI",
    siEquivalent: "1 t = 1000 kg",
    commonUses: "Logistics, production, raw materials and heavy industry",
  },
  {
    locale: "en",
    sourceSlug: "ons",
    slug: "ounce",
    category: "kutle",
    categoryName: "Mass",
    unit: "oz",
    name: "Ounce",
    symbol: "oz",
    shortDescription:
      "The ounce is a small mass unit used in imperial and United States customary systems. One avoirdupois ounce equals 28.349523125 grams.",
    historySummary:
      "Different ounce definitions existed historically, but the modern avoirdupois ounce is standardized through its 1/16 relationship with the pound.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 oz = 28.349523125 g",
    commonUses: "Packaging, food products and lightweight trade quantities",
  },
  {
    locale: "en",
    sourceSlug: "pascal",
    slug: "pascal",
    category: "basinc",
    categoryName: "Pressure",
    unit: "Pa",
    name: "Pascal",
    symbol: "Pa",
    shortDescription:
      "The pascal is the SI derived unit of pressure. It is defined by the relationship 1 Pa = 1 N/m².",
    historySummary:
      "Named after Blaise Pascal, the unit became the standard SI reference for pressure across science and engineering.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI pressure unit, 1 Pa = 1 N/m²",
    commonUses: "Scientific calculations, materials analysis and reference conversions",
  },
  {
    locale: "en",
    sourceSlug: "kilopascal",
    slug: "kilopascal",
    category: "basinc",
    categoryName: "Pressure",
    unit: "kPa",
    name: "Kilopascal",
    symbol: "kPa",
    shortDescription:
      "The kilopascal is a pressure unit equal to 1,000 pascals. It provides more readable numbers for practical engineering work.",
    historySummary:
      "The kilopascal became common in field measurements and engineering documents where single pascals would be too small for routine reporting.",
    measurementSystem: "International System of Units (SI, multiple unit)",
    siEquivalent: "1 kPa = 1000 Pa",
    commonUses: "HVAC, structural engineering, tire pressure and process data",
  },
  {
    locale: "en",
    sourceSlug: "bar",
    slug: "bar",
    category: "basinc",
    categoryName: "Pressure",
    unit: "bar",
    name: "Bar",
    symbol: "bar",
    shortDescription:
      "The bar is a pressure unit equal to 100,000 pascals. It is widely used in industrial and service equipment.",
    historySummary:
      "The bar became popular because it expresses many practical pressure ranges compactly. It remains common even though it is not an SI unit.",
    measurementSystem: "Non-SI metric engineering unit",
    siEquivalent: "1 bar = 100000 Pa",
    commonUses: "Compressors, hydraulics, pneumatics and service gauges",
  },
  {
    locale: "en",
    sourceSlug: "psi",
    slug: "psi",
    category: "basinc",
    categoryName: "Pressure",
    unit: "psi",
    name: "PSI",
    symbol: "psi",
    shortDescription:
      "PSI stands for pound-force per square inch. It is a common pressure unit in Anglo-American technical practice.",
    historySummary:
      "PSI remained deeply embedded in automotive, hydraulic and field-service traditions even after SI usage spread more widely.",
    measurementSystem: "Imperial and US engineering usage",
    siEquivalent: "1 psi = 6894.757293168 Pa",
    commonUses: "Tire pressure, hydraulic systems and technical service work",
  },
  {
    locale: "en",
    sourceSlug: "milimetre-civa",
    slug: "millimeter-of-mercury",
    category: "basinc",
    categoryName: "Pressure",
    unit: "mmHg",
    name: "Millimeter of Mercury",
    symbol: "mmHg",
    shortDescription:
      "The millimeter of mercury is a pressure unit based on the height of a mercury column. It remains historically important in medicine and laboratory practice.",
    historySummary:
      "mmHg became established through mercury manometers and retained long-term use in blood pressure readings and vacuum-related references.",
    measurementSystem: "Non-SI historical engineering and medical unit",
    siEquivalent: "1 mmHg = 133.322387415 Pa",
    commonUses: "Blood pressure readings, laboratory manometers and vacuum references",
  },
  {
    locale: "en",
    sourceSlug: "kilogram-kuvvet-santimetrekare",
    slug: "kilogram-force-per-square-centimeter",
    category: "basinc",
    categoryName: "Pressure",
    unit: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
    name: "Kilogram-Force per Square Centimeter",
    symbol: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
    shortDescription:
      "Kilogram-force per square centimeter is a non-SI pressure unit derived from force distributed over area. It still appears on older gauges and service documents.",
    historySummary:
      "The unit became common when kilogram-force notation was widely used in analog instrumentation, pumps, boilers and legacy mechanical documentation.",
    measurementSystem: "Non-SI metric engineering unit",
    siEquivalent: "1 kgf/cm² = 98066.5 Pa = 0.980665 bar",
    commonUses: "Legacy pump and boiler gauges, service manuals and analog equipment",
  },
];

export function findEnglishUnitPage(
  category: string,
  unit: string
) {
  return englishUnitPages.find(
    (page) =>
      page.category === category && page.unit === unit
  );
}

export function findEnglishUnitPageBySlug(slug: string) {
  return englishUnitPages.find((page) => page.slug === slug);
}

export function findEnglishUnitPageByTurkishSlug(
  sourceSlug: string
) {
  return englishUnitPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
