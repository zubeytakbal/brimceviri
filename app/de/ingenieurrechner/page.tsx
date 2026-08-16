import type { Metadata } from "next";
import EngineeringHubPage, {
  getEngineeringHubCollectionItems,
  getEngineeringHubContent,
} from "../../components/EngineeringHubPage";
import { SITE_NAME, SITE_URL, buildSiteUrl } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const content = getEngineeringHubContent("de");

export const metadata: Metadata = {
  title: `${content.title} | ${SITE_NAME}`,
  description: content.description,
  alternates: {
    canonical: germanStaticPaths.engineeringHub,
    languages: {
      tr: "/muhendislik-hesaplayicilari",
      en: "/en/engineering-calculators",
      de: germanStaticPaths.engineeringHub,
      "x-default": "/muhendislik-hesaplayicilari",
    },
  },
  openGraph: {
    title: content.title,
    description: content.description,
    url: buildSiteUrl(germanStaticPaths.engineeringHub),
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanEngineeringHubPage() {
  const pageUrl = buildSiteUrl(germanStaticPaths.engineeringHub);
  const collectionItems = getEngineeringHubCollectionItems("de");

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
    inLanguage: "de-DE",
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
      <EngineeringHubPage locale="de" />
    </>
  );
}
