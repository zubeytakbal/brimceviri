import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MembraneRollCalculator from "../components/MembraneRollCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Membran rulo hesabı nasıl yapılır?",
    answer: "Yalıtılacak net alan, bindirmeler nedeniyle rulo başına düşen yaklaşık kaplama alanına bölünür; kesim ve detaylar için seçilen fire oranı eklenir ve rulo adedi yukarı yuvarlanır.",
  },
  {
    question: "Bindirme ölçüsü kaç cm olmalı?",
    answer: "Bindirme, membran türüne ve üreticinin uygulama talimatına göre değişir. Ürünün teknik föyünde verilen yan ve rulo ucu bindirmelerini girin.",
  },
  {
    question: "Hesapta parapet ve süzgeç detayları dahil mi?",
    answer: "Hayır. Araç düz alan için yaklaşık metraj verir. Parapet dönüşü, süzgeç, köşe, baca ve diğer detaylar için ek malzeme gerekebilir.",
  },
];

export const metadata: Metadata = {
  title: "Membran Rulo Hesaplama: Su Yalıtımı Metrajı",
  description: "Yalıtılacak alan, membran rulo ölçüleri, bindirme ve fire payıyla yaklaşık rulo ihtiyacını hesapla.",
  alternates: { canonical: "/membran-rulo-hesaplama" },
  openGraph: {
    title: "Membran Rulo Hesaplama",
    description: "Su yalıtımı membranı için yaklaşık rulo ihtiyacını bulun.",
    url: buildSiteUrl("/membran-rulo-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MembraneRollCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Membran Rulo Hesaplama", item: buildSiteUrl("/membran-rulo-hesaplama") },
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
          <span>Membran Rulo Hesaplama</span>
        </nav>
        <header className="all-conversions-header">
          <h1>Membran Rulo Hesaplama</h1>
          <p>Su yalıtımı yapılacak alanı, rulo ölçülerini, bindirme ve fire payını girerek yaklaşık membran ihtiyacını hesapla.</p>
        </header>
        <MembraneRollCalculator />
        <section className="category-article-content">
          <h2>Membran metrajı nasıl hesaplanır?</h2>
          <p>
            Yaklaşık rulo kaplama alanı, rulo eninden yan bindirmenin ve rulo boyundan uç bindirmesinin çıkarılmasıyla bulunur. Net uygulama alanına fire oranı eklenir; fire dahil alan rulo başına kaplama alanına bölünüp yukarı yuvarlanır.
          </p>
          <h2>İlgili inşaat araçları</h2>
          <p>
            <Link href="/sap-hacmi-hesaplama">Şap Hacmi Hesaplama</Link>{" "}·{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortismanı</Link>{" "}·{" "}
            <Link href="/hafriyat-hesaplama">Hafriyat ve Kazı</Link>
          </p>
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
          <p>
            Bu araç ön metraj amaçlı yaklaşık sonuç verir. Bindirme ölçülerini ve uygulama katmanlarını üretici talimatı ve proje detaylarına göre belirleyin.
          </p>
        </section>
      </div>
    </main>
  );
}
