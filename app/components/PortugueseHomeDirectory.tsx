"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { portugueseCategoryPages } from "../converter/localizedPortugueseCategoryPages";
import { portugueseConversionPages } from "../converter/localizedPortugueseConversionPages";
import { portugueseUnitPages } from "../converter/localizedPortugueseUnitPages";
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

function normalizeSearchTextPt(value: string) {
  return value
    .toLocaleLowerCase("pt")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => portugueseCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof portugueseCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/pt/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// Os 4 "universais" (identidade de 17 elementos do TR: 13 categorias +
// 4 conversores) -- nao sao calculadoras, sao parte da identidade do site.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/pt/shoe-size-converter",
    title: "Conversor de numeracao de calcados",
    description: "Compare as numeracoes brasileira, americana, europeia e britanica por marca.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/pt/kitchen-measurement-converter",
    title: "Medidas de cozinha",
    description: "Converta xicaras, colheres e gramas conforme o ingrediente.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/pt/recipe-converter",
    title: "Conversor de receitas",
    description: "Cole uma receita e ajuste as quantidades com um multiplicador.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/pt/historical-units",
    title: "Unidades historicas",
    description: "Converta arşın, okka, dirhem e unidades bizantinas para unidades modernas.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = portugueseCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/pt/categories/${page.slug}`,
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
  .map((sourceSlug) => portugueseConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof portugueseConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...portugueseConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/pt/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = portugueseUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: `/pt/unit-guides/${unitPage.slug}`,
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = portugueseConversionPages.map((page) => ({
  id: page.slug,
  href: `/pt/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextPt(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: portugueseConversionPages.length,
};

export default function PortugueseHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchTextPt(deferredQuery);

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
    <main className="directory-home" lang="pt-BR">
      <NotificationBell notifications={notifications} locale="pt" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Conversor de unidades em portugues</p>
            <h1>Encontre rapido a pagina de conversao correta</h1>
            <p className="directory-lead">
              Converta comprimento, massa, pressao e muitas outras unidades
              totalmente em portugues, com guias de unidades claros.
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>Buscar uma conversao</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="Ex.: metros para pes"
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
                Digite o nome de uma unidade em portugues ou ingles e pressione
                Enter para abrir o primeiro resultado.
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>Resultados da busca</strong>
                    <span>Pressione Enter para abrir</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              Categoria: {result.categoryLabel} · {result.description}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">Nenhum resultado encontrado.</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>Categorias ativas</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Paginas de conversao</dt>
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
              <h2>Conversao de unidades</h2>
              <p>Escolha uma categoria para ver todas as unidades e paginas de conversao.</p>
            </div>

            <Link className="directory-section-link" href="/pt/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Todas as categorias
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
              <h3>Mais categorias de conversao</h3>
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
            <Link className="directory-section-link" href="/pt/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Ver todas as categorias e conversoes
            </Link>
          </div>
        </section>

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Conversoes populares</h2>
                <p>Acesso direto as conversoes mais buscadas.</p>
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
                <p>Guias detalhados em portugues para as unidades mais buscadas.</p>
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
