import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kereste metreküp hesabı nasıl yapılır?",
    answer:
      "Kereste hacmi, uzunluk (m) × genişlik (cm/100) × kalınlık (cm/100) formülüyle hesaplanır. Birden fazla parça için her parçanın hacmi adediyle çarpılıp toplanır.",
  },
  {
    question: "Kereste siparişinde fire oranı ne kadar olmalı?",
    answer:
      "Kesim, planyalama ve işleme kayıplarını karşılamak için genelde %5-10 arasında bir fire oranı eklenir; kullanılan makine ve işçilik yöntemine göre bu oran değişebilir.",
  },
];

export const metadata: Metadata = {
  title: "Marangoz Araçları: Kereste Hesaplama, Birim Dönüşümleri",
  description:
    "Marangoz ve mobilyacılar için tek sayfada toplanmış araçlar: kereste metreküp hesaplama, hacim/uzunluk/kütle birim dönüşümleri.",
  alternates: { canonical: "/marangoz-araclari" },
  openGraph: {
    title: "Marangoz Araçları: Kereste Hesaplama, Birim Dönüşümleri",
    description: "Kereste metreküp hesaplama ve ilgili birim dönüşümleri tek sayfada.",
    url: buildSiteUrl("/marangoz-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MarangozAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Marangoz Araçları", item: buildSiteUrl("/marangoz-araclari") },
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Marangoz Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Marangoz Araçları</h1>
          <p>
            Marangoz ve mobilyacıların günlük olarak ihtiyaç duyduğu
            hesaplama araçlarını ve birim dönüşümlerini tek sayfada
            topladık: kereste metreküp hesaplama, hacim, uzunluk ve
            kütle dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Kereste hacmi</strong> = Uzunluk(m) × Genişlik(cm/100) × Kalınlık(cm/100)
            </li>
            <li>
              <strong>Tipik fire oranı</strong>: %5-10
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/kereste-hesaplama">Kereste Metreküp Hesaplama</Link>
              {" "}— kereste parçalarının boyut ve adedinden toplam
              hacmi ve fire dahil toplamı hesapla.
            </li>
            <li>
              <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>
              {" "}— m³, litre ve diğer hacim birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— mm, cm, inç ve diğer uzunluk birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
              {" "}— kg ve diğer ağırlık birimleri arasında dönüşüm
              yap.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Kereste metreküp hesabı nasıl yapılır?</strong>
            <br />
            Kereste hacmi, uzunluk (m) × genişlik (cm/100) × kalınlık
            (cm/100) formülüyle hesaplanır. Birden fazla parça için
            her parçanın hacmi adediyle çarpılıp toplanır.{" "}
            <Link href="/kereste-hesaplama">Kereste Metreküp Hesaplama</Link>{" "}
            aracımızla bu hesabı anında yapabilirsin.
          </p>
          <p>
            <strong>Kereste siparişinde fire oranı ne kadar olmalı?</strong>
            <br />
            Kesim, planyalama ve işleme kayıplarını karşılamak için
            genelde %5-10 arasında bir fire oranı eklenir; kullanılan
            makine ve işçilik yöntemine göre bu oran değişebilir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Kereste hacim formülü temel geometri hesabına dayanır.
            Fire oranları genel referans değerlerdir, malzeme türüne
            göre değişebilir.
          </p>
        </section>
      </div>
    </main>
  );
}
