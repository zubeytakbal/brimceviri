"use client";

import Link from "@/app/components/SiteLink";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useRef, useState } from "react";
import { DecorativeIcon } from "./siteIcons";
import { useSearchTracking } from "./useSearchTracking";

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

// HomeDirectory'deki dizinle ayni normallestirme (searchText bununla uretilir).
function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function HomeSearch({ locale, strings }: { locale: "tr" | "en" | "uz" | "de"; strings: HomeSearchStrings }) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<HomeSearchItem[] | null>(null);
  const loading = useRef(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(deferredQuery);

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

  const searchResults = normalizedQuery && items ? items.filter((item) => item.searchText.includes(normalizedQuery)).slice(0, 8) : [];
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
