import { units } from "../converter/units";
import { unitRegistry } from "../converter/unitRegistry";

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";
const MICRO_SIGN = "\u00B5";

type Locale = "tr" | "en" | "de" | "ar" | "uz" | "bn" | "fr" | "es" | "es-419";

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
      uz: "Kvadrat Metr",
    },
    [`cm${SQUARE_SUFFIX}`]: {
      tr: "Santimetrekare",
      en: "Square centimeter",
      de: "Quadratzentimeter",
      uz: "Kvadrat Santimetr",
    },
    [`mm${SQUARE_SUFFIX}`]: {
      tr: "Milimetrekare",
      en: "Square millimeter",
      de: "Quadratmillimeter",
      uz: "Kvadrat Millimetr",
    },
    [`km${SQUARE_SUFFIX}`]: {
      tr: "Kilometrekare",
      en: "Square kilometer",
      de: "Quadratkilometer",
      uz: "Kvadrat Kilometr",
    },
    ha: {
      tr: "Hektar",
      en: "Hectare",
      de: "Hektar",
      uz: "Gektar",
    },
    a: {
      tr: "Ar",
      en: "Are",
      de: "Ar",
      uz: "Sotix",
    },
    [`ft${SQUARE_SUFFIX}`]: {
      tr: "Fitkare",
      en: "Square foot",
      de: "Quadratfu\u00DF",
      uz: "Kvadrat Fut",
    },
    [`in${SQUARE_SUFFIX}`]: {
      tr: "\u0130n\u00E7kare",
      en: "Square inch",
      de: "Quadratzoll",
      uz: "Kvadrat Dyum",
    },
    [`yd${SQUARE_SUFFIX}`]: {
      tr: "Yardakare",
      en: "Square yard",
      de: "Quadratyard",
      uz: "Kvadrat Yard",
    },
    ac: {
      tr: "Akre",
      en: "Acre",
      de: "Acre",
      uz: "Akr",
    },
    "d\u00F6n\u00FCm": {
      tr: "D\u00F6n\u00FCm",
      en: "Donum",
      de: "D\u00F6n\u00FCm",
      uz: "Donum",
    },
    dekar: {
      tr: "Dekar",
      en: "Decare",
      de: "Dekar",
      uz: "Dekar",
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
      uz: "Kub Metr",
    },
    L: {
      tr: "Litre",
      en: "Liter",
      de: "Liter",
      uz: "Litr",
    },
    dL: {
      tr: "Desilitre",
      en: "Deciliter",
      de: "Deziliter",
      uz: "Detsilitr",
    },
    cL: {
      tr: "Santilitre",
      en: "Centiliter",
      de: "Zentiliter",
      uz: "Santilitr",
    },
    mL: {
      tr: "Mililitre",
      en: "Milliliter",
      de: "Milliliter",
      uz: "Millilitr",
    },
    [`cm${CUBIC_SUFFIX}`]: {
      tr: "Santimetrek\u00FCp",
      en: "Cubic centimeter",
      de: "Kubikzentimeter",
      uz: "Kub Santimetr",
    },
    [`ft${CUBIC_SUFFIX}`]: {
      tr: "Fitk\u00FCp",
      en: "Cubic foot",
      de: "Kubikfu\u00DF",
      uz: "Kub Fut",
    },
    [`in${CUBIC_SUFFIX}`]: {
      tr: "\u0130n\u00E7k\u00FCp",
      en: "Cubic inch",
      de: "Kubikzoll",
      uz: "Kub Dyum",
    },
    gal: {
      tr: "Galon",
      en: "US Gallon",
      de: "Gallone",
      uz: "Gallon",
    },
    yk: {
      tr: "Yemek Ka\u015F\u0131\u011F\u0131",
      en: "Tablespoon",
      de: "Essl\u00F6ffel",
      uz: "Osh Qoshiq",
    },
    "\u00E7k": {
      tr: "\u00C7ay Ka\u015F\u0131\u011F\u0131",
      en: "Teaspoon",
      de: "Teel\u00F6ffel",
      uz: "Choy Qoshiq",
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
      uz: "Kvarta",
    },
    "imp qt": {
      tr: "\u0130ngiliz Quart",
      en: "Imperial Quart",
      de: "Imperiale Quart",
      uz: "Britaniya Kvartasi",
    },
    "fl oz": {
      tr: "S\u0131v\u0131 Ons",
      en: "US Fluid Ounce",
      de: "Fl\u00FCssigunze",
      uz: "Suyuqlik Untsiyasi",
    },
    "imp fl oz": {
      tr: "\u0130ngiliz S\u0131v\u0131 Ons",
      en: "Imperial Fluid Ounce",
      de: "Imperiale Fl\u00FCssigunze",
      uz: "Britaniya Suyuqlik Untsiyasi",
    },
    pt: {
      tr: "Pint",
      en: "US Pint",
      de: "Pint",
      uz: "Pinta",
    },
    "imp pt": {
      tr: "\u0130ngiliz Pint",
      en: "Imperial Pint",
      de: "Imperiale Pint",
      uz: "Britaniya Pintasi",
    },
    pk: {
      tr: "Peck",
      en: "Peck",
      de: "Peck",
      uz: "Pek",
    },
    bu: {
      tr: "Bushel",
      en: "Bushel",
      de: "Bushel",
      uz: "Bushel",
    },
    "imp gal": {
      tr: "\u0130ngiliz Galonu",
      en: "Imperial Gallon",
      de: "Imperiale Gallone",
      uz: "Britaniya Galloni",
    },
    bbl: {
      tr: "Varil (petrol)",
      en: "Barrel",
      de: "Barrel",
      uz: "Barrel",
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
      uz: "Metr",
    },
    km: {
      tr: "Kilometre",
      en: "Kilometer",
      de: "Kilometer",
      uz: "Kilometr",
    },
    cm: {
      tr: "Santimetre",
      en: "Centimeter",
      de: "Zentimeter",
      uz: "Santimetr",
    },
    dm: {
      tr: "Desimetre",
      en: "Decimeter",
      de: "Dezimeter",
      uz: "Desimetr",
    },
    mm: {
      tr: "Milimetre",
      en: "Millimeter",
      de: "Millimeter",
      uz: "Millimetr",
    },
    [`${MICRO_SIGN}m`]: {
      tr: "Mikrometre",
      en: "Micrometer",
      de: "Mikrometer",
      uz: "Mikrometr",
    },
    nm: {
      tr: "Nanometre",
      en: "Nanometer",
      de: "Nanometer",
      uz: "Nanometr",
    },
    pm: {
      tr: "Pikometre",
      en: "Picometer",
      de: "Pikometer",
      uz: "Pikometr",
    },
    ft: {
      tr: "Fit",
      en: "Foot",
      de: "Fu\u00DF",
      uz: "Fut",
    },
    in: {
      tr: "\u0130n\u00E7",
      en: "Inch",
      de: "Zoll",
      uz: "Dyum",
    },
    yd: {
      tr: "Yarda",
      en: "Yard",
      de: "Yard",
      uz: "Yard",
    },
    mi: {
      tr: "Mil",
      en: "Mile",
      de: "Meile",
      uz: "Milya",
    },
    nmi: {
      tr: "Deniz mili",
      en: "Nautical mile",
      de: "Seemeile",
      uz: "Dengiz mili",
    },
    fur: {
      tr: "Furlong",
      en: "Furlong",
      de: "Furlong",
      uz: "Furlong",
    },
    AU: {
      tr: "Astronomik Birim",
      en: "Astronomical Unit",
      de: "Astronomische Einheit",
      uz: "Astronomik Birlik",
    },
    ly: {
      tr: "Işık Yılı",
      en: "Light-year",
      de: "Lichtjahr",
      uz: "Yorug'lik Yili",
    },
    pc: {
      tr: "Parsek",
      en: "Parsec",
      de: "Parsec",
      uz: "Parsek",
    },
    [`Å`]: {
      tr: "Angström",
      en: "Angstrom",
      de: "Angström",
      uz: "Angstrem",
    },
    ftm: {
      tr: "Kulaç (Fathom)",
      en: "Fathom",
      de: "Faden",
      uz: "Fatom",
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
    gaz: {
      // Faqat "uz" -- Buxoro/Xiva/Qo'qon davriga xos, TR/EN/DE'da yo'q.
      tr: "",
      en: "",
      uz: "Gaz",
    },
    chaqirim: {
      tr: "",
      en: "",
      uz: "Chaqirim",
    },
    tosh: {
      tr: "",
      en: "",
      uz: "Tosh",
    },
    farsah: {
      tr: "",
      en: "",
      uz: "Farsah",
    },
    qadam: {
      tr: "",
      en: "",
      uz: "Qadam",
    },
  },
  kutle: {
    kg: {
      tr: "Kilogram",
      en: "Kilogram",
      de: "Kilogramm",
      uz: "Kilogramm",
    },
    g: {
      tr: "Gram",
      en: "Gram",
      de: "Gramm",
      uz: "Gramm",
    },
    mg: {
      tr: "Miligram",
      en: "Milligram",
      de: "Milligramm",
      uz: "Milligramm",
    },
    ton: {
      tr: "Ton",
      en: "Metric ton",
      de: "Tonne",
      uz: "Tonna",
      symbol: "t",
    },
    lb: {
      tr: "Pound",
      en: "Pound",
      de: "Pfund",
      uz: "Funt",
    },
    oz: {
      tr: "Ons",
      en: "Ounce",
      de: "Unze",
      uz: "Untsiya",
    },
    q: {
      tr: "Kental",
      en: "Quintal",
      de: "Doppelzentner",
      uz: "Sentner",
    },
    st: {
      tr: "Stone",
      en: "Stone",
      de: "Stone",
      uz: "Stoun",
    },
    gr: {
      tr: "Grain",
      en: "Grain",
      de: "Grain",
      uz: "Grain",
    },
    Da: {
      tr: "Dalton",
      en: "Dalton",
      de: "Dalton",
      uz: "Dalton",
    },
    ozt: {
      tr: "Troy Ons",
      en: "Troy Ounce",
      de: "Feinunze",
      uz: "Troy Untsiya",
    },
    ct: {
      tr: "Karat",
      en: "Carat",
      de: "Karat",
      uz: "Karat",
    },
    "miskal-uz": {
      // Faqat "uz" -- Buxoro/Xiva/Qo'qon davriga xos, TR/EN/DE'da yo'q.
      tr: "",
      en: "",
      uz: "Miskal",
    },
    pud: {
      tr: "",
      en: "",
      uz: "Pud",
    },
    qadoq: {
      tr: "",
      en: "",
      uz: "Qadoq",
    },
    "dirhem-uz": {
      tr: "",
      en: "",
      uz: "Dirham",
    },
    "batman-uz": {
      tr: "",
      en: "",
      uz: "Botmon",
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
      uz: "Selsiy",
      symbol: "\u00B0C",
    },
    F: {
      tr: "Fahrenheit",
      en: "Fahrenheit",
      de: "Fahrenheit",
      uz: "Farengeyt",
      symbol: "\u00B0F",
    },
    K: {
      tr: "Kelvin",
      en: "Kelvin",
      de: "Kelvin",
      uz: "Kelvin",
    },
    R: {
      tr: "Rankine",
      en: "Rankine",
      de: "Rankine",
      uz: "Rankin",
      symbol: "\u00B0R",
    },
    Re: {
      tr: "R\u00E9aumur",
      en: "R\u00E9aumur",
      de: "R\u00E9aumur",
      uz: "Reomyur",
      symbol: "\u00B0R\u00E9",
    },
  },
  zaman: {
    s: {
      tr: "Saniye",
      en: "Second",
      de: "Sekunde",
      uz: "Soniya",
    },
    ms: {
      tr: "Milisaniye",
      en: "Millisecond",
      de: "Millisekunde",
      uz: "Millisoniya",
    },
    min: {
      tr: "Dakika",
      en: "Minute",
      de: "Minute",
      uz: "Daqiqa",
    },
    h: {
      tr: "Saat",
      en: "Hour",
      de: "Stunde",
      uz: "Soat",
    },
    day: {
      tr: "G\u00FCn",
      en: "Day",
      de: "Tag",
      uz: "Kun",
    },
  },
  hiz: {
    "m/s": {
      tr: "Metre/saniye",
      en: "Meter per second",
      de: "Meter pro Sekunde",
      uz: "Metr/Soniya",
    },
    "km/h": {
      tr: "Kilometre/saat",
      en: "Kilometer per hour",
      de: "Kilometer pro Stunde",
      uz: "Kilometr/Soat",
    },
    "km/s": {
      tr: "Kilometre/saniye",
      en: "Kilometer per second",
      de: "Kilometer pro Sekunde",
      uz: "Kilometr/Soniya",
    },
    mph: {
      tr: "Mil/saat",
      en: "Mile per hour",
      de: "Meilen pro Stunde",
      uz: "Milya/Soat",
    },
    knot: {
      tr: "Knot",
      en: "Knot",
      de: "Knoten",
      uz: "Uzel",
    },
    "ft/s": {
      tr: "Fit/saniye",
      en: "Foot per second",
      de: "Fu\u00DF pro Sekunde",
      uz: "Fut/Soniya",
    },
    "m/min": {
      tr: "Metre/dakika",
      en: "Meter per minute",
      de: "Meter pro Minute",
      uz: "Metr/Daqiqa",
    },
    "km/min": {
      tr: "Kilometre/dakika",
      en: "Kilometer per minute",
      de: "Kilometer pro Minute",
      uz: "Kilometr/Daqiqa",
    },
    "cm/s": {
      tr: "Santimetre/saniye",
      en: "Centimeter per second",
      de: "Zentimeter pro Sekunde",
      uz: "Santimetr/Soniya",
    },
    c: {
      tr: "I\u015F\u0131k h\u0131z\u0131",
      en: "Speed of light",
      de: "Lichtgeschwindigkeit",
      uz: "Yorug'lik Tezligi",
    },
  },
  basinc: {
    Pa: {
      tr: "Pascal",
      en: "Pascal",
      de: "Pascal",
      uz: "Paskal",
    },
    kPa: {
      tr: "Kilopascal",
      en: "Kilopascal",
      de: "Kilopascal",
      uz: "Kilopaskal",
    },
    MPa: {
      tr: "Megapascal",
      en: "Megapascal",
      de: "Megapascal",
      uz: "Megapaskal",
    },
    hPa: {
      tr: "Hektopascal",
      en: "Hectopascal",
      de: "Hektopascal",
      uz: "Gektopaskal",
    },
    bar: {
      tr: "Bar",
      en: "Bar",
      de: "Bar",
      uz: "Bar",
    },
    mbar: {
      tr: "Milibar",
      en: "Millibar",
      de: "Millibar",
      uz: "Millibar",
    },
    atm: {
      tr: "Atmosfer",
      en: "Atmosphere",
      de: "Atmosph\u00E4re",
      uz: "Atmosfera",
    },
    at: {
      tr: "Teknik atmosfer",
      en: "Technical atmosphere",
      de: "Technische Atmosph\u00E4re",
      uz: "Texnik Atmosfera",
    },
    psi: {
      tr: "PSI",
      en: "PSI",
      de: "PSI",
      uz: "PSI",
    },
    mmHg: {
      tr: "Milimetre c\u0131va",
      en: "Millimeter of mercury",
      de: "Millimeter Quecksilbers\u00E4ule",
      uz: "Simob Ustuni Millimetri",
    },
    mmH2O: {
      tr: "Milimetre su s\u00FCtunu",
      en: "Millimeter of water",
      de: "Millimeter Wassers\u00E4ule",
      uz: "Suv Ustuni Millimetri",
    },
    Torr: {
      tr: "Torr",
      en: "Torr",
      de: "Torr",
      uz: "Torr",
    },
    "kgf/cm\u00B2": {
      tr: "Kilogram-kuvvet/santimetrekare",
      en: "Kilogram-force per square centimeter",
      de: "Kilogramm-Kraft pro Quadratzentimeter",
      uz: "Kilogram-Kuch/Kvadrat Santimetr",
    },
  },
  enerji: {
    J: {
      tr: "Joule",
      en: "Joule",
      de: "Joule",
      uz: "Joul",
    },
    kJ: {
      tr: "Kilojoule",
      en: "Kilojoule",
      de: "Kilojoule",
      uz: "Kilojoul",
    },
    MJ: {
      tr: "Megajoule",
      en: "Megajoule",
      de: "Megajoule",
      uz: "Megajoul",
    },
    Wh: {
      tr: "Watt-saat",
      en: "Watt-hour",
      de: "Wattstunde",
      uz: "Vatt-Soat",
    },
    kWh: {
      tr: "Kilowatt-saat",
      en: "Kilowatt-hour",
      de: "Kilowattstunde",
      uz: "Kilovatt-Soat",
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
      uz: "Kaloriya",
    },
    kcal: {
      tr: "Kilokalori",
      en: "Kilocalorie",
      de: "Kilokalorie",
      uz: "Kilokaloriya",
    },
    Btu: {
      tr: "BTU",
      en: "BTU",
      de: "BTU",
      uz: "BTU",
    },
    th: {
      tr: "Therm",
      en: "Therm",
      de: "Therm",
      uz: "Term",
    },
    "quad BTU": {
      tr: "Katrilyon BTU",
      en: "Quadrillion BTU",
      de: "Billiarde BTU",
      uz: "Kvadrillion BTU",
    },
    eV: {
      tr: "Elektronvolt",
      en: "Electronvolt",
      de: "Elektronenvolt",
      uz: "Elektronvolt",
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
      uz: "Bit",
    },
    B: {
      tr: "Bayt",
      en: "Byte",
      de: "Byte",
      uz: "Bayt",
    },
    kbit: {
      tr: "Kilobit",
      en: "Kilobit",
      de: "Kilobit",
      uz: "Kilobit",
    },
    Mbit: {
      tr: "Megabit",
      en: "Megabit",
      de: "Megabit",
      uz: "Megabit",
    },
    Gbit: {
      tr: "Gigabit",
      en: "Gigabit",
      de: "Gigabit",
      uz: "Gigabit",
    },
    Tbit: {
      tr: "Terabit",
      en: "Terabit",
      de: "Terabit",
      uz: "Terabit",
    },
    Kibit: {
      tr: "Kibibit",
      en: "Kibibit",
      de: "Kibibit",
      uz: "Kibibit",
    },
    Mibit: {
      tr: "Mebibit",
      en: "Mebibit",
      de: "Mebibit",
      uz: "Mebibit",
    },
    Gibit: {
      tr: "Gibibit",
      en: "Gibibit",
      de: "Gibibit",
      uz: "Gibibit",
    },
    Tibit: {
      tr: "Tebibit",
      en: "Tebibit",
      de: "Tebibit",
      uz: "Tebibit",
    },
    KB: {
      tr: "Kilobayt",
      en: "Kilobyte",
      de: "Kilobyte",
      uz: "Kilobayt",
    },
    MB: {
      tr: "Megabayt",
      en: "Megabyte",
      de: "Megabyte",
      uz: "Megabayt",
    },
    GB: {
      tr: "Gigabayt",
      en: "Gigabyte",
      de: "Gigabyte",
      uz: "Gigabayt",
    },
    TB: {
      tr: "Terabayt",
      en: "Terabyte",
      de: "Terabyte",
      uz: "Terabayt",
    },
    PB: {
      tr: "Petabayt",
      en: "Petabyte",
      de: "Petabyte",
      uz: "Petabayt",
    },
    KiB: {
      tr: "Kibibayt",
      en: "Kibibyte",
      de: "Kibibyte",
      uz: "Kibibayt",
    },
    MiB: {
      tr: "Mebibayt",
      en: "Mebibyte",
      de: "Mebibyte",
      uz: "Mebibayt",
    },
    GiB: {
      tr: "Gibibayt",
      en: "Gibibyte",
      de: "Gibibyte",
      uz: "Gibibayt",
    },
    TiB: {
      tr: "Tebibayt",
      en: "Tebibyte",
      de: "Tebibyte",
      uz: "Tebibayt",
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
      uz: "24 Karat",
    },
    "22K": {
      tr: "22 Ayar",
      en: "22K",
      de: "22 Karat",
      uz: "22 Karat",
    },
    "18K": {
      tr: "18 Ayar",
      en: "18K",
      de: "18 Karat",
      uz: "18 Karat",
    },
    "14K": {
      tr: "14 Ayar",
      en: "14K",
      de: "14 Karat",
      uz: "14 Karat",
    },
  },
  gumus_ayar: {
    "999": {
      tr: "999 Ayar (Saf Gümüş)",
      en: "999 (Fine Silver)",
      uz: "999 (Sof Kumush)",
    },
    "925": {
      tr: "925 Ayar (Sterlin)",
      en: "925 (Sterling)",
      uz: "925 (Sterling)",
    },
    "900": {
      tr: "900 Ayar",
      en: "900",
      uz: "900",
    },
    "800": {
      tr: "800 Ayar",
      en: "800",
      uz: "800",
    },
  },
};

// Har til uchun MUTLAQ shu tilning o'z maydonini qaytaradi, hech qachon
// boshqa tilga (yoki xom belgiga) tushmaydi -- aks holda bir tilga xos
// birlik (masalan faqat "uz" bilan yozilgan tarixiy birlik) boshqa
// tillarning ochiladigan menyusida xom sembol sifatida ("gaz", "chaqirim"
// kabi) sizib chiqadi. Yo'qlik getCategoryUnitOptions'da butunlay
// chiqarib tashlanadi, boshqa maydonga tushilmaydi.
function getUnitLabel(
  locale: Locale,
  definition: UnitDefinition
): string | undefined {
  if (locale === "tr") return definition.tr;
  if (locale === "uz") return definition.uz;
  if (locale === "de") return definition.de ?? definition.en;
  return definition.en;
}

// Ozbekcha tarjimasi hali qo'shilmagan kategoriyalarda canlı kalkulyator
// panelini yashirish uchun -- tarjima qo'shilgan sari bu ro'yxat o'zi
// kengayadi, chunki tekshiruv haqiqiy `uz` maydonlariga qarab ishlaydi.
export function hasUzbekUnitLabels(category: string) {
  const definitions = categoryUnitDefinitions[category];

  if (!definitions) {
    return false;
  }

  return Object.values(definitions).some((definition) => definition.uz);
}

export function getCategoryUnitOptions(
  category: string,
  locale: Locale
) {
  const definedOptions = (units[category] ?? []).flatMap((value) => {
    const definition = categoryUnitDefinitions[category]?.[value];

    if (!definition) {
      return [];
    }

    const label = getUnitLabel(locale, definition);

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
  // Newer specialist categories are already fully defined in unitRegistry but
  // do not have a legacy `units` entry yet. For English only, expose that
  // verified registry data instead of rendering an empty converter panel.
  // Other locales keep their explicit label-gating behavior unchanged.
  if (definedOptions.length > 0 || locale !== "en") {
    return definedOptions;
  }

  return unitRegistry
    .filter(
      (unit) => unit.category === category && unit.en
    )
    .map((unit) => ({
      value: unit.symbol,
      label: unit.en!.name,
      symbol: unit.displaySymbol ?? unit.symbol,
    }));
}
