import type { Metadata } from "next";
import Link from "next/link";
import SeedRateCalculator from "../components/SeedRateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bin dane ağırlığı (TDW) nedir?",
    answer:
      "Bin dane ağırlığı, 1000 adet tohum tanesinin gram cinsinden ağırlığıdır; genelde tohum etiketinde veya sertifikasında belirtilir. Tane iriliği arttıkça bin dane ağırlığı da artar.",
  },
  {
    question: "Tohum miktarı (tohumluk) nasıl hesaplanır?",
    answer:
      "Dekara Gerekli Tohumluk (kg/da) = (Hedef Bitki Sayısı/m² × Bin Dane Ağırlığı (g)) ÷ (Çimlenme Oranı % × Saflık Oranı % × 1000). Çimlenme ve saflık oranı düştükçe, aynı bitki sayısını yakalamak için daha fazla tohum ekmen gerekir.",
  },
  {
    question: "Hedef bitki sayısı ve bin dane ağırlığı nereden bulunur?",
    answer:
      "Hedef bitki sayısı (sıklık) ürün çeşidine, ekim zamanına ve bölgeye göre değişir; bin dane ağırlığı ise kullandığın tohum partisine özgüdür ve etiketinde yazar. Bu değerleri bir ziraat mühendisinden veya tohum etiketinden almalısın.",
  },
];

export const metadata: Metadata = {
  title: "Tohum Miktarı Hesaplama (Tohumluk, kg/dekar)",
  description:
    "Hedef bitki sayısı, bin dane ağırlığı, çimlenme ve saflık oranından, dekara ve toplam alana gereken tohumluk miktarını (kg) hesapla.",
  alternates: {
    canonical: "/tohum-miktari-hesaplama",
  },
  openGraph: {
    title: "Tohum Miktarı Hesaplama (Tohumluk, kg/dekar)",
    description: "Bin dane ağırlığından tohumluk miktarını hesapla.",
    url: buildSiteUrl("/tohum-miktari-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SeedRateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Çiftçi Araçları", item: buildSiteUrl("/ciftci-araclari") },
      { "@type": "ListItem", position: 4, name: "Tohum Miktarı Hesaplama", item: buildSiteUrl("/tohum-miktari-hesaplama") },
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
          <Link href="/ciftci-araclari">Çiftçi Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tohum Miktarı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tohum Miktarı Hesaplama</h1>
          <p>
            Hedef bitki sayısını, bin dane ağırlığını, çimlenme ve
            saflık oranını gir: dekara ve toplam alana gereken
            tohumluk miktarını (kg) hesapla.
          </p>
        </header>

        <SeedRateCalculator />

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
            Diğer çiftçi araçları için{" "}
            <Link href="/ciftci-araclari">Çiftçi Araçları</Link>
            {" "}sayfasına, gübre ihtiyacı hesaplama için{" "}
            <Link href="/gubre-ihtiyaci-hesaplama">Gübre İhtiyacı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, tarımda standart kabul edilen bin dane ağırlığı
            (TDW) tabanlı tohumluk hesabına dayanır. Bu araç
            tarımsal danışmanlık yerine geçmez; hedef bitki sayısını
            veya çeşit seçimini belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
