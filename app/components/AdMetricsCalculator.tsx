"use client";

import { useState } from "react";
import { calculateAdMetrics, calculateRoi } from "../converter/adMetricsCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatTl(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺`;
}

function formatPercent(value: number): string {
  return `%${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}`;
}

export default function AdMetricsCalculator() {
  const [costInput, setCostInput] = useState("1000");
  const [impressionsInput, setImpressionsInput] = useState("50000");
  const [clicksInput, setClicksInput] = useState("750");

  const [roiCostInput, setRoiCostInput] = useState("1000");
  const [roiRevenueInput, setRoiRevenueInput] = useState("2500");

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
          <span>Reklam Performans Metrikleri</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Toplam Maliyet (₺)</span>
            <input
              type="text"
              inputMode="decimal"
              value={costInput}
              onChange={(event) => setCostInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Gösterim Sayısı (Impression)</span>
            <input
              type="text"
              inputMode="decimal"
              value={impressionsInput}
              onChange={(event) => setImpressionsInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Tıklama Sayısı (Click)</span>
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
            <strong>Geçerli değerler gir (tıklama, gösterimden fazla olamaz).</strong>
          ) : !metrics ? (
            <strong>Maliyet, gösterim ve tıklama sayısını girerek metrikleri görebilirsin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>CPM (Bin Gösterim Başına Maliyet)</span>
                <strong>{formatTl(metrics.cpm)}</strong>
              </div>
              <div>
                <span>CTR (Tıklama Oranı)</span>
                <strong>{formatPercent(metrics.ctr)}</strong>
              </div>
              <div>
                <span>CPC (Tıklama Başına Maliyet)</span>
                <strong>{metrics.cpc !== null ? formatTl(metrics.cpc) : "—"}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>ROI Hesaplama</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Reklam Maliyeti (₺)</span>
            <input
              type="text"
              inputMode="decimal"
              value={roiCostInput}
              onChange={(event) => setRoiCostInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Elde Edilen Gelir (₺)</span>
            <input
              type="text"
              inputMode="decimal"
              value={roiRevenueInput}
              onChange={(event) => setRoiRevenueInput(event.target.value)}
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {roiInvalid ? (
            <strong>Geçerli değerler gir.</strong>
          ) : roi === null ? (
            <strong>Maliyet ve gelir girerek ROI&apos;yi görebilirsin.</strong>
          ) : (
            <strong>ROI: {formatPercent(roi)}</strong>
          )}
        </div>
      </div>
    </div>
  );
}
