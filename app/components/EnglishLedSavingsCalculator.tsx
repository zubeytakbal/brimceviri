"use client";

import { useMemo, useState } from "react";
import { bulbEquivalents, calculateLightingEnergySavings } from "../converter/ledVsIncandescent";

type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

function parseNumber(value: string) {
  const number = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(number) ? number : Number.NaN;
}

export default function EnglishLedSavingsCalculator() {
  const [bulbCount, setBulbCount] = useState("6");
  const [dailyUsage, setDailyUsage] = useState("4");
  const [oldWattage, setOldWattage] = useState("60");
  const [ledWattage, setLedWattage] = useState("9");
  const [electricityPrice, setElectricityPrice] = useState("0.18");
  const [replacementCost, setReplacementCost] = useState("30");
  const [currency, setCurrency] = useState<Currency>("USD");

  const result = useMemo(() => calculateLightingEnergySavings({
    bulbCount: parseNumber(bulbCount),
    dailyUsageHours: parseNumber(dailyUsage),
    oldWattage: parseNumber(oldWattage),
    newWattage: parseNumber(ledWattage),
    electricityPricePerKwh: parseNumber(electricityPrice),
    replacementCost: parseNumber(replacementCost),
  }), [bulbCount, dailyUsage, oldWattage, ledWattage, electricityPrice, replacementCost]);

  const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  const number = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
  const chooseEquivalent = (id: string) => {
    const equivalent = bulbEquivalents.find((item) => item.id === id);
    if (equivalent) {
      setOldWattage(String(equivalent.incandescentW));
      setLedWattage(String(equivalent.ledW));
    }
  };

  return <div className="category-general-converter">
    <div className="engineering-calculator-card">
      <div className="engineering-targets"><span>Common replacement pair</span><div className="engineering-target-grid hydrostatic-target-grid">{bulbEquivalents.map((item) => <button key={item.id} type="button" className={`engineering-target-button${oldWattage === String(item.incandescentW) && ledWattage === String(item.ledW) ? " is-active" : ""}`} onClick={() => chooseEquivalent(item.id)}>{item.incandescentW}W → {item.ledW}W LED</button>)}</div></div>
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field"><span>Number of bulbs</span><input type="text" inputMode="decimal" value={bulbCount} onChange={(event) => setBulbCount(event.target.value)} /></label>
        <label className="category-general-converter-field"><span>Average use (hours/day)</span><input type="text" inputMode="decimal" value={dailyUsage} onChange={(event) => setDailyUsage(event.target.value)} /></label>
        <label className="category-general-converter-field"><span>Old bulb wattage (W)</span><input type="text" inputMode="decimal" value={oldWattage} onChange={(event) => setOldWattage(event.target.value)} /></label>
        <label className="category-general-converter-field"><span>LED wattage (W)</span><input type="text" inputMode="decimal" value={ledWattage} onChange={(event) => setLedWattage(event.target.value)} /></label>
        <label className="category-general-converter-field"><span>Display currency</span><select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="CAD">CAD (CA$)</option><option value="AUD">AUD (A$)</option></select></label>
        <label className="category-general-converter-field"><span>Electricity price ({currency}/kWh)</span><input type="text" inputMode="decimal" value={electricityPrice} onChange={(event) => setElectricityPrice(event.target.value)} /></label>
        <label className="category-general-converter-field"><span>Total LED purchase cost ({currency})</span><input type="text" inputMode="decimal" value={replacementCost} onChange={(event) => setReplacementCost(event.target.value)} /></label>
      </div>
    </div>
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter valid positive values to see the estimate.</strong> : <div className="conversion-table-wrap"><table className="conversion-table"><tbody><tr><td>Annual energy with old bulbs</td><td>{number(result.annualOldKwh)} kWh</td></tr><tr><td>Annual energy with LEDs</td><td>{number(result.annualNewKwh)} kWh</td></tr><tr className="is-active"><td><strong>Annual saving</strong></td><td><strong>{number(result.annualSavingsKwh)} kWh · {money(result.annualCostSaving)}</strong></td></tr><tr><td>Simple payback</td><td>{result.breakEvenYears === null ? "No payback estimate available" : `${number(result.breakEvenYears)} years`}</td></tr></tbody></table></div>}</div>
    <p className="calculator-usage-hint"><strong>Note:</strong> wattage is only part of the decision. Choose bulbs with the brightness, color temperature and fitting you need; enter the electricity price from your own bill for a local estimate.</p>
  </div>;
}
