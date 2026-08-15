import { units } from "../converter/units";

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";
const MICRO_SIGN = "\u00B5";

type Locale = "tr" | "en";

type UnitDefinition = {
  tr: string;
  en: string;
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
    },
    [`cm${SQUARE_SUFFIX}`]: {
      tr: "Santimetrekare",
      en: "Square centimeter",
    },
    [`mm${SQUARE_SUFFIX}`]: {
      tr: "Milimetrekare",
      en: "Square millimeter",
    },
    [`km${SQUARE_SUFFIX}`]: {
      tr: "Kilometrekare",
      en: "Square kilometer",
    },
    ha: {
      tr: "Hektar",
      en: "Hectare",
    },
    [`ft${SQUARE_SUFFIX}`]: {
      tr: "Fitkare",
      en: "Square foot",
    },
    [`in${SQUARE_SUFFIX}`]: {
      tr: "İnçkare",
      en: "Square inch",
    },
    ac: {
      tr: "Akre",
      en: "Acre",
    },
  },
  hacim: {
    [`m${CUBIC_SUFFIX}`]: {
      tr: "Metreküp",
      en: "Cubic meter",
    },
    L: {
      tr: "Litre",
      en: "Liter",
    },
    mL: {
      tr: "Mililitre",
      en: "Milliliter",
    },
    [`cm${CUBIC_SUFFIX}`]: {
      tr: "Santimetreküp",
      en: "Cubic centimeter",
    },
    [`ft${CUBIC_SUFFIX}`]: {
      tr: "Fitküp",
      en: "Cubic foot",
    },
    [`in${CUBIC_SUFFIX}`]: {
      tr: "İnçküp",
      en: "Cubic inch",
    },
    gal: {
      tr: "Galon",
      en: "Gallon",
    },
  },
  uzunluk: {
    m: {
      tr: "Metre",
      en: "Meter",
    },
    km: {
      tr: "Kilometre",
      en: "Kilometer",
    },
    cm: {
      tr: "Santimetre",
      en: "Centimeter",
    },
    mm: {
      tr: "Milimetre",
      en: "Millimeter",
    },
    [`${MICRO_SIGN}m`]: {
      tr: "Mikrometre",
      en: "Micrometer",
    },
    nm: {
      tr: "Nanometre",
      en: "Nanometer",
    },
    ft: {
      tr: "Fit",
      en: "Foot",
    },
    in: {
      tr: "İnç",
      en: "Inch",
    },
    yd: {
      tr: "Yarda",
      en: "Yard",
    },
    mi: {
      tr: "Mil",
      en: "Mile",
    },
    nmi: {
      tr: "Deniz mili",
      en: "Nautical mile",
    },
  },
  kutle: {
    kg: {
      tr: "Kilogram",
      en: "Kilogram",
    },
    g: {
      tr: "Gram",
      en: "Gram",
    },
    mg: {
      tr: "Miligram",
      en: "Milligram",
    },
    ton: {
      tr: "Ton",
      en: "Metric ton",
      symbol: "t",
    },
    lb: {
      tr: "Pound",
      en: "Pound",
    },
    oz: {
      tr: "Ons",
      en: "Ounce",
    },
  },
  sicaklik: {
    C: {
      tr: "Selsiyus",
      en: "Celsius",
      symbol: "\u00B0C",
    },
    F: {
      tr: "Fahrenheit",
      en: "Fahrenheit",
      symbol: "\u00B0F",
    },
    K: {
      tr: "Kelvin",
      en: "Kelvin",
    },
  },
  zaman: {
    s: {
      tr: "Saniye",
      en: "Second",
    },
    ms: {
      tr: "Milisaniye",
      en: "Millisecond",
    },
    min: {
      tr: "Dakika",
      en: "Minute",
    },
    h: {
      tr: "Saat",
      en: "Hour",
    },
    day: {
      tr: "Gün",
      en: "Day",
    },
  },
  hiz: {
    "m/s": {
      tr: "Metre/saniye",
      en: "Meter per second",
    },
    "km/h": {
      tr: "Kilometre/saat",
      en: "Kilometer per hour",
    },
    "km/s": {
      tr: "Kilometre/saniye",
      en: "Kilometer per second",
    },
    mph: {
      tr: "Mil/saat",
      en: "Mile per hour",
    },
    knot: {
      tr: "Knot",
      en: "Knot",
    },
    "ft/s": {
      tr: "Fit/saniye",
      en: "Foot per second",
    },
    "m/min": {
      tr: "Metre/dakika",
      en: "Meter per minute",
    },
    "km/min": {
      tr: "Kilometre/dakika",
      en: "Kilometer per minute",
    },
    "cm/s": {
      tr: "Santimetre/saniye",
      en: "Centimeter per second",
    },
    c: {
      tr: "Işık hızı",
      en: "Speed of light",
    },
  },
  basinc: {
    Pa: {
      tr: "Pascal",
      en: "Pascal",
    },
    kPa: {
      tr: "Kilopascal",
      en: "Kilopascal",
    },
    bar: {
      tr: "Bar",
      en: "Bar",
    },
    mbar: {
      tr: "Milibar",
      en: "Millibar",
    },
    atm: {
      tr: "Atmosfer",
      en: "Atmosphere",
    },
    at: {
      tr: "Teknik atmosfer",
      en: "Technical atmosphere",
    },
    psi: {
      tr: "PSI",
      en: "PSI",
    },
    mmHg: {
      tr: "Milimetre cıva",
      en: "Millimeter of mercury",
    },
    mmH2O: {
      tr: "Milimetre su sütunu",
      en: "Millimeter of water",
    },
    "kgf/cm\u00B2": {
      tr: "Kilogram-kuvvet/santimetrekare",
      en: "Kilogram-force per square centimeter",
    },
  },
  enerji: {
    J: {
      tr: "Joule",
      en: "Joule",
    },
    kJ: {
      tr: "Kilojoule",
      en: "Kilojoule",
    },
    MJ: {
      tr: "Megajoule",
      en: "Megajoule",
    },
    Wh: {
      tr: "Watt-saat",
      en: "Watt-hour",
    },
    kWh: {
      tr: "Kilowatt-saat",
      en: "Kilowatt-hour",
    },
    W: {
      tr: "Watt",
      en: "Watt",
    },
    kW: {
      tr: "Kilowatt",
      en: "Kilowatt",
    },
    cal: {
      tr: "Kalori",
      en: "Calorie",
    },
    kcal: {
      tr: "Kilokalori",
      en: "Kilocalorie",
    },
    Btu: {
      tr: "BTU",
      en: "BTU",
    },
    th: {
      tr: "Therm",
      en: "Therm",
    },
    "quad BTU": {
      tr: "Katrilyon BTU",
      en: "Quadrillion BTU",
    },
  },
  debi: {
    [`m${CUBIC_SUFFIX}/h`]: {
      tr: "Metreküp/saat",
      en: "Cubic meter per hour",
    },
    "L/min": {
      tr: "Litre/dakika",
      en: "Liter per minute",
    },
  },
  elektrik: {
    V: {
      tr: "Volt",
      en: "Volt",
    },
    kV: {
      tr: "Kilovolt",
      en: "Kilovolt",
    },
    A: {
      tr: "Amper",
      en: "Ampere",
    },
    mA: {
      tr: "Miliamper",
      en: "Milliampere",
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

  const name = locale === "tr" ? definition.tr : definition.en;
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
