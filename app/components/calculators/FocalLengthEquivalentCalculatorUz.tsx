"use client";

import { useState } from "react";
import {
  calculateEquivalentFocalLength,
  sensorFormats,
} from "../../converter/focalLengthEquivalentCalculator";

const sensorLabelsUz: Record<string, string> = {
  "full-frame": "To'liq Kadr (Full Frame, 35mm)",
  "aps-h": "APS-H",
  "aps-c-nikon": "APS-C (Nikon / Sony / Fujifilm)",
  "aps-c-canon": "APS-C (Canon)",
  "micro-four-thirds": "Micro Four Thirds (M4/3)",
  "1-inch": "1 Dyuymli Sensor",
  "medium-format-645": "O'rta Format (645)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMm(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 })} mm`;
}

export default function FocalLengthEquivalentCalculatorUz() {
  const [focalLengthInput, setFocalLengthInput] = useState("50");
  const [sensorId, setSensorId] = useState(sensorFormats[2].id);

  const focalLength = parseNumericValue(focalLengthInput);
  const invalid = focalLengthInput.trim().length > 0 && focalLength === null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Linza Fokus Masofasi (mm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={focalLengthInput}
            onChange={(event) => setFocalLengthInput(event.target.value)}
            placeholder="50"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kamera Sensor Formati</span>
          <select value={sensorId} onChange={(event) => setSensorId(event.target.value)}>
            {sensorFormats.map((format) => (
              <option key={format.id} value={format.id}>
                {sensorLabelsUz[format.id] ?? format.label} (×{format.cropFactor})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="conversion-table-wrap">
        {invalid ? (
          <p>
            <strong>To&apos;g&apos;ri fokus masofasini kiriting.</strong>
          </p>
        ) : focalLength === null ? (
          <p>
            <strong>Fokus masofasini kiritib ekvivalentlarini ko&apos;rishingiz mumkin.</strong>
          </p>
        ) : (
          <table className="conversion-table">
            <caption>{formatMm(focalLength)} linzaning to&apos;liq kadr (full frame) ekvivalenti</caption>
            <thead>
              <tr>
                <th scope="col">Sensor Formati</th>
                <th scope="col">Kesish Koeffitsienti</th>
                <th scope="col">Ekvivalent Fokus Masofasi</th>
              </tr>
            </thead>
            <tbody>
              {sensorFormats.map((format) => {
                const equivalent = calculateEquivalentFocalLength(focalLength, format.cropFactor);
                return (
                  <tr key={format.id} className={format.id === sensorId ? "is-active" : undefined}>
                    <td>{sensorLabelsUz[format.id] ?? format.label}</td>
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
