"use client";

import Link from "@/app/components/SiteLink";
import { useMemo, useState } from "react";
import { cubicYards, type VolumeShape } from "../converter/englishHomeYardFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

export default function EnglishCubicYardCalculator() {
  const [shape, setShape] = useState<VolumeShape>("rectangle");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [price, setPrice] = useState("");

  const result = useMemo(
    () => cubicYards(shape, parseInput(length) ?? NaN, parseInput(width) ?? NaN, parseInput(depth) ?? NaN),
    [shape, length, width, depth]
  );
  const priceValue = parseInput(price);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<VolumeShape>
          label="Shape"
          value={shape}
          onChange={setShape}
          options={[
            { value: "rectangle", label: "Rectangle (slab, bed, trench)" },
            { value: "circle", label: "Circle (round bed, hole)" },
          ]}
        />
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{shape === "circle" ? "Diameter (ft)" : "Length (ft)"}</span>
            <input inputMode="decimal" type="text" value={length} onChange={(event) => setLength(event.target.value)} />
          </label>
          {shape === "rectangle" && (
            <label className="category-general-converter-field">
              <span>Width (ft)</span>
              <input inputMode="decimal" type="text" value={width} onChange={(event) => setWidth(event.target.value)} />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Depth (inches)</span>
            <input inputMode="decimal" type="text" value={depth} onChange={(event) => setDepth(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Price per cubic yard ($, optional)</span>
            <input inputMode="decimal" type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Volume</span>
              <strong>{formatNumber(result.cubicYards, 2)} cu yd</strong>
            </div>
            <div>
              <span>Cubic feet</span>
              <strong>{formatNumber(result.cubicFeet, 1)} cu ft</strong>
            </div>
            <div>
              <span>Cubic meters</span>
              <strong>{formatNumber(result.cubicMeters, 2)} m³</strong>
            </div>
            <div>
              <span>Order (rounded up to ¼ yd)</span>
              <strong>{formatNumber(Math.ceil(result.cubicYards * 4) / 4, 2)} cu yd</strong>
            </div>
            {priceValue !== null && priceValue > 0 && (
              <div>
                <span>Estimated cost</span>
                <strong>${formatNumber(result.cubicYards * priceValue, 2)}</strong>
              </div>
            )}
          </div>
        ) : (
          <strong>Enter positive dimensions to see the volume.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        For concrete, use the <Link href="/en/concrete-calculator">concrete calculator</Link>; for gravel, soil or sand by
        weight (tons), use the <Link href="/en/gravel-soil-calculator">gravel and soil calculator</Link>.
      </p>
    </div>
  );
}
