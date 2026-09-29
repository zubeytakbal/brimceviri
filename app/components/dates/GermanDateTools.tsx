"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, countDays, diffDays, diffYmd, isoWeeksInYear, parseYmd, weekdayOf } from "../../converter/time/dateMath";
import { formatDeLong, formatDeShort, kalenderwoche, weekRangeDe, ymdInput } from "../../converter/time/germanDates";
import { GERMAN_STATES, germanHolidayLookup, stateHolidays, type StateCode } from "../../converter/time/germanHolidays";

const num = (n: number) => n.toLocaleString("de-DE");

/* ---------------- Kalenderwoche ---------------- */

export function KalenderwocheTool({ today }: { today: string }) {
  const [date, setDate] = useState(today);
  const [kwYear, setKwYear] = useState(today.slice(0, 4));
  const [kw, setKw] = useState(String(kalenderwoche(parseYmd(today)!).week));

  const fromDate = useMemo(() => {
    const d = parseYmd(date);
    return d ? kalenderwoche(d) : null;
  }, [date]);

  const fromWeek = useMemo(() => {
    const y = Number(kwYear);
    const w = Number(kw);
    if (!Number.isInteger(y) || y < 1900 || y > 2200 || !Number.isInteger(w) || w < 1 || w > isoWeeksInYear(y)) return null;
    const monday = kalenderwoche({ year: y, month: 1, day: 4 });
    const start = addDaysYmd(monday.monday, (w - 1) * 7);
    return { start, end: addDaysYmd(start, 6), weeks: isoWeeksInYear(y) };
  }, [kwYear, kw]);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Datum</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
        </div>
      </div>
      {fromDate ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Kalenderwoche</span>
            <strong>
              KW {fromDate.week} / {fromDate.year}
            </strong>
            <em>{weekRangeDe(fromDate.monday, fromDate.sunday)}</em>
          </div>
          <div className="date-calc-stat">
            <span>Wochentag</span>
            <strong>{formatDeLong(parseYmd(date)!).split(",")[0]}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Wochen im Jahr {fromDate.year}</span>
            <strong>{isoWeeksInYear(fromDate.year)}</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Bitte ein gültiges Datum eingeben.</p>
      )}

      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kalenderwoche</span>
            <input inputMode="numeric" value={kw} onChange={(event) => setKw(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Jahr</span>
            <input inputMode="numeric" value={kwYear} onChange={(event) => setKwYear(event.target.value)} />
          </label>
        </div>
      </div>
      {fromWeek ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>
              KW {kw} im Jahr {kwYear}
            </span>
            <strong>{weekRangeDe(fromWeek.start, fromWeek.end)}</strong>
            <em>
              Montag, {formatDeShort(fromWeek.start)} bis Sonntag, {formatDeShort(fromWeek.end)}
            </em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Das Jahr {kwYear} hat Kalenderwochen von 1 bis {Number(kwYear) > 1900 ? isoWeeksInYear(Number(kwYear)) : 52}.</p>
      )}
    </div>
  );
}

/* ---------------- Arbeitstage ---------------- */

export function ArbeitstageRechner({ today }: { today: string }) {
  const year = Number(today.slice(0, 4));
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(`${year}-12-31`);
  const [state, setState] = useState<StateCode>("nw");
  const [saturday, setSaturday] = useState(false);
  const [partial, setPartial] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const land = GERMAN_STATES.find((s) => s.slug === params.get("land"));
      if (land) setState(land.code);
      const f = params.get("von");
      const t = params.get("bis");
      if (f && parseYmd(f)) setFrom(f);
      if (t && parseYmd(t)) setTo(t);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const result = useMemo(() => {
    const a = parseYmd(from);
    const b = parseYmd(to);
    if (!a || !b || diffDays(a, b) < 0 || diffDays(a, b) > 366 * 30) return null;
    const lookup = germanHolidayLookup(state, a.year, b.year, partial);
    const counts = countDays(a, b, lookup, { saturdayWork: saturday });
    const holidays: Array<{ date: YMD; name: string }> = [];
    for (let y = a.year; y <= b.year; y += 1) {
      for (const h of stateHolidays(state, y, { includePartial: partial })) {
        if (diffDays(a, h.date) >= 0 && diffDays(h.date, b) >= 0) holidays.push({ date: h.date, name: h.name });
      }
    }
    return { counts, holidays };
  }, [from, to, state, saturday, partial]);

  const stateName = GERMAN_STATES.find((s) => s.code === state)!.name;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Von</span>
            <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Bis (einschließlich)</span>
            <input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Bundesland</span>
            <select value={state} onChange={(event) => setState(event.target.value as StateCode)}>
              {GERMAN_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-checks">
          <label>
            <input type="checkbox" checked={saturday} onChange={(event) => setSaturday(event.target.checked)} /> Samstag mitzählen (Werktage Mo–Sa)
          </label>
          <label>
            <input type="checkbox" checked={partial} onChange={(event) => setPartial(event.target.checked)} /> Regionale Feiertage einbeziehen (z. B. Mariä
            Himmelfahrt in Bayern)
          </label>
        </div>
      </div>

      {result ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{saturday ? "Werktage (Mo–Sa)" : "Arbeitstage (Mo–Fr)"}</span>
              <strong>{num(result.counts.work)}</strong>
              <em>
                in {stateName}, {formatDeShort(parseYmd(from)!)} bis {formatDeShort(parseYmd(to)!)}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Kalendertage</span>
              <strong>{num(result.counts.total)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>{saturday ? "Sonntage" : "Wochenendtage"}</span>
              <strong>{num(result.counts.weekend)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Feiertage an Werktagen</span>
              <strong>{num(result.counts.holiday)}</strong>
            </div>
          </div>
          {result.holidays.length > 0 && (
            <ul className="date-calc-holidays">
              {result.holidays.map((h) => (
                <li key={`${h.date.year}-${h.date.month}-${h.date.day}-${h.name}`}>
                  {formatDeShort(h.date)} – {h.name}
                  {[0, 6].includes(weekdayOf(h.date)) && (weekdayOf(h.date) === 0 || !saturday) ? " (fällt aufs Wochenende)" : ""}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="date-calc-note">Bitte zwei gültige Daten eingeben; das Enddatum darf nicht vor dem Startdatum liegen.</p>
      )}
    </div>
  );
}

/* ---------------- Tagerechner ---------------- */

export function Tagerechner({ today }: { today: string }) {
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(`${today.slice(0, 4)}-12-24`);
  const [inclusive, setInclusive] = useState(false);
  const [start, setStart] = useState(today);
  const [amount, setAmount] = useState("30");
  const [sign, setSign] = useState<1 | -1>(1);

  const diff = useMemo(() => {
    const a = parseYmd(from);
    const b = parseYmd(to);
    if (!a || !b) return null;
    const [x, y] = diffDays(a, b) >= 0 ? [a, b] : [b, a];
    const days = diffDays(x, y) + (inclusive ? 1 : 0);
    const ymd = diffYmd(x, inclusive ? addDaysYmd(y, 1) : y);
    // Montag bis Freitag ohne Feiertagsabzug; Feiertage je Bundesland im Arbeitstage-Rechner.
    const work = countDays(x, inclusive ? y : addDaysYmd(y, -1), () => undefined, {}).work;
    return { days, weeks: Math.floor(days / 7), rest: days % 7, ymd, work, reversed: x !== a };
  }, [from, to, inclusive]);

  const added = useMemo(() => {
    const s = parseYmd(start);
    const n = Number(amount.replace(",", "."));
    if (!s || !Number.isInteger(n) || Math.abs(n) > 100000) return null;
    return addDaysYmd(s, n * sign);
  }, [start, amount, sign]);

  return (
    <div className="date-calc">
      <div className="date-converter-modes" role="tablist">
        {[
          { id: "diff" as const, label: "Tage zwischen zwei Daten" },
          { id: "add" as const, label: "Tage addieren / abziehen" },
        ].map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === "diff" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Startdatum</span>
                <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>Enddatum</span>
                <input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
              </label>
            </div>
            <div className="date-calc-checks">
              <label>
                <input type="checkbox" checked={inclusive} onChange={(event) => setInclusive(event.target.checked)} /> Enddatum mitzählen
              </label>
            </div>
          </div>
          {diff ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Anzahl Tage</span>
                <strong>{num(diff.days)}</strong>
                <em>
                  {diff.weeks} Wochen und {diff.rest} Tage
                </em>
              </div>
              <div className="date-calc-stat">
                <span>Jahre, Monate, Tage</span>
                <strong>
                  {diff.ymd.years} J., {diff.ymd.months} M., {diff.ymd.days} T.
                </strong>
              </div>
              <div className="date-calc-stat">
                <span>Wochentage Mo–Fr (ohne Feiertage)</span>
                <strong>{num(diff.work)}</strong>
                <em>
                  <Link href={`/de/arbeitstage-rechner?von=${from}&bis=${to}`} prefetch={false}>
                    Mit Feiertagen je Bundesland →
                  </Link>
                </em>
              </div>
            </div>
          ) : (
            <p className="date-calc-note">Bitte zwei gültige Daten eingeben.</p>
          )}
        </>
      ) : (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Ausgangsdatum</span>
                <input type="date" value={start} onChange={(event) => setStart(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>Tage</span>
                <span className="date-calc-field-row">
                  <select value={sign} onChange={(event) => setSign(Number(event.target.value) as 1 | -1)} aria-label="Richtung">
                    <option value={1}>plus</option>
                    <option value={-1}>minus</option>
                  </select>
                  <input inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} />
                </span>
              </label>
            </div>
          </div>
          {added ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Ergebnis</span>
                <strong>{formatDeShort(added)}</strong>
                <em>{formatDeLong(added)}</em>
              </div>
              <div className="date-calc-stat">
                <span>Kalenderwoche</span>
                <strong>KW {kalenderwoche(added).week}</strong>
              </div>
            </div>
          ) : (
            <p className="date-calc-note">Bitte ein gültiges Datum und eine ganze Zahl eingeben.</p>
          )}
        </>
      )}
    </div>
  );
}

export { ymdInput };
