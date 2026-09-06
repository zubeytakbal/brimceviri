import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CPM, CTR, CPC ve ROI arasındaki fark nedir?",
    answer:
      "CPM ve CPC maliyet odaklı metriklerdir (sırasıyla bin gösterim ve tıklama başına maliyet). CTR bir etkileşim oranıdır (tıklama/gösterim). ROI ise kampanyanın kârlılığını (gelir vs. maliyet) ölçer.",
  },
];

export const metadata: Metadata = {
  title: "Dijital Pazarlamacı Araçları: CPM, CTR, ROI Hesaplama",
  description:
    "Dijital pazarlamacılar için tek sayfada toplanmış araçlar: CPM, CTR, CPC ve ROI hesaplama.",
  alternates: {
    canonical: "/dijital-pazarlamaci-araclari",
  },
  openGraph: {
    title: "Dijital Pazarlamacı Araçları: CPM, CTR, ROI Hesaplama",
    description: "Reklam metrikleri hesaplama tek sayfada.",
    url: buildSiteUrl("/dijital-pazarlamaci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DijitalPazarlamaciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Dijital Pazarlamacı Araçları", item: buildSiteUrl("/dijital-pazarlamaci-araclari") },
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
          <span>Dijital Pazarlamacı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Dijital Pazarlamacı Araçları</h1>
          <p>
            Dijital pazarlamacıların kampanya performansını
            değerlendirirken ihtiyaç duyduğu hesaplama araçlarını tek
            sayfada topladık: CPM, CTR, CPC ve ROI hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>CPM</strong> = (Maliyet / Gösterim) × 1000
            </li>
            <li>
              <strong>ROI</strong> = ((Gelir - Maliyet) / Maliyet) × 100
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/reklam-metrikleri-hesaplama">Reklam Metrikleri Hesaplama</Link>
              {" "}— maliyet, gösterim ve tıklamadan CPM, CTR, CPC ve
              ROI hesapla.
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
