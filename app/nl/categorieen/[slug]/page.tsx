import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import { nederlandsCategoryPages } from "../../../converter/localizedNederlandsCategoryPages";
import { nederlandsConversionPages } from "../../../converter/localizedNederlandsConversionPages";
import { nederlandsUnitPages } from "../../../converter/localizedNederlandsUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return nederlandsCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return nederlandsCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const categoryPage = findBySlug((await params).slug);

  if (!categoryPage) {
    return {
      title: "Categorie niet gevonden",
      robots: { index: false, follow: false },
    };
  }

  const title = `${categoryPage.title}: eenheden, tabellen en berekeningen`;

  return {
    title,
    description: categoryPage.description,
    alternates: {
      canonical: `/nl/categorieen/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/nl/categorieen/${categoryPage.slug}`),
    },
    openGraph: {
      title,
      description: categoryPage.description,
      url: buildSiteUrl(`/nl/categorieen/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "nl_NL",
      type: "article",
    },
  };
}

export default async function NederlandsCategoryPage({ params }: PageProps) {
  const categoryPage = findBySlug((await params).slug);

  if (!categoryPage) {
    notFound();
  }

  const units = nederlandsUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );
  const conversions = nederlandsConversionPages
    .filter((conversion) => conversion.category === categoryPage.category)
    .slice(0, 24);
  const sources = getUnitSources(categoryPage.category);

  return (
    <main className="all-conversions-page" lang="nl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/nl/categorieen">Categorieën</Link>
          <span aria-hidden="true">›</span>
          <span>{categoryPage.title}</span>
        </nav>

        <header className="all-conversions-header">
          <p>Eenheidscategorie</p>
          <h1>{categoryPage.title}</h1>
          <p>{categoryPage.description}</p>
        </header>

        <section className="conversion-section">
          <h2>Eenheden omrekenen</h2>
          <CategoryUnitConverter category={categoryPage.category} locale="nl" />
        </section>

        {conversions.length > 0 && (
          <section className="conversion-section">
            <h2>Populaire omrekeningen</h2>
            <ul className="related-conversion-list">
              {conversions.map((conversion) => (
                <li key={conversion.slug}>
                  <Link href={`/nl/${conversion.slug}`}>
                    Omrekenen van {conversion.fromName} naar {conversion.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {units.length > 0 && (
          <section className="conversion-section">
            <h2>Eenhedengidsen</h2>
            <ul className="related-conversion-list">
              {units.map((unit) => (
                <li key={unit.slug}>
                  <Link href={`/nl/eenheidsgidsen/${unit.slug}`}>
                    {unit.name} ({unit.symbol})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <article className="category-article-content">
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

          {categoryPage.unitTable.length > 0 && (
            <section className="conversion-section">
              <h2>Vergelijkingstabel van eenheden</h2>
              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Eenheid</th>
                      <th>Symbool</th>
                      <th>SI-referentie</th>
                      <th>Systeem</th>
                      <th>Veelvoorkomend gebruik</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryPage.unitTable.map((unit) => (
                      <tr key={`${unit.symbol}-${unit.name}`}>
                        <td>{unit.name}</td>
                        <td>{unit.symbol}</td>
                        <td>{unit.referenceValue}</td>
                        <td>{unit.system}</td>
                        <td>{unit.commonUse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Bronnen</h2>
              <p>
                De definities en omrekenwaarden op deze pagina zijn gebaseerd
                op erkende officiële metrologische referenties.
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
        </article>

        <section className="conversion-section language-alternatives">
          <h2>Andere talen</h2>
          <Link className="text-link" href="/kategoriler" hrefLang="tr">
            Open de Turkse categorieën
          </Link>
          <Link className="text-link" href="/en/categories" hrefLang="en">
            Open de Engelse categorieën
          </Link>
        </section>
      </div>
    </main>
  );
}
