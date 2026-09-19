"use client";

import { useMemo, useState } from "react";
import {
  calculateFraction,
  type FractionOperation,
} from "../converter/fractionCalculator";

const operations: Array<{ id: FractionOperation; label: string; symbol: string }> = [
  { id: "toplama", label: "Add", symbol: "+" },
  { id: "cikarma", label: "Subtract", symbol: "−" },
  { id: "carpma", label: "Multiply", symbol: "×" },
  { id: "bolme", label: "Divide", symbol: "÷" },
];

function parseInteger(rawValue: string) {
  const value = Number(rawValue.trim());
  return Number.isInteger(value) ? value : Number.NaN;
}

function FractionInput({ label, whole, numerator, denominator, onWholeChange, onNumeratorChange, onDenominatorChange }: {
  label: string;
  whole: string;
  numerator: string;
  denominator: string;
  onWholeChange: (value: string) => void;
  onNumeratorChange: (value: string) => void;
  onDenominatorChange: (value: string) => void;
}) {
  return (
    <div className="fraction-mixed-group">
      <label className="category-general-converter-field fraction-whole-field">
        <span>{label} whole</span>
        <input inputMode="numeric" type="text" value={whole} onChange={(event) => onWholeChange(event.target.value)} />
      </label>
      <div className="fraction-input-block">
        <input aria-label={`${label} numerator`} inputMode="numeric" type="text" value={numerator} onChange={(event) => onNumeratorChange(event.target.value)} />
        <div className="fraction-divider-line" aria-hidden="true" />
        <input aria-label={`${label} denominator`} inputMode="numeric" type="text" value={denominator} onChange={(event) => onDenominatorChange(event.target.value)} />
      </div>
    </div>
  );
}

export default function EnglishFractionCalculator() {
  const [operation, setOperation] = useState<FractionOperation>("toplama");
  const [aWhole, setAWhole] = useState("0");
  const [aNumerator, setANumerator] = useState("1");
  const [aDenominator, setADenominator] = useState("2");
  const [bWhole, setBWhole] = useState("0");
  const [bNumerator, setBNumerator] = useState("1");
  const [bDenominator, setBDenominator] = useState("3");

  const result = useMemo(() => {
    const values = [aWhole, aNumerator, aDenominator, bWhole, bNumerator, bDenominator].map(parseInteger);
    const [firstWhole, firstNumerator, firstDenominator, secondWhole, secondNumerator, secondDenominator] = values;
    if (!values.every(Number.isFinite) || firstDenominator === 0 || secondDenominator === 0) return null;
    const mixedNumerator = (whole: number, numerator: number, denominator: number) => {
      const magnitude = Math.abs(whole) * denominator + Math.abs(numerator);
      return whole < 0 || numerator < 0 ? -magnitude : magnitude;
    };
    return calculateFraction(
      { numerator: mixedNumerator(firstWhole, firstNumerator, firstDenominator), denominator: firstDenominator },
      { numerator: mixedNumerator(secondWhole, secondNumerator, secondDenominator), denominator: secondDenominator },
      operation
    );
  }, [operation, aWhole, aNumerator, aDenominator, bWhole, bNumerator, bDenominator]);

  const operationInfo = operations.find((item) => item.id === operation)!;
  const steps = useMemo(() => {
    if (!result) return [];
    const a = `${result.a.numerator}/${result.a.denominator}`;
    const b = `${result.b.numerator}/${result.b.denominator}`;
    const calculation = operation === "carpma"
      ? `${a} × ${b} = (${result.a.numerator} × ${result.b.numerator}) / (${result.a.denominator} × ${result.b.denominator}) = ${result.rawNumerator}/${result.rawDenominator}`
      : operation === "bolme"
        ? `${a} ÷ ${b} = ${a} × ${result.b.denominator}/${result.b.numerator} = ${result.rawNumerator}/${result.rawDenominator}`
        : `${a} ${operationInfo.symbol} ${b} = (${result.a.numerator} × ${result.b.denominator} ${operationInfo.symbol} ${result.b.numerator} × ${result.a.denominator}) / (${result.a.denominator} × ${result.b.denominator}) = ${result.rawNumerator}/${result.rawDenominator}`;
    const simplification = result.divisor > 1
      ? `Divide numerator and denominator by their greatest common divisor, ${result.divisor}: ${result.rawNumerator}/${result.rawDenominator} = ${result.simplifiedNumerator}/${result.simplifiedDenominator}.`
      : `${result.rawNumerator}/${result.rawDenominator} is already in simplest form.`;
    const mixed = !result.isProper && result.remainderNumerator !== 0
      ? `${result.simplifiedNumerator}/${result.simplifiedDenominator} = ${result.wholePart} ${Math.abs(result.remainderNumerator)}/${result.simplifiedDenominator}.`
      : null;
    return [
      { title: "1. Convert mixed numbers", line: `The entered values become ${a} and ${b}.` },
      { title: `2. ${operationInfo.label} the fractions`, line: calculation },
      { title: "3. Simplify the result", line: simplification },
      { title: "4. Final answer", line: `Result: ${result.simplifiedNumerator}/${result.simplifiedDenominator} ≈ ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 8 }).format(result.decimal)}.${mixed ? ` ${mixed}` : ""}` },
    ];
  }, [result, operation, operationInfo]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">Enter two proper, improper or mixed-number fractions. The calculator keeps integer arithmetic, simplifies the result and shows the working.</p>
        <div className="engineering-targets">
          <span>Operation</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {operations.map((item) => <button key={item.id} type="button" className={`engineering-target-button${operation === item.id ? " is-active" : ""}`} onClick={() => setOperation(item.id)}>{item.label}</button>)}
          </div>
        </div>
        <div className="fraction-pair">
          <FractionInput label="First fraction" whole={aWhole} numerator={aNumerator} denominator={aDenominator} onWholeChange={setAWhole} onNumeratorChange={setANumerator} onDenominatorChange={setADenominator} />
          <span className="fraction-operation-symbol" aria-hidden="true">{operationInfo.symbol}</span>
          <FractionInput label="Second fraction" whole={bWhole} numerator={bNumerator} denominator={bDenominator} onWholeChange={setBWhole} onNumeratorChange={setBNumerator} onDenominatorChange={setBDenominator} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter integer numerators and denominators. A denominator cannot be zero, and division by a zero fraction is undefined.</strong> : (
          <div className="paint-calculator-result-grid">
            <div><span>Simplified result</span><strong>{result.simplifiedNumerator}/{result.simplifiedDenominator}</strong></div>
            <div><span>Decimal</span><strong>{new Intl.NumberFormat("en-US", { maximumFractionDigits: 8 }).format(result.decimal)}</strong></div>
          </div>
        )}
      </div>
      {steps.length > 0 && <div className="calculator-steps"><h3>Show the steps</h3>{steps.map((step) => <div className="calculator-step" key={step.title}><p className="calculator-step-title">{step.title}</p><p className="calculator-step-line">{step.line}</p></div>)}</div>}
    </div>
  );
}
