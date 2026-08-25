// Uyku hesaplama -- 90 dakikalik uyku dongusu ve ortalama 15 dakikalik
// uykuya dalma suresi varsayimiyla, hedef kalkis/yatis saatine gore
// tam dongulerle biten uyku secenekleri onerir (5-6 dongu, yani 7,5-9
// saat, genel olarak dinlenmis uyanmak icin onerilen araliktir).

export type SleepCalculationMode = "wake-to-bedtime" | "bedtime-to-wake";

export type SleepCalculatorInput = {
  mode: SleepCalculationMode;
  timeOfDay: string;
};

export type SleepCycleOption = {
  cycles: number;
  hours: number;
  time: string;
  recommended: boolean;
};

export type SleepCalculatorResult = {
  options: SleepCycleOption[];
};

const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 15;
const CYCLE_OPTIONS = [3, 4, 5, 6] as const;
const RECOMMENDED_CYCLES = [5, 6];

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

function formatMinutesToTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function calculateSleepTimes(
  input: SleepCalculatorInput
): SleepCalculatorResult | null {
  const baseMinutes = parseTimeToMinutes(input.timeOfDay);

  if (baseMinutes === null) {
    return null;
  }

  const options = CYCLE_OPTIONS.map((cycles) => {
    const sleepMinutes = cycles * CYCLE_MINUTES;
    const targetMinutes =
      input.mode === "bedtime-to-wake"
        ? baseMinutes + FALL_ASLEEP_MINUTES + sleepMinutes
        : baseMinutes - FALL_ASLEEP_MINUTES - sleepMinutes;

    return {
      cycles,
      hours: sleepMinutes / 60,
      time: formatMinutesToTime(targetMinutes),
      recommended: (RECOMMENDED_CYCLES as readonly number[]).includes(cycles),
    };
  });

  return { options };
}
