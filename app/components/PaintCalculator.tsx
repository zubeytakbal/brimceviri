"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculatePaintNeeds,
  type PaintCalculatorInput,
  type PaintCanSuggestion,
} from "../converter/paintCalculator";

type PaintCalculatorCopy = {
  labels: {
    length: string;
    width: string;
    height: string;
    doors: string;
    windows: string;
    coats: string;
    coverage: string;
    ceilingQuestion: string;
    ceilingCheckbox: string;
  };
  coatOptions: Record<1 | 2, string>;
  emptyState: string;
  resultLabels: {
    netWallArea: string;
    ceilingArea: string;
    totalPaintedArea: string;
    litersNeeded: string;
    suggestedCans: string;
  };
  units: {
    area: string;
    liters: string;
  };
};

const copyByLocale: Record<Exclude<Locale, "ru">, PaintCalculatorCopy> = {
  tr: {
    labels: {
      length: "Oda Uzunluğu (m)",
      width: "Oda Genişliği (m)",
      height: "Duvar Yüksekliği (m)",
      doors: "Kapı Sayısı",
      windows: "Pencere Sayısı",
      coats: "Kat Sayısı",
      coverage: "Boya Verimi (m2/litre)",
      ceilingQuestion: "Tavan da boyanacak mi?",
      ceilingCheckbox: "Evet, tavanı da hesaba kat",
    },
    coatOptions: {
      1: "Tek kat",
      2: "İki kat (önerilen)",
    },
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultLabels: {
      netWallArea: "Net duvar alanı",
      ceilingArea: "Tavan alanı",
      totalPaintedArea: "Toplam boyanacak alan",
      litersNeeded: "Gereken boya miktarı",
      suggestedCans: "Önerilen kutu kombinasyonu",
    },
    units: {
      area: "m2",
      liters: "litre",
    },
  },
  en: {
    labels: {
      length: "Room Length (m)",
      width: "Room Width (m)",
      height: "Wall Height (m)",
      doors: "Door Count",
      windows: "Window Count",
      coats: "Number of Coats",
      coverage: "Paint Coverage (m2/liter)",
      ceilingQuestion: "Paint the ceiling too?",
      ceilingCheckbox: "Yes, include the ceiling",
    },
    coatOptions: {
      1: "Single coat",
      2: "Two coats (recommended)",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      netWallArea: "Net wall area",
      ceilingArea: "Ceiling area",
      totalPaintedArea: "Total painted area",
      litersNeeded: "Required paint",
      suggestedCans: "Suggested can combination",
    },
    units: {
      area: "m2",
      liters: "liters",
    },
  },
  de: {
    labels: {
      length: "Raumlänge (m)",
      width: "Raumbreite (m)",
      height: "Wandhöhe (m)",
      doors: "Anzahl Türen",
      windows: "Anzahl Fenster",
      coats: "Anzahl Anstriche",
      coverage: "Deckkraft (m²/Liter)",
      ceilingQuestion: "Soll die Decke mitgestrichen werden?",
      ceilingCheckbox: "Ja, Decke einbeziehen",
    },
    coatOptions: {
      1: "Ein Anstrich",
      2: "Zwei Anstriche (empfohlen)",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      netWallArea: "Netto-Wandfläche",
      ceilingArea: "Deckenfläche",
      totalPaintedArea: "Gesamte Streichfläche",
      litersNeeded: "Benötigte Farbmenge",
      suggestedCans: "Empfohlene Eimerkombination",
    },
    units: {
      area: "m2",
      liters: "Liter",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function parseIntegerValue(rawValue: string) {
  const numericValue = parseNumericValue(rawValue);

  return Number.isFinite(numericValue) ? Math.max(0, Math.round(numericValue)) : Number.NaN;
}

function formatArea(value: number, locale: Locale, unitLabel: string) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 1 })} ${unitLabel}`;
}

function formatLiters(value: number, locale: Locale, unitLabel: string) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 1 })} ${unitLabel}`;
}

function formatCanList(cans: PaintCanSuggestion[], locale: Locale) {
  if (!cans || cans.length === 0) {
    return "-";
  }

  return cans
    .map(
      (can) =>
        `${can.count} x ${formatLocalizedNumber(can.size, locale, {
          maximumFractionDigits: 1,
        })} L`
    )
    .join(" + ");
}

export default function PaintCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [length, setLength] = useState("4");
  const [width, setWidth] = useState("3.5");
  const [height, setHeight] = useState("2.7");
  const [doorCount, setDoorCount] = useState("1");
  const [windowCount, setWindowCount] = useState("1");
  const [coats, setCoats] = useState<1 | 2>(2);
  const [coverage, setCoverage] = useState("10");
  const [includeCeiling, setIncludeCeiling] = useState(false);

  const input: PaintCalculatorInput = useMemo(
    () => ({
      length: parseNumericValue(length),
      width: parseNumericValue(width),
      height: parseNumericValue(height),
      doorCount: parseIntegerValue(doorCount),
      windowCount: parseIntegerValue(windowCount),
      coats,
      coverage: parseNumericValue(coverage),
      includeCeiling,
    }),
    [length, width, height, doorCount, windowCount, coats, coverage, includeCeiling]
  );

  const result = useMemo(() => calculatePaintNeeds(input), [input]);

  return (
    <div className="category-general-converter paint-calculator">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.length}</span>
          <input
            inputMode="decimal"
            type="text"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.width}</span>
          <input
            inputMode="decimal"
            type="text"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.height}</span>
          <input
            inputMode="decimal"
            type="text"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.doors}</span>
          <input
            inputMode="numeric"
            type="text"
            value={doorCount}
            onChange={(event) => setDoorCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.windows}</span>
          <input
            inputMode="numeric"
            type="text"
            value={windowCount}
            onChange={(event) => setWindowCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.coats}</span>
          <select
            value={coats}
            onChange={(event) => setCoats(Number(event.target.value) as 1 | 2)}
          >
            <option value={1}>{copy.coatOptions[1]}</option>
            <option value={2}>{copy.coatOptions[2]}</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.coverage}</span>
          <input
            inputMode="decimal"
            type="text"
            value={coverage}
            onChange={(event) => setCoverage(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>{copy.labels.ceilingQuestion}</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={includeCeiling}
              onChange={(event) => setIncludeCeiling(event.target.checked)}
            />
            {copy.labels.ceilingCheckbox}
          </span>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.netWallArea}</span>
                <strong>{formatArea(result.netWallArea, locale, copy.units.area)}</strong>
              </div>
              {includeCeiling && (
                <div>
                  <span>{copy.resultLabels.ceilingArea}</span>
                  <strong>{formatArea(result.ceilingArea, locale, copy.units.area)}</strong>
                </div>
              )}
              <div>
                <span>{`${copy.resultLabels.totalPaintedArea} (${coats})`}</span>
                <strong>{formatArea(result.totalPaintedArea, locale, copy.units.area)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              {copy.resultLabels.litersNeeded}:{" "}
              <strong>{formatLiters(result.litersNeeded, locale, copy.units.liters)}</strong>
            </p>
            <p className="category-general-converter-equality">
              {copy.resultLabels.suggestedCans}: {formatCanList(result.suggestedCans, locale)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
