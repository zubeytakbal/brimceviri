import type { CountdownCopy } from "./CountdownDisplay";
import type { CustomCountdownCopy } from "./CustomCountdown";

export const countdownCopy: Record<"tr" | "en" | "de", CountdownCopy> = {
  de: { days: "Tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden", today: "Heute ist es so weit!", until: "Ziel" },
  tr: { days: "gün", hours: "saat", minutes: "dakika", seconds: "saniye", today: "Bugün!", until: "Hedef" },
  en: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds", today: "It's today!", until: "Target" },
};

export const customCountdownCopy: Record<"tr" | "en" | "de", CustomCountdownCopy> = {
  de: {
    ...countdownCopy.de,
    heading: "Eigenen Countdown erstellen",
    titleLabel: "Titel",
    titlePlaceholder: "z. B. Geburtstag, Abiprüfung, Urlaub",
    dateLabel: "Datum",
    timeLabel: "Uhrzeit",
    add: "Countdown starten",
    share: "Link zum Teilen kopieren",
    copied: "Kopiert ✓",
    remove: "Löschen",
    empty: "Noch kein eigener Countdown. Datum wählen und starten – er wird in diesem Browser gespeichert.",
    shared: "Ein mit Ihnen geteilter Countdown:",
  },
  tr: {
    ...countdownCopy.tr,
    heading: "Kendi geri sayımını oluştur",
    titleLabel: "Başlık",
    titlePlaceholder: "ör. Doğum günüm, YKS, tatil",
    dateLabel: "Tarih",
    timeLabel: "Saat",
    add: "Geri sayımı başlat",
    share: "Paylaşım linkini kopyala",
    copied: "Kopyalandı ✓",
    remove: "Sil",
    empty: "Henüz kendi geri sayımın yok. Tarih seç ve başlat; bu tarayıcıda saklanır.",
    shared: "Sana gönderilen geri sayım:",
  },
  en: {
    ...countdownCopy.en,
    heading: "Create your own countdown",
    titleLabel: "Title",
    titlePlaceholder: "e.g. My birthday, exam, vacation",
    dateLabel: "Date",
    timeLabel: "Time",
    add: "Start countdown",
    share: "Copy share link",
    copied: "Copied ✓",
    remove: "Delete",
    empty: "No countdowns yet. Pick a date and start — it's saved in this browser.",
    shared: "A countdown shared with you:",
  },
};
