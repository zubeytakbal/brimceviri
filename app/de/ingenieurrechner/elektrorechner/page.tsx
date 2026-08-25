import type { Metadata } from "next";
import ElectricalEngineeringHubPage from "../../../components/ElectricalEngineeringHubPage";
import {
  getElectricalCalculatorItems,
  getElectricalHubCopy,
  getElectricalHubPath,
} from "../../../converter/engineeringHubs";
import { SITE_NAME, SITE_URL, buildSiteUrl } from "../../../siteConfig";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const turkishPath = getElectricalHubPath("tr");
const englishPath = getElectricalHubPath("en");
const pagePath = getElectricalHubPath("de");
const copy = getElectricalHubCopy("de");

export const metadata: Metadata = {
  title: `${copy.title} | ${SITE_NAME}`,
  description: copy.description,
  alternates: {
    canonical: pagePath,
    languages: {
      tr: turkishPath,
      en: englishPath,
      de: pagePath,
      "x-default": turkishPath,
    },
  },
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanElectricalHubPage() {
  const items = getElectricalCalculatorItems("de");
  const pageUrl = buildSiteUrl(pagePath);

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
        name: "Ingenieurrechner",
        item: buildSiteUrl("/de/ingenieurrechner"),
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
    inLanguage: "de-DE",
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
      <ElectricalEngineeringHubPage locale="de" />
    </>
  );
}

