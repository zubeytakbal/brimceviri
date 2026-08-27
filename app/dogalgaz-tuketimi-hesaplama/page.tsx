import type { Metadata } from "next";
import Link from "next/link";
import NaturalGasCalculator from "../components/NaturalGasCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Doğalgaz faturamdaki m³ değerini nereden görürüm?",
    answer:
      "Faturanın \"tüketim\" veya \"gerçek tüketim\" bölümünde m³ cinsinden yazar; bazı faturalarda ayrıca \"düzeltilmiş\" (correction katsayılı) bir m³ değeri de bulunur.",
  },
  {
    question: "kWh karşılığı neden yaklaşık?",
    answer:
      "Doğalgazın enerji içeriği (alt ısıl değer), gazın kaynağına ve dağıtım bölgesine göre az miktarda değişir; bu araç Türkiye ortalaması bir katsayı kullanır, faturandaki gerçek değer birkaç yüzde farklı olabilir.",
  },
];

export const metadata: Metadata = {
  title: "Doğalgaz Tüketimi Hesaplama: m³'ten Maliyet Hesabı",
  description:
    "Doğalgaz tüketimini (m³) ve birim fiyatı gir; toplam maliyeti ve yaklaşık kWh karşılığını anında hesapla.",
  alternates: {
    canonical: "/dogalgaz-tuketimi-hesaplama",
  },
  openGraph: {
    title: "Doğalgaz Tüketimi Hesaplama: m³'ten Maliyet Hesabı",
    description:
      "m³ cinsinden doğalgaz tüketiminden toplam maliyeti ve yaklaşık kWh karşılığını hesaplayın.",
    url: buildSiteUrl("/dogalgaz-tuketimi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function NaturalGasCalculatorPage() {
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
        name: "Doğalgaz Tüketimi Hesaplama",
        item: buildSiteUrl("/dogalgaz-tuketimi-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Doğalgaz Tüketimi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Doğalgaz Tüketimi Hesaplama</h1>
          <p>
            Doğalgaz tüketimini (m³) ve birim fiyatı gir: toplam maliyeti
            ve yaklaşık enerji (kWh) karşılığını anında gör.
          </p>
        </header>

        <NaturalGasCalculator />

        <section className="category-article-content">
          <h2>Doğalgaz maliyeti nasıl hesaplanır?</h2>
          <p>
            Hesap basittir: <strong>Toplam Maliyet = Tüketim (m³) × Birim
            Fiyat (₺/m³)</strong>. kWh karşılığı ise Türkiye ortalaması bir
            katsayıyla (yaklaşık 10,55 kWh/m³) tahmini olarak gösterilir;
            gerçek faturandaki katsayı bölgeye göre farklılık gösterebilir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
