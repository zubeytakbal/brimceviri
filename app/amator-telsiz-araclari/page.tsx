import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araç bir anten analizörünün yerini alır mı?",
    answer:
      "Hayır. Bu araç yalnızca teorik bir başlangıç uzunluğu hesaplar; gerçek montajda SWR (duran dalga oranı) ölçülüp anten buna göre ince ayar yapılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Amatör Telsiz Araçları: Anten Uzunluğu Hesaplama",
  description:
    "Amatör telsizciler için tek sayfada toplanmış araçlar: dipol/vertikal anten uzunluğu hesaplama, Hz/kHz/MHz frekans dönüşümleri.",
  alternates: {
    canonical: "/amator-telsiz-araclari",
  },
  openGraph: {
    title: "Amatör Telsiz Araçları: Anten Uzunluğu Hesaplama",
    description: "Anten uzunluğu hesaplama tek sayfada.",
    url: buildSiteUrl("/amator-telsiz-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AmatorTelsizAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Amatör Telsiz Araçları", item: buildSiteUrl("/amator-telsiz-araclari") },
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
          <span>Amatör Telsiz Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Amatör Telsiz Araçları</h1>
          <p>
            Amatör telsizcilerin anten kurulumunda ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: dipol/vertikal
            anten uzunluğu hesaplama, Hz/kHz/MHz frekans dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Yarım Dalga Dipol</strong> = 142,5 / Frekans (MHz) metre
            </li>
            <li>
              <strong>Çeyrek Dalga Vertikal</strong> = 71,25 / Frekans (MHz) metre
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/anten-uzunlugu-hesaplama">Anten Uzunluğu Hesaplama</Link>
              {" "}— frekanstan dipol/vertikal anten uzunluğu hesapla,
              ya da anten uzunluğundan rezonans frekansını bul.
            </li>
            <li>
              <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
              {" "}— Hz, kHz, MHz ve GHz birimleri arasında dönüşüm yap.
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
