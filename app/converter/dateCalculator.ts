// Yas / tarih farki hesaplama -- iki tarih arasindaki tam fark (yil, ay,
// gun), toplam gun/hafta/ay sayisi ve baslangic tarihinin bir sonraki
// yil donumune (dogum gunu) kalan gun sayisini hesaplar.

export type DateCalculatorInput = {
  startDate: string;
  endDate: string;
};

export type DateCalculatorResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextAnniversaryDate: string;
  daysUntilNextAnniversary: number;
};

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

export function calculateDateDifference(
  input: DateCalculatorInput
): DateCalculatorResult | null {
  const start = parseDate(input.startDate);
  const end = parseDate(input.endDate);

  if (!start || !end || start.getTime() > end.getTime()) {
    return null;
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0
    ).getDate();
    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  const totalWeeks = totalDays / 7;
  const totalMonths = years * 12 + months + days / 30;

  let nextAnniversary = new Date(
    end.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  if (nextAnniversary.getTime() < end.getTime()) {
    nextAnniversary = new Date(
      end.getFullYear() + 1,
      start.getMonth(),
      start.getDate()
    );
  }

  const daysUntilNextAnniversary = Math.round(
    (nextAnniversary.getTime() - end.getTime()) / MS_PER_DAY
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextAnniversaryDate: formatLocalIsoDate(nextAnniversary),
    daysUntilNextAnniversary,
  };
}
