"use client";

import { useMemo, useState } from "react";
import { alarmCopy, AlarmStatus, useBrowserAlarm } from "./SleepAlarm";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateSleepTimes,
  type SleepCalculationMode,
} from "../converter/sleepCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
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
      "wake-to-bedtime": "Kaçta yatmalıyım?",
      "bedtime-to-wake": "Kaçta kalkmalıyım?",
    },
    timeLabel: {
      "wake-to-bedtime": "Kalkmak istediğin saat",
      "bedtime-to-wake": "Yatacağın saat",
    },
    emptyState: "Geçerli bir saat girerek sonucu görebilirsin.",
    cycleLabel: "döngü",
    sleepLabel: "saat uyku",
    recommended: "Önerilen",
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
    modePrompt: "Was möchten Sie berechnen?",
    modeButtons: {
      "wake-to-bedtime": "Wann sollte ich schlafen?",
      "bedtime-to-wake": "Wann sollte ich aufstehen?",
    },
    timeLabel: {
      "wake-to-bedtime": "Gewünschte Aufstehzeit",
      "bedtime-to-wake": "Schlafenszeit",
    },
    emptyState: "Geben Sie eine gültige Uhrzeit ein, um das Ergebnis zu sehen.",
    cycleLabel: "Zyklen",
    sleepLabel: "Stunden Schlaf",
    recommended: "Empfohlen",
  },
};

function formatHours(hours: number, locale: Locale) {
  return formatLocalizedNumber(hours, locale, { maximumFractionDigits: 1 });
}

// Yeni akis (tek odak): buyuk saat secici + "Kacta yatmaliyim?" ana dugmesi;
// "ya da" ile tek tikla "Simdi yatarsam kacta kalkmaliyim?".
const flowCopy: Record<string, {
  pickTitle: string;
  hour: string;
  minute: string;
  primary: string;
  or: string;
  nowTitle: string;
  nowButton: string;
  wakeIntro: (time: string) => string;
  nowIntro: (time: string) => string;
  placeholder: string;
  increase: string;
  decrease: string;
}> = {
  tr: {
    pickTitle: "Kaçta kalkmak istiyorsun?",
    hour: "Saat",
    minute: "Dakika",
    primary: "Kaçta yatmalıyım? Hesapla",
    or: "ya da",
    nowTitle: "Şimdi yatarsam…",
    nowButton: "Kaçta kalkmalıyım? Hesapla",
    wakeIntro: (time) => `Kalkış saati ${time} ise dinlenmiş uyanmak için bu saatlerden birinde yat:`,
    nowIntro: (time) => `Şimdi (${time}) yatarsan bu saatlerden birinde kalk:`,
    placeholder: "Kalkış saatini seçip hesapla ya da şimdi yatıyorsan alttaki düğmeye bas.",
    increase: "artır",
    decrease: "azalt",
  },
  en: {
    pickTitle: "What time do you want to wake up?",
    hour: "Hour",
    minute: "Minute",
    primary: "When should I go to bed?",
    or: "or",
    nowTitle: "If I go to bed now…",
    nowButton: "When should I wake up?",
    wakeIntro: (time) => `To wake up refreshed at ${time}, go to bed at one of these times:`,
    nowIntro: (time) => `Going to bed now (${time})? Wake up at one of these times:`,
    placeholder: "Pick a wake-up time and calculate, or tap the button below if you are going to bed now.",
    increase: "increase",
    decrease: "decrease",
  },
  de: {
    pickTitle: "Wann möchtest du aufstehen?",
    hour: "Stunde",
    minute: "Minute",
    primary: "Wann sollte ich schlafen gehen?",
    or: "oder",
    nowTitle: "Wenn ich jetzt schlafen gehe …",
    nowButton: "Wann sollte ich aufstehen?",
    wakeIntro: (time) => `Wenn du um ${time} Uhr ausgeruht aufwachen willst, geh zu einer dieser Zeiten ins Bett:`,
    nowIntro: (time) => `Du gehst jetzt (${time} Uhr) ins Bett? Steh zu einer dieser Zeiten auf:`,
    placeholder: "Wähle deine Aufstehzeit und berechne – oder tippe unten, wenn du jetzt schlafen gehst.",
    increase: "erhöhen",
    decrease: "verringern",
  },
};

const pad = (value: number) => String(value).padStart(2, "0");

function Stepper({
  label,
  value,
  onChange,
  max,
  step,
  increaseLabel,
  decreaseLabel,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  step: number;
  increaseLabel: string;
  decreaseLabel: string;
}) {
  const wrap = (next: number) => ((next % max) + max) % max;
  return (
    <div className="sleep-stepper">
      <span className="sleep-stepper-label">{label}</span>
      <button type="button" aria-label={`${label} ${increaseLabel}`} onClick={() => onChange(wrap(value + step))}>
        ▲
      </button>
      <output className="sleep-stepper-value" aria-live="polite">
        {pad(value)}
      </output>
      <button type="button" aria-label={`${label} ${decreaseLabel}`} onClick={() => onChange(wrap(value - step))}>
        ▼
      </button>
    </div>
  );
}

export default function SleepCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const flow = flowCopy[locale] ?? flowCopy.en;
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [request, setRequest] = useState<{ mode: SleepCalculationMode; timeOfDay: string } | null>(null);

  const result = useMemo(() => (request ? calculateSleepTimes(request) : null), [request]);
  const browserAlarm = useBrowserAlarm();
  const alarmText = alarmCopy[locale] ?? alarmCopy.en;
  const options = result
    ? request?.mode === "wake-to-bedtime"
      ? [...result.options].reverse()
      : result.options
    : [];

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card sleep-flow">
        <p className="sleep-flow-title">{flow.pickTitle}</p>
        <div className="sleep-time-picker">
          <Stepper
            label={flow.hour}
            value={hour}
            onChange={setHour}
            max={24}
            step={1}
            increaseLabel={flow.increase}
            decreaseLabel={flow.decrease}
          />
          <span className="sleep-time-colon" aria-hidden="true">
            :
          </span>
          <Stepper
            label={flow.minute}
            value={minute}
            onChange={setMinute}
            max={60}
            step={5}
            increaseLabel={flow.increase}
            decreaseLabel={flow.decrease}
          />
        </div>
        <button
          type="button"
          className="sleep-primary-button"
          onClick={() => setRequest({ mode: "wake-to-bedtime", timeOfDay: `${pad(hour)}:${pad(minute)}` })}
        >
          ☾ {flow.primary}
        </button>

        <div className="sleep-or" role="separator">
          <span>{flow.or}</span>
        </div>

        <p className="sleep-flow-title">{flow.nowTitle}</p>
        <button
          type="button"
          className="sleep-secondary-button"
          onClick={() => {
            const now = new Date();
            setRequest({ mode: "bedtime-to-wake", timeOfDay: `${pad(now.getHours())}:${pad(now.getMinutes())}` });
          }}
        >
          ☀ {flow.nowButton}
        </button>
      </div>

      <AlarmStatus
        copy={alarmText}
        alarm={browserAlarm.alarm}
        ringing={browserAlarm.ringing}
        onCancel={browserAlarm.cancel}
        onStop={browserAlarm.stop}
      />

      <div aria-live="polite" className="category-general-converter-result">
        {!request ? (
          <p className="sleep-result-intro">{flow.placeholder}</p>
        ) : !result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="sleep-result-intro">
              {request.mode === "wake-to-bedtime" ? flow.wakeIntro(request.timeOfDay) : flow.nowIntro(request.timeOfDay)}
            </p>
            {request.mode === "wake-to-bedtime" && (
              <button type="button" className="sleep-alarm-button" onClick={() => browserAlarm.set(request.timeOfDay)}>
                {alarmText.setFor(request.timeOfDay)}
              </button>
            )}
            <ul className="sleep-result-grid">
              {options.map((option) => (
                <li className={`sleep-result-card${option.recommended ? " is-recommended" : ""}`} key={option.cycles}>
                  <span className="sleep-result-time">{option.time}</span>
                  <span className="sleep-result-detail">
                    {option.cycles} {copy.cycleLabel} · {formatHours(option.hours, locale)} {copy.sleepLabel}
                  </span>
                  <span className="sleep-cycle-strip" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, index) => (
                      <span className={index < option.cycles ? "is-filled" : undefined} key={index} />
                    ))}
                  </span>
                  {option.recommended && <span className="sleep-calculator-badge">{copy.recommended}</span>}
                  {request.mode === "bedtime-to-wake" && (
                    <button type="button" className="sleep-alarm-button is-small" onClick={() => browserAlarm.set(option.time)}>
                      {alarmText.setFor(option.time)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
