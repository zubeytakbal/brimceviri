"use client";

import { useMemo, useState } from "react";
import {
  calculatorAreaUnitDefinitions,
  calculatorLengthUnitDefinitions,
  calculatorUnitSymbols,
  powerUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
  thermalConductivityUnitDefinitions,
  type CalculatorAreaUnit,
  type CalculatorLengthUnit,
  type PowerUnit,
  type TemperatureDifferenceUnit,
  type ThermalConductivityUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  calculatorAreaUnitNamesUz,
  calculatorLengthUnitNamesUz,
  powerUnitNamesUz,
  thermalConductivityUnitNamesUz,
} from "../../converter/heatConductionUnitNamesUz";
import { temperatureDifferenceUnitNamesUz } from "../../converter/heatEnergyUnitNamesUz";
import {
  conductivityPresetsUz,
  solveHeatConductionUz,
} from "../../converter/heatConductionUz";
import type { HeatConductionTarget } from "../../converter/heatConduction";
import { formatUzValue } from "../../converter/pressureForceAreaUz";

type HeatConductionCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  power: "Issiqlik o'tish tezligini hisoblash",
  thermalConductivity: "O'tkazuvchanlikni hisoblash",
  area: "Maydonni hisoblash",
  temperatureDifference: "Harorat farqini hisoblash",
  length: "Qalinlikni hisoblash",
  powerValue: "Issiqlik o'tish tezligi",
  thermalConductivityValue: "Issiqlik o'tkazuvchanligi",
  areaValue: "Maydon",
  temperatureDifferenceValue: "Harorat farqi",
  lengthValue: "Qalinlik",
  presetLabel: "Material andozasi",
  presetNote:
    "Andoza o'tkazuvchanlik qiymatlari taxminiy muhandislik qiymatlari; harorat, namlik va material tuzilishiga qarab o'zgarishi mumkin.",
  resultLive: "Hisoblash natijasi",
  automaticResultUnit: "Avtomatik natija birligi",
  formula: "O'rniga qo'yilgan formula",
  siEquivalent: "SI ekvivalenti",
  clear: "Qiymatlarni tozalash",
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function HeatConductionCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: HeatConductionCalculatorUzProps) {
  const [target, setTarget] = useState<HeatConductionTarget>("power");
  const [powerValue, setPowerValue] = useState("6.015");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("kW");
  const [thermalConductivityValue, setThermalConductivityValue] = useState("401");
  const [thermalConductivityUnit, setThermalConductivityUnit] =
    useState<ThermalConductivityUnit>(calculatorUnitSymbols.wattPerMetreKelvin);
  const [areaValue, setAreaValue] = useState("0.02");
  const [areaUnit, setAreaUnit] = useState<CalculatorAreaUnit>(
    calculatorUnitSymbols.squareMetre
  );
  const [temperatureDifferenceValue, setTemperatureDifferenceValue] = useState("15");
  const [temperatureDifferenceUnit, setTemperatureDifferenceUnit] =
    useState<TemperatureDifferenceUnit>(calculatorUnitSymbols.degreeCelsius);
  const [lengthValue, setLengthValue] = useState("0.02");
  const [lengthUnit, setLengthUnit] = useState<CalculatorLengthUnit>("m");
  const [conductivityPreset, setConductivityPreset] = useState("copper");

  const result = useMemo(
    () =>
      solveHeatConductionUz({
        target,
        powerValue,
        powerUnit,
        thermalConductivityValue,
        thermalConductivityUnit,
        areaValue,
        areaUnit,
        temperatureDifferenceValue,
        temperatureDifferenceUnit,
        lengthValue,
        lengthUnit,
      }),
    [
      target,
      powerValue,
      powerUnit,
      thermalConductivityValue,
      thermalConductivityUnit,
      areaValue,
      areaUnit,
      temperatureDifferenceValue,
      temperatureDifferenceUnit,
      lengthValue,
      lengthUnit,
    ]
  );

  function resetValues() {
    setTarget("power");
    setPowerValue("6.015");
    setPowerUnit("kW");
    setThermalConductivityValue("401");
    setThermalConductivityUnit(calculatorUnitSymbols.wattPerMetreKelvin);
    setAreaValue("0.02");
    setAreaUnit(calculatorUnitSymbols.squareMetre);
    setTemperatureDifferenceValue("15");
    setTemperatureDifferenceUnit(calculatorUnitSymbols.degreeCelsius);
    setLengthValue("0.02");
    setLengthUnit("m");
    setConductivityPreset("copper");
  }

  function applyPreset(presetId: string) {
    setConductivityPreset(presetId);
    const preset = conductivityPresetsUz.find((item) => item.id === presetId);

    if (preset && preset.value) {
      setThermalConductivityValue(preset.value);
      setThermalConductivityUnit(calculatorUnitSymbols.wattPerMetreKelvin);
    }
  }

  function renderField(
    field: "power" | "thermalConductivity" | "area" | "temperatureDifference" | "length"
  ) {
    if (field === "power") {
      return (
        <label className="engineering-field">
          <span>{copy.powerValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={powerValue}
              onChange={(event) => setPowerValue(event.target.value)}
            />
            <select
              value={powerUnit}
              onChange={(event) => setPowerUnit(event.target.value as PowerUnit)}
            >
              {powerUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {powerUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field === "thermalConductivity") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{copy.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={conductivityPreset}
                onChange={(event) => applyPreset(event.target.value)}
              >
                {conductivityPresetsUz.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="engineering-field">
            <span>{copy.thermalConductivityValue}</span>
            <div className="engineering-field-row">
              <input
                type="text"
                inputMode="decimal"
                value={thermalConductivityValue}
                onChange={(event) => {
                  setThermalConductivityValue(event.target.value);
                  setConductivityPreset("custom");
                }}
              />
              <select
                value={thermalConductivityUnit}
                onChange={(event) =>
                  setThermalConductivityUnit(event.target.value as ThermalConductivityUnit)
                }
              >
                {thermalConductivityUnitDefinitions.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {thermalConductivityUnitNamesUz[unit.enName]?.name ?? unit.enName} (
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

    if (field === "area") {
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
              onChange={(event) => setAreaUnit(event.target.value as CalculatorAreaUnit)}
            >
              {calculatorAreaUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {calculatorAreaUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                  {unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field === "temperatureDifference") {
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

    return (
      <label className="engineering-field">
        <span>{copy.lengthValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={lengthValue}
            onChange={(event) => setLengthValue(event.target.value)}
          />
          <select
            value={lengthUnit}
            onChange={(event) => setLengthUnit(event.target.value as CalculatorLengthUnit)}
          >
            {calculatorLengthUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {calculatorLengthUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                {unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  const visibleFields =
    target === "power"
      ? (["thermalConductivity", "area", "temperatureDifference", "length"] as const)
      : target === "thermalConductivity"
        ? (["power", "area", "temperatureDifference", "length"] as const)
        : target === "area"
          ? (["power", "thermalConductivity", "temperatureDifference", "length"] as const)
          : target === "temperatureDifference"
            ? (["power", "thermalConductivity", "area", "length"] as const)
            : (["power", "thermalConductivity", "area", "temperatureDifference"] as const);

  const resultLabel =
    target === "power"
      ? copy.powerValue
      : target === "thermalConductivity"
        ? copy.thermalConductivityValue
        : target === "area"
          ? copy.areaValue
          : target === "temperatureDifference"
            ? copy.temperatureDifferenceValue
            : copy.lengthValue;

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
                    ["power", copy.power],
                    ["thermalConductivity", copy.thermalConductivity],
                    ["area", copy.area],
                    ["temperatureDifference", copy.temperatureDifference],
                    ["length", copy.length],
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
