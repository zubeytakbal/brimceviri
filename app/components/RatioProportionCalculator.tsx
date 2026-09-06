"use client";

import { useMemo, useState } from "react";
import {
  calculateProportion,
  type ProportionTarget,
} from "../converter/ratioProportionCalculator";

const targetLabels: Record<ProportionTarget, string> = {
  a: "a",
  b: "b",
  c: "c",
  d: "d",
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

export default function RatioProportionCalculator() {
  const [target, setTarget] = useState<ProportionTarget>("d");
  const [aInput, setAInput] = useState("2");
  const [bInput, setBInput] = useState("4");
  const [cInput, setCInput] = useState("3");
  const [dInput, setDInput] = useState("6");

  const values = useMemo(
    () => ({
      a: parseNumericValue(aInput),
      b: parseNumericValue(bInput),
      c: parseNumericValue(cInput),
      d: parseNumericValue(dInput),
    }),
    [aInput, bInput, cInput, dInput]
  );

  const result = useMemo(
    () => calculateProportion({ target, ...values }),
    [target, values]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const lines: Record<ProportionTarget, string> = {
      a: `a = (b × c) / d = (${formatNumber(result.b)} × ${formatNumber(result.c)}) / ${formatNumber(result.d)} = ${formatNumber(result.a)}`,
      b: `b = (a × d) / c = (${formatNumber(result.a)} × ${formatNumber(result.d)}) / ${formatNumber(result.c)} = ${formatNumber(result.b)}`,
      c: `c = (a × d) / b = (${formatNumber(result.a)} × ${formatNumber(result.d)}) / ${formatNumber(result.b)} = ${formatNumber(result.c)}`,
      d: `d = (b × c) / a = (${formatNumber(result.b)} × ${formatNumber(result.c)}) / ${formatNumber(result.a)} = ${formatNumber(result.d)}`,
    };

    return [
      {
        title: "1. Adım — İç çarpım = Dış çarpım",
        lines: [
          `a/b = c/d ⟹ a × d = b × c`,
          `${formatNumber(result.a)} × ${formatNumber(result.d)} = ${formatNumber(result.b)} × ${formatNumber(result.c)}`,
        ],
      },
      {
        title: "2. Adım — Bilinmeyeni yalnız bırak",
        lines: [lines[target]],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: a/b = c/d orantısındaki dört değerden üçünü gir,
          hangisini bilmediğini seç — çapraz çarpma yöntemiyle
          hesaplayalım.
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as ProportionTarget[]).map((key) => (
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

        <div className="fraction-pair">
          <div className="fraction-input-block">
            {target !== "a" ? (
              <input
                inputMode="decimal"
                type="text"
                aria-label="a değeri"
                value={aInput}
                onChange={(event) => setAInput(event.target.value)}
              />
            ) : (
              <span className="fraction-unknown-slot">?</span>
            )}
            <div className="fraction-divider-line" aria-hidden="true" />
            {target !== "b" ? (
              <input
                inputMode="decimal"
                type="text"
                aria-label="b değeri"
                value={bInput}
                onChange={(event) => setBInput(event.target.value)}
              />
            ) : (
              <span className="fraction-unknown-slot">?</span>
            )}
          </div>

          <span className="fraction-operation-symbol" aria-hidden="true">
            =
          </span>

          <div className="fraction-input-block">
            {target !== "c" ? (
              <input
                inputMode="decimal"
                type="text"
                aria-label="c değeri"
                value={cInput}
                onChange={(event) => setCInput(event.target.value)}
              />
            ) : (
              <span className="fraction-unknown-slot">?</span>
            )}
            <div className="fraction-divider-line" aria-hidden="true" />
            {target !== "d" ? (
              <input
                inputMode="decimal"
                type="text"
                aria-label="d değeri"
                value={dInput}
                onChange={(event) => setDInput(event.target.value)}
              />
            ) : (
              <span className="fraction-unknown-slot">?</span>
            )}
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{targetLabels[target]}</span>
              <strong>{formatNumber(result[target])}</strong>
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
