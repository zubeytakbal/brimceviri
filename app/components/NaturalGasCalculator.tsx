"use client";

import { useMemo, useState } from "react";
import {
  calculateNaturalGasCost,
  type NaturalGasCalculatorInput,
} from "../converter/naturalGasCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatCurrency(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺`;
}

export default function NaturalGasCalculator() {
  const [consumptionM3, setConsumptionM3] = useState("100");
  const [pricePerM3, setPricePerM3] = useState("20");

  const input: NaturalGasCalculatorInput = useMemo(
    () => ({
      consumptionM3: parseNumericValue(consumptionM3),
      pricePerM3: parseNumericValue(pricePerM3),
    }),
    [consumptionM3, pricePerM3]
  );

  const result = useMemo(() => calculateNaturalGasCost(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Tüketim (m³)</span>
          <input
            inputMode="decimal"
            type="text"
            value={consumptionM3}
            onChange={(event) => setConsumptionM3(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Birim Fiyat (₺/m³)</span>
          <input
            inputMode="decimal"
            type="text"
            value={pricePerM3}
            onChange={(event) => setPricePerM3(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli tüketim ve fiyat girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam Maliyet</span>
              <strong>{formatCurrency(result.totalCost)}</strong>
            </div>
            <div>
              <span>Yaklaşık Enerji Karşılığı</span>
              <strong>
                {result.approximateKwh.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} kWh
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Not: kWh karşılığı Türkiye ortalamasına göre yaklaşık bir değerdir;
        gerçek katsayı dağıtım bölgesine ve faturana göre değişebilir.
      </p>
    </div>
  );
}
