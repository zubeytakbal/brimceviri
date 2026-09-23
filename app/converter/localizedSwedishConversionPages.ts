import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { swedishUnitPages } from "./localizedSwedishUnitPages";

export type LocalizedSwedishConversionPage = ConversionPage & {
  locale: "sv";
  sourceSlug: string;
  categoryName: string;
};

const swedishCategoryNames: Record<string, string> = {
  uzunluk: "Langd",
  alan: "Area",
  hacim: "Volym",
  kutle: "Massa",
  sicaklik: "Temperatur",
  zaman: "Tid",
  hiz: "Hastighet",
  basinc: "Tryck",
  enerji: "Energi",
  debi: "Flode",
  elektrik: "Elektricitet",
  yogunluk: "Densitet",
  kuvvet: "Kraft",
  tork: "Vridmoment",
  aci: "Vinkel",
  frekans: "Frekvens",
  debi_hacimsel: "Volymflode",
  debi_kutlesel: "Massflode",
  manyetik_alan: "Magnetfalt",
  manyetik_aki: "Magnetiskt flode",
  viskozite_kinematik: "Kinematisk viskositet",
  isil_iletkenlik: "Varmeledningsformaga",
  isi_akisi: "Varmeflode",
  ozgul_isi: "Specifik varme",
  ivme: "Acceleration",
  acisal_hiz: "Vinkelhastighet",
  guc: "Effekt",
  momentum: "Rorelsemangd",
  viskozite_dinamik: "Viskositet",
  veri: "Datalagring",
  elektrik_direnc: "Resistans",
  kapasitans: "Kapacitans",
  enduktans: "Induktans",
  elektrik_yuk: "Elektrisk laddning",
  altin_ayar: "Guldkarat",
  gumus_ayar: "Silverhalt",
  kan_sekeri: "Blodsocker",
  vitamin_d: "D-vitamin",
};

function formatSwedishValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("sv-SE", {
    maximumFractionDigits: 12,
  });
}

function createSwedishFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatSwedishValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatSwedishValue(1 / factor)}`;
}

function createSwedishExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `For att omvandla ${fromName} till ${toName}, multiplicera utgangsvardet med ${formatSwedishValue(
      factor
    )}. 1 ${fromUnit} = ${formatSwedishValue(factor)} ${toUnit}.`;
  }

  return `For att omvandla ${fromName} till ${toName}, dividera utgangsvardet med ${formatSwedishValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatSwedishValue(factor)} ${toUnit}.`;
}

function createSwedishTemperatureFormula(
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
    return `${toName} = ${fromName} + 273,15`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${toName} = ${fromName} − 273,15`;
  }

  if (fromUnit === "C" && toUnit === "R") {
    return `${toName} = (${fromName} + 273,15) × 9/5`;
  }

  if (fromUnit === "R" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/9 − 273,15`;
  }

  if (fromUnit === "F" && toUnit === "R") {
    return `${toName} = ${fromName} + 459,67`;
  }

  if (fromUnit === "R" && toUnit === "F") {
    return `${toName} = ${fromName} − 459,67`;
  }

  if (fromUnit === "C" && toUnit === "Re") {
    return `${toName} = ${fromName} × 4/5`;
  }

  if (fromUnit === "Re" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/4`;
  }

  return `${toName} = ${fromName}`;
}

function createSwedishTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `For att omvandla ${fromName} till ${toName}, multiplicera med 9/5 och addera 32. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `For att omvandla ${fromName} till ${toName}, subtrahera forst 32 och multiplicera resultatet med 5/9. 32 ${fromUnit} motsvarar 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `For att omvandla ${fromName} till ${toName}, addera 273,15. 0 ${fromUnit} motsvarar 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `For att omvandla ${fromName} till ${toName}, subtrahera 273,15. 273,15 ${fromUnit} motsvarar 0 ${toUnit}.`;
  }

  return `Anvand det definierade temperatursambandet for att omvandla ${fromName} till ${toName}.`;
}

const swedishUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    swedishUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedSwedishConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromSv = swedishUnitBySourceSlug[from.tr.slug];
  const toSv = swedishUnitBySourceSlug[to.tr.slug];

  if (!fromSv || !toSv) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "sv",
    sourceSlug: page.slug,
    slug: `${fromSv.slug}-${toSv.slug}`,
    fromName: fromSv.name,
    toName: toSv.name,
    categoryName: swedishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createSwedishTemperatureFormula(
            fromSv.name,
            toSv.name,
            page.fromUnit,
            page.toUnit
          )
        : createSwedishFormula(fromSv.name, toSv.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createSwedishTemperatureExplanation(
            fromSv.name,
            toSv.name,
            page.fromUnit,
            page.toUnit
          )
        : createSwedishExplanation(
            fromSv.name,
            toSv.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toSv.slug}-${fromSv.slug}`,
  };
}

export const swedishConversionPages: LocalizedSwedishConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedSwedishConversionPage => page !== null
    );

export function findSwedishConversionPage(slug: string) {
  return swedishConversionPages.find((page) => page.slug === slug);
}

export function findSwedishConversionPageByTurkishSlug(sourceSlug: string) {
  return swedishConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
