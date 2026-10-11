"use client";

import { useEffect, useState } from "react";
import { naturalEarthOutline, naturalEarthPath, projectNaturalEarth as project } from "../../converter/geo/naturalEarth";

export type DayNightCity = { name: string; lat: number; lon: number; timeZone: string };

/** Güneşin tam tepede olduğu nokta (yaklaşık; NOAA sadeleştirilmiş formülü, ±0,5°). */
function subsolarPoint(at: Date) {
  const start = Date.UTC(at.getUTCFullYear(), 0, 1);
  const dayOfYear = (at.getTime() - start) / 86400000;
  const gamma = ((2 * Math.PI) / 365) * dayOfYear;
  const decl =
    0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);
  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const utcMinutes = at.getUTCHours() * 60 + at.getUTCMinutes() + at.getUTCSeconds() / 60;
  let lon = -(utcMinutes + eqTime - 720) / 4;
  lon = ((lon + 540) % 360) - 180;
  return { lat: (decl * 180) / Math.PI, lon };
}

/** Gece tarafını kaplayan çokgen (harita koordinatlarında). */
function nightPath(at: Date) {
  const sun = subsolarPoint(at);
  const decl = (sun.lat * Math.PI) / 180;
  const tanDecl = Math.abs(Math.tan(decl)) < 1e-6 ? 1e-6 : Math.tan(decl);
  const pts: Array<[number, number]> = [];
  for (let lon = -180; lon <= 180; lon += 2) {
    const h = ((lon - sun.lon) * Math.PI) / 180;
    const lat = (Math.atan(-Math.cos(h) / tanDecl) * 180) / Math.PI;
    pts.push(project(lon, lat));
  }
  // Kuzey yaz döneminde güney kutbu gecededir, kışın kuzey kutbu.
  const pole = sun.lat > 0 ? -90 : 90;
  for (let lon = 180; lon >= -180; lon -= 5) pts.push(project(lon, pole));
  return { d: naturalEarthPath(pts), sun };
}

function isDay(city: DayNightCity, sun: { lat: number; lon: number }) {
  const r = Math.PI / 180;
  const cosZ = Math.sin(city.lat * r) * Math.sin(sun.lat * r) + Math.cos(city.lat * r) * Math.cos(sun.lat * r) * Math.cos((city.lon - sun.lon) * r);
  return cosZ > -0.0145; // güneş ufkun 0,83° altına kadar (gün doğumu/batımı tanımı)
}

const OUTLINE = naturalEarthOutline();

/** Sunucuda çizilen dünya haritasının üstüne canlı gece-gündüz katmanı ve şehir noktaları. */
export default function DayNightOverlay({ cities, intlLocale, dayLabel, nightLabel }: { cities: DayNightCity[]; intlLocale: string; dayLabel: string; nightLabel: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;
  const { d, sun } = nightPath(now);
  const [sx, sy] = project(sun.lon, sun.lat);

  return (
    <svg className="daynight-overlay" viewBox="0 0 1000 520" aria-hidden="true">
      <defs>
        <clipPath id="daynight-sphere">
          <path d={OUTLINE} />
        </clipPath>
      </defs>
      <path d={d} className="daynight-night" clipPath="url(#daynight-sphere)" />
      <circle cx={sx} cy={sy} r={9} className="daynight-sun" />
      {cities.map((city) => {
        const [x, y] = project(city.lon, city.lat);
        const day = isDay(city, sun);
        const time = new Intl.DateTimeFormat(intlLocale, { timeZone: city.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
        return (
          <g key={city.name} className={day ? "daynight-city is-day" : "daynight-city is-night"}>
            <circle cx={x} cy={y} r={3.2} />
            <text x={x + 5} y={y - 4}>
              {city.name} {time}
            </text>
            <title>
              {city.name}: {time} ({day ? dayLabel : nightLabel})
            </title>
          </g>
        );
      })}
    </svg>
  );
}
