"use client";

import { useMemo, useState } from "react";
import {
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type PowerUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveMotorCurrent,
  type MotorPhaseType,
} from "../../converter/motorCurrent";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type MotorCurrentCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  tr: {
    phaseTypeLabel: "Faz tipi",
    singlePhase: "Tek faz",
    threePhase: "Uc faz",
    powerValue: "Motor gucu",
    voltageValue: "Besleme gerilimi",
    powerFactorValue: "Guc faktoru",
    efficiencyValue: "Verim",
    marginValue: "Emniyet payi (%)",
    flaValue: "Tam yuk akimi (FLA)",
    designValue: "Tasarim akimi (FLA + emniyet payi)",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuc birimi",
    formula: "Yerine koyulmus formul",
    siEquivalent: "SI esdegeri",
    normalizedFactors: "Kullanilan faktorler",
    marginFactorLabel: "emniyet",
    clear: "Degerleri temizle",
  },
  en: {
    phaseTypeLabel: "Phase type",
    singlePhase: "Single-phase",
    threePhase: "Three-phase",
    powerValue: "Motor power",
    voltageValue: "Supply voltage",
    powerFactorValue: "Power factor",
    efficiencyValue: "Efficiency",
    marginValue: "Design margin (%)",
    flaValue: "Full-load amps (FLA)",
    designValue: "Design current (FLA + margin)",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    normalizedFactors: "Applied factors",
    marginFactorLabel: "margin",
    clear: "Clear values",
  },
  de: {
    phaseTypeLabel: "Phasentyp",
    singlePhase: "Einphase",
    threePhase: "Dreiphasig",
    powerValue: "Motorleistung",
    voltageValue: "Versorgungsspannung",
    powerFactorValue: "Leistungsfaktor",
    efficiencyValue: "Wirkungsgrad",
    marginValue: "Reserve (%)",
    flaValue: "Nennstrom (FLA)",
    designValue: "Auslegungsstrom (FLA + Reserve)",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Aquivalent",
    normalizedFactors: "Verwendete Faktoren",
    marginFactorLabel: "Reserve",
    clear: "Werte zurucksetzen",
  },
} as const;

export default function MotorCurrentCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: MotorCurrentCalculatorProps) {
  const strings = copy[locale];
  const [phaseType, setPhaseType] = useState<MotorPhaseType>("three-phase");
  const [powerValue, setPowerValue] = useState("5.5");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("kW");
  const [voltageValue, setVoltageValue] = useState("400");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [powerFactorValue, setPowerFactorValue] = useState("0.85");
  const [efficiencyValue, setEfficiencyValue] = useState("90");
  const [marginValue, setMarginValue] = useState("15");

  const groupedUnits = useMemo(
    () => ({
      power: getCalculatorUnitGroups("power", locale),
      voltage: getCalculatorUnitGroups("voltage", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveMotorCurrent({
        powerValue,
        powerUnit,
        voltageValue,
        voltageUnit,
        powerFactorValue,
        efficiencyValue,
        marginValue,
        phaseType,
        locale,
      }),
    [
      efficiencyValue,
      locale,
      marginValue,
      phaseType,
      powerFactorValue,
      powerUnit,
      powerValue,
      voltageUnit,
      voltageValue,
    ]
  );

  function resetValues() {
    setPhaseType("three-phase");
    setPowerValue("5.5");
    setPowerUnit("kW");
    setVoltageValue("400");
    setVoltageUnit("V");
    setPowerFactorValue("0.85");
    setEfficiencyValue("90");
    setMarginValue("15");
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
              <span>{strings.phaseTypeLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["single-phase", strings.singlePhase],
                    ["three-phase", strings.threePhase],
                  ] as const
                ).map(([option, label]) => (
                  <button
                    type="button"
                    key={option}
                    className={`engineering-target-button${
                      phaseType === option ? " is-active" : ""
                    }`}
                    onClick={() => setPhaseType(option)}
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

              <label className="engineering-field">
                <span>{strings.marginValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={marginValue}
                    onChange={(event) => setMarginValue(event.target.value)}
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
            <span>{strings.flaValue}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "-"
                  : result.flaValue !== null
                    ? `${result.flaDisplay} ${result.flaUnit}`
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.designValue !== null && (
            <p className="engineering-si-note">
              {strings.designValue}: {result.designDisplay}{" "}
              {result.designUnit}
            </p>
          )}

          {!result.error && result.flaValue !== null && (
            <p className="engineering-si-note">
              {strings.automaticResultUnit}: {result.flaUnit}
            </p>
          )}

          {!result.error &&
            result.normalizedEfficiency !== null &&
            result.normalizedPowerFactor !== null &&
            result.normalizedMargin !== null && (
              <p className="engineering-si-note">
                {strings.normalizedFactors}: cos phi ={" "}
                {formatEngineeringValue(
                  result.normalizedPowerFactor,
                  locale
                )}{" "}
                | eta ={" "}
                {formatEngineeringValue(result.normalizedEfficiency, locale)}{" "}
                | {strings.marginFactorLabel} ={" "}
                {formatEngineeringValue(
                  result.normalizedMargin * 100,
                  locale
                )}
                %
              </p>
            )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.flaValue !== null ? (
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
