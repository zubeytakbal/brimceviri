import type { Metadata } from "next";
import HydrostaticPressurePage from "../../../components/calculators/HydrostaticPressurePage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Hydrostatic Pressure Calculator (DeltaP = rho g h)",
  description:
    "Calculate hydrostatic pressure difference, density, depth or gravitational acceleration and view the result in SI base units and readable engineering scales.",
  alternates: {
    canonical: "/en/calculators/hydrostatic-pressure",
    languages: {
      tr: "/hesaplayicilar/hidrostatik-basinc",
      en: "/en/calculators/hydrostatic-pressure",
      "x-default": "/hesaplayicilar/hidrostatik-basinc",
    },
  },
  openGraph: {
    title: "Hydrostatic Pressure Calculator (DeltaP = rho g h)",
    description:
      "Solve hydrostatic pressure difference or its inverse variables from density, gravity and depth using an SI-based calculation flow.",
    url: buildSiteUrl("/en/calculators/hydrostatic-pressure"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydrostatic Pressure Calculator (DeltaP = rho g h)",
    description:
      "Solve hydrostatic pressure difference or its inverse variables from density, gravity and depth using an SI-based calculation flow.",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishHydrostaticPressureCalculatorRoute() {
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
        name: "Hydrostatic Pressure Calculator",
        item: buildSiteUrl("/en/calculators/hydrostatic-pressure"),
      },
    ],
  };

  return (
    <HydrostaticPressurePage
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
