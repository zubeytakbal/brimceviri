import type { Metadata } from "next";
import Link from "next/link";
import ZoningCalculator from "../components/ZoningCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "KAKS (Emsal) nedir?",
    answer:
      "KAKS, \"Kat Alanı Katsayısı\"nın kısaltmasıdır ve halk arasında \"emsal\" olarak da bilinir. Bir arsada yapılabilecek toplam inşaat alanının, arsa alanına oranını ifade eder.",
  },
  {
    question: "Toplam inşaat alanı nasıl hesaplanır?",
    answer:
      "Toplam İnşaat Alanı (m²) = Arsa Alanı (m²) × KAKS. Örneğin 1.000 m² bir arsada KAKS değeri 2,0 ise, toplam 2.000 m² inşaat alanı yapılabilir.",
  },
  {
    question: "TAKS nedir ve kat sayısı nasıl tahmin edilir?",
    answer:
      "TAKS (Taban Alanı Katsayısı), bir katın kaplayabileceği maksimum alanı belirler: Maksimum Taban Alanı = Arsa Alanı × TAKS. Toplam inşaat alanının taban alanına bölünmesi, yaklaşık kaç kat yapılabileceğini gösterir.",
  },
  {
    question: "KAKS ve TAKS değerlerini nereden öğrenirim?",
    answer:
      "Bu değerler parsele özeldir ve belediyenin e-imar sisteminden veya imar durum belgesinden öğrenilir. Bu araç bu değerleri belirlemez, yalnızca birim çevirimi yapar.",
  },
];

export const metadata: Metadata = {
  title: "Emsal (KAKS) Hesaplama: İnşaat Alanı ve Kat Sayısı",
  description:
    "Arsa alanı, KAKS (emsal) ve TAKS değerinden toplam inşaat alanını, maksimum taban alanını ve tahmini kat sayısını hesapla.",
  alternates: {
    canonical: "/emsal-kaks-hesaplama",
  },
  openGraph: {
    title: "Emsal (KAKS) Hesaplama: İnşaat Alanı ve Kat Sayısı",
    description: "Arsa alanı ve KAKS değerinden inşaat alanını hesapla.",
    url: buildSiteUrl("/emsal-kaks-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ZoningCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Mimar Araçları", item: buildSiteUrl("/mimar-araclari") },
      { "@type": "ListItem", position: 4, name: "Emsal (KAKS) Hesaplama", item: buildSiteUrl("/emsal-kaks-hesaplama") },
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
          <Link href="/mimar-araclari">Mimar Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Emsal (KAKS) Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Emsal (KAKS) Hesaplama</h1>
          <p>
            Arsa alanını ve KAKS (emsal) değerini gir: toplam inşaat
            alanını hesapla. TAKS değerini de eklersen, maksimum taban
            alanı ve tahmini kat sayısını da görürsün.
          </p>
        </header>

        <ZoningCalculator />

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
            Diğer mimar araçları için{" "}
            <Link href="/mimar-araclari">Mimar Araçları</Link>
            {" "}sayfasına, alan birimi dönüşümleri için{" "}
            <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, Türkiye&apos;de imar planlarında standart kabul
            edilen KAKS/TAKS tanımlarına dayanır. Bu araç imar
            danışmanlığı yerine geçmez; KAKS/TAKS değerlerini
            belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
