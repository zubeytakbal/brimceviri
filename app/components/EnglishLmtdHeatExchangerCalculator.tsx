"use client";

import { useMemo, useState } from "react";

type FlowArrangement = "counterflow" | "parallel";
type TemperatureUnit = "c" | "f";
type UValueUnit = "metric" | "imperial";
type AreaUnit = "m2" | "ft2";

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishLmtdHeatExchangerCalculator() {
  const [arrangement, setArrangement] = useState<FlowArrangement>("counterflow");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("c");
  const [hotInlet, setHotInlet] = useState("120");
  const [hotOutlet, setHotOutlet] = useState("80");
  const [coldInlet, setColdInlet] = useState("20");
  const [coldOutlet, setColdOutlet] = useState("60");
  const [uValue, setUValue] = useState("200");
  const [uValueUnit, setUValueUnit] = useState<UValueUnit>("metric");
  const [area, setArea] = useState("10");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2");
  const [correctionFactor, setCorrectionFactor] = useState("1");
  const [duration, setDuration] = useState("1");

  const result = useMemo(() => {
    const values = [hotInlet, hotOutlet, coldInlet, coldOutlet, uValue, area, correctionFactor, duration].map(readNumber);
    if (values.some((value) => value === null)) return null;

    const [thi, tho, tci, tco, uInput, areaInput, factor, durationHours] = values as number[];
    if (uInput <= 0 || areaInput <= 0 || factor <= 0 || factor > 1 || durationHours <= 0) return null;

    const firstDifference = arrangement === "counterflow" ? thi - tco : thi - tci;
    const secondDifference = arrangement === "counterflow" ? tho - tci : tho - tco;
    if (firstDifference <= 0 || secondDifference <= 0) return null;

    const differenceScale = temperatureUnit === "f" ? 5 / 9 : 1;
    const firstDifferenceK = firstDifference * differenceScale;
    const secondDifferenceK = secondDifference * differenceScale;
    const lmtdK = Math.abs(firstDifferenceK - secondDifferenceK) < 1e-9
      ? firstDifferenceK
      : (firstDifferenceK - secondDifferenceK) / Math.log(firstDifferenceK / secondDifferenceK);
    const uMetric = uValueUnit === "imperial" ? uInput * 5.678263 : uInput;
    const areaM2 = areaUnit === "ft2" ? areaInput * 0.09290304 : areaInput;
    const baseHeatTransferW = uMetric * areaM2 * lmtdK;
    const heatTransferW = baseHeatTransferW * factor;

    return {
      firstDifferenceK,
      secondDifferenceK,
      lmtdK,
      baseHeatTransferW,
      heatTransferW,
      energyKwh: heatTransferW * durationHours / 1000,
    };
  }, [area, areaUnit, arrangement, coldInlet, coldOutlet, correctionFactor, duration, hotInlet, hotOutlet, temperatureUnit, uValue, uValueUnit]);

  const unitSymbol = temperatureUnit === "c" ? "°C" : "°F";

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Flow arrangement</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button type="button" className={`engineering-target-button${arrangement === "counterflow" ? " is-active" : ""}`} onClick={() => setArrangement("counterflow")}>Counterflow</button>
            <button type="button" className={`engineering-target-button${arrangement === "parallel" ? " is-active" : ""}`} onClick={() => setArrangement("parallel")}>Parallel flow</button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>Hot-fluid inlet</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={hotInlet} onChange={(event) => setHotInlet(event.target.value)} /><select value={temperatureUnit} onChange={(event) => setTemperatureUnit(event.target.value as TemperatureUnit)}><option value="c">°C</option><option value="f">°F</option></select></div></label>
          <label className="category-general-converter-field"><span>Hot-fluid outlet</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={hotOutlet} onChange={(event) => setHotOutlet(event.target.value)} /><span>{unitSymbol}</span></div></label>
          <label className="category-general-converter-field"><span>Cold-fluid inlet</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={coldInlet} onChange={(event) => setColdInlet(event.target.value)} /><span>{unitSymbol}</span></div></label>
          <label className="category-general-converter-field"><span>Cold-fluid outlet</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={coldOutlet} onChange={(event) => setColdOutlet(event.target.value)} /><span>{unitSymbol}</span></div></label>
          <label className="category-general-converter-field"><span>Overall heat-transfer coefficient (U)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={uValue} onChange={(event) => setUValue(event.target.value)} /><select value={uValueUnit} onChange={(event) => setUValueUnit(event.target.value as UValueUnit)}><option value="metric">W/(m²·K)</option><option value="imperial">Btu/(h·ft²·°F)</option></select></div></label>
          <label className="category-general-converter-field"><span>Heat-transfer area (A)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}><option value="m2">m²</option><option value="ft2">ft²</option></select></div></label>
          <label className="category-general-converter-field"><span>LMTD correction factor (F)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={correctionFactor} onChange={(event) => setCorrectionFactor(event.target.value)} /><span>0 to 1</span></div><small>Use 1 for true parallel or counterflow; enter a validated factor for other arrangements.</small></label>
          <label className="category-general-converter-field"><span>Operating duration</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={duration} onChange={(event) => setDuration(event.target.value)} /><span>hours</span></div><small>Used only to calculate the stated-period energy.</small></label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter a physically valid temperature profile, positive U-value, area and duration, plus a correction factor greater than 0 and no more than 1.</strong> : <div className="paint-calculator-result-grid"><div><span>Terminal difference 1</span><strong>{format(result.firstDifferenceK)} K</strong><small>{format(result.firstDifferenceK * 9 / 5)} °F difference</small></div><div><span>Terminal difference 2</span><strong>{format(result.secondDifferenceK)} K</strong><small>{format(result.secondDifferenceK * 9 / 5)} °F difference</small></div><div><span>Log mean temperature difference</span><strong>{format(result.lmtdK)} K</strong><small>{format(result.lmtdK * 9 / 5)} °F difference</small></div><div><span>Base heat-transfer rate (U × A × LMTD)</span><strong>{format(result.baseHeatTransferW / 1000)} kW</strong><small>Before the entered F correction</small></div><div><span>Corrected heat-transfer rate</span><strong>{format(result.heatTransferW / 1000)} kW</strong><small>{format(result.heatTransferW * 3.412142)} Btu/h</small></div><div><span>Energy over stated duration</span><strong>{format(result.energyKwh)} kWh</strong><small>{format(result.energyKwh * 3412.142)} Btu</small></div></div>}
      </div>

      <p className="calculator-usage-hint"><strong>Scope:</strong> this is the LMTD method for a stated steady temperature profile. The duration result assumes the temperatures, U-value, area and correction factor remain constant. Do not use it directly for phase change, crossflow or multi-pass exchangers without an appropriate correction factor and design method.</p>
    </div>
  );
}
