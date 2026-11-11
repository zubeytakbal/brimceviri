import { units } from "../converter/units";
import { unitRegistry } from "../converter/unitRegistry";
import { nederlandsUnitPages } from "../converter/localizedNederlandsUnitPages";

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";
const MICRO_SIGN = "\u00B5";

type Locale = "tr" | "en" | "de" | "ar" | "bn" | "fr" | "es" | "pt" | "it" | "nl";

type UnitDefinition = {
  tr: string;
  en: string;
  de?: string;
  uz?: string;
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
    a: {
      tr: "Ar",
      en: "Are",
      de: "Ar",
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
    [`yd${SQUARE_SUFFIX}`]: {
      tr: "Yardakare",
      en: "Square yard",
      de: "Quadratyard",
    },
    ac: {
      tr: "Akre",
      en: "Acre",
      de: "Acre",
    },
    "d\u00F6n\u00FCm": {
      tr: "D\u00F6n\u00FCm",
      en: "Donum",
      de: "D\u00F6n\u00FCm",
    },
    dekar: {
      tr: "Dekar",
      en: "Decare",
      de: "Dekar",
    },
    decimal: {
      tr: "Decimal (Arazi)",
      en: "Decimal (Land)",
      de: "Decimal (Grundst\u00FCck)",
    },
    killa: {
      tr: "Killa",
      en: "Killa",
      de: "Killa",
    },
    kanal: {
      tr: "Kanal",
      en: "Kanal",
      de: "Kanal",
    },
    marla: {
      tr: "Marla",
      en: "Marla",
      de: "Marla",
    },
    guntha: {
      tr: "Guntha",
      en: "Guntha",
      de: "Guntha",
    },
    cent: {
      tr: "Cent (Arazi)",
      en: "Cent (Land)",
      de: "Cent (Grundst\u00FCck)",
    },
    ground: {
      tr: "Ground",
      en: "Ground",
      de: "Ground",
    },
    biswa: {
      tr: "Biswa",
      en: "Biswa",
      de: "Biswa",
    },
    katha: {
      tr: "Katha",
      en: "Katha",
      de: "Katha",
    },
    bigha: {
      tr: "Bigha",
      en: "Bigha",
      de: "Bigha",
    },
    tsubo: {
      tr: "Tsubo",
      en: "Tsubo",
      de: "Tsubo",
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
    dL: {
      tr: "Desilitre",
      en: "Deciliter",
      de: "Deziliter",
    },
    cL: {
      tr: "Santilitre",
      en: "Centiliter",
      de: "Zentiliter",
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
      en: "US Gallon",
      de: "Gallone",
    },
    yk: {
      tr: "Yemek Ka\u015F\u0131\u011F\u0131",
      en: "Metric Tablespoon (15 mL)",
      de: "Essl\u00F6ffel",
    },
    "\u00E7k": {
      tr: "\u00C7ay Ka\u015F\u0131\u011F\u0131",
      en: "Metric Teaspoon (5 mL)",
      de: "Teel\u00F6ffel",
    },
    sb: {
      tr: "Su Barda\u011F\u0131",
      en: "Turkish Water Glass",
      de: "T\u00FCrkisches Wasserglas",
    },
    qt: {
      tr: "Quart",
      en: "US Quart",
      de: "Quart",
    },
    "imp qt": {
      tr: "\u0130ngiliz Quart",
      en: "Imperial Quart",
      de: "Imperiale Quart",
    },
    "fl oz": {
      tr: "S\u0131v\u0131 Ons",
      en: "US Fluid Ounce",
      de: "Fl\u00FCssigunze",
    },
    "imp fl oz": {
      tr: "\u0130ngiliz S\u0131v\u0131 Ons",
      en: "Imperial Fluid Ounce",
      de: "Imperiale Fl\u00FCssigunze",
    },
    pt: {
      tr: "Pint",
      en: "US Pint",
      de: "Pint",
    },
    "imp pt": {
      tr: "\u0130ngiliz Pint",
      en: "Imperial Pint",
      de: "Imperiale Pint",
    },
    pk: {
      tr: "Peck",
      en: "Peck",
      de: "Peck",
    },
    bu: {
      tr: "Bushel",
      en: "Bushel",
      de: "Bushel",
    },
    "imp gal": {
      tr: "\u0130ngiliz Galonu",
      en: "Imperial Gallon",
      de: "Imperiale Gallone",
    },
    bbl: {
      tr: "Varil (petrol)",
      en: "Barrel",
      de: "Barrel",
    },
    kile: {
      tr: "Kile",
      en: "Kile",
      de: "Kile",
    },
    "\u015Finik": {
      tr: "\u015Einik",
      en: "Shinik",
      de: "Shinik",
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
    dm: {
      tr: "Desimetre",
      en: "Decimeter",
      de: "Dezimeter",
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
    pm: {
      tr: "Pikometre",
      en: "Picometer",
      de: "Pikometer",
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
    mil: {
      tr: "İskandinav mili",
      en: "Scandinavian mile",
      de: "Skandinavische Meile",
    },
    nmi: {
      tr: "Deniz mili",
      en: "Nautical mile",
      de: "Seemeile",
    },
    fur: {
      tr: "Furlong",
      en: "Furlong",
      de: "Furlong",
    },
    AU: {
      tr: "Astronomik Birim",
      en: "Astronomical Unit",
      de: "Astronomische Einheit",
    },
    ly: {
      tr: "Işık Yılı",
      en: "Light-year",
      de: "Lichtjahr",
    },
    pc: {
      tr: "Parsek",
      en: "Parsec",
      de: "Parsec",
    },
    [`Å`]: {
      tr: "Angström",
      en: "Angstrom",
      de: "Angström",
    },
    ftm: {
      tr: "Kulaç (Fathom)",
      en: "Fathom",
      de: "Faden",
    },
    [`arşın`]: {
      tr: "Arşın",
      en: "Arshin",
      de: "Arschin",
    },
    endaze: {
      tr: "Endaze",
      en: "Endaze",
      de: "Endaze",
    },
    [`çığ`]: {
      tr: "Çığ",
      en: "Cig",
      de: "Çığ",
    },
    pus: {
      tr: "Bizans Ayağı",
      en: "Byzantine Foot",
      de: "Byzantinischer Fuß",
    },
    orgyia: {
      tr: "Bizans Kulacı",
      en: "Byzantine Fathom",
      de: "Byzantinische Klafter",
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
    hg: {
      tr: "Hektogram",
      en: "Hectogram",
      de: "Hektogramm",
    },
    pond: {
      tr: "Metrik pound (500 g)",
      en: "Metric pound (500 g)",
      de: "Pfund (500 g)",
    },
    "@": {
      tr: "Arroba (15 kg)",
      en: "Arroba (15 kg)",
      de: "Arroba (15 kg)",
    },
    oz: {
      tr: "Ons",
      en: "Ounce",
      de: "Unze",
    },
    q: {
      tr: "Kental",
      en: "Quintal",
      de: "Doppelzentner",
    },
    st: {
      tr: "Stone",
      en: "Stone",
      de: "Stone",
    },
    gr: {
      tr: "Grain",
      en: "Grain",
      de: "Grain",
    },
    Da: {
      tr: "Dalton",
      en: "Dalton",
      de: "Dalton",
    },
    ozt: {
      tr: "Troy Ons",
      en: "Troy Ounce",
      de: "Feinunze",
    },
    ct: {
      tr: "Karat",
      en: "Carat",
      de: "Karat",
    },
    okka: {
      tr: "Okka",
      en: "Okka",
      de: "Okka",
    },
    dirhem: {
      tr: "Dirhem",
      en: "Dirham",
      de: "Dirham",
    },
    miskal: {
      tr: "Miskal",
      en: "Miskal",
      de: "Miskal",
    },
    batman: {
      tr: "Batman",
      en: "Batman",
      de: "Batman",
    },
    litra: {
      tr: "Bizans Litrası",
      en: "Byzantine Litra",
      de: "Byzantinische Litra",
    },
    ounkia: {
      tr: "Bizans Onsu",
      en: "Byzantine Ounce",
      de: "Byzantinische Ounkia",
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
    R: {
      tr: "Rankine",
      en: "Rankine",
      de: "Rankine",
      symbol: "\u00B0R",
    },
    Re: {
      tr: "R\u00E9aumur",
      en: "R\u00E9aumur",
      de: "R\u00E9aumur",
      symbol: "\u00B0R\u00E9",
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
    MPa: {
      tr: "Megapascal",
      en: "Megapascal",
      de: "Megapascal",
    },
    hPa: {
      tr: "Hektopascal",
      en: "Hectopascal",
      de: "Hektopascal",
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
    Torr: {
      tr: "Torr",
      en: "Torr",
      de: "Torr",
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
    eV: {
      tr: "Elektronvolt",
      en: "Electronvolt",
      de: "Elektronenvolt",
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
    kbit: {
      tr: "Kilobit",
      en: "Kilobit",
      de: "Kilobit",
    },
    Mbit: {
      tr: "Megabit",
      en: "Megabit",
      de: "Megabit",
    },
    Gbit: {
      tr: "Gigabit",
      en: "Gigabit",
      de: "Gigabit",
    },
    Tbit: {
      tr: "Terabit",
      en: "Terabit",
      de: "Terabit",
    },
    Kibit: {
      tr: "Kibibit",
      en: "Kibibit",
      de: "Kibibit",
    },
    Mibit: {
      tr: "Mebibit",
      en: "Mebibit",
      de: "Mebibit",
    },
    Gibit: {
      tr: "Gibibit",
      en: "Gibibit",
      de: "Gibibit",
    },
    Tibit: {
      tr: "Tebibit",
      en: "Tebibit",
      de: "Tebibit",
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
  elektrik_direnc: {
    [`Ω`]: {
      tr: "Ohm",
      en: "Ohm",
      de: "Ohm",
    },
    [`kΩ`]: {
      tr: "Kiloohm",
      en: "Kiloohm",
      de: "Kiloohm",
    },
    [`MΩ`]: {
      tr: "Megaohm",
      en: "Megaohm",
      de: "Megaohm",
    },
  },
  kapasitans: {
    F: {
      tr: "Farad",
      en: "Farad",
      de: "Farad",
    },
    mF: {
      tr: "Milifarad",
      en: "Millifarad",
      de: "Millifarad",
    },
    [`${MICRO_SIGN}F`]: {
      tr: "Mikrofarad",
      en: "Microfarad",
      de: "Mikrofarad",
    },
    nF: {
      tr: "Nanofarad",
      en: "Nanofarad",
      de: "Nanofarad",
    },
    pF: {
      tr: "Pikofarad",
      en: "Picofarad",
      de: "Pikofarad",
    },
  },
  enduktans: {
    H: {
      tr: "Henry",
      en: "Henry",
      de: "Henry",
    },
    mH: {
      tr: "Milihenry",
      en: "Millihenry",
      de: "Millihenry",
    },
    [`${MICRO_SIGN}H`]: {
      tr: "Mikrohenry",
      en: "Microhenry",
      de: "Mikrohenry",
    },
  },
  elektrik_yuk: {
    C: {
      tr: "Coulomb",
      en: "Coulomb",
      de: "Coulomb",
    },
    mC: {
      tr: "Milicoulomb",
      en: "Millicoulomb",
      de: "Millicoulomb",
    },
    [`${MICRO_SIGN}C`]: {
      tr: "Mikrocoulomb",
      en: "Microcoulomb",
      de: "Mikrocoulomb",
    },
    nC: {
      tr: "Nanocoulomb",
      en: "Nanocoulomb",
      de: "Nanocoulomb",
    },
  },
  altin_ayar: {
    "24K": {
      tr: "24 Ayar",
      en: "24K",
      de: "24 Karat",
    },
    "22K": {
      tr: "22 Ayar",
      en: "22K",
      de: "22 Karat",
    },
    "18K": {
      tr: "18 Ayar",
      en: "18K",
      de: "18 Karat",
    },
    "14K": {
      tr: "14 Ayar",
      en: "14K",
      de: "14 Karat",
    },
  },
  gumus_ayar: {
    "999": {
      tr: "999 Ayar (Saf Gümüş)",
      en: "999 (Fine Silver)",
    },
    "925": {
      tr: "925 Ayar (Sterlin)",
      en: "925 (Sterling)",
    },
    "900": {
      tr: "900 Ayar",
      en: "900",
    },
    "800": {
      tr: "800 Ayar",
      en: "800",
    },
  },
};

// Birimin bu dildeki adi; adi olmayan birim listede gosterilmez.
function getUnitLabel(
  locale: Locale,
  definition: UnitDefinition
): string | undefined {
  if (locale === "tr") return definition.tr;
  if (locale === "de") return definition.de ?? definition.en;
  return definition.en;
}

export function getCategoryUnitOptions(
  category: string,
  locale: Locale
) {
  const definedOptions = (units[category] ?? []).flatMap((value) => {
    const registryEntry = unitRegistry.find((unit) => unit.category === category && unit.symbol === value);
    // Elle tanımlı etiketi olmayan (sonradan eklenen) birimler kayıttaki adlarıyla listelenir.
    const definition =
      categoryUnitDefinitions[category]?.[value] ??
      (registryEntry?.tr && registryEntry.en
        ? { tr: registryEntry.tr.name, en: registryEntry.en.name, de: registryEntry.de?.name, symbol: registryEntry.displaySymbol }
        : registryEntry?.tr && locale === "tr"
          ? { tr: registryEntry.tr.name, en: "", symbol: registryEntry.displaySymbol }
          : undefined);

    if (!definition) {
      return [];
    }

    const nederlandsUnit =
      locale === "nl"
        ? nederlandsUnitPages.find(
            (page) => page.category === category && page.unit === value
          )
        : undefined;
    const label = nederlandsUnit?.name ?? getUnitLabel(locale, definition);

    if (!label) {
      return [];
    }

    return [
      {
        value,
        label,
        symbol: definition.symbol ?? value,
      },
    ];
  });

  // Most long-standing categories use the hand-curated display order above.
  // Newer specialist categories (guc, kuvvet, yogunluk...) are already fully
  // defined in unitRegistry but have no legacy `units` entry, so their
  // category converter rendered empty in every language except English.
  // Fall back to the registry: the locale's own name when the registry has
  // it (tr/de/uz), otherwise English. Pages for other languages replace the
  // label with their own unit names via getLocalizedUnitOptions.
  if (definedOptions.length > 0) {
    return definedOptions;
  }

  return unitRegistry
    // Yalnızca Türkçe adı olan yeni kategoriler (konsantrasyon, radyasyon dozu...) Türkçe sayfada da listelenir.
    .filter((unit) => unit.category === category && unit.tr && (unit.en || locale === "tr"))
    .map((unit) => ({
      value: unit.symbol,
      label: (locale === "tr" ? unit.tr?.name : locale === "de" ? unit.de?.name : undefined) ?? unit.en?.name ?? unit.tr!.name,
      symbol: unit.displaySymbol ?? unit.symbol,
    }));
}
