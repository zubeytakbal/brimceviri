import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portugueseUnitPages } from "../../../converter/localizedPortugueseUnitPages";
import { portugueseCategoryPages } from "../../../converter/localizedPortugueseCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
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
      title: "Unidade nao encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/pt/unit-guides/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/pt/unit-guides/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/pt/unit-guides/${unitPage.slug}`),
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
  const categoryPage = portugueseCategoryPages.find(
    (category) => category.category === unitPage.category
  );

  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegacao">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/pt/categories/${categoryPage.slug}`}>
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
            <h2>Uso</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/pt/categories/${categoryPage.slug}`}
                >
                  Ver as demais unidades da categoria {categoryPage.title}
                </Link>
              </p>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>Outros idiomas</h2>
            <Link
              className="text-link"
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              Türkçe versiyonu aç
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
