import { seoTitle } from "../../seoTitle";
import { comparisonSlugDe, materialSlugDe } from "../../converter/germanScienceSlugs";
import MaterialExplorer from "../../components/MaterialExplorer";
import { materialComparisonContextDe } from "../../converter/materialComparisonsDe";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { type MaterialCategory } from "../../converter/materialsDatabase";
import { materialCategoryLabelsDe, materialNamesDe } from "../../converter/materialsDatabaseDe";
import { getAllMaterialProfiles } from "../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../converter/materialComparisons";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Wie zuverlässig sind die Dichtewerte auf dieser Seite?",
    answer:
      "Die Werte sind allgemein anerkannte technische Referenzwerte nahe Raumtemperatur. Tatsächliche Werte können je nach Materialart, Reinheit, Legierung und Temperatur leicht abweichen.",
  },
  {
    question: "Warum werden Wärmeleitfähigkeit oder Elastizitätsmodul bei manchen Materialien nicht angezeigt?",
    answer:
      "Zusätzliche Eigenschaften werden nur für Materialien angezeigt, für die verlässlich geprüfte Daten vorliegen; nicht jede Eigenschaft ist für jedes Material verfügbar.",
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
  title: seoTitle("Werkstoffeigenschaften: Dichte, Wärmeleitfähigkeit und Umrechner", "Werkstoffeigenschaften: Dichte und Wärmeleitung"),
  description:
    "Dichtetabelle für über 100 Metalle, Flüssigkeiten, Kunststoffe, Holzarten und Baustoffe: Eigenschaften, Gewicht typischer Bleche und Kanister, Materialvergleich und Masse-Volumen-Rechner.",
  alternates: {
    canonical: "/de/werkstoffeigenschaften",
    languages: {
      tr: "/malzeme-ozellikleri",
      de: "/de/werkstoffeigenschaften",
      "x-default": "/malzeme-ozellikleri",
    },
  },
  openGraph: {
    title: "Werkstoffeigenschaften: Dichte, Wärmeleitfähigkeit und Umrechner",
    description: "Dichte und Eigenschaften von über 100 Materialien ansehen.",
    url: buildSiteUrl("/de/werkstoffeigenschaften"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanMaterialsHubPage() {
  const materials = getAllMaterialProfiles();
  const comparisons = getAllMaterialComparisons();
  // Alte Einzelseiten-Adressen (deutsche Slugs) leiten mit ?m= / ?v= hierher.
  const aliases = Object.fromEntries([
    ...materials.map((m) => [materialSlugDe(m.id), m.id]),
    ...comparisons.map((c) => [comparisonSlugDe(c.slug), c.slug]),
  ]);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      { "@type": "ListItem", position: 2, name: "Werkstoffeigenschaften", item: buildSiteUrl("/de/werkstoffeigenschaften") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Werkstoffeigenschaften</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Werkstoffeigenschaften: Dichte und Gewicht</h1>
          <p>
            Wähle eines von {materials.length} Materialien: Dichte, Wärmeleitfähigkeit, E-Modul,
            Wärmeausdehnung und Viskosität, dazu das Gewicht typischer Bleche, Stäbe, Kanister und
            Platten sowie ein Masse-Volumen-Rechner. Mit einem zweiten Material siehst du beide in
            denselben Maßen nebeneinander.
          </p>
        </header>

        <MaterialExplorer locale="de" aliases={aliases} />

        <section className="category-article-content">
          <h2>Dichtetabelle aller Materialien</h2>
          {categoryOrder.map((category) => {
            const rows = materials
              .filter((material) => material.category === category)
              .map((material) => ({ ...material, nameDe: materialNamesDe[material.id] ?? material.nameTr }))
              .sort((a, b) => b.densityKgM3 - a.densityKgM3);
            if (rows.length === 0) return null;
            return (
              <div key={category}>
                <h3>{materialCategoryLabelsDe[category]}</h3>
                <div className="holiday-table-wrap">
                  <table className="holiday-table">
                    <thead>
                      <tr>
                        <th scope="col">Material</th>
                        <th scope="col">Dichte (kg/m³)</th>
                        <th scope="col">Wärmeleitfähigkeit (W/(m·K))</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((m) => (
                        <tr key={m.id}>
                          <th scope="row">
                            <a href={`?m=${m.id}#rechner`} rel="nofollow">
                              {m.nameDe}
                            </a>
                          </th>
                          <td>{m.densityKgM3.toLocaleString("de-DE", { maximumFractionDigits: 4 })}</td>
                          <td>{m.thermalConductivityWmK ?? "–"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <h2>Beliebte Dichtevergleiche</h2>
          <ul>
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <a href={`?v=${comparison.slug}#rechner`} rel="nofollow">
                  {materialNamesDe[comparison.first.id] ?? comparison.first.nameTr} –{" "}
                  {materialNamesDe[comparison.second.id] ?? comparison.second.nameTr}
                </a>
                : {materialComparisonContextDe[comparison.slug] ?? comparison.context}
              </li>
            ))}
          </ul>

          <h2>Häufig gestellte Fragen</h2>
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
