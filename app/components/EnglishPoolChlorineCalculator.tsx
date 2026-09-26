"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { chlorineDose, chlorineProducts, type ChlorineProductId } from "../converter/englishToolFormulas";
import { formatNumber, parseInput } from "./englishFormHelpers";

export default function EnglishPoolChlorineCalculator() {
  const [gallons, setGallons] = useState("15000");
  const [current, setCurrent] = useState("1");
  const [target, setTarget] = useState("3");
  const [product, setProduct] = useState<ChlorineProductId>("liquid-12.5");

  const result = useMemo(
    () => chlorineDose(parseInput(gallons) ?? NaN, parseInput(current) ?? NaN, parseInput(target) ?? NaN, product),
    [gallons, current, target, product]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Pool volume (US gallons)</span>
          <input inputMode="decimal" type="text" value={gallons} onChange={(event) => setGallons(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Current free chlorine (ppm)</span>
          <input inputMode="decimal" type="text" value={current} onChange={(event) => setCurrent(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Target free chlorine (ppm)</span>
          <input inputMode="decimal" type="text" value={target} onChange={(event) => setTarget(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>Product</span>
          <select value={product} onChange={(event) => setProduct(event.target.value as ChlorineProductId)}>
            {chlorineProducts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Enter the pool volume, current and target chlorine.</strong>
        ) : result.alreadyAtTarget ? (
          <strong>The current level is already at or above the target – no chlorine needed.</strong>
        ) : result.kind === "liquid" ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Amount to add</span>
              <strong>{formatNumber(result.flOz, 1)} fl oz</strong>
            </div>
            <div>
              <span>In gallons</span>
              <strong>{formatNumber(result.gallons, 2)} gal</strong>
            </div>
            <div>
              <span>In milliliters</span>
              <strong>{formatNumber(result.ml, 0)} mL</strong>
            </div>
          </div>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Amount to add</span>
              <strong>{formatNumber(result.oz, 1)} oz (weight)</strong>
            </div>
            <div>
              <span>In pounds</span>
              <strong>{formatNumber(result.lb, 2)} lb</strong>
            </div>
            <div>
              <span>In grams</span>
              <strong>{formatNumber(result.grams, 0)} g</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Don&apos;t know the volume? Use the <Link href="/en/pool-volume-calculator">pool volume calculator</Link>.{" "}
        <strong>Safety:</strong> never mix chlorine products with each other or with acid, add chemicals to the water
        (not water to chemicals), keep swimmers out until levels are back in range and follow the product label.
        Bleach strength drops with age, so the actual rise may be lower.
      </p>
    </div>
  );
}
