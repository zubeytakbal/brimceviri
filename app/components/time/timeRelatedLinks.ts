import {
  alarmPresetSlug,
  alarmPresetTimes,
  formatEnglishTime,
  timerPresetMinutes,
  timerPresetSlug,
} from "../../i18n/timeToolPaths";

export const timeRelated = {
  tr: {
    tools: [
      { href: "/online-saat", label: "Online Saat" },
      { href: "/dunya-saatleri", label: "Dünya Saatleri" },
      { href: "/online-alarm-kur", label: "Online Alarm" },
      { href: "/zamanlayici", label: "Zamanlayıcı" },
      { href: "/kronometre", label: "Kronometre" },
      { href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
    ],
    timers: timerPresetMinutes.map((m) => ({ href: `/zamanlayici/${timerPresetSlug.tr(m)}`, label: `${m} dakika` })),
    alarms: alarmPresetTimes.map((t) => ({ href: `/online-alarm-kur/${alarmPresetSlug.tr(t)}`, label: `${t} alarm` })),
  },
  en: {
    tools: [
      { href: "/en/online-clock", label: "Online Clock" },
      { href: "/en/world-clock", label: "World Clock" },
      { href: "/en/alarm-clock", label: "Alarm Clock" },
      { href: "/en/timer", label: "Timer" },
      { href: "/en/stopwatch", label: "Stopwatch" },
      { href: "/en/sleep-calculator", label: "Sleep Calculator" },
    ],
    timers: timerPresetMinutes.map((m) => ({
      href: `/en/timer/${timerPresetSlug.en(m)}`,
      label: `${m} minute timer`,
    })),
    alarms: alarmPresetTimes.map((t) => ({
      href: `/en/alarm-clock/${alarmPresetSlug.en(t)}`,
      label: `${formatEnglishTime(t)} alarm`,
    })),
  },
};
