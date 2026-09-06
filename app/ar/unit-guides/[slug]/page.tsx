import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../../converter/PairConverter";
import { englishConversionPages } from "../../../converter/localizedConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import {
  findEnglishCategoryPageByCategory,
} from "../../../converter/localizedCategoryPages";
import { findGermanUnitPageByTurkishSlug } from "../../../converter/localizedGermanUnitPages";
import {
  englishUnitPages,
  findEnglishUnitPageBySlug,
} from "../../../converter/localizedUnitPages";
import {
  getArabicCategoryLabel,
  getArabicMeasurementSystem,
  getArabicUnitName,
  getArabicCategoryUsage,
} from "../../../i18n/arabicLocalization";
import { findArabicUnitPageBySourceSlug } from "../../../converter/localizedArabicUnitPages";
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

const historicalUnitSlugs = new Set([
  "arshin",
  "endaze",
  "okka",
  "dirham",
  "byzantine-foot",
  "byzantine-fathom",
  "byzantine-litra",
  "byzantine-ounce",
  "cig",
]);

export const dynamicParams = false;

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
      title: "الوحدة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const arabicUnitName = getArabicUnitName({
    englishName: unitPage.name,
    slug: unitPage.slug,
    symbol: unitPage.symbol,
  });
  const realContent = findArabicUnitPageBySourceSlug(unitPage.sourceSlug);
  const title = `${arabicUnitName} - دليل الوحدة والتحويلات`;
  const description =
    realContent?.shortDescription ??
    `تعرف على ${arabicUnitName} ورمزها ${unitPage.symbol} وعلاقتها المرجعية بوحدات ${getArabicCategoryLabel(unitPage.category)} داخل النسخة العربية.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ar/unit-guides/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/ar/unit-guides/${unitPage.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/ar/unit-guides/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "ar_AR",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ArabicUnitGuidePage({
  params,
}: PageProps) {
  const { slug } = await params;
  const unitPage = findEnglishUnitPageBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const germanPage = findGermanUnitPageByTurkishSlug(
    unitPage.sourceSlug
  );
  const categoryPage = findEnglishCategoryPageByCategory(
    unitPage.category
  );
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

  const pageUrl = buildSiteUrl(
    `/ar/unit-guides/${unitPage.slug}`
  );
  const arabicUnitName = getArabicUnitName({
    englishName: unitPage.name,
    slug: unitPage.slug,
    symbol: unitPage.symbol,
  });
  const arabicCategoryLabel = getArabicCategoryLabel(
    unitPage.category
  );
  const localizedMeasurementSystem = getArabicMeasurementSystem(
    unitPage.measurementSystem
  );
  const categoryUsage = getArabicCategoryUsage(unitPage.category);
  const realContent = findArabicUnitPageBySourceSlug(unitPage.sourceSlug);

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
        name: "دليل الوحدات",
        item: buildSiteUrl("/ar/unit-guides"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: arabicUnitName,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${arabicUnitName} - دليل الوحدة والتحويلات`,
    description: `صفحة عربية تعرف بوحدة ${arabicUnitName} ورمزها ${unitPage.symbol}.`,
    mainEntityOfPage: pageUrl,
    inLanguage: "ar",
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
    <main
      className="unit-information-page"
      lang="ar"
      dir="rtl"
    >
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
        <nav
          className="breadcrumbs"
          aria-label="مسار الصفحة"
        >
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">›</span>
          <Link href="/ar/unit-guides">دليل الوحدات</Link>
          <span aria-hidden="true">›</span>
          <span>{arabicUnitName}</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">{unitPage.symbol}</p>
          <h1>{arabicUnitName}</h1>
          <p>
            {realContent?.shortDescription ??
              `هذه الصفحة تقدم تعريفًا سريعًا لوحدة ${arabicUnitName}، مع رمزها واستخداماتها الأساسية وعلاقتها المرجعية بوحدات ${arabicCategoryLabel}.`}
          </p>
        </header>

        <div className="unit-page-layout">
          <div className="unit-page-content">
            <section className="unit-article-introduction">
              <p>
                تنتمي وحدة {arabicUnitName} إلى فئة{" "}
                {arabicCategoryLabel}، ويظهر رمزها القياسي على
                الموقع بصيغة {unitPage.symbol}.
              </p>
              <p>
                النظام المرجعي: {localizedMeasurementSystem}. المكافئ
                المرجعي: {unitPage.siEquivalent}.
              </p>
              <p>
                تظهر هذه الوحدة غالبًا في سياقات {categoryUsage}.
              </p>
            </section>

            <section className="conversion-section">
              <h2>حقائق سريعة</h2>

              <dl className="unit-facts">
                <div>
                  <dt>اسم الوحدة</dt>
                  <dd>{arabicUnitName}</dd>
                </div>
                <div>
                  <dt>الرمز</dt>
                  <dd>{unitPage.symbol}</dd>
                </div>
                <div>
                  <dt>الفئة</dt>
                  <dd>{arabicCategoryLabel}</dd>
                </div>
                <div>
                  <dt>النظام</dt>
                  <dd>{localizedMeasurementSystem}</dd>
                </div>
                <div>
                  <dt>العلاقة المرجعية</dt>
                  <dd>{realContent?.siEquivalent ?? unitPage.siEquivalent}</dd>
                </div>
                <div>
                  <dt>الاستخدامات</dt>
                  <dd>{realContent?.commonUses ?? categoryUsage}</dd>
                </div>
              </dl>
            </section>

            {historicalUnitSlugs.has(unitPage.slug) && (
              <p className="category-inline-link">
                هذه الوحدة مدرجة أيضًا ضمن{" "}
                <Link href="/ar/historical-units">
                  صفحة الوحدات التاريخية
                </Link>{" "}
                العربية مع وحدات بيزنطية وعثمانية ووحدات قديمة
                أخرى.
              </p>
            )}

            {realContent ? (
              <section className="conversion-section unit-long-section">
                <h2>الخلفية والتاريخ</h2>
                <p>{realContent.historySummary}</p>
              </section>
            ) : (
              <section className="conversion-section unit-long-section">
                <h2>تعريف مختصر</h2>
                <p>
                  {arabicUnitName} هي وحدة ضمن فئة{" "}
                  {arabicCategoryLabel}، وتستخدم لقراءة القيم
                  وتمثيلها بصورة معيارية وفق السياق الذي تظهر فيه.
                </p>
                <p>
                  على هذه الصفحة نركز على الرمز والعلاقة المرجعية
                  وروابط التحويلات المرتبطة بدل الاكتفاء باسم
                  الوحدة فقط.
                </p>
              </section>
            )}

            {!realContent && (
              <section className="conversion-section unit-long-section">
                <h2>الخلفية والاستخدام</h2>
                <p>
                  تظهر هذه الوحدة كثيرًا في سياقات {categoryUsage}
                  ، ولهذا يفيد وجود صفحة مرجعية سريعة لها داخل النسخة
                  العربية من الموقع.
                </p>
                <p>
                  إذا كنت تحتاج إلى الحساب الفوري، يمكنك استخدام
                  أداة التحويل السريع في الجانب أو فتح إحدى صفحات
                  التحويلات المرتبطة أدناه.
                </p>
              </section>
            )}

            {relatedConversions.length > 0 && (
              <section
                className="conversion-section"
                id="conversion-tools"
              >
                <h2>تحويلات مرتبطة</h2>

                <ul className="related-conversion-list">
                  {relatedConversions.map((conversion) => (
                    <li key={conversion.slug}>
                      <Link href={`/ar/${conversion.slug}`}>
                        {getArabicUnitName({
                          englishName: conversion.fromName,
                          symbol: conversion.fromUnit,
                        })}{" "}
                        إلى{" "}
                        {getArabicUnitName({
                          englishName: conversion.toName,
                          symbol: conversion.toUnit,
                        })}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="conversion-section language-alternatives">
              <h2>لغات أخرى</h2>

              <Link
                className="text-link"
                href={`/birimler/${unitPage.sourceSlug}`}
                hrefLang="tr"
              >
                عرض النسخة التركية
              </Link>

              <Link
                className="text-link"
                href={`/en/units/${unitPage.slug}`}
                hrefLang="en"
              >
                Open the English version
              </Link>

              {germanPage && (
                <Link
                  className="text-link"
                  href={`/de/einheiten/${germanPage.slug}`}
                  hrefLang="de"
                >
                  Deutsche Version öffnen
                </Link>
              )}
            </section>
          </div>

          {converterData && (
            <aside className="unit-page-converter">
              <h2>تحويل سريع</h2>

              <PairConverter
                category={converterData.category}
                fromUnit={converterData.fromUnit}
                toUnit={converterData.toUnit}
                fromName={converterData.fromName}
                toName={converterData.toName}
                locale="ar"
              />

              {relatedConversions.length > 0 && (
                <nav className="unit-sidebar-links">
                  <h3>أدوات مرتبطة</h3>

                  {relatedConversions
                    .slice(0, 6)
                    .map((conversion) => (
                      <Link
                        href={`/ar/${conversion.slug}`}
                        key={conversion.slug}
                      >
                        {getArabicUnitName({
                          englishName: conversion.fromName,
                          symbol: conversion.fromUnit,
                        })}{" "}
                        إلى{" "}
                        {getArabicUnitName({
                          englishName: conversion.toName,
                          symbol: conversion.toUnit,
                        })}
                      </Link>
                    ))}
                </nav>
              )}

              {categoryPage && (
                <nav className="unit-sidebar-links">
                  <h3>الفئة</h3>

                  <Link href={`/ar/categories/${categoryPage.slug}`}>
                    كل وحدات {arabicCategoryLabel}
                  </Link>
                </nav>
              )}
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
