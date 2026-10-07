import {
  findCategoryPageByCategory,
  getCategoryPathByCategory,
} from "../converter/categoryPages";
import type { ConversionPage } from "../converter/conversionPages";
import { buildSiteUrl } from "../siteConfig";

type ConversionSeoProps = {
  conversionPage: ConversionPage;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ConversionSeo({
  conversionPage,
}: ConversionSeoProps) {
  const pageUrl = buildSiteUrl(`/${conversionPage.slug}`);
  const categoryPage = findCategoryPageByCategory(
    conversionPage.category
  );
  const categoryUrl = buildSiteUrl(
    getCategoryPathByCategory(conversionPage.category)
  );


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage?.title ?? conversionPage.category,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          `${conversionPage.fromName} – ` +
          `${conversionPage.toName} Çevirici`,
        item: pageUrl,
      },
    ],
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name:
      `${conversionPage.fromName} – ` +
      `${conversionPage.toName} Çevirici`,
    url: pageUrl,
    description:
      `${conversionPage.fromName} değerini ` +
      `${conversionPage.toName} birimine dönüştüren ücretsiz araç.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Tüm platformlar",
    browserRequirements: "JavaScript destekleyen bir web tarayıcısı",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
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
