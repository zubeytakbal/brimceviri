import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcCapacityCalculator from "../../components/AcCapacityCalculator";
import BmiCalculator from "../../components/BmiCalculator";
import BrickCalculator from "../../components/BrickCalculator";
import DateCalculator from "../../components/DateCalculator";
import ElectricityConsumptionCalculator from "../../components/ElectricityConsumptionCalculator";
import EnglishConversionSeo from "../../components/EnglishConversionSeo";
import EvChargingCalculator from "../../components/EvChargingCalculator";
import FuelConsumptionCalculator from "../../components/FuelConsumptionCalculator";
import LaminateCalculator from "../../components/LaminateCalculator";
import LengthComparisonTool from "../../components/LengthComparisonTool";
import MovingBoxCalculator from "../../components/MovingBoxCalculator";
import NaturalGasCalculator from "../../components/NaturalGasCalculator";
import PaceCalculator from "../../components/PaceCalculator";
import PaintCalculator from "../../components/PaintCalculator";
import PregnancyCalculator from "../../components/PregnancyCalculator";
import SleepCalculator from "../../components/SleepCalculator";
import TileCalculator from "../../components/TileCalculator";
import VatCalculator from "../../components/VatCalculator";
import WallpaperCalculator from "../../components/WallpaperCalculator";
import WeightComparisonTool from "../../components/WeightComparisonTool";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findEnglishUnitPage } from "../../converter/localizedUnitPages";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import {
  englishConversionPages,
  findEnglishConversionPage,
} from "../../converter/localizedConversionPages";
import { findGermanPageByTurkishSlug } from "../../converter/localizedGermanConversionPages";
import {
  englishStandaloneTools,
  findEnglishStandaloneToolBySlug,
  type EnglishStandaloneToolComponentKey,
} from "../../i18n/englishStandaloneTools";
import { getUnitSources } from "../../converter/unitSources";
import { buildSiteUrl } from "../../siteConfig";

const componentMap: Record<EnglishStandaloneToolComponentKey, React.ComponentType<{ locale?: "en" }>> =
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
    fuelConsumptionCalculator: FuelConsumptionCalculator,
    laminateCalculator: LaminateCalculator,
    wallpaperCalculator: WallpaperCalculator,
    movingBoxCalculator: MovingBoxCalculator,
    naturalGasCalculator: NaturalGasCalculator,
    evChargingCalculator: EvChargingCalculator,
  };

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 ||
      Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  const toolParams = englishStandaloneTools.map((tool) => ({
    slug: tool.slug,
  }));

  const conversionParams = englishConversionPages.map((page) => ({
    slug: page.slug,
  }));

  return [...toolParams, ...conversionParams];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tool = findEnglishStandaloneToolBySlug(slug);

  if (tool) {
    return {
      title: `${tool.title} | BirimCeviri.app`,
      description: tool.description,
      alternates: {
        canonical: tool.englishPath,
        ...buildFullLanguageAlternates(tool.englishPath),
      },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: buildSiteUrl(tool.englishPath),
        siteName: "BirimCeviri.app",
        locale: "en_US",
        type: "website",
      },
    };
  }

  const page = findEnglishConversionPage(slug);

  if (!page) {
    return {
      title: "Conversion not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${page.fromName} to ${page.toName} Converter`;

  const description =
    `Convert ${page.fromName.toLowerCase()} to ` +
    `${page.toName.toLowerCase()}. View the conversion formula, ` +
    `conversion table and instant calculation result.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/en/${page.slug}`,
      ...buildFullLanguageAlternates(`/en/${page.slug}`),
    },

    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/en/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function EnglishStandaloneTool({
  tool,
}: {
  tool: NonNullable<ReturnType<typeof findEnglishStandaloneToolBySlug>>;
}) {
  const ToolComponent = componentMap[tool.component];
  const pageUrl = buildSiteUrl(tool.englishPath);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildSiteUrl("/en"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Other Conversions",
        item: buildSiteUrl("/en/other-conversions"),
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
    <main className="all-conversions-page" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/en/other-conversions">Other Conversions</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{tool.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{tool.title}</h1>
          <p>{tool.intro}</p>
        </header>

        <ToolComponent locale="en" />

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

async function EnglishConversionPage({
  slug,
}: {
  slug: string;
}) {
  const page = findEnglishConversionPage(slug);

  if (!page) {
    notFound();
  }

  const germanPage = findGermanPageByTurkishSlug(
    page.sourceSlug
  );
  const reversePage = findEnglishConversionPage(
    page.reverseSlug
  );
  const fromUnitInfo = findEnglishUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findEnglishUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = englishConversionPages
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
    result: convert(
      page.category,
      value,
      page.fromUnit,
      page.toUnit
    ),
  }));

  const oneUnitResult = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );

  const formattedOneUnitResult = formatNumber(
    oneUnitResult
  );

  return (
    <main className="conversion-page" lang="en">
      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>

          <span aria-hidden="true">›</span>

          <span>{page.categoryName}</span>

          <span aria-hidden="true">›</span>

          <span>
            {page.fromName} to {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromName} to {page.toName} Converter
            </h1>

            <p className="conversion-hero-description">
              Enter a value to calculate the result instantly
              and free of charge.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="en"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Conversion summary</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formula</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Category</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Units</dt>
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
            How do you convert {page.fromName.toLowerCase()}{" "}
            to {page.toName.toLowerCase()}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Conversion formula</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {page.fromName} to {page.toName} conversion
            table
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
                      {formatNumber(row.input)}{" "}
                      {page.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)}{" "}
                      {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>What is {fromUnitInfo.name}?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <h3>Short history of {fromUnitInfo.name}</h3>

            <p>{fromUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/en/units/${fromUnitInfo.slug}`}
            >
              Open the {fromUnitInfo.name} unit guide
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>What is {toUnitInfo.name}?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <h3>Short history of {toUnitInfo.name}</h3>

            <p>{toUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/en/units/${toUnitInfo.slug}`}
            >
              Open the {toUnitInfo.name} unit guide
            </Link>
          </section>
        )}

        <EnglishConversionSeo conversionPage={page} />

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Reverse conversion</h2>

            <Link
              className="text-link"
              href={`/en/${reversePage.slug}`}
            >
              {reversePage.fromName} to{" "}
              {reversePage.toName} converter
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Related conversions</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/en/${relatedPage.slug}`}>
                    {relatedPage.fromName} to{" "}
                    {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Sources</h2>

            <p>
              The definitions and conversion relationships on this
              page are aligned with standard metrology and SI
              reference material.
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
          <h2>Other languages</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            View the Turkish version
          </Link>

          {germanPage && (
            <Link
              className="text-link"
              href={`/de/${germanPage.slug}`}
              hrefLang="de"
            >
              Open the German version
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}

export default async function EnglishDynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const tool = findEnglishStandaloneToolBySlug(slug);

  if (tool) {
    return <EnglishStandaloneTool tool={tool} />;
  }

  return <EnglishConversionPage slug={slug} />;
}
