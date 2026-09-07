import type { Metadata } from "next";
import Link from "next/link";
import FertilizerDilutionCalculator from "../components/FertilizerDilutionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Gübre etiketindeki '1:200' oranı ne anlama gelir?",
    answer:
      "1:200, 1 birim gübreye karşılık 200 birim su eklenmesi gerektiği anlamına gelir. Örneğin 3 litre (3000 ml) su hazırlayacaksan, 3000/200 = 15 ml gübre eklemen gerekir.",
  },
  {
    question: "Etikette 'ml/litre' yazıyorsa nasıl hesaplarım?",
    answer:
      "Bu format doğrudan doz belirtir: örneğin '5 ml/litre' demek, hazırladığın her 1 litre su için 5 ml gübre eklemen gerektiği anlamına gelir. Toplam su miktarını litre cinsinden dozla çarparak toplam gübre miktarını bulabilirsin.",
  },
  {
    question: "Önerilen orandan fazla gübre eklersem ne olur?",
    answer:
      "Aşırı dozda gübre, bitkinin köklerinde 'kök yanması' denilen hasara yol açabilir ve bitkiye zarar verebilir. Önerilen orana sadık kalmak, gerekirse hafif seyreltik uygulamak daha güvenlidir.",
  },
];

export const metadata: Metadata = {
  title: "Gübre Seyreltme Hesaplama (Bitki/Bahçe İçin)",
  description:
    "Sıvı gübre etiketindeki oranı (1:200) veya dozu (ml/litre) gir, hazırlamak istediğin su miktarına göre eklemen gereken gübre miktarını hesapla.",
  alternates: {
    canonical: "/gubre-seyreltme-hesaplama",
  },
  openGraph: {
    title: "Gübre Seyreltme Hesaplama (Bitki/Bahçe İçin)",
    description: "Etiketteki oran veya dozla, hazırlaman gereken gübre miktarını hesapla.",
    url: buildSiteUrl("/gubre-seyreltme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FertilizerDilutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Gübre Seyreltme Hesaplama", item: buildSiteUrl("/gubre-seyreltme-hesaplama") },
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
          <span>Gübre Seyreltme Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Gübre Seyreltme Hesaplama</h1>
          <p>
            Sıvı gübre etiketindeki oranı (örn. 1:200) veya dozu (örn.
            5 ml/litre) gir, hazırlamak istediğin su miktarına göre
            eklemen gereken gübre miktarını hesapla.
          </p>
        </header>

        <FertilizerDilutionCalculator />

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
            Tarımsal ölçekte gübre hesaplaması için{" "}
            <Link href="/gubre-ihtiyaci-hesaplama">Gübre İhtiyacı Hesaplama</Link>
            {" "}sayfasına, sulama hesaplamaları için{" "}
            <Link href="/sulama-suresi-hesaplama">Sulama Süresi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hesaplama, gübre üreticilerinin ürün etiketlerinde
            standart olarak kullandığı oran/doz gösterim biçimlerine
            dayanır. Her ürünün önerilen oranı farklı olabileceği için
            kendi ürününün etiketindeki değeri kullanman önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
