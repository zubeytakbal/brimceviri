"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";
import type { YMD } from "../../converter/time/calendars";
import {
  addBusinessDays,
  addDaysYmd,
  addMonthsYmd,
  countDays,
  dayOfYear,
  diffDays,
  diffYmd,
  formatYmd,
  isLeapYear,
  isoWeek,
  isoWeekStart,
  parseYmd,
  usWeek,
  ymdKey,
  ymdToMs,
} from "../../converter/time/dateMath";
import { HOLIDAY_FIRST_YEAR, holidayLookup, type Holiday, type HolidayLang } from "../../converter/time/holidays";

type Lang = HolidayLang;

const LOCALE = { tr: "tr-TR", en: "en-US" } as const;

function num(value: number, lang: Lang) {
  return value.toLocaleString(LOCALE[lang], { maximumFractionDigits: 1 });
}

function todayYmd(): YMD {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

/** Ilk karede bugunun tarihi ya da URL'deki ?from= / ?to= / ?date= degerleri. */
function useInitialDates(keys: string[], fallback: (today: YMD) => Record<string, YMD>) {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const defaults = fallback(todayYmd());
      const next: Record<string, string> = {};
      for (const key of keys) {
        const fromUrl = params.get(key);
        next[key] = fromUrl && parseYmd(fromUrl) ? fromUrl : ymdKey(defaults[key]);
      }
      setValues(next);
    });
    return () => cancelAnimationFrame(frame);
    // Yalnizca ilk yuklemede
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [values, (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }))] as const;
}

function lookupFor(lang: Lang, a: YMD, b: YMD) {
  const from = Math.min(a.year, b.year) - 1;
  const to = Math.max(a.year, b.year) + 1;
  return holidayLookup(lang, Math.max(from, HOLIDAY_FIRST_YEAR[lang]), Math.min(to, 2100));
}

function holidaysInRange(lookup: (date: YMD) => Holiday | undefined, start: YMD, end: YMD, limit = 40) {
  const list: Holiday[] = [];
  const days = diffDays(start, end);
  for (let i = 0; i <= days && list.length < limit; i += 1) {
    const h = lookup(addDaysYmd(start, i));
    if (h) list.push(h);
  }
  return list;
}

function DateField({ label, value, onChange, todayLabel }: { label: string; value: string; onChange: (v: string) => void; todayLabel: string }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
        <button type="button" onClick={() => onChange(ymdKey(todayYmd()))}>
          {todayLabel}
        </button>
      </span>
    </label>
  );
}

function Stat({ label, value, sub, main }: { label: string; value: string; sub?: string; main?: boolean }) {
  return (
    <div className={`date-calc-stat${main ? " is-main" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {sub ? <em>{sub}</em> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Iki tarih arasi gun                                                  */
/* ------------------------------------------------------------------ */

const DIFF_COPY = {
  tr: {
    from: "Başlangıç tarihi",
    to: "Bitiş tarihi",
    today: "Bugün",
    swap: "Tarihleri değiştir",
    includeEnd: "Bitiş gününü de say (+1 gün)",
    days: "gün",
    total: "Toplam",
    ymd: "Yıl, ay, gün",
    weeks: "Hafta",
    workdays: "İş günü",
    workdaysSub: "Hafta sonu ve resmî tatiller hariç, iki tarih dahil",
    weekends: "Hafta sonu günü",
    holidays: "Resmî tatil (hafta içi)",
    hours: "Saat",
    minutes: "Dakika",
    past: "Bitiş tarihi başlangıçtan önce; fark mutlak değer olarak gösteriliyor.",
    y: "yıl",
    m: "ay",
    d: "gün",
    w: "hafta",
    workdayLink: "İş günlerini ayrıntılı hesapla",
    addLink: "Bir tarihe gün ekle",
    holidayNote: (n: number) => `Aralıktaki resmî tatiller (${n})`,
    half: "yarım gün",
    noHolidayData: "Resmî tatil verisi 2017 ve sonrası için kullanılır.",
  },
  en: {
    from: "Start date",
    to: "End date",
    today: "Today",
    swap: "Swap dates",
    includeEnd: "Include the end date (+1 day)",
    days: "days",
    total: "Total",
    ymd: "Years, months, days",
    weeks: "Weeks",
    workdays: "Business days",
    workdaysSub: "Excludes weekends and US federal holidays; both dates included",
    weekends: "Weekend days",
    holidays: "Federal holidays (weekdays)",
    hours: "Hours",
    minutes: "Minutes",
    past: "The end date is before the start date; the difference is shown as a positive number.",
    y: "years",
    m: "months",
    d: "days",
    w: "weeks",
    workdayLink: "Detailed business day calculator",
    addLink: "Add days to a date",
    holidayNote: (n: number) => `Federal holidays in this range (${n})`,
    half: "half day",
    noHolidayData: "Federal holiday data is applied from 2021 onwards.",
  },
};

export function DateDiffCalculator({ lang }: { lang: Lang }) {
  const t = DIFF_COPY[lang];
  const [values, set] = useInitialDates(["from", "to"], (today) => ({ from: today, to: { year: today.year, month: 12, day: 31 } }));
  const [includeEnd, setIncludeEnd] = useState(false);
  const from = parseYmd(values.from ?? "");
  const to = parseYmd(values.to ?? "");

  const result = useMemo(() => {
    if (!from || !to) return null;
    const raw = diffDays(from, to);
    const [a, b] = raw >= 0 ? [from, to] : [to, from];
    const days = Math.abs(raw) + (includeEnd ? 1 : 0);
    const parts = diffYmd(a, includeEnd ? addDaysYmd(b, 1) : b);
    const lookup = lookupFor(lang, a, b);
    const counts = countDays(a, b, lookup);
    return { past: raw < 0, days, parts, counts, holidays: holidaysInRange(lookup, a, b) };
  }, [from, to, includeEnd, lang]);

  const plural = (n: number, word: string) => `${num(n, lang)} ${word}`;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <DateField label={t.from} value={values.from ?? ""} onChange={(v) => set("from", v)} todayLabel={t.today} />
          <button
            type="button"
            className="date-calc-swap"
            aria-label={t.swap}
            title={t.swap}
            onClick={() => {
              const f = values.from;
              set("from", values.to ?? "");
              set("to", f ?? "");
            }}
          >
            ⇄
          </button>
          <DateField label={t.to} value={values.to ?? ""} onChange={(v) => set("to", v)} todayLabel={t.today} />
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={includeEnd} onChange={(event) => setIncludeEnd(event.target.checked)} /> {t.includeEnd}
        </label>
      </div>

      {result && (
        <>
          {result.past && <p className="date-calc-note">{t.past}</p>}
          <div className="date-calc-results">
            <Stat main label={t.total} value={plural(result.days, t.days)} sub={from && to ? `${formatYmd(from, lang, false)} → ${formatYmd(to, lang, false)}` : undefined} />
            <Stat
              label={t.ymd}
              value={[
                result.parts.years ? plural(result.parts.years, t.y) : "",
                result.parts.months ? plural(result.parts.months, t.m) : "",
                plural(result.parts.days, t.d),
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <Stat label={t.weeks} value={`${plural(Math.floor(result.days / 7), t.w)}${result.days % 7 ? ` ${plural(result.days % 7, t.d)}` : ""}`} />
            <Stat label={t.workdays} value={num(result.counts.work, lang)} sub={t.workdaysSub} />
            <Stat label={t.weekends} value={num(result.counts.weekend, lang)} />
            <Stat label={t.holidays} value={num(result.counts.holiday, lang)} />
            <Stat label={t.hours} value={num(result.days * 24, lang)} />
            <Stat label={t.minutes} value={num(result.days * 1440, lang)} />
          </div>
          {result.holidays.length > 0 && (
            <details className="date-calc-holidays">
              <summary>{t.holidayNote(result.holidays.length)}</summary>
              <ul>
                {result.holidays.map((h) => (
                  <li key={`${ymdKey(h.date)}-${h.name}`}>
                    <time dateTime={ymdKey(h.date)}>{formatYmd(h.date, lang)}</time> — {h.name}
                    {h.kind === "half" ? ` (${t.half})` : ""}
                  </li>
                ))}
              </ul>
            </details>
          )}
          {from && from.year < HOLIDAY_FIRST_YEAR[lang] && <p className="date-calc-note">{t.noHolidayData}</p>}
          <p className="date-calc-links">
            <Link href={lang === "tr" ? `/is-gunu-hesaplama?from=${values.from}&to=${values.to}` : `/en/business-day-calculator?from=${values.from}&to=${values.to}`} prefetch={false}>
              {t.workdayLink} →
            </Link>
            <Link href={lang === "tr" ? `/tarihe-gun-ekleme?date=${values.from}` : `/en/date-calculator?date=${values.from}`} prefetch={false}>
              {t.addLink} →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Is gunu                                                              */
/* ------------------------------------------------------------------ */

const BIZ_COPY = {
  tr: {
    modes: { count: "İki tarih arası iş günü", add: "Tarihe iş günü ekle" },
    from: "Başlangıç tarihi",
    to: "Bitiş tarihi",
    date: "Tarih",
    today: "Bugün",
    amount: "İş günü sayısı",
    forward: "İleri",
    backward: "Geri",
    includeStart: "Başlangıç gününü de say",
    holidays: "Resmî tatilleri düş (Türkiye)",
    saturday: "Cumartesi iş günü (6 gün çalışılan işyeri)",
    workdays: "İş günü",
    halfNote: (n: number) => `${n} tanesi arefe/28 Ekim gibi yarım gün`,
    calendar: "Takvim günü",
    weekends: "Hafta sonu",
    holidayCount: "Hafta içi resmî tatil",
    result: "Sonuç tarihi",
    elapsed: (n: number) => `${n} takvim günü sonra`,
    elapsedBack: (n: number) => `${n} takvim günü önce`,
    skipped: "Atlanan resmî tatiller",
    inRange: "Aralıktaki resmî tatiller",
    half: "yarım gün",
    none: "Bu aralıkta resmî tatil yok.",
    noData: "Resmî tatil verisi 2017 ve sonrası için kullanılır; daha eski tarihlerde yalnızca hafta sonları düşülür.",
  },
  en: {
    modes: { count: "Business days between dates", add: "Add business days" },
    from: "Start date",
    to: "End date",
    date: "Date",
    today: "Today",
    amount: "Business days",
    forward: "Forward",
    backward: "Backward",
    includeStart: "Count the start date",
    holidays: "Skip US federal holidays",
    saturday: "Saturday is a working day",
    workdays: "Business days",
    halfNote: (n: number) => `${n} of them half days`,
    calendar: "Calendar days",
    weekends: "Weekend days",
    holidayCount: "Federal holidays on weekdays",
    result: "Result date",
    elapsed: (n: number) => `${n} calendar days later`,
    elapsedBack: (n: number) => `${n} calendar days earlier`,
    skipped: "Holidays skipped",
    inRange: "Federal holidays in range",
    half: "half day",
    none: "No federal holidays in this range.",
    noData: "Federal holiday data is applied from 2021 onwards; earlier dates only skip weekends.",
  },
};

export function BusinessDayCalculator({ lang }: { lang: Lang }) {
  const t = BIZ_COPY[lang];
  const [mode, setMode] = useState<"count" | "add">("count");
  const [values, set] = useInitialDates(["from", "to", "date"], (today) => ({
    from: { year: today.year, month: today.month, day: 1 },
    to: addDaysYmd(addMonthsYmd({ year: today.year, month: today.month, day: 1 }, 1), -1),
    date: today,
  }));
  const [amount, setAmount] = useState(10);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [includeStart, setIncludeStart] = useState(true);
  const [useHolidays, setUseHolidays] = useState(true);
  const [saturdayWork, setSaturdayWork] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const n = Number(params.get("n"));
      if (params.get("date") && n) {
        setMode("add");
        setAmount(Math.min(Math.abs(n), 2000));
        setDirection(n < 0 ? -1 : 1);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const noHolidays = () => undefined;
  const from = parseYmd(values.from ?? "");
  const to = parseYmd(values.to ?? "");
  const date = parseYmd(values.date ?? "");
  const week = { saturdayWork };

  const count = useMemo(() => {
    if (mode !== "count" || !from || !to) return null;
    const [a, b] = diffDays(from, to) >= 0 ? [from, to] : [to, from];
    const start = includeStart ? a : addDaysYmd(a, 1);
    if (diffDays(start, b) < 0) return { counts: { total: 0, work: 0, half: 0, weekend: 0, holiday: 0 }, holidays: [] as Holiday[], old: false };
    const lookup = useHolidays ? lookupFor(lang, a, b) : noHolidays;
    return { counts: countDays(start, b, lookup, week), holidays: useHolidays ? holidaysInRange(lookup, start, b) : [], old: a.year < HOLIDAY_FIRST_YEAR[lang] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, values.from, values.to, includeStart, useHolidays, saturdayWork, lang]);

  const added = useMemo(() => {
    if (mode !== "add" || !date || !amount) return null;
    const n = Math.min(Math.max(1, Math.round(amount)), 2000) * direction;
    const approxEnd = addDaysYmd(date, Math.ceil(n * 1.6) + 20 * direction);
    const lookup = useHolidays ? lookupFor(lang, date, approxEnd) : noHolidays;
    const res = addBusinessDays(date, n, lookup, week);
    return { ...res, calendarDays: Math.abs(diffDays(date, res.date)), old: date.year < HOLIDAY_FIRST_YEAR[lang] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, values.date, amount, direction, useHolidays, saturdayWork, lang]);

  const holidayList = (list: Holiday[]) =>
    list.map((h) => (
      <li key={`${ymdKey(h.date)}-${h.name}`}>
        <time dateTime={ymdKey(h.date)}>{formatYmd(h.date, lang)}</time> — {h.name}
        {h.kind === "half" ? ` (${t.half})` : ""}
      </li>
    ));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {(["count", "add"] as const).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? "is-active" : undefined} onClick={() => setMode(m)}>
              {t.modes[m]}
            </button>
          ))}
        </div>
        {mode === "count" ? (
          <div className="date-calc-fields">
            <DateField label={t.from} value={values.from ?? ""} onChange={(v) => set("from", v)} todayLabel={t.today} />
            <DateField label={t.to} value={values.to ?? ""} onChange={(v) => set("to", v)} todayLabel={t.today} />
          </div>
        ) : (
          <div className="date-calc-fields">
            <DateField label={t.date} value={values.date ?? ""} onChange={(v) => set("date", v)} todayLabel={t.today} />
            <label className="date-calc-field">
              <span>{t.amount}</span>
              <span className="date-calc-field-row">
                <input type="number" min={1} max={2000} value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
                <select value={direction} onChange={(event) => setDirection(Number(event.target.value) as 1 | -1)} aria-label={t.forward}>
                  <option value={1}>{t.forward}</option>
                  <option value={-1}>{t.backward}</option>
                </select>
              </span>
            </label>
          </div>
        )}
        <div className="date-calc-checks">
          {mode === "count" && (
            <label className="date-calc-check">
              <input type="checkbox" checked={includeStart} onChange={(event) => setIncludeStart(event.target.checked)} /> {t.includeStart}
            </label>
          )}
          <label className="date-calc-check">
            <input type="checkbox" checked={useHolidays} onChange={(event) => setUseHolidays(event.target.checked)} /> {t.holidays}
          </label>
          <label className="date-calc-check">
            <input type="checkbox" checked={saturdayWork} onChange={(event) => setSaturdayWork(event.target.checked)} /> {t.saturday}
          </label>
        </div>
      </div>

      {count && (
        <>
          <div className="date-calc-results">
            <Stat main label={t.workdays} value={num(count.counts.work, lang)} sub={count.counts.half ? t.halfNote(count.counts.half) : undefined} />
            <Stat label={t.calendar} value={num(count.counts.total, lang)} />
            <Stat label={t.weekends} value={num(count.counts.weekend, lang)} />
            <Stat label={t.holidayCount} value={num(count.counts.holiday, lang)} />
          </div>
          {useHolidays && (
            <details className="date-calc-holidays" open={count.holidays.length > 0 && count.holidays.length <= 8}>
              <summary>
                {t.inRange} ({count.holidays.length})
              </summary>
              {count.holidays.length ? <ul>{holidayList(count.holidays)}</ul> : <p>{t.none}</p>}
            </details>
          )}
          {count.old && useHolidays && <p className="date-calc-note">{t.noData}</p>}
        </>
      )}

      {added && (
        <>
          <div className="date-calc-results">
            <Stat
              main
              label={t.result}
              value={formatYmd(added.date, lang)}
              sub={direction > 0 ? t.elapsed(added.calendarDays) : t.elapsedBack(added.calendarDays)}
            />
          </div>
          {added.skippedHolidays.length > 0 && (
            <details className="date-calc-holidays" open={added.skippedHolidays.length <= 8}>
              <summary>
                {t.skipped} ({added.skippedHolidays.length})
              </summary>
              <ul>
                {added.skippedHolidays.map((d) => (
                  <li key={ymdKey(d)}>
                    <time dateTime={ymdKey(d)}>{formatYmd(d, lang)}</time>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {added.old && useHolidays && <p className="date-calc-note">{t.noData}</p>}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tarihe gun ekle / cikar                                             */
/* ------------------------------------------------------------------ */

const ADD_COPY = {
  tr: {
    date: "Başlangıç tarihi",
    today: "Bugün",
    add: "Ekle",
    subtract: "Çıkar",
    years: "Yıl",
    months: "Ay",
    weeks: "Hafta",
    days: "Gün",
    quick: "Hızlı seçim",
    result: "Sonuç",
    info: (d: number, w: number, doy: number) => `${d} gün fark · ${w}. hafta · yılın ${doy}. günü`,
    clamp: "Ay sonu kuralı: 31 Ocak + 1 ay = 28 (artık yılda 29) Şubat. Başlangıç günü hedef ayda yoksa ayın son günü alınır.",
    reset: "Sıfırla",
    diffLink: "İki tarih arası gün hesapla",
    bizLink: "İş günü ekle (tatiller hariç)",
  },
  en: {
    date: "Start date",
    today: "Today",
    add: "Add",
    subtract: "Subtract",
    years: "Years",
    months: "Months",
    weeks: "Weeks",
    days: "Days",
    quick: "Quick picks",
    result: "Result",
    info: (d: number, w: number, doy: number) => `${d} days apart · week ${w} · day ${doy} of the year`,
    clamp: "Month-end rule: January 31 + 1 month = February 28 (29 in a leap year). If the start day does not exist in the target month, the last day of that month is used.",
    reset: "Reset",
    diffLink: "Count days between two dates",
    bizLink: "Add business days (skip holidays)",
  },
};

const QUICK = [
  { days: 7 },
  { days: 10 },
  { days: 15 },
  { days: 30 },
  { days: 45 },
  { days: 60 },
  { days: 90 },
  { days: 100 },
  { days: 120 },
  { days: 180 },
  { years: 1 },
];

export function DateAddCalculator({ lang }: { lang: Lang }) {
  const t = ADD_COPY[lang];
  const [values, set] = useInitialDates(["date"], (today) => ({ date: today }));
  const [sign, setSign] = useState<1 | -1>(1);
  const [amounts, setAmounts] = useState({ years: 0, months: 0, weeks: 0, days: 30 });
  const date = parseYmd(values.date ?? "");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const n = Number(params.get("days"));
      if (Number.isFinite(n) && n) {
        setSign(n < 0 ? -1 : 1);
        setAmounts({ years: 0, months: 0, weeks: 0, days: Math.min(Math.abs(Math.round(n)), 100000) });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const result = useMemo(() => {
    if (!date) return null;
    const clampN = (n: number) => (Number.isFinite(n) ? Math.min(Math.max(0, Math.round(n)), 100000) : 0);
    const monthsTotal = (clampN(amounts.years) * 12 + clampN(amounts.months)) * sign;
    const afterMonths = addMonthsYmd(date, monthsTotal);
    const end = addDaysYmd(afterMonths, (clampN(amounts.weeks) * 7 + clampN(amounts.days)) * sign);
    if (end.year < 1 || end.year > 9999) return null;
    return { end, diff: Math.abs(diffDays(date, end)), clamped: afterMonths.day !== date.day };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.date, amounts, sign]);

  const field = (key: keyof typeof amounts, label: string) => (
    <label className="date-calc-field is-small">
      <span>{label}</span>
      <input type="number" min={0} max={100000} value={amounts[key]} onChange={(event) => setAmounts((c) => ({ ...c, [key]: Number(event.target.value) }))} />
    </label>
  );

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <DateField label={t.date} value={values.date ?? ""} onChange={(v) => set("date", v)} todayLabel={t.today} />
        </div>
        <div className="date-converter-modes" role="radiogroup">
          {([1, -1] as const).map((s) => (
            <button key={s} type="button" role="radio" aria-checked={sign === s} className={sign === s ? "is-active" : undefined} onClick={() => setSign(s)}>
              {s > 0 ? `+ ${t.add}` : `− ${t.subtract}`}
            </button>
          ))}
        </div>
        <div className="date-calc-fields is-amounts">
          {field("years", t.years)}
          {field("months", t.months)}
          {field("weeks", t.weeks)}
          {field("days", t.days)}
        </div>
        <div className="date-calc-chips" aria-label={t.quick}>
          {QUICK.map((q) => {
            const label = q.years ? `${sign > 0 ? "+" : "−"}1 ${t.years.toLowerCase()}` : `${sign > 0 ? "+" : "−"}${q.days} ${t.days.toLowerCase()}`;
            return (
              <button key={label} type="button" onClick={() => setAmounts({ years: q.years ?? 0, months: 0, weeks: 0, days: q.days ?? 0 })}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {result && date && (
        <>
          <div className="date-calc-results">
            <Stat main label={t.result} value={formatYmd(result.end, lang)} sub={t.info(result.diff, isoWeek(result.end).week, dayOfYear(result.end))} />
          </div>
          {result.clamped && <p className="date-calc-note">{t.clamp}</p>}
          <p className="date-calc-links">
            <Link href={lang === "tr" ? `/iki-tarih-arasi-gun-hesaplama?from=${values.date}&to=${ymdKey(result.end)}` : `/en/days-between-dates?from=${values.date}&to=${ymdKey(result.end)}`} prefetch={false}>
              {t.diffLink} →
            </Link>
            <Link href={lang === "tr" ? `/is-gunu-hesaplama?date=${values.date}&n=${amounts.days * sign || 10}` : `/en/business-day-calculator?date=${values.date}&n=${amounts.days * sign || 10}`} prefetch={false}>
              {t.bizLink} →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hafta numarasi                                                       */
/* ------------------------------------------------------------------ */

const WEEK_COPY = {
  tr: {
    todayTitle: "Bugün",
    week: (w: number, y: number) => `${y} yılının ${w}. haftası`,
    range: "Hafta aralığı",
    dayOfYear: "Yılın kaçıncı günü",
    remaining: "Yıl sonuna kalan",
    check: "Başka bir tarihin haftasını bul",
    date: "Tarih",
    today: "Bugün",
    days: "gün",
    of: (n: number) => `${n} günün`,
    weeksInYear: (y: number, n: number) => `${y} yılı ${n} haftadır (ISO 8601).`,
    us: "ABD usulü hafta (pazar başlangıçlı)",
  },
  en: {
    todayTitle: "Today",
    week: (w: number, y: number) => `Week ${w} of ${y}`,
    range: "Week range",
    dayOfYear: "Day of the year",
    remaining: "Days left this year",
    check: "Find the week number of any date",
    date: "Date",
    today: "Today",
    days: "days",
    of: (n: number) => `of ${n}`,
    weeksInYear: (y: number, n: number) => `${y} has ${n} ISO weeks.`,
    us: "US week number (weeks start on Sunday)",
  },
};

function WeekCard({ date, lang, main }: { date: YMD; lang: Lang; main?: boolean }) {
  const t = WEEK_COPY[lang];
  const { year, week } = isoWeek(date);
  const start = isoWeekStart(year, week);
  const end = addDaysYmd(start, 6);
  const yearDays = isLeapYear(date.year) ? 366 : 365;
  const doy = dayOfYear(date);
  const fmt = (d: YMD) =>
    new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "short", weekday: "short", timeZone: "UTC" }).format(new Date(ymdToMs(d)));
  return (
    <div className="date-calc-results">
      <Stat main={main} label={formatYmd(date, lang)} value={t.week(week, year)} sub={lang === "en" ? `${t.us}: ${usWeek(date)}` : undefined} />
      <Stat label={t.range} value={`${fmt(start)} – ${fmt(end)}`} />
      <Stat label={t.dayOfYear} value={`${doy}`} sub={t.of(yearDays)} />
      <Stat label={t.remaining} value={`${yearDays - doy} ${t.days}`} />
    </div>
  );
}

export function WeekNumberTool({ lang }: { lang: Lang }) {
  const t = WEEK_COPY[lang];
  const [values, set] = useInitialDates(["date"], (today) => ({ date: today }));
  const [today, setToday] = useState<YMD | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setToday(todayYmd()));
    return () => cancelAnimationFrame(frame);
  }, []);
  const date = parseYmd(values.date ?? "");
  return (
    <div className="date-calc">
      {today && (
        <div className="week-now">
          <span>{t.todayTitle}</span>
          <strong>{isoWeek(today).week}</strong>
          <em>{t.week(isoWeek(today).week, isoWeek(today).year)}</em>
          <small>
            {formatYmd(isoWeekStart(isoWeek(today).year, isoWeek(today).week), lang, false)} –{" "}
            {formatYmd(addDaysYmd(isoWeekStart(isoWeek(today).year, isoWeek(today).week), 6), lang, false)}
          </small>
        </div>
      )}
      <div className="date-calc-input">
        <strong className="date-calc-input-title">{t.check}</strong>
        <div className="date-calc-fields">
          <DateField label={t.date} value={values.date ?? ""} onChange={(v) => set("date", v)} todayLabel={t.today} />
        </div>
      </div>
      {date && <WeekCard date={date} lang={lang} main />}
    </div>
  );
}
