"use client";

import { useEffect, useState } from "react";
import { planetNight, VISIBILITY_TR } from "../../converter/time/planets";

export type PlanetCity = { id: string; name: string; lat: number; lon: number };

const TR_OFFSET = 3 * 3600000;
const pad = (n: number) => String(n).padStart(2, "0");
const clock = (d: Date | null) => (d ? new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit" }).format(d) : "—");
const todayTr = () => {
  const d = new Date(Date.now() + TR_OFFSET);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};

export default function PlanetTool({ cities, defaultCity, initialDate }: { cities: PlanetCity[]; defaultCity: string; initialDate: string }) {
  const [cityId, setCityId] = useState(defaultCity);
  const [date, setDate] = useState(initialDate);
  useEffect(() => {
    const f = requestAnimationFrame(() => setDate(todayTr()));
    return () => cancelAnimationFrame(f);
  }, []);

  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const [y, m, d] = date.split("-").map(Number);
  const valid = y >= 1900 && y <= 2100 && m >= 1 && d >= 1;
  const night = valid ? planetNight(new Date(Date.UTC(y, m - 1, d) - TR_OFFSET), city.lat, city.lon) : null;
  const visible = night ? night.planets.filter((p) => p.visibility !== "none") : [];

  return (
    <div className="date-calc">
      <div className="date-calc-input">
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
            <span>Gece (tarih)</span>
            <input type="date" value={date} min="1900-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {night ? (
          <>
            <div className="date-calc-stat is-main">
              <span>Bu gece görünen gezegenler</span>
              <strong>{visible.length ? visible.map((p) => p.name).join(", ") : "Çıplak gözle görünen gezegen yok"}</strong>
              <em>
                {city.name} · gün batımı {clock(night.sunset)}, gün doğumu {clock(night.sunrise)}
              </em>
            </div>
            {night.planets.map((p) => (
              <div key={p.id} className="date-calc-stat">
                <span>{p.name}</span>
                <strong style={{ fontSize: "1.05rem" }}>{p.window ? `${clock(p.window.from)}–${clock(p.window.to)}` : "Görünmez"}</strong>
                <em>
                  {VISIBILITY_TR[p.visibility]}
                  {p.best ? ` · en yüksek ${clock(p.best.at)}, ${p.best.direction} ${Math.round(p.best.altitude)}°` : ""} · parlaklık {p.magnitude.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} · {p.constellation}
                </em>
              </div>
            ))}
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Bu gece görünen gezegenler</span>
            <strong>—</strong>
            <em>1900–2100 arasında geçerli bir tarih girin.</em>
          </div>
        )}
      </div>
    </div>
  );
}
