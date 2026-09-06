"use client";

import { useMemo, useState } from "react";
import {
  calculatePh,
  type PhClassification,
  type PhInputMode,
} from "../converter/phCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 3) {
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

const modeLabels: Record<PhInputMode, string> = {
  ph: "pH",
  hConcentration: "[H⁺] (mol/L)",
  poh: "pOH",
  ohConcentration: "[OH⁻] (mol/L)",
};

const classificationLabels: Record<PhClassification, string> = {
  asidik: "Asidik",
  notr: "Nötr",
  bazik: "Bazik",
};

export default function PhCalculator() {
  const [mode, setMode] = useState<PhInputMode>("ph");
  const [inputs, setInputs] = useState<Record<PhInputMode, string>>({
    ph: "7",
    hConcentration: "0.0000001",
    poh: "7",
    ohConcentration: "0.0000001",
  });

  const result = useMemo(
    () =>
      calculatePh({
        mode,
        value: parseNumericValue(inputs[mode]),
      }),
    [mode, inputs]
  );

  function handleInputChange(value: string) {
    setInputs((prev) => ({ ...prev, [mode]: value }));
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const stepList: { title: string; lines: string[] }[] = [];

    if (mode === "ph" || mode === "hConcentration") {
      if (mode === "hConcentration") {
        stepList.push({
          title: "1. Adım — pH",
          lines: [
            "pH = -log[H⁺]",
            `pH = -log(${formatScientific(result.hConcentration)})`,
            `pH ≈ ${formatNumber(result.ph, 2)}`,
          ],
        });
      } else {
        stepList.push({
          title: "1. Adım — [H⁺] derişimi",
          lines: [
            "[H⁺] = 10^(-pH)",
            `[H⁺] = 10^(-${formatNumber(result.ph, 2)})`,
            `[H⁺] ≈ ${formatScientific(result.hConcentration)} mol/L`,
          ],
        });
      }
      stepList.push({
        title: "2. Adım — pOH",
        lines: [
          "pOH = 14 - pH",
          `pOH = 14 - ${formatNumber(result.ph, 2)}`,
          `pOH ≈ ${formatNumber(result.poh, 2)}`,
        ],
      });
      stepList.push({
        title: "3. Adım — [OH⁻] derişimi",
        lines: [
          "[OH⁻] = 10^(-pOH)",
          `[OH⁻] = 10^(-${formatNumber(result.poh, 2)})`,
          `[OH⁻] ≈ ${formatScientific(result.ohConcentration)} mol/L`,
        ],
      });
    } else {
      if (mode === "ohConcentration") {
        stepList.push({
          title: "1. Adım — pOH",
          lines: [
            "pOH = -log[OH⁻]",
            `pOH = -log(${formatScientific(result.ohConcentration)})`,
            `pOH ≈ ${formatNumber(result.poh, 2)}`,
          ],
        });
      } else {
        stepList.push({
          title: "1. Adım — [OH⁻] derişimi",
          lines: [
            "[OH⁻] = 10^(-pOH)",
            `[OH⁻] = 10^(-${formatNumber(result.poh, 2)})`,
            `[OH⁻] ≈ ${formatScientific(result.ohConcentration)} mol/L`,
          ],
        });
      }
      stepList.push({
        title: "2. Adım — pH",
        lines: [
          "pH = 14 - pOH",
          `pH = 14 - ${formatNumber(result.poh, 2)}`,
          `pH ≈ ${formatNumber(result.ph, 2)}`,
        ],
      });
      stepList.push({
        title: "3. Adım — [H⁺] derişimi",
        lines: [
          "[H⁺] = 10^(-pH)",
          `[H⁺] = 10^(-${formatNumber(result.ph, 2)})`,
          `[H⁺] ≈ ${formatScientific(result.hConcentration)} mol/L`,
        ],
      });
    }

    return stepList;
  }, [result, mode]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: pH, pOH, [H⁺] veya [OH⁻] değerlerinden hangisini
          biliyorsan onu seç, tek bir sayı gir — diğer üçünü ve asit/baz
          durumunu biz bulalım.
        </p>
        <div className="engineering-targets">
          <span>Hangi değeri biliyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(modeLabels) as PhInputMode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${mode === key ? " is-active" : ""}`}
                onClick={() => setMode(key)}
              >
                {modeLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{modeLabels[mode]}</span>
            <input
              inputMode="decimal"
              type="text"
              value={inputs[mode]}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli bir değer girerek sonucu görebilirsin (derişim
            değerlerinin pozitif olması gerekir).
          </strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>pH</span>
                <strong>{formatNumber(result.ph, 2)}</strong>
              </div>
              <div>
                <span>pOH</span>
                <strong>{formatNumber(result.poh, 2)}</strong>
              </div>
              <div>
                <span>[H⁺]</span>
                <strong>{formatScientific(result.hConcentration)} mol/L</strong>
              </div>
              <div>
                <span>[OH⁻]</span>
                <strong>{formatScientific(result.ohConcentration)} mol/L</strong>
              </div>
            </div>
            <p className="ph-classification" data-classification={result.classification}>
              {classificationLabels[result.classification]}
            </p>
          </>
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
