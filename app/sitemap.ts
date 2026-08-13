import type { MetadataRoute } from "next";
import { calculatorPages } from "./converter/calculatorPages";
import { categoryPages } from "./converter/categoryPages";
import { conversionPages } from "./converter/conversionPages";
import {
  englishCalculatorPages,
  findEnglishCalculatorPageByTurkishSlug,
} from "./converter/localizedCalculatorPages";
import {
  englishCategoryPages,
  findEnglishCategoryPageByTurkishSlug,
} from "./converter/localizedCategoryPages";
import {
  englishConversionPages,
  findEnglishPageByTurkishSlug,
} from "./converter/localizedConversionPages";
import {
  englishUnitPages,
  findEnglishUnitPageByTurkishSlug,
} from "./converter/localizedUnitPages";
import { unitPages } from "./converter/unitPages";
import { SITE_LAST_MODIFIED, SITE_URL } from "./siteConfig";

const baseUrl = SITE_URL;
const contentLastModified = SITE_LAST_MODIFIED;

function languageAlternates(
  turkishUrl: string,
  englishUrl: string
) {
  return {
    languages: {
      tr: turkishUrl,
      en: englishUrl,
      "x-default": turkishUrl,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const corporateRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`
      ),
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/hakkimizda`,
        `${baseUrl}/en/about`
      ),
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`
      ),
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: languageAlternates(
        `${baseUrl}/iletisim`,
        `${baseUrl}/en/contact`
      ),
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`
      ),
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/gizlilik`,
        `${baseUrl}/en/privacy`
      ),
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`
      ),
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates(
        `${baseUrl}/kullanim-kosullari`,
        `${baseUrl}/en/terms`
      ),
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

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl)
          : undefined,
      };
    });

  const englishConversionRoutes: MetadataRoute.Sitemap =
    englishConversionPages.map((page) => {
      const turkishUrl = `${baseUrl}/${page.sourceSlug}`;
      const englishUrl = `${baseUrl}/en/${page.slug}`;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl
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

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.75,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl)
          : undefined,
      };
    });

  const englishUnitRoutes: MetadataRoute.Sitemap =
    englishUnitPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/birimler/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/units/${page.slug}`;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl
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

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.85,

        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl)
          : undefined,
      };
    });

  const englishCategoryRoutes: MetadataRoute.Sitemap =
    englishCategoryPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/kategoriler/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/categories/${page.slug}`;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl
        ),
      };
    });

  const turkishCalculatorRoutes: MetadataRoute.Sitemap =
    calculatorPages.map((page) => {
      const englishPage =
        findEnglishCalculatorPageByTurkishSlug(page.slug);

      const turkishUrl =
        `${baseUrl}/hesaplayicilar/${page.slug}`;

      const englishUrl = englishPage
        ? `${baseUrl}/en/calculators/${englishPage.slug}`
        : undefined;

      return {
        url: turkishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: englishUrl
          ? languageAlternates(turkishUrl, englishUrl)
          : undefined,
      };
    });

  const englishCalculatorRoutes: MetadataRoute.Sitemap =
    englishCalculatorPages.map((page) => {
      const turkishUrl =
        `${baseUrl}/hesaplayicilar/${page.sourceSlug}`;

      const englishUrl =
        `${baseUrl}/en/calculators/${page.slug}`;

      return {
        url: englishUrl,
        lastModified: contentLastModified,
        changeFrequency: "monthly",
        priority: 0.78,
        alternates: languageAlternates(
          turkishUrl,
          englishUrl
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
        `${baseUrl}/en`
      ),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: contentLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: languageAlternates(
        baseUrl,
        `${baseUrl}/en`
      ),
    },
    {
      url: `${baseUrl}/muhendislik-hesaplayicilari`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`
      ),
    },
    {
      url: `${baseUrl}/en/engineering-calculators`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: languageAlternates(
        `${baseUrl}/muhendislik-hesaplayicilari`,
        `${baseUrl}/en/engineering-calculators`
      ),
    },
    {
      url: `${baseUrl}/birimler`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`
      ),
    },
    {
      url: `${baseUrl}/en/units`,
      lastModified: contentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: languageAlternates(
        `${baseUrl}/birimler`,
        `${baseUrl}/en/units`
      ),
    },
 {
  url: `${baseUrl}/tum-birimler`,
  lastModified: contentLastModified,
  changeFrequency: "monthly",
  priority: 0.8,
  alternates: languageAlternates(
    `${baseUrl}/tum-birimler`,
    `${baseUrl}/en/all-conversions`
  ),
},
{
  url: `${baseUrl}/en/all-conversions`,
  lastModified: contentLastModified,
  changeFrequency: "monthly",
  priority: 0.8,
  alternates: languageAlternates(
    `${baseUrl}/tum-birimler`,
    `${baseUrl}/en/all-conversions`
  ),
},

    ...turkishCategoryRoutes,
    ...englishCategoryRoutes,
    ...turkishCalculatorRoutes,
    ...englishCalculatorRoutes,
    ...turkishConversionRoutes,
    ...englishConversionRoutes,
    ...turkishUnitRoutes,
    ...englishUnitRoutes,
    ...corporateRoutes,
  ];
}
