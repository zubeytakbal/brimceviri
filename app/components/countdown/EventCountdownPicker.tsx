"use client";

import { useEffect, useState } from "react";
import CountdownDisplay, { type CountdownTarget } from "./CountdownDisplay";
import { countdownCopy } from "./countdownCopy";

export type PickerEvent = { slug: string; name: string; zone: "istanbul" | "local"; targets: CountdownTarget[] };

const LABEL = { tr: "Geri sayım", en: "Count down to", de: "Countdown bis" } as const;

/** Hazır günlerin geri sayımı tek sayfada: ?param= ile gelen gün seçili açılır. */
export default function EventCountdownPicker({ events, lang, param }: { events: PickerEvent[]; lang: "tr" | "en" | "de"; param: string }) {
  const [slug, setSlug] = useState(events[0]?.slug ?? "");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const value = new URLSearchParams(window.location.search).get(param);
      if (value && events.some((e) => e.slug === value)) setSlug(value);
    });
    return () => cancelAnimationFrame(frame);
  }, [events, param]);
  const event = events.find((e) => e.slug === slug) ?? events[0];
  if (!event) return null;
  return (
    <div className="date-calc" id="sayac">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{LABEL[lang]}</span>
            <select value={event.slug} onChange={(e) => setSlug(e.target.value)}>
              {events.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <CountdownDisplay key={event.slug} targets={event.targets} zone={event.zone} lang={lang} title={event.name} copy={countdownCopy[lang]} />
    </div>
  );
}
