"use client";

import { useState } from "react";
import { calculateMol, type MolTarget } from "../converter/molCalculator";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 4): string {
  return value.toLocaleString("de-DE", { maximumFractionDigits });
}

function formatScientific(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

type CompoundMolCalculatorDeProps = {
  molarMass: number;
  compoundName: string;
};

export default function CompoundMolCalculatorDe({
  molarMass,
  compoundName,
}: CompoundMolCalculatorDeProps) {
  const [target, setTarget] = useState<MolTarget>("moles");
  const [massGrams, setMassGrams] = useState("10");
  const [moles, setMoles] = useState("1");

  const result = calculateMol({
    target,
    molarMass,
    massGrams: parseNumericValue(massGrams),
    moles: parseNumericValue(moles),
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Was möchtest du berechnen?</span>
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value as MolTarget)}
          >
            <option value="moles">Stoffmenge (aus Masse)</option>
            <option value="mass">Masse (aus Stoffmenge)</option>
          </select>
        </label>
        {target === "moles" ? (
          <label className="category-general-converter-field">
            <span>{compoundName}-Masse (g)</span>
            <input
              type="text"
              inputMode="decimal"
              value={massGrams}
              onChange={(event) => setMassGrams(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{compoundName}-Stoffmenge (mol)</span>
            <input
              type="text"
              inputMode="decimal"
              value={moles}
              onChange={(event) => setMoles(event.target.value)}
            />
          </label>
        )}
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Gib einen gültigen Wert ein, um das Ergebnis zu sehen.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Stoffmenge</span>
              <strong>{formatNumber(result.moles)} mol</strong>
            </div>
            <div>
              <span>Masse</span>
              <strong>{formatNumber(result.massGrams)} g</strong>
            </div>
            <div>
              <span>Molare Masse</span>
              <strong>{formatNumber(result.molarMass)} g/mol</strong>
            </div>
            <div>
              <span>Teilchenzahl</span>
              <strong>{formatScientific(result.particleCount)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
