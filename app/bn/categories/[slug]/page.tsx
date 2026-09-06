import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bengaliCategoryPages } from "../../../converter/localizedBengaliCategoryPages";
import { bengaliUnitPages } from "../../../converter/localizedBengaliUnitPages";
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
  return bengaliCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return bengaliCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "বিভাগ পাওয়া যায়নি",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/bn/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/bn/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/bn/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "bn_BD",
      type: "article",
    },
  };
}

export default async function BengaliCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const categoryUnits = bengaliUnitPages.filter(
    (unitPage) => unitPage.category === categoryPage.category
  );
  const pageUrl = buildSiteUrl(`/bn/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: buildSiteUrl("/bn"),
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
    <main className="all-conversions-page" lang="bn">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
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
              <h2>এই বিভাগের একক</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>একক</th>
                      <th>প্রতীক</th>
                      <th>গাইড</th>
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
                            href={`/bn/unit-guides/${unitPage.slug}`}
                          >
                            দেখুন
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
            <h2>অন্যান্য ভাষা</h2>
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
