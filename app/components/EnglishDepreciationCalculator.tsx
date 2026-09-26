"use client";

import { useMemo, useState } from "react";
import { depreciationSchedule, type DepreciationMethod } from "../converter/englishToolFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

const money = (value: number) => `$${formatNumber(value, 2)}`;

export default function EnglishDepreciationCalculator() {
  const [method, setMethod] = useState<DepreciationMethod>("straight-line");
  const [cost, setCost] = useState("30000");
  const [salvage, setSalvage] = useState("5000");
  const [life, setLife] = useState("5");

  const rows = useMemo(
    () => depreciationSchedule(parseInput(cost) ?? NaN, parseInput(salvage) ?? 0, parseInput(life) ?? NaN, method),
    [cost, salvage, life, method]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<DepreciationMethod>
          label="Method"
          value={method}
          onChange={setMethod}
          options={[
            { value: "straight-line", label: "Straight-line" },
            { value: "double-declining", label: "Double-declining balance" },
            { value: "sum-of-years", label: "Sum-of-the-years' digits" },
          ]}
        />
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Asset cost ($)</span>
            <input inputMode="decimal" type="text" value={cost} onChange={(event) => setCost(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Salvage value ($)</span>
            <input inputMode="decimal" type="text" value={salvage} onChange={(event) => setSalvage(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Useful life (years)</span>
            <input inputMode="numeric" type="text" value={life} onChange={(event) => setLife(event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {rows ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>First-year depreciation</span>
              <strong>{money(rows[0].depreciation)}</strong>
            </div>
            <div>
              <span>Total depreciation</span>
              <strong>{money(rows[rows.length - 1].accumulated)}</strong>
            </div>
          </div>
        ) : (
          <strong>Enter a cost above the salvage value and a life of 1 to 100 years.</strong>
        )}
      </div>

      {rows && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Depreciation schedule</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Depreciation</th>
                <th scope="col">Accumulated</th>
                <th scope="col">Book value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{money(row.depreciation)}</td>
                  <td>{money(row.accumulated)}</td>
                  <td>{money(row.bookValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Note:</strong> these are book (accounting) depreciation methods. US tax depreciation normally uses
        MACRS tables and conventions set by the IRS, which give different yearly amounts – ask a tax professional for
        tax returns.
      </p>
    </div>
  );
}
