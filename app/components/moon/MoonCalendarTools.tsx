"use client";

import { useEffect, useState } from "react";
import { moonPhasesBetween, moonState, phaseName, type PhaseKind, type PhaseName } from "../../converter/time/moon";
import MoonIcon from "./MoonIcon";

// Ay sayfasinin tarihe bagli bolumleri: son 7 / sonraki 7 gun seridi, tarih secici,
// aylik takvim ve evre tablolari. Ilk HTML derleme anina gore uretilir; tarayicida
// ziyaretcinin saatiyle yeniden hesaplanir, boylece sayfa hic eskimez.

const DAY = 86400000;
const KIND_FRACTION: Record<PhaseKind, number> = { new: 0, first: 0.25, full: 0.5, last: 0.75 };
// Seritte ve tarih secicide her gun icin bakilan yerel saat (aksam gokyuzu).
const VIEW_HOUR = 21;

type Lang = "tr" | "en";

const T = {
  tr: {
    stripTitle: "Son 7 gün ve önümüzdeki 7 gün ay nasıl?",
    stripNote: "Her gün için Türkiye saatiyle 21:00'deki görünüm. Ana evrenin gerçekleştiği gün çerçeveli gösterilir.",
    yesterday: "Dün",
    today: "Bugün",
    tomorrow: "Yarın",
    pickerTitle: "Herhangi bir günde ay nasıldı?",
    pickerLabel: "Tarih seçin",
    pickerResult: (date: string, name: string, illum: string, age: string) =>
      `${date} akşamı (21:00, Türkiye saati) Ay ${name} evresindeydi: yüzeyinin %${illum} kadarı aydınlıktı, ay yaşı ${age} gündü.`,
    prevFull: "Önceki dolunay",
    nextFull: "Sonraki dolunay",
    prevNew: "Önceki yeni ay",
    nextNew: "Sonraki yeni ay",
    calendarTitle: (m: string) => `${m} ay takvimi`,
    prevMonth: "‹ Önceki ay",
    nextMonth: "Sonraki ay ›",
    weekdays: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    fullsTitle: "Önümüzdeki dolunaylar",
    fullsDate: "Tarih ve saat (TSİ)",
    fullsLeft: "Kalan süre",
    daysLeft: (d: number) => (d === 0 ? "bugün" : `${d} gün`),
    allTitle: "Tüm ay evreleri (önümüzdeki 3 ay)",
    phase: "Evre",
    dateTime: "Tarih ve saat",
    illumLabel: "Aydınlanma",
  },
  en: {
    stripTitle: "The Moon over the last 7 and next 7 days",
    stripNote: "Each day shows the Moon at 21:00 UTC. Days with a principal phase are outlined.",
    yesterday: "Yesterday",
    today: "Today",
    tomorrow: "Tomorrow",
    pickerTitle: "What did the Moon look like on any date?",
    pickerLabel: "Choose a date",
    pickerResult: (date: string, name: string, illum: string, age: string) =>
      `On the evening of ${date} (21:00 UTC) the Moon was a ${name}: ${illum}% of its disc was lit and it was ${age} days old.`,
    prevFull: "Previous full moon",
    nextFull: "Next full moon",
    prevNew: "Previous new moon",
    nextNew: "Next new moon",
    calendarTitle: (m: string) => `${m} moon calendar`,
    prevMonth: "‹ Previous month",
    nextMonth: "Next month ›",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    fullsTitle: "Upcoming full moons",
    fullsDate: "Date and time (UTC)",
    fullsLeft: "Time left",
    daysLeft: (d: number) => (d === 0 ? "today" : `${d} days`),
    allTitle: "All moon phases (next 3 months)",
    phase: "Phase",
    dateTime: "Date and time",
    illumLabel: "Illumination",
  },
} as const;

const FULL_MOON_NAMES_EN = ["Wolf Moon", "Snow Moon", "Worm Moon", "Pink Moon", "Flower Moon", "Strawberry Moon", "Buck Moon", "Sturgeon Moon", "Harvest Moon", "Hunter's Moon", "Beaver Moon", "Cold Moon"];

type Ymd = { y: number; m: number; d: number };

const pad = (n: number) => String(n).padStart(2, "0");
const ymdKey = ({ y, m, d }: Ymd) => `${y}-${pad(m)}-${pad(d)}`;

export default function MoonCalendarTools({
  lang,
  initialNow,
  names,
  kindNames,
}: {
  lang: Lang;
  initialNow: number;
  names: Record<PhaseName, string>;
  kindNames: Record<PhaseKind, string>;
}) {
  const t = T[lang];
  const tr = lang === "tr";
  const timeZone = tr ? "Europe/Istanbul" : "UTC";
  const locale = tr ? "tr-TR" : "en-US";
  const offsetHours = tr ? 3 : 0;

  const [nowMs, setNowMs] = useState(initialNow);
  const [picked, setPicked] = useState<string | null>(null);
  const [monthShift, setMonthShift] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setNowMs(Date.now());
      const q = new URLSearchParams(window.location.search).get("tarih") ?? new URLSearchParams(window.location.search).get("date");
      if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) setPicked(q);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const now = new Date(nowMs);
  const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone, ...opts }).format(date);
  const dateTime = (date: Date) => fmt(date, { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const localYmd = (date: Date): Ymd => {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
    const get = (type: string) => Number(p.find((x) => x.type === type)!.value);
    return { y: get("year"), m: get("month"), d: get("day") };
  };
  const atLocal = ({ y, m, d }: Ymd, hour: number) => new Date(Date.UTC(y, m - 1, d, hour - offsetHours));
  const pct = (v: number) => (v * 100).toLocaleString(locale, { maximumFractionDigits: 0 });

  const today = localYmd(now);
  const todayStart = atLocal(today, 0).getTime();
  const span = moonPhasesBetween(new Date(todayStart - 40 * DAY), new Date(todayStart + 400 * DAY));
  const mainOn = (ymd: Ymd) => span.find((e) => ymdKey(localYmd(e.date)) === ymdKey(ymd));

  // 1) Serit
  const strip = Array.from({ length: 15 }, (_, i) => {
    const ymd = localYmd(new Date(todayStart + (i - 7) * DAY + 12 * 3600000));
    const s = moonState(atLocal(ymd, VIEW_HOUR));
    const main = mainOn(ymd);
    const rel = i - 7;
    const label = rel === -1 ? t.yesterday : rel === 0 ? t.today : rel === 1 ? t.tomorrow : fmt(atLocal(ymd, 12), { weekday: "long" });
    return { ymd, rel, label, s, main };
  });

  // 2) Tarih secici
  const pickedKey = picked ?? ymdKey(today);
  const [py, pm, pd] = pickedKey.split("-").map(Number);
  const pickedYmd = { y: py, m: pm, d: pd };
  const pickedDate = atLocal(pickedYmd, VIEW_HOUR);
  const pickedValid = !Number.isNaN(pickedDate.getTime()) && py >= 1900 && py <= 2100;
  const pickedState = pickedValid ? moonState(pickedDate) : null;
  const around = pickedValid ? moonPhasesBetween(new Date(pickedDate.getTime() - 32 * DAY), new Date(pickedDate.getTime() + 32 * DAY)) : [];
  const before = (kind: PhaseKind) => [...around].reverse().find((e) => e.kind === kind && e.date <= pickedDate);
  const after = (kind: PhaseKind) => around.find((e) => e.kind === kind && e.date > pickedDate);
  const onPick = (value: string) => {
    setPicked(value || null);
    try {
      const url = new URL(window.location.href);
      if (value) url.searchParams.set("tarih", value);
      else url.searchParams.delete("tarih");
      window.history.replaceState(null, "", url);
    } catch {
      // adres guncellenemezse secim yine de calisir
    }
  };

  // 3) Aylik takvim
  const base = new Date(Date.UTC(today.y, today.m - 1 + monthShift, 1));
  const year = base.getUTCFullYear();
  const month = base.getUTCMonth() + 1;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstWeekday = (base.getUTCDay() + 6) % 7;
  const monthEvents = moonPhasesBetween(new Date(Date.UTC(year, month - 1, 1) - 2 * DAY), new Date(Date.UTC(year, month, 1) + 2 * DAY));
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const ymd = { y: year, m: month, d: i + 1 };
    const main = monthEvents.find((e) => ymdKey(localYmd(e.date)) === ymdKey(ymd));
    return { ymd, fraction: moonState(atLocal(ymd, 12)).fraction, main };
  });
  const monthTitle = fmt(new Date(Date.UTC(year, month - 1, 15)), { month: "long", year: "numeric" });

  // 4-5) Tablolar
  const fulls = span.filter((e) => e.kind === "full" && e.date > now).slice(0, 12);
  const next3 = span.filter((e) => e.date > now && e.date.getTime() < nowMs + 92 * DAY);

  return (
    <>
      <h2 id="hafta">{t.stripTitle}</h2>
      <p className="moon-strip-note">{t.stripNote}</p>
      <ol className="moon-strip">
        {strip.map(({ ymd, rel, label, s, main }) => (
          <li key={ymdKey(ymd)} className={`moon-strip-day${rel === 0 ? " is-today" : ""}${main ? " is-main" : ""}`}>
            <b>{label}</b>
            <span className="moon-strip-date">{fmt(atLocal(ymd, 12), { day: "numeric", month: "short" })}</span>
            <MoonIcon fraction={main ? KIND_FRACTION[main.kind] : s.fraction} size={44} />
            <span className="moon-strip-name">{main ? kindNames[main.kind] : names[phaseName(s.age)]}</span>
            <small>%{pct(s.illumination)}</small>
          </li>
        ))}
      </ol>

      <h2 id="tarih">{t.pickerTitle}</h2>
      <div className="date-calc">
        <div className="date-calc-input">
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>{t.pickerLabel}</span>
              <input type="date" value={pickedKey} min="1900-01-01" max="2100-12-31" onChange={(e) => onPick(e.target.value)} />
            </label>
          </div>
        </div>
        {pickedState && (
          <div className="moon-pick-result">
            <MoonIcon fraction={pickedState.fraction} size={96} label={names[phaseName(pickedState.age)]} />
            <div>
              <p>
                {t.pickerResult(
                  fmt(atLocal(pickedYmd, 12), { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                  names[phaseName(pickedState.age)].toLocaleLowerCase(locale),
                  pct(pickedState.illumination),
                  pickedState.age.toLocaleString(locale, { maximumFractionDigits: 1 }),
                )}
              </p>
              <ul>
                {([
                  [t.prevFull, before("full")],
                  [t.nextFull, after("full")],
                  [t.prevNew, before("new")],
                  [t.nextNew, after("new")],
                ] as const).map(([label, e]) =>
                  e ? (
                    <li key={label}>
                      <strong>{label}:</strong> {dateTime(e.date)}
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <h2 id="takvim">{t.calendarTitle(monthTitle)}</h2>
      <div className="moon-calendar-nav">
        <button type="button" onClick={() => setMonthShift((v) => v - 1)}>
          {t.prevMonth}
        </button>
        <button type="button" onClick={() => setMonthShift((v) => v + 1)}>
          {t.nextMonth}
        </button>
      </div>
      <div className="moon-calendar">
        {t.weekdays.map((w) => (
          <span key={w} className="moon-calendar-head">
            {w}
          </span>
        ))}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {days.map((d) => (
          <span key={d.ymd.d} className={`moon-calendar-day${d.main ? " is-main" : ""}`}>
            <b>{d.ymd.d}</b>
            <MoonIcon fraction={d.main ? KIND_FRACTION[d.main.kind] : d.fraction} size={30} />
            {d.main && <small>{kindNames[d.main.kind]}</small>}
          </span>
        ))}
      </div>

      <h2 id="dolunaylar">{t.fullsTitle}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{t.fullsDate}</th>
              {!tr && <th>Name</th>}
              <th>{t.fullsLeft}</th>
            </tr>
          </thead>
          <tbody>
            {fulls.map((e) => (
              <tr key={e.date.toISOString()}>
                <td>{dateTime(e.date)}</td>
                {!tr && <td>{FULL_MOON_NAMES_EN[Number(fmt(e.date, { month: "numeric" })) - 1]}</td>}
                <td>{t.daysLeft(Math.round((atLocal(localYmd(e.date), 0).getTime() - todayStart) / DAY))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="evreler">{t.allTitle}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{t.phase}</th>
              <th>{t.dateTime}</th>
            </tr>
          </thead>
          <tbody>
            {next3.map((e) => (
              <tr key={e.date.toISOString()}>
                <td>
                  <span className="moon-phase-cell">
                    <MoonIcon fraction={KIND_FRACTION[e.kind]} size={22} /> {kindNames[e.kind]}
                  </span>
                </td>
                <td>{dateTime(e.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
