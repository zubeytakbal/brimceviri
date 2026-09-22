import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompoundMolCalculatorDe from "../../../components/CompoundMolCalculatorDe";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  findCompoundProfileById,
  findSimilarMolarMassCompounds,
  getAllCompoundProfiles,
} from "../../../converter/compoundsHub";
import { compoundNamesDe, elementNamesDe } from "../../../converter/compoundsDatabaseDe";
import { periodicTable } from "../../../converter/periodicTableData";
import { findCompoundEditorial } from "../../../converter/compoundEditorial";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatMolarMass(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
}

function getElementContribution(symbol: string, count: number) {
  const element = periodicTable.find((item) => item.symbol === symbol);
  return (element?.atomicMass ?? 0) * count;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllCompoundProfiles().map((compound) => ({ slug: compound.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = findCompoundProfileById(slug);

  if (!compound) {
    return { title: "Verbindung nicht gefunden", robots: { index: false, follow: false } };
  }

  const nameDe = compoundNamesDe[compound.id] ?? compound.nameTr;
  const title = `${nameDe} (${compound.formula}) Molare Masse und Stoffmengenrechner`;
  const description = `${nameDe} (${compound.formula}) molare Masse: ${formatMolarMass(compound.molarMass)} g/mol. Atomare Zusammensetzung ansehen, eigene Berechnung mit Masse oder Stoffmenge durchführen.`;

  const editorial = findCompoundEditorial(compound.id);

  return {
    title,
    description,
    robots: { index: Boolean(editorial), follow: true },
    alternates: {
      canonical: `/de/chemische-verbindungen/${slug}`,
      languages: {
        tr: `/bilim-hesaplayicilari/kimya/bilesikler/${slug}`,
        de: `/de/chemische-verbindungen/${slug}`,
        "x-default": `/bilim-hesaplayicilari/kimya/bilesikler/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/chemische-verbindungen/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanCompoundPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = findCompoundProfileById(slug);

  if (!compound) {
    notFound();
  }

  const nameDe = compoundNamesDe[compound.id] ?? compound.nameTr;
  const pageUrl = buildSiteUrl(`/de/chemische-verbindungen/${slug}`);
  const editorial = findCompoundEditorial(compound.id);
  const similarCompounds = findSimilarMolarMassCompounds(slug, 5).map((similar) => ({
    ...similar,
    nameDe: compoundNamesDe[similar.id] ?? similar.nameTr,
  }));

  const composition = compound.composition.map((item) => ({
    ...item,
    nameDe: elementNamesDe[item.symbol] ?? item.symbol,
  }));

  const compositionLine = composition
    .map((item) => `${item.count} × ${item.nameDe} (${item.symbol})`)
    .join(" + ");

  const faqItems: FaqItem[] = [
    {
      question: `Wie hoch ist die molare Masse von ${nameDe} (${compound.formula})?`,
      answer: `Die molare Masse von ${nameDe} beträgt etwa ${formatMolarMass(compound.molarMass)} g/mol. Dieser Wert ergibt sich aus der Summe der Atommassen von ${compositionLine}.`,
    },
    {
      question: `Wie lautet die chemische Formel von ${nameDe}?`,
      answer: `Die chemische Formel von ${nameDe} lautet ${compound.formula}.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      { "@type": "ListItem", position: 2, name: "Chemische Verbindungen", item: buildSiteUrl("/de/chemische-verbindungen") },
      { "@type": "ListItem", position: 3, name: nameDe, item: pageUrl },
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
          <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{nameDe}</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{compound.formula}</p>
          <h1>
            {nameDe} ({compound.formula}) Molare Masse und Stoffmengenrechner
          </h1>
          <p>
            Sieh dir die atomare Zusammensetzung und molare Masse an
            und berechne direkt mit deiner eigenen Masse oder
            Stoffmenge.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{nameDe} Molare Masse Berechnung</h2>
          <dl className="unit-facts">
            <div>
              <dt>Chemische Formel</dt>
              <dd>{compound.formula}</dd>
            </div>
            <div>
              <dt>Molare Masse</dt>
              <dd>{formatMolarMass(compound.molarMass)} g/mol</dd>
            </div>
          </dl>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Atomare Zusammensetzung</caption>
              <thead>
                <tr>
                  <th scope="col">Element</th>
                  <th scope="col">Anzahl</th>
                  <th scope="col">Beitrag (g/mol)</th>
                </tr>
              </thead>
              <tbody>
                {composition.map((item) => (
                  <tr key={item.symbol}>
                    <td>
                      {item.nameDe} ({item.symbol})
                    </td>
                    <td>{item.count}</td>
                    <td>
                      {formatMolarMass(getElementContribution(item.symbol, item.count))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CompoundMolCalculatorDe
          molarMass={compound.molarMass}
          compoundName={nameDe}
        />

        {editorial && (
          <section className="category-article-content">
            <h2>{nameDe} im Kontext</h2>
            <p>{editorial.contextDe}</p>

            <h2>Typische Anwendungen</h2>
            <ul>
              {editorial.usesDe.map((use) => (
                <li key={use}>{use}</li>
              ))}
            </ul>

            <h2>Sicherheits- und Geltungshinweis</h2>
            <p>{editorial.safetyDe}</p>
          </section>
        )}

        {similarCompounds.length > 0 && (
          <section className="category-article-content">
            <h2>Verbindungen mit ähnlicher molarer Masse wie {nameDe}</h2>
            <ul className="related-conversion-list">
              {similarCompounds.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/de/chemische-verbindungen/${similar.id}`}>
                    {similar.nameDe} ({similar.formula})
                  </Link>{" "}
                  — {formatMolarMass(similar.molarMass)} g/mol
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Häufig gestellte Fragen</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Verwandte Seiten</h2>
          <p>
            Für alle Verbindungen siehe die Übersicht{" "}
            <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>.
          </p>

          <h2>Quellen</h2>
          <p>
            Die molare Masse wird durch Summierung der Atommassen aus der{" "}
            <a
              href="https://iupac.qmul.ac.uk/AtWt/"
              target="_blank"
              rel="noreferrer"
            >
              IUPAC-Tabelle der Standardatomgewichte
            </a>{" "}
            entsprechend der chemischen Formel berechnet. Das Ergebnis ist
            ein Referenzwert auf Basis der Standardatomgewichte; bei
            isotopisch angereicherten Proben oder hochpräzisen Analysen muss
            die Isotopenzusammensetzung zusätzlich berücksichtigt werden.
          </p>
        </section>
      </div>
    </main>
  );
}
