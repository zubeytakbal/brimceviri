import type { Metadata } from "next";
import PressureForceAreaPage from "../../../components/calculators/PressureForceAreaPage";

export const metadata: Metadata = {
  title: "Pressure Calculator (P = F/A)",
  description:
    "Calculate pressure, force or area with P = F/A, F = P × A and A = F/P, then view the result in Pa, hPa, kPa, MPa, bar, atm, psi, ksi, N, kN, kgf, lbf, m², cm², mm², ft² and many more units.",
  alternates: {
    canonical: "/en/calculators/pressure-force-area",
    languages: {
      tr: "/hesaplayicilar/basinc-kuvvet-alan",
      en: "/en/calculators/pressure-force-area",
      "x-default": "/hesaplayicilar/basinc-kuvvet-alan",
    },
  },
  openGraph: {
    title: "Pressure Calculator (P = F/A)",
    description:
      "Solve pressure, force or area through SI base units and compare the result across SI, metric and Imperial/US engineering units.",
    url: "https://birimceviri.app/en/calculators/pressure-force-area",
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
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
        item: "https://birimceviri.app/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pressure, Force and Area Calculator",
        item: "https://birimceviri.app/en/calculators/pressure-force-area",
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
