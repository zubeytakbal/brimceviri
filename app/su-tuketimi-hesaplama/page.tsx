import { buildFullLanguageAlternates } from "@/app/i18n/routing";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import WaterConsumptionCalculator from "../components/WaterConsumptionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Su tüketimi m³ ile nasıl hesaplanır?",
    answer:
      "Su faturaları genelde m³ cinsinden tüketimi gösterir. Hesaplama çok basittir: Toplam tutar = Tüketim (m³) × Birim Fiyat + varsa sabit ücret. Sonuç, litre karşılığıyla birlikte görünür.",
  },
  {
    question: "Tüketim değeri faturamda neden farklı olabilir?",
    answer:
      "Şebeke sistemindeki sayaç okuma, tarife ve yaz aylarında kullanılan su miktarı değişebilir. Bu araç, verdiğin değer üzerinden gerçek oranla ödeme tahmini yapar; fatura üzerindeki ek kalemler ayrı olabilir.",
  },
];

export const metadata: Metadata = {
  title: "Su Tüketimi Hesaplama: m³'den Fatura Tutarı",
  description:
    "Su tüketimini (m³) ve birim fiyatı gir; toplam su faturası ve litre karşılığını anında hesapla.",
  alternates: {
    canonical: "/su-tuketimi-hesaplama",
    ...buildFullLanguageAlternates("/su-tuketimi-hesaplama"),
  },
  openGraph: {
    title: "Su Tüketimi Hesaplama: m³'den Fatura Tutarı",
    description: "Su tüketiminizden aylık toplam tutarı ve litre karşılığını hızlıca hesaplayın.",
    url: buildSiteUrl("/su-tuketimi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WaterConsumptionPage() {
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
        name: "Su Tüketimi Hesaplama",
        item: buildSiteUrl("/su-tuketimi-hesaplama"),
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
          <span>Su Tüketimi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Su Tüketimi Hesaplama</h1>
          <p>
            Tüketimi (m³), birim fiyatı ve isteğe bağlı sabit ücreti gir:
            toplam su faturasını ve litre karşılığını anında gör.
          </p>
        </header>

        <WaterConsumptionCalculator />

        <section className="category-article-content">
          <h2>Su faturası nasıl hesaplanır?</h2>
          <p>
            Hesaplama basittir: <strong>Toplam Tutar = Tüketim (m³) × Birim Fiyat + Sabit Ücret</strong>.
            Sonuç, tüketilen litre miktarını da gösterir; bu rakam, su kullanımının hacmini daha anlaşılır hale getirir.
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
            Evdeki elektrik gideri için <Link href="/elektrik-tuketimi-hesaplama">Elektrik Tüketimi Hesaplama</Link>,
            doğalgaz için <Link href="/dogalgaz-tuketimi-hesaplama">Doğalgaz Tüketimi Hesaplama</Link> ve
            benzinli araç maliyetlerini görmek için <Link href="/otomotiv-araclari">Otomotiv Araçları</Link> sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
