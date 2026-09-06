import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kokteyl tariflerinde geçen \"oz\" hangi ons?",
    answer:
      "Kokteyl tariflerinde geçen oz her zaman sıvı ons (fl oz, ~29,57 mL) anlamına gelir; ağırlık onsu (~28,35 g) ile karıştırılmamalıdır.",
  },
  {
    question: "Bu sayfadaki araçlar sağlık tavsiyesi verir mi?",
    answer:
      "Hayır. Standart içki hesaplayıcısı yalnızca saf alkol miktarını hesaplar; alkol tüketimiyle ilgili sağlık tavsiyesi vermez.",
  },
];

export const metadata: Metadata = {
  title: "Barmen Araçları: Kokteyl Ölçüsü, ABV Hesaplama",
  description:
    "Barmenler için tek sayfada toplanmış araçlar: oz/mL/cl kokteyl ölçüsü çevirme, alkol yüzdesi (ABV) ve standart içki hesaplama.",
  alternates: {
    canonical: "/barmen-araclari",
  },
  openGraph: {
    title: "Barmen Araçları: Kokteyl Ölçüsü, ABV Hesaplama",
    description: "Kokteyl ölçüsü ve ABV hesaplama tek sayfada.",
    url: buildSiteUrl("/barmen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BarmenAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Barmen Araçları", item: buildSiteUrl("/barmen-araclari") },
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
          <span>Barmen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Barmen Araçları</h1>
          <p>
            Barmenlerin bar arkasında ihtiyaç duyduğu hesaplama
            araçlarını tek sayfada topladık: oz/mL/cl kokteyl ölçüsü
            çevirme, alkol yüzdesi (ABV) ve standart içki hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 oz</strong> ≈ 29,57 mL ≈ 2,96 cl
            </li>
            <li>
              <strong>Standart içki</strong> ≈ 10 g saf alkol (uluslararası yaygın referans)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/kokteyl-olcusu-cevirici">Kokteyl Ölçüsü Çevirici</Link>
              {" "}— oz, mL ve cl arasında kokteyl ölçüsü çevir.
            </li>
            <li>
              <Link href="/abv-standart-icki-hesaplama">ABV ve Standart İçki Hesaplama</Link>
              {" "}— içecek hacmi ve alkol yüzdesinden saf alkol
              miktarını ve standart içki sayısını hesapla.
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
