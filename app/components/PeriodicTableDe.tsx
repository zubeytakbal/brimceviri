"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  periodicTable,
  type ElementCategory,
  type PeriodicElement,
} from "../converter/periodicTableData";
import {
  elementCategoryLabelsDe,
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "../converter/periodicTableDataDe";

function formatMass(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
}

const mainBlock = periodicTable.filter((element) => element.row <= 7);
const fBlock = periodicTable.filter((element) => element.row >= 9);

const legendCategories = Object.keys(elementCategoryLabelsDe) as ElementCategory[];

export default function PeriodicTableDe() {
  const router = useRouter();
  const [activeElement, setActiveElement] = useState<PeriodicElement | null>(
    null
  );

  function goToElement(element: PeriodicElement) {
    router.push(
      `/de/periodensystem/${slugifyElementNameDe(
        elementNamesDeBySymbol[element.symbol] ?? element.symbol
      )}`
    );
  }

  function renderCell(element: PeriodicElement) {
    const nameDe = elementNamesDeBySymbol[element.symbol] ?? element.symbol;

    return (
      <button
        key={element.atomicNumber}
        type="button"
        className="periodic-table-cell"
        data-category={element.category}
        style={{ gridRow: element.row, gridColumn: element.col }}
        onMouseEnter={() => setActiveElement(element)}
        onFocus={() => setActiveElement(element)}
        onClick={() => goToElement(element)}
        aria-label={`${nameDe} (${element.symbol}) - für Details klicken`}
      >
        <span className="element-number">{element.atomicNumber}</span>
        <span className="element-symbol">{element.symbol}</span>
      </button>
    );
  }

  const activeNameDe = activeElement
    ? elementNamesDeBySymbol[activeElement.symbol] ?? activeElement.symbol
    : null;

  return (
    <div>
      <p className="periodic-table-instructions">
        Fahre mit der Maus über ein Element: Schnellinfo erscheint hier.
        Klicke auf ein Element, um die Detailseite zu öffnen.
      </p>

      <div className="periodic-table-preview">
        {activeElement ? (
          <>
            <span
              className="periodic-table-preview-symbol"
              style={{
                color:
                  activeElement.category === "ametal"
                    ? "#0b5f5b"
                    : undefined,
              }}
            >
              {activeElement.symbol}
            </span>
            <div className="periodic-table-preview-body">
              <h3>
                {activeNameDe} ({activeElement.atomicNumber})
              </h3>
              <div className="periodic-table-preview-facts">
                <span>Atommasse: {formatMass(activeElement.atomicMass)} u</span>
                <span>{elementCategoryLabelsDe[activeElement.category]}</span>
                <span>
                  Periode {activeElement.period}
                  {activeElement.group ? `, Gruppe ${activeElement.group}` : ""}
                </span>
              </div>
            </div>
            <span className="periodic-table-preview-link">
              Detailseite öffnen →
            </span>
          </>
        ) : (
          <span className="periodic-table-preview-empty">
            Wähle ein Element, Infos erscheinen hier.
          </span>
        )}
      </div>

      <div className="periodic-table-wrap">
        <div className="periodic-table-grid">
          {mainBlock.map((element) => renderCell(element))}
        </div>

        <div className="periodic-table-fblock">
          {fBlock.map((element) => renderCell(element))}
        </div>
      </div>

      <div className="periodic-table-legend">
        {legendCategories.map((category) => (
          <span className="periodic-table-legend-item" key={category}>
            <span
              className="periodic-table-legend-swatch"
              data-category={category}
              style={{
                background: swatchColors[category],
              }}
            />
            {elementCategoryLabelsDe[category]}
          </span>
        ))}
      </div>
    </div>
  );
}

const swatchColors: Record<ElementCategory, string> = {
  "alkali-metal": "#ffd6cc",
  "toprak-alkali-metal": "#ffe8b8",
  "gecis-metali": "#fff3b0",
  "post-gecis-metali": "#d7f0e8",
  "yari-metal": "#e3d9f7",
  ametal: "#cdeeeb",
  halojen: "#ffd9e8",
  "soy-gaz": "#d6e4ff",
  lantanit: "#ddf0d0",
  aktinit: "#c8e6c0",
};
