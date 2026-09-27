import {
  alarmPresetSlug,
  alarmPresetTimes,
  formatEnglishTime,
} from "../../i18n/timeToolPaths";
import { timerPresetPath, timerPresets } from "../../i18n/timerPresets";

export const timeRelated = {
  tr: {
    tools: [
      { href: "/online-saat", label: "Online Saat" },
      { href: "/dunya-saatleri", label: "Dünya Saatleri" },
      { href: "/geri-sayim", label: "Geri Sayım" },
      { href: "/saat-dilimi-cevirici", label: "Saat Dilimi Çevirici" },
      { href: "/online-alarm-kur", label: "Online Alarm" },
      { href: "/zamanlayici", label: "Zamanlayıcı" },
      { href: "/kronometre", label: "Kronometre" },
      { href: "/pomodoro", label: "Pomodoro" },
      { href: "/tabata-zamanlayici", label: "Tabata Zamanlayıcı" },
      { href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
    ],
    timers: timerPresets.map((p) => ({ href: timerPresetPath(p, "tr"), label: p.labelTr })),
    alarms: alarmPresetTimes.map((t) => ({ href: `/online-alarm-kur/${alarmPresetSlug.tr(t)}`, label: `${t} alarm` })),
  },
  en: {
    tools: [
      { href: "/en/online-clock", label: "Online Clock" },
      { href: "/en/world-clock", label: "World Clock" },
      { href: "/en/countdown", label: "Countdown" },
      { href: "/en/time-zone-converter", label: "Time Zone Converter" },
      { href: "/en/alarm-clock", label: "Alarm Clock" },
      { href: "/en/timer", label: "Timer" },
      { href: "/en/stopwatch", label: "Stopwatch" },
      { href: "/en/pomodoro-timer", label: "Pomodoro Timer" },
      { href: "/en/interval-timer", label: "Interval Timer" },
      { href: "/en/sleep-calculator", label: "Sleep Calculator" },
    ],
    timers: timerPresets.map((p) => ({ href: timerPresetPath(p, "en"), label: `${p.labelEn} timer` })),
    alarms: alarmPresetTimes.map((t) => ({
      href: `/en/alarm-clock/${alarmPresetSlug.en(t)}`,
      label: `${formatEnglishTime(t)} alarm`,
    })),
  },
};
