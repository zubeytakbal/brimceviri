import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { italianUnitPages } from "../../../converter/localizedItalianUnitPages";
import { italianCategoryPages } from "../../../converter/localizedItalianCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { unitPages } from "../../../converter/unitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return italianUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return italianUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Unità non trovata",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/it/guide-alle-unita/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/it/guide-alle-unita/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/it/guide-alle-unita/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "it_IT",
      type: "article",
    },
  };
}

export default async function ItalianUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const hasTurkishPage = unitPages.some((turkishPage) => turkishPage.slug === unitPage.sourceSlug);
  const categoryPage = italianCategoryPages.find(
    (category) => category.category === unitPage.category
  );
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="it">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Percorso di navigazione">
          <Link href="/it">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/it/categorie/${categoryPage.slug}`}>
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
              <dt>Simbolo</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>Sistema di misura</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>Equivalente SI</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Storia</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Utilizzo</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Fonti</h2>
              <p>
                Le definizioni e le relazioni di conversione di questa unità
                seguono riferimenti metrologici e fonti SI riconosciuti.
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
                  href={`/it/categorie/${categoryPage.slug}`}
                >
                  Vedi le altre unità della categoria {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          {(hasTurkishPage || englishPage) && (
            <section className="conversion-section language-alternatives">
              <h2>Altre lingue</h2>
              {hasTurkishPage && (
                <Link
                  className="text-link"
                  href={`/birimler/${unitPage.sourceSlug}`}
                  hrefLang="tr"
                >
                  Apri la versione turca
                </Link>
              )}
              {englishPage && (
                <Link
                  className="text-link"
                  href={`/en/units/${englishPage.slug}`}
                  hrefLang="en"
                >
                  Apri la versione inglese
                </Link>
              )}
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
