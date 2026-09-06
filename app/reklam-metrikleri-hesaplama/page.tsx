import type { Metadata } from "next";
import Link from "next/link";
import AdMetricsCalculator from "../components/AdMetricsCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CPM, CTR ve CPC nasıl hesaplanır?",
    answer:
      "CPM (Bin Gösterim Başına Maliyet) = (Maliyet / Gösterim Sayısı) × 1000. CTR (Tıklama Oranı) = (Tıklama Sayısı / Gösterim Sayısı) × 100. CPC (Tıklama Başına Maliyet) = Maliyet / Tıklama Sayısı.",
  },
  {
    question: "ROI nasıl hesaplanır?",
    answer:
      "ROI (Yatırım Getirisi) = ((Elde Edilen Gelir - Maliyet) / Maliyet) × 100. Pozitif bir ROI, reklam harcamasının kârlı olduğunu gösterir.",
  },
];

export const metadata: Metadata = {
  title: "Reklam Metrikleri Hesaplama: CPM, CTR, CPC, ROI",
  description:
    "Maliyet, gösterim ve tıklama sayısından CPM, CTR ve CPC hesapla; maliyet ve gelirden reklam yatırım getirisini (ROI) hesapla.",
  alternates: {
    canonical: "/reklam-metrikleri-hesaplama",
  },
  openGraph: {
    title: "Reklam Metrikleri Hesaplama: CPM, CTR, CPC, ROI",
    description: "CPM, CTR, CPC ve ROI hesaplama tek sayfada.",
    url: buildSiteUrl("/reklam-metrikleri-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AdMetricsCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Dijital Pazarlamacı Araçları", item: buildSiteUrl("/dijital-pazarlamaci-araclari") },
      { "@type": "ListItem", position: 4, name: "Reklam Metrikleri Hesaplama", item: buildSiteUrl("/reklam-metrikleri-hesaplama") },
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
          <Link href="/dijital-pazarlamaci-araclari">Dijital Pazarlamacı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Reklam Metrikleri Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Reklam Metrikleri Hesaplama</h1>
          <p>
            Maliyet, gösterim ve tıklama sayısını gir: CPM, CTR ve CPC
            hesapla. Alttaki ikinci araçla, maliyet ve gelirden reklam
            yatırım getirisini (ROI) hesapla.
          </p>
        </header>

        <AdMetricsCalculator />

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
            Diğer dijital pazarlamacı araçları için{" "}
            <Link href="/dijital-pazarlamaci-araclari">Dijital Pazarlamacı Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
