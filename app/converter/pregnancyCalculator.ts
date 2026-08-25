// Gebelik haftasi hesaplama -- standart tibbi uygulamaya gore son adet
// tarihinden (SAT) itibaren 280 gun (40 hafta) uzerinden hesaplanir.
// Bu, doguma kadar gecen sureyi tahmin etmek icin en yaygin kullanilan
// yontemdir (gercek dolluk tarihinden degil, SAT'tan sayilir).

export type PregnancyCalculatorInput = {
  lastPeriodDate: string;
  referenceDate: string;
};

export type PregnancyTrimester = 1 | 2 | 3;

export type PregnancyCalculatorResult = {
  weeks: number;
  days: number;
  totalDays: number;
  trimester: PregnancyTrimester;
  dueDate: string;
  daysUntilDueDate: number;
};

const PREGNANCY_TOTAL_DAYS = 280;
const MAX_REASONABLE_DAYS = 315;
const MS_PER_DAY = 86400000;

function parseDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

// toISOString() converts to UTC first, which shifts the calendar date
// backward by a day in positive-UTC-offset timezones (e.g. TRT, UTC+3)
// for any local midnight. Format from local getters instead.
function formatLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function calculatePregnancy(
  input: PregnancyCalculatorInput
): PregnancyCalculatorResult | null {
  const lastPeriod = parseDate(input.lastPeriodDate);
  const reference = parseDate(input.referenceDate);

  if (!lastPeriod || !reference || lastPeriod.getTime() > reference.getTime()) {
    return null;
  }

  const totalDays = Math.round(
    (reference.getTime() - lastPeriod.getTime()) / MS_PER_DAY
  );

  if (totalDays > MAX_REASONABLE_DAYS) {
    return null;
  }

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const trimester: PregnancyTrimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;

  const dueDate = new Date(
    lastPeriod.getTime() + PREGNANCY_TOTAL_DAYS * MS_PER_DAY
  );
  const daysUntilDueDate = Math.round(
    (dueDate.getTime() - reference.getTime()) / MS_PER_DAY
  );

  return {
    weeks,
    days,
    totalDays,
    trimester,
    dueDate: formatLocalIsoDate(dueDate),
    daysUntilDueDate,
  };
}
