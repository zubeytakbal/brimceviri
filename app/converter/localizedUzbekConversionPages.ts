import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { uzbekUnitPages } from "./localizedUzbekUnitPages";

export type LocalizedUzbekConversionPage = ConversionPage & {
  locale: "uz";
  sourceSlug: string;
  categoryName: string;
};

const uzbekCategoryNames: Record<string, string> = {
  uzunluk: "Uzunlik",
  alan: "Yuza",
  hacim: "Hajm",
  kutle: "Massa",
  sicaklik: "Harorat",
  zaman: "Vaqt",
  hiz: "Tezlik",
  basinc: "Bosim",
  enerji: "Energiya",
  debi: "Sarf",
  elektrik: "Elektr",
  yogunluk: "Zichlik",
  kuvvet: "Kuch",
  tork: "Tork",
  aci: "Burchak",
  frekans: "Chastota",
  debi_hacimsel: "Hajmiy sarf",
  debi_kutlesel: "Massaviy sarf",
  manyetik_alan: "Magnit maydoni",
  manyetik_aki: "Magnit oqimi",
  viskozite_kinematik: "Kinematik qovushqoqlik",
  isil_iletkenlik: "Issiqlik o'tkazuvchanligi",
  isi_akisi: "Issiqlik oqimi zichligi",
  ozgul_isi: "Solishtirma issiqlik sig'imi",
  ivme: "Tezlanish",
  acisal_hiz: "Burchak tezligi",
  guc: "Quvvat",
  momentum: "Impuls",
  viskozite_dinamik: "Qovushqoqlik",
  veri: "Ma'lumot hajmi",
  elektrik_direnc: "Qarshilik",
  kapasitans: "Sig'im",
  enduktans: "Induktivlik",
  elektrik_yuk: "Elektr zaryadi",
  altin_ayar: "Oltin karati",
};

function formatUzbekValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("uz-UZ", {
    maximumFractionDigits: 12,
  });
}

function createUzbekFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatUzbekValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatUzbekValue(1 / factor)}`;
}

function createUzbekExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun boshlang'ich qiymat ${formatUzbekValue(
      factor
    )} ga ko'paytiriladi. 1 ${fromUnit} = ${formatUzbekValue(factor)} ${toUnit}.`;
  }

  return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun boshlang'ich qiymat ${formatUzbekValue(
    1 / factor
  )} ga bo'linadi. 1 ${fromUnit} = ${formatUzbekValue(factor)} ${toUnit}.`;
}

function createUzbekTemperatureFormula(
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

function createUzbekTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun 9/5ga ko'paytirilib, natijaga 32 qo'shiladi. 1 ${fromUnit} = 33.8 ${toUnit}ga teng.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun avval 32 ayiriladi, so'ng natija 5/9ga ko'paytiriladi. 32 ${fromUnit} = 0 ${toUnit}ga teng.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun 273.15 qo'shiladi. 0 ${fromUnit} = 273.15 ${toUnit}ga teng.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun 273.15 ayiriladi. 273.15 ${fromUnit} = 0 ${toUnit}ga teng.`;
  }

  return `${fromName.toLowerCase()}ni ${toName.toLowerCase()}ga o'zgartirish uchun belgilangan harorat munosabatidan foydalaning.`;
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedUzbekConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  // Uzbek unit pages are hand-curated (not registry-name-driven like en/de),
  // so we look up the localized names from the uzbekUnitPages list instead
  // of a registry "uz" field -- keyed by tr.slug, NOT the registry id (which
  // page.fromUnit/toUnit actually are -- they can differ, e.g. id "pous" vs
  // tr.slug "bizans-ayagi"). See the sourceSlug-vs-id gotcha in memory.
  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromUz = uzbekUnitBySourceSlug[from.tr.slug];
  const toUz = uzbekUnitBySourceSlug[to.tr.slug];

  if (!fromUz || !toUz) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "uz",
    sourceSlug: page.slug,
    slug: `${fromUz.slug}-${toUz.slug}`,
    fromName: fromUz.name,
    toName: toUz.name,
    categoryName: uzbekCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createUzbekTemperatureFormula(
            fromUz.name,
            toUz.name,
            page.fromUnit,
            page.toUnit
          )
        : createUzbekFormula(fromUz.name, toUz.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createUzbekTemperatureExplanation(
            fromUz.name,
            toUz.name,
            page.fromUnit,
            page.toUnit
          )
        : createUzbekExplanation(
            fromUz.name,
            toUz.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toUz.slug}-${fromUz.slug}`,
  };
}

const uzbekUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    uzbekUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

export const uzbekConversionPages: LocalizedUzbekConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedUzbekConversionPage => page !== null
    );

export function findUzbekConversionPage(slug: string) {
  return uzbekConversionPages.find((page) => page.slug === slug);
}

export function findUzbekConversionPageByTurkishSlug(sourceSlug: string) {
  return uzbekConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
