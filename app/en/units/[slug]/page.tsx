import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../../converter/PairConverter";
import { findEnglishUnitArticle } from "../../../converter/englishUnitArticles";
import { englishConversionPages } from "../../../converter/localizedConversionPages";
import {
  englishUnitPages,
  findEnglishUnitPageBySlug,
} from "../../../converter/localizedUnitPages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ConverterData = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
};

export const dynamicParams = false;

const englishCategoryRouteBySlug: Record<string, string> = {
  uzunluk: "length",
  kutle: "mass",
  basinc: "pressure",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return englishUnitPages.map((unitPage) => ({
    slug: unitPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findEnglishUnitPageBySlug(slug);

  if (!unitPage) {
    return {
      title: "Unit not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    `${unitPage.name}: Definition, Symbol, History ` +
    `and Conversions`;

  const description =
    `What is the ${unitPage.name.toLowerCase()} and what does ` +
    `${unitPage.symbol} mean? Learn its definition, history, ` +
    `scientific background and related conversions.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/en/units/${unitPage.slug}`,
      languages: {
        tr: `/birimler/${unitPage.sourceSlug}`,
        en: `/en/units/${unitPage.slug}`,
        "x-default": `/birimler/${unitPage.sourceSlug}`,
      },
    },

    openGraph: {
      title,
      description,
      url:
        `https://birimceviri.app/en/units/` +
        unitPage.slug,
      siteName: "BirimCeviri.app",
      locale: "en_US",
      type: "article",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function EnglishUnitInformationPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const unitPage = findEnglishUnitPageBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const unitArticle = findEnglishUnitArticle(unitPage.slug);

  const relatedConversions = englishConversionPages.filter(
    (page) =>
      page.category === unitPage.category &&
      (page.fromUnit === unitPage.unit ||
        page.toUnit === unitPage.unit)
  );

  const directConversion = relatedConversions.find(
    (page) => page.fromUnit === unitPage.unit
  );

  const incomingConversion = relatedConversions.find(
    (page) => page.toUnit === unitPage.unit
  );

  let converterData: ConverterData | null = null;

  if (directConversion) {
    converterData = {
      category: directConversion.category,
      fromUnit: directConversion.fromUnit,
      toUnit: directConversion.toUnit,
      fromName: directConversion.fromName,
      toName: directConversion.toName,
    };
  } else if (incomingConversion) {
    converterData = {
      category: incomingConversion.category,
      fromUnit: incomingConversion.toUnit,
      toUnit: incomingConversion.fromUnit,
      fromName: incomingConversion.toName,
      toName: incomingConversion.fromName,
    };
  }

  const pageUrl =
    `https://birimceviri.app/en/units/${unitPage.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://birimceviri.app/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Unit Guide",
        item: "https://birimceviri.app/en/units",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: unitPage.name,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      `${unitPage.name}: Definition, Symbol, History ` +
      `and Conversions`,
    description: unitPage.shortDescription,
    mainEntityOfPage: pageUrl,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: "https://birimceviri.app",
    },
    publisher: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: "https://birimceviri.app",
    },
  };

  const faqSchema = unitArticle
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: unitArticle.questions.map((question) => ({
          "@type": "Question",
          name: question.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: question.answer,
          },
        })),
      }
    : null;

  return (
    <main className="unit-information-page" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema),
          }}
        />
      )}

      <article className="unit-page-shell">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>

          <span aria-hidden="true">›</span>

          <Link href="/en/units">Unit Guide</Link>

          <span aria-hidden="true">›</span>

          <span>{unitPage.name}</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">
            {unitPage.symbol}
          </p>

          <h1>What is a {unitPage.name}?</h1>

          <p>{unitPage.shortDescription}</p>
        </header>

        <div className="unit-page-layout">
          <div className="unit-page-content">
            <section className="unit-article-introduction">
              {unitArticle ? (
                unitArticle.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{unitPage.shortDescription}</p>
                  <p>{unitPage.historySummary}</p>
                  <p>
                    Measurement system: {unitPage.measurementSystem}.
                    SI equivalent: {unitPage.siEquivalent}.
                  </p>
                </>
              )}
            </section>

            <section className="conversion-section">
              <h2>{unitPage.name} facts</h2>

              <dl className="unit-facts">
                {unitArticle ? (
                  unitArticle.keyFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <dt>Unit name</dt>
                      <dd>{unitPage.name}</dd>
                    </div>

                    <div>
                      <dt>Symbol</dt>
                      <dd>{unitPage.symbol}</dd>
                    </div>

                    <div>
                      <dt>Category</dt>
                      <dd>{unitPage.categoryName}</dd>
                    </div>

                    <div>
                      <dt>Measurement system</dt>
                      <dd>{unitPage.measurementSystem}</dd>
                    </div>

                    <div>
                      <dt>SI equivalent</dt>
                      <dd>{unitPage.siEquivalent}</dd>
                    </div>

                    <div>
                      <dt>Common uses</dt>
                      <dd>{unitPage.commonUses}</dd>
                    </div>
                  </>
                )}
              </dl>
            </section>

            {unitArticle && (
              <nav
                className="unit-table-of-contents"
                aria-label="Page contents"
              >
                <strong>On this page</strong>

                <ol>
                  {unitArticle.sections.map(
                    (section, index) => (
                      <li key={section.title}>
                        <a href={`#section-${index + 1}`}>
                          {section.title}
                        </a>
                      </li>
                    )
                  )}

                  <li>
                    <a href="#timeline">
                      {unitPage.name} timeline
                    </a>
                  </li>

                  <li>
                    <a href="#conversion-tools">
                      Conversion tools
                    </a>
                  </li>

                  <li>
                    <a href="#frequently-asked-questions">
                      Frequently asked questions
                    </a>
                  </li>

                  <li>
                    <a href="#sources">Sources</a>
                  </li>
                </ol>
              </nav>
            )}

            {unitArticle ? (
              unitArticle.sections.map((section, index) => (
                <section
                  className="conversion-section unit-long-section"
                  id={`section-${index + 1}`}
                  key={section.title}
                >
                  <h2>{section.title}</h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.title === "Meter conversions" && (
                    <p className="category-inline-link">
                      Compare additional measurement units on the{" "}
                      <Link href="/en/categories/length">
                        length units page
                      </Link>
                      .
                    </p>
                  )}
                </section>
              ))
            ) : (
              <>
                <section className="conversion-section unit-long-section">
                  <h2>
                    Definition of the{" "}
                    {unitPage.name.toLowerCase()}
                  </h2>

                  <p>{unitPage.shortDescription}</p>
                </section>

                <section className="conversion-section unit-long-section">
                  <h2>Measurement system and SI relationship</h2>

                  <p>{unitPage.measurementSystem}</p>
                  <p>SI equivalent: {unitPage.siEquivalent}</p>
                </section>

                <section className="conversion-section unit-long-section">
                  <h2>
                    History of the{" "}
                    {unitPage.name.toLowerCase()}
                  </h2>

                  <p>{unitPage.historySummary}</p>
                </section>

                <section className="conversion-section unit-long-section">
                  <h2>
                    Where is the{" "}
                    {unitPage.name.toLowerCase()} used?
                  </h2>

                  <p>
                    {unitPage.commonUses}
                  </p>
                </section>
              </>
            )}

            {unitArticle && (
              <section
                className="conversion-section"
                id="timeline"
              >
                <h2>{unitPage.name} timeline</h2>

                <ol className="unit-timeline">
                  {unitArticle.timeline.map((item) => (
                    <li key={`${item.year}-${item.title}`}>
                      <time>{item.year}</time>

                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {relatedConversions.length > 0 && (
              <section
                className="conversion-section"
                id="conversion-tools"
              >
                <h2>{unitPage.name} conversion tools</h2>

                <ul className="related-conversion-list">
                  {relatedConversions.map((conversion) => (
                    <li key={conversion.slug}>
                      <Link href={`/en/${conversion.slug}`}>
                        {conversion.fromName} to{" "}
                        {conversion.toName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {unitArticle && (
              <section
                className="conversion-section"
                id="frequently-asked-questions"
              >
                <h2>Frequently asked questions</h2>

                <div className="faq-list">
                  {unitArticle.questions.map((question) => (
                    <details key={question.question}>
                      <summary>{question.question}</summary>
                      <p>{question.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {unitArticle && unitPage.slug === "meter" && (
              <section
                className="conversion-section unit-sources"
                id="sources"
              >
                <h2>Sources</h2>

                <p>
                  The scientific definition, writing conventions
                  and historical information on this page are
                  based on official metrology sources.
                </p>

                <ol>
                  <li>
                    <a
                      href="https://www.bipm.org/en/si-base-units/metre"
                      target="_blank"
                      rel="noreferrer"
                    >
                      BIPM: SI base unit — metre
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.bipm.org/en/publications/si-brochure"
                      target="_blank"
                      rel="noreferrer"
                    >
                      BIPM: The International System of Units
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.nist.gov/pml/owm/si-units-length"
                      target="_blank"
                      rel="noreferrer"
                    >
                      NIST: SI Units — Length
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.nist.gov/pml/owm/writing-si-metric-system-units"
                      target="_blank"
                      rel="noreferrer"
                    >
                      NIST: Writing with SI units
                    </a>
                  </li>
                </ol>
              </section>
            )}

            <section className="conversion-section language-alternatives">
              <h2>Other languages</h2>

              <Link
                className="text-link"
                href={`/birimler/${unitPage.sourceSlug}`}
                hrefLang="tr"
              >
                Türkçe sürümü görüntüle
              </Link>
            </section>
          </div>

          {converterData && (
            <aside className="unit-page-converter">
              <h2>Quick conversion</h2>

              <PairConverter
                category={converterData.category}
                fromUnit={converterData.fromUnit}
                toUnit={converterData.toUnit}
                fromName={converterData.fromName}
                toName={converterData.toName}
                locale="en"
              />

              {relatedConversions.length > 0 && (
                <nav className="unit-sidebar-links">
                  <h3>Related tools</h3>

                  {relatedConversions
                    .slice(0, 6)
                    .map((conversion) => (
                      <Link
                        href={`/en/${conversion.slug}`}
                        key={conversion.slug}
                      >
                        {conversion.fromName} to{" "}
                        {conversion.toName}
                      </Link>
                    ))}
                </nav>
              )}

              <nav className="unit-sidebar-links">
                <h3>Category</h3>

                <Link
                  href={`/en/categories/${
                    englishCategoryRouteBySlug[
                      unitPage.category
                    ] ?? unitPage.category
                  }`}
                >
                  All {unitPage.categoryName.toLowerCase()} units
                </Link>
              </nav>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
