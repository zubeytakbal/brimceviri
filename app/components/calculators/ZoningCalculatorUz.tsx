"use client";

import { useState } from "react";
import { calculateZoningArea } from "../../converter/zoningCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatM2(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} m²`;
}

export default function ZoningCalculatorUz() {
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
          <span>Uchastka Maydoni (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Qurilish Zichligi Koeffitsiyenti (KAKS)</span>
          <input
            type="text"
            inputMode="decimal"
            value={kaksInput}
            onChange={(event) => setKaksInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>TAKS (ixtiyoriy)</span>
          <input
            type="text"
            inputMode="decimal"
            value={taksInput}
            onChange={(event) => setTaksInput(event.target.value)}
            placeholder="masalan, 0.4"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>To&apos;g&apos;ri qiymatlar kiriting.</strong>
        ) : !result ? (
          <strong>Uchastka maydoni va KAKS qiymatini kiritib jami qurilish maydonini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami Qurilish Maydoni</span>
              <strong>{formatM2(result.totalConstructionAreaM2)}</strong>
            </div>
            {result.maxFootprintM2 !== null && (
              <div>
                <span>Maksimal Asos Maydoni</span>
                <strong>{formatM2(result.maxFootprintM2)}</strong>
              </div>
            )}
            {result.estimatedFloors !== null && (
              <div>
                <span>Taxminiy Qavatlar Soni</span>
                <strong>
                  {result.estimatedFloors.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> KAKS va TAKS qiymatlarini shahar
        qurilish-arxitektura boshqarmasidan yoki qurilish uchun
        ruxsatnoma hujjatidan oling. Bu vosita faqat birlik hisobini
        amalga oshiradi — qurilish huquqini belgilamaydi.
      </p>
    </div>
  );
}
