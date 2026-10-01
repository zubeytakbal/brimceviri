"use client";

import { useEffect, useMemo, useState } from "react";
import { addDaysYmd, isoWeeksInYear, parseYmd } from "../../converter/time/dateMath";
import { kalenderwoche, todayBerlin, ymdInput } from "../../converter/time/germanDates";
import {
  formatNordicDate,
  formatNordicWeekday,
  NORDIC_WEEK_COPY,
  nordicWeekRange,
  type NordicLocale,
} from "../../converter/time/nordicWeek";

/** İsveççe, Norveççe ve Danca hafta numarası aracı (ISO 8601). */
export default function NordicWeekTool({ locale, today }: { locale: NordicLocale; today: string }) {
  const t = NORDIC_WEEK_COPY[locale];
  const [date, setDate] = useState(today);
  const [weekYear, setWeekYear] = useState(today.slice(0, 4));
  const [week, setWeek] = useState(String(kalenderwoche(parseYmd(today)!).week));

  // Sayfa gece derleniyor; ziyaretçinin gerçek "bugün"ü tarayıcıda atanır.
  useEffect(() => {
    const now = todayBerlin();
    const current = kalenderwoche(now);
    setDate(ymdInput(now)); // eslint-disable-line react-hooks/set-state-in-effect
    setWeekYear(String(current.year));
    setWeek(String(current.week));
  }, []);

  const fromDate = useMemo(() => {
    const d = parseYmd(date);
    return d ? { ...kalenderwoche(d), date: d } : null;
  }, [date]);

  const fromWeek = useMemo(() => {
    const y = Number(weekYear);
    const w = Number(week);
    if (!Number.isInteger(y) || y < 1900 || y > 2200 || !Number.isInteger(w) || w < 1 || w > isoWeeksInYear(y)) return null;
    const start = addDaysYmd(kalenderwoche({ year: y, month: 1, day: 4 }).monday, (w - 1) * 7);
    return { start, end: addDaysYmd(start, 6) };
  }, [weekYear, week]);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.date}</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
        </div>
      </div>
      {fromDate ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{t.week}</span>
            <strong>
              {t.week} {fromDate.week} / {fromDate.year}
            </strong>
            <em>{nordicWeekRange(locale, fromDate.monday, fromDate.sunday)}</em>
          </div>
          <div className="date-calc-stat">
            <span>{t.weekday}</span>
            <strong>{formatNordicWeekday(locale, fromDate.date)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>{t.weeksInYear(fromDate.year)}</span>
            <strong>{isoWeeksInYear(fromDate.year)}</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">{t.invalidDate}</p>
      )}

      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.week}</span>
            <input inputMode="numeric" value={week} onChange={(event) => setWeek(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>{t.year}</span>
            <input inputMode="numeric" value={weekYear} onChange={(event) => setWeekYear(event.target.value)} />
          </label>
        </div>
      </div>
      {fromWeek ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{t.weekOfYear(week, weekYear)}</span>
            <strong>{nordicWeekRange(locale, fromWeek.start, fromWeek.end)}</strong>
            <em>{t.mondayToSunday(formatNordicDate(locale, fromWeek.start), formatNordicDate(locale, fromWeek.end))}</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">
          {t.validWeeks(weekYear, Number(weekYear) > 1900 && Number(weekYear) < 2200 ? isoWeeksInYear(Number(weekYear)) : 52)}
        </p>
      )}
    </div>
  );
}
