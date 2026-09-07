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
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

function formatScientific(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

type CompoundMolCalculatorProps = {
  molarMass: number;
  compoundName: string;
};

export default function CompoundMolCalculator({
  molarMass,
  compoundName,
}: CompoundMolCalculatorProps) {
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
          <span>Ne Hesaplamak İstiyorsun?</span>
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value as MolTarget)}
          >
            <option value="moles">Mol sayısı (kütleden)</option>
            <option value="mass">Kütle (mol sayısından)</option>
          </select>
        </label>
        {target === "moles" ? (
          <label className="category-general-converter-field">
            <span>{compoundName} Kütlesi (g)</span>
            <input
              type="text"
              inputMode="decimal"
              value={massGrams}
              onChange={(event) => setMassGrams(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{compoundName} Mol Sayısı</span>
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
          <strong>Geçerli bir değer girerek hesaplamayı gör.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Mol Sayısı</span>
              <strong>{formatNumber(result.moles)} mol</strong>
            </div>
            <div>
              <span>Kütle</span>
              <strong>{formatNumber(result.massGrams)} g</strong>
            </div>
            <div>
              <span>Molar Kütle</span>
              <strong>{formatNumber(result.molarMass)} g/mol</strong>
            </div>
            <div>
              <span>Parçacık Sayısı</span>
              <strong>{formatScientific(result.particleCount)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
