import type { Metadata } from "next";
import HydrostaticPressurePageUz from "../../components/calculators/HydrostaticPressurePageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/gidrostatik-bosim-hisoblash";

export const metadata: Metadata = {
  title: "Gidrostatik Bosim Hisoblash (ΔP = ρgh)",
  description:
    "Gidrostatik bosim farqini, zichlikni, chuqurlikni yoki tortishish tezlanishini ΔP = ρgh formulasi bilan hisoblang; natijani SI ekvivalenti bilan birga ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/hidrostatik-basinc",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/hidrostatik-basinc",
    },
  },
  openGraph: {
    title: "Gidrostatik Bosim Hisoblash (ΔP = ρgh)",
    description:
      "Gidrostatik bosim farqini, zichlikni, chuqurlikni yoki tortishish tezlanishini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHydrostaticPressureCalculatorPage() {
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
        name: "Gidrostatik Bosim Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <HydrostaticPressurePageUz
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
