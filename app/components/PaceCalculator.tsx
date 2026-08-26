"use client";

import { useMemo, useState } from "react";
import {
  calculateDistanceFromDurationPace,
  calculateDurationFromDistancePace,
  calculatePaceFromDistanceDuration,
  type PaceCalculationMode,
  type PaceCalculatorResult,
} from "../converter/paceCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return 0;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatPace(secondsPerKm: number) {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")} dk/km`;
}

export default function PaceCalculator() {
  const [mode, setMode] = useState<PaceCalculationMode>("pace");

  const [distanceKm, setDistanceKm] = useState("10");
  const [durationHours, setDurationHours] = useState("0");
  const [durationMinutes, setDurationMinutes] = useState("50");
  const [durationSecondsInput, setDurationSecondsInput] = useState("0");
  const [paceMinutes, setPaceMinutes] = useState("5");
  const [paceSecondsInput, setPaceSecondsInput] = useState("0");

  const distance = parseNumericValue(distanceKm);
  const durationSeconds =
    parseNumericValue(durationHours) * 3600 +
    parseNumericValue(durationMinutes) * 60 +
    parseNumericValue(durationSecondsInput);
  const paceSecondsPerKm =
    parseNumericValue(paceMinutes) * 60 + parseNumericValue(paceSecondsInput);

  const result: PaceCalculatorResult | null = useMemo(() => {
    if (mode === "pace") {
      return calculatePaceFromDistanceDuration(distance, durationSeconds);
    }

    if (mode === "duration") {
      return calculateDurationFromDistancePace(distance, paceSecondsPerKm);
    }

    return calculateDistanceFromDurationPace(durationSeconds, paceSecondsPerKm);
  }, [mode, distance, durationSeconds, paceSecondsPerKm]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Ne hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "pace" ? " is-active" : ""}`}
              onClick={() => setMode("pace")}
            >
              Tempo Hesapla
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "duration" ? " is-active" : ""}`}
              onClick={() => setMode("duration")}
            >
              Süre Hesapla
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "distance" ? " is-active" : ""}`}
              onClick={() => setMode("distance")}
            >
              Mesafe Hesapla
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {mode !== "distance" && (
            <label className="category-general-converter-field">
              <span>Mesafe (km)</span>
              <input
                inputMode="decimal"
                type="text"
                value={distanceKm}
                onChange={(event) => setDistanceKm(event.target.value)}
              />
            </label>
          )}

          {mode !== "duration" && (
            <>
              <label className="category-general-converter-field">
                <span>Süre — Saat</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={durationHours}
                  onChange={(event) => setDurationHours(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Süre — Dakika</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Süre — Saniye</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={durationSecondsInput}
                  onChange={(event) => setDurationSecondsInput(event.target.value)}
                />
              </label>
            </>
          )}

          {mode !== "pace" && (
            <>
              <label className="category-general-converter-field">
                <span>Tempo — Dakika/km</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={paceMinutes}
                  onChange={(event) => setPaceMinutes(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Tempo — Saniye/km</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={paceSecondsInput}
                  onChange={(event) => setPaceSecondsInput(event.target.value)}
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {mode === "pace" && (
                <>
                  Tempo: <strong>{formatPace(result.paceSecondsPerKm)}</strong>
                </>
              )}
              {mode === "duration" && (
                <>
                  Süre: <strong>{formatDuration(result.durationSeconds)}</strong>
                </>
              )}
              {mode === "distance" && (
                <>
                  Mesafe:{" "}
                  <strong>
                    {result.distanceKm.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} km
                  </strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Tempo</span>
                <strong>{formatPace(result.paceSecondsPerKm)}</strong>
              </div>
              <div>
                <span>Hız</span>
                <strong>
                  {result.speedKmh.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} km/sa
                </strong>
              </div>
              <div>
                <span>Mesafe</span>
                <strong>
                  {result.distanceKm.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} km
                </strong>
              </div>
            </div>

            <ul className="sleep-calculator-list">
              {result.raceEstimates.map((race) => (
                <li className="sleep-calculator-row" key={race.label}>
                  <span className="sleep-calculator-time">
                    {formatDuration(race.durationSeconds)}
                  </span>
                  <span className="sleep-calculator-detail">
                    {race.label} ({race.distanceKm.toLocaleString("tr-TR")} km) tahmini süre
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
