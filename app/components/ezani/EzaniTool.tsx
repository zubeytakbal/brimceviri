"use client";

import { useEffect, useState } from "react";
import { fromEzani, sunsetMs, toEzani } from "../../converter/time/ezani";
import { trClock } from "../../converter/time/sunYear";

export type EzaniCity = { id: string; name: string; lat: number; lon: number };

const TR_OFFSET_MS = 3 * 3600000;
const pad = (n: number) => String(n).padStart(2, "0");
const todayTr = () => {
  const d = new Date(Date.now() + TR_OFFSET_MS);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};
const nowTr = () => {
  const d = new Date(Date.now() + TR_OFFSET_MS);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};

export default function EzaniTool({ cities, defaultCity }: { cities: EzaniCity[]; defaultCity: string }) {
  const [mode, setMode] = useState<"toEzani" | "fromEzani">("toEzani");
  const [cityId, setCityId] = useState(defaultCity);
  const [date, setDate] = useState("2026-01-01");
  const [time, setTime] = useState("21:00");
  const [eh, setEh] = useState(3);
  const [em, setEm] = useState(0);
  const [half, setHalf] = useState<"gece" | "gunduz">("gece");

  useEffect(() => {
    const f = requestAnimationFrame(() => {
      setDate(todayTr());
      setTime(nowTr());
    });
    return () => cancelAnimationFrame(f);
  }, []);

  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const [y, m, d] = date.split("-").map(Number);
  const valid = y >= 1900 && y <= 2100 && m >= 1 && d >= 1;
  const sunset = valid ? sunsetMs(y, m, d, city.lat, city.lon) : null;

  let main = "—";
  let note = "";
  if (valid && mode === "toEzani") {
    const [hh, mm] = time.split(":").map(Number);
    const instant = Date.UTC(y, m - 1, d, hh, mm) - TR_OFFSET_MS;
    const e = Number.isFinite(instant) ? toEzani(instant, city.lat, city.lon) : null;
    if (e) {
      main = `Ezani ${e.hour12}:${pad(e.minute)}`;
      note = `${e.half === "gece" ? "Akşamdan sonraki 12 saat" : "Sabahtan akşama 12 saat"} · son gün batımı ${trClock(new Date(e.sunsetUsed))}, ondan bu yana ${Math.floor(e.elapsedMinutes / 60)} saat ${e.elapsedMinutes % 60} dakika`;
    }
  } else if (valid) {
    const ms = fromEzani(y, m, d, eh, em, half, city.lat, city.lon);
    if (ms !== null) {
      const local = new Date(ms + TR_OFFSET_MS);
      main = `${trClock(new Date(ms))}`;
      note = `${local.getUTCDate()}.${pad(local.getUTCMonth() + 1)}.${local.getUTCFullYear()} · ${date.split("-").reverse().join(".")} akşamı gün batımı ${sunset ? trClock(new Date(sunset)) : "—"} = ezani 12:00`;
    }
  }

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "toEzani"} onClick={() => setMode("toEzani")}>
            Normal saat → Ezani
          </button>
          <button type="button" aria-pressed={mode === "fromEzani"} onClick={() => setMode("fromEzani")}>
            Ezani → Normal saat
          </button>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>İl</span>
            <select value={city.id} onChange={(e) => setCityId(e.target.value)}>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Tarih</span>
            <input type="date" value={date} min="1900-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} />
          </label>
          {mode === "toEzani" ? (
            <label className="date-calc-field">
              <span>Saat (Türkiye saati)</span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          ) : (
            <>
              <label className="date-calc-field">
                <span>Ezani saat</span>
                <select value={eh} onChange={(e) => setEh(Number(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>
              <label className="date-calc-field">
                <span>Dakika</span>
                <select value={em} onChange={(e) => setEm(Number(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((mm) => (
                    <option key={mm} value={mm}>
                      {pad(mm)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="date-calc-field">
                <span>Dilim</span>
                <select value={half} onChange={(e) => setHalf(e.target.value as "gece" | "gunduz")}>
                  <option value="gece">Akşamdan sonra (gece)</option>
                  <option value="gunduz">Sabahtan sonra (gündüz)</option>
                </select>
              </label>
            </>
          )}
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>{mode === "toEzani" ? "Ezani saat" : "Türkiye saati"}</span>
          <strong>{main}</strong>
          <em>{note || "Geçerli bir tarih ve saat girin."}</em>
        </div>
        <div className="date-calc-stat">
          <span>{city.name} gün batımı</span>
          <strong>{sunset ? trClock(new Date(sunset)) : "—"}</strong>
          <em>Bu an ezani saatle 12:00&apos;dır</em>
        </div>
      </div>
    </div>
  );
}
