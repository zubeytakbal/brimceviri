"use client";

import { useMemo, useState } from "react";
import { calculateExponent } from "../converter/exponentCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ExponentCalculator() {
  const [baseInput, setBaseInput] = useState("2");
  const [exponentInput, setExponentInput] = useState("10");

  const base = useMemo(() => parseNumericValue(baseInput), [baseInput]);
  const exponent = useMemo(
    () => parseNumericValue(exponentInput),
    [exponentInput]
  );

  const result = useMemo(
    () => calculateExponent(base, exponent),
    [base, exponent]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const { base: b, exponent: n, value } = result;

    if (n === 0) {
      return [
        {
          title: "1. Adım — Sıfırıncı kuvvet kuralı",
          lines: [`${b}⁰ = 1 (a ≠ 0 için, tanım gereği)`],
        },
      ];
    }

    if (Number.isInteger(n) && n > 0 && n <= 12) {
      const chain = Array.from({ length: n }, () => formatNumber(b)).join(" × ");
      return [
        {
          title: "1. Adım — Çarpım zinciri",
          lines: [`${formatNumber(b)}^${n} = ${chain} = ${formatNumber(value)}`],
        },
      ];
    }

    if (Number.isInteger(n) && n < 0) {
      const positivePower = Math.pow(b, -n);
      return [
        {
          title: "1. Adım — Negatif üs kuralı",
          lines: [`${formatNumber(b)}^${n} = 1 / ${formatNumber(b)}^${-n}`],
        },
        {
          title: "2. Adım — Sonuç",
          lines: [
            `${formatNumber(b)}^${-n} = ${formatNumber(positivePower)}`,
            `1 / ${formatNumber(positivePower)} = ${formatNumber(value)}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Sonuç",
        lines: [`${formatNumber(b)}^${formatNumber(n)} = ${formatNumber(value)}`],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: taban (a) ve üs (n) değerlerini gir — aⁿ değerini
          hesaplayalım. Negatif ve sıfır üsler de desteklenir; ondalık üs
          girersen kök alma işlemine karşılık gelir.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Taban (a)</span>
            <input
              inputMode="decimal"
              type="text"
              value={baseInput}
              onChange={(event) => setBaseInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Üs (n)</span>
            <input
              inputMode="decimal"
              type="text"
              value={exponentInput}
              onChange={(event) => setExponentInput(event.target.value)}
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
            Geçerli bir taban ve üs gir (negatif tabanla ondalık üs
            genellikle tanımsızdır).
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>
                {formatNumber(result.base)}^{formatNumber(result.exponent)}
              </span>
              <strong>{formatNumber(result.value)}</strong>
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
