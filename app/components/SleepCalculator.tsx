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
  fr: {
    pickTitle: "À quelle heure voulez-vous vous lever ?",
    hour: "Heure",
    minute: "Minute",
    primary: "À quelle heure me coucher ?",
    or: "ou",
    nowTitle: "Si je me couche maintenant…",
    nowButton: "À quelle heure me lever ?",
    wakeIntro: (time) => `Pour vous réveiller reposé à ${time}, couchez-vous à l'une de ces heures :`,
    nowIntro: (time) => `Vous vous couchez maintenant (${time}) ? Levez-vous à l'une de ces heures :`,
    placeholder: "Choisissez votre heure de réveil et calculez, ou appuyez sur le bouton ci-dessous si vous vous couchez maintenant.",
    increase: "augmenter",
    decrease: "diminuer",
  },
  es: {
    pickTitle: "¿A qué hora quieres despertarte?",
    hour: "Hora",
    minute: "Minuto",
    primary: "¿A qué hora debo acostarme?",
    or: "o",
    nowTitle: "Si me acuesto ahora…",
    nowButton: "¿A qué hora debo despertarme?",
    wakeIntro: (time) => `Para despertarte descansado a las ${time}, acuéstate a una de estas horas:`,
    nowIntro: (time) => `¿Te acuestas ahora (${time})? Despiértate a una de estas horas:`,
    placeholder: "Elige tu hora de despertar y calcula, o pulsa el botón de abajo si te acuestas ahora.",
    increase: "aumentar",
    decrease: "disminuir",
  },
  pt: {
    pickTitle: "A que horas você quer acordar?",
    hour: "Hora",
    minute: "Minuto",
    primary: "A que horas devo dormir?",
    or: "ou",
    nowTitle: "Se eu dormir agora…",
    nowButton: "A que horas devo acordar?",
    wakeIntro: (time) => `Para acordar descansado às ${time}, deite-se em um destes horários:`,
    nowIntro: (time) => `Vai dormir agora (${time})? Acorde em um destes horários:`,
    placeholder: "Escolha o horário de acordar e calcule, ou toque no botão abaixo se vai dormir agora.",
    increase: "aumentar",
    decrease: "diminuir",
  },
  it: {
    pickTitle: "A che ora vuoi svegliarti?",
    hour: "Ora",
    minute: "Minuto",
    primary: "A che ora devo andare a dormire?",
    or: "oppure",
    nowTitle: "Se vado a dormire adesso…",
    nowButton: "A che ora devo svegliarmi?",
    wakeIntro: (time) => `Per svegliarti riposato alle ${time}, vai a letto a uno di questi orari:`,
    nowIntro: (time) => `Vai a letto adesso (${time})? Svegliati a uno di questi orari:`,
    placeholder: "Scegli l'ora della sveglia e calcola, oppure tocca il pulsante qui sotto se vai a dormire adesso.",
    increase: "aumenta",
    decrease: "diminuisci",
  },
  nl: {
    pickTitle: "Hoe laat wil je opstaan?",
    hour: "Uur",
    minute: "Minuut",
    primary: "Hoe laat moet ik gaan slapen?",
    or: "of",
    nowTitle: "Als ik nu ga slapen…",
    nowButton: "Hoe laat moet ik opstaan?",
    wakeIntro: (time) => `Wil je om ${time} uitgerust wakker worden? Ga dan op een van deze tijden naar bed:`,
    nowIntro: (time) => `Ga je nu (${time}) slapen? Sta op een van deze tijden op:`,
    placeholder: "Kies je opstaantijd en bereken, of tik op de knop hieronder als je nu gaat slapen.",
    increase: "verhogen",
    decrease: "verlagen",
  },
  sv: {
    pickTitle: "När vill du vakna?",
    hour: "Timme",
    minute: "Minut",
    primary: "När ska jag lägga mig?",
    or: "eller",
    nowTitle: "Om jag lägger mig nu …",
    nowButton: "När ska jag vakna?",
    wakeIntro: (time) => `För att vakna utvilad kl. ${time}, lägg dig vid någon av dessa tider:`,
    nowIntro: (time) => `Lägger du dig nu (kl. ${time})? Vakna vid någon av dessa tider:`,
    placeholder: "Välj när du vill vakna och räkna ut, eller tryck på knappen nedan om du lägger dig nu.",
    increase: "öka",
    decrease: "minska",
  },
  no: {
    pickTitle: "Når vil du våkne?",
    hour: "Time",
    minute: "Minutt",
    primary: "Når bør jeg legge meg?",
    or: "eller",
    nowTitle: "Hvis jeg legger meg nå …",
    nowButton: "Når bør jeg stå opp?",
    wakeIntro: (time) => `For å våkne uthvilt kl. ${time}, legg deg på et av disse tidspunktene:`,
    nowIntro: (time) => `Legger du deg nå (kl. ${time})? Stå opp på et av disse tidspunktene:`,
    placeholder: "Velg når du vil våkne og regn ut, eller trykk på knappen nedenfor hvis du legger deg nå.",
    increase: "øk",
    decrease: "reduser",
  },
  da: {
    pickTitle: "Hvornår vil du vågne?",
    hour: "Time",
    minute: "Minut",
    primary: "Hvornår skal jeg gå i seng?",
    or: "eller",
    nowTitle: "Hvis jeg går i seng nu …",
    nowButton: "Hvornår skal jeg stå op?",
    wakeIntro: (time) => `For at vågne udhvilet kl. ${time}, gå i seng på et af disse tidspunkter:`,
    nowIntro: (time) => `Går du i seng nu (kl. ${time})? Stå op på et af disse tidspunkter:`,
    placeholder: "Vælg hvornår du vil vågne og beregn, eller tryk på knappen nedenfor, hvis du går i seng nu.",
    increase: "øg",
    decrease: "sænk",
  },
  ar: {
    pickTitle: "متى تريد أن تستيقظ؟",
    hour: "الساعة",
    minute: "الدقيقة",
    primary: "متى يجب أن أنام؟",
    or: "أو",
    nowTitle: "إذا نمت الآن…",
    nowButton: "متى يجب أن أستيقظ؟",
    wakeIntro: (time) => `لتستيقظ مرتاحًا في ${time}، نم في أحد هذه الأوقات:`,
    nowIntro: (time) => `ستنام الآن (${time})؟ استيقظ في أحد هذه الأوقات:`,
    placeholder: "اختر وقت الاستيقاظ واحسب، أو اضغط الزر أدناه إذا كنت ستنام الآن.",
    increase: "زيادة",
    decrease: "إنقاص",
  },
  uz: {
    pickTitle: "Soat nechada turmoqchisiz?",
    hour: "Soat",
    minute: "Daqiqa",
    primary: "Soat nechada uxlashim kerak?",
    or: "yoki",
    nowTitle: "Hozir uxlasam…",
    nowButton: "Soat nechada turishim kerak?",
    wakeIntro: (time) => `Uyg'onish vaqti ${time} bo'lsa, dam olgan holda turish uchun shu vaqtlardan birida uxlang:`,
    nowIntro: (time) => `Hozir (${time}) uxlasangiz, shu vaqtlardan birida turing:`,
    placeholder: "Uyg'onish vaqtini tanlab hisoblang yoki hozir uxlayotgan bo'lsangiz pastdagi tugmani bosing.",
    increase: "oshirish",
    decrease: "kamaytirish",
  },
  bn: {
    pickTitle: "কখন ঘুম থেকে উঠতে চান?",
    hour: "ঘণ্টা",
    minute: "মিনিট",
    primary: "কখন ঘুমাতে যাব?",
    or: "অথবা",
    nowTitle: "এখন ঘুমালে…",
    nowButton: "কখন ঘুম থেকে উঠব?",
    wakeIntro: (time) => `${time}-এ সতেজভাবে উঠতে এই সময়গুলোর একটিতে ঘুমাতে যান:`,
    nowIntro: (time) => `এখন (${time}) ঘুমালে এই সময়গুলোর একটিতে উঠুন:`,
    placeholder: "ঘুম থেকে ওঠার সময় বেছে হিসাব করুন, অথবা এখন ঘুমালে নিচের বোতামে চাপুন।",
    increase: "বাড়ান",
    decrease: "কমান",
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
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
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
