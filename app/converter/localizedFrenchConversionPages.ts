import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { frenchUnitPages } from "./localizedFrenchUnitPages";

export type LocalizedFrenchConversionPage = ConversionPage & {
  locale: "fr";
  sourceSlug: string;
  categoryName: string;
};

const frenchCategoryNames: Record<string, string> = {
  uzunluk: "Longueur",
  alan: "Surface",
  hacim: "Volume",
  kutle: "Masse",
  sicaklik: "Temperature",
  zaman: "Temps",
  hiz: "Vitesse",
  basinc: "Pression",
  enerji: "Energie",
  debi: "Debit",
  elektrik: "Electricite",
  yogunluk: "Densite",
  kuvvet: "Force",
  tork: "Couple",
  aci: "Angle",
  frekans: "Frequence",
  debi_hacimsel: "Debit volumique",
  debi_kutlesel: "Debit massique",
  manyetik_alan: "Champ magnetique",
  manyetik_aki: "Flux magnetique",
  viskozite_kinematik: "Viscosite cinematique",
  isil_iletkenlik: "Conductivite thermique",
  isi_akisi: "Flux thermique",
  ozgul_isi: "Chaleur specifique",
  ivme: "Acceleration",
  acisal_hiz: "Vitesse angulaire",
  guc: "Puissance",
  momentum: "Quantite de mouvement",
  viskozite_dinamik: "Viscosite",
  veri: "Stockage de donnees",
  elektrik_direnc: "Resistance",
  kapasitans: "Capacitance",
  enduktans: "Inductance",
  elektrik_yuk: "Charge electrique",
  altin_ayar: "Carat d'or",
  gumus_ayar: "Titre d'argent",
  kan_sekeri: "Glycemie",
  vitamin_d: "Vitamine D",
};

function formatFrenchValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("fr-FR", {
    maximumFractionDigits: 12,
  });
}

function createFrenchFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatFrenchValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatFrenchValue(1 / factor)}`;
}

function createFrenchExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Pour convertir ${fromName} en ${toName}, on multiplie la valeur de depart par ${formatFrenchValue(
      factor
    )}. 1 ${fromUnit} = ${formatFrenchValue(factor)} ${toUnit}.`;
  }

  return `Pour convertir ${fromName} en ${toName}, on divise la valeur de depart par ${formatFrenchValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatFrenchValue(factor)} ${toUnit}.`;
}

function createFrenchTemperatureFormula(
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

function createFrenchTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `Pour convertir ${fromName} en ${toName}, on multiplie par 9/5 puis on ajoute 32. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `Pour convertir ${fromName} en ${toName}, on soustrait d'abord 32 puis on multiplie le resultat par 5/9. 32 ${fromUnit} equivaut a 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `Pour convertir ${fromName} en ${toName}, on ajoute 273,15. 0 ${fromUnit} equivaut a 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `Pour convertir ${fromName} en ${toName}, on soustrait 273,15. 273,15 ${fromUnit} equivaut a 0 ${toUnit}.`;
  }

  return `Utilisez la relation de temperature definie pour convertir ${fromName} en ${toName}.`;
}

const frenchUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    frenchUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedFrenchConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromFr = frenchUnitBySourceSlug[from.tr.slug];
  const toFr = frenchUnitBySourceSlug[to.tr.slug];

  if (!fromFr || !toFr) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "fr",
    sourceSlug: page.slug,
    slug: `${fromFr.slug}-${toFr.slug}`,
    fromName: fromFr.name,
    toName: toFr.name,
    categoryName: frenchCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createFrenchTemperatureFormula(
            fromFr.name,
            toFr.name,
            page.fromUnit,
            page.toUnit
          )
        : createFrenchFormula(fromFr.name, toFr.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createFrenchTemperatureExplanation(
            fromFr.name,
            toFr.name,
            page.fromUnit,
            page.toUnit
          )
        : createFrenchExplanation(
            fromFr.name,
            toFr.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toFr.slug}-${fromFr.slug}`,
  };
}

export const frenchConversionPages: LocalizedFrenchConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedFrenchConversionPage => page !== null
    );

export function findFrenchConversionPage(slug: string) {
  return frenchConversionPages.find((page) => page.slug === slug);
}

export function findFrenchConversionPageByTurkishSlug(sourceSlug: string) {
  return frenchConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
