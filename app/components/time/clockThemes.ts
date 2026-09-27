import type { ChimeProfile, TickProfile } from "./clockSounds";

// Saat temalari kaydi. Her tema: aile, saniye ibresinin hareketi (mekanizma),
// tik-tak sesi ve saat basi calmasi. Yeni tema = buraya bir satir + yuz cizimi.
export type ClockFamily = "analog" | "digital" | "vintage" | "watch" | "special";

/** sweep: akici | quartz: saniyede bir atlar | beatN: saniyede N adim (mekanik) */
export type SecondMotion = "sweep" | "quartz" | "beat5" | "beat6" | "beat8";

export type ClockThemeDef = { family: ClockFamily; motion: SecondMotion; tick: TickProfile; chime: ChimeProfile };

export const clockThemeDefs = {
  analog: { family: "analog", motion: "sweep", tick: "quartz", chime: "none" },
  station: { family: "analog", motion: "sweep", tick: "quartz", chime: "bell" },
  roman: { family: "analog", motion: "quartz", tick: "wall", chime: "westminster" },
  gold: { family: "analog", motion: "sweep", tick: "quartz", chime: "none" },
  night: { family: "analog", motion: "sweep", tick: "none", chime: "none" },
  digital: { family: "digital", motion: "quartz", tick: "none", chime: "digital" },
  minimal: { family: "digital", motion: "quartz", tick: "none", chime: "digital" },
  sunset: { family: "digital", motion: "quartz", tick: "none", chime: "digital" },
  flip: { family: "digital", motion: "quartz", tick: "flap", chime: "none" },
  neon: { family: "digital", motion: "quartz", tick: "none", chime: "digital" },
  led: { family: "digital", motion: "quartz", tick: "none", chime: "beep" },
  terminal: { family: "digital", motion: "quartz", tick: "none", chime: "beep" },
  binary: { family: "digital", motion: "quartz", tick: "none", chime: "beep" },
  pendulum: { family: "vintage", motion: "quartz", tick: "pendulum", chime: "westminster" },
  cuckoo: { family: "vintage", motion: "quartz", tick: "wall", chime: "cuckoo" },
  pocket: { family: "vintage", motion: "beat5", tick: "pocket", chime: "none" },
  twinbell: { family: "vintage", motion: "quartz", tick: "alarm", chime: "ring" },
  mantel: { family: "vintage", motion: "quartz", tick: "wall", chime: "mantel" },
  tower: { family: "vintage", motion: "sweep", tick: "none", chime: "tower" },
  school: { family: "vintage", motion: "quartz", tick: "quartz", chime: "school" },
  ship: { family: "vintage", motion: "quartz", tick: "quartz", chime: "ship" },
  radio: { family: "vintage", motion: "quartz", tick: "flap", chime: "beep" },
  nixie: { family: "vintage", motion: "quartz", tick: "none", chime: "beep" },
  diver: { family: "watch", motion: "beat8", tick: "wrist", chime: "none" },
  chrono: { family: "watch", motion: "beat8", tick: "wrist", chime: "none" },
  dress: { family: "watch", motion: "beat6", tick: "wrist", chime: "none" },
  field: { family: "watch", motion: "quartz", tick: "quartz", chime: "none" },
  skeleton: { family: "watch", motion: "beat8", tick: "wrist", chime: "none" },
  moonphase: { family: "watch", motion: "beat6", tick: "wrist", chime: "none" },
  lcd: { family: "watch", motion: "quartz", tick: "none", chime: "beep" },
  smart: { family: "watch", motion: "sweep", tick: "none", chime: "digital" },
  word: { family: "special", motion: "quartz", tick: "none", chime: "mantel" },
  hourglass: { family: "special", motion: "sweep", tick: "none", chime: "bell" },
  sunmoon: { family: "special", motion: "sweep", tick: "none", chime: "digital" },
} satisfies Record<string, ClockThemeDef>;

export type ClockTheme = keyof typeof clockThemeDefs;

export const clockFamilies: ClockFamily[] = ["analog", "digital", "vintage", "watch", "special"];

export const clockThemeIds = Object.keys(clockThemeDefs) as ClockTheme[];

export function themesInFamily(family: ClockFamily) {
  return clockThemeIds.filter((id) => clockThemeDefs[id].family === family);
}

/** Mekanizmaya gore saniye/dakika/saat ibresi acilari (derece). */
export function handAngles(date: Date, motion: SecondMotion) {
  const exact = date.getSeconds() + date.getMilliseconds() / 1000;
  const steps = motion === "beat5" ? 5 : motion === "beat6" ? 6 : motion === "beat8" ? 8 : motion === "quartz" ? 1 : 0;
  const seconds = steps ? Math.floor(exact * steps) / steps : exact;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;
  return { hour: hours * 30, minute: minutes * 6, second: seconds * 6, exactSeconds: exact };
}

/** Ay yasi (gun, 0-29.53). Referans: 6 Ocak 2000 18:14 UTC yeni ay. */
export function moonAge(date: Date) {
  const synodic = 29.530588853;
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  return ((days % synodic) + synodic) % synodic;
}
