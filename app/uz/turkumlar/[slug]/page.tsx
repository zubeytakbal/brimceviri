import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uzbekCategoryPages } from "../../../converter/localizedUzbekCategoryPages";
import { uzbekUnitPages } from "../../../converter/localizedUzbekUnitPages";
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
  return uzbekCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return uzbekCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Turkum topilmadi",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/uz/turkumlar/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/uz/turkumlar/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/uz/turkumlar/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const categoryUnits = uzbekUnitPages.filter(
    (unitPage) => unitPage.category === categoryPage.category
  );
  const pageUrl = buildSiteUrl(`/uz/turkumlar/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: buildSiteUrl("/uz"),
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
    <main className="all-conversions-page" lang="uz">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
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
            <section className="conversion-section unit-long-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {categoryUnits.length > 0 && (
            <section className="conversion-section">
              <h2>Ushbu turkumdagi birliklar</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>Birlik</th>
                      <th>Belgi</th>
                      <th>Qo'llanma</th>
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
                            href={`/uz/birliklar/${unitPage.slug}`}
                          >
                            Ochish
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
            <h2>Boshqa tillar</h2>
            <Link
              className="text-link"
              href={`/kategoriler/${categoryPage.sourceSlug}`}
              hrefLang="tr"
            >
              Turkcha versiyani ochish
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
