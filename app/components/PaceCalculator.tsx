"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateDistanceFromDurationPace,
  calculateDurationFromDistancePace,
  calculatePaceFromDistanceDuration,
  type PaceCalculationMode,
  type PaceCalculatorResult,
  type RaceEstimate,
} from "../converter/paceCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    modePrompt: string;
    modeButtons: Record<PaceCalculationMode, string>;
    labels: {
      distance: string;
      durationHours: string;
      durationMinutes: string;
      durationSeconds: string;
      paceMinutes: string;
      paceSeconds: string;
    };
    emptyState: string;
    resultLabels: {
      pace: string;
      duration: string;
      distance: string;
      speed: string;
      estimatedTime: string;
    };
  }
> = {
  tr: {
    modePrompt: "Ne hesaplamak istiyorsun?",
    modeButtons: {
      pace: "Tempo Hesapla",
      duration: "Süre Hesapla",
      distance: "Mesafe Hesapla",
    },
    labels: {
      distance: "Mesafe (km)",
      durationHours: "Süre - Saat",
      durationMinutes: "Süre - Dakika",
      durationSeconds: "Süre - Saniye",
      paceMinutes: "Tempo - Dakika/km",
      paceSeconds: "Tempo - Saniye/km",
    },
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultLabels: {
      pace: "Tempo",
      duration: "Süre",
      distance: "Mesafe",
      speed: "Hız",
      estimatedTime: "tahmini süre",
    },
  },
  en: {
    modePrompt: "What do you want to calculate?",
    modeButtons: {
      pace: "Calculate Pace",
      duration: "Calculate Time",
      distance: "Calculate Distance",
    },
    labels: {
      distance: "Distance (km)",
      durationHours: "Time - Hours",
      durationMinutes: "Time - Minutes",
      durationSeconds: "Time - Seconds",
      paceMinutes: "Pace - Minutes/km",
      paceSeconds: "Pace - Seconds/km",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      pace: "Pace",
      duration: "Time",
      distance: "Distance",
      speed: "Speed",
      estimatedTime: "estimated time",
    },
  },
  de: {
    modePrompt: "Was möchten Sie berechnen?",
    modeButtons: {
      pace: "Tempo berechnen",
      duration: "Zeit berechnen",
      distance: "Distanz berechnen",
    },
    labels: {
      distance: "Distanz (km)",
      durationHours: "Zeit - Stunden",
      durationMinutes: "Zeit - Minuten",
      durationSeconds: "Zeit - Sekunden",
      paceMinutes: "Tempo - Minuten/km",
      paceSeconds: "Tempo - Sekunden/km",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      pace: "Tempo",
      duration: "Zeit",
      distance: "Distanz",
      speed: "Geschwindigkeit",
      estimatedTime: "geschätzte Zeit",
    },
  },
};

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

const MILE_KM = 1.609344;
type DistanceUnit = "km" | "mi";

function formatPace(secondsPerKm: number, unit: DistanceUnit = "km") {
  const perUnit = unit === "mi" ? secondsPerKm * MILE_KM : secondsPerKm;
  let minutes = Math.floor(perUnit / 60);
  let seconds = Math.round(perUnit % 60);
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")} min/${unit}`;
}

function getRaceLabel(race: RaceEstimate, locale: Locale) {
  if (race.distanceKm === 21.0975) {
    return locale === "de"
      ? "Halbmarathon"
      : locale === "en"
        ? "Half Marathon"
        : "Yarı Maraton";
  }

  if (race.distanceKm === 42.195) {
    return locale === "de"
      ? "Marathon"
      : locale === "en"
          ? "Marathon"
          : "Maraton";
  }

  return race.label;
}

export default function PaceCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const baseCopy = copyByLocale[locale];
  // Ingilizcede mil secenegi (ABD ve Ingiltere'de tempo dakika/mil ile verilir).
  const allowMiles = locale === "en";
  const [unit, setUnit] = useState<DistanceUnit>(allowMiles ? "mi" : "km");
  const copy =
    unit === "mi"
      ? {
          ...baseCopy,
          labels: {
            ...baseCopy.labels,
            distance: "Distance (miles)",
            paceMinutes: "Pace - Minutes/mile",
            paceSeconds: "Pace - Seconds/mile",
          },
        }
      : baseCopy;
  const unitFactor = unit === "mi" ? MILE_KM : 1;
  const [mode, setMode] = useState<PaceCalculationMode>("pace");
  const [distanceKm, setDistanceKm] = useState(allowMiles ? "3.1" : "10");
  const [durationHours, setDurationHours] = useState("0");
  const [durationMinutes, setDurationMinutes] = useState(allowMiles ? "30" : "50");
  const [durationSecondsInput, setDurationSecondsInput] = useState("0");
  const [paceMinutes, setPaceMinutes] = useState(allowMiles ? "9" : "5");
  const [paceSecondsInput, setPaceSecondsInput] = useState("0");

  // Hesaplar km uzerinden yapilir; mil secildiyse giris km'ye cevrilir.
  const distance = parseNumericValue(distanceKm) * unitFactor;
  const durationSeconds =
    parseNumericValue(durationHours) * 3600 +
    parseNumericValue(durationMinutes) * 60 +
    parseNumericValue(durationSecondsInput);
  const paceSecondsPerKm =
    (parseNumericValue(paceMinutes) * 60 + parseNumericValue(paceSecondsInput)) / unitFactor;

  // Birim degisince girilen mesafe ve tempo ayni anlami korusun diye cevrilir.
  const changeUnit = (next: DistanceUnit) => {
    if (next === unit) return;
    const factor = next === "mi" ? 1 / MILE_KM : MILE_KM;
    const d = parseNumericValue(distanceKm);
    if (Number.isFinite(d) && d > 0) setDistanceKm(String(Math.round(d * factor * 100) / 100));
    const paceTotal = parseNumericValue(paceMinutes) * 60 + parseNumericValue(paceSecondsInput);
    if (Number.isFinite(paceTotal) && paceTotal > 0) {
      const converted = Math.round(paceTotal / factor);
      setPaceMinutes(String(Math.floor(converted / 60)));
      setPaceSecondsInput(String(converted % 60));
    }
    setUnit(next);
  };

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
          <span>{copy.modePrompt}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "pace" ? " is-active" : ""}`}
              onClick={() => setMode("pace")}
            >
              {copy.modeButtons.pace}
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "duration" ? " is-active" : ""}`}
              onClick={() => setMode("duration")}
            >
              {copy.modeButtons.duration}
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "distance" ? " is-active" : ""}`}
              onClick={() => setMode("distance")}
            >
              {copy.modeButtons.distance}
            </button>
          </div>
        </div>

        {allowMiles && (
          <div className="engineering-targets">
            <span>Units</span>
            <div className="engineering-target-grid hydrostatic-target-grid">
              {(["mi", "km"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  className={`engineering-target-button${unit === u ? " is-active" : ""}`}
                  onClick={() => changeUnit(u)}
                >
                  {u === "mi" ? "Miles (min/mile)" : "Kilometers (min/km)"}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="paint-calculator-grid">
          {mode !== "distance" && (
            <label className="category-general-converter-field">
              <span>{copy.labels.distance}</span>
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
                <span>{copy.labels.durationHours}</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={durationHours}
                  onChange={(event) => setDurationHours(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.labels.durationMinutes}</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.labels.durationSeconds}</span>
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
                <span>{copy.labels.paceMinutes}</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={paceMinutes}
                  onChange={(event) => setPaceMinutes(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.labels.paceSeconds}</span>
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
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {mode === "pace" && (
                <>
                  {copy.resultLabels.pace}: <strong>{formatPace(result.paceSecondsPerKm, unit)}</strong>
                </>
              )}
              {mode === "duration" && (
                <>
                  {copy.resultLabels.duration}: <strong>{formatDuration(result.durationSeconds)}</strong>
                </>
              )}
              {mode === "distance" && (
                <>
                  {copy.resultLabels.distance}:{" "}
                  <strong>
                    {formatLocalizedNumber(result.distanceKm / unitFactor, locale, {
                      maximumFractionDigits: 2,
                    })} {unit}
                  </strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.pace}</span>
                <strong>{formatPace(result.paceSecondsPerKm, unit)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.speed}</span>
                <strong>
                  {formatLocalizedNumber(result.speedKmh / unitFactor, locale, {
                    maximumFractionDigits: 1,
                  })} {unit === "mi" ? "mph" : "km/h"}
                </strong>
              </div>
              <div>
                <span>{copy.resultLabels.distance}</span>
                <strong>
                  {formatLocalizedNumber(result.distanceKm / unitFactor, locale, {
                    maximumFractionDigits: 2,
                  })} {unit}
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
                    {getRaceLabel(race, locale)} (
                    {unit === "mi"
                      ? `${formatLocalizedNumber(race.distanceKm / MILE_KM, locale, { maximumFractionDigits: 1 })} mi`
                      : `${formatLocalizedNumber(race.distanceKm, locale, { maximumFractionDigits: 4 })} km`}
                    ) {copy.resultLabels.estimatedTime}
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
