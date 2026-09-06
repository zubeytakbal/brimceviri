import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcCapacityCalculator from "../../components/AcCapacityCalculator";
import BmiCalculator from "../../components/BmiCalculator";
import BrickCalculator from "../../components/BrickCalculator";
import DateCalculator from "../../components/DateCalculator";
import ElectricityConsumptionCalculator from "../../components/ElectricityConsumptionCalculator";
import GermanConversionSeo from "../../components/GermanConversionSeo";
import LengthComparisonTool from "../../components/LengthComparisonTool";
import PaceCalculator from "../../components/PaceCalculator";
import PaintCalculator from "../../components/PaintCalculator";
import PregnancyCalculator from "../../components/PregnancyCalculator";
import SleepCalculator from "../../components/SleepCalculator";
import TileCalculator from "../../components/TileCalculator";
import VatCalculator from "../../components/VatCalculator";
import WeightComparisonTool from "../../components/WeightComparisonTool";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findGermanConversionPage,
  germanConversionPages,
  type LocalizedGermanConversionPage,
} from "../../converter/localizedGermanConversionPages";
import { findGermanUnitPage } from "../../converter/localizedGermanUnitPages";
import {
  findGermanStandaloneToolBySlug,
  germanStandaloneTools,
  type GermanStandaloneToolComponentKey,
} from "../../i18n/germanStandaloneTools";
import { getUnitSources } from "../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const componentMap: Record<GermanStandaloneToolComponentKey, React.ComponentType<{ locale?: "de" }>> =
  {
    paintCalculator: PaintCalculator,
    tileCalculator: TileCalculator,
    brickCalculator: BrickCalculator,
    dateCalculator: DateCalculator,
    vatCalculator: VatCalculator,
    bmiCalculator: BmiCalculator,
    pregnancyCalculator: PregnancyCalculator,
    lengthComparison: LengthComparisonTool,
    weightComparison: WeightComparisonTool,
    paceCalculator: PaceCalculator,
    acCapacityCalculator: AcCapacityCalculator,
    electricityConsumptionCalculator: ElectricityConsumptionCalculator,
    sleepCalculator: SleepCalculator,
  };

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("de-DE", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  const toolParams = germanStandaloneTools.map((tool) => ({
    slug: tool.slug,
  }));

  const conversionParams = germanConversionPages.map((page) => ({
    slug: page.slug,
  }));

  return [...toolParams, ...conversionParams];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tool = findGermanStandaloneToolBySlug(slug);

  if (tool) {
    return {
      title: `${tool.title} | BirimCeviri.app`,
      description: tool.description,
      alternates: {
        canonical: tool.germanPath,
        ...buildFullLanguageAlternates(tool.germanPath),
      },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: buildSiteUrl(tool.germanPath),
        siteName: "BirimCeviri.app",
        locale: "de_DE",
        type: "website",
      },
    };
  }

  const page = findGermanConversionPage(slug);

  if (!page) {
    return {
      title: "Umrechnung nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${page.fromName} in ${page.toName} Umrechner`;

  const description =
    `${page.fromName} in ${page.toName} umrechnen. ` +
    `Formel, Umrechnungstabelle und Sofortergebnis auf einen Blick.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/de/${page.slug}`,
      ...buildFullLanguageAlternates(`/de/${page.slug}`),
    },

    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function GermanStandaloneTool({
  tool,
}: {
  tool: NonNullable<ReturnType<typeof findGermanStandaloneToolBySlug>>;
}) {
  const ToolComponent = componentMap[tool.component];
  const pageUrl = buildSiteUrl(tool.germanPath);
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
        name: "Weitere Umrechnungen",
        item: buildSiteUrl("/de/weitere-umrechnungen"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page" lang="de">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/de/weitere-umrechnungen">Weitere Umrechnungen</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{tool.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{tool.title}</h1>
          <p>{tool.intro}</p>
        </header>

        <ToolComponent locale="de" />

        <section className="category-article-content">
          {tool.articleSections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function GermanConversionPage({
  page,
}: {
  page: LocalizedGermanConversionPage;
}) {
  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const reversePage = findGermanConversionPage(page.reverseSlug);
  const fromUnitInfo = findGermanUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findGermanUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = germanConversionPages
    .filter(
      (relatedPage) =>
        relatedPage.slug !== page.slug &&
        relatedPage.slug !== page.reverseSlug &&
        relatedPage.category === page.category &&
        (relatedPage.fromUnit === page.fromUnit ||
          relatedPage.toUnit === page.fromUnit ||
          relatedPage.fromUnit === page.toUnit ||
          relatedPage.toUnit === page.toUnit)
    )
    .slice(0, 8);

  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page" lang="de">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>

          <span aria-hidden="true">&rsaquo;</span>

          <span>{page.categoryName}</span>

          <span aria-hidden="true">&rsaquo;</span>

          <span>
            {page.fromName} in {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromName} in {page.toName} Umrechner
            </h1>

            <p className="conversion-hero-description">
              Wert eingeben, um das Ergebnis sofort und kostenlos zu
              berechnen.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="de"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Umrechnungsübersicht</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formel</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Kategorie</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Einheiten</dt>
                <dd>
                  {page.fromUnit} → {page.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            Wie rechnet man {page.fromName.toLowerCase()} in{" "}
            {page.toName.toLowerCase()} um?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Umrechnungsformel</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Umrechnungstabelle {page.fromName} in {page.toName}
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{page.fromName}</th>
                  <th>{page.toName}</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)} {page.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)} {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Was ist {fromUnitInfo.name}?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <h3>Kurze Geschichte von {fromUnitInfo.name}</h3>

            <p>{fromUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/de/einheiten/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name}-Einheitenübersicht öffnen
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Was ist {toUnitInfo.name}?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <h3>Kurze Geschichte von {toUnitInfo.name}</h3>

            <p>{toUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/de/einheiten/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name}-Einheitenübersicht öffnen
            </Link>
          </section>
        )}

        <GermanConversionSeo conversionPage={page} />

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Umgekehrte Umrechnung</h2>

            <Link className="text-link" href={`/de/${reversePage.slug}`}>
              {reversePage.fromName} in {reversePage.toName} Umrechner
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Verwandte Umrechnungen</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/de/${relatedPage.slug}`}>
                    {relatedPage.fromName} in {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Quellen</h2>

            <p>
              Die Definitionen und Umrechnungsbeziehungen auf dieser Seite
              orientieren sich an anerkannten metrologischen Referenzen.
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
        )}

        <section className="conversion-section language-alternatives">
          <h2>Andere Sprachen</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Türkische Version ansehen
          </Link>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              English version öffnen
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}

export default async function GermanDynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const tool = findGermanStandaloneToolBySlug(slug);

  if (tool) {
    return <GermanStandaloneTool tool={tool} />;
  }

  const page = findGermanConversionPage(slug);

  if (!page) {
    notFound();
  }

  return <GermanConversionPage page={page} />;
}
