"use client";

import { useMemo, useState } from "react";
import {
  calculateWallpaperNeeds,
  type WallpaperCalculatorInput,
} from "../converter/wallpaperCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatArea(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} m²`;
}

export default function WallpaperCalculator() {
  const [wallWidth1, setWallWidth1] = useState("4");
  const [wallWidth2, setWallWidth2] = useState("3");
  const [wallWidth3, setWallWidth3] = useState("4");
  const [wallWidth4, setWallWidth4] = useState("3");
  const [wallHeight, setWallHeight] = useState("2.5");
  const [rollWidthCm, setRollWidthCm] = useState("53");
  const [rollLengthM, setRollLengthM] = useState("10.05");
  const [wastePercent, setWastePercent] = useState("15");

  const input: WallpaperCalculatorInput = useMemo(
    () => ({
      wallWidthsM: [wallWidth1, wallWidth2, wallWidth3, wallWidth4].map(
        parseNumericValue
      ),
      wallHeightM: parseNumericValue(wallHeight),
      rollWidthCm: parseNumericValue(rollWidthCm),
      rollLengthM: parseNumericValue(rollLengthM),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [wallWidth1, wallWidth2, wallWidth3, wallWidth4, wallHeight, rollWidthCm, rollLengthM, wastePercent]
  );

  const result = useMemo(() => calculateWallpaperNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Duvar 1 Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth1}
            onChange={(event) => setWallWidth1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Duvar 2 Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth2}
            onChange={(event) => setWallWidth2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Duvar 3 Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth3}
            onChange={(event) => setWallWidth3(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Duvar 4 Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth4}
            onChange={(event) => setWallWidth4(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Tavan Yüksekliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallHeight}
            onChange={(event) => setWallHeight(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Rulo Eni (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={rollWidthCm}
            onChange={(event) => setRollWidthCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Rulo Uzunluğu (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={rollLengthM}
            onChange={(event) => setRollLengthM(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Fire Payı (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wastePercent}
            onChange={(event) => setWastePercent(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>Toplam Duvar Alanı</span>
                <strong>{formatArea(result.totalWallAreaM2)}</strong>
              </div>
              <div>
                <span>1 Rulonun Alanı</span>
                <strong>{formatArea(result.rollAreaM2)}</strong>
              </div>
              <div>
                <span>Fire Dahil Toplam Alan</span>
                <strong>{formatArea(result.requiredAreaWithWaste)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              Gereken rulo sayısı: <strong>{result.requiredRollCount} rulo</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
