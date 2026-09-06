import type { Metadata } from "next";
import Link from "next/link";
import MorseFallScaleCalculator from "../components/MorseFallScaleCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Morse Düşme Skalası ne için kullanılır?",
    answer:
      "Hastanede yatan hastalarda düşme riskini değerlendirmek için kullanılan, düşme öyküsü, yürüme yardımcısı, IV tedavi ve yürüyüş gibi 6 kriteri puanlayan hemşirelik risk tarama aracıdır.",
  },
  {
    question: "Morse skoru yüksek çıkarsa ne yapılmalı?",
    answer:
      "Yüksek risk kategorisi, düşme önleme protokollerinin (yakın gözlem, yardımla mobilizasyon, yatak alarmı gibi) devreye alınması gerektiğine işaret eder; kesin bakım planı sorumlu sağlık ekibi tarafından belirlenmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Morse Düşme Skalası Hesaplama",
  description:
    "Düşme öyküsü, yürüme yardımcısı, IV tedavi ve yürüyüş kriterlerini işaretle: Morse Düşme Skoru ve risk kategorisini hesapla.",
  alternates: { canonical: "/morse-dusme-skalasi-hesaplama" },
  openGraph: {
    title: "Morse Düşme Skalası Hesaplama",
    description: "Morse Düşme Skorunu hesaplayın.",
    url: buildSiteUrl("/morse-dusme-skalasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MorseFallScalePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Morse Düşme Skalası Hesaplama",
        item: buildSiteUrl("/morse-dusme-skalasi-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Morse Düşme Skalası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Morse Düşme Skalası Hesaplama</h1>
          <p>
            Düşme öyküsü, yürüme yardımcısı, IV tedavi ve yürüyüş
            kriterlerini işaretle: Morse Düşme Skorunu ve risk
            kategorisini anında hesapla.
          </p>
        </header>

        <MorseFallScaleCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Morse Düşme Skalası ne için kullanılır?</strong>
            <br />
            Hastanede yatan hastalarda düşme riskini değerlendirmek
            için kullanılan, düşme öyküsü, yürüme yardımcısı, IV
            tedavi ve yürüyüş gibi 6 kriteri puanlayan hemşirelik
            risk tarama aracıdır.
          </p>
          <p>
            <strong>Morse skoru yüksek çıkarsa ne yapılmalı?</strong>
            <br />
            Yüksek risk kategorisi, düşme önleme protokollerinin
            (yakın gözlem, yardımla mobilizasyon, yatak alarmı gibi)
            devreye alınması gerektiğine işaret eder; kesin bakım
            planı sorumlu sağlık ekibi tarafından belirlenmelidir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Basınç yarası riski için{" "}
            <Link href="/braden-skalasi-hesaplama">Braden Skalası Hesaplama</Link>,
            diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Morse JM ve ark. (1989) tarafından geliştirilmiştir.
            Bu araç tıbbi tavsiye yerine geçmez; bakım planı için
            sorumlu sağlık ekibine danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
