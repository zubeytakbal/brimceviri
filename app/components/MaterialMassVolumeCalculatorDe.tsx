"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
} from "../converter/materialDensity";

type Direction = "volumeToMass" | "massToVolume";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number): string {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}

type MaterialMassVolumeCalculatorDeProps = {
  densityKgM3: number;
  materialName: string;
};

export default function MaterialMassVolumeCalculatorDe({
  densityKgM3,
  materialName,
}: MaterialMassVolumeCalculatorDeProps) {
  const [direction, setDirection] = useState<Direction>("volumeToMass");
  const [volumeMl, setVolumeMl] = useState("500");
  const [massG, setMassG] = useState("500");

  const massFromVolumeKg =
    direction === "volumeToMass"
      ? calculateMassFromVolumeCm3(densityKgM3, parseNumericValue(volumeMl))
      : null;
  const volumeFromMassCm3 =
    direction === "massToVolume"
      ? calculateVolumeCm3FromMass(densityKgM3, parseNumericValue(massG) / 1000)
      : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Was möchtest du berechnen?</span>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value as Direction)}
          >
            <option value="volumeToMass">Aus Volumen Masse berechnen (mL → Gramm)</option>
            <option value="massToVolume">Aus Masse Volumen berechnen (Gramm → mL)</option>
          </select>
        </label>
        {direction === "volumeToMass" ? (
          <label className="category-general-converter-field">
            <span>{materialName}-Volumen (mL)</span>
            <input
              type="text"
              inputMode="decimal"
              value={volumeMl}
              onChange={(event) => setVolumeMl(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{materialName}-Masse (Gramm)</span>
            <input
              type="text"
              inputMode="decimal"
              value={massG}
              onChange={(event) => setMassG(event.target.value)}
            />
          </label>
        )}
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              <tr className="is-active">
                <td>
                  <strong>Ergebnis</strong>
                </td>
                <td>
                  <strong>
                    {direction === "volumeToMass"
                      ? massFromVolumeKg !== null
                        ? `${formatNumber(massFromVolumeKg * 1000)} Gramm`
                        : "Gib ein gültiges Volumen ein"
                      : volumeFromMassCm3 !== null
                        ? `${formatNumber(volumeFromMassCm3)} mL`
                        : "Gib eine gültige Masse ein"}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
