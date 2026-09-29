// Brueckentage-Planer: Urlaubstage so verteilen, dass moeglichst viele freie Tage am Stueck entstehen.
// Freie Tage = arbeitsfreie Wochentage (frei waehlbar, z. B. Teilzeit), gesetzliche Feiertage des Bundeslands
// (regionale auf Wunsch) und optional der 24. und 31. Dezember. Urlaub kann nur im gewaehlten Jahr genommen werden;
// freie Tage direkt davor und danach (z. B. Neujahr) zaehlen zum Zeitraum.
import type { YMD } from "./calendars";
import { addDaysYmd, weekdayOf, ymdKey } from "./dateMath";
import { germanHolidaysCached, type StateCode } from "./germanHolidays";

export type BrueckenOptionen = {
  state: StateCode;
  year: number;
  /** Arbeitstage, Index 0 = Sonntag … 6 = Samstag (wie Date.getUTCDay) */
  workdays: boolean[];
  /** IDs regional geltender Feiertage, die fuer den Nutzer gelten (z. B. mariae-himmelfahrt) */
  partial: string[];
  heiligabendFrei: boolean;
  silvesterFrei: boolean;
};

export const MO_BIS_FR = [false, true, true, true, true, true, false];

export type Tag = {
  date: YMD;
  key: string;
  frei: boolean;
  feiertag: string | null;
  imJahr: boolean;
  /** Halber Arbeitstag (TR: Arefe) — kostet einen halben Urlaubstag */
  halb?: boolean;
};

export type Zeitraum = {
  von: YMD;
  bis: YMD;
  tage: number;
  urlaub: number;
  urlaubstage: YMD[];
  feiertage: string[];
};

const PAD = 14;

/** Tage des Jahres mit zwei Wochen Rand davor und danach. */
export function tageDesJahres(o: BrueckenOptionen): Tag[] {
  const hol = new Map<string, string>();
  for (const y of [o.year - 1, o.year, o.year + 1]) {
    for (const h of germanHolidaysCached(y)) {
      if (h.sunday) continue;
      if (
        h.states.includes(o.state) ||
        (h.partialStates?.includes(o.state) && o.partial.includes(h.id))
      )
        hol.set(ymdKey(h.date), h.name);
    }
    if (o.heiligabendFrei && !hol.has(`${y}-12-24`))
      hol.set(`${y}-12-24`, "Heiligabend");
    if (o.silvesterFrei && !hol.has(`${y}-12-31`))
      hol.set(`${y}-12-31`, "Silvester");
  }
  const out: Tag[] = [];
  let d = addDaysYmd({ year: o.year, month: 1, day: 1 }, -PAD);
  const end = addDaysYmd({ year: o.year, month: 12, day: 31 }, PAD);
  const endKey = ymdKey(end);
  for (;;) {
    const key = ymdKey(d);
    const feiertag = hol.get(key) ?? null;
    const arbeitstag = o.workdays[weekdayOf(d)];
    out.push({
      date: d,
      key,
      frei: !arbeitstag || feiertag !== null,
      feiertag: arbeitstag ? feiertag : null,
      imJahr: d.year === o.year,
    });
    if (key === endKey) break;
    d = addDaysYmd(d, 1);
  }
  return out;
}

type Lauf = { s: number; e: number };

function freieLaeufe(tage: Tag[]): Lauf[] {
  const out: Lauf[] = [];
  let s = -1;
  tage.forEach((t, i) => {
    if (t.frei && s < 0) s = i;
    if (!t.frei && s >= 0) {
      out.push({ s, e: i - 1 });
      s = -1;
    }
  });
  if (s >= 0) out.push({ s, e: tage.length - 1 });
  return out;
}

type Kandidat = {
  i: number;
  j: number;
  s: number;
  e: number;
  kosten: number;
  laenge: number;
  urlaub: number[];
};

/** Alle sinnvollen Zeitraeume: von einem freien Block zu einem spaeteren, mit Feiertag auf einem Arbeitstag. */
function kandidaten(
  tage: Tag[],
  laeufe: Lauf[],
  maxKosten: number,
): Kandidat[] {
  const out: Kandidat[] = [];
  for (let i = 0; i < laeufe.length; i += 1) {
    let kosten = 0;
    const urlaub: number[] = [];
    let gueltig = true;
    let feiertag = tage
      .slice(laeufe[i].s, laeufe[i].e + 1)
      .some((t) => t.feiertag);
    for (let j = i + 1; j < laeufe.length; j += 1) {
      for (let k = laeufe[j - 1].e + 1; k < laeufe[j].s; k += 1) {
        if (!tage[k].imJahr) gueltig = false;
        urlaub.push(k);
        kosten += tage[k].halb ? 1 : 2;
      }
      if (!gueltig || kosten > maxKosten * 2) break;
      feiertag ||= tage
        .slice(laeufe[j].s, laeufe[j].e + 1)
        .some((t) => t.feiertag);
      if (feiertag)
        out.push({
          i,
          j,
          s: laeufe[i].s,
          e: laeufe[j].e,
          kosten,
          laenge: laeufe[j].e - laeufe[i].s + 1,
          urlaub: [...urlaub],
        });
    }
  }
  return out;
}

function alsZeitraum(
  tage: Tag[],
  k: Pick<Kandidat, "s" | "e" | "urlaub">,
): Zeitraum {
  const teil = tage.slice(k.s, k.e + 1);
  return {
    von: tage[k.s].date,
    bis: tage[k.e].date,
    tage: k.e - k.s + 1,
    urlaub: k.urlaub.reduce((sum, i) => sum + (tage[i].halb ? 0.5 : 1), 0),
    urlaubstage: k.urlaub.map((i) => tage[i].date),
    feiertage: [
      ...new Set(teil.filter((t) => t.feiertag).map((t) => t.feiertag!)),
    ],
  };
}

/**
 * Optimaler Plan: nicht ueberlappende Zeitraeume mit zusammen hoechstens `budget` Urlaubstagen,
 * die moeglichst viele freie Tage ergeben (bei Gleichstand mit weniger Urlaub).
 */
export function optimalerPlan(
  o: BrueckenOptionen,
  budget: number,
  maxJeZeitraum = 10,
) {
  return planFuerTage(tageDesJahres(o), budget, maxJeZeitraum);
}

/** Wie optimalerPlan, fuer eine beliebige Tagesliste (z. B. Tuerkei mit halben Arefe-Tagen). */
export function planFuerTage(tage: Tag[], budget: number, maxJeZeitraum = 10) {
  const laeufe = freieLaeufe(tage);
  const cands = kandidaten(tage, laeufe, Math.min(budget, maxJeZeitraum));
  const byEnd = new Map<number, Kandidat[]>();
  for (const c of cands) byEnd.set(c.j, [...(byEnd.get(c.j) ?? []), c]);
  // Kosten in halben Tagen
  const B = Math.max(0, Math.floor(budget * 2));
  const wert = (k: Kandidat) => k.laenge * 1000 - k.kosten;
  // f[j+1][b]: bester Wert mit Zeitraeumen, die spaetestens in Lauf j enden
  const f: number[][] = [new Array(B + 1).fill(0)];
  const wahl: Array<Array<Kandidat | null>> = [new Array(B + 1).fill(null)];
  for (let j = 0; j < laeufe.length; j += 1) {
    const row = [...f[j]];
    const pick: Array<Kandidat | null> = new Array(B + 1).fill(null);
    for (const c of byEnd.get(j) ?? []) {
      for (let b = c.kosten; b <= B; b += 1) {
        const v = f[c.i][b - c.kosten] + wert(c);
        if (v > row[b]) {
          row[b] = v;
          pick[b] = c;
        }
      }
    }
    f.push(row);
    wahl.push(pick);
  }
  const plan: Kandidat[] = [];
  let j = laeufe.length;
  let b = B;
  while (j > 0) {
    const c = wahl[j][b];
    if (c) {
      plan.push(c);
      b -= c.kosten;
      j = c.i;
    } else j -= 1;
  }
  const zeitraeume = plan.reverse().map((k) => alsZeitraum(tage, k));
  return {
    zeitraeume,
    urlaub: zeitraeume.reduce((s, z) => s + z.urlaub, 0),
    freieTage: zeitraeume.reduce((s, z) => s + z.tage, 0),
    tage,
  };
}

/** Beste Moeglichkeiten je Feiertag: fuer 1 bis maxKosten Urlaubstage jeweils der laengste Zeitraum (nur echte Verbesserungen). */
export function brueckenJeFeiertag(o: BrueckenOptionen, maxKosten = 9) {
  const tage = tageDesJahres(o);
  const laeufe = freieLaeufe(tage);
  const cands = kandidaten(tage, laeufe, maxKosten);
  const out: Array<{ feiertag: string; datum: YMD; optionen: Zeitraum[] }> = [];
  const gesehen = new Set<number>();
  tage.forEach((t, idx) => {
    if (!t.feiertag || !t.imJahr) return;
    // Mehrere Feiertage in einem Block (Ostern, Weihnachten) nur einmal auffuehren.
    const lauf = laeufe.findIndex((l) => l.s <= idx && idx <= l.e);
    if (gesehen.has(lauf)) return;
    gesehen.add(lauf);
    const mit = cands.filter((c) => c.i <= lauf && lauf <= c.j);
    const optionen: Zeitraum[] = [];
    let best = laeufe[lauf].e - laeufe[lauf].s + 1;
    for (let k = 1; k <= maxKosten * 2; k += 1) {
      const c = mit
        .filter((x) => x.kosten === k)
        .sort((a, b) => b.laenge - a.laenge)[0];
      if (c && c.laenge > best) {
        best = c.laenge;
        optionen.push(alsZeitraum(tage, c));
      }
    }
    out.push({ feiertag: t.feiertag, datum: t.date, optionen });
  });
  return out;
}

/** Feiertage, die im Jahr auf einen arbeitsfreien Tag fallen (fuer Mo–Fr: Wochenende). */
export function feiertageAmWochenende(o: BrueckenOptionen) {
  return germanHolidaysCached(o.year).filter(
    (h) =>
      !h.sunday &&
      (h.states.includes(o.state) ||
        (h.partialStates?.includes(o.state) && o.partial.includes(h.id))) &&
      !o.workdays[weekdayOf(h.date)],
  );
}

/** Kalenderdatei (iCalendar) mit den Urlaubszeitraeumen. */
export function icsDatei(zeitraeume: Zeitraum[], titel = "Urlaub") {
  const fmt = (d: YMD) => ymdKey(d).replace(/-/g, "");
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const events = zeitraeume.flatMap((z, n) =>
    // Nur die eigentlichen Urlaubstage als zusammenhaengende Termine eintragen.
    gruppiere(z.urlaubstage).map((g, m) =>
      [
        "BEGIN:VEVENT",
        `UID:brueckentage-${fmt(z.von)}-${n}-${m}@birimceviri.app`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${fmt(g[0])}`,
        `DTEND;VALUE=DATE:${fmt(addDaysYmd(g[g.length - 1], 1))}`,
        `SUMMARY:${titel}${z.feiertage.length ? ` (${z.feiertage.join(", ")})` : ""}`,
        "TRANSP:OPAQUE",
        "END:VEVENT",
      ].join("\r\n"),
    ),
  );
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirimCeviri.app//Brueckentage-Planer//DE",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function gruppiere(tage: YMD[]) {
  const out: YMD[][] = [];
  for (const d of tage) {
    const last = out[out.length - 1];
    if (last && ymdKey(addDaysYmd(last[last.length - 1], 1)) === ymdKey(d))
      last.push(d);
    else out.push([d]);
  }
  return out;
}
