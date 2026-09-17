"use client";

import { useMemo, useState } from "react";

type UValueUnit = "metric" | "imperial";
type AreaUnit = "m2" | "ft2";
type TemperatureDifferenceUnit = "c" | "f";

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishHeatLossCalculator() {
  const [uValue, setUValue] = useState("0.3");
  const [uValueUnit, setUValueUnit] = useState<UValueUnit>("metric");
  const [area, setArea] = useState("100");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2");
  const [temperatureDifference, setTemperatureDifference] = useState("20");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureDifferenceUnit>("c");
  const [hours, setHours] = useState("24");

  const result = useMemo(() => {
    const values = [uValue, area, temperatureDifference, hours].map(readNumber);
    if (values.some((value) => value === null)) return null;
    const [uInput, areaInput, differenceInput, durationHours] = values as number[];
    if (uInput <= 0 || areaInput <= 0 || differenceInput < 0 || durationHours <= 0) return null;

    const uMetric = uValueUnit === "imperial" ? uInput * 5.678263 : uInput;
    const areaM2 = areaUnit === "ft2" ? areaInput * 0.09290304 : areaInput;
    const differenceK = temperatureUnit === "f" ? differenceInput * 5 / 9 : differenceInput;
    const heatLossW = uMetric * areaM2 * differenceK;

    return { heatLossW, energyKwh: heatLossW * durationHours / 1000 };
  }, [area, areaUnit, hours, temperatureDifference, temperatureUnit, uValue, uValueUnit]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">Use a whole-assembly U-value for the specific wall, roof, floor, window or other surface. Enter the average indoor-to-outdoor temperature difference for the period you want to screen.</p>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>U-value</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={uValue} onChange={(event) => setUValue(event.target.value)} /><select value={uValueUnit} onChange={(event) => setUValueUnit(event.target.value as UValueUnit)}><option value="metric">W/(m²·K)</option><option value="imperial">Btu/(h·ft²·°F)</option></select></div></label>
          <label className="category-general-converter-field"><span>Surface area</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}><option value="m2">m²</option><option value="ft2">ft²</option></select></div></label>
          <label className="category-general-converter-field"><span>Temperature difference (ΔT)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={temperatureDifference} onChange={(event) => setTemperatureDifference(event.target.value)} /><select value={temperatureUnit} onChange={(event) => setTemperatureUnit(event.target.value as TemperatureDifferenceUnit)}><option value="c">K or °C difference</option><option value="f">°F difference</option></select></div></label>
          <label className="category-general-converter-field"><span>Duration</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={hours} onChange={(event) => setHours(event.target.value)} /><span>hours</span></div></label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter positive U-value, area and duration values. Temperature difference can be zero or greater.</strong> : <div className="paint-calculator-result-grid"><div><span>Steady heat-loss rate</span><strong>{format(result.heatLossW)} W</strong><small>{format(result.heatLossW * 3.412142)} Btu/h</small></div><div><span>Energy over stated duration</span><strong>{format(result.energyKwh)} kWh</strong><small>{format(result.energyKwh * 3412.142)} Btu</small></div></div>}
      </div>
      <p className="calculator-usage-hint"><strong>Important:</strong> this is conduction through one stated surface only: Q = U × A × ΔT. It excludes air leakage, thermal bridges, solar gain, internal gains, changing weather, HVAC efficiency and interaction with other building elements.</p>
    </div>
  );
}
