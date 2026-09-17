"use client";

import { useMemo, useState } from "react";
import {
  calculateCuttingSpeedFromRpm,
  calculateDiameterFromRpmAndSpeed,
  calculateRpmFromCuttingSpeed,
} from "../../converter/cuttingSpeedCalculator";

type Target = "rpm" | "speed" | "diameter";

const targetLabelsUz: Record<Target, string> = {
  speed: "Kesish Tezligi (Vc)",
  diameter: "Diametr (D)",
  rpm: "Aylanish (N)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function CuttingSpeedCalculatorUz() {
  const [target, setTarget] = useState<Target>("rpm");
  const [speedInput, setSpeedInput] = useState("200");
  const [diameterInput, setDiameterInput] = useState("40");
  const [rpmInput, setRpmInput] = useState("");

  const speed = parseNumericValue(speedInput);
  const diameter = parseNumericValue(diameterInput);
  const rpm = parseNumericValue(rpmInput);

  const result = useMemo(() => {
    if (target === "rpm" && speed !== null && diameter !== null) {
      return calculateRpmFromCuttingSpeed(speed, diameter);
    }
    if (target === "speed" && rpm !== null && diameter !== null) {
      return calculateCuttingSpeedFromRpm(rpm, diameter);
    }
    if (target === "diameter" && rpm !== null && speed !== null) {
      return calculateDiameterFromRpmAndSpeed(rpm, speed);
    }
    return null;
  }, [target, speed, diameter, rpm]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Nimani hisoblamoqchisiz?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabelsUz) as Target[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "speed" && (
            <label className="category-general-converter-field">
              <span>Kesish Tezligi - Vc (m/daqiqa)</span>
              <input
                type="text"
                inputMode="decimal"
                value={speedInput}
                onChange={(event) => setSpeedInput(event.target.value)}
              />
            </label>
          )}
          {target !== "diameter" && (
            <label className="category-general-converter-field">
              <span>Diametr - D (mm)</span>
              <input
                type="text"
                inputMode="decimal"
                value={diameterInput}
                onChange={(event) => setDiameterInput(event.target.value)}
              />
            </label>
          )}
          {target !== "rpm" && (
            <label className="category-general-converter-field">
              <span>Aylanish - N (RPM)</span>
              <input
                type="text"
                inputMode="decimal"
                value={rpmInput}
                onChange={(event) => setRpmInput(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib {targetLabelsUz[target]} natijasini ko&apos;rishingiz mumkin.</strong>
        ) : target === "rpm" ? (
          <strong>Aylanish: {formatValue(result, 0)} RPM</strong>
        ) : target === "speed" ? (
          <strong>Kesish Tezligi: {formatValue(result)} m/daqiqa</strong>
        ) : (
          <strong>Diametr: {formatValue(result)} mm</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Kesish tezligi material va kesish
        asbobi ishlab chiqaruvchisi tavsiya etadigan qiymatlarga qarab
        tanlanishi kerak; bu vosita faqat Vc, D va N orasidagi
        matematik bog&apos;liqlikni hisoblaydi.
      </p>
    </div>
  );
}
