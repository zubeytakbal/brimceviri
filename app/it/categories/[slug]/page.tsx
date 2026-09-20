import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { italianCategoryPages } from "../../../converter/localizedItalianCategoryPages";
import { italianConversionPages } from "../../../converter/localizedItalianConversionPages";
import { italianUnitPages } from "../../../converter/localizedItalianUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Nome breve per "Convertire tutte le unità di {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "lunghezza",
  alan: "area",
  hacim: "volume",
  kutle: "massa",
  sicaklik: "temperatura",
  zaman: "tempo",
  hiz: "velocità",
  basinc: "pressione",
  enerji: "energia",
  veri: "archiviazione dati",
  elektrik: "elettricità",
  altin_ayar: "caratura oro",
  gumus_ayar: "titolo argento",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return italianCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return italianCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Categoria non trovata",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: unità, tabelle e calcoli`,
    description: categoryPage.description,
    alternates: {
      canonical: `/it/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/it/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/it/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "it_IT",
      type: "article",
    },
  };
}

export default async function ItalianCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = italianConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/it/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = italianUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Equivalente in metri"
      : categoryPage.category === "kutle"
        ? "Equivalente in chilogrammi"
        : categoryPage.category === "basinc"
          ? "Equivalente in pascal"
          : "Equivalente SI";

  const tableTitle = "Tabella comparativa delle unità";

  const pageUrl = buildSiteUrl(`/it/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildSiteUrl("/it"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorie",
        item: buildSiteUrl("/it"),
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
    inLanguage: "it",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Convertitore ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/it/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="it"
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
      breadcrumbAriaLabel="Percorso di navigazione"
      breadcrumbs={[
        { label: "Home", href: "/it" },
        { label: "Categorie", href: "/it/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Categoria di unità"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convertire tutte le unità di ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="it" />
        ),
      }}
      conversionHeading="Conversioni popolari"
      conversionCountLabel={`${conversionCards.length} coppie`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guide alle unità"
      unitGuidesCountLabel={`${categoryUnits.length} unità`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/it/unit-guides/${unitPage.slug}`,
        label: `Cos'è ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Informazioni dettagliate su ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Indice della pagina">
            <strong>In questa pagina</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#categoria-sezione-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#categoria-tabella-unita">{tableTitle}</a>
              </li>
              <li>
                <a href="#categoria-fonti">Fonti</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`categoria-sezione-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    Per maggiori informazioni sull'unità {featuredUnit.name}, consulta la{" "}
                    <a href={`/it/unit-guides/${featuredUnit.slug}`}>
                      pagina informativa di {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="categoria-tabella-unita">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Unità</th>
                      <th>Simbolo</th>
                      <th>{tableReferenceLabel}</th>
                      <th>Sistema</th>
                      <th>Uso comune</th>
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

            <section className="conversion-section unit-sources" id="categoria-fonti">
              <h2>Fonti</h2>
              <p>
                Le definizioni e i valori di conversione di questa pagina si
                basano su riferimenti metrologici ufficiali riconosciuti.
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
        href: "/it/categories",
        label: "Vedi tutte le categorie",
      }}
    />
  );
}
