"use client";

import { useMemo, useState } from "react";
import {
  gregorianToHijri,
  hijriToGregorian,
  gregorianMonthNamesAr,
  hijriMonthNamesAr,
  type CalendarDate,
} from "../converter/hijriCalendar";

type Direction = "gregorianToHijri" | "hijriToGregorian";

function today(): CalendarDate {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

function formatArabicDate(date: CalendarDate, monthNames: string[]) {
  const monthName = monthNames[date.month - 1] ?? "";
  return `${date.day} ${monthName} ${date.year}`;
}

export default function HijriDateConverter() {
  const [direction, setDirection] = useState<Direction>("gregorianToHijri");
  const initial = today();
  const [year, setYear] = useState(String(initial.year));
  const [month, setMonth] = useState(String(initial.month));
  const [day, setDay] = useState(String(initial.day));

  const inputDate: CalendarDate = {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };

  const isValid =
    Number.isFinite(inputDate.year) &&
    Number.isFinite(inputDate.month) &&
    Number.isFinite(inputDate.day) &&
    inputDate.month >= 1 &&
    inputDate.month <= 12 &&
    inputDate.day >= 1 &&
    inputDate.day <= 31;

  const result = useMemo(() => {
    if (!isValid) return null;

    try {
      return direction === "gregorianToHijri"
        ? gregorianToHijri(inputDate)
        : hijriToGregorian(inputDate);
    } catch {
      return null;
    }
  }, [direction, inputDate.year, inputDate.month, inputDate.day, isValid]);

  function setToday() {
    const now = today();
    setYear(String(now.year));
    setMonth(String(now.month));
    setDay(String(now.day));
  }

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>اتجاه التحويل</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${direction === "gregorianToHijri" ? " is-active" : ""}`}
            onClick={() => setDirection("gregorianToHijri")}
          >
            ميلادي ← هجري
          </button>
          <button
            type="button"
            className={`engineering-target-button${direction === "hijriToGregorian" ? " is-active" : ""}`}
            onClick={() => setDirection("hijriToGregorian")}
          >
            هجري ← ميلادي
          </button>
        </div>
      </div>

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>اليوم</span>
          <input
            inputMode="numeric"
            type="text"
            value={day}
            onChange={(event) => setDay(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>الشهر (1-12)</span>
          <input
            inputMode="numeric"
            type="text"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>السنة ({direction === "gregorianToHijri" ? "ميلادية" : "هجرية"})</span>
          <input
            inputMode="numeric"
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
      </div>

      <button
        type="button"
        className="engineering-target-button atomic-mass-add-button"
        onClick={setToday}
      >
        استخدام تاريخ اليوم
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>أدخل تاريخًا صحيحًا لعرض النتيجة.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{direction === "gregorianToHijri" ? "التاريخ الهجري" : "التاريخ الميلادي"}</span>
              <strong>
                {formatArabicDate(
                  result,
                  direction === "gregorianToHijri" ? hijriMonthNamesAr : gregorianMonthNamesAr
                )}
              </strong>
            </div>
            <div>
              <span>بالأرقام</span>
              <strong>
                {result.day}/{result.month}/{result.year}
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        يعتمد هذا التحويل على التقويم الهجري الحسابي (الجدولي) المبني على
        دورة فلكية ثابتة من 30 سنة، وهو المعيار الشائع في أدوات التحويل.
        قد يختلف بيوم واحد عن التقويم المعتمد رسميًا على رؤية الهلال
        الفعلية (كتقويم أم القرى)، خصوصًا عند بداية الأشهر القمرية
        المهمة كرمضان وشوال وذي الحجة -- ولذلك يُنصح دائمًا بالتحقق من
        الإعلان الرسمي للمناسبات الدينية.
      </p>
    </div>
  );
}
