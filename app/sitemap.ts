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
  englishUnitPages,
  findEnglishUnitPageByTurkishSlug,
} from "./converter/localizedUnitPages";
import { unitPages } from "./converter/unitPages";
import { SITE_LAST_MODIFIED, SITE_URL } from "./siteConfig";

const baseUrl = SITE_URL;
const contentLastModified = SITE_LAST_MODIFIED;

function languageAlternates(
  turkishUrl: string,
  englishUrl: string,
  germanUrl?: string
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
        `${baseUrl}/en`,
        `${baseUrl}/de`
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
        `${baseUrl}/de`
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
        `${baseUrl}/de`
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
        `${baseUrl}/de/ingenieurrechner`
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
        `${baseUrl}/de/ingenieurrechner`
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
        `${baseUrl}/de/ingenieurrechner`
      ),
    },
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
    },

    ...turkishCategoryRoutes,
    ...englishCategoryRoutes,
    ...germanCategoryRoutes,
    ...turkishCalculatorRoutes,
    ...englishCalculatorRoutes,
    ...turkishConversionRoutes,
    ...englishConversionRoutes,
    ...germanConversionRoutes,
    ...turkishUnitRoutes,
    ...englishUnitRoutes,
    ...germanUnitRoutes,
    ...corporateRoutes,
  ];
}
