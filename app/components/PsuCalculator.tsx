"use client";

import { useState } from "react";
import { calculatePsuWattage } from "../converter/psuCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatWatt(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} W`;
}

export default function PsuCalculator() {
  const [cpuInput, setCpuInput] = useState("125");
  const [gpuInput, setGpuInput] = useState("220");
  const [otherInput, setOtherInput] = useState("80");
  const [headroomInput, setHeadroomInput] = useState("25");

  const cpu = parseNumericValue(cpuInput);
  const gpu = parseNumericValue(gpuInput);
  const other = parseNumericValue(otherInput);
  const headroom = parseNumericValue(headroomInput);

  const result =
    cpu !== null && gpu !== null && other !== null && headroom !== null
      ? calculatePsuWattage({
          cpuWatt: cpu,
          gpuWatt: gpu,
          otherWatt: other,
          headroomPercent: headroom,
        })
      : null;

  const invalid = Boolean(cpuInput.trim() || headroomInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>İşlemci (CPU) TDP (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={cpuInput}
            onChange={(event) => setCpuInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ekran Kartı (GPU) TDP (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={gpuInput}
            onChange={(event) => setGpuInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Diğer Bileşenler (anakart, RAM, disk, fan) (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={otherInput}
            onChange={(event) => setOtherInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Güvenlik Payı (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={headroomInput}
            onChange={(event) => setHeadroomInput(event.target.value)}
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
          <strong>Bileşen güçlerini girerek önerilen PSU gücünü görebilirsin.</strong>
        ) : (
          <strong>Önerilen PSU Gücü: {formatWatt(result)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> CPU ve GPU TDP değerlerini üreticinin
        resmi sayfasından al. %20-30 güvenlik payı; geçici yük
        sivrilmelerini, PSU verimlilik eğrisini ve ileride yükseltme
        payını karşılar.
      </p>
    </div>
  );
}
