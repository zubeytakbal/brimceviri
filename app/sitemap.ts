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
import {
  periodicTable,
  slugifyElementName,
} from "./converter/periodicTableData";
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
import { SITE_LAST_MODIFIED, SITE_URL } from "./siteConfig";

const baseUrl = SITE_URL;
const contentLastModified = SITE_LAST_MODIFIED;

function languageAlternates(
  turkishUrl: string,
  englishUrl: string,
  germanUrl?: string,
  arabicUrl?: string,
  uzbekUrl?: string,
  bengaliUrl?: string
) {
  return {
    languages: {
      tr: turkishUrl,
      en: englishUrl,
      ...(germanUrl ? { de: germanUrl } : {}),
      ...(arabicUrl ? { ar: arabicUrl } : {}),
      ...(uzbekUrl ? { uz: uzbekUrl } : {}),
      ...(bengaliUrl ? { bn: bengaliUrl } : {}),
      "x-default": turkishUrl,
    },
  };
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
      ...arabicStandaloneTools.map((tool) => tool.turkishPath),
      ...englishStandaloneTools.map((tool) => tool.turkishPath),
    ])
  ).flatMap((turkishPath) => {
    const germanTool =
      findGermanStandaloneToolByTurkishPath(turkishPath);
    const arabicTool =
      findArabicStandaloneToolByTurkishPath(turkishPath);
    const englishTool =
      findEnglishStandaloneToolByTurkishPath(turkishPath);
    const priority =
      arabicTool?.priority ?? germanTool?.priority ?? englishTool?.priority ?? 0.7;
    const alternates = {
      languages: {
        tr: `${baseUrl}${turkishPath}`,
        ...(englishTool ? { en: `${baseUrl}${englishTool.englishPath}` } : {}),
        ...(germanTool ? { de: `${baseUrl}${germanTool.germanPath}` } : {}),
        ...(arabicTool ? { ar: `${baseUrl}${arabicTool.arabicPath}` } : {}),
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
    ];
  });

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
        `${baseUrl}/de/uber-uns`
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
        `${baseUrl}/de/uber-uns`
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
        `${baseUrl}/de/uber-uns`
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
        `${baseUrl}/ar/about`
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
        `${baseUrl}/de/kontakt`
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
        `${baseUrl}/de/kontakt`
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
        `${baseUrl}/de/kontakt`
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
        `${baseUrl}/ar/contact`
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
        `${baseUrl}/de/datenschutz`
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
        `${baseUrl}/de/datenschutz`
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
        `${baseUrl}/de/datenschutz`
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
        `${baseUrl}/ar/privacy`
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
        `${baseUrl}/de/nutzungsbedingungen`
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
        `${baseUrl}/de/nutzungsbedingungen`
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
        `${baseUrl}/de/nutzungsbedingungen`
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
        `${baseUrl}/ar/terms`
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
      url: `${baseUrl}/sayi-tabani-cevirici`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/sayi-tabani-cevirici`,
          bn: `${baseUrl}/bn/number-base-calculator`,
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
          "x-default": `${baseUrl}/sayi-tabani-cevirici`,
        },
      },
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
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishUrl = `${baseUrl}/en/${page.slug}`;
      const germanPage = findGermanPageByTurkishSlug(
        page.sourceSlug
      );
      const germanUrl = germanPage
        ? `${baseUrl}/de/${germanPage.slug}`
        : undefined;

      return {
        url: englishUrl,
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
        `${baseUrl}/ar`
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
        `${baseUrl}/ar`
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
        `${baseUrl}/ar`
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
        `${baseUrl}/ar`
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
        `${baseUrl}/ar/engineering-calculators`
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
        `${baseUrl}/ar/engineering-calculators`
      ),
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
        `${baseUrl}/de/einheiten`
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
        `${baseUrl}/de/einheiten`
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
        `${baseUrl}/de/einheiten`
      ),
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
        `${baseUrl}/ar/unit-guides`
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
    ...turkishCalculatorRoutes,
    ...englishCalculatorRoutes,
    ...germanCalculatorRoutes,
    ...turkishConversionRoutes,
    ...englishConversionRoutes,
    ...germanConversionRoutes,
    ...arabicConversionRoutes,
    ...uzbekConversionRoutes,
    ...bengaliConversionRoutes,
    ...turkishUnitRoutes,
    ...englishUnitRoutes,
    ...germanUnitRoutes,
    ...arabicUnitRoutes,
    ...uzbekUnitRoutes,
    ...bengaliUnitRoutes,
    ...corporateRoutes,
  ];
}
