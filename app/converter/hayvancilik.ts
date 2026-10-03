// Hayvancılık hesapları: tohumlamadan doğum tarihi ve kuluçka takvimi.
// Süreler ortalamadır (ırk, yaş ve yavru sayısına göre birkaç gün oynar);
// kaynak: Tarım ve Orman Bakanlığı yetiştirici rehberleri, zootekni ders notları.
import type { YMD } from "./time/calendars";
import { addDaysYmd, diffDays } from "./time/dateMath";

export type HayvanTuru = "inek" | "duve" | "manda" | "koyun" | "keci" | "at" | "esek";

export type HayvanBilgi = {
  ad: string;
  /** Ortalama gebelik süresi (gün) ve normal sayılan aralık. */
  gebelik: number;
  min: number;
  max: number;
  /** Tutmazsa kızgınlığın tekrar beklendiği döngü (gün). */
  kizginlik: number;
  /** Ultrasonla gebeliğin anlaşılabildiği en erken gün. */
  kontrol: number;
  /** Sağmal hayvanda kuruya ayırma: doğumdan kaç gün önce (yoksa null). */
  kuru: number | null;
  /** Doğum bölmesine/ayrı yere alma: doğumdan kaç gün önce. */
  bolme: number;
  yavru: string;
};

export const HAYVANLAR: Record<HayvanTuru, HayvanBilgi> = {
  inek: { ad: "İnek", gebelik: 283, min: 279, max: 290, kizginlik: 21, kontrol: 30, kuru: 60, bolme: 14, yavru: "buzağı" },
  duve: { ad: "Düve", gebelik: 280, min: 276, max: 287, kizginlik: 21, kontrol: 30, kuru: null, bolme: 14, yavru: "buzağı" },
  manda: { ad: "Manda", gebelik: 310, min: 300, max: 320, kizginlik: 21, kontrol: 35, kuru: 60, bolme: 14, yavru: "malak" },
  koyun: { ad: "Koyun", gebelik: 150, min: 144, max: 155, kizginlik: 17, kontrol: 35, kuru: 45, bolme: 7, yavru: "kuzu" },
  keci: { ad: "Keçi", gebelik: 150, min: 145, max: 155, kizginlik: 21, kontrol: 35, kuru: 60, bolme: 7, yavru: "oğlak" },
  at: { ad: "At (kısrak)", gebelik: 340, min: 320, max: 360, kizginlik: 21, kontrol: 16, kuru: null, bolme: 30, yavru: "tay" },
  esek: { ad: "Eşek", gebelik: 365, min: 350, max: 380, kizginlik: 23, kontrol: 16, kuru: null, bolme: 30, yavru: "sıpa" },
};

export function dogumTakvimi(tur: HayvanTuru, tohumlama: YMD) {
  const h = HAYVANLAR[tur];
  const dogum = addDaysYmd(tohumlama, h.gebelik);
  return {
    dogum,
    erken: addDaysYmd(tohumlama, h.min),
    gec: addDaysYmd(tohumlama, h.max),
    /** Tutmadıysa kızgınlığın tekrar gözleneceği iki tarih. */
    kizginlik: [addDaysYmd(tohumlama, h.kizginlik), addDaysYmd(tohumlama, 2 * h.kizginlik)],
    kontrol: addDaysYmd(tohumlama, h.kontrol),
    kuru: h.kuru === null ? null : addDaysYmd(dogum, -h.kuru),
    bolme: addDaysYmd(dogum, -h.bolme),
  };
}

/** Bugün gebeliğin kaçıncı günü ve doğuma kaç gün var. */
export function gebelikDurumu(tur: HayvanTuru, tohumlama: YMD, bugun: YMD) {
  const gun = diffDays(tohumlama, bugun);
  const kalan = HAYVANLAR[tur].gebelik - gun;
  return { gun, ay: Math.floor(gun / 30), kalan };
}

/** Sabah-akşam kuralı: kızgınlık sabah görülürse aynı akşam, akşam görülürse ertesi sabah tohumlanır. */
export function tohumlamaZamani(gorulme: "sabah" | "aksam") {
  return gorulme === "sabah" ? "aynı gün akşam" : "ertesi gün sabah";
}

/* ---------------- Kuluçka ---------------- */

export type KanatliTuru = "tavuk" | "bildircin" | "keklik" | "sulun" | "bec" | "hindi" | "ordek" | "mordek" | "kaz";

export type KanatliBilgi = { ad: string; gun: number; kontrol: [number, number] };

/** Çıkım süresi; çevirme ve "kilit" dönemi çıkımdan 3 gün önce başlar. */
export const KANATLILAR: Record<KanatliTuru, KanatliBilgi> = {
  tavuk: { ad: "Tavuk", gun: 21, kontrol: [7, 14] },
  bildircin: { ad: "Bıldırcın", gun: 17, kontrol: [5, 10] },
  keklik: { ad: "Keklik", gun: 24, kontrol: [7, 14] },
  sulun: { ad: "Sülün", gun: 24, kontrol: [7, 14] },
  bec: { ad: "Beç tavuğu", gun: 27, kontrol: [7, 14] },
  hindi: { ad: "Hindi", gun: 28, kontrol: [7, 14] },
  ordek: { ad: "Ördek (Pekin ve yerli)", gun: 28, kontrol: [7, 14] },
  mordek: { ad: "Mısır (Muscovy) ördeği", gun: 35, kontrol: [7, 14] },
  kaz: { ad: "Kaz", gun: 30, kontrol: [7, 14] },
};

export const KILIT_GUN = 3;

export function kuluckaTakvimi(tur: KanatliTuru, baslangic: YMD) {
  const k = KANATLILAR[tur];
  const cikim = addDaysYmd(baslangic, k.gun);
  return {
    kontrol1: addDaysYmd(baslangic, k.kontrol[0]),
    kontrol2: addDaysYmd(baslangic, k.kontrol[1]),
    /** Çevirmenin bırakıldığı ve nemin artırıldığı gün (son 3 gün). */
    kilit: addDaysYmd(cikim, -KILIT_GUN),
    cikim,
    /** Geç çıkanlar için beklenebilecek son gün. */
    sonBekleme: addDaysYmd(cikim, 2),
  };
}

/** Kuluçkada gün içindeki aşama. */
export function kuluckaGunu(tur: KanatliTuru, baslangic: YMD, bugun: YMD) {
  const gun = diffDays(baslangic, bugun) + 1;
  const toplam = KANATLILAR[tur].gun;
  const asama = gun < 1 ? "once" : gun <= toplam - KILIT_GUN ? "gelisim" : gun <= toplam ? "kilit" : "sonra";
  return { gun, asama } as const;
}

/** Civciv ana makinesi (brooder) sıcaklığı: ilk hafta 33–35 °C, her hafta ~3 °C düşer, 21 °C'de sabitlenir. */
export function civcivIsisi(hafta: number) {
  const ust = Math.max(35 - 3 * (hafta - 1), 21);
  return { alt: Math.max(ust - 2, 20), ust };
}

/** Kuluçka randımanı: döllülük, konulandan çıkış ve döllüden çıkış oranları. */
export function kuluckaRandimani(konulan: number, dollu: number, cikan: number) {
  if (!(konulan > 0) || !(dollu >= 0) || !(cikan >= 0) || dollu > konulan || cikan > dollu) return null;
  return {
    dolluluk: dollu / konulan,
    cikis: cikan / konulan,
    dolluCikis: dollu > 0 ? cikan / dollu : 0,
  };
}

/* ---------------- Dekara fidan / fide sayısı ---------------- */

export const DEKAR_M2 = 1000;
/** Eşkenar üçgen dikimde sıralar arası mesafe = dikim mesafesi × √3/2. */
export const UCGEN_KATSAYI = Math.sqrt(3) / 2;

export type DikimDuzeni = "dikdortgen" | "ucgen";

/**
 * Dekara bitki sayısı. Dikdörtgen/kare: 1000 ÷ (sıra arası × sıra üzeri);
 * eşkenar üçgen (şeşbeş): 1000 ÷ (mesafe² × 0,866). Mesafeler metre.
 */
export function dekaraBitki(duzen: DikimDuzeni, siraArasi: number, siraUzeri: number) {
  if (!(siraArasi > 0) || (duzen === "dikdortgen" && !(siraUzeri > 0))) return null;
  const birimAlan = duzen === "ucgen" ? siraArasi * siraArasi * UCGEN_KATSAYI : siraArasi * siraUzeri;
  return DEKAR_M2 / birimAlan;
}

/** Alan için gereken fidan/fide; yedek yüzdesi (ölen fideler için) eklenir, yukarı yuvarlanır. */
export function toplamBitki(dekaraSayi: number, alanDekar: number, yedekYuzde = 0) {
  if (!(dekaraSayi > 0) || !(alanDekar > 0) || !(yedekYuzde >= 0)) return null;
  const net = dekaraSayi * alanDekar;
  return { net: Math.floor(net), yedekli: Math.ceil(net * (1 + yedekYuzde / 100)) };
}

/* ---------------- İlaçlama karışımı ---------------- */

export type DozBirimi = "dekar" | "yuzLitre";

/**
 * Etiket dozu ya dekara (ml veya g/da) ya da 100 litre suya (ml veya g/100 L) verilir.
 * Dekara su miktarı, depo hacmi ve alandan depo başına ilaç ve depo sayısı.
 */
export function ilaclama(opts: { doz: number; birim: DozBirimi; dekaraSu: number; depo: number; alan: number }) {
  const { doz, birim, dekaraSu, depo, alan } = opts;
  if (![doz, dekaraSu, depo, alan].every((x) => x > 0)) return null;
  const toplamSu = dekaraSu * alan;
  const toplamIlac = birim === "dekar" ? doz * alan : (toplamSu / 100) * doz;
  const depoBasinaIlac = birim === "dekar" ? (doz * depo) / dekaraSu : (depo / 100) * doz;
  const depoSayisi = toplamSu / depo;
  const tamDepo = Math.floor(depoSayisi + 1e-9);
  const sonDepoSu = toplamSu - tamDepo * depo;
  return {
    toplamSu,
    toplamIlac,
    depoBasinaIlac,
    depoBasinaAlan: depo / dekaraSu,
    depoSayisi,
    tamDepo,
    sonDepoSu: sonDepoSu > 1e-6 ? sonDepoSu : 0,
    sonDepoIlac: sonDepoSu > 1e-6 ? (depoBasinaIlac * sonDepoSu) / depo : 0,
  };
}
