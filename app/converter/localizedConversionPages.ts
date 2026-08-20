import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { findUnit } from "./unitRegistry";

export type LocalizedConversionPage = ConversionPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
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
  yogunluk: "Density",
  kuvvet: "Force",
  tork: "Torque",
  momentum: "Momentum",
  viskozite_dinamik: "Viscosity",
};

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
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.en || !to?.en) {
    return null;
  }

  const fromSlug = from.enConversionSlug ?? from.en.slug;
  const toSlug = to.enConversionSlug ?? to.en.slug;

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
    slug: page.englishSlug ?? `${fromSlug}-to-${toSlug}`,
    fromName: from.en.name,
    toName: to.en.name,
    categoryName:
      englishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createTemperatureFormula(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishFormula(from.en.name, to.en.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createTemperatureExplanation(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishExplanation(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug:
      page.englishReverseSlug ?? `${toSlug}-to-${fromSlug}`,
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
