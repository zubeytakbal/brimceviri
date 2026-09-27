import type { CountdownCopy } from "./CountdownDisplay";
import type { CustomCountdownCopy } from "./CustomCountdown";

export const countdownCopy: Record<"tr" | "en", CountdownCopy> = {
  tr: { days: "gün", hours: "saat", minutes: "dakika", seconds: "saniye", today: "Bugün!", until: "Hedef" },
  en: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds", today: "It's today!", until: "Target" },
};

export const customCountdownCopy: Record<"tr" | "en", CustomCountdownCopy> = {
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
