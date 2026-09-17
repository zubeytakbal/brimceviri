"use client";

import { useState } from "react";
import {
  calculateFertilizerDilution,
  type FertilizerDilutionFormat,
} from "../../converter/fertilizerDilutionCalculator";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function FertilizerDilutionCalculatorUz() {
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
          <span>Yorliqda Yozilgan Format</span>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as FertilizerDilutionFormat)}
          >
            <option value="ratio">Nisbat (Masalan 1:200)</option>
            <option value="dosePerLiter">Doza (Masalan 5 ml/litr)</option>
          </select>
        </label>
        {format === "ratio" ? (
          <label className="category-general-converter-field">
            <span>1 Birlik O&apos;g&apos;itga Necha Birlik Suv? (Masalan 200)</span>
            <input
              type="text"
              inputMode="decimal"
              value={ratioPart}
              onChange={(event) => setRatioPart(event.target.value)}
            />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>1 Litr Suvga Doza (ml)</span>
            <input
              type="text"
              inputMode="decimal"
              value={dosePerLiter}
              onChange={(event) => setDosePerLiter(event.target.value)}
            />
          </label>
        )}
        <label className="category-general-converter-field">
          <span>Tayyorlamoqchi Bo&apos;lgan Suv Miqdori (litr)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib hisobni ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Qo&apos;shishingiz Kerak Bo&apos;lgan O&apos;g&apos;it</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result.fertilizerNeededMl)} ml</strong>
                  </td>
                </tr>
                <tr>
                  <td>Jami Suv</td>
                  <td>{formatNumber(result.totalWaterLiters)} litr</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu hisob o&apos;g&apos;it hajmining
        umumiy aralashmaga nisbatan e&apos;tiborga olinmaydigan
        darajada kichik ekanligini taxmin qiladi (bog&apos;dorchilikda
        keng qabul qilingan soddalashtirish). Har bir mahsulotning
        tavsiya etilgan nisbati farqli, albatta o&apos;z
        mahsulotingizning yorlig&apos;idagi qiymatdan foydalaning;
        haddan tashqari ko&apos;p o&apos;g&apos;it ildiz kuyishiga
        sabab bo&apos;lishi mumkin.
      </p>
    </div>
  );
}
