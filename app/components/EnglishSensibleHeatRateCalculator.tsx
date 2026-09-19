"use client";

import { useMemo, useState } from "react";

type MassFlowUnit = "kgs" | "kgh" | "lbmin";
type SpecificHeatUnit = "metric" | "imperial";
type DifferenceUnit = "c" | "f";

const massFlowFactors: Record<MassFlowUnit, number> = { kgs: 1, kgh: 1 / 3600, lbmin: 0.45359237 / 60 };

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishSensibleHeatRateCalculator() {
  const [massFlow, setMassFlow] = useState("1");
  const [massFlowUnit, setMassFlowUnit] = useState<MassFlowUnit>("kgs");
  const [specificHeat, setSpecificHeat] = useState("4.186");
  const [specificHeatUnit, setSpecificHeatUnit] = useState<SpecificHeatUnit>("metric");
  const [temperatureDifference, setTemperatureDifference] = useState("20");
  const [differenceUnit, setDifferenceUnit] = useState<DifferenceUnit>("c");
  const [duration, setDuration] = useState("1");

  const result = useMemo(() => {
    const values = [massFlow, specificHeat, temperatureDifference, duration].map(readNumber);
    if (values.some((value) => value === null)) return null;

    const [massFlowInput, cpInput, differenceInput, durationHours] = values as number[];
    if (massFlowInput <= 0 || cpInput <= 0 || differenceInput < 0 || durationHours <= 0) return null;

    const massFlowKgS = massFlowInput * massFlowFactors[massFlowUnit];
    const cpJkgK = specificHeatUnit === "imperial" ? cpInput * 4186.8 : cpInput * 1000;
    const differenceK = differenceUnit === "f" ? differenceInput * 5 / 9 : differenceInput;
    const heatRateW = massFlowKgS * cpJkgK * differenceK;

    return { heatRateW, massFlowKgS, cpJkgK, energyKwh: heatRateW * durationHours / 1000 };
  }, [differenceUnit, duration, massFlow, massFlowUnit, specificHeat, specificHeatUnit, temperatureDifference]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">This calculator is for sensible heating or cooling with no phase change. Use values at a consistent representative temperature.</p>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>Mass flow rate (ṁ)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={massFlow} onChange={(event) => setMassFlow(event.target.value)} /><select value={massFlowUnit} onChange={(event) => setMassFlowUnit(event.target.value as MassFlowUnit)}><option value="kgs">kg/s</option><option value="kgh">kg/h</option><option value="lbmin">lb/min</option></select></div></label>
          <label className="category-general-converter-field"><span>Specific heat (cₚ)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={specificHeat} onChange={(event) => setSpecificHeat(event.target.value)} /><select value={specificHeatUnit} onChange={(event) => setSpecificHeatUnit(event.target.value as SpecificHeatUnit)}><option value="metric">kJ/(kg·K)</option><option value="imperial">Btu/(lb·°F)</option></select></div></label>
          <label className="category-general-converter-field"><span>Temperature change (ΔT)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={temperatureDifference} onChange={(event) => setTemperatureDifference(event.target.value)} /><select value={differenceUnit} onChange={(event) => setDifferenceUnit(event.target.value as DifferenceUnit)}><option value="c">K or °C difference</option><option value="f">°F difference</option></select></div></label>
          <label className="category-general-converter-field"><span>Operating duration</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={duration} onChange={(event) => setDuration(event.target.value)} /><span>hours</span></div><small>Used only to calculate the stated-period energy.</small></label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter positive mass flow, specific heat and duration values. Temperature change can be zero or greater.</strong> : <div className="paint-calculator-result-grid"><div><span>Sensible heat-transfer rate</span><strong>{format(result.heatRateW / 1000)} kW</strong><small>{format(result.heatRateW * 3.412142)} Btu/h</small></div><div><span>Heat-capacity rate (ṁcₚ)</span><strong>{format(result.massFlowKgS * result.cpJkgK / 1000)} kW/K</strong><small>{format(result.massFlowKgS * result.cpJkgK / 1000 * 1.895634)} Btu/(h·°F)</small></div><div><span>Energy over stated duration</span><strong>{format(result.energyKwh)} kWh</strong><small>{format(result.energyKwh * 3412.142)} Btu</small></div></div>}
      </div>
      <p className="calculator-usage-hint"><strong>Important:</strong> this does not account for phase change, heat loss to surroundings, pressure effects or a strongly temperature-dependent specific heat. The energy result assumes the entered flow, specific heat and temperature change persist for the stated duration. Use enthalpy data for steam, refrigerants, boiling, condensation or large property changes.</p>
    </div>
  );
}
