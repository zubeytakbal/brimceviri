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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

let nextId = 3;

export default function AtomicMassCalculator() {
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
        `İzotop ${index + 1}: ${formatNumber(isotope.mass)} × ${formatNumber(isotope.abundancePercent, 2)} = ${formatNumber(isotope.mass * isotope.abundancePercent)}`
    );

    const weightedSum = isotopes.reduce(
      (sum, isotope) => sum + isotope.mass * isotope.abundancePercent,
      0
    );

    return [
      {
        title: "1. Adım — Her izotobun katkısı",
        lines: isotopeLines,
      },
      {
        title: "2. Adım — Ağırlıklı ortalama",
        lines: [
          "Ortalama = Σ(kütle × bolluk) / Σ(bolluk)",
          `Ortalama = ${formatNumber(weightedSum)} / ${formatNumber(totalAbundance, 2)}`,
          `Ortalama ≈ ${formatNumber(result, 4)} u`,
        ],
      },
    ];
  }, [result, isotopes, totalAbundance]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: elementin bilinen her izotopunun kütlesini (u) ve
          doğal bolluk yüzdesini gir; ağırlıklı ortalama alarak periyodik
          tablodaki atom kütlesini hesaplayalım. Bolluk yüzdeleri toplamı
          100 olmasa da hesap makinesi oranlayarak doğru sonucu verir.
        </p>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="atomic-mass-isotope-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>İzotop {index + 1}: kütle (u)</span>
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
                <span>Bolluk (%)</span>
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
                  aria-label={`İzotop ${index + 1}'i kaldır`}
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
          + İzotop Ekle
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli izotop kütlesi ve bolluk yüzdesi girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Ortalama Atom Kütlesi</span>
              <strong>{formatNumber(result, 4)} u</strong>
            </div>
            <div>
              <span>Toplam Bolluk</span>
              <strong>{formatNumber(totalAbundance, 2)} %</strong>
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
