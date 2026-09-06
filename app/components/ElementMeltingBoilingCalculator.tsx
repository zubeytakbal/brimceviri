"use client";

import { useState } from "react";
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  elementThermalTable,
} from "../converter/elementThermalPoints";

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ElementMeltingBoilingCalculator() {
  const [elementId, setElementId] = useState(elementThermalTable[0].id);

  const element =
    elementThermalTable.find((row) => row.id === elementId) ??
    elementThermalTable[0];

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Element</span>
          <select value={elementId} onChange={(event) => setElementId(event.target.value)}>
            {elementThermalTable.map((row) => (
              <option key={row.id} value={row.id}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">{element.label}</th>
                <th scope="col">°C</th>
                <th scope="col">°F</th>
                <th scope="col">K</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Erime Noktası</td>
                <td>{formatValue(element.meltingPointC)}</td>
                <td>{formatValue(celsiusToFahrenheit(element.meltingPointC))}</td>
                <td>{formatValue(celsiusToKelvin(element.meltingPointC))}</td>
              </tr>
              <tr>
                <td>Kaynama Noktası</td>
                <td>{formatValue(element.boilingPointC)}</td>
                <td>{formatValue(celsiusToFahrenheit(element.boilingPointC))}</td>
                <td>{formatValue(celsiusToKelvin(element.boilingPointC))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Element Erime ve Kaynama Noktaları Tablosu (°C)</caption>
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Erime Noktası (°C)</th>
              <th scope="col">Kaynama Noktası (°C)</th>
            </tr>
          </thead>
          <tbody>
            {elementThermalTable.map((row) => (
              <tr key={row.id} className={row.id === elementId ? "is-active" : undefined}>
                <td>{row.label}</td>
                <td>{formatValue(row.meltingPointC)}</td>
                <td>{formatValue(row.boilingPointC)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Değerler standart atmosfer basıncı (101,325
        kPa) içindir. Karbon, normal basınçta erimek yerine süblimleştiği
        için bu tabloya dahil edilmemiştir.
      </p>
    </div>
  );
}
