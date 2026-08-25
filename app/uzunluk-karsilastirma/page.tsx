import type { Metadata } from "next";
import Link from "next/link";
import LengthComparisonTool from "../components/LengthComparisonTool";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "En yakın karşılaştırma nasıl seçiliyor?",
    answer:
      "Girdiğin değere oranı 1'e (yani birebir eşit olmaya) en yakın olan referans nesne en üstte gösterilir; listedeki diğer tüm nesneler de kaç kat olduklarıyla birlikte sıralanır.",
  },
  {
    question: "Neden bazı çubuklar tamamen dolu görünüyor?",
    answer:
      "Girdiğin değer referans nesneden büyükse (örneğin 200 metre girip zürafa boyuyla karşılaştırıyorsan), çubuk görsel olarak dolu gösterilir ve yanındaki sayı gerçek kat farkını (ör. \"36 kat\") yazılı olarak belirtir.",
  },
];

export const metadata: Metadata = {
  title: "Uzunluk Karşılaştırma: Bu Kaç Metre Eder?",
  description:
    "Bir uzunluk değeri gir: zürafa boyu, otobüs uzunluğu, futbol sahası, Eyfel Kulesi ve Boğaz Köprüsü gibi tanıdık nesnelerle anında karşılaştır.",
  alternates: {
    canonical: "/uzunluk-karsilastirma",
  },
  openGraph: {
    title: "Uzunluk Karşılaştırma: Bu Kaç Metre Eder?",
    description:
      "Bir uzunluk değerini tanıdık nesnelerle (zürafa, otobüs, futbol sahası...) karşılaştırın.",
    url: buildSiteUrl("/uzunluk-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LengthComparisonPage() {
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
        name: "Uzunluk Karşılaştırma",
        item: buildSiteUrl("/uzunluk-karsilastirma"),
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
          <span>Uzunluk Karşılaştırma</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Uzunluk Karşılaştırma</h1>
          <p>
            Bir uzunluk değeri gir: zürafa boyu, şehir otobüsü, futbol
            sahası, mavi balina, Eyfel Kulesi ve Boğaz Köprüsü gibi
            tanıdık nesnelerle kaç kat olduğunu anında gör. Sayılar tek
            başına soyut kalır — bir referansla kıyaslamak değeri daha
            somut hale getirir.
          </p>
        </header>

        <LengthComparisonTool />

        <section className="category-article-content">
          <h2>Bu karşılaştırmalar nereden geliyor?</h2>
          <p>
            Kullanılan referans değerler yaygın kabul gören
            kaynaklardan derlenmiştir: yetişkin zürafa boyu için
            National Geographic/hayvanat bahçesi verileri (ortalama
            4,3-5,7 m aralığının orta noktası, 5,5 m), mavi balina
            uzunluğu için NOAA Fisheries verileri (yetişkin ortalama
            24-30 m aralığının alt-orta noktası, 25 m), futbol sahası
            için FIFA&apos;nın standart saha uzunluğu (105 m), Eyfel
            Kulesi için resmi anten dahil yükseklik (330 m) ve 15 Temmuz
            Şehitler Köprüsü için Karayolları Genel Müdürlüğü&apos;nün
            yayımladığı toplam uzunluk (1560 m) kullanılmıştır. Bunlar
            kesin bilimsel ölçümler değil, karşılaştırma amaçlı
            yuvarlatılmış ortalama değerlerdir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>En yakın karşılaştırma nasıl seçiliyor?</strong>
            <br />
            Girdiğin değere oranı 1&apos;e (yani birebir eşit olmaya) en
            yakın olan referans nesne en üstte gösterilir; listedeki
            diğer tüm nesneler de kaç kat olduklarıyla birlikte sıralanır.
          </p>
          <p>
            <strong>Neden bazı çubuklar tamamen dolu görünüyor?</strong>
            <br />
            Girdiğin değer referans nesneden büyükse (örneğin 200 metre
            girip zürafa boyuyla karşılaştırıyorsan), çubuk görsel olarak
            dolu gösterilir ve yanındaki sayı gerçek kat farkını (ör.
            &quot;36 kat&quot;) yazılı olarak belirtir.
          </p>
        </section>
      </div>
    </main>
  );
}
