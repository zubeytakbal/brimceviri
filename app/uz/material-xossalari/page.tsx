import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { type MaterialCategory } from "../../converter/materialsDatabase";
import { materialCategoryLabelsUz, materialNamesUz } from "../../converter/materialsDatabaseUz";
import { getAllMaterialProfiles } from "../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../converter/materialComparisons";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/material-xossalari";

const faqItems: FaqItem[] = [
  {
    question: "Bu sahifadagi zichlik qiymatlari qanchalik ishonchli?",
    answer:
      "Qiymatlar keng qabul qilingan muhandislik ma'lumotnoma jadvallaridan to'plangan, xona haroratiga yaqin umumiy qiymatlardir. Haqiqiy qiymatlar materialning turiga, tozaligiga, qotishmasiga va haroratga qarab kichik farqlar ko'rsatishi mumkin.",
  },
  {
    question: "Nima uchun ba'zi materiallarning issiqlik o'tkazuvchanligi yoki elastisiya moduli ko'rsatilmagan?",
    answer:
      "Faqat ishonchli manbalardan tasdiqlangan ma'lumotga ega bo'lgan materiallar uchun qo'shimcha xususiyatlarni ko'rsatamiz; har bir material uchun har bir xususiyat mavjud emas.",
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
  title: "Material Xususiyatlari: Zichlik, Issiqlik O'tkazuvchanligi va Birlik Aylantirgich",
  description:
    "100 dan ortiq metall, suyuqlik, plastmassa, yog'och va qurilish materialining zichligini va muhandislik xususiyatlarini ko'ring, birliklar orasida darhol aylantiring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/malzeme-ozellikleri",
      "uz-UZ": pagePath,
      "x-default": "/malzeme-ozellikleri",
    },
  },
  openGraph: {
    title: "Material Xususiyatlari: Zichlik, Issiqlik O'tkazuvchanligi va Birlik Aylantirgich",
    description: "100 dan ortiq materialning zichligi va xususiyatlarini ko'ring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekMaterialsHubPage() {
  const materials = getAllMaterialProfiles();
  const comparisons = getAllMaterialComparisons();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Material Xususiyatlari", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Material Xususiyatlari</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Material Xususiyatlari</h1>
          <p>
            {materials.length} ta metall, suyuqlik, plastmassa,
            yog&apos;och, qurilish materiali, oziq-ovqat va gazning
            zichligini va ma&apos;lum muhandislik xususiyatlarini
            (issiqlik o&apos;tkazuvchanligi, elastisiya moduli,
            issiqlik kengayishi, qovushqoqlik) ko&apos;ring; har bir
            materialning o&apos;z sahifasida jonli birlik
            aylantirgich ham mavjud.
          </p>
        </header>

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const categoryMaterials = materials
              .filter((material) => material.category === category)
              .sort((a, b) =>
                (materialNamesUz[a.id] ?? a.nameTr).localeCompare(
                  materialNamesUz[b.id] ?? b.nameTr,
                  "tr"
                )
              );

            if (categoryMaterials.length === 0) return null;

            return (
              <div key={category}>
                <h2>{materialCategoryLabelsUz[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryMaterials.map((material) => (
                    <li key={material.id}>
                      <Link href={`/uz/material-xossalari/${material.id}`}>
                        {materialNamesUz[material.id] ?? material.nameTr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <h2>Mashhur Zichlik Solishtirishlari</h2>
          <ul className="related-conversion-list">
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <Link href={`/uz/material-solishtirish/${comparison.slug}`}>
                  {materialNamesUz[comparison.first.id] ?? comparison.first.nameTr} –{" "}
                  {materialNamesUz[comparison.second.id] ?? comparison.second.nameTr}
                </Link>
              </li>
            ))}
          </ul>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
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
