"use client";

import { useState } from "react";
import {
  calculateEquivalentFocalLength,
  sensorFormats,
} from "../converter/focalLengthEquivalentCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMm(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} mm`;
}

export default function FocalLengthEquivalentCalculator() {
  const [focalLengthInput, setFocalLengthInput] = useState("50");
  const [sensorId, setSensorId] = useState(sensorFormats[2].id);

  const focalLength = parseNumericValue(focalLengthInput);
  const invalid = focalLengthInput.trim().length > 0 && focalLength === null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Lens Odak Uzaklığı (mm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={focalLengthInput}
            onChange={(event) => setFocalLengthInput(event.target.value)}
            placeholder="50"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kamera Sensör Formatı</span>
          <select value={sensorId} onChange={(event) => setSensorId(event.target.value)}>
            {sensorFormats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.label} (×{format.cropFactor})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="conversion-table-wrap">
        {invalid ? (
          <p>
            <strong>Geçerli bir odak uzaklığı gir.</strong>
          </p>
        ) : focalLength === null ? (
          <p>
            <strong>Bir odak uzaklığı girerek eşdeğerlerini görebilirsin.</strong>
          </p>
        ) : (
          <table className="conversion-table">
            <caption>{formatMm(focalLength)} lensin tam kare (full frame) eşdeğeri</caption>
            <thead>
              <tr>
                <th scope="col">Sensör Formatı</th>
                <th scope="col">Crop Faktör</th>
                <th scope="col">Eşdeğer Odak Uzaklığı</th>
              </tr>
            </thead>
            <tbody>
              {sensorFormats.map((format) => {
                const equivalent = calculateEquivalentFocalLength(focalLength, format.cropFactor);
                return (
                  <tr key={format.id} className={format.id === sensorId ? "is-active" : undefined}>
                    <td>{format.label}</td>
                    <td>×{format.cropFactor}</td>
                    <td>{equivalent !== null ? formatMm(equivalent) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
