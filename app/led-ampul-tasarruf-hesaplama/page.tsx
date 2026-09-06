import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import LedSavingsCalculator from "../components/LedSavingsCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "LED ampul kaç yılda kendini çıkarır?",
    answer:
      "LED ampuller genellikle çok kısa sürede (birkaç ay içinde) kendini çıkarır, çünkü hem ampul maliyeti düşüktür hem de enerji tasarrufu yüksektir. Kendi ampul sayın, kullanım süren ve elektrik fiyatınla kesin süreyi yukarıdaki hesaplayıcıdan görebilirsin.",
  },
  {
    question: "60W akkor ampul yerine kaç W LED almalıyım?",
    answer:
      "60W akkor ampul yaklaşık 800 lümen ışık verir; aynı parlaklığı yaklaşık 8-9W LED ampul sağlar. Kesin değer üreticiye göre değişir, ambalajdaki lümen değerine bakmak en doğrusudur.",
  },
  {
    question: "LED ampuller neden bu kadar az watt tüketiyor?",
    answer:
      "LED'ler ışığı akkor/halojen ampullere göre çok daha verimli üretir; harcadıkları enerjinin çoğu ısı yerine ışığa dönüşür. Bu yüzden aynı lümen (parlaklık) için çok daha az watt yeterli olur.",
  },
];

export const metadata: Metadata = {
  title: "LED Ampul Tasarruf Hesaplama (Kaç Yılda Kendini Çıkarır?)",
  description:
    "Ampul sayın, kullanım sürene ve elektrik fiyatına göre LED ampule geçişin yıllık tasarrufunu ve amortisman süresini hesapla.",
  alternates: {
    canonical: "/led-ampul-tasarruf-hesaplama",
  },
  openGraph: {
    title: "LED Ampul Tasarruf Hesaplama (Kaç Yılda Kendini Çıkarır?)",
    description: "Kendi rakamlarınla LED ampule geçişin tasarrufunu hesapla.",
    url: buildSiteUrl("/led-ampul-tasarruf-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LedSavingsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "LED Ampul Tasarruf Hesaplama", item: buildSiteUrl("/led-ampul-tasarruf-hesaplama") },
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
          <span>LED Ampul Tasarruf Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>LED Ampul Tasarruf Hesaplama</h1>
            <p>
              Ampul sayın, günlük kullanım süren ve elektrik fiyatınla,
              LED ampule geçişin yıllık tasarrufunu ve kaç günde/yılda
              kendini çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/led-ampul-tasarruf-hesaplama"
            title="LED Ampul Tasarruf Hesaplama"
            height={760}
            maxWidth={560}
          />
        </div>

        <LedSavingsCalculator />

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
            Elektrikli araç maliyeti için{" "}
            <Link href="/elektrikli-arac-maliyet-karsilastirma">
              Elektrikli Araç mı Benzinli Araç mı?
            </Link>{" "}
            sayfasına, yalıtım amortismanı için{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Akkor-LED güç eşdeğerlikleri, aydınlatma sektöründe yaygın
            kabul gören lümen bazlı karşılaştırma tablolarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
