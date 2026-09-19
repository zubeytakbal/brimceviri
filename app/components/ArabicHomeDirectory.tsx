"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { arabicStandaloneTools } from "../i18n/arabicStandaloneTools";
import { arabicCategoryPages } from "../converter/localizedArabicCategoryPages";
import { arabicUnitPages } from "../converter/localizedArabicUnitPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { getArabicCategoryLabel, getArabicUnitName } from "../i18n/arabicLocalization";
import type { SiteNotification } from "../converter/siteNotifications";
import { DecorativeIcon, getCategoryIconName, type SiteIconName } from "./siteIcons";
import NotificationBell from "./NotificationBell";

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon
        className="home-category-icon-svg"
        name={name}
        size={44}
      />
    </span>
  );
}

function normalizeSearchTextAr(value: string) {
  return value
    .toLocaleLowerCase("ar")
    .replace(/[^؀-ۿa-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => arabicCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof arabicCategoryPages)[number] => Boolean(page));

const primaryCategoryCards = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/ar/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// كل الفئات غير الموجودة في homeCategoryOrder (البطاقات الأساسية أعلى
// الصفحة) تُعرض هنا كفئات ثانوية، تمامًا كما تفعل النسخة التركية.
const secondaryCategoryCards = arabicCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/ar/categories/${page.slug}`,
    title: page.title,
    iconName: getCategoryIconName(page.category) as SiteIconName,
  }));

// نفس التحويلات المفضّلة المستخدمة في النسخة التركية -- قيم عامة عالية
// الفائدة (مساحة، كتلة، ضغط) وليست خاصة بمنطقة بعينها.
const preferredConversionSourceSlugs = [
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "metre-fit",
  "kilogram-gram",
  "kilogram-pound",
  "psi-bar",
];

const preferredConversions = preferredConversionSourceSlugs
  .map((sourceSlug) => englishConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof englishConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...englishConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => {
    const fromName = getArabicUnitName({ englishName: page.fromName, symbol: page.fromUnit });
    const toName = getArabicUnitName({ englishName: page.toName, symbol: page.toUnit });

    return {
      id: page.slug,
      href: `/ar/${page.slug}`,
      label: `${fromName} ← ${toName}`,
      description: `${page.fromUnit} ← ${page.toUnit}`,
    };
  });

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const englishUnit = englishUnitPages.find((page) => page.sourceSlug === sourceSlug);
    const arabicUnit = arabicUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!englishUnit || !arabicUnit) {
      return null;
    }

    return {
      id: englishUnit.slug,
      href: `/ar/unit-guides/${englishUnit.slug}`,
      label: arabicUnit.name,
      categoryLabel: getArabicCategoryLabel(englishUnit.category),
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = englishConversionPages.map((page) => {
  const fromName = getArabicUnitName({ englishName: page.fromName, symbol: page.fromUnit });
  const toName = getArabicUnitName({ englishName: page.toName, symbol: page.toUnit });
  const categoryLabel = getArabicCategoryLabel(page.category);

  return {
    id: page.slug,
    href: `/ar/${page.slug}`,
    label: `${fromName} ← ${toName}`,
    description: `${page.fromUnit} ← ${page.toUnit}`,
    categoryLabel,
    searchText: normalizeSearchTextAr(
      [fromName, toName, page.fromUnit, page.toUnit, page.slug, categoryLabel].join(" ")
    ),
  };
});

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: englishConversionPages.length,
  tools: arabicStandaloneTools.length,
};

export default function ArabicHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchTextAr(deferredQuery);

  const searchResults = normalizedQuery
    ? searchables.filter((item) => item.searchText.includes(normalizedQuery)).slice(0, 8)
    : [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
    }
  }

  return (
    <main className="directory-home" lang="ar" dir="rtl">
      <NotificationBell notifications={notifications} locale="ar" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">أدوات وحاسبات بالعربية</p>
            <h1>ابحث عن أداة التحويل المناسبة</h1>
            <p className="directory-lead">
              حوّل بين وحدات الطول والكتلة والضغط وغيرها بالعربية بالكامل، مع
              دلائل وحدات وأدوات يومية جاهزة للاستخدام مباشرة.
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>ابحث عن تحويل</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="مثال: متر إلى قدم"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon className="directory-button-icon" name="search" size={18} />
                  فتح
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                اكتب اسم الوحدة بالعربية أو الإنجليزية، ثم اضغط Enter لفتح أول نتيجة.
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>نتائج البحث</strong>
                    <span>اضغط Enter للفتح</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              الفئة: {result.categoryLabel} · {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">لا توجد نتائج مطابقة.</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>فئات نشطة</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>صفحات تحويل</dt>
                <dd>{stats.conversions}</dd>
              </div>
              <div>
                <dt>أدوات جاهزة</dt>
                <dd>{stats.tools}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>تحويلات الوحدات</h2>
              <p>اختر فئة لعرض جميع وحداتها وصفحات التحويل الخاصة بها بالعربية.</p>
            </div>

            <Link className="directory-section-link" href="/ar/other-conversions">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              كل الفئات والأدوات
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {primaryCategoryCards.map((category) => (
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.title} - ${category.description}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={category.iconName} />
                  <h3 className="home-category-title">{category.title}</h3>
                </div>
              </article>
            ))}
          </div>

          {secondaryCategoryCards.length > 0 && (
            <div className="directory-secondary-categories">
              <h3>فئات تحويل إضافية</h3>
              <div className="directory-home-category-grid">
                {secondaryCategoryCards.slice(0, 8).map((category) => (
                  <article className="directory-home-card" key={category.id}>
                    <Link
                      className="directory-card-stretch"
                      href={category.href}
                      aria-label={category.title}
                    />

                    <div className="directory-card-body directory-card-body-icon">
                      <CardIcon name={category.iconName} />
                      <h3 className="home-category-title">{category.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="directory-section-footer">
            <Link className="directory-section-link" href="/ar/other-conversions">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              عرض جميع الفئات والتحويلات
            </Link>
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>تحويلات شائعة</h2>
              <p>روابط مباشرة لأكثر صفحات التحويل بحثًا.</p>
            </div>
          </header>

          <ul className="directory-popular-list">
            {popularConversions.map((conversion) => (
              <li key={conversion.id}>
                <Link href={conversion.href}>
                  <span className="directory-conversion-title">{conversion.label}</span>
                  <small>{conversion.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {popularUnits.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>وحدات شائعة البحث</h2>
                <p>دلائل وحدات مفصّلة بالعربية لأكثر الوحدات بحثًا.</p>
              </div>
            </header>

            <ul className="directory-popular-list">
              {popularUnits.map((unit) => (
                <li key={unit.id}>
                  <Link href={unit.href}>
                    <span className="directory-conversion-title">{unit.label}</span>
                    <small>{unit.categoryLabel}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>الحاسبات الهندسية</h2>
              <p>
                حاسبات جاهزة للكهرباء والضغط والموائع وانتقال الحرارة، بصيغ
                هندسية وأمثلة عملية.
              </p>
            </div>

            <Link className="directory-section-link" href="/ar/engineering-calculators">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              كل الحاسبات الهندسية
            </Link>
          </header>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>أدوات ومحولات جاهزة</h2>
              <p>
                صفحات معربة بالكامل، مع عناوين ومحتوى وواجهة استخدام بالعربية.
              </p>
            </div>
          </header>

          <div className="directory-home-category-grid">
            {arabicStandaloneTools.map((tool) => (
              <article className="directory-home-card" key={tool.slug}>
                <Link
                  className="directory-card-stretch"
                  href={tool.arabicPath}
                  aria-label={`${tool.title} - ${tool.cardDescription}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={tool.iconName} />
                  <h3 className="home-category-title">{tool.title}</h3>
                  <p className="directory-card-description">
                    {tool.cardDescription}
                  </p>
                </div>
              </article>
            ))}

            <article className="directory-home-card">
              <Link
                className="directory-card-stretch"
                href="/ar/zakat-calculator"
                aria-label="حاسبة الزكاة - تحسب زكاة المال والذهب والفضة مع سعر السوق الحي"
              />

              <div className="directory-card-body directory-card-body-icon">
                <CardIcon name="vatCalculator" />
                <h3 className="home-category-title">حاسبة الزكاة</h3>
                <p className="directory-card-description">
                  تحسب زكاة المال والذهب والفضة باستخدام سعر السوق الحي.
                </p>
              </div>
            </article>

            <article className="directory-home-card">
              <Link
                className="directory-card-stretch"
                href="/ar/gold-price-calculator"
                aria-label="حاسبة سعر الذهب والفضة الحي - القيمة حسب الوزن والعيار والعملة"
              />

              <div className="directory-card-body directory-card-body-icon">
                <CardIcon name="mass" />
                <h3 className="home-category-title">حاسبة سعر الذهب والفضة</h3>
                <p className="directory-card-description">
                  تحسب قيمة الذهب أو الفضة حسب الوزن والعيار وعملتك بسعر حي.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
