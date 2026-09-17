"use client";

import { useState } from "react";
import { calculateChlorineDose } from "../../converter/poolCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatGrams(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} g`;
}

export default function ChlorineDoseCalculatorUz() {
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
          <span>Hovuz Hajmi (m³)</span>
          <input
            type="text"
            inputMode="decimal"
            value={volumeInput}
            onChange={(event) => setVolumeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mavjud Xlor (ppm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Maqsadli Xlor (ppm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={targetInput}
            onChange={(event) => setTargetInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mahsulotning Faol Xlor Foizi (%)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiriting (maqsadli xlor mavjud xlordan katta bo&apos;lishi kerak).</strong>
        ) : !result ? (
          <strong>Hovuz hajmi va xlor qiymatlarini kiritib kerakli mahsulot miqdorini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Kerakli Mahsulot Miqdori: {formatGrams(result)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Maqsadli xlor darajasi hovuz
        foydalanish zichligiga, haroratga va mahalliy sog&apos;liqni
        saqlash qoidalariga qarab o&apos;zgaradi. Bu vosita qaysi
        maqsadli darajaning mos ekanligini belgilamaydi — faqat birlik
        aylantirishini amalga oshiradi.
      </p>
    </div>
  );
}
