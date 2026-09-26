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
    cycleLabel: "dongu",
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
  fr: {
    modePrompt: "Que voulez-vous calculer ?",
    modeButtons: {
      "wake-to-bedtime": "Quand dois-je me coucher ?",
      "bedtime-to-wake": "Quand dois-je me réveiller ?",
    },
    timeLabel: {
      "wake-to-bedtime": "Heure de réveil souhaitée",
      "bedtime-to-wake": "Heure du coucher",
    },
    emptyState: "Saisissez une heure valide pour voir le résultat.",
    cycleLabel: "cycles",
    sleepLabel: "heures de sommeil",
    recommended: "Recommandé",
  },
  es: {
    modePrompt: "¿Qué quieres calcular?",
    modeButtons: {
      "wake-to-bedtime": "¿Cuándo debo dormir?",
      "bedtime-to-wake": "¿Cuándo debo despertarme?",
    },
    timeLabel: {
      "wake-to-bedtime": "Hora de despertar deseada",
      "bedtime-to-wake": "Hora de acostarse",
    },
    emptyState: "Introduce una hora válida para ver el resultado.",
    cycleLabel: "ciclos",
    sleepLabel: "horas de sueño",
    recommended: "Recomendado",
  },
  "es-419": {
    modePrompt: "¿Qué quieres calcular?",
    modeButtons: {
      "wake-to-bedtime": "¿Cuándo debo dormir?",
      "bedtime-to-wake": "¿Cuándo debo despertarme?",
    },
    timeLabel: {
      "wake-to-bedtime": "Hora de despertar deseada",
      "bedtime-to-wake": "Hora de acostarse",
    },
    emptyState: "Ingresa una hora válida para ver el resultado.",
    cycleLabel: "ciclos",
    sleepLabel: "horas de sueño",
    recommended: "Recomendado",
  },
  pt: {
    modePrompt: "O que você quer calcular?",
    modeButtons: {
      "wake-to-bedtime": "Quando devo dormir?",
      "bedtime-to-wake": "Quando devo acordar?",
    },
    timeLabel: {
      "wake-to-bedtime": "Horário desejado para acordar",
      "bedtime-to-wake": "Horário de dormir",
    },
    emptyState: "Digite um horário válido para ver o resultado.",
    cycleLabel: "ciclos",
    sleepLabel: "horas de sono",
    recommended: "Recomendado",
  },
  it: {
    modePrompt: "Cosa vuoi calcolare?",
    modeButtons: {
      "wake-to-bedtime": "Quando dovrei dormire?",
      "bedtime-to-wake": "Quando dovrei svegliarmi?",
    },
    timeLabel: {
      "wake-to-bedtime": "Orario di sveglia desiderato",
      "bedtime-to-wake": "Orario in cui vai a letto",
    },
    emptyState: "Inserisci un orario valido per vedere il risultato.",
    cycleLabel: "cicli",
    sleepLabel: "ore di sonno",
    recommended: "Consigliato",
  },
  nl: {
    modePrompt: "Wat wil je berekenen?",
    modeButtons: {
      "wake-to-bedtime": "Wanneer moet ik gaan slapen?",
      "bedtime-to-wake": "Wanneer moet ik wakker worden?",
    },
    timeLabel: {
      "wake-to-bedtime": "Gewenste wektijd",
      "bedtime-to-wake": "Bedtijd",
    },
    emptyState: "Voer een geldige tijd in om het resultaat te zien.",
    cycleLabel: "cycli",
    sleepLabel: "uur slaap",
    recommended: "Aanbevolen",
  },
  sv: {
    modePrompt: "Vad vill du beräkna?",
    modeButtons: {
      "wake-to-bedtime": "När ska jag somna?",
      "bedtime-to-wake": "När ska jag vakna?",
    },
    timeLabel: {
      "wake-to-bedtime": "Önskad uppvakningstid",
      "bedtime-to-wake": "Läggdags",
    },
    emptyState: "Ange en giltig tid för att se resultatet.",
    cycleLabel: "cykler",
    sleepLabel: "timmars sömn",
    recommended: "Rekommenderas",
  },
  no: {
    modePrompt: "Hva vil du beregne?",
    modeButtons: {
      "wake-to-bedtime": "Når bør jeg legge meg?",
      "bedtime-to-wake": "Når bør jeg våkne?",
    },
    timeLabel: {
      "wake-to-bedtime": "Ønsket tidspunkt å våkne",
      "bedtime-to-wake": "Leggetid",
    },
    emptyState: "Skriv inn et gyldig klokkeslett for å se resultatet.",
    cycleLabel: "sykluser",
    sleepLabel: "timer søvn",
    recommended: "Anbefalt",
  },
  da: {
    modePrompt: "Hvad vil du beregne?",
    modeButtons: {
      "wake-to-bedtime": "Hvornår skal jeg sove?",
      "bedtime-to-wake": "Hvornår skal jeg vågne?",
    },
    timeLabel: {
      "wake-to-bedtime": "Ønsket tidspunkt at vågne",
      "bedtime-to-wake": "Sengetid",
    },
    emptyState: "Indtast et gyldigt tidspunkt for at se resultatet.",
    cycleLabel: "cyklusser",
    sleepLabel: "timer søvn",
    recommended: "Anbefalet",
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
    modePrompt: "Nimani hisoblamoqchisiz?",
    modeButtons: {
      "wake-to-bedtime": "Soat nechada uxlashim kerak?",
      "bedtime-to-wake": "Soat nechada turishim kerak?",
    },
    timeLabel: {
      "wake-to-bedtime": "Xohlagan uyg'onish vaqti",
      "bedtime-to-wake": "Uxlash vaqti",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri vaqt kiriting.",
    cycleLabel: "sikl",
    sleepLabel: "soat uyqu",
    recommended: "Tavsiya etiladi",
  },
bn: {
    modePrompt: "আপনি কী হিসাব করতে চান?",
    modeButtons: {
      "wake-to-bedtime": "কখন ঘুমাতে যাব?",
      "bedtime-to-wake": "কখন ঘুম থেকে উঠব?",
    },
    timeLabel: {
      "wake-to-bedtime": "কাঙ্ক্ষিত ঘুম থেকে ওঠার সময়",
      "bedtime-to-wake": "ঘুমাতে যাওয়ার সময়",
    },
    emptyState: "ফলাফল দেখতে একটি সঠিক সময় লিখুন।",
    cycleLabel: "চক্র",
    sleepLabel: "ঘণ্টা ঘুম",
    recommended: "প্রস্তাবিত",
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
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
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
