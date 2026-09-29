"use client";

import { useEffect, useMemo, useState } from "react";
import { zonedWallTimeToUtc } from "../../converter/time/timeZoneOptions";
import { shortDifference, zoneOffsetMinutes } from "./useSecondNow";

export type ConverterOption = { id: string; label: string; timeZone: string; group: "abbr" | "city" };

export type ConverterCopy = {
  from: string;
  to: string;
  date: string;
  time: string;
  now: string;
  swap: string;
  add: string;
  remove: string;
  share: string;
  copied: string;
  planner: string;
  plannerHint: string;
  abbrGroup: string;
  cityGroup: string;
  work: string;
  night: string;
  nextDay: string;
  prevDay: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function todayParts() {
  const d = new Date();
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

function hourIn(timeZone: string, instant: Date) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(instant));
}

function dayKey(timeZone: string, instant: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(instant);
}

// Saat dilimi cevirici + toplanti planlayici. Durum URL'ye yazilabilir (?f=istanbul&t=new-york,tokyo&at=2026-09-27T15:00).
export default function TimeZoneConverter({
  options,
  lang,
  copy,
  initialFrom,
  initialTo,
  basePath,
}: {
  options: ConverterOption[];
  lang: "tr" | "en" | "de";
  copy: ConverterCopy;
  initialFrom: string;
  initialTo: string[];
  basePath: string;
}) {
  const locale = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US";
  const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);
  const [fromId, setFromId] = useState(initialFrom);
  const [toIds, setToIds] = useState<string[]>(initialTo);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [adding, setAdding] = useState("");

  // Ilk karede: URL parametreleri ya da su anki saat.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const f = params.get("f");
      const t = params.get("t");
      const at = params.get("at");
      if (f && byId.has(f)) setFromId(f);
      if (t) {
        const ids = t.split(",").filter((id) => byId.has(id)).slice(0, 8);
        if (ids.length) setToIds(ids);
      }
      const now = todayParts();
      if (at && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(at)) {
        setDate(at.slice(0, 10));
        setTime(at.slice(11));
      } else {
        setDate(now.date);
        setTime(now.time);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [byId]);

  const from = byId.get(fromId) ?? options[0];
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const ready = Boolean(year && month && day && !Number.isNaN(hour) && !Number.isNaN(minute));
  const instant = ready ? zonedWallTimeToUtc(from.timeZone, { year, month, day, hour, minute }, zoneOffsetMinutes) : null;

  const setNowInSource = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: from.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
    setDate(`${get("year")}-${get("month")}-${get("day")}`);
    setTime(`${get("hour")}:${get("minute")}`);
  };

  const swap = () => {
    if (!toIds.length || !instant) return;
    const target = byId.get(toIds[0]);
    if (!target) return;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: target.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(instant);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
    setToIds([fromId, ...toIds.slice(1)]);
    setFromId(target.id);
    setDate(`${get("year")}-${get("month")}-${get("day")}`);
    setTime(`${get("hour")}:${get("minute")}`);
  };

  const share = async () => {
    const url = `${window.location.origin}${basePath}?f=${fromId}&t=${toIds.join(",")}&at=${date}T${time}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(copy.share, url);
    }
  };

  const zoneSelect = (value: string, onChange: (id: string) => void, label: string) => (
    <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      <optgroup label={copy.abbrGroup}>
        {options
          .filter((o) => o.group === "abbr")
          .map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
      </optgroup>
      <optgroup label={copy.cityGroup}>
        {options
          .filter((o) => o.group === "city")
          .map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
      </optgroup>
    </select>
  );

  // Planlayici: kaynak gunun 24 saati icin her bolgedeki yerel saat.
  const plannerRows = useMemo(() => {
    if (!year || !month || !day) return [];
    const zones = [from, ...toIds.map((id) => byId.get(id)).filter((o): o is ConverterOption => Boolean(o))];
    const sourceDay = `${year}-${pad(month)}-${pad(day)}`;
    const instants = Array.from({ length: 24 }, (_, h) => zonedWallTimeToUtc(from.timeZone, { year, month, day, hour: h, minute: 0 }, zoneOffsetMinutes));
    return zones.map((zone) => ({
      zone,
      cells: instants.map((inst) => {
        const h = hourIn(zone.timeZone, inst);
        const key = dayKey(zone.timeZone, inst);
        return { hour: h, shift: key === sourceDay ? 0 : key > sourceDay ? 1 : -1 };
      }),
    }));
  }, [from, toIds, byId, year, month, day]);

  return (
    <div className="tz-converter">
      <div className="tz-source">
        <label className="tz-field is-zone">
          <span>{copy.from}</span>
          {zoneSelect(fromId, setFromId, copy.from)}
        </label>
        <label className="tz-field">
          <span>{copy.date}</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label className="tz-field">
          <span>{copy.time}</span>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <div className="tz-source-actions">
          <button type="button" className="time-tool-button is-secondary" onClick={setNowInSource}>
            {copy.now}
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={swap} aria-label={copy.swap}>
            ⇅ {copy.swap}
          </button>
        </div>
      </div>

      <ul className="tz-results">
        {toIds.map((id, index) => {
          const target = byId.get(id);
          if (!target) return null;
          const diff = instant ? zoneOffsetMinutes(target.timeZone, instant) - zoneOffsetMinutes(from.timeZone, instant) : 0;
          return (
            <li key={`${id}-${index}`} className="tz-result">
              <div className="tz-result-zone">
                {zoneSelect(id, (next) => setToIds((current) => current.map((c, i) => (i === index ? next : c))), copy.to)}
              </div>
              <strong className="tz-result-time">
                {instant ? new Intl.DateTimeFormat(locale, { timeZone: target.timeZone, hour: "2-digit", minute: "2-digit", hour12: lang === "en" }).format(instant) : "--:--"}
              </strong>
              <span className="tz-result-date">
                {instant ? new Intl.DateTimeFormat(locale, { timeZone: target.timeZone, weekday: "long", day: "numeric", month: "long" }).format(instant) : ""}
              </span>
              <span className="tz-result-diff">{shortDifference(diff, lang)}</span>
              <button type="button" className="tz-remove" onClick={() => setToIds((current) => current.filter((_, i) => i !== index))} aria-label={copy.remove}>
                ×
              </button>
            </li>
          );
        })}
      </ul>

      <div className="tz-add">
        <select
          value={adding}
          onChange={(event) => {
            const id = event.target.value;
            if (id) setToIds((current) => (current.length < 8 ? [...current, id] : current));
            setAdding("");
          }}
          aria-label={copy.add}
        >
          <option value="">+ {copy.add}</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <button type="button" className="time-tool-button is-secondary" onClick={() => void share()}>
          {copied ? copy.copied : copy.share}
        </button>
      </div>

      {plannerRows.length > 1 && (
        <div className="tz-planner">
          <h2>{copy.planner}</h2>
          <p>{copy.plannerHint}</p>
          <div className="tz-planner-scroll">
            <table>
              <tbody>
                {plannerRows.map((row) => (
                  <tr key={row.zone.id}>
                    <th scope="row">{row.zone.label.replace(/ \(.*\)$/, "")}</th>
                    {row.cells.map((cell, index) => {
                      const work = cell.hour >= 9 && cell.hour < 18;
                      const night = cell.hour < 7 || cell.hour >= 22;
                      return (
                        <td
                          key={index}
                          className={`${work ? "is-work" : night ? "is-night" : ""}${index === hour ? " is-selected" : ""}`}
                          title={cell.shift ? (cell.shift > 0 ? copy.nextDay : copy.prevDay) : undefined}
                        >
                          <button type="button" onClick={() => setTime(`${pad(index)}:00`)}>
                            {cell.hour}
                            {cell.shift !== 0 && <sup>{cell.shift > 0 ? "+1" : "−1"}</sup>}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tz-planner-legend">
            <span className="is-work" /> {copy.work} <span className="is-night" /> {copy.night}
          </p>
        </div>
      )}
    </div>
  );
}
