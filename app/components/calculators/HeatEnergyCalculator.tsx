"use client";

import { useMemo, useState } from "react";
import {
  calculatorUnitSymbols,
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type CalculatorMassUnit,
  type HeatEnergyUnit,
  type SpecificHeatUnit,
  type TemperatureDifferenceUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveHeatEnergy,
  type HeatEnergyTarget,
} from "../../converter/heatEnergy";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type HeatEnergyCalculatorProps = {
  locale: CalculatorLocale;
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
  tr: {
    targetLabel: "Hesaplama hedefi",
    energy: "Isı enerjisini hesapla",
    mass: "Kütleyi hesapla",
    specificHeat: "Özgül ısıyı hesapla",
    temperatureDifference: "Sıcaklık farkını hesapla",
    energyValue: "Isı enerjisi",
    massValue: "Kütle",
    specificHeatValue: "Özgül ısı",
    temperatureDifferenceValue: "Sıcaklık farkı",
    presetLabel: "Özgül ısı ön ayarı",
    presetNote:
      "Su ön ayarı yaklaşık 4186 J/(kg·K) değeriyle gelir. Gerçek özgül ısı sıcaklığa ve malzemeye göre değişebilir.",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuç birimi",
    formula: "Yerine koyulmuş formül",
    siEquivalent: "SI eşdeğeri",
    clear: "Değerleri temizle",
  },
  en: {
    targetLabel: "Calculation target",
    energy: "Calculate heat energy",
    mass: "Calculate mass",
    specificHeat: "Calculate specific heat",
    temperatureDifference:
      "Calculate temperature difference",
    energyValue: "Heat energy",
    massValue: "Mass",
    specificHeatValue: "Specific heat",
    temperatureDifferenceValue: "Temperature difference",
    presetLabel: "Specific-heat preset",
    presetNote:
      "The water preset uses an approximate value of 4186 J/(kg·K). Real specific heat can vary with temperature and material state.",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    clear: "Clear values",
  },
  de: {
    targetLabel: "Berechnungsziel",
    energy: "Wärmeenergie berechnen",
    mass: "Masse berechnen",
    specificHeat: "Spezifische Wärmekapazität berechnen",
    temperatureDifference: "Temperaturdifferenz berechnen",
    energyValue: "Wärmeenergie",
    massValue: "Masse",
    specificHeatValue: "Spezifische Wärmekapazität",
    temperatureDifferenceValue: "Temperaturdifferenz",
    presetLabel: "Voreinstellung für spezifische Wärme",
    presetNote:
      "Die Wasser-Voreinstellung verwendet einen ungefähren Wert von 4186 J/(kg·K). Die tatsächliche spezifische Wärme kann je nach Temperatur und Materialzustand variieren.",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    formula: "Eingesetzte Formel",
    siEquivalent: "SI-Äquivalent",
    clear: "Werte zurücksetzen",
  },
} as const;

const specificHeatPresets: Record<
  CalculatorLocale,
  SpecificHeatPreset[]
> = {
  tr: [
    {
      id: "water",
      label: "Su",
      value: "4186",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
    {
      id: "custom",
      label: "Özel değer",
      value: "",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
  ],
  en: [
    {
      id: "water",
      label: "Water",
      value: "4186",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
    {
      id: "custom",
      label: "Custom",
      value: "",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
  ],
  de: [
    {
      id: "water",
      label: "Wasser",
      value: "4186",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
    {
      id: "custom",
      label: "Benutzerdefiniert",
      value: "",
      unit: calculatorUnitSymbols.joulePerKilogramKelvin,
    },
  ],
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function HeatEnergyCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: HeatEnergyCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] =
    useState<HeatEnergyTarget>("energy");
  const [energyValue, setEnergyValue] = useState("167.44");
  const [energyUnit, setEnergyUnit] =
    useState<HeatEnergyUnit>("kJ");
  const [massValue, setMassValue] = useState("2");
  const [massUnit, setMassUnit] =
    useState<CalculatorMassUnit>("kg");
  const [specificHeatValue, setSpecificHeatValue] =
    useState("4186");
  const [specificHeatUnit, setSpecificHeatUnit] =
    useState<SpecificHeatUnit>(
      calculatorUnitSymbols.joulePerKilogramKelvin
    );
  const [specificHeatPreset, setSpecificHeatPreset] =
    useState("water");
  const [
    temperatureDifferenceValue,
    setTemperatureDifferenceValue,
  ] = useState("20");
  const [
    temperatureDifferenceUnit,
    setTemperatureDifferenceUnit,
  ] = useState<TemperatureDifferenceUnit>(
    calculatorUnitSymbols.degreeCelsius
  );

  const groupedUnits = useMemo(
    () => ({
      energy: getCalculatorUnitGroups("energy", locale),
      mass: getCalculatorUnitGroups("mass", locale),
      specificHeat: getCalculatorUnitGroups(
        "specificHeat",
        locale
      ),
      temperatureDifference: getCalculatorUnitGroups(
        "temperatureDifference",
        locale
      ),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveHeatEnergy({
        target,
        energyValue,
        energyUnit,
        massValue,
        massUnit,
        specificHeatValue,
        specificHeatUnit,
        temperatureDifferenceValue,
        temperatureDifferenceUnit,
        locale,
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
      locale,
    ]
  );

  function resetValues() {
    setTarget("energy");
    setEnergyValue("167.44");
    setEnergyUnit("kJ");
    setMassValue("2");
    setMassUnit("kg");
    setSpecificHeatValue("4186");
    setSpecificHeatUnit(
      calculatorUnitSymbols.joulePerKilogramKelvin
    );
    setSpecificHeatPreset("water");
    setTemperatureDifferenceValue("20");
    setTemperatureDifferenceUnit(
      calculatorUnitSymbols.degreeCelsius
    );
  }

  function applySpecificHeatPreset(presetId: string) {
    setSpecificHeatPreset(presetId);
    const preset = specificHeatPresets[locale].find(
      (item) => item.id === presetId
    );

    if (preset && preset.value) {
      setSpecificHeatValue(preset.value);
      setSpecificHeatUnit(preset.unit);
    }
  }

  function renderUnitOptions(
    quantity:
      | "energy"
      | "mass"
      | "specificHeat"
      | "temperatureDifference"
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

  function renderField(
    field:
      | "energy"
      | "mass"
      | "specificHeat"
      | "temperatureDifference"
  ) {
    if (field === "energy") {
      return (
        <label className="engineering-field">
          <span>{strings.energyValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={energyValue}
              onChange={(event) =>
                setEnergyValue(event.target.value)
              }
            />
            <select
              value={energyUnit}
              onChange={(event) =>
                setEnergyUnit(
                  event.target.value as HeatEnergyUnit
                )
              }
            >
              {renderUnitOptions("energy")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "mass") {
      return (
        <label className="engineering-field">
          <span>{strings.massValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={massValue}
              onChange={(event) =>
                setMassValue(event.target.value)
              }
            />
            <select
              value={massUnit}
              onChange={(event) =>
                setMassUnit(
                  event.target.value as CalculatorMassUnit
                )
              }
            >
              {renderUnitOptions("mass")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "specificHeat") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{strings.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={specificHeatPreset}
                onChange={(event) =>
                  applySpecificHeatPreset(event.target.value)
                }
              >
                {specificHeatPresets[locale].map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="engineering-field">
            <span>{strings.specificHeatValue}</span>
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
                  setSpecificHeatUnit(
                    event.target.value as SpecificHeatUnit
                  );
                  setSpecificHeatPreset("custom");
                }}
              >
                {renderUnitOptions("specificHeat")}
              </select>
            </div>
          </label>

          <p className="hydrostatic-helper-note">
            {strings.presetNote}
          </p>
        </div>
      );
    }

    return (
      <label className="engineering-field">
        <span>{strings.temperatureDifferenceValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={temperatureDifferenceValue}
            onChange={(event) =>
              setTemperatureDifferenceValue(event.target.value)
            }
          />
          <select
            value={temperatureDifferenceUnit}
            onChange={(event) =>
              setTemperatureDifferenceUnit(
                event.target.value as TemperatureDifferenceUnit
              )
            }
          >
            {renderUnitOptions("temperatureDifference")}
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
      ? strings.energyValue
      : target === "mass"
        ? strings.massValue
        : target === "specificHeat"
          ? strings.specificHeatValue
          : strings.temperatureDifferenceValue;

  return (
    <section className="conversion-hero calculator-conversion-hero">
      <div className="conversion-hero-inner calculator-hero-inner">
        <div className="conversion-hero-tool calculator-hero-tool">
          <p className="calculator-hero-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="conversion-hero-description">
            {description}
          </p>

          <div className="engineering-calculator-card">
            <div className="engineering-targets">
              <span>{strings.targetLabel}</span>

              <div className="engineering-target-grid hydrostatic-target-grid">
                {(
                  [
                    ["energy", strings.energy],
                    ["mass", strings.mass],
                    ["specificHeat", strings.specificHeat],
                    [
                      "temperatureDifference",
                      strings.temperatureDifference,
                    ],
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
