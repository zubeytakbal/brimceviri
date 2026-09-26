import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { nederlandsCategoryPages } from "../../../converter/localizedNederlandsCategoryPages";
import { nederlandsUnitPages } from "../../../converter/localizedNederlandsUnitPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { unitPages } from "../../../converter/unitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return nederlandsUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return nederlandsUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const unitPage = findBySlug((await params).slug);

  if (!unitPage) {
    return {
      title: "Eenheid niet gevonden",
      robots: { index: false, follow: false },
    };
  }

  const title = `${unitPage.name} — ${unitPage.categoryName}`;

  return {
    title,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/nl/eenheidsgidsen/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/nl/eenheidsgidsen/${unitPage.slug}`),
    },
    openGraph: {
      title,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/nl/eenheidsgidsen/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "nl_NL",
      type: "article",
    },
  };
}

export default async function NederlandsUnitGuidePage({ params }: PageProps) {
  const unitPage = findBySlug((await params).slug);

  if (!unitPage) {
    notFound();
  }

  const categoryPage = nederlandsCategoryPages.find(
    (item) => item.category === unitPage.category
  );
  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const hasTurkishPage = unitPages.some((turkishPage) => turkishPage.slug === unitPage.sourceSlug);
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="nl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          {categoryPage && (
            <>
              <Link href={`/nl/categorieen/${categoryPage.slug}`}>
                {categoryPage.title}
              </Link>
              <span aria-hidden="true">›</span>
            </>
          )}
          <span>{unitPage.name}</span>
        </nav>

        <header className="all-conversions-header">
          <p>{unitPage.categoryName}</p>
          <h1>{unitPage.name}</h1>
          <p>{unitPage.shortDescription}</p>
        </header>

        <article className="category-article-content">
          <dl className="category-facts">
            <div>
              <dt>Symbool</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>Meetsysteem</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>SI-equivalent</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Geschiedenis en definitie</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Gebruik</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Bronnen</h2>
              <p>
                De definitie en omrekenrelaties van deze eenheid zijn gebaseerd
                op erkende metrologische referenties en SI-bronnen.
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

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/nl/categorieen/${categoryPage.slug}`}
                >
                  Bekijk alle eenheden in {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          {(hasTurkishPage || englishPage) && (
            <section className="conversion-section language-alternatives">
              <h2>Andere talen</h2>
              {hasTurkishPage && (
                <Link
                  className="text-link"
                  href={`/birimler/${unitPage.sourceSlug}`}
                  hrefLang="tr"
                >
                  Open de Turkse versie
                </Link>
              )}
              {englishPage && (
                <Link
                  className="text-link"
                  href={`/en/units/${englishPage.slug}`}
                  hrefLang="en"
                >
                  Open de Engelse versie
                </Link>
              )}
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
