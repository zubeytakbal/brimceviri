import type { Metadata } from "next";
import Link from "next/link";
import SuperheatSubcoolingCalculator from "../components/SuperheatSubcoolingCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Superheat (aşırı kızdırma) nasıl hesaplanır?",
    answer:
      "Superheat = Buharlaştırıcı Çıkış Sıcaklığı (ölçülen) - Doyma Sıcaklığı (buharlaşma basıncına karşılık gelen). Doyma sıcaklığı, kullanılan soğutucu gaza özel bir basınç-sıcaklık (P-T) kartından veya uygulamasından okunur.",
  },
  {
    question: "Subcooling (alt soğutma) nasıl hesaplanır?",
    answer:
      "Subcooling = Doyma Sıcaklığı (kondenser basıncına karşılık gelen) - Sıvı Hattı Sıcaklığı (ölçülen).",
  },
  {
    question: "Bu araç soğutucu gaz için P-T dönüşümü yapıyor mu?",
    answer:
      "Hayır. Her soğutucu gazın (R410A, R32, R22, R134a vb.) kendine özgü basınç-sıcaklık ilişkisi vardır. Bu araç yalnızca senin okuduğun doyma sıcaklığı ile ölçtüğün sıcaklık arasındaki farkı hesaplar; P-T dönüşümünü kendi P-T kartından veya uygulamandan yapmalısın.",
  },
];

export const metadata: Metadata = {
  title: "Superheat ve Subcooling Hesaplama",
  description:
    "Ölçülen sıcaklık ve doyma sıcaklığından superheat (aşırı kızdırma) ve subcooling (alt soğutma) değerlerini hesapla.",
  alternates: {
    canonical: "/superheat-subcooling-hesaplama",
  },
  openGraph: {
    title: "Superheat ve Subcooling Hesaplama",
    description: "Superheat ve subcooling değerlerini hesapla.",
    url: buildSiteUrl("/superheat-subcooling-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SuperheatSubcoolingCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Klima ve Soğutma Teknisyeni Araçları", item: buildSiteUrl("/klima-sogutma-teknisyeni-araclari") },
      { "@type": "ListItem", position: 4, name: "Superheat ve Subcooling Hesaplama", item: buildSiteUrl("/superheat-subcooling-hesaplama") },
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
          <Link href="/klima-sogutma-teknisyeni-araclari">Klima ve Soğutma Teknisyeni Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Superheat ve Subcooling Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Superheat ve Subcooling Hesaplama</h1>
          <p>
            Doyma sıcaklığını kendi P-T kartından oku, ölçtüğün
            sıcaklıkla birlikte gir: superheat ve subcooling
            değerlerini hesapla.
          </p>
        </header>

        <SuperheatSubcoolingCalculator />

        <section className="category-article-content">
          <h2>Tipik superheat ve subcooling aralıkları</h2>
          <p>
            Sabit orifis (kılcal boru) sistemlerde superheat genelde
            4-12°C arasında olur. TXV (termostatik genleşme valfi)
            sistemlerde superheat tipik olarak 5-7°C civarında
            tutulur. Subcooling ise sistem tasarımına göre değişir,
            genelde 5-15°C aralığındadır. Bu değerler genel
            referanslardır — cihaz üreticisinin servis kılavuzu esas
            alınmalıdır.
          </p>

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
            Diğer klima ve soğutma teknisyeni araçları için{" "}
            <Link href="/klima-sogutma-teknisyeni-araclari">Klima ve Soğutma Teknisyeni Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüller, soğutma sektöründe standart kabul edilen
            superheat/subcooling tanımlarına dayanır. Bu araç servis
            kılavuzu veya cihaz üreticisi talimatlarının yerine
            geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
