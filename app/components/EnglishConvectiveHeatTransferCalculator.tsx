"use client";

import { useMemo, useState } from "react";

type CoefficientUnit = "metric" | "imperial";
type AreaUnit = "m2" | "ft2";
type DifferenceUnit = "c" | "f";

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishConvectiveHeatTransferCalculator() {
  const [coefficient, setCoefficient] = useState("25");
  const [coefficientUnit, setCoefficientUnit] = useState<CoefficientUnit>("metric");
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2");
  const [temperatureDifference, setTemperatureDifference] = useState("30");
  const [differenceUnit, setDifferenceUnit] = useState<DifferenceUnit>("c");
  const [duration, setDuration] = useState("1");

  const result = useMemo(() => {
    const values = [coefficient, area, temperatureDifference, duration].map(readNumber);
    if (values.some((value) => value === null)) return null;

    const [hInput, areaInput, differenceInput, durationHours] = values as number[];
    if (hInput <= 0 || areaInput <= 0 || differenceInput < 0 || durationHours <= 0) return null;

    const hMetric = coefficientUnit === "imperial" ? hInput * 5.678263 : hInput;
    const areaM2 = areaUnit === "ft2" ? areaInput * 0.09290304 : areaInput;
    const differenceK = differenceUnit === "f" ? differenceInput * 5 / 9 : differenceInput;
    const heatTransferW = hMetric * areaM2 * differenceK;

    return {
      heatTransferW,
      heatFluxWm2: hMetric * differenceK,
      energyKwh: heatTransferW * durationHours / 1000,
    };
  }, [area, areaUnit, coefficient, coefficientUnit, differenceUnit, duration, temperatureDifference]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">Enter an appropriate convection coefficient for the real fluid, flow regime, geometry and temperature range. This tool does not select h for you.</p>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>Convection coefficient (h)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={coefficient} onChange={(event) => setCoefficient(event.target.value)} /><select value={coefficientUnit} onChange={(event) => setCoefficientUnit(event.target.value as CoefficientUnit)}><option value="metric">W/(m²·K)</option><option value="imperial">Btu/(h·ft²·°F)</option></select></div></label>
          <label className="category-general-converter-field"><span>Surface area</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}><option value="m2">m²</option><option value="ft2">ft²</option></select></div></label>
          <label className="category-general-converter-field"><span>Surface-to-fluid temperature difference</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={temperatureDifference} onChange={(event) => setTemperatureDifference(event.target.value)} /><select value={differenceUnit} onChange={(event) => setDifferenceUnit(event.target.value as DifferenceUnit)}><option value="c">K or °C difference</option><option value="f">°F difference</option></select></div></label>
          <label className="category-general-converter-field"><span>Operating duration</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={duration} onChange={(event) => setDuration(event.target.value)} /><span>hours</span></div><small>Used only to calculate the stated-period energy.</small></label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter a positive coefficient, area and duration. Temperature difference can be zero or greater.</strong> : <div className="paint-calculator-result-grid"><div><span>Convective heat-transfer rate</span><strong>{format(result.heatTransferW)} W</strong><small>{format(result.heatTransferW * 3.412142)} Btu/h</small></div><div><span>Heat flux</span><strong>{format(result.heatFluxWm2)} W/m²</strong><small>q″ = h × ΔT</small></div><div><span>Energy over stated duration</span><strong>{format(result.energyKwh)} kWh</strong><small>{format(result.energyKwh * 3412.142)} Btu</small></div></div>}
      </div>
      <p className="calculator-usage-hint"><strong>Important:</strong> the temperature difference must be representative of the local surface-to-fluid driving force. The energy result assumes that h, area and temperature difference remain constant for the stated duration. For a heat exchanger with varying temperatures, use an LMTD or effectiveness-NTU method instead.</p>
    </div>
  );
}
