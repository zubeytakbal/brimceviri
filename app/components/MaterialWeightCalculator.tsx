"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
  materialDensityTable,
} from "../converter/materialDensity";

type Target = "mass" | "volume";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function MaterialWeightCalculator() {
  const [materialId, setMaterialId] = useState(materialDensityTable[0].id);
  const [target, setTarget] = useState<Target>("mass");
  const [volumeInput, setVolumeInput] = useState("1000");
  const [massInput, setMassInput] = useState("");

  const material =
    materialDensityTable.find((row) => row.id === materialId) ??
    materialDensityTable[0];

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
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Ağırlığı Hesapla
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "volume" ? " is-active" : ""}`}
              onClick={() => setTarget("volume")}
            >
              Hacmi Hesapla
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Malzeme</span>
            <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
              {materialDensityTable.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </label>

          {target === "mass" ? (
            <label className="category-general-converter-field">
              <span>Hacim (cm³)</span>
              <input
                type="text"
                inputMode="decimal"
                value={volumeInput}
                onChange={(event) => setVolumeInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Ağırlık (kg)</span>
              <input
                type="text"
                inputMode="decimal"
                value={massInput}
                onChange={(event) => setMassInput(event.target.value)}
                placeholder="örn. 5"
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : target === "mass" ? (
          <strong>Ağırlık: {formatValue(result)} kg</strong>
        ) : (
          <strong>Hacim: {formatValue(result)} cm³</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Malzeme Yoğunlukları Tablosu</caption>
          <thead>
            <tr>
              <th scope="col">Malzeme</th>
              <th scope="col">Yoğunluk (kg/m³)</th>
            </tr>
          </thead>
          <tbody>
            {materialDensityTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{row.label}</td>
                <td>{row.densityKgM3.toLocaleString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
