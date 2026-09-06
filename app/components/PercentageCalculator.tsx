"use client";

import { useMemo, useState } from "react";
import {
  calculatePercentage,
  calculatePercentageChange,
  type PercentageTarget,
} from "../converter/percentageCalculator";

type CalculatorMode = "hesapla" | "degisim";

const targetLabels: Record<PercentageTarget, string> = {
  sonuc: "Sonuç (Y)",
  sayi: "Sayı (X)",
  yuzde: "Yüzde (%)",
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("hesapla");

  const [target, setTarget] = useState<PercentageTarget>("sonuc");
  const [yuzdeInput, setYuzdeInput] = useState("18");
  const [sayiInput, setSayiInput] = useState("500");
  const [sonucInput, setSonucInput] = useState("90");

  const yuzde = useMemo(() => parseNumericValue(yuzdeInput), [yuzdeInput]);
  const sayi = useMemo(() => parseNumericValue(sayiInput), [sayiInput]);
  const sonuc = useMemo(() => parseNumericValue(sonucInput), [sonucInput]);

  const result = useMemo(
    () => calculatePercentage({ target, yuzde, sayi, sonuc }),
    [target, yuzde, sayi, sonuc]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (result.target === "sonuc") {
      return [
        {
          title: "1. Adım — Y = (P/100) × X",
          lines: [
            `Y = (${formatNumber(result.yuzde, 4)}/100) × ${formatNumber(result.sayi, 4)}`,
            `Y = ${formatNumber(result.sonuc)}`,
          ],
        },
      ];
    }

    if (result.target === "sayi") {
      return [
        {
          title: "1. Adım — X = Y / (P/100)",
          lines: [
            `X = ${formatNumber(result.sonuc, 4)} / (${formatNumber(result.yuzde, 4)}/100)`,
            `X = ${formatNumber(result.sayi)}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — P = (Y/X) × 100",
        lines: [
          `P = (${formatNumber(result.sonuc, 4)}/${formatNumber(result.sayi, 4)}) × 100`,
          `P = %${formatNumber(result.yuzde)}`,
        ],
      },
    ];
  }, [result]);

  const [eskiInput, setEskiInput] = useState("1200");
  const [yeniInput, setYeniInput] = useState("1500");
  const eski = useMemo(() => parseNumericValue(eskiInput), [eskiInput]);
  const yeni = useMemo(() => parseNumericValue(yeniInput), [yeniInput]);
  const changeResult = useMemo(() => calculatePercentageChange(eski, yeni), [eski, yeni]);
  const changeSteps = useMemo(() => {
    if (!changeResult) {
      return null;
    }
    return [
      {
        title: "1. Adım — Farkı bul",
        lines: [
          `Fark = Yeni − Eski = ${formatNumber(changeResult.yeni, 4)} − ${formatNumber(changeResult.eski, 4)} = ${formatNumber(changeResult.fark)}`,
        ],
      },
      {
        title: "2. Adım — Yüzde değişimi hesapla",
        lines: [
          `Değişim % = (Fark / Eski) × 100 = (${formatNumber(changeResult.fark, 4)} / ${formatNumber(changeResult.eski, 4)}) × 100`,
          `Değişim % = ${changeResult.changePercent >= 0 ? "+" : ""}${formatNumber(changeResult.changePercent)}% (${changeResult.changePercent >= 0 ? "artış" : "azalış"})`,
        ],
      },
    ];
  }, [changeResult]);

  return (
    <div className="log-calculator-wrapper">
      <div className="log-mode-toggle">
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "hesapla" ? " is-active" : ""}`}
          onClick={() => setMode("hesapla")}
        >
          Yüzde Hesapla
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "degisim" ? " is-active" : ""}`}
          onClick={() => setMode("degisim")}
        >
          Yüzde Değişim
        </button>
      </div>

      {mode === "hesapla" ? (
        <div className="category-general-converter">
          <div className="engineering-calculator-card">
            <p className="calculator-usage-hint">
              Nasıl çalışır: Y = (P/100) × X ifadesindeki yüzde (P), sayı (X)
              ve sonuç (Y) değerlerinden ikisini gir, hangisini bilmediğini
              seç — hesaplayalım. Örneğin &quot;500&apos;ün %18&apos;i
              kaçtır?&quot; için yüzde=18, sayı=500 gir, sonucu bul.
            </p>

            <div className="engineering-targets">
              <span>Neyi hesaplamak istiyorsun?</span>
              <div className="engineering-target-grid">
                {(Object.keys(targetLabels) as PercentageTarget[]).map((key) => (
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
                  <span>Yüzde (%)</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={yuzdeInput}
                    onChange={(event) => setYuzdeInput(event.target.value)}
                  />
                </label>
              )}

              {target !== "sayi" && (
                <label className="category-general-converter-field">
                  <span>Sayı (X)</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={sayiInput}
                    onChange={(event) => setSayiInput(event.target.value)}
                  />
                </label>
              )}

              {target !== "sonuc" && (
                <label className="category-general-converter-field">
                  <span>Sonuç (Y)</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={sonucInput}
                    onChange={(event) => setSonucInput(event.target.value)}
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
              <strong>Geçerli değerler gir (yüzde hesaplanıyorsa sayı 0 olmamalı).</strong>
            ) : (
              <div className="paint-calculator-result-grid">
                <div>
                  <span>{targetLabels[result.target]}</span>
                  <strong>
                    {result.target === "yuzde" ? "%" : ""}
                    {formatNumber(result[result.target])}
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
      ) : (
        <div className="category-general-converter">
          <div className="engineering-calculator-card">
            <p className="calculator-usage-hint">
              Nasıl çalışır: eski ve yeni değeri gir, aradaki yüzde
              artışını/azalışını hesaplayalım. Örneğin fiyatın 1200
              TL&apos;den 1500 TL&apos;ye çıkması ne kadarlık bir artış,
              görürsün.
            </p>

            <div className="paint-calculator-grid">
              <label className="category-general-converter-field">
                <span>Eski değer</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={eskiInput}
                  onChange={(event) => setEskiInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Yeni değer</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={yeniInput}
                  onChange={(event) => setYeniInput(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div
            aria-live="polite"
            className="category-general-converter-result paint-calculator-result"
          >
            {!changeResult ? (
              <strong>Geçerli değerler gir (eski değer 0 olmamalı).</strong>
            ) : (
              <div className="paint-calculator-result-grid">
                <div>
                  <span>Yüzde değişim</span>
                  <strong>
                    {changeResult.changePercent >= 0 ? "+" : ""}
                    {formatNumber(changeResult.changePercent)}%{" "}
                    ({changeResult.changePercent >= 0 ? "artış" : "azalış"})
                  </strong>
                </div>
                <div>
                  <span>Fark</span>
                  <strong>{formatNumber(changeResult.fark)}</strong>
                </div>
              </div>
            )}
          </div>

          {changeSteps && (
            <div className="calculator-steps">
              <h3>Adım Adım Çözüm</h3>
              {changeSteps.map((step) => (
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
      )}
    </div>
  );
}
