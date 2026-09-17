"use client";

import { useMemo, useState } from "react";
import {
  powerUnitDefinitions,
  voltageUnitDefinitions,
  type PowerUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import { powerUnitNamesUz } from "../../converter/heatConductionUnitNamesUz";
import { voltageUnitNamesUz } from "../../converter/electricalUnitNamesUz";
import { solveKwToAmpUz } from "../../converter/kwToAmpUz";
import type { ElectricalSystemType } from "../../converter/kwToAmp";
import { formatUzValue } from "../../converter/pressureForceAreaUz";

type KwToAmpCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  systemTypeLabel: "Sistem turi",
  singlePhase: "Bir fazali",
  threePhase: "Uch fazali",
  dc: "DC",
  powerValue: "Quvvat",
  voltageValue: "Kuchlanish",
  powerFactorValue: "Quvvat koeffitsienti",
  efficiencyValue: "Samaradorlik",
  currentValue: "Hat toki",
  apparentPower: "Taxminiy to'liq quvvat",
  normalizedFactors: "Qo'llanilgan koeffitsientlar",
  resultLive: "Hisoblash natijasi",
  automaticResultUnit: "Avtomatik natija birligi",
  formula: "O'rniga qo'yilgan formula",
  siEquivalent: "SI ekvivalenti",
  clear: "Qiymatlarni tozalash",
};

export default function KwToAmpCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: KwToAmpCalculatorUzProps) {
  const [systemType, setSystemType] = useState<ElectricalSystemType>("three-phase");
  const [powerValue, setPowerValue] = useState("5.5");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("kW");
  const [voltageValue, setVoltageValue] = useState("400");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [powerFactorValue, setPowerFactorValue] = useState("0.9");
  const [efficiencyValue, setEfficiencyValue] = useState("92");

  const result = useMemo(
    () =>
      solveKwToAmpUz({
        powerValue,
        powerUnit,
        voltageValue,
        voltageUnit,
        powerFactorValue,
        efficiencyValue,
        systemType,
      }),
    [efficiencyValue, powerFactorValue, powerUnit, powerValue, systemType, voltageUnit, voltageValue]
  );

  function resetValues() {
    setSystemType("three-phase");
    setPowerValue("5.5");
    setPowerUnit("kW");
    setVoltageValue("400");
    setVoltageUnit("V");
    setPowerFactorValue("0.9");
    setEfficiencyValue("92");
  }

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">{description}</p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{copy.systemTypeLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["single-phase", copy.singlePhase],
                    ["three-phase", copy.threePhase],
                    ["dc", copy.dc],
                  ] as const
                ).map(([option, label]) => (
                  <button
                    type="button"
                    key={option}
                    className={`engineering-target-button${
                      systemType === option ? " is-active" : ""
                    }`}
                    onClick={() => setSystemType(option)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="engineering-inputs">
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
                    onChange={(event) => setVoltageUnit(event.target.value as VoltageUnit)}
                  >
                    {voltageUnitDefinitions.map((unit) => (
                      <option key={unit.symbol} value={unit.symbol}>
                        {voltageUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              {systemType !== "dc" && (
                <label className="engineering-field">
                  <span>{copy.powerFactorValue}</span>
                  <div className="engineering-field-row">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={powerFactorValue}
                      onChange={(event) => setPowerFactorValue(event.target.value)}
                    />
                  </div>
                </label>
              )}

              <label className="engineering-field">
                <span>{copy.efficiencyValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={efficiencyValue}
                    onChange={(event) => setEfficiencyValue(event.target.value)}
                  />
                </div>
              </label>
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
            <span>{copy.currentValue}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "-"
                  : result.currentValue !== null
                    ? `${result.currentDisplay} ${result.currentUnit}`
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.currentValue !== null && (
            <p className="engineering-si-note">
              {copy.automaticResultUnit}: {result.currentUnit}
            </p>
          )}

          {!result.error && result.apparentPowerValue !== null && (
            <p className="engineering-si-note">
              {copy.apparentPower}: {result.apparentPowerDisplay} {result.apparentPowerUnit}
            </p>
          )}

          {!result.error &&
            result.normalizedEfficiency !== null &&
            result.normalizedPowerFactor !== null && (
              <p className="engineering-si-note">
                {copy.normalizedFactors}: cos φ = {formatUzValue(result.normalizedPowerFactor)}{" "}
                | η = {formatUzValue(result.normalizedEfficiency)}
              </p>
            )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.currentValue !== null ? (
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
