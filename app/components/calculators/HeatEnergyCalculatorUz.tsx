"use client";

import { useMemo, useState } from "react";
import {
  calculatorMassUnitDefinitions,
  calculatorUnitSymbols,
  heatEnergyUnitDefinitions,
  specificHeatUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
  type CalculatorMassUnit,
  type HeatEnergyUnit,
  type SpecificHeatUnit,
  type TemperatureDifferenceUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  calculatorMassUnitNamesUz,
  heatEnergyUnitNamesUz,
  specificHeatUnitNamesUz,
  temperatureDifferenceUnitNamesUz,
} from "../../converter/heatEnergyUnitNamesUz";
import { solveHeatEnergyUz } from "../../converter/heatEnergyUz";
import type { HeatEnergyTarget } from "../../converter/heatEnergy";
import { formatUzValue } from "../../converter/pressureForceAreaUz";

type HeatEnergyCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

type SpecificHeatPreset = {
  id: string;
  label: string;
  value: string;
  unit: SpecificHeatUnit;
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  energy: "Issiqlik energiyasini hisoblash",
  mass: "Massani hisoblash",
  specificHeat: "Solishtirma issiqlikni hisoblash",
  temperatureDifference: "Harorat farqini hisoblash",
  energyValue: "Issiqlik energiyasi",
  massValue: "Massa",
  specificHeatValue: "Solishtirma issiqlik",
  temperatureDifferenceValue: "Harorat farqi",
  presetLabel: "Solishtirma issiqlik andozasi",
  presetNote:
    "Suv andozasi taxminan 4186 J/(kg·K) qiymatidan foydalanadi. Haqiqiy solishtirma issiqlik haroratga va materialga qarab o'zgarishi mumkin.",
  resultLive: "Hisoblash natijasi",
  automaticResultUnit: "Avtomatik natija birligi",
  formula: "O'rniga qo'yilgan formula",
  siEquivalent: "SI ekvivalenti",
  clear: "Qiymatlarni tozalash",
};

const specificHeatPresets: SpecificHeatPreset[] = [
  {
    id: "water",
    label: "Suv",
    value: "4186",
    unit: calculatorUnitSymbols.joulePerKilogramKelvin,
  },
  {
    id: "custom",
    label: "O'zgacha qiymat",
    value: "",
    unit: calculatorUnitSymbols.joulePerKilogramKelvin,
  },
];

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function HeatEnergyCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: HeatEnergyCalculatorUzProps) {
  const [target, setTarget] = useState<HeatEnergyTarget>("energy");
  const [energyValue, setEnergyValue] = useState("167.44");
  const [energyUnit, setEnergyUnit] = useState<HeatEnergyUnit>("kJ");
  const [massValue, setMassValue] = useState("2");
  const [massUnit, setMassUnit] = useState<CalculatorMassUnit>("kg");
  const [specificHeatValue, setSpecificHeatValue] = useState("4186");
  const [specificHeatUnit, setSpecificHeatUnit] = useState<SpecificHeatUnit>(
    calculatorUnitSymbols.joulePerKilogramKelvin
  );
  const [specificHeatPreset, setSpecificHeatPreset] = useState("water");
  const [temperatureDifferenceValue, setTemperatureDifferenceValue] = useState("20");
  const [temperatureDifferenceUnit, setTemperatureDifferenceUnit] =
    useState<TemperatureDifferenceUnit>(calculatorUnitSymbols.degreeCelsius);

  const result = useMemo(
    () =>
      solveHeatEnergyUz({
        target,
        energyValue,
        energyUnit,
        massValue,
        massUnit,
        specificHeatValue,
        specificHeatUnit,
        temperatureDifferenceValue,
        temperatureDifferenceUnit,
      }),
    [
      target,
      energyValue,
      energyUnit,
      massValue,
      massUnit,
      specificHeatValue,
      specificHeatUnit,
      temperatureDifferenceValue,
      temperatureDifferenceUnit,
    ]
  );

  function resetValues() {
    setTarget("energy");
    setEnergyValue("167.44");
    setEnergyUnit("kJ");
    setMassValue("2");
    setMassUnit("kg");
    setSpecificHeatValue("4186");
    setSpecificHeatUnit(calculatorUnitSymbols.joulePerKilogramKelvin);
    setSpecificHeatPreset("water");
    setTemperatureDifferenceValue("20");
    setTemperatureDifferenceUnit(calculatorUnitSymbols.degreeCelsius);
  }

  function applySpecificHeatPreset(presetId: string) {
    setSpecificHeatPreset(presetId);
    const preset = specificHeatPresets.find((item) => item.id === presetId);

    if (preset && preset.value) {
      setSpecificHeatValue(preset.value);
      setSpecificHeatUnit(preset.unit);
    }
  }

  function renderField(
    field: "energy" | "mass" | "specificHeat" | "temperatureDifference"
  ) {
    if (field === "energy") {
      return (
        <label className="engineering-field">
          <span>{copy.energyValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={energyValue}
              onChange={(event) => setEnergyValue(event.target.value)}
            />
            <select
              value={energyUnit}
              onChange={(event) => setEnergyUnit(event.target.value as HeatEnergyUnit)}
            >
              {heatEnergyUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {heatEnergyUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field === "mass") {
      return (
        <label className="engineering-field">
          <span>{copy.massValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={massValue}
              onChange={(event) => setMassValue(event.target.value)}
            />
            <select
              value={massUnit}
              onChange={(event) => setMassUnit(event.target.value as CalculatorMassUnit)}
            >
              {calculatorMassUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {calculatorMassUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                  {unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field === "specificHeat") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{copy.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={specificHeatPreset}
                onChange={(event) => applySpecificHeatPreset(event.target.value)}
              >
                {specificHeatPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="engineering-field">
            <span>{copy.specificHeatValue}</span>
            <div className="engineering-field-row">
              <input
                type="text"
                inputMode="decimal"
                value={specificHeatValue}
                onChange={(event) => {
                  setSpecificHeatValue(event.target.value);
                  setSpecificHeatPreset("custom");
                }}
              />
              <select
                value={specificHeatUnit}
                onChange={(event) => {
                  setSpecificHeatUnit(event.target.value as SpecificHeatUnit);
                  setSpecificHeatPreset("custom");
                }}
              >
                {specificHeatUnitDefinitions.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {specificHeatUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                    {unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </label>

          <p className="hydrostatic-helper-note">{copy.presetNote}</p>
        </div>
      );
    }

    return (
      <label className="engineering-field">
        <span>{copy.temperatureDifferenceValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={temperatureDifferenceValue}
            onChange={(event) => setTemperatureDifferenceValue(event.target.value)}
          />
          <select
            value={temperatureDifferenceUnit}
            onChange={(event) =>
              setTemperatureDifferenceUnit(event.target.value as TemperatureDifferenceUnit)
            }
          >
            {temperatureDifferenceUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {temperatureDifferenceUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                {unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  const visibleFields =
    target === "energy"
      ? (["mass", "specificHeat", "temperatureDifference"] as const)
      : target === "mass"
        ? (["energy", "specificHeat", "temperatureDifference"] as const)
        : target === "specificHeat"
          ? (["energy", "mass", "temperatureDifference"] as const)
          : (["energy", "mass", "specificHeat"] as const);

  const resultLabel =
    target === "energy"
      ? copy.energyValue
      : target === "mass"
        ? copy.massValue
        : target === "specificHeat"
          ? copy.specificHeatValue
          : copy.temperatureDifferenceValue;

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
                    ["energy", copy.energy],
                    ["mass", copy.mass],
                    ["specificHeat", copy.specificHeat],
                    ["temperatureDifference", copy.temperatureDifference],
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
