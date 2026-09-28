"use client";

import { useEffect, useMemo, useState } from "react";
import { equationOfTimeMinutes } from "../../converter/time/solar";
import { worldCities } from "../../converter/time/worldCities";
import { zoneOffsetMinutes } from "../world/useSecondNow";

// Ingilizce gunes saati hesaplayicisi: ortalama gunes zamani (LMT), zaman denklemi ve gercek gunes zamani.

const pad = (n: number) => String(n).padStart(2, "0");
const sortedCities = [...worldCities].sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));

function clock(minutes: number) {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

function clockSeconds(minutes: number) {
  const s = ((Math.round(minutes * 60) % 86400) + 86400) % 86400;
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function span(minutes: number) {
  const total = Math.round(Math.abs(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function signedMinSec(minutes: number) {
  const s = Math.round(Math.abs(minutes) * 60);
  return `${minutes < 0 ? "−" : "+"}${Math.floor(s / 60)} min ${pad(s % 60)} s`;
}

function lonText(lon: number) {
  return `${Math.abs(lon).toLocaleString("en-US", { maximumFractionDigits: 3 })}° ${lon >= 0 ? "E" : "W"}`;
}

/** Saat dilimindeki duvar saatine karsilik gelen UTC ofseti (dakika). */
function offsetAt(timeZone: string, y: number, mo: number, d: number, minutes: number) {
  const guess = Date.UTC(y, mo - 1, d) + minutes * 60000;
  const first = zoneOffsetMinutes(timeZone, new Date(guess));
  return zoneOffsetMinutes(timeZone, new Date(guess - first * 60000));
}

export default function SolarTimeCalculator() {
  const [source, setSource] = useState<"city" | "custom">("city");
  const [cityId, setCityId] = useState("new-york");
  const [lonInput, setLonInput] = useState("-87.63");
  const [zone, setZone] = useState("America/Chicago");
  const [date, setDate] = useState("2026-06-21");
  const [time, setTime] = useState("12:00");
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const now = new Date();
      setDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setZone(tz);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const city = worldCities.find((c) => c.en === cityId)!;
  const lon = source === "city" ? city.lon : Number(lonInput.replace(",", "."));
  const timeZone = source === "city" ? city.timeZone : zone;

  const result = useMemo(() => {
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    if (![y, mo, d, h, mi].every(Number.isFinite) || !Number.isFinite(lon) || Math.abs(lon) > 180) return null;
    const clockMin = h * 60 + mi;
    let offset = 0;
    try {
      offset = offsetAt(timeZone, y, mo, d, clockMin);
    } catch {
      return null;
    }
    const utc = clockMin - offset;
    const eot = equationOfTimeMinutes(y, mo, d);
    const lmt = utc + lon * 4;
    const apparent = lmt + eot;
    // Gunes ogleni (duvar saati): 12:00 gercek gunes zamani
    const noonClock = 720 - lon * 4 - eot + offset;
    // Standart saat: Ocak ve Temmuz ofsetlerinin kucugu (yaz saati her zaman ileri alir)
    const standard = Math.min(zoneOffsetMinutes(timeZone, new Date(Date.UTC(y, 0, 1))), zoneOffsetMinutes(timeZone, new Date(Date.UTC(y, 6, 1))));
    const meridian = standard / 4;
    return { offset, utc, eot, lmt, apparent, noonClock, meridian, dst: offset - standard, lonGap: lon - meridian, sunVsClock: apparent - clockMin };
  }, [date, time, lon, timeZone]);

  const locate = () => {
    if (!navigator.geolocation) {
      setGeoError("Your browser does not support geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSource("custom");
        setLonInput(pos.coords.longitude.toFixed(4));
        setZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
        setGeoError("");
      },
      () => setGeoError("Location permission was denied."),
      { maximumAge: 600000, timeout: 10000 }
    );
  };

  const offsetLabel = (m: number) => `UTC${m >= 0 ? "+" : "−"}${Math.floor(Math.abs(m) / 60)}${Math.abs(m) % 60 ? `:${pad(Math.abs(m) % 60)}` : ""}`;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {[
            { id: "city" as const, label: "Choose a city" },
            { id: "custom" as const, label: "Enter longitude" },
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={source === m.id} className={source === m.id ? "is-active" : undefined} onClick={() => setSource(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          {source === "city" ? (
            <label className="date-calc-field">
              <span>City</span>
              <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
                {sortedCities.map((c) => (
                  <option key={c.en} value={c.en}>
                    {c.nameEn} ({c.countryEn})
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <>
              <label className="date-calc-field">
                <span>Longitude (east +, west −)</span>
                <input inputMode="decimal" value={lonInput} onChange={(event) => setLonInput(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>Time zone</span>
                <select value={zone} onChange={(event) => setZone(event.target.value)}>
                  {[...new Set([zone, ...worldCities.map((c) => c.timeZone)])].sort().map((z) => (
                    <option key={z} value={z}>
                      {z.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          <label className="date-calc-field">
            <span>Date</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Clock time</span>
            <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </label>
        </div>
        <div className="date-calc-checks">
          <button type="button" className="date-calc-geo" onClick={locate}>
            📍 Use my location
          </button>
          {geoError && <span>{geoError}</span>}
        </div>
      </div>

      {result ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Apparent (true) solar time</span>
              <strong>{clockSeconds(result.apparent)}</strong>
              <em>What a sundial would show</em>
            </div>
            <div className="date-calc-stat">
              <span>Local mean time</span>
              <strong>{clockSeconds(result.lmt)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Equation of time</span>
              <strong>{signedMinSec(result.eot)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Solar noon (clock time)</span>
              <strong>{clock(result.noonClock)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Sun vs. your clock</span>
              <strong>{Math.abs(result.sunVsClock) < 0.5 ? "In step" : `${span(result.sunVsClock)} ${result.sunVsClock > 0 ? "ahead" : "behind"}`}</strong>
            </div>
          </div>
          <ol className="calc-steps">
            <li>
              Clock time {time} at {offsetLabel(result.offset)} = {clock(result.utc)} UTC.
            </li>
            <li>
              Longitude {lonText(lon)} × 4 min/degree = {signedMinSec(lon * 4).replace(" 00 s", "")}. Local mean time = {clock(result.utc)} {lon >= 0 ? "+" : "−"}{" "}
              {span(lon * 4)} = {clockSeconds(result.lmt)}.
            </li>
            <li>
              Equation of time on {date} = {signedMinSec(result.eot)}. Apparent solar time = {clockSeconds(result.lmt)} {result.eot >= 0 ? "+" : "−"}{" "}
              {signedMinSec(result.eot).slice(1)} = {clockSeconds(result.apparent)}.
            </li>
            <li>
              The time zone&apos;s reference meridian is {lonText(result.meridian)}; you are {Math.abs(result.lonGap).toLocaleString("en-US", { maximumFractionDigits: 2 })}°{" "}
              {result.lonGap >= 0 ? "east" : "west"} of it ({span(result.lonGap * 4)})
              {result.dst ? ` and daylight saving time moves the clock ${span(result.dst)} ahead` : ""}. Together with the equation of time, the Sun reaches its
              highest point at {clock(result.noonClock)} instead of 12:00.
            </li>
          </ol>
        </>
      ) : (
        <p className="date-calc-note">Enter a longitude between −180 and 180, a date and a time.</p>
      )}
    </div>
  );
}
