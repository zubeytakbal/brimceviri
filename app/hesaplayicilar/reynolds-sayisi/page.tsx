import type { Metadata } from "next";
import ReynoldsNumberPage from "../../components/calculators/ReynoldsNumberPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../converter/localizedCalculatorPages";
import { buildSiteUrl } from "../../siteConfig";

const englishPage =
  findEnglishCalculatorPageByTurkishSlug("reynolds-sayisi");

export const metadata: Metadata = {
  title: "Reynolds Sayısı Hesaplama (Re = ρ × v × D / μ)",
  description:
    "Reynolds sayısını, akış hızını veya karakteristik çapı Re = ρ × v × D / μ bağıntısıyla hesaplayın; sonucu SI eşdeğeri ve yaklaşık akış rejimi yorumu ile görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/reynolds-sayisi",
    languages: {
      tr: "/hesaplayicilar/reynolds-sayisi",
      en: englishPage
        ? `/en/calculators/${englishPage.slug}`
        : "/en",
      "x-default": "/hesaplayicilar/reynolds-sayisi",
    },
  },
  openGraph: {
    title: "Reynolds Sayısı Hesaplama (Re = ρ × v × D / μ)",
    description:
      "Reynolds sayısını veya ters değişkenlerini yoğunluk, hız, çap ve dinamik viskozite üzerinden çözün.",
    url: buildSiteUrl("/hesaplayicilar/reynolds-sayisi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ReynoldsNumberCalculatorRoute() {
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
        name: "Reynolds Sayısı Hesaplayıcısı",
        item: buildSiteUrl("/hesaplayicilar/reynolds-sayisi"),
      },
    ],
  };

  return (
    <ReynoldsNumberPage
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
