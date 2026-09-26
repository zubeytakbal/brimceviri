"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
} from "../converter/materialDensity";
import { numberLocales, type ContentLocale } from "./contentLocale";

type Direction = "volumeToMass" | "massToVolume";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, locale: ContentLocale): string {
  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits: 2 });
}

const copy = {
  tr: {
    directionLabel: "Ne Hesaplamak İstiyorsun?",
    volumeToMass: "Hacimden kütle (mL → gram)",
    massToVolume: "Kütleden hacim (gram → mL)",
    volumeInput: (name: string) => `${name} Hacmi (mL)`,
    massInput: (name: string) => `${name} Kütlesi (gram)`,
    result: "Sonuç",
    gramUnit: "gram",
    invalidVolume: "Geçerli bir hacim gir",
    invalidMass: "Geçerli bir kütle gir",
  },
  de: {
    directionLabel: "Was möchtest du berechnen?",
    volumeToMass: "Aus Volumen Masse berechnen (mL → Gramm)",
    massToVolume: "Aus Masse Volumen berechnen (Gramm → mL)",
    volumeInput: (name: string) => `${name}-Volumen (mL)`,
    massInput: (name: string) => `${name}-Masse (Gramm)`,
    result: "Ergebnis",
    gramUnit: "Gramm",
    invalidVolume: "Gib ein gültiges Volumen ein",
    invalidMass: "Gib eine gültige Masse ein",
  },
};

type MaterialMassVolumeCalculatorProps = {
  densityKgM3: number;
  materialName: string;
  locale?: ContentLocale;
};

export default function MaterialMassVolumeCalculator({
  densityKgM3,
  materialName,
  locale = "tr",
}: MaterialMassVolumeCalculatorProps) {
  const t = copy[locale];
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
          <span>{t.directionLabel}</span>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value as Direction)}
          >
            <option value="volumeToMass">{t.volumeToMass}</option>
            <option value="massToVolume">{t.massToVolume}</option>
          </select>
        </label>
        {direction === "volumeToMass" ? (
          <label className="category-general-converter-field">
            <span>{t.volumeInput(materialName)}</span>
            <input
              type="text"
              inputMode="decimal"
              value={volumeMl}
              onChange={(event) => setVolumeMl(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>{t.massInput(materialName)}</span>
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
                  <strong>{t.result}</strong>
                </td>
                <td>
                  <strong>
                    {direction === "volumeToMass"
                      ? massFromVolumeKg !== null
                        ? `${formatNumber(massFromVolumeKg * 1000, locale)} ${t.gramUnit}`
                        : t.invalidVolume
                      : volumeFromMassCm3 !== null
                        ? `${formatNumber(volumeFromMassCm3, locale)} mL`
                        : t.invalidMass}
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
