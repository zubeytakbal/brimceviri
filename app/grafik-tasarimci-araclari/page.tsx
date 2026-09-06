import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Piksel ile cm arasında nasıl dönüşüm yapılır?",
    answer:
      "Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI çarpılarak bulunur: piksel = (cm / 2,54) × DPI.",
  },
  {
    question: "Baskı için hangi DPI değeri kullanılmalı?",
    answer:
      "Web ve ekran tasarımı için 72-96 DPI, standart baskı için 300 DPI, yüksek kaliteli baskı için 600 DPI yaygın kullanılan değerlerdir.",
  },
];

export const metadata: Metadata = {
  title: "Grafik Tasarımcı Araçları: Piksel, CM, DPI Hesaplama",
  description:
    "Grafik tasarımcı ve baskı öncesi hazırlık yapan profesyoneller için tek sayfada toplanmış araçlar: piksel/cm/DPI hesaplama, uzunluk ve alan dönüşümleri.",
  alternates: { canonical: "/grafik-tasarimci-araclari" },
  openGraph: {
    title: "Grafik Tasarımcı Araçları: Piksel, CM, DPI Hesaplama",
    description: "Piksel, cm ve DPI hesaplama tek sayfada.",
    url: buildSiteUrl("/grafik-tasarimci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GrafikTasarimciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Grafik Tasarımcı Araçları", item: buildSiteUrl("/grafik-tasarimci-araclari") },
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
          <span>Grafik Tasarımcı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Grafik Tasarımcı Araçları</h1>
          <p>
            Grafik tasarımcı, web tasarımcı ve baskı öncesi hazırlık
            yapan profesyonellerin günlük olarak ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: piksel/cm/DPI
            hesaplama, uzunluk ve alan dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Piksel</strong> = (cm / 2,54) × DPI
            </li>
            <li>
              <strong>Web için</strong>: 72-96 DPI
            </li>
            <li>
              <strong>Baskı için</strong>: 300 DPI
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>
              {" "}— piksel sayısı, fiziksel boyut veya DPI
              değerinden ikisini gir, üçüncüsünü hesapla.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— mm, cm, inç ve diğer uzunluk birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
              {" "}— m², cm² ve diğer alan birimleri arasında
              dönüşüm yap.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Piksel ile cm arasında nasıl dönüşüm yapılır?</strong>
            <br />
            Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI
            çarpılarak bulunur: piksel = (cm / 2,54) × DPI.{" "}
            <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>{" "}
            aracımızla bu dönüşümü anında yapabilirsin.
          </p>
          <p>
            <strong>Baskı için hangi DPI değeri kullanılmalı?</strong>
            <br />
            Web ve ekran tasarımı için 72-96 DPI, standart baskı için
            300 DPI, yüksek kaliteli baskı için 600 DPI yaygın
            kullanılan değerlerdir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, dijital görüntü çözünürlüğü ve baskı sektöründe
            standart kabul edilen piksel/inç/DPI ilişkisine
            dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
