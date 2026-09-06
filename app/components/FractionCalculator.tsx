"use client";

import { useMemo, useState } from "react";
import {
  calculateFraction,
  type FractionOperation,
} from "../converter/fractionCalculator";

const operationLabels: Record<FractionOperation, string> = {
  toplama: "Toplama",
  cikarma: "Çıkarma",
  carpma: "Çarpma",
  bolme: "Bölme",
};

const operationSymbols: Record<FractionOperation, string> = {
  toplama: "+",
  cikarma: "−",
  carpma: "×",
  bolme: "÷",
};

function parseIntegerValue(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return 0;
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

export default function FractionCalculator() {
  const [operation, setOperation] = useState<FractionOperation>("toplama");
  const [aWholeInput, setAWholeInput] = useState("0");
  const [aNumeratorInput, setANumeratorInput] = useState("1");
  const [aDenominatorInput, setADenominatorInput] = useState("2");
  const [bWholeInput, setBWholeInput] = useState("0");
  const [bNumeratorInput, setBNumeratorInput] = useState("1");
  const [bDenominatorInput, setBDenominatorInput] = useState("3");

  const aWhole = useMemo(() => parseIntegerValue(aWholeInput), [aWholeInput]);
  const bWhole = useMemo(() => parseIntegerValue(bWholeInput), [bWholeInput]);
  const aDenominator = useMemo(
    () => parseIntegerValue(aDenominatorInput),
    [aDenominatorInput]
  );
  const bDenominator = useMemo(
    () => parseIntegerValue(bDenominatorInput),
    [bDenominatorInput]
  );
  const aNumeratorRaw = useMemo(
    () => parseIntegerValue(aNumeratorInput),
    [aNumeratorInput]
  );
  const bNumeratorRaw = useMemo(
    () => parseIntegerValue(bNumeratorInput),
    [bNumeratorInput]
  );

  const aEffectiveNumerator = useMemo(() => {
    if (
      !Number.isFinite(aWhole) ||
      !Number.isFinite(aNumeratorRaw) ||
      !Number.isFinite(aDenominator)
    ) {
      return Number.NaN;
    }
    const magnitude = Math.abs(aWhole) * aDenominator + Math.abs(aNumeratorRaw);
    return aWhole < 0 || aNumeratorRaw < 0 ? -magnitude : magnitude;
  }, [aWhole, aNumeratorRaw, aDenominator]);

  const bEffectiveNumerator = useMemo(() => {
    if (
      !Number.isFinite(bWhole) ||
      !Number.isFinite(bNumeratorRaw) ||
      !Number.isFinite(bDenominator)
    ) {
      return Number.NaN;
    }
    const magnitude = Math.abs(bWhole) * bDenominator + Math.abs(bNumeratorRaw);
    return bWhole < 0 || bNumeratorRaw < 0 ? -magnitude : magnitude;
  }, [bWhole, bNumeratorRaw, bDenominator]);

  const fractionA = useMemo(
    () => ({
      numerator: aEffectiveNumerator,
      denominator: aDenominator,
    }),
    [aEffectiveNumerator, aDenominator]
  );

  const fractionB = useMemo(
    () => ({
      numerator: bEffectiveNumerator,
      denominator: bDenominator,
    }),
    [bEffectiveNumerator, bDenominator]
  );

  const result = useMemo(
    () => calculateFraction(fractionA, fractionB, operation),
    [fractionA, fractionB, operation]
  );

  const aHasWhole = aWhole !== 0;
  const bHasWhole = bWhole !== 0;

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const stepList: { title: string; lines: string[] }[] = [];

    if (aHasWhole || bHasWhole) {
      const conversionLines: string[] = [];
      if (aHasWhole) {
        conversionLines.push(
          `${aWhole} tam ${Math.abs(aNumeratorRaw)}/${aDenominator} = ${result.a.numerator}/${result.a.denominator}`
        );
      }
      if (bHasWhole) {
        conversionLines.push(
          `${bWhole} tam ${Math.abs(bNumeratorRaw)}/${bDenominator} = ${result.b.numerator}/${result.b.denominator}`
        );
      }
      stepList.push({
        title: "1. Adım — Tam sayılı kesri bileşik kesre çevir",
        lines: conversionLines,
      });
    }

    const symbol = operationSymbols[operation];
    const rawLine =
      operation === "carpma"
        ? `${result.a.numerator}/${result.a.denominator} × ${result.b.numerator}/${result.b.denominator} = (${result.a.numerator}×${result.b.numerator})/(${result.a.denominator}×${result.b.denominator}) = ${result.rawNumerator}/${result.rawDenominator}`
        : operation === "bolme"
          ? `${result.a.numerator}/${result.a.denominator} ÷ ${result.b.numerator}/${result.b.denominator} = ${result.a.numerator}/${result.a.denominator} × ${result.b.denominator}/${result.b.numerator} = ${result.rawNumerator}/${result.rawDenominator}`
          : `${result.a.numerator}/${result.a.denominator} ${symbol} ${result.b.numerator}/${result.b.denominator} = (${result.a.numerator}×${result.b.denominator} ${symbol} ${result.b.numerator}×${result.a.denominator})/(${result.a.denominator}×${result.b.denominator}) = ${result.rawNumerator}/${result.rawDenominator}`;

    const simplifyLine =
      result.divisor > 1
        ? `EBOB(${result.rawNumerator}, ${result.rawDenominator}) = ${result.divisor} → ${result.rawNumerator}/${result.divisor} = ${result.simplifiedNumerator}, ${result.rawDenominator}/${result.divisor} = ${result.simplifiedDenominator}`
        : `${result.rawNumerator}/${result.rawDenominator} zaten sadeleşmiş halde (EBOB = 1)`;

    const mixedLine =
      !result.isProper && result.remainderNumerator !== 0
        ? `${result.simplifiedNumerator}/${result.simplifiedDenominator} = ${result.wholePart} tam ${Math.abs(result.remainderNumerator)}/${result.simplifiedDenominator}`
        : null;

    stepList.push({
      title: `${stepList.length + 1}. Adım — ${operationLabels[operation]} işlemi`,
      lines: [rawLine],
    });
    stepList.push({
      title: `${stepList.length + 1}. Adım — Sadeleştirme`,
      lines: [simplifyLine],
    });
    stepList.push({
      title: `${stepList.length + 1}. Adım — Sonuç`,
      lines: [
        `Sonuç = ${result.simplifiedNumerator}/${result.simplifiedDenominator} ≈ ${formatNumber(result.decimal)}`,
        ...(mixedLine ? [mixedLine] : []),
      ],
    });

    return stepList;
  }, [result, operation, aHasWhole, bHasWhole, aWhole, bWhole, aNumeratorRaw, bNumeratorRaw, aDenominator, bDenominator]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: iki kesrin pay ve paydasını gir (istersen tam
          sayı kısmını da doldurarak tam sayılı/bileşik kesir gir), işlemi
          seç — sonucu en sade haliyle, ondalık karşılığıyla ve tam
          sayılı kesir gösterimiyle adım adım hesaplayalım.
        </p>

        <div className="engineering-targets">
          <span>İşlem seç</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(operationLabels) as FractionOperation[]).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className={`engineering-target-button${operation === key ? " is-active" : ""}`}
                  onClick={() => setOperation(key)}
                >
                  {operationLabels[key]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="fraction-pair">
          <div className="fraction-mixed-group">
            <label className="category-general-converter-field fraction-whole-field">
              <span>Tam</span>
              <input
                inputMode="numeric"
                type="text"
                aria-label="Birinci kesrin tam sayı kısmı"
                value={aWholeInput}
                onChange={(event) => setAWholeInput(event.target.value)}
              />
            </label>
            <div className="fraction-input-block">
              <input
                inputMode="numeric"
                type="text"
                aria-label="Birinci kesrin payı"
                value={aNumeratorInput}
                onChange={(event) => setANumeratorInput(event.target.value)}
              />
              <div className="fraction-divider-line" aria-hidden="true" />
              <input
                inputMode="numeric"
                type="text"
                aria-label="Birinci kesrin paydası"
                value={aDenominatorInput}
                onChange={(event) => setADenominatorInput(event.target.value)}
              />
            </div>
          </div>

          <span className="fraction-operation-symbol" aria-hidden="true">
            {operationSymbols[operation]}
          </span>

          <div className="fraction-mixed-group">
            <label className="category-general-converter-field fraction-whole-field">
              <span>Tam</span>
              <input
                inputMode="numeric"
                type="text"
                aria-label="İkinci kesrin tam sayı kısmı"
                value={bWholeInput}
                onChange={(event) => setBWholeInput(event.target.value)}
              />
            </label>
            <div className="fraction-input-block">
              <input
                inputMode="numeric"
                type="text"
                aria-label="İkinci kesrin payı"
                value={bNumeratorInput}
                onChange={(event) => setBNumeratorInput(event.target.value)}
              />
              <div className="fraction-divider-line" aria-hidden="true" />
              <input
                inputMode="numeric"
                type="text"
                aria-label="İkinci kesrin paydası"
                value={bDenominatorInput}
                onChange={(event) => setBDenominatorInput(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli pay/payda değerleri gir (payda sıfır olamaz, bölmede
            ikinci kesrin payı sıfır olamaz).
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Sonuç (sadeleşmiş)</span>
              <strong>
                {result.simplifiedNumerator}/{result.simplifiedDenominator}
              </strong>
            </div>
            <div>
              <span>Ondalık</span>
              <strong>{formatNumber(result.decimal)}</strong>
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
