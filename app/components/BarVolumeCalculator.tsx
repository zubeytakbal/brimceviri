"use client";

import { useState } from "react";
import {
  convertBarVolume,
  type BarVolumeUnit,
} from "../converter/bartenderCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

const unitLabels: Record<BarVolumeUnit, string> = {
  oz: "oz (sıvı ons)",
  ml: "mL",
  cl: "cl",
};

export default function BarVolumeCalculator() {
  const [valueInput, setValueInput] = useState("1.5");
  const [unit, setUnit] = useState<BarVolumeUnit>("oz");

  const value = parseNumericValue(valueInput);
  const result = value !== null ? convertBarVolume(value, unit) : null;
  const invalid = valueInput.trim().length > 0 && !result;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Birim</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(unitLabels) as BarVolumeUnit[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${unit === key ? " is-active" : ""}`}
                onClick={() => setUnit(key)}
              >
                {unitLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Değer</span>
            <input
              type="text"
              inputMode="decimal"
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli bir değer gir.</strong>
        ) : !result ? (
          <strong>Bir değer girerek diğer ölçü birimlerini görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>oz (sıvı ons)</span>
              <strong>{formatValue(result.oz)}</strong>
            </div>
            <div>
              <span>mL</span>
              <strong>{formatValue(result.ml)}</strong>
            </div>
            <div>
              <span>cl</span>
              <strong>{formatValue(result.cl)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
