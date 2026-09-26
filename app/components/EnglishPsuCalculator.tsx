"use client";

import { useMemo, useState } from "react";
import { calculatePsuWattage } from "../converter/psuCalculator";
import { formatNumber, parseInput } from "./englishFormHelpers";

const standardPsuSizes = [450, 550, 650, 750, 850, 1000, 1200, 1300, 1600];

export default function EnglishPsuCalculator() {
  const [cpu, setCpu] = useState("125");
  const [gpu, setGpu] = useState("285");
  const [other, setOther] = useState("75");
  const [headroom, setHeadroom] = useState("30");

  const result = useMemo(() => {
    const cpuValue = parseInput(cpu);
    const recommended = calculatePsuWattage({
      cpuWatt: cpuValue ?? NaN,
      gpuWatt: parseInput(gpu) ?? 0,
      otherWatt: parseInput(other) ?? 0,
      headroomPercent: parseInput(headroom) ?? 0,
    });
    if (recommended === null) return null;
    const load = (cpuValue ?? 0) + (parseInput(gpu) ?? 0) + (parseInput(other) ?? 0);
    const size = standardPsuSizes.find((candidate) => candidate >= recommended) ?? null;
    return { load, recommended, size };
  }, [cpu, gpu, other, headroom]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>CPU power / TDP (W)</span>
          <input inputMode="decimal" type="text" value={cpu} onChange={(event) => setCpu(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Graphics card total board power (W)</span>
          <input inputMode="decimal" type="text" value={gpu} onChange={(event) => setGpu(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Other parts – motherboard, RAM, drives, fans (W)</span>
          <input inputMode="decimal" type="text" value={other} onChange={(event) => setOther(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Headroom (%)</span>
          <input inputMode="decimal" type="text" value={headroom} onChange={(event) => setHeadroom(event.target.value)} />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Estimated load</span>
              <strong>{formatNumber(result.load, 0)} W</strong>
            </div>
            <div>
              <span>With headroom</span>
              <strong>{formatNumber(result.recommended, 0)} W</strong>
            </div>
            <div>
              <span>Suggested PSU size</span>
              <strong>{result.size ? `${result.size} W` : "Above 1,600 W – check the GPU maker's guidance"}</strong>
            </div>
          </div>
        ) : (
          <strong>Enter at least the CPU power.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Note:</strong> use the graphics card&apos;s total board power (TBP) rather than chip TDP, and check the
        card maker&apos;s recommended PSU. High-end GPUs can draw short power spikes well above their rating, which is
        why 20–30% headroom is common.
      </p>
    </div>
  );
}
