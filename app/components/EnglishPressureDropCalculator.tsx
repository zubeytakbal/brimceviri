"use client";

import { useMemo, useState } from "react";
import { calculateDarcyWeisbachPressureDrop } from "../converter/darcyWeisbach";

const roughnessPresets = [
  { label: "Smooth plastic / drawn tubing", valueMm: 0.0015 },
  { label: "Copper tubing", valueMm: 0.0015 },
  { label: "Commercial steel", valueMm: 0.045 },
  { label: "Cast iron", valueMm: 0.26 },
  { label: "Custom roughness", valueMm: null },
];

type FittingRow = {
  id: number;
  description: string;
  quantity: string;
  coefficient: string;
};

function readNumber(value: string) { const result = Number(value.trim().replace(",", ".")); return Number.isFinite(result) ? result : Number.NaN; }
function format(value: number, digits = 3) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value); }

export default function EnglishPressureDropCalculator() {
  const [length, setLength] = useState("100"); const [lengthUnit, setLengthUnit] = useState<"m" | "ft">("m");
  const [diameter, setDiameter] = useState("50"); const [diameterUnit, setDiameterUnit] = useState<"mm" | "in">("mm");
  const [flow, setFlow] = useState("2"); const [flowUnit, setFlowUnit] = useState<"lps" | "m3h" | "gpm">("lps");
  const [density, setDensity] = useState("998.2"); const [densityUnit, setDensityUnit] = useState<"kgm3" | "lbft3">("kgm3");
  const [viscosity, setViscosity] = useState("1.002"); const [viscosityUnit, setViscosityUnit] = useState<"mpas" | "pas">("mpas");
  const [roughnessIndex, setRoughnessIndex] = useState(0); const [customRoughness, setCustomRoughness] = useState("0.045"); const [additionalMinorLossK, setAdditionalMinorLossK] = useState("0");
  const [fittings, setFittings] = useState<FittingRow[]>([]);
  const preset = roughnessPresets[roughnessIndex];
  const fittingsK = useMemo(() => fittings.reduce((total, fitting) => {
    const quantity = readNumber(fitting.quantity);
    const coefficient = readNumber(fitting.coefficient);
    return quantity < 0 || coefficient < 0 ? Number.NaN : total + quantity * coefficient;
  }, 0), [fittings]);
  const additionalK = readNumber(additionalMinorLossK);
  const totalMinorLossK = additionalK + fittingsK;
  const result = useMemo(() => {
    const flowValue = readNumber(flow);
    const flowM3s = flowUnit === "lps" ? flowValue / 1000 : flowUnit === "m3h" ? flowValue / 3600 : (flowValue * 0.003785411784) / 60;
    return calculateDarcyWeisbachPressureDrop({ lengthM: readNumber(length) * (lengthUnit === "ft" ? 0.3048 : 1), diameterM: readNumber(diameter) * (diameterUnit === "in" ? 0.0254 : 0.001), flowM3s, densityKgM3: readNumber(density) * (densityUnit === "lbft3" ? 16.01846337 : 1), dynamicViscosityPaS: readNumber(viscosity) * (viscosityUnit === "mpas" ? 0.001 : 1), roughnessM: (preset.valueMm ?? readNumber(customRoughness)) / 1000, minorLossCoefficient: totalMinorLossK });
  }, [customRoughness, density, densityUnit, diameter, diameterUnit, flow, flowUnit, length, lengthUnit, preset.valueMm, totalMinorLossK, viscosity, viscosityUnit]);
  const regimeLabel = result ? result.regime.charAt(0).toUpperCase() + result.regime.slice(1) : "";
  const majorLossShare = result && result.totalHeadLossM > 0 ? (result.majorHeadLossM / result.totalHeadLossM) * 100 : 0;
  const minorLossShare = result && result.totalHeadLossM > 0 ? (result.minorHeadLossM / result.totalHeadLossM) * 100 : 0;

  function updateFitting(id: number, updates: Partial<FittingRow>) {
    setFittings((current) => current.map((fitting) => fitting.id === id ? { ...fitting, ...updates } : fitting));
  }

  function addFitting() {
    setFittings((current) => [...current, { id: current.reduce((largest, fitting) => Math.max(largest, fitting.id), 0) + 1, description: "", quantity: "1", coefficient: "0" }]);
  }

  function removeFitting(id: number) {
    setFittings((current) => current.filter((fitting) => fitting.id !== id));
  }

  return <div className="category-general-converter"><div className="paint-calculator-grid">
    <label className="category-general-converter-field"><span>Pipe length</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as "m" | "ft")}><option value="m">m</option><option value="ft">ft</option></select></div></label>
    <label className="category-general-converter-field"><span>Internal diameter</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={diameter} onChange={(event) => setDiameter(event.target.value)} /><select value={diameterUnit} onChange={(event) => setDiameterUnit(event.target.value as "mm" | "in")}><option value="mm">mm</option><option value="in">in</option></select></div></label>
    <label className="category-general-converter-field"><span>Volumetric flow rate</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={flow} onChange={(event) => setFlow(event.target.value)} /><select value={flowUnit} onChange={(event) => setFlowUnit(event.target.value as "lps" | "m3h" | "gpm")}><option value="lps">L/s</option><option value="m3h">m³/h</option><option value="gpm">US gal/min</option></select></div></label>
    <label className="category-general-converter-field"><span>Fluid density</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={density} onChange={(event) => setDensity(event.target.value)} /><select value={densityUnit} onChange={(event) => setDensityUnit(event.target.value as "kgm3" | "lbft3")}><option value="kgm3">kg/m³</option><option value="lbft3">lb/ft³</option></select></div></label>
    <label className="category-general-converter-field"><span>Dynamic viscosity</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={viscosity} onChange={(event) => setViscosity(event.target.value)} /><select value={viscosityUnit} onChange={(event) => setViscosityUnit(event.target.value as "mpas" | "pas")}><option value="mpas">mPa·s (cP)</option><option value="pas">Pa·s</option></select></div></label>
    <label className="category-general-converter-field"><span>Absolute roughness</span><select value={roughnessIndex} onChange={(event) => setRoughnessIndex(Number(event.target.value))}>{roughnessPresets.map((item, index) => <option key={item.label} value={index}>{item.label}{item.valueMm === null ? "" : ` (${item.valueMm} mm)`}</option>)}</select></label>
    {preset.valueMm === null && <label className="category-general-converter-field"><span>Custom roughness (mm)</span><input type="text" inputMode="decimal" value={customRoughness} onChange={(event) => setCustomRoughness(event.target.value)} /></label>}
    <label className="category-general-converter-field"><span>Additional minor-loss coefficient (K)</span><input type="text" inputMode="decimal" value={additionalMinorLossK} onChange={(event) => setAdditionalMinorLossK(event.target.value)} /></label>
  </div><div className="engineering-calculator-card"><div className="calculator-section-heading"><div><h2>Fittings worksheet</h2><p className="calculator-usage-hint">Enter the quantity and K value for each fitting from your project data or manufacturer documentation.</p></div><button type="button" className="text-link" onClick={addFitting}>Add fitting</button></div>{fittings.length === 0 ? <p className="calculator-usage-hint">No fittings added. Use the additional K field above if you already have one combined value.</p> : <div className="thermal-resistance-layers">{fittings.map((fitting, index) => <fieldset className="thermal-resistance-layer" key={fitting.id}><legend>Fitting {index + 1}</legend><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>Description</span><input type="text" value={fitting.description} placeholder="e.g. 90° elbow" onChange={(event) => updateFitting(fitting.id, { description: event.target.value })} /></label><label className="category-general-converter-field"><span>Quantity</span><input type="text" inputMode="decimal" value={fitting.quantity} onChange={(event) => updateFitting(fitting.id, { quantity: event.target.value })} /></label><label className="category-general-converter-field"><span>K each</span><input type="text" inputMode="decimal" value={fitting.coefficient} onChange={(event) => updateFitting(fitting.id, { coefficient: event.target.value })} /></label></div><button type="button" className="engineering-clear-button" onClick={() => removeFitting(fitting.id)}>Remove fitting</button></fieldset>)}</div>}<p className="calculator-usage-hint"><strong>Fittings subtotal:</strong> {Number.isFinite(fittingsK) ? format(fittingsK, 4) : "Enter non-negative quantities and K values."} K</p></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter valid positive pipe and fluid values. Roughness and K values may be zero.</strong> : <div className="paint-calculator-result-grid"><div><span>Total pressure drop</span><strong>{format(result.pressureDropBar, 5)} bar</strong><small>{format(result.pressureDropPsi, 4)} psi · {format(result.pressureDropPa, 1)} Pa</small></div><div><span>Total head loss</span><strong>{format(result.totalHeadLossM, 4)} m</strong><small>Major {format(result.majorHeadLossM, 4)} m · minor {format(result.minorHeadLossM, 4)} m</small></div><div><span>Major-loss share</span><strong>{format(majorLossShare, 1)}%</strong><small>{format(result.majorPressureDropPa, 1)} Pa from straight-pipe friction</small></div><div><span>Minor-loss share</span><strong>{format(minorLossShare, 1)}%</strong><small>{format(result.minorPressureDropPa, 1)} Pa from fittings and added K</small></div><div><span>Velocity / Reynolds number</span><strong>{format(result.velocityMs, 4)} m/s</strong><small>Re {format(result.reynoldsNumber, 0)} · {regimeLabel}</small></div><div><span>Friction factor</span><strong>{format(result.frictionFactor, 5)}</strong><small>{result.frictionFactorMethod} · ε/D {format(result.relativeRoughness, 6)}</small></div></div>}</div><p className="calculator-usage-hint"><strong>Scope:</strong> Darcy–Weisbach is used for steady, single-phase internal flow. Transitional-flow results are uncertain. This is not for compressible-gas networks, two-phase flow, slurry, pump selection or final code-compliant design.</p></div>;
}
