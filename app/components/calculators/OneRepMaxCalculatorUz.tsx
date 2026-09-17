"use client";

import { useMemo, useState } from "react";
import {
  calculateOneRepMax,
  calculateTrainingPercentages,
} from "../../converter/oneRepMaxCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} kg`;
}

function estimateRepsForPercentage(percentage: number): number {
  if (percentage >= 100) return 1;
  return Math.round(30 * (100 / percentage - 1));
}

export default function OneRepMaxCalculatorUz() {
  const [weightInput, setWeightInput] = useState("100");
  const [repsInput, setRepsInput] = useState("5");

  const weight = parseNumericValue(weightInput);
  const reps = parseNumericValue(repsInput);
  const oneRepMax = weight !== null && reps !== null ? calculateOneRepMax(weight, reps) : null;
  const invalid = (weightInput.trim() || repsInput.trim()) && !oneRepMax;

  const trainingTable = useMemo(
    () => (oneRepMax !== null ? calculateTrainingPercentages(oneRepMax) : null),
    [oneRepMax]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Ko&apos;tarilgan Og&apos;irlik (kg)</span>
          <input
            type="text"
            inputMode="decimal"
            value={weightInput}
            onChange={(event) => setWeightInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Bajarilgan Takrorlar Soni</span>
          <input
            type="text"
            inputMode="numeric"
            value={repsInput}
            onChange={(event) => setRepsInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>To&apos;g&apos;ri qiymatlar kiriting (takrorlar soni 1-15 oralig&apos;ida bo&apos;lishi kerak).</strong>
        ) : !oneRepMax ? (
          <strong>Og&apos;irlik va takrorlar sonini kiritib taxminiy 1RM&apos;ni ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Taxminiy 1RM: {formatKg(oneRepMax)}</strong>
        )}
      </div>

      {trainingTable && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Mashg&apos;ulot foizi jadvali (Epley formulasi bo&apos;yicha)</caption>
            <thead>
              <tr>
                <th scope="col">1RM Foizi</th>
                <th scope="col">Og&apos;irlik</th>
                <th scope="col">Odatiy Takrorlar Oralig&apos;i</th>
              </tr>
            </thead>
            <tbody>
              {trainingTable.map((row) => (
                <tr key={row.percentage}>
                  <td>%{row.percentage}</td>
                  <td>{formatKg(row.weight)}</td>
                  <td>~{estimateRepsForPercentage(row.percentage)} takror</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
