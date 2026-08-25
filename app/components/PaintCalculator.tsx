"use client";

import { useMemo, useState } from "react";
import {
  calculatePaintNeeds,
  type PaintCalculatorInput,
  type PaintCanSuggestion,
} from "../converter/paintCalculator";

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

function formatArea(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} m²`;
}

function formatLiters(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} litre`;
}

function formatCanList(cans: PaintCanSuggestion[]) {
  if (!cans || cans.length === 0) {
    return "-";
  }

  return cans
    .map((can) => `${can.count} × ${can.size.toLocaleString("tr-TR")} L`)
    .join(" + ");
}

export default function PaintCalculator() {
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
          <span>Oda Uzunluğu (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Oda Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Duvar Yüksekliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Kapı Sayısı</span>
          <input
            inputMode="numeric"
            type="text"
            value={doorCount}
            onChange={(event) => setDoorCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Pencere Sayısı</span>
          <input
            inputMode="numeric"
            type="text"
            value={windowCount}
            onChange={(event) => setWindowCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Kat Sayısı</span>
          <select
            value={coats}
            onChange={(event) => setCoats(Number(event.target.value) as 1 | 2)}
          >
            <option value={1}>Tek kat</option>
            <option value={2}>İki kat (önerilen)</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Boya Verimi (m²/litre)</span>
          <input
            inputMode="decimal"
            type="text"
            value={coverage}
            onChange={(event) => setCoverage(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Tavan da boyanacak mı?</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={includeCeiling}
              onChange={(event) => setIncludeCeiling(event.target.checked)}
            />
            Evet, tavanı da hesaba kat
          </span>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>Net duvar alanı</span>
                <strong>{formatArea(result.netWallArea)}</strong>
              </div>
              {includeCeiling && (
                <div>
                  <span>Tavan alanı</span>
                  <strong>{formatArea(result.ceilingArea)}</strong>
                </div>
              )}
              <div>
                <span>Toplam boyanacak alan ({coats} kat)</span>
                <strong>{formatArea(result.totalPaintedArea)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              Gereken boya miktarı: <strong>{formatLiters(result.litersNeeded)}</strong>
            </p>
            <p className="category-general-converter-equality">
              Önerilen kutu kombinasyonu: {formatCanList(result.suggestedCans)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
