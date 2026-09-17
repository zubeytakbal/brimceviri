"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
} from "../../converter/materialDensity";

type Direction = "volumeToMass" | "massToVolume";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 });
}

type MaterialMassVolumeCalculatorUzProps = {
  densityKgM3: number;
  materialName: string;
};

export default function MaterialMassVolumeCalculatorUz({
  densityKgM3,
  materialName,
}: MaterialMassVolumeCalculatorUzProps) {
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
          <span>Nimani Hisoblamoqchisiz?</span>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value as Direction)}
          >
            <option value="volumeToMass">Hajmdan massa (mL → gram)</option>
            <option value="massToVolume">Massadan hajm (gram → mL)</option>
          </select>
        </label>
        {direction === "volumeToMass" ? (
          <label className="category-general-converter-field">
            <span>{materialName} Hajmi (mL)</span>
            <input
              type="text"
              inputMode="decimal"
              value={volumeMl}
              onChange={(event) => setVolumeMl(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{materialName} Massasi (gram)</span>
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
                  <strong>Natija</strong>
                </td>
                <td>
                  <strong>
                    {direction === "volumeToMass"
                      ? massFromVolumeKg !== null
                        ? `${formatNumber(massFromVolumeKg * 1000)} gram`
                        : "To'g'ri hajm kiriting"
                      : volumeFromMassCm3 !== null
                        ? `${formatNumber(volumeFromMassCm3)} mL`
                        : "To'g'ri massa kiriting"}
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
