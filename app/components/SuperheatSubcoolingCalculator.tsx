"use client";

import { useState } from "react";
import { calculateSubcooling, calculateSuperheat } from "../converter/hvacCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDelta(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} °C`;
}

export default function SuperheatSubcoolingCalculator() {
  const [evapMeasuredInput, setEvapMeasuredInput] = useState("");
  const [evapSaturationInput, setEvapSaturationInput] = useState("");

  const [condSaturationInput, setCondSaturationInput] = useState("");
  const [condMeasuredInput, setCondMeasuredInput] = useState("");

  const evapMeasured = parseNumericValue(evapMeasuredInput);
  const evapSaturation = parseNumericValue(evapSaturationInput);
  const superheat =
    evapMeasured !== null && evapSaturation !== null
      ? calculateSuperheat(evapMeasured, evapSaturation)
      : null;

  const condSaturation = parseNumericValue(condSaturationInput);
  const condMeasured = parseNumericValue(condMeasuredInput);
  const subcooling =
    condSaturation !== null && condMeasured !== null
      ? calculateSubcooling(condSaturation, condMeasured)
      : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Superheat (Aşırı Kızdırma)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Buharlaştırıcı Çıkış Sıcaklığı (°C, ölçülen)</span>
            <input
              type="text"
              inputMode="decimal"
              value={evapMeasuredInput}
              onChange={(event) => setEvapMeasuredInput(event.target.value)}
              placeholder="örn. 8"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Doyma Sıcaklığı (°C, P-T kartından)</span>
            <input
              type="text"
              inputMode="decimal"
              value={evapSaturationInput}
              onChange={(event) => setEvapSaturationInput(event.target.value)}
              placeholder="örn. 2"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {superheat === null ? (
            <strong>İki sıcaklığı girerek superheat değerini görebilirsin.</strong>
          ) : (
            <strong>Superheat: {formatDelta(superheat)}</strong>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Subcooling (Alt Soğutma)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Doyma Sıcaklığı (°C, P-T kartından)</span>
            <input
              type="text"
              inputMode="decimal"
              value={condSaturationInput}
              onChange={(event) => setCondSaturationInput(event.target.value)}
              placeholder="örn. 45"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Sıvı Hattı Sıcaklığı (°C, ölçülen)</span>
            <input
              type="text"
              inputMode="decimal"
              value={condMeasuredInput}
              onChange={(event) => setCondMeasuredInput(event.target.value)}
              placeholder="örn. 38"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {subcooling === null ? (
            <strong>İki sıcaklığı girerek subcooling değerini görebilirsin.</strong>
          ) : (
            <strong>Subcooling: {formatDelta(subcooling)}</strong>
          )}
        </div>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Doyma sıcaklığını, kullandığın soğutucu
        gaza özel bir basınç-sıcaklık (P-T) kartından veya
        uygulamasından oku — bu araç P-T dönüşümü yapmaz, yalnızca
        sıcaklık farkını hesaplar.
      </p>
    </div>
  );
}
