"use client";

import { useState } from "react";
import { calculateWeightOnCelestialBody } from "../converter/weightOnCelestialBody";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function CelestialBodyWeightCalculator({
  celestialBodyId,
  bodyName,
}: {
  celestialBodyId: string;
  bodyName: string;
}) {
  const [weight, setWeight] = useState("70");

  const result = calculateWeightOnCelestialBody(parseNumericValue(weight), celestialBodyId);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Dünya&apos;daki Ağırlığın (kg)</span>
          <input
            type="text"
            inputMode="decimal"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli bir ağırlık girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>{bodyName}&apos;de Ağırlığın</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result)} kg</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama, kütlenin sabit kaldığı,
        sadece yerçekimi ivmesine bağlı olarak bir terazinin
        göstereceği değeri tahmin eder ({bodyName} yerçekimi / Dünya
        yerçekimi oranı).
      </p>
    </div>
  );
}
