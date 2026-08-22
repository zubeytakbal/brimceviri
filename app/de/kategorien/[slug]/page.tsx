import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import {
  findGermanCategoryPage,
  germanCategoryPages,
} from "../../../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../../../converter/localizedGermanConversionPages";
import { germanUnitPages } from "../../../converter/localizedGermanUnitPages";
import { findEnglishCategoryPageByTurkishSlug } from "../../../converter/localizedCategoryPages";
import {
  formatPressureFactor,
  pressureConversionMatrix,
  pressureConversionUnits,
} from "../../../converter/pressureConversionMatrix";
import {
  pressureSectorUsageLabels,
  pressureSectorUsageOrder,
  pressureSectorUsageUnit,
} from "../../../converter/pressureSectorUsage";
import { getUnitSources } from "../../../converter/unitSources";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const germanCategoryUnitHeadings: Record<string, string> = {
  uzunluk: "Längeneinheiten",
  kutle: "Masseneinheiten",
  basinc: "Druckeinheiten",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return germanCategoryPages.map((categoryPage) => ({
    slug: categoryPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findGermanCategoryPage(slug);

  if (!categoryPage) {
    return {
      title: "Kategorie nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );

  return {
    title: categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/de/kategorien/${categoryPage.slug}`,
      languages: {
        tr: `/kategoriler/${categoryPage.sourceSlug}`,
        en: englishPage ? `/en/categories/${englishPage.slug}` : "/en",
        de: `/de/kategorien/${categoryPage.slug}`,
        "x-default": `/kategoriler/${categoryPage.sourceSlug}`,
      },
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/de/kategorien/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanCategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const categoryPage = findGermanCategoryPage(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryUnits = germanUnitPages.filter(
    (unitPage) => unitPage.category === categoryPage.category
  );
  const categoryConversions = germanConversionPages.filter(
    (conversionPage) => conversionPage.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/de/${conversionSlug}`,
    directionLabel: (conversion) =>
      `${conversion.fromName} zu ${conversion.toName}`,
    symbolSeparator: "\u2194",
    titlePairSeparator: "\u2194",
    titleSingleSeparator: "\u2192",
  });

  const sources = getUnitSources(categoryPage.category);
  const pageUrl = buildSiteUrl(`/de/kategorien/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: buildSiteUrl("/de"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategorien",
        item: buildSiteUrl("/de"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryPage.title,
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryPage.title,
    description: categoryPage.description,
    url: pageUrl,
    inLanguage: "de-DE",
  };

  return (
    <CategoryPageLayout
      locale="de"
      structuredData={
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(breadcrumbSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(collectionSchema),
            }}
          />
        </>
      }
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { label: "Startseite", href: "/de" },
        { label: "Kategorien" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Einheitenkategorie"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Alle ${
          germanCategoryUnitHeadings[categoryPage.category] ?? "Einheiten"
        } umrechnen`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="de"
          />
        ),
      }}
      conversionHeading="Beliebte Umrechnungen"
      conversionCountLabel={`${conversionCards.length} Paare`}
      conversionCards={conversionCards}
      unitGuidesHeading="Einheitenleitfäden"
      unitGuidesCountLabel={`${categoryUnits.length} Einheiten`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/de/einheiten/${unitPage.slug}`,
        label: `Was ist ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Kurz erklärt: ${categoryPage.title.toLowerCase()}`}
      detailContent={
        <>
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

          <nav
            className="category-table-of-contents"
            aria-label="Seiteninhalt"
          >
            <strong>Auf dieser Seite</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#section-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              {categoryPage.category === "basinc" && (
                <>
                  <li>
                    <a href="#druck-umrechnungsmatrix">
                      Vollständige Umrechnungsfaktor-Matrix
                    </a>
                  </li>

                  <li>
                    <a href="#druck-branchennutzung">
                      Welche Einheit wird in welcher Branche verwendet?
                    </a>
                  </li>
                </>
              )}

              <li>
                <a href="#sources">Quellen</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`section-${index + 1}`}
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
                <h2>Einheiten dieser Kategorie</h2>
                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th>Einheit</th>
                        <th>Symbol</th>
                        <th>Leitfaden</th>
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
                              href={`/de/einheiten/${unitPage.slug}`}
                            >
                              Öffnen
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {categoryPage.category === "basinc" && (
              <>
                <section
                  className="conversion-section"
                  id="druck-umrechnungsmatrix"
                >
                  <h2>Vollständige Umrechnungsfaktor-Matrix</h2>

                  <p>
                    Jede Zelle zeigt, wie viele Einheiten der
                    Spaltenüberschrift einer Einheit der Zeile
                    entsprechen. Die Zeile &quot;bar&quot; gekreuzt mit der
                    Spalte &quot;psi&quot; zeigt zum Beispiel, wie viele psi
                    einem bar entsprechen.
                  </p>

                  <div className="conversion-table-wrap">
                    <table className="conversion-table">
                      <thead>
                        <tr>
                          <th>1 Einheit ↓ / entspricht →</th>
                          {pressureConversionUnits.map((unit) => (
                            <th key={unit}>{unit}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {pressureConversionMatrix.map((row) => (
                          <tr key={row.unit}>
                            <td>
                              <strong>{row.unit}</strong>
                            </td>
                            {pressureConversionUnits.map((unit) => (
                              <td key={unit}>
                                {formatPressureFactor(
                                  row.values[unit],
                                  "de"
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section
                  className="conversion-section"
                  id="druck-branchennutzung"
                >
                  <h2>
                    Welche Einheit wird in welcher Branche verwendet?
                  </h2>

                  <div className="conversion-table-wrap">
                    <table className="conversion-table">
                      <thead>
                        <tr>
                          <th>Branche / Kontext</th>
                          <th>Übliche Einheit</th>
                          <th>Hinweis</th>
                        </tr>
                      </thead>

                      <tbody>
                        {pressureSectorUsageOrder.map((key) => (
                          <tr key={key}>
                            <td>
                              {pressureSectorUsageLabels.de[key].sector}
                            </td>
                            <td>{pressureSectorUsageUnit[key]}</td>
                            <td>
                              {pressureSectorUsageLabels.de[key].note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}

            <section
              className="conversion-section unit-sources"
              id="sources"
            >
              <h2>Quellen</h2>
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
          </div>
        </>
      }
      footerLink={{
        href: "/de",
        label: "Zur deutschen Startseite",
      }}
    />
  );
}
