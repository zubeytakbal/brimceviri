"use client";

import { useMemo, useState } from "react";
import {
  areaUnitDefinitions,
  forceUnitDefinitions,
  pressureUnitDefinitions,
  type AreaUnit,
  type ForceUnit,
  type PressureUnit,
} from "../../converter/engineeringUnits";
import {
  areaUnitNamesUz,
  forceUnitNamesUz,
  pressureUnitNamesUz,
} from "../../converter/pressureForceAreaUnitNamesUz";
import {
  formatUzValue,
  solvePressureForceAreaUz,
  type CalculationTargetUz,
} from "../../converter/pressureForceAreaUz";

type PressureForceAreaCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  pressure: "Bosimni hisoblash",
  force: "Kuchni hisoblash",
  area: "Maydonni hisoblash",
  pressureValue: "Bosim",
  forceValue: "Kuch",
  areaValue: "Maydon",
  formula: "O'rniga qo'yilgan formula",
  clear: "Qiymatlarni tozalash",
  resultLive: "Hisoblash natijasi",
  resultPlaceholder: "Natija shu yerda ko'rinadi",
  automaticResultUnit: "Avtomatik natija birligi",
  compositeExpression: "Qo'shma ifoda",
  siEquivalent: "SI ekvivalenti",
};

export default function PressureForceAreaCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: PressureForceAreaCalculatorUzProps) {
  const [target, setTarget] = useState<CalculationTargetUz>("pressure");
  const [pressureValue, setPressureValue] = useState("100000");
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>("Pa");
  const [forceValue, setForceValue] = useState("1000");
  const [forceUnit, setForceUnit] = useState<ForceUnit>("N");
  const [areaValue, setAreaValue] = useState("0.01");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m²");

  const result = useMemo(
    () =>
      solvePressureForceAreaUz({
        target,
        pressureValue,
        pressureUnit,
        forceValue,
        forceUnit,
        areaValue,
        areaUnit,
      }),
    [target, pressureValue, pressureUnit, forceValue, forceUnit, areaValue, areaUnit]
  );

  function resetValues() {
    setPressureValue("");
    setPressureUnit("Pa");
    setForceValue("");
    setForceUnit("N");
    setAreaValue("");
    setAreaUnit("m²");
  }

  function renderPressureOptions() {
    return pressureUnitDefinitions.map((unit) => (
      <option key={unit.symbol} value={unit.symbol}>
        {pressureUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
      </option>
    ));
  }

  function renderForceOptions() {
    return forceUnitDefinitions.map((unit) => (
      <option key={unit.symbol} value={unit.symbol}>
        {forceUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
      </option>
    ));
  }

  function renderAreaOptions() {
    return areaUnitDefinitions.map((unit) => (
      <option key={unit.symbol} value={unit.symbol}>
        {areaUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
      </option>
    ));
  }

  function renderInputField(field: "pressure" | "force" | "area") {
    if (field === "pressure") {
      return (
        <label className="engineering-field">
          <span>{copy.pressureValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={pressureValue}
              onChange={(event) => setPressureValue(event.target.value)}
            />
            <select
              value={pressureUnit}
              onChange={(event) => setPressureUnit(event.target.value as PressureUnit)}
            >
              {renderPressureOptions()}
            </select>
          </div>
        </label>
      );
    }

    if (field === "force") {
      return (
        <label className="engineering-field">
          <span>{copy.forceValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={forceValue}
              onChange={(event) => setForceValue(event.target.value)}
            />
            <select
              value={forceUnit}
              onChange={(event) => setForceUnit(event.target.value as ForceUnit)}
            >
              {renderForceOptions()}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{copy.areaValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={areaValue}
            onChange={(event) => setAreaValue(event.target.value)}
          />
          <select
            value={areaUnit}
            onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}
          >
            {renderAreaOptions()}
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
      ? copy.pressureValue
      : target === "force"
        ? copy.forceValue
        : copy.areaValue;

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">{description}</p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{copy.targetLabel}</span>

              <div className="engineering-target-grid">
                {(
                  [
                    ["pressure", copy.pressure],
                    ["force", copy.force],
                    ["area", copy.area],
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
          aria-label={copy.resultLive}
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
                    : result.resultDisplay || copy.resultPlaceholder}
              </output>
            </div>
          </label>

          {!result.error && result.resultValue !== null && (
            <p className="engineering-si-note">
              {copy.automaticResultUnit}: {result.resultUnit}
            </p>
          )}

          {!result.error && result.compositeValue !== null && (
            <p className="engineering-si-note">
              {copy.compositeExpression}: {result.compositeDisplay} {result.compositeUnit}
            </p>
          )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.resultValue !== null ? (
            <div className="engineering-formula-box">
              <strong>{copy.formula}</strong>
              <p>{result.formulaDisplay}</p>
            </div>
          ) : null}

          {!result.error && result.siValue !== null && (
            <p className="engineering-si-note">
              {copy.siEquivalent}: {formatUzValue(result.siValue)} {result.siUnit}
            </p>
          )}

          <button
            type="button"
            className="engineering-clear-button"
            onClick={resetValues}
          >
            {copy.clear}
          </button>
        </div>
      </div>
    </section>
  );
}
