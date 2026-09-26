"use client";

import { useMemo, useState } from "react";
import { ML_PER_US_FL_OZ, standardDrinks } from "../converter/englishToolFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

type VolumeUnit = "fl-oz" | "ml";

const examples = [
  { drink: "Regular beer, 12 fl oz", ml: 12 * ML_PER_US_FL_OZ, abv: 5 },
  { drink: "Malt liquor, 8–9 fl oz", ml: 8.5 * ML_PER_US_FL_OZ, abv: 7 },
  { drink: "Wine, 5 fl oz", ml: 5 * ML_PER_US_FL_OZ, abv: 12 },
  { drink: "Distilled spirits, 1.5 fl oz (80 proof)", ml: 1.5 * ML_PER_US_FL_OZ, abv: 40 },
];

export default function EnglishStandardDrinkCalculator() {
  const [unit, setUnit] = useState<VolumeUnit>("fl-oz");
  const [volume, setVolume] = useState("12");
  const [abv, setAbv] = useState("5");
  const [count, setCount] = useState("1");

  const result = useMemo(() => {
    const volumeValue = parseInput(volume);
    const countValue = parseInput(count) ?? 1;
    if (volumeValue === null || countValue <= 0) return null;
    const ml = (unit === "fl-oz" ? volumeValue * ML_PER_US_FL_OZ : volumeValue) * countValue;
    return standardDrinks(ml, parseInput(abv) ?? NaN);
  }, [unit, volume, abv, count]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<VolumeUnit>
          label="Volume unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "fl-oz", label: "US fl oz" },
            { value: "ml", label: "mL" },
          ]}
        />
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Serving size ({unit === "fl-oz" ? "fl oz" : "mL"})</span>
            <input inputMode="decimal" type="text" value={volume} onChange={(event) => setVolume(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Alcohol by volume, ABV (%)</span>
            <input inputMode="decimal" type="text" value={abv} onChange={(event) => setAbv(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Number of servings</span>
            <input inputMode="numeric" type="text" value={count} onChange={(event) => setCount(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>US standard drinks (14 g)</span>
              <strong>{formatNumber(result.usDrinks, 2)}</strong>
            </div>
            <div>
              <span>UK units (8 g / 10 mL)</span>
              <strong>{formatNumber(result.ukUnits, 2)}</strong>
            </div>
            <div>
              <span>Australian standard drinks (10 g)</span>
              <strong>{formatNumber(result.australianDrinks, 2)}</strong>
            </div>
            <div>
              <span>Pure alcohol</span>
              <strong>
                {formatNumber(result.alcoholGrams, 1)} g ({formatNumber(result.alcoholMl, 1)} mL)
              </strong>
            </div>
          </div>
        ) : (
          <strong>Enter a serving size and an ABV between 0 and 100%.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>What counts as one US standard drink (about 14 g of alcohol)</caption>
          <thead>
            <tr>
              <th scope="col">Drink</th>
              <th scope="col">Typical ABV</th>
              <th scope="col">US standard drinks</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((row) => (
              <tr key={row.drink}>
                <td>{row.drink}</td>
                <td>{row.abv}%</td>
                <td>{formatNumber(standardDrinks(row.ml, row.abv)!.usDrinks, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Note:</strong> the US Dietary Guidelines suggest up to 2 drinks a day for men and 1 for women, if you
        drink at all. Standard drinks say nothing about whether it is safe to drive – do not drink and drive.
      </p>
    </div>
  );
}
