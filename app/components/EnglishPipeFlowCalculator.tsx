"use client";

import { useMemo, useState } from "react";
import {
  calculatePipeFlow,
  type FlowUnit,
  type PipeDiameterUnit,
  type PipeFlowSolveFor,
  type PipeVelocityUnit,
} from "../converter/pipeFlowCalculator";

const flowUnits: Array<{ value: FlowUnit; label: string }> = [
  { value: "lps", label: "L/s" }, { value: "lpm", label: "L/min" }, { value: "m3h", label: "m³/h" }, { value: "gpm", label: "US gal/min" }, { value: "cfm", label: "ft³/min" },
];

function readNumber(value: string) {
  const result = Number(value.trim().replace(",", "."));
  return Number.isFinite(result) ? result : Number.NaN;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishPipeFlowCalculator() {
  const [solveFor, setSolveFor] = useState<PipeFlowSolveFor>("velocity");
  const [flow, setFlow] = useState("1.5");
  const [flowUnit, setFlowUnit] = useState<FlowUnit>("lps");
  const [velocity, setVelocity] = useState("1.5");
  const [velocityUnit, setVelocityUnit] = useState<PipeVelocityUnit>("ms");
  const [diameter, setDiameter] = useState("50");
  const [diameterUnit, setDiameterUnit] = useState<PipeDiameterUnit>("mm");

  const result = useMemo(() => calculatePipeFlow({ solveFor, flowValue: readNumber(flow), flowUnit, velocityMs: readNumber(velocity), velocityUnit, diameterMm: readNumber(diameter), diameterUnit }), [diameter, diameterUnit, flow, flowUnit, solveFor, velocity, velocityUnit]);
  const area = result ? Math.PI * Math.pow(result.diameterMm / 1000, 2) / 4 : null;

  return <div className="category-general-converter"><label className="category-general-converter-field"><span>Calculate</span><select value={solveFor} onChange={(event) => setSolveFor(event.target.value as PipeFlowSolveFor)}><option value="velocity">Flow velocity</option><option value="flow">Volumetric flow rate</option><option value="diameter">Internal pipe diameter</option></select></label><div className="paint-calculator-grid">
    {solveFor !== "flow" && <label className="category-general-converter-field"><span>Volumetric flow rate</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={flow} onChange={(event) => setFlow(event.target.value)} /><select value={flowUnit} onChange={(event) => setFlowUnit(event.target.value as FlowUnit)}>{flowUnits.map((unit) => <option key={unit.value} value={unit.value}>{unit.label}</option>)}</select></div></label>}
    {solveFor !== "velocity" && <label className="category-general-converter-field"><span>Flow velocity</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={velocity} onChange={(event) => setVelocity(event.target.value)} /><select value={velocityUnit} onChange={(event) => setVelocityUnit(event.target.value as PipeVelocityUnit)}><option value="ms">m/s</option><option value="fps">ft/s</option></select></div></label>}
    {solveFor !== "diameter" && <label className="category-general-converter-field"><span>Internal pipe diameter</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={diameter} onChange={(event) => setDiameter(event.target.value)} /><select value={diameterUnit} onChange={(event) => setDiameterUnit(event.target.value as PipeDiameterUnit)}><option value="mm">mm</option><option value="in">in</option></select></div></label>}
  </div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter valid positive values to calculate the missing quantity.</strong> : <div className="paint-calculator-result-grid"><div><span>Internal diameter</span><strong>{format(result.diameterMm)} mm</strong><small>{format(result.diameterIn, 4)} in</small></div><div><span>Volumetric flow rate</span><strong>{format(result.flowLps)} L/s</strong><small>{format(result.flowGpm)} US gal/min · {format(result.flowCfm)} CFM</small></div><div><span>Flow velocity</span><strong>{format(result.velocityMs)} m/s</strong><small>{format(result.velocityFps)} ft/s</small></div><div><span>Cross-sectional area</span><strong>{area === null ? "—" : `${format(area * 1_000_000)} mm²`}</strong><small>{area === null ? "" : `${format(area * 10.763910417)} ft²`}</small></div></div>}</div><p className="calculator-usage-hint"><strong>Scope:</strong> this uses Q = A × v for a circular pipe with a known internal diameter. It is a continuity calculation, not a pressure-drop, pump-sizing, compressible-gas or code-compliance calculation.</p></div>;
}
