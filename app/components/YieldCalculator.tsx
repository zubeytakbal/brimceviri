"use client";

import { useMemo, useState } from "react";
import {
  calculateYield,
  type YieldTarget,
} from "../converter/yieldCalculator";

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

const targetLabels: Record<YieldTarget, string> = {
  yuzdeVerim: "Yüzde Verim (%)",
  gercekVerim: "Gerçek Verim",
  teorikVerim: "Teorik Verim",
};

export default function YieldCalculator() {
  const [target, setTarget] = useState<YieldTarget>("yuzdeVerim");
  const [yuzdeInput, setYuzdeInput] = useState("75");
  const [gercekInput, setGercekInput] = useState("15");
  const [teorikInput, setTeorikInput] = useState("20");

  const result = useMemo(
    () =>
      calculateYield({
        target,
        yuzdeVerim: parseNumericValue(yuzdeInput),
        gercekVerim: parseNumericValue(gercekInput),
        teorikVerim: parseNumericValue(teorikInput),
      }),
    [target, yuzdeInput, gercekInput, teorikInput]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "yuzdeVerim") {
      return [
        {
          title: "1. Adım — Yüzde verim",
          lines: [
            "% verim = (gerçek verim / teorik verim) × 100",
            `% verim = (${formatNumber(result.gercekVerim)} / ${formatNumber(result.teorikVerim)}) × 100`,
            `% verim ≈ ${formatNumber(result.yuzdeVerim, 2)}`,
          ],
        },
      ];
    }

    if (target === "gercekVerim") {
      return [
        {
          title: "1. Adım — Gerçek verim",
          lines: [
            "gerçek verim = (% verim × teorik verim) / 100",
            `gerçek verim = (${formatNumber(result.yuzdeVerim, 2)} × ${formatNumber(result.teorikVerim)}) / 100`,
            `gerçek verim ≈ ${formatNumber(result.gercekVerim)}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Teorik verim",
        lines: [
          "teorik verim = (gerçek verim × 100) / % verim",
          `teorik verim = (${formatNumber(result.gercekVerim)} × 100) / ${formatNumber(result.yuzdeVerim, 2)}`,
          `teorik verim ≈ ${formatNumber(result.teorikVerim)}`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin iki değeri gir (mesela gerçek ve teorik
          verim, aynı birimde — ikisi de gram ya da ikisi de mol olmalı),
          eksik olan üçüncüyü biz bulalım.
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as YieldTarget[]).map((key) => (
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
          {target !== "yuzdeVerim" && (
            <label className="category-general-converter-field">
              <span>Yüzde Verim (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={yuzdeInput}
                onChange={(event) => setYuzdeInput(event.target.value)}
              />
            </label>
          )}

          {target !== "gercekVerim" && (
            <label className="category-general-converter-field">
              <span>Gerçek Verim (deneyde elde edilen)</span>
              <input
                inputMode="decimal"
                type="text"
                value={gercekInput}
                onChange={(event) => setGercekInput(event.target.value)}
              />
            </label>
          )}

          {target !== "teorikVerim" && (
            <label className="category-general-converter-field">
              <span>Teorik Verim (stokiyometrik hesap)</span>
              <input
                inputMode="decimal"
                type="text"
                value={teorikInput}
                onChange={(event) => setTeorikInput(event.target.value)}
              />
            </label>
          )}
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
              <span>Yüzde Verim</span>
              <strong>{formatNumber(result.yuzdeVerim, 2)} %</strong>
            </div>
            <div>
              <span>Gerçek Verim</span>
              <strong>{formatNumber(result.gercekVerim)}</strong>
            </div>
            <div>
              <span>Teorik Verim</span>
              <strong>{formatNumber(result.teorikVerim)}</strong>
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
