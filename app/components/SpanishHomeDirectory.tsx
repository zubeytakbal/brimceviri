"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { spanishCategoryPages } from "../converter/localizedSpanishCategoryPages";
import { spanishConversionPages } from "../converter/localizedSpanishConversionPages";
import { spanishUnitPages } from "../converter/localizedSpanishUnitPages";
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

function normalizeSearchTextEs(value: string) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => spanishCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof spanishCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/es/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// Los 4 "universales" (identidad de 17 elementos de TR: 13 categorias + 4
// convertidores) -- no son calculadoras, son parte de la identidad del sitio.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/es/shoe-size-converter",
    title: "Conversor de tallas de calzado",
    description: "Compara las tallas españolas, europeas, estadounidenses y británicas por marca.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/es/kitchen-measurement-converter",
    title: "Medidas de cocina",
    description: "Convierte tazas, cucharadas y gramos según el ingrediente.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/es/recipe-converter",
    title: "Conversor de recetas",
    description: "Pega una receta y ajusta las cantidades con un multiplicador.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/es/historical-units",
    title: "Unidades históricas",
    description: "Convierte arşın, okka, dirhem y unidades bizantinas a unidades modernas.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = spanishCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/es/categories/${page.slug}`,
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
  .map((sourceSlug) => spanishConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof spanishConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...spanishConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/es/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = spanishUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: `/es/unit-guides/${unitPage.slug}`,
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = spanishConversionPages.map((page) => ({
  id: page.slug,
  href: `/es/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextEs(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: spanishConversionPages.length,
};

export default function SpanishHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchTextEs(deferredQuery);

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
    <main className="directory-home" lang="es">
      <NotificationBell notifications={notifications} locale="es" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Convertidor de unidades en español</p>
            <h1>Encuentra rápido la página de conversión correcta</h1>
            <p className="directory-lead">
              Convierte longitud, masa, presión y muchas otras unidades
              completamente en español, con guías de unidades claras.
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>Buscar una conversión</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="Ej.: metros pies"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon className="directory-button-icon" name="search" size={18} />
                  Abrir
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                Escribe el nombre de una unidad en español o inglés y pulsa
                Intro para abrir el primer resultado.
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>Resultados de búsqueda</strong>
                    <span>Pulsa Intro para abrir</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              Categoría: {result.categoryLabel} · {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">No se encontraron resultados.</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>Categorías activas</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Páginas de conversión</dt>
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
              <h2>Conversión de unidades</h2>
              <p>Elige una categoría para ver todas sus unidades y páginas de conversión.</p>
            </div>

            <Link className="directory-section-link" href="/es/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Todas las categorías
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
              <h3>Más categorías de conversión</h3>
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
            <Link className="directory-section-link" href="/es/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Ver todas las categorías y conversiones
            </Link>
          </div>
        </section>

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Conversiones populares</h2>
                <p>Acceso directo a las conversiones más buscadas.</p>
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
                <h2>Unidades populares</h2>
                <p>Guías detalladas en español para las unidades más buscadas.</p>
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
