import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { bengaliUnitPages } from "./localizedBengaliUnitPages";

export type LocalizedBengaliConversionPage = ConversionPage & {
  locale: "bn";
  sourceSlug: string;
  categoryName: string;
};

const bengaliCategoryNames: Record<string, string> = {
  uzunluk: "দৈর্ঘ্য",
  alan: "ক্ষেত্রফল",
  hacim: "আয়তন",
  kutle: "ভর",
  sicaklik: "তাপমাত্রা",
  zaman: "সময়",
  hiz: "গতি",
  basinc: "চাপ",
  enerji: "শক্তি",
  debi: "প্রবাহ হার",
  elektrik: "বিদ্যুৎ",
  yogunluk: "ঘনত্ব",
  kuvvet: "বল",
  tork: "টর্ক",
  aci: "কোণ",
  frekans: "কম্পাঙ্ক",
  debi_hacimsel: "আয়তনিক প্রবাহ হার",
  debi_kutlesel: "ভরের প্রবাহ হার",
  manyetik_alan: "চৌম্বক ক্ষেত্র প্রাবল্য",
  manyetik_aki: "চৌম্বক ফ্লাক্স",
  viskozite_kinematik: "গতীয় সান্দ্রতা",
  isil_iletkenlik: "তাপ পরিবাহিতা",
  isi_akisi: "তাপ প্রবাহ ঘনত্ব",
  ozgul_isi: "আপেক্ষিক তাপ ধারণক্ষমতা",
  ivme: "ত্বরণ",
  acisal_hiz: "কৌণিক বেগ",
  guc: "ক্ষমতা",
  momentum: "ভরবেগ",
  viskozite_dinamik: "সান্দ্রতা",
  veri: "ডেটা স্টোরেজ",
  elektrik_direnc: "রোধ",
  kapasitans: "ধারকত্ব",
  enduktans: "আবেশ",
  elektrik_yuk: "তড়িৎ আধান",
  altin_ayar: "স্বর্ণের ক্যারেট",
};

function formatBengaliValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("bn-BD", {
    maximumFractionDigits: 12,
  });
}

function createBengaliFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatBengaliValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatBengaliValue(1 / factor)}`;
}

function createBengaliExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `${fromName} কে ${toName} এ রূপান্তর করতে মূল মানকে ${formatBengaliValue(
      factor
    )} দিয়ে গুণ করা হয়। ১ ${fromUnit} = ${formatBengaliValue(factor)} ${toUnit}।`;
  }

  return `${fromName} কে ${toName} এ রূপান্তর করতে মূল মানকে ${formatBengaliValue(
    1 / factor
  )} দিয়ে ভাগ করা হয়। ১ ${fromUnit} = ${formatBengaliValue(factor)} ${toUnit}।`;
}

function createBengaliTemperatureFormula(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${toName} = (${fromName} × ৯/৫) + ৩২`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${toName} = (${fromName} − ৩২) × ৫/৯`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${toName} = ${fromName} + ২৭৩.১৫`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${toName} = ${fromName} − ২৭৩.১৫`;
  }

  return `${toName} = ${fromName}`;
}

function createBengaliTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${fromName} কে ${toName} এ রূপান্তর করতে ৯/৫ দিয়ে গুণ করে ৩২ যোগ করা হয়। ১ ${fromUnit} = ৩৩.৮ ${toUnit}।`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${fromName} কে ${toName} এ রূপান্তর করতে প্রথমে ৩২ বিয়োগ করে ফলাফলকে ৫/৯ দিয়ে গুণ করা হয়। ৩২ ${fromUnit} = ০ ${toUnit} এর সমান।`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${fromName} কে ${toName} এ রূপান্তর করতে ২৭৩.১৫ যোগ করা হয়। ০ ${fromUnit} = ২৭৩.১৫ ${toUnit} এর সমান।`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${fromName} কে ${toName} এ রূপান্তর করতে ২৭৩.১৫ বিয়োগ করা হয়। ২৭৩.১৫ ${fromUnit} = ০ ${toUnit} এর সমান।`;
  }

  return `${fromName} কে ${toName} এ রূপান্তর করতে নির্ধারিত তাপমাত্রা সম্পর্ক ব্যবহার করুন।`;
}

const bengaliUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    bengaliUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedBengaliConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromBn = bengaliUnitBySourceSlug[from.tr.slug];
  const toBn = bengaliUnitBySourceSlug[to.tr.slug];

  if (!fromBn || !toBn) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "bn",
    sourceSlug: page.slug,
    slug: `${fromBn.slug}-${toBn.slug}`,
    fromName: fromBn.name,
    toName: toBn.name,
    categoryName: bengaliCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createBengaliTemperatureFormula(
            fromBn.name,
            toBn.name,
            page.fromUnit,
            page.toUnit
          )
        : createBengaliFormula(fromBn.name, toBn.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createBengaliTemperatureExplanation(
            fromBn.name,
            toBn.name,
            page.fromUnit,
            page.toUnit
          )
        : createBengaliExplanation(
            fromBn.name,
            toBn.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toBn.slug}-${fromBn.slug}`,
  };
}

export const bengaliConversionPages: LocalizedBengaliConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedBengaliConversionPage => page !== null
    );

export function findBengaliConversionPage(slug: string) {
  return bengaliConversionPages.find((page) => page.slug === slug);
}

export function findBengaliConversionPageByTurkishSlug(sourceSlug: string) {
  return bengaliConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
