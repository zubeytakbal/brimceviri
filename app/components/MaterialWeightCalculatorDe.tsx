"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
} from "../converter/materialDensity";
import { materialDensityTableDe } from "../converter/materialDensityDe";

type Target = "mass" | "volume";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("de-DE", { maximumFractionDigits });
}

export default function MaterialWeightCalculatorDe() {
  const [materialId, setMaterialId] = useState(materialDensityTableDe[0].id);
  const [target, setTarget] = useState<Target>("mass");
  const [volumeInput, setVolumeInput] = useState("1000");
  const [massInput, setMassInput] = useState("");

  const material =
    materialDensityTableDe.find((row) => row.id === materialId) ??
    materialDensityTableDe[0];

  const volume = parseNumericValue(volumeInput);
  const mass = parseNumericValue(massInput);

  const result =
    target === "mass"
      ? volume !== null
        ? calculateMassFromVolumeCm3(material.densityKgM3, volume)
        : null
      : mass !== null
        ? calculateVolumeCm3FromMass(material.densityKgM3, mass)
        : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Was möchtest du berechnen?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Gewicht berechnen
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "volume" ? " is-active" : ""}`}
              onClick={() => setTarget("volume")}
            >
              Volumen berechnen
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Material</span>
            <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
              {materialDensityTableDe.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </label>

          {target === "mass" ? (
            <label className="category-general-converter-field">
              <span>Volumen (cm³)</span>
              <input
                type="text"
                inputMode="decimal"
                value={volumeInput}
                onChange={(event) => setVolumeInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Gewicht (kg)</span>
              <input
                type="text"
                inputMode="decimal"
                value={massInput}
                onChange={(event) => setMassInput(event.target.value)}
                placeholder="z. B. 5"
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
          <strong>Gib gültige Werte ein, um das Ergebnis zu sehen.</strong>
        ) : target === "mass" ? (
          <strong>Gewicht: {formatValue(result)} kg</strong>
        ) : (
          <strong>Volumen: {formatValue(result)} cm³</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Tabelle der Materialdichten</caption>
          <thead>
            <tr>
              <th scope="col">Material</th>
              <th scope="col">Dichte (kg/m³)</th>
            </tr>
          </thead>
          <tbody>
            {materialDensityTableDe.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{row.label}</td>
                <td>{row.densityKgM3.toLocaleString("de-DE")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
