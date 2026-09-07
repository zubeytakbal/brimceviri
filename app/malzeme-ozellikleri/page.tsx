import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import {
  materialCategoryLabels,
  type MaterialCategory,
} from "../converter/materialsDatabase";
import { getAllMaterialProfiles } from "../converter/materialsHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki yoğunluk değerleri ne kadar güvenilir?",
    answer:
      "Değerler, yaygın kabul gören mühendislik referans tablolarından derlenmiş, oda sıcaklığına yakın genel değerlerdir. Gerçek değerler malzemenin türüne, saflığına, alaşımına ve sıcaklığa göre küçük farklılıklar gösterebilir.",
  },
  {
    question: "Bir malzemenin ısıl iletkenliği veya elastisite modülü neden gösterilmiyor?",
    answer:
      "Sadece güvenilir kaynaklardan doğrulanmış veriye sahip olduğumuz malzemeler için ek özellikler gösteriyoruz; her malzeme için her özellik mevcut değildir.",
  },
];

const categoryOrder: MaterialCategory[] = [
  "metal",
  "sivi",
  "gida",
  "plastik",
  "yapi-malzemesi",
  "ahsap",
  "gaz",
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Malzeme Özellikleri: Yoğunluk, Isıl İletkenlik ve Birim Çevirici",
  description:
    "100'den fazla metal, sıvı, plastik, ahşap ve yapı malzemesinin yoğunluğunu ve mühendislik özelliklerini gör, birimler arasında anında çevir.",
  alternates: { canonical: "/malzeme-ozellikleri" },
  openGraph: {
    title: "Malzeme Özellikleri: Yoğunluk, Isıl İletkenlik ve Birim Çevirici",
    description: "100'den fazla malzemenin yoğunluğunu ve özelliklerini gör.",
    url: buildSiteUrl("/malzeme-ozellikleri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function MaterialsHubPage() {
  const materials = getAllMaterialProfiles();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Malzeme Özellikleri", item: buildSiteUrl("/malzeme-ozellikleri") },
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
          <span>Malzeme Özellikleri</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Malzeme Özellikleri</h1>
          <p>
            {materials.length} metal, sıvı, plastik, ahşap, yapı
            malzemesi, gıda ve gazın yoğunluğunu ve bilinen mühendislik
            özelliklerini (ısıl iletkenlik, elastisite modülü, ısıl
            genleşme, viskozite) gör; her malzemenin kendi sayfasında
            canlı birim çevirici de bulunur.
          </p>
        </header>

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const categoryMaterials = materials
              .filter((material) => material.category === category)
              .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

            if (categoryMaterials.length === 0) return null;

            return (
              <div key={category}>
                <h2>{materialCategoryLabels[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryMaterials.map((material) => (
                    <li key={material.id}>
                      <Link href={`/malzeme-ozellikleri/${material.id}`}>
                        {material.nameTr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
