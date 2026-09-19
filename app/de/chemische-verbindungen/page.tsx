import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { type CompoundCategory } from "../../converter/compoundsDatabase";
import { compoundCategoryLabelsDe, compoundNamesDe } from "../../converter/compoundsDatabaseDe";
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
  title: "Chemische Verbindungen: Molare Masse und Stoffmengenrechner",
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
          <h1>Chemische Verbindungen</h1>
          <p>
            Sieh dir die molare Masse und atomare Zusammensetzung von{" "}
            {compounds.length} gängigen chemischen Verbindungen an; jede
            Verbindungsseite enthält auch einen eigenen
            Stoffmengenrechner.
          </p>
        </header>

        <section className="category-article-content">
          {categoryOrder.map((category) => {
            const categoryCompounds = compounds
              .filter((compound) => compound.category === category)
              .map((compound) => ({
                ...compound,
                nameDe: compoundNamesDe[compound.id] ?? compound.nameTr,
              }))
              .sort((a, b) => a.nameDe.localeCompare(b.nameDe, "de"));

            if (categoryCompounds.length === 0) return null;

            return (
              <div key={category}>
                <h2>{compoundCategoryLabelsDe[category]}</h2>
                <ul className="related-conversion-list">
                  {categoryCompounds.map((compound) => (
                    <li key={compound.id}>
                      <Link href={`/de/chemische-verbindungen/${compound.id}`}>
                        {compound.nameDe} ({compound.formula})
                      </Link>
                    </li>
                  ))}
                </ul>
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
