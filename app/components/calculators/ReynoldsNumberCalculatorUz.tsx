"use client";

import { useMemo, useState } from "react";
import {
  calculatorUnitSymbols,
  diameterUnitDefinitions,
  reynoldsDensityUnitDefinitions,
  speedUnitDefinitions,
  viscosityUnitDefinitions,
  type DiameterUnit,
  type ReynoldsDensityUnit,
  type SpeedUnit,
  type ViscosityUnit,
} from "../../converter/engineeringCalculatorUnits";
import {
  diameterUnitNamesUz,
  reynoldsDensityUnitNamesUz,
  speedUnitNamesUz,
  viscosityUnitNamesUz,
} from "../../converter/reynoldsNumberUnitNamesUz";
import {
  fluidPresetsUz,
  solveReynoldsNumberUz,
} from "../../converter/reynoldsNumberUz";
import type { ReynoldsTarget } from "../../converter/reynoldsNumber";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import { parseCalculatorNumber } from "../../converter/pressureForceArea";

type ReynoldsNumberCalculatorUzProps = {
  eyebrow: string;
  title: string;
  description: string;
  resultHeading: string;
};

const copy = {
  targetLabel: "Hisoblash maqsadi",
  reynolds: "Reynolds sonini hisoblash",
  velocity: "Tezlikni hisoblash",
  diameter: "Xarakterli diametrni hisoblash",
  reynoldsValue: "Reynolds soni",
  densityValue: "Zichlik",
  velocityValue: "Tezlik",
  diameterValue: "Xarakterli diametr",
  viscosityValue: "Dinamik yopishqoqlik",
  presetLabel: "Suyuqlik andozasi",
  presetNote:
    "Suv va havo andozalari taxminiy xona sharoiti qiymatlaridan foydalanadi. Aniq tahlil uchun haqiqiy haroratga mos zichlik va yopishqoqlik ma'lumotlaridan foydalaning.",
  resultLive: "Hisoblash natijasi",
  formula: "O'rniga qo'yilgan formula",
  siEquivalent: "SI ekvivalenti",
  clear: "Qiymatlarni tozalash",
  interpretation: "Oqim talqini",
  regimeVisual: "Oqim rejimi sxemasi",
  regimeNote: "Bu chegaralar quvur ichidagi oqim uchun taxminiy va o'quv maqsadli tasniflashdir.",
  laminar: "Laminar",
  transition: "O'tish",
  turbulent: "Turbulent",
};

function formatResultText(display: string, unit: string) {
  return unit ? `${display} ${unit}` : display;
}

function classifyReynolds(value: number) {
  if (value < 2300) {
    return copy.laminar;
  }

  if (value <= 4000) {
    return copy.transition;
  }

  return copy.turbulent;
}

function getReynoldsMarkerPosition(value: number) {
  const clampedValue = Math.max(0, Math.min(value, 10000));
  return (clampedValue / 10000) * 100;
}

export default function ReynoldsNumberCalculatorUz({
  eyebrow,
  title,
  description,
  resultHeading,
}: ReynoldsNumberCalculatorUzProps) {
  const [target, setTarget] = useState<ReynoldsTarget>("reynolds");
  const [reynoldsValue, setReynoldsValue] = useState("100000");
  const [densityValue, setDensityValue] = useState("1000");
  const [densityUnit, setDensityUnit] = useState<ReynoldsDensityUnit>(
    calculatorUnitSymbols.kilogramPerCubicMetre
  );
  const [velocityValue, setVelocityValue] = useState("2");
  const [velocityUnit, setVelocityUnit] = useState<SpeedUnit>("m/s");
  const [diameterValue, setDiameterValue] = useState("50");
  const [diameterUnit, setDiameterUnit] = useState<DiameterUnit>("mm");
  const [viscosityValue, setViscosityValue] = useState("1");
  const [viscosityUnit, setViscosityUnit] = useState<ViscosityUnit>(
    calculatorUnitSymbols.millipascalSecond
  );
  const [fluidPreset, setFluidPreset] = useState("water");

  const result = useMemo(
    () =>
      solveReynoldsNumberUz({
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
    ]
  );

  const reynoldsVisualValue = useMemo(() => {
    if (!result.error && target === "reynolds" && result.siValue !== null) {
      return result.siValue;
    }

    const parsedTargetValue = parseCalculatorNumber(reynoldsValue);

    return parsedTargetValue !== null && parsedTargetValue > 0 ? parsedTargetValue : null;
  }, [result.error, result.siValue, reynoldsValue, target]);

  const reynoldsMarkerPosition =
    reynoldsVisualValue === null ? 0 : getReynoldsMarkerPosition(reynoldsVisualValue);

  const reynoldsClassification =
    reynoldsVisualValue === null ? null : classifyReynolds(reynoldsVisualValue);

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
    setViscosityUnit(calculatorUnitSymbols.millipascalSecond);
    setFluidPreset("water");
  }

  function applyFluidPreset(presetId: string) {
    setFluidPreset(presetId);
    const preset = fluidPresetsUz.find((item) => item.id === presetId);

    if (!preset || presetId === "custom") {
      return;
    }

    setDensityValue(preset.densityValue);
    setDensityUnit(preset.densityUnit);
    setViscosityValue(preset.viscosityValue);
    setViscosityUnit(preset.viscosityUnit);
  }

  const visibleFields =
    target === "reynolds"
      ? (["density", "velocity", "diameter", "viscosity"] as const)
      : target === "velocity"
        ? (["reynolds", "density", "diameter", "viscosity"] as const)
        : (["reynolds", "density", "velocity", "viscosity"] as const);

  function renderField(
    field: "reynolds" | "density" | "velocity" | "diameter" | "viscosity"
  ) {
    if (field === "density") {
      return (
        <div className="hydrostatic-density-stack">
          <label className="engineering-field">
            <span>{copy.presetLabel}</span>
            <div className="engineering-field-row hydrostatic-preset-row">
              <select
                value={fluidPreset}
                onChange={(event) => applyFluidPreset(event.target.value)}
              >
                {fluidPresetsUz.map((preset) => (
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
                  setFluidPreset("custom");
                }}
              />
              <select
                value={densityUnit}
                onChange={(event) => {
                  setDensityUnit(event.target.value as ReynoldsDensityUnit);
                  setFluidPreset("custom");
                }}
              >
                {reynoldsDensityUnitDefinitions.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {reynoldsDensityUnitNamesUz[unit.enName]?.name ?? unit.enName} (
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

    if (field === "reynolds") {
      return (
        <label className="engineering-field">
          <span>{copy.reynoldsValue}</span>
          <div className="engineering-field-row engineering-field-row-result-single">
            <input
              type="text"
              inputMode="decimal"
              value={reynoldsValue}
              onChange={(event) => setReynoldsValue(event.target.value)}
            />
          </div>
        </label>
      );
    }

    if (field === "velocity") {
      return (
        <label className="engineering-field">
          <span>{copy.velocityValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={velocityValue}
              onChange={(event) => setVelocityValue(event.target.value)}
            />
            <select
              value={velocityUnit}
              onChange={(event) => setVelocityUnit(event.target.value as SpeedUnit)}
            >
              {speedUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {speedUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field === "diameter") {
      return (
        <label className="engineering-field">
          <span>{copy.diameterValue}</span>
          <div className="engineering-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={diameterValue}
              onChange={(event) => setDiameterValue(event.target.value)}
            />
            <select
              value={diameterUnit}
              onChange={(event) => setDiameterUnit(event.target.value as DiameterUnit)}
            >
              {diameterUnitDefinitions.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {diameterUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className="engineering-field">
        <span>{copy.viscosityValue}</span>
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
              setViscosityUnit(event.target.value as ViscosityUnit);
              setFluidPreset("custom");
            }}
          >
            {viscosityUnitDefinitions.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {viscosityUnitNamesUz[unit.enName]?.name ?? unit.enName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }

  const resultLabel =
    target === "reynolds"
      ? copy.reynoldsValue
      : target === "velocity"
        ? copy.velocityValue
        : copy.diameterValue;

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
                    ["reynolds", copy.reynolds],
                    ["velocity", copy.velocity],
                    ["diameter", copy.diameter],
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

          {reynoldsVisualValue !== null && (
            <div className="reynolds-regime-card">
              <div className="reynolds-regime-header">
                <strong>{copy.regimeVisual}</strong>
                <span>{formatUzValue(reynoldsVisualValue)}</span>
              </div>

              <div className="reynolds-regime-scale" aria-hidden="true">
                <div className="reynolds-regime-band">
                  <span className="reynolds-regime-segment is-laminar" />
                  <span className="reynolds-regime-segment is-transition" />
                  <span className="reynolds-regime-segment is-turbulent" />
                  <span className="reynolds-regime-threshold is-laminar-end" />
                  <span className="reynolds-regime-threshold is-transition-end" />
                  <span
                    className="reynolds-regime-marker"
                    style={{
                      left: `calc(${reynoldsMarkerPosition}% - 7px)`,
                    }}
                  />
                </div>

                <div className="reynolds-regime-ticks">
                  <span>0</span>
                  <span>2300</span>
                  <span>4000</span>
                  <span>10000+</span>
                </div>
              </div>

              <div className="reynolds-regime-labels">
                <span>{copy.laminar}</span>
                <span>{copy.transition}</span>
                <span>{copy.turbulent}</span>
              </div>

              <p className="reynolds-regime-reading">
                <strong>{copy.interpretation}:</strong> {reynoldsClassification}
              </p>

              <p className="engineering-si-note">{copy.regimeNote}</p>
            </div>
          )}

          {result.interpretation && (
            <div className="hydrostatic-secondary-result">
              <strong>{copy.interpretation}</strong>
              <p>{result.interpretation.title}</p>
              <p className="engineering-si-note">{result.interpretation.body}</p>
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
              {copy.siEquivalent}: {formatUzValue(result.siValue)}
              {result.siUnit ? ` ${result.siUnit}` : ""}
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
