import type { TimeSoundId } from "./timeSounds";

export type TimeToolsCopy = {
  numberLocale: string;
  sounds: Record<TimeSoundId, string>;
  wakeLock: { on: string; off: string; unsupported: string; hint: string };
  fullscreen: string;
  exitFullscreen: string;
  alarm: {
    nowLabel: string;
    newAlarm: string;
    time: string;
    label: string;
    labelPlaceholder: string;
    sound: string;
    volume: string;
    test: string;
    add: string;
    quick: string;
    list: string;
    empty: string;
    remove: string;
    on: string;
    off: string;
    inTime: (text: string) => string;
    ringingTitle: string;
    snooze: string;
    stop: string;
    tabNote: string;
    hours: string;
    minutes: string;
  };
  timer: {
    presets: string;
    custom: string;
    hours: string;
    minutes: string;
    seconds: string;
    start: string;
    pause: string;
    resume: string;
    reset: string;
    addMinute: string;
    done: string;
    stop: string;
    minuteShort: string;
  };
  stopwatch: {
    start: string;
    stop: string;
    lap: string;
    reset: string;
    laps: string;
    lapTime: string;
    total: string;
    fastest: string;
    slowest: string;
    download: string;
    empty: string;
  };
};

export type TimeToolsLocale = "tr" | "en";

export const timeToolsCopy: Record<TimeToolsLocale, TimeToolsCopy> = {
  tr: {
    numberLocale: "tr-TR",
    sounds: { classic: "Klasik bip", chime: "Zil", digital: "Dijital", soft: "Yumuşak" },
    wakeLock: {
      on: "Ekran açık tutuluyor",
      off: "Ekranı açık tut",
      unsupported: "Bu tarayıcı ekranı açık tutmayı desteklemiyor",
      hint: "Telefonda ekran kararınca tarayıcı uyuyabilir; bu seçenek sayfa açıkken ekranı kapatmaz.",
    },
    fullscreen: "Tam ekran",
    exitFullscreen: "Tam ekrandan çık",
    alarm: {
      nowLabel: "Şu anki saat",
      newAlarm: "Yeni alarm",
      time: "Alarm saati",
      label: "Not (isteğe bağlı)",
      labelPlaceholder: "örn. İlaç, toplantı",
      sound: "Ses",
      volume: "Ses düzeyi",
      test: "Sesi dene",
      add: "Alarm kur",
      quick: "Hızlı kur",
      list: "Alarmlarım",
      empty: "Henüz alarm yok. Saati seçip “Alarm kur”a bas.",
      remove: "Sil",
      on: "Açık",
      off: "Kapalı",
      inTime: (text) => `${text} sonra çalacak`,
      ringingTitle: "Alarm çalıyor",
      snooze: "5 dk ertele",
      stop: "Durdur",
      tabNote: "Alarm bu sekme açıkken çalar. Sekmeyi kapatmayın; telefonda “Ekranı açık tut”u açın.",
      hours: "sa",
      minutes: "dk",
    },
    timer: {
      presets: "Hazır süreler",
      custom: "Süreyi ayarla",
      hours: "Saat",
      minutes: "Dakika",
      seconds: "Saniye",
      start: "Başlat",
      pause: "Duraklat",
      resume: "Devam et",
      reset: "Sıfırla",
      addMinute: "+1 dk",
      done: "Süre doldu!",
      stop: "Sesi kapat",
      minuteShort: "dk",
    },
    stopwatch: {
      start: "Başlat",
      stop: "Durdur",
      lap: "Tur",
      reset: "Sıfırla",
      laps: "Turlar",
      lapTime: "Tur süresi",
      total: "Toplam",
      fastest: "En hızlı",
      slowest: "En yavaş",
      download: "Turları indir (CSV)",
      empty: "Tur kaydetmek için kronometre çalışırken “Tur”a bas.",
    },
  },
  en: {
    numberLocale: "en-US",
    sounds: { classic: "Classic beep", chime: "Chime", digital: "Digital", soft: "Soft" },
    wakeLock: {
      on: "Keeping the screen on",
      off: "Keep screen on",
      unsupported: "This browser cannot keep the screen on",
      hint: "On a phone the browser may sleep when the screen turns off; this keeps the screen on while the page is open.",
    },
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    alarm: {
      nowLabel: "Current time",
      newAlarm: "New alarm",
      time: "Alarm time",
      label: "Label (optional)",
      labelPlaceholder: "e.g. Medicine, meeting",
      sound: "Sound",
      volume: "Volume",
      test: "Test sound",
      add: "Set alarm",
      quick: "Quick set",
      list: "My alarms",
      empty: "No alarms yet. Pick a time and press “Set alarm”.",
      remove: "Delete",
      on: "On",
      off: "Off",
      inTime: (text) => `rings in ${text}`,
      ringingTitle: "Alarm",
      snooze: "Snooze 5 min",
      stop: "Stop",
      tabNote: "The alarm rings while this tab is open. Don't close it; on a phone, turn on “Keep screen on”.",
      hours: "h",
      minutes: "min",
    },
    timer: {
      presets: "Presets",
      custom: "Set the time",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      addMinute: "+1 min",
      done: "Time's up!",
      stop: "Stop sound",
      minuteShort: "min",
    },
    stopwatch: {
      start: "Start",
      stop: "Stop",
      lap: "Lap",
      reset: "Reset",
      laps: "Laps",
      lapTime: "Lap time",
      total: "Total",
      fastest: "Fastest",
      slowest: "Slowest",
      download: "Download laps (CSV)",
      empty: "Press “Lap” while the stopwatch runs to record laps.",
    },
  },
};
