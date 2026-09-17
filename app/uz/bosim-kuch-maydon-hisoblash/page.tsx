import type { Metadata } from "next";
import PressureForceAreaPageUz from "../../components/calculators/PressureForceAreaPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/bosim-kuch-maydon-hisoblash";

export const metadata: Metadata = {
  title: "Bosim Hisoblagichi (P = F / A)",
  description:
    "Bosimni, kuchni yoki maydonni P = F / A bilan hisoblang; natijani Pa, hPa, kPa, MPa, bar, atm, psi, ksi, N, kN, kgf, lbf, m2, cm2, mm2, ft2 va yana ko'plab birlikda ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/basinc-kuvvet-alan",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/basinc-kuvvet-alan",
    },
  },
  openGraph: {
    title: "Bosim Hisoblagichi (P = F / A)",
    description:
      "Bosimni, kuchni yoki maydonni SI baza birliklari orqali hisoblang va natijani SI, metrik hamda imperial/AQSH muhandislik birliklarida solishtiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPressureForceAreaCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: buildSiteUrl("/uz"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bosim, Kuch va Maydon Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <PressureForceAreaPageUz
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
