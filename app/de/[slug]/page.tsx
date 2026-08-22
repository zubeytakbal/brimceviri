import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import {
  findGermanConversionPage,
  germanConversionPages,
} from "../../converter/localizedGermanConversionPages";
import { findGermanUnitPage } from "../../converter/localizedGermanUnitPages";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "\u2014";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 ||
      Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("de-DE", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return germanConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findGermanConversionPage(slug);

  if (!page) {
    return {
      title: "Umrechnung nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const title = `${page.fromName} zu ${page.toName} Umrechner`;
  const description =
    `Rechnen Sie ${page.fromName.toLowerCase()} in ${page.toName.toLowerCase()} um. ` +
    `Sehen Sie Formel, Umrechnungstabelle und das direkte Ergebnis.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/de/${page.slug}`,
      languages: {
        tr: `/${page.sourceSlug}`,
        en: englishPage ? `/en/${englishPage.slug}` : "/en",
        de: `/de/${page.slug}`,
        "x-default": `/${page.sourceSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function GermanConversionPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const page = findGermanConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(
    page.sourceSlug
  );
  const reversePage = findGermanConversionPage(page.reverseSlug);
  const fromUnitInfo = findGermanUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findGermanUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = germanConversionPages
    .filter(
      (relatedPage) =>
        relatedPage.slug !== page.slug &&
        relatedPage.slug !== page.reverseSlug &&
        relatedPage.category === page.category &&
        (relatedPage.fromUnit === page.fromUnit ||
          relatedPage.toUnit === page.fromUnit ||
          relatedPage.fromUnit === page.toUnit ||
          relatedPage.toUnit === page.toUnit)
    )
    .slice(0, 8);

  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(
      page.category,
      value,
      page.fromUnit,
      page.toUnit
    ),
  }));

  const oneUnitResult = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );

  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page" lang="de">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">{"\u203A"}</span>
          <span>{page.categoryName}</span>
          <span aria-hidden="true">{"\u203A"}</span>
          <span>
            {page.fromName} zu {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>{page.fromName} zu {page.toName} Umrechner</h1>
            <p className="conversion-hero-description">
              Geben Sie einen Wert ein und berechnen Sie das Ergebnis sofort.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="de"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Umrechnungs\u00FCbersicht</h2>
            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formel</dt>
                <dd>{page.formula}</dd>
              </div>
              <div>
                <dt>Kategorie</dt>
                <dd>{page.categoryName}</dd>
              </div>
              <div>
                <dt>Einheiten</dt>
                <dd>
                  {page.fromUnit} \u2192 {page.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            Wie rechnet man {page.fromName.toLowerCase()} in{" "}
            {page.toName.toLowerCase()} um?
          </h2>
          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Umrechnungsformel</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Umrechnungstabelle: {page.fromName} zu {page.toName}
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{page.fromName}</th>
                  <th>{page.toName}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)} {page.fromUnit}
                    </td>
                    <td>
                      {formatNumber(row.result)} {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Was ist {fromUnitInfo.name}?</h2>
            <p>{fromUnitInfo.shortDescription}</p>
            <p>{fromUnitInfo.historySummary}</p>
            <Link className="text-link" href={`/de/einheiten/${fromUnitInfo.slug}`}>
              Einheitenleitfaden zu {fromUnitInfo.name} \u00F6ffnen
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Was ist {toUnitInfo.name}?</h2>
            <p>{toUnitInfo.shortDescription}</p>
            <p>{toUnitInfo.historySummary}</p>
            <Link className="text-link" href={`/de/einheiten/${toUnitInfo.slug}`}>
              Einheitenleitfaden zu {toUnitInfo.name} \u00F6ffnen
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Umgekehrte Richtung</h2>
            <Link className="text-link" href={`/de/${reversePage.slug}`}>
              {reversePage.fromName} zu {reversePage.toName}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Verwandte Umrechnungen</h2>
            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/de/${relatedPage.slug}`}>
                    {relatedPage.fromName} zu {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Quellen</h2>

            <p>
              Die Definitionen und Umrechnungsbeziehungen auf dieser
              Seite orientieren sich an anerkannten metrologischen
              Referenzen und SI-Quellen.
            </p>

            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.organization}: {source.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="conversion-section language-alternatives">
          <h2>Weitere Sprachen</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Türkische Version öffnen
          </Link>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              View the English version
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}
