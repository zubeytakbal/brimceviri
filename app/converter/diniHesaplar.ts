import { magvar } from "magvar";

// Dini araçların hesapları. Yalnızca değişmeyen kurallar ve matematik:
// yasal ya da yıllık açıklanan bir tutar (fitre, fidye) ve vakit hesabı
// (namaz vakitleri) bilerek yok. Altın fiyatı ve kurban fiyatı kullanıcıdan.

/* ---------------- Kıble ---------------- */

/** Kâbe'nin konumu (WGS84). */
export const KABE = { lat: 21.4225, lon: 39.8262 };

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Kuzeyden saat yönünde kıble açısı (büyük daire başlangıç yönü), 0–360°. */
export function kibleAcisi(lat: number, lon: number) {
  const f1 = rad(lat);
  const f2 = rad(KABE.lat);
  const dl = rad(KABE.lon - lon);
  const y = Math.sin(dl) * Math.cos(f2);
  const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

/** Kâbe'ye kuş uçuşu mesafe (km), ortalama Dünya yarıçapı 6.371 km. */
export function kabeMesafesi(lat: number, lon: number) {
  const f1 = rad(lat);
  const f2 = rad(KABE.lat);
  const a = Math.sin(rad(KABE.lat - lat) / 2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(rad(KABE.lon - lon) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

const YONLER = ["Kuzey", "Kuzey-kuzeydoğu", "Kuzeydoğu", "Doğu-kuzeydoğu", "Doğu", "Doğu-güneydoğu", "Güneydoğu", "Güney-güneydoğu", "Güney", "Güney-güneybatı", "Güneybatı", "Batı-güneybatı", "Batı", "Batı-kuzeybatı", "Kuzeybatı", "Kuzey-kuzeybatı"];

/** 16 yönlü pusula adı. */
export function yonAdi(aci: number) {
  return YONLER[Math.round((((aci % 360) + 360) % 360) / 22.5) % 16];
}

/* ---------------- Hatim ---------------- */

/** Diyanet mushafı: 604 sayfa, 30 cüz (cüz başına ~20 sayfa). */
export const MUSHAF_SAYFA = 604;
export const CUZ_SAYISI = 30;

export type HatimPlani = {
  gunlukSayfa: number;
  gunlukCuz: number;
  vakitBasinaSayfa: number;
  kalanSayfa: number;
};

/** Kalan sayfaları gün sayısına böler; sonuç yukarı yuvarlanmış sayfa. */
export function hatimPlani(gun: number, okunanSayfa = 0, hatimSayisi = 1): HatimPlani | null {
  const g = Math.round(gun);
  if (!(g >= 1 && g <= 3650) || !(okunanSayfa >= 0) || !(hatimSayisi >= 1 && hatimSayisi <= 100)) return null;
  const toplam = MUSHAF_SAYFA * Math.round(hatimSayisi);
  if (okunanSayfa >= toplam) return null;
  const kalanSayfa = toplam - okunanSayfa;
  const gunlukSayfa = Math.ceil(kalanSayfa / g);
  return {
    gunlukSayfa,
    gunlukCuz: (kalanSayfa / g) / (MUSHAF_SAYFA / CUZ_SAYISI),
    vakitBasinaSayfa: Math.ceil(gunlukSayfa / 5),
    kalanSayfa,
  };
}

/** Okuma süresi: sayfa × dakika/sayfa. */
export function okumaSuresiDakika(sayfa: number, dakikaPerSayfa: number) {
  if (!(sayfa >= 0) || !(dakikaPerSayfa > 0 && dakikaPerSayfa <= 30)) return Number.NaN;
  return sayfa * dakikaPerSayfa;
}

export type CuzPayi = { kisi: number; ilkCuz: number; sonCuz: number; cuzSayisi: number };

/**
 * Grup hatmi: 30 cüz `kisi` kişiye sırayla ve olabildiğince eşit dağıtılır
 * (fazla kalan cüzler ilk kişilere birer tane). 30'dan fazla kişi olamaz.
 */
export function hatimDagit(kisi: number): CuzPayi[] {
  const n = Math.round(kisi);
  if (!(n >= 1 && n <= CUZ_SAYISI)) return [];
  const taban = Math.floor(CUZ_SAYISI / n);
  const artan = CUZ_SAYISI % n;
  const paylar: CuzPayi[] = [];
  let cuz = 1;
  for (let i = 1; i <= n; i++) {
    const adet = taban + (i <= artan ? 1 : 0);
    paylar.push({ kisi: i, ilkCuz: cuz, sonCuz: cuz + adet - 1, cuzSayisi: adet });
    cuz += adet;
  }
  return paylar;
}

/* ---------------- Kaza namazı ve orucu ---------------- */

/**
 * Hanefi mezhebine göre (Diyanet) günlük farz ve vacip namazlar: sabah 2,
 * öğle 4, ikindi 4, akşam 3, yatsı 4 rekât farz = 17; vitir 3 rekât vacip.
 */
export const GUNLUK_FARZ_REKAT = 17;
export const VITIR_REKAT = 3;

export type KazaNamazi = {
  gun: number;
  vakit: number;
  rekat: number;
  /** Günde `gunlukVakit` kaza kılınırsa bitiş süresi (gün). */
  bitisGun: number;
};

export function kazaNamazi(yil: number, ay: number, gun: number, vitirDahil: boolean, gunlukVakit: number): KazaNamazi | null {
  if (![yil, ay, gun, gunlukVakit].every((n) => Number.isFinite(n) && n >= 0)) return null;
  // Yıl 365, ay 30 gün kabul edilir (yaklaşık; kesin gün sayısı biliniyorsa gün alanına yazılır).
  const toplamGun = Math.round(yil * 365 + ay * 30 + gun);
  if (toplamGun < 1 || gunlukVakit < 1) return null;
  const vakitPerGun = vitirDahil ? 6 : 5;
  const vakit = toplamGun * vakitPerGun;
  const rekat = toplamGun * (GUNLUK_FARZ_REKAT + (vitirDahil ? VITIR_REKAT : 0));
  return { gun: toplamGun, vakit, rekat, bitisGun: Math.ceil(vakit / gunlukVakit) };
}

/** Gün sayısı doğrudan biliniyorsa (iki tarih arası) kaza namazı. */
export function kazaNamaziGun(gunSayisi: number, vitirDahil: boolean, gunlukVakit: number): KazaNamazi | null {
  return kazaNamazi(0, 0, gunSayisi, vitirDahil, gunlukVakit);
}

export type KazaOrucu = { gun: number; bitisHafta: number };

/**
 * Kaza orucu: tamamen tutulmayan Ramazan sayısı × Ramazan'ın gün sayısı
 * (29 ya da 30) + ayrıca tutulamayan günler. Haftada `haftalikGun` gün
 * tutularak kaç haftada biteceği.
 */
export function kazaOrucu(ramazanSayisi: number, ramazanGunu: number, ekGun: number, haftalikGun: number): KazaOrucu | null {
  if (![ramazanSayisi, ramazanGunu, ekGun, haftalikGun].every((n) => Number.isFinite(n) && n >= 0)) return null;
  if (ramazanGunu < 29 || ramazanGunu > 30 || haftalikGun < 1 || haftalikGun > 7) return null;
  const gun = Math.round(ramazanSayisi) * ramazanGunu + Math.round(ekGun);
  if (gun < 1) return null;
  return { gun, bitisHafta: Math.ceil(gun / haftalikGun) };
}

/* ---------------- Zekât ---------------- */

/** Diyanet'in esas aldığı nisap: 80,18 gram (saf) altın. Zekât oranı kırkta bir. */
export const NISAP_ALTIN_GRAM = 80.18;
export const ZEKAT_ORANI = 0.025;

export type ZekatGirdisi = {
  nakit: number;
  banka: number;
  doviz: number;
  ticariMal: number;
  alacak: number;
  borc: number;
  altinGram: number;
  altinAyar: number;
  altinGramFiyati: number;
};

export type ZekatSonucu = {
  safAltinGram: number;
  altinDegeri: number;
  netVarlik: number;
  nisapDegeri: number;
  nisapUstunde: boolean;
  zekat: number;
};

const pozitif = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function zekatHesapla(g: ZekatGirdisi): ZekatSonucu | null {
  if (!(g.altinGramFiyati > 0) || !(g.altinAyar > 0 && g.altinAyar <= 24)) return null;
  const safAltinGram = pozitif(g.altinGram) * (g.altinAyar / 24);
  const altinDegeri = safAltinGram * g.altinGramFiyati;
  const netVarlik = Math.max(0, pozitif(g.nakit) + pozitif(g.banka) + pozitif(g.doviz) + pozitif(g.ticariMal) + pozitif(g.alacak) + altinDegeri - pozitif(g.borc));
  const nisapDegeri = NISAP_ALTIN_GRAM * g.altinGramFiyati;
  const nisapUstunde = netVarlik >= nisapDegeri;
  return { safAltinGram, altinDegeri, netVarlik, nisapDegeri, nisapUstunde, zekat: nisapUstunde ? netVarlik * ZEKAT_ORANI : 0 };
}

/* ---------------- Kurban hissesi ---------------- */

/** Büyükbaş (sığır, deve) en çok 7 kişiye; küçükbaş (koyun, keçi) tek kişiye. */
export const BUYUKBAS_MAX_HISSE = 7;

export type KurbanSonucu = {
  toplamTutar: number;
  hisseBasiTutar: number;
  /** Toplam et girildiyse hisse başına et (kg) */
  hisseBasiEt: number | null;
};

/**
 * Hayvan bedeli ve masraflar hisse sayısına eşit bölünür. Et verimi
 * hayvana göre çok değiştiği için varsayılmaz: toplam et (kg) kullanıcı
 * girerse hisse başına düşen gösterilir.
 */
export function kurbanHissesi(hayvanFiyati: number, masraf: number, hisse: number, toplamEtKg?: number): KurbanSonucu | null {
  const h = Math.round(hisse);
  if (!(hayvanFiyati > 0) || !(masraf >= 0) || !(h >= 1 && h <= BUYUKBAS_MAX_HISSE)) return null;
  const toplamTutar = hayvanFiyati + masraf;
  const et = toplamEtKg !== undefined && toplamEtKg > 0 ? toplamEtKg / h : null;
  return { toplamTutar, hisseBasiTutar: toplamTutar / h, hisseBasiEt: et };
}

/* ---------------- Seferîlik ---------------- */

/** Diyanet: gidilecek yer en az 90 km uzaktaysa seferî olunur (15 günden az kalınacaksa). */
export const SEFER_KM = 90;
export const IKAMET_GUN = 15;

/**
 * İl merkezleri arası karayolu mesafesine göre durum. Seferîlik, yaşanan
 * yerleşim yerinin sınırından itibaren ölçülür; il merkezleri arası mesafe bu
 * yüzden biraz fazladır. 90–120 km arası "sınırda" sayılır.
 */
export type SeferDurumu = "seferi" | "sinirda" | "degil";

/** Arayüz ve il sayfalarında ortak sonuç metinleri. */
export const SEFER_METIN: Record<SeferDurumu, { baslik: string; aciklama: string }> = {
  seferi: { baslik: "Seferî olursunuz", aciklama: `Mesafe ${SEFER_KM} km'yi rahatça aşıyor. 15 günden az kalacaksanız seferî sayılırsınız.` },
  sinirda: {
    baslik: "Sınırda: yerleşim sınırından ölçün",
    aciklama: `İl merkezleri arası ${SEFER_KM} km'yi aşıyor ama seferîlik yaşadığınız yerin sınırından ölçülür. Kendi çıkış noktanızdan gideceğiniz yerin sınırına kadar olan mesafeyi alttaki alana yazın.`,
  },
  degil: { baslik: "Seferî olmazsınız", aciklama: `Mesafe ${SEFER_KM} km'nin altında; namazlar ve oruç normal şekilde eda edilir.` },
};

export function seferDurumu(km: number, merkezlerArasi = true): SeferDurumu | null {
  if (!(km >= 0)) return null;
  if (km < SEFER_KM) return "degil";
  if (merkezlerArasi && km < SEFER_KM + 30) return "sinirda";
  return "seferi";
}

/* ---------------- Umre: tavaf ve sa'y ---------------- */

/**
 * Tavaf: Kâbe yaklaşık daire kabul edilir; Kâbe merkezinden duvara ~6 m.
 * Bir şavt = 2π × (duvara uzaklık + 6 m); tavaf 7 şavttır.
 * Sa'y: Safâ–Merve arası (tek yön) kullanıcıdan; kaynaklarda 394–450 m geçer. Sa'y 7 şavttır.
 */
export const KABE_YARICAP_M = 6;
export const SAVT_SAYISI = 7;

export type UmreMesafe = {
  tavafSavtM: number;
  tavafToplamM: number;
  sayToplamM: number;
  toplamM: number;
  adim: number;
  dakika: number;
};

export function umreMesafe({
  duvaraUzaklikM,
  tavafSayisi,
  sayYapilacak,
  safaMerveM,
  adimCm,
  hizKmSaat,
}: {
  duvaraUzaklikM: number;
  tavafSayisi: number;
  sayYapilacak: boolean;
  safaMerveM: number;
  adimCm: number;
  hizKmSaat: number;
}): UmreMesafe | null {
  const t = Math.round(tavafSayisi);
  if (!(duvaraUzaklikM >= 0 && duvaraUzaklikM <= 300) || !(t >= 0 && t <= 20)) return null;
  if (sayYapilacak && !(safaMerveM >= 300 && safaMerveM <= 600)) return null;
  if (!(adimCm >= 30 && adimCm <= 150) || !(hizKmSaat > 0 && hizKmSaat <= 10)) return null;
  const tavafSavtM = 2 * Math.PI * (duvaraUzaklikM + KABE_YARICAP_M);
  const tavafToplamM = tavafSavtM * SAVT_SAYISI * t;
  const sayToplamM = sayYapilacak ? safaMerveM * SAVT_SAYISI : 0;
  const toplamM = tavafToplamM + sayToplamM;
  if (toplamM <= 0) return null;
  return {
    tavafSavtM,
    tavafToplamM,
    sayToplamM,
    toplamM,
    adim: Math.round(toplamM / (adimCm / 100)),
    dakika: (toplamM / 1000 / hizKmSaat) * 60,
  };
}

/* ---------------- Türkçe ek ---------------- */

/**
 * Özel ada ayrılma eki: İstanbul'dan, İzmir'den, Muş'tan, Kilis'ten.
 * Son ünlüye göre a/e, sert ünsüzle (f s t k ç ş h p) bitiyorsa t.
 */
export function ayrilmaEki(ad: string) {
  const kucuk = ad.toLocaleLowerCase("tr-TR");
  const unluler = [...kucuk].filter((ch) => "aıoueiöü".includes(ch));
  const son = unluler[unluler.length - 1] ?? "a";
  const kalin = "aıou".includes(son);
  const sert = "fstkçşhp".includes(kucuk[kucuk.length - 1]);
  return `${ad}'${sert ? "t" : "d"}${kalin ? "a" : "e"}n`;
}

/* ---------------- Manyetik sapma (canlı pusula) ---------------- */


/**
 * Pusula manyetik kuzeyi gösterir; kıble açısı gerçek kuzeye göredir.
 * Manyetik sapma ABD/İngiltere'nin Dünya Manyetik Modeli WMM2025 ile
 * hesaplanır (magvar paketi). Model 2025.0–2030.0 arası geçerlidir:
 * WMM_GECERLILIK_SONU yaklaşınca tests/diniHesaplar.test.ts hatırlatır
 * ve WMM2030'a geçilmelidir.
 */
export const WMM_GECERLILIK_SONU = "2029-12-31";

/** Doğuya pozitif manyetik sapma (derece). */
export function manyetikSapma(lat: number, lon: number, when: Date = new Date()) {
  return magvar(lat, lon, 0, when);
}

/** Pusulada okunacak kıble açısı: manyetik kuzeyden saat yönünde. */
export function pusulaKibleAcisi(lat: number, lon: number, when: Date = new Date()) {
  return (((kibleAcisi(lat, lon) - manyetikSapma(lat, lon, when)) % 360) + 360) % 360;
}
