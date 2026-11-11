"use client";

import { useEffect, useState } from "react";
import { cycleOn, cycles, CYCLE_MAX, CYCLE_MIN, dueDate, LUTEAL_MAX, LUTEAL_MIN, PERIOD_MAX, PERIOD_MIN, type CycleDay } from "../converter/cycleCalc";
import type { YMD } from "../converter/time/calendars";
import { addDaysYmd, diffDays, parseYmd, ymdKey } from "../converter/time/dateMath";

export type CycleLang = "tr" | "en" | "de";

type Dict = {
  lmp: string;
  cycle: string;
  period: string;
  luteal: string;
  dpo: (n: string) => string;
  implant: string;
  implantNote: string;
  today: string;
  cycleDay: (n: string) => string;
  kind: Record<CycleDay, string>;
  nextPeriod: string;
  inDays: (n: string) => string;
  ovulation: string;
  fertile: string;
  test: string;
  testNote: string;
  due: string;
  dueNote: string;
  upcoming: string;
  colPeriod: string;
  colFertile: string;
  colOvulation: string;
  prev: string;
  next: string;
  invalid: string;
  note: string;
  months: string[];
  week: string[];
};

const BN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const UZ_MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

const T: Record<CycleLang, Dict> = {
  tr: {
    lmp: "Son adetin ilk günü",
    cycle: "Döngü uzunluğu (gün)",
    period: "Adet süresi (gün)",
    luteal: "Luteal faz (gün; bilmiyorsanız 14)",
    dpo: (n) => `yumurtlamadan sonra ${n}. gün (DPO ${n})`,
    implant: "Tutunma (implantasyon) aralığı",
    implantNote: "yumurtlamadan 6–12 gün sonra; hafif lekelenme bu günlerde görülebilir",
    today: "Bugün",
    cycleDay: (n) => `döngünün ${n}. günü`,
    kind: { period: "Adet dönemi", fertile: "Doğurgan dönem", ovulation: "Tahmini yumurtlama günü", none: "Doğurganlığın düşük olduğu dönem" },
    nextPeriod: "Sonraki adet",
    inDays: (n) => `${n} gün sonra`,
    ovulation: "Yumurtlama günü",
    fertile: "Doğurgan dönem (en yüksek şans)",
    test: "Gebelik testi",
    testNote: "adet gecikirse bu günden itibaren yapılabilir",
    due: "Gebelik olursa tahmini doğum",
    dueNote: "son adet + 280 gün, döngüye göre düzeltilmiş",
    upcoming: "Sonraki döngüler",
    colPeriod: "Adet",
    colFertile: "Doğurgan dönem",
    colOvulation: "Yumurtlama",
    prev: "Önceki ay",
    next: "Sonraki ay",
    invalid: `Döngü ${CYCLE_MIN}–${CYCLE_MAX}, adet süresi ${PERIOD_MIN}–${PERIOD_MAX} gün olmalı.`,
    note: "Takvim yöntemi düzenli döngüler için tahmin verir; doğum kontrol yöntemi değildir. Düzensiz döngüde ya da gecikmede doktora danışın.",
    months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    week: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
  },
  en: {
    lmp: "First day of your last period",
    cycle: "Cycle length (days)",
    period: "Period length (days)",
    luteal: "Luteal phase (days; 14 if unsure)",
    dpo: (n) => `${n} days past ovulation (${n} DPO)`,
    implant: "Implantation window",
    implantNote: "6–12 days past ovulation; light implantation spotting can appear then",
    today: "Today",
    cycleDay: (n) => `cycle day ${n}`,
    kind: { period: "Period", fertile: "Fertile window", ovulation: "Estimated ovulation day", none: "Low-fertility days" },
    nextPeriod: "Next period",
    inDays: (n) => `in ${n} days`,
    ovulation: "Ovulation day",
    fertile: "Fertile window (best chance)",
    test: "Pregnancy test",
    testNote: "test from this day if your period is late",
    due: "Due date if you conceive",
    dueNote: "last period + 280 days, adjusted for cycle length",
    upcoming: "Upcoming cycles",
    colPeriod: "Period",
    colFertile: "Fertile window",
    colOvulation: "Ovulation",
    prev: "Previous month",
    next: "Next month",
    invalid: `Cycle length must be ${CYCLE_MIN}–${CYCLE_MAX} days and period length ${PERIOD_MIN}–${PERIOD_MAX} days.`,
    note: "The calendar method estimates for regular cycles; it is not birth control. If your cycle is irregular or your period is late, talk to a doctor.",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  de: {
    lmp: "Erster Tag der letzten Periode",
    cycle: "Zykluslänge (Tage)",
    period: "Periodendauer (Tage)",
    luteal: "Lutealphase (Tage; 14 wenn unbekannt)",
    dpo: (n) => `ES+${n} (${n} Tage nach dem Eisprung)`,
    implant: "Einnistung (Zeitfenster)",
    implantNote: "6–12 Tage nach dem Eisprung; eine leichte Einnistungsblutung ist dann möglich",
    today: "Heute",
    cycleDay: (n) => `Zyklustag ${n}`,
    kind: { period: "Periode", fertile: "Fruchtbare Tage", ovulation: "Voraussichtlicher Eisprung", none: "Tage mit geringer Fruchtbarkeit" },
    nextPeriod: "Nächste Periode",
    inDays: (n) => `in ${n} Tagen`,
    ovulation: "Eisprung",
    fertile: "Fruchtbare Tage (höchste Chance)",
    test: "Schwangerschaftstest",
    testNote: "ab diesem Tag, wenn die Periode ausbleibt",
    due: "Geburtstermin bei Schwangerschaft",
    dueNote: "letzte Periode + 280 Tage, an die Zykluslänge angepasst",
    upcoming: "Nächste Zyklen",
    colPeriod: "Periode",
    colFertile: "Fruchtbare Tage",
    colOvulation: "Eisprung",
    prev: "Vorheriger Monat",
    next: "Nächster Monat",
    invalid: `Zykluslänge ${CYCLE_MIN}–${CYCLE_MAX} Tage, Periodendauer ${PERIOD_MIN}–${PERIOD_MAX} Tage.`,
    note: "Die Kalendermethode schätzt bei regelmäßigem Zyklus; sie ist keine Verhütungsmethode. Bei unregelmäßigem Zyklus oder ausbleibender Periode ärztlichen Rat einholen.",
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    week: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  },
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const num = (n: number, lang: CycleLang) => (String(n));

/** Tarih metni: Intl yerine sabit ay adları (Node ile tarayıcı aynı metni üretsin). */
function dateText(d: YMD, lang: CycleLang) {
  const m = T[lang].months[d.month - 1];
  const day = num(d.day, lang);
  switch (lang) {
    case "en":
      return `${m} ${d.day}, ${d.year}`;
    case "de":
      return `${d.day}. ${m} ${d.year}`;
    default:
      return `${d.day} ${m} ${d.year}`;
  }
}
const shortText = (d: YMD, lang: CycleLang) => {
  const m = T[lang].months[d.month - 1];
  if (lang === "en") return `${m.slice(0, 3)} ${d.day}`;
  if (lang === "de") return `${d.day}. ${m.slice(0, 3)}.`;
  return `${num(d.day, lang)} ${m.slice(0, 3)}`;
};
const range = (a: YMD, b: YMD, lang: CycleLang) => `${shortText(a, lang)} – ${shortText(b, lang)}`;

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Sabit tarihle ön işlenir, tarayıcıda bugünün tarihine geçer (kullanıcı değiştirmediyse). */
function useDate(initial: string, shift = 0) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setValue(ymdKey(addDaysYmd(parseYmd(todayIso())!, shift)));
    });
    return () => cancelAnimationFrame(frame);
  }, [touched, shift]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

const toInt = (raw: string) => {
  const latin = raw.replace(/[০-৯]/g, (c) => String(BN_DIGITS.indexOf(c))).trim();
  return /^\d+$/.test(latin) ? Number(latin) : Number.NaN;
};

export default function CycleCalculator({ lang, initialDate }: { lang: CycleLang; initialDate: string }) {
  const t = T[lang];
  const [lmpRaw, setLmp] = useDate(initialDate, -10);
  const [todayRaw] = useDate(initialDate);
  const [cycleRaw, setCycle] = useState("28");
  const [periodRaw, setPeriod] = useState("5");
  const [lutealRaw, setLuteal] = useState("14");
  const [offset, setOffset] = useState(0);
  const lmp = parseYmd(lmpRaw);
  const today = parseYmd(todayRaw);
  const cycle = toInt(cycleRaw);
  const period = toInt(periodRaw);
  const luteal = toInt(lutealRaw);
  const list = lmp ? cycles(lmp, cycle, period, 6, luteal) : null;
  const now = lmp && today ? cycleOn(lmp, cycle, period, today, luteal) : null;
  // Gösterilecek döngü: bugünü içeren ya da (son adet gelecekteyse) ilki
  const current = now?.cycle ?? list?.[0] ?? null;
  const upcoming = list && today ? list.filter((c) => diffDays(today, c.start) > 0).slice(0, 3) : [];

  // Takvim ayı
  const base = today ?? current?.start ?? { year: 2026, month: 1, day: 1 };
  const mIndex = base.year * 12 + (base.month - 1) + offset;
  const gy = Math.floor(mIndex / 12);
  const gm = (mIndex % 12) + 1;
  const lead = (new Date(Date.UTC(gy, gm - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(gy, gm, 0)).getUTCDate();

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.lmp}</span>
            <input
              type="date"
              value={lmpRaw}
              onChange={(e) => {
                setLmp(e.target.value);
                setOffset(0);
              }}
            />
          </label>
          <label className="date-calc-field">
            <span>{t.cycle}</span>
            <input inputMode="numeric" value={cycleRaw} onChange={(e) => setCycle(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>{t.period}</span>
            <input inputMode="numeric" value={periodRaw} onChange={(e) => setPeriod(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>{t.luteal}</span>
            <input inputMode="numeric" value={lutealRaw} onChange={(e) => setLuteal(e.target.value)} />
          </label>
        </div>
      </div>

      {list && lmp && current ? (
        <>
          <div className="date-calc-results">
            {now && today ? (
              <div className="date-calc-stat is-main">
                <span>
                  {t.today}: {dateText(today, lang)}
                </span>
                <strong>{t.kind[now.kind]}</strong>
                <em>
                  {t.cycleDay(num(now.cycleDay, lang))}
                  {now.dpo ? ` · ${t.dpo(num(now.dpo, lang))}` : ""} · {t.nextPeriod}: {t.inDays(num(now.daysToNext, lang))}
                </em>
              </div>
            ) : null}
            <div className="date-calc-stat">
              <span>{t.ovulation}</span>
              <strong>{dateText(current.ovulation, lang)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>{t.fertile}</span>
              <strong>{range(current.fertileStart, current.fertileEnd, lang)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>{t.implant}</span>
              <strong>{range(current.implantStart, current.implantEnd, lang)}</strong>
              <em>{t.implantNote}</em>
            </div>
            <div className="date-calc-stat">
              <span>{t.nextPeriod}</span>
              <strong>{dateText(current.next, lang)}</strong>
              <em>
                {t.test}: {t.testNote}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>{t.due}</span>
              <strong>{dateText(dueDate(current.start, cycle), lang)}</strong>
              <em>{t.dueNote}</em>
            </div>
          </div>

          <div className="fast-cal cyc-cal">
            <div className="fast-cal-head">
              <button type="button" className="kaza-takip-btn" onClick={() => setOffset((o) => o - 1)} aria-label={t.prev}>
                ←
              </button>
              <strong>
                {t.months[gm - 1]} {num(gy, lang)}
              </strong>
              <button type="button" className="kaza-takip-btn" onClick={() => setOffset((o) => o + 1)} aria-label={t.next}>
                →
              </button>
            </div>
            <div className="fast-cal-grid" role="grid" aria-label={`${t.months[gm - 1]} ${gy}`}>
              {t.week.map((w) => (
                <span key={w} className="fast-cal-wd">
                  {w}
                </span>
              ))}
              {Array.from({ length: lead }, (_, i) => (
                <span key={`e${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = { year: gy, month: gm, day: i + 1 };
                const st = cycleOn(lmp, cycle, period, day, luteal);
                const kind = st?.kind ?? "none";
                const isToday = today && diffDays(today, day) === 0;
                return (
                  <span
                    key={i}
                    className={`fast-cal-day${kind === "none" ? "" : ` cyc-${kind}`}${isToday ? " is-selected" : ""}`}
                    title={kind === "none" ? undefined : t.kind[kind]}
                  >
                    {num(i + 1, lang)}
                  </span>
                );
              })}
            </div>
            <ul className="fast-cal-legend">
              {(
                [
                  ["period", t.colPeriod],
                  ["fertile", t.colFertile],
                  ["ovulation", t.colOvulation],
                ] as const
              ).map(([k, l]) => (
                <li key={k}>
                  <i className={`cyc-${k}`} aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {upcoming.length ? (
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <caption>{t.upcoming}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t.colPeriod}</th>
                    <th scope="col">{t.colFertile}</th>
                    <th scope="col">{t.colOvulation}</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((c) => (
                    <tr key={ymdKey(c.start)}>
                      <td>{range(c.start, c.periodEnd, lang)}</td>
                      <td>{range(c.fertileStart, c.fertileEnd, lang)}</td>
                      <td>{shortText(c.ovulation, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </>
      ) : (
        <p className="date-calc-note">
          {t.invalid} ({t.luteal}: {LUTEAL_MIN}–{LUTEAL_MAX})
        </p>
      )}
      <p className="date-calc-note">{t.note}</p>
    </div>
  );
}
