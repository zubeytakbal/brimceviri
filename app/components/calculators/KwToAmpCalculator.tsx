"use client";

import { useMemo, useState } from "react";
import {
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type PowerUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveKwToAmp,
  type ElectricalSystemType,
} from "../../converter/kwToAmp";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type KwToAmpCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  tr: {
    systemTypeLabel: "Sistem tipi",
    singlePhase: "Tek faz",
    threePhase: "Uc faz",
    dc: "DC",
    powerValue: "Guc",
    voltageValue: "Gerilim",
    powerFactorValue: "Guc faktoru",
    efficiencyValue: "Verim",
    currentValue: "Hat akimi",
    apparentPower: "Yaklasik gorunen guc",
    normalizedFactors: "Kullanilan faktorler",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuc birimi",
    formula: "Yerine koyulmus formul",
    siEquivalent: "SI esdegeri",
    clear: "Degerleri temizle",
  },
  en: {
    systemTypeLabel: "System type",
    singlePhase: "Single-phase",
    threePhase: "Three-phase",
    dc: "DC",
    powerValue: "Power",
    voltageValue: "Voltage",
    powerFactorValue: "Power factor",
    efficiencyValue: "Efficiency",
    currentValue: "Line current",
    apparentPower: "Approximate apparent power",
    normalizedFactors: "Applied factors",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    clear: "Clear values",
  },
  de: {
    systemTypeLabel: "Systemtyp",
    singlePhase: "Einphase",
    threePhase: "Dreiphasig",
    dc: "DC",
    powerValue: "Leistung",
    voltageValue: "Spannung",
    powerFactorValue: "Leistungsfaktor",
    efficiencyValue: "Wirkungsgrad",
    currentValue: "Leitungsstrom",
    apparentPower: "Naherungsweise Scheinleistung",
    normalizedFactors: "Verwendete Faktoren",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Aquivalent",
    clear: "Werte zurucksetzen",
  },
} as const;

export default function KwToAmpCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: KwToAmpCalculatorProps) {
  const strings = copy[locale];
  const [systemType, setSystemType] =
    useState<ElectricalSystemType>("three-phase");
  const [powerValue, setPowerValue] = useState("5.5");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("kW");
  const [voltageValue, setVoltageValue] = useState("400");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [powerFactorValue, setPowerFactorValue] = useState("0.9");
  const [efficiencyValue, setEfficiencyValue] = useState("92");

  const groupedUnits = useMemo(
    () => ({
      power: getCalculatorUnitGroups("power", locale),
      voltage: getCalculatorUnitGroups("voltage", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveKwToAmp({
        powerValue,
        powerUnit,
        voltageValue,
        voltageUnit,
        powerFactorValue,
        efficiencyValue,
        systemType,
        locale,
      }),
    [
      efficiencyValue,
      locale,
      powerFactorValue,
      powerUnit,
      powerValue,
      systemType,
      voltageUnit,
      voltageValue,
    ]
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

  function renderUnitOptions(quantity: "power" | "voltage") {
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

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">{description}</p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{strings.systemTypeLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["single-phase", strings.singlePhase],
                    ["three-phase", strings.threePhase],
                    ["dc", strings.dc],
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
                <span>{strings.powerValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={powerValue}
                    onChange={(event) => setPowerValue(event.target.value)}
                  />
                  <select
                    value={powerUnit}
                    onChange={(event) =>
                      setPowerUnit(event.target.value as PowerUnit)
                    }
                  >
                    {renderUnitOptions("power")}
                  </select>
                </div>
              </label>

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

              {systemType !== "dc" && (
                <label className="engineering-field">
                  <span>{strings.powerFactorValue}</span>
                  <div className="engineering-field-row">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={powerFactorValue}
                      onChange={(event) =>
                        setPowerFactorValue(event.target.value)
                      }
                    />
                  </div>
                </label>
              )}

              <label className="engineering-field">
                <span>{strings.efficiencyValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={efficiencyValue}
                    onChange={(event) =>
                      setEfficiencyValue(event.target.value)
                    }
                  />
                </div>
              </label>
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
            <span>{strings.currentValue}</span>
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
              {strings.automaticResultUnit}: {result.currentUnit}
            </p>
          )}

          {!result.error && result.apparentPowerValue !== null && (
            <p className="engineering-si-note">
              {strings.apparentPower}: {result.apparentPowerDisplay}{" "}
              {result.apparentPowerUnit}
            </p>
          )}

          {!result.error &&
            result.normalizedEfficiency !== null &&
            result.normalizedPowerFactor !== null && (
              <p className="engineering-si-note">
                {strings.normalizedFactors}: cos phi ={" "}
                {formatEngineeringValue(
                  result.normalizedPowerFactor,
                  locale
                )}{" "}
                | eta ={" "}
                {formatEngineeringValue(
                  result.normalizedEfficiency,
                  locale
                )}
              </p>
            )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.currentValue !== null ? (
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

