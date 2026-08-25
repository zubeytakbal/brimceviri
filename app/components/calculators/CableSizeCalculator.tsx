"use client";

import { useMemo, useState } from "react";
import {
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type CalculatorLengthUnit,
  type CurrentUnit,
  type VoltageUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveCableSize,
  type ElectricalSystemType,
} from "../../converter/cableSize";
import type { ConductorMaterial } from "../../converter/electricalConductor";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type CableSizeCalculatorProps = {
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
    allowedDropValue: "Izin verilen gerilim dusumu (%)",
    requiredValue: "Gerekli minimum kesit",
    standardValue: "Onerilen standart kesit",
    standardOutOfRange:
      "Standart tablo disinda; ozel bir kesit degerlendirilmelidir.",
    allowedDropVolts: "Izin verilen dusum",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuc birimi",
    formula: "Yerine koyulmus formul",
    siEquivalent: "SI esdegeri",
    resistivityNote: "Kullanilan direnc",
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
    allowedDropValue: "Allowable voltage drop (%)",
    requiredValue: "Required minimum cross-section",
    standardValue: "Recommended standard cross-section",
    standardOutOfRange:
      "Outside the standard table; a custom cross-section should be evaluated.",
    allowedDropVolts: "Allowed drop",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    resistivityNote: "Resistivity used",
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
    allowedDropValue: "Zulassiger Spannungsfall (%)",
    requiredValue: "Erforderlicher Mindestquerschnitt",
    standardValue: "Empfohlener Normquerschnitt",
    standardOutOfRange:
      "Ausserhalb der Normtabelle; ein Sonderquerschnitt sollte gepruft werden.",
    allowedDropVolts: "Zulassiger Fall",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Aquivalent",
    resistivityNote: "Verwendeter spezifischer Widerstand",
    clear: "Werte zurucksetzen",
  },
} as const;

export default function CableSizeCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: CableSizeCalculatorProps) {
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
  const [allowedDropPercentValue, setAllowedDropPercentValue] =
    useState("3");

  const groupedUnits = useMemo(
    () => ({
      voltage: getCalculatorUnitGroups("voltage", locale),
      current: getCalculatorUnitGroups("current", locale),
      length: getCalculatorUnitGroups("length", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveCableSize({
        sourceVoltageValue,
        sourceVoltageUnit,
        currentValue,
        currentUnit,
        lengthValue,
        lengthUnit,
        allowedDropPercentValue,
        material,
        systemType,
        locale,
      }),
    [
      allowedDropPercentValue,
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
    setAllowedDropPercentValue("3");
  }

  function renderUnitOptions(quantity: "voltage" | "current" | "length") {
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
                <span>{strings.allowedDropValue}</span>
                <div className="engineering-field-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={allowedDropPercentValue}
                    onChange={(event) =>
                      setAllowedDropPercentValue(event.target.value)
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
            <span>{strings.requiredValue}</span>
            <div className="engineering-field-row engineering-field-row-result engineering-field-row-result-single">
              <output>
                {result.error
                  ? "-"
                  : result.requiredValue !== null
                    ? `${result.requiredDisplay} ${result.requiredUnit}`
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.standardCrossSectionMm2 !== null && (
            <p className="engineering-si-note">
              {strings.standardValue}: {result.standardCrossSectionMm2} mm²
            </p>
          )}

          {!result.error && result.standardCrossSectionMm2 === null && (
            <p className="engineering-si-note">
              {strings.standardOutOfRange}
            </p>
          )}

          {!result.error && result.allowedDropVoltValue !== null && (
            <p className="engineering-si-note">
              {strings.allowedDropVolts}: {result.allowedDropVoltDisplay} V
            </p>
          )}

          {!result.error && result.resistivity !== null && (
            <p className="engineering-si-note">
              {strings.resistivityNote}: ρ ={" "}
              {formatEngineeringValue(result.resistivity, locale)} Ω·mm²/m
            </p>
          )}

          {result.error ? (
            <p className="engineering-error">{result.error}</p>
          ) : result.requiredValue !== null ? (
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
