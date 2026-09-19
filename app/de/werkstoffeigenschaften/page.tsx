import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Werkstoffeigenschaften: Dichte, Wärmeleitfähigkeit und Umrechner",
  description:
    "Über 100 Metalle, Flüssigkeiten, Kunststoffe, Holzarten und Baumaterialien — Dichte und technische Eigenschaften ansehen, sofort zwischen Einheiten umrechnen.",
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
          <h1>Werkstoffeigenschaften</h1>
          <p>
            Sieh dir die Dichte und bekannte technische Eigenschaften
            (Wärmeleitfähigkeit, Elastizitätsmodul, Wärmeausdehnung,
            Viskosität) von {materials.length} Metallen, Flüssigkeiten,
            Kunststoffen, Holzarten, Baumaterialien, Lebensmitteln und
            Gasen an; jede Materialseite enthält auch einen
            Live-Einheitenumrechner.
          </p>
        </header>

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const categoryMaterials = materials
              .filter((material) => material.category === category)
              .map((material) => ({
                ...material,
                nameDe: materialNamesDe[material.id] ?? material.nameTr,
              }))
              .sort((a, b) => a.nameDe.localeCompare(b.nameDe, "de"));

            if (categoryMaterials.length === 0) return null;

            return (
              <div key={category}>
                <h2>{materialCategoryLabelsDe[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryMaterials.map((material) => (
                    <li key={material.id}>
                      <Link href={`/de/werkstoffeigenschaften/${material.id}`}>
                        {material.nameDe}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <h2>Beliebte Dichtevergleiche</h2>
          <ul className="related-conversion-list">
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <Link href={`/de/werkstoffvergleich/${comparison.slug}`}>
                  {materialNamesDe[comparison.first.id] ?? comparison.first.nameTr} –{" "}
                  {materialNamesDe[comparison.second.id] ?? comparison.second.nameTr}
                </Link>
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
