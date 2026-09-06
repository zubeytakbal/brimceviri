"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateLogarithm,
  type LogarithmTarget,
} from "../converter/logarithmCalculator";
import { solveMathInputFromLatex } from "../converter/logEquationSolver";
import MathSolveOutcomePanel from "./MathSolveOutcomePanel";

const EquationVisualInput = dynamic(() => import("./EquationVisualInput"), {
  loading: () => <p className="calculator-usage-hint">Yükleniyor…</p>,
  ssr: false,
});

type CalculatorMode = "hesapla" | "gorsel";

const targetLabels: Record<LogarithmTarget, string> = {
  sonuc: "Sonuç (log değeri)",
  sayi: "Sayı (x)",
  taban: "Taban (b)",
};

const basePresets = [
  { id: "custom", label: "Özel taban", value: "" },
  { id: "10", label: "10 (log)", value: "10" },
  { id: "e", label: "e (ln, doğal log)", value: `${Math.E}` },
  { id: "2", label: "2", value: "2" },
];

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

const DEFAULT_VISUAL_LATEX = "\\log_{2}\\left(8\\right)=x";

export default function LogarithmCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("hesapla");

  const [target, setTarget] = useState<LogarithmTarget>("sonuc");
  const [tabanId, setTabanId] = useState("2");
  const [tabanInput, setTabanInput] = useState("2");
  const [sayiInput, setSayiInput] = useState("8");
  const [sonucInput, setSonucInput] = useState("3");

  const taban = useMemo(() => parseNumericValue(tabanInput), [tabanInput]);
  const sayi = useMemo(() => parseNumericValue(sayiInput), [sayiInput]);
  const sonuc = useMemo(() => parseNumericValue(sonucInput), [sonucInput]);

  const result = useMemo(
    () => calculateLogarithm({ target, taban, sayi, sonuc }),
    [target, taban, sayi, sonuc]
  );

  function applyBasePreset(id: string) {
    setTabanId(id);
    const preset = basePresets.find((item) => item.id === id);
    if (preset && preset.value) {
      setTabanInput(preset.value);
    }
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (result.target === "sonuc") {
      return [
        {
          title: "1. Adım — Taban değiştirme formülü",
          lines: [
            `log_${formatNumber(result.taban, 4)}(${formatNumber(result.sayi, 4)}) = ln(${formatNumber(result.sayi, 4)}) / ln(${formatNumber(result.taban, 4)})`,
            `= ${formatNumber(Math.log(result.sayi), 4)} / ${formatNumber(Math.log(result.taban), 4)} = ${formatNumber(result.sonuc)}`,
          ],
        },
      ];
    }

    if (result.target === "sayi") {
      return [
        {
          title: "1. Adım — Logaritma tanımından üstel forma geç",
          lines: [
            `log_${formatNumber(result.taban, 4)}(x) = ${formatNumber(result.sonuc, 4)} ⟹ x = ${formatNumber(result.taban, 4)}^${formatNumber(result.sonuc, 4)}`,
            `x = ${formatNumber(result.sayi)}`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Logaritma tanımından tabanı çöz",
        lines: [
          `log_b(${formatNumber(result.sayi, 4)}) = ${formatNumber(result.sonuc, 4)} ⟹ b = ${formatNumber(result.sayi, 4)}^(1/${formatNumber(result.sonuc, 4)})`,
          `b = ${formatNumber(result.taban)}`,
        ],
      },
    ];
  }, [result]);

  const [visualLatexInput, setVisualLatexInput] = useState(DEFAULT_VISUAL_LATEX);
  const visualOutcome = useMemo(
    () => (visualLatexInput.trim() ? solveMathInputFromLatex(visualLatexInput) : null),
    [visualLatexInput]
  );

  return (
    <div className="log-calculator-wrapper">
      <div className="log-mode-toggle">
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "hesapla" ? " is-active" : ""}`}
          onClick={() => setMode("hesapla")}
        >
          Sayı Hesapla
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "gorsel" ? " is-active" : ""}`}
          onClick={() => setMode("gorsel")}
        >
          Görsel Editör
        </button>
      </div>

      <div className="category-general-converter">
        {mode === "gorsel" ? (
          <>
            <EquationVisualInput
              onChange={setVisualLatexInput}
              defaultLatex={DEFAULT_VISUAL_LATEX}
            />
            <MathSolveOutcomePanel
              outcome={visualOutcome}
              emptyMessage="Bir logaritmik denklem yaz."
            />
          </>
        ) : (
          <>
            <div className="engineering-calculator-card">
              <p className="calculator-usage-hint">
                Nasıl çalışır: log_b(x) = y ifadesindeki taban (b), sayı (x) ve
                sonuç (y) değerlerinden ikisini gir, hangisini bilmediğini seç —
                hesaplayalım. Taban için 10 (log) veya e (ln) ön ayarlarını
                kullanabilirsin.
              </p>

              <div className="engineering-targets">
                <span>Neyi hesaplamak istiyorsun?</span>
                <div className="engineering-target-grid">
                  {(Object.keys(targetLabels) as LogarithmTarget[]).map((key) => (
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
                {target !== "taban" && (
                  <>
                    <label className="category-general-converter-field">
                      <span>Taban ön ayarı</span>
                      <select
                        value={tabanId}
                        onChange={(event) => applyBasePreset(event.target.value)}
                      >
                        {basePresets.map((preset) => (
                          <option key={preset.id} value={preset.id}>
                            {preset.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="category-general-converter-field">
                      <span>Taban (b)</span>
                      <input
                        inputMode="decimal"
                        type="text"
                        value={tabanInput}
                        onChange={(event) => {
                          setTabanInput(event.target.value);
                          setTabanId("custom");
                        }}
                      />
                    </label>
                  </>
                )}

                {target !== "sayi" && (
                  <label className="category-general-converter-field">
                    <span>Sayı (x)</span>
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
                    <span>Sonuç (y)</span>
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
                <strong>
                  Geçerli değerler gir (taban 0&apos;dan büyük ve 1&apos;e eşit olmamalı,
                  sayı 0&apos;dan büyük olmalı).
                </strong>
              ) : (
                <div className="paint-calculator-result-grid">
                  <div>
                    <span>{targetLabels[result.target]}</span>
                    <strong>{formatNumber(result[result.target])}</strong>
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
          </>
        )}

        <p className="calculator-usage-hint">
          Logaritmalı bir <strong>denklemi</strong> (örn. log(2x+1,3)=4)
          çözmek istiyorsan{" "}
          <Link href="/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme">
            1 Bilinmeyenli Denklem Çözme
          </Link>{" "}
          aracına, logaritmik bir <strong>denklem sistemin</strong> varsa{" "}
          <Link href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme">
            2 Bilinmeyenli Denklem Sistemi Çözme
          </Link>{" "}
          aracına bakabilirsin.
        </p>
      </div>
    </div>
  );
}
