import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Mimar Araçları ile İnşaatçı Araçları arasındaki fark nedir?",
    answer:
      "İnşaatçı Araçları, inşaat sırasında gereken malzeme miktarlarını (boya, fayans, beton) hesaplar. Mimar Araçları ise inşaat öncesinde, bir arsada ne kadar inşaat yapılabileceğini (emsal/KAKS) hesaplar.",
  },
];

export const metadata: Metadata = {
  title: "Mimar Araçları: Emsal (KAKS) Hesaplama",
  description:
    "Mimarlar için tek sayfada toplanmış araçlar: arsa alanı ve KAKS/TAKS değerinden inşaat alanı hesaplama, alan birimi dönüşümleri.",
  alternates: {
    canonical: "/mimar-araclari",
  },
  openGraph: {
    title: "Mimar Araçları: Emsal (KAKS) Hesaplama",
    description: "Emsal (KAKS) hesaplama tek sayfada.",
    url: buildSiteUrl("/mimar-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MimarAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Mimar Araçları", item: buildSiteUrl("/mimar-araclari") },
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
          <span>Mimar Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mimar Araçları</h1>
          <p>
            Mimarların proje öncesi arsa değerlendirmesinde ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: emsal
            (KAKS) hesaplama, alan birimi dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Toplam İnşaat Alanı</strong> = Arsa Alanı × KAKS
            </li>
            <li>
              <strong>Maksimum Taban Alanı</strong> = Arsa Alanı × TAKS
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/emsal-kaks-hesaplama">Emsal (KAKS) Hesaplama</Link>
              {" "}— arsa alanı ve KAKS/TAKS değerinden toplam inşaat
              alanı ve tahmini kat sayısını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
              {" "}— m², dönüm, dekar ve hektar birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/elastik-uzama-hesaplama">Elastik Uzama Hesaplama</Link>
              {" "}— Hooke Yasası ile bir yapı elemanının elastik
              uzamasını hesapla.
            </li>
            <li>
              <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
              {" "}— cam yünü, taş yünü, XPS, EPS ve poliüretan köpük dahil
              yalıtım malzemelerinin ısıl iletkenlik değerleriyle ısı
              kaybını hesapla.
            </li>
            <li>
              <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
              {" "}— duvar yalıtımının kaç yılda kendini çıkardığını
              yıllık enerji tasarrufu üzerinden hesapla.
            </li>
          </ul>

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
