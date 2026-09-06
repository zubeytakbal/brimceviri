import type { Metadata } from "next";
import Link from "next/link";
import AlcoholDilutionCalculator from "../components/AlcoholDilutionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Alkol seyreltme nasıl hesaplanır?",
    answer:
      "Aynı C₁V₁ = C₂V₂ bağıntısı, mol/L yerine yüzde (%) derişimle kullanılır: Stok Derişim (%) × Stok Hacim (mL) = Hedef Derişim (%) × Hedef Hacim (mL). Formül, yüzde derişimlerin ikisi de aynı tanıma (örneğin hacimce %, v/v) dayandığı sürece geçerlidir.",
  },
  {
    question: "%96 alkolden %70 alkol nasıl hazırlanır?",
    answer:
      "Örnek: 1000 mL %70 alkol hazırlamak için, %96'lık stoktan V₁ = (70 × 1000) / 96 ≈ 729 mL alınır ve üzerine su eklenerek 1000 mL'ye tamamlanır.",
  },
  {
    question: "%70 alkol neden yaygın bir dezenfeksiyon standardı?",
    answer:
      "DSÖ (WHO) ve CDC gibi kuruluşlar, etanol bazlı dezenfektanlar için %60-90 aralığını, en sık da %70'i referans gösterir; bu kamuya açık, genel bir halk sağlığı standardıdır. Bu araç bu bilgiyi hesaplamana yardımcı olmak için kullanır, senin özel durumun için hangi derişimin uygun olduğuna karar vermez.",
  },
];

export const metadata: Metadata = {
  title: "Alkol Seyreltme Hesaplama (% Derişim)",
  description:
    "Stok alkol derişimi ve hacminden, hedef derişim veya hacimden eksik değeri C₁V₁ = C₂V₂ bağıntısıyla yüzde (%) derişim cinsinden hesapla.",
  alternates: {
    canonical: "/alkol-seyreltme-hesaplama",
  },
  openGraph: {
    title: "Alkol Seyreltme Hesaplama (% Derişim)",
    description: "Yüzde derişimle alkol seyreltme hesabı yap.",
    url: buildSiteUrl("/alkol-seyreltme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AlcoholDilutionCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Eczacı Araçları", item: buildSiteUrl("/eczaci-araclari") },
      { "@type": "ListItem", position: 4, name: "Alkol Seyreltme Hesaplama", item: buildSiteUrl("/alkol-seyreltme-hesaplama") },
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
          <Link href="/eczaci-araclari">Eczacı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Alkol Seyreltme Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Alkol Seyreltme Hesaplama</h1>
          <p>
            Stok alkol derişimi ve hacminden, ya da hedef derişim ve
            hacimden eksik değeri C₁V₁ = C₂V₂ bağıntısıyla, yüzde (%)
            derişim cinsinden hesapla.
          </p>
        </header>

        <AlcoholDilutionCalculator />

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
            Diğer eczacı araçları için{" "}
            <Link href="/eczaci-araclari">Eczacı Araçları</Link>
            {" "}sayfasına, mol/L cinsinden derişim hesapları için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/seyreltme-hesaplama">Seyreltme Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, derişim korunumu ilkesine (C₁V₁ = C₂V₂) dayanır.
            %70 gibi referans değerler DSÖ/CDC gibi kuruluşların kamuya
            açık genel dezenfeksiyon rehberlerinden alınmıştır; bu araç
            tıbbi/eczacılık tavsiyesi yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
