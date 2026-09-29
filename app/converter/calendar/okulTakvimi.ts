// MEB eğitim-öğretim yılı çalışma takvimi. Her yıl MEB genelgesiyle açıklanır (2026-2027: 2026/68 sayılı genelge).
// Yeni yıl eklendiğinde annualUpdates.ts'deki "tr-okul-takvimi" hatırlatması güncellenir.
import type { YMD } from "../time/calendars";
import { addDaysYmd, diffDays, isWeekend, ymdKey } from "../time/dateMath";
import { turkeyHolidays } from "../time/holidays";

const t = (s: string): YMD => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

export type OkulYili = {
  ad: string;
  uyum: [YMD, YMD];
  acilis: YMD;
  araTatil1: [YMD, YMD];
  karne1: YMD;
  yariyil: [YMD, YMD];
  ikinciDonem: YMD;
  araTatil2: [YMD, YMD];
  kapanis: YMD;
  kaynak: string;
};

export const OKUL_YILLARI: OkulYili[] = [
  {
    ad: "2026-2027",
    uyum: [t("2026-09-07"), t("2026-09-11")],
    acilis: t("2026-09-14"),
    araTatil1: [t("2026-11-16"), t("2026-11-20")],
    karne1: t("2027-01-22"),
    yariyil: [t("2027-01-25"), t("2027-02-05")],
    ikinciDonem: t("2027-02-08"),
    araTatil2: [t("2027-03-08"), t("2027-03-12")],
    kapanis: t("2027-06-25"),
    kaynak:
      "MEB 2026-2027 Eğitim-Öğretim Yılı Çalışma Takvimi (2026/68 sayılı genelge)",
  },
];

export type OkulOlayi = {
  id: string;
  ad: string;
  bas: YMD;
  bit?: YMD;
  aciklama: string;
};

export function okulOlaylari(y: OkulYili): OkulOlayi[] {
  return [
    {
      id: "uyum",
      ad: "Uyum haftası",
      bas: y.uyum[0],
      bit: y.uyum[1],
      aciklama: "Okul öncesi ve 1. sınıf öğrencileri için uyum eğitimi",
    },
    {
      id: "acilis",
      ad: "Okulların açılışı",
      bas: y.acilis,
      aciklama: "Birinci dönemin ilk ders günü",
    },
    {
      id: "ara1",
      ad: "1. ara tatil",
      bas: y.araTatil1[0],
      bit: y.araTatil1[1],
      aciklama: "Birinci dönem ara tatili",
    },
    {
      id: "karne1",
      ad: "Karne günü (1. dönem)",
      bas: y.karne1,
      aciklama: "Birinci dönemin son günü, karneler verilir",
    },
    {
      id: "yariyil",
      ad: "Yarıyıl tatili",
      bas: y.yariyil[0],
      bit: y.yariyil[1],
      aciklama: "İki haftalık sömestr tatili",
    },
    {
      id: "donem2",
      ad: "İkinci dönem başlangıcı",
      bas: y.ikinciDonem,
      aciklama: "İkinci dönemin ilk ders günü",
    },
    {
      id: "ara2",
      ad: "2. ara tatil",
      bas: y.araTatil2[0],
      bit: y.araTatil2[1],
      aciklama: "İkinci dönem ara tatili",
    },
    {
      id: "karne2",
      ad: "Karne günü ve yaz tatili",
      bas: y.kapanis,
      aciklama: "Ders yılının son günü; yaz tatili başlar",
    },
  ];
}

/** Belirli bir tarihten sonraki (sürmekte olan dahil) okul olayları. */
export function siradakiOkulOlaylari(bugun: YMD) {
  return OKUL_YILLARI.flatMap(okulOlaylari).filter(
    (o) => diffDays(bugun, o.bit ?? o.bas) >= 0,
  );
}

/** İki tarih arasındaki ders günü: hafta içi, resmî tatil (tam gün) ve ara tatiller hariç. */
export function dersGunu(bas: YMD, bit: YMD, y: OkulYili) {
  const tatil = new Set(
    [bas.year, bit.year]
      .flatMap((yy) => turkeyHolidays(yy))
      .filter((h) => h.kind === "full")
      .map((h) => ymdKey(h.date)),
  );
  const araMi = (d: YMD) =>
    [y.araTatil1, y.araTatil2, y.yariyil].some(
      ([a, b]) => diffDays(a, d) >= 0 && diffDays(d, b) >= 0,
    );
  let n = 0;
  for (let d = bas; diffDays(d, bit) >= 0; d = addDaysYmd(d, 1))
    if (!isWeekend(d) && !tatil.has(ymdKey(d)) && !araMi(d)) n += 1;
  return n;
}

/** Tarih bir okul tatili (ara tatil, yarıyıl) içinde mi? */
export function okulTatiliMi(d: YMD) {
  for (const y of OKUL_YILLARI) {
    for (const [a, b] of [y.araTatil1, y.araTatil2, y.yariyil])
      if (diffDays(a, d) >= 0 && diffDays(d, b) >= 0) return true;
  }
  return false;
}
