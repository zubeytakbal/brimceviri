import { NORDIC_TIMER_SECONDS, nordicTimerPath } from "./nordicTimerPresets";
import { buildLanguageAlternates } from "./routing";

// Zamanlayici hazir sure sayfalari (saniye cinsinden). URL kurali:
// 60 sn altinda ya da 90 sn: "30-saniye" / "30-seconds"; dakika: "5-dakika" / "5-minutes"
// ("1-minute"); 2 saat ve uzeri: "2-saat" / "2-hours". Eski dakika adresleri aynen korunur.
export type TimerPreset = { seconds: number; tr: string; en: string; labelTr: string; labelEn: string; usesTr: string[]; usesEn: string[] };

type Unit = "s" | "m" | "h";

function preset(value: number, unit: Unit, usesTr: string[], usesEn: string[]): TimerPreset {
  const seconds = unit === "s" ? value : unit === "m" ? value * 60 : value * 3600;
  const tr = unit === "s" ? `${value}-saniye` : unit === "m" ? `${value}-dakika` : `${value}-saat`;
  const en = unit === "s" ? `${value}-seconds` : unit === "m" ? (value === 1 ? "1-minute" : `${value}-minutes`) : `${value}-hours`;
  const labelTr = unit === "s" ? `${value} saniye` : unit === "m" ? `${value} dakika` : `${value} saat`;
  const labelEn = unit === "s" ? `${value} second` : unit === "m" ? `${value} minute` : `${value} hour`;
  return { seconds, tr, en, labelTr, labelEn, usesTr, usesEn };
}

export const timerPresets: TimerPreset[] = [
  preset(10, "s", ["Tabata arası dinlenme", "Hızlı karar oyunları", "Sınıfta kısa cevap süresi"], ["Tabata rest interval", "Quick-decision games", "Short answer time in class"]),
  preset(15, "s", ["Plank arası mola", "Hızlı el yıkama kontrolü", "Oyun turu"], ["Rest between planks", "Hand-washing check", "Game round"]),
  preset(20, "s", ["El yıkama (önerilen süre)", "Tabata çalışma aralığı", "Göz dinlendirme (20-20-20 kuralı)"], ["Hand washing (recommended time)", "Tabata work interval", "Eye break (20-20-20 rule)"]),
  preset(30, "s", ["Plank ya da duvar oturuşu", "Kısa sunum cümlesi", "Esneme hareketi"], ["Plank or wall sit", "Elevator pitch drill", "Single stretch hold"]),
  preset(45, "s", ["HIIT çalışma aralığı", "Kısa esneme", "Mikrodalga ısıtma"], ["HIIT work interval", "Short stretch", "Microwave reheating"]),
  preset(90, "s", ["Setler arası dinlenme", "Hazır noodle", "Kısa nefes egzersizi"], ["Rest between sets", "Instant noodles", "Short breathing exercise"]),
  preset(1, "m", ["Hızlı esneme ya da plank", "1 dakikalık konuşma provası", "Diş fırçalamanın yarısı"], ["A quick stretch or plank", "A one-minute speech drill", "Half of a proper tooth-brushing"]),
  preset(2, "m", ["Diş fırçalama (önerilen süre)", "Hazır çay demleme", "Kısa nefes egzersizi"], ["Brushing your teeth (recommended time)", "Instant noodles", "A short breathing exercise"]),
  preset(3, "m", ["Rafadan yumurta", "Poşet çay demleme", "Kısa sunum"], ["Soft-boiled egg", "Steeping a tea bag", "A lightning talk"]),
  preset(4, "m", ["Yeşil çay demleme", "Tabata turu (8 × 30 sn)", "Hızlı plank serisi"], ["Steeping green tea", "One Tabata round (8 × 30 s)", "A quick plank series"]),
  preset(5, "m", ["Mola (Pomodoro kısa ara)", "Hızlı ısınma", "Kafa dağıtma"], ["A Pomodoro short break", "A quick warm-up", "Black tea"]),
  preset(6, "m", ["Kayısı kıvamında yumurta", "Kısa meditasyon", "Makarna sosunu kısık ateşte bekletme"], ["Jammy egg", "Short meditation", "Simmering a pasta sauce"]),
  preset(7, "m", ["Yumurta (orta-katı)", "7 dakikalık egzersiz programı", "Konuşma provası"], ["Medium-hard egg", "The 7-minute workout", "Speech rehearsal"]),
  preset(8, "m", ["Makarna (al dente)", "Kısa kestirme", "Hızlı ev toparlama"], ["Pasta al dente", "A micro nap", "A quick tidy-up"]),
  preset(9, "m", ["Katı yumurta", "Pirinç demleme", "Kısa yoga akışı"], ["Hard-boiled egg", "Resting rice", "Short yoga flow"]),
  preset(10, "m", ["Katı yumurta", "Kısa meditasyon", "Hızlı ev toparlama"], ["Hard-boiled eggs", "A short meditation", "A quick tidy-up"]),
  preset(12, "m", ["Makarna (tam pişmiş)", "Kısa koşu", "Çalışma molası"], ["Well-cooked pasta", "A short run", "Study break"]),
  preset(15, "m", ["Kestirme (power nap)", "Çay demleme", "Kısa sınav bölümü"], ["A power nap", "A quiz section", "Reading break"]),
  preset(20, "m", ["Kısa öğle uykusu", "Fırında sebze", "Okuma seansı"], ["A short nap", "Roasted vegetables", "A reading session"]),
  preset(25, "m", ["Pomodoro çalışma bloğu", "Kek pişirme", "Odaklanmış çalışma"], ["A Pomodoro work block", "Baking cupcakes", "Deep-focus work"]),
  preset(30, "m", ["Ders çalışma bloğu", "Yürüyüş", "Uzun Pomodoro arası"], ["A study session", "A brisk walk", "A long Pomodoro break"]),
  preset(35, "m", ["Kek (standart kalıp)", "Antrenman", "Ders tekrarı"], ["Standard cake", "A workout", "Revision session"]),
  preset(40, "m", ["Ders saati", "Fırında börek", "Çalışma bloğu"], ["A class period", "Oven-baked pastry", "A work block"]),
  preset(45, "m", ["Ders saati", "Antrenman", "Fırında tavuk"], ["A class period", "A workout", "Roast chicken pieces"]),
  preset(50, "m", ["Üniversite ders saati", "Uzun koşu", "Derin çalışma"], ["A university lecture", "A long run", "Deep work"]),
  preset(60, "m", ["Sınav süresi", "Uzun çalışma bloğu", "Fırında yemek"], ["An exam", "A long work block", "Slow-cooked dishes"]),
  preset(90, "m", ["Uyku döngüsü (tam bir döngü)", "Futbol maçı süresi", "Uzun sınav"], ["One full sleep cycle", "A football (soccer) match", "A long exam"]),
  preset(2, "h", ["Film süresi", "Uzun sınav (ör. deneme sınavı)", "Yavaş pişen yemek"], ["A movie", "A long exam or mock test", "Slow-cooked dishes"]),
  preset(3, "h", ["AYT oturumu (180 dakika)", "Hamur mayalama", "Uzun doğa yürüyüşü"], ["A 3-hour exam", "Proofing dough", "A long hike"]),
  preset(4, "h", ["Etkinlik süresi", "Hamur soğutma", "Park süresi"], ["Event length", "Chilling dough", "Parking limit"]),
  preset(5, "h", ["Yarım günlük etkinlik", "İki oturumlu sınav günü", "Yavaş pişirici (yüksek ayar)"], ["A half-day event", "An exam day with two sessions", "Slow cooker on high"]),
  preset(6, "h", ["Yarım iş günü", "Et marine etme", "Uzun yolculuk"], ["Half a workday", "Marinating meat", "A long journey"]),
  preset(8, "h", ["Tam iş günü", "Uyku (7-9 saat)", "Kurutma / fermente etme"], ["A full workday", "A night's sleep", "Drying or fermenting"]),
  preset(12, "h", ["Hamur (uzun fermantasyon)", "Nöbet süresi", "Günde iki ilaç arası"], ["Long dough fermentation", "A long shift", "Twice-daily medicine interval"]),
  preset(24, "h", ["Bir tam gün", "Aralıklı oruç (24 saat)", "Yoğurt/kefir mayalama"], ["A full day", "24-hour fast", "Yogurt or kefir culturing"]),
];

export function findTimerPreset(lang: "tr" | "en", slug: string) {
  return timerPresets.find((p) => (lang === "tr" ? p.tr : p.en) === slug) ?? null;
}

/** Deutscher URL-Teil: "30-sekunden", "1-minute", "5-minuten", "2-stunden". */
export function timerSlugDe(p: TimerPreset) {
  if (p.seconds < 60 || p.seconds === 90) return `${p.seconds}-sekunden`;
  if (p.seconds < 7200) {
    const m = p.seconds / 60;
    return m === 1 ? "1-minute" : `${m}-minuten`;
  }
  return `${p.seconds / 3600}-stunden`;
}

export function timerPresetPath(p: TimerPreset, lang: "tr" | "en" | "de") {
  return lang === "tr" ? `/zamanlayici/${p.tr}` : lang === "de" ? `/de/timer/${timerSlugDe(p)}` : `/en/timer/${p.en}`;
}

/** Hazır süre sayfasının İskandinav karşılıkları (yalnızca 14 popüler süre için var). */
export function nordicTimerPresetPaths(p: TimerPreset) {
  return (NORDIC_TIMER_SECONDS as readonly number[]).includes(p.seconds)
    ? { sv: nordicTimerPath("sv", p.seconds), no: nordicTimerPath("no", p.seconds), da: nordicTimerPath("da", p.seconds) }
    : {};
}

export function timerPresetAlternates(p: TimerPreset) {
  return buildLanguageAlternates(
    { tr: timerPresetPath(p, "tr"), en: timerPresetPath(p, "en"), de: timerPresetPath(p, "de"), ...nordicTimerPresetPaths(p) },
    "tr"
  );
}

/** Zamanlayici dugmeleri icin: saniye -> hazir sayfa yolu. */
export function timerPresetLinks(lang: "tr" | "en") {
  return Object.fromEntries(timerPresets.map((p) => [p.seconds, timerPresetPath(p, lang)]));
}

/** "5 dakikalık", "30 saniyelik", "2 saatlik" (unlu uyumu; "saat" ince ek alir). */
export function trLik(p: TimerPreset) {
  return p.labelTr.endsWith("dakika") ? `${p.labelTr}lık` : `${p.labelTr}lik`;
}
