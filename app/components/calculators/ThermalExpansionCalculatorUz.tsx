"use client";

import { useState } from "react";
import {
  calculateThermalExpansion,
  thermalExpansionTable,
} from "../../converter/thermalExpansion";

const materialLabelsUz: Record<string, string> = {
  aluminum: "Alyuminiy",
  brass: "Latun",
  lead: "Qo'rg'oshin",
  "stainless-steel": "Zanglamaydigan Po'lat",
  copper: "Mis",
  iron: "Temir",
  "carbon-steel": "Uglerodli Po'lat",
  concrete: "Beton",
  glass: "Shisha",
  zinc: "Rux",
  nickel: "Nikel",
  tin: "Qalay",
  gold: "Oltin",
  silver: "Kumush",
  platinum: "Platina",
  "cast-iron": "Cho'yan",
  chromium: "Xrom",
  magnesium: "Magniy",
  tungsten: "Volfram",
  molybdenum: "Molibden",
  niobium: "Niobiy",
  palladium: "Palladiy",
  vanadium: "Vanadiy",
  cadmium: "Kadmiy",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function ThermalExpansionCalculatorUz() {
  const [materialId, setMaterialId] = useState(thermalExpansionTable[0].id);
  const [lengthInput, setLengthInput] = useState("10");
  const [deltaTempInput, setDeltaTempInput] = useState("40");

  const material =
    thermalExpansionTable.find((row) => row.id === materialId) ??
    thermalExpansionTable[0];

  const length = parseNumericValue(lengthInput);
  const deltaTemp = parseNumericValue(deltaTempInput);

  const result =
    length !== null && deltaTemp !== null
      ? calculateThermalExpansion(length, material.coefficientPerMillionK, deltaTemp)
      : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Material</span>
          <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
            {thermalExpansionTable.map((row) => (
              <option key={row.id} value={row.id}>
                {materialLabelsUz[row.id] ?? row.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Boshlang&apos;ich Uzunlik (m)</span>
          <input
            type="text"
            inputMode="decimal"
            value={lengthInput}
            onChange={(event) => setLengthInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Harorat Farqi ΔT (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            value={deltaTempInput}
            onChange={(event) => setDeltaTempInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib kengayish miqdorini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Uzunlik O&apos;zgarishi (ΔL): {formatValue(result * 1000)} mm</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Issiqlik Kengayish Koeffitsientlari Jadvali (×10⁻⁶/K)</caption>
          <thead>
            <tr>
              <th scope="col">Material</th>
              <th scope="col">Koeffitsient (×10⁻⁶/K)</th>
            </tr>
          </thead>
          <tbody>
            {thermalExpansionTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{materialLabelsUz[row.id] ?? row.label}</td>
                <td>{row.coefficientPerMillionK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Koeffitsientlar ~20°C atrofida umumiy
        muhandislik ma&apos;lumotnoma qiymatlaridir; qotishma va harorat
        oralig&apos;iga qarab kichik og&apos;ishlar bo&apos;lishi
        mumkin. Muhim ilovalarda material ishlab chiqaruvchisining
        ma&apos;lumotlari asos qilib olinishi kerak.
      </p>
    </div>
  );
}
