"use client";

import { useMemo, useState } from "react";
import { calculateKc } from "../converter/equilibriumConstantCalculator";

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

function formatScientific(value: number) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

export default function EquilibriumConstantCalculator() {
  const [r1Coef, setR1Coef] = useState("1");
  const [r1Conc, setR1Conc] = useState("0.5");
  const [hasR2, setHasR2] = useState(false);
  const [r2Coef, setR2Coef] = useState("1");
  const [r2Conc, setR2Conc] = useState("1");

  const [p1Coef, setP1Coef] = useState("2");
  const [p1Conc, setP1Conc] = useState("0.3");
  const [hasP2, setHasP2] = useState(false);
  const [p2Coef, setP2Coef] = useState("1");
  const [p2Conc, setP2Conc] = useState("1");

  const reactants = useMemo(() => {
    const list = [
      {
        coefficient: parseNumericValue(r1Coef),
        concentration: parseNumericValue(r1Conc),
      },
    ];

    if (hasR2) {
      list.push({
        coefficient: parseNumericValue(r2Coef),
        concentration: parseNumericValue(r2Conc),
      });
    }

    return list;
  }, [r1Coef, r1Conc, hasR2, r2Coef, r2Conc]);

  const products = useMemo(() => {
    const list = [
      {
        coefficient: parseNumericValue(p1Coef),
        concentration: parseNumericValue(p1Conc),
      },
    ];

    if (hasP2) {
      list.push({
        coefficient: parseNumericValue(p2Coef),
        concentration: parseNumericValue(p2Conc),
      });
    }

    return list;
  }, [p1Coef, p1Conc, hasP2, p2Coef, p2Conc]);

  const result = useMemo(
    () => calculateKc(reactants, products),
    [reactants, products]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const numeratorTerms = products
      .map((p) => `[${formatNumber(p.concentration)}]^${formatNumber(p.coefficient, 0)}`)
      .join(" × ");
    const denominatorTerms = reactants
      .map((r) => `[${formatNumber(r.concentration)}]^${formatNumber(r.coefficient, 0)}`)
      .join(" × ");

    return [
      {
        title: "1. Adım — Kc ifadesi",
        lines: [
          "Kc = [ürünler]^katsayı / [reaktanlar]^katsayı",
          `Kc = (${numeratorTerms}) / (${denominatorTerms})`,
          `Kc ≈ ${formatScientific(result.kc)}`,
        ],
      },
    ];
  }, [result, products, reactants]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: her reaktan ve ürünün denge derişimini (mol/L) ve
          denklem katsayısını gir — Kc'yi hesaplayalım. Reaktan veya
          ürünün ikinci bir maddesi varsa "ikinci madde ekle" ile
          açabilirsin.
        </p>

        <div className="equation-builder">
          <div className="equation-side">
            <h3>Reaktanlar</h3>
            <div className="equation-compound-row">
              <div className="equation-compound-header">
                <span>Reaktan 1</span>
              </div>
              <div className="equation-compound-fields">
                <label className="category-general-converter-field">
                  <span>Katsayı</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={r1Coef}
                    onChange={(event) => setR1Coef(event.target.value)}
                  />
                </label>
                <label className="category-general-converter-field">
                  <span>Denge Derişimi (mol/L)</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={r1Conc}
                    onChange={(event) => setR1Conc(event.target.value)}
                  />
                </label>
              </div>
            </div>

            {hasR2 && (
              <div className="equation-compound-row">
                <div className="equation-compound-header">
                  <span>Reaktan 2</span>
                  <button
                    type="button"
                    className="atomic-mass-remove-button"
                    onClick={() => setHasR2(false)}
                    aria-label="Reaktan 2'yi kaldır"
                  >
                    ✕
                  </button>
                </div>
                <div className="equation-compound-fields">
                  <label className="category-general-converter-field">
                    <span>Katsayı</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={r2Coef}
                      onChange={(event) => setR2Coef(event.target.value)}
                    />
                  </label>
                  <label className="category-general-converter-field">
                    <span>Denge Derişimi (mol/L)</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={r2Conc}
                      onChange={(event) => setR2Conc(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            )}

            {!hasR2 && (
              <button
                type="button"
                className="engineering-target-button atomic-mass-add-button"
                onClick={() => setHasR2(true)}
              >
                + İkinci Reaktan Ekle
              </button>
            )}
          </div>

          <div className="equation-arrow" aria-hidden="true">
            ⇌
          </div>

          <div className="equation-side">
            <h3>Ürünler</h3>
            <div className="equation-compound-row">
              <div className="equation-compound-header">
                <span>Ürün 1</span>
              </div>
              <div className="equation-compound-fields">
                <label className="category-general-converter-field">
                  <span>Katsayı</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={p1Coef}
                    onChange={(event) => setP1Coef(event.target.value)}
                  />
                </label>
                <label className="category-general-converter-field">
                  <span>Denge Derişimi (mol/L)</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={p1Conc}
                    onChange={(event) => setP1Conc(event.target.value)}
                  />
                </label>
              </div>
            </div>

            {hasP2 && (
              <div className="equation-compound-row">
                <div className="equation-compound-header">
                  <span>Ürün 2</span>
                  <button
                    type="button"
                    className="atomic-mass-remove-button"
                    onClick={() => setHasP2(false)}
                    aria-label="Ürün 2'yi kaldır"
                  >
                    ✕
                  </button>
                </div>
                <div className="equation-compound-fields">
                  <label className="category-general-converter-field">
                    <span>Katsayı</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={p2Coef}
                      onChange={(event) => setP2Coef(event.target.value)}
                    />
                  </label>
                  <label className="category-general-converter-field">
                    <span>Denge Derişimi (mol/L)</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={p2Conc}
                      onChange={(event) => setP2Conc(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            )}

            {!hasP2 && (
              <button
                type="button"
                className="engineering-target-button atomic-mass-add-button"
                onClick={() => setHasP2(true)}
              >
                + İkinci Ürün Ekle
              </button>
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
              <span>Kc</span>
              <strong>{formatScientific(result.kc)}</strong>
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
