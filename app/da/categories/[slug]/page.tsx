import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { danishCategoryPages } from "../../../converter/localizedDanishCategoryPages";
import { danishConversionPages } from "../../../converter/localizedDanishConversionPages";
import { danishUnitPages } from "../../../converter/localizedDanishUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Korte navne til "Omregn alle enheder for {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "længde",
  alan: "areal",
  hacim: "rumfang",
  kutle: "masse",
  sicaklik: "temperatur",
  zaman: "tid",
  hiz: "hastighed",
  basinc: "tryk",
  enerji: "energi",
  veri: "datalagring",
  elektrik: "elektricitet",
  altin_ayar: "guldkarat",
  gumus_ayar: "sølvindhold",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return danishCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return danishCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Kategorien blev ikke fundet",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: enheder, tabeller og beregninger`,
    description: categoryPage.description,
    alternates: {
      canonical: `/da/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/da/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/da/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "da_DK",
      type: "article",
    },
  };
}

export default async function DanishCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = danishConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/da/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = danishUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Tilsvarende i meter"
      : categoryPage.category === "kutle"
        ? "Tilsvarende i kilogram"
        : categoryPage.category === "basinc"
          ? "Tilsvarende i pascal"
          : "SI-ekvivalent";

  const tableTitle = "Sammenligningstabel for enheder";

  const pageUrl = buildSiteUrl(`/da/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: buildSiteUrl("/da"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategorier",
        item: buildSiteUrl("/da"),
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
    inLanguage: "da",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Omregner ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/da/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="da"
      structuredData={
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }}
          />
        </>
      }
      breadcrumbAriaLabel="Sidenavigation"
      breadcrumbs={[
        { label: "Hjem", href: "/da" },
        { label: "Kategorier", href: "/da/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Enhedskategori"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Omregn alle enheder for ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="da" />
        ),
      }}
      conversionHeading="Populære omregninger"
      conversionCountLabel={`${conversionCards.length} par`}
      conversionCards={conversionCards}
      unitGuidesHeading="Enhedsguider"
      unitGuidesCountLabel={`${categoryUnits.length} enheder`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/da/unit-guides/${unitPage.slug}`,
        label: `Hvad er ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Detaljeret information om ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Sidens indhold">
            <strong>På denne side</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#kategori-afsnit-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#kategori-enhedstabel">{tableTitle}</a>
              </li>
              <li>
                <a href="#kategori-kilder">Kilder</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`kategori-afsnit-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    For mere information om enheden {featuredUnit.name}, se{" "}
                    <a href={`/da/unit-guides/${featuredUnit.slug}`}>
                      informationssiden for {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="kategori-enhedstabel">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Enhed</th>
                      <th>Symbol</th>
                      <th>{tableReferenceLabel}</th>
                      <th>System</th>
                      <th>Almindelig anvendelse</th>
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

            <section className="conversion-section unit-sources" id="kategori-kilder">
              <h2>Kilder</h2>
              <p>
                Definitionerne og omregningsværdierne på denne side bygger
                på anerkendte officielle metrologiske referencer.
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
          </div>
        </>
      }
      footerLink={{
        href: "/da/categories",
        label: "Se alle kategorier",
      }}
    />
  );
}
