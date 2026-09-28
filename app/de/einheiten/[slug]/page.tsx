import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import PairConverter from "../../../converter/PairConverter";
import { getGermanCategoryPathByCategory } from "../../../converter/localizedGermanCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import {
  findGermanUnitPageBySlug,
  germanUnitPages,
} from "../../../converter/localizedGermanUnitPages";
import { germanConversionPages } from "../../../converter/localizedGermanConversionPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFaqSchema } from "../../../converter/faqSchema";
import {
  germanSiblingUnits,
  germanUnitCommonValues,
  germanUnitConversionTable,
  germanUnitFaq,
} from "../../../converter/germanUnitGuideExtras";
import { SITE_URL, buildSiteUrl } from "../../../siteConfig";

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

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return germanUnitPages.map((unitPage) => ({
    slug: unitPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findGermanUnitPageBySlug(slug);

  if (!unitPage) {
    return {
      title: "Einheit nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${unitPage.name}: Definition, Symbol und Umrechnung`;
  const firstRow = germanUnitConversionTable(unitPage)[0];
  const description =
    `Was ist ${unitPage.name}? Symbol ${unitPage.symbol}, Definition und Herkunft` +
    (firstRow ? `, dazu die Umrechnung: 1 ${unitPage.symbol} = ${firstRow.text} ${firstRow.symbol}` : "") +
    ` und eine Tabelle mit allen verwandten Einheiten.`;

  return {
    title: seoTitle(title, `${unitPage.name}: Definition und Umrechnungen`, `${unitPage.name}: Definition`),
    description,
    alternates: {
      canonical: `/de/einheiten/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/de/einheiten/${unitPage.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/einheiten/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanUnitInformationPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const unitPage = findGermanUnitPageBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(
    unitPage.sourceSlug
  );
  const sources = getUnitSources(unitPage.category);

  const relatedConversions = germanConversionPages.filter(
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

  const pageUrl = buildSiteUrl(`/de/einheiten/${unitPage.slug}`);
  const conversionTable = germanUnitConversionTable(unitPage);
  const commonValues = germanUnitCommonValues(unitPage, conversionTable[0]);
  const siblings = germanSiblingUnits(unitPage);
  const faqItems = germanUnitFaq(unitPage, conversionTable);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: buildSiteUrl("/de"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: unitPage.categoryName,
        item: buildSiteUrl(
          getGermanCategoryPathByCategory(unitPage.category)
        ),
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
    headline: `${unitPage.name}: Definition und Umrechnungen`,
    description: unitPage.shortDescription,
    mainEntityOfPage: pageUrl,
    inLanguage: "de",
    author: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
  };

  return (
    <main className="unit-information-page" lang="de">
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

      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">{"\u203A"}</span>
          <Link href={getGermanCategoryPathByCategory(unitPage.category)}>
            {unitPage.categoryName}
          </Link>
          <span aria-hidden="true">{"\u203A"}</span>
          <span>{unitPage.name}</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">{unitPage.symbol}</p>
          <h1>Was ist {unitPage.name}?</h1>
          <p>{unitPage.shortDescription}</p>
        </header>

        <div className="unit-page-layout">
          <div className="unit-page-content">
            <section className="unit-article-introduction">
              <p>{unitPage.historySummary}</p>
              <p>
                Messsystem: {unitPage.measurementSystem}. SI-Bezug:{" "}
                {unitPage.siEquivalent}.
              </p>
            </section>

            <section className="conversion-section">
              <h2>{unitPage.name} im Überblick</h2>
              <dl className="unit-facts">
                <div>
                  <dt>Einheitsname</dt>
                  <dd>{unitPage.name}</dd>
                </div>
                <div>
                  <dt>Symbol</dt>
                  <dd>{unitPage.symbol}</dd>
                </div>
                <div>
                  <dt>Kategorie</dt>
                  <dd>{unitPage.categoryName}</dd>
                </div>
                <div>
                  <dt>Messsystem</dt>
                  <dd>{unitPage.measurementSystem}</dd>
                </div>
                <div>
                  <dt>SI-Bezug</dt>
                  <dd>{unitPage.siEquivalent}</dd>
                </div>
                <div>
                  <dt>Typische Verwendung</dt>
                  <dd>{unitPage.commonUses}</dd>
                </div>
              </dl>
            </section>

            {conversionTable.length > 0 && (
              <section className="conversion-section" id="umrechnungstabelle">
                <h2>1 {unitPage.name} in anderen Einheiten</h2>
                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th scope="col">Einheit</th>
                        <th scope="col">1 {unitPage.symbol} =</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conversionTable.map((row) => (
                        <tr key={row.symbol}>
                          <td>
                            {row.href ? (
                              <Link href={row.href} prefetch={false}>
                                {row.name}
                              </Link>
                            ) : (
                              row.name
                            )}
                          </td>
                          <td>
                            {row.text} {row.symbol}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {commonValues.length > 0 && conversionTable[0] && (
              <section className="conversion-section" id="haeufige-werte">
                <h2>
                  {unitPage.name} in {conversionTable[0].name}: häufige Werte
                </h2>
                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th scope="col">{unitPage.name}</th>
                        <th scope="col">{conversionTable[0].name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commonValues.map((row) => (
                        <tr key={row.amount}>
                          <td>
                            {row.amount.toLocaleString("de-DE")} {unitPage.symbol}
                          </td>
                          <td>
                            {row.text} {conversionTable[0].symbol}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {relatedConversions.length > 0 && (
              <section className="conversion-section" id="conversion-tools">
                <h2>Passende Umrechnungen</h2>
                <ul className="related-conversion-list">
                  {relatedConversions.map((conversion) => (
                    <li key={conversion.slug}>
                      <Link href={`/de/${conversion.slug}`}>
                        {conversion.fromName} zu {conversion.toName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="conversion-section" id="faq">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
              />
              <h2>Häufige Fragen</h2>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {siblings.length > 0 && (
              <section className="conversion-section" id="weitere-einheiten">
                <h2>Weitere Einheiten: {unitPage.categoryName}</h2>
                <ul className="related-conversion-list">
                  {siblings.map((sibling) => (
                    <li key={sibling.href}>
                      <Link href={sibling.href} prefetch={false}>
                        {sibling.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {sources.length > 0 && (
              <section
                className="conversion-section unit-sources"
                id="sources"
              >
                <h2>Quellen</h2>

                <p>
                  Die Definitionen und Umrechnungsbeziehungen auf
                  dieser Seite orientieren sich an anerkannten
                  metrologischen Referenzen und SI-Quellen.
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
            )}

            <section className="conversion-section language-alternatives">
              <h2>Weitere Sprachen</h2>

              <Link
                className="text-link"
                href={`/birimler/${unitPage.sourceSlug}`}
                hrefLang="tr"
              >
                Türkische Version öffnen
              </Link>

              {englishPage && " · "}
              {englishPage && (
                <Link
                  className="text-link"
                  href={`/en/units/${englishPage.slug}`}
                  hrefLang="en"
                >
                  Englische Version öffnen
                </Link>
              )}
            </section>
          </div>

          {converterData && (
            <aside className="unit-page-converter">
              <h2>Schnell umrechnen</h2>
              <PairConverter
                category={converterData.category}
                fromUnit={converterData.fromUnit}
                toUnit={converterData.toUnit}
                fromName={converterData.fromName}
                toName={converterData.toName}
                locale="de"
              />

              <nav className="unit-sidebar-links">
                <h3>Kategorie</h3>
                <Link href={getGermanCategoryPathByCategory(unitPage.category)}>
                  Alle {unitPage.categoryName.toLowerCase()}-Einheiten
                </Link>
              </nav>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
