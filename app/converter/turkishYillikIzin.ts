// Yıllık ücretli izin (4857 sayılı İş Kanunu md. 53-59).
// Süre: 1-5 yıl (5 dahil) 14 gün, 5'ten fazla 15'ten az 20 gün, 15 yıl ve üstü 26 gün; 18 yaş ve altı ile 50 yaş ve
// üstü en az 20 gün; yer altı işlerinde +4 gün. Hak kazanmak için deneme süresi dahil en az 1 yıl çalışmak gerekir.
// İzin içindeki hafta tatili ve resmî tatiller izinden sayılmaz (md. 56). Cumartesi Yargıtay'a göre kural olarak iş
// günüdür ve izinden sayılır; sözleşmede hafta tatili olarak belirlenmişse sayılmaz. Arefe yarım gün sayılır.
import type { YMD } from "./time/calendars";
import { addDaysYmd, diffDays, weekdayOf, ymdKey } from "./time/dateMath";
import { turkeyHolidays } from "./time/holidays";

/** a'dan b'ye tamamlanan tam yıl sayısı. */
export function tamYil(a: YMD, b: YMD) {
  let y = b.year - a.year;
  if (b.month < a.month || (b.month === a.month && b.day < a.day)) y -= 1;
  return Math.max(0, y);
}

/** Kıdem yılına ve yaşa göre bir yıllık izin süresi (gün). */
export function izinSuresi(kidem: number, yas: number | null, yerAlti = false) {
  if (kidem < 1) return 0;
  let gun = kidem <= 5 ? 14 : kidem < 15 ? 20 : 26;
  if (yas !== null && (yas <= 18 || yas >= 50)) gun = Math.max(gun, 20);
  return gun + (yerAlti ? 4 : 0);
}

const yildonumu = (d: YMD, year: number): YMD =>
  d.month === 2 && d.day === 29
    ? { year, month: 3, day: 1 }
    : { year, month: d.month, day: d.day };

/** İşe giriş ve hesap tarihine göre izin hakkı ve sonraki hak ediş. */
export function izinHakki(
  giris: YMD,
  tarih: YMD,
  dogum: YMD | null,
  yerAlti = false,
) {
  const kidem = tamYil(giris, tarih);
  const sonHakEdis = kidem >= 1 ? yildonumu(giris, giris.year + kidem) : null;
  const yasHakEdiste = (t: YMD) => (dogum ? tamYil(dogum, t) : null);
  const gun = sonHakEdis
    ? izinSuresi(kidem, yasHakEdiste(sonHakEdis), yerAlti)
    : 0;
  const sonraki = yildonumu(giris, giris.year + kidem + 1);
  const sonrakiGun = izinSuresi(kidem + 1, yasHakEdiste(sonraki), yerAlti);
  // Bugüne kadar hak edilen toplam (her yıl dönümünde o yılın süresi)
  let toplam = 0;
  for (let k = 1; k <= kidem; k += 1)
    toplam += izinSuresi(
      k,
      yasHakEdiste(yildonumu(giris, giris.year + k)),
      yerAlti,
    );
  // Bir sonraki kademe (20 veya 26 güne geçiş)
  const kademe = kidem < 6 ? 6 : kidem < 15 ? 15 : null;
  return {
    kidem,
    gun,
    sonHakEdis,
    sonraki,
    sonrakiKalan: diffDays(tarih, sonraki),
    sonrakiGun,
    toplam,
    kademe: kademe
      ? {
          tarih: yildonumu(giris, giris.year + kademe),
          gun: izinSuresi(kademe, null, yerAlti),
        }
      : null,
  };
}

export type IzinGunu = {
  tarih: YMD;
  tur: "izin" | "yarim" | "pazar" | "cumartesi" | "tatil";
  ad?: string;
};

/**
 * İzin başlangıcı ve gün sayısından son izin günü ve işe dönüş tarihi.
 * cumartesiSayilir: Cumartesi izin gününden sayılır (varsayılan; Yargıtay görüşü).
 */
export function izinDonus(
  baslangic: YMD,
  gun: number,
  cumartesiSayilir = true,
) {
  const tam = new Map<string, string>();
  const yarim = new Map<string, string>();
  for (const y of [baslangic.year, baslangic.year + 1])
    for (const h of turkeyHolidays(y))
      (h.kind === "full" ? tam : yarim).set(ymdKey(h.date), h.name);
  const isGunuMu = (d: YMD) => {
    const wd = weekdayOf(d);
    return wd !== 0 && (wd !== 6 || cumartesiSayilir) && !tam.has(ymdKey(d));
  };
  const gunler: IzinGunu[] = [];
  let kalan = gun;
  let d = baslangic;
  for (
    let guard = 0;
    kalan > 0 && guard < 400;
    guard += 1, d = addDaysYmd(d, 1)
  ) {
    const key = ymdKey(d);
    const wd = weekdayOf(d);
    if (tam.has(key)) gunler.push({ tarih: d, tur: "tatil", ad: tam.get(key) });
    else if (wd === 0) gunler.push({ tarih: d, tur: "pazar" });
    else if (wd === 6 && !cumartesiSayilir)
      gunler.push({ tarih: d, tur: "cumartesi" });
    else if (yarim.has(key)) {
      gunler.push({ tarih: d, tur: "yarim", ad: yarim.get(key) });
      kalan -= 0.5;
    } else {
      gunler.push({ tarih: d, tur: "izin" });
      kalan -= 1;
    }
  }
  const son = gunler[gunler.length - 1].tarih;
  let donus = addDaysYmd(son, 1);
  while (!isGunuMu(donus) || weekdayOf(donus) === 6)
    donus = addDaysYmd(donus, 1);
  return {
    son,
    donus,
    takvimGunu: diffDays(baslangic, son) + 1,
    sayilmayan: gunler.filter(
      (g) => g.tur === "tatil" || g.tur === "pazar" || g.tur === "cumartesi",
    ),
    yarimlar: gunler.filter((g) => g.tur === "yarim"),
  };
}

/** Kullanılmayan izin ücreti (brüt): son brüt günlük ücret × gün. */
export const izinUcreti = (brutAylik: number, gun: number) =>
  (brutAylik / 30) * gun;
