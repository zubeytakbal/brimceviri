import type { Metadata } from "next";
import HeatConductionPage from "../../components/calculators/HeatConductionPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../converter/localizedCalculatorPages";
import { buildSiteUrl } from "../../siteConfig";

const englishPage =
  findEnglishCalculatorPageByTurkishSlug("isi-iletimi");

export const metadata: Metadata = {
  title: "Isı İletimi Hesaplama (Q̇ = k × A × ΔT / L)",
  description:
    "Isı geçiş hızını, ısıl iletkenliği, alanı, sıcaklık farkını veya kalınlığı Q̇ = k × A × ΔT / L bağıntısıyla hesaplayın; sonucu SI eşdeğeri ve okunabilir uygun birimle görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/isi-iletimi",
    languages: {
      tr: "/hesaplayicilar/isi-iletimi",
      en: englishPage
        ? `/en/calculators/${englishPage.slug}`
        : "/en",
      "x-default": "/hesaplayicilar/isi-iletimi",
    },
  },
  openGraph: {
    title: "Isı İletimi Hesaplama (Q̇ = k × A × ΔT / L)",
    description:
      "Isı iletimini, malzeme iletkenliğini ve katman kalınlığını gerçek birim dönüşümleriyle çözün.",
    url: buildSiteUrl("/hesaplayicilar/isi-iletimi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatConductionCalculatorRoute() {
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
        name: "Isı İletimi Hesaplayıcısı",
        item: buildSiteUrl("/hesaplayicilar/isi-iletimi"),
      },
    ],
  };

  return (
    <HeatConductionPage
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
