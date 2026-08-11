import type { Metadata } from "next";
import HydrostaticPressurePage from "../../components/calculators/HydrostaticPressurePage";

export const metadata: Metadata = {
  title: "Hidrostatik Basınç Hesaplama (ΔP = ρgh)",
  description:
    "Hidrostatik basınç farkını, yoğunluğu, derinliği veya yerçekimi ivmesini ΔP = ρgh bağıntısıyla hesaplayın; sonucu SI taban birimleri ve okunabilir mühendislik ölçeğinde görüntüleyin.",
  alternates: {
    canonical: "/hesaplayicilar/hidrostatik-basinc",
    languages: {
      tr: "/hesaplayicilar/hidrostatik-basinc",
      en: "/en/calculators/hydrostatic-pressure",
      "x-default": "/hesaplayicilar/hidrostatik-basinc",
    },
  },
  openGraph: {
    title: "Hidrostatik Basınç Hesaplama (ΔP = ρgh)",
    description:
      "Yoğunluk, yerçekimi ivmesi ve derinlikten hidrostatik basınç farkını veya ters değişkenleri SI tabanlı olarak hesaplayın.",
    url: "https://birimceviri.app/hesaplayicilar/hidrostatik-basinc",
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HydrostaticPressureCalculatorRoute() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://birimceviri.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hidrostatik Basınç Hesaplayıcısı",
        item: "https://birimceviri.app/hesaplayicilar/hidrostatik-basinc",
      },
    ],
  };

  return (
    <HydrostaticPressurePage
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
