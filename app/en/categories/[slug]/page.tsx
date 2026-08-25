import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { englishCalculatorPages } from "../../../converter/localizedCalculatorPages";
import {
  englishCategoryPages,
  findEnglishCategoryPage,
} from "../../../converter/localizedCategoryPages";
import { englishConversionPages } from "../../../converter/localizedConversionPages";
import { findGermanCategoryPageByTurkishSlug } from "../../../converter/localizedGermanCategoryPages";
import { homeCategoryOrder } from "../../../converter/homeCategoryOrder";
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
import { englishUnitPages } from "../../../converter/localizedUnitPages";
import { SITE_URL, buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

const englishCategoryUnitHeadings: Record<string, string> = {
  alan: "Area units",
  hacim: "Volume units",
  uzunluk: "Length units",
  kutle: "Mass units",
  sicaklik: "Temperature units",
  zaman: "Time units",
  hiz: "Speed units",
  basinc: "Pressure units",
  enerji: "Energy and power units",
  debi: "Flow-rate units",
  elektrik: "Electrical units",
};

const englishCategoryConversionHeadings: Record<
  string,
  string
> = {
  alan: "Area conversion tools",
  hacim: "Volume conversion tools",
  uzunluk: "Length conversion tools",
  kutle: "Mass conversion tools",
  sicaklik: "Temperature conversion tools",
  zaman: "Time conversion tools",
  hiz: "Speed conversion tools",
  basinc: "Pressure conversion tools",
  enerji: "Energy and power conversion tools",
  debi: "Flow-rate conversion tools",
  elektrik: "Electrical conversion tools",
};

const englishCategoryDetailNames: Record<string, string> = {
  alan: "Area",
  hacim: "Volume",
  uzunluk: "Length",
  kutle: "Mass",
  sicaklik: "Temperature",
  zaman: "Time",
  hiz: "Speed",
  basinc: "Pressure",
  enerji: "Energy and Power",
  debi: "Flow Rate",
  elektrik: "Electricity",
};

const extendedEnglishCategoryUnitHeadings: Record<string, string> = {
  ...englishCategoryUnitHeadings,
  yogunluk: "Density units",
  kuvvet: "Force units",
  tork: "Torque units",
  momentum: "Momentum units",
  viskozite_dinamik: "Dynamic viscosity units",
  veri: "Data storage units",
  elektrik_direnc: "Resistance units",
  kapasitans: "Capacitance units",
  enduktans: "Inductance units",
  elektrik_yuk: "Electric charge units",
  altin_ayar: "Gold karat units",
};

const extendedEnglishCategoryConversionHeadings: Record<string, string> = {
  ...englishCategoryConversionHeadings,
  yogunluk: "Density conversion tools",
  kuvvet: "Force conversion tools",
  tork: "Torque conversion tools",
  momentum: "Momentum conversion tools",
  viskozite_dinamik: "Dynamic viscosity conversion tools",
  veri: "Data storage conversion tools",
  elektrik_direnc: "Resistance conversion tools",
  kapasitans: "Capacitance conversion tools",
  enduktans: "Inductance conversion tools",
  elektrik_yuk: "Electric charge conversion tools",
  altin_ayar: "Gold karat conversion tools",
};

const extendedEnglishCategoryDetailNames: Record<string, string> = {
  ...englishCategoryDetailNames,
  yogunluk: "Density",
  kuvvet: "Force",
  tork: "Torque",
  momentum: "Momentum",
  viskozite_dinamik: "Dynamic Viscosity",
  veri: "Data Storage",
  elektrik_direnc: "Resistance",
  kapasitans: "Capacitance",
  enduktans: "Inductance",
  elektrik_yuk: "Electric Charge",
  altin_ayar: "Gold Karat",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return englishCategoryPages.map((categoryPage) => ({
    slug: categoryPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findEnglishCategoryPage(slug);

  if (!categoryPage) {
    return {
      title: "Measurement category not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const germanPage = findGermanCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );

  return {
    title: categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/en/categories/${categoryPage.slug}`,
      languages: {
        tr: `/kategoriler/${categoryPage.sourceSlug}`,
        en: `/en/categories/${categoryPage.slug}`,
        ...(germanPage
          ? { de: `/de/kategorien/${germanPage.slug}` }
          : {}),
        "x-default": `/kategoriler/${categoryPage.sourceSlug}`,
      },
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/en/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: categoryPage.title,
      description: categoryPage.description,
    },
  };
}

export default async function EnglishCategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const categoryPage = findEnglishCategoryPage(slug);

  if (!categoryPage) {
    notFound();
  }

  const germanPage = findGermanCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );

  const categoryUnits = englishUnitPages.filter(
    (unitPage) =>
      unitPage.category === categoryPage.category
  );

  const categoryConversions = englishConversionPages.filter(
    (conversionPage) =>
      conversionPage.category === categoryPage.category
  );
  const categoryCalculators = englishCalculatorPages.filter(
    (calculatorPage) =>
      calculatorPage.category === categoryPage.category
  );
  const sources = getUnitSources(categoryPage.category);

  const isSecondaryCategory = !(
    homeCategoryOrder as readonly string[]
  ).includes(categoryPage.category);

  const footerLink = isSecondaryCategory
    ? {
        href: "/en/other-conversions",
        label: "Back to Other Conversions",
      }
    : {
        href: "/en/all-conversions",
        label: "Open all converters",
      };
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/en/${conversionSlug}`,
    directionLabel: (conversion) =>
      `${conversion.fromName} to ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const pageUrl = buildSiteUrl(
    `/en/categories/${categoryPage.slug}`
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildSiteUrl("/en"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: buildSiteUrl("/en/categories"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryPage.title,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: categoryPage.title,
    description: categoryPage.description,
    mainEntityOfPage: pageUrl,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
  };

  return (
    <CategoryPageLayout
      locale="en"
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
              __html: serializeJsonLd(articleSchema),
            }}
          />
        </>
      }
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        {
          label: "Home",
          href: "/en",
        },
        {
          label: "Categories",
        },
        {
          label: categoryPage.title,
        },
      ]}
      kickerLabel="Unit category"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convert all ${
          extendedEnglishCategoryDetailNames[categoryPage.category] ??
          "category"
        } units`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="en"
          />
        ),
      }}
      conversionHeading="Popular conversions"
      conversionCountLabel={`${conversionCards.length} pairs`}
      conversionCards={conversionCards}
      calculatorSection={{
        heading: `${
          extendedEnglishCategoryDetailNames[categoryPage.category] ??
          "Category"
        } calculators`,
        countLabel: `${categoryCalculators.length} tools`,
        calculators: categoryCalculators.map((calculatorPage) => ({
          slug: calculatorPage.slug,
          href: `/en/calculators/${calculatorPage.slug}`,
          label: calculatorPage.shortTitle,
          formula: calculatorPage.formula,
        })),
      }}
      unitGuidesHeading="Unit guides"
      unitGuidesCountLabel={`${categoryUnits.length} units`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/en/units/${unitPage.slug}`,
        label: `What is ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Detailed guide to ${
        extendedEnglishCategoryDetailNames[categoryPage.category] ??
        "this category"
      }`}
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
            aria-label="Page contents"
          >
            <strong>On this page</strong>

            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#section-${index + 1}`}>
                    {section.title}
                  </a>
                </li>
              ))}

              <li>
                <a href="#category-units">
                  {extendedEnglishCategoryUnitHeadings[
                    categoryPage.category
                  ] ?? "Units"}
                </a>
              </li>

              {categoryPage.category === "basinc" && (
                <>
                  <li>
                    <a href="#pressure-conversion-matrix">
                      Full conversion factor matrix
                    </a>
                  </li>

                  <li>
                    <a href="#pressure-sector-usage">
                      Which unit is used in which industry?
                    </a>
                  </li>
                </>
              )}

              <li>
                <a href="#conversion-tools">
                  {extendedEnglishCategoryConversionHeadings[
                    categoryPage.category
                  ] ?? "Conversion tools"}
                </a>
              </li>

              {sources.length > 0 && (
                <li>
                  <a href="#sources">Sources</a>
                </li>
              )}
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

            <section
              className="conversion-section"
              id="category-units"
            >
              <h2>
                {extendedEnglishCategoryUnitHeadings[
                  categoryPage.category
                ] ?? "Units"}
              </h2>

              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Symbol</th>
                      <th>Information</th>
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
                            href={`/en/units/${unitPage.slug}`}
                          >
                            View unit guide
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {categoryPage.category === "basinc" && (
              <>
                <section
                  className="conversion-section"
                  id="pressure-conversion-matrix"
                >
                  <h2>Full conversion factor matrix</h2>

                  <p>
                    Each cell shows how many units of the column
                    header equal one unit of the row header. For
                    example, the row &quot;bar&quot; crossed with the column
                    &quot;psi&quot; shows how many PSI equal one bar.
                  </p>

                  <div className="conversion-table-wrap">
                    <table className="conversion-table">
                      <thead>
                        <tr>
                          <th>1 unit ↓ / equals →</th>
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
                                  "en"
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
                  id="pressure-sector-usage"
                >
                  <h2>Which unit is used in which industry?</h2>

                  <div className="conversion-table-wrap">
                    <table className="conversion-table">
                      <thead>
                        <tr>
                          <th>Industry / context</th>
                          <th>Common unit</th>
                          <th>Notes</th>
                        </tr>
                      </thead>

                      <tbody>
                        {pressureSectorUsageOrder.map((key) => (
                          <tr key={key}>
                            <td>
                              {pressureSectorUsageLabels.en[key].sector}
                            </td>
                            <td>{pressureSectorUsageUnit[key]}</td>
                            <td>
                              {pressureSectorUsageLabels.en[key].note}
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
              className="conversion-section related-conversions"
              id="conversion-tools"
            >
              <h2>
                {extendedEnglishCategoryConversionHeadings[
                  categoryPage.category
                ] ?? "Conversion tools"}
              </h2>

              <ul className="related-conversion-list">
                {categoryConversions.map((conversionPage) => (
                  <li key={conversionPage.slug}>
                    <Link href={`/en/${conversionPage.slug}`}>
                      {conversionPage.fromName} to{" "}
                      {conversionPage.toName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {sources.length > 0 && (
              <section
                className="conversion-section unit-sources"
                id="sources"
              >
                <h2>Sources</h2>

                <p>
                  The definitions and conversion relationships on
                  this page are aligned with standard metrology and
                  SI reference material.
                </p>

                <ol>
                  {sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.organization}: {source.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="conversion-section language-alternatives">
              <h2>Other languages</h2>

              <Link
                className="text-link"
                href={`/kategoriler/${categoryPage.sourceSlug}`}
                hrefLang="tr"
              >
                View the Turkish version
              </Link>

              {germanPage && (
                <Link
                  className="text-link"
                  href={`/de/kategorien/${germanPage.slug}`}
                  hrefLang="de"
                >
                  Open the German version
                </Link>
              )}
            </section>
          </div>
        </>
      }
      footerLink={footerLink}
    />
  );
}
