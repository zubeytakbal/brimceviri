import type { Metadata } from "next";
import Link from "next/link";
import AbvCalculator from "../components/AbvCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Saf alkol miktarı nasıl hesaplanır?",
    answer:
      "Saf Alkol Hacmi (mL) = İçecek Hacmi (mL) × ABV (%) / 100. Ağırlığa çevirmek için, etanolün yoğunluğu (~0,789 g/mL) ile çarpılır: Saf Alkol Ağırlığı (g) = Saf Alkol Hacmi (mL) × 0,789.",
  },
  {
    question: "Standart içki (standard drink) nedir?",
    answer:
      "Standart içki, farklı içecek türlerini (bira, şarap, viski vb.) karşılaştırılabilir kılmak için kullanılan, belirli miktarda saf alkole karşılık gelen bir referans birimidir. Uluslararası yaygın kullanılan referans 10 g saf alkoldür; ABD 14 g, İngiltere 8 g gibi farklı ülke standartları da vardır.",
  },
];

export const metadata: Metadata = {
  title: "ABV ve Standart İçki Hesaplama",
  description:
    "İçecek hacmi ve alkol yüzdesinden (ABV) saf alkol miktarını (mL ve g) ve standart içki sayısını hesapla.",
  alternates: {
    canonical: "/abv-standart-icki-hesaplama",
  },
  openGraph: {
    title: "ABV ve Standart İçki Hesaplama",
    description: "İçecek hacmi ve ABV'den saf alkol miktarını hesapla.",
    url: buildSiteUrl("/abv-standart-icki-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AbvCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Barmen Araçları", item: buildSiteUrl("/barmen-araclari") },
      { "@type": "ListItem", position: 4, name: "ABV ve Standart İçki Hesaplama", item: buildSiteUrl("/abv-standart-icki-hesaplama") },
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
          <Link href="/barmen-araclari">Barmen Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>ABV ve Standart İçki Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>ABV ve Standart İçki Hesaplama</h1>
          <p>
            İçecek hacmi ve alkol yüzdesini (ABV) gir: saf alkol
            miktarını (mL ve g) ve standart içki sayısını hesapla.
          </p>
        </header>

        <AbvCalculator />

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
            Diğer barmen araçları için{" "}
            <Link href="/barmen-araclari">Barmen Araçları</Link>
            {" "}sayfasına, oz/mL/cl çevirme için{" "}
            <Link href="/kokteyl-olcusu-cevirici">Kokteyl Ölçüsü Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, etanolün yoğunluğuna (~0,789 g/mL, 20°C&apos;de)
            dayanır. Standart içki referans değeri ülkeye göre
            değişir; bu araç tıbbi tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
