import {
  buildEnglishConversionTitle,
  englishUnitInSentence,
  formatEnglishShort,
} from "../../converter/englishUnitDisplay";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcCapacityCalculator from "../../components/AcCapacityCalculator";
import AggregateCalculator from "../../components/AggregateCalculator";
import BmiCalculator from "../../components/BmiCalculator";
import BrickCalculator from "../../components/BrickCalculator";
import ConcreteCalculator from "../../components/ConcreteCalculator";
import DateCalculator from "../../components/DateCalculator";
import ElectricityConsumptionCalculator from "../../components/ElectricityConsumptionCalculator";
import EnglishConversionSeo from "../../components/EnglishConversionSeo";
import EvChargingCalculator from "../../components/EvChargingCalculator";
import FuelConsumptionCalculator from "../../components/FuelConsumptionCalculator";
import EnglishTireSizeCalculator from "../../components/EnglishTireSizeCalculator";
import EnglishNumberBaseCalculator from "../../components/EnglishNumberBaseCalculator";
import EnglishPixelCalculator from "../../components/EnglishPixelCalculator";
import EnglishVideoBitrateCalculator from "../../components/EnglishVideoBitrateCalculator";
import EnglishOneRepMaxCalculator from "../../components/EnglishOneRepMaxCalculator";
import EnglishHeightConverter from "../../components/EnglishHeightConverter";
import EnglishGradeCalculator from "../../components/EnglishGradeCalculator";
import EnglishCalorieCalculator from "../../components/EnglishCalorieCalculator";
import EnglishBodyFatCalculator from "../../components/EnglishBodyFatCalculator";
import EnglishIdealWeightCalculator from "../../components/EnglishIdealWeightCalculator";
import EnglishFuelEconomyConverter from "../../components/EnglishFuelEconomyConverter";
import LaminateCalculator from "../../components/LaminateCalculator";
import LengthComparisonTool from "../../components/LengthComparisonTool";
import MovingBoxCalculator from "../../components/MovingBoxCalculator";
import NaturalGasCalculator from "../../components/NaturalGasCalculator";
import PaceCalculator from "../../components/PaceCalculator";
import PaintCalculator from "../../components/PaintCalculator";
import PregnancyCalculator from "../../components/PregnancyCalculator";
import RoofingCalculator from "../../components/RoofingCalculator";
import SleepCalculator from "../../components/SleepCalculator";
import StairCalculator from "../../components/StairCalculator";
import TileCalculator from "../../components/TileCalculator";
import VatCalculator from "../../components/VatCalculator";
import WallpaperCalculator from "../../components/WallpaperCalculator";
import WeightComparisonTool from "../../components/WeightComparisonTool";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { findEnglishUnitPage } from "../../converter/localizedUnitPages";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import {
  englishConversionPages,
  findEnglishConversionPage,
} from "../../converter/localizedConversionPages";
import { englishCategoryPages } from "../../converter/localizedCategoryPages";
import { findGermanPageByTurkishSlug } from "../../converter/localizedGermanConversionPages";
import {
  englishStandaloneTools,
  findEnglishStandaloneToolBySlug,
  type EnglishStandaloneToolComponentKey,
} from "../../i18n/englishStandaloneTools";
import { getUnitSources } from "../../converter/unitSources";
import { getEnglishEditorialConversion } from "../../converter/englishEditorialConversions";
import { buildSiteUrl } from "../../siteConfig";
import {
  englishEverydayCalculatorGroups,
  englishEverydayHubPath,
} from "../../i18n/englishEverydayCalculatorGroups";

const fitnessToolComponents = new Set(["calorieCalculator", "bodyFatCalculator", "idealWeightCalculator", "oneRepMaxCalculator"]);

const componentMap: Record<EnglishStandaloneToolComponentKey, React.ComponentType<{ locale?: "en" }>> =
  {
    paintCalculator: PaintCalculator,
    aggregateCalculator: AggregateCalculator,
    tileCalculator: TileCalculator,
    brickCalculator: BrickCalculator,
    concreteCalculator: ConcreteCalculator,
    dateCalculator: DateCalculator,
    vatCalculator: VatCalculator,
    bmiCalculator: BmiCalculator,
    pregnancyCalculator: PregnancyCalculator,
    roofingCalculator: RoofingCalculator,
    lengthComparison: LengthComparisonTool,
    weightComparison: WeightComparisonTool,
    paceCalculator: PaceCalculator,
    acCapacityCalculator: AcCapacityCalculator,
    electricityConsumptionCalculator: ElectricityConsumptionCalculator,
    sleepCalculator: SleepCalculator,
    stairCalculator: StairCalculator,
    fuelConsumptionCalculator: FuelConsumptionCalculator,
    tireSizeCalculator: EnglishTireSizeCalculator,
    numberBaseCalculator: EnglishNumberBaseCalculator,
    pixelCalculator: EnglishPixelCalculator,
    videoBitrateCalculator: EnglishVideoBitrateCalculator,
    oneRepMaxCalculator: EnglishOneRepMaxCalculator,
    heightConverter: EnglishHeightConverter,
    gradeCalculator: EnglishGradeCalculator,
    calorieCalculator: EnglishCalorieCalculator,
    bodyFatCalculator: EnglishBodyFatCalculator,
    idealWeightCalculator: EnglishIdealWeightCalculator,
    fuelEconomyConverter: EnglishFuelEconomyConverter,
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
      title: `${tool.title}`,
      description: tool.description,
      alternates: tool.isEnglishOnly
        ? { canonical: tool.englishPath }
        : {
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

  // Baslik Ingilizce arama kalibina gore: "Centimeters to Inches Converter
  // (cm to in)". Onceki "1 Centimeter to Inch – Converter" kalibi tekil ve
  // aramalarla uyusmuyordu. Sablon sona " | BirimCeviri.app" ekler; toplam
  // 65 karakteri gecmesin diye sigan en uzun bicim secilir.
  const title = buildEnglishConversionTitle(page);
  const oneUnitResult = formatEnglishShort(
    convert(page.category, 1, page.fromUnit, page.toUnit)
  );
  const description =
    `1 ${page.fromSymbol} = ${oneUnitResult} ${page.toSymbol}. ` +
    `Convert ${englishUnitInSentence(page.fromPlural)} to ${englishUnitInSentence(page.toPlural)} ` +
    `instantly, with the formula, a conversion table and worked examples.`;

  return {
    title,
    description,

    alternates: page.isEnglishOnly
      ? { canonical: `/en/${page.slug}` }
      : {
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
  // Breadcrumb: aracin listelendigi hub (fitness, gunluk hesaplayicilar...).
  const toolHub = fitnessToolComponents.has(tool.component)
    ? { href: "/en/fitness-calculators", label: "Fitness Calculators" }
    : englishEverydayCalculatorGroups.some((group) => group.tools.includes(tool.component))
      ? { href: englishEverydayHubPath, label: "Everyday Calculators" }
      : { href: "/en/other-conversions", label: "Other Conversions" };

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
        name: toolHub.label,
        item: buildSiteUrl(toolHub.href),
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
          <Link href={toolHub.href}>{toolHub.label}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{tool.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{tool.title}</h1>
          <p>{tool.intro}</p>
        </header>

        <ToolComponent locale="en" />

        {tool.relatedHub && (
          <section className="conversion-section related-conversions">
            <h2>More project planning tools</h2>
            <Link className="text-link" href={tool.relatedHub.href}>
              Browse {tool.relatedHub.label}
            </Link>
          </section>
        )}

        <section className="category-article-content">
          {tool.articleSections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </section>

        {tool.faq && tool.faq.length > 0 && (
          <section className="category-article-content">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(buildFaqSchema(tool.faq)).replace(/</g, "\\u003c"),
              }}
            />
            <h2>Frequently asked questions</h2>
            {tool.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
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

  const germanPage = page.isEnglishOnly
    ? undefined
    : findGermanPageByTurkishSlug(page.sourceSlug);
  const reversePage = findEnglishConversionPage(
    page.reverseSlug
  );
  const fromUnitInfo = findEnglishUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findEnglishUnitPage(page.category, page.toUnit);
  const categoryPage = englishCategoryPages.find(
    (candidate) => candidate.category === page.category,
  );
  const sources = getUnitSources(page.category);
  const editorialConversion = getEnglishEditorialConversion(page.slug);

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
  const fromSentence = englishUnitInSentence(page.fromPlural);
  const toSentence = englishUnitInSentence(page.toPlural);
  const faqItems: FaqItem[] = [
    {
      // Sicaklik olcekleri oran degildir; "How many Fahrenheit are in 1
      // Celsius?" anlamsiz oldugu icin "What is 1 °C in Fahrenheit?" sorulur.
      question:
        page.category === "sicaklik"
          ? `What is 1 ${page.fromSymbol} in ${toSentence}?`
          : `How many ${toSentence} are in 1 ${englishUnitInSentence(page.fromName)}?`,
      answer: `1 ${page.fromSymbol} = ${formatEnglishShort(oneUnitResult)} ${page.toSymbol}.`,
    },
    {
      question: `How do you convert ${fromSentence} to ${toSentence}?`,
      answer: page.explanation,
    },
    {
      question:
        page.category === "sicaklik"
          ? `What is 1 ${page.toSymbol} in ${fromSentence}?`
          : `How many ${fromSentence} are in 1 ${englishUnitInSentence(page.toName)}?`,
      answer: `1 ${page.toSymbol} = ${formatEnglishShort(
        convert(page.category, 1, page.toUnit, page.fromUnit)
      )} ${page.fromSymbol}.`,
    },
  ];

  return (
    <main className="conversion-page" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(faqItems)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>

          <span aria-hidden="true">›</span>

          {categoryPage ? (
            <Link href={`/en/categories/${categoryPage.slug}`}>
              {page.categoryName}
            </Link>
          ) : (
            <span>{page.categoryName}</span>
          )}

          <span aria-hidden="true">›</span>

          <span>
            {page.fromPlural} to {page.toPlural}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromPlural} to {page.toPlural} Converter
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
              1 {page.fromSymbol} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toSymbol}
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
                  {page.fromSymbol} → {page.toSymbol}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            How do you convert {fromSentence} to {toSentence}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Conversion formula</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        {editorialConversion && (
          <section className="conversion-section">
            <h2>{editorialConversion.title}</h2>

            {editorialConversion.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {editorialConversion.note && (
              <p>
                <strong>Important:</strong> {editorialConversion.note}
              </p>
            )}

            <h3>Related tools</h3>
            <ul className="related-conversion-list">
              {editorialConversion.related.map((related) => (
                <li key={related.href}>
                  <Link href={related.href}>{related.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section">
          <h2>
            {page.fromPlural} to {toSentence} conversion table
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{page.fromPlural} ({page.fromSymbol})</th>
                  <th>{page.toPlural} ({page.toSymbol})</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)}{" "}
                      {page.fromSymbol}
                    </td>

                    <td>
                      {formatEnglishShort(row.result)}{" "}
                      {page.toSymbol}
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

        {categoryPage && (
          <section className="conversion-section related-conversions">
            <h2>{page.categoryName} conversion tools</h2>

            <p>
              Browse every converter in this group: {" "}
              <Link
                className="text-link"
                href={`/en/categories/${categoryPage.slug}`}
              >
                {categoryPage.title}
              </Link>
              .
            </p>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Reverse conversion</h2>

            <Link
              className="text-link"
              href={`/en/${reversePage.slug}`}
            >
              {reversePage.fromPlural} to{" "}
              {englishUnitInSentence(reversePage.toPlural)} converter
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
                    {relatedPage.fromPlural} to{" "}
                    {relatedPage.toPlural}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section conversion-faq">
          <h2>Frequently asked questions</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

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

        {!page.isEnglishOnly && (
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
        )}
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
