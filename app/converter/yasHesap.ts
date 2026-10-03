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
