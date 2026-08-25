import type { Metadata } from "next";
import OhmsLawPage from "../../components/calculators/OhmsLawPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../converter/localizedCalculatorPages";
import { buildSiteUrl } from "../../siteConfig";

const englishPage =
  findEnglishCalculatorPageByTurkishSlug("ohm-yasasi");

export const metadata: Metadata = {
  title: "Ohm Yasası Hesaplama (V = I × R)",
  description:
    "Gerilimi, akımı veya direnci V = I × R bağıntısıyla hesaplayın; sonucu SI eşdeğeri ve yerine koyulmuş formülle birlikte görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/ohm-yasasi",
    languages: {
      tr: "/hesaplayicilar/ohm-yasasi",
      en: englishPage
        ? `/en/calculators/${englishPage.slug}`
        : "/en/engineering-calculators",
      "x-default": "/hesaplayicilar/ohm-yasasi",
    },
  },
  openGraph: {
    title: "Ohm Yasası Hesaplama (V = I × R)",
    description:
      "Gerilimi, akımı veya direnci Ohm Yasası ile hesaplayın.",
    url: buildSiteUrl("/hesaplayicilar/ohm-yasasi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OhmsLawCalculatorRoute() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ohm Yasası Hesaplayıcısı",
        item: buildSiteUrl("/hesaplayicilar/ohm-yasasi"),
      },
    ],
  };

  return (
    <OhmsLawPage
      locale="tr"
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
