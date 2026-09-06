"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import {
  calculateMassPercent,
  type MassPercentTarget,
} from "../converter/massPercentCalculator";

const massUnits = [
  { symbol: "mg", label: "mg" },
  { symbol: "g", label: "g" },
  { symbol: "kg", label: "kg" },
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

const targetLabels: Record<MassPercentTarget, string> = {
  yuzde: "Kütlece Yüzde (%)",
  cozunen: "Çözünen Kütlesi",
  cozucu: "Çözücü Kütlesi",
};

export default function MassPercentCalculator() {
  const [target, setTarget] = useState<MassPercentTarget>("yuzde");
  const [yuzdeInput, setYuzdeInput] = useState("20");
  const [cozunenInput, setCozunenInput] = useState("20");
  const [cozucuInput, setCozucuInput] = useState("80");
  const [massUnit, setMassUnit] = useState("g");

  const cozunenGram = useMemo(() => {
    const value = parseNumericValue(cozunenInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("kutle", value, massUnit, "g");
  }, [cozunenInput, massUnit]);

  const cozucuGram = useMemo(() => {
    const value = parseNumericValue(cozucuInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("kutle", value, massUnit, "g");
  }, [cozucuInput, massUnit]);

  const result = useMemo(
    () =>
      calculateMassPercent({
        target,
        yuzde: parseNumericValue(yuzdeInput),
        cozunenKutlesi: cozunenGram,
        cozucuKutlesi: cozucuGram,
      }),
    [target, yuzdeInput, cozunenGram, cozucuGram]
  );

  function convertResultToUnit(gramValue: number) {
    return convert("kutle", gramValue, "g", massUnit);
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "yuzde") {
      return [
        {
          title: "1. Adım — Kütlece yüzde",
          lines: [
            "% = (çözünen / çözelti) × 100",
            `% = (${formatNumber(result.cozunenKutlesi)} g / ${formatNumber(result.cozeltiKutlesi)} g) × 100`,
            `% ≈ ${formatNumber(result.yuzde, 2)}`,
          ],
        },
      ];
    }

    if (target === "cozunen") {
      return [
        {
          title: "1. Adım — Çözünen kütlesi",
          lines: [
            "çözünen = (% × çözücü) / (100 - %)",
            `çözünen = (${formatNumber(result.yuzde, 2)} × ${formatNumber(result.cozucuKutlesi)} g) / (100 - ${formatNumber(result.yuzde, 2)})`,
            `çözünen ≈ ${formatNumber(result.cozunenKutlesi)} g`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Çözücü kütlesi",
        lines: [
          "çözücü = çözünen × (100 - %) / %",
          `çözücü = ${formatNumber(result.cozunenKutlesi)} g × (100 - ${formatNumber(result.yuzde, 2)}) / ${formatNumber(result.yuzde, 2)}`,
          `çözücü ≈ ${formatNumber(result.cozucuKutlesi)} g`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin iki kütleyi gir (mesela çözünen ve
          çözücü), eksik olanı ve yüzdeyi biz bulalım.
        </p>
        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as MassPercentTarget[]).map((key) => (
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
          {target !== "yuzde" && (
            <label className="category-general-converter-field">
              <span>Kütlece Yüzde (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={yuzdeInput}
                onChange={(event) => setYuzdeInput(event.target.value)}
              />
            </label>
          )}

          {target !== "cozunen" && (
            <label className="category-general-converter-field">
              <span>Çözünen Kütlesi</span>
              <input
                inputMode="decimal"
                type="text"
                value={cozunenInput}
                onChange={(event) => setCozunenInput(event.target.value)}
              />
            </label>
          )}

          {target !== "cozucu" && (
            <label className="category-general-converter-field">
              <span>Çözücü Kütlesi</span>
              <input
                inputMode="decimal"
                type="text"
                value={cozucuInput}
                onChange={(event) => setCozucuInput(event.target.value)}
              />
            </label>
          )}

          <label className="category-general-converter-field">
            <span>Kütle Birimi</span>
            <select
              value={massUnit}
              onChange={(event) => setMassUnit(event.target.value)}
            >
              {massUnits.map((unit) => (
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
              <span>Kütlece Yüzde</span>
              <strong>{formatNumber(result.yuzde, 2)} %</strong>
            </div>
            <div>
              <span>Çözünen Kütlesi</span>
              <strong>
                {formatNumber(convertResultToUnit(result.cozunenKutlesi))}{" "}
                {massUnit}
              </strong>
            </div>
            <div>
              <span>Çözücü Kütlesi</span>
              <strong>
                {formatNumber(convertResultToUnit(result.cozucuKutlesi))}{" "}
                {massUnit}
              </strong>
            </div>
            <div>
              <span>Toplam Çözelti Kütlesi</span>
              <strong>
                {formatNumber(convertResultToUnit(result.cozeltiKutlesi))}{" "}
                {massUnit}
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
