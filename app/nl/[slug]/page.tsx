import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  findNederlandsConversionPage,
  nederlandsConversionPages,
} from "../../converter/localizedNederlandsConversionPages";
import { nederlandsCategoryPages } from "../../converter/localizedNederlandsCategoryPages";
import { findNederlandsUnitPage } from "../../converter/localizedNederlandsUnitPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = { params: Promise<{ slug: string }> };

function formatNumber(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("nl-NL", {
    maximumFractionDigits: 12,
  });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return nederlandsConversionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findNederlandsConversionPage(slug);

  if (!page) {
    return { title: "Omrekening niet gevonden", robots: { index: false, follow: false } };
  }

  const title = `Omrekenen van ${page.fromName} naar ${page.toName}`;
  const description = `Reken ${page.fromName} gratis om naar ${page.toName}, met formule, tabel, achtergrondinformatie en gerelateerde omrekeningen.`;
  const pagePath = `/nl/${page.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
      languages: { tr: `/${page.sourceSlug}`, nl: pagePath, "x-default": `/${page.sourceSlug}` },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(pagePath),
      siteName: "BirimCeviri.app",
      locale: "nl_NL",
      type: "article",
    },
  };
}

export default async function NederlandsConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findNederlandsConversionPage(slug);

  if (!page) notFound();

  const pagePath = `/nl/${page.slug}`;
  const pageUrl = buildSiteUrl(pagePath);
  const fromUnit = findNederlandsUnitPage(page.category, page.fromUnit);
  const toUnit = findNederlandsUnitPage(page.category, page.toUnit);
  const reversePage = findNederlandsConversionPage(page.reverseSlug);
  const category = nederlandsCategoryPages.find((item) => item.category === page.category);
  const relatedConversions = nederlandsConversionPages
    .filter(
      (candidate) =>
        candidate.slug !== page.slug &&
        candidate.slug !== page.reverseSlug &&
        candidate.category === page.category &&
        (candidate.fromUnit === page.fromUnit ||
          candidate.toUnit === page.fromUnit ||
          candidate.fromUnit === page.toUnit ||
          candidate.toUnit === page.toUnit),
    )
    .slice(0, 8);
  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));
  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);
  const reverseOneUnitResult = formatNumber(
    convert(page.category, 1, page.toUnit, page.fromUnit)
  );
  const sources = getUnitSources(page.category);
  const faqItems: FaqItem[] = [
    {
      question: `Hoeveel ${page.toName} is 1 ${page.fromName}?`,
      answer: `1 ${page.fromUnit} = ${formattedOneUnitResult} ${page.toUnit}.`,
    },
    {
      question: `Hoe reken je ${page.fromName} om naar ${page.toName}?`,
      answer: page.explanation,
    },
    {
      question: `Hoeveel ${page.fromName} is 1 ${page.toName}?`,
      answer: `1 ${page.toUnit} = ${reverseOneUnitResult} ${page.fromUnit}.`,
    },
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/nl") },
      ...(category
        ? [{ "@type": "ListItem", position: 2, name: category.title, item: buildSiteUrl(`/nl/categories/${category.slug}`) }]
        : []),
      { "@type": "ListItem", position: category ? 3 : 2, name: `${page.fromName} naar ${page.toName}`, item: pageUrl },
    ],
  };

  return (
    <main className="conversion-page" lang="nl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {category ? <Link href={`/nl/categories/${category.slug}`}>{page.categoryName}</Link> : <span>{page.categoryName}</span>}
          <span aria-hidden="true">&rsaquo;</span>
          <span>{page.fromName} naar {page.toName}</span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>Omrekenen van {page.fromName} naar {page.toName}</h1>
            <p className="conversion-hero-description">Voer een waarde in voor een direct en gratis resultaat.</p>
            <PairConverter category={page.category} fromUnit={page.fromUnit} toUnit={page.toUnit} fromName={page.fromName} toName={page.toName} locale="nl" />
          </div>
          <div className="conversion-hero-information">
            <h2>Samenvatting van de omrekening</h2>
            <p>1 {page.fromUnit} = <strong>{formattedOneUnitResult} {page.toUnit}</strong></p>
            <dl>
              <div><dt>Formule</dt><dd>{page.formula}</dd></div>
              <div><dt>Categorie</dt><dd>{page.categoryName}</dd></div>
              <div><dt>Eenheden</dt><dd>{page.fromUnit} → {page.toUnit}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>Hoe reken je {page.fromName} om naar {page.toName}?</h2>
          <p>{page.explanation}</p>
          <div className="conversion-formula"><strong>Omrekenformule</strong><p>{page.formula}</p></div>
        </section>

        <section className="conversion-section">
          <h2>Tabel voor {page.fromName} naar {page.toName}</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead><tr><th>{page.fromName}</th><th>{page.toName}</th></tr></thead>
              <tbody>{tableRows.map((row) => <tr key={row.input}><td>{formatNumber(row.input)} {page.fromUnit}</td><td>{formatNumber(row.result)} {page.toUnit}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        {fromUnit && (
          <section className="conversion-section unit-information">
            <h2>Wat is {fromUnit.name}?</h2>
            <p>{fromUnit.shortDescription}</p><p>{fromUnit.historySummary}</p>
            <Link className="text-link" href={`/nl/unit-guides/${fromUnit.slug}`}>Bekijk de gids voor {fromUnit.name}</Link>
          </section>
        )}
        {toUnit && (
          <section className="conversion-section unit-information">
            <h2>Wat is {toUnit.name}?</h2>
            <p>{toUnit.shortDescription}</p><p>{toUnit.historySummary}</p>
            <Link className="text-link" href={`/nl/unit-guides/${toUnit.slug}`}>Bekijk de gids voor {toUnit.name}</Link>
          </section>
        )}
        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Omgekeerde omrekening</h2>
            <Link className="text-link" href={`/nl/${reversePage.slug}`}>Omrekenen van {reversePage.fromName} naar {reversePage.toName}</Link>
          </section>
        )}
        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Gerelateerde omrekeningen</h2>
            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => <li key={relatedPage.slug}><Link href={`/nl/${relatedPage.slug}`}>{relatedPage.fromName} naar {relatedPage.toName}</Link></li>)}
            </ul>
          </section>
        )}
        <section className="conversion-section conversion-faq">
          <h2>Veelgestelde vragen</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Bronnen</h2>
            <p>De definities en omrekenverhoudingen op deze pagina volgen erkende metrologische standaarden en SI-bronnen.</p>
            <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization}: {source.title}</a></li>)}</ol>
          </section>
        )}
        <section className="conversion-section language-alternatives">
          <h2>Andere talen</h2>
          <Link className="text-link" href={`/${page.sourceSlug}`} hrefLang="tr">Open de Turkse versie</Link>
        </section>
      </article>
    </main>
  );
}
