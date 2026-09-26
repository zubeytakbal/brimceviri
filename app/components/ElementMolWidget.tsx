"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import { calculateMol, type MolTarget } from "../converter/molCalculator";
import { numberLocales, type ContentLocale } from "./contentLocale";

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

function formatNumber(value: number, locale: ContentLocale, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits });
}

function formatScientific(value: number, locale: ContentLocale) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  return `${formatNumber(mantissa, locale, 3)} × 10^${exponent}`;
}

const copy = {
  tr: {
    title: (name: string) => `${name} İçin Mol Hesaplama`,
    intro: (name: string, molarMass: string) => (
      <>
        {name} elementinin molar kütlesi{" "}
        <strong>{molarMass} g/mol</strong>. Aşağıya kütle
        veya mol sayısı girerek anında karşılığını hesaplayabilirsin.
      </>
    ),
    targetLabel: "Neyi hesaplamak istiyorsun?",
    molesFromMass: "Mol Sayısı (kütleden)",
    massFromMoles: "Kütle (mol sayısından)",
    mass: "Kütle",
    unit: "Birim",
    molesInput: "Mol Sayısı",
    resultUnit: "Sonuç Birimi",
    invalid: "Geçerli bir değer girerek sonucu görebilirsin.",
    moles: "Mol Sayısı",
    particles: "Parçacık Sayısı",
  },
  de: {
    title: (name: string) => `Stoffmengenrechner für ${name}`,
    intro: (name: string, molarMass: string) => (
      <>
        Die molare Masse von {name} beträgt{" "}
        <strong>{molarMass} g/mol</strong>. Gib unten
        eine Masse oder Stoffmenge ein, um den entsprechenden Wert sofort
        zu berechnen.
      </>
    ),
    targetLabel: "Was möchtest du berechnen?",
    molesFromMass: "Stoffmenge (aus Masse)",
    massFromMoles: "Masse (aus Stoffmenge)",
    mass: "Masse",
    unit: "Einheit",
    molesInput: "Stoffmenge (mol)",
    resultUnit: "Ergebniseinheit",
    invalid: "Gib einen gültigen Wert ein, um das Ergebnis zu sehen.",
    moles: "Stoffmenge",
    particles: "Teilchenzahl",
  },
};

export default function ElementMolWidget({
  elementName,
  atomicMass,
  locale = "tr",
}: {
  elementName: string;
  atomicMass: number;
  locale?: ContentLocale;
}) {
  const t = copy[locale];
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
      <h2>{t.title(elementName)}</h2>
      <p>{t.intro(elementName, formatNumber(atomicMass, locale, 3))}</p>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{t.targetLabel}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "moles" ? " is-active" : ""}`}
              onClick={() => setTarget("moles")}
            >
              {t.molesFromMass}
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              {t.massFromMoles}
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "moles" ? (
            <>
              <label className="category-general-converter-field">
                <span>{t.mass}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={massValue}
                  onChange={(event) => setMassValue(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{t.unit}</span>
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
                <span>{t.molesInput}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={moles}
                  onChange={(event) => setMoles(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{t.resultUnit}</span>
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
          <strong>{t.invalid}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{t.moles}</span>
              <strong>{formatNumber(result.moles, locale)} mol</strong>
            </div>
            <div>
              <span>{t.mass}</span>
              <strong>
                {formatNumber(resultMassInSelectedUnit, locale)} {massUnit}
              </strong>
            </div>
            <div>
              <span>{t.particles}</span>
              <strong>{formatScientific(result.particleCount, locale)}</strong>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
