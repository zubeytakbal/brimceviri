import { seoTitle } from "../../seoTitle";
import { compoundSlugDe } from "../../converter/germanScienceSlugs";
import VerbindungsRechner, { type VerbindungDaten } from "../../components/de/VerbindungsRechner";
import { findCompoundEditorial } from "../../converter/compoundEditorial";
import { periodicTable } from "../../converter/periodicTableData";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { type CompoundCategory } from "../../converter/compoundsDatabase";
import { compoundCategoryLabelsDe, compoundNamesDe, elementNamesDe } from "../../converter/compoundsDatabaseDe";
import { getAllCompoundProfiles } from "../../converter/compoundsHub";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Wie wird die molare Masse berechnet?",
    answer:
      "Die molare Masse einer Verbindung ergibt sich aus der Summe der Atommassen aller Elemente in der chemischen Formel, jeweils multipliziert mit ihrer Anzahl. Für H2O zum Beispiel: 2×1,008 (H) + 1×16,00 (O) = 18,02 g/mol.",
  },
  {
    question: "Wie zuverlässig sind die molaren Massen auf dieser Seite?",
    answer:
      "Die Werte werden direkt aus der IUPAC-Tabelle der Standardatomgewichte berechnet — kein geschätzter oder quellenabhängiger Wert, sondern ein reines arithmetisches Ergebnis.",
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
  title: seoTitle("Chemische Verbindungen: Molare Masse und Stoffmengenrechner", "Chemische Verbindungen: Molare Masse"),
  description:
    "Wasser, Kochsalz, Glukose und mehr — molare Masse und atomare Zusammensetzung gängiger chemischer Verbindungen ansehen und eigene Stoffmengenberechnungen durchführen.",
  alternates: {
    canonical: "/de/chemische-verbindungen",
    languages: {
      tr: "/bilim-hesaplayicilari/kimya/bilesikler",
      de: "/de/chemische-verbindungen",
      "x-default": "/bilim-hesaplayicilari/kimya/bilesikler",
    },
  },
  openGraph: {
    title: "Chemische Verbindungen: Molare Masse und Stoffmengenrechner",
    description: "Molare Masse gängiger chemischer Verbindungen ansehen und berechnen.",
    url: buildSiteUrl("/de/chemische-verbindungen"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanCompoundsHubPage() {
  const compounds = getAllCompoundProfiles();
  const atomicMass = (symbol: string) => periodicTable.find((e) => e.symbol === symbol)?.atomicMass ?? 0;
  const daten: VerbindungDaten[] = compounds
    .map((c) => {
      const editorial = findCompoundEditorial(c.id);
      return {
        id: c.id,
        name: compoundNamesDe[c.id] ?? c.nameTr,
        formula: c.formula,
        molarMass: c.molarMass,
        category: c.category,
        composition: c.composition.map((item) => ({
          symbol: item.symbol,
          name: elementNamesDe[item.symbol] ?? item.symbol,
          count: item.count,
          contribution: atomicMass(item.symbol) * item.count,
        })),
        context: editorial?.contextDe,
        uses: editorial?.usesDe,
        safety: editorial?.safetyDe,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
  // Alte Einzelseiten (deutsche Slugs) leiten mit ?v= hierher.
  const aliases = Object.fromEntries(compounds.map((c) => [compoundSlugDe(c.id), c.id]));
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      { "@type": "ListItem", position: 2, name: "Chemische Verbindungen", item: buildSiteUrl("/de/chemische-verbindungen") },
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
          <span>Chemische Verbindungen</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Chemische Verbindungen: Molare Masse</h1>
          <p>
            Wähle eine von {compounds.length} Verbindungen: molare Masse, atomare Zusammensetzung,
            typische Verwendung und ein Stoffmengenrechner für Masse, Mol und Teilchenzahl.
          </p>
        </header>

        <VerbindungsRechner
          compounds={daten}
          groups={categoryOrder.map((category) => ({ category, label: compoundCategoryLabelsDe[category] }))}
          aliases={aliases}
        />

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const rows = daten.filter((c) => c.category === category);
            if (rows.length === 0) return null;
            return (
              <div key={category}>
                <h2>{compoundCategoryLabelsDe[category]}</h2>
                <div className="holiday-table-wrap">
                  <table className="holiday-table">
                    <thead>
                      <tr>
                        <th scope="col">Verbindung</th>
                        <th scope="col">Formel</th>
                        <th scope="col">g/mol</th>
                        <th scope="col">Typische Verwendung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((c) => (
                        <tr key={c.id}>
                          <th scope="row">
                            <a href={`?v=${c.id}#rechner`} rel="nofollow">
                              {c.name}
                            </a>
                          </th>
                          <td>{c.formula}</td>
                          <td>{c.molarMass.toLocaleString("de-DE", { maximumFractionDigits: 3 })}</td>
                          <td>{c.uses?.join(", ") ?? "–"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

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
