// Türkçe yapı ve günlük hesap ekleri: boyayı kilo ile, fayansı kutu ile, döşeme
// betonunu ve yakıtın km başına maliyetini hesaplar. Değişken fiyatlar kullanıcıdan.

/* ---------------- Boya (kilo) ---------------- */

/** Su bazlı plastik boyanın tipik yoğunluğu (kg/L): 1 kg ≈ 0,7 L. */
export const BOYA_YOGUNLUK = 1.4;
export const BOYA_KUTULARI = [15, 7.5, 2.5];

/** Boyanacak alan, kat sayısı ve tek kat sarfiyatından (m²/kg) gereken kilo ve kutu dağılımı. */
export function boyaKilo(alan: number, kat: number, m2PerKg: number) {
  if (!(alan > 0) || !(kat > 0) || !(m2PerKg > 0)) return null;
  const kg = (alan * kat) / m2PerKg;
  // Büyük kutudan başlayarak, en küçük kutuyla yukarı yuvarlanır.
  let kalan = kg;
  const kutular = BOYA_KUTULARI.map((k, i) => {
    const adet = i === BOYA_KUTULARI.length - 1 ? Math.ceil(kalan / k - 1e-9) : Math.floor(kalan / k + 1e-9);
    kalan = Math.max(0, kalan - adet * k);
    return { kg: k, adet };
  }).filter((x) => x.adet > 0);
  return { kg, litre: kg / BOYA_YOGUNLUK, kutular, alinan: kutular.reduce((s, x) => s + x.kg * x.adet, 0) };
}

/** Ev taban alanından kabaca boyanacak alan: duvarlar ≈ 2,5 × taban, tavan = taban. */
export const EV_BOYA_KATSAYI = 3.5;

/* ---------------- Fayans (kutu) ---------------- */

/** Alan, fayans ölçüsü (cm), kutudaki adet ve fire yüzdesinden adet ve kutu sayısı. */
export function fayansKutu(alan: number, enCm: number, boyCm: number, kutuAdet: number, firePct: number) {
  if (![alan, enCm, boyCm, kutuAdet].every((x) => x > 0) || !(firePct >= 0)) return null;
  const tekAlan = (enCm * boyCm) / 10000;
  const net = alan / tekAlan;
  const adet = Math.ceil(net * (1 + firePct / 100) - 1e-9);
  const kutu = Math.ceil(adet / kutuAdet);
  return { tekAlan, kutuM2: tekAlan * kutuAdet, adet, kutu, alinanM2: kutu * kutuAdet * tekAlan };
}

/** Türkiye'de yaygın kutu içerikleri (üreticiye göre değişir; kutudaki etiket esastır). */
export const FAYANS_KUTULARI: Array<{ olcu: [number, number]; adet: number }> = [
  { olcu: [20, 50], adet: 15 },
  { olcu: [25, 40], adet: 15 },
  { olcu: [30, 60], adet: 8 },
  { olcu: [33, 33], adet: 12 },
  { olcu: [45, 45], adet: 7 },
  { olcu: [60, 60], adet: 4 },
  { olcu: [60, 120], adet: 2 },
];

/* ---------------- Döşeme betonu ---------------- */

export const BETON_TON_M3 = 2.4;

export function dosemeBeton(alanM2: number, kalinlikCm: number, mikserM3: number) {
  if (!(alanM2 > 0) || !(kalinlikCm > 0) || !(mikserM3 > 0)) return null;
  const m3 = (alanM2 * kalinlikCm) / 100;
  return { m3, litre: m3 * 1000, ton: m3 * BETON_TON_M3, mikser: Math.ceil(m3 / mikserM3 - 1e-9) };
}

/* ---------------- Yakıt: km başına maliyet ---------------- */

export function kmMaliyet(litre100km: number, fiyat: number) {
  if (!(litre100km > 0) || !(fiyat > 0)) return null;
  const tlKm = (litre100km * fiyat) / 100;
  return { tlKm, kurusKm: tlKm * 100, tl100km: litre100km * fiyat };
}
