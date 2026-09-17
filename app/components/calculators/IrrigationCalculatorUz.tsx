"use client";

import { useState } from "react";
import { calculateIrrigationDuration } from "../../converter/irrigationCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function IrrigationCalculatorUz() {
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
          <span>Maqsadli Sug&apos;orish Miqdori (mm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={waterNeedInput}
            onChange={(event) => setWaterNeedInput(event.target.value)}
            placeholder="masalan 5"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sug&apos;oriladigan Maydon (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sug&apos;orish Tizimi Sarfi (L/soat)</span>
          <input
            type="text"
            inputMode="decimal"
            value={flowRateInput}
            onChange={(event) => setFlowRateInput(event.target.value)}
            placeholder="masalan 1000"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>To&apos;g&apos;ri qiymatlar kiriting.</strong>
        ) : !result ? (
          <strong>Maqsadli sug&apos;orish miqdori va tizim sarfini kiritib vaqtni ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Kerakli Jami Suv</span>
              <strong>{formatNumber(result.totalWaterLiters)} L</strong>
            </div>
            <div>
              <span>Sug&apos;orish Vaqti</span>
              <strong>{formatNumber(result.durationMinutes)} daqiqa</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Maqsadli sug&apos;orish miqdori (mm)
        o&apos;simlik/o&apos;t turiga, mavsumga, bug&apos;lanish va
        yog&apos;ingarchilikka qarab o&apos;zgaradi. Tizim sarfi
        tomchilatib sug&apos;orishda emitter sarfi × emitter soniga,
        sprinklerda esa boshlik katalogiga qarab topiladi.
      </p>
    </div>
  );
}
