// Ay evreleri: Jean Meeus, "Astronomical Algorithms" bolum 49 (gercek evreler, ana
// periyodik terimler). Dogruluk ~1-2 dakika. JDE (TT) -> UT icin ΔT ≈ 70 sn.

export type PhaseKind = "new" | "first" | "full" | "last";
export type MoonPhaseEvent = { kind: PhaseKind; date: Date };

const RAD = Math.PI / 180;
const SYNODIC = 29.530588861;
const DELTA_T_DAYS = 70 / 86400;

const sin = (deg: number) => Math.sin(deg * RAD);
const cos = (deg: number) => Math.cos(deg * RAD);

function phaseJde(k: number, kind: PhaseKind) {
  const T = k / 1236.85;
  let jde = 2451550.09766 + SYNODIC * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = 2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T ** 3;
  const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4;
  const F = 160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4;
  const Om = 124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T ** 3;

  if (kind === "new" || kind === "full") {
    const c = kind === "new" ? [-0.4072, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208] : [-0.40614, 0.17302, 0.01614, 0.01043, 0.00734, -0.00515, 0.00209];
    jde +=
      c[0] * sin(Mp) +
      c[1] * E * sin(M) +
      c[2] * sin(2 * Mp) +
      c[3] * sin(2 * F) +
      c[4] * E * sin(Mp - M) +
      c[5] * E * sin(Mp + M) +
      c[6] * E * E * sin(2 * M) -
      0.00111 * sin(Mp - 2 * F) -
      0.00057 * sin(Mp + 2 * F) +
      0.00056 * E * sin(2 * Mp + M) -
      0.00042 * sin(3 * Mp) +
      0.00042 * E * sin(M + 2 * F) +
      0.00038 * E * sin(M - 2 * F) -
      0.00024 * E * sin(2 * Mp - M) -
      0.00017 * sin(Om) -
      0.00007 * sin(Mp + 2 * M) +
      0.00004 * sin(2 * Mp - 2 * F) +
      0.00004 * sin(3 * M) +
      0.00003 * sin(Mp + M - 2 * F) +
      0.00003 * sin(2 * Mp + 2 * F) -
      0.00003 * sin(Mp + M + 2 * F) +
      0.00003 * sin(Mp - M + 2 * F) -
      0.00002 * sin(Mp - M - 2 * F) -
      0.00002 * sin(3 * Mp + M) +
      0.00002 * sin(4 * Mp);
  } else {
    jde +=
      -0.62801 * sin(Mp) +
      0.17172 * E * sin(M) -
      0.01183 * E * sin(Mp + M) +
      0.00862 * sin(2 * Mp) +
      0.00804 * sin(2 * F) +
      0.00454 * E * sin(Mp - M) +
      0.00204 * E * E * sin(2 * M) -
      0.0018 * sin(Mp - 2 * F) -
      0.0007 * sin(Mp + 2 * F) -
      0.0004 * sin(3 * Mp) -
      0.00034 * E * sin(2 * Mp - M) +
      0.00032 * E * sin(M + 2 * F) +
      0.00032 * E * sin(M - 2 * F) -
      0.00028 * E * E * sin(Mp + 2 * M) +
      0.00027 * E * sin(2 * Mp + M) -
      0.00017 * sin(Om) -
      0.00005 * sin(Mp - M - 2 * F) +
      0.00004 * sin(2 * Mp + 2 * F) -
      0.00004 * sin(Mp + M + 2 * F) +
      0.00004 * sin(Mp - 2 * M) +
      0.00003 * sin(Mp + M - 2 * F) +
      0.00003 * sin(3 * M) +
      0.00002 * sin(2 * Mp - 2 * F) +
      0.00002 * sin(Mp - M + 2 * F) -
      0.00002 * sin(3 * Mp + M);
    const W = 0.00306 - 0.00038 * E * cos(M) + 0.00026 * cos(Mp) - 0.00002 * cos(Mp - M) + 0.00002 * cos(Mp + M) + 0.00002 * cos(2 * F);
    jde += kind === "first" ? W : -W;
  }
  return jde;
}

const jdToDate = (jd: number) => new Date(Math.round((jd - DELTA_T_DAYS - 2440587.5) * 86400000 / 60000) * 60000);

const OFFSETS: Record<PhaseKind, number> = { new: 0, first: 0.25, full: 0.5, last: 0.75 };

/** [from, to) araligindaki tum ana evreler, zaman sirasiyla. */
export function moonPhasesBetween(from: Date, to: Date): MoonPhaseEvent[] {
  const yearFrom = from.getUTCFullYear() + from.getUTCMonth() / 12;
  const startK = Math.floor((yearFrom - 2000) * 12.3685) - 1;
  const events: MoonPhaseEvent[] = [];
  for (let k = startK; ; k += 1) {
    let past = false;
    for (const kind of ["new", "first", "full", "last"] as PhaseKind[]) {
      const date = jdToDate(phaseJde(k + OFFSETS[kind], kind));
      if (date >= to) past = true;
      else if (date >= from) events.push({ kind, date });
    }
    if (past) break;
  }
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Anlik ay yasi (gun), aydinlanma orani (0-1) ve buyuyor mu. */
export function moonState(now: Date) {
  const around = moonPhasesBetween(new Date(now.getTime() - 32 * 86400000), new Date(now.getTime() + 1));
  const lastNew = [...around].reverse().find((e) => e.kind === "new");
  const age = lastNew ? (now.getTime() - lastNew.date.getTime()) / 86400000 : 0;
  const phaseAngle = (age / SYNODIC) * 2 * Math.PI;
  const illumination = (1 - Math.cos(phaseAngle)) / 2;
  return { age, illumination, waxing: age < SYNODIC / 2, fraction: age / SYNODIC };
}

export type PhaseName = "new" | "waxing-crescent" | "first" | "waxing-gibbous" | "full" | "waning-gibbous" | "last" | "waning-crescent";

/** Ay yasina gore 8 evreden biri (ana evreler ±1 gun penceresi). */
export function phaseName(age: number): PhaseName {
  if (age < 1 || age > SYNODIC - 1) return "new";
  if (age < 6.38) return "waxing-crescent";
  if (age < 8.38) return "first";
  if (age < 13.77) return "waxing-gibbous";
  if (age < 15.77) return "full";
  if (age < 21.15) return "waning-gibbous";
  if (age < 23.15) return "last";
  return "waning-crescent";
}
