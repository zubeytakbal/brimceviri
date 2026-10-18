import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ScreedCalculator from "../components/ScreedCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Şap hacmi nasıl hesaplanır?",
    answer: "Şap hacmi, kaplanacak alanın metrekare değeri ile ortalama kalınlığın metreye çevrilmiş değerinin çarpılmasıyla bulunur. İsteğe bağlı fire payı bu net hacme eklenir.",
  },
  {
    question: "Şap kalınlığını mm mi cm mi girmeliyim?",
    answer: "Araç kalınlığı milimetre cinsinden alır. Örneğin 5 cm kalınlık için 50 mm girilmelidir.",
  },
  {
    question: "Bu hesap kaç torba hazır şap gerektiğini gösterir mi?",
    answer: "Hayır. Torba adedi ürünün ambalajındaki kg/m² tüketim değerine ve uygulama kalınlığına göre değişir. Bu araç yalnızca hacmi hesaplar.",
  },
];

export const metadata: Metadata = {
  title: "Şap Hacmi Hesaplama: Alan ve Kalınlıktan m³",
  description: "Şap uygulanacak alan, kalınlık ve fire oranından gereken yaklaşık şap hacmini m³ ve litre olarak hesapla.",
  alternates: { canonical: "/sap-hacmi-hesaplama" },
  openGraph: {
    title: "Şap Hacmi Hesaplama",
    description: "Zemin alanı ve şap kalınlığından gerekli hacmi bulun.",
    url: buildSiteUrl("/sap-hacmi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ScreedCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Şap Hacmi Hesaplama", item: buildSiteUrl("/sap-hacmi-hesaplama") },
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
          <span>Şap Hacmi Hesaplama</span>
        </nav>
        <header className="all-conversions-header">
          <h1>Şap Hacmi Hesaplama</h1>
          <p>Zemin alanını, ortalama şap kalınlığını ve fire payını girerek gereken yaklaşık hacmi hesapla.</p>
        </header>
        <ScreedCalculator />
        <section className="category-article-content">
          <h2>Şap miktarı nasıl hesaplanır?</h2>
          <p>
            Net hacim = alan (m²) × kalınlık (mm) ÷ 1000. Örneğin 40 m² alana 50 mm (5 cm) kalınlığında şap için net hacim 2 m³ olur. Uygulama ve taşımadaki kayıplar için fire oranı ayrıca eklenebilir.
          </p>
          <h2>İlgili inşaat araçları</h2>
          <p>
            <Link href="/beton-hesaplama">Beton Hesaplama</Link>{" "}·{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>{" "}·{" "}
            <Link href="/kalip-alani-hesaplama">Kalıp Alanı Hesaplama</Link>
          </p>
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
          <p>
            Bu araç ön metraj içindir. Uygulanacak minimum/maksimum kalınlık, karışım oranı ve ürün miktarı ilgili ürün teknik dokümanına ve projeye göre belirlenmelidir.
          </p>
        </section>
      </div>
    </main>
  );
}
