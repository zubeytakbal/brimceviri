import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import CategoryPageLayout from "../../../components/CategoryPageLayout";
import { createConversionCards } from "../../../components/categoryPageUtils";
import {
  englishCategoryPages,
  findEnglishCategoryPage,
} from "../../../converter/localizedCategoryPages";
import { englishConversionPages } from "../../../converter/localizedConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { findGermanCategoryPageByTurkishSlug } from "../../../converter/localizedGermanCategoryPages";
import { homeCategoryOrder } from "../../../converter/homeCategoryOrder";
import { englishUnitPages } from "../../../converter/localizedUnitPages";
import {
  buildArabicCategoryFacts,
  getArabicCategoryLabel,
  getArabicUnitName,
} from "../../../i18n/arabicLocalization";
import { findArabicCategoryPageByTurkishSlug } from "../../../converter/localizedArabicCategoryPages";
import { SITE_URL, buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return englishCategoryPages.map((categoryPage) => ({
    slug: categoryPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryPage = findEnglishCategoryPage(slug);

  if (!categoryPage) {
    return {
      title: "الفئة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const arabicLabel = getArabicCategoryLabel(
    categoryPage.category
  );
  const realContent = findArabicCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const title = realContent?.title ?? `${arabicLabel} - دليل ووحدات وتحويلات`;
  const description =
    realContent?.description ??
    `استعرض تحويلات ${arabicLabel} وأدلة الوحدات المرتبطة بها داخل النسخة العربية من BirimCeviri.app.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ar/categories/${categoryPage.slug}`,
      ...buildFullLanguageAlternates(`/ar/categories/${categoryPage.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/ar/categories/${categoryPage.slug}`),
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

export default async function ArabicCategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const categoryPage = findEnglishCategoryPage(slug);

  if (!categoryPage) {
    notFound();
  }

  const germanPage = findGermanCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const arabicLabel = getArabicCategoryLabel(
    categoryPage.category
  );
  const categoryUnits = englishUnitPages.filter(
    (unitPage) =>
      unitPage.category === categoryPage.category
  );
  const categoryConversions = englishConversionPages.filter(
    (conversionPage) =>
      conversionPage.category === categoryPage.category
  );
  const localizedCategoryConversions = categoryConversions.map(
    (conversionPage) => ({
      ...conversionPage,
      fromName: getArabicUnitName({
        englishName: conversionPage.fromName,
        symbol: conversionPage.fromUnit,
      }),
      toName: getArabicUnitName({
        englishName: conversionPage.toName,
        symbol: conversionPage.toUnit,
      }),
    })
  );
  const localizedCategoryUnits = categoryUnits.map((unitPage) => ({
    ...unitPage,
    localizedName: getArabicUnitName({
      englishName: unitPage.name,
      slug: unitPage.slug,
      symbol: unitPage.symbol,
    }),
  }));
  const conversionCards = createConversionCards({
    conversions: localizedCategoryConversions,
    hrefForSlug: (conversionSlug) => `/ar/${conversionSlug}`,
    directionLabel: (conversion) =>
      `من ${conversion.fromName} إلى ${conversion.toName}`,
    symbolSeparator: "↔",
    titlePairSeparator: "↔",
    titleSingleSeparator: "→",
  });
  const isSecondaryCategory = !(
    homeCategoryOrder as readonly string[]
  ).includes(categoryPage.category);
  const pageUrl = buildSiteUrl(
    `/ar/categories/${categoryPage.slug}`
  );
  const realContent = findArabicCategoryPageByTurkishSlug(
    categoryPage.sourceSlug
  );
  const categoryFacts = realContent
    ? realContent.facts
    : buildArabicCategoryFacts(
        categoryPage.category,
        localizedCategoryUnits.length,
        localizedCategoryConversions.length
      );
  const categoryDescription =
    realContent?.description ??
    `هذه الصفحة تجمع وحدات وتحويلات ${arabicLabel} في واجهة عربية مرتبة، مع روابط مباشرة إلى الأدلة التفصيلية وأشهر الأدوات المرتبطة بنفس المجال.`;

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
        name: "الفئات",
        item: buildSiteUrl("/ar/all-conversions"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: arabicLabel,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${arabicLabel} - دليل ووحدات وتحويلات`,
    description: `صفحة عربية تجمع التحويلات والأدلة الخاصة بفئة ${arabicLabel}.`,
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
    <CategoryPageLayout
      locale="ar"
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
              __html: serializeJsonLd(articleSchema),
            }}
          />
        </>
      }
      breadcrumbAriaLabel="مسار الصفحة"
      breadcrumbs={[
        {
          label: "الرئيسية",
          href: "/ar",
        },
        {
          label: "الفئات",
        },
        {
          label: arabicLabel,
        },
      ]}
      kickerLabel="فئة وحدات"
      title={arabicLabel}
      description={categoryDescription}
      allUnitsSection={{
        heading: `تحويل جميع وحدات ${arabicLabel}`,
        content: (
          <CategoryUnitConverter
            category={categoryPage.category}
            locale="ar"
          />
        ),
      }}
      conversionHeading="التحويلات الشائعة"
      conversionCountLabel={`${conversionCards.length} أداة`}
      conversionCards={conversionCards}
      unitGuidesHeading="أدلة الوحدات"
      unitGuidesCountLabel={`${localizedCategoryUnits.length} وحدة`}
      unitGuides={localizedCategoryUnits.map((unitPage) => ({
        href: `/ar/unit-guides/${unitPage.slug}`,
        label: unitPage.localizedName,
        symbol: unitPage.symbol,
      }))}
      detailHeading={`دليل سريع لفئة ${arabicLabel}`}
      detailContent={
        <>
          <div className="category-article-introduction">
            {realContent ? (
              realContent.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>
                  يضم هذا القسم كل ما يرتبط بفئة {arabicLabel} من
                  تحويلات مباشرة وأدلة وحدات وروابط عملية تساعد
                  المستخدم على الوصول بسرعة إلى الأداة المناسبة.
                </p>
                <p>
                  يمكنك البدء من المحول السريع أعلى الصفحة إذا كنت
                  تعرف الوحدتين مسبقًا، أو الانتقال إلى أدلة
                  الوحدات إذا كنت تريد فهم معنى الوحدة ورمزها
                  وعلاقتها بالنظام الدولي.
                </p>
              </>
            )}

            <dl className="category-facts">
              {categoryFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="category-article-content">
            {realContent ? (
              realContent.sections.map((section) => (
                <section
                  className="conversion-section unit-long-section"
                  key={section.title}
                >
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))
            ) : (
              <section className="conversion-section unit-long-section">
                <h2>كيف تستفيد من هذه الفئة؟</h2>
                <p>
                  عند تكرار نفس النوع من التحويلات داخل العمل
                  اليومي أو الدراسة، يفيدك جمع الأدوات في صفحة
                  واحدة بدل التنقل العشوائي بين صفحات منفصلة.
                </p>
                <p>
                  لهذا ربطنا في هذه الصفحة بين المحول العام،
                  والتحويلات الشائعة، وأدلة الوحدات الأكثر
                  استخدامًا داخل الفئة نفسها.
                </p>
              </section>
            )}

            <section className="conversion-section unit-long-section">
              <h2>الوحدات الشائعة داخل القسم</h2>
              <p>
                تظهر أدناه مجموعة من الوحدات المرتبطة بهذه
                الفئة. يمكنك فتح كل وحدة على حدة لمعرفة رمزها،
                استخداماتها، وعلاقتها المرجعية بوحدات أخرى.
              </p>

              <ul className="related-conversion-list">
                {localizedCategoryUnits
                  .slice(0, 8)
                  .map((unitPage) => (
                  <li key={unitPage.slug}>
                    <Link href={`/ar/unit-guides/${unitPage.slug}`}>
                      {unitPage.localizedName} ({unitPage.symbol})
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="conversion-section unit-long-section">
              <h2>البدء الأسرع</h2>
              <p>
                إذا كنت تبحث عن تحويل مباشر، ابدأ من قائمة
                التحويلات الشائعة في أعلى الصفحة. وإذا كنت تريد
                توسيع التصفح خارج هذه الفئة، فانتقل إلى بوابة{" "}
                <Link href="/ar/all-conversions">
                  كل التحويلات
                </Link>{" "}
                أو إلى{" "}
                <Link href="/ar/unit-guides">
                  دليل الوحدات
                </Link>
                .
              </p>
            </section>

            <section className="conversion-section language-alternatives">
              <h2>لغات أخرى</h2>

              <Link
                className="text-link"
                href={`/kategoriler/${categoryPage.sourceSlug}`}
                hrefLang="tr"
              >
                عرض النسخة التركية
              </Link>

              <Link
                className="text-link"
                href={`/en/categories/${categoryPage.slug}`}
                hrefLang="en"
              >
                Open the English version
              </Link>

              {germanPage && (
                <Link
                  className="text-link"
                  href={`/de/kategorien/${germanPage.slug}`}
                  hrefLang="de"
                >
                  Deutsche Version öffnen
                </Link>
              )}
            </section>
          </div>
        </>
      }
      relatedToolsSection={{
        heading: "روابط مرتبطة",
        links: [
          {
            href: "/ar/unit-guides",
            label: "دليل الوحدات",
          },
          {
            href: "/ar/all-conversions",
            label: "كل التحويلات",
          },
          {
            href: "/ar/other-conversions",
            label: "أدوات إضافية",
          },
        ],
      }}
      footerLink={
        isSecondaryCategory
          ? {
              href: "/ar/other-conversions",
              label: "العودة إلى الأدوات الإضافية",
            }
          : {
              href: "/ar/all-conversions",
              label: "فتح جميع التحويلات",
            }
      }
    />
  );
}
