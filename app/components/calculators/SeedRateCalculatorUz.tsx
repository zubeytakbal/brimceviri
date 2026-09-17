"use client";

import { useState } from "react";
import { calculateSeedRate } from "../../converter/seedRateCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })} kg`;
}

export default function SeedRateCalculatorUz() {
  const [plantsInput, setPlantsInput] = useState("");
  const [tgwInput, setTgwInput] = useState("");
  const [germinationInput, setGerminationInput] = useState("90");
  const [purityInput, setPurityInput] = useState("98");
  const [areaInput, setAreaInput] = useState("1");

  const plants = parseNumericValue(plantsInput);
  const tgw = parseNumericValue(tgwInput);
  const germination = parseNumericValue(germinationInput);
  const purity = parseNumericValue(purityInput);
  const area = parseNumericValue(areaInput);

  const result =
    plants !== null && tgw !== null && germination !== null && purity !== null && area !== null
      ? calculateSeedRate({
          targetPlantsPerM2: plants,
          thousandGrainWeightG: tgw,
          germinationPercent: germination,
          purityPercent: purity,
          areaDa: area,
        })
      : null;

  const invalid = Boolean(plantsInput.trim() || tgwInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Maqsadli O&apos;simlik Soni (o&apos;simlik/m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={plantsInput}
            onChange={(event) => setPlantsInput(event.target.value)}
            placeholder="masalan 500"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ming Don Og&apos;irligi (g)</span>
          <input
            type="text"
            inputMode="decimal"
            value={tgwInput}
            onChange={(event) => setTgwInput(event.target.value)}
            placeholder="masalan 35"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Unib Chiqish Darajasi (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={germinationInput}
            onChange={(event) => setGerminationInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Tozalik Darajasi (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={purityInput}
            onChange={(event) => setPurityInput(event.target.value)}
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
          <strong>To&apos;g&apos;ri qiymatlar kiriting (foizlar 0-100 orasida bo&apos;lishi kerak).</strong>
        ) : !result ? (
          <strong>Maqsadli o&apos;simlik soni va ming don og&apos;irligini kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Dekar uchun Kerakli Urug&apos;lik</span>
              <strong>{formatKg(result.seedKgPerDa)}</strong>
            </div>
            <div>
              <span>Jami Kerakli Urug&apos;lik</span>
              <strong>{formatKg(result.totalSeedKg)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Muhim:</strong> Maqsadli o&apos;simlik soni va ming
        don og&apos;irligi mahsulot turiga qarab o&apos;zgaradi; bu
        qiymatlarni urug&apos; yorlig&apos;idan yoki agronomdan oling.
        Bu vosita faqat hisoblashni amalga oshiradi.
      </p>
    </div>
  );
}
