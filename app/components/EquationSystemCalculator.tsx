"use client";

import { useState } from "react";
import { solveEquationSystem, type SystemSolveOutcome } from "../converter/logEquationSolver";

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

interface EquationSystemExample {
  label: string;
  equations: string[];
}

interface EquationSystemCalculatorProps {
  variableCount: 2 | 3;
  defaultEquations: string[];
  examples: EquationSystemExample[];
}

const ORDINAL_LABELS = ["1.", "2.", "3."];

export default function EquationSystemCalculator({
  variableCount,
  defaultEquations,
  examples,
}: EquationSystemCalculatorProps) {
  const [equationInputs, setEquationInputs] = useState<string[]>(defaultEquations);
  const [outcome, setOutcome] = useState<SystemSolveOutcome | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  function updateEquationAt(index: number, value: string) {
    setEquationInputs((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  }

  function applyExample(example: EquationSystemExample) {
    setEquationInputs(example.equations);
    setOutcome(null);
  }

  function handleSolve() {
    if (equationInputs.some((equation) => !equation.trim())) {
      return;
    }
    setIsSolving(true);
    // Bir sonraki render'da spinner görünsün diye çözümü kısa bir gecikmeyle
    // çalıştırıyoruz — sayısal arama ana thread'i kısa süreliğine bloklayabilir.
    window.setTimeout(() => {
      setOutcome(solveEquationSystem(equationInputs));
      setIsSolving(false);
    }, 30);
  }

  return (
    <div className="log-equation-panel">
      <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: {variableCount} bilinmeyenli (örn.{" "}
          {["x", "y", "z"].slice(0, variableCount).join(", ")}) {variableCount}{" "}
          denklem gir — doğrusal, karesel, logaritmik, karışık; fark etmez.
          Sistemin bir veya daha fazla ortak çözümü sayısal olarak taranarak
          bulunur (örneğin bir doğru bir çemberi iki noktada kesebilir,
          ikisi de gösterilir).
        </p>

        <div className="paint-calculator-grid">
          {equationInputs.map((value, index) => (
            <label className="category-general-converter-field log-equation-input" key={index}>
              <span>{ORDINAL_LABELS[index] ?? `${index + 1}.`} Denklem</span>
              <input
                type="text"
                value={value}
                onChange={(event) => updateEquationAt(index, event.target.value)}
                placeholder={defaultEquations[index]}
              />
            </label>
          ))}
        </div>

        <button
          type="button"
          className="log-equation-example-button"
          onClick={handleSolve}
          disabled={isSolving}
        >
          {isSolving ? "Çözülüyor…" : "Sistemi Çöz"}
        </button>

        <div className="log-equation-examples">
          <span>Örnekler:</span>
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="log-equation-example-button"
              onClick={() => applyExample(example)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!outcome ? (
          <strong>
            {variableCount} denklemi gir ve &quot;Sistemi Çöz&quot;e bas.
          </strong>
        ) : !outcome.success ? (
          <strong>{outcome.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            {outcome.result.solutions.map((solution, index) => (
              <div key={index}>
                <span>
                  {outcome.result.solutions.length > 1
                    ? `${index + 1}. çözüm`
                    : "Çözüm"}
                </span>
                <strong>
                  {outcome.result.varNames
                    .map((name) => `${name} = ${formatNumber(solution[name])}`)
                    .join(", ")}
                </strong>
              </div>
            ))}
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
      </div>
    </div>
  );
}
