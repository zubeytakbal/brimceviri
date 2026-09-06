import type { Metadata } from "next";
import Link from "next/link";
import KeresteCalculator from "../components/KeresteCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kereste metreküp hesabı nasıl yapılır?",
    answer:
      "Kereste hacmi, uzunluk (m) × genişlik (cm/100) × kalınlık (cm/100) formülüyle hesaplanır. Birden fazla kereste parçası için her parçanın hacmi adediyle çarpılıp toplanır.",
  },
  {
    question: "Fire oranı neden ekleniyor?",
    answer:
      "Kesim, planyalama ve işleme sırasında kereste hacminin bir kısmı kayıp olarak gider. Bu kaybı karşılamak için sipariş verirken hesaplanan hacme genelde %5-10 arasında bir fire oranı eklenir.",
  },
];

export const metadata: Metadata = {
  title: "Kereste Metreküp Hesaplama",
  description:
    "Kereste parçalarının uzunluk, genişlik, kalınlık ve adedinden toplam hacmi (m³) ve fire dahil toplamı hesapla.",
  alternates: { canonical: "/kereste-hesaplama" },
  openGraph: {
    title: "Kereste Metreküp Hesaplama",
    description: "Kereste hacmini hesaplayın.",
    url: buildSiteUrl("/kereste-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KerestePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kereste Metreküp Hesaplama", item: buildSiteUrl("/kereste-hesaplama") },
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
          <span>Kereste Metreküp Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kereste Metreküp Hesaplama</h1>
          <p>
            Kereste parçalarının uzunluk, genişlik, kalınlık ve
            adedini gir: toplam hacmi ve fire dahil toplamı anında
            hesapla.
          </p>
        </header>

        <KeresteCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Kereste metreküp hesabı nasıl yapılır?</strong>
            <br />
            Kereste hacmi, uzunluk (m) × genişlik (cm/100) × kalınlık
            (cm/100) formülüyle hesaplanır. Birden fazla kereste
            parçası için her parçanın hacmi adediyle çarpılıp
            toplanır.
          </p>
          <p>
            <strong>Fire oranı neden ekleniyor?</strong>
            <br />
            Kesim, planyalama ve işleme sırasında kereste hacminin
            bir kısmı kayıp olarak gider. Bu kaybı karşılamak için
            sipariş verirken hesaplanan hacme genelde %5-10 arasında
            bir fire oranı eklenir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer marangoz araçları için{" "}
            <Link href="/marangoz-araclari">Marangoz Araçları</Link>{" "}
            sayfasına, hacim birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, temel geometri hacim hesabına dayanır. Fire oranı
            genel bir referans değerdir; malzeme türüne ve işleme
            yöntemine göre değişebilir.
          </p>
        </section>
      </div>
    </main>
  );
}
