import type { Metadata } from "next";
import ReynoldsNumberPage from "../../../components/calculators/ReynoldsNumberPage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Reynolds Number Calculator (Re = ρ × v × D / μ)",
  description:
    "Calculate Reynolds number, velocity or characteristic diameter with Re = ρ × v × D / μ and display the SI equivalent together with an approximate internal pipe flow interpretation.",
  alternates: {
    canonical: "/en/calculators/reynolds-number",
    languages: {
      tr: "/hesaplayicilar/reynolds-sayisi",
      en: "/en/calculators/reynolds-number",
      "x-default": "/hesaplayicilar/reynolds-sayisi",
    },
  },
  openGraph: {
    title: "Reynolds Number Calculator (Re = ρ × v × D / μ)",
    description:
      "Solve Reynolds number or its inverse variables from density, velocity, diameter and dynamic viscosity.",
    url: buildSiteUrl("/en/calculators/reynolds-number"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishReynoldsNumberCalculatorRoute() {
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
        name: "Reynolds Number Calculator",
        item: buildSiteUrl("/en/calculators/reynolds-number"),
      },
    ],
  };

  return (
    <ReynoldsNumberPage
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
