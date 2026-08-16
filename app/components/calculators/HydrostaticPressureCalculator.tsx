"use client";

import { useMemo, useState } from "react";
import {
  formatEngineeringUnitName,
  getEngineeringUnitGroups,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
  type DensityUnit,
  type DepthUnit,
  type GravityUnit,
  type PressureUnit,
} from "../../converter/engineeringUnits";
import {
  solveHydrostaticPressure,
  type HydrostaticTarget,
} from "../../converter/hydrostaticPressure";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";

type HydrostaticPressureCalculatorProps = {
  locale: CalculatorLocale;
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
  tr: {
    targetLabel: "Hesaplama hedefi",
    pressure: "Basıncı hesapla",
    density: "Yoğunluğu hesapla",
    depth: "Derinliği hesapla",
    gravity: "Yerçekimi ivmesini hesapla",
    pressureValue: "Basınç farkı",
    densityValue: "Yoğunluk",
    depthValue: "Derinlik",
    gravityValue: "Yerçekimi ivmesi",
    resultLive: "Hesaplama sonucu",
    automaticResultUnit: "Otomatik sonuç birimi",
    siEquivalent: "SI eşdeğeri",
    formula: "Yerine koyulmuş formül",
    clear: "Değerleri temizle",
    densityPresetLabel: "Akışkan ön ayarı",
    densityPresetNote:
      "Yoğunluk sıcaklık, basınç, tuzluluk ve bileşime bağlı olarak değişebilir. Ön ayarlar yaklaşık değerlerdir.",
    customPreset: "Özel değer",
    includeSurfacePressure: "Yüzey basıncını ekle",
    advancedOptions: "Gelişmiş seçenekler",
  },
  en: {
    targetLabel: "Calculation target",
    pressure: "Calculate pressure",
    density: "Calculate density",
    depth: "Calculate depth",
    gravity: "Calculate gravitational acceleration",
    pressureValue: "Pressure difference",
    densityValue: "Density",
    depthValue: "Depth",
    gravityValue: "Gravitational acceleration",
    resultLive: "Calculation result",
    automaticResultUnit: "Automatic result unit",
    siEquivalent: "SI equivalent",
    formula: "Substituted formula",
    clear: "Clear values",
    densityPresetLabel: "Fluid preset",
    densityPresetNote:
      "Density changes with temperature, pressure, salinity and composition. Presets are approximate values.",
    customPreset: "Custom",
    includeSurfacePressure: "Include surface pressure",
    advancedOptions: "Advanced options",
  },
  de: {
    targetLabel: "Berechnungsziel",
    pressure: "Druck berechnen",
    density: "Dichte berechnen",
    depth: "Tiefe berechnen",
    gravity: "Erdbeschleunigung berechnen",
    pressureValue: "Druckdifferenz",
    densityValue: "Dichte",
    depthValue: "Tiefe",
    gravityValue: "Erdbeschleunigung",
    resultLive: "Berechnungsergebnis",
    automaticResultUnit: "Automatische Ergebniseinheit",
    siEquivalent: "SI-Äquivalent",
    formula: "Eingesetzte Formel",
    clear: "Werte zurücksetzen",
    densityPresetLabel: "Fluidvoreinstellung",
    densityPresetNote:
      "Die Dichte kann sich je nach Temperatur, Druck, Salzgehalt und Zusammensetzung ändern. Die Voreinstellungen sind ungefähre Werte.",
    customPreset: "Benutzerdefiniert",
    includeSurfacePressure: "Oberflächendruck einbeziehen",
    advancedOptions: "Erweiterte Optionen",
  },
} as const;

const densityPresets: Record<
  CalculatorLocale,
  DensityPreset[]
> = {
  tr: [
    { id: "custom", label: "Özel değer", value: "" },
    {
      id: "pure-water-20c",
      label: "Saf su, yaklaşık 20 °C",
      value: "998.2",
    },
    {
      id: "rounded-water",
      label: "Yuvarlatılmış mühendislik suyu",
      value: "1000",
    },
    {
      id: "seawater",
      label: "Deniz suyu, yaklaşık",
      value: "1025",
    },
    {
      id: "mercury-20c",
      label: "Cıva, yaklaşık 20 °C",
      value: "13546",
    },
  ],
  en: [
    { id: "custom", label: "Custom", value: "" },
    {
      id: "pure-water-20c",
      label: "Pure water, about 20 °C",
      value: "998.2",
    },
    {
      id: "rounded-water",
      label: "Rounded engineering water",
      value: "1000",
    },
    {
      id: "seawater",
      label: "Seawater, approximate",
      value: "1025",
    },
    {
      id: "mercury-20c",
      label: "Mercury, about 20 °C",
      value: "13546",
    },
  ],
  de: [
    { id: "custom", label: "Benutzerdefiniert", value: "" },
    {
      id: "pure-water-20c",
      label: "Reines Wasser, etwa 20 °C",
      value: "998.2",
    },
    {
      id: "rounded-water",
      label: "Gerundetes technisches Wasser",
      value: "1000",
    },
    {
      id: "seawater",
      label: "Meerwasser, etwa",
      value: "1025",
    },
    {
      id: "mercury-20c",
      label: "Quecksilber, etwa 20 °C",
      value: "13546",
    },
  ],
};

export default function HydrostaticPressureCalculator({
  locale,
  eyebrow,
  title,
  description,
  resultHeading,
}: HydrostaticPressureCalculatorProps) {
  const strings = copy[locale];
  const [target, setTarget] =
    useState<HydrostaticTarget>("pressure");
  const [pressureValue, setPressureValue] = useState("98.0665");
  const [pressureUnit, setPressureUnit] =
    useState<PressureUnit>("kPa");
  const [densityValue, setDensityValue] = useState("1000");
  const [densityUnit, setDensityUnit] =
    useState<DensityUnit>(KILOGRAM_PER_CUBIC_METRE_UNIT);
  const [gravityValue, setGravityValue] = useState("9.80665");
  const [gravityUnit, setGravityUnit] =
    useState<GravityUnit>(METRE_PER_SECOND_SQUARED_UNIT);
  const [depthValue, setDepthValue] = useState("10");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("m");
  const [includeSurfacePressure, setIncludeSurfacePressure] =
    useState(false);
  const [surfacePressureValue, setSurfacePressureValue] =
    useState("1");
  const [surfacePressureUnit, setSurfacePressureUnit] =
    useState<PressureUnit>("atm");
  const [densityPreset, setDensityPreset] =
    useState("rounded-water");

  const groupedUnits = useMemo(
    () => ({
      pressure: getEngineeringUnitGroups("pressure", locale),
      density: getEngineeringUnitGroups("density", locale),
      depth: getEngineeringUnitGroups("depth", locale),
      gravity: getEngineeringUnitGroups("gravity", locale),
    }),
    [locale]
  );

  const result = useMemo(
    () =>
      solveHydrostaticPressure({
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
        locale,
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
      locale,
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

  function renderUnitOptions(
    quantity: "pressure" | "density" | "depth" | "gravity"
  ) {
    return groupedUnits[quantity].map((group) => (
      <optgroup label={group.label} key={group.group}>
        {group.units.map((unit) => (
          <option key={unit.symbol} value={unit.symbol}>
            {formatEngineeringUnitName(unit, locale)}
          </option>
        ))}
      </optgroup>
    ));
  }

  function applyDensityPreset(presetId: string) {
    setDensityPreset(presetId);

    const preset = densityPresets[locale].find(
      (item) => item.id === presetId
    );

    if (preset && preset.value) {
      setDensityValue(preset.value);
      setDensityUnit(KILOGRAM_PER_CUBIC_METRE_UNIT);
    }
  }

  function renderPressureField() {
    return (
      <label className="engineering-field">
        <span>{strings.pressureValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={pressureValue}
            onChange={(event) =>
              setPressureValue(event.target.value)
            }
          />
          <select
            value={pressureUnit}
            onChange={(event) =>
              setPressureUnit(
                event.target.value as PressureUnit
              )
            }
          >
            {renderUnitOptions("pressure")}
          </select>
        </div>
      </label>
    );
  }

  function renderDensityField() {
    return (
      <div className="hydrostatic-density-stack">
        <label className="engineering-field">
          <span>{strings.densityPresetLabel}</span>
          <div className="engineering-field-row hydrostatic-preset-row">
            <select
              value={densityPreset}
              onChange={(event) =>
                applyDensityPreset(event.target.value)
              }
            >
              {densityPresets[locale].map((preset) => (
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
                setDensityPreset("custom");
              }}
            />
            <select
              value={densityUnit}
              onChange={(event) =>
                setDensityUnit(
                  event.target.value as DensityUnit
                )
              }
            >
              {renderUnitOptions("density")}
            </select>
          </div>
        </label>

        <p className="hydrostatic-helper-note">
          {strings.densityPresetNote}
        </p>
      </div>
    );
  }

  function renderGravityField() {
    return (
      <label className="engineering-field">
        <span>{strings.gravityValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={gravityValue}
            onChange={(event) =>
              setGravityValue(event.target.value)
            }
          />
          <select
            value={gravityUnit}
            onChange={(event) =>
              setGravityUnit(
                event.target.value as GravityUnit
              )
            }
          >
            {renderUnitOptions("gravity")}
          </select>
        </div>
      </label>
    );
  }

  function renderDepthField() {
    return (
      <label className="engineering-field">
        <span>{strings.depthValue}</span>
        <div className="engineering-field-row">
          <input
            type="text"
            inputMode="decimal"
            value={depthValue}
            onChange={(event) =>
              setDepthValue(event.target.value)
            }
          />
          <select
            value={depthUnit}
            onChange={(event) =>
              setDepthUnit(event.target.value as DepthUnit)
            }
          >
            {renderUnitOptions("depth")}
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
      ? strings.pressureValue
      : target === "density"
        ? strings.densityValue
        : target === "depth"
          ? strings.depthValue
          : strings.gravityValue;

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
                    ["pressure", strings.pressure],
                    ["density", strings.density],
                    ["depth", strings.depth],
                    ["gravity", strings.gravity],
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
                  <summary>{strings.advancedOptions}</summary>

                  <label className="hydrostatic-checkbox">
                    <input
                      checked={includeSurfacePressure}
                      onChange={(event) =>
                        setIncludeSurfacePressure(
                          event.target.checked
                        )
                      }
                      type="checkbox"
                    />
                    <span>{strings.includeSurfacePressure}</span>
                  </label>

                  {includeSurfacePressure && (
                    <label className="engineering-field">
                      <span>{strings.pressureValue}</span>
                      <div className="engineering-field-row">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={surfacePressureValue}
                          onChange={(event) =>
                            setSurfacePressureValue(
                              event.target.value
                            )
                          }
                        />
                        <select
                          value={surfacePressureUnit}
                          onChange={(event) =>
                            setSurfacePressureUnit(
                              event.target.value as PressureUnit
                            )
                          }
                        >
                          {renderUnitOptions("pressure")}
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
          aria-label={strings.resultLive}
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
              {strings.automaticResultUnit}: {result.resultUnit}
            </p>
          )}

          {result.secondaryResult && (
            <div className="hydrostatic-secondary-result">
              <strong>{result.secondaryResult.label}</strong>
              <p>
                {result.secondaryResult.display}{" "}
                {result.secondaryResult.unit}
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
              {formatEngineeringValue(
                result.siValue,
                locale
              )}{" "}
              {result.siUnit}
            </p>
          )}

          {result.secondaryResult && (
            <p className="engineering-si-note">
              {result.secondaryResult.label}:{" "}
              {result.secondaryResult.siDisplay}{" "}
              {result.secondaryResult.siUnit}
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
