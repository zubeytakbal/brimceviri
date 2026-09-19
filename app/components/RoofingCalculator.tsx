"use client";

import { useMemo, useState } from "react";
import { calculateRoofingEstimate } from "../converter/roofingEstimator";
import { formatLocalizedNumber } from "../i18n/toolLocales";

type UnitSystem = "us" | "metric";

const METERS_PER_FOOT = 0.3048;
const SQUARE_METERS_PER_SQUARE_FOOT = 0.09290304;

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

export default function RoofingCalculator({ locale = "en" }: { locale?: "en" }) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [buildingLength, setBuildingLength] = useState("40");
  const [buildingWidth, setBuildingWidth] = useState("28");
  const [eaveOverhang, setEaveOverhang] = useState("1");
  const [pitchRise, setPitchRise] = useState("6");
  const [wastePercent, setWastePercent] = useState("10");
  const [bundleCoverage, setBundleCoverage] = useState("33.3");
  const usesUsCustomaryUnits = unitSystem === "us";

  const estimate = useMemo(
    () => calculateRoofingEstimate({
      buildingLengthM: parseNumber(buildingLength) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      buildingWidthM: parseNumber(buildingWidth) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      eaveOverhangM: parseNumber(eaveOverhang) * (usesUsCustomaryUnits ? METERS_PER_FOOT : 1),
      pitchRisePerTwelve: parseNumber(pitchRise),
      wastePercent: parseNumber(wastePercent),
      bundleCoverageM2: parseNumber(bundleCoverage) * (usesUsCustomaryUnits ? SQUARE_METERS_PER_SQUARE_FOOT : 1),
    }),
    [buildingLength, buildingWidth, eaveOverhang, pitchRise, wastePercent, bundleCoverage, usesUsCustomaryUnits]
  );

  const changeUnitSystem = (nextUnitSystem: UnitSystem) => {
    if (nextUnitSystem === unitSystem) return;
    const lengthFactor = unitSystem === "us" ? METERS_PER_FOOT : 1 / METERS_PER_FOOT;
    const areaFactor = unitSystem === "us" ? SQUARE_METERS_PER_SQUARE_FOOT : 1 / SQUARE_METERS_PER_SQUARE_FOOT;
    setBuildingLength((value) => convertInput(value, lengthFactor));
    setBuildingWidth((value) => convertInput(value, lengthFactor));
    setEaveOverhang((value) => convertInput(value, lengthFactor));
    setBundleCoverage((value) => convertInput(value, areaFactor));
    setUnitSystem(nextUnitSystem);
  };

  const formatArea = (areaM2: number) => usesUsCustomaryUnits
    ? `${formatLocalizedNumber(areaM2 / SQUARE_METERS_PER_SQUARE_FOOT, locale, { maximumFractionDigits: 0 })} sq ft`
    : `${formatLocalizedNumber(areaM2, locale, { maximumFractionDigits: 2 })} m²`;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Unit system</span>
          <div className="engineering-target-grid">
            <button type="button" className={`engineering-target-button${usesUsCustomaryUnits ? " is-active" : ""}`} onClick={() => changeUnitSystem("us")}>US customary (ft, sq ft)</button>
            <button type="button" className={`engineering-target-button${unitSystem === "metric" ? " is-active" : ""}`} onClick={() => changeUnitSystem("metric")}>Metric (m, m²)</button>
          </div>
        </div>
        <div className="paint-calculator-grid">
          <InputField label={`Building length (${usesUsCustomaryUnits ? "ft" : "m"})`} value={buildingLength} onChange={setBuildingLength} />
          <InputField label={`Building width (${usesUsCustomaryUnits ? "ft" : "m"})`} value={buildingWidth} onChange={setBuildingWidth} />
          <InputField label={`Eave overhang on each side (${usesUsCustomaryUnits ? "ft" : "m"})`} value={eaveOverhang} onChange={setEaveOverhang} />
          <InputField label="Roof pitch (rise per 12 run)" value={pitchRise} onChange={setPitchRise} />
          <InputField label="Waste allowance (%)" value={wastePercent} onChange={setWastePercent} />
          <InputField label={`Coverage per bundle (${usesUsCustomaryUnits ? "sq ft" : "m²"})`} value={bundleCoverage} onChange={setBundleCoverage} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!estimate ? <strong>Enter valid dimensions, pitch, waste allowance and bundle coverage.</strong> : (
          <div className="paint-calculator-result-grid">
            <ResultCard label="Roof plan area" value={formatArea(estimate.planAreaM2)} />
            <ResultCard label="Sloped roof area" value={formatArea(estimate.roofAreaM2)} />
            <ResultCard label="Roof area with waste" value={formatArea(estimate.roofAreaWithWasteM2)} />
            <ResultCard label="Roofing squares (100 sq ft)" value={formatLocalizedNumber(estimate.roofingSquares, locale, { maximumFractionDigits: 2 })} />
            <ResultCard label="Estimated bundles" value={String(estimate.bundleCount)} />
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">This estimate assumes a simple symmetric gable roof. It does not account for valleys, hips, dormers, skylights, flashing, starter courses, ridge caps, local code, decking condition or product-specific installation requirements.</p>
    </div>
  );
}
