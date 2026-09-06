import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Crop factor ve pozlama eşdeğeri neden önemli?",
    answer:
      "Farklı sensör formatları arasında lens değiştirdiğinde veya ışık koşulu değiştiğinde, aynı görüş açısını veya aynı parlaklığı korumak için hangi ayarı nasıl değiştirmen gerektiğini bilmek çekim planlamasını hızlandırır.",
  },
  {
    question: "Baskı için hangi çözünürlük yeterli?",
    answer:
      "Standart baskı için 300 DPI, web için 72-96 DPI yeterlidir. Detaylı hesap için Piksel, CM ve DPI Hesaplama aracını kullanabilirsin.",
  },
];

export const metadata: Metadata = {
  title: "Fotoğrafçı Araçları: Pozlama, Crop Factor, DPI",
  description:
    "Fotoğrafçılar için tek sayfada toplanmış araçlar: pozlama eşdeğeri (exposure triangle), crop factor / odak uzaklığı eşdeğeri, piksel ve DPI hesaplama.",
  alternates: {
    canonical: "/fotografci-araclari",
  },
  openGraph: {
    title: "Fotoğrafçı Araçları: Pozlama, Crop Factor, DPI",
    description: "Pozlama eşdeğeri, crop factor ve DPI hesaplama tek sayfada.",
    url: buildSiteUrl("/fotografci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FotografciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Fotoğrafçı Araçları", item: buildSiteUrl("/fotografci-araclari") },
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
          <span>Fotoğrafçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Fotoğrafçı Araçları</h1>
          <p>
            Fotoğrafçıların çekim öncesi ve sonrasında ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: pozlama
            eşdeğeri (exposure triangle), crop factor / odak uzaklığı
            eşdeğeri ve baskı çözünürlüğü hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Parlaklık</strong> ∝ ISO × Enstantane / Diyafram²
            </li>
            <li>
              <strong>APS-C crop factor</strong>: 1,5 (Nikon/Sony/Fuji) veya 1,6 (Canon)
            </li>
            <li>
              <strong>Standart baskı</strong>: 300 DPI
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/pozlama-esdegeri-hesaplama">Pozlama Eşdeğeri Hesaplama</Link>
              {" "}— ISO, diyafram ve enstantaneden ikisini gir, aynı
              pozlamayı koruyacak üçüncüsünü hesapla.
            </li>
            <li>
              <Link href="/odak-uzakligi-esdegeri-hesaplama">
                Odak Uzaklığı Eşdeğeri Hesaplama (Crop Factor)
              </Link>{" "}
              — lensin gerçek odak uzaklığından, sensör formatına göre
              tam kare eşdeğerini hesapla.
            </li>
            <li>
              <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>
              {" "}— baskı veya ekran için piksel, fiziksel boyut ve DPI
              hesabı yap.
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
