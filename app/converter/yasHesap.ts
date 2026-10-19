// Yaş hesaplama: yıl/ay/gün yaş, sonraki doğum günü, iki kişi arası yaş farkı ve
// prematüre bebekler için düzeltilmiş yaş.
import type { YMD } from "./time/calendars";
import { addDaysYmd, addMonthsYmd, diffDays, diffYmd } from "./time/dateMath";

/** Sonraki (ya da bugünkü) doğum günü; 29 Şubat doğumlular artık olmayan yıllarda 28 Şubat'ta. */
export function sonrakiDogumGunu(dogum: YMD, bugun: YMD) {
  for (let yil = bugun.year; ; yil += 1) {
    const yas = yil - dogum.year;
    const gun = addMonthsYmd(dogum, yas * 12);
    if (diffDays(bugun, gun) >= 0) return { gun, yas };
  }
}

export function yasBilgisi(dogum: YMD, bugun: YMD) {
  const toplamGun = diffDays(dogum, bugun);
  if (toplamGun < 0) return null;
  const f = diffYmd(dogum, bugun);
  const s = sonrakiDogumGunu(dogum, bugun);
  return {
    yil: f.years,
    ay: f.months,
    gun: f.days,
    toplamAy: f.totalMonths,
    toplamHafta: Math.floor(toplamGun / 7),
    toplamGun,
    toplamSaat: toplamGun * 24,
    sonrakiDogumGunu: s.gun,
    yeniYas: s.yas,
    kalanGun: diffDays(bugun, s.gun),
  };
}

/** İki doğum tarihi arasındaki yaş farkı; `buyuk` önce doğan kişidir (a ya da b). */
export function yasFarki(a: YMD, b: YMD) {
  const f = diffYmd(a, b);
  const gun = diffDays(a, b);
  return { yil: f.years, ay: f.months, gun: f.days, toplamGun: Math.abs(gun), buyuk: gun > 0 ? "a" : gun < 0 ? "b" : null } as const;
}

/**
 * Düzeltilmiş yaş (prematüre bebek): doğduğu gebelik haftası 40'tan ne kadar azsa
 * o kadar hafta kronolojik yaştan düşülür. Genellikle 2 yaşına kadar kullanılır.
 */
export function duzeltilmisYas(dogum: YMD, gebelikHaftasi: number, bugun: YMD) {
  if (!(gebelikHaftasi >= 22 && gebelikHaftasi <= 42)) return null;
  const kronolojik = diffDays(dogum, bugun);
  if (kronolojik < 0) return null;
  const dusulen = Math.max(0, Math.round((40 - gebelikHaftasi) * 7));
  const duzeltilmisGun = kronolojik - dusulen;
  const tahminiDogum = addDaysYmd(dogum, dusulen);
  return {
    kronolojik: diffYmd(dogum, bugun),
    kronolojikGun: kronolojik,
    dusulenHafta: dusulen / 7,
    duzeltilmisGun,
    duzeltilmis: duzeltilmisGun >= 0 ? diffYmd(tahminiDogum, bugun) : null,
    tahminiDogum,
  };
}

/** "X doğumlu kaç yaşında": o yıl içinde doğum günü geldiyse ve gelmediyse. */
export function dogumYilinaGoreYas(dogumYili: number, yil: number) {
  return { geldiyse: yil - dogumYili, gelmediyse: yil - dogumYili - 1 };
}

/** Batı (tropikal) burçları ve başlangıç günleri; sınır günlerinde doğanlarda yıla göre bir gün oynayabilir. */
const BURCLAR: Array<{ ad: string; ay: number; gun: number }> = [
  { ad: "Oğlak", ay: 1, gun: 1 },
  { ad: "Kova", ay: 1, gun: 20 },
  { ad: "Balık", ay: 2, gun: 19 },
  { ad: "Koç", ay: 3, gun: 21 },
  { ad: "Boğa", ay: 4, gun: 20 },
  { ad: "İkizler", ay: 5, gun: 21 },
  { ad: "Yengeç", ay: 6, gun: 21 },
  { ad: "Aslan", ay: 7, gun: 23 },
  { ad: "Başak", ay: 8, gun: 23 },
  { ad: "Terazi", ay: 9, gun: 23 },
  { ad: "Akrep", ay: 10, gun: 23 },
  { ad: "Yay", ay: 11, gun: 22 },
  { ad: "Oğlak", ay: 12, gun: 22 },
];

export function burc(d: YMD) {
  const k = d.month * 100 + d.day;
  return [...BURCLAR].reverse().find((b) => k >= b.ay * 100 + b.gun)!.ad;
}

/** "N günlük" olunan tarih (doğum günü 0. gün sayılır) ve o güne kalan gün; geçtiyse kalan negatiftir. */
export function gunlukOlma(dogum: YMD, n: number, bugun: YMD) {
  const tarih = addDaysYmd(dogum, n);
  return { tarih, kalan: diffDays(bugun, tarih) };
}

/** Bugünden sonraki ilk yuvarlak gün sayısı (1.000'in katı) ve tarihi. */
export function sonrakiYuvarlakGun(dogum: YMD, bugun: YMD) {
  const yasanan = diffDays(dogum, bugun);
  const n = (Math.floor(yasanan / 1000) + 1) * 1000;
  return { n, ...gunlukOlma(dogum, n, bugun) };
}

/** Doğum anı (Türkiye saati, UTC+3) ile `simdiMs` arasındaki saniye, dakika ve saat. */
export function canliSure(dogum: YMD, saat: number, dakika: number, simdiMs: number) {
  const dogumMs = Date.UTC(dogum.year, dogum.month - 1, dogum.day, saat, dakika) - 3 * 3600000;
  const sn = Math.max(0, Math.floor((simdiMs - dogumMs) / 1000));
  return { saniye: sn, dakika: Math.floor(sn / 60), saat: Math.floor(sn / 3600) };
}
