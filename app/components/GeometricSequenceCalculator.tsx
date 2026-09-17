"use client";

import { useMemo, useState } from "react";
import { calculateGeometricSequence } from "../converter/geometricSequenceCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(",", ".");

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
}

export default function GeometricSequenceCalculator() {
  const [firstTermInput, setFirstTermInput] = useState("2");
  const [ratioInput, setRatioInput] = useState("3");
  const [termNumberInput, setTermNumberInput] = useState("6");

  const firstTerm = useMemo(() => parseNumericValue(firstTermInput), [firstTermInput]);
  const commonRatio = useMemo(() => parseNumericValue(ratioInput), [ratioInput]);
  const termNumber = useMemo(() => parseNumericValue(termNumberInput), [termNumberInput]);

  const result = useMemo(
    () => calculateGeometricSequence(firstTerm, commonRatio, termNumber),
    [firstTerm, commonRatio, termNumber],
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const sumFormulaLine =
      result.commonRatio === 1
        ? `S${result.termNumber} = a₁ × n = ${formatNumber(result.firstTerm)} × ${result.termNumber} = ${formatNumber(result.sumOfTerms)}`
        : `S${result.termNumber} = a₁ × (rⁿ − 1)/(r − 1) = ${formatNumber(result.sumOfTerms)}`;

    return [
      {
        title: "1. Adım — n. terim formülü",
        lines: [
          `aₙ = a₁ × r⁽ⁿ⁻¹⁾`,
          `a${result.termNumber} = ${formatNumber(result.firstTerm)} × ${formatNumber(result.commonRatio)}^${result.termNumber - 1} = ${formatNumber(result.nthTerm)}`,
        ],
      },
      {
        title: "2. Adım — İlk n terimin toplamı",
        lines: [sumFormulaLine],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: ilk terimi (a₁), ortak oranı (r) ve bulmak
          istediğin terim numarasını (n) gir — o terimin değerini ve
          ilk n terimin toplamını hesapla.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>İlk Terim (a₁)</span>
            <input
              inputMode="decimal"
              type="text"
              value={firstTermInput}
              onChange={(event) => setFirstTermInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Ortak Oran (r)</span>
            <input
              inputMode="decimal"
              type="text"
              value={ratioInput}
              onChange={(event) => setRatioInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Terim Numarası (n)</span>
            <input
              inputMode="numeric"
              type="text"
              value={termNumberInput}
              onChange={(event) => setTermNumberInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli bir ilk terim, sıfırdan farklı bir ortak oran ve
            terim numarası gir.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>a{result.termNumber} (n. terim)</span>
              <strong>{formatNumber(result.nthTerm)}</strong>
            </div>
            <div>
              <span>S{result.termNumber} (İlk n terim toplamı)</span>
              <strong>{formatNumber(result.sumOfTerms)}</strong>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="calculator-steps">
          <h3>İlk {result.terms.length} Terim</h3>
          <p className="calculator-step-line">{result.terms.map((term) => formatNumber(term)).join(", ")}
            {result.termNumber > result.terms.length && ", ..."}
          </p>
        </div>
      )}

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
