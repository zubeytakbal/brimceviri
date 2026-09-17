"use client";

import { useMemo, useState } from "react";
import { calculateArithmeticSequence } from "../converter/arithmeticSequenceCalculator";

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

export default function ArithmeticSequenceCalculator() {
  const [firstTermInput, setFirstTermInput] = useState("3");
  const [differenceInput, setDifferenceInput] = useState("5");
  const [termNumberInput, setTermNumberInput] = useState("10");

  const firstTerm = useMemo(() => parseNumericValue(firstTermInput), [firstTermInput]);
  const commonDifference = useMemo(() => parseNumericValue(differenceInput), [differenceInput]);
  const termNumber = useMemo(() => parseNumericValue(termNumberInput), [termNumberInput]);

  const result = useMemo(
    () => calculateArithmeticSequence(firstTerm, commonDifference, termNumber),
    [firstTerm, commonDifference, termNumber],
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    return [
      {
        title: "1. Adım — n. terim formülü",
        lines: [
          `aₙ = a₁ + (n − 1) × d`,
          `a${result.termNumber} = ${formatNumber(result.firstTerm)} + (${result.termNumber} − 1) × ${formatNumber(result.commonDifference)} = ${formatNumber(result.nthTerm)}`,
        ],
      },
      {
        title: "2. Adım — İlk n terimin toplamı",
        lines: [
          `Sₙ = n/2 × (a₁ + aₙ)`,
          `S${result.termNumber} = ${result.termNumber}/2 × (${formatNumber(result.firstTerm)} + ${formatNumber(result.nthTerm)}) = ${formatNumber(result.sumOfTerms)}`,
        ],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: ilk terimi (a₁), ortak farkı (d) ve bulmak
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
            <span>Ortak Fark (d)</span>
            <input
              inputMode="decimal"
              type="text"
              value={differenceInput}
              onChange={(event) => setDifferenceInput(event.target.value)}
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
          <strong>Geçerli bir ilk terim, ortak fark ve terim numarası gir.</strong>
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
