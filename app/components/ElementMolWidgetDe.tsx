"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import { calculateMol, type MolTarget } from "../converter/molCalculator";

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

  return value.toLocaleString("de-DE", { maximumFractionDigits });
}

function formatScientific(value: number) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

export default function ElementMolWidgetDe({
  elementName,
  atomicMass,
}: {
  elementName: string;
  atomicMass: number;
}) {
  const [target, setTarget] = useState<MolTarget>("moles");
  const [massValue, setMassValue] = useState("10");
  const [massUnit, setMassUnit] = useState("g");
  const [moles, setMoles] = useState("1");

  const massGrams = useMemo(() => {
    const value = parseNumericValue(massValue);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("kutle", value, massUnit, "g");
  }, [massValue, massUnit]);

  const result = useMemo(
    () =>
      calculateMol({
        target,
        molarMass: atomicMass,
        massGrams,
        moles: parseNumericValue(moles),
      }),
    [target, atomicMass, massGrams, moles]
  );

  const resultMassInSelectedUnit = useMemo(() => {
    if (!result) {
      return Number.NaN;
    }

    return convert("kutle", result.massGrams, "g", massUnit);
  }, [result, massUnit]);

  return (
    <aside className="category-general-converter element-mol-widget">
      <h2>Stoffmengenrechner für {elementName}</h2>
      <p>
        Die molare Masse von {elementName} beträgt{" "}
        <strong>{formatNumber(atomicMass, 3)} g/mol</strong>. Gib unten
        eine Masse oder Stoffmenge ein, um den entsprechenden Wert sofort
        zu berechnen.
      </p>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Was möchtest du berechnen?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "moles" ? " is-active" : ""}`}
              onClick={() => setTarget("moles")}
            >
              Stoffmenge (aus Masse)
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Masse (aus Stoffmenge)
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "moles" ? (
            <>
              <label className="category-general-converter-field">
                <span>Masse</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={massValue}
                  onChange={(event) => setMassValue(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Einheit</span>
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
          ) : (
            <>
              <label className="category-general-converter-field">
                <span>Stoffmenge (mol)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={moles}
                  onChange={(event) => setMoles(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ergebniseinheit</span>
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
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Gib einen gültigen Wert ein, um das Ergebnis zu sehen.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Stoffmenge</span>
              <strong>{formatNumber(result.moles)} mol</strong>
            </div>
            <div>
              <span>Masse</span>
              <strong>
                {formatNumber(resultMassInSelectedUnit)} {massUnit}
              </strong>
            </div>
            <div>
              <span>Teilchenzahl</span>
              <strong>{formatScientific(result.particleCount)}</strong>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
