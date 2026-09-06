import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcCapacityCalculator from "../../components/AcCapacityCalculator";
import BmiCalculator from "../../components/BmiCalculator";
import BrickCalculator from "../../components/BrickCalculator";
import DateCalculator from "../../components/DateCalculator";
import ElectricityConsumptionCalculator from "../../components/ElectricityConsumptionCalculator";
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
import { findEnglishCategoryPageByCategory } from "../../converter/localizedCategoryPages";
import {
  englishConversionPages,
  findEnglishConversionPage,
} from "../../converter/localizedConversionPages";
import { findGermanPageByTurkishSlug } from "../../converter/localizedGermanConversionPages";
import { findEnglishUnitPage } from "../../converter/localizedUnitPages";
import { getUnitSources } from "../../converter/unitSources";
import {
  arabicStandaloneTools,
  findArabicStandaloneToolBySlug,
  type ArabicStandaloneToolComponentKey,
} from "../../i18n/arabicStandaloneTools";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import {
  buildArabicConversionFormula,
  getArabicCategoryLabel,
  getArabicMeasurementSystem,
  getArabicUnitName,
  getArabicCategoryUsage,
} from "../../i18n/arabicLocalization";
import { buildSiteUrl } from "../../siteConfig";

const componentMap: Record<
  ArabicStandaloneToolComponentKey,
  React.ComponentType<{ locale?: "ar" }>
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
  electricityConsumptionCalculator:
    ElectricityConsumptionCalculator,
  sleepCalculator: SleepCalculator,
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  const absoluteValue = Math.abs(value);

  if (
    absoluteValue !== 0 &&
    (absoluteValue >= 1_000_000_000 ||
      absoluteValue < 0.000001)
  ) {
    return new Intl.NumberFormat("ar", {
      maximumSignificantDigits: 8,
      notation: "scientific",
    }).format(value);
  }

  return new Intl.NumberFormat("ar", {
    maximumSignificantDigits: 12,
  }).format(Number(value.toPrecision(12)));
}

export function generateStaticParams() {
  return [
    ...arabicStandaloneTools.map((tool) => ({
      slug: tool.slug,
    })),
    ...englishConversionPages.map((page) => ({
      slug: page.slug,
    })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = findArabicStandaloneToolBySlug(slug);

  if (tool) {
    return {
      title: `${tool.title} | BirimCeviri.app`,
      description: tool.description,
      alternates: {
        canonical: tool.arabicPath,
        ...buildFullLanguageAlternates(tool.arabicPath),
      },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: buildSiteUrl(tool.arabicPath),
        siteName: "BirimCeviri.app",
        locale: "ar_AR",
        type: "website",
      },
    };
  }

  const page = findEnglishConversionPage(slug);

  if (!page) {
    return {};
  }

  const localizedFromName = getArabicUnitName({
    englishName: page.fromName,
    symbol: page.fromUnit,
  });
  const localizedToName = getArabicUnitName({
    englishName: page.toName,
    symbol: page.toUnit,
  });
  const title = `محول ${localizedFromName} إلى ${localizedToName}`;
  const description = `حوّل من ${localizedFromName} إلى ${localizedToName} بسرعة، مع جدول تحويل وصيغة أساسية وروابط إلى الوحدات المرتبطة.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ar/${page.slug}`,
      ...buildFullLanguageAlternates(`/ar/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/ar/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "ar_AR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function renderStandaloneToolPage(slug: string) {
  const tool = findArabicStandaloneToolBySlug(slug);

  if (!tool) {
    return null;
  }

  const ToolComponent = componentMap[tool.component];
  const pageUrl = buildSiteUrl(tool.arabicPath);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: buildSiteUrl("/ar"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أدوات إضافية",
        item: buildSiteUrl("/ar/other-conversions"),
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
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار الصفحة">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/ar/other-conversions">أدوات إضافية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{tool.title}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{tool.title}</h1>
          <p>{tool.intro}</p>
        </header>

        <ToolComponent locale="ar" />

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

function renderConversionPage(slug: string) {
  const page = findEnglishConversionPage(slug);

  if (!page) {
    return null;
  }

  const germanPage = findGermanPageByTurkishSlug(
    page.sourceSlug
  );
  const categoryPage = findEnglishCategoryPageByCategory(
    page.category
  );
  const reversePage = findEnglishConversionPage(
    page.reverseSlug
  );
  const fromUnitInfo = findEnglishUnitPage(
    page.category,
    page.fromUnit
  );
  const toUnitInfo = findEnglishUnitPage(
    page.category,
    page.toUnit
  );
  const sources = getUnitSources(page.category);
  const localizedFromName = getArabicUnitName({
    englishName: page.fromName,
    slug: fromUnitInfo?.slug,
    symbol: page.fromUnit,
  });
  const localizedToName = getArabicUnitName({
    englishName: page.toName,
    slug: toUnitInfo?.slug,
    symbol: page.toUnit,
  });
  const localizedCategoryName = getArabicCategoryLabel(
    page.category
  );
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
  const formulaText = buildArabicConversionFormula(
    page.fromUnit,
    page.toUnit,
    oneUnitResult,
    page.category
  );
  const pageUrl = buildSiteUrl(`/ar/${page.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: buildSiteUrl("/ar"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: localizedCategoryName,
        item: buildSiteUrl(
          categoryPage
            ? `/ar/categories/${categoryPage.slug}`
            : "/ar/all-conversions"
        ),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `محول ${localizedFromName} إلى ${localizedToName}`,
        item: pageUrl,
      },
    ],
  };
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `محول ${localizedFromName} إلى ${localizedToName}`,
    url: pageUrl,
    description: `أداة مجانية لتحويل ${localizedFromName} إلى ${localizedToName}.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="conversion-page" lang="ar" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(applicationSchema),
        }}
      />

      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label="مسار الصفحة"
        >
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">›</span>
          {categoryPage ? (
            <Link href={`/ar/categories/${categoryPage.slug}`}>
              {localizedCategoryName}
            </Link>
          ) : (
            <span>{localizedCategoryName}</span>
          )}
          <span aria-hidden="true">›</span>
          <span>
            {localizedFromName} إلى {localizedToName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>محول {localizedFromName} إلى {localizedToName}</h1>

            <p className="conversion-hero-description">
              أدخل القيمة المطلوبة للحصول على نتيجة التحويل
              بشكل فوري داخل الواجهة العربية.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={localizedFromName}
              toName={localizedToName}
              locale="ar"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>ملخص التحويل</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formatNumber(oneUnitResult)} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>الصيغة</dt>
                <dd>{formulaText}</dd>
              </div>

              <div>
                <dt>الفئة</dt>
                <dd>{localizedCategoryName}</dd>
              </div>

              <div>
                <dt>الوحدات</dt>
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
            كيف يتم التحويل من {localizedFromName} إلى {localizedToName}؟
          </h2>

          <p>
            يعتمد هذا التحويل على العلاقة الرياضية الثابتة بين{" "}
            {localizedFromName} و{localizedToName}. يمكنك استخدام الأداة
            في أعلى الصفحة لإدخال أي قيمة، أو الاعتماد على
            الصيغة التالية عند الحاجة إلى مراجعة سريعة.
          </p>

          <div className="conversion-formula">
            <strong>صيغة التحويل</strong>
            <p>{formulaText}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            جدول تحويل {localizedFromName} إلى {localizedToName}
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{localizedFromName}</th>
                  <th>{localizedToName}</th>
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
            <h2>
              عن وحدة{" "}
              {getArabicUnitName({
                englishName: fromUnitInfo.name,
                slug: fromUnitInfo.slug,
                symbol: fromUnitInfo.symbol,
              })}
            </h2>

            <p>
              الرمز: {fromUnitInfo.symbol}. النظام:{" "}
              {getArabicMeasurementSystem(
                fromUnitInfo.measurementSystem
              )}
            </p>
            <p>
              العلاقة المرجعية: {fromUnitInfo.siEquivalent}.
            </p>
            <p>
              تظهر هذه الوحدة غالبًا في سياقات{" "}
              {getArabicCategoryUsage(fromUnitInfo.category)}.
            </p>

            <Link
              className="text-link"
              href={`/ar/unit-guides/${fromUnitInfo.slug}`}
            >
              فتح دليل وحدة{" "}
              {getArabicUnitName({
                englishName: fromUnitInfo.name,
                slug: fromUnitInfo.slug,
                symbol: fromUnitInfo.symbol,
              })}
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>
              عن وحدة{" "}
              {getArabicUnitName({
                englishName: toUnitInfo.name,
                slug: toUnitInfo.slug,
                symbol: toUnitInfo.symbol,
              })}
            </h2>

            <p>
              الرمز: {toUnitInfo.symbol}. النظام:{" "}
              {getArabicMeasurementSystem(
                toUnitInfo.measurementSystem
              )}
            </p>
            <p>
              العلاقة المرجعية: {toUnitInfo.siEquivalent}.
            </p>
            <p>
              تظهر هذه الوحدة غالبًا في سياقات{" "}
              {getArabicCategoryUsage(toUnitInfo.category)}.
            </p>

            <Link
              className="text-link"
              href={`/ar/unit-guides/${toUnitInfo.slug}`}
            >
              فتح دليل وحدة{" "}
              {getArabicUnitName({
                englishName: toUnitInfo.name,
                slug: toUnitInfo.slug,
                symbol: toUnitInfo.symbol,
              })}
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>التحويل العكسي</h2>

            <Link
              className="text-link"
              href={`/ar/${reversePage.slug}`}
            >
              {getArabicUnitName({
                englishName: reversePage.fromName,
                symbol: reversePage.fromUnit,
              })}{" "}
              إلى{" "}
              {getArabicUnitName({
                englishName: reversePage.toName,
                symbol: reversePage.toUnit,
              })}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>تحويلات مرتبطة</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/ar/${relatedPage.slug}`}>
                    {getArabicUnitName({
                      englishName: relatedPage.fromName,
                      symbol: relatedPage.fromUnit,
                    })}{" "}
                    إلى{" "}
                    {getArabicUnitName({
                      englishName: relatedPage.toName,
                      symbol: relatedPage.toUnit,
                    })}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>المراجع</h2>

            <p>
              تعتمد علاقات التحويل في هذه الصفحة على مراجع
              القياس القياسية المستخدمة داخل الموقع.
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
          <h2>لغات أخرى</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            عرض النسخة التركية
          </Link>

          <Link
            className="text-link"
            href={`/en/${page.slug}`}
            hrefLang="en"
          >
            Open the English version
          </Link>

          {germanPage && (
            <Link
              className="text-link"
              href={`/de/${germanPage.slug}`}
              hrefLang="de"
            >
              Deutsche Version öffnen
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}

export default async function ArabicLocalizedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    renderStandaloneToolPage(slug) ??
    renderConversionPage(slug) ??
    notFound()
  );
}
