"use client";

import { useMemo, useState } from "react";

function formatNumber(value: number, digits = 6) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function parseValues(raw: string) {
  const values = raw.split(/[\s,]+/).filter(Boolean).map((value) => Number(value.replace(/,/g, ".")));
  return values.length > 0 && values.every(Number.isFinite) ? values : null;
}

export default function EnglishDescriptiveStatisticsCalculator() {
  const [rawValues, setRawValues] = useState("4, 7, 9, 10, 10");

  const result = useMemo(() => {
    const values = parseValues(rawValues);
    if (!values) return null;
    const sorted = [...values].sort((left, right) => left - right);
    const count = sorted.length;
    const sum = sorted.reduce((total, value) => total + value, 0);
    const mean = sum / count;
    const middle = Math.floor(count / 2);
    const median = count % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
    const frequencies = new Map<number, number>();
    sorted.forEach((value) => frequencies.set(value, (frequencies.get(value) ?? 0) + 1));
    const greatestFrequency = Math.max(...frequencies.values());
    const modes = greatestFrequency === 1 ? [] : [...frequencies.entries()].filter(([, frequency]) => frequency === greatestFrequency).map(([value]) => value);
    const squaredDifferences = sorted.reduce((total, value) => total + (value - mean) ** 2, 0);
    return {
      count,
      sum,
      sorted,
      mean,
      median,
      modes,
      range: sorted[count - 1] - sorted[0],
      populationStandardDeviation: Math.sqrt(squaredDifferences / count),
      sampleStandardDeviation: count > 1 ? Math.sqrt(squaredDifferences / (count - 1)) : null,
    };
  }, [rawValues]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">Enter numbers separated by commas or spaces. The same list is used for every result below.</p>
        <label className="category-general-converter-field"><span>Data values</span><textarea rows={4} value={rawValues} onChange={(event) => setRawValues(event.target.value)} /></label>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? <strong>Enter one or more valid numbers, separated by commas or spaces.</strong> : <div className="paint-calculator-result-grid">
          <div><span>Count</span><strong>{result.count}</strong></div>
          <div><span>Mean</span><strong>{formatNumber(result.mean)}</strong></div>
          <div><span>Median</span><strong>{formatNumber(result.median)}</strong></div>
          <div><span>Mode</span><strong>{result.modes.length ? result.modes.map((value) => formatNumber(value)).join(", ") : "No mode"}</strong></div>
          <div><span>Range</span><strong>{formatNumber(result.range)}</strong></div>
          <div><span>Population standard deviation</span><strong>{formatNumber(result.populationStandardDeviation)}</strong></div>
          <div><span>Sample standard deviation</span><strong>{result.sampleStandardDeviation === null ? "Needs at least 2 values" : formatNumber(result.sampleStandardDeviation)}</strong></div>
        </div>}
      </div>
      {result && <div className="calculator-steps"><h3>How the results were found</h3>
        <div className="calculator-step"><p className="calculator-step-title">1. Order the data</p><p className="calculator-step-line">{result.sorted.map((value) => formatNumber(value)).join(", ")}</p></div>
        <div className="calculator-step"><p className="calculator-step-title">2. Find the mean</p><p className="calculator-step-line">Sum = {formatNumber(result.sum)}; mean = {formatNumber(result.sum)} / {result.count} = {formatNumber(result.mean)}.</p></div>
        <div className="calculator-step"><p className="calculator-step-title">3. Find the middle and spread</p><p className="calculator-step-line">Median = {formatNumber(result.median)}; range = largest value - smallest value = {formatNumber(result.range)}.</p></div>
      </div>}
    </div>
  );
}
