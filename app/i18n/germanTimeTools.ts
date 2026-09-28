// Deutsche Zeit-Werkzeuge: Timer-Voreinstellungen, Weckzeiten und Links.
// Die Dauern entsprechen den türkischen und englischen Seiten (hreflang); Beispiele und
// Anlässe sind für den deutschsprachigen Alltag geschrieben (Schulstunde, Frühstücksei …).
import { alarmPresetTimes, alarmSlugDe } from "./timeToolPaths";

export { alarmSlugDe };
import { timerPresetPath, timerPresets, timerSlugDe, type TimerPreset } from "./timerPresets";

export { timerSlugDe };

export function timerLabelDe(p: TimerPreset) {
  if (p.seconds < 60 || p.seconds === 90) return `${p.seconds} Sekunden`;
  if (p.seconds < 7200) {
    const m = p.seconds / 60;
    return m === 1 ? "1 Minute" : `${m} Minuten`;
  }
  return `${p.seconds / 3600} Stunden`;
}

/** "5-Minuten-Timer", "1-Minuten-Timer", "90-Sekunden-Timer" */
export function timerTitleDe(p: TimerPreset) {
  const label = timerLabelDe(p);
  const [n, unit] = label.split(" ");
  const stem = unit.startsWith("Minute") ? "Minuten" : unit.startsWith("Sekunde") ? "Sekunden" : "Stunden";
  return `${n}-${stem}-Timer`;
}

export const timerPathDe = (p: TimerPreset) => timerPresetPath(p, "de");

export function findTimerPresetDe(slug: string) {
  return timerPresets.find((p) => timerSlugDe(p) === slug) ?? null;
}

export function timerPresetLinksDe() {
  return Object.fromEntries(timerPresets.map((p) => [p.seconds, timerPathDe(p)]));
}

/** Anlässe je Dauer (Sekunden). */
export const timerUsesDe: Record<number, string[]> = {
  10: ["Kurze Pause zwischen zwei Übungen", "Schnellrunde beim Spieleabend", "Antwortzeit beim Quiz im Unterricht"],
  15: ["Pause zwischen Liegestütz-Sätzen", "Zug beim Brettspiel", "Kurzes Dehnen der Waden"],
  20: ["Händewaschen (empfohlen: 20 bis 30 Sekunden)", "Belastungsphase beim Tabata", "Augenpause nach der 20-20-20-Regel"],
  30: ["Plank oder Wandsitzen", "Mundspülung", "Dehnübung halten"],
  45: ["HIIT-Belastungsintervall", "Milch in der Mikrowelle erwärmen", "Kurze Dehnpause am Schreibtisch"],
  90: ["Satzpause beim Krafttraining", "Porridge in der Mikrowelle", "Kurze Atemübung"],
  60: ["Plank oder Wandsitzen", "Ein-Minuten-Vortrag üben", "Kurze Dehnpause"],
  120: ["Zähneputzen (von Zahnärzten empfohlen)", "Grünen Tee ziehen lassen (2 bis 3 Minuten)", "Kurze Atemübung"],
  180: ["Sehr weiches Frühstücksei", "Teebeutel ziehen lassen", "Kurzvortrag"],
  240: ["Weiches Frühstücksei", "Eine Tabata-Runde (8 × 20 s Belastung, 10 s Pause)", "Schwarzen Tee ziehen lassen"],
  300: ["Stoßlüften im Winter", "Kurze Pause beim Pomodoro", "Aufwärmen vor dem Sport"],
  360: ["Wachsweiches Ei", "Aufbackbrötchen (6 bis 8 Minuten)", "Kurze Meditation"],
  420: ["Wachsweiches bis festes Ei", "Das 7-Minuten-Workout", "Rede oder Referat proben"],
  480: ["Nudeln al dente (je nach Sorte)", "Festes Ei", "Schnell aufräumen"],
  540: ["Hartgekochtes Ei", "Spaghetti", "Kurzer Yoga-Flow"],
  600: ["Hartes Ei (Größe L)", "Kurze Meditation", "Schreibtisch aufräumen"],
  720: ["Tiefkühlpizza (12 bis 15 Minuten)", "Nudeln weich gekocht", "Lernpause"],
  900: ["Powernap", "Kleine Pause in der Schule oder im Büro", "Lesepause"],
  1200: ["Kurzes Mittagsschläfchen", "Ofengemüse", "Lesezeit"],
  1500: ["Pomodoro-Arbeitsblock", "Muffins backen (20 bis 25 Minuten)", "Konzentriertes Arbeiten"],
  1800: ["Lernblock", "Zügiger Spaziergang", "Lange Pomodoro-Pause"],
  2100: ["Blechkuchen (etwa 30 bis 35 Minuten)", "Training", "Vokabeln wiederholen"],
  2400: ["Lasagne im Ofen", "Trainingseinheit", "Arbeitsblock"],
  2700: ["Eine Schulstunde (45 Minuten)", "Eine Halbzeit im Fußball", "Training"],
  3000: ["Rührkuchen (50 bis 60 Minuten)", "Längerer Lauf", "Konzentrierte Arbeitsphase"],
  3600: ["Marmorkuchen (etwa 60 Minuten)", "Klausur", "Langer Arbeitsblock"],
  5400: ["Eine Doppelstunde (90 Minuten)", "Ein Fußballspiel (2 × 45 Minuten)", "Ein ganzer Schlafzyklus"],
  7200: ["Kinofilm", "Rinderrouladen schmoren", "Lange Klausur"],
  10800: ["Schweinebraten (etwa 2,5 bis 3 Stunden)", "Abiturklausur (je nach Fach)", "Wanderung"],
  14400: ["Halbtägiger Workshop", "Teig im Kühlschrank ruhen lassen", "Veranstaltung"],
  18000: ["Halber Tag", "Schongarer auf hoher Stufe", "Tagesausflug"],
  21600: ["Halber Arbeitstag", "Fleisch marinieren", "Lange Autofahrt"],
  28800: ["Ein Arbeitstag (8 Stunden)", "Eine Nacht Schlaf (7 bis 9 Stunden)", "Obst dörren"],
  43200: ["Brotteig über Nacht gehen lassen", "Eine 12-Stunden-Schicht", "Medikament zweimal täglich"],
  86400: ["Ein ganzer Tag", "24-Stunden-Fasten", "Joghurt selbst ansetzen"],
};

/* ---------------- Wecker ---------------- */

/** "06:30" → "6:30 Uhr" */
export const alarmLabelDe = (time: string) => {
  const [h, m] = time.split(":");
  return `${Number(h)}:${m} Uhr`;
};

export const alarmPathDe = (time: string) => `/de/wecker/${alarmSlugDe(time)}`;

export function findAlarmTimeDe(slug: string) {
  return alarmPresetTimes.find((t) => alarmSlugDe(t) === slug) ?? null;
}

/* ---------------- Links ---------------- */

export const germanTimeToolLinks = [
  { href: "/de/online-uhr", label: "Online-Uhr" },
  { href: "/de/timer", label: "Timer" },
  { href: "/de/eieruhr", label: "Eieruhr" },
  { href: "/de/stoppuhr", label: "Stoppuhr" },
  { href: "/de/wecker", label: "Wecker" },
  { href: "/de/countdown", label: "Countdown" },
  { href: "/de/weltuhr", label: "Weltuhr" },
  { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
  { href: "/de/schlafrechner", label: "Schlafrechner" },
];

export const timeToolsRelatedDe = (exclude: string) => germanTimeToolLinks.filter((l) => l.href !== exclude);
