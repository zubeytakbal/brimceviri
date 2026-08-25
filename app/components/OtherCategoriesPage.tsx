"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";

type SearchableConversion = {
  id: string;
  href: string;
  label: string;
  description: string;
  searchText: string;
};

type SecondaryCategory = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
};

type OtherTool = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
};

type Locale = "tr" | "en";

type AlternateLink = {
  href: string;
  hrefLang: string;
  label: string;
};

const pageCopy = {
  tr: {
    homeHref: "/",
    homeLabel: "Ana Sayfa",
    breadcrumbAriaLabel: "Sayfa yolu",
    title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
    description:
      "Ana sayfada yer almayan, daha az bilinen ancak m\u00fchendislik ve bilim alanlar\u0131nda ger\u00e7ekten kullan\u0131lan birim kategorilerini burada bulabilirsiniz.",
    searchLabel: "D\u00f6n\u00fc\u015f\u00fcm ara",
    searchPlaceholder:
      "\u00d6rnek: newton, viskozite, beygirg\u00fcc\u00fc, tork",
    searchButton: "A\u00e7",
    searchHint:
      "Birim ad\u0131, sembol veya d\u00f6n\u00fc\u015f\u00fcm \u00e7ifti yazarak ilgili sayfay\u0131 bulun.",
    searchResultsTitle: "Arama sonu\u00e7lar\u0131",
    searchResultsHint:
      "\u0130lk sonucu a\u00e7mak i\u00e7in Enter kullanabilirsiniz.",
    searchEmpty: "E\u015fle\u015fen d\u00f6n\u00fc\u015f\u00fcm bulunamad\u0131.",
    toolsTitle: "Ara\u00e7lar",
    categoriesTitle: "Kategoriler",
    otherLanguagesTitle: "Di\u011fer diller",
  },
  en: {
    homeHref: "/en",
    homeLabel: "Home",
    breadcrumbAriaLabel: "Breadcrumb",
    title: "Other Conversions",
    description:
      "Explore less prominent but still practical engineering and scientific conversion categories that do not appear on the homepage.",
    searchLabel: "Search conversions",
    searchPlaceholder:
      "Example: newton, viscosity, horsepower, torque",
    searchButton: "Open",
    searchHint:
      "Search by unit name, symbol or conversion pair to jump to the right page.",
    searchResultsTitle: "Search results",
    searchResultsHint:
      "Press Enter to open the first matching result.",
    searchEmpty: "No matching conversion was found.",
    toolsTitle: "Tools",
    categoriesTitle: "Categories",
    otherLanguagesTitle: "Other languages",
  },
} as const;

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon name={name} size={48} className="home-category-icon-svg" />
    </span>
  );
}

function normalizeSearchText(
  value: string,
  locale: Locale
) {
  return value
    .toLocaleLowerCase(locale === "en" ? "en-US" : "tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function OtherCategoriesPage({
  conversions,
  categories,
  tools,
  locale = "tr",
  alternateLink,
}: {
  conversions: SearchableConversion[];
  categories: SecondaryCategory[];
  tools?: OtherTool[];
  locale?: Locale;
  alternateLink?: AlternateLink;
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const copy = pageCopy[locale];

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(
    deferredQuery,
    locale
  );

  const searchResults = normalizedQuery
    ? conversions
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
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav
          className="breadcrumbs"
          aria-label={copy.breadcrumbAriaLabel}
        >
          <Link href={copy.homeHref}>{copy.homeLabel}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{copy.title}</span>
        </nav>

        <header className="other-categories-header">
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        <form
          className="directory-search other-categories-search"
          onSubmit={handleSubmit}
          role="search"
        >
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
              {copy.searchButton}
            </button>
          </div>

          <p className="directory-search-hint" id={`${inputId}-hint`}>
            {copy.searchHint}
          </p>

          {query.trim() ? (
            <div className="directory-search-results-wrap">
              <div className="directory-search-results-head">
                <strong>{copy.searchResultsTitle}</strong>
                <span>{copy.searchResultsHint}</span>
              </div>

              {searchResults.length > 0 ? (
                <ul className="directory-search-results" id={resultsId}>
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link href={result.href}>
                        <span>{result.label}</span>
                        <small>{result.description}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="directory-search-empty">
                  {copy.searchEmpty}
                </p>
              )}
            </div>
          ) : null}
        </form>

        {tools && tools.length > 0 ? (
          <section className="other-categories-section">
            <h2>{copy.toolsTitle}</h2>
            <div className="directory-home-category-grid">
              {tools.map((tool) => (
                <Link
                  className="directory-home-card"
                  href={tool.href}
                  key={tool.id}
                  aria-label={`${tool.title} — ${tool.description}`}
                >
                  <div className="directory-card-body directory-card-body-icon">
                    <CardIcon name={tool.iconName} />
                    <h3 className="home-category-title">{tool.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="other-categories-section">
          <h2>{copy.categoriesTitle}</h2>
          <div className="directory-home-category-grid">
            {categories.map((category) => (
              <Link
                className="directory-home-card"
                href={category.href}
                key={category.id}
                aria-label={`${category.title} — ${category.description}`}
              >
                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={category.iconName} />
                  <h3 className="home-category-title">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {alternateLink ? (
          <section className="conversion-section language-alternatives">
            <h2>{copy.otherLanguagesTitle}</h2>
            <Link
              className="text-link"
              href={alternateLink.href}
              hrefLang={alternateLink.hrefLang}
            >
              {alternateLink.label}
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}
