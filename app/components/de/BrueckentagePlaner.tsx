"use client";

import { useEffect, useState } from "react";
import {
  brueckenJeFeiertag,
  icsDatei,
  MO_BIS_FR,
  optimalerPlan,
  type BrueckenOptionen,
} from "../../converter/time/brueckentage";
import { formatDe, formatDeShort } from "../../converter/time/germanDates";
import {
  GERMAN_STATES,
  germanHolidaysCached,
  type StateCode,
} from "../../converter/time/germanHolidays";
import { ymdKey } from "../../converter/time/dateMath";

const STATES = [...GERMAN_STATES].sort((a, b) =>
  a.name.localeCompare(b.name, "de"),
);
const WOCHENTAGE = [
  { idx: 1, label: "Mo" },
  { idx: 2, label: "Di" },
  { idx: 3, label: "Mi" },
  { idx: 4, label: "Do" },
  { idx: 5, label: "Fr" },
  { idx: 6, label: "Sa" },
  { idx: 0, label: "So" },
];
const kurz = (d: { year: number; month: number; day: number }) =>
  formatDe(d, { weekday: "short", day: "2-digit", month: "2-digit" });

export default function BrueckentagePlaner({
  years,
  initialYear,
  initialState = "nw",
}: {
  years: number[];
  initialYear: number;
  initialState?: StateCode;
}) {
  const [year, setYear] = useState(initialYear);
  const [state, setState] = useState<StateCode>(initialState);
  const [budget, setBudget] = useState(30);
  const [maxBlock, setMaxBlock] = useState(10);
  const [workdays, setWorkdays] = useState<boolean[]>(MO_BIS_FR);
  const [partial, setPartial] = useState<string[]>([]);
  const [heiligabend, setHeiligabend] = useState(false);
  const [silvester, setSilvester] = useState(false);

  // Vorauswahl über ?land=by (Links von den Feiertagsseiten).
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("land");
    if (code && GERMAN_STATES.some((s) => s.code === code))
      setState(code as StateCode); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const regionale = germanHolidaysCached(year).filter((h) =>
    h.partialStates?.includes(state),
  );
  const opts: BrueckenOptionen = {
    state,
    year,
    workdays,
    partial,
    heiligabendFrei: heiligabend,
    silvesterFrei: silvester,
  };
  const plan = optimalerPlan(opts, budget, maxBlock);
  const brueckenListe = brueckenJeFeiertag(opts);
  const urlaub = new Set(
    plan.zeitraeume.flatMap((z) => z.urlaubstage.map(ymdKey)),
  );
  const imPlan = new Set(
    plan.zeitraeume.flatMap((z) =>
      plan.tage
        .filter((t) => t.key >= ymdKey(z.von) && t.key <= ymdKey(z.bis))
        .map((t) => t.key),
    ),
  );
  const byKey = new Map(plan.tage.map((t) => [t.key, t]));
  const land = GERMAN_STATES.find((s) => s.code === state)!;
  const keineArbeit = !workdays.some(Boolean);

  function download() {
    const blob = new Blob([icsDatei(plan.zeitraeume)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `urlaubsplan-${year}-${land.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Jahr</span>
            <select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Bundesland</span>
            <select
              value={state}
              onChange={(event) => {
                setState(event.target.value as StateCode);
                setPartial([]);
              }}
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Urlaubstage für Brücken</span>
            <input
              type="number"
              min={1}
              max={60}
              value={budget}
              onChange={(event) =>
                setBudget(
                  Math.max(1, Math.min(60, Number(event.target.value) || 1)),
                )
              }
            />
            <small>gesetzlich mindestens 20 bei einer 5-Tage-Woche</small>
          </label>
          <label className="date-calc-field">
            <span>Höchstens je Urlaub</span>
            <select
              value={maxBlock}
              onChange={(event) => setMaxBlock(Number(event.target.value))}
            >
              {[2, 3, 4, 5, 8, 10, 15].map((v) => (
                <option key={v} value={v}>
                  {v} Urlaubstage
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-checks">
          <span>Meine Arbeitstage:</span>
          {WOCHENTAGE.map((w) => (
            <label key={w.idx}>
              <input
                type="checkbox"
                checked={workdays[w.idx]}
                onChange={(event) =>
                  setWorkdays(
                    workdays.map((v, i) =>
                      i === w.idx ? event.target.checked : v,
                    ),
                  )
                }
              />{" "}
              {w.label}
            </label>
          ))}
        </div>
        <div className="date-calc-checks">
          <label>
            <input
              type="checkbox"
              checked={heiligabend}
              onChange={(event) => setHeiligabend(event.target.checked)}
            />{" "}
            24.12. arbeitsfrei
          </label>
          <label>
            <input
              type="checkbox"
              checked={silvester}
              onChange={(event) => setSilvester(event.target.checked)}
            />{" "}
            31.12. arbeitsfrei
          </label>
          {regionale.map((h) => (
            <label key={h.id} title={h.note}>
              <input
                type="checkbox"
                checked={partial.includes(h.id)}
                onChange={(event) =>
                  setPartial(
                    event.target.checked
                      ? [...partial, h.id]
                      : partial.filter((p) => p !== h.id),
                  )
                }
              />{" "}
              {h.name} gilt bei mir
            </label>
          ))}
        </div>
      </div>

      {keineArbeit ? (
        <p className="date-calc-note">
          Bitte mindestens einen Arbeitstag wählen.
        </p>
      ) : (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>
                Ihr Urlaubsplan {year} für {land.name}
              </span>
              <strong>{plan.freieTage} freie Tage</strong>
              <em>
                mit {plan.urlaub} Urlaubstagen in {plan.zeitraeume.length}{" "}
                Zeiträumen
                {plan.urlaub < budget
                  ? ` · ${budget - plan.urlaub === 1 ? "1 Tag bleibt" : `${budget - plan.urlaub} Tage bleiben`} frei verplanbar`
                  : ""}
              </em>
            </div>
            {plan.urlaub > 0 && (
              <div className="date-calc-stat">
                <span>Verhältnis</span>
                <strong>
                  {(plan.freieTage / plan.urlaub).toLocaleString("de-DE", {
                    maximumFractionDigits: 1,
                  })}
                  ×
                </strong>
                <em>freie Tage je Urlaubstag</em>
              </div>
            )}
          </div>

          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Zeitraum</th>
                  <th scope="col">Urlaub nehmen</th>
                  <th scope="col">Frei</th>
                </tr>
              </thead>
              <tbody>
                {plan.zeitraeume.map((z) => (
                  <tr key={ymdKey(z.von)}>
                    <td>
                      {kurz(z.von)} – {kurz(z.bis)}
                      <br />
                      <small>{z.feiertage.join(", ")}</small>
                    </td>
                    <td>
                      {z.urlaub} {z.urlaub === 1 ? "Tag" : "Tage"}
                      <br />
                      <small>
                        {z.urlaubstage
                          .map((d) =>
                            formatDe(d, { day: "2-digit", month: "2-digit" }),
                          )
                          .join(", ")}
                      </small>
                    </td>
                    <td>
                      <strong>{z.tage} Tage</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {plan.zeitraeume.length > 0 && (
            <p className="date-calc-note">
              <button
                type="button"
                className="time-tool-button"
                onClick={download}
              >
                📅 Urlaubstage in den Kalender übernehmen (.ics)
              </button>
            </p>
          )}

          <div className="holiday-calendar">
            {Array.from({ length: 12 }, (_, m) => {
              const first = { year, month: m + 1, day: 1 };
              const lead = (new Date(Date.UTC(year, m, 1)).getUTCDay() + 6) % 7;
              const days = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
              return (
                <div className="holiday-month" key={m}>
                  <h3>{formatDe(first, { month: "long" })}</h3>
                  <div className="holiday-month-grid">
                    {WOCHENTAGE.map((w) => (
                      <b key={w.idx}>{w.label}</b>
                    ))}
                    {Array.from({ length: lead }, (_, i) => (
                      <span key={`e${i}`} />
                    ))}
                    {Array.from({ length: days }, (_, d) => {
                      const key = ymdKey({ year, month: m + 1, day: d + 1 });
                      const t = byKey.get(key)!;
                      const cls = t.feiertag
                        ? "is-holiday"
                        : urlaub.has(key)
                          ? "is-bridge"
                          : t.frei
                            ? "is-weekend"
                            : imPlan.has(key)
                              ? "is-half"
                              : "";
                      return (
                        <span
                          key={key}
                          className={cls || undefined}
                          title={
                            t.feiertag ??
                            (urlaub.has(key) ? "Urlaubstag" : undefined)
                          }
                        >
                          {d + 1}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="holiday-legend">
            <span className="is-holiday" /> Feiertag{" "}
            <span className="is-bridge" /> Urlaubstag im Plan{" "}
            <span className="is-weekend" /> arbeitsfrei
          </p>

          <h3>Alle Brücken {year} nach Feiertag</h3>
          <ul className="bridge-list">
            {brueckenListe
              .filter((b) => b.optionen.length)
              .map((b) => (
                <li key={ymdKey(b.datum)}>
                  <div className="bridge-head">
                    <strong>
                      {b.feiertag} (
                      {formatDe(b.datum, {
                        weekday: "short",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      )
                    </strong>
                  </div>
                  {b.optionen.slice(0, 4).map((z) => (
                    <p key={`${ymdKey(z.von)}-${z.urlaub}`}>
                      {z.urlaub} {z.urlaub === 1 ? "Urlaubstag" : "Urlaubstage"}{" "}
                      → <strong>{z.tage} Tage frei</strong>{" "}
                      <small>
                        ({formatDeShort(z.von)} – {formatDeShort(z.bis)})
                      </small>
                    </p>
                  ))}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
