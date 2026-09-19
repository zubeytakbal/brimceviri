import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { spanishCategoryPages } from "../../../converter/localizedSpanishCategoryPages";
import { spanishConversionPages } from "../../../converter/localizedSpanishConversionPages";
import { spanishUnitPages } from "../../../converter/localizedSpanishUnitPages";
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
  basinc: "presion",
  enerji: "energia",
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
      title: "Categoria no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: unidades, tablas y calculos`,
    description: categoryPage.description,
    alternates: {
      canonical: `/es/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/es/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/es/categories/${categoryPage.slug}`),
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

  const pageUrl = buildSiteUrl(`/es/categories/${categoryPage.slug}`);

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
        name: "Categorias",
        item: buildSiteUrl("/es"),
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
      breadcrumbAriaLabel="Ruta de navegacion"
      breadcrumbs={[
        { label: "Inicio", href: "/es" },
        { label: "Categorias", href: "/es/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Categoria de unidades"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convertir todas las unidades de ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="es" />
        ),
      }}
      conversionHeading="Conversiones populares"
      conversionCountLabel={`${conversionCards.length} pares`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guias de unidades"
      unitGuidesCountLabel={`${categoryUnits.length} unidades`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/es/unit-guides/${unitPage.slug}`,
        label: `¿Que es ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Informacion detallada sobre ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Indice de la pagina">
            <strong>En esta pagina</strong>
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
                    Para mas informacion sobre la unidad {featuredUnit.name}, consulta la{" "}
                    <a href={`/es/unit-guides/${featuredUnit.slug}`}>
                      pagina de informacion de {featuredUnit.name}
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
                      <th>Simbolo</th>
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
                Las definiciones y los valores de conversion de esta pagina
                se basan en referencias metrologicas oficiales reconocidas.
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
        href: "/es/categories",
        label: "Ver todas las categorias",
      }}
    />
  );
}
