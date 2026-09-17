"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
  materialDensityTable,
} from "../../converter/materialDensity";

type Target = "mass" | "volume";

const materialLabelsUz: Record<string, string> = {
  steel: "Po'lat (Uglerodli)",
  "stainless-steel": "Zanglamaydigan Po'lat",
  aluminum: "Alyuminiy",
  copper: "Mis",
  brass: "Latun (Bronza)",
  zinc: "Rux",
  lead: "Qo'rg'oshin",
  titanium: "Titan",
  glass: "Shisha",
  concrete: "Beton",
  oak: "Yog'och (Eman)",
  pine: "Yog'och (Qarag'ay)",
  pvc: "PVC",
  water: "Suv",
  gasoline: "Benzin",
  diesel: "Dizel",
  acetone: "Aseton",
  milk: "Sut",
  honey: "Asal",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function MaterialWeightCalculatorUz() {
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
          <span>Nimani hisoblamoqchisiz?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Og&apos;irlikni Hisoblash
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "volume" ? " is-active" : ""}`}
              onClick={() => setTarget("volume")}
            >
              Hajmni Hisoblash
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Material</span>
            <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
              {materialDensityTable.map((row) => (
                <option key={row.id} value={row.id}>
                  {materialLabelsUz[row.id] ?? row.label}
                </option>
              ))}
            </select>
          </label>

          {target === "mass" ? (
            <label className="category-general-converter-field">
              <span>Hajm (sm³)</span>
              <input
                type="text"
                inputMode="decimal"
                value={volumeInput}
                onChange={(event) => setVolumeInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Og&apos;irlik (kg)</span>
              <input
                type="text"
                inputMode="decimal"
                value={massInput}
                onChange={(event) => setMassInput(event.target.value)}
                placeholder="masalan 5"
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : target === "mass" ? (
          <strong>Og&apos;irlik: {formatValue(result)} kg</strong>
        ) : (
          <strong>Hajm: {formatValue(result)} sm³</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Material Zichliklari Jadvali</caption>
          <thead>
            <tr>
              <th scope="col">Material</th>
              <th scope="col">Zichlik (kg/m³)</th>
            </tr>
          </thead>
          <tbody>
            {materialDensityTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{materialLabelsUz[row.id] ?? row.label}</td>
                <td>{row.densityKgM3.toLocaleString("uz-UZ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
