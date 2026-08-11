import type { Metadata } from "next";
import PressureForceAreaPage from "../../components/calculators/PressureForceAreaPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../converter/localizedCalculatorPages";
import { buildSiteUrl } from "../../siteConfig";

const englishPage =
  findEnglishCalculatorPageByTurkishSlug("basinc-kuvvet-alan");

export const metadata: Metadata = {
  title: "Basınç Hesaplama (P = F/A)",
  description:
    "Basınç, kuvvet ve alan arasındaki ilişkiyi P = F/A, F = P×A ve A = F/P formülleriyle hesaplayın; sonucu Pa, hPa, kPa, MPa, bar, atm, psi, ksi, N, kN, kgf, lbf, m², cm², mm², ft² ve daha birçok birimde görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/basinc-kuvvet-alan",
    languages: {
      tr: "/hesaplayicilar/basinc-kuvvet-alan",
      en: englishPage
        ? `/en/calculators/${englishPage.slug}`
        : "/en",
      "x-default": "/hesaplayicilar/basinc-kuvvet-alan",
    },
  },
  openGraph: {
    title: "Basınç Hesaplama (P = F/A)",
    description:
      "Basıncı, kuvveti veya alanı SI taban birimleri üzerinden çözün ve sonucu SI, metrik ve İngiliz/ABD mühendislik birimlerinde karşılaştırın.",
    url: buildSiteUrl("/hesaplayicilar/basinc-kuvvet-alan"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PressureForceAreaCalculatorPage() {
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
        name: "Basınç, Kuvvet ve Alan Hesaplayıcısı",
        item: buildSiteUrl("/hesaplayicilar/basinc-kuvvet-alan"),
      },
    ],
  };

  return (
    <PressureForceAreaPage
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
