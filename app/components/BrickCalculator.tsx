"use client";

import { useMemo, useState } from "react";
import {
  calculateBrickNeeds,
  type BrickCalculatorInput,
} from "../converter/brickCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatArea(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 3 })} m²`;
}

export default function BrickCalculator() {
  const [wallArea, setWallArea] = useState("20");
  const [brickWidthCm, setBrickWidthCm] = useState("19");
  const [brickHeightCm, setBrickHeightCm] = useState("13.5");
  const [jointMm, setJointMm] = useState("10");
  const [wastePercent, setWastePercent] = useState("5");

  const input: BrickCalculatorInput = useMemo(
    () => ({
      wallArea: parseNumericValue(wallArea),
      brickWidthCm: parseNumericValue(brickWidthCm),
      brickHeightCm: parseNumericValue(brickHeightCm),
      jointMm: parseNumericValue(jointMm),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [wallArea, brickWidthCm, brickHeightCm, jointMm, wastePercent]
  );

  const result = useMemo(() => calculateBrickNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Duvar Alanı (m²)</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallArea}
            onChange={(event) => setWallArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Tuğla Eni (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickWidthCm}
            onChange={(event) => setBrickWidthCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Tuğla Yüksekliği (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickHeightCm}
            onChange={(event) => setBrickHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Derz Kalınlığı (mm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={jointMm}
            onChange={(event) => setJointMm(event.target.value)}
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
                <span>1 tuğlanın derzli alanı</span>
                <strong>{formatArea(result.brickUnitAreaM2)}</strong>
              </div>
              <div>
                <span>Fire dahil toplam alan</span>
                <strong>{formatArea(result.requiredAreaWithWaste)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              Gereken tuğla adedi: <strong>{result.requiredBrickCount} adet</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
