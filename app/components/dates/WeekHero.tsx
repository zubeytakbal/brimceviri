"use client";

import { useEffect, useState } from "react";
import type { YMD } from "../../converter/time/calendars";
import { isoWeek } from "../../converter/time/dateMath";
import { weekRangeText } from "../../converter/time/weekRange";

/** Saat dilimindeki bugünün tarihi; boş dilim cihazın kendi saatidir. */
function todayIn(timeZone: string): YMD {
  const parts = new Intl.DateTimeFormat("en-CA", { ...(timeZone ? { timeZone } : {}), year: "numeric", month: "numeric", day: "numeric" }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** Sekme simgesine hafta numarasını çizer (vecka.nu'daki gibi). */
function drawFavicon(week: number) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0f6f6c";
    ctx.beginPath();
    ctx.roundRect(0, 0, 64, 64, 14);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(week), 32, 35);
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-week]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.dataset.week = "1";
      document.head.appendChild(link);
    }
    link.href = canvas.toDataURL("image/png");
  } catch {
    // Eski tarayıcılarda varsayılan simge kalır.
  }
}

/**
 * Hafta numarası sayfalarının en üstündeki büyük cevap. İlk değer sunucuda (HTML'de)
 * yazılır; gece derlemesinden sonra hafta değiştiyse tarayıcı düzeltir.
 * Metinler sunucudan şablon olarak gelir: {week}.
 */
export default function WeekHero({
  intlLocale,
  timeZone,
  label,
  numberTemplate,
  initialWeek,
  initialYear,
  initialRange,
}: {
  intlLocale: string;
  timeZone: string;
  label: string;
  numberTemplate: string;
  initialWeek: number;
  initialYear: number;
  initialRange: string;
}) {
  const [state, setState] = useState({ week: initialWeek, year: initialYear, range: initialRange });

  useEffect(() => {
    const current = isoWeek(todayIn(timeZone));
    drawFavicon(current.week);
    if (current.week !== initialWeek || current.year !== initialYear) {
      // Gece derlemesinden sonra hafta değiştiyse (ör. pazartesi 00:00) tarayıcıdaki gerçek hafta yazılır.
      setState({ week: current.week, year: current.year, range: weekRangeText(intlLocale, current.year, current.week) }); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [intlLocale, timeZone, initialWeek, initialYear]);

  const [before, after] = numberTemplate.split("{week}");
  return (
    <div className="week-hero">
      <p className="week-hero-label">{label}</p>
      <p className="week-hero-number">
        {before ? <span className="week-hero-affix">{before}</span> : null}
        <time dateTime={`${state.year}-W${String(state.week).padStart(2, "0")}`}>{state.week}</time>
        {after ? <span className="week-hero-affix">{after}</span> : null}
      </p>
      <p className="week-hero-range">{state.range}</p>
    </div>
  );
}

