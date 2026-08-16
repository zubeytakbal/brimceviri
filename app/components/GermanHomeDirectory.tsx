"use client";

import Link from "next/link";
import {
  Barbell,
  Gauge,
  Ruler,
} from "@phosphor-icons/react";
import { useDeferredValue, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { DecorativeIcon } from "./siteIcons";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";

type GermanCategoryCard = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: "length" | "mass" | "pressure";
  links: Array<{
    id: string;
    href: string;
    label: string;
  }>;
};

const preferredSourceSlugs = [
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "santimetre-metre",
  "metre-milimetre",
  "milimetre-metre",
  "kilometre-mil",
  "mil-kilometre",
  "kilogram-gram",
  "gram-kilogram",
  "kilogram-pound",
  "pound-kilogram",
  "psi-bar",
  "bar-psi",
  "kilopascal-bar",
  "bar-kilopascal",
] as const;

const copy = {
  eyebrow: "Technische Einheitumrechnungen",
  title: "Die passende Umrechnung schnell finden",
  description:
    "Suchen Sie direkt nach einer Umrechnung oder w\u00E4hlen Sie eine physikalische Gr\u00F6\u00DFe aus.",
  searchLabel: "Umrechnung suchen",
  searchPlaceholder:
    "Beispiel: meter kilometer, kg pfund, psi bar",
  searchHint:
    "Suchen Sie nach Einheitenname, Symbol oder Umrechnungspaar, um die passende Seite zu \u00F6ffnen.",
  searchResultsLabel: "Suchergebnisse",
  searchEmpty: "Keine passende Umrechnungsseite gefunden.",
  searchEnterHint:
    "Dr\u00FCcken Sie Enter, um das erste Ergebnis zu \u00F6ffnen.",
  searchCategoryPrefix: "Kategorie",
  openLabel: "\u00D6ffnen",
  categoriesTitle: "Einheitenumrechnungen",
  categoriesDescription:
    "Jede Karte \u00F6ffnet eine live Umrechnungskategorie mit echten Umrechnungsbeispielen.",
  categoryAction: "Kategorieseite \u00F6ffnen",
  popularTitle: "Beliebte Umrechnungen",
  popularDescription:
    "Direkte Einstiege zu h\u00E4ufig verwendeten Umrechnungsseiten.",
  stats: {
    activeCategories: "Kategorien",
    conversions: "Umrechnungsseiten",
  },
};

const categoryCopy = {
  uzunluk: {
    name: "L\u00E4nge",
    description:
      "Meter, Kilometer, Zentimeter, Zoll, Fu\u00DF und weitere L\u00E4ngeneinheiten umrechnen.",
    icon: "length" as const,
  },
  kutle: {
    name: "Masse",
    description:
      "Kilogramm, Gramm, Tonne, Pfund und Unze in beide Richtungen umrechnen.",
    icon: "mass" as const,
  },
  basinc: {
    name: "Druck",
    description:
      "Pascal, Kilopascal, Bar, PSI, Atmosph\u00E4re und weitere Druckeinheiten vergleichen.",
    icon: "pressure" as const,
  },
};

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("de-DE")
    .replace(/\u00DF/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortByPreference<T extends { sourceSlug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = preferredSourceSlugs.indexOf(left.sourceSlug as (typeof preferredSourceSlugs)[number]);
    const rightIndex = preferredSourceSlugs.indexOf(right.sourceSlug as (typeof preferredSourceSlugs)[number]);
    const safeLeft =
      leftIndex === -1 ? preferredSourceSlugs.length : leftIndex;
    const safeRight =
      rightIndex === -1 ? preferredSourceSlugs.length : rightIndex;

    return safeLeft - safeRight;
  });
}

function HomeCategoryIcon({
  kind,
}: {
  kind: "length" | "mass" | "pressure";
}) {
  const Icon =
    kind === "length" ? Ruler : kind === "mass" ? Barbell : Gauge;

  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <Icon className="home-category-icon-svg" size={42} weight="regular" />
    </span>
  );
}

function createCategoryCards() {
  return germanCategoryPages.flatMap((categoryPage) => {
    const content = categoryCopy[
      categoryPage.category as keyof typeof categoryCopy
    ];

    if (!content) {
      return [];
    }

    const categoryConversions = sortByPreference(
      germanConversionPages.filter(
        (page) => page.category === categoryPage.category
      )
    ).slice(0, 2);

    return [
      {
        id: categoryPage.slug,
        name: content.name,
        description: content.description,
        href: `/de/kategorien/${categoryPage.slug}`,
        icon: content.icon,
        links: categoryConversions.map((conversion) => ({
          id: conversion.slug,
          href: `/de/${conversion.slug}`,
          label: `${conversion.fromName} \u2192 ${conversion.toName}`,
        })),
      },
    ] satisfies GermanCategoryCard[];
  });
}

const categoryCards = createCategoryCards();

const popularConversions = [
  ...preferredSourceSlugs.flatMap((sourceSlug) => {
    const match = germanConversionPages.find(
      (page) => page.sourceSlug === sourceSlug
    );
    return match ? [match] : [];
  }),
  ...germanConversionPages.filter(
    (page) =>
      !preferredSourceSlugs.includes(
        page.sourceSlug as (typeof preferredSourceSlugs)[number]
      )
  ),
].slice(0, 6);

export default function GermanHomeDirectory() {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(deferredQuery);

  const searchResults = normalizedQuery
    ? germanConversionPages
        .filter((conversion) =>
          normalizeSearchText(
            [
              conversion.fromName,
              conversion.toName,
              conversion.fromUnit,
              conversion.toUnit,
              conversion.slug,
              conversion.categoryName,
            ].join(" ")
          ).includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(`/de/${searchResults[0].slug}`);
    }
  }

  return (
    <main className="directory-home" lang="de">
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="directory-lead">{copy.description}</p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>{copy.searchLabel}</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder={copy.searchPlaceholder}
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
                  {copy.openLabel}
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                {copy.searchHint}
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>{copy.searchResultsLabel}</strong>
                    <span>{copy.searchEnterHint}</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.slug}>
                          <Link href={`/de/${result.slug}`}>
                            <span>
                              {result.fromName} \u2192 {result.toName}
                            </span>
                            <small>
                              {copy.searchCategoryPrefix}: {result.categoryName} \u00B7{" "}
                              {result.fromUnit} \u2192 {result.toUnit}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">{copy.searchEmpty}</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>{copy.stats.activeCategories}</dt>
                <dd>{germanCategoryPages.length}</dd>
              </div>

              <div>
                <dt>{copy.stats.conversions}</dt>
                <dd>{germanConversionPages.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{copy.categoriesTitle}</h2>
              <p>{copy.categoriesDescription}</p>
            </div>
          </header>

          <div className="directory-home-category-grid">
            {categoryCards.map((category) => (
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.name} ${copy.categoryAction}`}
                />

                <div className="directory-card-body">
                  <div className="directory-card-top">
                    <span className="directory-card-badge" aria-hidden="true">
                      <HomeCategoryIcon kind={category.icon} />
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
                      {copy.categoryAction}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{copy.popularTitle}</h2>
              <p>{copy.popularDescription}</p>
            </div>
          </header>

          <ul className="directory-popular-list">
            {popularConversions.map((conversion) => (
              <li key={conversion.slug}>
                <Link href={`/de/${conversion.slug}`}>
                  <span className="directory-conversion-title">
                    {conversion.fromName} \u2192 {conversion.toName}
                  </span>
                  <small>
                    {conversion.fromUnit} \u2192 {conversion.toUnit}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
