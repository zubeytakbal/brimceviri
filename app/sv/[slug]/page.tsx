import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { conversionPages } from "../../converter/conversionPages";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findSwedishConversionPage,
  swedishConversionPages,
} from "../../converter/localizedSwedishConversionPages";
import { findSwedishUnitPage } from "../../converter/localizedSwedishUnitPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("sv-SE", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return swedishConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findSwedishConversionPage(slug);

  if (!page) {
    return {
      title: "Omvandlingen hittades inte",
      robots: { index: false, follow: false },
    };
  }

  const oneUnitValue = formatNumber(1);
  const oneUnitResult = formatNumber(
    convert(page.category, 1, page.fromUnit, page.toUnit)
  );

  const title = `Omvandla ${page.fromName} till ${page.toName}`;
  const description = `${oneUnitValue} ${page.fromName} = ${oneUnitResult} ${page.toName}. Se gratis formeln, omvandlingstabellen och resultatet direkt.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/sv/${page.slug}`,
      ...buildFullLanguageAlternates(`/sv/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/sv/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "sv_SE",
      type: "website",
    },
  };
}

export default async function SwedishConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findSwedishConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const hasTurkishPage = conversionPages.some((turkishPage) => turkishPage.slug === page.sourceSlug);
  const reversePage = findSwedishConversionPage(page.reverseSlug);
  const fromUnitInfo = findSwedishUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findSwedishUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = swedishConversionPages
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
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page" lang="sv">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{page.categoryName}</span>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {page.fromName} — {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              Omvandla {page.fromName} till {page.toName}
            </h1>

            <p className="conversion-hero-description">
              Ange ett värde för att få ett direkt och gratis resultat.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="sv"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Sammanfattning av omvandlingen</h2>

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
                <dt>Kategori</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Enheter</dt>
                <dd>
                  {page.fromUnit} → {page.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            Hur omvandlar man {page.fromName} till {page.toName}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Omvandlingsformel</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Omvandlingstabell från {page.fromName} till {page.toName}
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
            <h2>Vad är {fromUnitInfo.name}?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/sv/unit-guides/${fromUnitInfo.slug}`}
            >
              Se guiden för enheten {fromUnitInfo.name}
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Vad är {toUnitInfo.name}?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/sv/unit-guides/${toUnitInfo.slug}`}
            >
              Se guiden för enheten {toUnitInfo.name}
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Omvänd omvandling</h2>

            <Link className="text-link" href={`/sv/${reversePage.slug}`}>
              Omvandla {reversePage.fromName} till {reversePage.toName}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Relaterade omvandlingar</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/sv/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Källor</h2>

            <p>
              Definitionerna och omvandlingsförhållandena på denna sida
              följer erkända metrologiska standarder.
            </p>

            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.organization}: {source.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {(hasTurkishPage || englishPage) && (
          <section className="conversion-section language-alternatives">
            <h2>Andra språk</h2>
  
            {hasTurkishPage && (
              <Link
                className="text-link"
                href={`/${page.sourceSlug}`}
                hrefLang="tr"
              >
                Türkçe versiyonu aç
              </Link>
  
            )}
  
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
        )}
      </article>
    </main>
  );
}
