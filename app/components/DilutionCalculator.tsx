"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import {
  calculateDilution,
  type DilutionTarget,
} from "../converter/dilutionCalculator";

const volumeUnits = [
  { symbol: "mL", label: "mL" },
  { symbol: "L", label: "L" },
];

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

const targetLabels: Record<DilutionTarget, string> = {
  c1: "C₁ (stok derişim)",
  v1: "V₁ (stok hacim)",
  c2: "C₂ (seyreltik derişim)",
  v2: "V₂ (seyreltik hacim)",
};

export default function DilutionCalculator() {
  const [target, setTarget] = useState<DilutionTarget>("v1");
  const [c1Input, setC1Input] = useState("2");
  const [v1Input, setV1Input] = useState("100");
  const [c2Input, setC2Input] = useState("0.5");
  const [v2Input, setV2Input] = useState("400");
  const [volumeUnit, setVolumeUnit] = useState("mL");

  const v1Litre = useMemo(() => {
    const value = parseNumericValue(v1Input);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("hacim", value, volumeUnit, "L");
  }, [v1Input, volumeUnit]);

  const v2Litre = useMemo(() => {
    const value = parseNumericValue(v2Input);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("hacim", value, volumeUnit, "L");
  }, [v2Input, volumeUnit]);

  const result = useMemo(
    () =>
      calculateDilution({
        target,
        c1: parseNumericValue(c1Input),
        v1: v1Litre,
        c2: parseNumericValue(c2Input),
        v2: v2Litre,
      }),
    [target, c1Input, v1Litre, c2Input, v2Litre]
  );

  function volumeInSelectedUnit(litreValue: number) {
    return convert("hacim", litreValue, "L", volumeUnit);
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "c1") {
      return [
        {
          title: "1. Adım — C₁ (stok derişim)",
          lines: [
            "C₁ = (C₂ × V₂) / V₁",
            `C₁ = (${formatNumber(result.c2)} × ${formatNumber(result.v2)} L) / ${formatNumber(result.v1)} L`,
            `C₁ ≈ ${formatNumber(result.c1)} mol/L`,
          ],
        },
      ];
    }

    if (target === "v1") {
      return [
        {
          title: "1. Adım — V₁ (stok hacim)",
          lines: [
            "V₁ = (C₂ × V₂) / C₁",
            `V₁ = (${formatNumber(result.c2)} × ${formatNumber(result.v2)} L) / ${formatNumber(result.c1)}`,
            `V₁ ≈ ${formatNumber(result.v1)} L`,
          ],
        },
      ];
    }

    if (target === "c2") {
      return [
        {
          title: "1. Adım — C₂ (seyreltik derişim)",
          lines: [
            "C₂ = (C₁ × V₁) / V₂",
            `C₂ = (${formatNumber(result.c1)} × ${formatNumber(result.v1)} L) / ${formatNumber(result.v2)} L`,
            `C₂ ≈ ${formatNumber(result.c2)} mol/L`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — V₂ (seyreltik hacim)",
        lines: [
          "V₂ = (C₁ × V₁) / C₂",
          `V₂ = (${formatNumber(result.c1)} × ${formatNumber(result.v1)} L) / ${formatNumber(result.c2)}`,
          `V₂ ≈ ${formatNumber(result.v2)} L`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin üç değeri gir (stok derişim/hacim ve
          hedef derişim ya da hacimden ikisi), eksik olan dördüncüyü biz
          bulalım.
        </p>
        <div className="engineering-targets">
          <span>Hangi değeri hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as DilutionTarget[]).map((key) => (
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
          {target !== "c1" && (
            <label className="category-general-converter-field">
              <span>C₁ (mol/L)</span>
              <input
                inputMode="decimal"
                type="text"
                value={c1Input}
                onChange={(event) => setC1Input(event.target.value)}
              />
            </label>
          )}

          {target !== "v1" && (
            <label className="category-general-converter-field">
              <span>V₁ ({volumeUnit})</span>
              <input
                inputMode="decimal"
                type="text"
                value={v1Input}
                onChange={(event) => setV1Input(event.target.value)}
              />
            </label>
          )}

          {target !== "c2" && (
            <label className="category-general-converter-field">
              <span>C₂ (mol/L)</span>
              <input
                inputMode="decimal"
                type="text"
                value={c2Input}
                onChange={(event) => setC2Input(event.target.value)}
              />
            </label>
          )}

          {target !== "v2" && (
            <label className="category-general-converter-field">
              <span>V₂ ({volumeUnit})</span>
              <input
                inputMode="decimal"
                type="text"
                value={v2Input}
                onChange={(event) => setV2Input(event.target.value)}
              />
            </label>
          )}

          <label className="category-general-converter-field">
            <span>Hacim Birimi</span>
            <select
              value={volumeUnit}
              onChange={(event) => setVolumeUnit(event.target.value)}
            >
              {volumeUnits.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>
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
              <span>C₁ (stok derişim)</span>
              <strong>{formatNumber(result.c1)} mol/L</strong>
            </div>
            <div>
              <span>V₁ (stok hacim)</span>
              <strong>
                {formatNumber(volumeInSelectedUnit(result.v1))} {volumeUnit}
              </strong>
            </div>
            <div>
              <span>C₂ (seyreltik derişim)</span>
              <strong>{formatNumber(result.c2)} mol/L</strong>
            </div>
            <div>
              <span>V₂ (seyreltik hacim)</span>
              <strong>
                {formatNumber(volumeInSelectedUnit(result.v2))} {volumeUnit}
              </strong>
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
