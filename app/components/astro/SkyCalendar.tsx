"use client";

import { useState } from "react";
import type { SkyEventKind } from "../../converter/time/skyEvents";

export type SkyCalendarEvent = { at: string; kind: SkyEventKind; title: string; detail: string; when?: string };

const FILTERS: { id: SkyEventKind | "all"; label: string }[] = [
  { id: "all", label: "Hepsi" },
  { id: "meteor", label: "Meteor yağmurları" },
  { id: "eclipse", label: "Tutulmalar" },
  { id: "moon", label: "Dolunaylar" },
  { id: "planet", label: "Gezegenler" },
  { id: "season", label: "Mevsimler" },
];

const tz = { timeZone: "Europe/Istanbul" } as const;
const month = new Intl.DateTimeFormat("tr-TR", { ...tz, month: "long", year: "numeric" });
const dateTime = new Intl.DateTimeFormat("tr-TR", { ...tz, day: "numeric", month: "long", weekday: "short", hour: "2-digit", minute: "2-digit" });

export default function SkyCalendar({ events }: { events: SkyCalendarEvent[] }) {
  const [filter, setFilter] = useState<SkyEventKind | "all">("all");
  const shown = events.filter((e) => filter === "all" || e.kind === filter);
  const groups: { label: string; items: SkyCalendarEvent[] }[] = [];
  for (const e of shown) {
    const label = month.format(new Date(e.at));
    if (groups.at(-1)?.label !== label) groups.push({ label, items: [] });
    groups.at(-1)!.items.push(e);
  }

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Olay türü">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite">
        {groups.map((g) => (
          <div className="conversion-table-wrap" key={g.label}>
            <table className="conversion-table">
              <caption>{g.label}</caption>
              <thead>
                <tr>
                  <th style={{ width: "32%" }}>Tarih (Türkiye saati)</th>
                  <th>Olay</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((e) => (
                  <tr key={`${e.at}-${e.title}`}>
                    <td>{e.when ?? dateTime.format(new Date(e.at))}</td>
                    <td>
                      <strong>{e.title}</strong>
                      <br />
                      {e.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
