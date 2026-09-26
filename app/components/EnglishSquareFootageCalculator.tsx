"use client";

import { useMemo, useState } from "react";
import { feetAndInches, totalSquareFeet, type AreaShape } from "../converter/englishHomeYardFormulas";
import { formatNumber, parseInput } from "./englishFormHelpers";

type Section = { id: number; shape: AreaShape; aFt: string; aIn: string; bFt: string; bIn: string };

const shapeLabels: Record<AreaShape, { a: string; b: string; name: string }> = {
  rectangle: { a: "Length", b: "Width", name: "Rectangle" },
  triangle: { a: "Base", b: "Height", name: "Triangle" },
  circle: { a: "Diameter", b: "", name: "Circle" },
};

export default function EnglishSquareFootageCalculator() {
  const [sections, setSections] = useState<Section[]>([{ id: 1, shape: "rectangle", aFt: "12", aIn: "", bFt: "15", bIn: "" }]);
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");

  const result = useMemo(
    () =>
      totalSquareFeet(
        sections.map((section) => ({
          shape: section.shape,
          a: feetAndInches(parseInput(section.aFt) ?? NaN, parseInput(section.aIn) ?? 0),
          b: feetAndInches(parseInput(section.bFt) ?? NaN, parseInput(section.bIn) ?? 0),
        })),
        parseInput(waste) ?? 0
      ),
    [sections, waste]
  );
  const priceValue = parseInput(price);

  const update = (id: number, patch: Partial<Section>) =>
    setSections((previous) => previous.map((section) => (section.id === id ? { ...section, ...patch } : section)));

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Split an L-shaped or irregular room into rectangles, triangles and circles and add them up. Enter feet and,
          if needed, extra inches.
        </p>
        {sections.map((section, index) => {
          const labels = shapeLabels[section.shape];
          return (
            <div className="paint-calculator-grid" key={section.id}>
              <label className="category-general-converter-field">
                <span>Area {index + 1} shape</span>
                <select value={section.shape} onChange={(event) => update(section.id, { shape: event.target.value as AreaShape })}>
                  {(Object.keys(shapeLabels) as AreaShape[]).map((shape) => (
                    <option key={shape} value={shape}>
                      {shapeLabels[shape].name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="category-general-converter-field">
                <span>{labels.a} (ft)</span>
                <input inputMode="decimal" type="text" value={section.aFt} onChange={(event) => update(section.id, { aFt: event.target.value })} />
              </label>
              <label className="category-general-converter-field">
                <span>+ inches</span>
                <input inputMode="decimal" type="text" value={section.aIn} onChange={(event) => update(section.id, { aIn: event.target.value })} />
              </label>
              {section.shape !== "circle" && (
                <>
                  <label className="category-general-converter-field">
                    <span>{labels.b} (ft)</span>
                    <input inputMode="decimal" type="text" value={section.bFt} onChange={(event) => update(section.id, { bFt: event.target.value })} />
                  </label>
                  <label className="category-general-converter-field">
                    <span>+ inches</span>
                    <input inputMode="decimal" type="text" value={section.bIn} onChange={(event) => update(section.id, { bIn: event.target.value })} />
                  </label>
                </>
              )}
            </div>
          );
        })}
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className="engineering-target-button"
            onClick={() => setSections((previous) => [...previous, { id: Date.now(), shape: "rectangle", aFt: "", aIn: "", bFt: "", bIn: "" }])}
          >
            + Add area
          </button>
          {sections.length > 1 && (
            <button type="button" className="engineering-target-button" onClick={() => setSections((previous) => previous.slice(0, -1))}>
              Remove last
            </button>
          )}
        </div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Waste allowance (%)</span>
            <input inputMode="decimal" type="text" value={waste} onChange={(event) => setWaste(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Price per sq ft ($, optional)</span>
            <input inputMode="decimal" type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Total area</span>
              <strong>{formatNumber(result.sqFt, 2)} sq ft</strong>
            </div>
            <div>
              <span>With waste allowance</span>
              <strong>{formatNumber(result.withWaste, 2)} sq ft</strong>
            </div>
            <div>
              <span>Square meters</span>
              <strong>{formatNumber(result.sqM, 2)} m²</strong>
            </div>
            <div>
              <span>Square yards</span>
              <strong>{formatNumber(result.sqYd, 2)} sq yd</strong>
            </div>
            {priceValue !== null && priceValue > 0 && (
              <div>
                <span>Estimated cost (with waste)</span>
                <strong>${formatNumber(result.withWaste * priceValue, 2)}</strong>
              </div>
            )}
          </div>
        ) : (
          <strong>Enter at least one area with positive dimensions.</strong>
        )}
      </div>
    </div>
  );
}
