"use client";

import { useMemo, useState } from "react";
import {
  calculatePlaster,
  type PlasterType,
} from "../../converter/plasterCalculator";

const typeLabelsUz: Record<PlasterType, string> = {
  alci: "Gips Suvoq (Ichki Fasad)",
  cimento: "Tsement Asosli Suvoq (Tashqi Fasad)",
};

const defaultsByType: Record<PlasterType, { kgPerM2PerCm: string; bagWeightKg: string; thicknessCm: string }> = {
  alci: { kgPerM2PerCm: "9", bagWeightKg: "30", thicknessCm: "1.5" },
  cimento: { kgPerM2PerCm: "16", bagWeightKg: "25", thicknessCm: "2" },
};

const errorMessagesUz: Record<string, string> = {
  "Alan 0'dan büyük olmalı.": "Maydon 0 dan katta bo'lishi kerak.",
  "Kalınlık 0'dan büyük olmalı.": "Qalinlik 0 dan katta bo'lishi kerak.",
  "m² başına kg değeri 0'dan büyük olmalı.": "m² uchun kg qiymati 0 dan katta bo'lishi kerak.",
  "Torba ağırlığı 0'dan büyük olmalı.": "Qop og'irligi 0 dan katta bo'lishi kerak.",
  "Fire payı 0 veya daha büyük olmalı.": "Zaxira ulushi 0 yoki undan katta bo'lishi kerak.",
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function PlasterCalculatorUz() {
  const [plasterType, setPlasterType] = useState<PlasterType>("alci");
  const [area, setArea] = useState("50");
  const [thicknessCm, setThicknessCm] = useState(defaultsByType.alci.thicknessCm);
  const [kgPerM2PerCm, setKgPerM2PerCm] = useState(defaultsByType.alci.kgPerM2PerCm);
  const [bagWeightKg, setBagWeightKg] = useState(defaultsByType.alci.bagWeightKg);
  const [wasteFactor, setWasteFactor] = useState("5");

  function handleTypeChange(nextType: PlasterType) {
    const defaults = defaultsByType[nextType];
    setPlasterType(nextType);
    setThicknessCm(defaults.thicknessCm);
    setKgPerM2PerCm(defaults.kgPerM2PerCm);
    setBagWeightKg(defaults.bagWeightKg);
  }

  const result = useMemo(
    () =>
      calculatePlaster({
        plasterType,
        area: parseNumericValue(area),
        thicknessCm: parseNumericValue(thicknessCm),
        kgPerM2PerCm: parseNumericValue(kgPerM2PerCm),
        bagWeightKg: parseNumericValue(bagWeightKg),
        wasteFactor: parseNumericValue(wasteFactor),
      }),
    [plasterType, area, thicknessCm, kgPerM2PerCm, bagWeightKg, wasteFactor]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Suvoq Turi</span>
          <div className="engineering-target-grid">
            {(Object.keys(typeLabelsUz) as PlasterType[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${plasterType === key ? " is-active" : ""}`}
                onClick={() => handleTypeChange(key)}
              >
                {typeLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Suvoqlanadigan Maydon (m²)</span>
            <input
              inputMode="decimal"
              type="text"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Qalinlik (sm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={thicknessCm}
              onChange={(event) => setThicknessCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>m² Uchun kg (1 sm uchun)</span>
            <input
              inputMode="decimal"
              type="text"
              value={kgPerM2PerCm}
              onChange={(event) => setKgPerM2PerCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Qop Og&apos;irligi (kg)</span>
            <input
              inputMode="decimal"
              type="text"
              value={bagWeightKg}
              onChange={(event) => setBagWeightKg(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Zaxira Ulushi (%)</span>
            <input
              inputMode="decimal"
              type="text"
              value={wasteFactor}
              onChange={(event) => setWasteFactor(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result.success ? (
          <strong>{errorMessagesUz[result.message] ?? result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Kerakli Material</span>
              <strong>{formatNumber(result.result.totalKg)} kg</strong>
            </div>
            <div>
              <span>Zaxira Dahil Material</span>
              <strong>{formatNumber(result.result.totalKgWithWaste)} kg</strong>
            </div>
            <div>
              <span>Qoplar Soni</span>
              <strong>{formatNumber(result.result.bagCount)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Eslatma: m² uchun kg qiymati va qop og&apos;irligi mahsulot
        markasiga qarab o&apos;zgaradi — bu vosita keng tarqalgan gips
        va tsement asosli suvoq mahsulotlariga asoslangan standart
        qiymatlardan foydalanadi; o&apos;zingiz ishlatadigan mahsulot
        qadog&apos;idagi sarf jadvaliga qarab bu maydonlarni
        yangilashingiz mumkin.
      </p>
    </div>
  );
}
