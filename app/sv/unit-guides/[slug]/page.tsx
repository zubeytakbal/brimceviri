import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { swedishUnitPages } from "../../../converter/localizedSwedishUnitPages";
import { swedishCategoryPages } from "../../../converter/localizedSwedishCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return swedishUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return swedishUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Enheten hittades inte",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/sv/unit-guides/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/sv/unit-guides/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/sv/unit-guides/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "sv_SE",
      type: "article",
    },
  };
}

export default async function SwedishUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const categoryPage = swedishCategoryPages.find(
    (category) => category.category === unitPage.category
  );

  return (
    <main className="all-conversions-page" lang="sv">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/sv/categories/${categoryPage.slug}`}>
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
              <dt>Mätsystem</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>SI-motsvarighet</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Historia</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Användning</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/sv/categories/${categoryPage.slug}`}
                >
                  Se övriga enheter i kategorin {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>Andra språk</h2>
            <Link
              className="text-link"
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              Öppna den turkiska versionen
            </Link>
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
        </section>
      </div>
    </main>
  );
}
