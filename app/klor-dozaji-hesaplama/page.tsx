import type { Metadata } from "next";
import Link from "next/link";
import ChlorineDoseCalculator from "../components/ChlorineDoseCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Klor dozajı nasıl hesaplanır?",
    answer:
      "ppm, mg/L'ye eşittir. Gereken saf klor miktarı (mg) = (Hedef Klor - Mevcut Klor) ppm × Havuz Hacmi (litre). Bu değer 1000'e bölünerek grama çevrilir, ardından ürünün aktif klor yüzdesine bölünerek toplam ürün miktarı bulunur.",
  },
  {
    question: "Hedef klor seviyesi ne olmalı?",
    answer:
      "Yüzme havuzlarında serbest klor genelde 1-3 ppm aralığında tutulur; şoklama gibi özel durumlarda bu değer çok daha yüksek olabilir. Bu araç hedef değeri belirlemez — sen bunu havuz bakım rehberinden veya yerel mevzuattan almalısın.",
  },
  {
    question: "Ürünün aktif klor yüzdesi nereden bulunur?",
    answer:
      "Sıvı klor genelde %12-15, granül kalsiyum hipoklorit genelde %65-70 aktif klor içerir. Bu değer ürünün ambalajında/etiketinde belirtilir.",
  },
];

export const metadata: Metadata = {
  title: "Klor Dozajı Hesaplama (Havuz)",
  description:
    "Havuz hacmi, mevcut ve hedef klor seviyesinden, ürünün aktif klor yüzdesine göre gereken klor ürünü miktarını (gram) hesapla.",
  alternates: {
    canonical: "/klor-dozaji-hesaplama",
  },
  openGraph: {
    title: "Klor Dozajı Hesaplama (Havuz)",
    description: "Havuz hacmi ve klor seviyesinden ürün miktarını hesapla.",
    url: buildSiteUrl("/klor-dozaji-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ChlorineDoseCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Havuz Teknisyeni Araçları", item: buildSiteUrl("/havuz-teknisyeni-araclari") },
      { "@type": "ListItem", position: 4, name: "Klor Dozajı Hesaplama", item: buildSiteUrl("/klor-dozaji-hesaplama") },
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
          <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Klor Dozajı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Klor Dozajı Hesaplama</h1>
          <p>
            Havuz hacmini, mevcut ve hedef klor seviyesini (ppm) ve
            ürününün aktif klor yüzdesini gir: gereken ürün miktarını
            (gram) hesapla.
          </p>
        </header>

        <ChlorineDoseCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer havuz teknisyeni araçları için{" "}
            <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
            {" "}sayfasına, havuz hacmi hesaplama için{" "}
            <Link href="/havuz-hacmi-hesaplama">Havuz Hacmi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, ppm (ağırlık/hacim) derişim tanımına dayanan temel
            klorlama aritmetiğine dayanır. Bu araç havuz bakım
            danışmanlığı yerine geçmez; hedef klor seviyesini
            belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
