import { calculatorPages } from "../converter/calculatorPages";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { ciftYayinda } from "../converter/mergedPairs";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { type Locale } from "./config";
import { germanCalculatorPages } from "../converter/localizedGermanCalculatorPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";
import { germanUnitPages } from "../converter/localizedGermanUnitPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { unitPages } from "../converter/unitPages";

export type RouteCollectionKey =
  | "units"
  | "categories"
  | "calculators"
  | "conversions";

export type LocalizedSlugEntry = {
  sourceSlug: string;
  slug: string;
};

export type LocalizedCategorySummary = LocalizedSlugEntry & {
  category: string;
  title: string;
};

const localizedCategorySummariesByLocale: Record<
  Locale,
  LocalizedCategorySummary[]
> = {
  tr: categoryPages.map((page) => ({
    sourceSlug: page.slug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  en: englishCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  de: germanCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
};

const localizedSlugEntriesByLocale: Record<
  RouteCollectionKey,
  Record<Locale, LocalizedSlugEntry[]>
> = {
  // es, fr, pt, it, nl, sv, no, da, ar, uz, bn: birim bilgisi kategori sayfasındaki sözlükte, ayrı sayfa yok.
  units: {
    tr: unitPages.map((page) => ({
      sourceSlug: page.slug,
      slug: page.slug,
    })),
    en: englishUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    de: germanUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
  },
  categories: {
    tr: categoryPages.map((page) => ({
      sourceSlug: page.slug,
      slug: page.slug,
    })),
    en: englishCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    de: germanCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
  },
  calculators: {
    tr: calculatorPages.map((page) => ({
      sourceSlug: page.slug,
      slug: page.slug,
    })),
    en: englishCalculatorPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    de: germanCalculatorPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
  },
  conversions: {
    // Ters yönü birleştirilen Türkçe adresler yayında değil; diğer diller onlara hreflang vermesin.
    tr: conversionPages.filter((page) => ciftYayinda(page.slug)).map((page) => ({
      sourceSlug: page.slug,
      slug: page.slug,
    })),
    en: englishConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    de: germanConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
  },
};

export function getLocalizedCategorySummaries(locale: Locale) {
  return localizedCategorySummariesByLocale[locale];
}

export function getLocalizedSlugEntries(
  locale: Locale,
  collection: RouteCollectionKey
) {
  return localizedSlugEntriesByLocale[collection][locale];
}
