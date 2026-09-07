import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Peyzaj Araçları ile Çiftçi Araçları arasındaki fark nedir?",
    answer:
      "Çiftçi Araçları tarla üretiminde girdi hesaplarına (gübre, tohum) odaklanır. Peyzaj Araçları ise bahçe ve çim alanlarında sulama sistemi tasarımına (debi, süre) odaklanır.",
  },
  {
    question: "Bu sayfadaki araçlar peyzaj danışmanlığı yerine geçer mi?",
    answer:
      "Hayır. Sulama süresi hesaplayıcısı yalnızca birim çevirimi yapar; hangi sulama miktarının bitki veya çim türüne uygun olduğunu belirlemez.",
  },
];

export const metadata: Metadata = {
  title: "Peyzaj Araçları: Sulama Süresi Hesaplama",
  description:
    "Peyzaj ve bahçıvanlık için tek sayfada toplanmış araçlar: sulama süresi (damla/sprinkler) hesaplama, alan ve hacim birimi dönüşümleri.",
  alternates: {
    canonical: "/peyzaj-araclari",
  },
  openGraph: {
    title: "Peyzaj Araçları: Sulama Süresi Hesaplama",
    description: "Sulama süresi hesaplama tek sayfada.",
    url: buildSiteUrl("/peyzaj-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PeyzajAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Peyzaj Araçları", item: buildSiteUrl("/peyzaj-araclari") },
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
          <span>Peyzaj Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Peyzaj Araçları</h1>
          <p>
            Peyzaj ve bahçıvanlık işlerinde ihtiyaç duyulan hesaplama
            araçlarını tek sayfada topladık: sulama süresi hesaplama,
            alan ve hacim birimi dönüşümleri. Gübre ve tohum
            hesapları için{" "}
            <Link href="/ciftci-araclari">Çiftçi Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 mm su</strong> / 1 m² alan = 1 litre
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/sulama-suresi-hesaplama">Sulama Süresi Hesaplama</Link>
              {" "}— hedef sulama miktarı, alan ve sistem debisinden
              sulama süresini hesapla.
            </li>
            <li>
              <Link href="/gubre-seyreltme-hesaplama">Gübre Seyreltme Hesaplama</Link>
              {" "}— etiketteki oran veya dozla, hazırlaman gereken
              gübre miktarını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
              {" "}— m², dönüm ve dekar birimleri arasında dönüşüm yap.
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
