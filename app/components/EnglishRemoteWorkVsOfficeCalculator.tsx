"use client";

import { useMemo, useState } from "react";
import { calculateRemoteWorkCostComparison } from "../converter/remoteWorkVsOfficeCost";

type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

function parseNumber(value: string) {
  const number = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(number) ? number : Number.NaN;
}

export default function EnglishRemoteWorkVsOfficeCalculator() {
  const [annualWorkDays, setAnnualWorkDays] = useState("230");
  const [remoteDays, setRemoteDays] = useState("3");
  const [dailyCommuteCost, setDailyCommuteCost] = useState("12");
  const [dailyLunchDifference, setDailyLunchDifference] = useState("6");
  const [monthlyHomeCost, setMonthlyHomeCost] = useState("25");
  const [currency, setCurrency] = useState<Currency>("USD");

  const result = useMemo(() => calculateRemoteWorkCostComparison({
    annualWorkDays: parseNumber(annualWorkDays),
    remoteDaysPerWeek: parseNumber(remoteDays),
    dailyCommuteCost: parseNumber(dailyCommuteCost),
    dailyLunchDifference: parseNumber(dailyLunchDifference),
    monthlyExtraHomeCost: parseNumber(monthlyHomeCost),
  }), [annualWorkDays, remoteDays, dailyCommuteCost, dailyLunchDifference, monthlyHomeCost]);

  const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  const number = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

  return <div className="category-general-converter">
    <div className="engineering-calculator-card"><div className="paint-calculator-grid">
      <label className="category-general-converter-field"><span>Display currency</span><select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="CAD">CAD (CA$)</option><option value="AUD">AUD (A$)</option></select></label>
      <label className="category-general-converter-field"><span>Work days per year</span><input type="text" inputMode="decimal" value={annualWorkDays} onChange={(event) => setAnnualWorkDays(event.target.value)} /></label>
      <label className="category-general-converter-field"><span>Remote days per week</span><input type="text" inputMode="decimal" value={remoteDays} onChange={(event) => setRemoteDays(event.target.value)} /></label>
      <label className="category-general-converter-field"><span>Daily commute cost avoided ({currency})</span><input type="text" inputMode="decimal" value={dailyCommuteCost} onChange={(event) => setDailyCommuteCost(event.target.value)} /></label>
      <label className="category-general-converter-field"><span>Daily lunch cost difference ({currency})</span><input type="text" inputMode="decimal" value={dailyLunchDifference} onChange={(event) => setDailyLunchDifference(event.target.value)} /><small className="calculator-field-note">Use a negative value if lunch costs more at home.</small></label>
      <label className="category-general-converter-field"><span>Extra home cost per month ({currency})</span><input type="text" inputMode="decimal" value={monthlyHomeCost} onChange={(event) => setMonthlyHomeCost(event.target.value)} /><small className="calculator-field-note">For example: extra heating, electricity or workspace costs.</small></label>
    </div></div>
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter valid values to see the annual comparison.</strong> : <div className="conversion-table-wrap"><table className="conversion-table"><tbody><tr><td>Estimated remote work days</td><td>{number(result.annualRemoteDays)}</td></tr><tr><td>Annual commute cost avoided</td><td>{money(result.annualCommuteSaving)}</td></tr><tr><td>Annual lunch cost difference</td><td>{money(result.annualLunchSaving)}</td></tr><tr><td>Extra annual home cost</td><td>{money(result.annualExtraHomeCost)}</td></tr><tr className="is-active"><td><strong>Annual financial difference</strong></td><td><strong>{money(Math.abs(result.annualNetSaving))} {result.annualNetSaving >= 0 ? "saved by remote work" : "more with remote work"}</strong></td></tr></tbody></table></div>}</div>
    <p className="calculator-usage-hint"><strong>Note:</strong> this is a personal cash-cost comparison. It does not assign a monetary value to commute time, career effects, childcare or quality of life.</p>
  </div>;
}
