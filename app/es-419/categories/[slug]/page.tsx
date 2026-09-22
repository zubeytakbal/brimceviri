import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { es419CategoryPages } from "../../../converter/localizedEs419CategoryPages";
import { es419ConversionPages } from "../../../converter/localizedEs419ConversionPages";
import { es419UnitPages } from "../../../converter/localizedEs419UnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Nombre corto para "Convertir todas las unidades de {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "longitud",
  alan: "superficie",
  hacim: "volumen",
  kutle: "masa",
  sicaklik: "temperatura",
  zaman: "tiempo",
  hiz: "velocidad",
  basinc: "presión",
  enerji: "energía",
  veri: "almacenamiento de datos",
  elektrik: "electricidad",
  altin_ayar: "quilataje del oro",
  gumus_ayar: "ley de plata",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return es419CategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return es419CategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Categoría no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: unidades, tablas y cálculos`,
    description: categoryPage.description,
    alternates: {
      canonical: `/es-419/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/es-419/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/es-419/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "es_LA",
      type: "article",
    },
  };
}

export default async function Es419CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = es419ConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/es-419/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = es419UnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Equivalente en metros"
      : categoryPage.category === "kutle"
        ? "Equivalente en kilogramos"
        : categoryPage.category === "basinc"
          ? "Equivalente en pascales"
          : "Equivalente SI";

  const tableTitle = "Tabla comparativa de unidades";

  const pageUrl = buildSiteUrl(`/es-419/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: buildSiteUrl("/es-419"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorías",
        item: buildSiteUrl("/es-419/categories"),
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
    inLanguage: "es-419",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Convertidor de ${conversion.fromName} a ${conversion.toName}`,
        url: buildSiteUrl(`/es-419/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="es-419"
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
      breadcrumbAriaLabel="Ruta de navegación"
      breadcrumbs={[
        { label: "Inicio", href: "/es-419" },
        { label: "Categorías", href: "/es-419/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Categoría de unidades"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convertir todas las unidades de ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="es-419" />
        ),
      }}
      conversionHeading="Conversiones populares"
      conversionCountLabel={`${conversionCards.length} pares`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guías de unidades"
      unitGuidesCountLabel={`${categoryUnits.length} unidades`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/es-419/unit-guides/${unitPage.slug}`,
        label: `¿Qué es ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Información detallada sobre ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Índice de la página">
            <strong>En esta página</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#categoria-seccion-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#categoria-tabla-unidades">{tableTitle}</a>
              </li>
              <li>
                <a href="#categoria-fuentes">Fuentes</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`categoria-seccion-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    Para más información sobre la unidad {featuredUnit.name}, consulta la{" "}
                    <a href={`/es-419/unit-guides/${featuredUnit.slug}`}>
                      guía de {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="categoria-tabla-unidades">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Unidad</th>
                      <th>Símbolo</th>
                      <th>{tableReferenceLabel}</th>
                      <th>Sistema</th>
                      <th>Uso habitual</th>
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

            <section className="conversion-section unit-sources" id="categoria-fuentes">
              <h2>Fuentes</h2>
              <p>
                Las definiciones y los valores de conversión de esta página
                se basan en referencias metrológicas oficiales reconocidas.
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
        href: "/es-419/categories",
        label: "Ver todas las categorías",
      }}
    />
  );
}
