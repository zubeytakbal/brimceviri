"use client";

import { useState } from "react";
import { calculatePsuWattage } from "../../converter/psuCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatWatt(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 })} W`;
}

export default function PsuCalculatorUz() {
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
          <span>Protsessor (CPU) TDP (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={cpuInput}
            onChange={(event) => setCpuInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Video Karta (GPU) TDP (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={gpuInput}
            onChange={(event) => setGpuInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Boshqa Komponentlar (ona plata, RAM, disk, ventilyator) (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={otherInput}
            onChange={(event) => setOtherInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Xavfsizlik Zaxirasi (%)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiriting.</strong>
        ) : !result ? (
          <strong>Komponent quvvatlarini kiritib tavsiya etilgan PSU quvvatini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Tavsiya Etilgan PSU Quvvati: {formatWatt(result)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> CPU va GPU TDP qiymatlarini ishlab
        chiqaruvchining rasmiy sahifasidan oling. 20-30% xavfsizlik
        zaxirasi vaqtinchalik yuk sakrashlarini, PSU samaradorlik
        egri chizig&apos;ini va kelajakdagi yangilanish zaxirasini
        qoplaydi.
      </p>
    </div>
  );
}
