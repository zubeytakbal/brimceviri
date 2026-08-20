import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { findUnit } from "./unitRegistry";

export type LocalizedGermanConversionPage = ConversionPage & {
  locale: "de";
  sourceSlug: string;
  categoryName: string;
};

const germanCategoryNames: Record<string, string> = {
  alan: "Fläche",
  hacim: "Volumen",
  uzunluk: "Länge",
  kutle: "Masse",
  sicaklik: "Temperatur",
  zaman: "Zeit",
  hiz: "Geschwindigkeit",
  basinc: "Druck",
  enerji: "Energie",
  debi: "Durchfluss",
  elektrik: "Elektrizität",
  yogunluk: "Dichte",
  kuvvet: "Kraft",
  tork: "Drehmoment",
  momentum: "Impuls",
  viskozite_dinamik: "Viskosität",
};

function formatGermanValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("de-DE", {
    maximumFractionDigits: 12,
  });
}

function createGermanFormula(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatGermanValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatGermanValue(1 / factor)}`;
}

function createGermanExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} wird der Ausgangswert mit ${formatGermanValue(
      factor
    )} multipliziert. 1 ${fromUnit} entspricht ${formatGermanValue(
      factor
    )} ${toUnit}.`;
  }

  return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} wird der Ausgangswert durch ${formatGermanValue(
    1 / factor
  )} dividiert. 1 ${fromUnit} entspricht ${formatGermanValue(
    factor
  )} ${toUnit}.`;
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
    return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} wird mit 9/5 multipliziert und anschließend 32 addiert. 1 ${fromUnit} entspricht 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} werden zuerst 32 abgezogen und das Ergebnis danach mit 5/9 multipliziert. 32 ${fromUnit} entsprechen 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} werden 273,15 addiert. 0 ${fromUnit} entsprechen 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `Zur Umrechnung von ${fromName.toLowerCase()} in ${toName.toLowerCase()} werden 273,15 subtrahiert. 273,15 ${fromUnit} entsprechen 0 ${toUnit}.`;
  }

  return `Verwenden Sie die definierte Temperaturbeziehung, um ${fromName.toLowerCase()} in ${toName.toLowerCase()} umzurechnen.`;
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedGermanConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.de || !to?.de) {
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
    locale: "de",
    sourceSlug: page.slug,
    slug: `${from.de.slug}-${to.de.slug}`,
    fromName: from.de.name,
    toName: to.de.name,
    categoryName:
      germanCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createTemperatureFormula(
            from.de.name,
            to.de.name,
            page.fromUnit,
            page.toUnit
          )
        : createGermanFormula(from.de.name, to.de.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createTemperatureExplanation(
            from.de.name,
            to.de.name,
            page.fromUnit,
            page.toUnit
          )
        : createGermanExplanation(
            from.de.name,
            to.de.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${to.de.slug}-${from.de.slug}`,
  };
}

export const germanConversionPages: LocalizedGermanConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (
        page
      ): page is LocalizedGermanConversionPage => page !== null
    );

export function findGermanConversionPage(slug: string) {
  return germanConversionPages.find((page) => page.slug === slug);
}

export function findGermanPageByTurkishSlug(sourceSlug: string) {
  return germanConversionPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
