"use client";

import { useMemo, useState } from "react";
import {
  calculateDateDifference,
  type DateCalculatorInput,
} from "../converter/dateCalculator";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateTr(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);

  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("tr-TR");
}

export default function DateCalculator() {
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState(() => todayIsoDate());

  const input: DateCalculatorInput = useMemo(
    () => ({ startDate, endDate }),
    [startDate, endDate]
  );

  const result = useMemo(() => calculateDateDifference(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Başlangıç Tarihi (Doğum Tarihi)</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Hedef Tarih</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>
            Geçerli iki tarih gir; hedef tarih başlangıç tarihinden önce olamaz.
          </strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              Fark:{" "}
              <strong>
                {result.years} yıl, {result.months} ay, {result.days} gün
              </strong>
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Toplam gün</span>
                <strong>{formatNumber(result.totalDays)}</strong>
              </div>
              <div>
                <span>Toplam hafta</span>
                <strong>{formatNumber(result.totalWeeks)}</strong>
              </div>
              <div>
                <span>Toplam ay</span>
                <strong>{formatNumber(result.totalMonths)}</strong>
              </div>
            </div>

            <p className="category-general-converter-equality">
              Sonraki yıl dönümü {formatDateTr(result.nextAnniversaryDate)}{" "}
              tarihinde — {formatNumber(result.daysUntilNextAnniversary)} gün kaldı.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
