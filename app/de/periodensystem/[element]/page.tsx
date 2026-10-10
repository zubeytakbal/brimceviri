import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
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
import { buildGermanElementReading } from "../../../converter/germanElementReading";
import { buildSiteUrl } from "../../../siteConfig";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { getAllCompoundProfiles } from "../../../converter/compoundsHub";
import { compoundNamesDe } from "../../../converter/compoundsDatabaseDe";
import { compoundPathDe } from "../../../converter/germanScienceSlugs";

const AVOGADRO = 6.02214076e23;

function formatSci(value: number) {
  const [mantissa, exponent] = value.toExponential(3).split("e");
  const sup = String(Number(exponent)).replace(/[-0-9]/g, (ch) => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹"["-0123456789".indexOf(ch)]);
  return `${Number(mantissa).toLocaleString("de-DE", { maximumFractionDigits: 3 })} × 10${sup}`;
}

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
    title: seoTitle(title, `${nameDe} (${element.symbol}): Ordnungszahl und Atommasse`, `${nameDe} (${element.symbol}): Eigenschaften`),
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

  const categoryDe = elementCategoryLabelsDe[element.category];
  const reading = buildGermanElementReading(element);
  const compoundsWith = getAllCompoundProfiles()
    .filter((c) => c.composition.some((part) => part.symbol === element.symbol))
    .map((c) => {
      const count = c.composition.find((part) => part.symbol === element.symbol)!.count;
      return { id: c.id, name: compoundNamesDe[c.id] ?? c.nameTr, formula: c.formula, share: (count * element.atomicMass) / c.molarMass };
    })
    .slice(0, 12);

  const faqItems: FaqItem[] = [
    {
      question: `Welches Symbol und welche Ordnungszahl hat ${nameDe}?`,
      answer: `${nameDe} hat das Elementsymbol ${element.symbol} und die Ordnungszahl ${element.atomicNumber}.`,
    },
    {
      question: `Wie viele Protonen und Elektronen hat ${nameDe}?`,
      answer: `Ein ${nameDe}-Atom hat ${element.atomicNumber} Protonen im Kern; als neutrales Atom hat es ebenso viele Elektronen (${element.atomicNumber}). Die Zahl der Neutronen hängt vom Isotop ab.`,
    },
    {
      question: `Wie groß ist die molare Masse von ${nameDe}?`,
      answer: `Die molare Masse von ${nameDe} beträgt ${formatMass(element.atomicMass)} g/mol. 1 mol ${nameDe} wiegt also ${formatMass(element.atomicMass)} g, und 1 g enthält etwa ${formatSci(AVOGADRO / element.atomicMass)} Atome.`,
    },
    {
      question: `Wo steht ${nameDe} im Periodensystem?`,
      answer:
        element.group === null
          ? `${nameDe} gehört zu den ${categoryDe}en und steht in der Sonderreihe unter der Haupttabelle (${element.period}. Periode).`
          : `${nameDe} steht in der ${element.period}. Periode und in Gruppe ${element.group} und gehört zur Kategorie „${categoryDe}“.`,
    },
  ];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
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

          <h2>{reading.heading}</h2>
          {reading.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{reading.headers[0]}</th>
                  <th>{reading.headers[1]}</th>
                </tr>
              </thead>
              <tbody>
                {reading.rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

          {compoundsWith.length > 0 && (
            <>
              <h2>Verbindungen mit {nameDe}</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>Verbindung</th>
                      <th>Formel</th>
                      <th>Massenanteil {element.symbol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compoundsWith.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <Link href={compoundPathDe(c.id)}>{c.name}</Link>
                        </td>
                        <td>{c.formula}</td>
                        <td>{(c.share * 100).toLocaleString("de-DE", { maximumFractionDigits: 1 })} %</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <h2>Häufig gestellte Fragen</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <p>
            Quelle: Atommassen{" "}
            <a href="https://iupac.qmul.ac.uk/AtWt/" target="_blank" rel="noreferrer">
              IUPAC
            </a>
            , Atomeigenschaften{" "}
            <a href="https://www.nist.gov/pml/periodic-table-elements" target="_blank" rel="noreferrer">
              NIST
            </a>
            . Molmasse von Verbindungen:{" "}
            <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>.
          </p>

          <Link className="text-link" href="/de/periodensystem">
            ← Zurück zum Periodensystem
          </Link>
        </section>
      </div>
    </main>
  );
}
