"use client";

import { useMemo, useState } from "react";
import {
  calculateOneRepMax,
  calculateTrainingPercentages,
} from "../converter/oneRepMaxCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKg(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kg`;
}

function estimateRepsForPercentage(percentage: number): number {
  if (percentage >= 100) return 1;
  return Math.round(30 * (100 / percentage - 1));
}

export default function OneRepMaxCalculator() {
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
          <span>Kaldırılan Ağırlık (kg)</span>
          <input
            type="text"
            inputMode="decimal"
            value={weightInput}
            onChange={(event) => setWeightInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Yapılan Tekrar Sayısı</span>
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
          <strong>Geçerli değerler gir (tekrar sayısı 1-15 arasında olmalı).</strong>
        ) : !oneRepMax ? (
          <strong>Ağırlık ve tekrar sayısı girerek tahmini 1RM&apos;ini görebilirsin.</strong>
        ) : (
          <strong>Tahmini 1RM: {formatKg(oneRepMax)}</strong>
        )}
      </div>

      {trainingTable && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Antrenman yüzdesi tablosu (Epley formülüne göre)</caption>
            <thead>
              <tr>
                <th scope="col">1RM Yüzdesi</th>
                <th scope="col">Ağırlık</th>
                <th scope="col">Tipik Tekrar Aralığı</th>
              </tr>
            </thead>
            <tbody>
              {trainingTable.map((row) => (
                <tr key={row.percentage}>
                  <td>%{row.percentage}</td>
                  <td>{formatKg(row.weight)}</td>
                  <td>~{estimateRepsForPercentage(row.percentage)} tekrar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
