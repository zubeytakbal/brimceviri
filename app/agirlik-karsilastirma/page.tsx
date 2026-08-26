import type { Metadata } from "next";
import Link from "next/link";
import WeightComparisonTool from "../components/WeightComparisonTool";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Ağırlık Karşılaştırma: Bu Kaç Kilogram Eder?",
  description:
    "Bir ağırlık değeri gir: kedi, insan, at, otomobil, fil ve mavi balina gibi tanıdık nesnelerle kaç kat olduğunu anında gör.",
  alternates: {
    canonical: "/agirlik-karsilastirma",
  },
  openGraph: {
    title: "Ağırlık Karşılaştırma: Bu Kaç Kilogram Eder?",
    description:
      "Bir ağırlık değerini tanıdık nesnelerle (kedi, insan, at, fil, mavi balina...) karşılaştırın.",
    url: buildSiteUrl("/agirlik-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "En yakın karşılaştırma nasıl seçiliyor?",
    answer:
      "Girdiğin değere oranı 1'e (yani birebir eşit olmaya) en yakın olan referans nesne en üstte gösterilir; listedeki diğer tüm nesneler de kaç kat olduklarıyla birlikte sıralanır.",
  },
  {
    question: "Referans ağırlıklar ne kadar kesin?",
    answer:
      "Bunlar kesin bilimsel ölçümler değil, yaygın kabul gören kaynaklardan derlenmiş yuvarlatılmış ortalama değerlerdir (örneğin bir at ırktan ırka, bir otomobil modelden modele farklı ağırlıkta olabilir).",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WeightComparisonPage() {
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
        name: "Ağırlık Karşılaştırma",
        item: buildSiteUrl("/agirlik-karsilastirma"),
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
          <span>Ağırlık Karşılaştırma</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ağırlık Karşılaştırma</h1>
          <p>
            Bir ağırlık değeri gir: ev kedisi, yetişkin insan, at,
            otomobil, fil ve mavi balina gibi tanıdık nesnelerle kaç kat
            olduğunu anında gör.
          </p>
        </header>

        <WeightComparisonTool />

        <section className="category-article-content">
          <h2>Bu karşılaştırmalar nereden geliyor?</h2>
          <p>
            Kullanılan referans değerler yaygın kabul gören
            kaynaklardan derlenmiştir: ev kedisi için veteriner
            kaynaklarının belirttiği ortalama ağırlık aralığı (3,5-4,5
            kg &#8594; 4 kg), yetişkin insan için küresel genel
            istatistik ortalaması (~70 kg), Afrika fili için National
            Geographic/WWF verileri (yetişkin ortalama ~6.000 kg) ve
            mavi balina için NOAA Fisheries verileri (yetişkin
            ortalama ~150.000 kg) kullanılmıştır. Bunlar kesin
            ölçümler değil, karşılaştırma amaçlı yuvarlatılmış
            ortalama değerlerdir.
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
