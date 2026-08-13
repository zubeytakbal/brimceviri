import type { Metadata } from "next";
import HeatEnergyPage from "../../components/calculators/HeatEnergyPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../converter/localizedCalculatorPages";
import { buildSiteUrl } from "../../siteConfig";

const englishPage =
  findEnglishCalculatorPageByTurkishSlug("isi-enerjisi");

export const metadata: Metadata = {
  title: "Isı Enerjisi Hesaplama (Q = m × c × ΔT)",
  description:
    "Isı enerjisini, kütleyi, özgül ısıyı veya sıcaklık farkını Q = m × c × ΔT bağıntısıyla hesaplayın; sonucu SI eşdeğeri ve okunabilir uygun birimle görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/isi-enerjisi",
    languages: {
      tr: "/hesaplayicilar/isi-enerjisi",
      en: englishPage
        ? `/en/calculators/${englishPage.slug}`
        : "/en",
      "x-default": "/hesaplayicilar/isi-enerjisi",
    },
  },
  openGraph: {
    title: "Isı Enerjisi Hesaplama (Q = m × c × ΔT)",
    description:
      "Q = m × c × ΔT bağıntısıyla ısı enerjisini veya ters değişkenleri gerçek birim dönüşümleriyle çözün.",
    url: buildSiteUrl("/hesaplayicilar/isi-enerjisi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatEnergyCalculatorRoute() {
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
        name: "Isı Enerjisi Hesaplayıcısı",
        item: buildSiteUrl("/hesaplayicilar/isi-enerjisi"),
      },
    ],
  };

  return (
    <HeatEnergyPage
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
