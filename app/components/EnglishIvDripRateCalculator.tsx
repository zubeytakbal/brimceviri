"use client";

import { useMemo, useState } from "react";
import { calculateIvDripRate } from "../converter/ivDripRateCalculator";
import { formatNumber, parseInput } from "./englishFormHelpers";

export default function EnglishIvDripRateCalculator() {
  const [volume, setVolume] = useState("1000");
  const [hours, setHours] = useState("8");
  const [minutes, setMinutes] = useState("0");
  const [dropFactor, setDropFactor] = useState("15");

  const result = useMemo(() => {
    const totalMinutes = (parseInput(hours) ?? 0) * 60 + (parseInput(minutes) ?? 0);
    return calculateIvDripRate({
      volumeMl: parseInput(volume) ?? NaN,
      timeMinutes: totalMinutes,
      dropFactorGttPerMl: parseInput(dropFactor) ?? NaN,
    });
  }, [volume, hours, minutes, dropFactor]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Volume to infuse (mL)</span>
          <input inputMode="decimal" type="text" value={volume} onChange={(event) => setVolume(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Time – hours</span>
          <input inputMode="decimal" type="text" value={hours} onChange={(event) => setHours(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Time – minutes</span>
          <input inputMode="decimal" type="text" value={minutes} onChange={(event) => setMinutes(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Drop factor (gtt/mL)</span>
          <select value={dropFactor} onChange={(event) => setDropFactor(event.target.value)}>
            <option value="10">10 gtt/mL (macrodrip)</option>
            <option value="15">15 gtt/mL (macrodrip)</option>
            <option value="20">20 gtt/mL (macrodrip)</option>
            <option value="60">60 gtt/mL (microdrip)</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Drip rate</span>
              <strong>{formatNumber(result.dropsPerMinute, 1)} gtt/min</strong>
            </div>
            <div>
              <span>Rounded (count per minute)</span>
              <strong>{Math.round(result.dropsPerMinute)} gtt/min</strong>
            </div>
            <div>
              <span>Pump rate</span>
              <strong>{formatNumber(result.mlPerHour, 1)} mL/hr</strong>
            </div>
          </div>
        ) : (
          <strong>Enter a volume, an infusion time and a drop factor.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Important:</strong> this tool only does the arithmetic (gtt/min = volume × drop factor ÷ minutes).
        It does not check whether an order is appropriate. Always follow the prescriber&apos;s order, the tubing
        package label and your facility&apos;s protocol, and double-check high-alert infusions.
      </p>
    </div>
  );
}
