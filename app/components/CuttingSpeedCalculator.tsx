"use client";

import { useMemo, useState } from "react";
import {
  calculateCuttingSpeedFromRpm,
  calculateDiameterFromRpmAndSpeed,
  calculateRpmFromCuttingSpeed,
} from "../converter/cuttingSpeedCalculator";

type Target = "rpm" | "speed" | "diameter";

const targetLabels: Record<Target, string> = {
  speed: "Kesme Hızı (Vc)",
  diameter: "Çap (D)",
  rpm: "Devir (N)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function CuttingSpeedCalculator() {
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
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as Target[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "speed" && (
            <label className="category-general-converter-field">
              <span>Kesme Hızı - Vc (m/dakika)</span>
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
              <span>Çap - D (mm)</span>
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
              <span>Devir - N (RPM)</span>
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
          <strong>Geçerli değerler girerek {targetLabels[target]} sonucunu görebilirsin.</strong>
        ) : target === "rpm" ? (
          <strong>Devir: {formatValue(result, 0)} RPM</strong>
        ) : target === "speed" ? (
          <strong>Kesme Hızı: {formatValue(result)} m/dakika</strong>
        ) : (
          <strong>Çap: {formatValue(result)} mm</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Kesme hızı, malzeme ve kesici takım
        üreticisinin tavsiye ettiği değerlere göre seçilmelidir; bu
        araç yalnızca Vc, D ve N arasındaki matematiksel ilişkiyi
        hesaplar.
      </p>
    </div>
  );
}
