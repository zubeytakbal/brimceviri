"use client";

import { useState } from "react";
import { calculateAbv } from "../converter/bartenderCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function AbvCalculator() {
  const [volumeInput, setVolumeInput] = useState("330");
  const [abvInput, setAbvInput] = useState("5");

  const volume = parseNumericValue(volumeInput);
  const abv = parseNumericValue(abvInput);
  const result = volume !== null && abv !== null ? calculateAbv({ volumeMl: volume, abvPercent: abv }) : null;
  const invalid = Boolean(volumeInput.trim() || abvInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>İçecek Hacmi (mL)</span>
          <input
            type="text"
            inputMode="decimal"
            value={volumeInput}
            onChange={(event) => setVolumeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Alkol Yüzdesi - ABV (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={abvInput}
            onChange={(event) => setAbvInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir (ABV %0-100 arasında olmalı).</strong>
        ) : !result ? (
          <strong>Hacim ve ABV girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Saf Alkol Hacmi</span>
              <strong>{formatValue(result.pureAlcoholMl)} mL</strong>
            </div>
            <div>
              <span>Saf Alkol Ağırlığı</span>
              <strong>{formatValue(result.pureAlcoholGrams)} g</strong>
            </div>
            <div>
              <span>Standart İçki Sayısı</span>
              <strong>~{formatValue(result.standardDrinks, 2)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Standart içki sayısı, uluslararası yaygın
        10 g saf alkol referansına göre hesaplanır; bazı ülkeler 8-14 g
        arasında farklı bir referans kullanır.
      </p>
    </div>
  );
}
