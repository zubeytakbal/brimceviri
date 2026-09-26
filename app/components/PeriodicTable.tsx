"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  periodicTable,
  type ElementCategory,
  type PeriodicElement,
} from "../converter/periodicTableData";
import { numberLocales, type ContentLocale } from "./contentLocale";
import { elementCategoryLabels, getElementName, getElementPath } from "./elementLocale";

function formatMass(value: number, locale: ContentLocale) {
  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits: 3 });
}

const copy = {
  tr: {
    cellLabel: (name: string, symbol: string) => `${name} (${symbol}) - ayrıntılı bilgi için tıkla`,
    instructions: (
      <>
        Fare ile bir elementin üzerine gel: hızlı bilgi burada görünür.
        Ayrıntılı sayfayı açmak için elemente tıkla.
      </>
    ),
    atomicMassPrefix: "Atom kütlesi: ",
    periodPrefix: "Periyot ",
    groupPrefix: ", Grup ",
    openDetails: "Ayrıntılı sayfayı aç →",
    empty: "Bir element seç, bilgileri burada görünsün.",
  },
  de: {
    cellLabel: (name: string, symbol: string) => `${name} (${symbol}) - für Details klicken`,
    instructions: (
      <>
        Fahre mit der Maus über ein Element: Schnellinfo erscheint hier.
        Klicke auf ein Element, um die Detailseite zu öffnen.
      </>
    ),
    atomicMassPrefix: "Atommasse: ",
    periodPrefix: "Periode ",
    groupPrefix: ", Gruppe ",
    openDetails: "Detailseite öffnen →",
    empty: "Wähle ein Element, Infos erscheinen hier.",
  },
};

const mainBlock = periodicTable.filter((element) => element.row <= 7);
const fBlock = periodicTable.filter((element) => element.row >= 9);

export default function PeriodicTable({ locale = "tr" }: { locale?: ContentLocale } = {}) {
  const t = copy[locale];
  const categoryLabels = elementCategoryLabels[locale];
  const legendCategories = Object.keys(categoryLabels) as ElementCategory[];
  const router = useRouter();
  const [activeElement, setActiveElement] = useState<PeriodicElement | null>(
    null
  );

  function goToElement(element: PeriodicElement) {
    router.push(getElementPath(element, locale));
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
        aria-label={t.cellLabel(getElementName(element, locale), element.symbol)}
      >
        <span className="element-number">{element.atomicNumber}</span>
        <span className="element-symbol">{element.symbol}</span>
      </button>
    );
  }

  return (
    <div>
      <p className="periodic-table-instructions">{t.instructions}</p>

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
                {getElementName(activeElement, locale)} ({activeElement.atomicNumber})
              </h3>
              <div className="periodic-table-preview-facts">
                <span>{t.atomicMassPrefix}{formatMass(activeElement.atomicMass, locale)} u</span>
                <span>{categoryLabels[activeElement.category]}</span>
                <span>
                  {t.periodPrefix}{activeElement.period}
                  {activeElement.group ? `${t.groupPrefix}${activeElement.group}` : ""}
                </span>
              </div>
            </div>
            <span className="periodic-table-preview-link">
              {t.openDetails}
            </span>
          </>
        ) : (
          <span className="periodic-table-preview-empty">
            {t.empty}
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
