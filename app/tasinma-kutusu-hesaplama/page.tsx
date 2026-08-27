import type { Metadata } from "next";
import Link from "next/link";
import MovingBoxCalculator from "../components/MovingBoxCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu rakamlar kesin midir?",
    answer:
      "Hayır, nakliye sektöründe ev tipine göre kullanılan ortalama tahminlerdir; eşya miktarınız, biriktirdiğiniz kitap/eşya yoğunluğu ve balkon/depo eşyalarına göre gerçek ihtiyacınız değişebilir.",
  },
  {
    question: "Küçük ve büyük koli arasındaki fark nedir?",
    answer:
      "Küçük koliler genelde kitap, mutfak eşyası gibi ağır/küçük parçalar için, büyük koliler ise yastık, battaniye, giysi gibi hafif/hacimli eşyalar için kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Taşınma Kutusu Hesaplama: Ev Tipine Göre Kaç Koli Gerekir?",
  description:
    "Ev tipini seç (stüdyo, 1+1, 2+1, 3+1...); taşınma için tahmini koli sayısını ve kamyon hacmini gör.",
  alternates: {
    canonical: "/tasinma-kutusu-hesaplama",
  },
  openGraph: {
    title: "Taşınma Kutusu Hesaplama: Ev Tipine Göre Kaç Koli Gerekir?",
    description:
      "Ev tipine göre tahmini taşınma kolisi sayısını ve kamyon hacmini hesaplayın.",
    url: buildSiteUrl("/tasinma-kutusu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MovingBoxCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Taşınma Kutusu Hesaplama",
        item: buildSiteUrl("/tasinma-kutusu-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Taşınma Kutusu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Taşınma Kutusu Hesaplama</h1>
          <p>
            Ev tipini seç: taşınma için tahmini küçük/büyük koli sayısını
            ve gereken kamyon hacmini gör.
          </p>
        </header>

        <MovingBoxCalculator />

        <section className="category-article-content">
          <h2>Bu tahminler nasıl belirlendi?</h2>
          <p>
            Rakamlar, nakliye sektöründe ev tipine göre yaygın kullanılan
            ortalama koli ve kamyon hacmi değerlerine dayanır. Kesin bir
            fiziksel formülden değil, sektörel deneyimden gelen bir referans
            tablosudur; gerçek ihtiyacınız eşya miktarınıza göre değişebilir.
          </p>

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
