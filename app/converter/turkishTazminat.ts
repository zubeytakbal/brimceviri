// Kidem ve ihbar tazminati hesabi (4857 sayili Is Kanunu md. 17, 1475 sayili Is Kanunu md. 14).
// Kidem: her tam yil icin 30 gunluk giydirilmis brut ucret, yil kesirleri oranli; yillik tutar fesih tarihindeki tavanla sinirli.
// Kesinti: yalniz damga vergisi (binde 7,59). Ihbar: hizmet suresine gore 2/4/6/8 hafta; gelir vergisi (ucret tarifesi,
// kumulatif matrah) ve damga vergisi kesilir, SGK primi kesilmez.
// Kaynak: CSGB kidem tazminati tavan tablosu, Hazine ve Maliye Bakanligi mali ve sosyal haklar genelgeleri, GVK md. 103.
import type { YMD } from "./time/calendars";
import { addDaysYmd, diffYmd, ymdKey } from "./time/dateMath";

export const DAMGA_VERGISI = 0.00759;
export const SGK_ISCI_ORANI = 0.15;

/** Kidem tazminati tavani (yillik brut ucret ust siniri), gecerlilik baslangicina gore. */
export const KIDEM_TAVANLARI: Array<{ baslangic: string; tutar: number }> = [
  { baslangic: "2025-01-01", tutar: 46655.43 },
  { baslangic: "2025-07-01", tutar: 53919.68 },
  { baslangic: "2026-01-01", tutar: 64948.77 },
  { baslangic: "2026-07-01", tutar: 73729.87 },
];

/** Ucret gelirleri icin gelir vergisi tarifesi (GVK md. 103). */
export const GELIR_VERGISI_TARIFESI: Record<number, Array<[number, number]>> = {
  2025: [
    [158000, 0.15],
    [330000, 0.2],
    [1200000, 0.27],
    [4300000, 0.35],
    [Infinity, 0.4],
  ],
  2026: [
    [190000, 0.15],
    [400000, 0.2],
    [1500000, 0.27],
    [5300000, 0.35],
    [Infinity, 0.4],
  ],
};

export function kidemTavani(fesih: YMD) {
  const key = ymdKey(fesih);
  const gecerli = KIDEM_TAVANLARI.filter((t) => t.baslangic <= key);
  return gecerli.length ? gecerli[gecerli.length - 1] : null;
}

export function gelirVergisi(matrah: number, yil: number) {
  const tarife = GELIR_VERGISI_TARIFESI[yil] ?? GELIR_VERGISI_TARIFESI[2026];
  let vergi = 0;
  let alt = 0;
  for (const [ust, oran] of tarife) {
    if (matrah <= alt) break;
    vergi += (Math.min(matrah, ust) - alt) * oran;
    alt = ust;
  }
  return vergi;
}

/** Hizmet suresi: giris ve cikis gunu dahil. */
export function hizmetSuresi(giris: YMD, cikis: YMD) {
  const d = diffYmd(giris, addDaysYmd(cikis, 1));
  return {
    yil: d.years,
    ay: d.months,
    gun: d.days,
    toplamYil: d.years + d.months / 12 + d.days / 365,
  };
}

/** Ihbar suresi (hafta) – Is Kanunu md. 17. */
export function ihbarHaftasi(toplamYil: number) {
  if (toplamYil < 0.5) return 2;
  if (toplamYil < 1.5) return 4;
  if (toplamYil < 3) return 6;
  return 8;
}

export type AyrilisNedeni =
  | "isveren-fesih"
  | "isveren-hakli"
  | "isci-hakli"
  | "istifa"
  | "emeklilik"
  | "askerlik"
  | "evlilik"
  | "olum";

export const AYRILIS_NEDENLERI: Array<{
  id: AyrilisNedeni;
  label: string;
  kidem: boolean;
  ihbar: boolean;
}> = [
  {
    id: "isveren-fesih",
    label: "İşveren çıkardı (haklı neden olmadan)",
    kidem: true,
    ihbar: true,
  },
  {
    id: "isveren-hakli",
    label: "İşveren haklı nedenle çıkardı (md. 25/II ahlak ve iyi niyet)",
    kidem: false,
    ihbar: false,
  },
  {
    id: "isci-hakli",
    label: "İşçi haklı nedenle ayrıldı (md. 24: maaş ödenmedi, mobbing vb.)",
    kidem: true,
    ihbar: false,
  },
  { id: "istifa", label: "İstifa", kidem: false, ihbar: false },
  {
    id: "emeklilik",
    label: "Emeklilik veya yaş dışındaki şartları doldurma (15 yıl / 3600 gün)",
    kidem: true,
    ihbar: false,
  },
  { id: "askerlik", label: "Askerlik", kidem: true, ihbar: false },
  {
    id: "evlilik",
    label: "Kadın çalışanın evlendikten sonra 1 yıl içinde ayrılması",
    kidem: true,
    ihbar: false,
  },
  {
    id: "olum",
    label: "Çalışanın vefatı (mirasçılara)",
    kidem: true,
    ihbar: false,
  },
];

export type TazminatEingabe = {
  giris: YMD;
  cikis: YMD;
  brutMaas: number;
  /** Duzenli ek odemelerin aylik karsiligi (yemek, yol, ikramiye/12, duzenli prim) */
  ekOdemeler: number;
  neden: AyrilisNedeni;
  /** Cikis yilinda ihbar oncesi kumulatif gelir vergisi matrahi; bos birakilirsa tahmin edilir */
  kumulatifMatrah?: number | null;
};

export function tazminat(e: TazminatEingabe) {
  const sure = hizmetSuresi(e.giris, e.cikis);
  const neden = AYRILIS_NEDENLERI.find((n) => n.id === e.neden)!;
  const giydirilmis = e.brutMaas + e.ekOdemeler;
  const tavan = kidemTavani(e.cikis);
  const esas = tavan ? Math.min(giydirilmis, tavan.tutar) : giydirilmis;
  const kidemHakki = neden.kidem && sure.toplamYil >= 1;
  const kidemBrut = kidemHakki
    ? esas * sure.yil + (esas / 12) * sure.ay + (esas / 365) * sure.gun
    : 0;
  const kidemDamga = kidemBrut * DAMGA_VERGISI;

  const ihbarHafta = neden.ihbar ? ihbarHaftasi(sure.toplamYil) : 0;
  const ihbarBrut = (giydirilmis / 30) * ihbarHafta * 7;
  const yil = e.cikis.year;
  // Tahmin: cikis ayina kadar olan aylarin brut ucreti eksi %15 SGK isci payi
  const tahminiMatrah = e.brutMaas * (1 - SGK_ISCI_ORANI) * (e.cikis.month - 1);
  const kumulatif = e.kumulatifMatrah ?? tahminiMatrah;
  const ihbarGelirVergisi =
    gelirVergisi(kumulatif + ihbarBrut, yil) - gelirVergisi(kumulatif, yil);
  const ihbarDamga = ihbarBrut * DAMGA_VERGISI;

  return {
    sure,
    neden,
    giydirilmis,
    tavan,
    tavanaTakildi: tavan !== null && giydirilmis > tavan.tutar,
    kidemHakki,
    kidemBrut,
    kidemDamga,
    kidemNet: kidemBrut - kidemDamga,
    ihbarHafta,
    ihbarBrut,
    ihbarGelirVergisi,
    ihbarDamga,
    ihbarNet: ihbarBrut - ihbarGelirVergisi - ihbarDamga,
    kumulatifTahmin: e.kumulatifMatrah == null,
    toplamNet:
      kidemBrut - kidemDamga + (ihbarBrut - ihbarGelirVergisi - ihbarDamga),
  };
}
