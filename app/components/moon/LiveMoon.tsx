"use client";

import { moonPhasesBetween, moonState, phaseName, type PhaseName } from "../../converter/time/moon";
import { useSecondNow } from "../world/useSecondNow";
import MoonIcon from "./MoonIcon";

export type LiveMoonCopy = {
  caption: string;
  illumination: string;
  age: string;
  days: string;
  nextFull: string;
  nextNew: string;
  names: Record<PhaseName, string>;
};

// Canli ay: su anki evre, aydinlanma, yas ve bir sonraki dolunay / yeni aya kalan sure.
export default function LiveMoon({ lang, copy, initialFraction }: { lang: "tr" | "en"; copy: LiveMoonCopy; initialFraction: number }) {
  const now = useSecondNow();
  const state = now ? moonState(now) : null;
  const upcoming = now ? moonPhasesBetween(now, new Date(now.getTime() + 32 * 86400000)) : [];
  const nextFull = upcoming.find((e) => e.kind === "full");
  const nextNew = upcoming.find((e) => e.kind === "new");
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const fmt = (date: Date) => new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(date);
  const until = (date: Date) => {
    if (!now) return "";
    const ms = date.getTime() - now.getTime();
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    return lang === "tr" ? `${d} gün ${h} saat` : `${d} d ${h} h`;
  };

  return (
    <div className="live-moon">
      <div className="live-moon-disc">
        <MoonIcon fraction={state ? state.fraction : initialFraction} size={220} label={state ? copy.names[phaseName(state.age)] : undefined} />
      </div>
      <div className="live-moon-info">
        <span className="time-tool-caption">{copy.caption}</span>
        <strong>{state ? copy.names[phaseName(state.age)] : "…"}</strong>
        <dl>
          <div>
            <dt>{copy.illumination}</dt>
            <dd>
              {state
                ? lang === "tr"
                  ? `%${(state.illumination * 100).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}`
                  : `${(state.illumination * 100).toFixed(1)}%`
                : "–"}
            </dd>
          </div>
          <div>
            <dt>{copy.age}</dt>
            <dd>{state ? `${state.age.toLocaleString(locale, { maximumFractionDigits: 1 })} ${copy.days}` : "–"}</dd>
          </div>
          {nextFull && (
            <div>
              <dt>{copy.nextFull}</dt>
              <dd>
                {fmt(nextFull.date)} <small>({until(nextFull.date)})</small>
              </dd>
            </div>
          )}
          {nextNew && (
            <div>
              <dt>{copy.nextNew}</dt>
              <dd>
                {fmt(nextNew.date)} <small>({until(nextNew.date)})</small>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
