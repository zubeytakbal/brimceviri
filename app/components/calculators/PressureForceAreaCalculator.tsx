"use client";

import { useMemo, useState } from "react";
import {
  formatEngineeringUnitName,
  getEngineeringUnitGroups,
  type AreaUnit,
  type ForceUnit,
  type PressureUnit,
} from "../../converter/engineeringUnits";
import {
  formatEngineeringValue,
  solvePressureForceArea,
  type CalculationTarget,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type PressureForceAreaCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  tr: {
    targetLabel: "Hesaplama hedefi",
    pressure: "Basıncı hesapla",
    force: "Kuvveti hesapla",
    area: "Alanı hesapla",
    pressureValue: "Basınç",
    forceValue: "Kuvvet",
    areaValue: "Alan",
    result: "Sonuç",
    formula: "Yerine koyulmuş formül",
    clear: "Değerleri temizle",
    resultLive: "Hesaplama sonucu",
    resultPlaceholder: "Sonuç burada görünecek",
    automaticResultUnit: "Otomatik sonuç birimi",
    compositeExpression: "Bileşik ifade",
    siEquivalent: "SI eşdeğeri",
  },
  en: {
    targetLabel: "Calculation target",
    pressure: "Calculate pressure",
    force: "Calculate force",
    area: "Calculate area",
    pressureValue: "Pressure",
    forceValue: "Force",
    areaValue: "Area",
    result: "Result",
    formula: "Substituted formula",
    clear: "Clear values",
    resultLive: "Calculation result",
    resultPlaceholder: "The result will appear here",
    automaticResultUnit: "Automatic result unit",
    compositeExpression: "Composite expression",
    siEquivalent: "SI equivalent",
  },
  de: {
    targetLabel: "Berechnungsziel",
    pressure: "Druck berechnen",
    force: "Kraft berechnen",
    area: "Fläche berechnen",
    pressureValue: "Druck",
    forceValue: "Kraft",
    areaValue: "Fläche",
    result: "Ergebnis",
    formula: "Eingesetzte Formel",
    clear: "Werte zurücksetzen",
    resultLive: "Berechnungsergebnis",
    resultPlaceholder: "Das Ergebnis erscheint hier",
    automaticResultUnit: "Automatische Ergebniseinheit",
    compositeExpression: "Zusammengesetzter Ausdruck",
    siEquivalent: "SI-Äquivalent",
  },
} as const;

export default function PressureForceAreaCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: PressureForceAreaCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] =
    useState<CalculationTarget>("pressure");
  const [pressureValue, setPressureValue] = useState("100000");
  const [pressureUnit, setPressureUnit] =
    useState<PressureUnit>("Pa");
  const [forceValue, setForceValue] = useState("1000");
  const [forceUnit, setForceUnit] = useState<ForceUnit>("N");
  const [areaValue, setAreaValue] = useState("0.01");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m²");

  const groupedUnits = useMemo(
    () => ({
      pressure: getEngineeringUnitGroups("pressure", locale),
      force: getEngineeringUnitGroups("force", locale),
      area: getEngineeringUnitGroups("area", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solvePressureForceArea({
        target,
        pressureValue,
        pressureUnit,
        forceValue,
        forceUnit,
        areaValue,
        areaUnit,
        locale,
      }),
    [
      target,
      pressureValue,
      pressureUnit,
      forceValue,
      forceUnit,
      areaValue,
      areaUnit,
      locale,
    ]
  );

  function resetValues() {
    setPressureValue("");
    setPressureUnit("Pa");
    setForceValue("");
    setForceUnit("N");
    setAreaValue("");
    setAreaUnit("m²");
  }

  function renderUnitOptions(
    quantity: "pressure" | "force" | "area"
  ) {
    return groupedUnits[quantity].map((group) => (
      <optgroup label={group.label} key={group.group}>
        {group.units.map((unit) => (
          <option key={unit.symbol} value={unit.symbol}>
            {formatEngineeringUnitName(unit, locale)}
          </option>
        ))}
      </optgroup>
    ));
  }

  function renderInputField(
    field: "pressure" | "force" | "area"
  ) {
    if (field === "pressure") {
      return (
        <label className="engineering-field">
          <span>{strings.pressureValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={pressureValue}
              onChange={(event) =>
                setPressureValue(event.target.value)
              }
            />
            <select
              value={pressureUnit}
              onChange={(event) =>
                setPressureUnit(
                  event.target.value as PressureUnit
                )
              }
            >
              {renderUnitOptions("pressure")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "force") {
      return (
        <label className="engineering-field">
          <span>{strings.forceValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={forceValue}
              onChange={(event) =>
                setForceValue(event.target.value)
              }
            />
            <select
              value={forceUnit}
              onChange={(event) =>
                setForceUnit(
                  event.target.value as ForceUnit
                )
              }
            >
              {renderUnitOptions("force")}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{strings.areaValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={areaValue}
            onChange={(event) =>
              setAreaValue(event.target.value)
            }
          />
          <select
            value={areaUnit}
            onChange={(event) =>
              setAreaUnit(event.target.value as AreaUnit)
            }
          >
            {renderUnitOptions("area")}
          </select>
        </div>
      </label>
    );
  }

  const requiredFields =
    target === "pressure"
      ? (["force", "area"] as const)
      : target === "force"
        ? (["pressure", "area"] as const)
        : (["force", "pressure"] as const);

  const resultLabel =
    target === "pressure"
      ? strings.pressureValue
      : target === "force"
        ? strings.forceValue
        : strings.areaValue;

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">
            {description}
          </p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{strings.targetLabel}</span>

              <div className="engineering-target-grid">
                {(
                  [
                    ["pressure", strings.pressure],
                    ["force", strings.force],
                    ["area", strings.area],
                  ] as const
                ).map(([option, label]) => (
                  <button
                    type="button"
                    key={option}
                    className={`engineering-target-button${
                      target === option ? " is-active" : ""
                    }`}
                    onClick={() => setTarget(option)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="engineering-inputs">
              {requiredFields.map((field) => (
                <div key={field}>{renderInputField(field)}</div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="conversion-hero-information engineering-result-panel"
          aria-live="polite"
          aria-label={strings.resultLive}
        >
          <h2>{resultHeading}</h2>

          <label className="engineering-field">
            <span>{resultLabel}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "—"
                  : result.resultValue !== null
                    ? `${result.resultDisplay} ${result.resultUnit}`
                    : result.resultDisplay ||
                    strings.resultPlaceholder}
              </output>
            </div>
          </label>

          {!result.error && result.resultValue !== null && (
            <p className="engineering-si-note">
              {strings.automaticResultUnit}: {result.resultUnit}
            </p>
          )}

          {!result.error && result.compositeValue !== null && (
            <p className="engineering-si-note">
              {strings.compositeExpression}:{" "}
              {result.compositeDisplay} {result.compositeUnit}
            </p>
          )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.resultValue !== null ? (
            <div className="engineering-formula-box">
              <strong>{strings.formula}</strong>
              <p>{result.formulaDisplay}</p>
            </div>
          ) : null}

          {!result.error && result.siValue !== null && (
            <p className="engineering-si-note">
              {strings.siEquivalent}:{" "}
              {formatEngineeringValue(
                result.siValue,
                locale
              )}{" "}
              {result.siUnit}
            </p>
          )}

          <button
            type="button"
            className="engineering-clear-button"
            onClick={resetValues}
          >
            {strings.clear}
          </button>
        </div>
      </div>
    </section>
  );
}
