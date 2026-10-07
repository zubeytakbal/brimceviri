import {
  findGermanCategoryPageByCategory,
  getGermanCategoryPathByCategory,
} from "../converter/localizedGermanCategoryPages";
import type { LocalizedGermanConversionPage } from "../converter/localizedGermanConversionPages";
import { buildSiteUrl } from "../siteConfig";

type GermanConversionSeoProps = {
  conversionPage: LocalizedGermanConversionPage;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GermanConversionSeo({
  conversionPage,
}: GermanConversionSeoProps) {
  const pageUrl = buildSiteUrl(`/de/${conversionPage.slug}`);
  const categoryPage = findGermanCategoryPageByCategory(
    conversionPage.category
  );
  const categoryUrl = buildSiteUrl(
    getGermanCategoryPathByCategory(conversionPage.category)
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: buildSiteUrl("/de"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage?.title ?? conversionPage.categoryName,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${conversionPage.fromName} in ${conversionPage.toName} Umrechner`,
        item: pageUrl,
      },
    ],
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${conversionPage.fromName} in ${conversionPage.toName} Umrechner`,
    url: pageUrl,
    description: `Kostenloses Tool zur Umrechnung von ${conversionPage.fromName} in ${conversionPage.toName}.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(applicationSchema),
        }}
      />
    </>
  );
}
