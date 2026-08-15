import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type LocalizedConversionPage = ConversionPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
};

type EnglishUnit = {
  name: string;
  slug: string;
};

const englishUnits: Record<string, EnglishUnit> = {
  "uzunluk:m": {
    name: "Meter",
    slug: "meters",
  },
  "uzunluk:km": {
    name: "Kilometer",
    slug: "kilometers",
  },
  "uzunluk:cm": {
    name: "Centimeter",
    slug: "centimeters",
  },
  "uzunluk:mm": {
    name: "Millimeter",
    slug: "millimeters",
  },
  "uzunluk:mi": {
    name: "Mile",
    slug: "miles",
  },
  "uzunluk:ft": {
    name: "Foot",
    slug: "feet",
  },
  "uzunluk:in": {
    name: "Inch",
    slug: "inches",
  },
  "uzunluk:yd": {
    name: "Yard",
    slug: "yards",
  },
  "alan:m²": {
    name: "Square Meter",
    slug: "square-meters",
  },
  "alan:ha": {
    name: "Hectare",
    slug: "hectares",
  },
  "alan:ft²": {
    name: "Square Foot",
    slug: "square-feet",
  },
  "hacim:L": {
    name: "Liter",
    slug: "liters",
  },
  "hacim:m³": {
    name: "Cubic Meter",
    slug: "cubic-meters",
  },
  "hacim:mL": {
    name: "Milliliter",
    slug: "milliliters",
  },
  "kutle:kg": {
    name: "Kilogram",
    slug: "kilograms",
  },
  "kutle:g": {
    name: "Gram",
    slug: "grams",
  },
  "kutle:mg": {
    name: "Milligram",
    slug: "milligrams",
  },
  "kutle:lb": {
    name: "Pound",
    slug: "pounds",
  },
  "kutle:ton": {
    name: "Tonne",
    slug: "tonnes",
  },
  "kutle:oz": {
    name: "Ounce",
    slug: "ounces",
  },
  "basinc:Pa": {
    name: "Pascal",
    slug: "pascals",
  },
  "basinc:kPa": {
    name: "Kilopascal",
    slug: "kilopascals",
  },
  "basinc:bar": {
    name: "Bar",
    slug: "bars",
  },
  "basinc:psi": {
    name: "PSI",
    slug: "psi",
  },
  "basinc:atm": {
    name: "Atmosphere",
    slug: "atmospheres",
  },
  "basinc:mmHg": {
    name: "Millimeter of Mercury",
    slug: "millimeters-of-mercury",
  },
  [`basinc:${KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT}`]: {
    name: "Kilogram-Force per Square Centimeter",
    slug: "kilogram-force-per-square-centimeter",
  },
  "sicaklik:C": {
    name: "Celsius",
    slug: "celsius",
  },
  "sicaklik:F": {
    name: "Fahrenheit",
    slug: "fahrenheit",
  },
  "sicaklik:K": {
    name: "Kelvin",
    slug: "kelvin",
  },
  "zaman:s": {
    name: "Second",
    slug: "seconds",
  },
  "zaman:min": {
    name: "Minute",
    slug: "minutes",
  },
  "zaman:h": {
    name: "Hour",
    slug: "hours",
  },
  "hiz:m/s": {
    name: "Meter per Second",
    slug: "meters-per-second",
  },
  "hiz:km/h": {
    name: "Kilometer per Hour",
    slug: "kilometers-per-hour",
  },
  "hiz:mph": {
    name: "Mile per Hour",
    slug: "miles-per-hour",
  },
  "enerji:J": {
    name: "Joule",
    slug: "joules",
  },
  "enerji:kWh": {
    name: "Kilowatt-hour",
    slug: "kilowatt-hours",
  },
  "enerji:W": {
    name: "Watt",
    slug: "watts",
  },
  "enerji:kW": {
    name: "Kilowatt",
    slug: "kilowatts",
  },
  "debi:m³/h": {
    name: "Cubic Meter per Hour",
    slug: "cubic-meters-per-hour",
  },
  "debi:L/min": {
    name: "Liter per Minute",
    slug: "liters-per-minute",
  },
  "elektrik:V": {
    name: "Volt",
    slug: "volts",
  },
  "elektrik:kV": {
    name: "Kilovolt",
    slug: "kilovolts",
  },
  "elektrik:A": {
    name: "Ampere",
    slug: "amperes",
  },
  "elektrik:mA": {
    name: "Milliampere",
    slug: "milliamperes",
  },
};

const englishCategoryNames: Record<string, string> = {
  alan: "Area",
  hacim: "Volume",
  uzunluk: "Length",
  kutle: "Mass",
  sicaklik: "Temperature",
  zaman: "Time",
  hiz: "Speed",
  basinc: "Pressure",
  enerji: "Energy and Power",
  debi: "Flow Rate",
  elektrik: "Electricity",
};

function findEnglishUnit(category: string, unit: string) {
  return englishUnits[`${category}:${unit}`];
}

function formatEnglishValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

function createEnglishFormula(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatEnglishValue(factor)}`;
  }

  return (
    `${toName} = ${fromName} ÷ ` +
    `${formatEnglishValue(1 / factor)}`
  );
}

function createEnglishExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  const operation =
    factor >= 1
      ? `multiply the ${fromName.toLowerCase()} value by ${formatEnglishValue(
          factor
        )}`
      : `divide the ${fromName.toLowerCase()} value by ${formatEnglishValue(
          1 / factor
        )}`;

  return (
    `To convert ${fromName.toLowerCase()} to ` +
    `${toName.toLowerCase()}, ${operation}. ` +
    `One ${fromUnit} is equal to ${formatEnglishValue(factor)} ${toUnit}.`
  );
}

function createTemperatureFormula(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${toName} = (${fromName} × 9/5) + 32`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${toName} = (${fromName} − 32) × 5/9`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${toName} = ${fromName} + 273.15`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${toName} = ${fromName} − 273.15`;
  }

  return `${toName} = ${fromName}`;
}

function createTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply by 9/5 and add 32. One ${fromUnit} equals 33.8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, subtract 32 and multiply the result by 5/9. A value of 32 ${fromUnit} equals 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, add 273.15. A value of 0 ${fromUnit} equals 273.15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, subtract 273.15. A value of 273.15 ${fromUnit} equals 0 ${toUnit}.`;
  }

  return `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} using the defined temperature relationship.`;
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedConversionPage | null {
  const from = findEnglishUnit(page.category, page.fromUnit);
  const to = findEnglishUnit(page.category, page.toUnit);

  if (!from || !to) {
    return null;
  }

  const factor = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );

  return {
    ...page,
    locale: "en",
    sourceSlug: page.slug,
    slug:
      page.englishSlug ?? `${from.slug}-to-${to.slug}`,
    fromName: from.name,
    toName: to.name,
    categoryName:
      englishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createTemperatureFormula(
            from.name,
            to.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishFormula(from.name, to.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createTemperatureExplanation(
            from.name,
            to.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishExplanation(
            from.name,
            to.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug:
      page.englishReverseSlug ?? `${to.slug}-to-${from.slug}`,
  };
}

export const englishConversionPages: LocalizedConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (
        page
      ): page is LocalizedConversionPage => page !== null
    );

export function findEnglishConversionPage(slug: string) {
  return englishConversionPages.find((page) => page.slug === slug);
}

export function findEnglishPageByTurkishSlug(sourceSlug: string) {
  return englishConversionPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
