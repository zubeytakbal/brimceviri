"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { periodicTable, type PeriodicElement } from "../converter/periodicTableData";
import {
  elementCategoryLabelsDe,
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "../converter/periodicTableDataDe";

type SortKey = "atomicMass" | "atomicNumber" | "nameDe";
type SortDirection = "asc" | "desc";

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "atomicMass", label: "Atommasse" },
  { key: "atomicNumber", label: "Ordnungszahl" },
  { key: "nameDe", label: "Name (A-Z)" },
];

function formatMass(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
}

const elementsWithNameDe = periodicTable.map((element) => ({
  element,
  nameDe: elementNamesDeBySymbol[element.symbol] ?? element.symbol,
}));

export default function ElementRankingTableDe() {
  const [sortKey, setSortKey] = useState<SortKey>("atomicMass");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = useMemo(() => {
    const copy = [...elementsWithNameDe];

    copy.sort((a, b) => {
      let comparison = 0;

      if (sortKey === "nameDe") {
        comparison = a.nameDe.localeCompare(b.nameDe, "de");
      } else {
        comparison = a.element[sortKey] - b.element[sortKey];
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return copy;
  }, [sortKey, direction]);

  const rankedRows = useMemo(
    () => sorted.map((row, index) => ({ ...row, rank: index + 1 })),
    [sorted]
  );

  const visibleRows = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("de-DE");

    if (!query) {
      return rankedRows;
    }

    return rankedRows.filter(
      ({ element, nameDe }) =>
        nameDe.toLocaleLowerCase("de-DE").includes(query) ||
        element.symbol.toLocaleLowerCase("de-DE").includes(query)
    );
  }, [rankedRows, searchQuery]);

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
        <span>Element suchen (Name oder Symbol)</span>
        <input
          type="text"
          placeholder="z. B. Eisen, Fe, Gold..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </label>

      <div className="engineering-target-grid hydrostatic-target-grid element-ranking-controls">
        {sortOptions.map((option) => (
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
        <p className="element-ranking-empty">
          Kein Element gefunden für &quot;{searchQuery}&quot;.
        </p>
      ) : (
      <div className="conversion-table-wrap">
        <table className="conversion-table element-ranking-table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Element</th>
              <th>Symbol</th>
              <th>Ordnungszahl</th>
              <th>Atommasse (u)</th>
              <th>Kategorie</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(({ element, nameDe, rank }: { element: PeriodicElement; nameDe: string; rank: number }) => (
              <tr key={element.atomicNumber}>
                <td>{rank}</td>
                <td>
                  <Link href={`/de/periodensystem/${slugifyElementNameDe(nameDe)}`}>
                    {nameDe}
                  </Link>
                </td>
                <td>{element.symbol}</td>
                <td>{element.atomicNumber}</td>
                <td>{formatMass(element.atomicMass)}</td>
                <td>{elementCategoryLabelsDe[element.category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
