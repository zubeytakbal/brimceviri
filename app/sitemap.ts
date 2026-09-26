import type { MetadataRoute } from "next";
import { calculatorPages } from "./converter/calculatorPages";
import { categoryPages } from "./converter/categoryPages";
import { conversionPages } from "./converter/conversionPages";
import {
  englishCalculatorPages,
  findEnglishCalculatorPageByTurkishSlug,
} from "./converter/localizedCalculatorPages";
import {
  findGermanCalculatorPageByTurkishSlug,
  germanCalculatorPages,
} from "./converter/localizedGermanCalculatorPages";
import {
  englishCategoryPages,
  findEnglishCategoryPageByTurkishSlug,
} from "./converter/localizedCategoryPages";
import {
  englishConversionPages,
  findEnglishPageByTurkishSlug,
} from "./converter/localizedConversionPages";
import {
  findGermanCategoryPageByTurkishSlug,
  germanCategoryPages,
} from "./converter/localizedGermanCategoryPages";
import {
  findGermanPageByTurkishSlug,
  germanConversionPages,
} from "./converter/localizedGermanConversionPages";
import {
  findGermanUnitPageByTurkishSlug,
  germanUnitPages,
} from "./converter/localizedGermanUnitPages";
import {
  findGermanStandaloneToolByTurkishPath,
  germanStandaloneTools,
} from "./i18n/germanStandaloneTools";
import {
  arabicStandaloneTools,
  findArabicStandaloneToolByTurkishPath,
} from "./i18n/arabicStandaloneTools";
import {
  englishStandaloneTools,
  findEnglishStandaloneToolByTurkishPath,
} from "./i18n/englishStandaloneTools";
import { englishChemistryTools } from "./i18n/englishChemistryToolCatalog";
import { englishDecisionSavingsTools } from "./i18n/englishDecisionSavingsTools";
import {
  uzbekStandaloneTools,
  findUzbekStandaloneToolByTurkishPath,
} from "./i18n/uzbekStandaloneTools";
import {
  periodicTable,
  slugifyElementName,
} from "./converter/periodicTableData";
import {
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "./converter/periodicTableDataDe";
import { findGermanElementArticle } from "./converter/germanElementArticles";
import { materialsDatabase } from "./converter/materialsDatabase";
import { getAllMaterialComparisons } from "./converter/materialComparisons";
import { celestialBodiesDatabase } from "./converter/celestialBodiesDatabase";
import { getAllCelestialBodyComparisons } from "./converter/celestialBodyComparisons";
import { mountainsDatabase } from "./converter/mountainsDatabase";
import { getAllMountainsUz } from "./converter/mountainsDatabaseUz";
import { turkishProvinceElevations } from "./converter/turkishProvinceElevations";
import { popularProvinceComparisons } from "./converter/popularProvinceComparisons";
import { getAllRegions } from "./converter/regionElevationHubUz";
import { compoundsDatabase } from "./converter/compoundsDatabase";
import { findCompoundEditorial } from "./converter/compoundEditorial";
import { aminoAcidsDatabase } from "./converter/aminoAcidsDatabase";
import { bengaliWeightPairs } from "./converter/bengaliWeightPairs";
import { licenseClasses } from "./converter/licenseClassFinder";
import { uzLicenseClasses } from "./converter/licenseClassFinderUz";
import { getAllNumberFactsRange } from "./converter/numberFacts";
import {
  englishUnitPages,
  findEnglishUnitPageByTurkishSlug,
} from "./converter/localizedUnitPages";
import {
  electricalHubPaths,
  getElectricalCalculatorPath,
} from "./converter/engineeringHubs";
import { unitPages } from "./converter/unitPages";
import { uzbekCategoryPages } from "./converter/localizedUzbekCategoryPages";
import { uzbekUnitPages } from "./converter/localizedUzbekUnitPages";
import { uzbekConversionPages } from "./converter/localizedUzbekConversionPages";
import { bengaliCategoryPages } from "./converter/localizedBengaliCategoryPages";
import { bengaliUnitPages } from "./converter/localizedBengaliUnitPages";
import { bengaliConversionPages } from "./converter/localizedBengaliConversionPages";
import { frenchCategoryPages } from "./converter/localizedFrenchCategoryPages";
import { frenchUnitPages } from "./converter/localizedFrenchUnitPages";
import { frenchConversionPages } from "./converter/localizedFrenchConversionPages";
import { spanishCategoryPages } from "./converter/localizedSpanishCategoryPages";
import { spanishUnitPages } from "./converter/localizedSpanishUnitPages";
import { spanishConversionPages } from "./converter/localizedSpanishConversionPages";
import { es419CategoryPages } from "./converter/localizedEs419CategoryPages";
import { es419UnitPages } from "./converter/localizedEs419UnitPages";
import { es419ConversionPages } from "./converter/localizedEs419ConversionPages";
import { portugueseCategoryPages } from "./converter/localizedPortugueseCategoryPages";
import { portugueseUnitPages } from "./converter/localizedPortugueseUnitPages";
import { portugueseConversionPages } from "./converter/localizedPortugueseConversionPages";
import { italianCategoryPages } from "./converter/localizedItalianCategoryPages";
import { italianUnitPages } from "./converter/localizedItalianUnitPages";
import { italianConversionPages } from "./converter/localizedItalianConversionPages";
import { nederlandsCategoryPages } from "./converter/localizedNederlandsCategoryPages";
import { nederlandsUnitPages } from "./converter/localizedNederlandsUnitPages";
import { nederlandsConversionPages } from "./converter/localizedNederlandsConversionPages";
import { swedishCategoryPages } from "./converter/localizedSwedishCategoryPages";
import { swedishUnitPages } from "./converter/localizedSwedishUnitPages";
import { swedishConversionPages } from "./converter/localizedSwedishConversionPages";
import { norwegianCategoryPages } from "./converter/localizedNorwegianCategoryPages";
import { norwegianUnitPages } from "./converter/localizedNorwegianUnitPages";
import { norwegianConversionPages } from "./converter/localizedNorwegianConversionPages";
import { danishCategoryPages } from "./converter/localizedDanishCategoryPages";
import { danishUnitPages } from "./converter/localizedDanishUnitPages";
import { danishConversionPages } from "./converter/localizedDanishConversionPages";
import { SITE_LAST_MODIFIED, SITE_URL } from "./siteConfig";

const baseUrl = SITE_URL;
const contentLastModified = SITE_LAST_MODIFIED;

function languageAlternates(
  turkishUrl: string,
  englishUrl: string,
  germanUrl?: string,
  arabicUrl?: string,
  uzbekUrl?: string,
  bengaliUrl?: string,
  frenchUrl?: string
) {
  return {
    languages: {
      tr: turkishUrl,
      en: englishUrl,
      ...(germanUrl ? { de: germanUrl } : {}),
      ...(arabicUrl ? { ar: arabicUrl } : {}),
      ...(uzbekUrl ? { "uz-UZ": uzbekUrl } : {}),
      ...(bengaliUrl ? { bn: bengaliUrl } : {}),
      ...(frenchUrl ? { fr: frenchUrl } : {}),
      "x-default": turkishUrl,
    },
  };
}

type LocalizedCorePage = {
  sourceSlug: string;
  slug: string;
};

type LocalizedCoreCollection = "categories" | "units" | "conversions";

function buildLocalizedCoreAlternates(
  collection: LocalizedCoreCollection,
  sourceSlug: string
) {
  const englishPage =
    collection === "categories"
      ? findEnglishCategoryPageByTurkishSlug(sourceSlug)
      : collection === "units"
        ? findEnglishUnitPageByTurkishSlug(sourceSlug)
        : findEnglishPageByTurkishSlug(sourceSlug);
  const germanPage =
    collection === "categories"
      ? findGermanCategoryPageByTurkishSlug(sourceSlug)
      : collection === "units"
        ? findGermanUnitPageByTurkishSlug(sourceSlug)
        : findGermanPageByTurkishSlug(sourceSlug);
  const uzbekPage =
    collection === "categories"
      ? uzbekCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? uzbekUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : uzbekConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const bengaliPage =
    collection === "categories"
      ? bengaliCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? bengaliUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : bengaliConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const frenchPage =
    collection === "categories"
      ? frenchCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? frenchUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : frenchConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const spanishPage =
    collection === "categories"
      ? spanishCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? spanishUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : spanishConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const es419Page =
    collection === "categories"
      ? es419CategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? es419UnitPages.find((page) => page.sourceSlug === sourceSlug)
        : es419ConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const portuguesePage =
    collection === "categories"
      ? portugueseCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? portugueseUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : portugueseConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const italianPage =
    collection === "categories"
      ? italianCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? italianUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : italianConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const nederlandsPage =
    collection === "categories"
      ? nederlandsCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? nederlandsUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : nederlandsConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const swedishPage =
    collection === "categories"
      ? swedishCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? swedishUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : swedishConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const norwegianPage =
    collection === "categories"
      ? norwegianCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? norwegianUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : norwegianConversionPages.find((page) => page.sourceSlug === sourceSlug);
  const danishPage =
    collection === "categories"
      ? danishCategoryPages.find((page) => page.sourceSlug === sourceSlug)
      : collection === "units"
        ? danishUnitPages.find((page) => page.sourceSlug === sourceSlug)
        : danishConversionPages.find((page) => page.sourceSlug === sourceSlug);

  // Yalnizca belirli dillerde bulunan sayfalar (orn. Iskandinav mili) icin
  // var olmayan bir Turkce adrese hreflang verilmesin.
  const hasTurkishPage =
    collection === "categories" ||
    (collection === "units"
      ? unitPages.some((page) => page.slug === sourceSlug)
      : conversionPages.some((page) => page.slug === sourceSlug));

  const paths = {
    categories: {
      tr: `/kategoriler/${sourceSlug}`,
      en: englishPage ? `/en/categories/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/kategorien/${germanPage.slug}` : undefined,
      ar: englishPage ? `/ar/categories/${englishPage.slug}` : undefined,
      uz: uzbekPage ? `/uz/turkumlar/${uzbekPage.slug}` : undefined,
      bn: bengaliPage ? `/bn/categories/${bengaliPage.slug}` : undefined,
      fr: frenchPage ? `/fr/categories/${frenchPage.slug}` : undefined,
      es: spanishPage ? `/es/categorias/${spanishPage.slug}` : undefined,
      "es-419": es419Page ? `/es-419/categorias/${es419Page.slug}` : undefined,
      pt: portuguesePage ? `/pt/categorias/${portuguesePage.slug}` : undefined,
      it: italianPage ? `/it/categorie/${italianPage.slug}` : undefined,
      nl: nederlandsPage ? `/nl/categorieen/${nederlandsPage.slug}` : undefined,
      sv: swedishPage ? `/sv/kategorier/${swedishPage.slug}` : undefined,
      no: norwegianPage ? `/no/kategorier/${norwegianPage.slug}` : undefined,
      da: danishPage ? `/da/kategorier/${danishPage.slug}` : undefined,
    },
    units: {
      tr: hasTurkishPage ? `/birimler/${sourceSlug}` : undefined,
      en: englishPage ? `/en/units/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/einheiten/${germanPage.slug}` : undefined,
      ar: englishPage ? `/ar/unit-guides/${englishPage.slug}` : undefined,
      uz: uzbekPage ? `/uz/birliklar/${uzbekPage.slug}` : undefined,
      bn: bengaliPage ? `/bn/unit-guides/${bengaliPage.slug}` : undefined,
      fr: frenchPage ? `/fr/guides-des-unites/${frenchPage.slug}` : undefined,
      es: spanishPage ? `/es/guias-de-unidades/${spanishPage.slug}` : undefined,
      "es-419": es419Page ? `/es-419/guias-de-unidades/${es419Page.slug}` : undefined,
      pt: portuguesePage ? `/pt/guias-de-unidades/${portuguesePage.slug}` : undefined,
      it: italianPage ? `/it/guide-alle-unita/${italianPage.slug}` : undefined,
      nl: nederlandsPage ? `/nl/eenheidsgidsen/${nederlandsPage.slug}` : undefined,
      sv: swedishPage ? `/sv/enhetsguider/${swedishPage.slug}` : undefined,
      no: norwegianPage ? `/no/enhetsguider/${norwegianPage.slug}` : undefined,
      da: danishPage ? `/da/enhedsguider/${danishPage.slug}` : undefined,
    },
    conversions: {
      tr: hasTurkishPage ? `/${sourceSlug}` : undefined,
      en: englishPage ? `/en/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/${germanPage.slug}` : undefined,
      ar: englishPage ? `/ar/${englishPage.slug}` : undefined,
      uz: uzbekPage ? `/uz/${uzbekPage.slug}` : undefined,
      bn: bengaliPage ? `/bn/${bengaliPage.slug}` : undefined,
      fr: frenchPage ? `/fr/${frenchPage.slug}` : undefined,
      es: spanishPage ? `/es/${spanishPage.slug}` : undefined,
      "es-419": es419Page ? `/es-419/${es419Page.slug}` : undefined,
      pt: portuguesePage ? `/pt/${portuguesePage.slug}` : undefined,
      it: italianPage ? `/it/${italianPage.slug}` : undefined,
      nl: nederlandsPage ? `/nl/${nederlandsPage.slug}` : undefined,
      sv: swedishPage ? `/sv/${swedishPage.slug}` : undefined,
      no: norwegianPage ? `/no/${norwegianPage.slug}` : undefined,
      da: danishPage ? `/da/${danishPage.slug}` : undefined,
    },
  }[collection];

  const languages = Object.fromEntries(
    (Object.entries(paths) as Array<[string, string | undefined]>)
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
      .map(([locale, path]) => [locale === "uz" ? "uz-UZ" : locale, `${baseUrl}${path}`])
  );

  return {
    languages: {
      ...languages,
      ...(paths.tr ? { "x-default": `${baseUrl}${paths.tr}` } : {}),
    },
  };
}

function buildLocalizedCoreRoutes(
  pages: LocalizedCorePage[],
  collection: LocalizedCoreCollection,
  pathPrefix: string,
  priority: number
): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${baseUrl}${pathPrefix}${page.slug}`,
    lastModified: contentLastModified,
    changeFrequency: "monthly" as const,
    priority,
    alternates: buildLocalizedCoreAlternates(collection, page.sourceSlug),
  }));
}

function buildElectricalCalculatorRoutes(sourceSlug: string) {
  const turkishUrl =
    `${baseUrl}${getElectricalCalculatorPath("tr", sourceSlug)}`;
  const englishUrl =
    `${baseUrl}${getElectricalCalculatorPath("en", sourceSlug)}`;
  const germanUrl =
    `${baseUrl}${getElectricalCalculatorPath("de", sourceSlug)}`;
  const arabicPath = getElectricalCalculatorPath("ar", sourceSlug);
  const arabicUrl = arabicPath ? `${baseUrl}${arabicPath}` : undefined;
  const alternates = languageAlternates(
    turkishUrl,
    englishUrl,
    germanUrl,
    arabicUrl
  );

  return [
    {
      url: turkishUrl,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.79,
      alternates,
    },
    {
      url: englishUrl,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.79,
      alternates,
    },
    {
      url: germanUrl,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.79,
      alternates,
    },
    ...(arabicUrl
      ? [
          {
            url: arabicUrl,
            lastModified: contentLastModified,
            changeFrequency: "monthly" as const,
            priority: 0.76,
            alternates,
          },
        ]
      : []),
  ];
}

const standaloneToolRoutes: MetadataRoute.Sitemap =
  Array.from(
    new Set([
      ...germanStandaloneTools.map((tool) => tool.turkishPath),
      ...arabicStandaloneTools
        .filter((tool) => !tool.isArabicOnly)
        .map((tool) => tool.turkishPath),
      ...englishStandaloneTools
        .filter((tool) => !tool.isEnglishOnly)
        .map((tool) => tool.turkishPath),
      ...uzbekStandaloneTools.map((tool) => tool.turkishPath),
    ])
  ).flatMap((turkishPath) => {
    const germanTool =
      findGermanStandaloneToolByTurkishPath(turkishPath);
    const arabicTool =
      findArabicStandaloneToolByTurkishPath(turkishPath);
    const englishTool =
      findEnglishStandaloneToolByTurkishPath(turkishPath);
    const uzbekTool =
      findUzbekStandaloneToolByTurkishPath(turkishPath);
    const priority =
      arabicTool?.priority ?? germanTool?.priority ?? englishTool?.priority ?? uzbekTool?.priority ?? 0.7;
    const alternates = {
      languages: {
        tr: `${baseUrl}${turkishPath}`,
        ...(englishTool ? { en: `${baseUrl}${englishTool.englishPath}` } : {}),
        ...(germanTool ? { de: `${baseUrl}${germanTool.germanPath}` } : {}),
        ...(arabicTool ? { ar: `${baseUrl}${arabicTool.arabicPath}` } : {}),
        ...(uzbekTool ? { "uz-UZ": `${baseUrl}${uzbekTool.uzbekPath}` } : {}),
        "x-default": `${baseUrl}${turkishPath}`,
      },
    };

    return [
      {
        url: `${baseUrl}${turkishPath}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority,
        alternates,
      },
      ...(englishTool
        ? [
            {
              url: `${baseUrl}${englishTool.englishPath}`,
              lastModified: contentLastModified,
              changeFrequency: "monthly" as const,
              priority,
              alternates,
            },
          ]
        : []),
      ...(germanTool
        ? [
            {
              url: `${baseUrl}${germanTool.germanPath}`,
              lastModified: contentLastModified,
              changeFrequency: "monthly" as const,
              priority,
              alternates,
            },
          ]
        : []),
      ...(arabicTool
        ? [
            {
              url: `${baseUrl}${arabicTool.arabicPath}`,
              lastModified: contentLastModified,
              changeFrequency: "monthly" as const,
              priority,
              alternates,
            },
          ]
        : []),
      ...(uzbekTool
        ? [
            {
              url: `${baseUrl}${uzbekTool.uzbekPath}`,
              lastModified: contentLastModified,
              changeFrequency: "monthly" as const,
              priority,
              alternates,
            },
          ]
        : []),
    ];
  });

const englishOnlyStandaloneToolRoutes: MetadataRoute.Sitemap =
  englishStandaloneTools
    .filter((tool) => tool.isEnglishOnly)
    .map((tool) => ({
      url: `${baseUrl}${tool.englishPath}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    }));

const arabicOnlyStandaloneToolRoutes: MetadataRoute.Sitemap =
  arabicStandaloneTools
    .filter((tool) => tool.isArabicOnly)
    .map((tool) => ({
      url: `${baseUrl}${tool.arabicPath}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    }));

// Zakat hesaplayicisi canli fiyat verisi (gold-api.com) cektigi icin
// paylasilan arabicStandaloneTools dispatcher'i yerine kendi bagimsiz
// rotasina sahip (elektrikli-arac-maliyet-karsilastirma'daki TR
// deseniyle ayni sebep), bu yuzden sitemap'e manuel eklenir.
const arabicZakatCalculatorRoute: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/ar/zakat-calculator`,
    lastModified: contentLastModified,
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    url: `${baseUrl}/ar/gold-price-calculator`,
    lastModified: contentLastModified,
    changeFrequency: "monthly",
    priority: 0.72,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const corporateRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`,
        `${baseUrl}/de/uber-uns`,
        undefined,
        `${baseUrl}/uz/biz-haqimizda`
      ),
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`,
        `${baseUrl}/de/uber-uns`,
        undefined,
        `${baseUrl}/uz/biz-haqimizda`
      ),
    },
    {
      url: `${baseUrl}/de/uber-uns`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`,
        `${baseUrl}/de/uber-uns`,
        undefined,
        `${baseUrl}/uz/biz-haqimizda`
      ),
    },
    {
      url: `${baseUrl}/ar/about`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`,
        `${baseUrl}/de/uber-uns`,
        `${baseUrl}/ar/about`,
        `${baseUrl}/uz/biz-haqimizda`
      ),
    },
    {
      url: `${baseUrl}/uz/biz-haqimizda`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`,
        `${baseUrl}/de/uber-uns`,
        undefined,
        `${baseUrl}/uz/biz-haqimizda`
      ),
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`,
        `${baseUrl}/de/kontakt`,
        undefined,
        `${baseUrl}/uz/aloqa`
      ),
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`,
        `${baseUrl}/de/kontakt`,
        undefined,
        `${baseUrl}/uz/aloqa`
      ),
    },
    {
      url: `${baseUrl}/de/kontakt`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`,
        `${baseUrl}/de/kontakt`,
        undefined,
        `${baseUrl}/uz/aloqa`
      ),
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`,
        `${baseUrl}/de/kontakt`,
        `${baseUrl}/ar/contact`,
        `${baseUrl}/uz/aloqa`
      ),
    },
    {
      url: `${baseUrl}/uz/aloqa`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`,
        `${baseUrl}/de/kontakt`,
        undefined,
        `${baseUrl}/uz/aloqa`
      ),
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`,
        `${baseUrl}/de/datenschutz`,
        undefined,
        `${baseUrl}/uz/maxfiylik-siyosati`
      ),
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`,
        `${baseUrl}/de/datenschutz`,
        undefined,
        `${baseUrl}/uz/maxfiylik-siyosati`
      ),
    },
    {
      url: `${baseUrl}/de/datenschutz`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`,
        `${baseUrl}/de/datenschutz`,
        undefined,
        `${baseUrl}/uz/maxfiylik-siyosati`
      ),
    },
    {
      url: `${baseUrl}/ar/privacy`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`,
        `${baseUrl}/de/datenschutz`,
        `${baseUrl}/ar/privacy`,
        `${baseUrl}/uz/maxfiylik-siyosati`
      ),
    },
    {
      url: `${baseUrl}/uz/maxfiylik-siyosati`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`,
        `${baseUrl}/de/datenschutz`,
        undefined,
        `${baseUrl}/uz/maxfiylik-siyosati`
      ),
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`,
        `${baseUrl}/de/nutzungsbedingungen`,
        undefined,
        `${baseUrl}/uz/foydalanish-shartlari`
      ),
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`,
        `${baseUrl}/de/nutzungsbedingungen`,
        undefined,
        `${baseUrl}/uz/foydalanish-shartlari`
      ),
    },
    {
      url: `${baseUrl}/de/nutzungsbedingungen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`,
        `${baseUrl}/de/nutzungsbedingungen`,
        undefined,
        `${baseUrl}/uz/foydalanish-shartlari`
      ),
    },
    {
      url: `${baseUrl}/ar/terms`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`,
        `${baseUrl}/de/nutzungsbedingungen`,
        `${baseUrl}/ar/terms`,
        `${baseUrl}/uz/foydalanish-shartlari`
      ),
    },
    {
      url: `${baseUrl}/uz/foydalanish-shartlari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`,
        `${baseUrl}/de/nutzungsbedingungen`,
        undefined,
        `${baseUrl}/uz/foydalanish-shartlari`
      ),
    },
    {
      url: `${baseUrl}/mutfak-olculeri-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/mutfak-olculeri-cevirici`,
        `${baseUrl}/en/kitchen-measurement-converter`,
        `${baseUrl}/de/kuechenmass-umrechner`
      ),
    },
    {
      url: `${baseUrl}/en/kitchen-measurement-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/mutfak-olculeri-cevirici`,
        `${baseUrl}/en/kitchen-measurement-converter`,
        `${baseUrl}/de/kuechenmass-umrechner`
      ),
    },
    {
      url: `${baseUrl}/de/kuechenmass-umrechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/mutfak-olculeri-cevirici`,
        `${baseUrl}/en/kitchen-measurement-converter`,
        `${baseUrl}/de/kuechenmass-umrechner`
      ),
    },
    {
      url: `${baseUrl}/ar/kitchen-measurement-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/mutfak-olculeri-cevirici`,
        `${baseUrl}/en/kitchen-measurement-converter`,
        `${baseUrl}/de/kuechenmass-umrechner`,
        `${baseUrl}/ar/kitchen-measurement-converter`
      ),
    },
    {
      url: `${baseUrl}/tarif-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/tarif-cevirici`,
        `${baseUrl}/en/recipe-converter`,
        `${baseUrl}/de/rezept-umrechner`
      ),
    },
    {
      url: `${baseUrl}/en/recipe-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/tarif-cevirici`,
        `${baseUrl}/en/recipe-converter`,
        `${baseUrl}/de/rezept-umrechner`
      ),
    },
    {
      url: `${baseUrl}/de/rezept-umrechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/tarif-cevirici`,
        `${baseUrl}/en/recipe-converter`,
        `${baseUrl}/de/rezept-umrechner`
      ),
    },
    {
      url: `${baseUrl}/ar/recipe-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/tarif-cevirici`,
        `${baseUrl}/en/recipe-converter`,
        `${baseUrl}/de/rezept-umrechner`,
        `${baseUrl}/ar/recipe-converter`
      ),
    },
    {
      url: `${baseUrl}/yuzuk-olcusu-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/yuzuk-olcusu-cevirici`,
        `${baseUrl}/en/ring-size-converter`,
        `${baseUrl}/de/ringgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/en/ring-size-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/yuzuk-olcusu-cevirici`,
        `${baseUrl}/en/ring-size-converter`,
        `${baseUrl}/de/ringgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/de/ringgroessen-umrechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/yuzuk-olcusu-cevirici`,
        `${baseUrl}/en/ring-size-converter`,
        `${baseUrl}/de/ringgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/ar/ring-size-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/yuzuk-olcusu-cevirici`,
        `${baseUrl}/en/ring-size-converter`,
        `${baseUrl}/de/ringgroessen-umrechner`,
        `${baseUrl}/ar/ring-size-converter`
      ),
    },
    {
      url: `${baseUrl}/gelistirici-api`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...standaloneToolRoutes,
    ...englishOnlyStandaloneToolRoutes,
    ...arabicOnlyStandaloneToolRoutes,
    ...arabicZakatCalculatorRoute,
    {
      url: `${baseUrl}/bilim-hesaplayicilari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/geometri`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/fizik`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/fizik/egik-atis-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/kesir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/karekok-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/oran-oranti-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/ortalama-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/medyan-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/mod-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/varyans-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/olasilik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/yuzde-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/uslu-sayilar-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/geometrik-dizi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/sayilar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/uz/sonlar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllNumberFactsRange().flatMap((number) => [
      {
        url: `${baseUrl}/bilim-hesaplayicilari/matematik/sayilar/${number}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/uz/sonlar/${number}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
    ]),
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/kupkok-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/logaritma-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/mol-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/molarite-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/ph-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/kutlece-yuzde-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/seyreltme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/titrasyon-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/stokiyometri-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/molalite-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/verim-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/ppm-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/yari-omur-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/entalpi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/kc-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/buhar-basinci-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/element-siralamasi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...periodicTable.map((element) => ({
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(element.nameTr)}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/de/periodensystem`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo`,
          de: `${baseUrl}/de/periodensystem`,
          "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo`,
        },
      },
    },
    ...periodicTable.filter((element) =>
      Boolean(
        findGermanElementArticle(
          slugifyElementNameDe(elementNamesDeBySymbol[element.symbol] ?? element.symbol)
        )
      )
    ).map((element) => {
      const deSlug = slugifyElementNameDe(elementNamesDeBySymbol[element.symbol] ?? element.symbol);
      return {
        url: `${baseUrl}/de/periodensystem/${deSlug}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: {
            tr: `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(element.nameTr)}`,
            de: `${baseUrl}/de/periodensystem/${deSlug}`,
            "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(element.nameTr)}`,
          },
        },
      };
    }),
    {
      url: `${baseUrl}/de/elementrangliste`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/bilim-hesaplayicilari/kimya/element-siralamasi`,
          de: `${baseUrl}/de/elementrangliste`,
          "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/element-siralamasi`,
        },
      },
    },
    {
      url: `${baseUrl}/de/atommasse-berechnen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama`,
          de: `${baseUrl}/de/atommasse-berechnen`,
          "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/malzeme-ozellikleri`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...materialsDatabase.map((material) => ({
      url: `${baseUrl}/malzeme-ozellikleri/${material.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllMaterialComparisons().map((comparison) => ({
      url: `${baseUrl}/malzeme-karsilastirma/${comparison.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/de/werkstoffeigenschaften`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-ozellikleri`,
          de: `${baseUrl}/de/werkstoffeigenschaften`,
          "x-default": `${baseUrl}/malzeme-ozellikleri`,
        },
      },
    },
    ...materialsDatabase.map((material) => ({
      url: `${baseUrl}/de/werkstoffeigenschaften/${material.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-ozellikleri/${material.id}`,
          de: `${baseUrl}/de/werkstoffeigenschaften/${material.id}`,
          "x-default": `${baseUrl}/malzeme-ozellikleri/${material.id}`,
        },
      },
    })),
    ...getAllMaterialComparisons().map((comparison) => ({
      url: `${baseUrl}/de/werkstoffvergleich/${comparison.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-karsilastirma/${comparison.slug}`,
          de: `${baseUrl}/de/werkstoffvergleich/${comparison.slug}`,
          "x-default": `${baseUrl}/malzeme-karsilastirma/${comparison.slug}`,
        },
      },
    })),
    {
      url: `${baseUrl}/de/materialgewicht-berechnen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-agirligi-hesaplama`,
          de: `${baseUrl}/de/materialgewicht-berechnen`,
          "x-default": `${baseUrl}/malzeme-agirligi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/material-xossalari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-ozellikleri`,
          "uz-UZ": `${baseUrl}/uz/material-xossalari`,
          "x-default": `${baseUrl}/malzeme-ozellikleri`,
        },
      },
    },
    ...materialsDatabase.map((material) => ({
      url: `${baseUrl}/uz/material-xossalari/${material.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-ozellikleri/${material.id}`,
          "uz-UZ": `${baseUrl}/uz/material-xossalari/${material.id}`,
          "x-default": `${baseUrl}/malzeme-ozellikleri/${material.id}`,
        },
      },
    })),
    ...getAllMaterialComparisons().map((comparison) => ({
      url: `${baseUrl}/uz/material-solishtirish/${comparison.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-karsilastirma/${comparison.slug}`,
          "uz-UZ": `${baseUrl}/uz/material-solishtirish/${comparison.slug}`,
          "x-default": `${baseUrl}/malzeme-karsilastirma/${comparison.slug}`,
        },
      },
    })),
    {
      url: `${baseUrl}/gokcisimleri-ozellikleri`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...celestialBodiesDatabase.map((body) => ({
      url: `${baseUrl}/gokcisimleri-ozellikleri/${body.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllCelestialBodyComparisons().map((comparison) => ({
      url: `${baseUrl}/gokcisimleri-karsilastirma/${comparison.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/dunyanin-en-yuksek-daglari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...mountainsDatabase.map((mountain) => ({
      url: `${baseUrl}/dunyanin-en-yuksek-daglari/${mountain.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/uz/dunyoning-eng-baland-toglari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllMountainsUz().map((mountain) => ({
      url: `${baseUrl}/uz/dunyoning-eng-baland-toglari/${mountain.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/il-rakimlari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...turkishProvinceElevations.map((province) => ({
      url: `${baseUrl}/il-rakimlari/${province.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/uz/viloyatlar-balandligi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllRegions().map((region) => ({
      url: `${baseUrl}/uz/viloyatlar-balandligi/${region.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/uz/viloyat-balandligini-solishtirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/il-rakimi-karsilastirma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...popularProvinceComparisons.map((comparison) => ({
      url: `${baseUrl}/il-rakimi-karsilastirma/${comparison.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...compoundsDatabase
      .filter((compound) => Boolean(findCompoundEditorial(compound.id)))
      .map((compound) => ({
      url: `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler/${compound.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      })),
    {
      url: `${baseUrl}/de/chemische-verbindungen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler`,
          de: `${baseUrl}/de/chemische-verbindungen`,
          "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler`,
        },
      },
    },
    ...compoundsDatabase
      .filter((compound) => Boolean(findCompoundEditorial(compound.id)))
      .map((compound) => ({
      url: `${baseUrl}/de/chemische-verbindungen/${compound.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler/${compound.id}`,
          de: `${baseUrl}/de/chemische-verbindungen/${compound.id}`,
          "x-default": `${baseUrl}/bilim-hesaplayicilari/kimya/bilesikler/${compound.id}`,
        },
      },
      })),
    {
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji/amino-asitler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...aminoAcidsDatabase.map((aminoAcid) => ({
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji/amino-asitler/${aminoAcid.id}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji/kodon-tablosu`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sayi-tabani-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/sayi-tabani-cevirici`,
          bn: `${baseUrl}/bn/number-base-calculator`,
          "uz-UZ": `${baseUrl}/uz/son-tizimi-cevirgich`,
          "x-default": `${baseUrl}/sayi-tabani-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/number-base-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/sayi-tabani-cevirici`,
          bn: `${baseUrl}/bn/number-base-calculator`,
          "uz-UZ": `${baseUrl}/uz/son-tizimi-cevirgich`,
          "x-default": `${baseUrl}/sayi-tabani-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/son-tizimi-cevirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/sayi-tabani-cevirici`,
          bn: `${baseUrl}/bn/number-base-calculator`,
          "uz-UZ": `${baseUrl}/uz/son-tizimi-cevirgich`,
          "x-default": `${baseUrl}/sayi-tabani-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/bmi-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/bmi-hesaplama`,
          en: `${baseUrl}/en/bmi-calculator`,
          bn: `${baseUrl}/bn/bmi-calculator`,
          "x-default": `${baseUrl}/bmi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/paint-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/boya-hesaplama`,
          en: `${baseUrl}/en/paint-calculator`,
          bn: `${baseUrl}/bn/paint-calculator`,
          "x-default": `${baseUrl}/boya-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/traditional-weight`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/bn/shoe-size-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/convertisseur-de-pointures`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/es/conversor-tallas-de-calzado`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/es-419/conversor-tallas-de-calzado`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/pt/conversor-de-calcados`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/it/convertitore-taglie-scarpe`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/nl/schoenmaten-omrekenen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/sv/skostorlekar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/no/skostorrelser`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/da/skostorrelser`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/ayakkabi-numarasi-cevirme`,
          en: `${baseUrl}/en/shoe-size-converter`,
          de: `${baseUrl}/de/schuhgroessen-umrechner`,
          ar: `${baseUrl}/ar/shoe-size-converter`,
          bn: `${baseUrl}/bn/shoe-size-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-pointures`,
          es: `${baseUrl}/es/conversor-tallas-de-calzado`,
          "es-419": `${baseUrl}/es-419/conversor-tallas-de-calzado`,
          pt: `${baseUrl}/pt/conversor-de-calcados`,
          it: `${baseUrl}/it/convertitore-taglie-scarpe`,
          nl: `${baseUrl}/nl/schoenmaten-omrekenen`,
          sv: `${baseUrl}/sv/skostorlekar`,
          no: `${baseUrl}/no/skostorrelser`,
          da: `${baseUrl}/da/skostorrelser`,
          "x-default": `${baseUrl}/ayakkabi-numarasi-cevirme`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/kitchen-measurement-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/es/conversor-medidas-de-cocina`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/es-419/conversor-medidas-de-cocina`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/it/convertitore-misure-cucina`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/nl/keukenmaten-omrekenen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/sv/koksmatt-omvandlare`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/no/kjokkenmal-omregner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/da/kokkenmal-omregner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/mutfak-olculeri-cevirici`,
          en: `${baseUrl}/en/kitchen-measurement-converter`,
          de: `${baseUrl}/de/kuechenmass-umrechner`,
          ar: `${baseUrl}/ar/kitchen-measurement-converter`,
          bn: `${baseUrl}/bn/kitchen-measurement-converter`,
          fr: `${baseUrl}/fr/convertisseur-mesures-cuisine`,
          es: `${baseUrl}/es/conversor-medidas-de-cocina`,
          "es-419": `${baseUrl}/es-419/conversor-medidas-de-cocina`,
          pt: `${baseUrl}/pt/conversor-de-medidas-de-cozinha`,
          it: `${baseUrl}/it/convertitore-misure-cucina`,
          nl: `${baseUrl}/nl/keukenmaten-omrekenen`,
          sv: `${baseUrl}/sv/koksmatt-omvandlare`,
          no: `${baseUrl}/no/kjokkenmal-omregner`,
          da: `${baseUrl}/da/kokkenmal-omregner`,
          "x-default": `${baseUrl}/mutfak-olculeri-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/recipe-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/convertisseur-de-recettes`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/es/conversor-de-recetas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/es-419/conversor-de-recetas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/pt/conversor-de-receitas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/it/convertitore-ricette`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/nl/recepten-omrekenen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/sv/receptomvandlare`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/no/oppskriftomregner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/da/opskriftomregner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarif-cevirici`,
          en: `${baseUrl}/en/recipe-converter`,
          de: `${baseUrl}/de/rezept-umrechner`,
          ar: `${baseUrl}/ar/recipe-converter`,
          bn: `${baseUrl}/bn/recipe-converter`,
          fr: `${baseUrl}/fr/convertisseur-de-recettes`,
          es: `${baseUrl}/es/conversor-de-recetas`,
          "es-419": `${baseUrl}/es-419/conversor-de-recetas`,
          pt: `${baseUrl}/pt/conversor-de-receitas`,
          it: `${baseUrl}/it/convertitore-ricette`,
          nl: `${baseUrl}/nl/recepten-omrekenen`,
          sv: `${baseUrl}/sv/receptomvandlare`,
          no: `${baseUrl}/no/oppskriftomregner`,
          da: `${baseUrl}/da/opskriftomregner`,
          "x-default": `${baseUrl}/tarif-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/historical-units`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/unites-historiques`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/es/unidades-historicas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/es-419/unidades-historicas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/pt/unidades-historicas`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/it/unita-storiche`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/nl/historische-eenheden`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/sv/historiska-enheter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/no/historiske-enheter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    {
      url: `${baseUrl}/da/historiske-enheder`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/tarihi-olcu-birimleri`,
          en: `${baseUrl}/en/historical-units`,
          de: `${baseUrl}/de/historische-masseinheiten`,
          ar: `${baseUrl}/ar/historical-units`,
          bn: `${baseUrl}/bn/historical-units`,
          fr: `${baseUrl}/fr/unites-historiques`,
          es: `${baseUrl}/es/unidades-historicas`,
          "es-419": `${baseUrl}/es-419/unidades-historicas`,
          pt: `${baseUrl}/pt/unidades-historicas`,
          it: `${baseUrl}/it/unita-storiche`,
          nl: `${baseUrl}/nl/historische-eenheden`,
          sv: `${baseUrl}/sv/historiska-enheter`,
          no: `${baseUrl}/no/historiske-enheter`,
          da: `${baseUrl}/da/historiske-enheder`,
          "x-default": `${baseUrl}/tarihi-olcu-birimleri`,
        },
      },
    },
    ...bengaliWeightPairs.map((pair) => ({
      url: `${baseUrl}/bn/traditional-weight/${pair.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${baseUrl}/yakit-tuketimi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/has-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kuyumcu-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/elektrikci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/meslekler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insaatci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hafriyat-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mantolama-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lastik-ebati-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/otomotiv-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/asci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vucut-yag-orani-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/diyetisyen-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ideal-kilo-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/beden-olcusu-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terzi-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/emlak-komisyonu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/emlakci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/seyir-suresi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pilot-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/yogunluk-irtifasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/yan-ruzgar-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/inis-orani-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/agirlik-denge-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/buyuk-daire-mesafesi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/doktor-hemsire-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vucut-yuzey-alani-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kreatinin-klirensi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iv-damla-hizi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glasgow-koma-skalasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apgar-skoru-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cha2ds2-vasc-skoru-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wells-skoru-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/qsofa-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sofa-skoru-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/meld-skoru-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/morse-dusme-skalasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/braden-skalasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nakliyeci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cbm-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tesisatci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/boru-capi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/basinc-kaybi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/muhasebeci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/amortisman-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kaptan-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/parke-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/duvar-kagidi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tasinma-kutusu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/dogalgaz-tuketimi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/elektrikli-arac-sarj-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/beton-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/siva-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/merdiven-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/mars-climate-orbiter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/gimli-glider`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/vasa-gemisi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/fenobarbital-doz-hatasi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/birim-cevirme-felaketleri/british-airways-5390`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/devamsizlik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/yazilimci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/unix-zaman-damgasi-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/renk-kodu-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/marangoz-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kereste-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/grafik-tasarimci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/piksel-cm-dpi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/muzisyen-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bpm-ms-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/veteriner-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/veteriner-ilac-dozu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/fotografci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pozlama-esdegeri-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/odak-uzakligi-esdegeri-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/antrenor-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/1rm-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ciftci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gubre-ihtiyaci-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tohum-miktari-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/eczaci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/alkol-seyreltme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/barmen-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kokteyl-olcusu-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/abv-standart-icki-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kaynakci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kaynak-amperaji-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kaynak-isi-girdisi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/cnc-torna-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kesme-hizi-devir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/peyzaj-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sulama-suresi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/havuz-teknisyeni-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/havuz-hacmi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/klor-dozaji-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/amator-telsiz-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/anten-uzunlugu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/bilgisayar-donanimcisi-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psu-guc-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/video-editor-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/video-bit-hizi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/dijital-pazarlamaci-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reklam-metrikleri-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/klima-sogutma-teknisyeni-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/superheat-subcooling-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/mimar-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/emsal-kaks-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ogretmen-araclari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/harf-notu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/malzeme-agirligi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/awg-mm2-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/erime-kaynama-noktasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sertlik-donusum-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/boru-capi-donusum-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/uz/awg-mm2-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/awg-mm2-cevirici`,
          "uz-UZ": `${baseUrl}/uz/awg-mm2-aylantirgich`,
          "x-default": `${baseUrl}/awg-mm2-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/erish-qaynash-nuqtasi-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/erime-kaynama-noktasi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/erish-qaynash-nuqtasi-aylantirgich`,
          "x-default": `${baseUrl}/erime-kaynama-noktasi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/qattiqlik-aylantirish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/sertlik-donusum-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/qattiqlik-aylantirish-hisoblash`,
          "x-default": `${baseUrl}/sertlik-donusum-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/quvur-diametri-aylantirish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/boru-capi-donusum-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/quvur-diametri-aylantirish-hisoblash`,
          "x-default": `${baseUrl}/boru-capi-donusum-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/payvandlash-amperaji-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kaynak-amperaji-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/payvandlash-amperaji-hisoblash`,
          "x-default": `${baseUrl}/kaynak-amperaji-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/payvandlash-issiqlik-kiritishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kaynak-isi-girdisi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/payvandlash-issiqlik-kiritishi-hisoblash`,
          "x-default": `${baseUrl}/kaynak-isi-girdisi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kesish-tezligi-aylanish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kesme-hizi-devir-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/kesish-tezligi-aylanish-hisoblash`,
          "x-default": `${baseUrl}/kesme-hizi-devir-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/superheat-subcooling-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/superheat-subcooling-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/superheat-subcooling-hisoblash`,
          "x-default": `${baseUrl}/superheat-subcooling-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/anten-uzunligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/anten-uzunlugu-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/anten-uzunligi-hisoblash`,
          "x-default": `${baseUrl}/anten-uzunlugu-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/material-ogirligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/malzeme-agirligi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/material-ogirligi-hisoblash`,
          "x-default": `${baseUrl}/malzeme-agirligi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/issiqlik-kengayishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/isil-genlesme-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/issiqlik-kengayishi-hisoblash`,
          "x-default": `${baseUrl}/isil-genlesme-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/elastik-chozilish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/elastik-uzama-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/elastik-chozilish-hisoblash`,
          "x-default": `${baseUrl}/elastik-uzama-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/bolt-torki-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/civata-torku-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/bolt-torki-hisoblash`,
          "x-default": `${baseUrl}/civata-torku-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/hafriyat-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/hafriyat-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/hafriyat-hisoblash`,
          "x-default": `${baseUrl}/hafriyat-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/quvur-diametri-sarfi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/boru-capi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/quvur-diametri-sarfi-hisoblash`,
          "x-default": `${baseUrl}/boru-capi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/bosim-yoqotilishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/basinc-kaybi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/bosim-yoqotilishi-hisoblash`,
          "x-default": `${baseUrl}/basinc-kaybi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/hovuz-hajmi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/havuz-hacmi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/hovuz-hajmi-hisoblash`,
          "x-default": `${baseUrl}/havuz-hacmi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/xlor-dozasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/klor-dozaji-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/xlor-dozasi-hisoblash`,
          "x-default": `${baseUrl}/klor-dozaji-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/pozlama-esdegeri-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/pozlama-esdegeri-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/pozlama-esdegeri-hisoblash`,
          "x-default": `${baseUrl}/pozlama-esdegeri-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/odak-uzunligi-esdegeri-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/odak-uzakligi-esdegeri-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/odak-uzunligi-esdegeri-hisoblash`,
          "x-default": `${baseUrl}/odak-uzakligi-esdegeri-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/alkogol-suyultirish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/alkol-seyreltme-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/alkogol-suyultirish-hisoblash`,
          "x-default": `${baseUrl}/alkol-seyreltme-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kokteyl-olchovi-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kokteyl-olcusu-cevirici`,
          "uz-UZ": `${baseUrl}/uz/kokteyl-olchovi-aylantirgich`,
          "x-default": `${baseUrl}/kokteyl-olcusu-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/abv-standart-ichimlik-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/abv-standart-icki-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/abv-standart-ichimlik-hisoblash`,
          "x-default": `${baseUrl}/abv-standart-icki-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ogit-ehtiyoji-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/gubre-ihtiyaci-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ogit-ehtiyoji-hisoblash`,
          "x-default": `${baseUrl}/gubre-ihtiyaci-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ogit-suyultirish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/gubre-seyreltme-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ogit-suyultirish-hisoblash`,
          "x-default": `${baseUrl}/gubre-seyreltme-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/urugi-miqdori-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/tohum-miktari-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/urugi-miqdori-hisoblash`,
          "x-default": `${baseUrl}/tohum-miktari-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/sugorish-vaqti-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/sulama-suresi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/sugorish-vaqti-hisoblash`,
          "x-default": `${baseUrl}/sulama-suresi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/veterinar-dori-dozasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/veteriner-ilac-dozu-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/veterinar-dori-dozasi-hisoblash`,
          "x-default": `${baseUrl}/veteriner-ilac-dozu-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/seyr-vaqti-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/seyir-suresi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/seyr-vaqti-hisoblash`,
          "x-default": `${baseUrl}/seyir-suresi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/zichlik-balandligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/yogunluk-irtifasi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/zichlik-balandligi-hisoblash`,
          "x-default": `${baseUrl}/yogunluk-irtifasi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/yon-shamol-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/yan-ruzgar-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/yon-shamol-hisoblash`,
          "x-default": `${baseUrl}/yan-ruzgar-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/pasayish-tezligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/inis-orani-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/pasayish-tezligi-hisoblash`,
          "x-default": `${baseUrl}/inis-orani-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ogirlik-muvozanat-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/agirlik-denge-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ogirlik-muvozanat-hisoblash`,
          "x-default": `${baseUrl}/agirlik-denge-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/katta-doira-masofasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/buyuk-daire-mesafesi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/katta-doira-masofasi-hisoblash`,
          "x-default": `${baseUrl}/buyuk-daire-mesafesi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/elektromobil-benzinli-solishtirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/elektrikli-arac-maliyet-karsilastirma`,
          "uz-UZ": `${baseUrl}/uz/elektromobil-benzinli-solishtirish`,
          "x-default": `${baseUrl}/elektrikli-arac-maliyet-karsilastirma`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/lpg-ornatish-qoplanishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/lpg-donusum-amortisman-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/lpg-ornatish-qoplanishi-hisoblash`,
          "x-default": `${baseUrl}/lpg-donusum-amortisman-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/izolyatsiya-qoplanishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/yalitim-amortisman-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/izolyatsiya-qoplanishi-hisoblash`,
          "x-default": `${baseUrl}/yalitim-amortisman-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/led-tejamkorligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/led-ampul-tasarruf-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/led-tejamkorligi-hisoblash`,
          "x-default": `${baseUrl}/led-ampul-tasarruf-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/qozon-konditsioner-solishtirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kombi-klima-isitma-maliyeti-karsilastirma`,
          "uz-UZ": `${baseUrl}/uz/qozon-konditsioner-solishtirish`,
          "x-default": `${baseUrl}/kombi-klima-isitma-maliyeti-karsilastirma`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/issiqlik-nasosi-qozon-solishtirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/isi-pompasi-kombi-karsilastirma`,
          "uz-UZ": `${baseUrl}/uz/issiqlik-nasosi-qozon-solishtirish`,
          "x-default": `${baseUrl}/isi-pompasi-kombi-karsilastirma`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/masofadan-ish-ofis-solishtirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/uzaktan-calisma-ofis-maliyeti-karsilastirma`,
          "uz-UZ": `${baseUrl}/uz/masofadan-ish-ofis-solishtirish`,
          "x-default": `${baseUrl}/uzaktan-calisma-ofis-maliyeti-karsilastirma`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/quyosh-paneli-qoplanishi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/gunes-paneli-amortisman-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/quyosh-paneli-qoplanishi-hisoblash`,
          "x-default": `${baseUrl}/gunes-paneli-amortisman-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/valyuta-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/doviz-cevirici`,
          "uz-UZ": `${baseUrl}/uz/valyuta-aylantirgich`,
          "x-default": `${baseUrl}/doviz-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/tana-yuzasi-maydoni-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/vucut-yuzey-alani-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/tana-yuzasi-maydoni-hisoblash`,
          "x-default": `${baseUrl}/vucut-yuzey-alani-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kreatinin-klirensi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kreatinin-klirensi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/kreatinin-klirensi-hisoblash`,
          "x-default": `${baseUrl}/kreatinin-klirensi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/iv-tomchi-tezligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/iv-damla-hizi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/iv-tomchi-tezligi-hisoblash`,
          "x-default": `${baseUrl}/iv-damla-hizi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/glazgo-koma-shkalasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/glasgow-koma-skalasi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/glazgo-koma-shkalasi-hisoblash`,
          "x-default": `${baseUrl}/glasgow-koma-skalasi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/apgar-balli-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/apgar-skoru-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/apgar-balli-hisoblash`,
          "x-default": `${baseUrl}/apgar-skoru-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/cha2ds2-vasc-balli-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/cha2ds2-vasc-skoru-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/cha2ds2-vasc-balli-hisoblash`,
          "x-default": `${baseUrl}/cha2ds2-vasc-skoru-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/wells-balli-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/wells-skoru-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/wells-balli-hisoblash`,
          "x-default": `${baseUrl}/wells-skoru-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/qsofa-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/qsofa-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/qsofa-hisoblash`,
          "x-default": `${baseUrl}/qsofa-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/sofa-balli-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/sofa-skoru-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/sofa-balli-hisoblash`,
          "x-default": `${baseUrl}/sofa-skoru-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/meld-balli-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/meld-skoru-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/meld-balli-hisoblash`,
          "x-default": `${baseUrl}/meld-skoru-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/morse-yiqilish-shkalasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/morse-dusme-skalasi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/morse-yiqilish-shkalasi-hisoblash`,
          "x-default": `${baseUrl}/morse-dusme-skalasi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/braden-shkalasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/braden-skalasi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/braden-shkalasi-hisoblash`,
          "x-default": `${baseUrl}/braden-skalasi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/unix-vaqt-tamgasi-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/unix-zaman-damgasi-cevirici`,
          "uz-UZ": `${baseUrl}/uz/unix-vaqt-tamgasi-aylantirgich`,
          "x-default": `${baseUrl}/unix-zaman-damgasi-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/rang-kodi-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/renk-kodu-cevirici`,
          "uz-UZ": `${baseUrl}/uz/rang-kodi-aylantirgich`,
          "x-default": `${baseUrl}/renk-kodu-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/piksel-sm-dpi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/piksel-cm-dpi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/piksel-sm-dpi-hisoblash`,
          "x-default": `${baseUrl}/piksel-cm-dpi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/bpm-ms-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/bpm-ms-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/bpm-ms-hisoblash`,
          "x-default": `${baseUrl}/bpm-ms-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/psu-quvvat-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/psu-guc-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/psu-quvvat-hisoblash`,
          "x-default": `${baseUrl}/psu-guc-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/video-bit-tezligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/video-bit-hizi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/video-bit-tezligi-hisoblash`,
          "x-default": `${baseUrl}/video-bit-hizi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ijtimoiy-media-tasvir-olchamlari-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/sosyal-medya-gorsel-boyutlari-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ijtimoiy-media-tasvir-olchamlari-hisoblash`,
          "x-default": `${baseUrl}/sosyal-medya-gorsel-boyutlari-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ping-kechikish-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/ping-gecikme-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ping-kechikish-hisoblash`,
          "x-default": `${baseUrl}/ping-gecikme-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/tana-yogi-foizi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/vucut-yag-orani-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/tana-yogi-foizi-hisoblash`,
          "x-default": `${baseUrl}/vucut-yag-orani-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ideal-vazn-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/ideal-kilo-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/ideal-vazn-hisoblash`,
          "x-default": `${baseUrl}/ideal-kilo-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/1rm-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/1rm-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/1rm-hisoblash`,
          "x-default": `${baseUrl}/1rm-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/cbm-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/cbm-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/cbm-hisoblash`,
          "x-default": `${baseUrl}/cbm-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/sayohat-rozetka-voltaj-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/seyahat-priz-voltaj-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/sayohat-rozetka-voltaj-hisoblash`,
          "x-default": `${baseUrl}/seyahat-priz-voltaj-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/elektrikli-arac-maliyet-karsilastirma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yalitim-amortisman-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/led-ampul-tasarruf-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kombi-klima-isitma-maliyeti-karsilastirma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gunes-paneli-amortisman-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doviz-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sosyal-medya-gorsel-boyutlari-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/seyahat-priz-voltaj-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/lpg-donusum-amortisman-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/isi-pompasi-kombi-karsilastirma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ping-gecikme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gubre-seyreltme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/uzaktan-calisma-ofis-maliyeti-karsilastirma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ehliyet-sinifi-bulma`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...Object.keys(licenseClasses).map((id) => ({
      url: `${baseUrl}/ehliyet-sinifi-bulma/${id.toLowerCase()}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${baseUrl}/ehliyet-yenileme-suresi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/uz/haydovchilik-toifasi-topish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/ehliyet-sinifi-bulma`,
          "uz-UZ": `${baseUrl}/uz/haydovchilik-toifasi-topish`,
          "x-default": `${baseUrl}/ehliyet-sinifi-bulma`,
        },
      },
    },
    ...Object.keys(uzLicenseClasses).map((id) => ({
      url: `${baseUrl}/uz/haydovchilik-toifasi-topish/${id.toLowerCase()}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${baseUrl}/uz/haydovchilik-guvohnomasi-yangilash-muddati-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/ehliyet-yenileme-suresi-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/haydovchilik-guvohnomasi-yangilash-muddati-hisoblash`,
          "x-default": `${baseUrl}/ehliyet-yenileme-suresi-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/mantolama-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/mantolama-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/mantolama-hisoblash`,
          "x-default": `${baseUrl}/mantolama-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/beton-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/beton-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/beton-hisoblash`,
          "x-default": `${baseUrl}/beton-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/suvoq-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/siva-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/suvoq-hisoblash`,
          "x-default": `${baseUrl}/siva-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/zinapoya-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/merdiven-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/zinapoya-hisoblash`,
          "x-default": `${baseUrl}/merdiven-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/qurilish-zichligi-koeffitsiyenti-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/emsal-kaks-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/qurilish-zichligi-koeffitsiyenti-hisoblash`,
          "x-default": `${baseUrl}/emsal-kaks-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/yogoch-hajmi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/kereste-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/yogoch-hajmi-hisoblash`,
          "x-default": `${baseUrl}/kereste-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/sof-oltin-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/has-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/sof-oltin-hisoblash`,
          "x-default": `${baseUrl}/has-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kochmas-mulk-komissiyasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/emlak-komisyonu-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/kochmas-mulk-komissiyasi-hisoblash`,
          "x-default": `${baseUrl}/emlak-komisyonu-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/amortizatsiya-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/amortisman-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/amortizatsiya-hisoblash`,
          "x-default": `${baseUrl}/amortisman-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/davomat-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/devamsizlik-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/davomat-hisoblash`,
          "x-default": `${baseUrl}/devamsizlik-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/harf-bahosi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/harf-notu-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/harf-bahosi-hisoblash`,
          "x-default": `${baseUrl}/harf-notu-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/reklama-korsatkichlari-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/reklam-metrikleri-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/reklama-korsatkichlari-hisoblash`,
          "x-default": `${baseUrl}/reklam-metrikleri-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/uzuk-olcami-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/yuzuk-olcusu-cevirici`,
          en: `${baseUrl}/en/ring-size-converter`,
          "uz-UZ": `${baseUrl}/uz/uzuk-olcami-aylantirgich`,
          "x-default": `${baseUrl}/yuzuk-olcusu-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/shina-olchami-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/lastik-ebati-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/shina-olchami-hisoblash`,
          "x-default": `${baseUrl}/lastik-ebati-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kiyim-olchami-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/beden-olcusu-cevirici`,
          "uz-UZ": `${baseUrl}/uz/kiyim-olchami-aylantirgich`,
          "x-default": `${baseUrl}/beden-olcusu-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/mars-climate-orbiter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/mars-climate-orbiter`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/mars-climate-orbiter`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/mars-climate-orbiter`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/gimli-glider`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/gimli-glider`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/gimli-glider`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/gimli-glider`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/vasa-gemisi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/vasa-gemisi`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/vasa-gemisi`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/vasa-gemisi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/kargo-ucagi-agirlik-hatasi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/kargo-ucagi-agirlik-hatasi`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/fenobarbital-doz-hatasi`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/fenobarbital-doz-hatasi`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/fenobarbital-doz-hatasi`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/fenobarbital-doz-hatasi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/birlik-aylantirish-fojialari/british-airways-5390`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          tr: `${baseUrl}/birim-cevirme-felaketleri/british-airways-5390`,
          "uz-UZ": `${baseUrl}/uz/birlik-aylantirish-fojialari/british-airways-5390`,
          "x-default": `${baseUrl}/birim-cevirme-felaketleri/british-airways-5390`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/raqamni-sozga-aylantirish`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "uz-UZ": `${baseUrl}/uz/raqamni-sozga-aylantirish`,
          "x-default": `${baseUrl}/uz/raqamni-sozga-aylantirish`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/beton-markasi-sinfi-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "uz-UZ": `${baseUrl}/uz/beton-markasi-sinfi-aylantirgich`,
          "x-default": `${baseUrl}/uz/beton-markasi-sinfi-aylantirgich`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ielts-cefr-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "uz-UZ": `${baseUrl}/uz/ielts-cefr-aylantirgich`,
          "x-default": `${baseUrl}/uz/ielts-cefr-aylantirgich`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/hijriy-milodiy-sana-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "uz-UZ": `${baseUrl}/uz/hijriy-milodiy-sana-aylantirgich`,
          "x-default": `${baseUrl}/uz/hijriy-milodiy-sana-aylantirgich`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/ish-haqi-kalkulyatori`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "uz-UZ": `${baseUrl}/uz/ish-haqi-kalkulyatori`,
          "x-default": `${baseUrl}/uz/ish-haqi-kalkulyatori`,
        },
      },
    },
    {
      url: `${baseUrl}/isil-genlesme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/elastik-uzama-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/civata-torku-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const turkishConversionRoutes: MetadataRoute.Sitemap =
    conversionPages.map((page) => {
      const englishPage = findEnglishPageByTurkishSlug(
        page.slug
      );

      const turkishUrl = `${baseUrl}/${page.slug}`;
      const englishUrl = englishPage
        ? `${baseUrl}/en/${englishPage.slug}`
        : undefined;
      const germanPage = findGermanPageByTurkishSlug(page.slug);
      const germanUrl = germanPage
        ? `${baseUrl}/de/${germanPage.slug}`
        : undefined;

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl, germanUrl)
          : undefined,
      };
    });

  const englishConversionRoutes: MetadataRoute.Sitemap =
    englishConversionPages.map((page) => {
      const englishUrl = `${baseUrl}/en/${page.slug}`;
      const turkishUrl = page.isEnglishOnly
        ? undefined
        : `${baseUrl}/${page.sourceSlug}`;
      const germanPage = page.isEnglishOnly
        ? undefined
        : findGermanPageByTurkishSlug(page.sourceSlug);
      const germanUrl = germanPage
        ? `${baseUrl}/de/${germanPage.slug}`
        : undefined;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: turkishUrl
          ? languageAlternates(turkishUrl, englishUrl, germanUrl)
          : undefined,
      };
    });

  const germanConversionRoutes: MetadataRoute.Sitemap =
    germanConversionPages.map((page) => {
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishPage = findEnglishPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/${englishPage.slug}`
        : `${baseUrl}/en`;
      const germanUrl = `${baseUrl}/de/${page.slug}`;

      return {
        url: germanUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const arabicConversionRoutes: MetadataRoute.Sitemap =
    englishConversionPages.map((page) => {
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishUrl = `${baseUrl}/en/${page.slug}`;
      const germanPage = findGermanPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/${germanPage.slug}`
        : undefined;
      const arabicUrl = `${baseUrl}/ar/${page.slug}`;

      return {
        url: arabicUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl,
          arabicUrl
        ),
      };
    });

  const uzbekConversionRoutes: MetadataRoute.Sitemap =
    uzbekConversionPages.map((page) => {
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
      const englishUrl = englishPage
        ? `${baseUrl}/en/${englishPage.slug}`
        : `${baseUrl}/en`;
      const uzbekUrl = `${baseUrl}/uz/${page.slug}`;

      return {
        url: uzbekUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          uzbekUrl
        ),
      };
    });

  const bengaliConversionRoutes: MetadataRoute.Sitemap =
    bengaliConversionPages.map((page) => {
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
      const englishUrl = englishPage
        ? `${baseUrl}/en/${englishPage.slug}`
        : `${baseUrl}/en`;
      const bengaliUrl = `${baseUrl}/bn/${page.slug}`;

      return {
        url: bengaliUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          undefined,
          bengaliUrl
        ),
      };
    });

  // Her dilin kategori ve birim rehberi dizini kendi dilindeki adreste.
  const curatedLocaleIndexPaths: Record<string, { categories: string; unitGuides: string }> = {
    "/fr": { categories: "/categories", unitGuides: "/guides-des-unites" },
    "/es": { categories: "/categorias", unitGuides: "/guias-de-unidades" },
    "/es-419": { categories: "/categorias", unitGuides: "/guias-de-unidades" },
    "/pt": { categories: "/categorias", unitGuides: "/guias-de-unidades" },
    "/nl": { categories: "/categorieen", unitGuides: "/eenheidsgidsen" },
  };

  const curatedLocaleIndexRoutes: MetadataRoute.Sitemap = Object.keys(
    curatedLocaleIndexPaths
  ).flatMap((localePath) => [
    {
      url: `${baseUrl}${localePath}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${localePath}${curatedLocaleIndexPaths[localePath].categories}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}${localePath}${curatedLocaleIndexPaths[localePath].unitGuides}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  // L'italiano non ha ancora una pagina indice /it/guide-alle-unita (funzionalita
  // separata in corso per altre lingue), quindi qui si aggiungono solo home
  // e categories invece di riusare curatedLocaleIndexRoutes.
  const italianIndexRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/it`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/it/categorie`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Isvecce icin henuz /sv/enhetsguider indeks sayfasi yok (Italyanca'daki
  // gibi ayni durum), bu yuzden sadece home ve categories eklenir.
  const swedishIndexRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/sv`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sv/kategorier`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Norvecce icin de henuz /no/enhetsguider indeks sayfasi yok, bu yuzden
  // sadece home ve categories eklenir.
  const norwegianIndexRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/no`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/no/kategorier`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Dansk har heller ikke en /da/enhedsguider indekside endnu, sa kun
  // hjem og kategorier tilfojes.
  const danishIndexRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/da`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/da/kategorier`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const bengaliUnitGuideIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/bn/unit-guides`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/birimler`,
          en: `${baseUrl}/en/units`,
          de: `${baseUrl}/de/einheiten`,
          ar: `${baseUrl}/ar/unit-guides`,
          "uz-UZ": `${baseUrl}/uz/birliklar`,
          bn: `${baseUrl}/bn/unit-guides`,
          fr: `${baseUrl}/fr/guides-des-unites`,
          es: `${baseUrl}/es/guias-de-unidades`,
          "es-419": `${baseUrl}/es-419/guias-de-unidades`,
          pt: `${baseUrl}/pt/guias-de-unidades`,
          nl: `${baseUrl}/nl/eenheidsgidsen`,
          "x-default": `${baseUrl}/birimler`,
        },
      },
    },
  ];

  const frenchConversionRoutes = buildLocalizedCoreRoutes(
    frenchConversionPages,
    "conversions",
    "/fr/",
    0.7
  );
  const spanishConversionRoutes = buildLocalizedCoreRoutes(
    spanishConversionPages,
    "conversions",
    "/es/",
    0.7
  );
  const es419ConversionRoutes = buildLocalizedCoreRoutes(
    es419ConversionPages,
    "conversions",
    "/es-419/",
    0.7
  );
  const portugueseConversionRoutes = buildLocalizedCoreRoutes(
    portugueseConversionPages,
    "conversions",
    "/pt/",
    0.7
  );
  const italianConversionRoutes = buildLocalizedCoreRoutes(
    italianConversionPages,
    "conversions",
    "/it/",
    0.7
  );
  const nederlandsConversionRoutes = buildLocalizedCoreRoutes(
    nederlandsConversionPages,
    "conversions",
    "/nl/",
    0.7
  );
  const swedishConversionRoutes = buildLocalizedCoreRoutes(
    swedishConversionPages,
    "conversions",
    "/sv/",
    0.7
  );
  const norwegianConversionRoutes = buildLocalizedCoreRoutes(
    norwegianConversionPages,
    "conversions",
    "/no/",
    0.7
  );
  const danishConversionRoutes = buildLocalizedCoreRoutes(
    danishConversionPages,
    "conversions",
    "/da/",
    0.7
  );

  const frenchUnitRoutes = buildLocalizedCoreRoutes(
    frenchUnitPages,
    "units",
    "/fr/guides-des-unites/",
    0.7
  );
  const spanishUnitRoutes = buildLocalizedCoreRoutes(
    spanishUnitPages,
    "units",
    "/es/guias-de-unidades/",
    0.7
  );
  const es419UnitRoutes = buildLocalizedCoreRoutes(
    es419UnitPages,
    "units",
    "/es-419/guias-de-unidades/",
    0.7
  );
  const portugueseUnitRoutes = buildLocalizedCoreRoutes(
    portugueseUnitPages,
    "units",
    "/pt/guias-de-unidades/",
    0.7
  );
  const italianUnitRoutes = buildLocalizedCoreRoutes(
    italianUnitPages,
    "units",
    "/it/guide-alle-unita/",
    0.7
  );
  const nederlandsUnitRoutes = buildLocalizedCoreRoutes(
    nederlandsUnitPages,
    "units",
    "/nl/eenheidsgidsen/",
    0.7
  );
  const swedishUnitRoutes = buildLocalizedCoreRoutes(
    swedishUnitPages,
    "units",
    "/sv/enhetsguider/",
    0.7
  );
  const norwegianUnitRoutes = buildLocalizedCoreRoutes(
    norwegianUnitPages,
    "units",
    "/no/enhetsguider/",
    0.7
  );
  const danishUnitRoutes = buildLocalizedCoreRoutes(
    danishUnitPages,
    "units",
    "/da/enhedsguider/",
    0.7
  );

  const frenchCategoryRoutes = buildLocalizedCoreRoutes(
    frenchCategoryPages,
    "categories",
    "/fr/categories/",
    0.8
  );
  const spanishCategoryRoutes = buildLocalizedCoreRoutes(
    spanishCategoryPages,
    "categories",
    "/es/categorias/",
    0.8
  );
  const es419CategoryRoutes = buildLocalizedCoreRoutes(
    es419CategoryPages,
    "categories",
    "/es-419/categorias/",
    0.8
  );
  const portugueseCategoryRoutes = buildLocalizedCoreRoutes(
    portugueseCategoryPages,
    "categories",
    "/pt/categorias/",
    0.8
  );
  const italianCategoryRoutes = buildLocalizedCoreRoutes(
    italianCategoryPages,
    "categories",
    "/it/categorie/",
    0.8
  );
  const nederlandsCategoryRoutes = buildLocalizedCoreRoutes(
    nederlandsCategoryPages,
    "categories",
    "/nl/categorieen/",
    0.8
  );
  const swedishCategoryRoutes = buildLocalizedCoreRoutes(
    swedishCategoryPages,
    "categories",
    "/sv/kategorier/",
    0.8
  );
  const norwegianCategoryRoutes = buildLocalizedCoreRoutes(
    norwegianCategoryPages,
    "categories",
    "/no/kategorier/",
    0.8
  );
  const danishCategoryRoutes = buildLocalizedCoreRoutes(
    danishCategoryPages,
    "categories",
    "/da/kategorier/",
    0.8
  );

  const turkishUnitRoutes: MetadataRoute.Sitemap =
    unitPages.map((page) => {
      const englishPage =
        findEnglishUnitPageByTurkishSlug(page.slug);

      const turkishUrl =
        `${baseUrl}/birimler/${page.slug}`;

      const englishUrl = englishPage
        ? `${baseUrl}/en/units/${englishPage.slug}`
        : undefined;
      const germanPage = findGermanUnitPageByTurkishSlug(
        page.slug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/einheiten/${germanPage.slug}`
        : undefined;

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.75,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl, germanUrl)
          : undefined,
      };
    });

  const englishUnitRoutes: MetadataRoute.Sitemap =
    englishUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/units/${page.slug}`;
      const germanPage = findGermanUnitPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/einheiten/${germanPage.slug}`
        : undefined;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const germanUnitRoutes: MetadataRoute.Sitemap =
    germanUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;
      const englishPage = findEnglishUnitPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/units/${englishPage.slug}`
        : `${baseUrl}/en/units`;
      const germanUrl = `${baseUrl}/de/einheiten/${page.slug}`;

      return {
        url: germanUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const arabicUnitRoutes: MetadataRoute.Sitemap =
    englishUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;
      const englishUrl =
        `${baseUrl}/en/units/${page.slug}`;
      const germanPage = findGermanUnitPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/einheiten/${germanPage.slug}`
        : undefined;
      const arabicUrl =
        `${baseUrl}/ar/unit-guides/${page.slug}`;

      return {
        url: arabicUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.73,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl,
          arabicUrl
        ),
      };
    });

  const uzbekUnitRoutes: MetadataRoute.Sitemap =
    uzbekUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;
      const englishPage = findEnglishUnitPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/units/${englishPage.slug}`
        : `${baseUrl}/en/units`;
      const uzbekUrl = `${baseUrl}/uz/birliklar/${page.slug}`;

      return {
        url: uzbekUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          uzbekUrl
        ),
      };
    });

  const bengaliUnitRoutes: MetadataRoute.Sitemap =
    bengaliUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;
      const englishPage = findEnglishUnitPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/units/${englishPage.slug}`
        : `${baseUrl}/en/units`;
      const bengaliUrl = `${baseUrl}/bn/unit-guides/${page.slug}`;

      return {
        url: bengaliUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          undefined,
          bengaliUrl
        ),
      };
    });

  const turkishCategoryRoutes: MetadataRoute.Sitemap =
    categoryPages.map((page) => {
      const englishPage =
        findEnglishCategoryPageByTurkishSlug(page.slug);

      const turkishUrl =
        `${baseUrl}/kategoriler/${page.slug}`;

      const englishUrl = englishPage
        ? `${baseUrl}/en/categories/${englishPage.slug}`
        : undefined;
      const germanPage = findGermanCategoryPageByTurkishSlug(
        page.slug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/kategorien/${germanPage.slug}`
        : undefined;

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.85,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl, germanUrl)
          : undefined,
      };
    });

  const uzbekCategoryRoutes: MetadataRoute.Sitemap =
    uzbekCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;
      const englishPage = findEnglishCategoryPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/categories/${englishPage.slug}`
        : `${baseUrl}/en`;
      const uzbekUrl = `${baseUrl}/uz/turkumlar/${page.slug}`;

      return {
        url: uzbekUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          uzbekUrl
        ),
      };
    });

  const bengaliCategoryRoutes: MetadataRoute.Sitemap =
    bengaliCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;
      const englishPage = findEnglishCategoryPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/categories/${englishPage.slug}`
        : `${baseUrl}/en`;
      const bengaliUrl = `${baseUrl}/bn/categories/${page.slug}`;

      return {
        url: bengaliUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          undefined,
          undefined,
          undefined,
          bengaliUrl
        ),
      };
    });

  const englishCategoryRoutes: MetadataRoute.Sitemap =
    englishCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/categories/${page.slug}`;
      const germanPage = findGermanCategoryPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/kategorien/${germanPage.slug}`
        : undefined;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const germanCategoryRoutes: MetadataRoute.Sitemap =
    germanCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;
      const englishPage = findEnglishCategoryPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/categories/${englishPage.slug}`
        : `${baseUrl}/en`;
      const germanUrl = `${baseUrl}/de/kategorien/${page.slug}`;

      return {
        url: germanUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const arabicCategoryRoutes: MetadataRoute.Sitemap =
    englishCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;
      const englishUrl =
        `${baseUrl}/en/categories/${page.slug}`;
      const germanPage = findGermanCategoryPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/kategorien/${germanPage.slug}`
        : undefined;
      const arabicUrl =
        `${baseUrl}/ar/categories/${page.slug}`;

      return {
        url: arabicUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.83,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl,
          arabicUrl
        ),
      };
    });

  const turkishCalculatorRoutes: MetadataRoute.Sitemap =
    calculatorPages.map((page) => {
      const englishPage =
        findEnglishCalculatorPageByTurkishSlug(page.slug);
      const germanPage =
        findGermanCalculatorPageByTurkishSlug(page.slug);

      const turkishUrl =
        `${baseUrl}/hesaplayicilar/${page.slug}`;

      const englishUrl = englishPage
        ? `${baseUrl}/en/calculators/${englishPage.slug}`
        : undefined;
      const germanUrl = germanPage
        ? `${baseUrl}/de/rechner/${germanPage.slug}`
        : undefined;

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl, germanUrl)
          : undefined,
      };
    });

  const englishCalculatorRoutes: MetadataRoute.Sitemap =
    englishCalculatorPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/hesaplayicilar/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/calculators/${page.slug}`;
      const germanPage =
        findGermanCalculatorPageByTurkishSlug(page.sourceSlug);
      const germanUrl = germanPage
        ? `${baseUrl}/de/rechner/${germanPage.slug}`
        : undefined;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const germanCalculatorRoutes: MetadataRoute.Sitemap =
    germanCalculatorPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/hesaplayicilar/${page.sourceSlug}`;
      const englishPage = findEnglishCalculatorPageByTurkishSlug(
        page.sourceSlug
      );
      const englishUrl = englishPage
        ? `${baseUrl}/en/calculators/${englishPage.slug}`
        : `${baseUrl}/en/engineering-calculators`;
      const germanUrl = `${baseUrl}/de/rechner/${page.slug}`;

      return {
        url: germanUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl,
          germanUrl
        ),
      };
    });

  const uzbekCalculatorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/uz/om-qonuni-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/ohm-yasasi`,
          "uz-UZ": `${baseUrl}/uz/om-qonuni-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/ohm-yasasi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/bosim-kuch-maydon-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/basinc-kuvvet-alan`,
          "uz-UZ": `${baseUrl}/uz/bosim-kuch-maydon-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/basinc-kuvvet-alan`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/gidrostatik-bosim-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/hidrostatik-basinc`,
          "uz-UZ": `${baseUrl}/uz/gidrostatik-bosim-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/hidrostatik-basinc`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/issiqlik-energiyasi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/isi-enerjisi`,
          "uz-UZ": `${baseUrl}/uz/issiqlik-energiyasi-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/isi-enerjisi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/issiqlik-otkazuvchanligi-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/isi-iletimi`,
          "uz-UZ": `${baseUrl}/uz/issiqlik-otkazuvchanligi-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/isi-iletimi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/reynolds-soni-hisoblash`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/hesaplayicilar/reynolds-sayisi`,
          "uz-UZ": `${baseUrl}/uz/reynolds-soni-hisoblash`,
          "x-default": `${baseUrl}/hesaplayicilar/reynolds-sayisi`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/kvt-dan-amperga-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/kvt-dan-amperga-aylantirgich`,
          "x-default": `${baseUrl}/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama`,
        },
      },
    },
    {
      url: `${baseUrl}/uz/amperdan-kvt-ga-aylantirgich`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: {
        languages: {
          tr: `${baseUrl}/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama`,
          "uz-UZ": `${baseUrl}/uz/amperdan-kvt-ga-aylantirgich`,
          "x-default": `${baseUrl}/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama`,
        },
      },
    },
  ];

  return [
    {
      url: baseUrl,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        `${baseUrl}/ar`,
        `${baseUrl}/uz`
      ),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        `${baseUrl}/ar`,
        `${baseUrl}/uz`
      ),
    },
    {
      url: `${baseUrl}/de`,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        `${baseUrl}/ar`,
        `${baseUrl}/uz`
      ),
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        `${baseUrl}/ar`,
        `${baseUrl}/uz`
      ),
    },
    {
      url: `${baseUrl}/uz`,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        `${baseUrl}/ar`,
        `${baseUrl}/uz`
      ),
    },
    {
      url: `${baseUrl}/muhendislik-hesaplayicilari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`,
        `${baseUrl}/de/ingenieurrechner`,
        `${baseUrl}/ar/engineering-calculators`,
        `${baseUrl}/uz/muhandislik-hisoblagichlari`
      ),
    },
    {
      url: `${baseUrl}/uz/muhandislik-hisoblagichlari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          tr: `${baseUrl}/muhendislik-hesaplayicilari`,
          "uz-UZ": `${baseUrl}/uz/muhandislik-hisoblagichlari`,
          "x-default": `${baseUrl}/muhendislik-hesaplayicilari`,
        },
      },
    },
    {
      url: `${baseUrl}/en/engineering-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`,
        `${baseUrl}/de/ingenieurrechner`,
        `${baseUrl}/ar/engineering-calculators`
      ),
    },
    {
      url: `${baseUrl}/en/engineering-calculators/fluids-piping`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/thermal-resistance-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/heat-loss-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/radiative-heat-transfer-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/convective-heat-transfer-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/heat-transfer/sensible-heat-rate-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/stress-strain-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/cantilever-beam-deflection-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/shaft-torsion-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/euler-buckling-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/section-properties-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/mechanics-materials/thin-wall-cylinder-stress-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/prandtl-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/biot-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/fourier-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/mach-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/froude-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/grashof-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/dimensionless-numbers/rayleigh-number-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/fluids-piping/pipe-flow-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
      alternates: languageAlternates(
        `${baseUrl}/boru-capi-hesaplama`,
        `${baseUrl}/en/engineering-calculators/fluids-piping/pipe-flow-calculator`
      ),
    },
    {
      url: `${baseUrl}/en/engineering-calculators/fluids-piping/pump-power-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/engineering-calculators/fluids-piping/pressure-drop-calculator`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/calculators/thermal-expansion`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
      alternates: languageAlternates(
        `${baseUrl}/isil-genlesme-hesaplama`,
        `${baseUrl}/en/calculators/thermal-expansion`
      ),
    },
    {
      url: `${baseUrl}/en/calculators/elastic-elongation`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
      alternates: languageAlternates(
        `${baseUrl}/elastik-uzama-hesaplama`,
        `${baseUrl}/en/calculators/elastic-elongation`
      ),
    },
    {
      url: `${baseUrl}/en/everyday-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/en/construction-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/decision-savings-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/business-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    ...["break-even", "profit-margin", "roas", "ad-performance"].map((tool) => ({
      url: `${baseUrl}/en/business-calculators/${tool}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/finance-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    ...["mortgage", "loan-amortization", "compound-interest"].map((tool) => ({
      url: `${baseUrl}/en/finance-calculators/${tool}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/automotive-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/data-computing-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/fitness-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    ...englishDecisionSavingsTools.map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/chemistry-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    ...englishChemistryTools.map((tool) => ({
      url: `${baseUrl}/en/chemistry-calculators/${tool.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/science-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/applied-stem`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${baseUrl}/en/physics-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    ...["speed", "force", "kinetic-energy"].map((tool) => ({
      url: `${baseUrl}/en/physics-calculators/${tool}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/mathematics-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    ...["ratio-proportion", "descriptive-statistics", "fractions", "linear-equation", "percentage", "mean", "quadratic-roots"].map((tool) => ({
      url: `${baseUrl}/en/mathematics-calculators/${tool}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    {
      url: `${baseUrl}/en/biology-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${baseUrl}/en/biology-calculators/dna-sequence-helper`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${baseUrl}/de/ingenieurrechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`,
        `${baseUrl}/de/ingenieurrechner`,
        `${baseUrl}/ar/engineering-calculators`
      ),
    },
    {
      url: `${baseUrl}/ar/engineering-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.78,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`,
        `${baseUrl}/de/ingenieurrechner`,
        `${baseUrl}/ar/engineering-calculators`
      ),
    },
    {
      url: `${baseUrl}${electricalHubPaths.tr}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}${electricalHubPaths.tr}`,
        `${baseUrl}${electricalHubPaths.en}`,
        `${baseUrl}${electricalHubPaths.de}`,
        `${baseUrl}${electricalHubPaths.ar}`
      ),
    },
    {
      url: `${baseUrl}${electricalHubPaths.en}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}${electricalHubPaths.tr}`,
        `${baseUrl}${electricalHubPaths.en}`,
        `${baseUrl}${electricalHubPaths.de}`,
        `${baseUrl}${electricalHubPaths.ar}`
      ),
    },
    {
      url: `${baseUrl}${electricalHubPaths.de}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}${electricalHubPaths.tr}`,
        `${baseUrl}${electricalHubPaths.en}`,
        `${baseUrl}${electricalHubPaths.de}`,
        `${baseUrl}${electricalHubPaths.ar}`
      ),
    },
    {
      url: `${baseUrl}/ar/engineering-calculators/electrical-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.76,
      alternates: languageAlternates(
        `${baseUrl}${electricalHubPaths.tr}`,
        `${baseUrl}${electricalHubPaths.en}`,
        `${baseUrl}${electricalHubPaths.de}`,
        `${baseUrl}/ar/engineering-calculators/electrical-calculators`
      ),
    },
    ...buildElectricalCalculatorRoutes("kw-to-amper-hesaplama"),
    ...buildElectricalCalculatorRoutes("amper-to-kw-hesaplama"),
    ...buildElectricalCalculatorRoutes("gerilim-dusumu-hesaplama"),
    ...buildElectricalCalculatorRoutes("kablo-kesiti-hesaplama"),
    ...buildElectricalCalculatorRoutes("motor-akimi-hesaplama"),
    {
      url: `${baseUrl}/birimler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`,
        `${baseUrl}/de/einheiten`,
        undefined,
        `${baseUrl}/uz/birliklar`
      ),
    },
    {
      url: `${baseUrl}/en/units`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`,
        `${baseUrl}/de/einheiten`,
        undefined,
        `${baseUrl}/uz/birliklar`
      ),
    },
    {
      url: `${baseUrl}/de/einheiten`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`,
        `${baseUrl}/de/einheiten`,
        undefined,
        `${baseUrl}/uz/birliklar`
      ),
    },
    {
      url: `${baseUrl}/ar/categories`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ar/unit-guides`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`,
        `${baseUrl}/de/einheiten`,
        `${baseUrl}/ar/unit-guides`,
        `${baseUrl}/uz/birliklar`
      ),
    },
    {
      url: `${baseUrl}/uz/birliklar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`,
        `${baseUrl}/de/einheiten`,
        undefined,
        `${baseUrl}/uz/birliklar`
      ),
    },
    {
      url: `${baseUrl}/uz/turkumlar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tum-birimler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}/tum-birimler`,
        `${baseUrl}/en/all-conversions`,
        `${baseUrl}/de/alle-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/en/all-conversions`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}/tum-birimler`,
        `${baseUrl}/en/all-conversions`,
        `${baseUrl}/de/alle-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/de/alle-umrechnungen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: languageAlternates(
        `${baseUrl}/tum-birimler`,
        `${baseUrl}/en/all-conversions`,
        `${baseUrl}/de/alle-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/ar/all-conversions`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: languageAlternates(
        `${baseUrl}/tum-birimler`,
        `${baseUrl}/en/all-conversions`,
        `${baseUrl}/de/alle-umrechnungen`,
        `${baseUrl}/ar/all-conversions`
      ),
    },
    {
      url: `${baseUrl}/diger-donusumler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/diger-donusumler`,
        `${baseUrl}/en/other-conversions`,
        `${baseUrl}/de/weitere-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/tarihi-olcu-birimleri`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/tarihi-olcu-birimleri`,
        `${baseUrl}/en/historical-units`,
        `${baseUrl}/de/historische-masseinheiten`
      ),
    },
    {
      url: `${baseUrl}/en/historical-units`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/tarihi-olcu-birimleri`,
        `${baseUrl}/en/historical-units`,
        `${baseUrl}/de/historische-masseinheiten`
      ),
    },
    {
      url: `${baseUrl}/de/historische-masseinheiten`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/tarihi-olcu-birimleri`,
        `${baseUrl}/en/historical-units`,
        `${baseUrl}/de/historische-masseinheiten`
      ),
    },
    {
      url: `${baseUrl}/ar/historical-units`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.68,
      alternates: languageAlternates(
        `${baseUrl}/tarihi-olcu-birimleri`,
        `${baseUrl}/en/historical-units`,
        `${baseUrl}/de/historische-masseinheiten`,
        `${baseUrl}/ar/historical-units`
      ),
    },
    {
      url: `${baseUrl}/en/other-conversions`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/diger-donusumler`,
        `${baseUrl}/en/other-conversions`,
        `${baseUrl}/de/weitere-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/de/weitere-umrechnungen`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/diger-donusumler`,
        `${baseUrl}/en/other-conversions`,
        `${baseUrl}/de/weitere-umrechnungen`
      ),
    },
    {
      url: `${baseUrl}/ar/other-conversions`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.68,
      alternates: languageAlternates(
        `${baseUrl}/diger-donusumler`,
        `${baseUrl}/en/other-conversions`,
        `${baseUrl}/de/weitere-umrechnungen`,
        `${baseUrl}/ar/other-conversions`
      ),
    },
    {
      url: `${baseUrl}/ayakkabi-numarasi-cevirme`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/ayakkabi-numarasi-cevirme`,
        `${baseUrl}/en/shoe-size-converter`,
        `${baseUrl}/de/schuhgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/en/shoe-size-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/ayakkabi-numarasi-cevirme`,
        `${baseUrl}/en/shoe-size-converter`,
        `${baseUrl}/de/schuhgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/de/schuhgroessen-umrechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(
        `${baseUrl}/ayakkabi-numarasi-cevirme`,
        `${baseUrl}/en/shoe-size-converter`,
        `${baseUrl}/de/schuhgroessen-umrechner`
      ),
    },
    {
      url: `${baseUrl}/ar/shoe-size-converter`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.68,
      alternates: languageAlternates(
        `${baseUrl}/ayakkabi-numarasi-cevirme`,
        `${baseUrl}/en/shoe-size-converter`,
        `${baseUrl}/de/schuhgroessen-umrechner`,
        `${baseUrl}/ar/shoe-size-converter`
      ),
    },

    ...turkishCategoryRoutes,
    ...englishCategoryRoutes,
    ...germanCategoryRoutes,
    ...arabicCategoryRoutes,
    ...uzbekCategoryRoutes,
    ...bengaliCategoryRoutes,
    ...frenchCategoryRoutes,
    ...spanishCategoryRoutes,
    ...es419CategoryRoutes,
    ...portugueseCategoryRoutes,
    ...italianCategoryRoutes,
    ...nederlandsCategoryRoutes,
    ...swedishCategoryRoutes,
    ...norwegianCategoryRoutes,
    ...danishCategoryRoutes,
    ...turkishCalculatorRoutes,
    ...englishCalculatorRoutes,
    ...germanCalculatorRoutes,
    ...uzbekCalculatorRoutes,
    ...turkishConversionRoutes,
    ...englishConversionRoutes,
    ...germanConversionRoutes,
    ...arabicConversionRoutes,
    ...uzbekConversionRoutes,
    ...bengaliConversionRoutes,
    ...frenchConversionRoutes,
    ...spanishConversionRoutes,
    ...es419ConversionRoutes,
    ...portugueseConversionRoutes,
    ...italianConversionRoutes,
    ...nederlandsConversionRoutes,
    ...swedishConversionRoutes,
    ...norwegianConversionRoutes,
    ...danishConversionRoutes,
    ...turkishUnitRoutes,
    ...englishUnitRoutes,
    ...germanUnitRoutes,
    ...arabicUnitRoutes,
    ...uzbekUnitRoutes,
    ...bengaliUnitRoutes,
    ...frenchUnitRoutes,
    ...spanishUnitRoutes,
    ...es419UnitRoutes,
    ...portugueseUnitRoutes,
    ...italianUnitRoutes,
    ...nederlandsUnitRoutes,
    ...swedishUnitRoutes,
    ...norwegianUnitRoutes,
    ...danishUnitRoutes,
    ...curatedLocaleIndexRoutes,
    ...italianIndexRoutes,
    ...swedishIndexRoutes,
    ...norwegianIndexRoutes,
    ...danishIndexRoutes,
    ...bengaliUnitGuideIndexRoute,
    ...corporateRoutes,
  ];
}
