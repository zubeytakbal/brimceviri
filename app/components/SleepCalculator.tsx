"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateSleepTimes,
  type SleepCalculationMode,
  type SleepCalculatorInput,
} from "../converter/sleepCalculator";

const copyByLocale: Record<
  Locale,
  {
    modePrompt: string;
    modeButtons: Record<SleepCalculationMode, string>;
    timeLabel: Record<SleepCalculationMode, string>;
    emptyState: string;
    cycleLabel: string;
    sleepLabel: string;
    recommended: string;
  }
> = {
  tr: {
    modePrompt: "Ne hesaplamak istiyorsun?",
    modeButtons: {
      "wake-to-bedtime": "Kacta yatmaliyim?",
      "bedtime-to-wake": "Kacta kalkmaliyim?",
    },
    timeLabel: {
      "wake-to-bedtime": "Kalkmak istedigin saat",
      "bedtime-to-wake": "Yatacagin saat",
    },
    emptyState: "Gecerli bir saat girerek sonucu gorebilirsin.",
    cycleLabel: "dongu",
    sleepLabel: "saat uyku",
    recommended: "Onerilen",
  },
  en: {
    modePrompt: "What do you want to calculate?",
    modeButtons: {
      "wake-to-bedtime": "When should I sleep?",
      "bedtime-to-wake": "When should I wake up?",
    },
    timeLabel: {
      "wake-to-bedtime": "Desired wake-up time",
      "bedtime-to-wake": "Bedtime",
    },
    emptyState: "Enter a valid time to see the result.",
    cycleLabel: "cycles",
    sleepLabel: "hours of sleep",
    recommended: "Recommended",
  },
  de: {
    modePrompt: "Was moechten Sie berechnen?",
    modeButtons: {
      "wake-to-bedtime": "Wann sollte ich schlafen?",
      "bedtime-to-wake": "Wann sollte ich aufstehen?",
    },
    timeLabel: {
      "wake-to-bedtime": "Gewuenschte Aufstehzeit",
      "bedtime-to-wake": "Schlafenszeit",
    },
    emptyState: "Geben Sie eine gueltige Uhrzeit ein, um das Ergebnis zu sehen.",
    cycleLabel: "Zyklen",
    sleepLabel: "Stunden Schlaf",
    recommended: "Empfohlen",
  },
  ar: {
    modePrompt: "ماذا تريد أن تحسب؟",
    modeButtons: {
      "wake-to-bedtime": "متى أنام؟",
      "bedtime-to-wake": "متى أستيقظ؟",
    },
    timeLabel: {
      "wake-to-bedtime": "وقت الاستيقاظ المطلوب",
      "bedtime-to-wake": "وقت النوم",
    },
    emptyState: "أدخل وقتًا صحيحًا لعرض النتيجة.",
    cycleLabel: "دورات",
    sleepLabel: "ساعات نوم",
    recommended: "موصى به",
  },
uz: {
    modePrompt: "What do you want to calculate?",
    modeButtons: {
      "wake-to-bedtime": "When should I sleep?",
      "bedtime-to-wake": "When should I wake up?",
    },
    timeLabel: {
      "wake-to-bedtime": "Desired wake-up time",
      "bedtime-to-wake": "Bedtime",
    },
    emptyState: "Enter a valid time to see the result.",
    cycleLabel: "cycles",
    sleepLabel: "hours of sleep",
    recommended: "Recommended",
  },
bn: {
    modePrompt: "What do you want to calculate?",
    modeButtons: {
      "wake-to-bedtime": "When should I sleep?",
      "bedtime-to-wake": "When should I wake up?",
    },
    timeLabel: {
      "wake-to-bedtime": "Desired wake-up time",
      "bedtime-to-wake": "Bedtime",
    },
    emptyState: "Enter a valid time to see the result.",
    cycleLabel: "cycles",
    sleepLabel: "hours of sleep",
    recommended: "Recommended",
  },
};

function formatHours(hours: number, locale: Locale) {
  return formatLocalizedNumber(hours, locale, { maximumFractionDigits: 1 });
}

export default function SleepCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [mode, setMode] = useState<SleepCalculationMode>("wake-to-bedtime");
  const [timeOfDay, setTimeOfDay] = useState("07:00");

  const input: SleepCalculatorInput = useMemo(
    () => ({ mode, timeOfDay }),
    [mode, timeOfDay]
  );

  const result = useMemo(() => calculateSleepTimes(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.modePrompt}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${
                mode === "wake-to-bedtime" ? " is-active" : ""
              }`}
              onClick={() => setMode("wake-to-bedtime")}
            >
              {copy.modeButtons["wake-to-bedtime"]}
            </button>
            <button
              type="button"
              className={`engineering-target-button${
                mode === "bedtime-to-wake" ? " is-active" : ""
              }`}
              onClick={() => setMode("bedtime-to-wake")}
            >
              {copy.modeButtons["bedtime-to-wake"]}
            </button>
          </div>
        </div>

        <label className="category-general-converter-field">
          <span>{copy.timeLabel[mode]}</span>
          <input
            type="time"
            value={timeOfDay}
            onChange={(event) => setTimeOfDay(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <ul className="sleep-calculator-list">
            {result.options.map((option) => (
              <li
                className={`sleep-calculator-row${
                  option.recommended ? " is-recommended" : ""
                }`}
                key={option.cycles}
              >
                <span className="sleep-calculator-time">{option.time}</span>
                <span className="sleep-calculator-detail">
                  {option.cycles} {copy.cycleLabel} - {formatHours(option.hours, locale)}{" "}
                  {copy.sleepLabel}
                  {option.recommended && (
                    <span className="sleep-calculator-badge">{copy.recommended}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
