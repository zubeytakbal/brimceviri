import { units } from "../converter/units";

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";
const MICRO_SIGN = "\u00B5";

type Locale = "tr" | "en" | "de";

type UnitDefinition = {
  tr: string;
  en: string;
  de?: string;
  symbol?: string;
};

type CategoryUnitDefinitions = Record<
  string,
  Record<string, UnitDefinition>
>;

const categoryUnitDefinitions: CategoryUnitDefinitions = {
  alan: {
    [`m${SQUARE_SUFFIX}`]: {
      tr: "Metrekare",
      en: "Square meter",
      de: "Quadratmeter",
    },
    [`cm${SQUARE_SUFFIX}`]: {
      tr: "Santimetrekare",
      en: "Square centimeter",
      de: "Quadratzentimeter",
    },
    [`mm${SQUARE_SUFFIX}`]: {
      tr: "Milimetrekare",
      en: "Square millimeter",
      de: "Quadratmillimeter",
    },
    [`km${SQUARE_SUFFIX}`]: {
      tr: "Kilometrekare",
      en: "Square kilometer",
      de: "Quadratkilometer",
    },
    ha: {
      tr: "Hektar",
      en: "Hectare",
      de: "Hektar",
    },
    [`ft${SQUARE_SUFFIX}`]: {
      tr: "Fitkare",
      en: "Square foot",
      de: "Quadratfu\u00DF",
    },
    [`in${SQUARE_SUFFIX}`]: {
      tr: "\u0130n\u00E7kare",
      en: "Square inch",
      de: "Quadratzoll",
    },
    ac: {
      tr: "Akre",
      en: "Acre",
      de: "Acre",
    },
  },
  hacim: {
    [`m${CUBIC_SUFFIX}`]: {
      tr: "Metrek\u00FCp",
      en: "Cubic meter",
      de: "Kubikmeter",
    },
    L: {
      tr: "Litre",
      en: "Liter",
      de: "Liter",
    },
    mL: {
      tr: "Mililitre",
      en: "Milliliter",
      de: "Milliliter",
    },
    [`cm${CUBIC_SUFFIX}`]: {
      tr: "Santimetrek\u00FCp",
      en: "Cubic centimeter",
      de: "Kubikzentimeter",
    },
    [`ft${CUBIC_SUFFIX}`]: {
      tr: "Fitk\u00FCp",
      en: "Cubic foot",
      de: "Kubikfu\u00DF",
    },
    [`in${CUBIC_SUFFIX}`]: {
      tr: "\u0130n\u00E7k\u00FCp",
      en: "Cubic inch",
      de: "Kubikzoll",
    },
    gal: {
      tr: "Galon",
      en: "Gallon",
      de: "Gallone",
    },
  },
  uzunluk: {
    m: {
      tr: "Metre",
      en: "Meter",
      de: "Meter",
    },
    km: {
      tr: "Kilometre",
      en: "Kilometer",
      de: "Kilometer",
    },
    cm: {
      tr: "Santimetre",
      en: "Centimeter",
      de: "Zentimeter",
    },
    mm: {
      tr: "Milimetre",
      en: "Millimeter",
      de: "Millimeter",
    },
    [`${MICRO_SIGN}m`]: {
      tr: "Mikrometre",
      en: "Micrometer",
      de: "Mikrometer",
    },
    nm: {
      tr: "Nanometre",
      en: "Nanometer",
      de: "Nanometer",
    },
    ft: {
      tr: "Fit",
      en: "Foot",
      de: "Fu\u00DF",
    },
    in: {
      tr: "\u0130n\u00E7",
      en: "Inch",
      de: "Zoll",
    },
    yd: {
      tr: "Yarda",
      en: "Yard",
      de: "Yard",
    },
    mi: {
      tr: "Mil",
      en: "Mile",
      de: "Meile",
    },
    nmi: {
      tr: "Deniz mili",
      en: "Nautical mile",
      de: "Seemeile",
    },
  },
  kutle: {
    kg: {
      tr: "Kilogram",
      en: "Kilogram",
      de: "Kilogramm",
    },
    g: {
      tr: "Gram",
      en: "Gram",
      de: "Gramm",
    },
    mg: {
      tr: "Miligram",
      en: "Milligram",
      de: "Milligramm",
    },
    ton: {
      tr: "Ton",
      en: "Metric ton",
      de: "Tonne",
      symbol: "t",
    },
    lb: {
      tr: "Pound",
      en: "Pound",
      de: "Pfund",
    },
    oz: {
      tr: "Ons",
      en: "Ounce",
      de: "Unze",
    },
  },
  sicaklik: {
    C: {
      tr: "Selsiyus",
      en: "Celsius",
      de: "Celsius",
      symbol: "\u00B0C",
    },
    F: {
      tr: "Fahrenheit",
      en: "Fahrenheit",
      de: "Fahrenheit",
      symbol: "\u00B0F",
    },
    K: {
      tr: "Kelvin",
      en: "Kelvin",
      de: "Kelvin",
    },
  },
  zaman: {
    s: {
      tr: "Saniye",
      en: "Second",
      de: "Sekunde",
    },
    ms: {
      tr: "Milisaniye",
      en: "Millisecond",
      de: "Millisekunde",
    },
    min: {
      tr: "Dakika",
      en: "Minute",
      de: "Minute",
    },
    h: {
      tr: "Saat",
      en: "Hour",
      de: "Stunde",
    },
    day: {
      tr: "G\u00FCn",
      en: "Day",
      de: "Tag",
    },
  },
  hiz: {
    "m/s": {
      tr: "Metre/saniye",
      en: "Meter per second",
      de: "Meter pro Sekunde",
    },
    "km/h": {
      tr: "Kilometre/saat",
      en: "Kilometer per hour",
      de: "Kilometer pro Stunde",
    },
    "km/s": {
      tr: "Kilometre/saniye",
      en: "Kilometer per second",
      de: "Kilometer pro Sekunde",
    },
    mph: {
      tr: "Mil/saat",
      en: "Mile per hour",
      de: "Meilen pro Stunde",
    },
    knot: {
      tr: "Knot",
      en: "Knot",
      de: "Knoten",
    },
    "ft/s": {
      tr: "Fit/saniye",
      en: "Foot per second",
      de: "Fu\u00DF pro Sekunde",
    },
    "m/min": {
      tr: "Metre/dakika",
      en: "Meter per minute",
      de: "Meter pro Minute",
    },
    "km/min": {
      tr: "Kilometre/dakika",
      en: "Kilometer per minute",
      de: "Kilometer pro Minute",
    },
    "cm/s": {
      tr: "Santimetre/saniye",
      en: "Centimeter per second",
      de: "Zentimeter pro Sekunde",
    },
    c: {
      tr: "I\u015F\u0131k h\u0131z\u0131",
      en: "Speed of light",
      de: "Lichtgeschwindigkeit",
    },
  },
  basinc: {
    Pa: {
      tr: "Pascal",
      en: "Pascal",
      de: "Pascal",
    },
    kPa: {
      tr: "Kilopascal",
      en: "Kilopascal",
      de: "Kilopascal",
    },
    bar: {
      tr: "Bar",
      en: "Bar",
      de: "Bar",
    },
    mbar: {
      tr: "Milibar",
      en: "Millibar",
      de: "Millibar",
    },
    atm: {
      tr: "Atmosfer",
      en: "Atmosphere",
      de: "Atmosph\u00E4re",
    },
    at: {
      tr: "Teknik atmosfer",
      en: "Technical atmosphere",
      de: "Technische Atmosph\u00E4re",
    },
    psi: {
      tr: "PSI",
      en: "PSI",
      de: "PSI",
    },
    mmHg: {
      tr: "Milimetre c\u0131va",
      en: "Millimeter of mercury",
      de: "Millimeter Quecksilbers\u00E4ule",
    },
    mmH2O: {
      tr: "Milimetre su s\u00FCtunu",
      en: "Millimeter of water",
      de: "Millimeter Wassers\u00E4ule",
    },
    "kgf/cm\u00B2": {
      tr: "Kilogram-kuvvet/santimetrekare",
      en: "Kilogram-force per square centimeter",
      de: "Kilogramm-Kraft pro Quadratzentimeter",
    },
  },
  enerji: {
    J: {
      tr: "Joule",
      en: "Joule",
      de: "Joule",
    },
    kJ: {
      tr: "Kilojoule",
      en: "Kilojoule",
      de: "Kilojoule",
    },
    MJ: {
      tr: "Megajoule",
      en: "Megajoule",
      de: "Megajoule",
    },
    Wh: {
      tr: "Watt-saat",
      en: "Watt-hour",
      de: "Wattstunde",
    },
    kWh: {
      tr: "Kilowatt-saat",
      en: "Kilowatt-hour",
      de: "Kilowattstunde",
    },
    W: {
      tr: "Watt",
      en: "Watt",
      de: "Watt",
    },
    kW: {
      tr: "Kilowatt",
      en: "Kilowatt",
      de: "Kilowatt",
    },
    cal: {
      tr: "Kalori",
      en: "Calorie",
      de: "Kalorie",
    },
    kcal: {
      tr: "Kilokalori",
      en: "Kilocalorie",
      de: "Kilokalorie",
    },
    Btu: {
      tr: "BTU",
      en: "BTU",
      de: "BTU",
    },
    th: {
      tr: "Therm",
      en: "Therm",
      de: "Therm",
    },
    "quad BTU": {
      tr: "Katrilyon BTU",
      en: "Quadrillion BTU",
      de: "Billiarde BTU",
    },
  },
  debi: {
    [`m${CUBIC_SUFFIX}/h`]: {
      tr: "Metrek\u00FCp/saat",
      en: "Cubic meter per hour",
      de: "Kubikmeter pro Stunde",
    },
    "L/min": {
      tr: "Litre/dakika",
      en: "Liter per minute",
      de: "Liter pro Minute",
    },
  },
  elektrik: {
    V: {
      tr: "Volt",
      en: "Volt",
      de: "Volt",
    },
    kV: {
      tr: "Kilovolt",
      en: "Kilovolt",
      de: "Kilovolt",
    },
    A: {
      tr: "Amper",
      en: "Ampere",
      de: "Ampere",
    },
    mA: {
      tr: "Miliamper",
      en: "Milliampere",
      de: "Milliampere",
    },
  },
  veri: {
    bit: {
      tr: "Bit",
      en: "Bit",
      de: "Bit",
    },
    B: {
      tr: "Bayt",
      en: "Byte",
      de: "Byte",
    },
    KB: {
      tr: "Kilobayt",
      en: "Kilobyte",
      de: "Kilobyte",
    },
    MB: {
      tr: "Megabayt",
      en: "Megabyte",
      de: "Megabyte",
    },
    GB: {
      tr: "Gigabayt",
      en: "Gigabyte",
      de: "Gigabyte",
    },
    TB: {
      tr: "Terabayt",
      en: "Terabyte",
      de: "Terabyte",
    },
    PB: {
      tr: "Petabayt",
      en: "Petabyte",
      de: "Petabyte",
    },
    KiB: {
      tr: "Kibibayt",
      en: "Kibibyte",
      de: "Kibibyte",
    },
    MiB: {
      tr: "Mebibayt",
      en: "Mebibyte",
      de: "Mebibyte",
    },
    GiB: {
      tr: "Gibibayt",
      en: "Gibibyte",
      de: "Gibibyte",
    },
    TiB: {
      tr: "Tebibayt",
      en: "Tebibyte",
      de: "Tebibyte",
    },
  },
};

function formatUnitLabel(
  locale: Locale,
  value: string,
  definition?: UnitDefinition
) {
  if (!definition) {
    return value;
  }

  const name =
    locale === "tr"
      ? definition.tr
      : locale === "de"
        ? definition.de ?? definition.en
        : definition.en;
  const symbol = definition.symbol ?? value;

  if (name === symbol) {
    return name;
  }

  return `${name} (${symbol})`;
}

export function getCategoryUnitOptions(
  category: string,
  locale: Locale
) {
  return (units[category] ?? []).map((value) => {
    const definition =
      categoryUnitDefinitions[category]?.[value];

    return {
      value,
      label: formatUnitLabel(locale, value, definition),
      symbol: definition?.symbol ?? value,
    };
  });
}
