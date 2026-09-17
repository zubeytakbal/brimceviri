"use client";

import { useMemo, useState } from "react";
import { calculatePumpPower } from "../converter/pumpPower";

const flowFactors = { lps: 0.001, m3h: 1 / 3600, gpm: 0.0000630902 } as const;

function readNumber(value: string) {
  const result = Number(value.trim().replace(",", "."));
  return Number.isFinite(result) ? result : Number.NaN;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function formatEnergy(valueKwh: number) {
  return valueKwh >= 1000 ? `${format(valueKwh / 1000)} MWh/year` : `${format(valueKwh)} kWh/year`;
}

export default function EnglishPumpPowerCalculator() {
  const [flow, setFlow] = useState("50");
  const [flowUnit, setFlowUnit] = useState<keyof typeof flowFactors>("m3h");
  const [head, setHead] = useState("30");
  const [headUnit, setHeadUnit] = useState<"m" | "ft">("m");
  const [density, setDensity] = useState("998");
  const [pumpEfficiency, setPumpEfficiency] = useState("75");
  const [motorEfficiency, setMotorEfficiency] = useState("90");
  const [annualHours, setAnnualHours] = useState("4000");
  const [electricityRate, setElectricityRate] = useState("0.12");

  const result = useMemo(() => calculatePumpPower({
    flowM3S: readNumber(flow) * flowFactors[flowUnit],
    totalDynamicHeadM: readNumber(head) * (headUnit === "ft" ? 0.3048 : 1),
    densityKgM3: readNumber(density),
    pumpEfficiency: readNumber(pumpEfficiency) / 100,
    motorEfficiency: readNumber(motorEfficiency) / 100,
  }), [density, flow, flowUnit, head, headUnit, motorEfficiency, pumpEfficiency]);

  const annualEnergyKwh = result ? (result.electricalInputPowerW / 1000) * readNumber(annualHours) : Number.NaN;
  const annualEnergyCost = annualEnergyKwh * readNumber(electricityRate);
  const operatingEstimateIsValid = Number.isFinite(annualEnergyKwh) && annualEnergyKwh >= 0 && Number.isFinite(annualEnergyCost) && annualEnergyCost >= 0;

  return <div className="category-general-converter"><div className="paint-calculator-grid">
    <label className="category-general-converter-field"><span>Flow rate (Q)</span><div className="category-general-converter-input-row"><input value={flow} inputMode="decimal" onChange={(event) => setFlow(event.target.value)} /><select value={flowUnit} onChange={(event) => setFlowUnit(event.target.value as keyof typeof flowFactors)}><option value="lps">L/s</option><option value="m3h">m³/h</option><option value="gpm">US gpm</option></select></div></label>
    <label className="category-general-converter-field"><span>Total dynamic head (H)</span><div className="category-general-converter-input-row"><input value={head} inputMode="decimal" onChange={(event) => setHead(event.target.value)} /><select value={headUnit} onChange={(event) => setHeadUnit(event.target.value as "m" | "ft")}><option value="m">m</option><option value="ft">ft</option></select></div><small>Include static lift and applicable pressure/loss head.</small></label>
    <label className="category-general-converter-field"><span>Fluid density</span><div className="category-general-converter-input-row"><input value={density} inputMode="decimal" onChange={(event) => setDensity(event.target.value)} /><span>kg/m³</span></div></label>
    <label className="category-general-converter-field"><span>Pump efficiency</span><div className="category-general-converter-input-row"><input value={pumpEfficiency} inputMode="decimal" onChange={(event) => setPumpEfficiency(event.target.value)} /><span>%</span></div></label>
    <label className="category-general-converter-field"><span>Motor efficiency</span><div className="category-general-converter-input-row"><input value={motorEfficiency} inputMode="decimal" onChange={(event) => setMotorEfficiency(event.target.value)} /><span>%</span></div></label>
    <label className="category-general-converter-field"><span>Annual operating hours</span><div className="category-general-converter-input-row"><input value={annualHours} inputMode="decimal" onChange={(event) => setAnnualHours(event.target.value)} /><span>h/year</span></div></label>
    <label className="category-general-converter-field"><span>Electricity price</span><div className="category-general-converter-input-row"><input value={electricityRate} inputMode="decimal" onChange={(event) => setElectricityRate(event.target.value)} /><span>currency/kWh</span></div><small>Use your local tariff; the cost result uses the same currency unit.</small></label>
  </div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter positive duty values and efficiencies up to 100%.</strong> : <div className="paint-calculator-result-grid"><div><span>Hydraulic power</span><strong>{format(result.hydraulicPowerW / 1000)} kW</strong><small>ρgQH</small></div><div><span>Shaft power</span><strong>{format(result.shaftPowerW / 1000)} kW</strong><small>After pump efficiency</small></div><div><span>Electrical input</span><strong>{format(result.electricalInputPowerW / 1000)} kW</strong><small>{format(result.electricalInputPowerW / 745.7)} hp · before drive losses</small></div><div><span>Annual energy</span><strong>{operatingEstimateIsValid ? formatEnergy(annualEnergyKwh) : "—"}</strong><small>At the entered annual operating hours</small></div><div><span>Annual electricity cost</span><strong>{operatingEstimateIsValid ? `${format(annualEnergyCost)} currency/year` : "—"}</strong><small>Uses your entered electricity price</small></div></div>}</div><p className="calculator-usage-hint"><strong>Scope:</strong> One-duty-point estimate only. Annual energy assumes this duty and electrical input remain constant for every entered operating hour. It does not select a pump, create a system curve, check NPSH/cavitation, account for viscosity correction, variable-speed drive losses, tariffs or provide motor sizing.</p></div>;
}
