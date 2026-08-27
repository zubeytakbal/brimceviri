import type { Metadata } from "next";
import Link from "next/link";
import WallpaperCalculator from "../components/WallpaperCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Duvar kağıdında fire payı neden diğer araçlardan yüksek?",
    answer:
      "Desenli duvar kağıtlarında rulolar arasında motifin eşleşmesi gerekir; bu eşleştirme kaybı yüzünden fire payı genellikle %10-15 civarında tutulur, düz/desensiz kağıtlarda %10 yeterli olabilir.",
  },
  {
    question: "Standart rulo ölçüleri nedir?",
    answer:
      "Avrupa standardı rulolar genellikle 53 cm eninde ve 10,05 m uzunluğundadır; bazı geniş rulolar 106 cm ene sahiptir. Ürün ambalajındaki ölçüyü kullanmak en doğrusudur.",
  },
];

export const metadata: Metadata = {
  title: "Duvar Kağıdı Hesaplama: Kaç Rulo Gerekir?",
  description:
    "Oda duvar ölçülerini ve rulo boyutlarını gir; döşeme için gereken duvar kağıdı rulosu sayısını anında hesapla.",
  alternates: {
    canonical: "/duvar-kagidi-hesaplama",
  },
  openGraph: {
    title: "Duvar Kağıdı Hesaplama: Kaç Rulo Gerekir?",
    description:
      "Oda ölçülerinden gereken duvar kağıdı rulosu sayısını hesaplayın.",
    url: buildSiteUrl("/duvar-kagidi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WallpaperCalculatorPage() {
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
        name: "Duvar Kağıdı Hesaplama",
        item: buildSiteUrl("/duvar-kagidi-hesaplama"),
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
          <span>Duvar Kağıdı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Duvar Kağıdı Hesaplama</h1>
          <p>
            Odanın dört duvarının genişliğini, tavan yüksekliğini ve rulo
            ölçülerini gir: gereken duvar kağıdı rulosu sayısını anında gör.
          </p>
        </header>

        <WallpaperCalculator />

        <section className="category-article-content">
          <h2>Duvar kağıdı ihtiyacı nasıl hesaplanır?</h2>
          <p>
            Önce dört duvarın genişlikleri toplanıp tavan yüksekliğiyle
            çarpılarak toplam duvar alanı bulunur. Rulo eni ve uzunluğundan
            bir rulonun kapladığı alan hesaplanır. Toplam alana fire payı
            eklenip rulo alanına bölünerek gereken rulo sayısı elde edilir.
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
