import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import { bengaliCategoryPages } from "../../../converter/localizedBengaliCategoryPages";
import { bengaliConversionPages } from "../../../converter/localizedBengaliConversionPages";
import { bengaliUnitPages } from "../../../converter/localizedBengaliUnitPages";
import { findEnglishCategoryPageByTurkishSlug } from "../../../converter/localizedCategoryPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// শুধুমাত্র সাইটের ১৭-উপাদানের মূল পরিচয়ের (১৩ কেন্দ্রীয় বিভাগ) জন্য
// পূর্ণাঙ্গ TR-গভীরতার বাংলা নাম -- বাকি বিভাগগুলোর জন্য fallback ব্যবহার হয়।
const categoryBaseNames: Record<string, string> = {
  uzunluk: "দৈর্ঘ্য",
  alan: "ক্ষেত্রফল",
  hacim: "আয়তন",
  kutle: "ভর",
  sicaklik: "তাপমাত্রা",
  zaman: "সময়",
  hiz: "গতি",
  basinc: "চাপ",
  enerji: "শক্তি ও ক্ষমতা",
  veri: "ডেটা স্টোরেজ",
  elektrik: "বিদ্যুৎ",
  altin_ayar: "স্বর্ণের ক্যারেট",
  gumus_ayar: "রূপার মান",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findBySlug(slug: string) {
  return bengaliCategoryPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return bengaliCategoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    return {
      title: "বিভাগ পাওয়া যায়নি",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: categoryPage.unitTable
      ? `${categoryPage.title}: একক, টেবিল ও হিসাব`
      : categoryPage.title,
    description: categoryPage.description,
    alternates: {
      canonical: `/bn/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/bn/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title: categoryPage.title,
      description: categoryPage.description,
      url: buildSiteUrl(`/bn/categories/${categoryPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "bn_BD",
      type: "article",
    },
  };
}

export default async function BengaliCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPage = findBySlug(slug);

  if (!categoryPage) {
    notFound();
  }

  const englishPage = findEnglishCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const categoryConversions = bengaliConversionPages.filter(
    (conversion) => conversion.category === categoryPage.category
  );
  const conversionCards = createConversionCards({
    conversions: categoryConversions,
    hrefForSlug: (conversionSlug) => `/bn/${conversionSlug}`,
    directionLabel: (conversion) => `${conversion.fromName} → ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });

  const categoryUnits = bengaliUnitPages.filter(
    (unitPage) => unitPage.category === categoryPage.category
  );

  const sources = getUnitSources(categoryPage.category);
  const featuredUnit = categoryUnits[0];
  const baseName = categoryBaseNames[categoryPage.category] ?? categoryPage.title;

  const pageUrl = buildSiteUrl(`/bn/categories/${categoryPage.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: buildSiteUrl("/bn"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <CategoryPageLayout
      locale="bn"
      structuredData={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
        />
      }
      breadcrumbAriaLabel="ব্রেডক্রাম্ব"
      breadcrumbs={[
        { label: "হোম", href: "/bn" },
        { label: "সব বিভাগ", href: "/bn/categories" },
        { label: categoryPage.title },
      ]}
      kickerLabel="একক বিভাগ"
      title={categoryPage.title}
      description={categoryPage.description}
      allUnitsSection={{
        heading: `সব ${baseName} একক রূপান্তর করুন`,
        content: (
          <CategoryUnitConverter category={categoryPage.category} locale="bn" />
        ),
      }}
      conversionHeading="জনপ্রিয় রূপান্তর"
      conversionCountLabel={`${conversionCards.length} জোড়া`}
      conversionCards={conversionCards}
      unitGuidesHeading="একক গাইড"
      unitGuidesCountLabel={`${categoryUnits.length} একক`}
      unitGuides={categoryUnits.map((unitPage) => ({
        href: `/bn/unit-guides/${unitPage.slug}`,
        label: `${unitPage.name} কী?`,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`${baseName} সম্পর্কে বিস্তারিত তথ্য`}
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

          {categoryPage.unitTable ? (
            <>
              <nav className="category-table-of-contents" aria-label="পাতার সূচি">
                <strong>এই পাতায়</strong>
                <ol>
                  {categoryPage.sections.map((section, index) => (
                    <li key={section.title}>
                      <a href={`#category-section-${index + 1}`}>{section.title}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#category-unit-table">একক তুলনা টেবিল</a>
                  </li>
                  <li>
                    <a href="#category-sources">সূত্রসমূহ</a>
                  </li>
                </ol>
              </nav>

              <div className="category-article-content">
                {categoryPage.sections.map((section, index) => (
                  <section
                    className="conversion-section unit-long-section"
                    id={`category-section-${index + 1}`}
                    key={section.title}
                  >
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {index === 1 && featuredUnit && (
                      <p className="category-inline-link">
                        {featuredUnit.name} একক সম্পর্কে বিস্তারিত জানতে{" "}
                        <Link href={`/bn/unit-guides/${featuredUnit.slug}`}>
                          {featuredUnit.name} তথ্য পাতা
                        </Link>{" "}
                        দেখুন।
                      </p>
                    )}
                  </section>
                ))}

                <section className="conversion-section" id="category-unit-table">
                  <h2>একক তুলনা টেবিল</h2>

                  <div className="scientific-table-wrap">
                    <table className="scientific-table">
                      <thead>
                        <tr>
                          <th>একক</th>
                          <th>প্রতীক</th>
                          <th>SI সমতুল্য</th>
                          <th>পদ্ধতি</th>
                          <th>সাধারণ ব্যবহার</th>
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

                <section className="conversion-section unit-sources" id="category-sources">
                  <h2>সূত্রসমূহ</h2>
                  <p>
                    এই পাতার সংজ্ঞা ও রূপান্তর মান স্বীকৃত মেট্রোলজি
                    রেফারেন্সের ভিত্তিতে প্রস্তুত করা হয়েছে।
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
          ) : (
            <div className="category-article-content">
              {categoryPage.sections.map((section) => (
                <section className="conversion-section unit-long-section" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

              {sources.length > 0 && (
                <section className="conversion-section unit-sources">
                  <h2>সূত্রসমূহ</h2>
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
              )}
            </div>
          )}

          <section className="conversion-section language-alternatives">
            <h2>অন্যান্য ভাষা</h2>
            <Link
              className="text-link"
              href={`/kategoriler/${categoryPage.sourceSlug}`}
              hrefLang="tr"
            >
              তুর্কি সংস্করণ খুলুন
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/categories/${englishPage.slug}`}
                hrefLang="en"
              >
                ইংরেজি সংস্করণ খুলুন
              </Link>
            )}
          </section>
        </>
      }
      footerLink={{
        href: "/bn/categories",
        label: "সব বিভাগ দেখুন",
      }}
    />
  );
}
