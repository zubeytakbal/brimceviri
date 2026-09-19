import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ElementLewisDiagramDe from "../../../components/ElementLewisDiagramDe";
import ElementMolWidgetDe from "../../../components/ElementMolWidgetDe";
import ElementNeighborsMiniDe from "../../../components/ElementNeighborsMiniDe";
import { periodicTable, slugifyElementName } from "../../../converter/periodicTableData";
import {
  elementCategoryLabelsDe,
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "../../../converter/periodicTableDataDe";
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
  const title = `${nameDe} (${element.symbol}): Ordnungszahl, Atommasse und Eigenschaften`;
  const description = `Das Symbol von ${nameDe} ist ${element.symbol}, die Ordnungszahl ${element.atomicNumber}, die Atommasse ${formatMass(element.atomicMass)} u. Definition, Eigenschaften und Stoffmengenrechner.`;

  return {
    title,
    description,
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
  const pageUrl = buildSiteUrl(`/de/periodensystem/${slug}`);

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

        <ElementNeighborsMiniDe element={element} />

        <ElementMolWidgetDe elementName={nameDe} atomicMass={element.atomicMass} />

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

          <ElementLewisDiagramDe element={element} />

          <p>
            {nameDe} ist ein Element in der Kategorie{" "}
            {elementCategoryLabelsDe[element.category].toLowerCase()} und
            steht an {element.atomicNumber}. Stelle im Periodensystem.
            Ausführliche Artikelinhalte für dieses Element werden in
            Kürze ergänzt.
          </p>

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

          <h2>Quellen</h2>
          <p>
            Die Atommassen basieren auf der IUPAC-Tabelle der
            Standardatomgewichte.
          </p>

          <Link className="text-link" href="/de/periodensystem">
            ← Zurück zum Periodensystem
          </Link>
        </section>
      </div>
    </main>
  );
}
