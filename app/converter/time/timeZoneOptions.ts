import { worldCities } from "./worldCities";

// Saat dilimi cevirici secenekleri: yaygin kisaltmalar + dunya saati sehirleri.
// Kisaltmalar IANA bolgelerine baglidir; boylece yaz saati otomatik uygulanir
// (orn. "ET" kisin EST UTC-5, yazin EDT UTC-4).
export type ZoneOption = { id: string; timeZone: string; tr: string; en: string; group: "abbr" | "city" };

export const abbreviationZones: ZoneOption[] = [
  { id: "utc", timeZone: "UTC", tr: "UTC (Eşgüdümlü Evrensel Zaman)", en: "UTC (Coordinated Universal Time)", group: "abbr" },
  { id: "gmt", timeZone: "Etc/GMT", tr: "GMT (Greenwich)", en: "GMT (Greenwich Mean Time)", group: "abbr" },
  { id: "trt", timeZone: "Europe/Istanbul", tr: "TRT (Türkiye Saati)", en: "TRT (Türkiye Time)", group: "abbr" },
  { id: "et", timeZone: "America/New_York", tr: "ET (ABD Doğu: EST/EDT)", en: "ET (US Eastern: EST/EDT)", group: "abbr" },
  { id: "ct", timeZone: "America/Chicago", tr: "CT (ABD Merkez: CST/CDT)", en: "CT (US Central: CST/CDT)", group: "abbr" },
  { id: "mt", timeZone: "America/Denver", tr: "MT (ABD Dağ: MST/MDT)", en: "MT (US Mountain: MST/MDT)", group: "abbr" },
  { id: "pt", timeZone: "America/Los_Angeles", tr: "PT (ABD Pasifik: PST/PDT)", en: "PT (US Pacific: PST/PDT)", group: "abbr" },
  { id: "uk", timeZone: "Europe/London", tr: "İngiltere (GMT/BST)", en: "UK (GMT/BST)", group: "abbr" },
  { id: "cet", timeZone: "Europe/Paris", tr: "CET (Orta Avrupa: CET/CEST)", en: "CET (Central Europe: CET/CEST)", group: "abbr" },
  { id: "eet", timeZone: "Europe/Athens", tr: "EET (Doğu Avrupa: EET/EEST)", en: "EET (Eastern Europe: EET/EEST)", group: "abbr" },
  { id: "msk", timeZone: "Europe/Moscow", tr: "MSK (Moskova)", en: "MSK (Moscow Time)", group: "abbr" },
  { id: "gst", timeZone: "Asia/Dubai", tr: "GST (Körfez)", en: "GST (Gulf Standard Time)", group: "abbr" },
  { id: "ist", timeZone: "Asia/Kolkata", tr: "IST (Hindistan)", en: "IST (India Standard Time)", group: "abbr" },
  { id: "cst-china", timeZone: "Asia/Shanghai", tr: "CST (Çin)", en: "CST (China Standard Time)", group: "abbr" },
  { id: "jst", timeZone: "Asia/Tokyo", tr: "JST (Japonya)", en: "JST (Japan Standard Time)", group: "abbr" },
  { id: "aet", timeZone: "Australia/Sydney", tr: "AET (Avustralya Doğu: AEST/AEDT)", en: "AET (Australian Eastern: AEST/AEDT)", group: "abbr" },
];

export const cityZones: ZoneOption[] = worldCities.map((city) => ({
  id: city.en,
  timeZone: city.timeZone,
  tr: `${city.nameTr} (${city.countryTr})`,
  en: `${city.nameEn} (${city.countryEn})`,
  group: "city",
}));

export const zoneOptions: ZoneOption[] = [...abbreviationZones, ...cityZones];

export function findZone(id: string) {
  return zoneOptions.find((zone) => zone.id === id) ?? null;
}

/** Bir saat dilimindeki duvar saatini (yil/ay/gun saat:dakika) UTC anina cevirir. */
export function zonedWallTimeToUtc(
  timeZone: string,
  wall: { year: number; month: number; day: number; hour: number; minute: number },
  offsetOf: (timeZone: string, date: Date) => number
) {
  const naive = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  let guess = naive - offsetOf(timeZone, new Date(naive)) * 60000;
  // Yaz saati sinirinda ikinci tur ofseti dogrular.
  guess = naive - offsetOf(timeZone, new Date(guess)) * 60000;
  return new Date(guess);
}
