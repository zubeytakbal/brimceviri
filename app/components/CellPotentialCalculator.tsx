"use client";

import { useMemo, useState } from "react";
import { calculateCellPotential } from "../converter/cellPotentialCalculator";

const electrodePresets = [
  { id: "custom", label: "Özel değer", potential: "" },
  { id: "li", label: "Li⁺ / Li", potential: "-3.04" },
  { id: "k", label: "K⁺ / K", potential: "-2.93" },
  { id: "ca", label: "Ca²⁺ / Ca", potential: "-2.87" },
  { id: "na", label: "Na⁺ / Na", potential: "-2.71" },
  { id: "mg", label: "Mg²⁺ / Mg", potential: "-2.37" },
  { id: "al", label: "Al³⁺ / Al", potential: "-1.66" },
  { id: "zn", label: "Zn²⁺ / Zn", potential: "-0.76" },
  { id: "fe", label: "Fe²⁺ / Fe", potential: "-0.44" },
  { id: "ni", label: "Ni²⁺ / Ni", potential: "-0.25" },
  { id: "sn", label: "Sn²⁺ / Sn", potential: "-0.14" },
  { id: "pb", label: "Pb²⁺ / Pb", potential: "-0.13" },
  { id: "h", label: "H⁺ / H₂ (referans)", potential: "0.00" },
  { id: "cu", label: "Cu²⁺ / Cu", potential: "0.34" },
  { id: "ag", label: "Ag⁺ / Ag", potential: "0.80" },
  { id: "au", label: "Au³⁺ / Au", potential: "1.50" },
  { id: "f", label: "F₂ / F⁻", potential: "2.87" },
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

export default function CellPotentialCalculator() {
  const [katotId, setKatotId] = useState("cu");
  const [katotInput, setKatotInput] = useState("0.34");
  const [anotId, setAnotId] = useState("zn");
  const [anotInput, setAnotInput] = useState("-0.76");

  function applyKatot(id: string) {
    setKatotId(id);
    const preset = electrodePresets.find((item) => item.id === id);
    if (preset && preset.potential) {
      setKatotInput(preset.potential);
    }
  }

  function applyAnot(id: string) {
    setAnotId(id);
    const preset = electrodePresets.find((item) => item.id === id);
    if (preset && preset.potential) {
      setAnotInput(preset.potential);
    }
  }

  const result = useMemo(
    () =>
      calculateCellPotential(
        parseNumericValue(katotInput),
        parseNumericValue(anotInput)
      ),
    [katotInput, anotInput]
  );

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    return [
      {
        title: "1. Adım — Hücre potansiyeli",
        lines: [
          "E°hücre = E°katot - E°anot",
          `E°hücre = ${formatNumber(result.eKatot, 2)} V - (${formatNumber(result.eAnot, 2)} V)`,
          `E°hücre ≈ ${formatNumber(result.eHucre, 2)} V`,
        ],
      },
    ];
  }, [result]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: katot ve anot için indirgenme yarı tepkimesini
          (veya standart potansiyelini) seç ya da elle gir — hücre
          potansiyelini ve tepkimenin kendiliğinden olup olmadığını
          bulalım.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Katot (indirgenme, ön ayar)</span>
            <select value={katotId} onChange={(event) => applyKatot(event.target.value)}>
              {electrodePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>E°katot (V)</span>
            <input
              inputMode="decimal"
              type="text"
              value={katotInput}
              onChange={(event) => {
                setKatotInput(event.target.value);
                setKatotId("custom");
              }}
            />
          </label>

          <label className="category-general-converter-field">
            <span>Anot (indirgenme, ön ayar)</span>
            <select value={anotId} onChange={(event) => applyAnot(event.target.value)}>
              {electrodePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>E°anot (V)</span>
            <input
              inputMode="decimal"
              type="text"
              value={anotInput}
              onChange={(event) => {
                setAnotInput(event.target.value);
                setAnotId("custom");
              }}
            />
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
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>E°hücre</span>
                <strong>{formatNumber(result.eHucre, 2)} V</strong>
              </div>
              <div>
                <span>E°katot</span>
                <strong>{formatNumber(result.eKatot, 2)} V</strong>
              </div>
              <div>
                <span>E°anot</span>
                <strong>{formatNumber(result.eAnot, 2)} V</strong>
              </div>
            </div>
            <p
              className="ph-classification"
              data-classification={result.kendiliginden ? "bazik" : "asidik"}
            >
              {result.kendiliginden
                ? "Kendiliğinden (galvanik pil)"
                : "Kendiliğinden değil (elektroliz gerekir)"}
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
