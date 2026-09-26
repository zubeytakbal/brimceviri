"use client";

import { useMemo, useState } from "react";
import { convertFuelEconomy, fuelEconomyUnits, type FuelEconomyUnit } from "../converter/englishEverydayFormulas";
import { formatNumber, parseInput } from "./englishFormHelpers";

const referenceMpg = [15, 20, 25, 30, 35, 40, 45, 50, 60];

export default function EnglishFuelEconomyConverter({
  defaultUnit = "mpg-us",
}: {
  defaultUnit?: FuelEconomyUnit;
  locale?: "en";
}) {
  const [value, setValue] = useState(defaultUnit === "l-100km" ? "8" : "30");
  const [unit, setUnit] = useState<FuelEconomyUnit>(defaultUnit);

  const result = useMemo(() => {
    const parsed = parseInput(value);
    return parsed === null ? null : convertFuelEconomy(parsed, unit);
  }, [value, unit]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Fuel economy</span>
            <input inputMode="decimal" type="text" value={value} onChange={(event) => setValue(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Unit</span>
            <select value={unit} onChange={(event) => setUnit(event.target.value as FuelEconomyUnit)}>
              {fuelEconomyUnits.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            {fuelEconomyUnits
              .filter((option) => option.id !== unit)
              .map((option) => (
                <div key={option.id}>
                  <span>{option.label}</span>
                  <strong>
                    {formatNumber(result[option.id], 2)} {option.short}
                  </strong>
                </div>
              ))}
          </div>
        ) : (
          <strong>Enter a fuel economy value greater than 0.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>MPG to L/100 km reference table</caption>
          <thead>
            <tr>
              <th scope="col">mpg (US)</th>
              <th scope="col">L/100 km</th>
              <th scope="col">mpg (UK)</th>
              <th scope="col">km/L</th>
            </tr>
          </thead>
          <tbody>
            {referenceMpg.map((mpg) => {
              const row = convertFuelEconomy(mpg, "mpg-us")!;
              return (
                <tr key={mpg}>
                  <td>{mpg}</td>
                  <td>{formatNumber(row["l-100km"], 2)}</td>
                  <td>{formatNumber(row["mpg-uk"], 1)}</td>
                  <td>{formatNumber(row["km-l"], 2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
