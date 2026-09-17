"use client";

import { useState } from "react";
import { calculateAdMetrics, calculateRoi } from "../../converter/adMetricsCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatSom(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })} so'm`;
}

function formatPercent(value: number): string {
  return `%${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })}`;
}

export default function AdMetricsCalculatorUz() {
  const [costInput, setCostInput] = useState("");
  const [impressionsInput, setImpressionsInput] = useState("50000");
  const [clicksInput, setClicksInput] = useState("750");

  const [roiCostInput, setRoiCostInput] = useState("");
  const [roiRevenueInput, setRoiRevenueInput] = useState("");

  const cost = parseNumericValue(costInput);
  const impressions = parseNumericValue(impressionsInput);
  const clicks = parseNumericValue(clicksInput);

  const metrics =
    cost !== null && impressions !== null && clicks !== null
      ? calculateAdMetrics({ costTl: cost, impressions, clicks })
      : null;

  const metricsInvalid = Boolean(costInput.trim() || impressionsInput.trim()) && !metrics;

  const roiCost = parseNumericValue(roiCostInput);
  const roiRevenue = parseNumericValue(roiRevenueInput);
  const roi =
    roiCost !== null && roiRevenue !== null ? calculateRoi(roiCost, roiRevenue) : null;
  const roiInvalid = Boolean(roiCostInput.trim() || roiRevenueInput.trim()) && !roi;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Reklama Samaradorligi Ko&apos;rsatkichlari</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Jami Xarajat (so&apos;m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={costInput}
              onChange={(event) => setCostInput(event.target.value)}
              placeholder="Xarajatni kiriting"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Ko&apos;rsatishlar Soni (Impression)</span>
            <input
              type="text"
              inputMode="decimal"
              value={impressionsInput}
              onChange={(event) => setImpressionsInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Bosishlar Soni (Click)</span>
            <input
              type="text"
              inputMode="decimal"
              value={clicksInput}
              onChange={(event) => setClicksInput(event.target.value)}
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {metricsInvalid ? (
            <strong>To&apos;g&apos;ri qiymatlar kiriting (bosishlar ko&apos;rsatishlardan ko&apos;p bo&apos;lmasligi kerak).</strong>
          ) : !metrics ? (
            <strong>Xarajat, ko&apos;rsatish va bosish sonini kiritib ko&apos;rsatkichlarni ko&apos;rishingiz mumkin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>CPM (Ming Ko&apos;rsatish Uchun Xarajat)</span>
                <strong>{formatSom(metrics.cpm)}</strong>
              </div>
              <div>
                <span>CTR (Bosish Nisbati)</span>
                <strong>{formatPercent(metrics.ctr)}</strong>
              </div>
              <div>
                <span>CPC (Bosish Uchun Xarajat)</span>
                <strong>{metrics.cpc !== null ? formatSom(metrics.cpc) : "—"}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>ROI Hisoblash</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Reklama Xarajati (so&apos;m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={roiCostInput}
              onChange={(event) => setRoiCostInput(event.target.value)}
              placeholder="Xarajatni kiriting"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Olingan Daromad (so&apos;m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={roiRevenueInput}
              onChange={(event) => setRoiRevenueInput(event.target.value)}
              placeholder="Daromadni kiriting"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {roiInvalid ? (
            <strong>To&apos;g&apos;ri qiymatlar kiriting.</strong>
          ) : roi === null ? (
            <strong>Xarajat va daromadni kiritib ROI&apos;ni ko&apos;rishingiz mumkin.</strong>
          ) : (
            <strong>ROI: {formatPercent(roi)}</strong>
          )}
        </div>
      </div>
    </div>
  );
}
