"use client";

import { useMemo, useState } from "react";
import { mulchNeeded } from "../converter/englishHomeYardFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

type InputMode = "dimensions" | "area";

const depthGuide = [
  { material: "Fine mulch or compost", depth: "1–2 in" },
  { material: "Shredded bark or wood chips (beds)", depth: "2–3 in" },
  { material: "Coarse wood chips (paths, around trees)", depth: "3–4 in" },
  { material: "Playground mulch", depth: "9–12 in" },
];

export default function EnglishMulchCalculator() {
  const [mode, setMode] = useState<InputMode>("dimensions");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [area, setArea] = useState("200");
  const [depth, setDepth] = useState("3");
  const [pricePerYard, setPricePerYard] = useState("");

  const areaSqFt = mode === "area" ? parseInput(area) ?? NaN : (parseInput(length) ?? NaN) * (parseInput(width) ?? NaN);
  const result = useMemo(() => mulchNeeded(areaSqFt, parseInput(depth) ?? NaN), [areaSqFt, depth]);
  const priceValue = parseInput(pricePerYard);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<InputMode>
          label="Enter the bed as"
          value={mode}
          onChange={setMode}
          options={[
            { value: "dimensions", label: "Length × width" },
            { value: "area", label: "Square feet" },
          ]}
        />
        <div className="paint-calculator-grid">
          {mode === "dimensions" ? (
            <>
              <label className="category-general-converter-field">
                <span>Length (ft)</span>
                <input inputMode="decimal" type="text" value={length} onChange={(event) => setLength(event.target.value)} />
              </label>
              <label className="category-general-converter-field">
                <span>Width (ft)</span>
                <input inputMode="decimal" type="text" value={width} onChange={(event) => setWidth(event.target.value)} />
              </label>
            </>
          ) : (
            <label className="category-general-converter-field">
              <span>Area (sq ft)</span>
              <input inputMode="decimal" type="text" value={area} onChange={(event) => setArea(event.target.value)} />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Depth (inches)</span>
            <input inputMode="decimal" type="text" value={depth} onChange={(event) => setDepth(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Bulk price per cu yd ($, optional)</span>
            <input inputMode="decimal" type="text" value={pricePerYard} onChange={(event) => setPricePerYard(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Mulch needed</span>
              <strong>{formatNumber(result.cubicYards, 2)} cu yd</strong>
            </div>
            <div>
              <span>Cubic feet</span>
              <strong>{formatNumber(result.cubicFeet, 1)} cu ft</strong>
            </div>
            {result.bags.map((bag) => (
              <div key={bag.cubicFeet}>
                <span>{bag.label}s</span>
                <strong>{bag.count} bags</strong>
              </div>
            ))}
            {priceValue !== null && priceValue > 0 && (
              <div>
                <span>Bulk cost estimate</span>
                <strong>${formatNumber(result.cubicYards * priceValue, 2)}</strong>
              </div>
            )}
          </div>
        ) : (
          <strong>Enter the bed size and a depth greater than 0.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Recommended mulch depth</caption>
          <thead>
            <tr>
              <th scope="col">Material / use</th>
              <th scope="col">Depth</th>
            </tr>
          </thead>
          <tbody>
            {depthGuide.map((row) => (
              <tr key={row.material}>
                <td>{row.material}</td>
                <td>{row.depth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
