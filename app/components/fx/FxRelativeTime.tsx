"use client";

import { useEffect, useState } from "react";
import { fillTemplate } from "./fxClientHelpers";

export type FxRelativeTimeLabels = {
  // "{t} önce" / "{t} sonra"
  pastTemplate: string;
  futureTemplate: string;
  justNow: string;
  // geri sayim sifira indiginde (kaynak yeni kuru yayinlamis olmali)
  due: string;
  // veri beklenenden eskiyse eklenen uyari
  stale: string;
  minute: [string, string];
  hour: [string, string];
  day: [string, string];
};

type Props = {
  targetUnix: number;
  mode: "since" | "until";
  labels: FxRelativeTimeLabels;
  numberLocale: string;
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const STALE_AFTER_MS = 36 * HOUR;

function unit(count: number, forms: [string, string], numberLocale: string) {
  return `${count.toLocaleString(numberLocale)} ${count === 1 ? forms[0] : forms[1]}`;
}

export function formatDuration(ms: number, labels: FxRelativeTimeLabels, numberLocale: string): string {
  if (ms >= 2 * DAY) return unit(Math.floor(ms / DAY), labels.day, numberLocale);
  const hours = Math.floor(ms / HOUR);
  const minutes = Math.floor((ms % HOUR) / MINUTE);
  if (hours === 0) return unit(Math.max(minutes, 1), labels.minute, numberLocale);
  if (minutes === 0) return unit(hours, labels.hour, numberLocale);
  return `${unit(hours, labels.hour, numberLocale)} ${unit(minutes, labels.minute, numberLocale)}`;
}

// Canli sayac: sayfa statik/onbellekli oldugu icin goreli sure sunucuda
// degil, tarayicida ve kaynagin kendi zaman damgasina gore hesaplanir.
// Ilk cizimde (hidrasyon oncesi) bos kalir ki yanlis bir sure gorunmesin.
export default function FxRelativeTime({ targetUnix, mode, labels, numberLocale }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 20_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  if (now === null) {
    return <span className="fx-relative-time" aria-hidden="true">&nbsp;</span>;
  }

  const target = targetUnix * 1000;

  if (mode === "since") {
    const elapsed = Math.max(0, now - target);
    const text = elapsed < MINUTE ? labels.justNow : fillTemplate(labels.pastTemplate, { t: formatDuration(elapsed, labels, numberLocale) });
    return (
      <span className="fx-relative-time">
        {text}
        {elapsed > STALE_AFTER_MS && <span className="fx-relative-time-warning"> {labels.stale}</span>}
      </span>
    );
  }

  const remaining = target - now;
  if (remaining <= 0) {
    return <span className="fx-relative-time">{labels.due}</span>;
  }
  return (
    <span className="fx-relative-time">
      {fillTemplate(labels.futureTemplate, { t: formatDuration(remaining, labels, numberLocale) })}
    </span>
  );
}
