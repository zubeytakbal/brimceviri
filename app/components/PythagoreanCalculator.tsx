"use client";

import { useMemo, useState } from "react";
import {
  calculatePythagorean,
  type PythagoreanTarget,
} from "../converter/pythagoreanCalculator";
import PythagoreanTriangleDiagram from "./PythagoreanTriangleDiagram";

const targetLabels: Record<PythagoreanTarget, string> = {
  "kenar-a": "Kenar a (dik kenar)",
  "kenar-b": "Kenar b (dik kenar)",
  hipotenus: "Hipotenüs c",
};

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

export default function PythagoreanCalculator() {
  const [target, setTarget] = useState<PythagoreanTarget>("hipotenus");
  const [aInput, setAInput] = useState("3");
  const [bInput, setBInput] = useState("4");
  const [cInput, setCInput] = useState("5");

  const a = useMemo(() => parseNumericValue(aInput), [aInput]);
  const b = useMemo(() => parseNumericValue(bInput), [bInput]);
  const c = useMemo(() => parseNumericValue(cInput), [cInput]);

  const result = useMemo(
    () => calculatePythagorean({ target, a, b, c }),
    [target, a, b, c]
  );

  const resultValue = useMemo(() => {
    if (!result) {
      return null;
    }
    if (result.target === "kenar-a") {
      return result.a;
    }
    if (result.target === "kenar-b") {
      return result.b;
    }
    return result.c;
  }, [result]);

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (result.target === "hipotenus") {
      return [
        {
          title: "1. Adım — c² = a² + b²",
          lines: [
            `c² = ${formatNumber(result.a, 4)}² + ${formatNumber(result.b, 4)}² = ${formatNumber(result.a * result.a, 4)} + ${formatNumber(result.b * result.b, 4)} = ${formatNumber(result.a * result.a + result.b * result.b, 4)}`,
            `c = √${formatNumber(result.a * result.a + result.b * result.b, 4)} = ${formatNumber(result.c)}`,
          ],
        },
      ];
    }

    if (result.target === "kenar-a") {
      return [
        {
          title: "1. Adım — a² = c² − b²",
          lines: [
            `a² = ${formatNumber(result.c, 4)}² − ${formatNumber(result.b, 4)}² = ${formatNumber(result.c * result.c, 4)} − ${formatNumber(result.b * result.b, 4)} = ${formatNumber(result.c * result.c - result.b * result.b, 4)}`,
            `a = √${formatNumber(result.c * result.c - result.b * result.b, 4)} = ${formatNumber(result.a)}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — b² = c² − a²",
        lines: [
          `b² = ${formatNumber(result.c, 4)}² − ${formatNumber(result.a, 4)}² = ${formatNumber(result.c * result.c, 4)} − ${formatNumber(result.a * result.a, 4)} = ${formatNumber(result.c * result.c - result.a * result.a, 4)}`,
          `b = √${formatNumber(result.c * result.c - result.a * result.a, 4)} = ${formatNumber(result.b)}`,
        ],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bir dik üçgende c² = a² + b² bağıntısı (a ve b dik
          kenarlar, c hipotenüs) geçerlidir. Hangi kenarı bilmediğini seç,
          diğer ikisini gir — eksik kenar hesaplansın.
        </p>

        <div className="engineering-targets">
          <span>Hangi kenarı bulmak istiyorsun?</span>
          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as PythagoreanTarget[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "kenar-a" && (
            <label className="category-general-converter-field">
              <span>Kenar a</span>
              <input
                inputMode="decimal"
                type="text"
                value={aInput}
                onChange={(event) => setAInput(event.target.value)}
              />
            </label>
          )}

          {target !== "kenar-b" && (
            <label className="category-general-converter-field">
              <span>Kenar b</span>
              <input
                inputMode="decimal"
                type="text"
                value={bInput}
                onChange={(event) => setBInput(event.target.value)}
              />
            </label>
          )}

          {target !== "hipotenus" && (
            <label className="category-general-converter-field">
              <span>Hipotenüs c</span>
              <input
                inputMode="decimal"
                type="text"
                value={cInput}
                onChange={(event) => setCInput(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli değerler gir (hipotenüs, ilgili dik kenardan büyük
            olmalı; tüm değerler 0&apos;dan büyük olmalı).
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{targetLabels[result.target]}</span>
              <strong>{formatNumber(resultValue!)}</strong>
            </div>
          </div>
        )}
      </div>

      {result && (
        <PythagoreanTriangleDiagram
          a={result.a}
          b={result.b}
          c={result.c}
          highlight={result.target}
        />
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
