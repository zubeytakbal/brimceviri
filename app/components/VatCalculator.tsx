"use client";

import { useMemo, useState } from "react";
import {
  calculateVat,
  type VatCalculatorInput,
  type VatDirection,
} from "../converter/vatCalculator";

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

const rateOptions = ["1", "10", "20", "custom"] as const;

const rateOptionLabels: Record<(typeof rateOptions)[number], string> = {
  "1": "%1",
  "10": "%10",
  "20": "%20",
  custom: "Özel oran",
};

export default function VatCalculator() {
  const [amount, setAmount] = useState("1000");
  const [ratePreset, setRatePreset] = useState<(typeof rateOptions)[number]>("20");
  const [customRate, setCustomRate] = useState("20");
  const [direction, setDirection] = useState<VatDirection>(
    "exclusive-to-inclusive"
  );

  const ratePercent =
    ratePreset === "custom" ? parseNumericValue(customRate) : Number(ratePreset);

  const input: VatCalculatorInput = useMemo(
    () => ({
      amount: parseNumericValue(amount),
      ratePercent,
      direction,
    }),
    [amount, ratePercent, direction]
  );

  const result = useMemo(() => calculateVat(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Hesap Yönü</span>
          <select
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as VatDirection)
            }
          >
            <option value="exclusive-to-inclusive">KDV Hariç → KDV Dahil</option>
            <option value="inclusive-to-exclusive">KDV Dahil → KDV Hariç</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Tutar (₺)</span>
          <input
            inputMode="decimal"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>KDV Oranı</span>
          <select
            value={ratePreset}
            onChange={(event) =>
              setRatePreset(event.target.value as (typeof rateOptions)[number])
            }
          >
            {rateOptions.map((option) => (
              <option key={option} value={option}>
                {rateOptionLabels[option]}
              </option>
            ))}
          </select>
        </label>

        {ratePreset === "custom" && (
          <label className="category-general-converter-field">
            <span>Özel Oran (%)</span>
            <input
              inputMode="decimal"
              type="text"
              value={customRate}
              onChange={(event) => setCustomRate(event.target.value)}
            />
          </label>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli tutar ve oran girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>KDV Hariç Tutar (Matrah)</span>
              <strong>{formatCurrency(result.baseAmount)}</strong>
            </div>
            <div>
              <span>KDV Tutarı</span>
              <strong>{formatCurrency(result.vatAmount)}</strong>
            </div>
            <div>
              <span>KDV Dahil Tutar</span>
              <strong>{formatCurrency(result.totalAmount)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
