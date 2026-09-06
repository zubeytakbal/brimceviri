"use client";

import { useMemo, useState } from "react";
import {
  calculateEbobEkok,
  formatFactorization,
} from "../converter/ebobEkokCalculator";

type NumberRow = {
  id: number;
  input: string;
};

function parseIntegerValue(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR");
}

let nextId = 3;

export default function EbobEkokCalculator() {
  const [rows, setRows] = useState<NumberRow[]>([
    { id: 1, input: "12" },
    { id: 2, input: "18" },
  ]);

  const numbers = useMemo(
    () => rows.map((row) => parseIntegerValue(row.input)),
    [rows]
  );

  const result = useMemo(() => calculateEbobEkok(numbers), [numbers]);

  function updateRow(id: number, value: string) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, input: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [...prev, { id: nextId++, input: "" }]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length > 2 ? prev.filter((row) => row.id !== id) : prev));
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const factorizationLines = result.numbers.map(
      (value, index) =>
        `${value} = ${formatFactorization(result.factorizations[index])}`
    );

    return [
      {
        title: "1. Adım — Asal çarpanlara ayırma",
        lines: factorizationLines,
      },
      {
        title: "2. Adım — EBOB (ortak asal çarpanların en küçük üssü)",
        lines: [`EBOB = ${formatNumber(result.ebob)}`],
      },
      {
        title: "3. Adım — EKOK (tüm asal çarpanların en büyük üssü)",
        lines: [`EKOK = ${formatNumber(result.ekok)}`],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: iki veya daha fazla pozitif tam sayı gir — asal
          çarpanlara ayırarak Ebob (Ekob) ve Ekok'u (Okek) adım adım
          hesaplayalım.
        </p>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="ebob-ekok-number-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>Sayı {index + 1}</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={row.input}
                  onChange={(event) => updateRow(row.id, event.target.value)}
                />
              </label>
              {rows.length > 2 && (
                <button
                  type="button"
                  className="atomic-mass-remove-button"
                  onClick={() => removeRow(row.id)}
                  aria-label={`Sayı ${index + 1}'i kaldır`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="engineering-target-button atomic-mass-add-button"
          onClick={addRow}
        >
          + Sayı Ekle
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            En az iki pozitif tam sayı girerek sonucu görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>EBOB</span>
              <strong>{formatNumber(result.ebob)}</strong>
            </div>
            <div>
              <span>EKOK</span>
              <strong>{formatNumber(result.ekok)}</strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
          {steps.map((step) => (
            <div className="calculator-step" key={step.title}>
              <p className="calculator-step-title">{step.title}</p>
              {step.lines.map((line) => (
                <p className="calculator-step-line" key={line}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
