"use client";

import { useMemo, useState } from "react";
import {
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type CurrentUnit,
  type ResistanceUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveOhmsLaw,
  type OhmsLawTarget,
} from "../../converter/ohmsLaw";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type OhmsLawCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  tr: {
    targetLabel: "Hesaplama hedefi",
    voltage: "Gerilimi hesapla",
    current: "Akımı hesapla",
    resistance: "Direnci hesapla",
    voltageValue: "Gerilim",
    currentValue: "Akım",
    resistanceValue: "Direnç",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuç birimi",
    formula: "Yerine koyulmuş formül",
    siEquivalent: "SI eşdeğeri",
    clear: "Değerleri temizle",
  },
  en: {
    targetLabel: "Calculation target",
    voltage: "Calculate voltage",
    current: "Calculate current",
    resistance: "Calculate resistance",
    voltageValue: "Voltage",
    currentValue: "Current",
    resistanceValue: "Resistance",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    clear: "Clear values",
  },
  de: {
    targetLabel: "Berechnungsziel",
    voltage: "Spannung berechnen",
    current: "Strom berechnen",
    resistance: "Widerstand berechnen",
    voltageValue: "Spannung",
    currentValue: "Strom",
    resistanceValue: "Widerstand",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Äquivalent",
    clear: "Werte zurücksetzen",
  },
} as const;

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function OhmsLawCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: OhmsLawCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] = useState<OhmsLawTarget>("voltage");
  const [voltageValue, setVoltageValue] = useState("");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [currentValue, setCurrentValue] = useState("2");
  const [currentUnit, setCurrentUnit] = useState<CurrentUnit>("A");
  const [resistanceValue, setResistanceValue] = useState("10");
  const [resistanceUnit, setResistanceUnit] =
    useState<ResistanceUnit>("Ω");

  const groupedUnits = useMemo(
    () => ({
      voltage: getCalculatorUnitGroups("voltage", locale),
      current: getCalculatorUnitGroups("current", locale),
      resistance: getCalculatorUnitGroups("resistance", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveOhmsLaw({
        target,
        voltageValue,
        voltageUnit,
        currentValue,
        currentUnit,
        resistanceValue,
        resistanceUnit,
        locale,
      }),
    [
      target,
      voltageValue,
      voltageUnit,
      currentValue,
      currentUnit,
      resistanceValue,
      resistanceUnit,
      locale,
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

  function renderUnitOptions(
    quantity: "voltage" | "current" | "resistance"
  ) {
    return groupedUnits[quantity].map((group) => (
      <optgroup label={group.label} key={group.group}>
        {group.units.map((unit) => (
          <option key={unit.symbol} value={unit.symbol}>
            {formatCalculatorUnitName(unit, locale)}
          </option>
        ))}
      </optgroup>
    ));
  }

  function renderField(field: "voltage" | "current" | "resistance") {
    if (field === "voltage") {
      return (
        <label className="engineering-field">
          <span>{strings.voltageValue}</span>
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
              {renderUnitOptions("voltage")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "current") {
      return (
        <label className="engineering-field">
          <span>{strings.currentValue}</span>
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
              {renderUnitOptions("current")}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{strings.resistanceValue}</span>
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
            {renderUnitOptions("resistance")}
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
      ? strings.voltageValue
      : target === "current"
        ? strings.currentValue
        : strings.resistanceValue;

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">{description}</p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{strings.targetLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["voltage", strings.voltage],
                    ["current", strings.current],
                    ["resistance", strings.resistance],
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
          aria-label={strings.resultLive}
        >
          <h2>{resultHeading}</h2>

          <label className="engineering-field">
            <span>{resultLabel}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "-"
                  : result.resultValue !== null
                    ? formatResultText(
                        result.resultDisplay,
                        result.resultUnit
                      )
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.resultValue !== null && (
            <p className="engineering-si-note">
              {strings.automaticResultUnit}: {result.resultUnit}
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
              {formatEngineeringValue(result.siValue, locale)}{" "}
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
