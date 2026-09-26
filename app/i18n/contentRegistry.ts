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
import { arabicCategoryPages } from "../converter/localizedArabicCategoryPages";
import { frenchCategoryPages } from "../converter/localizedFrenchCategoryPages";
import { frenchUnitPages } from "../converter/localizedFrenchUnitPages";
import { frenchConversionPages } from "../converter/localizedFrenchConversionPages";
import { spanishCategoryPages } from "../converter/localizedSpanishCategoryPages";
import { spanishUnitPages } from "../converter/localizedSpanishUnitPages";
import { spanishConversionPages } from "../converter/localizedSpanishConversionPages";
import { es419CategoryPages } from "../converter/localizedEs419CategoryPages";
import { es419UnitPages } from "../converter/localizedEs419UnitPages";
import { es419ConversionPages } from "../converter/localizedEs419ConversionPages";
import { portugueseCategoryPages } from "../converter/localizedPortugueseCategoryPages";
import { portugueseUnitPages } from "../converter/localizedPortugueseUnitPages";
import { portugueseConversionPages } from "../converter/localizedPortugueseConversionPages";
import { italianCategoryPages } from "../converter/localizedItalianCategoryPages";
import { italianUnitPages } from "../converter/localizedItalianUnitPages";
import { italianConversionPages } from "../converter/localizedItalianConversionPages";
import { nederlandsCategoryPages } from "../converter/localizedNederlandsCategoryPages";
import { nederlandsUnitPages } from "../converter/localizedNederlandsUnitPages";
import { nederlandsConversionPages } from "../converter/localizedNederlandsConversionPages";
import { swedishCategoryPages } from "../converter/localizedSwedishCategoryPages";
import { swedishUnitPages } from "../converter/localizedSwedishUnitPages";
import { swedishConversionPages } from "../converter/localizedSwedishConversionPages";
import { norwegianCategoryPages } from "../converter/localizedNorwegianCategoryPages";
import { norwegianUnitPages } from "../converter/localizedNorwegianUnitPages";
import { norwegianConversionPages } from "../converter/localizedNorwegianConversionPages";
import { danishCategoryPages } from "../converter/localizedDanishCategoryPages";
import { danishUnitPages } from "../converter/localizedDanishUnitPages";
import { danishConversionPages } from "../converter/localizedDanishConversionPages";
import { russianConversionPages } from "../converter/localizedRussianConversionPages";

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
  ar: englishCategoryPages.map((page) => {
    const arabicPage = arabicCategoryPages.find(
      (item) => item.sourceSlug === page.sourceSlug
    );

    return {
      sourceSlug: page.sourceSlug,
      slug: page.slug,
      category: page.category,
      title: arabicPage?.title ?? page.title,
    };
  }),
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
  fr: frenchCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  es: spanishCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  "es-419": es419CategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  pt: portugueseCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  it: italianCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  nl: nederlandsCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  sv: swedishCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  ru: [],
  no: norwegianCategoryPages.map((page) => ({
    sourceSlug: page.sourceSlug,
    slug: page.slug,
    category: page.category,
    title: page.title,
  })),
  da: danishCategoryPages.map((page) => ({
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
    fr: frenchUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    es: spanishUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    "es-419": es419UnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    pt: portugueseUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    it: italianUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    nl: nederlandsUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    sv: swedishUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    ru: [],
    no: norwegianUnitPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    da: danishUnitPages.map((page) => ({
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
    fr: frenchCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    es: spanishCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    "es-419": es419CategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    pt: portugueseCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    it: italianCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    nl: nederlandsCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    sv: swedishCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    ru: [],
    no: norwegianCategoryPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    da: danishCategoryPages.map((page) => ({
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
    fr: [],
    es: [],
    "es-419": [],
    pt: [],
    it: [],
    nl: [],
    sv: [],
    ru: [],
    no: [],
    da: [],
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
    fr: frenchConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    es: spanishConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    "es-419": es419ConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    pt: portugueseConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    it: italianConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    nl: nederlandsConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    sv: swedishConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    ru: russianConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    no: norwegianConversionPages.map((page) => ({
      sourceSlug: page.sourceSlug,
      slug: page.slug,
    })),
    da: danishConversionPages.map((page) => ({
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
