"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { periodicTable, type PeriodicElement } from "../converter/periodicTableData";
import { numberLocales, type ContentLocale } from "./contentLocale";
import { elementCategoryLabels, getElementName, getElementPath } from "./elementLocale";

type SortKey = "atomicMass" | "atomicNumber" | "name";
type SortDirection = "asc" | "desc";

const copy = {
  tr: {
    sortOptions: [
      { key: "atomicMass", label: "Atom Kütlesi" },
      { key: "atomicNumber", label: "Atom Numarası" },
      { key: "name", label: "İsim (A-Z)" },
    ] as Array<{ key: SortKey; label: string }>,
    searchLabel: "Element ara (isim veya sembol)",
    searchPlaceholder: "Örn: Demir, Fe, Altın...",
    noMatch: (query: string) => <>"{query}" ile eşleşen bir element bulunamadı.</>,
    rank: "Sıra",
    symbol: "Sembol",
    atomicNumber: "Atom Numarası",
    atomicMass: "Atom Kütlesi (u)",
    category: "Kategori",
  },
  de: {
    sortOptions: [
      { key: "atomicMass", label: "Atommasse" },
      { key: "atomicNumber", label: "Ordnungszahl" },
      { key: "name", label: "Name (A-Z)" },
    ] as Array<{ key: SortKey; label: string }>,
    searchLabel: "Element suchen (Name oder Symbol)",
    searchPlaceholder: "z. B. Eisen, Fe, Gold...",
    noMatch: (query: string) => <>Kein Element gefunden für "{query}".</>,
    rank: "Rang",
    symbol: "Symbol",
    atomicNumber: "Ordnungszahl",
    atomicMass: "Atommasse (u)",
    category: "Kategorie",
  },
};

export default function ElementRankingTable({ locale = "tr" }: { locale?: ContentLocale } = {}) {
  const t = copy[locale];
  const numberLocale = numberLocales[locale];
  const [sortKey, setSortKey] = useState<SortKey>("atomicMass");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const elementsWithName = useMemo(
    () => periodicTable.map((element) => ({ element, name: getElementName(element, locale) })),
    [locale]
  );

  const sorted = useMemo(() => {
    const rows = [...elementsWithName];

    rows.sort((a, b) => {
      let comparison = 0;

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name, locale);
      } else {
        comparison = a.element[sortKey] - b.element[sortKey];
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return rows;
  }, [elementsWithName, sortKey, direction, locale]);

  const rankedRows = useMemo(
    () => sorted.map((row, index) => ({ ...row, rank: index + 1 })),
    [sorted]
  );

  const visibleRows = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase(numberLocale);

    if (!query) {
      return rankedRows;
    }

    return rankedRows.filter(
      ({ element, name }) =>
        name.toLocaleLowerCase(numberLocale).includes(query) ||
        element.symbol.toLocaleLowerCase(numberLocale).includes(query)
    );
  }, [rankedRows, searchQuery, numberLocale]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setDirection("desc");
  }

  function renderSortIndicator(key: SortKey) {
    if (key !== sortKey) {
      return null;
    }

    return <span aria-hidden="true">{direction === "asc" ? " ↑" : " ↓"}</span>;
  }

  return (
    <div>
      <label className="category-general-converter-field element-ranking-search">
        <span>{t.searchLabel}</span>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </label>

      <div className="engineering-target-grid hydrostatic-target-grid element-ranking-controls">
        {t.sortOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`engineering-target-button${sortKey === option.key ? " is-active" : ""}`}
            onClick={() => handleSort(option.key)}
          >
            {option.label}
            {renderSortIndicator(option.key)}
          </button>
        ))}
      </div>

      {searchQuery.trim() && visibleRows.length === 0 ? (
        <p className="element-ranking-empty">{t.noMatch(searchQuery)}</p>
      ) : (
      <div className="conversion-table-wrap">
        <table className="conversion-table element-ranking-table">
          <thead>
            <tr>
              <th>{t.rank}</th>
              <th>Element</th>
              <th>{t.symbol}</th>
              <th>{t.atomicNumber}</th>
              <th>{t.atomicMass}</th>
              <th>{t.category}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(({ element, name, rank }: { element: PeriodicElement; name: string; rank: number }) => (
              <tr key={element.atomicNumber}>
                <td>{rank}</td>
                <td>
                  <Link href={getElementPath(element, locale)}>{name}</Link>
                </td>
                <td>{element.symbol}</td>
                <td>{element.atomicNumber}</td>
                <td>{element.atomicMass.toLocaleString(numberLocale, { maximumFractionDigits: 3 })}</td>
                <td>{elementCategoryLabels[locale][element.category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
