"use client";

import { useMemo, useState } from "react";
import {
  calculateSleepTimes,
  type SleepCalculationMode,
  type SleepCalculatorInput,
} from "../converter/sleepCalculator";

function formatHours(hours: number) {
  return hours.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

export default function SleepCalculator() {
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
          <span>Ne hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${
                mode === "wake-to-bedtime" ? " is-active" : ""
              }`}
              onClick={() => setMode("wake-to-bedtime")}
            >
              Kaçta yatmalıyım?
            </button>
            <button
              type="button"
              className={`engineering-target-button${
                mode === "bedtime-to-wake" ? " is-active" : ""
              }`}
              onClick={() => setMode("bedtime-to-wake")}
            >
              Kaçta kalkmalıyım?
            </button>
          </div>
        </div>

        <label className="category-general-converter-field">
          <span>
            {mode === "wake-to-bedtime"
              ? "Kalkmak istediğin saat"
              : "Yatacağın saat"}
          </span>
          <input
            type="time"
            value={timeOfDay}
            onChange={(event) => setTimeOfDay(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        {!result ? (
          <strong>Geçerli bir saat girerek sonucu görebilirsin.</strong>
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
                  {option.cycles} döngü — {formatHours(option.hours)} saat uyku
                  {option.recommended && (
                    <span className="sleep-calculator-badge">Önerilen</span>
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
