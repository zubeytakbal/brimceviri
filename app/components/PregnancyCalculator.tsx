"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedDate } from "../i18n/toolLocales";
import {
  calculatePregnancy,
  type PregnancyCalculatorInput,
  type PregnancyTrimester,
} from "../converter/pregnancyCalculator";

const trimesterLabels: Record<
  Exclude<Locale, "ru">,
  Record<PregnancyTrimester, string>
> = {
  tr: {
    1: "1. Trimester",
    2: "2. Trimester",
    3: "3. Trimester",
  },
  en: {
    1: "1st trimester",
    2: "2nd trimester",
    3: "3rd trimester",
  },
  de: {
    1: "1. Trimester",
    2: "2. Trimester",
    3: "3. Trimester",
  },
  ar: {
    1: "الثلث الأول",
    2: "الثلث الثاني",
    3: "الثلث الثالث",
  },
uz: {
    1: "1-trimestr",
    2: "2-trimestr",
    3: "3-trimestr",
  },
bn: {
    1: "প্রথম ত্রৈমাসিক",
    2: "দ্বিতীয় ত্রৈমাসিক",
    3: "তৃতীয় ত্রৈমাসিক",
  },
fr: {
    1: "1er trimestre",
    2: "2e trimestre",
    3: "3e trimestre",
  },
  es: {
    1: "1.er trimestre",
    2: "2.º trimestre",
    3: "3.er trimestre",
  },
  "es-419": {
    1: "1.er trimestre",
    2: "2.º trimestre",
    3: "3.er trimestre",
  },
  pt: {
    1: "1º trimestre",
    2: "2º trimestre",
    3: "3º trimestre",
  },
  it: {
    1: "1° trimestre",
    2: "2° trimestre",
    3: "3° trimestre",
  },
  nl: {
    1: "1e trimester",
    2: "2e trimester",
    3: "3e trimester",
  },
  sv: {
    1: "Första trimestern",
    2: "Andra trimestern",
    3: "Tredje trimestern",
  },
  no: {
    1: "Første trimester",
    2: "Andre trimester",
    3: "Tredje trimester",
  },
  da: {
    1: "1. trimester",
    2: "2. trimester",
    3: "3. trimester",
  },
};

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    inputLabel: string;
    emptyState: string;
    summaryLabel: string;
    dueDate: string;
    daysUntil: string;
    weeks: string;
    days: string;
  }
> = {
  tr: {
    inputLabel: "Son Adet Tarihinin İlk Günü",
    emptyState: "Geçerli bir tarih gir; tarih bugünden sonra veya 45 haftadan daha eski olamaz.",
    summaryLabel: "Gebelik haftası",
    dueDate: "Tahmini doğum tarihi",
    daysUntil: "Doğuma kalan gün",
    weeks: "hafta",
    days: "gun",
  },
  en: {
    inputLabel: "First Day of the Last Period",
    emptyState: "Enter a valid date; it cannot be in the future or more than 45 weeks old.",
    summaryLabel: "Pregnancy age",
    dueDate: "Estimated due date",
    daysUntil: "Days until due date",
    weeks: "weeks",
    days: "days",
  },
  fr: {
    inputLabel: "Premier jour des dernières règles",
    emptyState: "Saisissez une date valide ; elle ne peut pas être dans le futur ni remonter à plus de 45 semaines.",
    summaryLabel: "Âge de la grossesse",
    dueDate: "Date prévue d'accouchement",
    daysUntil: "Jours avant la date prévue",
    weeks: "semaines",
    days: "jours",
  },
  es: {
    inputLabel: "Primer día de la última regla",
    emptyState: "Introduce una fecha válida; no puede ser futura ni de hace más de 45 semanas.",
    summaryLabel: "Edad gestacional",
    dueDate: "Fecha probable de parto",
    daysUntil: "Días hasta la fecha probable de parto",
    weeks: "semanas",
    days: "días",
  },
  "es-419": {
    inputLabel: "Primer día de la última menstruación",
    emptyState: "Ingresa una fecha válida; no puede ser futura ni de hace más de 45 semanas.",
    summaryLabel: "Edad gestacional",
    dueDate: "Fecha probable de parto",
    daysUntil: "Días hasta la fecha probable de parto",
    weeks: "semanas",
    days: "días",
  },
  pt: {
    inputLabel: "Primeiro dia da última menstruação",
    emptyState: "Digite uma data válida; ela não pode estar no futuro nem ter mais de 45 semanas.",
    summaryLabel: "Idade gestacional",
    dueDate: "Data provável do parto",
    daysUntil: "Dias até a data provável do parto",
    weeks: "semanas",
    days: "dias",
  },
  it: {
    inputLabel: "Primo giorno dell'ultima mestruazione",
    emptyState: "Inserisci una data valida; non può essere nel futuro né risalire a più di 45 settimane fa.",
    summaryLabel: "Età gestazionale",
    dueDate: "Data presunta del parto",
    daysUntil: "Giorni alla data presunta del parto",
    weeks: "settimane",
    days: "giorni",
  },
  nl: {
    inputLabel: "Eerste dag van de laatste menstruatie",
    emptyState: "Voer een geldige datum in; deze mag niet in de toekomst liggen of meer dan 45 weken geleden zijn.",
    summaryLabel: "Zwangerschapsduur",
    dueDate: "Uitgerekende datum",
    daysUntil: "Dagen tot de uitgerekende datum",
    weeks: "weken",
    days: "dagen",
  },
  sv: {
    inputLabel: "Första dagen i senaste mensen",
    emptyState: "Ange ett giltigt datum; det får inte ligga i framtiden eller vara mer än 45 veckor gammalt.",
    summaryLabel: "Graviditetsvecka",
    dueDate: "Beräknat förlossningsdatum",
    daysUntil: "Dagar kvar till beräknat datum",
    weeks: "veckor",
    days: "dagar",
  },
  no: {
    inputLabel: "Første dag i siste menstruasjon",
    emptyState: "Angi en gyldig dato; den kan ikke være i fremtiden eller mer enn 45 uker tilbake.",
    summaryLabel: "Svangerskapsalder",
    dueDate: "Beregnet termin",
    daysUntil: "Dager til termin",
    weeks: "uker",
    days: "dager",
  },
  da: {
    inputLabel: "Første dag i sidste menstruation",
    emptyState: "Indtast en gyldig dato; den må ikke ligge i fremtiden eller være mere end 45 uger gammel.",
    summaryLabel: "Graviditetsalder",
    dueDate: "Forventet termin",
    daysUntil: "Dage til termin",
    weeks: "uger",
    days: "dage",
  },
  de: {
    inputLabel: "Erster Tag der letzten Periode",
    emptyState: "Geben Sie ein gültiges Datum ein; es darf nicht in der Zukunft liegen oder mehr als 45 Wochen zurückliegen.",
    summaryLabel: "Schwangerschaftswoche",
    dueDate: "Voraussichtlicher Geburtstermin",
    daysUntil: "Tage bis zur Geburt",
    weeks: "Wochen",
    days: "Tage",
  },
  ar: {
    inputLabel: "أول يوم في آخر دورة شهرية",
    emptyState:
      "أدخلي تاريخًا صحيحًا؛ يجب ألا يكون في المستقبل أو أقدم من 45 أسبوعًا.",
    summaryLabel: "عمر الحمل",
    dueDate: "موعد الولادة المتوقع",
    daysUntil: "الأيام المتبقية حتى الولادة",
    weeks: "أسبوع",
    days: "يوم",
  },
uz: {
    inputLabel: "So'nggi Hayz Kunining Birinchi Kuni",
    emptyState: "To'g'ri sana kiriting; sana kelajakda yoki 45 haftadan ko'proq eski bo'lishi mumkin emas.",
    summaryLabel: "Homiladorlik haftasi",
    dueDate: "Taxminiy tug'ilish sanasi",
    daysUntil: "Tug'ilishgacha qolgan kun",
    weeks: "hafta",
    days: "kun",
  },
bn: {
    inputLabel: "শেষ মাসিকের প্রথম দিন",
    emptyState: "একটি বৈধ তারিখ লিখুন; এটি ভবিষ্যতের বা ৪৫ সপ্তাহের বেশি পুরনো হতে পারবে না।",
    summaryLabel: "গর্ভকালীন বয়স",
    dueDate: "সম্ভাব্য প্রসবের তারিখ",
    daysUntil: "সম্ভাব্য প্রসবের তারিখ পর্যন্ত দিন",
    weeks: "সপ্তাহ",
    days: "দিন",
  },
};

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

export default function PregnancyCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const displayLocale = locale === "ru" ? "en" : locale;
  const copy = copyByLocale[displayLocale];
  const [lastPeriodDate, setLastPeriodDate] = useState("2026-01-01");
  const [referenceDate] = useState(() => todayIsoDate());

  const input: PregnancyCalculatorInput = useMemo(
    () => ({ lastPeriodDate, referenceDate }),
    [lastPeriodDate, referenceDate]
  );

  const result = useMemo(() => calculatePregnancy(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.inputLabel}</span>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(event) => setLastPeriodDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.summaryLabel}:{" "}
              <strong>
                {result.weeks} {copy.weeks}, {result.days} {copy.days}
              </strong>{" "}
              - {trimesterLabels[displayLocale][result.trimester]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.dueDate}</span>
                <strong>{formatLocalizedDate(result.dueDate, locale)}</strong>
              </div>
              <div>
                <span>{copy.daysUntil}</span>
                <strong>{Math.max(0, result.daysUntilDueDate)}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {locale === "en" && (
        <p className="calculator-usage-hint">
          <strong>Important:</strong> This is an LMP-based estimate, not a
          confirmation of gestational age or due date. A clinician may use an
          early ultrasound and other clinical information to confirm dating;
          seek prompt medical care for symptoms or concerns.
        </p>
      )}
    </div>
  );
}
