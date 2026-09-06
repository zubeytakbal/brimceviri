import type { Metadata } from "next";
import Link from "next/link";
import FocalLengthEquivalentCalculator from "../components/FocalLengthEquivalentCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Crop factor (kırpma çarpanı) nedir?",
    answer:
      "Crop factor, bir kameranın sensör boyutunun 35mm tam kare (full frame) sensöre göre oranıdır. Sensör küçüldükçe, aynı lens daha dar bir açı yakalar; bu da lensin tam kare eşdeğeri odak uzaklığının artması anlamına gelir.",
  },
  {
    question: "Eşdeğer odak uzaklığı nasıl hesaplanır?",
    answer:
      "Eşdeğer Odak Uzaklığı = Lensin Gerçek Odak Uzaklığı (mm) × Crop Factor. Örneğin 50mm'lik bir lens, 1,5 crop factor'lü bir APS-C kamerada 75mm'lik bir tam kare lens gibi bir görüş açısı verir.",
  },
  {
    question: "Crop factor diyaframı (f-sayısını) da değiştirir mi?",
    answer:
      "Hayır, yazılı f-sayısı (ışık miktarı) değişmez. Ancak alan derinliği açısından bazı fotoğrafçılar 'eşdeğer diyafram' (f-sayısı × crop factor) kavramını da kullanır; bu sayfa yalnızca görüş açısı eşdeğerini hesaplar.",
  },
];

export const metadata: Metadata = {
  title: "Odak Uzaklığı Eşdeğeri Hesaplama (Crop Factor)",
  description:
    "Lens odak uzaklığından, APS-C, Micro Four Thirds ve diğer sensör formatları için tam kare (full frame) eşdeğer odak uzaklığını hesapla.",
  alternates: {
    canonical: "/odak-uzakligi-esdegeri-hesaplama",
  },
  openGraph: {
    title: "Odak Uzaklığı Eşdeğeri Hesaplama (Crop Factor)",
    description: "Sensör formatına göre tam kare eşdeğer odak uzaklığını hesapla.",
    url: buildSiteUrl("/odak-uzakligi-esdegeri-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FocalLengthEquivalentCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Fotoğrafçı Araçları", item: buildSiteUrl("/fotografci-araclari") },
      { "@type": "ListItem", position: 4, name: "Odak Uzaklığı Eşdeğeri Hesaplama", item: buildSiteUrl("/odak-uzakligi-esdegeri-hesaplama") },
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
          <Link href="/fotografci-araclari">Fotoğrafçı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Odak Uzaklığı Eşdeğeri Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Odak Uzaklığı Eşdeğeri Hesaplama</h1>
          <p>
            Lensinin gerçek odak uzaklığını gir, kameranın sensör
            formatına göre tam kare (full frame) eşdeğerini ve diğer
            tüm formatlardaki karşılıklarını tek tabloda gör.
          </p>
        </header>

        <FocalLengthEquivalentCalculator />

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
            Diğer fotoğrafçı araçları için{" "}
            <Link href="/fotografci-araclari">Fotoğrafçı Araçları</Link>
            {" "}sayfasına, baskı çözünürlüğü için{" "}
            <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
