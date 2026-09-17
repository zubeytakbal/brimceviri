"use client";

import { useMemo, useState } from "react";
import { calculateVehicleRunningCostComparison } from "../converter/evVsIceComparison";

type System = "metric" | "us";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

type Inputs = {
  annualDistance: string;
  fuelConsumption: string;
  fuelPrice: string;
  evConsumption: string;
  electricityPrice: string;
  purchasePremium: string;
};

const initialInputs: Record<System, Inputs> = {
  metric: {
    annualDistance: "15000",
    fuelConsumption: "7.5",
    fuelPrice: "1.60",
    evConsumption: "18",
    electricityPrice: "0.25",
    purchasePremium: "",
  },
  us: {
    annualDistance: "12000",
    fuelConsumption: "30",
    fuelPrice: "3.50",
    evConsumption: "30",
    electricityPrice: "0.18",
    purchasePremium: "",
  },
};

function parseNumber(value: string) {
  const number = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(number) ? number : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export default function EnglishEvVsGasRunningCostCalculator() {
  const [system, setSystem] = useState<System>("metric");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [inputsBySystem, setInputsBySystem] = useState(initialInputs);
  const inputs = inputsBySystem[system];
  const metric = system === "metric";

  const result = useMemo(() => {
    const fuelConsumption = parseNumber(inputs.fuelConsumption);
    return calculateVehicleRunningCostComparison({
      annualDistance: parseNumber(inputs.annualDistance),
      // MPG is converted to gallons per 100 miles before the shared calculation.
      fuelUnitsPer100Distance: metric ? fuelConsumption : 100 / fuelConsumption,
      fuelPricePerUnit: parseNumber(inputs.fuelPrice),
      evEnergyUnitsPer100Distance: parseNumber(inputs.evConsumption),
      electricityPricePerUnit: parseNumber(inputs.electricityPrice),
      purchasePremium: inputs.purchasePremium.trim()
        ? parseNumber(inputs.purchasePremium)
        : 0,
    });
  }, [inputs, metric]);

  const updateInput = (field: keyof Inputs, value: string) => {
    setInputsBySystem((current) => ({
      ...current,
      [system]: { ...current[system], [field]: value },
    }));
  };

  const currencyFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const distanceUnit = metric ? "km" : "mi";
  const fuelUnit = metric ? "L" : "gal";

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Measurement system</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button type="button" className={`engineering-target-button${metric ? " is-active" : ""}`} onClick={() => setSystem("metric")}>Metric</button>
            <button type="button" className={`engineering-target-button${!metric ? " is-active" : ""}`} onClick={() => setSystem("us")}>US customary</button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Display currency</span>
            <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>Annual distance ({distanceUnit})</span>
            <input type="text" inputMode="decimal" value={inputs.annualDistance} onChange={(event) => updateInput("annualDistance", event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>{metric ? "Gas vehicle consumption (L/100 km)" : "Gas vehicle efficiency (mpg)"}</span>
            <input type="text" inputMode="decimal" value={inputs.fuelConsumption} onChange={(event) => updateInput("fuelConsumption", event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Gas price ({currency}/{fuelUnit})</span>
            <input type="text" inputMode="decimal" value={inputs.fuelPrice} onChange={(event) => updateInput("fuelPrice", event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>EV consumption (kWh/100 {distanceUnit})</span>
            <input type="text" inputMode="decimal" value={inputs.evConsumption} onChange={(event) => updateInput("evConsumption", event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Electricity price ({currency}/kWh)</span>
            <input type="text" inputMode="decimal" value={inputs.electricityPrice} onChange={(event) => updateInput("electricityPrice", event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Optional EV purchase premium ({currency})</span>
            <input type="text" inputMode="decimal" placeholder="Leave blank to compare running costs only" value={inputs.purchasePremium} onChange={(event) => updateInput("purchasePremium", event.target.value)} />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Enter valid positive values to compare annual running costs.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr><td>Annual gas cost</td><td>{currencyFormat(result.annualFuelCost)}</td></tr>
                <tr><td>Annual EV electricity cost</td><td>{currencyFormat(result.annualElectricityCost)}</td></tr>
                <tr className="is-active"><td><strong>Annual operating difference</strong></td><td><strong>{currencyFormat(Math.abs(result.annualOperatingSavings))} {result.annualOperatingSavings >= 0 ? "less with the EV" : "more with the EV"}</strong></td></tr>
                <tr><td>Simple payback</td><td>{inputs.purchasePremium.trim() ? result.breakEvenYears === null ? "No payback from these running costs" : `${formatNumber(result.breakEvenYears)} years (about ${formatNumber(result.breakEvenDistance ?? 0, 0)} ${distanceUnit})` : "Add a purchase premium to estimate"}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint"><strong>How to use this:</strong> enter the prices you actually pay. This is a running-cost estimate: it excludes insurance, finance, maintenance, taxes, public-charging fees and charging losses unless they are already reflected in your inputs.</p>
    </div>
  );
}
