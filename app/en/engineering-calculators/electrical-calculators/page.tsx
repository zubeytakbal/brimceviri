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
const pagePath = getElectricalHubPath("en");
const germanPath = getElectricalHubPath("de");
const copy = getElectricalHubCopy("en");

export const metadata: Metadata = {
  title: `${copy.title} | ${SITE_NAME}`,
  description: copy.description,
  alternates: {
    canonical: pagePath,
    languages: {
      tr: turkishPath,
      en: pagePath,
      de: germanPath,
      "x-default": turkishPath,
    },
  },
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishElectricalHubPage() {
  const items = getElectricalCalculatorItems("en");
  const pageUrl = buildSiteUrl(pagePath);

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
        name: "Engineering Calculators",
        item: buildSiteUrl("/en/engineering-calculators"),
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
    inLanguage: "en-US",
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
      <ElectricalEngineeringHubPage locale="en" />
    </>
  );
}

