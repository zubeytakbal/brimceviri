import type { Metadata } from "next";
import EngineeringHubPage, {
  getEngineeringHubCollectionItems,
  getEngineeringHubContent,
} from "../../components/EngineeringHubPage";
import { SITE_NAME, SITE_URL, buildSiteUrl } from "../../siteConfig";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const turkishPath = "/muhendislik-hesaplayicilari";
const pagePath = "/en/engineering-calculators";
const content = getEngineeringHubContent("en");

export const metadata: Metadata = {
  title: `${content.title} | ${SITE_NAME}`,
  description: content.description,
  alternates: {
    canonical: pagePath,
    languages: {
      tr: turkishPath,
      en: pagePath,
      "x-default": turkishPath,
    },
  },
  openGraph: {
    title: content.title,
    description: content.description,
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishEngineeringHubPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionItems = getEngineeringHubCollectionItems("en");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildSiteUrl("/en"),
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
    inLanguage: "en-US",
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
      <EngineeringHubPage locale="en" />
    </>
  );
}
