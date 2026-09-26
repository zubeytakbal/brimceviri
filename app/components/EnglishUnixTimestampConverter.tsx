"use client";

import { useEffect, useMemo, useState } from "react";
import EnglishModeToggle from "./EnglishModeToggle";

type Direction = "to-date" | "to-timestamp";

function detectUnit(value: number) {
  // 13-digit values are milliseconds (valid until the year 2286 in seconds).
  return Math.abs(value) >= 1e11 ? "milliseconds" : "seconds";
}

function toDateTimeLocalValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function EnglishUnixTimestampConverter() {
  const [direction, setDirection] = useState<Direction>("to-date");
  const [timestamp, setTimestamp] = useState("1700000000");
  const [dateTime, setDateTime] = useState("2024-01-01T12:00:00");
  const [now, setNow] = useState<number | null>(null);

  // The current time is only known in the browser; showing it after mount avoids a hydration mismatch.
  useEffect(() => {
    const tick = () => setNow(Math.floor(Date.now() / 1000));
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  const dateResult = useMemo(() => {
    const value = Number(timestamp.trim());
    if (!timestamp.trim() || !Number.isFinite(value)) return null;
    const unit = detectUnit(value);
    const date = new Date(unit === "milliseconds" ? value : value * 1000);
    if (Number.isNaN(date.getTime())) return null;
    return {
      unit,
      utc: date.toUTCString(),
      iso: date.toISOString(),
      local: date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "long" }),
    };
  }, [timestamp]);

  const timestampResult = useMemo(() => {
    const date = new Date(dateTime);
    if (!dateTime || Number.isNaN(date.getTime())) return null;
    return { seconds: Math.floor(date.getTime() / 1000), milliseconds: date.getTime(), iso: date.toISOString() };
  }, [dateTime]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<Direction>
          label="Convert"
          value={direction}
          onChange={setDirection}
          options={[
            { value: "to-date", label: "Timestamp → date" },
            { value: "to-timestamp", label: "Date → timestamp" },
          ]}
        />
        {direction === "to-date" ? (
          <label className="category-general-converter-field">
            <span>Unix timestamp (seconds or milliseconds)</span>
            <input inputMode="numeric" type="text" value={timestamp} onChange={(event) => setTimestamp(event.target.value)} />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>Date and time (your local time zone)</span>
            <input type="datetime-local" step="1" value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
          </label>
        )}
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className="engineering-target-button"
            onClick={() => {
              const current = new Date();
              setTimestamp(String(Math.floor(current.getTime() / 1000)));
              setDateTime(toDateTimeLocalValue(current));
            }}
          >
            Use current time
          </button>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {direction === "to-date" ? (
          dateResult ? (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Your local time</span>
                <strong>{dateResult.local}</strong>
              </div>
              <div>
                <span>UTC</span>
                <strong>{dateResult.utc}</strong>
              </div>
              <div>
                <span>ISO 8601</span>
                <strong>{dateResult.iso}</strong>
              </div>
              <div>
                <span>Detected unit</span>
                <strong>{dateResult.unit}</strong>
              </div>
            </div>
          ) : (
            <strong>Enter a numeric Unix timestamp.</strong>
          )
        ) : timestampResult ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Unix timestamp (seconds)</span>
              <strong>{timestampResult.seconds}</strong>
            </div>
            <div>
              <span>Milliseconds</span>
              <strong>{timestampResult.milliseconds}</strong>
            </div>
            <div>
              <span>ISO 8601 (UTC)</span>
              <strong>{timestampResult.iso}</strong>
            </div>
          </div>
        ) : (
          <strong>Choose a date and time.</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        Current Unix time: <strong>{now ?? "…"}</strong>
      </p>
    </div>
  );
}
