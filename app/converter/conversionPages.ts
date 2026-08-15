import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type ConversionPage = {
  slug: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  formula: string;
  explanation: string;
  exampleValues: number[];
  reverseSlug: string;
  englishSlug?: string;
  englishReverseSlug?: string;
};

type UnitDefinition = {
  slug: string;
  unit: string;
  name: string;
};

type PairDefinition = {
  category: string;
  first: UnitDefinition;
  second: UnitDefinition;
  secondPerFirst: number;
  firstExamples: number[];
  secondExamples: number[];
  englishSlugs?: {
    forward: string;
    reverse: string;
  };
};

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";

const metre: UnitDefinition = {
  slug: "metre",
  unit: "m",
  name: "Metre",
};

const kilometre: UnitDefinition = {
  slug: "kilometre",
  unit: "km",
  name: "Kilometre",
};

const santimetre: UnitDefinition = {
  slug: "santimetre",
  unit: "cm",
  name: "Santimetre",
};

const milimetre: UnitDefinition = {
  slug: "milimetre",
  unit: "mm",
  name: "Milimetre",
};

const mil: UnitDefinition = {
  slug: "mil",
  unit: "mi",
  name: "Mil",
};

const fit: UnitDefinition = {
  slug: "fit",
  unit: "ft",
  name: "Fit",
};

const inc: UnitDefinition = {
  slug: "inc",
  unit: "in",
  name: "İnç",
};

const yarda: UnitDefinition = {
  slug: "yarda",
  unit: "yd",
  name: "Yarda",
};

const kilogram: UnitDefinition = {
  slug: "kilogram",
  unit: "kg",
  name: "Kilogram",
};

const gram: UnitDefinition = {
  slug: "gram",
  unit: "g",
  name: "Gram",
};

const miligram: UnitDefinition = {
  slug: "miligram",
  unit: "mg",
  name: "Miligram",
};

const pound: UnitDefinition = {
  slug: "pound",
  unit: "lb",
  name: "Pound",
};

const ton: UnitDefinition = {
  slug: "ton",
  unit: "ton",
  name: "Ton",
};

const ons: UnitDefinition = {
  slug: "ons",
  unit: "oz",
  name: "Ons",
};

const pascal: UnitDefinition = {
  slug: "pascal",
  unit: "Pa",
  name: "Pascal",
};

const kilopascal: UnitDefinition = {
  slug: "kilopascal",
  unit: "kPa",
  name: "Kilopascal",
};

const barUnit: UnitDefinition = {
  slug: "bar",
  unit: "bar",
  name: "Bar",
};

const psiUnit: UnitDefinition = {
  slug: "psi",
  unit: "psi",
  name: "PSI",
};

const atmosphereUnit: UnitDefinition = {
  slug: "atmosfer",
  unit: "atm",
  name: "Atmosfer",
};

const millimetreOfMercuryUnit: UnitDefinition = {
  slug: "milimetre-civa",
  unit: "mmHg",
  name: "Milimetre Cıva",
};

const kilogramForcePerSquareCentimetreUnit: UnitDefinition = {
  slug: "kilogram-kuvvet-santimetrekare",
  unit: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
  name: "Kilogram-kuvvet/santimetrekare",
};

const squareMetre: UnitDefinition = {
  slug: "metrekare",
  unit: `m${SQUARE_SUFFIX}`,
  name: "Metrekare",
};

const hectare: UnitDefinition = {
  slug: "hektar",
  unit: "ha",
  name: "Hektar",
};

const squareFoot: UnitDefinition = {
  slug: "fitkare",
  unit: `ft${SQUARE_SUFFIX}`,
  name: "Fitkare",
};

const litre: UnitDefinition = {
  slug: "litre",
  unit: "L",
  name: "Litre",
};

const cubicMetre: UnitDefinition = {
  slug: "metrekup",
  unit: `m${CUBIC_SUFFIX}`,
  name: "Metreküp",
};

const millilitre: UnitDefinition = {
  slug: "mililitre",
  unit: "mL",
  name: "Mililitre",
};

const celsius: UnitDefinition = {
  slug: "santigrat",
  unit: "C",
  name: "Santigrat",
};

const fahrenheit: UnitDefinition = {
  slug: "fahrenhayt",
  unit: "F",
  name: "Fahrenheit",
};

const kelvin: UnitDefinition = {
  slug: "kelvin",
  unit: "K",
  name: "Kelvin",
};

const secondUnit: UnitDefinition = {
  slug: "saniye",
  unit: "s",
  name: "Saniye",
};

const minuteUnit: UnitDefinition = {
  slug: "dakika",
  unit: "min",
  name: "Dakika",
};

const hourUnit: UnitDefinition = {
  slug: "saat",
  unit: "h",
  name: "Saat",
};

const metrePerSecond: UnitDefinition = {
  slug: "metre-saniye",
  unit: "m/s",
  name: "Metre/Saniye",
};

const kilometrePerHour: UnitDefinition = {
  slug: "kilometre-saat",
  unit: "km/h",
  name: "Kilometre/Saat",
};

const milePerHour: UnitDefinition = {
  slug: "mil-saat",
  unit: "mph",
  name: "Mil/Saat",
};

const joule: UnitDefinition = {
  slug: "joule",
  unit: "J",
  name: "Joule",
};

const kilowattHour: UnitDefinition = {
  slug: "kilovatsaat",
  unit: "kWh",
  name: "Kilovat-saat",
};

const watt: UnitDefinition = {
  slug: "watt",
  unit: "W",
  name: "Watt",
};

const kilowatt: UnitDefinition = {
  slug: "kilowatt",
  unit: "kW",
  name: "Kilowatt",
};

const cubicMetrePerHour: UnitDefinition = {
  slug: "metrekup-saat",
  unit: `m${CUBIC_SUFFIX}/h`,
  name: "Metreküp/Saat",
};

const litrePerMinute: UnitDefinition = {
  slug: "litre-dakika",
  unit: "L/min",
  name: "Litre/Dakika",
};

const volt: UnitDefinition = {
  slug: "volt",
  unit: "V",
  name: "Volt",
};

const kilovolt: UnitDefinition = {
  slug: "kilovolt",
  unit: "kV",
  name: "Kilovolt",
};

const ampere: UnitDefinition = {
  slug: "amper",
  unit: "A",
  name: "Amper",
};

const milliampere: UnitDefinition = {
  slug: "miliamper",
  unit: "mA",
  name: "Miliamper",
};

function formatValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("tr-TR", {
    maximumFractionDigits: 12,
  });
}

function createOperation(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatValue(1 / factor)}`;
}

function createExplanation(
  from: UnitDefinition,
  to: UnitDefinition,
  factor: number
) {
  const operation =
    factor >= 1
      ? `${formatValue(factor)} ile çarpılır`
      : `${formatValue(1 / factor)} değerine bölünür`;

  return (
    `${from.name} ile ${to.name} arasındaki dönüşümde ` +
    `${from.name.toLocaleLowerCase("tr-TR")} değeri ${operation}. ` +
    `1 ${from.unit}, ${formatValue(factor)} ${to.unit} değerine eşittir.`
  );
}

function createConversionPair(
  definition: PairDefinition
): ConversionPage[] {
  const {
    category,
    first,
    second,
    secondPerFirst,
    firstExamples,
    secondExamples,
    englishSlugs,
  } = definition;
  const forwardSlug = `${first.slug}-${second.slug}`;
  const reverseSlug = `${second.slug}-${first.slug}`;
  const firstPerSecond = 1 / secondPerFirst;

  const forwardPage: ConversionPage = {
    slug: forwardSlug,
    category,
    fromUnit: first.unit,
    toUnit: second.unit,
    fromName: first.name,
    toName: second.name,
    formula: createOperation(
      first.name,
      second.name,
      secondPerFirst
    ),
    explanation: createExplanation(
      first,
      second,
      secondPerFirst
    ),
    exampleValues: firstExamples,
    reverseSlug,
    englishSlug: englishSlugs?.forward,
    englishReverseSlug: englishSlugs?.reverse,
  };

  const reversePage: ConversionPage = {
    slug: reverseSlug,
    category,
    fromUnit: second.unit,
    toUnit: first.unit,
    fromName: second.name,
    toName: first.name,
    formula: createOperation(
      second.name,
      first.name,
      firstPerSecond
    ),
    explanation: createExplanation(
      second,
      first,
      firstPerSecond
    ),
    exampleValues: secondExamples,
    reverseSlug: forwardSlug,
    englishSlug: englishSlugs?.reverse,
    englishReverseSlug: englishSlugs?.forward,
  };

  return [forwardPage, reversePage];
}

const pairDefinitions: PairDefinition[] = [
  {
    category: "uzunluk",
    first: metre,
    second: kilometre,
    secondPerFirst: 0.001,
    firstExamples: [1, 5, 10, 50, 100, 500, 1000],
    secondExamples: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    category: "uzunluk",
    first: metre,
    second: santimetre,
    secondPerFirst: 100,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 10, 50, 100, 250, 500, 1000],
  },
  {
    category: "uzunluk",
    first: metre,
    second: milimetre,
    secondPerFirst: 1000,
    firstExamples: [0.01, 0.1, 0.5, 1, 2, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "uzunluk",
    first: kilometre,
    second: mil,
    secondPerFirst: 0.621371192237,
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    first: metre,
    second: fit,
    secondPerFirst: 3.28083989501,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    first: santimetre,
    second: milimetre,
    secondPerFirst: 10,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 5, 10, 20, 50, 100, 1000],
  },
  {
    category: "uzunluk",
    first: santimetre,
    second: inc,
    secondPerFirst: 0.3937007874015748,
    firstExamples: [1, 2.54, 10, 25, 50, 100, 250],
    secondExamples: [1, 2, 4, 10, 12, 24, 36],
    englishSlugs: {
      forward: "centimeters-to-inches",
      reverse: "inches-to-centimeters",
    },
  },
  {
    category: "uzunluk",
    first: metre,
    second: yarda,
    secondPerFirst: 1.0936132983377078,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 250],
    englishSlugs: {
      forward: "meters-to-yards",
      reverse: "yards-to-meters",
    },
  },
  {
    category: "uzunluk",
    first: fit,
    second: inc,
    secondPerFirst: 12,
    firstExamples: [1, 2, 3, 5, 10, 25, 50],
    secondExamples: [1, 6, 12, 24, 36, 48, 120],
    englishSlugs: {
      forward: "feet-to-inches",
      reverse: "inches-to-feet",
    },
  },
  {
    category: "uzunluk",
    first: mil,
    second: fit,
    secondPerFirst: 5280,
    firstExamples: [0.25, 0.5, 1, 2, 5, 10, 26.2],
    secondExamples: [1, 10, 100, 5280, 10000, 25000, 52800],
    englishSlugs: {
      forward: "miles-to-feet",
      reverse: "feet-to-miles",
    },
  },
  {
    category: "kutle",
    first: kilogram,
    second: gram,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    first: gram,
    second: miligram,
    secondPerFirst: 1000,
    firstExamples: [0.001, 0.01, 0.1, 0.5, 1, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    first: kilogram,
    second: pound,
    secondPerFirst: 2.20462262185,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "kutle",
    first: ton,
    second: kilogram,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
    englishSlugs: {
      forward: "tonnes-to-kilograms",
      reverse: "kilograms-to-tonnes",
    },
  },
  {
    category: "kutle",
    first: gram,
    second: ons,
    secondPerFirst: 0.0352739619495804,
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
    englishSlugs: {
      forward: "grams-to-ounces",
      reverse: "ounces-to-grams",
    },
  },
  {
    category: "kutle",
    first: pound,
    second: ons,
    secondPerFirst: 16,
    firstExamples: [0.5, 1, 2, 5, 10, 25, 50],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
    englishSlugs: {
      forward: "pounds-to-ounces",
      reverse: "ounces-to-pounds",
    },
  },
  {
    category: "basinc",
    first: psiUnit,
    second: barUnit,
    secondPerFirst: 0.06894757293168,
    firstExamples: [1, 5, 10, 15, 30, 50, 100],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: kilopascal,
    second: barUnit,
    secondPerFirst: 0.01,
    firstExamples: [1, 10, 50, 100, 250, 500, 1000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: pascal,
    second: barUnit,
    secondPerFirst: 0.00001,
    firstExamples: [1, 100, 1000, 10000, 50000, 100000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: atmosphereUnit,
    second: barUnit,
    secondPerFirst: 1.01325,
    firstExamples: [0.5, 1, 2, 5, 10, 20, 50],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    englishSlugs: {
      forward: "atmospheres-to-bar",
      reverse: "bar-to-atmospheres",
    },
  },
  {
    category: "basinc",
    first: millimetreOfMercuryUnit,
    second: pascal,
    secondPerFirst: 133.322387415,
    firstExamples: [1, 5, 10, 25, 50, 100, 760],
    secondExamples: [1, 10, 100, 1000, 5000, 10000, 101325],
    englishSlugs: {
      forward: "millimeters-of-mercury-to-pascals",
      reverse: "pascals-to-millimeters-of-mercury",
    },
  },
  {
    category: "basinc",
    first: kilogramForcePerSquareCentimetreUnit,
    second: barUnit,
    secondPerFirst: 0.980665,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    englishSlugs: {
      forward: "kilogram-force-per-square-centimeter-to-bar",
      reverse: "bar-to-kilogram-force-per-square-centimeter",
    },
  },
  {
    category: "alan",
    first: squareMetre,
    second: squareFoot,
    secondPerFirst: 10.7639104167,
    firstExamples: [1, 5, 10, 25, 50, 100, 250],
    secondExamples: [1, 10, 50, 100, 250, 500, 1000],
  },
  {
    category: "alan",
    first: hectare,
    second: squareMetre,
    secondPerFirst: 10000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [10, 100, 500, 1000, 5000, 10000, 50000],
  },
  {
    category: "hacim",
    first: litre,
    second: cubicMetre,
    secondPerFirst: 0.001,
    firstExamples: [1, 10, 50, 100, 250, 500, 1000],
    secondExamples: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
  },
  {
    category: "hacim",
    first: litre,
    second: millilitre,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "zaman",
    first: secondUnit,
    second: hourUnit,
    secondPerFirst: 1 / 3600,
    firstExamples: [1, 30, 60, 300, 1800, 3600, 7200],
    secondExamples: [0.25, 0.5, 1, 2, 4, 8, 12],
  },
  {
    category: "zaman",
    first: minuteUnit,
    second: hourUnit,
    secondPerFirst: 1 / 60,
    firstExamples: [1, 5, 10, 15, 30, 60, 120],
    secondExamples: [0.25, 0.5, 1, 2, 4, 8, 12],
  },
  {
    category: "hiz",
    first: kilometrePerHour,
    second: metrePerSecond,
    secondPerFirst: 1000 / 3600,
    firstExamples: [1, 5, 10, 30, 50, 90, 120],
    secondExamples: [1, 2, 5, 10, 15, 20, 30],
  },
  {
    category: "hiz",
    first: milePerHour,
    second: kilometrePerHour,
    secondPerFirst: 1.609344,
    firstExamples: [1, 5, 10, 30, 55, 60, 75],
    secondExamples: [10, 30, 50, 80, 100, 120, 130],
  },
  {
    category: "enerji",
    first: joule,
    second: kilowattHour,
    secondPerFirst: 1 / 3_600_000,
    firstExamples: [1, 1000, 10000, 100000, 1000000, 3600000],
    secondExamples: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
  },
  {
    category: "enerji",
    first: kilowatt,
    second: watt,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 50],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "debi",
    first: cubicMetrePerHour,
    second: litrePerMinute,
    secondPerFirst: 1000 / 60,
    firstExamples: [0.5, 1, 2, 5, 10, 20, 50],
    secondExamples: [1, 5, 10, 20, 50, 100, 250],
  },
  {
    category: "elektrik",
    first: volt,
    second: kilovolt,
    secondPerFirst: 0.001,
    firstExamples: [1, 12, 24, 230, 400, 1000, 10000],
    secondExamples: [0.1, 0.5, 1, 5, 10, 20, 50],
  },
  {
    category: "elektrik",
    first: ampere,
    second: milliampere,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    secondExamples: [1, 5, 10, 20, 100, 500, 1000],
  },
];

const customConversionPages: ConversionPage[] = [
  {
    slug: "santigrat-fahrenhayt",
    category: "sicaklik",
    fromUnit: "C",
    toUnit: "F",
    fromName: "Santigrat",
    toName: "Fahrenheit",
    formula: "Fahrenheit = (Santigrat × 9/5) + 32",
    explanation:
      "Santigrat değeri Fahrenheit birimine çevrilirken önce 9/5 ile çarpılır, ardından 32 eklenir. 1 C, 33,8 F eder.",
    exampleValues: [-40, 0, 20, 37, 100],
    reverseSlug: "fahrenhayt-santigrat",
    englishSlug: "celsius-to-fahrenheit",
    englishReverseSlug: "fahrenheit-to-celsius",
  },
  {
    slug: "fahrenhayt-santigrat",
    category: "sicaklik",
    fromUnit: "F",
    toUnit: "C",
    fromName: "Fahrenheit",
    toName: "Santigrat",
    formula: "Santigrat = (Fahrenheit − 32) × 5/9",
    explanation:
      "Fahrenheit değeri Santigrat birimine çevrilirken önce 32 çıkarılır, sonra sonuç 5/9 ile çarpılır. 32 F, 0 C eder.",
    exampleValues: [-40, 32, 68, 98.6, 212],
    reverseSlug: "santigrat-fahrenhayt",
    englishSlug: "fahrenheit-to-celsius",
    englishReverseSlug: "celsius-to-fahrenheit",
  },
  {
    slug: "santigrat-kelvin",
    category: "sicaklik",
    fromUnit: "C",
    toUnit: "K",
    fromName: "Santigrat",
    toName: "Kelvin",
    formula: "Kelvin = Santigrat + 273,15",
    explanation:
      "Santigrat değeri Kelvin birimine çevrilirken 273,15 eklenir. 0 C, 273,15 K değerine karşılık gelir.",
    exampleValues: [-40, 0, 20, 100, 200],
    reverseSlug: "kelvin-santigrat",
    englishSlug: "celsius-to-kelvin",
    englishReverseSlug: "kelvin-to-celsius",
  },
  {
    slug: "kelvin-santigrat",
    category: "sicaklik",
    fromUnit: "K",
    toUnit: "C",
    fromName: "Kelvin",
    toName: "Santigrat",
    formula: "Santigrat = Kelvin − 273,15",
    explanation:
      "Kelvin değeri Santigrat birimine çevrilirken 273,15 çıkarılır. 273,15 K, 0 C eder.",
    exampleValues: [233.15, 273.15, 293.15, 310.15, 373.15],
    reverseSlug: "santigrat-kelvin",
    englishSlug: "kelvin-to-celsius",
    englishReverseSlug: "celsius-to-kelvin",
  },
];

export const conversionPages: ConversionPage[] = [
  ...pairDefinitions.flatMap(createConversionPair),
  ...customConversionPages,
];
