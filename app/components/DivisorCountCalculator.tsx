"use client";

import { useMemo, useState } from "react";
import { calculateDivisorCount } from "../converter/divisorCountCalculator";
import { formatFactorization } from "../converter/ebobEkokCalculator";

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

export default function DivisorCountCalculator() {
  const [nInput, setNInput] = useState("36");

  const n = useMemo(() => parseIntegerValue(nInput), [nInput]);

  const result = useMemo(() => calculateDivisorCount(n), [n]);

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (result.factors.length === 0) {
      return [
        {
          title: "1. Adım — Özel durum",
          lines: [`${result.n}'in tek pozitif böleni kendisidir (1 dahil).`],
        },
      ];
    }

    const exponentFormula = result.factors
      .map((factor) => `(${factor.exponent}+1)`)
      .join(" × ");

    return [
      {
        title: "1. Adım — Asal çarpanlara ayırma",
        lines: [`${result.n} = ${formatFactorization(result.factors)}`],
      },
      {
        title: "2. Adım — Bölen sayısı formülü",
        lines: [
          "Her üsse 1 ekleyip çarp: (a₁+1)(a₂+1)...(aₖ+1)",
          `${exponentFormula} = ${formatNumber(result.divisorCount)}`,
        ],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: pozitif bir tam sayı gir — asal çarpanlarına
          ayırıp kaç pozitif böleni olduğunu, bölenlerinin toplamını ve
          (uygunsa) tüm bölenlerin listesini hesaplayalım.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Sayı (n)</span>
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
          <strong>1 veya daha büyük bir tam sayı gir.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Bölen sayısı</span>
              <strong>{formatNumber(result.divisorCount)}</strong>
            </div>
            <div>
              <span>Bölenler toplamı</span>
              <strong>{formatNumber(result.sumOfDivisors)}</strong>
            </div>
          </div>
        )}
      </div>

      {result?.divisors && (
        <p className="divisor-list-note">
          Bölenler: {result.divisors.join(", ")}
        </p>
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
