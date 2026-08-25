import type { Metadata } from "next";
import ElectricalEngineeringHubPage from "../../components/ElectricalEngineeringHubPage";
import {
  getElectricalCalculatorItems,
  getElectricalHubCopy,
  getElectricalHubPath,
} from "../../converter/engineeringHubs";
import { SITE_NAME, SITE_URL, buildSiteUrl } from "../../siteConfig";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const pagePath = getElectricalHubPath("tr");
const englishPath = getElectricalHubPath("en");
const germanPath = getElectricalHubPath("de");
const copy = getElectricalHubCopy("tr");

export const metadata: Metadata = {
  title: `${copy.title} | ${SITE_NAME}`,
  description: copy.description,
  alternates: {
    canonical: pagePath,
    languages: {
      tr: pagePath,
      en: englishPath,
      de: germanPath,
      "x-default": pagePath,
    },
  },
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function TurkishElectricalHubPage() {
  const items = getElectricalCalculatorItems("tr");
  const pageUrl = buildSiteUrl(pagePath);

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
        name: "M\u00fchendislik Hesaplay\u0131c\u0131lar\u0131",
        item: buildSiteUrl("/muhendislik-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.title,
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    inLanguage: "tr-TR",
    isPartOf: SITE_URL,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
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
      <ElectricalEngineeringHubPage locale="tr" />
    </>
  );
}

