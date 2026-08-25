import type { Metadata } from "next";
import OhmsLawPage from "../../../components/calculators/OhmsLawPage";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Ohm's Law Calculator (V = I x R)",
  description:
    "Calculate voltage, current or resistance and view the result with its SI equivalent and substituted formula.",
  alternates: {
    canonical: "/en/calculators/ohms-law",
    languages: {
      tr: "/hesaplayicilar/ohm-yasasi",
      en: "/en/calculators/ohms-law",
      "x-default": "/hesaplayicilar/ohm-yasasi",
    },
  },
  openGraph: {
    title: "Ohm's Law Calculator (V = I x R)",
    description:
      "Calculate voltage, current or resistance with Ohm's law for quick electrical checks.",
    url: buildSiteUrl("/en/calculators/ohms-law"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohm's Law Calculator (V = I x R)",
    description:
      "Calculate voltage, current or resistance with Ohm's law for quick electrical checks.",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishOhmsLawCalculatorPage() {
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
        name: "Ohm's Law Calculator",
        item: buildSiteUrl("/en/calculators/ohms-law"),
      },
    ],
  };

  return (
    <OhmsLawPage
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
