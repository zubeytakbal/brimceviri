"use client";

import { useState } from "react";
import {
  calculateFertilizerDilution,
  type FertilizerDilutionFormat,
} from "../converter/fertilizerDilutionCalculator";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function FertilizerDilutionCalculator() {
  const [format, setFormat] = useState<FertilizerDilutionFormat>("ratio");
  const [ratioPart, setRatioPart] = useState("200");
  const [dosePerLiter, setDosePerLiter] = useState("5");
  const [totalWater, setTotalWater] = useState("3");

  const result = calculateFertilizerDilution({
    format,
    ratioPart: parseNumericValue(ratioPart),
    dosePerLiterMl: parseNumericValue(dosePerLiter),
    totalWaterLiters: parseNumericValue(totalWater),
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Etikette Yazan Format</span>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as FertilizerDilutionFormat)}
          >
            <option value="ratio">Oran (Örn. 1:200)</option>
            <option value="dosePerLiter">Doz (Örn. 5 ml/litre)</option>
          </select>
        </label>
        {format === "ratio" ? (
          <label className="category-general-converter-field">
            <span>1 Birim Gübreye Kaç Birim Su? (Örn. 200)</span>
            <input
              type="text"
              inputMode="decimal"
              value={ratioPart}
              onChange={(event) => setRatioPart(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>1 Litre Su Başına Doz (ml)</span>
            <input
              type="text"
              inputMode="decimal"
              value={dosePerLiter}
              onChange={(event) => setDosePerLiter(event.target.value)}
            />
          </label>
        )}
        <label className="category-general-converter-field">
          <span>Hazırlamak İstediğin Su Miktarı (litre)</span>
          <input
            type="text"
            inputMode="decimal"
            value={totalWater}
            onChange={(event) => setTotalWater(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Eklemen Gereken Gübre</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result.fertilizerNeededMl)} ml</strong>
                  </td>
                </tr>
                <tr>
                  <td>Toplam Su</td>
                  <td>{formatNumber(result.totalWaterLiters)} litre</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama, gübre hacminin toplam
        karışıma göre ihmal edilebilir küçük olduğunu varsayar
        (bahçıvanlıkta yaygın kabul gören bir basitleştirme). Her
        ürünün önerilen oranı farklıdır, mutlaka kendi ürününün
        etiketindeki değeri kullan; aşırı dozda gübre kök yanmasına
        neden olabilir.
      </p>
    </div>
  );
}
