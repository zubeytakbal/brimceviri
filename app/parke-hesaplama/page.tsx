import type { Metadata } from "next";
import Link from "next/link";
import LaminateCalculator from "../components/LaminateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Parke hesaplamada fire payı neden gerekli?",
    answer:
      "Kesim kayıpları, köşe/kenar uyumsuzlukları ve nakliye/döşeme sırasında hasar görebilecek parçalar için genellikle %10 fire payı önerilir; düzensiz oda şekillerinde bu oranı artırmak gerekebilir.",
  },
  {
    question: "Paket içi m² değerini nereden öğrenirim?",
    answer:
      "Bu bilgi genellikle ürün ambalajının üzerinde veya satıcının ürün sayfasında yazar; standart 8mm laminat parkelerde yaygın değer paket başına yaklaşık 2-2,5 m² civarındadır.",
  },
];

export const metadata: Metadata = {
  title: "Parke Hesaplama: Kaç Paket Laminat Parke Gerekir?",
  description:
    "Kaplanacak alanı, paket içi m² değerini ve fire payını gir; döşeme için gereken parke paketi sayısını anında hesapla.",
  alternates: {
    canonical: "/parke-hesaplama",
  },
  openGraph: {
    title: "Parke Hesaplama: Kaç Paket Laminat Parke Gerekir?",
    description:
      "Alan ve paket içi m² değerinden gereken parke paketi sayısını hesaplayın.",
    url: buildSiteUrl("/parke-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LaminateCalculatorPage() {
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
        name: "Parke Hesaplama",
        item: buildSiteUrl("/parke-hesaplama"),
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
          <span>Parke Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Parke Hesaplama</h1>
          <p>
            Kaplanacak alanı, seçtiğin parkenin paket içi m² değerini ve
            fire payını gir: gereken parke paketi sayısını anında gör.
          </p>
        </header>

        <LaminateCalculator />

        <section className="category-article-content">
          <h2>Parke ihtiyacı nasıl hesaplanır?</h2>
          <p>
            Önce fire payı eklenmiş toplam alan bulunur:{" "}
            <strong>Fire Dahil Alan = Alan × (1 + Fire Payı / 100)</strong>.
            Ardından bu alan, paket içi m² değerine bölünüp yukarı
            yuvarlanarak gereken paket sayısı elde edilir.
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
