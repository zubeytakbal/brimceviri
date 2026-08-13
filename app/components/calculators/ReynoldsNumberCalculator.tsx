"use client";

import { useMemo, useState } from "react";
import {
  calculatorUnitSymbols,
  formatCalculatorUnitName,
  getCalculatorUnitGroups,
  type DiameterUnit,
  type ReynoldsDensityUnit,
  type SpeedUnit,
  type ViscosityUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  solveReynoldsNumber,
  type ReynoldsTarget,
} from "../../converter/reynoldsNumber";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type ReynoldsNumberCalculatorProps = {
  locale: CalculatorLocale;
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

type FluidPreset = {
  id: string;
  label: string;
  densityValue: string;
  densityUnit: ReynoldsDensityUnit;
  viscosityValue: string;
  viscosityUnit: ViscosityUnit;
};

const copy = {
  tr: {
    targetLabel: "Hesaplama hedefi",
    reynolds: "Reynolds sayısını hesapla",
    velocity: "Hızı hesapla",
    diameter: "Karakteristik çapı hesapla",
    reynoldsValue: "Reynolds sayısı",
    densityValue: "Yoğunluk",
    velocityValue: "Hız",
    diameterValue: "Karakteristik çap",
    viscosityValue: "Dinamik viskozite",
    presetLabel: "Akışkan ön ayarı",
    presetNote:
      "Su ve hava ön ayarları yaklaşık oda koşulu değerleridir. Kesin analiz için gerçek sıcaklığa uygun yoğunluk ve viskozite verisi kullanın.",
    resultLive: "Hesaplama sonucu",
    formula: "Yerine koyulmuş formül",
    siEquivalent: "SI eşdeğeri",
    clear: "Değerleri temizle",
    interpretation: "Akış yorumu",
  },
  en: {
    targetLabel: "Calculation target",
    reynolds: "Calculate Reynolds number",
    velocity: "Calculate velocity",
    diameter: "Calculate characteristic diameter",
    reynoldsValue: "Reynolds number",
    densityValue: "Density",
    velocityValue: "Velocity",
    diameterValue: "Characteristic diameter",
    viscosityValue: "Dynamic viscosity",
    presetLabel: "Fluid preset",
    presetNote:
      "Water and air presets use approximate room-condition values. Use density and viscosity data at the real temperature for detailed analysis.",
    resultLive: "Calculation result",
    formula: "Substituted formula",
    siEquivalent: "SI equivalent",
    clear: "Clear values",
    interpretation: "Flow interpretation",
  },
} as const;

const fluidPresets: Record<CalculatorLocale, FluidPreset[]> = {
  tr: [
    {
      id: "water",
      label: "Su",
      densityValue: "1000",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "1",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
    {
      id: "air",
      label: "Hava",
      densityValue: "1.2",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "0.0181",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
    {
      id: "custom",
      label: "Özel değer",
      densityValue: "",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
  ],
  en: [
    {
      id: "water",
      label: "Water",
      densityValue: "1000",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "1",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
    {
      id: "air",
      label: "Air",
      densityValue: "1.2",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "0.0181",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
    {
      id: "custom",
      label: "Custom",
      densityValue: "",
      densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre,
      viscosityValue: "",
      viscosityUnit: calculatorUnitSymbols.millipascalSecond,
    },
  ],
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

export default function ReynoldsNumberCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: ReynoldsNumberCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] =
    useState<ReynoldsTarget>("reynolds");
  const [reynoldsValue, setReynoldsValue] = useState("100000");
  const [densityValue, setDensityValue] = useState("1000");
  const [densityUnit, setDensityUnit] =
    useState<ReynoldsDensityUnit>(
      calculatorUnitSymbols.kilogramPerCubicMetre
    );
  const [velocityValue, setVelocityValue] = useState("2");
  const [velocityUnit, setVelocityUnit] =
    useState<SpeedUnit>("m/s");
  const [diameterValue, setDiameterValue] = useState("50");
  const [diameterUnit, setDiameterUnit] =
    useState<DiameterUnit>("mm");
  const [viscosityValue, setViscosityValue] = useState("1");
  const [viscosityUnit, setViscosityUnit] =
    useState<ViscosityUnit>(
      calculatorUnitSymbols.millipascalSecond
    );
  const [fluidPreset, setFluidPreset] = useState("water");

  const groupedUnits = useMemo(
    () => ({
      density: getCalculatorUnitGroups("density", locale),
      velocity: getCalculatorUnitGroups("speed", locale),
      diameter: getCalculatorUnitGroups("diameter", locale),
      viscosity: getCalculatorUnitGroups("viscosity", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveReynoldsNumber({
        target,
        reynoldsValue,
        densityValue,
        densityUnit,
        velocityValue,
        velocityUnit,
        diameterValue,
        diameterUnit,
        viscosityValue,
        viscosityUnit,
        locale,
      }),
    [
      target,
      reynoldsValue,
      densityValue,
      densityUnit,
      velocityValue,
      velocityUnit,
      diameterValue,
      diameterUnit,
      viscosityValue,
      viscosityUnit,
      locale,
    ]
  );

  function resetValues() {
    setTarget("reynolds");
    setReynoldsValue("100000");
    setDensityValue("1000");
    setDensityUnit(calculatorUnitSymbols.kilogramPerCubicMetre);
    setVelocityValue("2");
    setVelocityUnit("m/s");
    setDiameterValue("50");
    setDiameterUnit("mm");
    setViscosityValue("1");
    setViscosityUnit(
      calculatorUnitSymbols.millipascalSecond
    );
    setFluidPreset("water");
  }

  function applyFluidPreset(presetId: string) {
    setFluidPreset(presetId);
    const preset = fluidPresets[locale].find(
      (item) => item.id === presetId
    );

    if (!preset || presetId === "custom") {
      return;
    }

    setDensityValue(preset.densityValue);
    setDensityUnit(preset.densityUnit);
    setViscosityValue(preset.viscosityValue);
    setViscosityUnit(preset.viscosityUnit);
  }

  function renderUnitOptions(
    quantity: "density" | "velocity" | "diameter" | "viscosity"
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

  const visibleFields =
    target === "reynolds"
      ? (["density", "velocity", "diameter", "viscosity"] as const)
      : target === "velocity"
        ? (["reynolds", "density", "diameter", "viscosity"] as const)
        : (["reynolds", "density", "velocity", "viscosity"] as const);

  function renderField(
    field:
      | "reynolds"
      | "density"
      | "velocity"
      | "diameter"
      | "viscosity"
  ) {
    if (field === "density") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{strings.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={fluidPreset}
                onChange={(event) =>
                  applyFluidPreset(event.target.value)
                }
              >
                {fluidPresets[locale].map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="engineering-field">
            <span>{strings.densityValue}</span>
            <div className="engineering-field-row">
              <input
                type="text"
                inputMode="decimal"
                value={densityValue}
                onChange={(event) => {
                  setDensityValue(event.target.value);
                  setFluidPreset("custom");
                }}
              />
              <select
                value={densityUnit}
                onChange={(event) => {
                  setDensityUnit(
                    event.target.value as ReynoldsDensityUnit
                  );
                  setFluidPreset("custom");
                }}
              >
                {renderUnitOptions("density")}
              </select>
            </div>
          </label>

          <p className="hydrostatic-helper-note">
            {strings.presetNote}
          </p>
        </div>
      );
    }

    if (field === "reynolds") {
      return (
        <label className="engineering-field">
          <span>{strings.reynoldsValue}</span>
          <div className="engineering-field-row engineering-field-row-result-single">
            <input
              type="text"
              inputMode="decimal"
              value={reynoldsValue}
              onChange={(event) =>
                setReynoldsValue(event.target.value)
              }
            />
          </div>
        </label>
      );
    }

    if (field === "velocity") {
      return (
        <label className="engineering-field">
          <span>{strings.velocityValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={velocityValue}
              onChange={(event) =>
                setVelocityValue(event.target.value)
              }
            />
            <select
              value={velocityUnit}
              onChange={(event) =>
                setVelocityUnit(event.target.value as SpeedUnit)
              }
            >
              {renderUnitOptions("velocity")}
            </select>
          </div>
        </label>
      );
    }

    if (field === "diameter") {
      return (
        <label className="engineering-field">
          <span>{strings.diameterValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={diameterValue}
              onChange={(event) =>
                setDiameterValue(event.target.value)
              }
            />
            <select
              value={diameterUnit}
              onChange={(event) =>
                setDiameterUnit(
                  event.target.value as DiameterUnit
                )
              }
            >
              {renderUnitOptions("diameter")}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{strings.viscosityValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={viscosityValue}
            onChange={(event) => {
              setViscosityValue(event.target.value);
              setFluidPreset("custom");
            }}
          />
          <select
            value={viscosityUnit}
            onChange={(event) => {
              setViscosityUnit(
                event.target.value as ViscosityUnit
              );
              setFluidPreset("custom");
            }}
          >
            {renderUnitOptions("viscosity")}
          </select>
        </div>
      </label>
    );
  }

  const resultLabel =
    target === "reynolds"
      ? strings.reynoldsValue
      : target === "velocity"
        ? strings.velocityValue
        : strings.diameterValue;

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
                    ["reynolds", strings.reynolds],
                    ["velocity", strings.velocity],
                    ["diameter", strings.diameter],
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

          {result.interpretation && (
            <div className="hydrostatic-secondary-result">
              <strong>{strings.interpretation}</strong>
              <p>{result.interpretation.title}</p>
              <p className="engineering-si-note">
                {result.interpretation.body}
              </p>
            </div>
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
              {formatEngineeringValue(result.siValue, locale)}
              {result.siUnit ? ` ${result.siUnit}` : ""}
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
