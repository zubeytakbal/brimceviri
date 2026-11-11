import { guncelHref } from "./converter/guncelHref";
import { HESAP_GRUP_SLUGLARI } from "./converter/siteYapisi";
import { sayfaKalkti } from "./kaldirilanSayfalar";
import { germanMathPages } from "./i18n/germanMathPages";
import type { MetadataRoute } from "next";
import { isClosedPath } from "./indexPolicy";
import { calculatorPages } from "./converter/calculatorPages";
import { sleepGuideAlternates, sleepGuidePaths } from "./i18n/sleepGuidePaths";
import { timeToolAlternates, timeToolPaths, type TimeToolId } from "./i18n/timeToolPaths";
import { zonePairs } from "./converter/time/timeZonePairs";
import { buildLanguageAlternates } from "./i18n/routing";
import { categoryPages } from "./converter/categoryPages";
import { conversionPages } from "./converter/conversionPages";
import { ciftYayinda } from "./converter/mergedPairs";
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
  englishStandaloneTools,
  findEnglishStandaloneToolByTurkishPath,
} from "./i18n/englishStandaloneTools";
import { englishChemistryTools } from "./i18n/englishChemistryToolCatalog";
import { englishDecisionSavingsTools } from "./i18n/englishDecisionSavingsTools";
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
import { compoundsDatabase } from "./converter/compoundsDatabase";
import { findCompoundEditorial } from "./converter/compoundEditorial";
import {
  englishUnitPages,
  findEnglishUnitPageByTurkishSlug,
} from "./converter/localizedUnitPages";
import {
  electricalHubPaths,
  getElectricalCalculatorPath,
} from "./converter/engineeringHubs";
import { unitPages } from "./converter/unitPages";
import { SITE_LAST_MODIFIED, SITE_URL } from "./siteConfig";
import { GOLD_CALCULATOR_PATHS } from "./i18n/goldCalculatorPaths";
import { KARAT_PAIRS } from "./converter/goldKaratPairs";
import { CYCLE_PATHS } from "./i18n/cycleCalculatorContent";
import { ISLAMIC_TOOL_PATHS } from "./i18n/islamicToolPaths";

export const dynamic = "force-static";

const baseUrl = SITE_URL;
const contentLastModified = SITE_LAST_MODIFIED;

function languageAlternates(
  turkishUrl: string,
  englishUrl: string,
  germanUrl?: string,
  arabicUrl?: string,
  _kaldirilanDil?: string,
  bengaliUrl?: string,
  frenchUrl?: string
) {
  return {
    languages: {
      tr: turkishUrl,
      en: englishUrl,
      ...(germanUrl ? { de: germanUrl } : {}),
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

  // Yalnizca belirli dillerde bulunan sayfalar (orn. Iskandinav mili) icin
  // var olmayan bir Turkce adrese hreflang verilmesin.
  const hasTurkishPage =
    collection === "categories" ||
    (collection === "units"
      ? unitPages.some((page) => page.slug === sourceSlug)
      : conversionPages.some((page) => page.slug === sourceSlug) && ciftYayinda(sourceSlug));

  const paths = {
    categories: {
      tr: `/kategoriler/${sourceSlug}`,
      en: englishPage ? `/en/categories/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/kategorien/${germanPage.slug}` : undefined,
    },
    units: {
      tr: hasTurkishPage ? `/birimler/${sourceSlug}` : undefined,
      en: englishPage ? `/en/units/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/einheiten/${germanPage.slug}` : undefined,
    },
    conversions: {
      tr: hasTurkishPage ? `/${sourceSlug}` : undefined,
      en: englishPage ? `/en/${englishPage.slug}` : undefined,
      de: germanPage ? `/de/${germanPage.slug}` : undefined,
    },
  }[collection];

  const languages = Object.fromEntries(
    (Object.entries(paths) as Array<[string, string | undefined]>)
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
      .map(([locale, path]) => [locale, `${baseUrl}${path}`])
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
  const alternates = languageAlternates(
    turkishUrl,
    englishUrl,
    germanUrl
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
  ];
}

const standaloneToolRoutes: MetadataRoute.Sitemap =
  Array.from(
    new Set([
      ...germanStandaloneTools.map((tool) => tool.turkishPath),
      ...englishStandaloneTools
        .filter((tool) => !tool.isEnglishOnly)
        .map((tool) => tool.turkishPath),
    ])
  ).flatMap((turkishPath) => {
    const germanTool =
      findGermanStandaloneToolByTurkishPath(turkishPath);
    const englishTool =
      findEnglishStandaloneToolByTurkishPath(turkishPath);
    const priority =
      germanTool?.priority ?? englishTool?.priority ?? 0.7;
    const alternates = {
      languages: {
        tr: `${baseUrl}${turkishPath}`,
        ...(englishTool ? { en: `${baseUrl}${englishTool.englishPath}` } : {}),
        ...(germanTool ? { de: `${baseUrl}${germanTool.germanPath}` } : {}),
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



export default function sitemap(): MetadataRoute.Sitemap {
  const corporateRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/editoryal-politika`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/yazar`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.4 },
    ...[...HESAP_GRUP_SLUGLARI].map((g) => ({ url: `${baseUrl}/hesaplayicilar/${g}`, lastModified: contentLastModified, changeFrequency: "monthly" as const, priority: 0.6 })),
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
        undefined
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
    ...standaloneToolRoutes,
    ...englishOnlyStandaloneToolRoutes,
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
    {
      url: `${baseUrl}/bilim-hesaplayicilari/biyoloji`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
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
          "x-default": `${baseUrl}/sayi-tabani-cevirici`,
        },
      },
    },
    {
      url: `${baseUrl}/en/cgpa-to-percentage`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
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
      url: `${baseUrl}/hesaplayicilar`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/de/rechner`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
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
      url: `${baseUrl}/trafik-cezasi-erken-odeme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ceza-puani-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/arac-muayene-tarihi-hesaplama`,
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
      url: `${baseUrl}/emlak-komisyonu-hesaplama`,
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
      url: `${baseUrl}/braden-skalasi-hesaplama`,
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
      url: `${baseUrl}/amortisman-hesaplama`,
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
    ...(["tr"] as const).map((locale) => ({
      url: `${baseUrl}${sleepGuidePaths[locale]}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: sleepGuideAlternates(),
    })),
    ...(Object.keys(timeToolPaths) as TimeToolId[]).flatMap((tool) =>
      Object.values(timeToolPaths[tool]).map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: timeToolAlternates(tool),
      })),
    ),
    ...[
      ["/tarih-cevirici", "/en/hijri-date-converter"],
    ].flatMap(([trPath, enPath]) =>
      [trPath, enPath].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: contentLastModified,
        changeFrequency: "daily" as const,
        priority: 0.7,
        alternates: buildLanguageAlternates({ tr: trPath, en: enPath }, "tr"),
      })),
    ),
    ...["/eski-para-yeni-para-cevirme", "/bofor-cevirme", "/mesh-mikron-cevirme", "/bisiklet-jant-olcusu", "/roma-rakamlari-cevirme", "/egim-cevirme", "/brix-baume-cevirme", "/swg-mm-cevirici", "/matkap-ucu-olcusu-cevirme", "/igne-numarasi-gauge-mm", "/tahlil-degerleri-cevirme"].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...["/de/mathe-rechner", ...germanMathPages.map((page) => page.path)].map((path) => {
      const page = germanMathPages.find((p) => p.path === path);
      return {
        url: `${baseUrl}${path}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        ...(page?.trPath ? { alternates: buildLanguageAlternates({ tr: page.trPath, de: page.path }, "tr") } : {}),
      };
    }),
    ...["/de/brutto-netto-rechner", "/de/zinseszinsrechner", "/de/kreditrechner", "/de/tilgungsrechner", "/de/stromkostenrechner", "/de/mutterschutzrechner", "/de/arbeitszeitrechner", "/de/grunderwerbsteuer-rechner", "/de/kuendigungsfrist-rechner", "/de/prozentrechner", "/de/dreisatz-rechner", "/de/notenrechner", "/de/pendlerpauschale-rechner", "/de/urlaubsrechner"].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/dogdugum-gun-hangi-gun`,
      lastModified: contentLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...[
      ["/harita-olcegi-hesaplama", "/en/map-scale-calculator"],
      ["/yerel-saat-hesaplama", "/en/solar-time-calculator"],
      ["/koordinat-donusturucu", "/en/coordinate-converter"],
    ].flatMap(([trPath, enPath]) =>
      [trPath, enPath].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: buildLanguageAlternates({ tr: trPath, en: enPath }, "tr"),
      })),
    ),
    ...[
      // Dini hesaplayıcılar
      "/kaza-orucu-hesaplama",
      "/kible-yonu-hesaplama",
      "/kaza-namazi-hesaplama",
      "/hatim-hesaplama",
      "/zekat-hesaplama",
      "/hicri-yas-hesaplama",
      "/kurban-hissesi-hesaplama",
      "/hafizlik-hesaplama",
      "/hayiz-hesaplama",
      "/kirk-mevlidi-hesaplama",
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...zonePairs.map((pair) => ({
      url: `${baseUrl}/en/time-zone-converter/${pair.slug}`,
      lastModified: contentLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/tarla-donum-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/merdiven-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/devamsizlik-hesaplama`,
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
      url: `${baseUrl}/kereste-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/piksel-cm-dpi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/bpm-ms-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/veteriner-ilac-dozu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
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
      url: `${baseUrl}/1rm-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gubre-ihtiyaci-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/inek-dogum-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/dekara-fidan-sayisi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ilaclama-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kulucka-hesaplama`,
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
      url: `${baseUrl}/alkol-seyreltme-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
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
      url: `${baseUrl}/kesme-hizi-devir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/demir-agirlik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sac-agirlik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/boru-agirlik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kutu-profil-agirlik-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kiris-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/atalet-momenti-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/burkulma-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/mil-burulma-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/u-degeri-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/pompa-gucu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/lmtd-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/debi-isi-yuku-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/suyun-kaynama-noktasi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tank-hacmi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/petek-dilim-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kombi-kac-kw-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/pis-su-borusu-egimi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/hidrolik-silindir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/pnomatik-silindir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kva-kw-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kompanzasyon-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/motor-devir-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sulama-suresi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
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
      url: `${baseUrl}/anten-uzunlugu-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/psu-guc-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/video-bit-hizi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/superheat-subcooling-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/emsal-kaks-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
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
      url: `${baseUrl}/ehliyet-yenileme-suresi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...["/altin-hesaplama", "/altin-hesaplama/ceyrek-altin", "/altin-hesaplama/cumhuriyet-altini", "/ceyrek-bilezik-hesaplama"].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/altin-hesaplama" ? 0.85 : 0.75,
    })),
    {
      url: `${baseUrl}/brutten-nete-maas-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/yillik-izin-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/kidem-tazminati-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kredi-hesaplama`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
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
    conversionPages.filter((page) => ciftYayinda(page.slug)).map((page) => {
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

  // Her dilin kategori dizini kendi dilindeki adreste (birim bilgisi kategori sayfalarında).
  const curatedLocaleIndexPaths: Record<string, { categories: string }> = {
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
  ]);









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


  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`,
        `${baseUrl}/de`,
        undefined,
        undefined
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
        undefined,
        undefined
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
        undefined,
        undefined
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
        undefined,
        undefined
      ),
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
        undefined
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
        undefined
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
        `${baseUrl}${electricalHubPaths.de}`
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
        `${baseUrl}${electricalHubPaths.de}`
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
        `${baseUrl}${electricalHubPaths.de}`
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
      ),
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

    ...turkishCategoryRoutes,
    ...englishCategoryRoutes,
    ...germanCategoryRoutes,
    ...turkishCalculatorRoutes,
    ...englishCalculatorRoutes,
    ...germanCalculatorRoutes,
    ...turkishConversionRoutes,
    ...englishConversionRoutes,
    ...germanConversionRoutes,
    ...turkishUnitRoutes,
    ...englishUnitRoutes,
    ...germanUnitRoutes,
    ...curatedLocaleIndexRoutes,
    ...corporateRoutes,
  ];

  // Ayni adres birden fazla listede yer alabiliyor; hreflang bilgisi olan kaydi tutarak tekillestir.
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const existing = byUrl.get(entry.url);
    if (!existing || (!existing.alternates && entry.alternates)) byUrl.set(entry.url, entry);
  }
  // Google verlangt in hreflang-Alternativen absolute Adressen; relative Pfade (z. B. "/uyku-hesaplama")
  // werden hier zentral ergänzt, damit keine Quelle sie vergessen kann.
  const absolute = (href: string) => (href.startsWith("/") ? `${baseUrl}${href}` : href);
  // Dizine kapalı adresler (app/indexPolicy.ts) ve kaldırılan sayfalar (kaldirilanSayfalar.ts) haritaya ve hreflang alternatiflerine girmez.
  const closed = (href: string) => {
    const path = href.startsWith(baseUrl) ? href.slice(baseUrl.length) || "/" : href;
    return isClosedPath(path) || sayfaKalkti(path);
  };
  // Yeni yapiya tasinan Turkce sayfalar (/santimetre-inc -> /uzunluk/santimetre-inc) haritada yeni adresiyle yer alir.
  const yeni = (href: string) =>
    href.startsWith(baseUrl) ? `${baseUrl}${guncelHref(href.slice(baseUrl.length) || "/")}` : guncelHref(href);
  return [...byUrl.values()]
    .filter((entry) => !closed(entry.url))
    .map((entry) => ({ ...entry, url: yeni(entry.url) }))
    .map((entry) => {
      const languages = entry.alternates?.languages;
      if (!languages) return entry;
      return {
        ...entry,
        alternates: {
          ...entry.alternates,
          languages: Object.fromEntries(
            Object.entries(languages)
              .filter(([, href]) => typeof href !== "string" || !closed(href))
              .map(([lang, href]) => [lang, typeof href === "string" ? yeni(absolute(href)) : href]),
          ),
        },
      };
    });
}
