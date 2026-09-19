"use client";

import { useMemo, useState } from "react";

function parseNumber(value: string) {
  const parsed = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(value);
}

function signedTerm(value: number) {
  return value < 0 ? ` - ${formatNumber(Math.abs(value))}` : ` + ${formatNumber(value)}`;
}

function equation(a: number, b: number, c: number) {
  const variable = a === 1 ? "x" : a === -1 ? "-x" : `${formatNumber(a)}x`;
  return `${variable}${signedTerm(b)} = ${formatNumber(c)}`;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

export default function EnglishLinearEquationCalculator() {
  const [coefficient, setCoefficient] = useState("2");
  const [constant, setConstant] = useState("3");
  const [rightSide, setRightSide] = useState("11");

  const result = useMemo(() => {
    const a = parseNumber(coefficient);
    const b = parseNumber(constant);
    const c = parseNumber(rightSide);
    if (![a, b, c].every(Number.isFinite)) return null;
    if (a === 0) return b === c ? { kind: "infinite" as const, a, b, c } : { kind: "none" as const, a, b, c };
    const afterSubtracting = c - b;
    return { kind: "unique" as const, a, b, c, afterSubtracting, solution: afterSubtracting / a };
  }, [coefficient, constant, rightSide]);

  const steps = result?.kind === "unique" ? [
    { title: "1. Start with the equation", line: equation(result.a, result.b, result.c) },
    { title: "2. Move the constant term", line: `Subtract ${formatNumber(result.b)} from both sides: ${formatNumber(result.a)}x = ${formatNumber(result.c)} - ${formatNumber(result.b)} = ${formatNumber(result.afterSubtracting)}.` },
    { title: "3. Divide by the coefficient of x", line: `x = ${formatNumber(result.afterSubtracting)} / ${formatNumber(result.a)} = ${formatNumber(result.solution)}.` },
  ] : [];

  const resultContent = !result ? <strong>Enter valid numbers for all three terms.</strong>
    : result.kind === "unique" ? <div className="paint-calculator-result-grid"><div><span>Solution</span><strong>x = {formatNumber(result.solution)}</strong></div><div><span>Standard form</span><strong>{equation(result.a, result.b, result.c)}</strong></div></div>
      : result.kind === "infinite" ? <strong>Every value of x is a solution: both sides reduce to {formatNumber(result.b)}.</strong>
        : <strong>No solution: the equation reduces to {formatNumber(result.b)} = {formatNumber(result.c)}.</strong>;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">Solve a linear equation in the form a x + b = c. Use a negative value for b when the equation contains subtraction.</p>
        <div className="paint-calculator-grid">
          <Field label="a (coefficient of x)" value={coefficient} onChange={setCoefficient} />
          <Field label="b (constant on the left)" value={constant} onChange={setConstant} />
          <Field label="c (right-hand value)" value={rightSide} onChange={setRightSide} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{resultContent}</div>
      {steps.length > 0 && <div className="calculator-steps"><h3>Show the steps</h3>{steps.map((step) => <div className="calculator-step" key={step.title}><p className="calculator-step-title">{step.title}</p><p className="calculator-step-line">{step.line}</p></div>)}</div>}
    </div>
  );
}
