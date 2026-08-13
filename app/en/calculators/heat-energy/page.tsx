import type { Metadata } from "next";
import HeatEnergyPage from "../../../components/calculators/HeatEnergyPage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Heat Energy Calculator (Q = m × c × ΔT)",
  description:
    "Calculate heat energy, mass, specific heat or temperature difference with Q = m × c × ΔT and view the result with an SI equivalent and a readable unit.",
  alternates: {
    canonical: "/en/calculators/heat-energy",
    languages: {
      tr: "/hesaplayicilar/isi-enerjisi",
      en: "/en/calculators/heat-energy",
      "x-default": "/hesaplayicilar/isi-enerjisi",
    },
  },
  openGraph: {
    title: "Heat Energy Calculator (Q = m × c × ΔT)",
    description:
      "Solve heat energy or its inverse variables with real unit conversions and SI-based reporting.",
    url: buildSiteUrl("/en/calculators/heat-energy"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishHeatEnergyCalculatorRoute() {
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
        name: "Heat Energy Calculator",
        item: buildSiteUrl("/en/calculators/heat-energy"),
      },
    ],
  };

  return (
    <HeatEnergyPage
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
