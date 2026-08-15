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
import { englishUnitPages } from "../../../converter/localizedUnitPages";
import { SITE_URL, buildSiteUrl } from "../../../siteConfig";
import PressureReferenceTable from "../../../components/technicalReferences/PressureReferenceTable";

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

  return {
    title: categoryPage.title,
    description: categoryPage.description,

    alternates: {
      canonical: `/en/categories/${categoryPage.slug}`,
      languages: {
        tr: `/kategoriler/${categoryPage.sourceSlug}`,
        en: `/en/categories/${categoryPage.slug}`,
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
          englishCategoryDetailNames[categoryPage.category] ??
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
          englishCategoryDetailNames[categoryPage.category] ??
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
        englishCategoryDetailNames[categoryPage.category] ??
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
                  {englishCategoryUnitHeadings[
                    categoryPage.category
                  ] ?? "Units"}
                </a>
              </li>

              <li>
                <a href="#conversion-tools">
                  {englishCategoryConversionHeadings[
                    categoryPage.category
                  ] ?? "Conversion tools"}
                </a>
              </li>

              {categoryPage.category === "basinc" ? (
                <li>
                  <a href="#pressure-reference-table">
                    Pressure-unit reference table
                  </a>
                </li>
              ) : null}
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
                {englishCategoryUnitHeadings[
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

            <section
              className="conversion-section related-conversions"
              id="conversion-tools"
            >
              <h2>
                {englishCategoryConversionHeadings[
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

            {categoryPage.category === "basinc" ? (
              <section
                className="conversion-section"
                id="pressure-reference-table"
              >
                <PressureReferenceTable locale="en" />
              </section>
            ) : null}

            <section className="conversion-section language-alternatives">
              <h2>Other languages</h2>

              <Link
                className="text-link"
                href={`/kategoriler/${categoryPage.sourceSlug}`}
                hrefLang="tr"
              >
                View the Turkish version
              </Link>
            </section>
          </div>
        </>
      }
      footerLink={{
        href: "/en/all-conversions",
        label: "Open all converters",
      }}
    />
  );
}
