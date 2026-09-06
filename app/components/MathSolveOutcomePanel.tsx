"use client";

import type { MathSolveOutcome } from "../converter/logEquationSolver";
import { formatIntervalDisplay, formatNumber } from "../converter/mathDisplay";

interface MathSolveOutcomePanelProps {
  outcome: MathSolveOutcome | null;
  emptyMessage: string;
}

export default function MathSolveOutcomePanel({
  outcome,
  emptyMessage,
}: MathSolveOutcomePanelProps) {
  return (
    <>
      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!outcome ? (
          <strong>{emptyMessage}</strong>
        ) : !outcome.success ? (
          <strong>{outcome.message}</strong>
        ) : outcome.kind === "inequality" ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Çözüm kümesi</span>
              <strong>
                {outcome.result.intervals
                  .map((interval) => formatIntervalDisplay(interval, outcome.result.varName))
                  .join(" veya ")}
              </strong>
            </div>
          </div>
        ) : outcome.kind === "derivative" ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Türev</span>
              <strong>{outcome.result.expression}</strong>
            </div>
            {outcome.result.atPoint !== null && outcome.result.value !== null && (
              <div>
                <span>{outcome.result.varName} = {formatNumber(outcome.result.atPoint)} noktasında</span>
                <strong>{formatNumber(outcome.result.value)}</strong>
              </div>
            )}
          </div>
        ) : outcome.kind === "integral" ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>
                ∫[{formatNumber(outcome.result.lower)}, {formatNumber(outcome.result.upper)}]
              </span>
              <strong>{formatNumber(outcome.result.value)}</strong>
            </div>
          </div>
        ) : outcome.kind === "limit" ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{outcome.result.varName} → {outcome.result.targetDisplay}</span>
              <strong>
                {outcome.result.exists && outcome.result.value !== null
                  ? formatNumber(outcome.result.value)
                  : outcome.result.diverges === "positive"
                    ? "+∞"
                    : outcome.result.diverges === "negative"
                      ? "-∞"
                      : "Limit yok"}
              </strong>
            </div>
          </div>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>
                {outcome.result.isEvaluation
                  ? "Sonuç"
                  : outcome.result.roots.length > 1
                    ? `${outcome.result.varName} değerleri`
                    : outcome.result.varName}
              </span>
              <strong>
                {outcome.result.roots.map((root) => formatNumber(root)).join(", ")}
              </strong>
            </div>
          </div>
        )}
      </div>

      {outcome?.success && (
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
