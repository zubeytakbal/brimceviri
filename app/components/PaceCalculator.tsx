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
  Locale,
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
      duration: "Sure Hesapla",
      distance: "Mesafe Hesapla",
    },
    labels: {
      distance: "Mesafe (km)",
      durationHours: "Sure - Saat",
      durationMinutes: "Sure - Dakika",
      durationSeconds: "Sure - Saniye",
      paceMinutes: "Tempo - Dakika/km",
      paceSeconds: "Tempo - Saniye/km",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
    resultLabels: {
      pace: "Tempo",
      duration: "Sure",
      distance: "Mesafe",
      speed: "Hiz",
      estimatedTime: "tahmini sure",
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
    modePrompt: "Was moechten Sie berechnen?",
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
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      pace: "Tempo",
      duration: "Zeit",
      distance: "Distanz",
      speed: "Geschwindigkeit",
      estimatedTime: "geschaetzte Zeit",
    },
  },
  ar: {
    modePrompt: "ماذا تريد أن تحسب؟",
    modeButtons: {
      pace: "احسب الوتيرة",
      duration: "احسب الزمن",
      distance: "احسب المسافة",
    },
    labels: {
      distance: "المسافة (كم)",
      durationHours: "الزمن - ساعات",
      durationMinutes: "الزمن - دقائق",
      durationSeconds: "الزمن - ثوانٍ",
      paceMinutes: "الوتيرة - دقيقة/كم",
      paceSeconds: "الوتيرة - ثانية/كم",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      pace: "الوتيرة",
      duration: "الزمن",
      distance: "المسافة",
      speed: "السرعة",
      estimatedTime: "الزمن التقديري",
    },
  },
uz: {
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
bn: {
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

function formatPace(secondsPerKm: number, locale: Locale) {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  const suffix = locale === "de" ? "min/km" : "min/km";

  return `${minutes}:${String(seconds).padStart(2, "0")} ${suffix}`;
}

function getRaceLabel(race: RaceEstimate, locale: Locale) {
  if (race.distanceKm === 21.0975) {
    return locale === "de"
      ? "Halbmarathon"
      : locale === "ar"
        ? "نصف ماراثون"
      : locale === "en"
        ? "Half Marathon"
        : "Yari Maraton";
  }

  if (race.distanceKm === 42.195) {
    return locale === "de"
      ? "Marathon"
      : locale === "ar"
        ? "ماراثون"
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
  const copy = copyByLocale[locale];
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
                  {copy.resultLabels.pace}: <strong>{formatPace(result.paceSecondsPerKm, locale)}</strong>
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
                    {formatLocalizedNumber(result.distanceKm, locale, {
                      maximumFractionDigits: 2,
                    })} km
                  </strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.pace}</span>
                <strong>{formatPace(result.paceSecondsPerKm, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.speed}</span>
                <strong>
                  {formatLocalizedNumber(result.speedKmh, locale, {
                    maximumFractionDigits: 1,
                  })} km/h
                </strong>
              </div>
              <div>
                <span>{copy.resultLabels.distance}</span>
                <strong>
                  {formatLocalizedNumber(result.distanceKm, locale, {
                    maximumFractionDigits: 2,
                  })} km
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
                    {formatLocalizedNumber(race.distanceKm, locale, {
                      maximumFractionDigits: 4,
                    })} km) {copy.resultLabels.estimatedTime}
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
