"use client";

import { useState } from "react";
import {
  calculateThermalExpansion,
  thermalExpansionTable,
} from "../converter/thermalExpansion";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ThermalExpansionCalculator() {
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
          <span>Malzeme</span>
          <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
            {thermalExpansionTable.map((row) => (
              <option key={row.id} value={row.id}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Başlangıç Uzunluğu (m)</span>
          <input
            type="text"
            inputMode="decimal"
            value={lengthInput}
            onChange={(event) => setLengthInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sıcaklık Farkı ΔT (°C)</span>
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
          <strong>Geçerli değerler girerek uzama miktarını görebilirsin.</strong>
        ) : (
          <strong>Uzunluk Değişimi (ΔL): {formatValue(result * 1000)} mm</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Isıl Genleşme Katsayıları Tablosu (×10⁻⁶/K)</caption>
          <thead>
            <tr>
              <th scope="col">Malzeme</th>
              <th scope="col">Katsayı (×10⁻⁶/K)</th>
            </tr>
          </thead>
          <tbody>
            {thermalExpansionTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{row.label}</td>
                <td>{row.coefficientPerMillionK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Katsayılar ~20°C civarı için genel
        mühendislik referans değerleridir; alaşım ve sıcaklık aralığına
        göre küçük sapmalar olabilir. Kritik uygulamalarda malzeme
        üreticisinin verisi esas alınmalıdır.
      </p>
    </div>
  );
}
