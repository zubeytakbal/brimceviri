"use client";

import { useMemo, useState } from "react";
import {
  calculatePregnancy,
  type PregnancyCalculatorInput,
} from "../converter/pregnancyCalculator";

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function formatDateTr(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);

  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const trimesterLabels: Record<1 | 2 | 3, string> = {
  1: "1. Trimester",
  2: "2. Trimester",
  3: "3. Trimester",
};

export default function PregnancyCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("2026-01-01");
  const [referenceDate] = useState(() => todayIsoDate());

  const input: PregnancyCalculatorInput = useMemo(
    () => ({ lastPeriodDate, referenceDate }),
    [lastPeriodDate, referenceDate]
  );

  const result = useMemo(() => calculatePregnancy(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Son Adet Tarihinin İlk Günü</span>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(event) => setLastPeriodDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>
            Geçerli bir tarih gir; tarih bugünden sonra veya 45 haftadan
            daha eski olamaz.
          </strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              Gebelik haftası:{" "}
              <strong>
                {result.weeks} hafta, {result.days} gün
              </strong>{" "}
              — {trimesterLabels[result.trimester]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Tahmini doğum tarihi</span>
                <strong>{formatDateTr(result.dueDate)}</strong>
              </div>
              <div>
                <span>Doğuma kalan gün</span>
                <strong>{Math.max(0, result.daysUntilDueDate)}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
