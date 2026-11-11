"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedDate } from "../i18n/toolLocales";
import {
  calculatePregnancy,
  type PregnancyCalculatorInput,
  type PregnancyTrimester,
} from "../converter/pregnancyCalculator";

const trimesterLabels: Record<
  Exclude<Locale, "ru">,
  Record<PregnancyTrimester, string>
> = {
  tr: {
    1: "1. Trimester",
    2: "2. Trimester",
    3: "3. Trimester",
  },
  en: {
    1: "1st trimester",
    2: "2nd trimester",
    3: "3rd trimester",
  },
  de: {
    1: "1. Trimester",
    2: "2. Trimester",
    3: "3. Trimester",
  },
};

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    inputLabel: string;
    emptyState: string;
    summaryLabel: string;
    dueDate: string;
    daysUntil: string;
    weeks: string;
    days: string;
  }
> = {
  tr: {
    inputLabel: "Son Adet Tarihinin İlk Günü",
    emptyState: "Geçerli bir tarih gir; tarih bugünden sonra veya 45 haftadan daha eski olamaz.",
    summaryLabel: "Gebelik haftası",
    dueDate: "Tahmini doğum tarihi",
    daysUntil: "Doğuma kalan gün",
    weeks: "hafta",
    days: "gun",
  },
  en: {
    inputLabel: "First Day of the Last Period",
    emptyState: "Enter a valid date; it cannot be in the future or more than 45 weeks old.",
    summaryLabel: "Pregnancy age",
    dueDate: "Estimated due date",
    daysUntil: "Days until due date",
    weeks: "weeks",
    days: "days",
  },
  de: {
    inputLabel: "Erster Tag der letzten Periode",
    emptyState: "Geben Sie ein gültiges Datum ein; es darf nicht in der Zukunft liegen oder mehr als 45 Wochen zurückliegen.",
    summaryLabel: "Schwangerschaftswoche",
    dueDate: "Voraussichtlicher Geburtstermin",
    daysUntil: "Tage bis zur Geburt",
    weeks: "Wochen",
    days: "Tage",
  },
};

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

export default function PregnancyCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const displayLocale = locale;
  const copy = copyByLocale[displayLocale];
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
          <span>{copy.inputLabel}</span>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(event) => setLastPeriodDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.summaryLabel}:{" "}
              <strong>
                {result.weeks} {copy.weeks}, {result.days} {copy.days}
              </strong>{" "}
              - {trimesterLabels[displayLocale][result.trimester]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.dueDate}</span>
                <strong>{formatLocalizedDate(result.dueDate, locale)}</strong>
              </div>
              <div>
                <span>{copy.daysUntil}</span>
                <strong>{Math.max(0, result.daysUntilDueDate)}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {locale === "en" && (
        <p className="calculator-usage-hint">
          <strong>Important:</strong> This is an LMP-based estimate, not a
          confirmation of gestational age or due date. A clinician may use an
          early ultrasound and other clinical information to confirm dating;
          seek prompt medical care for symptoms or concerns.
        </p>
      )}
    </div>
  );
}
