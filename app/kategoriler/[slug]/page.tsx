import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { createConversionCards } from "../../components/categoryPageUtils";
import {
  findCategoryArticle,
} from "../../converter/categoryArticles";
import { calculatorPages } from "../../converter/calculatorPages";
import {
  categoryPages,
} from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { findEnglishCategoryPageByTurkishSlug } from "../../converter/localizedCategoryPages";
import {
  getUnitSources,
} from "../../converter/unitSources";
import { unitPages } from "../../converter/unitPages";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryBaseNames: Record<string, string> = {
  uzunluk: "Uzunluk",
  kutle: "Kütle",
  basinc: "Basınç",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return categoryPages.map((categoryPage) => ({
    slug: categoryPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const categoryPage = categoryPages.find(
    (page) => page.slug === slug
  );

  if (!categoryPage) {
    return {
      title: "Kategori bulunamadı",
    };
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.slug
  );

  return {
    title: `${categoryPage.title}: Birimler, Tablolar ve Hesaplamalar`,
    description: categoryPage.description,
    alternates: {
      canonical: `/kategoriler/${categoryPage.slug}`,
      languages: englishPage
        ? {
            tr: `/kategoriler/${categoryPage.slug}`,
            en: `/en/categories/${englishPage.slug}`,
            "x-default": `/kategoriler/${categoryPage.slug}`,
          }
        : undefined,
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/kategoriler/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const categoryPage = categoryPages.find(
    (page) => page.slug === slug
  );

  if (!categoryPage) {
    notFound();
  }

  const categoryArticle = findCategoryArticle(categoryPage.slug);

  const categoryConversions = conversionPages.filter(
    (conversion) =>
      conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/${conversionSlug}`,
    directionLabel: (conversion) =>
      `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = unitPages.filter(
    (unit) => unit.category === categoryPage.category
  );
  const categoryCalculators = calculatorPages.filter(
    (calculator) =>
      calculator.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];

  const tableReferenceLabel =
    categoryPage.category === "uzunluk"
      ? "Metre karşılığı"
      : categoryPage.category === "kutle"
        ? "Kilogram karşılığı"
        : categoryPage.category === "basinc"
          ? "Pascal karşılığı"
          : "SI karşılığı";

  const tableTitle =
    categoryPage.category === "uzunluk"
      ? "Uzunluk birimleri karşılaştırma tablosu"
      : categoryPage.category === "kutle"
        ? "Kütle birimleri karşılaştırma tablosu"
        : categoryPage.category === "basinc"
          ? "Basınç birimleri karşılaştırma tablosu"
          : "Birim karşılaştırma tablosu";

  const detailHeading = `${
    categoryBaseNames[categoryPage.category] ??
    categoryPage.title.replace(" Dönüşümleri", "")
  } hakkında ayrıntılı bilgi`;

  const pageUrl = buildSiteUrl(
    `/kategoriler/${categoryPage.slug}`
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategoriler",
        item: buildSiteUrl("/"),
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
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryConversions.length,
      itemListElement: categoryConversions.map(
        (conversion, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name:
            `${conversion.fromName} – ` +
            `${conversion.toName} Çevirici`,
          url: buildSiteUrl(`/${conversion.slug}`),
        })
      ),
    },
  };

  return (
    <CategoryPageLayout
      locale="tr"
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
              __html: serializeJsonLd(collectionSchema),
            }}
          />
        </>
      }
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        {
          label: "Ana Sayfa",
          href: "/",
        },
        {
          label: "Kategoriler",
        },
        {
          label: categoryPage.title,
        },
      ]}
      kickerLabel="Birim kategorisi"
      title={categoryPage.title}
      description={categoryPage.description}
      conversionHeading="Dönüşüm aracını seçin"
      conversionCountLabel={`${conversionCards.length} çift`}
      conversionCards={conversionCards}
      calculatorSection={{
        heading: `${
          categoryBaseNames[categoryPage.category] ??
          categoryPage.title.replace(" Dönüşümleri", "")
        } hesaplayıcıları`,
        countLabel: `${categoryCalculators.length} araç`,
        calculators: categoryCalculators.map((calculator) => ({
          slug: calculator.slug,
          href: `/hesaplayicilar/${calculator.slug}`,
          label: calculator.shortTitle,
          formula: calculator.formula,
        })),
      }}
      unitGuidesHeading="Birim rehberleri"
      unitGuidesCountLabel={`${categoryUnits.length} birim`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/birimler/${unitPage.slug}`,
        label: `${unitPage.name} nedir?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={detailHeading}
      detailContent={
        <>
          {categoryArticle && (
            <>
              <div className="category-article-introduction">
                {categoryArticle.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <dl className="category-facts">
                  {categoryArticle.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <nav
                className="category-table-of-contents"
                aria-label="Sayfa içeriği"
              >
                <strong>Bu sayfada</strong>

                <ol>
                  {categoryArticle.sections.map(
                    (section, index) => (
                      <li key={section.title}>
                        <a
                          href={`#kategori-bolum-${
                            index + 1
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    )
                  )}

                  <li>
                    <a href="#kategori-birimleri-tablosu">
                      {tableTitle}
                    </a>
                  </li>

                  <li>
                    <a href="#kategori-kaynaklari">
                      Kaynaklar
                    </a>
                  </li>
                </ol>
              </nav>

              <div className="category-article-content">
                {categoryArticle.sections.map((section, index) => (
                  <section
                    className="conversion-section unit-long-section"
                    id={`kategori-bolum-${index + 1}`}
                    key={section.title}
                  >
                    <h2>{section.title}</h2>

                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {index === 1 && featuredUnit && (
                      <p className="category-inline-link">
                        {featuredUnit.name} birimi hakkında
                        ayrıntılı bilgi için{" "}
                        <Link
                          href={`/birimler/${featuredUnit.slug}`}
                        >
                          {featuredUnit.name} bilgi sayfasını
                        </Link>{" "}
                        inceleyebilirsiniz.
                      </p>
                    )}
                  </section>
                ))}

                <section
                  className="conversion-section"
                  id="kategori-birimleri-tablosu"
                >
                  <h2>{tableTitle}</h2>

                  <div className="scientific-table-wrap">
                    <table className="scientific-table">
                      <thead>
                        <tr>
                          <th>Birim</th>
                          <th>Sembol</th>
                          <th>{tableReferenceLabel}</th>
                          <th>Sistem</th>
                          <th>Yaygın kullanım</th>
                        </tr>
                      </thead>

                      <tbody>
                        {categoryArticle.unitTable.map((unit) => (
                          <tr
                            key={`${unit.symbol}-${unit.name}`}
                          >
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

                <section
                  className="conversion-section unit-sources"
                  id="kategori-kaynaklari"
                >
                  <h2>Kaynaklar</h2>

                  <p>
                    Bu sayfadaki tanımlar ve dönüşüm
                    değerleri resmî metroloji kaynakları
                    temel alınarak hazırlanmıştır.
                  </p>

                  <ol>
                    {sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.organization}: {source.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </>
          )}
        </>
      }
      footerLink={{
        href: "/tum-birimler",
        label: "Tüm birim dönüştürücüyü aç",
      }}
    />
  );
}
