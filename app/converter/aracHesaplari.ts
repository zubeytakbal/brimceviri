// Araç sahibi hesapları: trafik cezası erken ödeme, ceza puanı, muayene takvimi ve
// lastik DOT kodu. Tutar ve puanları kullanıcı girer; burada yalnızca kanundaki
// süre ve oran kuralları var (2918 sayılı KTK md. 35, 115, 118; Araç Muayene Yönetmeliği md. 14).
import type { YMD } from "./time/calendars";
import { addDaysYmd, addMonthsYmd, diffDays, diffYmd, isoWeekStart, isoWeeksInYear } from "./time/dateMath";

/* ---------------- Trafik cezası erken ödeme ---------------- */

/** Tebliğden itibaren 1 ay içinde ödenirse %25 indirim (2024 öncesi süre 15 gündü). */
export const ERKEN_ODEME_INDIRIM = 0.25;
export const ERKEN_ODEME_AY = 1;
/** e-Tebligat, elektronik adrese ulaştığı günü izleyen 5. günün sonunda tebliğ edilmiş sayılır. */
export const E_TEBLIGAT_GUN = 5;

export type TebligTuru = "elden" | "posta" | "etebligat";

export function erkenOdeme(tutar: number, tarih: YMD, tur: TebligTuru, bugun?: YMD) {
  if (!(tutar > 0)) return null;
  const teblig = tur === "etebligat" ? addDaysYmd(tarih, E_TEBLIGAT_GUN) : tarih;
  const sonGun = addMonthsYmd(teblig, ERKEN_ODEME_AY);
  const indirim = tutar * ERKEN_ODEME_INDIRIM;
  return {
    teblig,
    sonGun,
    indirimli: tutar - indirim,
    indirim,
    /** Son güne kalan gün (bugün dahil son gün 0); geçtiyse negatif. */
    kalan: bugun ? diffDays(bugun, sonGun) : null,
  };
}

/* ---------------- Ceza puanı ---------------- */

export const PUAN_SINIRI = 100;

export type Ihlal = { tarih: YMD; puan: number };

/** Her puan ihlal tarihinden 1 yıl sonra silinir. */
export const silinmeTarihi = (t: YMD) => addMonthsYmd(t, 12);

/**
 * Bugün geçerli puanlar ve geçmişte 1 yıllık pencerede 100 puana ulaşılan ilk tarih.
 * Pencere: bir ihlal, sonraki ihlal tarihinde hâlâ silinmemişse toplamda sayılır.
 */
export function cezaPuani(ihlaller: Ihlal[], bugun: YMD) {
  const liste = ihlaller
    .filter((x) => x.puan > 0)
    .slice()
    .sort((a, b) => diffDays(b.tarih, a.tarih))
    .map((x) => {
      const silinme = silinmeTarihi(x.tarih);
      return { ...x, silinme, aktif: diffDays(x.tarih, bugun) >= 0 && diffDays(bugun, silinme) > 0 };
    });
  const toplam = liste.filter((x) => x.aktif).reduce((s, x) => s + x.puan, 0);
  let doldu: YMD | null = null;
  for (const x of liste) {
    const pencere = liste.filter((y) => diffDays(y.tarih, x.tarih) >= 0 && diffDays(x.tarih, y.silinme) > 0).reduce((s, y) => s + y.puan, 0);
    if (pencere >= PUAN_SINIRI) {
      doldu = x.tarih;
      break;
    }
  }
  /** Aktif puanlardan ilk silinecek olanın tarihi. */
  const ilkSilinme = liste.find((x) => x.aktif)?.silinme ?? null;
  return { liste, toplam, kalan: Math.max(PUAN_SINIRI - toplam, 0), doldu, ilkSilinme };
}

/** 100 puan doldurulduğunda kaçıncı sefer olduğuna göre yaptırım (KTK md. 118). */
export const PUAN_YAPTIRIM = [
  { kez: 1, sure: "2 ay", not: "Sürücü belgesi geçici alınır; sürücü davranışlarını geliştirme eğitimi zorunludur." },
  { kez: 2, sure: "4 ay", not: "Belge geçici alınır; eğitimin yanında psikoteknik değerlendirme istenir." },
  { kez: 3, sure: "iptal", not: "Sürücü belgesi süresiz alınır (iptal); yeniden almak için ek koşullar aranır." },
] as const;

/* ---------------- Muayene takvimi ---------------- */

export type MuayeneTuru = "hususi" | "motosiklet" | "ticari";

export const MUAYENE: Record<MuayeneTuru, { ad: string; ilk: number; periyot: number }> = {
  hususi: { ad: "Hususi otomobil, arazi taşıtı, hususi kamyonet/panelvan", ilk: 3, periyot: 2 },
  motosiklet: { ad: "Motosiklet", ilk: 3, periyot: 2 },
  ticari: { ad: "Ticari araç: taksi, dolmuş, kiralık, kamyonet, minibüs, kamyon, otobüs, çekici", ilk: 1, periyot: 1 },
};

/**
 * Sonraki muayene tarihleri. Hiç muayene olmamışsa ilk tescilden "ilk" yıl sonra;
 * muayene yapılmışsa son muayenenin yapıldığı günden periyot kadar sonra.
 */
export function muayeneTakvimi(tur: MuayeneTuru, tescil: YMD, sonMuayene: YMD | null, adet = 5) {
  const m = MUAYENE[tur];
  const ilk = sonMuayene ? addMonthsYmd(sonMuayene, 12 * m.periyot) : addMonthsYmd(tescil, 12 * m.ilk);
  return Array.from({ length: adet }, (_, i) => addMonthsYmd(ilk, 12 * m.periyot * i));
}

/** Muayene tarihi geçtiyse kaç ay (başlamış ay dahil) gecikildiği; geçmediyse 0. */
export function gecikmeAy(sonTarih: YMD, bugun: YMD) {
  if (diffDays(sonTarih, bugun) <= 0) return 0;
  return diffYmd(sonTarih, bugun).totalMonths + 1;
}

/* ---------------- Lastik DOT kodu ---------------- */

export type DotSonuc =
  | { durum: "tamam"; hafta: number; yil: number; baslangic: YMD; bitis: YMD; yas: { years: number; months: number; days: number }; yasYil: number }
  | { durum: "eski"; hafta: number; yilHanesi: number }
  | { durum: "gecersiz"; neden: string };

/**
 * DOT kodunun son 4 hanesi: ilk iki hane hafta, son iki hane yıl (2523 = 2023'ün 25. haftası).
 * 2000 öncesi lastiklerde 3 hane vardır (hafta + yılın son hanesi).
 */
export function dotOku(raw: string, bugun: YMD): DotSonuc {
  const gruplar = raw.match(/\d+/g);
  const kod = gruplar ? gruplar[gruplar.length - 1] : "";
  if (kod.length === 3) {
    const hafta = Number(kod.slice(0, 2));
    if (hafta < 1 || hafta > 53) return { durum: "gecersiz", neden: "Hafta 01 ile 53 arasında olmalı." };
    return { durum: "eski", hafta, yilHanesi: Number(kod[2]) };
  }
  if (kod.length !== 4) return { durum: "gecersiz", neden: "Tarih kodu 4 haneli olmalı (örnek: 2523)." };
  const hafta = Number(kod.slice(0, 2));
  const yil = 2000 + Number(kod.slice(2));
  if (hafta < 1 || hafta > isoWeeksInYear(yil)) return { durum: "gecersiz", neden: `${yil} yılında ${isoWeeksInYear(yil)} hafta var; hafta 01–${isoWeeksInYear(yil)} olmalı.` };
  const baslangic = isoWeekStart(yil, hafta);
  if (diffDays(baslangic, bugun) < 0) return { durum: "gecersiz", neden: "Bu tarih henüz gelmedi; kodu kontrol edin." };
  const yas = diffYmd(baslangic, bugun);
  return { durum: "tamam", hafta, yil, baslangic, bitis: addDaysYmd(baslangic, 6), yas, yasYil: diffDays(baslangic, bugun) / 365.25 };
}

/** Lastik yaşına göre öneri (üretici ve ETRTO tavsiyeleri; diş derinliği ayrıca kontrol edilir). */
export function lastikYasDurumu(yasYil: number) {
  if (yasYil < 2) return { seviye: "iyi", metin: "Yeni sayılır. Sıfır lastik alırken 2 yaşa kadar olanlar sorun değildir." } as const;
  if (yasYil < 5) return { seviye: "iyi", metin: "Normal kullanım ömrü içinde. Diş derinliğine ve yanaktaki çatlaklara bakın." } as const;
  if (yasYil < 6) return { seviye: "dikkat", metin: "5 yaşını geçti: yılda en az bir kez ustaya kontrol ettirin." } as const;
  if (yasYil < 10) return { seviye: "uyari", metin: "6 yaşını geçti: diş derin olsa bile kauçuk sertleşir, çoğu üretici değişim önerir." } as const;
  return { seviye: "tehlike", metin: "10 yaşını geçti: yedek lastik dahil mutlaka değiştirin." } as const;
}
