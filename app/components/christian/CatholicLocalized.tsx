"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EASTER_MAX_YEAR,
  EASTER_MIN_YEAR,
  feastDate,
  MYSTERY_BY_WEEKDAY,
  NOVENA_FEASTS,
  novenaFor,
  rosaryStepData,
  upcomingNovenas,
  westernEaster,
  westernFeasts,
  type MysterySet,
} from "../../converter/christian/christianCalc";
import { liturgicalDay, type LiturgicalColor, type LiturgicalDay } from "../../converter/christian/liturgicalCalendar";
import { addDaysYmd, diffDays, parseYmd, weekdayOf } from "../../converter/time/dateMath";
import { CATHOLIC_DICT, EASTER_FEAST_NAMES, longDate, shortDate, weekdayName, type CatholicLang } from "../../i18n/catholicTools";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Pre-rendered with a fixed date; switches to the visitor's date after hydration unless they changed it. */
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

const UI = {
  en: {
    date: "Date",
    year: "Year",
    week: (season: string, n: number) => `Week ${n} of ${season}`,
    ordinaryWeek: (n: number) => `Week ${n} in Ordinary Time`,
    afterAsh: "Days after Ash Wednesday",
    holyWeek: "Holy Week",
    color: "Liturgical color",
    cycles: (d: LiturgicalDay) => `Sunday cycle: Year ${d.sundayCycle} · Weekday cycle: Year ${d.weekdayCycle}`,
    cyclesShort: "Lectionary",
    next: "The next 14 days",
    note: "Saints' memorials and local feasts can have their own color; check your diocesan calendar.",
    range: `Choose a date between ${EASTER_MIN_YEAR + 1} and ${EASTER_MAX_YEAR - 1}.`,
    today: "Today",
    pray: "Mysteries to pray",
    todayMark: "(today)",
    fatima: "Add the Fatima Prayer after each decade",
    decade: (n: number) => `Decade ${n} of 5`,
    opening: "Opening",
    closing: "Closing",
    tap: "tap for next",
    done: "Rosary complete",
    again: "Start again",
    back: "Back",
    progress: (h: number, s: number, t: number) => `${h} of 53 Hail Marys · step ${s} of ${t}`,
    novena: "Novena",
    other: "Other feast or date…",
    feastDate: "Feast date",
    start: "Start the novena on",
    dayOf: (n: number) => `Today is day ${n} of 9`,
    inDays: (n: number) => `${n} day${n === 1 ? "" : "s"} from today`,
    ended: "this novena has ended",
    last: "Ninth day",
    eve: "the eve of the feast",
    feast: "Feast day",
    upcoming: "Upcoming novenas",
    starts: "Starts",
  },
  es: {
    date: "Fecha",
    year: "Año",
    week: (season: string, n: number) => `Semana ${n} de ${season}`,
    ordinaryWeek: (n: number) => `Semana ${n} del Tiempo Ordinario`,
    afterAsh: "Días después de Ceniza",
    holyWeek: "Semana Santa",
    color: "Color litúrgico",
    cycles: (d: LiturgicalDay) => `Ciclo dominical ${d.sundayCycle} · Ferias: año ${d.weekdayCycle} (${d.weekdayCycle === "I" ? "impar" : "par"})`,
    cyclesShort: "Leccionario",
    next: "Los próximos 14 días",
    note: "Las memorias de los santos y las fiestas locales pueden tener su propio color; consulta el calendario de tu diócesis.",
    range: `Elige una fecha entre ${EASTER_MIN_YEAR + 1} y ${EASTER_MAX_YEAR - 1}.`,
    today: "Hoy",
    pray: "Misterios para rezar",
    todayMark: "(hoy)",
    fatima: "Añadir la Oración de Fátima después de cada misterio",
    decade: (n: number) => `Misterio ${n} de 5`,
    opening: "Inicio",
    closing: "Final",
    tap: "toca para continuar",
    done: "Rosario completo",
    again: "Empezar de nuevo",
    back: "Atrás",
    progress: (h: number, s: number, t: number) => `${h} de 53 avemarías · paso ${s} de ${t}`,
    novena: "Novena",
    other: "Otra fiesta o fecha…",
    feastDate: "Fecha de la fiesta",
    start: "Empieza la novena el",
    dayOf: (n: number) => `Hoy es el día ${n} de 9`,
    inDays: (n: number) => `dentro de ${n} día${n === 1 ? "" : "s"}`,
    ended: "esta novena ya terminó",
    last: "Noveno día",
    eve: "la víspera de la fiesta",
    feast: "Día de la fiesta",
    upcoming: "Próximas novenas",
    starts: "Empieza",
  },
  pt: {
    date: "Data",
    year: "Ano",
    week: (season: string, n: number) => `${n}ª Semana do ${season}`,
    ordinaryWeek: (n: number) => `${n}ª Semana do Tempo Comum`,
    afterAsh: "Dias depois das Cinzas",
    holyWeek: "Semana Santa",
    color: "Cor litúrgica",
    cycles: (d: LiturgicalDay) => `Ano ${d.sundayCycle} (domingos) · Ano ${d.weekdayCycle} (dias de semana)`,
    cyclesShort: "Lecionário",
    next: "Os próximos 14 dias",
    note: "Memórias de santos e festas locais podem ter cor própria; consulte o calendário da sua diocese.",
    range: `Escolha uma data entre ${EASTER_MIN_YEAR + 1} e ${EASTER_MAX_YEAR - 1}.`,
    today: "Hoje",
    pray: "Mistérios para rezar",
    todayMark: "(hoje)",
    fatima: "Incluir a Oração de Fátima depois de cada mistério",
    decade: (n: number) => `${n}º mistério de 5`,
    opening: "Início",
    closing: "Final",
    tap: "toque para continuar",
    done: "Terço completo",
    again: "Recomeçar",
    back: "Voltar",
    progress: (h: number, s: number, t: number) => `${h} de 53 ave-marias · passo ${s} de ${t}`,
    novena: "Novena",
    other: "Outra festa ou data…",
    feastDate: "Data da festa",
    start: "Comece a novena em",
    dayOf: (n: number) => `Hoje é o ${n}º dia de 9`,
    inDays: (n: number) => `daqui a ${n} dia${n === 1 ? "" : "s"}`,
    ended: "esta novena já terminou",
    last: "Nono dia",
    eve: "a véspera da festa",
    feast: "Dia da festa",
    upcoming: "Próximas novenas",
    starts: "Começa",
  },
} as const;

const COLOR_HEX: Record<LiturgicalColor, string> = { violet: "#6b3fa0", rose: "#e58fb3", white: "#ffffff", green: "#2e8b57", red: "#c0392b" };

function seasonLine(lang: CatholicLang, d: LiturgicalDay) {
  const t = UI[lang];
  const name = CATHOLIC_DICT[lang].seasons[d.season];
  if (d.season === "ordinary" && d.week) return t.ordinaryWeek(d.week);
  if (d.season === "lent") return d.week === 0 ? t.afterAsh : d.week === 6 ? t.holyWeek : t.week(name, d.week!);
  if ((d.season === "advent" || d.season === "easter") && d.week) return t.week(name, d.week);
  return name;
}

function Swatch({ color }: { color: LiturgicalColor }) {
  return <i className="lit-swatch" style={{ background: COLOR_HEX[color] }} aria-hidden="true" />;
}

/* ---------------- Liturgical calendar ---------------- */

export function LiturgicalCalendarTool({ lang, initialDate }: { lang: CatholicLang; initialDate: string }) {
  const t = UI[lang];
  const dict = CATHOLIC_DICT[lang];
  const [date, setDate] = useDate(initialDate);
  const d = parseYmd(date);
  const info = d ? liturgicalDay(d) : null;
  const next = d && info ? Array.from({ length: 14 }, (_, i) => addDaysYmd(d, i + 1)).map((x) => ({ x, l: liturgicalDay(x) })) : [];

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.date}</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
      </div>
      {d && info ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{longDate(lang, d)}</span>
              <strong>{info.celebration ? dict.celebrations[info.celebration] : seasonLine(lang, info)}</strong>
              <em>{info.celebration ? seasonLine(lang, info) : dict.seasons[info.season]}</em>
            </div>
            <div className="date-calc-stat">
              <span>{t.color}</span>
              <strong>
                <Swatch color={info.color} /> {dict.colors[info.color]}
              </strong>
            </div>
            <div className="date-calc-stat">
              <span>{t.cyclesShort}</span>
              <strong>{t.cycles(info)}</strong>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <caption>{t.next}</caption>
              <tbody>
                {next.map(({ x, l }) =>
                  l ? (
                    <tr key={`${x.month}-${x.day}`}>
                      <td>{shortDate(lang, x)}</td>
                      <td>{weekdayName(lang, weekdayOf(x))}</td>
                      <td>{l.celebration ? <strong>{dict.celebrations[l.celebration]}</strong> : seasonLine(lang, l)}</td>
                      <td>
                        <Swatch color={l.color} /> {dict.colors[l.color]}
                      </td>
                    </tr>
                  ) : null,
                )}
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">{t.note}</p>
        </>
      ) : (
        <p className="date-calc-note">{t.range}</p>
      )}
    </div>
  );
}

/* ---------------- Rosary ---------------- */

export function RosaryLocalized({ lang, initialDate }: { lang: "es" | "pt"; initialDate: string }) {
  const t = UI[lang];
  const dict = CATHOLIC_DICT[lang];
  const [date] = useDate(initialDate);
  const today = parseYmd(date)!;
  const todaySet = MYSTERY_BY_WEEKDAY[weekdayOf(today)];
  const [set, setSet] = useState<MysterySet | null>(null);
  const [fatima, setFatima] = useState(true);
  const [step, setStep] = useState(0);
  const active = set ?? todaySet;
  const steps = useMemo(() => rosaryStepData(fatima), [fatima]);
  const done = step >= steps.length;
  const cur = steps[Math.min(step, steps.length - 1)];
  const hail = steps.slice(0, step).filter((s) => s.kind === "hail-mary").length;
  const prayer =
    cur.kind === "our-father" && cur.decade
      ? `${dict.mysteries[active].items[cur.decade - 1]} – ${dict.prayers["our-father"]}`
      : cur.kind === "glory" && cur.fatima
        ? dict.prayers.fatima
        : dict.prayers[cur.kind];

  return (
    <div className="date-calc">
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>
            {t.today} ({weekdayName(lang, weekdayOf(today))})
          </span>
          <strong>{dict.mysteries[todaySet].name}</strong>
          <em>{dict.mysteries[todaySet].items.join(" · ")}</em>
        </div>
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.pray}</span>
            <select
              value={active}
              onChange={(e) => {
                setSet(e.target.value as MysterySet);
                setStep(0);
              }}
            >
              {(Object.keys(dict.mysteries) as MysterySet[]).map((k) => (
                <option key={k} value={k}>
                  {dict.mysteries[k].name} {k === todaySet ? t.todayMark : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={fatima} onChange={(e) => setFatima(e.target.checked)} />
          {t.fatima}
        </label>
      </div>
      <button type="button" className="zikir-buton" onClick={() => setStep((s) => Math.min(s + 1, steps.length))}>
        {done ? (
          <>
            <span className="zikir-ad">{t.done}</span>
            <strong>✓</strong>
          </>
        ) : (
          <>
            <span className="zikir-ad">{cur.decade ? t.decade(cur.decade) : cur.kind === "closing" ? t.closing : t.opening}</span>
            <strong className="rosary-prayer">{prayer}</strong>
            <span className="zikir-hedef">{cur.index ? `${cur.index} / ${cur.of} · ${t.tap}` : t.tap}</span>
          </>
        )}
      </button>
      <div className="kaza-takip-cubuk" aria-hidden="true">
        <i style={{ width: `${(Math.min(step, steps.length) / steps.length) * 100}%` }} />
      </div>
      <div className="kaza-takip-alt">
        <button type="button" className="kaza-takip-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          {t.back}
        </button>
        <button type="button" className="kaza-takip-btn" onClick={() => setStep(0)}>
          {t.again}
        </button>
        <span className="kaza-takip-kalan">{t.progress(hail, Math.min(step + 1, steps.length), steps.length)}</span>
      </div>
    </div>
  );
}

/* ---------------- Novena ---------------- */

export function NovenaLocalized({ lang, initialDate, defaultFeast }: { lang: "es" | "pt"; initialDate: string; defaultFeast: string }) {
  const t = UI[lang];
  const dict = CATHOLIC_DICT[lang];
  const [date] = useDate(initialDate);
  const today = parseYmd(date)!;
  const [feastId, setFeastId] = useState(defaultFeast);
  const [custom, setCustom] = useState("");
  const feast = NOVENA_FEASTS.find((f) => f.id === feastId);
  let day = null as ReturnType<typeof feastDate>;
  if (feastId === "custom") day = parseYmd(custom);
  else if (feast) {
    day = feastDate(feast, today.year);
    if (day && diffDays(today, day) < 1) day = feastDate(feast, today.year + 1);
  }
  const n = day ? novenaFor(day) : null;
  const dayOf = n ? diffDays(n.start, today) + 1 : 0;
  const sorted = [...NOVENA_FEASTS].sort((a, b) => dict.feasts[a.id].localeCompare(dict.feasts[b.id], lang));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.novena}</span>
            <select value={feastId} onChange={(e) => setFeastId(e.target.value)}>
              {sorted.map((f) => (
                <option key={f.id} value={f.id}>
                  {dict.feasts[f.id]}
                </option>
              ))}
              <option value="custom">{t.other}</option>
            </select>
          </label>
          {feastId === "custom" ? (
            <label className="date-calc-field">
              <span>{t.feastDate}</span>
              <input type="date" value={custom} onChange={(e) => setCustom(e.target.value)} />
            </label>
          ) : null}
        </div>
      </div>
      {n ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{t.start}</span>
            <strong>{longDate(lang, n.start)}</strong>
            <em>{dayOf >= 1 && dayOf <= 9 ? t.dayOf(dayOf) : dayOf < 1 ? t.inDays(1 - dayOf) : t.ended}</em>
          </div>
          <div className="date-calc-stat">
            <span>{t.last}</span>
            <strong>{shortDate(lang, n.end)}</strong>
            <em>{t.eve}</em>
          </div>
          <div className="date-calc-stat">
            <span>{t.feast}</span>
            <strong>{shortDate(lang, n.feastDay)}</strong>
          </div>
        </div>
      ) : null}
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <caption>{t.upcoming}</caption>
          <tbody>
            {upcomingNovenas(today, 6).map((u) => (
              <tr key={`${u.feast.id}-${u.feastDay.year}`}>
                <td>{dict.feasts[u.feast.id]}</td>
                <td>
                  {t.starts}: {shortDate(lang, u.start)}
                </td>
                <td>{shortDate(lang, u.feastDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Holy Week / Easter dates ---------------- */

export function HolyWeekLocalized({ lang, initialYear }: { lang: "es" | "pt"; initialYear: number }) {
  const t = UI[lang];
  const [year, setYear] = useState(String(initialYear));
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setYear(String(new Date().getFullYear()));
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);
  const y = Number(year);
  const easter = westernEaster(y);
  const feasts = westernFeasts(y);
  const pick = (v: number) => {
    setTouched(true);
    setYear(String(v));
  };

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>
              {t.year} ({EASTER_MIN_YEAR}–{EASTER_MAX_YEAR})
            </span>
            <input inputMode="numeric" value={year} onChange={(e) => pick(Number(e.target.value.replace(/\D/g, "").slice(0, 4)) || 0)} />
          </label>
        </div>
        <div className="date-calc-chips">
          <button type="button" onClick={() => pick(y - 1)} disabled={!easter}>
            ← {y - 1}
          </button>
          <button type="button" onClick={() => pick(y + 1)} disabled={!easter}>
            {y + 1} →
          </button>
        </div>
      </div>
      {easter && feasts ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{EASTER_FEAST_NAMES[lang].easter}</span>
              <strong>{longDate(lang, easter)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>{EASTER_FEAST_NAMES[lang]["good-friday"]}</span>
              <strong>{longDate(lang, feasts.find((f) => f.id === "good-friday")!.date)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>{EASTER_FEAST_NAMES[lang]["shrove-tuesday"]}</span>
              <strong>{longDate(lang, feasts.find((f) => f.id === "shrove-tuesday")!.date)}</strong>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <tbody>
                {feasts.map((f) => (
                  <tr key={f.id}>
                    <td>{EASTER_FEAST_NAMES[lang][f.id] ?? f.name}</td>
                    <td>{longDate(lang, f.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="date-calc-note">
          {t.year}: {EASTER_MIN_YEAR}–{EASTER_MAX_YEAR}
        </p>
      )}
    </div>
  );
}
