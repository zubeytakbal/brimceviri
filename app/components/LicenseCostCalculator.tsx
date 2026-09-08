"use client";

import { useState } from "react";
import { calculateLicenseCost } from "../converter/licenseCostCalculator";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatTl(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export default function LicenseCostCalculator() {
  const [courseFee, setCourseFee] = useState("");
  const [examFee, setExamFee] = useState("");
  const [extraLessonCount, setExtraLessonCount] = useState("0");
  const [extraLessonFee, setExtraLessonFee] = useState("0");

  const result = calculateLicenseCost({
    courseFeeTl: parseNumericValue(courseFee),
    examFeeTl: parseNumericValue(examFee),
    extraLessonCount: parseNumericValue(extraLessonCount),
    extraLessonFeeTl: parseNumericValue(extraLessonFee),
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Sürücü Kursu Ücreti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Kendi aldığın teklifi gir"
            value={courseFee}
            onChange={(event) => setCourseFee(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sınav Harcı (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Kendi aldığın teklifi gir"
            value={examFee}
            onChange={(event) => setExamFee(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ek (Paket Dışı) Direksiyon Dersi Sayısı</span>
          <input
            type="text"
            inputMode="decimal"
            value={extraLessonCount}
            onChange={(event) => setExtraLessonCount(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ek Ders Başına Ücret (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            value={extraLessonFee}
            onChange={(event) => setExtraLessonFee(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Kurs ücreti ve sınav harcını girerek toplamı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Toplam Ehliyet Maliyeti</strong>
                  </td>
                  <td>
                    <strong>{formatTl(result.totalCostTl)} ₺</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama, sürücü kursunun sana
        verdiği teklife dayanır — bölgesel bir ortalama değildir,
        çünkü kurs ücretleri kursa, şehre ve pakete göre büyük ölçüde
        değişir. Kendi aldığın teklifi girerek gerçek toplam
        maliyetini hesaplayabilirsin.
      </p>
    </div>
  );
}
