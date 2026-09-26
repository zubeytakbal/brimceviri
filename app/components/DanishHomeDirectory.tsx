"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { danishCategoryPages } from "../converter/localizedDanishCategoryPages";
import { danishConversionPages } from "../converter/localizedDanishConversionPages";
import { danishUnitPages } from "../converter/localizedDanishUnitPages";
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

function normalizeSearchTextDa(value: string) {
  return value
    .toLocaleLowerCase("da")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => danishCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof danishCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/da/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// De 4 "universelle" vaerktojer (TRs 17-elements-identitet: 13 kategorier +
// 4 omregnere) -- de er ikke lommeregnere, men en del af sidens identitet.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/da/shoe-size-converter",
    title: "Skostørrelseomregner",
    description: "Sammenlign EU-, US- og UK-skostørrelser per mærke.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/da/kitchen-measurement-converter",
    title: "Køkkenmål",
    description: "Omregn kopper, spiseskeer og gram ud fra ingrediens.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/da/recipe-converter",
    title: "Opskriftomregner",
    description: "Indsæt en opskrift og skaler mængderne med en multiplikator.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/da/historical-units",
    title: "Historiske enheder",
    description: "Omregn arşın, okka, dirhem og byzantinske enheder til moderne enheder.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = danishCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/da/categories/${page.slug}`,
    title: page.title,
    iconName: getCategoryIconName(page.category) as SiteIconName,
  }));

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
  .map((sourceSlug) => danishConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof danishConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...danishConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/da/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = danishUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: `/da/unit-guides/${unitPage.slug}`,
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = danishConversionPages.map((page) => ({
  id: page.slug,
  href: `/da/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextDa(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: danishConversionPages.length,
};

export default function DanishHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchTextDa(deferredQuery);

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
    <main className="directory-home" lang="da">
      <NotificationBell notifications={notifications} locale="da" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Enhedsomregner på dansk</p>
            <h1>Find den enhedsomregning du har brug for</h1>
            <p className="directory-lead">
              Omregn længde, masse, tryk og mange andre enheder helt på
              dansk, med tydelige enhedsguider.
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>Søg en omregning</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="F.eks.: meter fod"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon className="directory-button-icon" name="search" size={18} />
                  Åbn
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                Skriv navnet på en enhed på dansk eller engelsk, og tryk
                Enter for at åbne det første resultat.
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>Søgeresultater</strong>
                    <span>Tryk Enter for at åbne</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              Kategori: {result.categoryLabel} · {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">Ingen resultater fundet.</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>Aktive kategorier</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Omregningssider</dt>
                <dd>{stats.conversions}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>Enhedsomregning</h2>
              <p>Vælg en kategori for at se alle enheder og omregningssider.</p>
            </div>

            <Link className="directory-section-link" href="/da/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Alle kategorier
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
              <h3>Flere omregningskategorier</h3>
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
            <Link className="directory-section-link" href="/da/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Se alle kategorier og omregninger
            </Link>
          </div>
        </section>

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Populære omregninger</h2>
                <p>Direkte adgang til de mest søgte omregninger.</p>
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
        )}

        {popularUnits.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Populære enheder</h2>
                <p>Detaljerede guider på dansk til de mest søgte enheder.</p>
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
      </div>
    </main>
  );
}
