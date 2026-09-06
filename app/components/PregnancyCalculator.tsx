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
  Locale,
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
  ar: {
    1: "الثلث الأول",
    2: "الثلث الثاني",
    3: "الثلث الثالث",
  },
uz: {
    1: "1st trimester",
    2: "2nd trimester",
    3: "3rd trimester",
  },
bn: {
    1: "1st trimester",
    2: "2nd trimester",
    3: "3rd trimester",
  },
};

const copyByLocale: Record<
  Locale,
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
    inputLabel: "Son Adet Tarihinin Ilk Gunu",
    emptyState: "Gecerli bir tarih gir; tarih bugunden sonra veya 45 haftadan daha eski olamaz.",
    summaryLabel: "Gebelik haftasi",
    dueDate: "Tahmini dogum tarihi",
    daysUntil: "Doguma kalan gun",
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
    emptyState: "Geben Sie ein gueltiges Datum ein; es darf nicht in der Zukunft liegen oder mehr als 45 Wochen zurueckliegen.",
    summaryLabel: "Schwangerschaftswoche",
    dueDate: "Voraussichtlicher Geburtstermin",
    daysUntil: "Tage bis zur Geburt",
    weeks: "Wochen",
    days: "Tage",
  },
  ar: {
    inputLabel: "أول يوم في آخر دورة شهرية",
    emptyState:
      "أدخلي تاريخًا صحيحًا؛ يجب ألا يكون في المستقبل أو أقدم من 45 أسبوعًا.",
    summaryLabel: "عمر الحمل",
    dueDate: "موعد الولادة المتوقع",
    daysUntil: "الأيام المتبقية حتى الولادة",
    weeks: "أسبوع",
    days: "يوم",
  },
uz: {
    inputLabel: "First Day of the Last Period",
    emptyState: "Enter a valid date; it cannot be in the future or more than 45 weeks old.",
    summaryLabel: "Pregnancy age",
    dueDate: "Estimated due date",
    daysUntil: "Days until due date",
    weeks: "weeks",
    days: "days",
  },
bn: {
    inputLabel: "First Day of the Last Period",
    emptyState: "Enter a valid date; it cannot be in the future or more than 45 weeks old.",
    summaryLabel: "Pregnancy age",
    dueDate: "Estimated due date",
    daysUntil: "Days until due date",
    weeks: "weeks",
    days: "days",
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
  const copy = copyByLocale[locale];
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
              - {trimesterLabels[locale][result.trimester]}
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
    </div>
  );
}
