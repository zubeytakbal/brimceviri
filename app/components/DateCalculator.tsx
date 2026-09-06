"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import {
  formatLocalizedDate,
  formatLocalizedNumber,
} from "../i18n/toolLocales";
import {
  calculateDateDifference,
  type DateCalculatorInput,
} from "../converter/dateCalculator";

type DateCopy = {
  labels: {
    startDate: string;
    endDate: string;
  };
  emptyState: string;
  resultLabels: {
    difference: string;
    totalDays: string;
    totalWeeks: string;
    totalMonths: string;
    nextAnniversary: string;
  };
  units: {
    years: string;
    months: string;
    days: string;
  };
};

const copyByLocale: Record<Locale, DateCopy> = {
  tr: {
    labels: {
      startDate: "Baslangic Tarihi (Dogum Tarihi)",
      endDate: "Hedef Tarih",
    },
    emptyState: "Gecerli iki tarih gir; hedef tarih baslangic tarihinden once olamaz.",
    resultLabels: {
      difference: "Fark",
      totalDays: "Toplam gun",
      totalWeeks: "Toplam hafta",
      totalMonths: "Toplam ay",
      nextAnniversary: "Sonraki yil donumu",
    },
    units: {
      years: "yil",
      months: "ay",
      days: "gun",
    },
  },
  en: {
    labels: {
      startDate: "Start Date (Birth Date)",
      endDate: "Target Date",
    },
    emptyState: "Enter two valid dates; the target date cannot be earlier than the start date.",
    resultLabels: {
      difference: "Difference",
      totalDays: "Total days",
      totalWeeks: "Total weeks",
      totalMonths: "Total months",
      nextAnniversary: "Next anniversary",
    },
    units: {
      years: "years",
      months: "months",
      days: "days",
    },
  },
  de: {
    labels: {
      startDate: "Startdatum (Geburtsdatum)",
      endDate: "Zieldatum",
    },
    emptyState: "Geben Sie zwei gueltige Daten ein; das Zieldatum darf nicht vor dem Startdatum liegen.",
    resultLabels: {
      difference: "Differenz",
      totalDays: "Gesamttage",
      totalWeeks: "Gesamtwochen",
      totalMonths: "Gesamtmonate",
      nextAnniversary: "Naechster Jahrestag",
    },
    units: {
      years: "Jahre",
      months: "Monate",
      days: "Tage",
    },
  },
  ar: {
    labels: {
      startDate: "تاريخ البداية (تاريخ الميلاد)",
      endDate: "التاريخ المستهدف",
    },
    emptyState:
      "أدخل تاريخين صحيحين، ويجب ألا يكون التاريخ المستهدف قبل تاريخ البداية.",
    resultLabels: {
      difference: "الفرق",
      totalDays: "إجمالي الأيام",
      totalWeeks: "إجمالي الأسابيع",
      totalMonths: "إجمالي الأشهر",
      nextAnniversary: "الذكرى التالية",
    },
    units: {
      years: "سنة",
      months: "شهر",
      days: "يوم",
    },
  },
uz: {
    labels: {
      startDate: "Start Date (Birth Date)",
      endDate: "Target Date",
    },
    emptyState: "Enter two valid dates; the target date cannot be earlier than the start date.",
    resultLabels: {
      difference: "Difference",
      totalDays: "Total days",
      totalWeeks: "Total weeks",
      totalMonths: "Total months",
      nextAnniversary: "Next anniversary",
    },
    units: {
      years: "years",
      months: "months",
      days: "days",
    },
  },
bn: {
    labels: {
      startDate: "Start Date (Birth Date)",
      endDate: "Target Date",
    },
    emptyState: "Enter two valid dates; the target date cannot be earlier than the start date.",
    resultLabels: {
      difference: "Difference",
      totalDays: "Total days",
      totalWeeks: "Total weeks",
      totalMonths: "Total months",
      nextAnniversary: "Next anniversary",
    },
    units: {
      years: "years",
      months: "months",
      days: "days",
    },
  },
};

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function formatNumber(value: number, locale: Locale) {
  return formatLocalizedNumber(Math.round(value), locale);
}

export default function DateCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
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
          <span>{copy.labels.startDate}</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.endDate}</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.difference}:{" "}
              <strong>
                {result.years} {copy.units.years}, {result.months} {copy.units.months}, {result.days}{" "}
                {copy.units.days}
              </strong>
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.totalDays}</span>
                <strong>{formatNumber(result.totalDays, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalWeeks}</span>
                <strong>{formatNumber(result.totalWeeks, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalMonths}</span>
                <strong>{formatNumber(result.totalMonths, locale)}</strong>
              </div>
            </div>

            <p className="category-general-converter-equality">
              {copy.resultLabels.nextAnniversary}{" "}
              {formatLocalizedDate(result.nextAnniversaryDate, locale)} -{" "}
              {formatNumber(result.daysUntilNextAnniversary, locale)} {copy.units.days}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
