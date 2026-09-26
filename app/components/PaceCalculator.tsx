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
  fr: {
    modePrompt: "Que voulez-vous calculer ?",
    modeButtons: {
      pace: "Calculer l'allure",
      duration: "Calculer le temps",
      distance: "Calculer la distance",
    },
    labels: {
      distance: "Distance (km)",
      durationHours: "Temps - heures",
      durationMinutes: "Temps - minutes",
      durationSeconds: "Temps - secondes",
      paceMinutes: "Allure - minutes/km",
      paceSeconds: "Allure - secondes/km",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
    resultLabels: {
      pace: "Allure",
      duration: "Temps",
      distance: "Distance",
      speed: "Vitesse",
      estimatedTime: "temps estimé",
    },
  },
  es: {
    modePrompt: "¿Qué quieres calcular?",
    modeButtons: {
      pace: "Calcular ritmo",
      duration: "Calcular tiempo",
      distance: "Calcular distancia",
    },
    labels: {
      distance: "Distancia (km)",
      durationHours: "Tiempo - horas",
      durationMinutes: "Tiempo - minutos",
      durationSeconds: "Tiempo - segundos",
      paceMinutes: "Ritmo - minutos/km",
      paceSeconds: "Ritmo - segundos/km",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      pace: "Ritmo",
      duration: "Tiempo",
      distance: "Distancia",
      speed: "Velocidad",
      estimatedTime: "tiempo estimado",
    },
  },
  "es-419": {
    modePrompt: "¿Qué quieres calcular?",
    modeButtons: {
      pace: "Calcular ritmo",
      duration: "Calcular tiempo",
      distance: "Calcular distancia",
    },
    labels: {
      distance: "Distancia (km)",
      durationHours: "Tiempo - horas",
      durationMinutes: "Tiempo - minutos",
      durationSeconds: "Tiempo - segundos",
      paceMinutes: "Ritmo - minutos/km",
      paceSeconds: "Ritmo - segundos/km",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
    resultLabels: {
      pace: "Ritmo",
      duration: "Tiempo",
      distance: "Distancia",
      speed: "Velocidad",
      estimatedTime: "tiempo estimado",
    },
  },
  pt: {
    modePrompt: "O que você quer calcular?",
    modeButtons: {
      pace: "Calcular pace",
      duration: "Calcular tempo",
      distance: "Calcular distância",
    },
    labels: {
      distance: "Distância (km)",
      durationHours: "Tempo - horas",
      durationMinutes: "Tempo - minutos",
      durationSeconds: "Tempo - segundos",
      paceMinutes: "Pace - minutos/km",
      paceSeconds: "Pace - segundos/km",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      pace: "Pace",
      duration: "Tempo",
      distance: "Distância",
      speed: "Velocidade",
      estimatedTime: "tempo estimado",
    },
  },
  it: {
    modePrompt: "Cosa vuoi calcolare?",
    modeButtons: {
      pace: "Calcola il passo",
      duration: "Calcola il tempo",
      distance: "Calcola la distanza",
    },
    labels: {
      distance: "Distanza (km)",
      durationHours: "Tempo - ore",
      durationMinutes: "Tempo - minuti",
      durationSeconds: "Tempo - secondi",
      paceMinutes: "Passo - minuti/km",
      paceSeconds: "Passo - secondi/km",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      pace: "Passo",
      duration: "Tempo",
      distance: "Distanza",
      speed: "Velocità",
      estimatedTime: "tempo stimato",
    },
  },
  nl: {
    modePrompt: "Wat wil je berekenen?",
    modeButtons: {
      pace: "Tempo berekenen",
      duration: "Tijd berekenen",
      distance: "Afstand berekenen",
    },
    labels: {
      distance: "Afstand (km)",
      durationHours: "Tijd - uren",
      durationMinutes: "Tijd - minuten",
      durationSeconds: "Tijd - seconden",
      paceMinutes: "Tempo - minuten/km",
      paceSeconds: "Tempo - seconden/km",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      pace: "Tempo",
      duration: "Tijd",
      distance: "Afstand",
      speed: "Snelheid",
      estimatedTime: "geschatte tijd",
    },
  },
  sv: {
    modePrompt: "Vad vill du beräkna?",
    modeButtons: {
      pace: "Beräkna tempo",
      duration: "Beräkna tid",
      distance: "Beräkna distans",
    },
    labels: {
      distance: "Distans (km)",
      durationHours: "Tid - timmar",
      durationMinutes: "Tid - minuter",
      durationSeconds: "Tid - sekunder",
      paceMinutes: "Tempo - minuter/km",
      paceSeconds: "Tempo - sekunder/km",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      pace: "Tempo",
      duration: "Tid",
      distance: "Distans",
      speed: "Hastighet",
      estimatedTime: "beräknad tid",
    },
  },
  no: {
    modePrompt: "Hva vil du beregne?",
    modeButtons: {
      pace: "Beregn tempo",
      duration: "Beregn tid",
      distance: "Beregn distanse",
    },
    labels: {
      distance: "Distanse (km)",
      durationHours: "Tid - timer",
      durationMinutes: "Tid - minutter",
      durationSeconds: "Tid - sekunder",
      paceMinutes: "Tempo - minutter/km",
      paceSeconds: "Tempo - sekunder/km",
    },
    emptyState: "Skriv inn gyldige verdier for å se resultatet.",
    resultLabels: {
      pace: "Tempo",
      duration: "Tid",
      distance: "Distanse",
      speed: "Fart",
      estimatedTime: "estimert tid",
    },
  },
  da: {
    modePrompt: "Hvad vil du beregne?",
    modeButtons: {
      pace: "Beregn tempo",
      duration: "Beregn tid",
      distance: "Beregn distance",
    },
    labels: {
      distance: "Distance (km)",
      durationHours: "Tid - timer",
      durationMinutes: "Tid - minutter",
      durationSeconds: "Tid - sekunder",
      paceMinutes: "Tempo - minutter/km",
      paceSeconds: "Tempo - sekunder/km",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      pace: "Tempo",
      duration: "Tid",
      distance: "Distance",
      speed: "Hastighed",
      estimatedTime: "anslået tid",
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
    modePrompt: "Nimani hisoblamoqchisiz?",
    modeButtons: {
      pace: "Tempni Hisoblash",
      duration: "Vaqtni Hisoblash",
      distance: "Masofani Hisoblash",
    },
    labels: {
      distance: "Masofa (km)",
      durationHours: "Vaqt - Soat",
      durationMinutes: "Vaqt - Daqiqa",
      durationSeconds: "Vaqt - Soniya",
      paceMinutes: "Temp - Daqiqa/km",
      paceSeconds: "Temp - Soniya/km",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
    resultLabels: {
      pace: "Temp",
      duration: "Vaqt",
      distance: "Masofa",
      speed: "Tezlik",
      estimatedTime: "taxminiy vaqt",
    },
  },
bn: {
    modePrompt: "আপনি কী হিসাব করতে চান?",
    modeButtons: {
      pace: "পেস হিসাব করুন",
      duration: "সময় হিসাব করুন",
      distance: "দূরত্ব হিসাব করুন",
    },
    labels: {
      distance: "দূরত্ব (km)",
      durationHours: "সময় - ঘণ্টা",
      durationMinutes: "সময় - মিনিট",
      durationSeconds: "সময় - সেকেন্ড",
      paceMinutes: "পেস - মিনিট/km",
      paceSeconds: "পেস - সেকেন্ড/km",
    },
    emptyState: "ফলাফল দেখতে সঠিক মান লিখুন।",
    resultLabels: {
      pace: "পেস",
      duration: "সময়",
      distance: "দূরত্ব",
      speed: "গতি",
      estimatedTime: "আনুমানিক সময়",
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
        : locale === "uz"
          ? "Yarim Marafon"
        : "Yarı Maraton";
  }

  if (race.distanceKm === 42.195) {
    return locale === "de"
      ? "Marathon"
      : locale === "ar"
        ? "ماراثون"
        : locale === "en"
          ? "Marathon"
          : locale === "uz"
            ? "Marafon"
          : "Maraton";
  }

  return race.label;
}

export default function PaceCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
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
