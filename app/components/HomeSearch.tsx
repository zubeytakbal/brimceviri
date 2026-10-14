"use client";

import Link from "@/app/components/SiteLink";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useRef, useState } from "react";
import { DecorativeIcon } from "./siteIcons";
import { useSearchTracking } from "./useSearchTracking";
import { rankSearchResults } from "../converter/homeSearchRanking";

// Ana sayfa aramasi. Arama dizini (dil basina ~200 KB) sayfaya gomulmez; ziyaretci arama
// kutusuna ilk kez dokundugunda /arama-dizini/<dil>.json dosyasindan indirilir.

export type HomeSearchItem = {
  id: string;
  href: string;
  label: string;
  description?: string;
  categoryLabel: string;
  searchText: string;
};

export type HomeSearchStrings = {
  searchLabel: string;
  searchPlaceholder: string;
  searchHint: string;
  searchResultsLabel: string;
  searchEmpty: string;
  searchEnterHint: string;
  searchCategoryPrefix: string;
  openLabel: string;
};

export type HomeSearchLocale = "tr" | "en" | "uz" | "de" | "ar" | "fr" | "es" | "pt" | "it" | "sv" | "no" | "da" | "bn";

// Her dilin ana sayfa dizinindeki searchText ile ayni normallestirme (dizin bununla uretilir).
function normalizeSearchText(value: string, locale: HomeSearchLocale) {
  if (locale === "ar") return value.toLocaleLowerCase("ar").replace(/[^\u0600-\u06ffa-z0-9]+/g, " ").trim();
  if (locale === "bn") return value.toLocaleLowerCase("bn").replace(/[^\u0980-\u09ffa-z0-9]+/g, " ").trim();
  const lower = locale === "tr" || locale === "en" || locale === "uz" || locale === "de" ? value.toLocaleLowerCase("tr-TR") : value.toLocaleLowerCase(locale);
  return lower
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Arapcada her kelime ayri aranir ve basindaki "ال" takisi atilir; diger dillerde aranan
 * ifade metinde bir butun olarak gecmeli (ana sayfalarin onceki davranisiyla ayni).
 */
function matches(searchText: string, query: string, locale: HomeSearchLocale) {
  if (locale !== "ar") return searchText.includes(query);
  return query
    .split(" ")
    .map((token) => (token.length > 3 && token.startsWith("ال") ? token.slice(2) : token))
    .every((token) => searchText.includes(token));
}

export default function HomeSearch({ locale, strings }: { locale: HomeSearchLocale; strings: HomeSearchStrings }) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<HomeSearchItem[] | null>(null);
  const loading = useRef(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(deferredQuery, locale);

  const load = () => {
    if (items || loading.current) return;
    loading.current = true;
    fetch(`/arama-dizini/${locale}.json`)
      .then((r) => r.json())
      .then((data: HomeSearchItem[]) => setItems(data))
      .catch(() => {
        loading.current = false;
      });
  };

  const searchResults = normalizedQuery && items ? rankSearchResults(items, normalizedQuery, (text, q) => matches(text, q, locale), 8) : [];
  useSearchTracking(locale, items ? query : "", searchResults.length);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchResults[0]) router.push(searchResults[0].href);
  }

  return (
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
          onFocus={load}
          onPointerEnter={load}
          onChange={(event) => {
            load();
            setQuery(event.target.value);
          }}
        />

        <button type="submit">
          <DecorativeIcon className="directory-button-icon" name="search" size={18} />
          {strings.openLabel}
        </button>
      </div>

      <p className="directory-search-hint" id={`${inputId}-hint`}>
        {strings.searchHint}
      </p>

      {query.trim() && items ? (
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
                      {strings.searchCategoryPrefix}: {result.categoryLabel}
                      {result.description ? <> · {result.description}</> : null}
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
  );
}
