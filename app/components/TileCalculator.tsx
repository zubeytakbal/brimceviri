"use client";

import { useMemo, useState } from "react";
import {
  calculateTileNeeds,
  type TileCalculatorInput,
} from "../converter/tileCalculator";

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

export default function TileCalculator() {
  const [area, setArea] = useState("20");
  const [tileWidthCm, setTileWidthCm] = useState("60");
  const [tileHeightCm, setTileHeightCm] = useState("60");
  const [wastePercent, setWastePercent] = useState("10");

  const input: TileCalculatorInput = useMemo(
    () => ({
      area: parseNumericValue(area),
      tileWidthCm: parseNumericValue(tileWidthCm),
      tileHeightCm: parseNumericValue(tileHeightCm),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [area, tileWidthCm, tileHeightCm, wastePercent]
  );

  const result = useMemo(() => calculateTileNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Kaplanacak Alan (m²)</span>
          <input
            inputMode="decimal"
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Fayans Eni (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={tileWidthCm}
            onChange={(event) => setTileWidthCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Fayans Boyu (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={tileHeightCm}
            onChange={(event) => setTileHeightCm(event.target.value)}
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
                <span>1 fayansın alanı</span>
                <strong>{formatArea(result.tileAreaM2)}</strong>
              </div>
              <div>
                <span>Fire dahil toplam alan</span>
                <strong>{formatArea(result.requiredAreaWithWaste)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              Gereken fayans adedi: <strong>{result.requiredTileCount} adet</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
