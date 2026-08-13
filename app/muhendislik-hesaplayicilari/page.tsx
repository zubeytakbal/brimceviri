import type { Metadata } from "next";
import EngineeringHubPage, {
  getEngineeringHubCollectionItems,
  getEngineeringHubContent,
} from "../components/EngineeringHubPage";
import { SITE_NAME, SITE_URL, buildSiteUrl } from "../siteConfig";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const pagePath = "/muhendislik-hesaplayicilari";
const englishPath = "/en/engineering-calculators";
const content = getEngineeringHubContent("tr");

export const metadata: Metadata = {
  title: `${content.title} | ${SITE_NAME}`,
  description: content.description,
  alternates: {
    canonical: pagePath,
    languages: {
      tr: pagePath,
      en: englishPath,
      "x-default": pagePath,
    },
  },
  openGraph: {
    title: content.title,
    description: content.description,
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function TurkishEngineeringHubPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionItems = getEngineeringHubCollectionItems("tr");

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
        name: content.title,
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: pageUrl,
    inLanguage: "tr-TR",
    isPartOf: SITE_URL,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collectionItems.length,
      itemListElement: collectionItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: buildSiteUrl(item.href),
      })),
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
          __html: serializeJsonLd(collectionSchema),
        }}
      />
      <EngineeringHubPage locale="tr" />
    </>
  );
}
