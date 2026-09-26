"use client";

import { useState } from "react";
import { calculateMol, type MolTarget } from "../converter/molCalculator";
import { numberLocales, type ContentLocale } from "./contentLocale";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, locale: ContentLocale, maximumFractionDigits = 4): string {
  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits });
}

function formatScientific(value: number, locale: ContentLocale): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  return `${formatNumber(mantissa, locale, 3)} × 10^${exponent}`;
}

const copy = {
  tr: {
    targetLabel: "Ne Hesaplamak İstiyorsun?",
    molesOption: "Mol sayısı (kütleden)",
    massOption: "Kütle (mol sayısından)",
    massInput: (name: string) => `${name} Kütlesi (g)`,
    molesInput: (name: string) => `${name} Mol Sayısı`,
    invalid: "Geçerli bir değer girerek hesaplamayı gör.",
    moles: "Mol Sayısı",
    mass: "Kütle",
    molarMass: "Molar Kütle",
    particles: "Parçacık Sayısı",
  },
  de: {
    targetLabel: "Was möchtest du berechnen?",
    molesOption: "Stoffmenge (aus Masse)",
    massOption: "Masse (aus Stoffmenge)",
    massInput: (name: string) => `${name}-Masse (g)`,
    molesInput: (name: string) => `${name}-Stoffmenge (mol)`,
    invalid: "Gib einen gültigen Wert ein, um das Ergebnis zu sehen.",
    moles: "Stoffmenge",
    mass: "Masse",
    molarMass: "Molare Masse",
    particles: "Teilchenzahl",
  },
};

type CompoundMolCalculatorProps = {
  molarMass: number;
  compoundName: string;
  locale?: ContentLocale;
};

export default function CompoundMolCalculator({
  molarMass,
  compoundName,
  locale = "tr",
}: CompoundMolCalculatorProps) {
  const t = copy[locale];
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
          <span>{t.targetLabel}</span>
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value as MolTarget)}
          >
            <option value="moles">{t.molesOption}</option>
            <option value="mass">{t.massOption}</option>
          </select>
        </label>
        {target === "moles" ? (
          <label className="category-general-converter-field">
            <span>{t.massInput(compoundName)}</span>
            <input
              type="text"
              inputMode="decimal"
              value={massGrams}
              onChange={(event) => setMassGrams(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{t.molesInput(compoundName)}</span>
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
          <strong>{t.invalid}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{t.moles}</span>
              <strong>{formatNumber(result.moles, locale)} mol</strong>
            </div>
            <div>
              <span>{t.mass}</span>
              <strong>{formatNumber(result.massGrams, locale)} g</strong>
            </div>
            <div>
              <span>{t.molarMass}</span>
              <strong>{formatNumber(result.molarMass, locale)} g/mol</strong>
            </div>
            <div>
              <span>{t.particles}</span>
              <strong>{formatScientific(result.particleCount, locale)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
