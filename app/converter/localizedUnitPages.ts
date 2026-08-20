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
  {
    locale: "en",
    sourceSlug: "metrekare",
    slug: "square-meter",
    category: "alan",
    categoryName: "Area",
    unit: "m²",
    name: "Square Meter",
    symbol: "m²",
    shortDescription:
      "The square meter is the SI derived unit of area. It is the standard reference for surfaces, floor area and section sizing.",
    historySummary:
      "As the two-dimensional extension of the meter, the square meter became the standard metric area unit for science, construction and engineering.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI area unit",
    commonUses: "Architecture, floor area, panels and section calculations",
  },
  {
    locale: "en",
    sourceSlug: "hektar",
    slug: "hectare",
    category: "alan",
    categoryName: "Area",
    unit: "ha",
    name: "Hectare",
    symbol: "ha",
    shortDescription:
      "The hectare is a large area unit widely used for land measurement. One hectare is exactly 10,000 square meters.",
    historySummary:
      "The hectare became a practical metric land unit because it expresses large plots more compactly than square meters.",
    measurementSystem: "Metric system, accepted with SI",
    siEquivalent: "1 ha = 10000 m²",
    commonUses: "Agricultural land, zoning and large plot records",
  },
  {
    locale: "en",
    sourceSlug: "fitkare",
    slug: "square-foot",
    category: "alan",
    categoryName: "Area",
    unit: "ft²",
    name: "Square Foot",
    symbol: "ft²",
    shortDescription:
      "The square foot is an area unit used in imperial and US customary systems. One square foot is about 0.092903 square meters.",
    historySummary:
      "It developed naturally from the widespread use of the foot in building, real estate and spatial description.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 ft² = 0.092903 m²",
    commonUses: "Real estate, room area and selected construction documents",
  },
  {
    locale: "en",
    sourceSlug: "litre",
    slug: "liter",
    category: "hacim",
    categoryName: "Volume",
    unit: "L",
    name: "Liter",
    symbol: "L",
    shortDescription:
      "The liter is a widely used volume unit for liquids and capacities. One liter equals 0.001 cubic meters.",
    historySummary:
      "The liter became a practical metric volume unit that bridges daily use and technical work.",
    measurementSystem: "Metric system, accepted with SI",
    siEquivalent: "1 L = 0.001 m³",
    commonUses: "Liquids, tank capacities, lab containers and daily measurements",
  },
  {
    locale: "en",
    sourceSlug: "metrekup",
    slug: "cubic-meter",
    category: "hacim",
    categoryName: "Volume",
    unit: "m³",
    name: "Cubic Meter",
    symbol: "m³",
    shortDescription:
      "The cubic meter is the SI derived unit of volume. It is the standard reference for larger capacities and technical volumes.",
    historySummary:
      "As the three-dimensional extension of the meter, the cubic meter became the standard scientific and engineering unit of volume.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI volume unit",
    commonUses: "Storage volume, room volume, process vessels and flow calculations",
  },
  {
    locale: "en",
    sourceSlug: "mililitre",
    slug: "milliliter",
    category: "hacim",
    categoryName: "Volume",
    unit: "mL",
    name: "Milliliter",
    symbol: "mL",
    shortDescription:
      "The milliliter is a small volume unit equal to one thousandth of a liter. It is common in precise liquid measurements.",
    historySummary:
      "It became essential in medicine, laboratory work and small-volume handling where finer resolution is needed.",
    measurementSystem: "Metric system, accepted with SI",
    siEquivalent: "1 mL = 0.000001 m³",
    commonUses: "Medicine doses, lab samples and small liquid quantities",
  },
  {
    locale: "en",
    sourceSlug: "santigrat",
    slug: "celsius",
    category: "sicaklik",
    categoryName: "Temperature",
    unit: "C",
    name: "Celsius",
    symbol: "°C",
    shortDescription:
      "Celsius is one of the most widely used temperature scales in daily and engineering practice.",
    historySummary:
      "The Celsius scale became popular because it provides an intuitive reference tied to water phase-change temperatures.",
    measurementSystem: "Temperature scale used alongside SI",
    siEquivalent: "For temperature difference, 1 °C = 1 K",
    commonUses: "Weather, HVAC, process control and daily temperatures",
  },
  {
    locale: "en",
    sourceSlug: "fahrenhayt",
    slug: "fahrenheit",
    category: "sicaklik",
    categoryName: "Temperature",
    unit: "F",
    name: "Fahrenheit",
    symbol: "°F",
    shortDescription:
      "Fahrenheit is a temperature scale still widely used in the United States.",
    historySummary:
      "It became firmly established in Anglo-American practice and remains common in weather, household and some technical contexts.",
    measurementSystem: "Imperial and US customary temperature scale",
    siEquivalent: "For temperature difference, 1 °F = 5/9 K",
    commonUses: "US weather data, household temperatures and selected technical references",
  },
  {
    locale: "en",
    sourceSlug: "kelvin",
    slug: "kelvin",
    category: "sicaklik",
    categoryName: "Temperature",
    unit: "K",
    name: "Kelvin",
    symbol: "K",
    shortDescription:
      "Kelvin is the SI base unit of thermodynamic temperature.",
    historySummary:
      "The Kelvin scale was developed to express absolute temperature starting from absolute zero.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI temperature unit",
    commonUses: "Thermodynamics, scientific work and absolute-temperature analysis",
  },
  {
    locale: "en",
    sourceSlug: "saniye",
    slug: "second",
    category: "zaman",
    categoryName: "Time",
    unit: "s",
    name: "Second",
    symbol: "s",
    shortDescription:
      "The second is the SI base unit of time. It underpins duration, speed and rate calculations.",
    historySummary:
      "The modern second is defined from an atomic transition frequency, giving it high precision and universal reproducibility.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI time unit",
    commonUses: "Experiments, motion analysis, data logging and timing",
  },
  {
    locale: "en",
    sourceSlug: "dakika",
    slug: "minute",
    category: "zaman",
    categoryName: "Time",
    unit: "min",
    name: "Minute",
    symbol: "min",
    shortDescription:
      "The minute is a practical time unit equal to 60 seconds.",
    historySummary:
      "The minute has long served as a convenient intermediate unit between seconds and hours in daily and technical scheduling.",
    measurementSystem: "Non-SI unit used with SI",
    siEquivalent: "1 min = 60 s",
    commonUses: "Meetings, short durations, exercise and process cycles",
  },
  {
    locale: "en",
    sourceSlug: "saat",
    slug: "hour",
    category: "zaman",
    categoryName: "Time",
    unit: "h",
    name: "Hour",
    symbol: "h",
    shortDescription:
      "The hour is a widely used time unit equal to 3,600 seconds.",
    historySummary:
      "The hour grew out of long-standing civil and astronomical timekeeping traditions and remains essential in planning and operations.",
    measurementSystem: "Non-SI unit used with SI",
    siEquivalent: "1 h = 3600 s",
    commonUses: "Work shifts, travel, energy use and daily schedules",
  },
  {
    locale: "en",
    sourceSlug: "metre-saniye",
    slug: "meter-per-second",
    category: "hiz",
    categoryName: "Speed",
    unit: "m/s",
    name: "Meter per Second",
    symbol: "m/s",
    shortDescription:
      "The meter per second is the SI derived unit of speed. It is the main reference for science and engineering.",
    historySummary:
      "Derived from the meter and second, it became the standard scientific language for linear speed.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI speed unit",
    commonUses: "Fluid flow, mechanical motion and scientific measurement",
  },
  {
    locale: "en",
    sourceSlug: "kilometre-saat",
    slug: "kilometer-per-hour",
    category: "hiz",
    categoryName: "Speed",
    unit: "km/h",
    name: "Kilometer per Hour",
    symbol: "km/h",
    shortDescription:
      "Kilometer per hour is a practical speed unit widely used in road transport.",
    historySummary:
      "It became standard with the spread of road transport and metric traffic systems.",
    measurementSystem: "Metric practical use",
    siEquivalent: "1 km/h ≈ 0.277778 m/s",
    commonUses: "Vehicle speeds, road signs and field measurements",
  },
  {
    locale: "en",
    sourceSlug: "mil-saat",
    slug: "mile-per-hour",
    category: "hiz",
    categoryName: "Speed",
    unit: "mph",
    name: "Mile per Hour",
    symbol: "mph",
    shortDescription:
      "Miles per hour is a speed unit still common in the United States and other imperial-road contexts.",
    historySummary:
      "The unit developed from the established road use of miles and hours in Anglo-American transport practice.",
    measurementSystem: "Imperial and US customary systems",
    siEquivalent: "1 mph = 1.609344 km/h",
    commonUses: "Road speed, automotive work and transport reporting",
  },
  {
    locale: "en",
    sourceSlug: "joule",
    slug: "joule",
    category: "enerji",
    categoryName: "Energy and Power",
    unit: "J",
    name: "Joule",
    symbol: "J",
    shortDescription:
      "The joule is the SI derived unit of energy. It is used for work, heat and energy quantities.",
    historySummary:
      "The joule became the standard SI reference for energy as mechanics and thermodynamics were unified in modern measurement.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI energy unit",
    commonUses: "Thermodynamics, energy balances and scientific calculations",
  },
  {
    locale: "en",
    sourceSlug: "kilovatsaat",
    slug: "kilowatt-hour",
    category: "enerji",
    categoryName: "Energy and Power",
    unit: "kWh",
    name: "Kilowatt-hour",
    symbol: "kWh",
    shortDescription:
      "The kilowatt-hour is a widely used practical energy unit for electrical consumption.",
    historySummary:
      "It became central to utility metering and billing because it connects power and operating time in a convenient way.",
    measurementSystem: "Technical and commercial energy unit",
    siEquivalent: "1 kWh = 3.6 MJ",
    commonUses: "Electricity bills, battery storage and energy comparisons",
  },
  {
    locale: "en",
    sourceSlug: "watt",
    slug: "watt",
    category: "enerji",
    categoryName: "Energy and Power",
    unit: "W",
    name: "Watt",
    symbol: "W",
    shortDescription:
      "The watt is the SI derived unit of power. It expresses the rate of energy transfer.",
    historySummary:
      "The watt became the standard language for power ratings across electrical and mechanical engineering.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI power unit",
    commonUses: "Device ratings, electrical loads and motor power",
  },
  {
    locale: "en",
    sourceSlug: "kilowatt",
    slug: "kilowatt",
    category: "enerji",
    categoryName: "Energy and Power",
    unit: "kW",
    name: "Kilowatt",
    symbol: "kW",
    shortDescription:
      "The kilowatt is a power unit equal to 1,000 watts. It is widely used for equipment and system capacity.",
    historySummary:
      "The kilowatt became common because many practical machine and utility ratings are easier to read in thousands of watts.",
    measurementSystem: "International System of Units (SI, multiple unit)",
    siEquivalent: "1 kW = 1000 W",
    commonUses: "Panels, HVAC equipment, generators and machine ratings",
  },
  {
    locale: "en",
    sourceSlug: "beygirgucu",
    slug: "horsepower",
    category: "enerji",
    categoryName: "Energy and Power",
    unit: "hp",
    name: "Horsepower",
    symbol: "hp",
    shortDescription:
      "Horsepower is a traditional unit of power, most often used to express the output of vehicle and machine engines. The metric horsepower used here equals 735.49875 watts.",
    historySummary:
      "Horsepower was introduced by James Watt in the 18th century to compare the output of steam engines with the work of draft horses; the metric version later became standard across the automotive industry outside the US.",
    measurementSystem: "Metric horsepower family (PS/CV, non-SI)",
    siEquivalent: "1 hp (metric) = 735.49875 W",
    commonUses: "Car and motorcycle engine power, technical spec sheets and vehicle comparisons",
  },
  {
    locale: "en",
    sourceSlug: "metrekup-saat",
    slug: "cubic-meter-per-hour",
    category: "debi",
    categoryName: "Flow Rate",
    unit: "m³/h",
    name: "Cubic Meter per Hour",
    symbol: "m³/h",
    shortDescription:
      "Cubic meters per hour is a practical volumetric flow unit for building and process systems.",
    historySummary:
      "It became common in HVAC, water and process design because many installation capacities are read over hourly intervals.",
    measurementSystem: "Technical volumetric-flow unit",
    siEquivalent: "1 m³/h ≈ 0.000277778 m³/s",
    commonUses: "Pump selection, HVAC and water-system flow rates",
  },
  {
    locale: "en",
    sourceSlug: "litre-dakika",
    slug: "liter-per-minute",
    category: "debi",
    categoryName: "Flow Rate",
    unit: "L/min",
    name: "Liter per Minute",
    symbol: "L/min",
    shortDescription:
      "Liters per minute provides a readable flow unit for small and medium systems.",
    historySummary:
      "It became widespread in service, laboratory and smaller distribution systems where minute-based readings are easier to interpret.",
    measurementSystem: "Technical volumetric-flow unit",
    siEquivalent: "1 L/min ≈ 0.0000166667 m³/s",
    commonUses: "Water lines, device feeds and small process streams",
  },
  {
    locale: "en",
    sourceSlug: "volt",
    slug: "volt",
    category: "elektrik",
    categoryName: "Electricity",
    unit: "V",
    name: "Volt",
    symbol: "V",
    shortDescription:
      "The volt is the SI derived unit of electric potential difference.",
    historySummary:
      "It became one of the core electrical units as circuit theory and measurement standards matured.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI voltage unit",
    commonUses: "Electronics, power supplies and grid voltage levels",
  },
  {
    locale: "en",
    sourceSlug: "kilovolt",
    slug: "kilovolt",
    category: "elektrik",
    categoryName: "Electricity",
    unit: "kV",
    name: "Kilovolt",
    symbol: "kV",
    shortDescription:
      "The kilovolt is a voltage unit equal to 1,000 volts. It is common in medium- and high-voltage systems.",
    historySummary:
      "It became standard as larger transmission and distribution voltages needed compact notation.",
    measurementSystem: "International System of Units (SI, multiple unit)",
    siEquivalent: "1 kV = 1000 V",
    commonUses: "Grid systems, transformers and high-voltage equipment",
  },
  {
    locale: "en",
    sourceSlug: "amper",
    slug: "ampere",
    category: "elektrik",
    categoryName: "Electricity",
    unit: "A",
    name: "Ampere",
    symbol: "A",
    shortDescription:
      "The ampere is the SI base unit of electric current.",
    historySummary:
      "It became one of the core electrical standards used to quantify charge flow in circuits and systems.",
    measurementSystem: "International System of Units (SI)",
    siEquivalent: "Base SI current unit",
    commonUses: "Current measurement, protection devices and equipment ratings",
  },
  {
    locale: "en",
    sourceSlug: "miliamper",
    slug: "milliampere",
    category: "elektrik",
    categoryName: "Electricity",
    unit: "mA",
    name: "Milliampere",
    symbol: "mA",
    shortDescription:
      "The milliampere is a small current unit equal to one thousandth of an ampere.",
    historySummary:
      "It became especially important in electronics and instrumentation where current levels are far below one ampere.",
    measurementSystem: "International System of Units (SI, subunit)",
    siEquivalent: "1 mA = 0.001 A",
    commonUses: "Electronics, sensors and low-current testing",
  },
  {
    locale: "en",
    sourceSlug: "kilogram-metrekup",
    slug: "kilogram-per-cubic-meter",
    category: "yogunluk",
    categoryName: "Density",
    unit: "kg/m³",
    name: "Kilogram per Cubic Meter",
    symbol: "kg/m³",
    shortDescription:
      "Kilogram per cubic meter is the SI derived unit of density, expressing the mass of a substance contained in one cubic meter of volume.",
    historySummary:
      "Derived directly from the SI base units of mass and length, kg/m³ became the standard scientific and engineering reference for density.",
    measurementSystem: "International System of Units (SI, derived unit)",
    siEquivalent: "Base SI unit of density",
    commonUses: "Material science, fluid mechanics, meteorology and engineering calculations",
  },
  {
    locale: "en",
    sourceSlug: "gram-santimetrekup",
    slug: "gram-per-cubic-centimeter",
    category: "yogunluk",
    categoryName: "Density",
    unit: "g/cm³",
    name: "Gram per Cubic Centimeter",
    symbol: "g/cm³",
    shortDescription:
      "Gram per cubic centimeter is a density unit widely used in laboratory and chemistry settings for small samples.",
    historySummary:
      "Within the decimal metric system, gram and cubic centimeter were combined to express the density of small-scale samples in a practical way.",
    measurementSystem: "International System of Units (SI, subunit combination)",
    siEquivalent: "1 g/cm³ = 1000 kg/m³",
    commonUses: "Chemistry labs, material density tables and mineralogy",
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
