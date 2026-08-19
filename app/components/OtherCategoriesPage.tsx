"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { DecorativeIcon } from "./siteIcons";

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
};

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function OtherCategoriesPage({
  conversions,
  categories,
}: {
  conversions: SearchableConversion[];
  categories: SecondaryCategory[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(deferredQuery);

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
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Diğer Dönüşümler</span>
        </nav>

        <header className="other-categories-header">
          <h1>Diğer Dönüşümler</h1>
          <p>
            Ana sayfada yer almayan, daha az bilinen ancak mühendislik ve
            bilim alanlarında gerçekten kullanılan birim kategorilerini
            burada bulabilirsiniz.
          </p>
        </header>

        <form
          className="directory-search other-categories-search"
          onSubmit={handleSubmit}
          role="search"
        >
          <label htmlFor={inputId}>Dönüşüm ara</label>

          <div className="directory-search-field">
            <input
              id={inputId}
              type="search"
              value={query}
              placeholder="Örnek: newton, viskozite, beygirgücü, tork"
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
              Aç
            </button>
          </div>

          <p className="directory-search-hint" id={`${inputId}-hint`}>
            Birim adı, sembol veya dönüşüm çifti yazarak ilgili sayfayı
            bulun.
          </p>

          {query.trim() ? (
            <div className="directory-search-results-wrap">
              <div className="directory-search-results-head">
                <strong>Arama sonuçları</strong>
                <span>İlk sonucu açmak için Enter kullanabilirsiniz.</span>
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
                  Eşleşen dönüşüm bulunamadı.
                </p>
              )}
            </div>
          ) : null}
        </form>

        <div className="other-categories-grid">
          {categories.map((category) => (
            <Link
              className="other-category-card"
              href={category.href}
              key={category.id}
            >
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
