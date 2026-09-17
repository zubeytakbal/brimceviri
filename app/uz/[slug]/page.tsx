import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcCapacityCalculator from "../../components/AcCapacityCalculator";
import BmiCalculator from "../../components/BmiCalculator";
import BrickCalculator from "../../components/BrickCalculator";
import DateCalculator from "../../components/DateCalculator";
import ElectricityConsumptionCalculator from "../../components/ElectricityConsumptionCalculator";
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
import {
  uzbekConversionPages,
  findUzbekConversionPage,
} from "../../converter/localizedUzbekConversionPages";
import { findUzbekUnitPage } from "../../converter/localizedUzbekUnitPages";
import { uzbekCategoryPages } from "../../converter/localizedUzbekCategoryPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import {
  uzbekStandaloneTools,
  findUzbekStandaloneToolBySlug,
  type UzbekStandaloneToolComponentKey,
} from "../../i18n/uzbekStandaloneTools";
import { buildSiteUrl } from "../../siteConfig";

const componentMap: Record<
  UzbekStandaloneToolComponentKey,
  React.ComponentType<{ locale?: "uz" }>
> = {
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
    (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  const toolParams = uzbekStandaloneTools.map((tool) => ({
    slug: tool.slug,
  }));

  const conversionParams = uzbekConversionPages.map((page) => ({
    slug: page.slug,
  }));

  return [...toolParams, ...conversionParams];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tool = findUzbekStandaloneToolBySlug(slug);

  if (tool) {
    return {
      title: `${tool.title} | BirimCeviri.app`,
      description: tool.description,
      alternates: {
        canonical: tool.uzbekPath,
        ...buildFullLanguageAlternates(tool.uzbekPath),
      },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: buildSiteUrl(tool.uzbekPath),
        siteName: "BirimCeviri.app",
        locale: "uz_UZ",
        type: "website",
      },
    };
  }

  const page = findUzbekConversionPage(slug);

  if (!page) {
    return {
      title: "Konvertatsiya topilmadi",
      robots: { index: false, follow: false },
    };
  }

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);

  const title = `1 ${page.fromName} necha ${page.toName}? – Konverter`;
  const description =
    `1 ${page.fromName} = ${formattedOneUnitResult} ${page.toName}. ` +
    `${page.fromName}ni ${page.toName}ga aylantiring. Formula, ` +
    `jadval va onlayn kalkulyator bilan.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/uz/${page.slug}`,
      languages: page.sourceSlug
        ? {
            tr: `/${page.sourceSlug}`,
            "uz-UZ": `/uz/${page.slug}`,
            "x-default": `/${page.sourceSlug}`,
          }
        : {
            "uz-UZ": `/uz/${page.slug}`,
            "x-default": `/uz/${page.slug}`,
          },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "website",
    },
  };
}

function UzbekStandaloneTool({
  tool,
}: {
  tool: NonNullable<ReturnType<typeof findUzbekStandaloneToolBySlug>>;
}) {
  const ToolComponent = componentMap[tool.component];
  const pageUrl = buildSiteUrl(tool.uzbekPath);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: buildSiteUrl("/uz"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Turkumlar",
        item: buildSiteUrl("/uz/turkumlar"),
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
    <main className="all-conversions-page" lang="uz">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/turkumlar">Turkumlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{tool.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{tool.title}</h1>
          <p>{tool.intro}</p>
        </header>

        <ToolComponent locale="uz" />

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

async function UzbekConversionPage({ slug }: { slug: string }) {
  const page = findUzbekConversionPage(slug);

  if (!page) {
    notFound();
  }

  const reversePage = findUzbekConversionPage(page.reverseSlug);
  const fromUnitInfo = findUzbekUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findUzbekUnitPage(page.category, page.toUnit);
  const categoryPage = uzbekCategoryPages.find(
    (item) => item.category === page.category,
  );
  const sources = getUnitSources(page.category);

  const relatedConversions = uzbekConversionPages
    .filter(
      (relatedPage) =>
        relatedPage.slug !== page.slug &&
        relatedPage.slug !== page.reverseSlug &&
        relatedPage.category === page.category &&
        (relatedPage.fromUnit === page.fromUnit ||
          relatedPage.toUnit === page.fromUnit ||
          relatedPage.fromUnit === page.toUnit ||
          relatedPage.toUnit === page.toUnit),
    )
    .slice(0, 8);

  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page" lang="uz">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">›</span>
          {categoryPage ? (
            <Link href={`/uz/turkumlar/${categoryPage.slug}`}>
              {page.categoryName}
            </Link>
          ) : (
            <span>{page.categoryName}</span>
          )}
          <span aria-hidden="true">›</span>
          <span>
            {page.fromName} - {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromName}ni {page.toName}ga aylantirish
            </h1>

            <p className="conversion-hero-description">
              Natijani darhol va bepul ko&apos;rish uchun qiymat kiriting.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="uz"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Konvertatsiya xulosasi</h2>

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
                <dt>Turkum</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Birliklar</dt>
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
            {page.fromName}ni {page.toName}ga qanday aylantirish mumkin?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Aylantirish formulasi</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {page.fromName} - {page.toName} jadvali
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
            <h2>{fromUnitInfo.name} nima?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <h3>{fromUnitInfo.name}ning qisqacha tarixi</h3>

            <p>{fromUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/uz/birliklar/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name} haqida to&apos;liq ma&apos;lumot
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{toUnitInfo.name} nima?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <h3>{toUnitInfo.name}ning qisqacha tarixi</h3>

            <p>{toUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/uz/birliklar/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name} haqida to&apos;liq ma&apos;lumot
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Teskari aylantirish</h2>

            <Link className="text-link" href={`/uz/${reversePage.slug}`}>
              {reversePage.fromName}ni {reversePage.toName}ga aylantirish
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Tegishli aylantirishlar</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/uz/${relatedPage.slug}`}>
                    {relatedPage.fromName} - {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Manbalar</h2>

            <p>
              Ushbu sahifadagi ta&apos;riflar va aylantirish nisbatlari
              standart metrologiya va SI ma&apos;lumotnomalariga mos keladi.
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

        {page.sourceSlug && (
          <section className="conversion-section language-alternatives">
            <h2>Boshqa tillar</h2>

            <Link
              className="text-link"
              href={`/${page.sourceSlug}`}
              hrefLang="tr"
            >
              Turkcha versiyasini ko&apos;rish
            </Link>
          </section>
        )}
      </article>
    </main>
  );
}

export default async function UzbekDynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const tool = findUzbekStandaloneToolBySlug(slug);

  if (tool) {
    return <UzbekStandaloneTool tool={tool} />;
  }

  return <UzbekConversionPage slug={slug} />;
}
