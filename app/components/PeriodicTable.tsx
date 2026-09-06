"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  categoryLabels,
  periodicTable,
  slugifyElementName,
  type ElementCategory,
  type PeriodicElement,
} from "../converter/periodicTableData";

function formatMass(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
}

const mainBlock = periodicTable.filter((element) => element.row <= 7);
const fBlock = periodicTable.filter((element) => element.row >= 9);

const legendCategories = Object.keys(categoryLabels) as ElementCategory[];

export default function PeriodicTable() {
  const router = useRouter();
  const [activeElement, setActiveElement] = useState<PeriodicElement | null>(
    null
  );

  function goToElement(element: PeriodicElement) {
    router.push(
      `/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(
        element.nameTr
      )}`
    );
  }

  function renderCell(element: PeriodicElement) {
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
        aria-label={`${element.nameTr} (${element.symbol}) - ayrıntılı bilgi için tıkla`}
      >
        <span className="element-number">{element.atomicNumber}</span>
        <span className="element-symbol">{element.symbol}</span>
      </button>
    );
  }

  return (
    <div>
      <p className="periodic-table-instructions">
        Fare ile bir elementin üzerine gel: hızlı bilgi burada görünür.
        Ayrıntılı sayfayı açmak için elemente tıkla.
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
                {activeElement.nameTr} ({activeElement.atomicNumber})
              </h3>
              <div className="periodic-table-preview-facts">
                <span>Atom kütlesi: {formatMass(activeElement.atomicMass)} u</span>
                <span>{categoryLabels[activeElement.category]}</span>
                <span>
                  Periyot {activeElement.period}
                  {activeElement.group ? `, Grup ${activeElement.group}` : ""}
                </span>
              </div>
            </div>
            <span className="periodic-table-preview-link">
              Ayrıntılı sayfayı aç →
            </span>
          </>
        ) : (
          <span className="periodic-table-preview-empty">
            Bir element seç, bilgileri burada görünsün.
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
                background: getComputedSwatchColor(category),
              }}
            />
            {categoryLabels[category]}
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

function getComputedSwatchColor(category: ElementCategory) {
  return swatchColors[category];
}
