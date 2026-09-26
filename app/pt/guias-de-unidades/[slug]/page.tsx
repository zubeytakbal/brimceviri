import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portugueseUnitPages } from "../../../converter/localizedPortugueseUnitPages";
import { portugueseCategoryPages } from "../../../converter/localizedPortugueseCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { unitPages } from "../../../converter/unitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return portugueseUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return portugueseUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Unidade não encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/pt/guias-de-unidades/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/pt/guias-de-unidades/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/pt/guias-de-unidades/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function PortugueseUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const hasTurkishPage = unitPages.some((turkishPage) => turkishPage.slug === unitPage.sourceSlug);
  const categoryPage = portugueseCategoryPages.find(
    (category) => category.category === unitPage.category
  );
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/pt/categorias/${categoryPage.slug}`}>
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
            <h2>História</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Uso</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Fontes</h2>
              <p>
                As definições e relações de conversão desta unidade seguem
                referências metrológicas e fontes reconhecidas do SI.
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
                  href={`/pt/categorias/${categoryPage.slug}`}
                >
                  Ver as demais unidades da categoria {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          {(hasTurkishPage || englishPage) && (
            <section className="conversion-section language-alternatives">
              <h2>Outros idiomas</h2>
              {hasTurkishPage && (
                <Link
                  className="text-link"
                  href={`/birimler/${unitPage.sourceSlug}`}
                  hrefLang="tr"
                >
                  Abrir a versão em turco
                </Link>
              )}
              {englishPage && (
                <Link
                  className="text-link"
                  href={`/en/units/${englishPage.slug}`}
                  hrefLang="en"
                >
                  Abrir a versão em inglês
                </Link>
              )}
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
