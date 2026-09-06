"use client";

import { useState } from "react";
import { calculateSeedRate } from "../converter/seedRateCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kg`;
}

export default function SeedRateCalculator() {
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
          <span>Hedef Bitki Sayısı (bitki/m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={plantsInput}
            onChange={(event) => setPlantsInput(event.target.value)}
            placeholder="örn. 500"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Bin Dane Ağırlığı (g)</span>
          <input
            type="text"
            inputMode="decimal"
            value={tgwInput}
            onChange={(event) => setTgwInput(event.target.value)}
            placeholder="örn. 35"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Çimlenme Oranı (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={germinationInput}
            onChange={(event) => setGerminationInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Saflık Oranı (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={purityInput}
            onChange={(event) => setPurityInput(event.target.value)}
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
          <strong>Geçerli değerler gir (yüzdeler 0-100 arasında olmalı).</strong>
        ) : !result ? (
          <strong>Hedef bitki sayısı ve bin dane ağırlığını girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Dekara Gerekli Tohumluk</span>
              <strong>{formatKg(result.seedKgPerDa)}</strong>
            </div>
            <div>
              <span>Toplam Gerekli Tohumluk</span>
              <strong>{formatKg(result.totalSeedKg)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Önemli:</strong> Hedef bitki sayısı ve bin dane ağırlığı
        ürün çeşidine göre değişir; bu değerleri tohum etiketinden veya
        ziraat mühendisinden al. Bu araç yalnızca hesaplamayı yapar.
      </p>
    </div>
  );
}
