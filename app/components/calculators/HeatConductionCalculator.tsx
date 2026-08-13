"use client";

import { useMemo, useState } from "react";
import {
  calculatorUnitSymbols,
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type CalculatorAreaUnit,
  type CalculatorLengthUnit,
  type PowerUnit,
  type TemperatureDifferenceUnit,
  type ThermalConductivityUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveHeatConduction,
  type HeatConductionTarget,
} from "../../converter/heatConduction";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type HeatConductionCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

type ConductivityPreset = {
  id: string;
  label: string;
  value: string;
};

const copy = {
  tr: {
    targetLabel: "Hesaplama hedefi",
    power: "Isı geçiş hızını hesapla",
    thermalConductivity: "İletkenliği hesapla",
    area: "Alanı hesapla",
    temperatureDifference: "Sıcaklık farkını hesapla",
    length: "Kalınlığı hesapla",
    powerValue: "Isı geçiş hızı",
    thermalConductivityValue: "Isıl iletkenlik",
    areaValue: "Alan",
    temperatureDifferenceValue: "Sıcaklık farkı",
    lengthValue: "Kalınlık",
    presetLabel: "Malzeme ön ayarı",
    presetNote:
      "Ön ayar iletkenlik değerleri yaklaşık mühendislik değerleridir; sıcaklık, nem ve malzeme yapısına göre değişebilir.",
    customPreset: "Özel değer",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuç birimi",
    formula: "Yerine koyulmuş formül",
    siEquivalent: "SI eşdeğeri",
    clear: "Değerleri temizle",
  },
  en: {
    targetLabel: "Calculation target",
    power: "Calculate heat-transfer rate",
    thermalConductivity: "Calculate conductivity",
    area: "Calculate area",
    temperatureDifference:
      "Calculate temperature difference",
    length: "Calculate thickness",
    powerValue: "Heat-transfer rate",
    thermalConductivityValue: "Thermal conductivity",
    areaValue: "Area",
    temperatureDifferenceValue: "Temperature difference",
    lengthValue: "Thickness",
    presetLabel: "Material preset",
    presetNote:
      "Preset conductivity values are approximate engineering values and can change with temperature, moisture and material structure.",
    customPreset: "Custom",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    clear: "Clear values",
  },
} as const;

const conductivityPresets: Record<
  CalculatorLocale,
  ConductivityPreset[]
> = {
  tr: [
    { id: "custom", label: "Özel değer", value: "" },
    { id: "copper", label: "Bakır", value: "401" },
    { id: "aluminum", label: "Alüminyum", value: "205" },
    { id: "steel", label: "Çelik", value: "50" },
    { id: "glass", label: "Cam", value: "1.05" },
    { id: "concrete", label: "Beton", value: "1.4" },
    { id: "wood", label: "Ahşap", value: "0.13" },
    {
      id: "air",
      label: "Hava",
      value: "0.026",
    },
  ],
  en: [
    { id: "custom", label: "Custom", value: "" },
    { id: "copper", label: "Copper", value: "401" },
    { id: "aluminum", label: "Aluminum", value: "205" },
    { id: "steel", label: "Steel", value: "50" },
    { id: "glass", label: "Glass", value: "1.05" },
    { id: "concrete", label: "Concrete", value: "1.4" },
    { id: "wood", label: "Wood", value: "0.13" },
    { id: "air", label: "Air", value: "0.026" },
  ],
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function HeatConductionCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: HeatConductionCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] =
    useState<HeatConductionTarget>("power");
  const [powerValue, setPowerValue] = useState("6.015");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("kW");
  const [
    thermalConductivityValue,
    setThermalConductivityValue,
  ] = useState("401");
  const [
    thermalConductivityUnit,
    setThermalConductivityUnit,
  ] = useState<ThermalConductivityUnit>(
    calculatorUnitSymbols.wattPerMetreKelvin
  );
  const [areaValue, setAreaValue] = useState("0.02");
  const [areaUnit, setAreaUnit] =
    useState<CalculatorAreaUnit>(
      calculatorUnitSymbols.squareMetre
    );
  const [
    temperatureDifferenceValue,
    setTemperatureDifferenceValue,
  ] = useState("15");
  const [
    temperatureDifferenceUnit,
    setTemperatureDifferenceUnit,
  ] = useState<TemperatureDifferenceUnit>(
    calculatorUnitSymbols.degreeCelsius
  );
  const [lengthValue, setLengthValue] = useState("0.02");
  const [lengthUnit, setLengthUnit] =
    useState<CalculatorLengthUnit>("m");
  const [conductivityPreset, setConductivityPreset] =
    useState("copper");

  const groupedUnits = useMemo(
    () => ({
      power: getCalculatorUnitGroups("power", locale),
      thermalConductivity: getCalculatorUnitGroups(
        "thermalConductivity",
        locale
      ),
      area: getCalculatorUnitGroups("area", locale),
      temperatureDifference: getCalculatorUnitGroups(
        "temperatureDifference",
        locale
      ),
      length: getCalculatorUnitGroups("length", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveHeatConduction({
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
        locale,
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
      locale,
    ]
  );

  function resetValues() {
    setTarget("power");
    setPowerValue("6.015");
    setPowerUnit("kW");
    setThermalConductivityValue("401");
    setThermalConductivityUnit(
      calculatorUnitSymbols.wattPerMetreKelvin
    );
    setAreaValue("0.02");
    setAreaUnit(calculatorUnitSymbols.squareMetre);
    setTemperatureDifferenceValue("15");
    setTemperatureDifferenceUnit(
      calculatorUnitSymbols.degreeCelsius
    );
    setLengthValue("0.02");
    setLengthUnit("m");
    setConductivityPreset("copper");
  }

  function renderUnitOptions(
    quantity:
      | "power"
      | "thermalConductivity"
      | "area"
      | "temperatureDifference"
      | "length"
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

  function applyPreset(presetId: string) {
    setConductivityPreset(presetId);
    const preset = conductivityPresets[locale].find(
      (item) => item.id === presetId
    );

    if (preset && preset.value) {
      setThermalConductivityValue(preset.value);
      setThermalConductivityUnit(
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }
  }

  function renderField(
    field:
      | "power"
      | "thermalConductivity"
      | "area"
      | "temperatureDifference"
      | "length"
  ) {
    if (field === "power") {
      return (
        <label className="engineering-field">
          <span>{strings.powerValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={powerValue}
              onChange={(event) =>
                setPowerValue(event.target.value)
              }
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
      );
    }

    if (field === "thermalConductivity") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{strings.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={conductivityPreset}
                onChange={(event) =>
                  applyPreset(event.target.value)
                }
              >
                {conductivityPresets[locale].map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="engineering-field">
            <span>{strings.thermalConductivityValue}</span>
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
                  setThermalConductivityUnit(
                    event.target.value as ThermalConductivityUnit
                  )
                }
              >
                {renderUnitOptions("thermalConductivity")}
              </select>
            </div>
          </label>

          <p className="hydrostatic-helper-note">
            {strings.presetNote}
          </p>
        </div>
      );
    }

    if (field === "area") {
      return (
        <label className="engineering-field">
          <span>{strings.areaValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={areaValue}
              onChange={(event) =>
                setAreaValue(event.target.value)
              }
            />
            <select
              value={areaUnit}
              onChange={(event) =>
                setAreaUnit(
                  event.target.value as CalculatorAreaUnit
                )
              }
            >
              {renderUnitOptions("area")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "temperatureDifference") {
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

    return (
      <label className="engineering-field">
        <span>{strings.lengthValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={lengthValue}
            onChange={(event) =>
              setLengthValue(event.target.value)
            }
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
    );
  }

  const visibleFields =
    target === "power"
      ? ([
          "thermalConductivity",
          "area",
          "temperatureDifference",
          "length",
        ] as const)
      : target === "thermalConductivity"
        ? (["power", "area", "temperatureDifference", "length"] as const)
        : target === "area"
          ? ([
              "power",
              "thermalConductivity",
              "temperatureDifference",
              "length",
            ] as const)
          : target === "temperatureDifference"
            ? (["power", "thermalConductivity", "area", "length"] as const)
            : ([
                "power",
                "thermalConductivity",
                "area",
                "temperatureDifference",
              ] as const);

  const resultLabel =
    target === "power"
      ? strings.powerValue
      : target === "thermalConductivity"
        ? strings.thermalConductivityValue
        : target === "area"
          ? strings.areaValue
          : target === "temperatureDifference"
            ? strings.temperatureDifferenceValue
            : strings.lengthValue;

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

              <div className="engineering-target-grid">
                {(
                  [
                    ["power", strings.power],
                    [
                      "thermalConductivity",
                      strings.thermalConductivity,
                    ],
                    ["area", strings.area],
                    [
                      "temperatureDifference",
                      strings.temperatureDifference,
                    ],
                    ["length", strings.length],
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
