"use client";

import Link from "next/link";
import {
  Barbell,
  Clock,
  Cylinder,
  Fire,
  Gauge,
  Lightning,
  Plug,
  Ruler,
  Square,
  Thermometer,
  Waves,
} from "@phosphor-icons/react";
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
  | "alan"
  | "zaman"
  | "hiz"
  | "kutle"
  | "basinc"
  | "sicaklik"
  | "hacim"
  | "enerji"
  | "debi"
  | "isi"
  | "elektrik";

type HomeCategoryCard = {
  id: string;
  iconKey: HomeCategoryIconName;
  name: string;
  symbol: string;
  description: string;
  href: string;
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

type HomeSecondaryCategory = {
  id: string;
  href: string;
  label: string;
};

type HomeData = {
  conversions: HomeConversion[];
  categories: HomeCategoryCard[];
  secondaryCategories: HomeSecondaryCategory[];
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

const homeCategoryOrder = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "debi",
  "elektrik",
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
      activeCategories: "kategori",
      conversions: "dönüşüm sayfası",
      engineering: "hesaplayıcı",
    },
    categoriesTitle: "Birim dönüşümleri",
    categoriesDescription:
      "Her kart ilgili kategori sayfasına gider ve 1-2 gerçek dönüşüm örneği gösterir.",
    categoryAction: "Kategori sayfasını aç",
    categoriesFooterLink: "Tüm dönüşümleri görüntüle",
    secondaryCategoriesLabel: "Diğer birim kategorileri:",
    categoryCards: {
      uzunluk: {
        name: "Uzunluk",
        symbol: "m",
        description:
          "Metre, santimetre, kilometre, inç ve fit dönüşümlerini açın.",
      },
      alan: {
        name: "Alan",
        symbol: "m\u00B2",
        description:
          "Metrekare, hektar ve fitkare dönüşümlerini açın.",
      },
      hacim: {
        name: "Hacim",
        symbol: "L",
        description:
          "Litre, mililitre ve metreküp dönüşümlerini açın.",
      },
      kutle: {
        name: "Kütle",
        symbol: "kg",
        description:
          "Kilogram, gram, ton, pound ve ons dönüşümlerine gidin.",
      },
      sicaklik: {
        name: "Sıcaklık",
        symbol: "\u00B0C",
        description:
          "Santigrat, Fahrenheit ve Kelvin dönüşümlerini açın.",
      },
      zaman: {
        name: "Zaman",
        symbol: "s",
        description:
          "Saniye, dakika ve saat dönüşümlerini açın.",
      },
      hiz: {
        name: "Hız",
        symbol: "km/h",
        description:
          "km/saat, m/s ve mph tabanlı hız dönüşümlerini açın.",
      },
      basinc: {
        name: "Basınç",
        symbol: "Pa",
        description:
          "Pascal, bar, psi, atm ve mmHg araçlarını inceleyin.",
      },
      enerji: {
        name: "Enerji ve güç",
        symbol: "W",
        description:
          "Joule, kilovatsaat, watt ve kilowatt dönüşümlerini açın.",
      },
      debi: {
        name: "Debi",
        symbol: "m\u00B3/h",
        description:
          "Metreküp/saat ve litre/dakika tabanlı hacimsel debi araçlarını açın.",
      },
      elektrik: {
        name: "Elektrik",
        symbol: "V",
        description:
          "Volt, kilovolt, amper ve miliamper dönüşümlerini açın.",
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
      activeCategories: "categories",
      conversions: "conversion pages",
      engineering: "calculators",
    },
    categoriesTitle: "Unit conversions",
    categoriesDescription:
      "Each card opens a live category page and surfaces one or two real conversion examples.",
    categoryAction: "Open category page",
    categoriesFooterLink: "View all conversions",
    secondaryCategoriesLabel: "Other unit categories:",
    categoryCards: {
      uzunluk: {
        name: "Length",
        symbol: "m",
        description:
          "Open meter, centimeter, kilometer, inch and foot conversions.",
      },
      alan: {
        name: "Area",
        symbol: "m\u00B2",
        description:
          "Open square meter, hectare and square foot conversions.",
      },
      hacim: {
        name: "Volume",
        symbol: "L",
        description:
          "Open liter, milliliter and cubic meter conversions.",
      },
      kutle: {
        name: "Mass",
        symbol: "kg",
        description:
          "Jump to kilogram, gram, tonne, pound and ounce tools.",
      },
      sicaklik: {
        name: "Temperature",
        symbol: "\u00B0C",
        description:
          "Open Celsius, Fahrenheit and Kelvin conversions.",
      },
      zaman: {
        name: "Time",
        symbol: "s",
        description:
          "Open second, minute and hour conversions.",
      },
      hiz: {
        name: "Speed",
        symbol: "km/h",
        description:
          "Open km/h, m/s and mph based speed conversions.",
      },
      basinc: {
        name: "Pressure",
        symbol: "Pa",
        description:
          "Browse pascal, bar, psi, atm and mmHg converters.",
      },
      enerji: {
        name: "Energy and power",
        symbol: "W",
        description:
          "Open joule, kilowatt-hour, watt and kilowatt conversions.",
      },
      debi: {
        name: "Flow rate",
        symbol: "m\u00B3/h",
        description:
          "Open cubic-meter-per-hour and liters-per-minute flow tools.",
      },
      elektrik: {
        name: "Electricity",
        symbol: "V",
        description:
          "Open voltage and current conversion tools.",
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
}: {
  kind: HomeCategoryIconName;
}) {
  const Icon =
    kind === "uzunluk"
      ? Ruler
      : kind === "alan"
        ? Square
        : kind === "hacim"
          ? Cylinder
          : kind === "kutle"
            ? Barbell
            : kind === "sicaklik"
              ? Thermometer
              : kind === "zaman"
                ? Clock
                : kind === "hiz"
                  ? Gauge
                  : kind === "basinc"
                    ? Gauge
                    : kind === "enerji"
                      ? Lightning
                      : kind === "debi"
                        ? Waves
                        : kind === "isi"
                          ? Fire
                          : Plug;

  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <Icon
        className={`home-category-icon-svg is-${kind}`}
        size={42}
        weight="regular"
      />
    </span>
  );
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
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

  const categoryCards = homeCategoryOrder.flatMap((sourceCategory) => {
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

    if (!categoryPage || categoryConversions.length === 0) {
      return [];
    }

    return [
      {
        id: sourceCategory,
        iconKey: sourceCategory,
        name: categoryCopy.name,
        symbol: categoryCopy.symbol,
        description: categoryCopy.description,
        href:
          locale === "tr"
            ? `/kategoriler/${categoryPage.slug}`
            : `/en/categories/${categoryPage.slug}`,
        links: categoryConversions.map((conversion) => ({
          id: conversion.id,
          href: conversion.href,
          label: conversion.label,
        })),
      },
    ];
  });

  const secondaryCategories: HomeSecondaryCategory[] = categoryPages
    .filter(
      (page) =>
        !(homeCategoryOrder as readonly string[]).includes(page.category)
    )
    .flatMap((page) => {
      if (locale === "tr") {
        return [
          {
            id: page.category,
            href: `/kategoriler/${page.slug}`,
            label: page.title,
          },
        ];
      }

      const englishPage = englishCategoryPages.find(
        (item) => item.category === page.category
      );

      if (!englishPage) {
        return [];
      }

      return [
        {
          id: page.category,
          href: `/en/categories/${englishPage.slug}`,
          label: englishPage.title,
        },
      ];
    });

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
    categories: categoryCards,
    secondaryCategories,
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
      activeCategories: categoryCards.length,
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
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.name} ${strings.categoryAction}`}
                />

                <div className="directory-card-body">
                  <div className="directory-card-top">
                    <span className="directory-card-badge" aria-hidden="true">
                      <HomeCategoryIcon kind={category.iconKey} />
                    </span>

                    <div>
                      <h3 className="home-category-title">{category.name}</h3>
                    </div>
                  </div>

                  <p className="directory-card-description">{category.description}</p>

                  <ul className="directory-card-links">
                    {category.links.map((link) => (
                      <li key={link.id}>
                        <Link className="directory-inline-link" href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="directory-card-footer">
                    <Link className="directory-category-guide" href={category.href}>
                      {strings.categoryAction}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {data.secondaryCategories.length > 0 && (
            <p className="directory-secondary-categories">
              <span>{strings.secondaryCategoriesLabel}</span>

              {data.secondaryCategories.map((category, index) => (
                <span key={category.id}>
                  <Link href={category.href}>{category.label}</Link>

                  {index < data.secondaryCategories.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}

          <div className="directory-section-footer">
            <Link
              className="directory-section-link"
              href={data.allConversionsHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {strings.categoriesFooterLink}
            </Link>
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
