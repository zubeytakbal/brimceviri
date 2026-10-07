import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { type MaterialCategory } from "../../converter/materialsDatabase";
import { materialCategoryLabelsUz, materialNamesUz } from "../../converter/materialsDatabaseUz";
import { getAllMaterialProfiles } from "../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../converter/materialComparisons";
import { buildSiteUrl } from "../../siteConfig";
import MaterialExplorer from "../../components/MaterialExplorer";
import { materialComparisonContextUz } from "../../converter/materialComparisonsUz";

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
    "100 dan ortiq metall, suyuqlik, plastmassa, yog'och va qurilish materialining zichlik jadvali: xususiyatlar, odatiy o'lchamlardagi og'irlik, materiallarni solishtirish va massa-hajm hisoblagichi.",
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
          <h1>Material Xususiyatlari: Zichlik va Og&apos;irlik</h1>
          <p>
            {materials.length} ta materialdan birini tanlang: zichlik, issiqlik o&apos;tkazuvchanligi,
            elastiklik moduli, issiqlik kengayishi va qovushqoqlik, shuningdek odatiy list, sterjen,
            idish va plitalarning og&apos;irligi hamda massa-hajm hisoblagichi. Ikkinchi materialni
            tanlasangiz, ikkalasi bir xil o&apos;lchamda yonma-yon ko&apos;rsatiladi.
          </p>
        </header>

        <MaterialExplorer locale="uz" />

        <section className="category-article-content">
          <h2>Barcha materiallar zichlik jadvali</h2>
          {categoryOrder.map((category) => {
            const rows = materials
              .filter((material) => material.category === category)
              .sort((a, b) => b.densityKgM3 - a.densityKgM3);
            if (rows.length === 0) return null;
            return (
              <div key={category}>
                <h3>{materialCategoryLabelsUz[category]}</h3>
                <div className="holiday-table-wrap">
                  <table className="holiday-table">
                    <thead>
                      <tr>
                        <th scope="col">Material</th>
                        <th scope="col">Zichlik (kg/m³)</th>
                        <th scope="col">Issiqlik o&apos;tkazuvchanligi (W/(m·K))</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((m) => (
                        <tr key={m.id}>
                          <th scope="row">
                            <a href={`?m=${m.id}#hisoblash`} rel="nofollow">
                              {materialNamesUz[m.id] ?? m.nameTr}
                            </a>
                          </th>
                          <td>{m.densityKgM3.toLocaleString("uz-UZ", { maximumFractionDigits: 4 })}</td>
                          <td>{m.thermalConductivityWmK ?? "–"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <h2>Mashhur zichlik solishtirishlari</h2>
          <ul>
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <a href={`?v=${comparison.slug}#hisoblash`} rel="nofollow">
                  {materialNamesUz[comparison.first.id] ?? comparison.first.nameTr} –{" "}
                  {materialNamesUz[comparison.second.id] ?? comparison.second.nameTr}
                </a>
                : {materialComparisonContextUz[comparison.slug] ?? comparison.context}
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
