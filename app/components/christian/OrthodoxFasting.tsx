"use client";

import { useEffect, useState } from "react";
import { formatLongDate, formatShortDate } from "../../converter/christian/christianCalc";
import {
  fastingDay,
  fastingPeriods,
  FASTING_MAX_YEAR,
  FASTING_MIN_YEAR,
  gregorianToJulian,
  julianToGregorian,
  nextFast,
  type ChurchCalendar,
  type FastKind,
  type FastPeriodId,
} from "../../converter/christian/orthodoxFasting";
import { addDaysYmd, diffDays, parseYmd } from "../../converter/time/dateMath";

export const KIND_LABEL: Record<FastKind, string> = {
  "fast-free": "Fast-free",
  cheesefare: "Cheesefare (no meat)",
  strict: "Strict fast",
  "great-lent": "Great Lent",
  apostles: "Apostles' Fast",
  dormition: "Dormition Fast",
  nativity: "Nativity Fast",
  "wednesday-friday": "Wednesday/Friday fast",
  none: "No fast",
};

export const PERIOD_LABEL: Record<FastPeriodId, string> = {
  svyatki: "Christmastide (Svyatki)",
  "theophany-eve": "Eve of Theophany",
  "publican-pharisee": "Week of the Publican and Pharisee",
  cheesefare: "Cheesefare Week",
  "great-lent": "Great Lent",
  "holy-week": "Holy Week",
  "bright-week": "Bright Week",
  "trinity-week": "Trinity Week",
  apostles: "Apostles' Fast (Peter and Paul Fast)",
  dormition: "Dormition Fast",
  beheading: "Beheading of St. John the Baptist",
  elevation: "Elevation of the Holy Cross",
  nativity: "Nativity Fast (Advent)",
};

export const CALENDAR_LABEL: Record<ChurchCalendar, string> = {
  old: "Old calendar (Russian, Serbian, Georgian, Jerusalem, Athos)",
  new: "New calendar (Greek, Romanian, Bulgarian, Antiochian, OCA)",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function useDate(initial: string) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setValue(todayIso());
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

export function OrthodoxFastingCalendar({ initialDate }: { initialDate: string }) {
  const [calendar, setCalendar] = useState<ChurchCalendar>("old");
  const [date, setDate] = useDate(initialDate);
  const [offset, setOffset] = useState(0);
  const d = parseYmd(date);
  const inRange = d && d.year >= FASTING_MIN_YEAR && d.year <= FASTING_MAX_YEAR;
  const s = inRange ? fastingDay(d, calendar) : null;
  const next = inRange ? nextFast(d, calendar) : null;

  // Month shown in the grid
  const base = d && inRange ? d : { year: 2026, month: 1, day: 1 };
  const mIndex = base.year * 12 + (base.month - 1) + offset;
  const gy = Math.floor(mIndex / 12);
  const gm = (mIndex % 12) + 1;
  const first = { year: gy, month: gm, day: 1 };
  const lead = (new Date(Date.UTC(gy, gm - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(gy, gm, 0)).getUTCDate();
  const gridOk = gy >= FASTING_MIN_YEAR && gy <= FASTING_MAX_YEAR;
  const year = d && inRange ? d.year : 2026;
  // The first entry is the end of the previous Christmastide; the table starts after it.
  const periods = (fastingPeriods(year, calendar) ?? []).slice(1);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Church calendar</span>
            <select value={calendar} onChange={(e) => setCalendar(e.target.value as ChurchCalendar)}>
              {(Object.keys(CALENDAR_LABEL) as ChurchCalendar[]).map((c) => (
                <option key={c} value={c}>
                  {CALENDAR_LABEL[c]}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setOffset(0);
              }}
            />
          </label>
        </div>
      </div>

      {s && d ? (
        <div className="date-calc-results">
          <div className={`date-calc-stat is-main fast-${s.kind}`}>
            <span>{formatLongDate(d)}</span>
            <strong>{s.period ? PERIOD_LABEL[s.period] : KIND_LABEL[s.kind]}</strong>
            <em>{s.period ? KIND_LABEL[s.kind] : s.kind === "none" ? "an ordinary day with no fasting" : "weekly fast day outside the long fasts"}</em>
          </div>
          {next ? (
            <div className="date-calc-stat">
              <span>Next fast</span>
              <strong>{PERIOD_LABEL[next.id]}</strong>
              <em>
                {formatShortDate(next.start)} – {formatShortDate(next.end)} · {next.days} days · starts in {diffDays(d, next.start)} days
              </em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">
          Pick a date between {FASTING_MIN_YEAR} and {FASTING_MAX_YEAR}.
        </p>
      )}

      {gridOk ? (
        <div className="fast-cal">
          <div className="fast-cal-head">
            <button type="button" className="kaza-takip-btn" onClick={() => setOffset((o) => o - 1)} aria-label="Previous month">
              ←
            </button>
            <strong>
              {MONTHS[gm - 1]} {gy}
            </strong>
            <button type="button" className="kaza-takip-btn" onClick={() => setOffset((o) => o + 1)} aria-label="Next month">
              →
            </button>
          </div>
          <div className="fast-cal-grid" role="grid" aria-label={`${MONTHS[gm - 1]} ${gy} fasting calendar`}>
            {WEEK.map((w) => (
              <span key={w} className="fast-cal-wd">
                {w}
              </span>
            ))}
            {Array.from({ length: lead }, (_, i) => (
              <span key={`e${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = addDaysYmd(first, i);
              const st = fastingDay(day, calendar);
              const isSel = d && diffDays(d, day) === 0;
              return (
                <button
                  type="button"
                  key={i}
                  className={`fast-cal-day fast-${st?.kind ?? "none"}${isSel ? " is-selected" : ""}`}
                  title={st ? (st.period ? PERIOD_LABEL[st.period] : KIND_LABEL[st.kind]) : ""}
                  onClick={() => {
                    setDate(`${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`);
                    setOffset(0);
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <ul className="fast-cal-legend">
            {(["great-lent", "strict", "apostles", "dormition", "nativity", "wednesday-friday", "cheesefare", "fast-free"] as FastKind[]).map((k) => (
              <li key={k}>
                <i className={`fast-${k}`} aria-hidden="true" />
                {KIND_LABEL[k]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {periods.length ? (
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <caption>
              Fasts and fast-free weeks around Pascha {year} ({calendar} calendar)
            </caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Dates</th>
                <th scope="col">Days</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((p) => (
                <tr key={`${p.id}-${p.start.year}-${p.start.month}`}>
                  <td>
                    <i className={`fast-dot fast-${p.kind}`} aria-hidden="true" /> {PERIOD_LABEL[p.id]}
                  </td>
                  <td>{p.days === 1 ? formatShortDate(p.start) : `${formatShortDate(p.start)} – ${formatShortDate(p.end)}`}</td>
                  <td>{p.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="date-calc-note">
        Wednesdays and Fridays are fast days outside the fast-free weeks. Which foods are allowed on each day (oil, wine, fish) differs between
        local churches and monasteries; follow your parish calendar or your priest&apos;s guidance.
      </p>
    </div>
  );
}

/* ---------------- Julian ↔ Gregorian ---------------- */

export function JulianDateConverter({ initialDate }: { initialDate: string }) {
  const [dir, setDir] = useState<"g2j" | "j2g">("g2j");
  const [date, setDate] = useDate(initialDate);
  const d = parseYmd(date);
  const ok = d && d.year >= FASTING_MIN_YEAR && d.year <= FASTING_MAX_YEAR;
  const out = ok ? (dir === "g2j" ? gregorianToJulian(d) : julianToGregorian(d)) : null;
  const plain = (x: { year: number; month: number; day: number }) => `${MONTHS[x.month - 1]} ${x.day}, ${x.year}`;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Direction">
        {(
          [
            ["g2j", "New style → Old style"],
            ["j2g", "Old style → New style"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={dir === v} className={dir === v ? "is-active" : undefined} onClick={() => setDir(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{dir === "g2j" ? "Gregorian (civil) date" : "Julian (church) date"}</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
      </div>
      {out && d ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{dir === "g2j" ? "Julian (old style) date" : "Gregorian (new style) date"}</span>
            <strong>{dir === "g2j" ? plain(out) : formatLongDate(out)}</strong>
            <em>{dir === "g2j" ? `${formatLongDate(d)} is ${plain(out)} on the Julian calendar` : `13 days later than the Julian date`}</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">
          Pick a date between {FASTING_MIN_YEAR} and {FASTING_MAX_YEAR}; in this period the calendars are 13 days apart.
        </p>
      )}
    </div>
  );
}
