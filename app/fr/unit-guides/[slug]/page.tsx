import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { frenchUnitPages } from "../../../converter/localizedFrenchUnitPages";
import { frenchCategoryPages } from "../../../converter/localizedFrenchCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return frenchUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return frenchUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Unité introuvable",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/fr/unit-guides/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/fr/unit-guides/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/fr/unit-guides/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "fr_FR",
      type: "article",
    },
  };
}

export default async function FrenchUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const categoryPage = frenchCategoryPages.find(
    (category) => category.category === unitPage.category
  );
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="fr">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/fr/categories/${categoryPage.slug}`}>
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
              <dt>Symbole</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>Système de mesure</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>Équivalent SI</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Histoire</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Utilisation</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Sources</h2>
              <p>
                Les définitions et relations de conversion de cette unité
                s'appuient sur des références métrologiques et des sources SI reconnues.
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
                  href={`/fr/categories/${categoryPage.slug}`}
                >
                  Voir les autres unités de la catégorie {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>Autres langues</h2>
            <Link
              className="text-link"
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              Ouvrir la version turque
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/units/${englishPage.slug}`}
                hrefLang="en"
              >
                Ouvrir la version anglaise
              </Link>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
