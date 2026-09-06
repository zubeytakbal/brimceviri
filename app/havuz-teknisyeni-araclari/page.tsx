import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar havuz bakım danışmanlığı yerine geçer mi?",
    answer:
      "Hayır. Klor dozajı hesaplayıcısı yalnızca birim çevirimi yapar; hangi hedef klor seviyesinin uygun olduğunu belirlemez. Yerel sağlık mevzuatı ve havuz kullanım yoğunluğuna göre hedef değer değişir.",
  },
];

export const metadata: Metadata = {
  title: "Havuz Teknisyeni Araçları: Hacim, Klor Dozajı Hesaplama",
  description:
    "Havuz teknisyenleri için tek sayfada toplanmış araçlar: havuz hacmi (m³) ve klor dozajı hesaplama, hacim birimi dönüşümleri.",
  alternates: {
    canonical: "/havuz-teknisyeni-araclari",
  },
  openGraph: {
    title: "Havuz Teknisyeni Araçları: Hacim, Klor Dozajı Hesaplama",
    description: "Havuz hacmi ve klor dozajı hesaplama tek sayfada.",
    url: buildSiteUrl("/havuz-teknisyeni-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HavuzTeknisyeniAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Havuz Teknisyeni Araçları", item: buildSiteUrl("/havuz-teknisyeni-araclari") },
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
          <span>Havuz Teknisyeni Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Havuz Teknisyeni Araçları</h1>
          <p>
            Havuz teknisyenlerinin bakım işlerinde ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: havuz hacmi
            (m³) ve klor dozajı hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Havuz Hacmi</strong> = Uzunluk × Genişlik × Ortalama Derinlik
            </li>
            <li>
              <strong>Tipik serbest klor</strong>: 1-3 ppm
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/havuz-hacmi-hesaplama">Havuz Hacmi Hesaplama</Link>
              {" "}— dikdörtgen veya yuvarlak havuzun ölçülerinden su
              hacmini hesapla.
            </li>
            <li>
              <Link href="/klor-dozaji-hesaplama">Klor Dozajı Hesaplama</Link>
              {" "}— havuz hacmi, mevcut/hedef klor ve ürün yüzdesinden
              gereken klor miktarını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>
              {" "}— litre, m³ ve diğer hacim birimleri arasında
              dönüşüm yap.
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
