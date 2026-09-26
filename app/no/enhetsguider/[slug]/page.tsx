import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { norwegianUnitPages } from "../../../converter/localizedNorwegianUnitPages";
import { norwegianCategoryPages } from "../../../converter/localizedNorwegianCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { unitPages } from "../../../converter/unitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return norwegianUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return norwegianUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Enheten ble ikke funnet",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/no/enhetsguider/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/no/enhetsguider/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/no/enhetsguider/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "nb_NO",
      type: "article",
    },
  };
}

export default async function NorwegianUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const hasTurkishPage = unitPages.some((turkishPage) => turkishPage.slug === unitPage.sourceSlug);
  const categoryPage = norwegianCategoryPages.find(
    (category) => category.category === unitPage.category
  );

  return (
    <main className="all-conversions-page" lang="no">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigering">
          <Link href="/no">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/no/kategorier/${categoryPage.slug}`}>
                {categoryPage.title}
              </Link>
              <span aria-hidden="true">&rsaquo;</span>
            </>
          )}
          <span>{unitPage.name}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{unitPage.name}</h1>
          <p>{unitPage.shortDescription}</p>
        </header>

        <section className="category-article-content">
          <dl className="category-facts">
            <div>
              <dt>Symbol</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>Målesystem</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>SI-ekvivalent</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Historie</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Bruk</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/no/kategorier/${categoryPage.slug}`}
                >
                  Se andre enheter i kategorien {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          {(hasTurkishPage || englishPage) && (
            <section className="conversion-section language-alternatives">
              <h2>Andre språk</h2>
              {hasTurkishPage && (
                <Link
                  className="text-link"
                  href={`/birimler/${unitPage.sourceSlug}`}
                  hrefLang="tr"
                >
                  Oppnå den turkiska versionen
                </Link>
              )}
              {englishPage && (
                <Link
                  className="text-link"
                  href={`/en/units/${englishPage.slug}`}
                  hrefLang="en"
                >
                  View the English version
                </Link>
              )}
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
