"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import {
  calculateTitration,
  type TitrationTarget,
} from "../converter/titrationCalculator";

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

const targetLabels: Record<TitrationTarget, string> = {
  ca: "Cₐ (asit derişimi)",
  va: "Vₐ (asit hacmi)",
  cb: "Cb (baz derişimi)",
  vb: "Vb (baz hacmi)",
};

export default function TitrationCalculator() {
  const [target, setTarget] = useState<TitrationTarget>("cb");
  const [caInput, setCaInput] = useState("0.1");
  const [vaInput, setVaInput] = useState("25");
  const [cbInput, setCbInput] = useState("0.1");
  const [vbInput, setVbInput] = useState("25");
  const [asitDegerlikInput, setAsitDegerlikInput] = useState("1");
  const [bazDegerlikInput, setBazDegerlikInput] = useState("1");
  const [volumeUnit, setVolumeUnit] = useState("mL");

  const vaLitre = useMemo(() => {
    const value = parseNumericValue(vaInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("hacim", value, volumeUnit, "L");
  }, [vaInput, volumeUnit]);

  const vbLitre = useMemo(() => {
    const value = parseNumericValue(vbInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("hacim", value, volumeUnit, "L");
  }, [vbInput, volumeUnit]);

  const result = useMemo(
    () =>
      calculateTitration({
        target,
        ca: parseNumericValue(caInput),
        va: vaLitre,
        cb: parseNumericValue(cbInput),
        vb: vbLitre,
        asitDegerlik: parseNumericValue(asitDegerlikInput),
        bazDegerlik: parseNumericValue(bazDegerlikInput),
      }),
    [target, caInput, vaLitre, cbInput, vbLitre, asitDegerlikInput, bazDegerlikInput]
  );

  function volumeInSelectedUnit(litreValue: number) {
    return convert("hacim", litreValue, "L", volumeUnit);
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "ca") {
      return [
        {
          title: "1. Adım — Cₐ (asit derişimi)",
          lines: [
            "Cₐ = (Cb × Vb × baz değerliği) / (Vₐ × asit değerliği)",
            `Cₐ = (${formatNumber(result.cb)} × ${formatNumber(result.vb)} L × ${result.bazDegerlik}) / (${formatNumber(result.va)} L × ${result.asitDegerlik})`,
            `Cₐ ≈ ${formatNumber(result.ca)} mol/L`,
          ],
        },
      ];
    }

    if (target === "va") {
      return [
        {
          title: "1. Adım — Vₐ (asit hacmi)",
          lines: [
            "Vₐ = (Cb × Vb × baz değerliği) / (Cₐ × asit değerliği)",
            `Vₐ = (${formatNumber(result.cb)} × ${formatNumber(result.vb)} L × ${result.bazDegerlik}) / (${formatNumber(result.ca)} × ${result.asitDegerlik})`,
            `Vₐ ≈ ${formatNumber(result.va)} L`,
          ],
        },
      ];
    }

    if (target === "cb") {
      return [
        {
          title: "1. Adım — Cb (baz derişimi)",
          lines: [
            "Cb = (Cₐ × Vₐ × asit değerliği) / (Vb × baz değerliği)",
            `Cb = (${formatNumber(result.ca)} × ${formatNumber(result.va)} L × ${result.asitDegerlik}) / (${formatNumber(result.vb)} L × ${result.bazDegerlik})`,
            `Cb ≈ ${formatNumber(result.cb)} mol/L`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Vb (baz hacmi)",
        lines: [
          "Vb = (Cₐ × Vₐ × asit değerliği) / (Cb × baz değerliği)",
          `Vb = (${formatNumber(result.ca)} × ${formatNumber(result.va)} L × ${result.asitDegerlik}) / (${formatNumber(result.cb)} × ${result.bazDegerlik})`,
          `Vb ≈ ${formatNumber(result.vb)} L`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin üç değeri gir, eksik olanı biz bulalım.
          Tek değerlikli asit/baz (HCl, NaOH gibi) kullanıyorsan "değerlik"
          alanlarını 1 olarak bırakabilirsin.
        </p>
        <div className="engineering-targets">
          <span>Hangi değeri hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as TitrationTarget[]).map((key) => (
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
          {target !== "ca" && (
            <label className="category-general-converter-field">
              <span>Cₐ, asit derişimi (mol/L)</span>
              <input
                inputMode="decimal"
                type="text"
                value={caInput}
                onChange={(event) => setCaInput(event.target.value)}
              />
            </label>
          )}

          {target !== "va" && (
            <label className="category-general-converter-field">
              <span>Vₐ, asit hacmi ({volumeUnit})</span>
              <input
                inputMode="decimal"
                type="text"
                value={vaInput}
                onChange={(event) => setVaInput(event.target.value)}
              />
            </label>
          )}

          {target !== "cb" && (
            <label className="category-general-converter-field">
              <span>Cb, baz derişimi (mol/L)</span>
              <input
                inputMode="decimal"
                type="text"
                value={cbInput}
                onChange={(event) => setCbInput(event.target.value)}
              />
            </label>
          )}

          {target !== "vb" && (
            <label className="category-general-converter-field">
              <span>Vb, baz hacmi ({volumeUnit})</span>
              <input
                inputMode="decimal"
                type="text"
                value={vbInput}
                onChange={(event) => setVbInput(event.target.value)}
              />
            </label>
          )}

          <label className="category-general-converter-field">
            <span>Asit değerliği (H⁺ sayısı)</span>
            <input
              inputMode="decimal"
              type="text"
              value={asitDegerlikInput}
              onChange={(event) => setAsitDegerlikInput(event.target.value)}
            />
          </label>

          <label className="category-general-converter-field">
            <span>Baz değerliği (OH⁻ sayısı)</span>
            <input
              inputMode="decimal"
              type="text"
              value={bazDegerlikInput}
              onChange={(event) => setBazDegerlikInput(event.target.value)}
            />
          </label>

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
              <span>Cₐ, asit derişimi</span>
              <strong>{formatNumber(result.ca)} mol/L</strong>
            </div>
            <div>
              <span>Vₐ, asit hacmi</span>
              <strong>
                {formatNumber(volumeInSelectedUnit(result.va))} {volumeUnit}
              </strong>
            </div>
            <div>
              <span>Cb, baz derişimi</span>
              <strong>{formatNumber(result.cb)} mol/L</strong>
            </div>
            <div>
              <span>Vb, baz hacmi</span>
              <strong>
                {formatNumber(volumeInSelectedUnit(result.vb))} {volumeUnit}
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
