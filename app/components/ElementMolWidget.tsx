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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

function formatScientific(value: number) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

export default function ElementMolWidget({
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
      <h2>{elementName} İçin Mol Hesaplama</h2>
      <p>
        {elementName} elementinin molar kütlesi{" "}
        <strong>{formatNumber(atomicMass, 3)} g/mol</strong>. Aşağıya kütle
        veya mol sayısı girerek anında karşılığını hesaplayabilirsin.
      </p>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "moles" ? " is-active" : ""}`}
              onClick={() => setTarget("moles")}
            >
              Mol Sayısı (kütleden)
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Kütle (mol sayısından)
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "moles" ? (
            <>
              <label className="category-general-converter-field">
                <span>Kütle</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={massValue}
                  onChange={(event) => setMassValue(event.target.value)}
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
          ) : (
            <>
              <label className="category-general-converter-field">
                <span>Mol Sayısı</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={moles}
                  onChange={(event) => setMoles(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Sonuç Birimi</span>
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
          <strong>Geçerli bir değer girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Mol Sayısı</span>
              <strong>{formatNumber(result.moles)} mol</strong>
            </div>
            <div>
              <span>Kütle</span>
              <strong>
                {formatNumber(resultMassInSelectedUnit)} {massUnit}
              </strong>
            </div>
            <div>
              <span>Parçacık Sayısı</span>
              <strong>{formatScientific(result.particleCount)}</strong>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
