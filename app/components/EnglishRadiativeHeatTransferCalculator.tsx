"use client";

import { useMemo, useState } from "react";

type TemperatureUnit = "c" | "f" | "k";
type AreaUnit = "m2" | "ft2";

const stefanBoltzmann = 5.670374419e-8;

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function toKelvin(value: number, unit: TemperatureUnit) {
  if (unit === "k") return value;
  if (unit === "f") return (value - 32) * 5 / 9 + 273.15;
  return value + 273.15;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishRadiativeHeatTransferCalculator() {
  const [surfaceTemperature, setSurfaceTemperature] = useState("80");
  const [surroundingsTemperature, setSurroundingsTemperature] = useState("20");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("c");
  const [emissivity, setEmissivity] = useState("0.9");
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2");

  const result = useMemo(() => {
    const values = [surfaceTemperature, surroundingsTemperature, emissivity, area].map(readNumber);
    if (values.some((value) => value === null)) return null;
    const [surfaceInput, surroundingsInput, epsilon, areaInput] = values as number[];
    const surfaceK = toKelvin(surfaceInput, temperatureUnit);
    const surroundingsK = toKelvin(surroundingsInput, temperatureUnit);
    if (surfaceK <= 0 || surroundingsK <= 0 || epsilon < 0 || epsilon > 1 || areaInput <= 0) return null;
    const areaM2 = areaUnit === "ft2" ? areaInput * 0.09290304 : areaInput;
    const heatTransferW = epsilon * stefanBoltzmann * areaM2 * (surfaceK ** 4 - surroundingsK ** 4);
    return { surfaceK, surroundingsK, heatTransferW, heatFluxWm2: heatTransferW / areaM2 };
  }, [area, areaUnit, emissivity, surfaceTemperature, surroundingsTemperature, temperatureUnit]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">This first-pass model assumes the surface sees a large, uniform surrounding enclosure with a view factor of 1.</p>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>Surface temperature</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={surfaceTemperature} onChange={(event) => setSurfaceTemperature(event.target.value)} /><select value={temperatureUnit} onChange={(event) => setTemperatureUnit(event.target.value as TemperatureUnit)}><option value="c">°C</option><option value="f">°F</option><option value="k">K</option></select></div></label>
          <label className="category-general-converter-field"><span>Surroundings temperature</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={surroundingsTemperature} onChange={(event) => setSurroundingsTemperature(event.target.value)} /><span>{temperatureUnit === "c" ? "°C" : temperatureUnit === "f" ? "°F" : "K"}</span></div></label>
          <label className="category-general-converter-field"><span>Surface emissivity (ε)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={emissivity} onChange={(event) => setEmissivity(event.target.value)} /><span>0 to 1</span></div></label>
          <label className="category-general-converter-field"><span>Radiating area</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}><option value="m2">m²</option><option value="ft2">ft²</option></select></div></label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter physical temperatures above absolute zero, an area above zero and emissivity from 0 to 1.</strong> : <div className="paint-calculator-result-grid"><div><span>Net radiative heat transfer</span><strong>{format(result.heatTransferW)} W</strong><small>{format(result.heatTransferW * 3.412142)} Btu/h</small></div><div><span>Net radiative heat flux</span><strong>{format(result.heatFluxWm2)} W/m²</strong><small>Surface: {format(result.surfaceK, 1)} K · surroundings: {format(result.surroundingsK, 1)} K</small></div></div>}
      </div>
      <p className="calculator-usage-hint"><strong>Interpretation:</strong> a positive result is net heat emitted by the surface; a negative result is net radiative heat absorbed by it. Emissivity can vary substantially with material finish, oxidation, wavelength and temperature.</p>
    </div>
  );
}
