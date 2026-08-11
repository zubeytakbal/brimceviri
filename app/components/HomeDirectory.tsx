"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DecorativeIcon,
  getCategoryIconName,
} from "./siteIcons";
import { calculatorPages } from "../converter/calculatorPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { conversionPages } from "../converter/conversionPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { categoryPages } from "../converter/categoryPages";
import { unitPages } from "../converter/unitPages";

type Locale = "tr" | "en";

type HomeConversion = {
  id: string;
  sourceSlug: string;
  href: string;
  label: string;
  description: string;
  category: string;
  categoryLabel: string;
  searchText: string;
};

type HomeCategory = {
  id: string;
  categoryKey: string;
  name: string;
  description: string;
  href: string;
  guideHref: string;
  guideLabel: string;
  badge: string;
  count: number;
  popularConversions: HomeConversion[];
  calculators: Array<{
    id: string;
    href: string;
    label: string;
  }>;
};

type HomeGuide = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  href: string;
};

type HomeData = {
  conversions: HomeConversion[];
  categories: HomeCategory[];
  popularConversions: HomeConversion[];
  guides: HomeGuide[];
  guideIndexHref: string;
  guideIndexLabel: string;
  allConversionsHref: string;
  allConversionsLabel: string;
  stats: {
    categories: number;
    conversions: number;
    guides: number;
  };
};

const categoryDisplayNames = {
  uzunluk: {
    tr: "Uzunluk",
    en: "Length",
    badge: "m",
  },
  kutle: {
    tr: "Kütle",
    en: "Mass",
    badge: "kg",
  },
  basinc: {
    tr: "Basınç",
    en: "Pressure",
    badge: "Pa",
  },
} as const;

const preferredSourceSlugs = [
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "metre-fit",
  "kilogram-gram",
  "kilogram-pound",
  "psi-bar",
  "kilopascal-bar",
];

const preferredGuideSourceSlugs = [
  "metre",
  "kilometre",
  "kilogram",
  "pound",
];

const copy = {
  tr: {
    eyebrow: "Teknik dönüşüm rehberi",
    title: "İhtiyacınız olan birim dönüşümünü bulun",
    description:
      "Dönüşüm araçlarını kategoriye göre tarayın, birim rehberlerini açın ve doğru sayfaya doğrudan geçin.",
    searchLabel: "Dönüşüm ara",
    searchPlaceholder:
      "Örnek: metre kilometre, kg lb, psi bar, Pa",
    searchHint:
      "Dönüşüm adı, birim adı veya sembol yazarak ilgili sayfayı bulun.",
    searchResultsLabel: "Arama sonuçları",
    searchEmpty: "Eşleşen dönüşüm bulunamadı.",
    searchEnterHint:
      "İlk sonucu açmak için Enter tuşuna basabilirsiniz.",
    searchCategoryPrefix: "Kategori",
    stats: {
      categories: "kategori sayfası",
      conversions: "dönüşüm sayfası",
      guides: "birim rehberi",
    },
    categoriesTitle: "Kategoriler",
    categoriesDescription:
      "Şu anda kapsamlı bilgi sayfası bulunan kategoriler ve öne çıkan araçlar.",
    calculatorsLabel: "hesaplayıcı",
    categoryGuideLabel: "Kategori sayfası",
    popularTitle: "Popüler dönüşümler",
    popularDescription:
      "En sık açılan araçlardan birkaçını seçin veya tam listeye geçin.",
    guidesTitle: "Birim rehberleri",
    guidesDescription:
      "Birimlerin tanımı, tarihçesi ve bilimsel kullanımı hakkında daha ayrıntılı açıklamaları burada bulabilirsiniz.",
    guidesIndexLabel: "Tüm birim rehberlerini görüntüle",
    languageSwitchLabel: "İngilizce sürüme git",
  },
  en: {
    eyebrow: "Technical conversion directory",
    title: "Find the unit conversion you need",
    description:
      "Browse calculators by category, open unit guides and jump straight to the exact conversion page.",
    searchLabel: "Search conversions",
    searchPlaceholder:
      "Example: meter kilometer, kg lb, psi bar, Pa",
    searchHint:
      "Search by conversion name, unit name or symbol to open the right page.",
    searchResultsLabel: "Search results",
    searchEmpty: "No matching conversion pages found.",
    searchEnterHint: "Press Enter to open the first result.",
    searchCategoryPrefix: "Category",
    stats: {
      categories: "category pages",
      conversions: "conversion pages",
      guides: "unit guides",
    },
    categoriesTitle: "Categories",
    categoriesDescription:
      "Categories that already have dedicated landing pages and their most-used tools.",
    calculatorsLabel: "converters",
    categoryGuideLabel: "Category page",
    popularTitle: "Popular conversions",
    popularDescription:
      "Open a few commonly used tools or continue to the complete converter list.",
    guidesTitle: "Unit guides",
    guidesDescription:
      "Use the guides for definitions, history notes and scientific context behind each measurement unit.",
    guidesIndexLabel: "Open the full unit guide",
    languageSwitchLabel: "Switch to Turkish",
  },
} as const;

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortByPreference<T extends { sourceSlug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = preferredSourceSlugs.indexOf(left.sourceSlug);
    const rightIndex = preferredSourceSlugs.indexOf(right.sourceSlug);

    const safeLeft = leftIndex === -1 ? preferredSourceSlugs.length : leftIndex;
    const safeRight =
      rightIndex === -1 ? preferredSourceSlugs.length : rightIndex;

    return safeLeft - safeRight;
  });
}

function createHomeData(locale: Locale): HomeData {
  const conversions =
    locale === "tr"
      ? conversionPages.map((page) => {
          const categoryLabel =
            categoryDisplayNames[
              page.category as keyof typeof categoryDisplayNames
            ]?.tr ?? page.category;

          return {
            id: page.slug,
            sourceSlug: page.slug,
            href: `/${page.slug}`,
            label: `${page.fromName} → ${page.toName}`,
            description: `${page.fromUnit} → ${page.toUnit}`,
            category: page.category,
            categoryLabel,
            searchText: normalizeSearchText(
              [
                page.fromName,
                page.toName,
                page.fromUnit,
                page.toUnit,
                page.slug,
                categoryLabel,
              ].join(" ")
            ),
          };
        })
      : englishConversionPages.map((page) => ({
          id: page.slug,
          sourceSlug: page.sourceSlug,
          href: `/en/${page.slug}`,
          label: `${page.fromName} → ${page.toName}`,
          description: `${page.fromUnit} → ${page.toUnit}`,
          category: page.category,
          categoryLabel: page.categoryName,
          searchText: normalizeSearchText(
            [
              page.fromName,
              page.toName,
              page.fromUnit,
              page.toUnit,
              page.slug,
              page.sourceSlug,
              page.categoryName,
            ].join(" ")
          ),
        }));

  const availableCategories =
    locale === "tr"
      ? categoryPages.map((page) => ({
          id: page.slug,
          categoryKey: page.category,
          sourceCategory: page.category,
          name:
            categoryDisplayNames[
              page.category as keyof typeof categoryDisplayNames
            ]?.tr ?? page.title,
          description: page.description,
          href: `/kategoriler/${page.slug}`,
          guideHref: `/kategoriler/${page.slug}`,
          guideLabel: copy.tr.categoryGuideLabel,
          badge:
            categoryDisplayNames[
              page.category as keyof typeof categoryDisplayNames
            ]?.badge ?? page.category.slice(0, 2).toUpperCase(),
        }))
      : englishCategoryPages.map((page) => ({
          id: page.slug,
          categoryKey: page.category,
          sourceCategory: page.category,
          name:
            categoryDisplayNames[
              page.category as keyof typeof categoryDisplayNames
            ]?.en ?? page.title,
          description: page.description,
          href: `/en/categories/${page.slug}`,
          guideHref: `/en/categories/${page.slug}`,
          guideLabel: copy.en.categoryGuideLabel,
          badge:
            categoryDisplayNames[
              page.category as keyof typeof categoryDisplayNames
            ]?.badge ?? page.category.slice(0, 2).toUpperCase(),
        }));

  const categories = availableCategories.map((category) => {
    const categoryConversions = sortByPreference(
      conversions.filter(
        (conversion) => conversion.category === category.sourceCategory
      )
    );
    const categoryCalculators =
      locale === "tr"
        ? calculatorPages
            .filter(
              (page) => page.category === category.sourceCategory
            )
            .map((page) => ({
              id: page.slug,
              href: `/hesaplayicilar/${page.slug}`,
              label: page.shortTitle,
            }))
        : englishCalculatorPages
            .filter(
              (page) => page.category === category.sourceCategory
            )
            .map((page) => ({
              id: page.slug,
              href: `/en/calculators/${page.slug}`,
              label: page.shortTitle,
            }));

    return {
      id: category.id,
      categoryKey: category.sourceCategory,
      name: category.name,
      description: category.description,
      href: category.href,
      guideHref: category.guideHref,
      guideLabel: category.guideLabel,
      badge: category.badge,
      count: categoryConversions.length,
      popularConversions: categoryConversions.slice(0, 3),
      calculators: categoryCalculators,
    };
  });

  const preferredPopularConversions = preferredSourceSlugs
    .map((slug) =>
      conversions.find((conversion) => conversion.sourceSlug === slug)
    )
    .filter((conversion): conversion is HomeConversion => Boolean(conversion));

  const popularConversions = [
    ...preferredPopularConversions,
    ...conversions.filter(
      (conversion) =>
        !preferredPopularConversions.some(
          (preferred) => preferred.id === conversion.id
        )
    ),
  ].slice(0, 8);

  const guides =
    locale === "tr"
      ? preferredGuideSourceSlugs
          .map((slug) => unitPages.find((page) => page.slug === slug))
          .filter((page): page is (typeof unitPages)[number] => Boolean(page))
          .map((page) => ({
            id: page.slug,
            name: page.name,
            symbol: page.symbol,
            description: page.shortDescription,
            href: `/birimler/${page.slug}`,
          }))
      : preferredGuideSourceSlugs
          .map((slug) =>
            englishUnitPages.find((page) => page.sourceSlug === slug)
          )
          .filter(
            (page): page is (typeof englishUnitPages)[number] => Boolean(page)
          )
          .map((page) => ({
            id: page.slug,
            name: page.name,
            symbol: page.symbol,
            description: page.shortDescription,
            href: `/en/units/${page.slug}`,
          }));

  return {
    conversions,
    categories,
    popularConversions,
    guides,
    guideIndexHref: locale === "tr" ? "/birimler" : "/en/units",
    guideIndexLabel:
      locale === "tr"
        ? copy.tr.guidesIndexLabel
        : copy.en.guidesIndexLabel,
    allConversionsHref:
      locale === "tr" ? "/tum-birimler" : "/en/all-conversions",
    allConversionsLabel:
      locale === "tr" ? "Tüm dönüşümler" : "All converters",
    stats: {
      categories: categories.length,
      conversions: conversions.length,
      guides: locale === "tr" ? unitPages.length : englishUnitPages.length,
    },
  };
}

const homeData = {
  tr: createHomeData("tr"),
  en: createHomeData("en"),
} as const;

export default function HomeDirectory({
  locale,
}: {
  locale: Locale;
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);
  const strings = copy[locale];
  const data = homeData[locale];
  const normalizedQuery = normalizeSearchText(deferredQuery);

  const searchResults = normalizedQuery
    ? data.conversions
        .filter((conversion) =>
          conversion.searchText.includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
    }
  }

  return (
    <main
      className="directory-home"
      lang={locale === "en" ? "en" : undefined}
    >
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">{strings.eyebrow}</p>
            <h1>{strings.title}</h1>
            <p className="directory-lead">{strings.description}</p>
          </div>

          <div className="directory-hero-panel">
            <form
              className="directory-search"
              onSubmit={handleSubmit}
              role="search"
            >
              <label htmlFor={inputId}>{strings.searchLabel}</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder={strings.searchPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon
                    className="directory-button-icon"
                    name="search"
                    size={18}
                  />
                  {locale === "tr" ? "Aç" : "Open"}
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                {strings.searchHint}
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>{strings.searchResultsLabel}</strong>
                    <span>{strings.searchEnterHint}</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul
                      className="directory-search-results"
                      id={resultsId}
                    >
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              {strings.searchCategoryPrefix}:{" "}
                              {result.categoryLabel} ·{" "}
                              {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">
                      {strings.searchEmpty}
                    </p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>{strings.stats.categories}</dt>
                <dd>{data.stats.categories}</dd>
              </div>

              <div>
                <dt>{strings.stats.conversions}</dt>
                <dd>{data.stats.conversions}</dd>
              </div>

              <div>
                <dt>{strings.stats.guides}</dt>
                <dd>{data.stats.guides}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{strings.categoriesTitle}</h2>
              <p>{strings.categoriesDescription}</p>
            </div>

            <Link
              className="directory-section-link"
              href={data.allConversionsHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.allConversionsLabel}
            </Link>
          </header>

          <div className="directory-category-grid">
            {data.categories.map((category) => (
              <article
                className="directory-category-card"
                key={category.id}
              >
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.name} ${strings.categoryGuideLabel}`}
                />

                <div className="directory-card-body">
                  <div className="directory-card-top">
                    <span className="directory-card-badge" aria-hidden="true">
                      <DecorativeIcon
                        name={getCategoryIconName(category.categoryKey)}
                        size={28}
                      />
                    </span>

                    <div>
                      <h3 className="home-category-title">
                        {category.name}
                      </h3>
                      <p>
                        <strong>{category.count}</strong>{" "}
                        {strings.calculatorsLabel}
                      </p>
                    </div>
                  </div>

                  <p className="directory-card-description">
                    {category.description}
                  </p>

                  <ul className="directory-card-links">
                    {category.popularConversions.map((conversion) => (
                      <li key={conversion.id}>
                        <Link
                          className="directory-inline-link"
                          href={conversion.href}
                        >
                          <DecorativeIcon
                            className="directory-inline-link-icon"
                            name="allConversions"
                            size={18}
                          />
                          {conversion.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="directory-card-footer">
                    <Link
                      className="directory-category-guide"
                      href={category.guideHref}
                    >
                      {strings.categoryGuideLabel}
                    </Link>

                    {category.calculators.map((calculator) => (
                      <Link
                        className="directory-category-guide directory-category-tool-link"
                        href={calculator.href}
                        key={calculator.id}
                      >
                        {calculator.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{strings.popularTitle}</h2>
              <p>{strings.popularDescription}</p>
            </div>

            <Link
              className="directory-section-link"
              href={data.allConversionsHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.allConversionsLabel}
            </Link>
          </header>

          <ul className="directory-popular-list">
            {data.popularConversions.map((conversion) => (
              <li key={conversion.id}>
                <Link href={conversion.href}>
                  <span className="directory-conversion-title">
                    <DecorativeIcon
                      className="directory-inline-link-icon"
                      name="allConversions"
                      size={18}
                    />
                    {conversion.label}
                  </span>
                  <small>{conversion.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="directory-section directory-guides-section">
          <header className="directory-section-header">
            <div>
              <h2>{strings.guidesTitle}</h2>
              <p>{strings.guidesDescription}</p>
            </div>

            <Link
              className="directory-section-link"
              href={data.guideIndexHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="unitGuide"
                size={18}
              />
              {strings.guidesIndexLabel}
            </Link>
          </header>

          <div className="directory-guides-card">
            <div className="directory-guide-list">
              {data.guides.map((guide) => (
                <Link
                  className="directory-guide-item"
                  href={guide.href}
                  key={guide.id}
                >
                  <DecorativeIcon
                    className="directory-guide-icon"
                    name="unitGuide"
                    size={20}
                  />
                  <strong>{guide.symbol}</strong>

                  <span>{guide.name}</span>

                  <small>{guide.description}</small>
                </Link>
              ))}
            </div>

            <Link
              className="directory-guides-cta"
              href={data.guideIndexHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="unitGuide"
                size={18}
              />
              {strings.guidesIndexLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
