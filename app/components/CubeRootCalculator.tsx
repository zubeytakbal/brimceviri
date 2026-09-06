"use client";

import { useMemo, useState } from "react";
import {
  calculateCubeRoot,
  type CubeRootResult,
} from "../converter/cubeRootCalculator";
import { formatFactorization } from "../converter/ebobEkokCalculator";

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

function formatSimplifiedRadical(result: CubeRootResult) {
  if (!result.simplified) {
    return null;
  }

  const { outsideCoefficient, insideRadicand } = result.simplified;

  if (insideRadicand === 1) {
    return `${outsideCoefficient}`;
  }

  if (Math.abs(outsideCoefficient) === 1) {
    return `${outsideCoefficient < 0 ? "-" : ""}∛${insideRadicand}`;
  }

  return `${outsideCoefficient}∛${insideRadicand}`;
}

export default function CubeRootCalculator() {
  const [valueInput, setValueInput] = useState("24");

  const value = useMemo(() => parseNumericValue(valueInput), [valueInput]);

  const result = useMemo(() => calculateCubeRoot(value), [value]);

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (!result.simplified) {
      return [
        {
          title: "1. Adım — Küpkök",
          lines: [`∛${formatNumber(result.input)} ≈ ${formatNumber(result.decimalValue)}`],
        },
      ];
    }

    if (result.isPerfectCube) {
      return [
        {
          title: "1. Adım — Asal çarpanlara ayırma",
          lines: [
            `${Math.abs(result.input)} = ${formatFactorization(result.simplified.factors)}`,
          ],
        },
        {
          title: "2. Adım — Tam küp sonucu",
          lines: [`∛${result.input} = ${result.simplified.outsideCoefficient} (tam küp)`],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Asal çarpanlara ayırma",
        lines: [
          `${Math.abs(result.input)} = ${formatFactorization(result.simplified.factors)}`,
        ],
      },
      {
        title: "2. Adım — Üçlü gruplar dışarı çıkar",
        lines: [
          "Her asal çarpanın üssünü 3'e böl: 3'e tam bölünen kısım küpkökten dışarı çıkar, kalan içeride kalır.",
          `∛${result.input} = ${formatSimplifiedRadical(result)}`,
        ],
      },
      {
        title: "3. Adım — Ondalık değer",
        lines: [`${formatSimplifiedRadical(result)} ≈ ${formatNumber(result.decimalValue)}`],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bir sayı gir (negatif sayılar da geçerlidir) —
          tam sayılarda asal çarpanlara ayırarak en sade küpkök formunu,
          ondalıklarda doğrudan küpkök değerini hesaplayalım.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Sayı</span>
            <input
              inputMode="decimal"
              type="text"
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli bir gerçek sayı girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Küpkök</span>
              <strong>
                {result.simplified
                  ? formatSimplifiedRadical(result)
                  : formatNumber(result.decimalValue)}
              </strong>
            </div>
            <div>
              <span>Ondalık değer</span>
              <strong>{formatNumber(result.decimalValue)}</strong>
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
