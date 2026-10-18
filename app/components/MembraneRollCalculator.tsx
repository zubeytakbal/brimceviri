"use client";

import { useMemo, useState } from "react";
import { calculateMembraneRolls } from "../converter/membraneRollCalculator";

function parseNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function MembraneRollCalculator() {
  const [area, setArea] = useState("60");
  const [rollWidth, setRollWidth] = useState("1");
  const [rollLength, setRollLength] = useState("10");
  const [sideLap, setSideLap] = useState("10");
  const [endLap, setEndLap] = useState("15");
  const [waste, setWaste] = useState("10");

  const result = useMemo(
    () =>
      calculateMembraneRolls({
        areaM2: parseNumber(area),
        rollWidthM: parseNumber(rollWidth),
        rollLengthM: parseNumber(rollLength),
        sideLapCm: parseNumber(sideLap),
        endLapCm: parseNumber(endLap),
        wastePercent: parseNumber(waste),
      }),
    [area, rollWidth, rollLength, sideLap, endLap, waste]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Yalıtılacak Alan (m²)</span>
            <input inputMode="decimal" type="text" value={area} onChange={(event) => setArea(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Rulo Eni (m)</span>
            <input inputMode="decimal" type="text" value={rollWidth} onChange={(event) => setRollWidth(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Rulo Boyu (m)</span>
            <input inputMode="decimal" type="text" value={rollLength} onChange={(event) => setRollLength(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Yan Bindirme (cm)</span>
            <input inputMode="decimal" type="text" value={sideLap} onChange={(event) => setSideLap(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Rulo Ucu Bindirmesi (cm)</span>
            <input inputMode="decimal" type="text" value={endLap} onChange={(event) => setEndLap(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Kesim/Fire Payı (%)</span>
            <input inputMode="decimal" type="text" value={waste} onChange={(event) => setWaste(event.target.value)} />
          </label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli alan, rulo ölçüsü ve bindirme değerleri gir.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Bindirmeler Sonrası Rulo Başına Alan</span>
              <strong>{formatNumber(result.effectiveCoveragePerRollM2)} m²</strong>
            </div>
            <div>
              <span>Fire Dahil Alan</span>
              <strong>{formatNumber(result.areaWithWasteM2)} m²</strong>
            </div>
            <div>
              <span>Yaklaşık Rulo İhtiyacı</span>
              <strong>{formatNumber(result.rollCount, 0)} rulo</strong>
            </div>
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">
        Bindirme değerlerini ve rulo ölçülerini ürün teknik föyünden al. Sonuç yaklaşık metrajdır; parapet dönüşü, detay, şaşırtmalı serim ve çatı geometrisi ek fire gerektirebilir.
      </p>
    </div>
  );
}
