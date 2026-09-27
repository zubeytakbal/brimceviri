"use client";

// Saha muhendisligi araclari: donati celigi agirligi (D²/162) ve nominal
// karisimli beton icin cimento torbasi, kum ve micir.

import { useState } from "react";
import {
  BAR_DIAMETERS_MM,
  barWeightPerMeter,
  barWeightRuleOfThumb,
  concreteMaterials,
  CUBIC_FEET_PER_M3,
  NOMINAL_MIXES,
  STANDARD_BAR_LENGTH_M,
  steelWeight,
  type ConcreteGrade,
} from "../converter/civilIndiaFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { parseInput } from "./englishFormHelpers";

const METERS_PER_FOOT = 0.3048;

const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits }).format(value);

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

// ---------------- Steel bar weight ----------------
export function SteelWeightCalculator() {
  const [diameter, setDiameter] = useState("12");
  const [bars, setBars] = useState("10");
  const [length, setLength] = useState(String(STANDARD_BAR_LENGTH_M));
  const [lengthUnit, setLengthUnit] = useState<"m" | "ft">("m");

  const diameterMm = Number(diameter);
  const lengthM = (parseInput(length) ?? Number.NaN) * (lengthUnit === "ft" ? METERS_PER_FOOT : 1);
  const result = steelWeight({ diameterMm, bars: parseInput(bars) ?? Number.NaN, lengthM });

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Bar diameter</span>
            <select value={diameter} onChange={(event) => setDiameter(event.target.value)}>
              {BAR_DIAMETERS_MM.map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
            </select>
          </label>
          <Field label="Number of bars" value={bars} onChange={setBars} />
          <Field label={`Length of each bar (${lengthUnit === "m" ? "meters" : "feet"})`} value={length} onChange={setLength} />
        </div>
        <EnglishModeToggle<"m" | "ft">
          label="Length in"
          value={lengthUnit}
          onChange={setLengthUnit}
          options={[
            { value: "m", label: "Meters" },
            { value: "ft", label: "Feet" },
          ]}
        />
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="Total steel weight" value={`${fmt(result.totalKg)} kg`} />
            <Stat label="In tonnes" value={`${fmt(result.tonnes, 3)} t`} />
            <Stat label={`Weight per meter (${diameterMm} mm)`} value={`${fmt(result.perMeter, 3)} kg/m`} />
            <Stat label="Weight of one bar" value={`${fmt(result.perBar)} kg`} />
            <Stat label="Total length" value={`${fmt(result.totalLengthM)} m`} />
            <Stat label="12 m bars per tonne" value={fmt(result.barsPerTonne, 1)} />
          </div>
        ) : (
          <strong>Enter the number of bars and their length.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        Uses steel density 7,850 kg/m³: weight per meter = π/4 × D² × 7,850 ÷ 10⁶. The site formula D²/162 gives{" "}
        {fmt(barWeightRuleOfThumb(diameterMm), 3)} kg/m for {diameterMm} mm, within 0.2% of the exact value. Add lap lengths and
        wastage (typically 3–5%) before ordering.
      </p>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Diameter</th>
              <th>kg per meter</th>
              <th>kg per 12 m bar</th>
            </tr>
          </thead>
          <tbody>
            {BAR_DIAMETERS_MM.map((size) => {
              const perMeter = barWeightPerMeter(size) ?? 0;
              return (
                <tr key={size}>
                  <td>{size} mm</td>
                  <td>{fmt(perMeter, 3)}</td>
                  <td>{fmt(perMeter * STANDARD_BAR_LENGTH_M, 2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Concrete mix materials ----------------
const GRADES = Object.keys(NOMINAL_MIXES) as ConcreteGrade[];

export function ConcreteMixCalculator() {
  const [grade, setGrade] = useState<ConcreteGrade>("M20");
  const [inputMode, setInputMode] = useState<"volume" | "dimensions">("volume");
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const [volume, setVolume] = useState("1");
  const [lengthValue, setLengthValue] = useState("5");
  const [widthValue, setWidthValue] = useState("4");
  const [depthValue, setDepthValue] = useState("0.125");
  const [waterCement, setWaterCement] = useState("0.5");

  const toMeters = unit === "ft" ? METERS_PER_FOOT : 1;
  const wetVolumeM3 =
    inputMode === "volume"
      ? (parseInput(volume) ?? Number.NaN) / (unit === "ft" ? CUBIC_FEET_PER_M3 : 1)
      : (parseInput(lengthValue) ?? Number.NaN) *
        (parseInput(widthValue) ?? Number.NaN) *
        (parseInput(depthValue) ?? Number.NaN) *
        toMeters ** 3;
  const result = concreteMaterials({
    wetVolumeM3,
    grade,
    waterCementRatio: parseInput(waterCement) ?? Number.NaN,
  });
  const mix = NOMINAL_MIXES[grade];
  const unitWord = unit === "m" ? "m" : "ft";

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<ConcreteGrade>
          label="Concrete grade (nominal mix)"
          value={grade}
          onChange={setGrade}
          options={GRADES.map((key) => ({ value: key, label: `${key} (${NOMINAL_MIXES[key].join(":")})` }))}
        />
        <EnglishModeToggle<"volume" | "dimensions">
          label="Enter"
          value={inputMode}
          onChange={setInputMode}
          options={[
            { value: "volume", label: "Concrete volume" },
            { value: "dimensions", label: "Length × width × depth" },
          ]}
        />
        <EnglishModeToggle<"m" | "ft">
          label="Units"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "m", label: "Meters (m³)" },
            { value: "ft", label: "Feet (cft)" },
          ]}
        />
        <div className="paint-calculator-grid">
          {inputMode === "volume" ? (
            <Field label={`Wet concrete volume (${unit === "m" ? "m³" : "cubic feet"})`} value={volume} onChange={setVolume} />
          ) : (
            <>
              <Field label={`Length (${unitWord})`} value={lengthValue} onChange={setLengthValue} />
              <Field label={`Width (${unitWord})`} value={widthValue} onChange={setWidthValue} />
              <Field label={`Depth / thickness (${unitWord})`} value={depthValue} onChange={setDepthValue} />
            </>
          )}
          <Field label="Water–cement ratio" value={waterCement} onChange={setWaterCement} />
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="Cement (50 kg bags)" value={`${fmt(result.cementBags, 1)} bags`} />
            <Stat label="Cement weight" value={`${fmt(result.cementKg, 0)} kg`} />
            <Stat label="Sand" value={`${fmt(result.sandM3, 3)} m³ (${fmt(result.sandCft, 1)} cft)`} />
            <Stat label="Coarse aggregate" value={`${fmt(result.aggregateM3, 3)} m³ (${fmt(result.aggregateCft, 1)} cft)`} />
            {result.waterLitres !== null && <Stat label="Water" value={`${fmt(result.waterLitres, 0)} litres`} />}
            <Stat label="Wet concrete volume" value={`${fmt(wetVolumeM3, 3)} m³ (${fmt(wetVolumeM3 * CUBIC_FEET_PER_M3, 1)} cft)`} />
          </div>
        ) : (
          <strong>Enter the concrete volume or the slab dimensions.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        {grade} nominal mix {mix.join(" : ")} (cement : sand : aggregate). Dry volume = wet volume × 1.54; cement is taken at 1,440 kg/m³
        (one 50 kg bag ≈ 0.0347 m³). IS 456 allows nominal mixes up to M20; for M25 and stronger concrete, use a design mix from a lab.
        Add 2–5% for wastage.
      </p>
    </div>
  );
}
