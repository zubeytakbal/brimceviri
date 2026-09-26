"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import {
  formatLocalizedDate,
  formatLocalizedNumber,
} from "../i18n/toolLocales";
import {
  calculateDateDifference,
  type DateCalculatorInput,
} from "../converter/dateCalculator";

type DateCopy = {
  labels: {
    startDate: string;
    endDate: string;
  };
  emptyState: string;
  resultLabels: {
    difference: string;
    totalDays: string;
    totalWeeks: string;
    totalMonths: string;
    nextAnniversary: string;
  };
  units: {
    years: string;
    months: string;
    days: string;
  };
};

const copyByLocale: Record<Exclude<Locale, "ru">, DateCopy> = {
  tr: {
    labels: {
      startDate: "Baslangic Tarihi (Dogum Tarihi)",
      endDate: "Hedef Tarih",
    },
    emptyState: "Gecerli iki tarih gir; hedef tarih baslangic tarihinden once olamaz.",
    resultLabels: {
      difference: "Fark",
      totalDays: "Toplam gun",
      totalWeeks: "Toplam hafta",
      totalMonths: "Toplam ay",
      nextAnniversary: "Sonraki yil donumu",
    },
    units: {
      years: "yil",
      months: "ay",
      days: "gun",
    },
  },
  en: {
    labels: {
      startDate: "Start Date (Birth Date)",
      endDate: "Target Date",
    },
    emptyState: "Enter two valid dates; the target date cannot be earlier than the start date.",
    resultLabels: {
      difference: "Difference",
      totalDays: "Total days",
      totalWeeks: "Total weeks",
      totalMonths: "Total months",
      nextAnniversary: "Next anniversary",
    },
    units: {
      years: "years",
      months: "months",
      days: "days",
    },
  },
  fr: {
    labels: {
      startDate: "Date de début (date de naissance)",
      endDate: "Date cible",
    },
    emptyState: "Saisissez deux dates valides ; la date cible ne peut pas précéder la date de début.",
    resultLabels: {
      difference: "Différence",
      totalDays: "Nombre total de jours",
      totalWeeks: "Nombre total de semaines",
      totalMonths: "Nombre total de mois",
      nextAnniversary: "Prochain anniversaire",
    },
    units: {
      years: "ans",
      months: "mois",
      days: "jours",
    },
  },
  es: {
    labels: {
      startDate: "Fecha de inicio (fecha de nacimiento)",
      endDate: "Fecha objetivo",
    },
    emptyState: "Introduce dos fechas válidas; la fecha objetivo no puede ser anterior a la de inicio.",
    resultLabels: {
      difference: "Diferencia",
      totalDays: "Total de días",
      totalWeeks: "Total de semanas",
      totalMonths: "Total de meses",
      nextAnniversary: "Próximo aniversario",
    },
    units: {
      years: "años",
      months: "meses",
      days: "días",
    },
  },
  "es-419": {
    labels: {
      startDate: "Fecha de inicio (fecha de nacimiento)",
      endDate: "Fecha objetivo",
    },
    emptyState: "Ingresa dos fechas válidas; la fecha objetivo no puede ser anterior a la de inicio.",
    resultLabels: {
      difference: "Diferencia",
      totalDays: "Total de días",
      totalWeeks: "Total de semanas",
      totalMonths: "Total de meses",
      nextAnniversary: "Próximo cumpleaños",
    },
    units: {
      years: "años",
      months: "meses",
      days: "días",
    },
  },
  pt: {
    labels: {
      startDate: "Data inicial (data de nascimento)",
      endDate: "Data final",
    },
    emptyState: "Digite duas datas válidas; a data final não pode ser anterior à inicial.",
    resultLabels: {
      difference: "Diferença",
      totalDays: "Total de dias",
      totalWeeks: "Total de semanas",
      totalMonths: "Total de meses",
      nextAnniversary: "Próximo aniversário",
    },
    units: {
      years: "anos",
      months: "meses",
      days: "dias",
    },
  },
  it: {
    labels: {
      startDate: "Data di inizio (data di nascita)",
      endDate: "Data di arrivo",
    },
    emptyState: "Inserisci due date valide; la data di arrivo non può precedere quella di inizio.",
    resultLabels: {
      difference: "Differenza",
      totalDays: "Giorni totali",
      totalWeeks: "Settimane totali",
      totalMonths: "Mesi totali",
      nextAnniversary: "Prossimo anniversario",
    },
    units: {
      years: "anni",
      months: "mesi",
      days: "giorni",
    },
  },
  nl: {
    labels: {
      startDate: "Begindatum (geboortedatum)",
      endDate: "Doeldatum",
    },
    emptyState: "Voer twee geldige datums in; de doeldatum mag niet vóór de begindatum liggen.",
    resultLabels: {
      difference: "Verschil",
      totalDays: "Totaal aantal dagen",
      totalWeeks: "Totaal aantal weken",
      totalMonths: "Totaal aantal maanden",
      nextAnniversary: "Volgende verjaardag",
    },
    units: {
      years: "jaar",
      months: "maanden",
      days: "dagen",
    },
  },
  sv: {
    labels: {
      startDate: "Startdatum (födelsedatum)",
      endDate: "Måldatum",
    },
    emptyState: "Ange två giltiga datum; måldatumet får inte vara före startdatumet.",
    resultLabels: {
      difference: "Skillnad",
      totalDays: "Totalt antal dagar",
      totalWeeks: "Totalt antal veckor",
      totalMonths: "Totalt antal månader",
      nextAnniversary: "Nästa årsdag",
    },
    units: {
      years: "år",
      months: "månader",
      days: "dagar",
    },
  },
  no: {
    labels: {
      startDate: "Startdato (fødselsdato)",
      endDate: "Måldato",
    },
    emptyState: "Angi to gyldige datoer; måldatoen kan ikke være før startdatoen.",
    resultLabels: {
      difference: "Differanse",
      totalDays: "Totalt antall dager",
      totalWeeks: "Totalt antall uker",
      totalMonths: "Totalt antall måneder",
      nextAnniversary: "Neste årsdag",
    },
    units: {
      years: "år",
      months: "måneder",
      days: "dager",
    },
  },
  da: {
    labels: {
      startDate: "Startdato (fødselsdato)",
      endDate: "Måldato",
    },
    emptyState: "Indtast to gyldige datoer; måldatoen må ikke ligge før startdatoen.",
    resultLabels: {
      difference: "Forskel",
      totalDays: "Antal dage i alt",
      totalWeeks: "Antal uger i alt",
      totalMonths: "Antal måneder i alt",
      nextAnniversary: "Næste årsdag",
    },
    units: {
      years: "år",
      months: "måneder",
      days: "dage",
    },
  },
  de: {
    labels: {
      startDate: "Startdatum (Geburtsdatum)",
      endDate: "Zieldatum",
    },
    emptyState: "Geben Sie zwei gueltige Daten ein; das Zieldatum darf nicht vor dem Startdatum liegen.",
    resultLabels: {
      difference: "Differenz",
      totalDays: "Gesamttage",
      totalWeeks: "Gesamtwochen",
      totalMonths: "Gesamtmonate",
      nextAnniversary: "Naechster Jahrestag",
    },
    units: {
      years: "Jahre",
      months: "Monate",
      days: "Tage",
    },
  },
  ar: {
    labels: {
      startDate: "تاريخ البداية (تاريخ الميلاد)",
      endDate: "التاريخ المستهدف",
    },
    emptyState:
      "أدخل تاريخين صحيحين، ويجب ألا يكون التاريخ المستهدف قبل تاريخ البداية.",
    resultLabels: {
      difference: "الفرق",
      totalDays: "إجمالي الأيام",
      totalWeeks: "إجمالي الأسابيع",
      totalMonths: "إجمالي الأشهر",
      nextAnniversary: "الذكرى التالية",
    },
    units: {
      years: "سنة",
      months: "شهر",
      days: "يوم",
    },
  },
uz: {
    labels: {
      startDate: "Boshlanish Sanasi (Tug'ilgan Sana)",
      endDate: "Maqsad Sana",
    },
    emptyState: "Ikkita to'g'ri sana kiriting; maqsad sana boshlanish sanasidan oldin bo'lishi mumkin emas.",
    resultLabels: {
      difference: "Farq",
      totalDays: "Jami kun",
      totalWeeks: "Jami hafta",
      totalMonths: "Jami oy",
      nextAnniversary: "Keyingi yil to'lish sanasi",
    },
    units: {
      years: "yil",
      months: "oy",
      days: "kun",
    },
  },
bn: {
    labels: {
      startDate: "শুরুর তারিখ (জন্মতারিখ)",
      endDate: "লক্ষ্য তারিখ",
    },
    emptyState: "দুটি বৈধ তারিখ লিখুন; লক্ষ্য তারিখ শুরুর তারিখের আগে হতে পারবে না।",
    resultLabels: {
      difference: "পার্থক্য",
      totalDays: "মোট দিন",
      totalWeeks: "মোট সপ্তাহ",
      totalMonths: "মোট মাস",
      nextAnniversary: "পরবর্তী বার্ষিকী",
    },
    units: {
      years: "বছর",
      months: "মাস",
      days: "দিন",
    },
  },
};

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function formatNumber(value: number, locale: Locale) {
  return formatLocalizedNumber(Math.round(value), locale);
}

export default function DateCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState(() => todayIsoDate());

  const input: DateCalculatorInput = useMemo(
    () => ({ startDate, endDate }),
    [startDate, endDate]
  );

  const result = useMemo(() => calculateDateDifference(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.startDate}</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.endDate}</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.difference}:{" "}
              <strong>
                {result.years} {copy.units.years}, {result.months} {copy.units.months}, {result.days}{" "}
                {copy.units.days}
              </strong>
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.totalDays}</span>
                <strong>{formatNumber(result.totalDays, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalWeeks}</span>
                <strong>{formatNumber(result.totalWeeks, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalMonths}</span>
                <strong>{formatNumber(result.totalMonths, locale)}</strong>
              </div>
            </div>

            <p className="category-general-converter-equality">
              {copy.resultLabels.nextAnniversary}{" "}
              {formatLocalizedDate(result.nextAnniversaryDate, locale)} -{" "}
              {formatNumber(result.daysUntilNextAnniversary, locale)} {copy.units.days}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
