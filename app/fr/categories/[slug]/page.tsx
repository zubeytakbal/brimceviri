import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import { getLocalizedUnitOptions } from "../../../converter/localizedUnitOptions";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { frenchCategoryPages } from "../../../converter/localizedFrenchCategoryPages";
import { frenchConversionPages } from "../../../converter/localizedFrenchConversionPages";
import { frenchUnitPages } from "../../../converter/localizedFrenchUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Déjà la préposition complète (« de »/« d’ ») pour éviter les problèmes
// d’élision — s’utilise comme suffixe direct de « les unités ».
const categoryBaseNames: Record<string, string> = {
  uzunluk: "de longueur",
  alan: "de surface",
  hacim: "de volume",
  kutle: "de masse",
  sicaklik: "de température",
  zaman: "de temps",
  hiz: "de vitesse",
  basinc: "de pression",
  enerji: "d’énergie",
  veri: "de stockage de données",
  elektrik: "d’électricité",
  altin_ayar: "de carat d'or",
  gumus_ayar: "de titre d'argent",
};

// Nom complet avec article, pour "Informations detaillees sur {X}".
const categoryNameWithArticle: Record<string, string> = {
  uzunluk: "la longueur",
  alan: "la surface",
  hacim: "le volume",
  kutle: "la masse",
  sicaklik: "la température",
  zaman: "le temps",
  hiz: "la vitesse",
  basinc: "la pression",
  enerji: "l’énergie",
  veri: "le stockage de données",
  elektrik: "l’électricité",
  altin_ayar: "le carat d'or",
  gumus_ayar: "le titre d'argent",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return frenchCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return frenchCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "Catégorie introuvable",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryPage.title} : unités, tableaux et calculs`,
    description: categoryPage.description,
    alternates: {
      canonical: `/fr/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/fr/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/fr/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "fr_FR",
      type: "article",
    },
  };
}

export default async function FrenchCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryConversions = frenchConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/fr/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = frenchUnitPages.filter(
    (unit) => unit.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Équivalent en mètres"
      : categoryPage.category === "kutle"
        ? "Équivalent en kilogrammes"
        : categoryPage.category === "basinc"
          ? "Équivalent en pascals"
          : "Équivalent SI";

  const tableTitle = "Tableau comparatif des unités";

  const pageUrl = buildSiteUrl(`/fr/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: buildSiteUrl("/fr"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catégories",
        item: buildSiteUrl("/fr"),
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
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map((conversion, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Convertisseur ${conversion.fromName} – ${conversion.toName}`,
        url: buildSiteUrl(`/fr/${conversion.slug}`),
      })),
    },
  };

  return (
    <CategoryPageLayout
      locale="fr"
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
      breadcrumbAriaLabel="Fil d'Ariane"
      breadcrumbs={[
        { label: "Accueil", href: "/fr" },
        { label: "Catégories", href: "/fr/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="Catégorie d’unités"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `Convertir toutes les unités ${categoryBaseNames[categoryPage.category] ?? categoryPage.title}`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="fr"
            unitOptions={getLocalizedUnitOptions(categoryPage.category, "fr")}
          />
        ),
      }}
      conversionHeading="Conversions populaires"
      conversionCountLabel={`${conversionCards.length} paires`}
      conversionCards={conversionCards}
      unitGuidesHeading="Guides d’unités"
      unitGuidesCountLabel={`${categoryUnits.length} unités`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/fr/guides-des-unites/${unitPage.slug}`,
        label: `Qu’est-ce que ${unitPage.name} ?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`Informations détaillées sur ${categoryNameWithArticle[categoryPage.category] ?? categoryPage.title}`}
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

          <nav className="category-table-of-contents" aria-label="Sommaire de la page">
            <strong>Sur cette page</strong>
            <ol>
              {categoryPage.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#categorie-section-${index + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#categorie-tableau-unites">{tableTitle}</a>
              </li>
              <li>
                <a href="#categorie-sources">Sources</a>
              </li>
            </ol>
          </nav>

          <div className="category-article-content">
            {categoryPage.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`categorie-section-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {index === 1 && featuredUnit && (
                  <p className="category-inline-link">
                    Pour plus d’informations sur l’unité {featuredUnit.name}, consultez la{" "}
                    <a href={`/fr/guides-des-unites/${featuredUnit.slug}`}>
                      page d’information {featuredUnit.name}
                    </a>
                    .
                  </p>
                )}
              </section>
            ))}

            <section className="conversion-section" id="categorie-tableau-unites">
              <h2>{tableTitle}</h2>

              <div className="scientific-table-wrap">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th>Unité</th>
                      <th>Symbole</th>
                      <th>{tableReferenceLabel}</th>
                      <th>Système</th>
                      <th>Usage courant</th>
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

            <section className="conversion-section unit-sources" id="categorie-sources">
              <h2>Sources</h2>
              <p>
                Les définitions et les valeurs de conversion de cette page
                s’appuient sur des références métrologiques officielles reconnues.
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
        href: "/fr/categories",
        label: "Voir toutes les catégories",
      }}
    />
  );
}
