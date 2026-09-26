import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import { getLocalizedUnitOptions } from "../../../converter/localizedUnitOptions";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { spanishCategoryPages } from "../../../converter/localizedSpanishCategoryPages";
import { spanishConversionPages } from "../../../converter/localizedSpanishConversionPages";
import { spanishUnitPages } from "../../../converter/localizedSpanishUnitPages";
import { spanishCategoryNamesForUnits } from "../../../converter/localizedSpanishExtraUnitPages";
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
  altin_ayar: "quilate de oro",
  gumus_ayar: "ley de la plata",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return spanishCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return spanishCategoryPages.map((page) => ({ slug: page.slug }));
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
      canonical: `/es/categorias/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/es/categorias/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/es/categorias/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function SpanishCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = spanishConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/es/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = spanishUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName =
    categoryBaseNames[categoryPage.category] ??
    spanishCategoryNamesForUnits[categoryPage.category]?.toLowerCase() ??
    categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Equivalente en metros"
      : categoryPage.category === "kutle"
        ? "Equivalente en kilogramos"
        : categoryPage.category === "basinc"
          ? "Equivalente en pascales"
          : "Equivalente SI";

  const tableTitle = "Tabla comparativa de unidades";

  const pageUrl = buildSiteUrl(`/es/categorias/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: buildSiteUrl("/es"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorías",
        item: buildSiteUrl("/es/categorias"),
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
    inLanguage: "es-ES",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Convertidor ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/es/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="es"
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
        { label: "Inicio", href: "/es" },
        { label: "Categorías", href: "/es/categorias" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Categoría de unidades"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convertir todas las unidades de ${baseName}`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="es"
            unitOptions={getLocalizedUnitOptions(categoryPage.category, "es")}
          />
        ),
      }}
      conversionHeading="Conversiones populares"
      conversionCountLabel={`${conversionCards.length} pares`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guías de unidades"
      unitGuidesCountLabel={`${categoryUnits.length} unidades`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/es/guias-de-unidades/${unitPage.slug}`,
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
                    <a href={`/es/guias-de-unidades/${featuredUnit.slug}`}>
                      página de información de {featuredUnit.name}
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
        href: "/es/categorias",
        label: "Ver todas las categorías",
      }}
    />
  );
}
