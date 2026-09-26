import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import { getLocalizedUnitOptions } from "../../../converter/localizedUnitOptions";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { norwegianCategoryPages } from "../../../converter/localizedNorwegianCategoryPages";
import { norwegianConversionPages } from "../../../converter/localizedNorwegianConversionPages";
import { norwegianUnitPages } from "../../../converter/localizedNorwegianUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Kort navn for "Regn om alle enheter for {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "lengde",
  alan: "areal",
  hacim: "volum",
  kutle: "masse",
  sicaklik: "temperatur",
  zaman: "tid",
  hiz: "hastighet",
  basinc: "trykk",
  enerji: "energi",
  veri: "datalagring",
  elektrik: "elektrisitet",
  altin_ayar: "gullkarat",
  gumus_ayar: "sølvinnhold",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return norwegianCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return norwegianCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Kategori ikke funnet",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: enheter, tabeller og beregninger`,
    description: categoryPage.description,
    alternates: {
      canonical: `/no/kategorier/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/no/kategorier/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/no/kategorier/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "nb_NO",
      type: "article",
    },
  };
}

export default async function NorwegianCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = norwegianConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/no/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = norwegianUnitPages.filter(
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

  const tableTitle = "Sammenligningstabell for enheter";

  const pageUrl = buildSiteUrl(`/no/kategorier/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: buildSiteUrl("/no"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategorier",
        item: buildSiteUrl("/no"),
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
    inLanguage: "no",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Omregner ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/no/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="no"
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
      breadcrumbAriaLabel="Sidenavigering"
      breadcrumbs={[
        { label: "Hjem", href: "/no" },
        { label: "Kategorier", href: "/no/kategorier" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Enhetskategori"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Regn om alle enheter for ${baseName}`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="no"
            unitOptions={getLocalizedUnitOptions(categoryPage.category, "no")}
          />
        ),
      }}
      conversionHeading="Populære omregninger"
      conversionCountLabel={`${conversionCards.length} par`}
      conversionCards={conversionCards}
      unitGuidesHeading="Enhetsguider"
      unitGuidesCountLabel={`${categoryUnits.length} enheter`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/no/enhetsguider/${unitPage.slug}`,
        label: `Hva er ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Detaljert informasjon om ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Sidens innhold">
            <strong>På denne siden</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#kategori-avsnitt-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#kategori-enhetstabell">{tableTitle}</a>
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
                id={`kategori-avsnitt-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    For mer informasjon om enheten {featuredUnit.name}, se{" "}
                    <a href={`/no/enhetsguider/${featuredUnit.slug}`}>
                      informasjonssiden for {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="kategori-enhetstabell">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Enhet</th>
                      <th>Symbol</th>
                      <th>{tableReferenceLabel}</th>
                      <th>System</th>
                      <th>Vanlig bruk</th>
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
                Definisjonene og omregningsverdiene på denne siden bygger
                på anerkjente offisielle metrologiske referanser.
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
        href: "/no/kategorier",
        label: "Se alle kategorier",
      }}
    />
  );
}
