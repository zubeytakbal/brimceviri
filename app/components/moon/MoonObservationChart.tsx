"use client";

import { useEffect, useState } from "react";
import { moonPhasesBetween, moonState, phaseName, type PhaseKind, type PhaseName } from "../../converter/time/moon";
import { compassPoint, moonEventsForDay, moonHorizontal } from "../../converter/time/moonRiseSet";
import { atClock } from "../../converter/time/sunYear";
import { trAblative } from "../../converter/turkishSuffix";
import MoonIcon from "./MoonIcon";

// 30 günlük ay gözlem çizelgesi: seçilen başlangıç gününden itibaren her akşam aynı saatte
// Ay'ın evresi, aydınlanması ve seçilen ilde ufkun neresinde olduğu. Hesap tarayıcıda yapılır
// (Türkiye saati, UTC+3); "boş çizelge" seçeneği öğrencinin kendi çizimi için daireleri boş bırakır.

export type ChartCity = { id: string; name: string; lat: number; lon: number };

const DAY = 86400000;
const TR_OFFSET = 3;
const DAYS = 30;
const HOURS = [19, 20, 21, 22];
const KIND_FRACTION: Record<PhaseKind, number> = { new: 0, first: 0.25, full: 0.5, last: 0.75 };

type Ymd = { y: number; m: number; d: number };
const pad = (n: number) => String(n).padStart(2, "0");
const ymdKey = ({ y, m, d }: Ymd) => `${y}-${pad(m)}-${pad(d)}`;
const atTr = ({ y, m, d }: Ymd, hour: number) => new Date(Date.UTC(y, m - 1, d, hour - TR_OFFSET));
const trYmd = (date: Date): Ymd => {
  const t = new Date(date.getTime() + TR_OFFSET * 3600000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", ...opts }).format(date);
const clock = (date: Date) => fmt(date, { hour: "2-digit", minute: "2-digit" });

/** Ay'ın görünür olması için merkezinin yer merkezli yüksekliği bu eşiği geçmeli (moonRiseSet ile aynı). */
function visibleAt(date: Date, lat: number, lon: number) {
  const { altitude, azimuth, parallax } = moonHorizontal(date, lat, lon);
  const up = altitude > 0.7275 * parallax - 0.5667;
  // Gözlemcinin gördüğü yükseklik: yer merkezli yükseklikten paralaks düşülür.
  const apparent = altitude - parallax * Math.cos((altitude * Math.PI) / 180);
  return { up, apparent: Math.max(0, apparent), azimuth };
}

export default function MoonObservationChart({ cities, defaultCity, initialNow }: { cities: ChartCity[]; defaultCity: string; initialNow: number }) {
  const [start, setStart] = useState(() => ymdKey(trYmd(new Date(initialNow))));
  const [hour, setHour] = useState(21);
  const [cityId, setCityId] = useState(defaultCity);
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search);
      const s = q.get("baslangic");
      setStart(s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : ymdKey(trYmd(new Date())));
      const c = q.get("sehir");
      if (c && cities.some((x) => x.id === c)) setCityId(c);
    });
    return () => cancelAnimationFrame(frame);
  }, [cities]);

  const setParam = (key: string, value: string | null) => {
    try {
      const url = new URL(window.location.href);
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
      window.history.replaceState(null, "", url);
    } catch {
      // adres güncellenemezse seçim yine de çalışır
    }
  };

  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const [sy, sm, sd] = start.split("-").map(Number);
  const startYmd: Ymd = { y: sy, m: sm, d: sd };
  const valid = sy >= 1900 && sy <= 2100 && !Number.isNaN(atTr(startYmd, 12).getTime());

  const first = atTr(startYmd, 0).getTime();
  const events = valid ? moonPhasesBetween(new Date(first - DAY), new Date(first + (DAYS + 1) * DAY)) : [];
  const rows = valid
    ? Array.from({ length: DAYS }, (_, i) => {
        const ymd = trYmd(new Date(first + i * DAY + 12 * 3600000));
        const at = atTr(ymd, hour);
        const s = moonState(at);
        const main = events.find((e) => ymdKey(trYmd(e.date)) === ymdKey(ymd));
        const sky = visibleAt(at, city.lat, city.lon);
        // Ufkun altındaysa gözlem saatinin 12 saat öncesi ile sonrası arasında: battıysa batış, doğacaksa doğuş.
        let below: { kind: "set" | "rise"; at: Date } | null = null;
        if (!sky.up) {
          const ev = moonEventsForDay(new Date(at.getTime() - DAY / 2), city.lat, city.lon);
          if (ev.rise && ev.rise > at) below = { kind: "rise", at: ev.rise };
          else if (ev.set && ev.set <= at) below = { kind: "set", at: ev.set };
        }
        return { i, ymd, at, s, name: phaseName(s.age) as PhaseName, main, sky, below };
      })
    : [];
  const visibleDays = rows.filter((r) => r.sky.up).length;
  const fulls = events.filter((e) => e.kind === "full" && e.date.getTime() >= first && e.date.getTime() < first + DAYS * DAY);
  const news = events.filter((e) => e.kind === "new" && e.date.getTime() >= first && e.date.getTime() < first + DAYS * DAY);
  const range = rows.length ? `${fmt(rows[0].at, { day: "numeric", month: "long" })} – ${fmt(rows[rows.length - 1].at, { day: "numeric", month: "long", year: "numeric" })}` : "";

  return (
    <div className="moon-chart">
      <div className="date-calc moon-chart-controls">
        <div className="date-calc-input">
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Başlangıç günü</span>
              <input
                type="date"
                value={start}
                min="1900-01-01"
                max="2100-12-31"
                onChange={(e) => {
                  setStart(e.target.value);
                  setParam("baslangic", e.target.value || null);
                }}
              />
            </label>
            <label className="date-calc-field">
              <span>Gözlem saati</span>
              <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {pad(h)}:00
                  </option>
                ))}
              </select>
            </label>
            <label className="date-calc-field">
              <span>Gözlem yeri</span>
              <select
                value={city.id}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setParam("sehir", e.target.value);
                }}
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="moon-chart-actions">
            <label className="moon-chart-toggle">
              <input type="checkbox" checked={blank} onChange={(e) => setBlank(e.target.checked)} /> Boş çizelge (çizim için)
            </label>
            <button type="button" className="time-tool-button" onClick={() => window.print()}>
              🖨️ Yazdır
            </button>
          </div>
        </div>
        {valid && (
          <p className="moon-chart-summary">
            {range} arasında saat {rows.length ? atClock(rows[0].at) : ""} {trAblative(city.name)} bakıldığında Ay{" "}
            <strong>
              {DAYS} günün {visibleDays}
            </strong>{" "}
            gününde ufkun üstündedir.
            {fulls.map((e) => ` Dolunay: ${fmt(e.date, { day: "numeric", month: "long", weekday: "long" })} ${clock(e.date)}.`).join("")}
            {news.map((e) => ` Yeni ay: ${fmt(e.date, { day: "numeric", month: "long", weekday: "long" })} ${clock(e.date)}.`).join("")}
          </p>
        )}
      </div>

      {valid && (
        <section className="moon-chart-sheet" aria-label="Ay gözlem çizelgesi">
          <header className="moon-chart-sheet-head">
            <strong>Ay Gözlem Çizelgesi</strong>
            <span>
              {range} · saat {pad(hour)}:00 · {city.name}
            </span>
            <span className="moon-chart-sheet-fields">Ad Soyad: ______________________ Sınıf: ______ No: ______</span>
          </header>
          <ol className={`moon-chart-grid${blank ? " is-blank" : ""}`}>
            {rows.map((r) => (
              <li key={ymdKey(r.ymd)} className={`moon-chart-day${r.main && !blank ? " is-main" : ""}`}>
                <b>{r.i + 1}. gün</b>
                <span className="moon-chart-date">{fmt(r.at, { day: "numeric", month: "short", weekday: "short" })}</span>
                {blank ? (
                  <span className="moon-chart-empty" aria-hidden="true" />
                ) : (
                  <>
                    <MoonIcon fraction={r.main ? KIND_FRACTION[r.main.kind] : r.s.fraction} size={46} />
                    <span className="moon-chart-name">{NAMES[r.main ? r.main.kind : r.name]}</span>
                    <small>%{Math.round(r.s.illumination * 100)} aydınlık</small>
                    <small className={r.sky.up ? "moon-chart-sky" : "moon-chart-sky is-down"}>
                      {r.sky.up
                        ? `${compassPoint(r.sky.azimuth, "tr")}, ${Math.round(r.sky.apparent)}°`
                        : r.below
                          ? `ufkun altında, ${atClock(r.below.at)} ${r.below.kind === "rise" ? "doğar" : "battı"}`
                          : "ufkun altında"}
                    </small>
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="moon-chart-foot">
            Evreler ve konumlar birimceviri.app/ay-gozlem-cizelgesi ile hesaplanmıştır. Yön ve yükseklik (°) Ay&apos;ın gözlem saatinde
            ufkun neresinde olduğunu gösterir; 10° yaklaşık yumruk genişliğidir.
          </p>
        </section>
      )}
    </div>
  );
}

const NAMES: Record<PhaseName | PhaseKind, string> = {
  new: "Yeni ay",
  "waxing-crescent": "Büyüyen hilal",
  first: "İlk dördün",
  "waxing-gibbous": "Büyüyen şişkin ay",
  full: "Dolunay",
  "waning-gibbous": "Küçülen şişkin ay",
  last: "Son dördün",
  "waning-crescent": "Küçülen hilal",
};
