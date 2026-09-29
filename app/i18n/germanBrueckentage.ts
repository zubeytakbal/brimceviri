// Brueckentage-Seiten: Jahre, Pfade und Uebersicht je Bundesland (serverseitig berechnet).
import { brueckentage } from "./germanCalendarTools";
import {
  brueckenJeFeiertag,
  feiertageAmWochenende,
  MO_BIS_FR,
  optimalerPlan,
} from "../converter/time/brueckentage";
import {
  GERMAN_STATES,
  stateHolidays,
  type StateCode,
} from "../converter/time/germanHolidays";
import { weekdayOf } from "../converter/time/dateMath";

/** Jahre mit eigener Seite; neues Jahr ueber annualUpdates (de-brueckentage) ergaenzen. */
export const BRUECKENTAGE_JAHRE = [2026, 2027] as const;
export const PLANER_JAHRE = [2026, 2027, 2028];

export const brueckentagePfad = (jahr: number) => `/de/brueckentage/${jahr}`;

/** Jahr, das gerade geplant wird: ab September das Folgejahr. */
export function planungsjahr(now = new Date()) {
  const y = now.getUTCFullYear();
  return now.getUTCMonth() >= 8 ? y + 1 : y;
}

const standard = (state: StateCode, year: number) => ({
  state,
  year,
  workdays: MO_BIS_FR,
  partial: [],
  heiligabendFrei: false,
  silvesterFrei: false,
});

export function laenderUebersicht(year: number) {
  return GERMAN_STATES.map((s) => {
    const o = standard(s.code, year);
    const feiertage = stateHolidays(s.code, year);
    const werktags = feiertage.filter((h) => {
      const w = weekdayOf(h.date);
      return w >= 1 && w <= 5;
    });
    const plan = optimalerPlan(o, 30);
    return {
      state: s,
      feiertage: feiertage.length,
      werktags: werktags.length,
      wochenende: feiertageAmWochenende(o).length,
      bruecken: brueckentage(s.code, year),
      plan30: plan.freieTage,
      plan30Urlaub: plan.urlaub,
    };
  });
}

/** Bundesweite und regionale Brücken mit der jeweils effizientesten Option (bis 4 Urlaubstage). */
export function brueckenUebersicht(year: number) {
  const map = new Map<
    string,
    {
      feiertag: string;
      datum: { year: number; month: number; day: number };
      laender: string[];
      urlaub: number;
      tage: number;
      von: { year: number; month: number; day: number };
      bis: { year: number; month: number; day: number };
    }
  >();
  for (const s of GERMAN_STATES) {
    for (const b of brueckenJeFeiertag(standard(s.code, year), 4)) {
      const best = [...b.optionen].sort(
        (x, y) => y.tage / y.urlaub - x.tage / x.urlaub || x.urlaub - y.urlaub,
      )[0];
      if (!best) continue;
      // Feiertage im selben Zeitraum (Neujahr und Heilige Drei Könige) in einer Zeile zusammenfassen.
      const key = `${best.von.month}-${best.von.day}|${best.bis.month}-${best.bis.day}|${best.urlaub}`;
      const hit = map.get(key);
      if (hit) {
        if (!hit.laender.includes(s.short)) hit.laender.push(s.short);
        for (const f of best.feiertage)
          if (!hit.feiertag.split(", ").includes(f)) hit.feiertag += `, ${f}`;
      } else
        map.set(key, {
          feiertag: best.feiertage.join(", "),
          datum: b.datum,
          laender: [s.short],
          urlaub: best.urlaub,
          tage: best.tage,
          von: best.von,
          bis: best.bis,
        });
    }
  }
  return [...map.values()].sort(
    (a, b) => a.datum.month - b.datum.month || a.datum.day - b.datum.day,
  );
}
