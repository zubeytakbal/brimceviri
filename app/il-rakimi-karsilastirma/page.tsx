import type { Metadata } from "next";
import Link from "next/link";
import ProvinceComparisonTool from "../components/ProvinceComparisonTool";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { popularProvinceComparisons } from "../converter/popularProvinceComparisons";
import { findProvinceById } from "../converter/provinceElevationHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Rakım farkının sağlığa etkisi ne zaman belirginleşir?",
    answer:
      "Tıbbi kaynaklara göre 1.500 metre üzeri 'yüksek rakım' sayılır, 2.500 metre ve üzerinde vücuda etkisi (nefes darlığı, çarpıntı gibi) belirgin şekilde artar. Bu sayfa, iki ilin rakım farkına göre bu eşiği geçip geçmediğini gösterir.",
  },
  {
    question: "Bu karşılaştırma tıbbi tavsiye midir?",
    answer:
      "Hayır, bu sayfa yalnızca genel fiziksel/istatistiksel bir bilgi sunar; kişisel sağlık durumuna göre tavsiye için bir hekime danışmalısın.",
  },
];

export const metadata: Metadata = {
  title: "İl Rakımı Karşılaştırma: İki Şehri Basınç ve Sağlık Açısından Kıyasla",
  description:
    "İki ilin rakımını, hava basıncını ve suyun kaynama noktasını karşılaştır; rakım farkının sağlığa etkisinin belirgin olup olmadığını gör.",
  alternates: {
    canonical: "/il-rakimi-karsilastirma",
  },
  openGraph: {
    title: "İl Rakımı Karşılaştırma",
    description: "İki ilin rakımını ve irtifa etkisini karşılaştır.",
    url: buildSiteUrl("/il-rakimi-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ProvinceComparisonHubPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "İl Rakımı Karşılaştırma", item: buildSiteUrl("/il-rakimi-karsilastirma") },
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
          <span>İl Rakımı Karşılaştırma</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İl Rakımı Karşılaştırma</h1>
          <p>
            İki ili seç: rakım farkını, hava basıncı farkını ve suyun
            kaynama noktası farkını anında gör; rakım farkının sağlığa
            etkisinin belirgin olup olmadığını öğren.
          </p>
        </header>

        <ProvinceComparisonTool />

        <section className="category-article-content">
          <h2>Popüler Karşılaştırmalar</h2>
          <ul className="related-conversion-list">
            {popularProvinceComparisons.map((comparison) => {
              const provinceA = findProvinceById(comparison.provinceIdA);
              const provinceB = findProvinceById(comparison.provinceIdB);
              if (!provinceA || !provinceB) return null;

              return (
                <li key={comparison.slug}>
                  <Link href={`/il-rakimi-karsilastirma/${comparison.slug}`}>
                    {provinceA.nameTr} - {provinceB.nameTr}
                  </Link>
                </li>
              );
            })}
          </ul>

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
            İllerin tek tek rakımı için{" "}
            <Link href="/il-rakimlari">İllerin Rakımı</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
