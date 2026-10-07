"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";
import { formatDeShort, weekdayDe } from "../../converter/time/germanDates";
import { GERMAN_STATES, germanHolidaysCached, stateHolidays } from "../../converter/time/germanHolidays";
import { brueckentage } from "../../i18n/germanCalendarTools";

/** Bundesland wählen: alle Feiertage des Landes für das Jahr, regionale Feiertage und Brückentage. */
export default function FeiertageBundesland({ year }: { year: number }) {
  const [slug, setSlug] = useState("bayern");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const land = new URLSearchParams(window.location.search).get("land");
      if (land && GERMAN_STATES.some((s) => s.slug === land)) setSlug(land);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const state = GERMAN_STATES.find((s) => s.slug === slug)!;
  const list = useMemo(() => stateHolidays(state.code, year), [state.code, year]);
  const regional = useMemo(
    () => germanHolidaysCached(year).filter((h) => h.partialStates?.includes(state.code)),
    [state.code, year],
  );
  const bridges = useMemo(() => brueckentage(state.code, year), [state.code, year]);

  return (
    <div className="date-calc" id="bundesland">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Bundesland</span>
            <select value={slug} onChange={(event) => setSlug(event.target.value)}>
              {GERMAN_STATES.map((s) => (
                <option key={s.code} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>
            {state.name} {year}
          </span>
          <strong>{list.length} Feiertage</strong>
          <em>{bridges.length} Brückentage</em>
        </div>
      </div>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Wochentag</th>
              <th scope="col">Feiertag</th>
            </tr>
          </thead>
          <tbody>
            {list.map((h) => (
              <tr key={h.id}>
                <td>{formatDeShort(h.date)}</td>
                <td>{weekdayDe(h.date)}</td>
                <td>{h.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {regional.length > 0 && (
        <p className="date-calc-note">
          Nur in einem Teil der Gemeinden: {regional.map((h) => `${h.name} (${formatDeShort(h.date)})`).join(", ")}.
        </p>
      )}
      {bridges.length > 0 && (
        <p className="date-calc-note">
          Brückentage: {bridges.map((b) => `${weekdayDe(b.bridge)}, ${formatDeShort(b.bridge)} (${b.holiday})`).join("; ")}.
        </p>
      )}
      <p className="date-calc-note">
        <Link href={`/de/arbeitstage-rechner?land=${state.slug}`}>Arbeitstage in {state.name} berechnen</Link> ·{" "}
        <Link href={`/de/brueckentage?land=${state.code}`}>Urlaub mit Brückentagen planen</Link>
      </p>
    </div>
  );
}
