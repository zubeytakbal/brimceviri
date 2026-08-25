import type { Metadata } from "next";
import HeatConductionPage from "../../../components/calculators/HeatConductionPage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Heat Conduction Calculator (Q = k x A x dT / L)",
  description:
    "Calculate heat-transfer rate, thermal conductivity, area, temperature difference or thickness and show the SI equivalent beside the main result.",
  alternates: {
    canonical: "/en/calculators/heat-conduction",
    languages: {
      tr: "/hesaplayicilar/isi-iletimi",
      en: "/en/calculators/heat-conduction",
      "x-default": "/hesaplayicilar/isi-iletimi",
    },
  },
  openGraph: {
    title: "Heat Conduction Calculator (Q = k x A x dT / L)",
    description:
      "Solve conduction heat-transfer rate or its inverse variables with material presets and real unit conversions.",
    url: buildSiteUrl("/en/calculators/heat-conduction"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heat Conduction Calculator (Q = k x A x dT / L)",
    description:
      "Solve conduction heat-transfer rate or its inverse variables with material presets and real unit conversions.",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishHeatConductionCalculatorRoute() {
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
        name: "Heat Conduction Calculator",
        item: buildSiteUrl("/en/calculators/heat-conduction"),
      },
    ],
  };

  return (
    <HeatConductionPage
      locale="en"
      structuredData={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbSchema),
          }}
        />
      }
    />
  );
}
