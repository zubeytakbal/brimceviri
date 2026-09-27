"use client";

import { useEffect, useMemo, useState } from "react";
import { lightWindows, sunTimes } from "../../converter/time/solar";

export type GoldenCity = { slug: string; name: string; lat: number; lon: number; timeZone: string };

export type GoldenCopy = {
  city: string;
  date: string;
  useLocation: string;
  myLocation: string;
  locationError: string;
  morningBlue: string;
  morningGolden: string;
  eveningGolden: string;
  eveningBlue: string;
  sunrise: string;
  sunset: string;
  dayLength: string;
  night: string;
  day: string;
  golden: string;
  blue: string;
  polar: string;
};

type Place = { name: string; lat: number; lon: number; timeZone: string };

const pad = (n: number) => String(n).padStart(2, "0");

// Altin saat / mavi saat hesaplayici: sehir ya da tarayici konumu, istenen tarih.
export default function GoldenHourTool({ cities, lang, copy, initialCity }: { cities: GoldenCity[]; lang: "tr" | "en"; copy: GoldenCopy; initialCity: string }) {
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const [slug, setSlug] = useState(initialCity);
  const [custom, setCustom] = useState<Place | null>(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const now = new Date();
      setDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const place: Place = custom ?? cities.find((c) => c.slug === slug) ?? cities[0];

  const locate = () => {
    setError("");
    if (!navigator.geolocation) {
      setError(copy.locationError);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCustom({
          name: copy.myLocation,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      () => setError(copy.locationError),
      { timeout: 10000 }
    );
  };

  const result = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { windows: lightWindows(y, m, d, place.lat, place.lon), sun: sunTimes(y, m, d, place.lat, place.lon) };
  }, [date, place.lat, place.lon]);

  const time = (value: Date) => new Intl.DateTimeFormat(locale, { timeZone: place.timeZone, hour: "2-digit", minute: "2-digit", hour12: lang === "en" }).format(value);
  const span = (pair: [Date, Date] | null) => (pair ? `${time(pair[0])} – ${time(pair[1])}` : "—");
  const minuteOfDay = (value: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: place.timeZone, hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(value);
    return Number(parts.find((p) => p.type === "hour")?.value) * 60 + Number(parts.find((p) => p.type === "minute")?.value);
  };

  // Gun seridi: 0-1440 dakika uzerinde gece / mavi / altin / gunduz dilimleri.
  const segments: Array<{ from: number; to: number; kind: "night" | "blue" | "golden" | "day" }> = [];
  if (result) {
    const w = result.windows;
    if (w.morningBlue && w.morningGolden && w.eveningGolden && w.eveningBlue) {
      const points = [w.morningBlue[0], w.morningBlue[1], w.morningGolden[1], w.eveningGolden[0], w.eveningGolden[1], w.eveningBlue[1]].map(minuteOfDay);
      const kinds: Array<"night" | "blue" | "golden" | "day"> = ["night", "blue", "golden", "day", "golden", "blue", "night"];
      const edges = [0, ...points, 1440];
      for (let i = 0; i < kinds.length; i += 1) if (edges[i + 1] > edges[i]) segments.push({ from: edges[i], to: edges[i + 1], kind: kinds[i] });
    }
  }

  return (
    <div className="golden-tool">
      <div className="golden-controls">
        <label>
          <span>{copy.city}</span>
          <select
            value={custom ? "__me" : slug}
            onChange={(event) => {
              if (event.target.value === "__me") return;
              setCustom(null);
              setSlug(event.target.value);
            }}
          >
            {custom && <option value="__me">{copy.myLocation}</option>}
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{copy.date}</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <button type="button" className="time-tool-button is-secondary" onClick={locate}>
          📍 {copy.useLocation}
        </button>
      </div>
      {error && <p className="golden-error">{error}</p>}

      {result && result.sun.kind === "normal" ? (
        <>
          <div className="golden-strip" aria-hidden="true">
            {segments.map((seg, index) => (
              <span key={index} className={`is-${seg.kind}`} style={{ left: `${(seg.from / 1440) * 100}%`, width: `${((seg.to - seg.from) / 1440) * 100}%` }} />
            ))}
            {[0, 6, 12, 18, 24].map((h) => (
              <i key={h} style={{ left: `${(h / 24) * 100}%` }}>
                {pad(h % 24)}
              </i>
            ))}
          </div>
          <div className="golden-cards">
            <div className="golden-card is-blue">
              <span>{copy.morningBlue}</span>
              <strong>{span(result.windows.morningBlue)}</strong>
            </div>
            <div className="golden-card is-golden">
              <span>{copy.morningGolden}</span>
              <strong>{span(result.windows.morningGolden)}</strong>
            </div>
            <div className="golden-card is-golden">
              <span>{copy.eveningGolden}</span>
              <strong>{span(result.windows.eveningGolden)}</strong>
            </div>
            <div className="golden-card is-blue">
              <span>{copy.eveningBlue}</span>
              <strong>{span(result.windows.eveningBlue)}</strong>
            </div>
          </div>
          <p className="golden-sun">
            ☀ {copy.sunrise}: <strong>{time(result.sun.sunrise)}</strong> · {copy.sunset}: <strong>{time(result.sun.sunset)}</strong> · {copy.dayLength}:{" "}
            <strong>
              {Math.floor(result.sun.dayLengthMinutes / 60)}:{pad(result.sun.dayLengthMinutes % 60)}
            </strong>
          </p>
        </>
      ) : result ? (
        <p className="golden-error">{copy.polar}</p>
      ) : null}
    </div>
  );
}
