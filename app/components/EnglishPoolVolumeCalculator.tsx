"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { poolVolume, type PoolShape } from "../converter/englishToolFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

export default function EnglishPoolVolumeCalculator() {
  const [shape, setShape] = useState<PoolShape>("rectangle");
  const [length, setLength] = useState("32");
  const [width, setWidth] = useState("16");
  const [shallow, setShallow] = useState("3.5");
  const [deep, setDeep] = useState("8");

  const result = useMemo(
    () => poolVolume(shape, parseInput(length) ?? NaN, parseInput(width) ?? NaN, parseInput(shallow) ?? NaN, parseInput(deep) ?? NaN),
    [shape, length, width, shallow, deep]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<PoolShape>
          label="Pool shape"
          value={shape}
          onChange={setShape}
          options={[
            { value: "rectangle", label: "Rectangle" },
            { value: "round", label: "Round" },
            { value: "oval", label: "Oval" },
          ]}
        />
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{shape === "round" ? "Diameter (ft)" : "Length (ft)"}</span>
            <input inputMode="decimal" type="text" value={length} onChange={(event) => setLength(event.target.value)} />
          </label>
          {shape !== "round" && (
            <label className="category-general-converter-field">
              <span>Width (ft)</span>
              <input inputMode="decimal" type="text" value={width} onChange={(event) => setWidth(event.target.value)} />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Shallow end depth (ft)</span>
            <input inputMode="decimal" type="text" value={shallow} onChange={(event) => setShallow(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Deep end depth (ft, optional)</span>
            <input inputMode="decimal" type="text" value={deep} onChange={(event) => setDeep(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Pool volume</span>
              <strong>{formatNumber(result.gallons, 0)} US gallons</strong>
            </div>
            <div>
              <span>Liters</span>
              <strong>{formatNumber(result.liters, 0)} L</strong>
            </div>
            <div>
              <span>Cubic feet</span>
              <strong>{formatNumber(result.cubicFeet, 0)} cu ft</strong>
            </div>
            <div>
              <span>Average depth used</span>
              <strong>{formatNumber(result.averageDepthFt, 2)} ft</strong>
            </div>
          </div>
        ) : (
          <strong>Enter the pool size and at least one depth.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        Next step: use the gallons with the <Link href="/en/pool-chlorine-calculator">pool chlorine calculator</Link>{" "}
        to dose chemicals.
      </p>
    </div>
  );
}
