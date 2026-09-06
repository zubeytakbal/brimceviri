"use client";

import { useMemo, useState } from "react";
import { solveQuadraticEquation } from "../converter/equationTemplates";
import { formatNumber } from "../converter/mathDisplay";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function QuadraticEquationCalculator() {
  const [aInput, setAInput] = useState("1");
  const [bInput, setBInput] = useState("-5");
  const [cInput, setCInput] = useState("6");

  const a = useMemo(() => parseNumericValue(aInput), [aInput]);
  const b = useMemo(() => parseNumericValue(bInput), [bInput]);
  const c = useMemo(() => parseNumericValue(cInput), [cInput]);

  const outcome = useMemo(() => solveQuadraticEquation(a, b, c), [a, b, c]);

  return (
    <>
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: ax² + bx + c = 0 denklemindeki a, b, c
          katsayılarını sayı olarak gir — deltayı (diskriminantı) ve
          kökleri adım adım hesaplayalım.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>a</span>
            <input
              inputMode="decimal"
              type="text"
              value={aInput}
              onChange={(event) => setAInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>b</span>
            <input
              inputMode="decimal"
              type="text"
              value={bInput}
              onChange={(event) => setBInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>c</span>
            <input
              inputMode="decimal"
              type="text"
              value={cInput}
              onChange={(event) => setCInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!outcome.success ? (
          <strong>{outcome.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Δ (delta)</span>
              <strong>{formatNumber(outcome.result.delta)}</strong>
            </div>
            <div>
              <span>
                {outcome.result.rootKind === "iki-farkli"
                  ? "Kökler (2 farklı gerçek kök)"
                  : outcome.result.rootKind === "cift-kok"
                    ? "Kök (çift/tek gerçek kök)"
                    : "Gerçek kök"}
              </span>
              <strong>
                {outcome.result.rootKind === "reel-yok"
                  ? "Yok"
                  : outcome.result.roots.map((root) => formatNumber(root)).join(", ")}
              </strong>
            </div>
          </div>
        )}
      </div>

      {outcome.success && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
          {outcome.result.steps.map((step) => (
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
    </>
  );
}
