"use client";

import { useState } from "react";
import { calculateFertilizerNeed } from "../converter/fertilizerCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kg`;
}

export default function FertilizerCalculator() {
  const [targetInput, setTargetInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [areaInput, setAreaInput] = useState("1");

  const target = parseNumericValue(targetInput);
  const content = parseNumericValue(contentInput);
  const area = parseNumericValue(areaInput);

  const result =
    target !== null && content !== null && area !== null
      ? calculateFertilizerNeed({
          targetNutrientKgPerDa: target,
          nutrientContentPercent: content,
          areaDa: area,
        })
      : null;

  const invalid = Boolean(targetInput.trim() || contentInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Hedef Besin Dozu (kg/dekar)</span>
          <input
            type="text"
            inputMode="decimal"
            value={targetInput}
            onChange={(event) => setTargetInput(event.target.value)}
            placeholder="örn. 6"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Gübrenin Besin İçeriği (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={contentInput}
            onChange={(event) => setContentInput(event.target.value)}
            placeholder="örn. 20"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Toplam Alan (dekar)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir (besin içeriği %0-100 arasında olmalı).</strong>
        ) : !result ? (
          <strong>Hedef doz ve besin içeriğini girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Dekara Gerekli Gübre</span>
              <strong>{formatKg(result.productKgPerDa)}</strong>
            </div>
            <div>
              <span>Toplam Gerekli Gübre</span>
              <strong>{formatKg(result.totalProductKg)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Önemli:</strong> Bu araç yalnızca birim çevirimi yapar —
        hangi besin dozunun uygun olduğunu belirlemez. Hedef besin
        dozunu her zaman bir toprak analizi sonucundan veya ziraat
        mühendisinden al.
      </p>
    </div>
  );
}
