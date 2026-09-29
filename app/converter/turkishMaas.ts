// Brutten nete maas hesabi 2026 (aylik bordro, kumulatif gelir vergisi).
// SGK isci %14 + issizlik isci %1 (emekli/SGDP: %7,5, issizlik yok), SGK tavani = 9 × brut asgari ucret.
// Gelir vergisi GVK md. 103 ucret tarifesi, asgari ucret istisnasi (GVK md. 23/18): asgari ucretin aylik vergisi
// kadar vergi alinmaz; damga vergisi binde 7,59, asgari ucrete isabet eden kisim istisna (DVK 9 no'lu tablo).
// Isveren: SGK %21,75 + issizlik %2; Hazine tesviki imalatta 5, diger sektorlerde 2 puan.
import { DAMGA_VERGISI, gelirVergisi } from "./turkishTazminat";

export const MAAS_YILI = 2026;
export const ASGARI_BRUT = 33030;
export const SGK_TAVAN = ASGARI_BRUT * 9;
export const SGK_ISCI = 0.14;
export const ISSIZLIK_ISCI = 0.01;
export const SGDP_ISCI = 0.075;
export const SGK_ISVEREN = 0.2175;
export const ISSIZLIK_ISVEREN = 0.02;

export const AYLAR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export type MaasSecenek = { emekli: boolean; tesvikPuan: 0 | 2 | 5 };

const asgariMatrah = ASGARI_BRUT * (1 - SGK_ISCI - ISSIZLIK_ISCI);

export type BordroAy = {
  ay: number;
  brut: number;
  sgk: number;
  issizlik: number;
  gvMatrah: number;
  kumulatif: number;
  gelirVergisi: number;
  gvIstisna: number;
  damga: number;
  net: number;
  isverenMaliyeti: number;
};

/** Bir ayin bordrosu; kumulatifOnce = onceki aylarin toplam gelir vergisi matrahi. */
export function bordroAy(
  ay: number,
  brut: number,
  kumulatifOnce: number,
  s: MaasSecenek,
): BordroAy {
  const base = Math.min(Math.max(brut, 0), SGK_TAVAN);
  const sgk = base * (s.emekli ? SGDP_ISCI : SGK_ISCI);
  const issizlik = s.emekli ? 0 : base * ISSIZLIK_ISCI;
  const gvMatrah = Math.max(0, brut - sgk - issizlik);
  const gv =
    gelirVergisi(kumulatifOnce + gvMatrah, MAAS_YILI) -
    gelirVergisi(kumulatifOnce, MAAS_YILI);
  const asgariOnce = asgariMatrah * (ay - 1);
  const istisnaTavan =
    gelirVergisi(asgariOnce + asgariMatrah, MAAS_YILI) -
    gelirVergisi(asgariOnce, MAAS_YILI);
  const gvIstisna = Math.min(gv, istisnaTavan);
  const damga = Math.max(0, brut - ASGARI_BRUT) * DAMGA_VERGISI;
  const net = brut - sgk - issizlik - (gv - gvIstisna) - damga;
  const isverenOran = s.emekli
    ? 0
    : SGK_ISVEREN - s.tesvikPuan / 100 + ISSIZLIK_ISVEREN;
  return {
    ay,
    brut,
    sgk,
    issizlik,
    gvMatrah,
    kumulatif: kumulatifOnce + gvMatrah,
    gelirVergisi: gv - gvIstisna,
    gvIstisna,
    damga,
    net,
    isverenMaliyeti: s.emekli ? Number.NaN : brut + base * isverenOran,
  };
}

/** 12 aylik bordro: her ay ayni brut. */
export function yillikBordro(brut: number, s: MaasSecenek) {
  const aylar: BordroAy[] = [];
  let kum = 0;
  for (let ay = 1; ay <= 12; ay += 1) {
    const b = bordroAy(ay, brut, kum, s);
    aylar.push(b);
    kum = b.kumulatif;
  }
  return { aylar, ...toplam(aylar) };
}

/** Netten brute: her ay ayni net icin gereken brut (kumulatif vergiye gore aydan aya artar). */
export function nettenBrute(net: number, s: MaasSecenek) {
  const aylar: BordroAy[] = [];
  let kum = 0;
  for (let ay = 1; ay <= 12; ay += 1) {
    let lo = net;
    let hi = net * 3 + 100000;
    for (let i = 0; i < 80; i += 1) {
      const mid = (lo + hi) / 2;
      if (bordroAy(ay, mid, kum, s).net < net) lo = mid;
      else hi = mid;
    }
    const b = bordroAy(ay, Math.ceil(hi * 100) / 100, kum, s);
    aylar.push(b);
    kum = b.kumulatif;
  }
  return { aylar, ...toplam(aylar) };
}

function toplam(aylar: BordroAy[]) {
  const sum = (k: keyof BordroAy) =>
    aylar.reduce((t, a) => t + (a[k] as number), 0);
  return {
    brutYil: sum("brut"),
    netYil: sum("net"),
    sgkYil: sum("sgk") + sum("issizlik"),
    vergiYil: sum("gelirVergisi") + sum("damga"),
    isverenYil: sum("isverenMaliyeti"),
  };
}
