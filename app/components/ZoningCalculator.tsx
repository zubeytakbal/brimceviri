"use client";

import { useState } from "react";
import { calculateZoningArea } from "../converter/zoningCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatM2(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} m²`;
}

export default function ZoningCalculator() {
  const [areaInput, setAreaInput] = useState("1000");
  const [kaksInput, setKaksInput] = useState("2");
  const [taksInput, setTaksInput] = useState("");

  const area = parseNumericValue(areaInput);
  const kaks = parseNumericValue(kaksInput);
  const taks = parseNumericValue(taksInput);

  const result =
    area !== null && kaks !== null
      ? calculateZoningArea({ parcelAreaM2: area, kaks, taks })
      : null;

  const invalid = Boolean(areaInput.trim() || kaksInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Arsa Alanı (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>KAKS (Emsal)</span>
          <input
            type="text"
            inputMode="decimal"
            value={kaksInput}
            onChange={(event) => setKaksInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>TAKS (opsiyonel)</span>
          <input
            type="text"
            inputMode="decimal"
            value={taksInput}
            onChange={(event) => setTaksInput(event.target.value)}
            placeholder="örn. 0.4"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir.</strong>
        ) : !result ? (
          <strong>Arsa alanı ve KAKS değerini girerek toplam inşaat alanını görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam İnşaat Alanı</span>
              <strong>{formatM2(result.totalConstructionAreaM2)}</strong>
            </div>
            {result.maxFootprintM2 !== null && (
              <div>
                <span>Maksimum Taban Alanı</span>
                <strong>{formatM2(result.maxFootprintM2)}</strong>
              </div>
            )}
            {result.estimatedFloors !== null && (
              <div>
                <span>Tahmini Kat Sayısı</span>
                <strong>
                  {result.estimatedFloors.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> KAKS ve TAKS değerlerini belediyenin
        e-imar sisteminden veya imar durum belgesinden al. Bu araç
        yalnızca birim çevirimi yapar — imar hakkını belirlemez.
      </p>
    </div>
  );
}
