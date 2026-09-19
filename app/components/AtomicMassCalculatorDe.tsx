"use client";

import { useMemo, useState } from "react";
import {
  calculateAverageAtomicMass,
  type Isotope,
} from "../converter/atomicMassCalculator";

type IsotopeRow = {
  id: number;
  massInput: string;
  abundanceInput: string;
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("de-DE", { maximumFractionDigits });
}

let nextId = 3;

export default function AtomicMassCalculatorDe() {
  const [rows, setRows] = useState<IsotopeRow[]>([
    { id: 1, massInput: "34.969", abundanceInput: "75.77" },
    { id: 2, massInput: "36.966", abundanceInput: "24.23" },
  ]);

  const isotopes: Isotope[] = useMemo(
    () =>
      rows.map((row) => ({
        mass: parseNumericValue(row.massInput),
        abundancePercent: parseNumericValue(row.abundanceInput),
      })),
    [rows]
  );

  const result = useMemo(
    () => calculateAverageAtomicMass(isotopes),
    [isotopes]
  );

  const totalAbundance = useMemo(
    () =>
      isotopes.reduce(
        (sum, isotope) =>
          Number.isFinite(isotope.abundancePercent)
            ? sum + isotope.abundancePercent
            : sum,
        0
      ),
    [isotopes]
  );

  function updateRow(id: number, field: "massInput" | "abundanceInput", value: string) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextId++, massInput: "", abundanceInput: "" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));
  }

  const steps = useMemo(() => {
    if (result === null) {
      return null;
    }

    const isotopeLines = isotopes.map(
      (isotope, index) =>
        `Isotop ${index + 1}: ${formatNumber(isotope.mass)} × ${formatNumber(isotope.abundancePercent, 2)} = ${formatNumber(isotope.mass * isotope.abundancePercent)}`
    );

    const weightedSum = isotopes.reduce(
      (sum, isotope) => sum + isotope.mass * isotope.abundancePercent,
      0
    );

    return [
      {
        title: "Schritt 1 — Beitrag jedes Isotops",
        lines: isotopeLines,
      },
      {
        title: "Schritt 2 — Gewichteter Durchschnitt",
        lines: [
          "Durchschnitt = Σ(Masse × Häufigkeit) / Σ(Häufigkeit)",
          `Durchschnitt = ${formatNumber(weightedSum)} / ${formatNumber(totalAbundance, 2)}`,
          `Durchschnitt ≈ ${formatNumber(result, 4)} u`,
        ],
      },
    ];
  }, [result, isotopes, totalAbundance]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          So funktioniert es: Gib für jedes bekannte Isotop des Elements
          die Masse (u) und die natürliche Häufigkeit in Prozent ein; wir
          berechnen den gewichteten Durchschnitt, also die Atommasse aus
          dem Periodensystem. Auch wenn die Häufigkeiten nicht genau 100
          ergeben, berechnet der Rechner das korrekte Ergebnis
          anteilig.
        </p>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="atomic-mass-isotope-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>Isotop {index + 1}: Masse (u)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.massInput}
                  onChange={(event) =>
                    updateRow(row.id, "massInput", event.target.value)
                  }
                />
              </label>
              <label className="category-general-converter-field">
                <span>Häufigkeit (%)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.abundanceInput}
                  onChange={(event) =>
                    updateRow(row.id, "abundanceInput", event.target.value)
                  }
                />
              </label>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="atomic-mass-remove-button"
                  onClick={() => removeRow(row.id)}
                  aria-label={`Isotop ${index + 1} entfernen`}
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
          + Isotop hinzufügen
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Gib gültige Isotopmassen und Häufigkeiten ein, um das Ergebnis zu sehen.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Durchschnittliche Atommasse</span>
              <strong>{formatNumber(result, 4)} u</strong>
            </div>
            <div>
              <span>Gesamthäufigkeit</span>
              <strong>{formatNumber(totalAbundance, 2)} %</strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Schritt-für-Schritt-Lösung</h3>
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
