import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import FormworkCalculator from "../components/FormworkCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kalıp alanı nasıl hesaplanır?",
    answer: "Kalıpla temas edecek yüzeylerin alanları toplanır. Döşemede alt yüzey; kirişte alt ve iki yan yüz; kolon ile tekil temelde dört yan yüz alınır.",
  },
  {
    question: "Kiriş kalıp hesabında üst yüzey neden yok?",
    answer: "Betonarme kirişler çoğunlukla döşemeyle birlikte döküldüğü için üst yüzey döşeme kalıbına dahildir. Ayrı dökülen elemanlarda uygulama projesindeki kalıp yüzeyleri ayrıca değerlendirilmelidir.",
  },
  {
    question: "Bu hesap kalıp iskelesinin güvenliğini gösterir mi?",
    answer: "Hayır. Sonuç yalnızca yaklaşık temas alanını verir; kalıp ve iskele boyutlandırması, taşıma gücü veya iş güvenliği değerlendirmesi değildir.",
  },
];

export const metadata: Metadata = {
  title: "Kalıp Alanı Hesaplama: Döşeme, Kolon ve Kiriş",
  description: "Döşeme, kolon, kiriş veya tekil temel ölçülerinden beton kalıp temas alanını m² olarak hesapla.",
  alternates: { canonical: "/kalip-alani-hesaplama" },
  openGraph: {
    title: "Kalıp Alanı Hesaplama",
    description: "Betonarme elemanların kalıp temas alanını ölçülerinden hesaplayın.",
    url: buildSiteUrl("/kalip-alani-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FormworkCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kalıp Alanı Hesaplama", item: buildSiteUrl("/kalip-alani-hesaplama") },
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
          <span>Kalıp Alanı Hesaplama</span>
        </nav>
        <header className="all-conversions-header">
          <h1>Kalıp Alanı Hesaplama</h1>
          <p>Döşeme, kolon, kiriş veya tekil temel ölçülerini girerek kalıp yapılacak yüzeyin yaklaşık alanını m² olarak hesapla.</p>
        </header>
        <FormworkCalculator />
        <section className="category-article-content">
          <h2>Hesaplama yöntemi</h2>
          <p>
            Döşeme için uzunluk × genişlik; kolon ve tekil temel için 2 × (uzun kenar + kısa kenar) × yükseklik; kiriş için (genişlik + 2 × yükseklik) × uzunluk kullanılır. Birden fazla aynı eleman varsa sonuç adetle çarpılır.
          </p>
          <h2>İlgili şantiye araçları</h2>
          <p>
            <Link href="/beton-hesaplama">Beton Hesaplama</Link>{" "}·{" "}
            <Link href="/demir-agirlik-hesaplama">İnşaat Demiri Ağırlığı</Link>{" "}·{" "}
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
            Bu araç ön metraj içindir. Kalıp ve iskele tasarımı ile betonarme uygulama kararlarında onaylı projeyi ve yetkin mühendis değerlendirmesini esas alın.
          </p>
        </section>
      </div>
    </main>
  );
}
