"use client";

import { useEffect, useMemo, useState } from "react";
import { addDaysYmd, countDays, diffDays, diffYmd, parseYmd } from "../../converter/time/dateMath";
import { kalenderwoche, todayBerlin, ymdInput } from "../../converter/time/germanDates";
import { NORDIC_DAYS_COPY } from "../../converter/time/nordicDays";
import { formatNordicDate, formatNordicLong, type NordicLocale } from "../../converter/time/nordicWeek";

const NUMBER_LOCALE: Record<NordicLocale, string> = { sv: "sv-SE", no: "nb-NO", da: "da-DK" };

/** İki tarih arası gün ve tarihe gün ekleme (sv/no/da). */
export default function NordicDaysTool({ locale, today }: { locale: NordicLocale; today: string }) {
  const t = NORDIC_DAYS_COPY[locale];
  const num = (n: number) => n.toLocaleString(NUMBER_LOCALE[locale]);
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(`${today.slice(0, 4)}-12-24`);
  const [inclusive, setInclusive] = useState(false);
  const [start, setStart] = useState(today);
  const [amount, setAmount] = useState("30");
  const [sign, setSign] = useState<1 | -1>(1);

  // Sayfa gece derleniyor; ziyaretçinin gerçek "bugün"ü tarayıcıda atanır.
  useEffect(() => {
    const now = ymdInput(todayBerlin());
    setFrom(now); // eslint-disable-line react-hooks/set-state-in-effect
    setStart(now);
  }, []);

  const diff = useMemo(() => {
    const a = parseYmd(from);
    const b = parseYmd(to);
    if (!a || !b) return null;
    const [x, y] = diffDays(a, b) >= 0 ? [a, b] : [b, a];
    const days = diffDays(x, y) + (inclusive ? 1 : 0);
    const ymd = diffYmd(x, inclusive ? addDaysYmd(y, 1) : y);
    const work = days > 0 ? countDays(x, inclusive ? y : addDaysYmd(y, -1), () => undefined, {}).work : 0;
    return { days, weeks: Math.floor(days / 7), rest: days % 7, ymd, work };
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
          { id: "diff" as const, label: t.modeDiff },
          { id: "add" as const, label: t.modeAdd },
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
                <span>{t.start}</span>
                <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.end}</span>
                <input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
              </label>
            </div>
            <div className="date-calc-checks">
              <label>
                <input type="checkbox" checked={inclusive} onChange={(event) => setInclusive(event.target.checked)} /> {t.inclusive}
              </label>
            </div>
          </div>
          {diff ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>{t.days}</span>
                <strong>{num(diff.days)}</strong>
                <em>{t.weeksAndDays(diff.weeks, diff.rest)}</em>
              </div>
              <div className="date-calc-stat">
                <span>{t.ymd}</span>
                <strong>{t.ymdValue(diff.ymd.years, diff.ymd.months, diff.ymd.days)}</strong>
              </div>
              <div className="date-calc-stat">
                <span>{t.weekdays}</span>
                <strong>{num(diff.work)}</strong>
                <em>{t.weekdaysNote}</em>
              </div>
            </div>
          ) : (
            <p className="date-calc-note">{t.invalidDiff}</p>
          )}
        </>
      ) : (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>{t.base}</span>
                <input type="date" value={start} onChange={(event) => setStart(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.amount}</span>
                <span className="date-calc-field-row">
                  <select value={sign} onChange={(event) => setSign(Number(event.target.value) as 1 | -1)} aria-label={t.direction}>
                    <option value={1}>{t.plus}</option>
                    <option value={-1}>{t.minus}</option>
                  </select>
                  <input inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} />
                </span>
              </label>
            </div>
          </div>
          {added ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>{t.result}</span>
                <strong>{formatNordicDate(locale, added)}</strong>
                <em>{formatNordicLong(locale, added)}</em>
              </div>
              <div className="date-calc-stat">
                <span>{t.week}</span>
                <strong>{kalenderwoche(added).week}</strong>
              </div>
            </div>
          ) : (
            <p className="date-calc-note">{t.invalidAdd}</p>
          )}
        </>
      )}
    </div>
  );
}
