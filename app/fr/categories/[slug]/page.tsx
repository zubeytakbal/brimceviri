import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { frenchCategoryPages } from "../../../converter/localizedFrenchCategoryPages";
import { frenchUnitPages } from "../../../converter/localizedFrenchUnitPages";
import { findEnglishCategoryPageByTurkishSlug } from "../../../converter/localizedCategoryPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return frenchCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return frenchCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Categorie introuvable",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/fr/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/fr/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/fr/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "fr_FR",
      type: "article",
    },
  };
}

export default async function FrenchCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const categoryUnits = frenchUnitPages.filter(
    (unitPage) => unitPage.category === categoryPage.category
  );
  const pageUrl = buildSiteUrl(`/fr/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: buildSiteUrl("/fr"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page" lang="fr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{categoryPage.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{categoryPage.title}</h1>
          <p>{categoryPage.description}</p>
        </header>

        <section className="category-article-content">
          <div className="category-article-introduction">
            {categoryPage.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <dl className="category-facts">
              {categoryPage.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {categoryPage.sections.map((section) => (
            <section
              className="conversion-section unit-long-section"
              key={section.title}
            >
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {categoryUnits.length > 0 && (
            <section className="conversion-section">
              <h2>Unites de cette categorie</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>Unite</th>
                      <th>Symbole</th>
                      <th>Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryUnits.map((unitPage) => (
                      <tr key={unitPage.slug}>
                        <td>{unitPage.name}</td>
                        <td>{unitPage.symbol}</td>
                        <td>
                          <Link
                            className="text-link"
                            href={`/fr/unit-guides/${unitPage.slug}`}
                          >
                            Voir
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>Autres langues</h2>
            <Link
              className="text-link"
              href={`/kategoriler/${categoryPage.sourceSlug}`}
              hrefLang="tr"
            >
              Türkçe versiyonu aç
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/categories/${englishPage.slug}`}
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
