import type { Metadata } from "next";
import Link from "next/link";
import GcsCalculator from "../components/GcsCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Glasgow Koma Skalası (GKS) puanları ne anlama gelir?",
    answer:
      "GKS 3 ile 15 arasında değişir: 14-15 hafif, 9-13 orta, 3-8 şiddetli bilinç bozukluğunu gösterir. Minimum skor 3 (derin koma), maksimum skor 15'tir (tam uyanık ve oryante).",
  },
  {
    question: "Hasta entübeyse sözel yanıt nasıl puanlanır?",
    answer:
      "Hasta entübe veya trakeostomili ise sözel yanıt değerlendirilemez ve genellikle skora 'T' notu düşülerek belirtilir; toplam puan hesaplanırken bu durum ayrıca not edilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Glasgow Koma Skalası (GKS) Hesaplama",
  description:
    "Göz açma, sözel yanıt ve motor yanıtı seç: Glasgow Koma Skalası (GKS) toplam puanını ve bilinç düzeyi kategorisini hesapla.",
  alternates: { canonical: "/glasgow-koma-skalasi-hesaplama" },
  openGraph: {
    title: "Glasgow Koma Skalası (GKS) Hesaplama",
    description: "GKS toplam puanını ve bilinç düzeyi kategorisini hesaplayın.",
    url: buildSiteUrl("/glasgow-koma-skalasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GcsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Glasgow Koma Skalası Hesaplama", item: buildSiteUrl("/glasgow-koma-skalasi-hesaplama") },
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
          <span>Glasgow Koma Skalası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Glasgow Koma Skalası (GKS) Hesaplama</h1>
          <p>
            Göz açma, sözel yanıt ve motor yanıtı seç: GKS toplam
            puanını ve bilinç düzeyi kategorisini anında hesapla.
          </p>
        </header>

        <GcsCalculator />

        <section className="category-article-content">
          <h2>GKS nedir?</h2>
          <p>
            Glasgow Koma Skalası, 1974&apos;te Graham Teasdale ve
            Bryan Jennett tarafından geliştirilen, beyin travması
            geçiren veya bilinç bozukluğu yaşayan hastaların bilinç
            düzeyini objektif olarak ölçmek için kullanılan
            uluslararası kabul görmüş bir klinik değerlendirme
            ölçeğidir. Göz açma (1-4), sözel yanıt (1-5) ve motor
            yanıt (1-6) puanlarının toplamından oluşur.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Glasgow Koma Skalası (GKS) puanları ne anlama gelir?</strong>
            <br />
            GKS 3 ile 15 arasında değişir: 14-15 hafif, 9-13 orta, 3-8
            şiddetli bilinç bozukluğunu gösterir.
          </p>
          <p>
            <strong>Hasta entübeyse sözel yanıt nasıl puanlanır?</strong>
            <br />
            Hasta entübe veya trakeostomili ise sözel yanıt
            değerlendirilemez ve genellikle skora &quot;T&quot; notu
            düşülerek belirtilir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skala, Teasdale G, Jennett B (1974), &quot;Assessment of
            coma and impaired consciousness&quot;, The Lancet
            yayınına dayanmaktadır. Bu araç tıbbi tavsiye yerine
            geçmez; klinik değerlendirme için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
