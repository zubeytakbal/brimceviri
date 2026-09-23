import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { swedishCategoryPages } from "../../../converter/localizedSwedishCategoryPages";
import { swedishConversionPages } from "../../../converter/localizedSwedishConversionPages";
import { swedishUnitPages } from "../../../converter/localizedSwedishUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Kort namn for "Omvandla alla enheter for {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "langd",
  alan: "area",
  hacim: "volym",
  kutle: "massa",
  sicaklik: "temperatur",
  zaman: "tid",
  hiz: "hastighet",
  basinc: "tryck",
  enerji: "energi",
  veri: "datalagring",
  elektrik: "elektricitet",
  altin_ayar: "guldkarat",
  gumus_ayar: "silverhalt",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return swedishCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return swedishCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Kategori hittades inte",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: enheter, tabeller och berakningar`,
    description: categoryPage.description,
    alternates: {
      canonical: `/sv/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/sv/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/sv/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "sv_SE",
      type: "article",
    },
  };
}

export default async function SwedishCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = swedishConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/sv/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = swedishUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Motsvarighet i meter"
      : categoryPage.category === "kutle"
        ? "Motsvarighet i kilogram"
        : categoryPage.category === "basinc"
          ? "Motsvarighet i pascal"
          : "SI-motsvarighet";

  const tableTitle = "Jamforelsetabell for enheter";

  const pageUrl = buildSiteUrl(`/sv/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: buildSiteUrl("/sv"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategorier",
        item: buildSiteUrl("/sv"),
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
    inLanguage: "sv",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Omvandlare ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/sv/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="sv"
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
      breadcrumbAriaLabel="Sidnavigering"
      breadcrumbs={[
        { label: "Hem", href: "/sv" },
        { label: "Kategorier", href: "/sv/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Enhetskategori"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Omvandla alla enheter for ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="sv" />
        ),
      }}
      conversionHeading="Populara omvandlingar"
      conversionCountLabel={`${conversionCards.length} par`}
      conversionCards={conversionCards}
      unitGuidesHeading="Enhetsguider"
      unitGuidesCountLabel={`${categoryUnits.length} enheter`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/sv/unit-guides/${unitPage.slug}`,
        label: `Vad ar ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Detaljerad information om ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Sidans innehall">
            <strong>Pa denna sida</strong>
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
                <a href="#kategori-kallor">Kallor</a>
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
                    For mer information om enheten {featuredUnit.name}, se{" "}
                    <a href={`/sv/unit-guides/${featuredUnit.slug}`}>
                      informationssidan for {featuredUnit.name}
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
                      <th>Vanlig anvandning</th>
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

            <section className="conversion-section unit-sources" id="kategori-kallor">
              <h2>Kallor</h2>
              <p>
                Definitionerna och omvandlingsvardena pa denna sida bygger
                pa erkanda officiella metrologiska referenser.
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
        href: "/sv/categories",
        label: "Se alla kategorier",
      }}
    />
  );
}
