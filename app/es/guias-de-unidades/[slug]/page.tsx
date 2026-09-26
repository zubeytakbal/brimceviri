import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { spanishUnitPages } from "../../../converter/localizedSpanishUnitPages";
import { spanishCategoryPages } from "../../../converter/localizedSpanishCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return spanishUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return spanishUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Unidad no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/es/guias-de-unidades/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/es/guias-de-unidades/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/es/guias-de-unidades/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function SpanishUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const categoryPage = spanishCategoryPages.find(
    (category) => category.category === unitPage.category
  );
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="es">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/es/categorias/${categoryPage.slug}`}>
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
              <dt>Símbolo</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>Sistema de medida</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>Equivalente SI</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Historia</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Usos habituales</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Fuentes</h2>
              <p>
                Las definiciones y relaciones de conversión de esta unidad se
                basan en referencias metrológicas y fuentes del SI reconocidas.
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
                  href={`/es/categorias/${categoryPage.slug}`}
                >
                  Ver las demás unidades de la categoría {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>Otros idiomas</h2>
            <Link
              className="text-link"
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              Abrir la versión en turco
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/units/${englishPage.slug}`}
                hrefLang="en"
              >
                Abrir la versión en inglés
              </Link>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
