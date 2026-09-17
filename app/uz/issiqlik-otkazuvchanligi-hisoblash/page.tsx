import type { Metadata } from "next";
import HeatConductionPageUz from "../../components/calculators/HeatConductionPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/issiqlik-otkazuvchanligi-hisoblash";

export const metadata: Metadata = {
  title: "Issiqlik O'tkazuvchanligi Hisoblash (Q̇ = kAΔT/L)",
  description:
    "Issiqlik o'tish tezligini, issiqlik o'tkazuvchanligini, maydonni, harorat farqini yoki qalinlikni Q̇ = k × A × ΔT / L bilan hisoblang; natijani SI ekvivalenti bilan birga ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/isi-iletimi",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/isi-iletimi",
    },
  },
  openGraph: {
    title: "Issiqlik O'tkazuvchanligi Hisoblash (Q̇ = kAΔT/L)",
    description:
      "Issiqlik o'tish tezligini, issiqlik o'tkazuvchanligini, maydonni, harorat farqini yoki qalinlikni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHeatConductionCalculatorPage() {
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
        name: "Issiqlik O'tkazuvchanligi Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <HeatConductionPageUz
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
