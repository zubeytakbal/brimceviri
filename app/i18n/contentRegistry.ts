import { calculatorPages } from "../converter/calculatorPages";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { type Locale } from "./config";
import { germanCalculatorPages } from "../converter/localizedGermanCalculatorPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";
import { germanUnitPages } from "../converter/localizedGermanUnitPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { uzbekCategoryPages } from "../converter/localizedUzbekCategoryPages";
import { uzbekUnitPages } from "../converter/localizedUzbekUnitPages";
import { uzbekConversionPages } from "../converter/localizedUzbekConversionPages";
import { bengaliCategoryPages } from "../converter/localizedBengaliCategoryPages";
import { bengaliUnitPages } from "../converter/localizedBengaliUnitPages";
import { bengaliConversionPages } from "../converter/localizedBengaliConversionPages";
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
  ar: englishCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  uz: uzbekCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  bn: bengaliCategoryPages.map((page) => ({
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
    ar: englishUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    uz: uzbekUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    bn: bengaliUnitPages.map((page) => ({
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
    ar: englishCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    uz: uzbekCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    bn: bengaliCategoryPages.map((page) => ({
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
    ar: englishCalculatorPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    uz: [],
    bn: [],
  },
  conversions: {
    tr: conversionPages.map((page) => ({
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
    ar: englishConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    uz: uzbekConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    bn: bengaliConversionPages.map((page) => ({
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
