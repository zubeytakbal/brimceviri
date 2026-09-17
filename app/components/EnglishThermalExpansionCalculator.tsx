"use client";

import { useMemo, useState } from "react";
import {
  calculateThermalExpansion,
  thermalExpansionTable,
} from "../converter/thermalExpansion";

const materialNames: Record<string, string> = {
  aluminum: "Aluminum",
  brass: "Brass",
  lead: "Lead",
  "stainless-steel": "Stainless steel",
  copper: "Copper",
  iron: "Iron",
  "carbon-steel": "Carbon steel",
  concrete: "Concrete",
  glass: "Glass",
  zinc: "Zinc",
  nickel: "Nickel",
  tin: "Tin",
  gold: "Gold",
  silver: "Silver",
  platinum: "Platinum",
  "cast-iron": "Cast iron",
  chromium: "Chromium",
  magnesium: "Magnesium",
  tungsten: "Tungsten",
  molybdenum: "Molybdenum",
  niobium: "Niobium",
  palladium: "Palladium",
  vanadium: "Vanadium",
  cadmium: "Cadmium",
};

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, maximumFractionDigits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export default function EnglishThermalExpansionCalculator() {
  const [materialId, setMaterialId] = useState("aluminum");
  const [length, setLength] = useState("10");
  const [lengthUnit, setLengthUnit] = useState<"m" | "ft" | "in">("m");
  const [temperatureChange, setTemperatureChange] = useState("40");
  const [temperatureUnit, setTemperatureUnit] = useState<"c" | "f">("c");

  const material = thermalExpansionTable.find((item) => item.id === materialId) ?? thermalExpansionTable[0];
  const result = useMemo(() => {
    const inputLength = readNumber(length);
    const inputTemperatureChange = readNumber(temperatureChange);
    if (inputLength === null || inputTemperatureChange === null) return null;

    const lengthInMetres = lengthUnit === "ft" ? inputLength * 0.3048 : lengthUnit === "in" ? inputLength * 0.0254 : inputLength;
    const temperatureInCelsius = temperatureUnit === "f" ? inputTemperatureChange * (5 / 9) : inputTemperatureChange;
    return calculateThermalExpansion(lengthInMetres, material.coefficientPerMillionK, temperatureInCelsius);
  }, [length, lengthUnit, material.coefficientPerMillionK, temperatureChange, temperatureUnit]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field"><span>Material</span><select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>{thermalExpansionTable.map((item) => <option key={item.id} value={item.id}>{materialNames[item.id] ?? item.id}</option>)}</select></label>
        <label className="category-general-converter-field"><span>Original length</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as "m" | "ft" | "in")}><option value="m">m</option><option value="ft">ft</option><option value="in">in</option></select></div></label>
        <label className="category-general-converter-field"><span>Temperature change (ΔT)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={temperatureChange} onChange={(event) => setTemperatureChange(event.target.value)} /><select value={temperatureUnit} onChange={(event) => setTemperatureUnit(event.target.value as "c" | "f")}><option value="c">°C</option><option value="f">°F</option></select></div></label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result === null ? <strong>Enter a positive length and a valid temperature change.</strong> : <div className="paint-calculator-result-grid"><div><span>Length change (ΔL)</span><strong>{format(result * 1000)} mm</strong></div><div><span>Imperial equivalent</span><strong>{format(result / 0.0254, 4)} in</strong></div></div>}
      </div>

      <div className="conversion-table-wrap"><table className="conversion-table"><caption>Linear thermal-expansion coefficients (×10⁻⁶/K)</caption><thead><tr><th scope="col">Material</th><th scope="col">Coefficient</th></tr></thead><tbody>{thermalExpansionTable.map((item) => <tr key={item.id} className={item.id === materialId ? "is-active" : undefined}><td>{materialNames[item.id] ?? item.id}</td><td>{item.coefficientPerMillionK}</td></tr>)}</tbody></table></div>

      <p className="calculator-usage-hint"><strong>Important:</strong> these are general reference values near room temperature. Use the exact grade, temperature range and manufacturer data for specification, safety-critical or tightly toleranced work.</p>
    </div>
  );
}
