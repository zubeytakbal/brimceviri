import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ElementLewisDiagram from "../../../components/ElementLewisDiagram";
import ElementMolWidget from "../../../components/ElementMolWidget";
import ElementNeighborsMini from "../../../components/ElementNeighborsMini";
import { periodicTable, slugifyElementName } from "../../../converter/periodicTableData";
import {
  elementCategoryLabelsDe,
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "../../../converter/periodicTableDataDe";
import { findGermanElementArticle } from "../../../converter/germanElementArticles";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ element: string }>;
};

function formatMass(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findElementBySlugDe(slug: string) {
  return periodicTable.find(
    (element) =>
      slugifyElementNameDe(elementNamesDeBySymbol[element.symbol] ?? element.symbol) === slug
  );
}

export function generateStaticParams() {
  return periodicTable.map((el) => ({
    element: slugifyElementNameDe(elementNamesDeBySymbol[el.symbol] ?? el.symbol),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { element: slug } = await params;
  const element = findElementBySlugDe(slug);

  if (!element) {
    return { title: "Element nicht gefunden", robots: { index: false, follow: false } };
  }

  const nameDe = elementNamesDeBySymbol[element.symbol] ?? element.symbol;
  const trSlug = slugifyElementName(element.nameTr);
  const article = findGermanElementArticle(slug);
  const title = `${nameDe} (${element.symbol}): Ordnungszahl, Atommasse und Eigenschaften`;
  const description = `Das Symbol von ${nameDe} ist ${element.symbol}, die Ordnungszahl ${element.atomicNumber}, die Atommasse ${formatMass(element.atomicMass)} u. Definition, Eigenschaften und Stoffmengenrechner.`;

  return {
    title,
    description,
    robots: { index: Boolean(article), follow: true },
    alternates: {
      canonical: `/de/periodensystem/${slug}`,
      languages: {
        tr: `/bilim-hesaplayicilari/kimya/periyodik-tablo/${trSlug}`,
        de: `/de/periodensystem/${slug}`,
        "x-default": `/bilim-hesaplayicilari/kimya/periyodik-tablo/${trSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/periodensystem/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanElementPage({ params }: PageProps) {
  const { element: slug } = await params;
  const element = findElementBySlugDe(slug);

  if (!element) {
    notFound();
  }

  const nameDe = elementNamesDeBySymbol[element.symbol] ?? element.symbol;
  const article = findGermanElementArticle(slug);
  const pageUrl = buildSiteUrl(`/de/periodensystem/${slug}`);
  const positionDescription =
    element.group === null
      ? `${nameDe} gehört zur ${elementCategoryLabelsDe[element.category].toLowerCase()}-Reihe. Diese Elemente werden im Periodensystem getrennt unter der Haupttabelle dargestellt.`
      : `${nameDe} steht in der ${element.period}. Periode und in Gruppe ${element.group} des Periodensystems. Die Einordnung als ${elementCategoryLabelsDe[element.category].toLowerCase()} hilft bei der Einordnung seiner chemischen Verwandtschaft.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Periodensystem",
        item: buildSiteUrl("/de/periodensystem"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: nameDe,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/de/periodensystem">Periodensystem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{nameDe}</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{element.symbol}</p>
          <h1>
            {nameDe} ({element.symbol})
          </h1>
          <p>
            Ordnungszahl {element.atomicNumber}, Atommasse{" "}
            {formatMass(element.atomicMass)} u.{" "}
            {elementCategoryLabelsDe[element.category]}.
          </p>
        </header>

        <ElementNeighborsMini locale="de" element={element} />

        <ElementMolWidget locale="de" elementName={nameDe} atomicMass={element.atomicMass} />

        <section className="category-article-content">
          <h2>{nameDe} Grunddaten</h2>
          <dl className="unit-facts">
            <div>
              <dt>Symbol</dt>
              <dd>{element.symbol}</dd>
            </div>
            <div>
              <dt>Ordnungszahl</dt>
              <dd>{element.atomicNumber}</dd>
            </div>
            <div>
              <dt>Atommasse</dt>
              <dd>{formatMass(element.atomicMass)} u</dd>
            </div>
            <div>
              <dt>Kategorie</dt>
              <dd>{elementCategoryLabelsDe[element.category]}</dd>
            </div>
            <div>
              <dt>Periode</dt>
              <dd>{element.period}</dd>
            </div>
            <div>
              <dt>Gruppe</dt>
              <dd>{element.group ?? "Lanthanoid-/Actinoid-Reihe"}</dd>
            </div>
          </dl>

          <ElementLewisDiagram locale="de" element={element} />

          <h2>Einordnung im Periodensystem</h2>
          <p>{positionDescription}</p>
          <p>
            Die Ordnungszahl {element.atomicNumber} gibt die Anzahl der
            Protonen im Atomkern an. Die hier angegebene Atommasse von{" "}
            {formatMass(element.atomicMass)} u ist der Referenzwert für
            Stoffmengen- und molare-Masse-Berechnungen mit diesem Element.
          </p>

          {article ? (
            <>
              <h2>{nameDe} im Kontext</h2>
              {article.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <h2>Anwendungen von {nameDe}</h2>
              <ul>
                {article.uses.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>
              Diese Datenseite wird redaktionell erweitert. Bis dahin ist sie
              nicht für die Indexierung vorgesehen.
            </p>
          )}

          <h2>Verwandte Tools</h2>
          <p>
            Um die isotopengewichtete durchschnittliche Atommasse dieses
            Elements zu untersuchen, siehe{" "}
            <Link href="/de/atommasse-berechnen">Atommasse berechnen</Link>,{" "}
            für die molare Masse von Verbindungen mit diesem Element
            siehe{" "}
            <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>,{" "}
            für die Elementrangliste siehe{" "}
            <Link href="/de/elementrangliste">Elementrangliste</Link>.
          </p>

          <h2>Quellen und Datenhinweis</h2>
          <p>
            Die Atommassen basieren auf der{" "}
            <a
              href="https://iupac.qmul.ac.uk/AtWt/"
              target="_blank"
              rel="noreferrer"
            >
              IUPAC-Tabelle der Standardatomgewichte
            </a>
            . Ordnungszahl, Elektronenkonfiguration und weitere
            Atomeigenschaften werden mit den{" "}
            <a
              href="https://www.nist.gov/pml/periodic-table-elements"
              target="_blank"
              rel="noreferrer"
            >
              Periodensystemdaten des NIST
            </a>{" "}
            abgeglichen.
          </p>
          <p>
            Standardatomgewichte sind Referenzwerte für natürliches Material.
            Bei isotopisch angereicherten Proben kann die für eine
            Laborberechnung relevante Masse abweichen.
          </p>

          <Link className="text-link" href="/de/periodensystem">
            ← Zurück zum Periodensystem
          </Link>
        </section>
      </div>
    </main>
  );
}
