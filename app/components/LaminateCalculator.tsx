"use client";

import { useMemo, useState } from "react";
import {
  calculateLaminateNeeds,
  type LaminateCalculatorInput,
} from "../converter/laminateCalculator";

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

export default function LaminateCalculator() {
  const [area, setArea] = useState("20");
  const [packageAreaM2, setPackageAreaM2] = useState("2.222");
  const [wastePercent, setWastePercent] = useState("10");

  const input: LaminateCalculatorInput = useMemo(
    () => ({
      area: parseNumericValue(area),
      packageAreaM2: parseNumericValue(packageAreaM2),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [area, packageAreaM2, wastePercent]
  );

  const result = useMemo(() => calculateLaminateNeeds(input), [input]);

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
          <span>Paket İçi Alan (m²)</span>
          <input
            inputMode="decimal"
            type="text"
            value={packageAreaM2}
            onChange={(event) => setPackageAreaM2(event.target.value)}
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
                <span>Fire dahil toplam alan</span>
                <strong>{formatArea(result.requiredAreaWithWaste)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              Gereken paket sayısı: <strong>{result.requiredPackageCount} paket</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
