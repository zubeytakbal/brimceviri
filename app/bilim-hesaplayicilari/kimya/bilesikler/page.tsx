import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  compoundCategoryLabels,
  type CompoundCategory,
} from "../../../converter/compoundsDatabase";
import { getAllCompoundProfiles } from "../../../converter/compoundsHub";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Molar kütle nasıl hesaplanır?",
    answer:
      "Bir bileşiğin molar kütlesi, kimyasal formülündeki her elementin atom kütlesinin, o elementin formüldeki sayısıyla çarpılıp toplanmasıyla bulunur. Örneğin H2O için: 2×1,008 (H) + 1×16,00 (O) = 18,02 g/mol.",
  },
  {
    question: "Bu sayfadaki molar kütle değerleri ne kadar güvenilir?",
    answer:
      "Değerler, IUPAC'ın standart atom ağırlıkları tablosundan doğrudan hesaplanır — tahmini veya kaynağa göre değişen bir değer değil, saf bir aritmetik sonucudur.",
  },
];

const categoryOrder: CompoundCategory[] = [
  "oksit",
  "tuz",
  "asit",
  "baz",
  "organik",
  "gaz",
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Kimyasal Bileşikler: Molar Kütle ve Mol Hesaplama",
  description:
    "Su, tuz, glikoz ve daha fazlası — yaygın kimyasal bileşiklerin molar kütlesini, atomik kompozisyonunu gör ve kendi mol hesaplamanı yap.",
  alternates: { canonical: "/bilim-hesaplayicilari/kimya/bilesikler" },
  openGraph: {
    title: "Kimyasal Bileşikler: Molar Kütle ve Mol Hesaplama",
    description: "Yaygın kimyasal bileşiklerin molar kütlesini gör ve mol hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/bilesikler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function CompoundsHubPage() {
  const compounds = getAllCompoundProfiles();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kimya", item: buildSiteUrl("/bilim-hesaplayicilari/kimya") },
      { "@type": "ListItem", position: 3, name: "Bileşikler", item: buildSiteUrl("/bilim-hesaplayicilari/kimya/bilesikler") },
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
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Bileşikler</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kimyasal Bileşikler</h1>
          <p>
            {compounds.length} yaygın kimyasal bileşiğin molar
            kütlesini ve atomik kompozisyonunu gör; her bileşiğin
            kendi sayfasında kişisel mol hesaplayıcı da bulunur.
          </p>
        </header>

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const categoryCompounds = compounds
              .filter((compound) => compound.category === category)
              .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

            if (categoryCompounds.length === 0) return null;

            return (
              <div key={category}>
                <h2>{compoundCategoryLabels[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryCompounds.map((compound) => (
                    <li key={compound.id}>
                      <Link href={`/bilim-hesaplayicilari/kimya/bilesikler/${compound.id}`}>
                        {compound.nameTr} ({compound.formula})
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
