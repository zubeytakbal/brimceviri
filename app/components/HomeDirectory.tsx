"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { DecorativeIcon } from "./siteIcons";
import { calculatorPages } from "../converter/calculatorPages";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";

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

type HomeCategoryIconName =
  | "uzunluk"
  | "kutle"
  | "basinc"
  | "sicaklik"
  | "hacim"
  | "enerji";

type HomeCategoryCard = {
  id: string;
  iconKey: HomeCategoryIconName;
  name: string;
  symbol: string;
  description: string;
  href?: string;
  isAvailable: boolean;
  statusLabel: string;
  links: Array<{
    id: string;
    href: string;
    label: string;
  }>;
};

type HomeEngineeringCalculator = {
  id: string;
  href: string;
  label: string;
  formula: string;
  description: string;
};

type HomeData = {
  conversions: HomeConversion[];
  categories: HomeCategoryCard[];
  engineeringCalculators: HomeEngineeringCalculator[];
  popularConversions: HomeConversion[];
  allConversionsHref: string;
  allConversionsLabel: string;
  engineeringHubHref: string;
  engineeringHubLabel: string;
  stats: {
    activeCategories: number;
    conversions: number;
    engineering: number;
  };
};

const activeCategoryOrder = [
  "uzunluk",
  "kutle",
  "basinc",
] as const;

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

const copy = {
  tr: {
    eyebrow: "Teknik birim dönüşümleri",
    title: "Doğru dönüşüme hızlıca gidin",
    description:
      "Arama ile sayfayı açın veya fiziksel büyüklüğe göre kategori seçin.",
    searchLabel: "Dönüşüm ara",
    searchPlaceholder: "Örnek: metre kilometre, kg lb, psi bar",
    searchHint:
      "Birim adı, sembol veya dönüşüm çifti yazarak ilgili sayfayı bulun.",
    searchResultsLabel: "Arama sonuçları",
    searchEmpty: "Eşleşen dönüşüm bulunamadı.",
    searchEnterHint: "İlk sonucu açmak için Enter kullanabilirsiniz.",
    searchCategoryPrefix: "Kategori",
    openLabel: "Aç",
    stats: {
      activeCategories: "aktif kategori",
      conversions: "dönüşüm sayfası",
      engineering: "hesaplayıcı",
    },
    categoriesTitle: "Kategoriler",
    categoriesDescription:
      "Mevcut kategoriler doğrudan sayfaya gider; diğer teknik başlıklar kapsam genişledikçe açılacaktır.",
    categoryAction: "Kategori sayfasını aç",
    availableLabel: "Hazır",
    soonLabel: "Yakında",
    categoryCards: {
      uzunluk: {
        name: "Uzunluk",
        symbol: "m",
        description:
          "Metre, santimetre, kilometre, inç ve fit dönüşümlerini açın.",
      },
      kutle: {
        name: "Kütle",
        symbol: "kg",
        description:
          "Kilogram, gram, ton, pound ve ons dönüşümlerine gidin.",
      },
      basinc: {
        name: "Basınç",
        symbol: "Pa",
        description:
          "Pascal, bar, psi, atm ve mmHg araçlarını inceleyin.",
      },
      sicaklik: {
        name: "Sıcaklık",
        symbol: "°C",
        description:
          "Sıcaklık dönüştürücüleri planlanıyor.",
      },
      hacim: {
        name: "Hacim",
        symbol: "L",
        description:
          "Litre ve hacim tabanlı dönüşüm araçları planlanıyor.",
      },
      enerji: {
        name: "Enerji ve güç",
        symbol: "W",
        description:
          "Enerji ve güç kategorileri kapsam genişledikçe eklenecek.",
      },
    },
    popularTitle: "Popüler dönüşümler",
    popularDescription:
      "Sık kullanılan gerçek dönüşüm sayfalarına doğrudan gidin.",
    engineeringTitle: "Mühendislik hesaplayıcıları",
    engineeringDescription:
      "Basınç, akışkanlar ve ısı transferi için mevcut teknik araçlar.",
    engineeringHubLabel: "Tüm mühendislik hesaplayıcıları",
  },
  en: {
    eyebrow: "Technical unit conversions",
    title: "Open the right converter quickly",
    description:
      "Use search for a direct page or browse by physical quantity.",
    searchLabel: "Search conversions",
    searchPlaceholder: "Example: meter kilometer, kg lb, psi bar",
    searchHint:
      "Search by unit name, symbol or conversion pair to open the right page.",
    searchResultsLabel: "Search results",
    searchEmpty: "No matching conversion pages found.",
    searchEnterHint: "Press Enter to open the first result.",
    searchCategoryPrefix: "Category",
    openLabel: "Open",
    stats: {
      activeCategories: "active categories",
      conversions: "conversion pages",
      engineering: "calculators",
    },
    categoriesTitle: "Categories",
    categoriesDescription:
      "Available categories link to live directory pages; the rest are marked as upcoming.",
    categoryAction: "Open category page",
    availableLabel: "Live",
    soonLabel: "Soon",
    categoryCards: {
      uzunluk: {
        name: "Length",
        symbol: "m",
        description:
          "Open meter, centimeter, kilometer, inch and foot conversions.",
      },
      kutle: {
        name: "Mass",
        symbol: "kg",
        description:
          "Jump to kilogram, gram, tonne, pound and ounce tools.",
      },
      basinc: {
        name: "Pressure",
        symbol: "Pa",
        description:
          "Browse pascal, bar, psi, atm and mmHg converters.",
      },
      sicaklik: {
        name: "Temperature",
        symbol: "°C",
        description:
          "Temperature conversion tools are planned.",
      },
      hacim: {
        name: "Volume",
        symbol: "L",
        description:
          "Liter and volume-based converters are planned.",
      },
      enerji: {
        name: "Energy and power",
        symbol: "W",
        description:
          "Energy and power categories will be added as coverage expands.",
      },
    },
    popularTitle: "Popular conversions",
    popularDescription:
      "Open frequently used live conversion pages directly from here.",
    engineeringTitle: "Engineering calculators",
    engineeringDescription:
      "Current technical tools for pressure, fluids and heat transfer.",
    engineeringHubLabel: "All engineering calculators",
  },
} as const;

function HomeCategoryIcon({
  kind,
  symbol,
}: {
  kind: HomeCategoryIconName;
  symbol: string;
}) {
  function renderGraphic() {
    switch (kind) {
      case "uzunluk":
        return (
          <>
            <path
              className="home-category-icon-face"
              d="M18 24.5 39.5 18l8.5 8.5L26.5 33z"
            />
            <path
              className="home-category-icon-edge"
              d="M26.5 33 48 26.5v5L26.5 38z"
            />
            <path
              className="home-category-icon-line"
              d="m22 28 2-2m4 1 2-2m4 1 2-2m4 1 2-2"
            />
          </>
        );
      case "kutle":
        return (
          <>
            <path
              className="home-category-icon-face"
              d="M24 21h16l4 18H20z"
            />
            <path
              className="home-category-icon-edge"
              d="M20 39h24v4H20z"
            />
            <path
              className="home-category-icon-line"
              d="M28 21c0-3 1.8-5 4-5s4 2 4 5"
            />
          </>
        );
      case "basinc":
        return (
          <>
            <path
              className="home-category-icon-face"
              d="M20 33a12 12 0 1 1 24 0v2H20z"
            />
            <path
              className="home-category-icon-edge"
              d="M24 37h16v4H24z"
            />
            <path
              className="home-category-icon-line"
              d="M32 24v9m0 0 6-4"
            />
          </>
        );
      case "sicaklik":
        return (
          <>
            <path
              className="home-category-icon-face"
              d="M29 18a3 3 0 0 1 6 0v13.5a7 7 0 1 1-6 0Z"
            />
            <path
              className="home-category-icon-edge"
              d="M31.5 23h3"
            />
            <path
              className="home-category-icon-line"
              d="M32 22v14m5.5-8h4"
            />
          </>
        );
      case "hacim":
        return (
          <>
            <ellipse
              className="home-category-icon-face"
              cx="32"
              cy="21"
              rx="10"
              ry="4.5"
            />
            <path
              className="home-category-icon-face"
              d="M22 21v14c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5V21"
            />
            <path
              className="home-category-icon-edge"
              d="M22 28c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5"
            />
            <path
              className="home-category-icon-line"
              d="M42 21v14"
            />
          </>
        );
      case "enerji":
        return (
          <>
            <path
              className="home-category-icon-face"
              d="m32 17-8.5 13h6L26 41l14-16h-7l4-8Z"
            />
            <path
              className="home-category-icon-edge"
              d="m29.5 30 5-5h6L26 41z"
            />
            <path
              className="home-category-icon-line"
              d="M43 18v4m-18 18h4"
            />
          </>
        );
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={`home-category-icon-svg is-${kind}`}
      viewBox="0 0 64 64"
      focusable="false"
    >
      <ellipse
        className="home-category-icon-shadow"
        cx="32"
        cy="50"
        rx="14"
        ry="5"
      />
      <g className="home-category-icon-float">
        <rect
          className="home-category-icon-plate"
          x="10"
          y="8"
          width="44"
          height="44"
          rx="14"
        />
        {renderGraphic()}
        <rect
          className="home-category-icon-chip"
          x="21"
          y="42"
          width="22"
          height="10"
          rx="5"
        />
        <text
          className="home-category-icon-symbol"
          x="32"
          y="49"
          textAnchor="middle"
        >
          {symbol}
        </text>
      </g>
    </svg>
  );
}

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

    const safeLeft =
      leftIndex === -1 ? preferredSourceSlugs.length : leftIndex;
    const safeRight =
      rightIndex === -1 ? preferredSourceSlugs.length : rightIndex;

    return safeLeft - safeRight;
  });
}

function createHomeData(locale: Locale): HomeData {
  const strings = copy[locale];

  const conversions =
    locale === "tr"
      ? conversionPages.map((page) => ({
          id: page.slug,
          sourceSlug: page.slug,
          href: `/${page.slug}`,
          label: `${page.fromName} → ${page.toName}`,
          description: `${page.fromUnit} → ${page.toUnit}`,
          category: page.category,
          categoryLabel: strings.categoryCards[
            page.category as keyof typeof strings.categoryCards
          ]?.name ?? page.category,
          searchText: normalizeSearchText(
            [
              page.fromName,
              page.toName,
              page.fromUnit,
              page.toUnit,
              page.slug,
              strings.categoryCards[
                page.category as keyof typeof strings.categoryCards
              ]?.name ?? page.category,
            ].join(" ")
          ),
        }))
      : englishConversionPages.map((page) => ({
          id: page.slug,
          sourceSlug: page.sourceSlug,
          href: `/en/${page.slug}`,
          label: `${page.fromName} → ${page.toName}`,
          description: `${page.fromUnit} → ${page.toUnit}`,
          category: page.category,
          categoryLabel:
            strings.categoryCards[
              page.category as keyof typeof strings.categoryCards
            ]?.name ?? page.categoryName,
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

  const activeCategories = activeCategoryOrder.map((sourceCategory) => {
    const categoryPage =
      locale === "tr"
        ? categoryPages.find((page) => page.category === sourceCategory)
        : englishCategoryPages.find(
            (page) => page.category === sourceCategory
          );

    const categoryCopy = strings.categoryCards[sourceCategory];
    const categoryConversions = sortByPreference(
      conversions.filter(
        (conversion) => conversion.category === sourceCategory
      )
    ).slice(0, 2);

    return {
      id: sourceCategory,
      iconKey: sourceCategory,
      name: categoryCopy.name,
      symbol: categoryCopy.symbol,
      description: categoryCopy.description,
      href:
        locale === "tr"
          ? categoryPage
            ? `/kategoriler/${categoryPage.slug}`
            : undefined
          : categoryPage
            ? `/en/categories/${categoryPage.slug}`
            : undefined,
      isAvailable: Boolean(categoryPage),
      statusLabel: strings.availableLabel,
      links: categoryConversions.map((conversion) => ({
        id: conversion.id,
        href: conversion.href,
        label: conversion.label,
      })),
    };
  });

  const passiveCategories = (["sicaklik", "hacim", "enerji"] as const).map(
    (categoryKey) => {
      const categoryCopy = strings.categoryCards[categoryKey];

      return {
        id: categoryKey,
        iconKey: categoryKey,
        name: categoryCopy.name,
        symbol: categoryCopy.symbol,
        description: categoryCopy.description,
        isAvailable: false,
        statusLabel: strings.soonLabel,
        links: [],
      };
    }
  );

  const preferredPopularConversions = preferredSourceSlugs.flatMap((slug) => {
    const conversion = conversions.find(
      (item) => item.sourceSlug === slug
    );

    return conversion ? [conversion] : [];
  });

  const popularConversions = [
    ...preferredPopularConversions,
    ...conversions.filter(
      (conversion) =>
        !preferredPopularConversions.some(
          (preferred) => preferred.id === conversion.id
        )
    ),
  ].slice(0, 6);

  const engineeringSourceSlugs = [
    "basinc-kuvvet-alan",
    "hidrostatik-basinc",
    "isi-enerjisi",
    "isi-iletimi",
    "reynolds-sayisi",
  ] as const;

  const engineeringCalculators =
    locale === "tr"
      ? engineeringSourceSlugs
          .map((slug) => calculatorPages.find((page) => page.slug === slug))
          .filter(
            (page): page is (typeof calculatorPages)[number] => Boolean(page)
          )
          .map((page) => ({
            id: page.slug,
            href: `/hesaplayicilar/${page.slug}`,
            label: page.shortTitle,
            formula: page.formula,
            description: page.description,
          }))
      : engineeringSourceSlugs
          .map((slug) =>
            englishCalculatorPages.find((page) => page.sourceSlug === slug)
          )
          .filter(
            (page): page is (typeof englishCalculatorPages)[number] =>
              Boolean(page)
          )
          .map((page) => ({
            id: page.slug,
            href: `/en/calculators/${page.slug}`,
            label: page.shortTitle,
            formula: page.formula,
            description: page.description,
          }));

  return {
    conversions,
    categories: [...activeCategories, ...passiveCategories],
    engineeringCalculators,
    popularConversions,
    allConversionsHref:
      locale === "tr" ? "/tum-birimler" : "/en/all-conversions",
    allConversionsLabel:
      locale === "tr" ? "Tüm dönüşümler" : "All conversions",
    engineeringHubHref:
      locale === "tr"
        ? "/muhendislik-hesaplayicilari"
        : "/en/engineering-calculators",
    engineeringHubLabel: strings.engineeringHubLabel,
    stats: {
      activeCategories: activeCategories.filter(
        (category) => category.isAvailable
      ).length,
      conversions: conversions.length,
      engineering: engineeringCalculators.length,
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
    <main className="directory-home" lang={locale === "en" ? "en" : undefined}>
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">{strings.eyebrow}</p>
            <h1>{strings.title}</h1>
            <p className="directory-lead">{strings.description}</p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
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
                  {strings.openLabel}
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
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              {strings.searchCategoryPrefix}: {result.categoryLabel} ·{" "}
                              {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">{strings.searchEmpty}</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>{strings.stats.activeCategories}</dt>
                <dd>{data.stats.activeCategories}</dd>
              </div>

              <div>
                <dt>{strings.stats.conversions}</dt>
                <dd>{data.stats.conversions}</dd>
              </div>

              <div>
                <dt>{strings.stats.engineering}</dt>
                <dd>{data.stats.engineering}</dd>
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

            <Link className="directory-section-link" href={data.allConversionsHref}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.allConversionsLabel}
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {data.categories.map((category) => (
              <article
                className={`directory-home-card${
                  category.isAvailable ? "" : " is-passive"
                }`}
                key={category.id}
              >
                {category.href ? (
                  <Link
                    className="directory-card-stretch"
                    href={category.href}
                    aria-label={`${category.name} ${strings.categoryAction}`}
                  />
                ) : null}

                <div className="directory-card-body">
                  <div className="directory-card-top">
                    <span className="directory-card-badge" aria-hidden="true">
                      <HomeCategoryIcon
                        kind={category.iconKey}
                        symbol={category.symbol}
                      />
                    </span>

                    <div>
                      <div className="directory-card-header-line">
                        <h3 className="home-category-title">{category.name}</h3>
                        <span className="directory-card-status">
                          {category.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="directory-card-description">{category.description}</p>

                  {category.links.length > 0 ? (
                    <ul className="directory-card-links">
                      {category.links.map((link) => (
                        <li key={link.id}>
                          <Link className="directory-inline-link" href={link.href}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="directory-card-note">{category.statusLabel}</div>
                  )}

                  <div className="directory-card-footer">
                    {category.href ? (
                      <Link className="directory-category-guide" href={category.href}>
                        {strings.categoryAction}
                      </Link>
                    ) : (
                      <span className="directory-category-guide is-muted">
                        {category.statusLabel}
                      </span>
                    )}
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

            <Link className="directory-section-link" href={data.allConversionsHref}>
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
                    {conversion.label}
                  </span>
                  <small>{conversion.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="directory-section"
          id={locale === "tr" ? "muhendislik-hesaplayicilari" : "engineering-calculators"}
        >
          <header className="directory-section-header">
            <div>
              <h2>{strings.engineeringTitle}</h2>
              <p>{strings.engineeringDescription}</p>
            </div>

            <Link className="directory-section-link" href={data.engineeringHubHref}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.engineeringHubLabel}
            </Link>
          </header>

          <div className="directory-tool-grid">
            {data.engineeringCalculators.map((calculator) => (
              <article className="directory-home-card directory-tool-card" key={calculator.id}>
                <Link
                  className="directory-card-stretch"
                  href={calculator.href}
                  aria-label={calculator.label}
                />

                <div className="directory-card-body">
                  <div className="directory-tool-copy">
                    <p className="directory-card-formula">{calculator.formula}</p>
                    <h3 className="home-category-title">{calculator.label}</h3>
                    <p className="directory-card-description">
                      {calculator.description}
                    </p>
                  </div>

                  <div className="directory-card-footer">
                    <Link className="directory-category-guide" href={calculator.href}>
                      {strings.openLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
