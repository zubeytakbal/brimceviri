// Almanca araçların tek listesi: /de/rechner hub sayfası, üst menüdeki
// "Rechner" ve "Kalender & Uhr" açılır menüleri buradan beslenir. Yeni bir
// Almanca araç eklenince buraya da eklenmeli; tests/germanToolDirectory.test.ts
// eksik ya da kırık adresleri yakalar.
import type { ToolGroup, ToolLink } from "./turkishToolDirectory";

export const GERMAN_TOOL_HUB_PATH = "/de/rechner";

export const germanToolGroups: ToolGroup[] = [
  {
    id: "geld-arbeit",
    title: "Geld, Steuern und Arbeit",
    description: "Nettogehalt, Prozente, Grunderwerbsteuer, Pendlerpauschale, Urlaub und Kündigungsfristen – nach aktuellem Recht.",
    links: [
      { href: "/de/brutto-netto-rechner", label: "Brutto-Netto-Rechner" },
      { href: "/de/mehrwertsteuer-rechner", label: "Mehrwertsteuer-Rechner" },
      { href: "/de/zinseszinsrechner", label: "Zinseszinsrechner" },
      { href: "/de/kreditrechner", label: "Kreditrechner" },
      { href: "/de/tilgungsrechner", label: "Tilgungsrechner (Baufinanzierung)" },
      { href: "/de/prozentrechner", label: "Prozentrechner" },
      { href: "/de/grunderwerbsteuer-rechner", label: "Grunderwerbsteuer-Rechner" },
      { href: "/de/pendlerpauschale-rechner", label: "Pendlerpauschale-Rechner" },
      { href: "/de/urlaubsrechner", label: "Urlaubsrechner" },
      { href: "/de/kuendigungsfrist-rechner", label: "Kündigungsfrist-Rechner" },
      { href: "/de/mutterschutzrechner", label: "Mutterschutzrechner" },
      { href: "/de/eisprungrechner", label: "Eisprungrechner (fruchtbare Tage)" },
      { href: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner" },
      { href: "/de/waehrungsrechner", label: "Währungsrechner" },
      { href: "/de/goldrechner", label: "Goldrechner (333, 585, 750)" },
    ],
  },
  {
    id: "kalender",
    title: "Kalender und Feiertage",
    description: "Kalenderwoche, Feiertage aller Bundesländer, Brückentage, Arbeitstage und Countdowns.",
    links: [
      { href: "/de/kalender", label: "Kalender mit Feiertagen" },
      { href: "/de/altersrechner", label: "Altersrechner" },
      { href: "/de/kalenderwoche", label: "Aktuelle Kalenderwoche" },
      { href: "/de/feiertage", label: "Feiertage Deutschland" },
      { href: "/de/feiertage-oesterreich", label: "Feiertage Österreich" },
      { href: "/de/brueckentage", label: "Brückentage-Rechner" },
      { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" },
      { href: "/de/tagerechner", label: "Tagerechner" },
      { href: "/de/countdown", label: "Countdown (Tage bis …)" },
      { href: "/de/besondere-tage", label: "Besondere Tage" },
      { href: "/de/zeitumstellung", label: "Zeitumstellung" },
      { href: "/de/vollmond", label: "Vollmond-Termine" },
      { href: "/de/bauernregeln", label: "Bauernregeln und Lostage" },
    ],
  },
  {
    id: "uhr-timer",
    title: "Uhr und Timer",
    description: "Online-Uhr, Weltuhr, Zeitzonen, Timer, Wecker und Stoppuhr – ohne Installation.",
    links: [
      { href: "/de/online-uhr", label: "Online-Uhr" },
      { href: "/de/weltuhr", label: "Weltuhr" },
      { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
      { href: "/de/timer", label: "Timer" },
      { href: "/de/wecker", label: "Wecker" },
      { href: "/de/stoppuhr", label: "Stoppuhr" },
      { href: "/de/pomodoro-timer", label: "Pomodoro-Timer" },
      { href: "/de/intervall-timer", label: "Intervall-Timer" },
      { href: "/de/eieruhr", label: "Eieruhr" },
    ],
  },
  {
    id: "gesundheit-sport",
    title: "Gesundheit und Sport",
    description: "BMI, Schwangerschaftswoche, Schlafenszeit und Lauftempo.",
    links: [
      { href: "/de/bmi-rechner", label: "BMI-Rechner" },
      { href: "/de/schwangerschaftswochen-rechner", label: "Schwangerschaftswochen-Rechner" },
      { href: "/de/schlafrechner", label: "Schlafrechner" },
      { href: "/de/lauftempo-rechner", label: "Lauftempo-Rechner" },
    ],
  },
  {
    id: "haus-energie-auto",
    title: "Haus, Energie und Auto",
    description: "Farbe, Fliesen, Laminat und Tapete berechnen, Strom- und Gaskosten, Spritverbrauch und E-Auto laden.",
    links: [
      { href: "/de/farbrechner", label: "Farbrechner (Wandfarbe)" },
      { href: "/de/fliesenrechner", label: "Fliesenrechner" },
      { href: "/de/laminatrechner", label: "Laminatrechner" },
      { href: "/de/tapetenrechner", label: "Tapetenrechner" },
      { href: "/de/ziegelrechner", label: "Ziegelrechner" },
      { href: "/de/umzugskartons-rechner", label: "Umzugskartons-Rechner" },
      { href: "/de/stromkostenrechner", label: "Stromkostenrechner (Abschlag, Tarifvergleich)" },
      { href: "/de/stromverbrauch-rechner", label: "Stromverbrauchsrechner (pro Gerät)" },
      { href: "/de/erdgaskosten-rechner", label: "Erdgaskosten-Rechner" },
      { href: "/de/klima-btu-rechner", label: "Klima-BTU-Rechner" },
      { href: "/de/kraftstoffverbrauchsrechner", label: "Kraftstoffverbrauchsrechner" },
      { href: "/de/e-auto-laderechner", label: "E-Auto-Laderechner" },
    ],
  },
  {
    id: "mathe-schule",
    title: "Mathe und Schule",
    description: "Brüche, Dreisatz, pq-Formel, Geometrie und Noten – mit Formel und Rechenweg.",
    links: [
      { href: "/de/mathe-rechner", label: "Mathe-Rechner (Übersicht)" },
      { href: "/de/bruchrechner", label: "Bruchrechner" },
      { href: "/de/dreisatz-rechner", label: "Dreisatz-Rechner" },
      { href: "/de/pq-formel-rechner", label: "pq-Formel-Rechner" },
      { href: "/de/gleichungssystem-rechner", label: "Gleichungssystem-Rechner" },
      { href: "/de/satz-des-pythagoras-rechner", label: "Satz des Pythagoras" },
      { href: "/de/flaechenrechner", label: "Flächenrechner" },
      { href: "/de/volumenrechner", label: "Volumenrechner" },
      { href: "/de/wurzelrechner", label: "Wurzelrechner" },
      { href: "/de/ggt-kgv-rechner", label: "ggT und kgV" },
      { href: "/de/primfaktorzerlegung", label: "Primfaktorzerlegung" },
      { href: "/de/schriftlich-dividieren", label: "Schriftlich dividieren" },
      { href: "/de/mittelwert-rechner", label: "Mittelwert und Median" },
      { href: "/de/binomialkoeffizient-rechner", label: "Binomialkoeffizient (n über k)" },
      { href: "/de/roemische-zahlen", label: "Römische Zahlen" },
      { href: "/de/notenrechner", label: "Notenrechner" },
    ],
  },
  {
    id: "kueche-alltag",
    title: "Küche und Alltag",
    description: "Küchenmaße, Rezepte skalieren, Schuh- und Ringgrößen umrechnen.",
    links: [
      { href: "/de/kuechenmass-umrechner", label: "Küchenmaß-Umrechner" },
      { href: "/de/rezept-umrechner", label: "Rezept-Umrechner" },
      { href: "/de/laengenvergleich", label: "Längenvergleich" },
      { href: "/de/gewichtsvergleich", label: "Gewichtsvergleich" },
      { href: "/de/schuhgroessen-umrechner", label: "Schuhgrößen-Umrechner" },
      { href: "/de/ringgroessen-umrechner", label: "Ringgrößen-Umrechner" },
    ],
  },
  {
    id: "wissenschaft-technik",
    title: "Wissenschaft und Technik",
    description: "Ingenieurrechner, Periodensystem, Molare Masse, Werkstoffe und historische Maßeinheiten.",
    links: [
      { href: "/de/ingenieurrechner", label: "Ingenieurrechner" },
      { href: "/de/periodensystem", label: "Periodensystem" },
      { href: "/de/chemische-verbindungen", label: "Molare Masse (Verbindungen)" },
      { href: "/de/atommasse-berechnen", label: "Atommasse berechnen" },
      { href: "/de/elementrangliste", label: "Schwerste und leichteste Elemente" },
      { href: "/de/werkstoffeigenschaften", label: "Werkstoffeigenschaften" },
      { href: "/de/materialgewicht-berechnen", label: "Materialgewicht berechnen" },
      { href: "/de/historische-masseinheiten", label: "Historische Maßeinheiten" },
    ],
  },
  {
    id: "laender",
    title: "Länder und Entfernungen",
    description: "Länder der Welt mit Zeitverschiebung und Entfernungen zwischen deutschen Städten.",
    links: [
      { href: "/de/laender", label: "Länder und Hauptstädte" },
      { href: "/de/entfernung", label: "Entfernungsrechner" },
    ],
  },
];

const byHref = new Map(
  germanToolGroups.flatMap((group) => group.links.map((link) => [link.href, link] as const))
);

function pick(hrefs: string[]): ToolLink[] {
  return hrefs.map((href) => {
    const link = byHref.get(href);
    if (!link) throw new Error(`germanToolDirectory: ${href} listede yok`);
    return link;
  });
}

/** Üst menü "Rechner": Almanya'da en çok aranan hesaplayıcılar önde. */
export const germanCalculatorMenu = pick([
  "/de/brutto-netto-rechner",
  "/de/mehrwertsteuer-rechner",
  "/de/zinseszinsrechner",
  "/de/kreditrechner",
  "/de/tilgungsrechner",
  "/de/prozentrechner",
  "/de/dreisatz-rechner",
  "/de/bruchrechner",
  "/de/notenrechner",
  "/de/bmi-rechner",
  "/de/grunderwerbsteuer-rechner",
  "/de/pendlerpauschale-rechner",
  "/de/urlaubsrechner",
  "/de/stromkostenrechner",
  "/de/mathe-rechner",
]);

/** Üst menü "Kalender & Uhr". */
export const germanTimeMenu = pick([
  "/de/kalender",
  "/de/altersrechner",
  "/de/kalenderwoche",
  "/de/feiertage",
  "/de/brueckentage",
  "/de/tagerechner",
  "/de/arbeitstage-rechner",
  "/de/countdown",
  "/de/online-uhr",
  "/de/weltuhr",
  "/de/zeitzonenrechner",
  "/de/timer",
  "/de/wecker",
  "/de/stoppuhr",
]);
