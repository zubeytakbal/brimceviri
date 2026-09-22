import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uzbekCategoryPages } from "../../../converter/localizedUzbekCategoryPages";
import { uzbekConversionPages } from "../../../converter/localizedUzbekConversionPages";
import { uzbekUnitPages } from "../../../converter/localizedUzbekUnitPages";
import { findEnglishCategoryPageByTurkishSlug } from "../../../converter/localizedCategoryPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import { hasUzbekUnitLabels } from "../../../components/categoryUnitOptions";
import { createConversionCards } from "../../../components/categoryPageUtils";

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
  const categoryConversions = uzbekConversionPages.filter(
    (page) => page.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (slug) => `/uz/${slug}`,
    directionLabel: (conversion) =>
      `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });
  const showLiveConverter = hasUzbekUnitLabels(categoryPage.category);
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
        name: "Turkumlar",
        item: buildSiteUrl("/uz/turkumlar"),
      },
      {
        "@type": "ListItem",
        position: 3,
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

      <div className="category-page-shell category-page-breadcrumb-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/turkumlar">Turkumlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{categoryPage.title}</span>
        </nav>
      </div>

      <section className="category-page-hero">
        <div
          className={`category-page-hero-grid${
            showLiveConverter ? " has-converter" : ""
          }`}
        >
          <header className="category-page-header">
            <p className="category-page-kicker">Birlik turkumi</p>
            <h1>{categoryPage.title}</h1>
            <p>{categoryPage.description}</p>
          </header>

          {showLiveConverter && (
            <div className="category-page-hero-panel">
              <div className="category-page-hero-panel-heading">
                <h2>
                  Barcha {categoryPage.title.replace(
                    " Birliklarini O'zgartirish",
                    "",
                  )}{" "}
                  birliklarini aylantiring
                </h2>
              </div>
              <CategoryUnitConverter
                category={categoryPage.category}
                locale="uz"
              />
            </div>
          )}
        </div>
      </section>

      <div className="category-page-shell category-page-content-shell">
        {conversionCards.length > 0 && (
          <section className="category-page-section">
            <div className="category-section-heading">
              <h2>Mashhur aylantirishlar</h2>
              <span>{conversionCards.length} juft</span>
            </div>

            <ul className="category-conversion-list">
              {conversionCards.map((conversionCard) => (
                <li key={conversionCard.key}>
                  <article className="category-conversion-card">
                    <div className="category-conversion-copy">
                      <h3 className="category-conversion-title">
                        {conversionCard.title}
                      </h3>
                      <p>{conversionCard.symbol}</p>
                    </div>

                    <div className="category-conversion-actions">
                      {conversionCard.links.map((link) => (
                        <Link href={link.href} key={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}

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
                      <th>Qo&apos;llanma</th>
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
                Inglizcha versiyasini ochish
              </Link>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
