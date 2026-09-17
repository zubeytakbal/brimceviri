"use client";

import { useMemo, useState } from "react";
import type {
  CurrentUnit,
  ResistanceUnit,
  VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import { solveOhmsLawUz, formatUzValue } from "../../converter/ohmsLawUz";
import type { OhmsLawTarget } from "../../converter/ohmsLaw";

type OhmsLawCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const voltageUnitLabels: Record<VoltageUnit, string> = {
  mV: "Milivolt (mV)",
  V: "Volt (V)",
  kV: "Kilovolt (kV)",
};

const currentUnitLabels: Record<CurrentUnit, string> = {
  mA: "Miliamper (mA)",
  A: "Amper (A)",
  kA: "Kiloamper (kA)",
};

const resistanceUnitLabels: Record<ResistanceUnit, string> = {
  "Ω": "Om (Ω)",
  "kΩ": "Kilo-om (kΩ)",
  "MΩ": "Mega-om (MΩ)",
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  voltage: "Kuchlanishni hisoblash",
  current: "Tokni hisoblash",
  resistance: "Qarshilikni hisoblash",
  voltageValue: "Kuchlanish",
  currentValue: "Tok",
  resistanceValue: "Qarshilik",
  resultLive: "Hisoblash natijasi",
  automaticResultUnit: "Avtomatik natija birligi",
  formula: "O'rniga qo'yilgan formula",
  siEquivalent: "SI ekvivalenti",
  clear: "Qiymatlarni tozalash",
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function OhmsLawCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: OhmsLawCalculatorUzProps) {
  const [target, setTarget] = useState<OhmsLawTarget>("voltage");
  const [voltageValue, setVoltageValue] = useState("");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [currentValue, setCurrentValue] = useState("2");
  const [currentUnit, setCurrentUnit] = useState<CurrentUnit>("A");
  const [resistanceValue, setResistanceValue] = useState("10");
  const [resistanceUnit, setResistanceUnit] = useState<ResistanceUnit>("Ω");

  const result = useMemo(
    () =>
      solveOhmsLawUz({
        target,
        voltageValue,
        voltageUnit,
        currentValue,
        currentUnit,
        resistanceValue,
        resistanceUnit,
      }),
    [
      target,
      voltageValue,
      voltageUnit,
      currentValue,
      currentUnit,
      resistanceValue,
      resistanceUnit,
    ]
  );

  function resetValues() {
    setTarget("voltage");
    setVoltageValue("");
    setVoltageUnit("V");
    setCurrentValue("2");
    setCurrentUnit("A");
    setResistanceValue("10");
    setResistanceUnit("Ω");
  }

  function renderField(field: "voltage" | "current" | "resistance") {
    if (field === "voltage") {
      return (
        <label className="engineering-field">
          <span>{copy.voltageValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={voltageValue}
              onChange={(event) => setVoltageValue(event.target.value)}
            />
            <select
              value={voltageUnit}
              onChange={(event) =>
                setVoltageUnit(event.target.value as VoltageUnit)
              }
            >
              {(Object.keys(voltageUnitLabels) as VoltageUnit[]).map(
                (unit) => (
                  <option key={unit} value={unit}>
                    {voltageUnitLabels[unit]}
                  </option>
                )
              )}
            </select>
          </div>
        </label>
      );
    }

    if (field === "current") {
      return (
        <label className="engineering-field">
          <span>{copy.currentValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
            />
            <select
              value={currentUnit}
              onChange={(event) =>
                setCurrentUnit(event.target.value as CurrentUnit)
              }
            >
              {(Object.keys(currentUnitLabels) as CurrentUnit[]).map(
                (unit) => (
                  <option key={unit} value={unit}>
                    {currentUnitLabels[unit]}
                  </option>
                )
              )}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{copy.resistanceValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={resistanceValue}
            onChange={(event) => setResistanceValue(event.target.value)}
          />
          <select
            value={resistanceUnit}
            onChange={(event) =>
              setResistanceUnit(event.target.value as ResistanceUnit)
            }
          >
            {(Object.keys(resistanceUnitLabels) as ResistanceUnit[]).map(
              (unit) => (
                <option key={unit} value={unit}>
                  {resistanceUnitLabels[unit]}
                </option>
              )
            )}
          </select>
        </div>
      </label>
    );
  }

  const visibleFields =
    target === "voltage"
      ? (["current", "resistance"] as const)
      : target === "current"
        ? (["voltage", "resistance"] as const)
        : (["voltage", "current"] as const);

  const resultLabel =
    target === "voltage"
      ? copy.voltageValue
      : target === "current"
        ? copy.currentValue
        : copy.resistanceValue;

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

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["voltage", copy.voltage],
                    ["current", copy.current],
                    ["resistance", copy.resistance],
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
              {visibleFields.map((field) => (
                <div key={field}>{renderField(field)}</div>
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
                  ? "-"
                  : result.resultValue !== null
                    ? formatResultText(result.resultDisplay, result.resultUnit)
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.resultValue !== null && (
            <p className="engineering-si-note">
              {copy.automaticResultUnit}: {result.resultUnit}
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
              {copy.siEquivalent}: {formatUzValue(result.siValue)}{" "}
              {result.siUnit}
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
