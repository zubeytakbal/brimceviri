"use client";

import { useEffect, useMemo, useState } from "react";
import type { YMD } from "../../converter/time/calendars";
import { diffDays } from "../../converter/time/dateMath";
import { todayBerlin } from "../../converter/time/germanDates";
import { NORDIC_HOLIDAY_COPY, nordicHolidays } from "../../converter/time/nordicHolidays";
import { formatNordicDate, formatNordicDayMonth, formatNordicWeekday, type NordicLocale } from "../../converter/time/nordicWeek";

const FIRST_YEAR = 2000;
const LAST_YEAR = 2100;

/** Yıl seçmeli resmi tatil tablosu (sv/no/da). İlk yıl derleme tarihinden gelir. */
export default function NordicHolidayTool({ locale, initialToday }: { locale: NordicLocale; initialToday: YMD }) {
  const t = NORDIC_HOLIDAY_COPY[locale];
  const [today, setToday] = useState(initialToday);
  const [year, setYear] = useState(initialToday.year);

  // Sayfa gece derleniyor; ziyaretçinin gerçek "bugün"ü tarayıcıda atanır.
  useEffect(() => {
    setToday(todayBerlin()); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const rows = useMemo(() => nordicHolidays(locale, year), [locale, year]);
  const next = rows.find((h) => h.kind === "holiday" && diffDays(today, h.date) >= 0);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.yearLabel}</span>
            <select value={year} onChange={(event) => setYear(Number(event.target.value))}>
              {Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {next ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{t.next}</span>
            <strong>{next.name}</strong>
            <em>
              {formatNordicWeekday(locale, next.date)} {formatNordicDate(locale, next.date)}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>{t.colLeft}</span>
            <strong>{diffDays(today, next.date) === 0 ? t.today : diffDays(today, next.date)}</strong>
          </div>
        </div>
      ) : null}

      <h2 id="tabell">{t.tableTitle(year)}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">{t.colDate}</th>
              <th scope="col">{t.colDay}</th>
              <th scope="col">{t.colName}</th>
              <th scope="col">{t.colLeft}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((h) => {
              const left = diffDays(today, h.date);
              return (
                <tr key={h.id}>
                  <td>{formatNordicDayMonth(locale, h.date)}</td>
                  <td>{formatNordicWeekday(locale, h.date)}</td>
                  <td>
                    {h.kind === "eve" ? (
                      <>
                        {h.name} <small>({t.eveBadge})</small>
                      </>
                    ) : (
                      <strong>{h.name}</strong>
                    )}
                    <br />
                    <small>{h.note}</small>
                  </td>
                  <td>{left < 0 ? "–" : left === 0 ? t.today : left}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
