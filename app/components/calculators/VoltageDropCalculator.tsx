"use client";

import { useMemo, useState } from "react";
import {
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type CalculatorAreaUnit,
  type CalculatorLengthUnit,
  type CurrentUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveVoltageDrop,
  type ElectricalSystemType,
} from "../../converter/voltageDrop";
import type { ConductorMaterial } from "../../converter/electricalConductor";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type VoltageDropCalculatorProps = {
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
    materialLabel: "Iletken malzemesi",
    copper: "Bakir",
    aluminum: "Aluminyum",
    sourceVoltageValue: "Kaynak gerilimi",
    currentValue: "Hat akimi",
    lengthValue: "Kablo uzunlugu (tek yon)",
    crossSectionValue: "Iletken kesiti",
    dropValue: "Gerilim dusumu",
    dropPercent: "Yuzdesel dusum",
    endVoltage: "Hat sonu gerilimi",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuc birimi",
    formula: "Yerine koyulmus formul",
    siEquivalent: "SI esdegeri",
    resistivityNote: "Kullanilan direnc",
    severeWarning:
      "Gerilim dusumu yaygin proje sinirlarinin (yaklasik %5) uzerinde. Kesiti artirmayi degerlendirin.",
    clear: "Degerleri temizle",
  },
  en: {
    systemTypeLabel: "System type",
    singlePhase: "Single-phase",
    threePhase: "Three-phase",
    dc: "DC",
    materialLabel: "Conductor material",
    copper: "Copper",
    aluminum: "Aluminum",
    sourceVoltageValue: "Source voltage",
    currentValue: "Line current",
    lengthValue: "Cable length (one-way)",
    crossSectionValue: "Conductor cross-section",
    dropValue: "Voltage drop",
    dropPercent: "Percent drop",
    endVoltage: "End-of-line voltage",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    resistivityNote: "Resistivity used",
    severeWarning:
      "The voltage drop exceeds a common project limit (about 5%). Consider a larger cross-section.",
    clear: "Clear values",
  },
  de: {
    systemTypeLabel: "Systemtyp",
    singlePhase: "Einphase",
    threePhase: "Dreiphasig",
    dc: "DC",
    materialLabel: "Leitermaterial",
    copper: "Kupfer",
    aluminum: "Aluminium",
    sourceVoltageValue: "Versorgungsspannung",
    currentValue: "Leitungsstrom",
    lengthValue: "Leitungslange (einfach)",
    crossSectionValue: "Leiterquerschnitt",
    dropValue: "Spannungsfall",
    dropPercent: "Prozentualer Fall",
    endVoltage: "Endspannung",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Aquivalent",
    resistivityNote: "Verwendeter spezifischer Widerstand",
    severeWarning:
      "Der Spannungsfall uberschreitet eine ubliche Projektgrenze (ca. 5 %). Erwagen Sie einen groesseren Querschnitt.",
    clear: "Werte zurucksetzen",
  },
} as const;

export default function VoltageDropCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: VoltageDropCalculatorProps) {
  const strings = copy[locale];
  const [systemType, setSystemType] =
    useState<ElectricalSystemType>("three-phase");
  const [material, setMaterial] = useState<ConductorMaterial>("copper");
  const [sourceVoltageValue, setSourceVoltageValue] = useState("400");
  const [sourceVoltageUnit, setSourceVoltageUnit] =
    useState<VoltageUnit>("V");
  const [currentValue, setCurrentValue] = useState("20");
  const [currentUnit, setCurrentUnit] = useState<CurrentUnit>("A");
  const [lengthValue, setLengthValue] = useState("50");
  const [lengthUnit, setLengthUnit] = useState<CalculatorLengthUnit>("m");
  const [crossSectionValue, setCrossSectionValue] = useState("6");
  const [crossSectionUnit, setCrossSectionUnit] =
    useState<CalculatorAreaUnit>("mm²");

  const groupedUnits = useMemo(
    () => ({
      voltage: getCalculatorUnitGroups("voltage", locale),
      current: getCalculatorUnitGroups("current", locale),
      length: getCalculatorUnitGroups("length", locale),
      area: getCalculatorUnitGroups("area", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveVoltageDrop({
        sourceVoltageValue,
        sourceVoltageUnit,
        currentValue,
        currentUnit,
        lengthValue,
        lengthUnit,
        crossSectionValue,
        crossSectionUnit,
        material,
        systemType,
        locale,
      }),
    [
      crossSectionUnit,
      crossSectionValue,
      currentUnit,
      currentValue,
      lengthUnit,
      lengthValue,
      locale,
      material,
      sourceVoltageUnit,
      sourceVoltageValue,
      systemType,
    ]
  );

  function resetValues() {
    setSystemType("three-phase");
    setMaterial("copper");
    setSourceVoltageValue("400");
    setSourceVoltageUnit("V");
    setCurrentValue("20");
    setCurrentUnit("A");
    setLengthValue("50");
    setLengthUnit("m");
    setCrossSectionValue("6");
    setCrossSectionUnit("mm²");
  }

  function renderUnitOptions(
    quantity: "voltage" | "current" | "length" | "area"
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

            <div className="engineering-targets">
              <span>{strings.materialLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["copper", strings.copper],
                    ["aluminum", strings.aluminum],
                  ] as const
                ).map(([option, label]) => (
                  <button
                    type="button"
                    key={option}
                    className={`engineering-target-button${
                      material === option ? " is-active" : ""
                    }`}
                    onClick={() => setMaterial(option)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="engineering-inputs">
              <label className="engineering-field">
                <span>{strings.sourceVoltageValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={sourceVoltageValue}
                    onChange={(event) =>
                      setSourceVoltageValue(event.target.value)
                    }
                  />
                  <select
                    value={sourceVoltageUnit}
                    onChange={(event) =>
                      setSourceVoltageUnit(event.target.value as VoltageUnit)
                    }
                  >
                    {renderUnitOptions("voltage")}
                  </select>
                </div>
              </label>

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

              <label className="engineering-field">
                <span>{strings.lengthValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={lengthValue}
                    onChange={(event) => setLengthValue(event.target.value)}
                  />
                  <select
                    value={lengthUnit}
                    onChange={(event) =>
                      setLengthUnit(
                        event.target.value as CalculatorLengthUnit
                      )
                    }
                  >
                    {renderUnitOptions("length")}
                  </select>
                </div>
              </label>

              <label className="engineering-field">
                <span>{strings.crossSectionValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={crossSectionValue}
                    onChange={(event) =>
                      setCrossSectionValue(event.target.value)
                    }
                  />
                  <select
                    value={crossSectionUnit}
                    onChange={(event) =>
                      setCrossSectionUnit(
                        event.target.value as CalculatorAreaUnit
                      )
                    }
                  >
                    {renderUnitOptions("area")}
                  </select>
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
            <span>{strings.dropValue}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "-"
                  : result.dropValue !== null
                    ? `${result.dropDisplay} ${result.dropUnit}`
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.dropPercent !== null && (
            <p className="engineering-si-note">
              {strings.dropPercent}:{" "}
              {formatEngineeringValue(result.dropPercent, locale)}%
            </p>
          )}

          {!result.error && result.endVoltageValue !== null && (
            <p className="engineering-si-note">
              {strings.endVoltage}: {result.endVoltageDisplay}{" "}
              {result.endVoltageUnit}
            </p>
          )}

          {!result.error && result.resistivity !== null && (
            <p className="engineering-si-note">
              {strings.resistivityNote}: ρ ={" "}
              {formatEngineeringValue(result.resistivity, locale)} Ω·mm²/m
            </p>
          )}

          {!result.error && result.isSevere && (
            <p className="engineering-error">{strings.severeWarning}</p>
          )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.dropValue !== null ? (
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
