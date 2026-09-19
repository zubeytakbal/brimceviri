"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { bengaliCategoryPages } from "../converter/localizedBengaliCategoryPages";
import { bengaliConversionPages } from "../converter/localizedBengaliConversionPages";
import { bengaliUnitPages } from "../converter/localizedBengaliUnitPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import type { SiteNotification } from "../converter/siteNotifications";
import { DecorativeIcon, getCategoryIconName, type SiteIconName } from "./siteIcons";
import NotificationBell from "./NotificationBell";

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon className="home-category-icon-svg" name={name} size={44} />
    </span>
  );
}

function normalizeSearchTextBn(value: string) {
  return value
    .toLocaleLowerCase("bn")
    .replace(/[^ঀ-৿a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => bengaliCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof bengaliCategoryPages)[number] => Boolean(page));

const primaryCategoryCards = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/bn/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// homeCategoryOrder-e olmayan diger butun kategoriler (AR/TR versiyonundaki
// gibi) ikincil kategori olarak burada listelenir.
const secondaryCategoryCards = bengaliCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/bn/categories/${page.slug}`,
    title: page.title,
    iconName: getCategoryIconName(page.category) as SiteIconName,
  }));

// TR/AR versiyonlariyla ayni, bolgeye ozel olmayan genel-fayda donusum
// ciftleri.
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
  .map((sourceSlug) => bengaliConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof bengaliConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...bengaliConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/bn/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = bengaliUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: `/bn/unit-guides/${unitPage.slug}`,
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = bengaliConversionPages.map((page) => ({
  id: page.slug,
  href: `/bn/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextBn(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

type BengaliStandaloneTool = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
};

const bengaliStandaloneTools: BengaliStandaloneTool[] = [
  {
    id: "traditional-weight",
    href: "/bn/traditional-weight",
    title: "ঐতিহ্যবাহী ওজন একক রূপান্তরকারী",
    description: "মণ, সের, ছটাক ও তোলা কিলোগ্রাম ও গ্রামে রূপান্তর করুন।",
    iconName: "mass",
  },
  {
    id: "paint-calculator",
    href: "/bn/paint-calculator",
    title: "রং ক্যালকুলেটর",
    description: "ঘরের আকার থেকে প্রয়োজনীয় রঙের পরিমাণ হিসাব করুন।",
    iconName: "paintCalculator",
  },
  {
    id: "bmi-calculator",
    href: "/bn/bmi-calculator",
    title: "বিএমআই ক্যালকুলেটর",
    description: "উচ্চতা ও ওজন থেকে বিএমআই এবং দৈনিক ক্যালরি চাহিদা হিসাব করুন।",
    iconName: "bmiCalculator",
  },
  {
    id: "number-base-calculator",
    href: "/bn/number-base-calculator",
    title: "সংখ্যা পদ্ধতি রূপান্তরকারী",
    description: "বাইনারি, অক্টাল, ডেসিমেল ও হেক্সাডেসিমেল সংখ্যা রূপান্তর করুন।",
    iconName: "numberBaseCalculator",
  },
];

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: bengaliConversionPages.length,
  tools: bengaliStandaloneTools.length,
};

export default function BengaliHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchTextBn(deferredQuery);

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
    <main className="directory-home" lang="bn">
      <NotificationBell notifications={notifications} locale="bn" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">বাংলায় একক রূপান্তরকারী</p>
            <h1>সঠিক রূপান্তর পৃষ্ঠা দ্রুত খুঁজুন</h1>
            <p className="directory-lead">
              দৈর্ঘ্য, ভর, চাপ এবং আরও অনেক একক সম্পূর্ণ বাংলায় রূপান্তর করুন,
              সাথে একক গাইড ও ব্যবহারযোগ্য দৈনন্দিন ক্যালকুলেটর।
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>রূপান্তর খুঁজুন</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="উদাহরণ: মিটার ফুট"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon className="directory-button-icon" name="search" size={18} />
                  খুলুন
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                বাংলা বা ইংরেজিতে একক নাম লিখুন, তারপর প্রথম ফলাফল খুলতে Enter চাপুন।
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>অনুসন্ধান ফলাফল</strong>
                    <span>খুলতে Enter চাপুন</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              বিভাগ: {result.categoryLabel} · {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">কোনো মিল পাওয়া যায়নি।</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>সক্রিয় বিভাগ</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>রূপান্তর পৃষ্ঠা</dt>
                <dd>{stats.conversions}</dd>
              </div>
              <div>
                <dt>প্রস্তুত টুলস</dt>
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
              <h2>একক রূপান্তর</h2>
              <p>একটি বিভাগ বেছে নিয়ে তার সব একক ও রূপান্তর পৃষ্ঠা দেখুন।</p>
            </div>

            <Link className="directory-section-link" href="/bn/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              সব বিভাগ ও টুলস
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
              <h3>আরও রূপান্তর বিভাগ</h3>
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
            <Link className="directory-section-link" href="/bn/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              সব বিভাগ ও রূপান্তর দেখুন
            </Link>
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>জনপ্রিয় রূপান্তর</h2>
              <p>সবচেয়ে বেশি খোঁজা রূপান্তর পৃষ্ঠায় সরাসরি যান।</p>
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
                <h2>জনপ্রিয় একক</h2>
                <p>সবচেয়ে বেশি খোঁজা এককগুলোর বিস্তারিত বাংলা গাইড।</p>
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
              <h2>প্রস্তুত টুলস ও ক্যালকুলেটর</h2>
              <p>সম্পূর্ণ বাংলায় শিরোনাম, কনটেন্ট ও ইন্টারফেসসহ ব্যবহারযোগ্য পৃষ্ঠা।</p>
            </div>
          </header>

          <div className="directory-home-category-grid">
            {bengaliStandaloneTools.map((tool) => (
              <article className="directory-home-card" key={tool.id}>
                <Link
                  className="directory-card-stretch"
                  href={tool.href}
                  aria-label={`${tool.title} - ${tool.description}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={tool.iconName} />
                  <h3 className="home-category-title">{tool.title}</h3>
                  <p className="directory-card-description">{tool.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
