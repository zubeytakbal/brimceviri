import type { ClockFamily, ClockTheme } from "./clockThemes";
import type { TimeSoundId } from "./timeSounds";

export type TimeToolsCopy = {
  numberLocale: string;
  sounds: Record<TimeSoundId, string>;
  customSound: {
    pick: string;
    change: string;
    remove: string;
    note: string;
    errors: Record<"too-large" | "not-audio" | "storage", string>;
  };
  repeat: { label: string; once: string; daily: string; weekdays: string };
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
    secondShort: string;
    hourShort: string;
    endsAt: string;
    theme: string;
    themes: Record<"teal" | "night" | "sunset" | "forest" | "mono", string>;
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
  clock: {
    themes: Record<ClockTheme, string>;
    families: Record<ClockFamily, string>;
    sound: string;
    tick: string;
    chime: string;
    listen: string;
    soundHint: string;
    theme: string;
    options: string;
    hour24: string;
    seconds: string;
    date: string;
    timeZone: string;
    am: string;
    pm: string;
    dateLocale: string;
  };
};

export type { ClockTheme };

export type TimeToolsLocale = "tr" | "en" | "de";

export const timeToolsCopy: Record<TimeToolsLocale, TimeToolsCopy> = {
  tr: {
    numberLocale: "tr-TR",
    sounds: { classic: "Klasik bip", chime: "Zil", digital: "Dijital", soft: "Yumuşak", custom: "Kendi müziğin" },
    customSound: {
      pick: "Ses dosyası seç",
      change: "Başka dosya seç",
      remove: "Kaldır",
      note: "Dosya yalnızca bu tarayıcıda saklanır, hiçbir yere yüklenmez (en fazla 15 MB).",
      errors: {
        "too-large": "Dosya çok büyük; 15 MB'tan küçük bir ses dosyası seç.",
        "not-audio": "Bu bir ses dosyası değil. MP3, M4A, WAV ya da OGG seç.",
        storage: "Dosya bu ziyarette çalışır ama tarayıcı saklamaya izin vermedi.",
      },
    },
    repeat: { label: "Tekrar", once: "Bir kez", daily: "Her gün", weekdays: "Hafta içi" },
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
      secondShort: "sn",
      hourShort: "sa",
      endsAt: "Bitiş",
      theme: "Renk",
      themes: { teal: "Turkuaz", night: "Gece", sunset: "Gün batımı", forest: "Orman", mono: "Sade" },
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
    clock: {
      themes: {
        analog: "Klasik",
        station: "İstasyon",
        roman: "Roma",
        gold: "Altın",
        night: "Gece",
        digital: "Dijital",
        minimal: "Sade",
        sunset: "Gün batımı",
        flip: "Flip",
        neon: "Neon",
        led: "LED",
        terminal: "Terminal",
        binary: "İkili",
        pendulum: "Sarkaçlı duvar saati",
        cuckoo: "Guguklu saat",
        pocket: "Cep saati",
        twinbell: "Zilli çalar saat",
        nixie: "Nixie tüp",
        diver: "Dalgıç saati",
        chrono: "Kronograf",
        dress: "Klasik kol saati",
        field: "Pilot saati",
        lcd: "Retro dijital",
        smart: "Akıllı saat",
        mantel: "Şömine saati",
        tower: "Kule saati",
        school: "Okul saati",
        ship: "Gemi saati",
        radio: "Radyolu saat",
        skeleton: "İskelet saat",
        moonphase: "Ay fazlı saat",
        word: "Kelime saati",
        hourglass: "Kum saati",
        sunmoon: "Gün döngüsü",
      },
      families: { analog: "Analog", digital: "Dijital", vintage: "Eski usul saatler", watch: "Kol saatleri", special: "Özel saatler" },
      sound: "Ses",
      tick: "Tik-tak",
      chime: "Saat başı çalsın",
      listen: "Çalışını dinle",
      soundHint: "Sesler tarayıcıda üretilir; her saatin kendi mekanizma sesi ve saat başı çalması vardır.",
      theme: "Tema",
      options: "Görünüm",
      hour24: "24 saat",
      seconds: "Saniye",
      date: "Tarih",
      timeZone: "Saat dilimin",
      am: "ÖÖ",
      pm: "ÖS",
      dateLocale: "tr-TR",
    },
  },
  en: {
    numberLocale: "en-US",
    sounds: { classic: "Classic beep", chime: "Chime", digital: "Digital", soft: "Soft", custom: "Your own sound" },
    customSound: {
      pick: "Choose an audio file",
      change: "Choose another file",
      remove: "Remove",
      note: "The file stays in this browser only and is never uploaded (max 15 MB).",
      errors: {
        "too-large": "That file is too large; pick an audio file under 15 MB.",
        "not-audio": "That isn't an audio file. Pick an MP3, M4A, WAV or OGG.",
        storage: "The file works for this visit, but the browser didn't allow saving it.",
      },
    },
    repeat: { label: "Repeat", once: "Once", daily: "Every day", weekdays: "Weekdays" },
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
      secondShort: "sec",
      hourShort: "h",
      endsAt: "Ends at",
      theme: "Colour",
      themes: { teal: "Teal", night: "Night", sunset: "Sunset", forest: "Forest", mono: "Minimal" },
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
    clock: {
      themes: {
        analog: "Classic",
        station: "Station",
        roman: "Roman",
        gold: "Gold",
        night: "Night",
        digital: "Digital",
        minimal: "Minimal",
        sunset: "Sunset",
        flip: "Flip",
        neon: "Neon",
        led: "LED",
        terminal: "Terminal",
        binary: "Binary",
        pendulum: "Pendulum wall clock",
        cuckoo: "Cuckoo clock",
        pocket: "Pocket watch",
        twinbell: "Twin-bell alarm clock",
        nixie: "Nixie tubes",
        diver: "Dive watch",
        chrono: "Chronograph",
        dress: "Dress watch",
        field: "Pilot watch",
        lcd: "Retro digital",
        smart: "Smartwatch",
        mantel: "Mantel clock",
        tower: "Tower clock",
        school: "School clock",
        ship: "Ship's clock",
        radio: "Clock radio",
        skeleton: "Skeleton watch",
        moonphase: "Moon phase watch",
        word: "Word clock",
        hourglass: "Hourglass",
        sunmoon: "Day cycle",
      },
      families: { analog: "Analog", digital: "Digital", vintage: "Vintage clocks", watch: "Wristwatches", special: "Special clocks" },
      sound: "Sound",
      tick: "Ticking",
      chime: "Hourly chime",
      listen: "Hear the chime",
      soundHint: "Sounds are generated in your browser; every clock has its own movement sound and hourly chime.",
      theme: "Theme",
      options: "Display",
      hour24: "24-hour",
      seconds: "Seconds",
      date: "Date",
      timeZone: "Your time zone",
      am: "AM",
      pm: "PM",
      dateLocale: "en-US",
    },
  },
  de: {
    numberLocale: "de-DE",
    sounds: { classic: "Klassischer Piepton", chime: "Glocke", digital: "Digital", soft: "Sanft", custom: "Eigener Ton" },
    customSound: {
      pick: "Audiodatei auswählen",
      change: "Andere Datei wählen",
      remove: "Entfernen",
      note: "Die Datei bleibt nur in diesem Browser und wird nirgendwo hochgeladen (max. 15 MB).",
      errors: {
        "too-large": "Die Datei ist zu groß; bitte eine Audiodatei unter 15 MB wählen.",
        "not-audio": "Das ist keine Audiodatei. Bitte MP3, M4A, WAV oder OGG wählen.",
        storage: "Die Datei funktioniert bei diesem Besuch, der Browser hat das Speichern aber nicht erlaubt.",
      },
    },
    repeat: { label: "Wiederholen", once: "Einmal", daily: "Täglich", weekdays: "Werktags (Mo–Fr)" },
    wakeLock: {
      on: "Bildschirm bleibt an",
      off: "Bildschirm anlassen",
      unsupported: "Dieser Browser kann den Bildschirm nicht anlassen",
      hint: "Auf dem Handy kann der Browser einschlafen, wenn der Bildschirm ausgeht; diese Option hält ihn an, solange die Seite offen ist.",
    },
    fullscreen: "Vollbild",
    exitFullscreen: "Vollbild beenden",
    alarm: {
      nowLabel: "Aktuelle Uhrzeit",
      newAlarm: "Neuer Wecker",
      time: "Weckzeit",
      label: "Notiz (optional)",
      labelPlaceholder: "z. B. Medikament, Termin",
      sound: "Ton",
      volume: "Lautstärke",
      test: "Ton testen",
      add: "Wecker stellen",
      quick: "Schnell stellen",
      list: "Meine Wecker",
      empty: "Noch kein Wecker. Uhrzeit wählen und „Wecker stellen“ drücken.",
      remove: "Löschen",
      on: "An",
      off: "Aus",
      inTime: (text) => `klingelt in ${text}`,
      ringingTitle: "Wecker klingelt",
      snooze: "Schlummern (5 Min.)",
      stop: "Aus",
      tabNote: "Der Wecker klingelt, solange dieser Tab geöffnet ist. Tab nicht schließen; auf dem Handy „Bildschirm anlassen“ aktivieren.",
      hours: "Std.",
      minutes: "Min.",
    },
    timer: {
      presets: "Schnellauswahl",
      custom: "Zeit einstellen",
      hours: "Stunden",
      minutes: "Minuten",
      seconds: "Sekunden",
      start: "Start",
      pause: "Pause",
      resume: "Weiter",
      reset: "Zurücksetzen",
      addMinute: "+1 Min.",
      done: "Zeit ist um!",
      stop: "Ton aus",
      minuteShort: "Min.",
      secondShort: "Sek.",
      hourShort: "Std.",
      endsAt: "Ende um",
      theme: "Farbe",
      themes: { teal: "Türkis", night: "Nacht", sunset: "Abendrot", forest: "Wald", mono: "Schlicht" },
    },
    stopwatch: {
      start: "Start",
      stop: "Stopp",
      lap: "Runde",
      reset: "Zurücksetzen",
      laps: "Rundenzeiten",
      lapTime: "Rundenzeit",
      total: "Gesamt",
      fastest: "Schnellste",
      slowest: "Langsamste",
      download: "Runden herunterladen (CSV)",
      empty: "Während die Stoppuhr läuft, „Runde“ drücken, um Rundenzeiten zu speichern.",
    },
    clock: {
      themes: {
        analog: "Klassisch",
        station: "Bahnhofsuhr",
        roman: "Römisch",
        gold: "Gold",
        night: "Nacht",
        digital: "Digital",
        minimal: "Schlicht",
        sunset: "Abendrot",
        flip: "Klappzahlen",
        neon: "Neon",
        led: "LED",
        terminal: "Terminal",
        binary: "Binär",
        pendulum: "Pendeluhr",
        cuckoo: "Kuckucksuhr",
        pocket: "Taschenuhr",
        twinbell: "Glockenwecker",
        nixie: "Nixie-Röhren",
        diver: "Taucheruhr",
        chrono: "Chronograph",
        dress: "Klassische Armbanduhr",
        field: "Fliegeruhr",
        lcd: "Retro-Digital",
        smart: "Smartwatch",
        mantel: "Kaminuhr",
        tower: "Turmuhr",
        school: "Schuluhr",
        ship: "Schiffsuhr",
        radio: "Radiowecker",
        skeleton: "Skelettuhr",
        moonphase: "Mondphasenuhr",
        word: "Wortuhr",
        hourglass: "Sanduhr",
        sunmoon: "Tageslauf",
      },
      families: { analog: "Analog", digital: "Digital", vintage: "Alte Uhren", watch: "Armbanduhren", special: "Besondere Uhren" },
      sound: "Ton",
      tick: "Ticken",
      chime: "Stundenschlag",
      listen: "Schlag anhören",
      soundHint: "Die Töne entstehen im Browser; jede Uhr hat ihr eigenes Werkgeräusch und ihren eigenen Stundenschlag.",
      theme: "Design",
      options: "Anzeige",
      hour24: "24 Stunden",
      seconds: "Sekunden",
      date: "Datum",
      timeZone: "Ihre Zeitzone",
      am: "AM",
      pm: "PM",
      dateLocale: "de-DE",
    },
  },
};
