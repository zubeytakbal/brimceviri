import type { Metadata } from "next";
import Link from "next/link";
import VideoBitrateCalculator from "../components/VideoBitrateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Video dosya boyutu bit hızından nasıl hesaplanır?",
    answer:
      "Dosya Boyutu (MB) = Bit Hızı (Mbps) × Süre (saniye) / 8. Örneğin 8 Mbps bit hızıyla kodlanmış 10 dakikalık (600 saniye) bir video: 8 × 600 / 8 = 600 MB.",
  },
  {
    question: "Hedef dosya boyutu için hangi bit hızını seçmeliyim?",
    answer:
      "Bit Hızı (Mbps) = Dosya Boyutu (MB) × 8 / Süre (saniye) formülüyle, belirli bir dosya boyutuna sığmak için gereken bit hızını hesaplayabilirsin.",
  },
];

export const metadata: Metadata = {
  title: "Video Bit Hızı ve Dosya Boyutu Hesaplama",
  description:
    "Bit hızı (Mbps) ve süreden video dosya boyutunu (MB), ya da hedef dosya boyutundan gereken bit hızını hesapla.",
  alternates: {
    canonical: "/video-bit-hizi-hesaplama",
  },
  openGraph: {
    title: "Video Bit Hızı ve Dosya Boyutu Hesaplama",
    description: "Bit hızı ve dosya boyutu arasında hesaplama yap.",
    url: buildSiteUrl("/video-bit-hizi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VideoBitrateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Video Editör Araçları", item: buildSiteUrl("/video-editor-araclari") },
      { "@type": "ListItem", position: 4, name: "Video Bit Hızı ve Dosya Boyutu Hesaplama", item: buildSiteUrl("/video-bit-hizi-hesaplama") },
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
          <Link href="/video-editor-araclari">Video Editör Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Video Bit Hızı ve Dosya Boyutu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Video Bit Hızı ve Dosya Boyutu Hesaplama</h1>
          <p>
            Bit hızından (Mbps) dosya boyutunu (MB), ya da hedef dosya
            boyutundan gereken bit hızını hesapla.
          </p>
        </header>

        <VideoBitrateCalculator />

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
            Diğer video editör araçları için{" "}
            <Link href="/video-editor-araclari">Video Editör Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
