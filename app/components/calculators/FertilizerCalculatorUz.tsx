"use client";

import { useState } from "react";
import { calculateFertilizerNeed } from "../../converter/fertilizerCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })} kg`;
}

export default function FertilizerCalculatorUz() {
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
          <span>Maqsadli Ozuqa Dozasi (kg/dekar)</span>
          <input
            type="text"
            inputMode="decimal"
            value={targetInput}
            onChange={(event) => setTargetInput(event.target.value)}
            placeholder="masalan 6"
          />
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;g&apos;itning Ozuqa Tarkibi (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={contentInput}
            onChange={(event) => setContentInput(event.target.value)}
            placeholder="masalan 20"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Umumiy Maydon (dekar)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiriting (ozuqa tarkibi 0-100% orasida bo&apos;lishi kerak).</strong>
        ) : !result ? (
          <strong>Maqsadli doza va ozuqa tarkibini kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Dekar uchun Kerakli O&apos;g&apos;it</span>
              <strong>{formatKg(result.productKgPerDa)}</strong>
            </div>
            <div>
              <span>Jami Kerakli O&apos;g&apos;it</span>
              <strong>{formatKg(result.totalProductKg)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Muhim:</strong> Bu vosita faqat birlik aylantirishini
        amalga oshiradi — qaysi ozuqa dozasining mos ekanligini
        belgilamaydi. Maqsadli ozuqa dozasini har doim tuproq tahlili
        natijasidan yoki agronomdan oling.
      </p>
    </div>
  );
}
