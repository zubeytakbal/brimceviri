import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { portugueseCategoryPages } from "../../../converter/localizedPortugueseCategoryPages";
import { portugueseConversionPages } from "../../../converter/localizedPortugueseConversionPages";
import { portugueseUnitPages } from "../../../converter/localizedPortugueseUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Nome curto para "Converter todas as unidades de {X}".
const categoryBaseNames: Record<string, string> = {
  uzunluk: "comprimento",
  alan: "área",
  hacim: "volume",
  kutle: "massa",
  sicaklik: "temperatura",
  zaman: "tempo",
  hiz: "velocidade",
  basinc: "pressão",
  enerji: "energia",
  veri: "armazenamento de dados",
  elektrik: "eletricidade",
  altin_ayar: "quilate de ouro",
  gumus_ayar: "teor de prata",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return portugueseCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return portugueseCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Categoria não encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title}: unidades, tabelas e cálculos`,
    description: categoryPage.description,
    alternates: {
      canonical: `/pt/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/pt/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/pt/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function PortugueseCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = portugueseConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/pt/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = portugueseUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Equivalente em metros"
      : categoryPage.category === "kutle"
        ? "Equivalente em quilogramas"
        : categoryPage.category === "basinc"
          ? "Equivalente em pascals"
          : "Equivalente SI";

  const tableTitle = "Tabela comparativa de unidades";

  const pageUrl = buildSiteUrl(`/pt/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: buildSiteUrl("/pt"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorias",
        item: buildSiteUrl("/pt"),
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
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Conversor ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/pt/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="pt"
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
      breadcrumbAriaLabel="Trilha de navegação"
      breadcrumbs={[
        { label: "Início", href: "/pt" },
        { label: "Categorias", href: "/pt/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Categoria de unidades"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Converter todas as unidades de ${baseName}`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="pt" />
        ),
      }}
      conversionHeading="Conversões populares"
      conversionCountLabel={`${conversionCards.length} pares`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guias de unidades"
      unitGuidesCountLabel={`${categoryUnits.length} unidades`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/pt/unit-guides/${unitPage.slug}`,
        label: `O que é ${unitPage.name}?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Informações detalhadas sobre ${baseName}`}
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

          <nav className="category-table-of-contents" aria-label="Índice da página">
            <strong>Nesta página</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#categoria-secao-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#categoria-tabela-unidades">{tableTitle}</a>
              </li>
              <li>
                <a href="#categoria-fontes">Fontes</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`categoria-secao-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    Para mais informações sobre a unidade {featuredUnit.name}, consulte a{" "}
                    <a href={`/pt/unit-guides/${featuredUnit.slug}`}>
                      página de informações de {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="categoria-tabela-unidades">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Unidade</th>
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

            <section className="conversion-section unit-sources" id="categoria-fontes">
              <h2>Fontes</h2>
              <p>
                As definições e os valores de conversão desta página se
                baseiam em referências metrológicas oficiais reconhecidas.
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
        href: "/pt/categories",
        label: "Ver todas as categorias",
      }}
    />
  );
}
