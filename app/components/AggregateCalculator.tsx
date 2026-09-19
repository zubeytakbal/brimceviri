"use client";

import { useMemo, useState } from "react";
import { calculateAggregateEstimate } from "../converter/aggregateEstimator";
import { formatLocalizedNumber } from "../i18n/toolLocales";

type UnitSystem = "us" | "metric";

const METERS_PER_FOOT = 0.3048;
const CUBIC_METERS_PER_CUBIC_YARD = 0.764554857984;
const POUNDS_PER_KILOGRAM = 2.20462262185;
const KILOGRAMS_PER_CUBIC_METER_PER_POUND_PER_CUBIC_YARD = 0.593276421257;

function parseNumber(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");
  if (!normalizedValue) return Number.NaN;
  const value = Number(normalizedValue);
  return Number.isFinite(value) ? value : Number.NaN;
}

function convertInput(rawValue: string, factor: number) {
  const value = parseNumber(rawValue);
  return Number.isFinite(value)
    ? String(Number((value * factor).toPrecision(12)))
    : rawValue;
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

export default function AggregateCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("12");
  const [depth, setDepth] = useState("0.33");
  const [wastePercent, setWastePercent] = useState("10");
  const [bulkDensity, setBulkDensity] = useState("2800");
  const usesUsCustomaryUnits = unitSystem === "us";

  const estimate = useMemo(
    () => calculateAggregateEstimate({
      lengthM: parseNumber(length) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      widthM: parseNumber(width) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      depthM: parseNumber(depth) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      wastePercent: parseNumber(wastePercent),
      bulkDensityKgM3: parseNumber(bulkDensity) * (usesUsCustomaryUnits ? KILOGRAMS_PER_CUBIC_METER_PER_POUND_PER_CUBIC_YARD : 1),
    }),
    [length, width, depth, wastePercent, bulkDensity, usesUsCustomaryUnits]
  );

  const changeUnitSystem = (nextUnitSystem: UnitSystem) => {
    if (nextUnitSystem === unitSystem) return;
    const dimensionFactor = unitSystem === "us" ? METERS_PER_FOOT : 1 / METERS_PER_FOOT;
    const densityFactor = unitSystem === "us" ? KILOGRAMS_PER_CUBIC_METER_PER_POUND_PER_CUBIC_YARD : 1 / KILOGRAMS_PER_CUBIC_METER_PER_POUND_PER_CUBIC_YARD;
    setLength((value) => convertInput(value, dimensionFactor));
    setWidth((value) => convertInput(value, dimensionFactor));
    setDepth((value) => convertInput(value, dimensionFactor));
    setBulkDensity((value) => convertInput(value, densityFactor));
    setUnitSystem(nextUnitSystem);
  };

  const formatVolume = (valueM3: number) => usesUsCustomaryUnits
    ? `${formatLocalizedNumber(valueM3 / CUBIC_METERS_PER_CUBIC_YARD, "en", { maximumFractionDigits: 3 })} yd³`
    : `${formatLocalizedNumber(valueM3, "en", { maximumFractionDigits: 3 })} m³`;
  const formatWeight = (valueKg: number) => usesUsCustomaryUnits
    ? `${formatLocalizedNumber(valueKg * POUNDS_PER_KILOGRAM / 2_000, "en", { maximumFractionDigits: 2 })} short tons`
    : `${formatLocalizedNumber(valueKg / 1_000, "en", { maximumFractionDigits: 2 })} tonnes`;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Unit system</span>
          <div className="engineering-target-grid">
            <button type="button" className={`engineering-target-button${usesUsCustomaryUnits ? " is-active" : ""}`} onClick={() => changeUnitSystem("us")}>US customary (ft, yd³, lb)</button>
            <button type="button" className={`engineering-target-button${unitSystem === "metric" ? " is-active" : ""}`} onClick={() => changeUnitSystem("metric")}>Metric (m, m³, kg)</button>
          </div>
        </div>
        <div className="paint-calculator-grid">
          <InputField label={`Length (${usesUsCustomaryUnits ? "ft" : "m"})`} value={length} onChange={setLength} />
          <InputField label={`Width (${usesUsCustomaryUnits ? "ft" : "m"})`} value={width} onChange={setWidth} />
          <InputField label={`Depth (${usesUsCustomaryUnits ? "ft" : "m"})`} value={depth} onChange={setDepth} />
          <InputField label="Waste allowance (%)" value={wastePercent} onChange={setWastePercent} />
          <InputField label={`Bulk density (${usesUsCustomaryUnits ? "lb/yd³" : "kg/m³"})`} value={bulkDensity} onChange={setBulkDensity} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!estimate ? <strong>Enter dimensions, waste allowance and bulk density greater than zero.</strong> : (
          <div className="paint-calculator-result-grid">
            <ResultCard label="Material volume" value={formatVolume(estimate.volumeM3)} />
            <ResultCard label="Volume with waste" value={formatVolume(estimate.volumeWithWasteM3)} />
            <ResultCard label="Estimated order weight" value={formatWeight(estimate.weightKg)} />
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">Bulk density varies by material, moisture and compaction. Replace the default density with your supplier&apos;s stated value before ordering; this tool does not predict compaction, delivery minimums or project-specific requirements.</p>
    </div>
  );
}
