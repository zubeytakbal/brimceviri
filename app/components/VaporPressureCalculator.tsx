"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import {
  calculateVaporPressure,
  type VaporPressureTarget,
} from "../converter/vaporPressureCalculator";

const tempUnits = [
  { symbol: "C", label: "°C" },
  { symbol: "K", label: "K" },
];

const dHvapPresets = [
  { id: "custom", label: "Özel değer", value: "" },
  { id: "su", label: "Su", value: "40.7" },
  { id: "etanol", label: "Etanol", value: "38.6" },
  { id: "metanol", label: "Metanol", value: "35.3" },
  { id: "benzen", label: "Benzen", value: "30.8" },
  { id: "aseton", label: "Aseton", value: "29.1" },
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

function toKelvin(value: number, unit: string) {
  if (unit === "K") {
    return value;
  }

  return convert("sicaklik", value, "C", "K");
}

function fromKelvin(kelvinValue: number, unit: string) {
  if (unit === "K") {
    return kelvinValue;
  }

  return convert("sicaklik", kelvinValue, "K", "C");
}

const targetLabels: Record<VaporPressureTarget, string> = {
  p2: "P₂ (yeni sıcaklıktaki basınç)",
  t2: "T₂ (yeni sıcaklık)",
  dHvap: "ΔHvap (buharlaşma entalpisi)",
};

export default function VaporPressureCalculator() {
  const [target, setTarget] = useState<VaporPressureTarget>("p2");
  const [p1Input, setP1Input] = useState("1");
  const [t1Input, setT1Input] = useState("100");
  const [t1Unit, setT1Unit] = useState("C");
  const [p2Input, setP2Input] = useState("0.7");
  const [t2Input, setT2Input] = useState("90");
  const [t2Unit, setT2Unit] = useState("C");
  const [dHvapId, setDHvapId] = useState("su");
  const [dHvapInput, setDHvapInput] = useState("40.7");

  const t1Kelvin = useMemo(
    () => toKelvin(parseNumericValue(t1Input), t1Unit),
    [t1Input, t1Unit]
  );

  const t2Kelvin = useMemo(
    () => toKelvin(parseNumericValue(t2Input), t2Unit),
    [t2Input, t2Unit]
  );

  const dHvapJoulePerMol = useMemo(
    () => parseNumericValue(dHvapInput) * 1000,
    [dHvapInput]
  );

  const result = useMemo(
    () =>
      calculateVaporPressure({
        target,
        p1: parseNumericValue(p1Input),
        t1Kelvin,
        p2: parseNumericValue(p2Input),
        t2Kelvin,
        dHvapJoulePerMol,
      }),
    [target, p1Input, t1Kelvin, p2Input, t2Kelvin, dHvapJoulePerMol]
  );

  function applyDHvap(id: string) {
    setDHvapId(id);
    const preset = dHvapPresets.find((item) => item.id === id);
    if (preset && preset.value) {
      setDHvapInput(preset.value);
    }
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const dHvapKJ = result.dHvapJoulePerMol / 1000;

    if (target === "p2") {
      return [
        {
          title: "1. Adım — Clausius-Clapeyron denklemi",
          lines: [
            "ln(P₂/P₁) = -(ΔHvap/R) × (1/T₂ - 1/T₁)",
            `ln(P₂/${formatNumber(result.p1)}) = -(${formatNumber(dHvapKJ)} × 1000 / 8,314) × (1/${formatNumber(result.t2Kelvin, 2)} - 1/${formatNumber(result.t1Kelvin, 2)})`,
            `P₂ ≈ ${formatNumber(result.p2)}`,
          ],
        },
      ];
    }

    if (target === "t2") {
      return [
        {
          title: "1. Adım — Clausius-Clapeyron denkleminden T₂",
          lines: [
            "1/T₂ = 1/T₁ - R × ln(P₂/P₁) / ΔHvap",
            `1/T₂ = 1/${formatNumber(result.t1Kelvin, 2)} - 8,314 × ln(${formatNumber(result.p2)}/${formatNumber(result.p1)}) / ${formatNumber(dHvapKJ)}000`,
            `T₂ ≈ ${formatNumber(result.t2Kelvin, 2)} K`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Clausius-Clapeyron denkleminden ΔHvap",
        lines: [
          "ΔHvap = -R × ln(P₂/P₁) / (1/T₂ - 1/T₁)",
          `ΔHvap = -8,314 × ln(${formatNumber(result.p2)}/${formatNumber(result.p1)}) / (1/${formatNumber(result.t2Kelvin, 2)} - 1/${formatNumber(result.t1Kelvin, 2)})`,
          `ΔHvap ≈ ${formatNumber(dHvapKJ)} kJ/mol`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin bir referans sıcaklık/basınç çifti (T₁,
          P₁) ve buharlaşma entalpisini (ΔHvap) gir, hangi değeri
          bilmediğini seç — Clausius-Clapeyron denklemiyle bulalım. P₁ ve
          P₂ aynı, tutarlı bir birimde olmalıdır (ikisi de atm gibi).
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as VaporPressureTarget[]).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className={`engineering-target-button${target === key ? " is-active" : ""}`}
                  onClick={() => setTarget(key)}
                >
                  {targetLabels[key]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>P₁ (referans basınç)</span>
            <input
              inputMode="decimal"
              type="text"
              value={p1Input}
              onChange={(event) => setP1Input(event.target.value)}
            />
          </label>

          <label className="category-general-converter-field">
            <span>T₁ (referans sıcaklık)</span>
            <input
              inputMode="decimal"
              type="text"
              value={t1Input}
              onChange={(event) => setT1Input(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>T₁ Birimi</span>
            <select
              value={t1Unit}
              onChange={(event) => setT1Unit(event.target.value)}
            >
              {tempUnits.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>

          {target !== "p2" && (
            <label className="category-general-converter-field">
              <span>P₂</span>
              <input
                inputMode="decimal"
                type="text"
                value={p2Input}
                onChange={(event) => setP2Input(event.target.value)}
              />
            </label>
          )}

          {target !== "t2" && (
            <>
              <label className="category-general-converter-field">
                <span>T₂</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={t2Input}
                  onChange={(event) => setT2Input(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>T₂ Birimi</span>
                <select
                  value={t2Unit}
                  onChange={(event) => setT2Unit(event.target.value)}
                >
                  {tempUnits.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {target !== "dHvap" && (
            <>
              <label className="category-general-converter-field">
                <span>Madde (ön ayar, opsiyonel)</span>
                <select
                  value={dHvapId}
                  onChange={(event) => applyDHvap(event.target.value)}
                >
                  {dHvapPresets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="category-general-converter-field">
                <span>ΔHvap (kJ/mol)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={dHvapInput}
                  onChange={(event) => {
                    setDHvapInput(event.target.value);
                    setDHvapId("custom");
                  }}
                />
              </label>
            </>
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
              <span>P₂</span>
              <strong>{formatNumber(result.p2)}</strong>
            </div>
            <div>
              <span>T₂</span>
              <strong>
                {formatNumber(fromKelvin(result.t2Kelvin, t2Unit))} {t2Unit}
              </strong>
            </div>
            <div>
              <span>ΔHvap</span>
              <strong>
                {formatNumber(result.dHvapJoulePerMol / 1000)} kJ/mol
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
