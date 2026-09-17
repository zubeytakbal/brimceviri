"use client";

import { useMemo, useState } from "react";
import {
  densityUnitDefinitions,
  depthUnitDefinitions,
  gravityUnitDefinitions,
  pressureUnitDefinitions,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
  type DensityUnit,
  type DepthUnit,
  type GravityUnit,
  type PressureUnit,
} from "../../converter/engineeringUnits";
import {
  densityUnitNamesUz,
  depthUnitNamesUz,
  gravityUnitNamesUz,
} from "../../converter/hydrostaticUnitNamesUz";
import {
  solveHydrostaticPressureUz,
  type HydrostaticTargetUz,
} from "../../converter/hydrostaticPressureUz";
import { pressureUnitNamesUz } from "../../converter/pressureForceAreaUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";

type HydrostaticPressureCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

type DensityPreset = {
  id: string;
  label: string;
  value: string;
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  pressure: "Bosimni hisoblash",
  density: "Zichlikni hisoblash",
  depth: "Chuqurlikni hisoblash",
  gravity: "Tortishish tezlanishini hisoblash",
  pressureValue: "Bosim farqi",
  densityValue: "Zichlik",
  depthValue: "Chuqurlik",
  gravityValue: "Tortishish tezlanishi",
  resultLive: "Hisoblash natijasi",
  automaticResultUnit: "Avtomatik natija birligi",
  siEquivalent: "SI ekvivalenti",
  formula: "O'rniga qo'yilgan formula",
  clear: "Qiymatlarni tozalash",
  densityPresetLabel: "Suyuqlik andozasi",
  densityPresetNote:
    "Zichlik harorat, bosim, sho'rlik va tarkibga qarab o'zgarishi mumkin. Andozalar taxminiy qiymatlardir.",
  includeSurfacePressure: "Sirt bosimini qo'shish",
  advancedOptions: "Qo'shimcha sozlamalar",
};

const densityPresets: DensityPreset[] = [
  { id: "custom", label: "O'zgacha qiymat", value: "" },
  { id: "pure-water-20c", label: "Toza suv, taxminan 20 °C", value: "998.2" },
  { id: "rounded-water", label: "Yaxlitlangan muhandislik suvi", value: "1000" },
  { id: "seawater", label: "Dengiz suvi, taxminan", value: "1025" },
  { id: "mercury-20c", label: "Simob, taxminan 20 °C", value: "13546" },
];

export default function HydrostaticPressureCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: HydrostaticPressureCalculatorUzProps) {
  const [target, setTarget] = useState<HydrostaticTargetUz>("pressure");
  const [pressureValue, setPressureValue] = useState("98.0665");
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>("kPa");
  const [densityValue, setDensityValue] = useState("1000");
  const [densityUnit, setDensityUnit] = useState<DensityUnit>(
    KILOGRAM_PER_CUBIC_METRE_UNIT
  );
  const [gravityValue, setGravityValue] = useState("9.80665");
  const [gravityUnit, setGravityUnit] = useState<GravityUnit>(
    METRE_PER_SECOND_SQUARED_UNIT
  );
  const [depthValue, setDepthValue] = useState("10");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("m");
  const [includeSurfacePressure, setIncludeSurfacePressure] = useState(false);
  const [surfacePressureValue, setSurfacePressureValue] = useState("1");
  const [surfacePressureUnit, setSurfacePressureUnit] = useState<PressureUnit>("atm");
  const [densityPreset, setDensityPreset] = useState("rounded-water");

  const result = useMemo(
    () =>
      solveHydrostaticPressureUz({
        target,
        pressureValue,
        pressureUnit,
        densityValue,
        densityUnit,
        gravityValue,
        gravityUnit,
        depthValue,
        depthUnit,
        includeSurfacePressure,
        surfacePressureValue,
        surfacePressureUnit,
      }),
    [
      target,
      pressureValue,
      pressureUnit,
      densityValue,
      densityUnit,
      gravityValue,
      gravityUnit,
      depthValue,
      depthUnit,
      includeSurfacePressure,
      surfacePressureValue,
      surfacePressureUnit,
    ]
  );

  function resetValues() {
    setTarget("pressure");
    setPressureValue("98.0665");
    setPressureUnit("kPa");
    setDensityValue("1000");
    setDensityUnit(KILOGRAM_PER_CUBIC_METRE_UNIT);
    setGravityValue("9.80665");
    setGravityUnit(METRE_PER_SECOND_SQUARED_UNIT);
    setDepthValue("10");
    setDepthUnit("m");
    setIncludeSurfacePressure(false);
    setSurfacePressureValue("1");
    setSurfacePressureUnit("atm");
    setDensityPreset("rounded-water");
  }

  function applyDensityPreset(presetId: string) {
    setDensityPreset(presetId);

    const preset = densityPresets.find((item) => item.id === presetId);

    if (preset && preset.value) {
      setDensityValue(preset.value);
      setDensityUnit(KILOGRAM_PER_CUBIC_METRE_UNIT);
    }
  }

  function renderPressureField() {
    return (
      <label className="engineering-field">
        <span>{copy.pressureValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={pressureValue}
            onChange={(event) => setPressureValue(event.target.value)}
          />
          <select
            value={pressureUnit}
            onChange={(event) => setPressureUnit(event.target.value as PressureUnit)}
          >
            {pressureUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {pressureUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  function renderDensityField() {
    return (
      <div className="hydrostatic-density-stack">
        <label className="engineering-field">
          <span>{copy.densityPresetLabel}</span>
          <div className="engineering-field-row hydrostatic-preset-row">
            <select
              value={densityPreset}
              onChange={(event) => applyDensityPreset(event.target.value)}
            >
              {densityPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="engineering-field">
          <span>{copy.densityValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={densityValue}
              onChange={(event) => {
                setDensityValue(event.target.value);
                setDensityPreset("custom");
              }}
            />
            <select
              value={densityUnit}
              onChange={(event) => setDensityUnit(event.target.value as DensityUnit)}
            >
              {densityUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {densityUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>

        <p className="hydrostatic-helper-note">{copy.densityPresetNote}</p>
      </div>
    );
  }

  function renderGravityField() {
    return (
      <label className="engineering-field">
        <span>{copy.gravityValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={gravityValue}
            onChange={(event) => setGravityValue(event.target.value)}
          />
          <select
            value={gravityUnit}
            onChange={(event) => setGravityUnit(event.target.value as GravityUnit)}
          >
            {gravityUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {gravityUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  function renderDepthField() {
    return (
      <label className="engineering-field">
        <span>{copy.depthValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={depthValue}
            onChange={(event) => setDepthValue(event.target.value)}
          />
          <select
            value={depthUnit}
            onChange={(event) => setDepthUnit(event.target.value as DepthUnit)}
          >
            {depthUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {depthUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  const visibleFields =
    target === "pressure"
      ? (["density", "gravity", "depth"] as const)
      : target === "density"
        ? (["pressure", "gravity", "depth"] as const)
        : target === "depth"
          ? (["pressure", "density", "gravity"] as const)
          : (["pressure", "density", "depth"] as const);

  const resultLabel =
    target === "pressure"
      ? copy.pressureValue
      : target === "density"
        ? copy.densityValue
        : target === "depth"
          ? copy.depthValue
          : copy.gravityValue;

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
                    ["pressure", copy.pressure],
                    ["density", copy.density],
                    ["depth", copy.depth],
                    ["gravity", copy.gravity],
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
                <div key={field}>
                  {field === "pressure"
                    ? renderPressureField()
                    : field === "density"
                      ? renderDensityField()
                      : field === "gravity"
                        ? renderGravityField()
                        : renderDepthField()}
                </div>
              ))}

              {target === "pressure" && (
                <details className="hydrostatic-advanced-options">
                  <summary>{copy.advancedOptions}</summary>

                  <label className="hydrostatic-checkbox">
                    <input
                      checked={includeSurfacePressure}
                      onChange={(event) =>
                        setIncludeSurfacePressure(event.target.checked)
                      }
                      type="checkbox"
                    />
                    <span>{copy.includeSurfacePressure}</span>
                  </label>

                  {includeSurfacePressure && (
                    <label className="engineering-field">
                      <span>{copy.pressureValue}</span>
                      <div className="engineering-field-row">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={surfacePressureValue}
                          onChange={(event) =>
                            setSurfacePressureValue(event.target.value)
                          }
                        />
                        <select
                          value={surfacePressureUnit}
                          onChange={(event) =>
                            setSurfacePressureUnit(event.target.value as PressureUnit)
                          }
                        >
                          {pressureUnitDefinitions.map((unit) => (
                            <option key={unit.symbol} value={unit.symbol}>
                              {pressureUnitNamesUz[unit.enName]?.name ?? unit.enName} (
                              {unit.symbol})
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  )}
                </details>
              )}
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
                  ? "—"
                  : result.resultValue !== null
                    ? `${result.resultDisplay} ${result.resultUnit}`
                    : ""}
              </output>
            </div>
          </label>

          {!result.error && result.resultValue !== null && (
            <p className="engineering-si-note">
              {copy.automaticResultUnit}: {result.resultUnit}
            </p>
          )}

          {result.secondaryResult && (
            <div className="hydrostatic-secondary-result">
              <strong>{result.secondaryResult.label}</strong>
              <p>
                {result.secondaryResult.display} {result.secondaryResult.unit}
              </p>
            </div>
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

          {result.secondaryResult && (
            <p className="engineering-si-note">
              {result.secondaryResult.label}: {result.secondaryResult.siDisplay}{" "}
              {result.secondaryResult.siUnit}
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
