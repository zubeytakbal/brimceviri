"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categoryLabels,
  periodicTable,
  slugifyElementName,
  type PeriodicElement,
} from "../converter/periodicTableData";

type SortKey = "atomicMass" | "atomicNumber" | "nameTr";
type SortDirection = "asc" | "desc";

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "atomicMass", label: "Atom Kütlesi" },
  { key: "atomicNumber", label: "Atom Numarası" },
  { key: "nameTr", label: "İsim (A-Z)" },
];

function formatMass(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
}

export default function ElementRankingTable() {
  const [sortKey, setSortKey] = useState<SortKey>("atomicMass");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = useMemo(() => {
    const copy = [...periodicTable];

    copy.sort((a, b) => {
      let comparison = 0;

      if (sortKey === "nameTr") {
        comparison = a.nameTr.localeCompare(b.nameTr, "tr");
      } else {
        comparison = a[sortKey] - b[sortKey];
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return copy;
  }, [sortKey, direction]);

  const rankedRows = useMemo(
    () => sorted.map((element, index) => ({ element, rank: index + 1 })),
    [sorted]
  );

  const visibleRows = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("tr-TR");

    if (!query) {
      return rankedRows;
    }

    return rankedRows.filter(
      ({ element }) =>
        element.nameTr.toLocaleLowerCase("tr-TR").includes(query) ||
        element.symbol.toLocaleLowerCase("tr-TR").includes(query)
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
        <span>Element ara (isim veya sembol)</span>
        <input
          type="text"
          placeholder="Örn: Demir, Fe, Altın..."
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
          "{searchQuery}" ile eşleşen bir element bulunamadı.
        </p>
      ) : (
      <div className="conversion-table-wrap">
        <table className="conversion-table element-ranking-table">
          <thead>
            <tr>
              <th>Sıra</th>
              <th>Element</th>
              <th>Sembol</th>
              <th>Atom Numarası</th>
              <th>Atom Kütlesi (u)</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(({ element, rank }: { element: PeriodicElement; rank: number }) => (
              <tr key={element.atomicNumber}>
                <td>{rank}</td>
                <td>
                  <Link
                    href={`/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(element.nameTr)}`}
                  >
                    {element.nameTr}
                  </Link>
                </td>
                <td>{element.symbol}</td>
                <td>{element.atomicNumber}</td>
                <td>{formatMass(element.atomicMass)}</td>
                <td>{categoryLabels[element.category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
