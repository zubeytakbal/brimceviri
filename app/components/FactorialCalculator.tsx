"use client";

import { useMemo, useState } from "react";
import { calculateFactorial } from "../converter/factorialCalculator";

function parseIntegerValue(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatBigInt(value: bigint) {
  return value.toLocaleString("tr-TR");
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR");
}

export default function FactorialCalculator() {
  const [nInput, setNInput] = useState("5");

  const n = useMemo(() => parseIntegerValue(nInput), [nInput]);

  const result = useMemo(() => calculateFactorial(n), [n]);

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (result.n === 0) {
      return [
        {
          title: "1. Adım — Tanım gereği",
          lines: ["0! = 1 (boş çarpımın değeri tanım gereği 1'dir)"],
        },
      ];
    }

    if (result.n <= 12) {
      const chain = Array.from({ length: result.n }, (_, index) => result.n - index).join(
        " × "
      );
      return [
        {
          title: "1. Adım — Çarpım zinciri",
          lines: [`${result.n}! = ${chain} = ${formatBigInt(result.value)}`],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Tanım",
        lines: [`${result.n}! = ${result.n} × ${result.n - 1} × ${result.n - 2} × ... × 2 × 1`],
      },
      {
        title: "2. Adım — Sonuç",
        lines: [
          `${result.n}! toplamda ${formatNumber(result.digitCount)} basamaklı bir sayıdır ve sonunda ${formatNumber(result.trailingZeroCount)} tane sıfır bulunur.`,
        ],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: negatif olmayan bir tam sayı (n) gir — n! (n
          faktöriyel), o sayıdan 1'e kadar olan tüm tam sayıların çarpımını
          hesaplar. 0! = 1'dir.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>n</span>
            <input
              inputMode="numeric"
              type="text"
              value={nInput}
              onChange={(event) => setNInput(event.target.value)}
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
            0 ile 5000 arasında negatif olmayan bir tam sayı gir.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{result.n}!</span>
              <strong className="factorial-result-value">
                {formatBigInt(result.value)}
              </strong>
            </div>
            <div>
              <span>Basamak sayısı</span>
              <strong>{formatNumber(result.digitCount)}</strong>
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
