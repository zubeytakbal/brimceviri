"use client";

import { useState } from "react";
import { calculateChlorineDose } from "../converter/poolCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatGrams(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} g`;
}

export default function ChlorineDoseCalculator() {
  const [volumeInput, setVolumeInput] = useState("50");
  const [currentInput, setCurrentInput] = useState("0");
  const [targetInput, setTargetInput] = useState("2");
  const [activePercentInput, setActivePercentInput] = useState("70");

  const volume = parseNumericValue(volumeInput);
  const current = parseNumericValue(currentInput);
  const target = parseNumericValue(targetInput);
  const activePercent = parseNumericValue(activePercentInput);

  const result =
    volume !== null && current !== null && target !== null && activePercent !== null
      ? calculateChlorineDose({
          volumeM3: volume,
          currentChlorinePpm: current,
          targetChlorinePpm: target,
          productActivePercent: activePercent,
        })
      : null;

  const invalid =
    Boolean(volumeInput.trim() || targetInput.trim() || activePercentInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Havuz Hacmi (m³)</span>
          <input
            type="text"
            inputMode="decimal"
            value={volumeInput}
            onChange={(event) => setVolumeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mevcut Klor (ppm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Hedef Klor (ppm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={targetInput}
            onChange={(event) => setTargetInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ürünün Aktif Klor Yüzdesi (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={activePercentInput}
            onChange={(event) => setActivePercentInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir (hedef klor, mevcut klordan büyük olmalı).</strong>
        ) : !result ? (
          <strong>Havuz hacmi ve klor değerlerini girerek gereken ürün miktarını görebilirsin.</strong>
        ) : (
          <strong>Gereken Ürün Miktarı: {formatGrams(result)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Hedef klor seviyesi; havuz kullanım
        yoğunluğuna, sıcaklığa ve yerel sağlık mevzuatına göre değişir.
        Bu araç hangi hedef seviyenin uygun olduğunu belirlemez —
        yalnızca birim çevirimi yapar.
      </p>
    </div>
  );
}
