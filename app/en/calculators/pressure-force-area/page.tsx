import type { Metadata } from "next";
import PressureForceAreaPage from "../../../components/calculators/PressureForceAreaPage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Pressure Calculator (P = F / A)",
  description:
    "Calculate pressure, force or area with P = F / A and view the result in Pa, hPa, kPa, MPa, bar, atm, psi, ksi, N, kN, kgf, lbf, m2, cm2, mm2, ft2 and many more units.",
  alternates: {
    canonical: "/en/calculators/pressure-force-area",
    languages: {
      tr: "/hesaplayicilar/basinc-kuvvet-alan",
      en: "/en/calculators/pressure-force-area",
      "x-default": "/hesaplayicilar/basinc-kuvvet-alan",
    },
  },
  openGraph: {
    title: "Pressure Calculator (P = F / A)",
    description:
      "Solve pressure, force or area through SI base units and compare the result across SI, metric and Imperial/US engineering units.",
    url: buildSiteUrl("/en/calculators/pressure-force-area"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pressure Calculator (P = F / A)",
    description:
      "Solve pressure, force or area through SI base units and compare the result across SI, metric and Imperial/US engineering units.",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishPressureForceAreaCalculatorPage() {
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
        name: "Pressure, Force and Area Calculator",
        item: buildSiteUrl("/en/calculators/pressure-force-area"),
      },
    ],
  };

  return (
    <PressureForceAreaPage
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
