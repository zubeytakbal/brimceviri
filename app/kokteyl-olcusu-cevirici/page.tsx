import type { Metadata } from "next";
import Link from "next/link";
import BarVolumeCalculator from "../components/BarVolumeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 oz kaç mL'dir?",
    answer: "1 ABD sıvı ons (fl oz) yaklaşık 29,57 mL'ye eşittir.",
  },
  {
    question: "Jigger ve pony ne kadar tutar?",
    answer:
      "Standart bir jigger genelde bir tarafta 1 oz (~3 cl), diğer tarafta 1,5 oz (~4,4 cl) ölçer. Pony ise tek başına 1 oz'luk bir ölçektir.",
  },
  {
    question: "Neden sıvı ons ile ağırlık onsu (oz) karıştırılmamalı?",
    answer:
      "İkisi de \"oz\" kısaltmasını kullanır ama tamamen farklı şeyleri ölçer: sıvı ons bir hacim birimidir (~29,57 mL), ağırlık onsu ise bir kütle birimidir (~28,35 g). Kokteyl tariflerinde geçen \"oz\" her zaman sıvı onstur.",
  },
];

export const metadata: Metadata = {
  title: "Kokteyl Ölçüsü Çevirici: Oz, mL, Cl",
  description:
    "Kokteyl ve bar ölçülerini oz (sıvı ons), mL ve cl arasında anında çevir; jigger ve pony gibi bar ölçeklerinin karşılıklarını gör.",
  alternates: {
    canonical: "/kokteyl-olcusu-cevirici",
  },
  openGraph: {
    title: "Kokteyl Ölçüsü Çevirici: Oz, mL, Cl",
    description: "Oz, mL ve cl arasında kokteyl ölçüsü çevir.",
    url: buildSiteUrl("/kokteyl-olcusu-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BarVolumeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Barmen Araçları", item: buildSiteUrl("/barmen-araclari") },
      { "@type": "ListItem", position: 4, name: "Kokteyl Ölçüsü Çevirici", item: buildSiteUrl("/kokteyl-olcusu-cevirici") },
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
          <span>Kokteyl Ölçüsü Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kokteyl Ölçüsü Çevirici</h1>
          <p>
            Kokteyl tariflerinde geçen oz (sıvı ons), mL ve cl
            ölçülerini bir değerden diğerlerine anında çevir.
          </p>
        </header>

        <BarVolumeCalculator />

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
            {" "}sayfasına, alkol yüzdesi ve standart içki hesaplama
            için{" "}
            <Link href="/abv-standart-icki-hesaplama">ABV ve Standart İçki Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
