"use client";

import { moonPhasesBetween, moonState, phaseName, type PhaseName } from "../../converter/time/moon";
import { moonPosition, moonSign } from "../../converter/time/moonPosition";
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
  sign: string;
  distance: string;
  signNames: readonly string[];
  until: string;
};

// Canli ay: su anki evre, aydinlanma, yas, burc, uzaklik ve bir sonraki dolunay / yeni aya kalan sure.
// Tarayici saati gelene kadar derleme anindaki degerler gosterilir; site her gece yeniden derlendigi icin
// ham HTML'de o gunun evresi yazar (arama motorlari "bugun ay nasil" sorusunun cevabini gorur).
export default function LiveMoon({ lang, copy, initialNow }: { lang: "tr" | "en"; copy: LiveMoonCopy; initialNow: number }) {
  const liveNow = useSecondNow();
  const now = liveNow ?? new Date(initialNow);
  const state = moonState(now);
  const sign = moonSign(now);
  const distance = moonPosition(now).distance;
  const upcoming = moonPhasesBetween(now, new Date(now.getTime() + 32 * 86400000));
  const nextFull = upcoming.find((e) => e.kind === "full");
  const nextNew = upcoming.find((e) => e.kind === "new");
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const fmt = (date: Date) => new Intl.DateTimeFormat(locale, { timeZone: lang === "tr" ? "Europe/Istanbul" : "UTC", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(date);
  const until = (date: Date) => {
    const ms = date.getTime() - now.getTime();
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    return lang === "tr" ? `${d} gün ${h} saat` : `${d} d ${h} h`;
  };

  return (
    <div className="live-moon">
      <div className="live-moon-disc">
        <MoonIcon fraction={state.fraction} size={220} label={copy.names[phaseName(state.age)]} />
      </div>
      <div className="live-moon-info">
        <span className="time-tool-caption">{copy.caption}</span>
        <strong>{copy.names[phaseName(state.age)]}</strong>
        <dl>
          <div>
            <dt>{copy.illumination}</dt>
            <dd>
              {lang === "tr"
                ? `%${(state.illumination * 100).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}`
                : `${(state.illumination * 100).toFixed(1)}%`}
            </dd>
          </div>
          <div>
            <dt>{copy.age}</dt>
            <dd>{`${state.age.toLocaleString(locale, { maximumFractionDigits: 1 })} ${copy.days}`}</dd>
          </div>
          <div>
            <dt>{copy.sign}</dt>
            <dd>
              {copy.signNames[sign.sign]}{" "}
              <small>
                ({copy.signNames[sign.next]} {copy.until} {fmt(sign.ingress)})
              </small>
            </dd>
          </div>
          <div>
            <dt>{copy.distance}</dt>
            <dd>{Math.round(distance).toLocaleString(locale)} km</dd>
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
