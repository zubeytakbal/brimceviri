"use client";

import { useMemo, useState } from "react";
import {
  calculateExcavation,
  type ExcavationInput,
} from "../converter/excavationCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ExcavationCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [depth, setDepth] = useState("1.5");
  const [swellPercent, setSwellPercent] = useState("25");
  const [truckCapacity, setTruckCapacity] = useState("10");

  const input: ExcavationInput = useMemo(
    () => ({
      length: parseNumericValue(length),
      width: parseNumericValue(width),
      depth: parseNumericValue(depth),
      swellPercent: parseNumericValue(swellPercent),
      truckCapacityM3: parseNumericValue(truckCapacity),
    }),
    [length, width, depth, swellPercent, truckCapacity]
  );

  const result = useMemo(() => calculateExcavation(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Kazı Uzunluğu (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Kazı Genişliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Kazı Derinliği (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={depth}
            onChange={(event) => setDepth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Gevşeme/Şişme Payı (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={swellPercent}
            onChange={(event) => setSwellPercent(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Kamyon Kasa Hacmi (m³)</span>
          <input
            inputMode="decimal"
            type="text"
            value={truckCapacity}
            onChange={(event) => setTruckCapacity(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli ölçüler girerek sonucu görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yerinde (Bank) Kazı Hacmi</span>
              <strong>{formatNumber(result.bankVolumeM3)} m³</strong>
            </div>
            <div>
              <span>Gevşek (Şişmiş) Hacim</span>
              <strong>{formatNumber(result.looseVolumeM3)} m³</strong>
            </div>
            <div>
              <span>Gereken Kamyon Yükü</span>
              <strong>{result.truckLoadCount} kamyon</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
