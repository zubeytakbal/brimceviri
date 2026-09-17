"use client";

import { useState } from "react";
import { calculateAbv } from "../../converter/bartenderCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function AbvCalculatorUz() {
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
          <span>Ichimlik Hajmi (mL)</span>
          <input
            type="text"
            inputMode="decimal"
            value={volumeInput}
            onChange={(event) => setVolumeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Alkogol Foizi - ABV (%)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiriting (ABV 0-100% orasida bo&apos;lishi kerak).</strong>
        ) : !result ? (
          <strong>Hajm va ABV kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Sof Alkogol Hajmi</span>
              <strong>{formatValue(result.pureAlcoholMl)} mL</strong>
            </div>
            <div>
              <span>Sof Alkogol Og&apos;irligi</span>
              <strong>{formatValue(result.pureAlcoholGrams)} g</strong>
            </div>
            <div>
              <span>Standart Ichimlik Soni</span>
              <strong>~{formatValue(result.standardDrinks, 2)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Standart ichimlik soni xalqaro keng
        qo&apos;llaniladigan 10 g sof alkogol ma&apos;lumotnomasiga
        qarab hisoblanadi; ba&apos;zi mamlakatlar 8-14 g orasida
        farqli ma&apos;lumotnomadan foydalanadi.
      </p>
    </div>
  );
}
