import type { Metadata } from "next";
import Link from "next/link";
import SocialMediaSizeCalculator from "../components/SocialMediaSizeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Instagram gönderi boyutu kaç piksel olmalı?",
    answer:
      "Kare gönderi için 1080×1080 px, dikey gönderi için 1080×1350 px, yatay gönderi için 1080×566 px önerilir. Story ve Reels için 1080×1920 px kullanılır.",
  },
  {
    question: "YouTube thumbnail boyutu nedir?",
    answer:
      "YouTube video thumbnail'ı için önerilen boyut 1280×720 pikseldir (16:9 oran).",
  },
  {
    question: "Görselim doğru orana sahip değilse ne olur?",
    answer:
      "Platform, görseli genellikle ortalayarak otomatik kırpar veya kenarlarda boşluk bırakır. Yukarıdaki hesaplayıcıya kendi görselinin genişlik ve yüksekliğini girerek, hangi kenardan ne kadar kırpılacağını görebilirsin.",
  },
];

export const metadata: Metadata = {
  title: "Sosyal Medya Görsel Boyutları Hesaplama (Instagram, YouTube, X...)",
  description:
    "Instagram, YouTube, Facebook, X, LinkedIn ve TikTok için doğru görsel boyutunu seç; kendi görselinin bu orana uyup uymadığını ve gereken kırpmayı hesapla.",
  alternates: {
    canonical: "/sosyal-medya-gorsel-boyutlari-hesaplama",
  },
  openGraph: {
    title: "Sosyal Medya Görsel Boyutları Hesaplama (Instagram, YouTube, X...)",
    description: "Platformuna göre doğru görsel boyutunu ve kırpma ihtiyacını hesapla.",
    url: buildSiteUrl("/sosyal-medya-gorsel-boyutlari-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SocialMediaSizePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sosyal Medya Görsel Boyutları Hesaplama", item: buildSiteUrl("/sosyal-medya-gorsel-boyutlari-hesaplama") },
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
          <span>Sosyal Medya Görsel Boyutları Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sosyal Medya Görsel Boyutları Hesaplama</h1>
          <p>
            Platform ve içerik türünü seç, doğru piksel boyutunu ve
            en-boy oranını gör. Kendi görselinin ölçülerini girersen,
            hangi kenardan ne kadar kırpılması gerektiğini de
            hesaplar.
          </p>
        </header>

        <SocialMediaSizeCalculator />

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
            Piksel, cm ve DPI dönüşümleri için{" "}
            <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>
            {" "}sayfasına, renk kodu dönüşümleri için{" "}
            <Link href="/renk-kodu-cevirici">Renk Kodu Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Boyutlar, birden fazla güncel referans kaynağından çapraz
            kontrol edilmiştir; platformlar bu değerleri zaman zaman
            günceller, kritik tasarımlar için platformun kendi güncel
            yardım sayfasını kontrol etmen önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
