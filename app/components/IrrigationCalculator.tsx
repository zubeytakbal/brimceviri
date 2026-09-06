"use client";

import { useState } from "react";
import { calculateIrrigationDuration } from "../converter/irrigationCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function IrrigationCalculator() {
  const [waterNeedInput, setWaterNeedInput] = useState("");
  const [areaInput, setAreaInput] = useState("100");
  const [flowRateInput, setFlowRateInput] = useState("");

  const waterNeed = parseNumericValue(waterNeedInput);
  const area = parseNumericValue(areaInput);
  const flowRate = parseNumericValue(flowRateInput);

  const result =
    waterNeed !== null && area !== null && flowRate !== null
      ? calculateIrrigationDuration({
          waterNeedMm: waterNeed,
          areaM2: area,
          systemFlowRateLPerHour: flowRate,
        })
      : null;

  const invalid = Boolean(waterNeedInput.trim() || flowRateInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Hedef Sulama Miktarı (mm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={waterNeedInput}
            onChange={(event) => setWaterNeedInput(event.target.value)}
            placeholder="örn. 5"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sulanacak Alan (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sulama Sistemi Debisi (L/saat)</span>
          <input
            type="text"
            inputMode="decimal"
            value={flowRateInput}
            onChange={(event) => setFlowRateInput(event.target.value)}
            placeholder="örn. 1000"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir.</strong>
        ) : !result ? (
          <strong>Hedef sulama miktarı ve sistem debisini girerek süreyi görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Gereken Toplam Su</span>
              <strong>{formatNumber(result.totalWaterLiters)} L</strong>
            </div>
            <div>
              <span>Sulama Süresi</span>
              <strong>{formatNumber(result.durationMinutes)} dakika</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Hedef sulama miktarı (mm); bitki/çim
        türüne, mevsime, buharlaşma ve yağışa göre değişir. Sistem
        debisi damla sulamada emitter debisi × emitter sayısına,
        sprinklerde başlık kataloğuna göre bulunur.
      </p>
    </div>
  );
}
