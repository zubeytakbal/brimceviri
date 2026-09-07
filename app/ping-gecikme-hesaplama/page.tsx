import type { Metadata } from "next";
import Link from "next/link";
import TheoreticalLatencyCalculator from "../components/TheoreticalLatencyCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Teorik minimum ping nedir?",
    answer:
      "Işığın fiber optik kablo içindeki hızına (~200.000 km/s) dayanan, iki nokta arasında fiziksel olarak mümkün olan en düşük gecikme süresidir. Hiçbir internet bağlantısı, mesafe sabit kaldığı sürece bu değerin altına inemez.",
  },
  {
    question: "Gerçek ping neden teorik değerden yüksek çıkıyor?",
    answer:
      "Gerçek veri, iki nokta arasında düz bir hat izlemez; kablo güzergahı genelde büyük daire mesafesinden daha uzundur ve veri yolda birden fazla yönlendirici, anahtar ve ağ geçidinden geçer. Bu ekipmanların her biri küçük gecikmeler ekler, bu yüzden gerçek ping teorik alt sınırın genelde 1,5-3 katı arasında çıkar.",
  },
  {
    question: "Oyun sunucusu seçerken bu hesaplama nasıl kullanılır?",
    answer:
      "Bulunduğun konum ile sunucunun konumu arasındaki teorik minimum pingi görerek, hangi sunucu bölgesinin senin için fiziksel olarak daha avantajlı olduğunu karşılaştırabilirsin. Gerçek ping, sunucunun kendi altyapısına ve ağ yoluna göre değişse de, mesafe her zaman bir alt sınır belirler.",
  },
];

export const metadata: Metadata = {
  title: "Ping / Gecikme Hesaplama (Mesafeye Göre Teorik Minimum)",
  description:
    "İki şehir/sunucu konumu arasındaki mesafeye göre fiziksel olarak mümkün olan en düşük ping (gecikme) süresini ve gerçekçi tahmini hesapla.",
  alternates: {
    canonical: "/ping-gecikme-hesaplama",
  },
  openGraph: {
    title: "Ping / Gecikme Hesaplama (Mesafeye Göre Teorik Minimum)",
    description: "İki konum arasındaki mesafeye göre teorik minimum ping süresini hesapla.",
    url: buildSiteUrl("/ping-gecikme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TheoreticalLatencyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Ping / Gecikme Hesaplama", item: buildSiteUrl("/ping-gecikme-hesaplama") },
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
          <span>Ping / Gecikme Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ping / Gecikme Hesaplama</h1>
          <p>
            Konumunu ve oyun sunucusunun/hedef sunucunun yerini seç;
            aralarındaki mesafeye göre fiziksel olarak mümkün olan en
            düşük ping (gecikme) süresini ve gerçekçi bir tahmin
            aralığını hesapla.
          </p>
        </header>

        <TheoreticalLatencyCalculator />

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
            İki nokta arası büyük daire mesafesi ve rota hesaplamaları
            için{" "}
            <Link href="/buyuk-daire-mesafesi-hesaplama">
              Büyük Daire Mesafesi Hesaplama
            </Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Fiber optik kablolarda ışık hızı, camın kırılma indisine
            (~1,5) dayanır ve boşluktaki ışık hızının (299.792 km/s)
            yaklaşık üçte ikisi kadardır — bu, ağ mühendisliğinde
            yaygın kabul gören bir fiziksel sabittir. Gerçek dünya
            gecikme aralığı, benzer mesafelerdeki genel gözlemlere
            dayanan kaba bir tahmindir.
          </p>
        </section>
      </div>
    </main>
  );
}
