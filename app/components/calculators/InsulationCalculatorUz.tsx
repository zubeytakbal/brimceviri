"use client";

import { useMemo, useState } from "react";
import {
  calculateInsulationNeeds,
  type InsulationCalculatorInput,
} from "../../converter/insulationCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function InsulationCalculatorUz() {
  const [area, setArea] = useState("100");
  const [boardWidth, setBoardWidth] = useState("100");
  const [boardHeight, setBoardHeight] = useState("50");
  const [wastePercent, setWastePercent] = useState("10");

  const input: InsulationCalculatorInput = useMemo(
    () => ({
      area: parseNumericValue(area),
      boardWidthCm: parseNumericValue(boardWidth),
      boardHeightCm: parseNumericValue(boardHeight),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [area, boardWidth, boardHeight, wastePercent]
  );

  const result = useMemo(
    () => calculateInsulationNeeds(input),
    [input]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Qoplanadigan Maydon (m²)</span>
          <input
            inputMode="decimal"
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Plita Kengligi (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={boardWidth}
            onChange={(event) => setBoardWidth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Plita Balandligi (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={boardHeight}
            onChange={(event) => setBoardHeight(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Zaxira Ulushi (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wastePercent}
            onChange={(event) => setWastePercent(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri o&apos;lchamlarni kiritib natijani
            ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Plita Maydoni</span>
              <strong>{formatNumber(result.boardAreaM2)} m²</strong>
            </div>
            <div>
              <span>Zaxira Ulushi Dahil Maydon</span>
              <strong>
                {formatNumber(result.requiredAreaWithWaste)} m²
              </strong>
            </div>
            <div>
              <span>Kerakli Plitalar Soni</span>
              <strong>{result.requiredBoardCount} dona</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
