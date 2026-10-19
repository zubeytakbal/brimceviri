// Türkçe Paskalya sayfası ve takvim için hareketli Hristiyan günleri: Batı (Gregoryen) ve Ortodoks (Jülyen) Paskalyası
// ile Paskalya'ya göre sabit uzaklıktaki günler. Hesap countdownEvents'teki Paskalya algoritmalarını kullanır.
import { easterSunday, orthodoxEasterSunday } from "../time/countdownEvents";
import type { YMD } from "../time/calendars";
import { addDaysYmd } from "../time/dateMath";

export type PaskalyaGunu = { id: string; ad: string; fark: number };

/** Paskalya'ya göre gün farkı (Paskalya = 0). */
export const BATI_GUNLERI: PaskalyaGunu[] = [
  { id: "kul-carsambasi", ad: "Kül Çarşambası (Büyük Perhiz başlar)", fark: -46 },
  { id: "palmiye", ad: "Palmiye Pazarı (Kutsal Hafta başlar)", fark: -7 },
  { id: "kutsal-persembe", ad: "Kutsal Perşembe (Son Akşam Yemeği)", fark: -3 },
  { id: "kutsal-cuma", ad: "Kutsal Cuma (çarmıha geriliş)", fark: -2 },
  { id: "paskalya", ad: "Paskalya Pazarı", fark: 0 },
  { id: "paskalya-pazartesi", ad: "Paskalya Pazartesisi", fark: 1 },
  { id: "goge-yukselis", ad: "Göğe Yükseliş", fark: 39 },
  { id: "pentekost", ad: "Pentekost (Hamsin)", fark: 49 },
];

export const ORTODOKS_GUNLERI: PaskalyaGunu[] = [
  { id: "temiz-pazartesi", ad: "Temiz Pazartesi (Büyük Perhiz başlar)", fark: -48 },
  { id: "palmiye", ad: "Palmiye Pazarı", fark: -7 },
  { id: "kutsal-cuma", ad: "Kutsal Cuma", fark: -2 },
  { id: "paskalya", ad: "Paskalya Pazarı", fark: 0 },
  { id: "goge-yukselis", ad: "Göğe Yükseliş", fark: 39 },
  { id: "pentekost", ad: "Pentekost", fark: 49 },
];

export const batiPaskalya = (year: number): YMD => easterSunday(year);
export const ortodoksPaskalya = (year: number): YMD => orthodoxEasterSunday(year);

export function paskalyaGunleri(year: number, ortodoks: boolean) {
  const p = ortodoks ? ortodoksPaskalya(year) : batiPaskalya(year);
  return (ortodoks ? ORTODOKS_GUNLERI : BATI_GUNLERI).map((g) => ({ ...g, tarih: addDaysYmd(p, g.fark) }));
}

/** Biçim: "28 Mart 2027 Pazar". */
export const trTarih = (d: YMD, gun = true) =>
  new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", ...(gun ? { weekday: "long" as const } : {}), timeZone: "UTC" }).format(
    Date.UTC(d.year, d.month - 1, d.day),
  );
