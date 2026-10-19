// Yılbaşı sayfası hesapları: dünyada hangi yerin yeni yıla ne zaman girdiği (yerel 1 Ocak 00:00'ın anı) ve
// Türkiye'de yılbaşı tatilinin hafta sonuyla birlikte kaç gün sürdüğü.
import { worldCities } from "./worldCities";

export type YeniYilYeri = { ad: string; ulke: string; tz: string };

/** worldCities'te olmayan, yeni yıla ilk ve son girenler. */
const EK_YERLER: YeniYilYeri[] = [
  { ad: "Kiritimati (Line Adaları)", ulke: "Kiribati", tz: "Pacific/Kiritimati" },
  { ad: "Apia", ulke: "Samoa", tz: "Pacific/Apia" },
  { ad: "Nuku'alofa", ulke: "Tonga", tz: "Pacific/Tongatapu" },
  { ad: "Pago Pago", ulke: "Amerikan Samoası", tz: "Pacific/Pago_Pago" },
];

/** Saat diliminin verilen andaki UTC farkı (dakika). */
function utcFarki(tz: string, ms: number) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }).formatToParts(ms);
  const v = (t: string) => Number(p.find((x) => x.type === t)!.value);
  return Math.round((Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute")) - Math.floor(ms / 60000) * 60000) / 60000);
}

/** Yerel saatle 1 Ocak `yil` 00:00'ın UTC anı (ms). */
export function yerelYilbasiAni(tz: string, yil: number) {
  const tahmin = Date.UTC(yil, 0, 1);
  const ilk = tahmin - utcFarki(tz, tahmin) * 60000;
  return tahmin - utcFarki(tz, ilk) * 60000;
}

/** Yeni yıla giriş sırası (ilk giren başta); şehir başına bir satır, aynı anda girenler aynı sırada. */
export function yeniYilSirasi(yil: number) {
  const yerler: YeniYilYeri[] = [...EK_YERLER, ...worldCities.map((c) => ({ ad: c.nameTr, ulke: c.countryTr, tz: c.timeZone }))];
  return yerler.map((y) => ({ ...y, an: yerelYilbasiAni(y.tz, yil) })).sort((a, b) => a.an - b.an || a.ad.localeCompare(b.ad, "tr"));
}

/** Türkiye'de yılbaşı tatili: 1 Ocak'ın günü ve hafta sonuyla birleşen tatil süresi. */
export function yilbasiTatili(yil: number) {
  const gun = new Date(Date.UTC(yil, 0, 1)).getUTCDay(); // 0 pazar … 6 cumartesi
  // Cuma: Cuma-Cumartesi-Pazar; Pazartesi: Cumartesi-Pazartesi; Cumartesi/Pazar: hafta sonuna denk gelir.
  const sure = gun === 5 || gun === 1 ? 3 : gun === 6 || gun === 0 ? 2 : 1;
  const kopru = gun === 4 ? "2 Ocak Cuma izin alınırsa 4 gün" : gun === 2 ? "31 Aralık Pazartesi izin alınırsa 4 gün" : null;
  return { gun, sure, kopru };
}
