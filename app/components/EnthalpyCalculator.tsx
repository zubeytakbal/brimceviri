"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import {
  calculateEnthalpy,
  type EnthalpyTarget,
} from "../converter/enthalpyCalculator";

const massUnits = [
  { symbol: "mg", label: "mg" },
  { symbol: "g", label: "g" },
  { symbol: "kg", label: "kg" },
];

const specificHeatPresets = [
  { id: "custom", label: "Özel değer", value: "" },
  { id: "su", label: "Su (sıvı)", value: "4.18" },
  { id: "buz", label: "Buz", value: "2.09" },
  { id: "su-buhari", label: "Su buharı", value: "2.01" },
  { id: "demir", label: "Demir", value: "0.45" },
  { id: "aluminyum", label: "Alüminyum", value: "0.897" },
  { id: "bakir", label: "Bakır", value: "0.385" },
  { id: "altin", label: "Altın", value: "0.129" },
  { id: "gumus", label: "Gümüş", value: "0.235" },
  { id: "cam", label: "Cam", value: "0.84" },
  { id: "etanol", label: "Etanol", value: "2.44" },
  { id: "hava", label: "Hava", value: "1.005" },
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

const targetLabels: Record<EnthalpyTarget, string> = {
  isi: "Isı (q)",
  kutle: "Kütle",
  ozgulIsi: "Özgül Isı",
  sicaklikDegisimi: "Sıcaklık Değişimi (ΔT)",
};

export default function EnthalpyCalculator() {
  const [target, setTarget] = useState<EnthalpyTarget>("isi");
  const [isiInput, setIsiInput] = useState("2090");
  const [kutleInput, setKutleInput] = useState("500");
  const [massUnit, setMassUnit] = useState("g");
  const [specificHeatId, setSpecificHeatId] = useState("su");
  const [ozgulIsiInput, setOzgulIsiInput] = useState("4.18");
  const [deltaTInput, setDeltaTInput] = useState("1");

  const kutleGram = useMemo(() => {
    const value = parseNumericValue(kutleInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("kutle", value, massUnit, "g");
  }, [kutleInput, massUnit]);

  const result = useMemo(
    () =>
      calculateEnthalpy({
        target,
        isiJoule: parseNumericValue(isiInput),
        kutleGram,
        ozgulIsi: parseNumericValue(ozgulIsiInput),
        sicaklikDegisimi: parseNumericValue(deltaTInput),
      }),
    [target, isiInput, kutleGram, ozgulIsiInput, deltaTInput]
  );

  function kutleInSelectedUnit(gramValue: number) {
    return convert("kutle", gramValue, "g", massUnit);
  }

  function applySpecificHeat(id: string) {
    setSpecificHeatId(id);

    const preset = specificHeatPresets.find((item) => item.id === id);

    if (preset && preset.value) {
      setOzgulIsiInput(preset.value);
    }
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "isi") {
      return [
        {
          title: "1. Adım — Isı miktarı",
          lines: [
            "q = m × c × ΔT",
            `q = ${formatNumber(result.kutleGram)} g × ${formatNumber(result.ozgulIsi)} J/(g·°C) × ${formatNumber(result.sicaklikDegisimi)} °C`,
            `q ≈ ${formatNumber(result.isiJoule)} J`,
          ],
        },
      ];
    }

    if (target === "kutle") {
      return [
        {
          title: "1. Adım — Kütle",
          lines: [
            "m = q / (c × ΔT)",
            `m = ${formatNumber(result.isiJoule)} J / (${formatNumber(result.ozgulIsi)} J/(g·°C) × ${formatNumber(result.sicaklikDegisimi)} °C)`,
            `m ≈ ${formatNumber(result.kutleGram)} g`,
          ],
        },
      ];
    }

    if (target === "ozgulIsi") {
      return [
        {
          title: "1. Adım — Özgül ısı",
          lines: [
            "c = q / (m × ΔT)",
            `c = ${formatNumber(result.isiJoule)} J / (${formatNumber(result.kutleGram)} g × ${formatNumber(result.sicaklikDegisimi)} °C)`,
            `c ≈ ${formatNumber(result.ozgulIsi)} J/(g·°C)`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Sıcaklık değişimi",
        lines: [
          "ΔT = q / (m × c)",
          `ΔT = ${formatNumber(result.isiJoule)} J / (${formatNumber(result.kutleGram)} g × ${formatNumber(result.ozgulIsi)} J/(g·°C))`,
          `ΔT ≈ ${formatNumber(result.sicaklikDegisimi)} °C`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin üç değeri gir (kütle, özgül ısı, sıcaklık
          değişimi), eksik olan dördüncüyü biz bulalım. Sabit basınçta bu
          ısı miktarı (q), entalpi değişimine (ΔH) eşittir.
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as EnthalpyTarget[]).map((key) => (
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
          {target !== "isi" && (
            <label className="category-general-converter-field">
              <span>Isı (q, joule)</span>
              <input
                inputMode="decimal"
                type="text"
                value={isiInput}
                onChange={(event) => setIsiInput(event.target.value)}
              />
            </label>
          )}

          {target !== "kutle" && (
            <>
              <label className="category-general-converter-field">
                <span>Kütle</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={kutleInput}
                  onChange={(event) => setKutleInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Birim</span>
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
            </>
          )}

          {target !== "ozgulIsi" && (
            <>
              <label className="category-general-converter-field">
                <span>Madde (ön ayar, opsiyonel)</span>
                <select
                  value={specificHeatId}
                  onChange={(event) => applySpecificHeat(event.target.value)}
                >
                  {specificHeatPresets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="category-general-converter-field">
                <span>Özgül Isı (J/g·°C)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={ozgulIsiInput}
                  onChange={(event) => {
                    setOzgulIsiInput(event.target.value);
                    setSpecificHeatId("custom");
                  }}
                />
              </label>
            </>
          )}

          {target !== "sicaklikDegisimi" && (
            <label className="category-general-converter-field">
              <span>Sıcaklık Değişimi ΔT (°C)</span>
              <input
                inputMode="decimal"
                type="text"
                value={deltaTInput}
                onChange={(event) => setDeltaTInput(event.target.value)}
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
              <span>Isı (q)</span>
              <strong>{formatNumber(result.isiJoule)} J</strong>
            </div>
            <div>
              <span>Kütle</span>
              <strong>
                {formatNumber(kutleInSelectedUnit(result.kutleGram))}{" "}
                {massUnit}
              </strong>
            </div>
            <div>
              <span>Özgül Isı</span>
              <strong>{formatNumber(result.ozgulIsi)} J/(g·°C)</strong>
            </div>
            <div>
              <span>Sıcaklık Değişimi</span>
              <strong>{formatNumber(result.sicaklikDegisimi)} °C</strong>
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
