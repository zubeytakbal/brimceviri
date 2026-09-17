"use client";

import { useState } from "react";
import {
  convertBarVolume,
  type BarVolumeUnit,
} from "../../converter/bartenderCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 });
}

const unitLabelsUz: Record<BarVolumeUnit, string> = {
  oz: "oz (suyuqlik unsiyasi)",
  ml: "mL",
  cl: "cl",
};

export default function BarVolumeCalculatorUz() {
  const [valueInput, setValueInput] = useState("1.5");
  const [unit, setUnit] = useState<BarVolumeUnit>("oz");

  const value = parseNumericValue(valueInput);
  const result = value !== null ? convertBarVolume(value, unit) : null;
  const invalid = valueInput.trim().length > 0 && !result;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Birlik</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(unitLabelsUz) as BarVolumeUnit[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${unit === key ? " is-active" : ""}`}
                onClick={() => setUnit(key)}
              >
                {unitLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Qiymat</span>
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
          <strong>To&apos;g&apos;ri qiymat kiriting.</strong>
        ) : !result ? (
          <strong>Qiymat kiritib boshqa o&apos;lchov birliklarini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>oz (suyuqlik unsiyasi)</span>
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
