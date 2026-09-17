import type { Metadata } from "next";
import HeatEnergyPageUz from "../../components/calculators/HeatEnergyPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/issiqlik-energiyasi-hisoblash";

export const metadata: Metadata = {
  title: "Issiqlik Energiyasi Hisoblash (Q = mcΔT)",
  description:
    "Issiqlik energiyasini, massani, solishtirma issiqlikni yoki harorat farqini Q = m × c × ΔT bilan hisoblang; natijani SI ekvivalenti bilan birga ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/isi-enerjisi",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/isi-enerjisi",
    },
  },
  openGraph: {
    title: "Issiqlik Energiyasi Hisoblash (Q = mcΔT)",
    description: "Issiqlik energiyasini, massani, solishtirma issiqlikni yoki harorat farqini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHeatEnergyCalculatorPage() {
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
        name: "Issiqlik Energiyasi Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <HeatEnergyPageUz
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
