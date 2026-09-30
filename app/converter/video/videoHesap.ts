// Video sıkıştırma hesapları: hedef dosya boyutuna göre bit hızı ve çözünürlük önerisi.

/** Kapsayıcı (MP4) ve dalgalanma payı: hedefin %94'ü kullanılır. */
const PAY = 0.94;
export const MIN_VIDEO_BPS = 100_000;

/** Hedef boyuta (MB, 1 MB = 1 000 000 bayt) sığmak için gereken video bit hızı (bit/sn). */
export function hedefBitHizi(hedefMb: number, sureSn: number, sesBps: number) {
  if (sureSn <= 0) return MIN_VIDEO_BPS;
  const toplam = (hedefMb * 1_000_000 * 8 * PAY) / sureSn;
  return Math.max(MIN_VIDEO_BPS, Math.floor(toplam - sesBps));
}

/** Bit hızına uygun en büyük genişlik (kısa kenar yerine yatay genişlik; kaynaktan büyük olmaz). */
export function onerilenGenislik(bps: number, kaynakGenislik: number) {
  const basamaklar: Array<[number, number]> = [
    [4_000_000, 1920],
    [2_000_000, 1280],
    [900_000, 854],
    [450_000, 640],
    [0, 480],
  ];
  const w = basamaklar.find(([esik]) => bps >= esik)![1];
  return Math.min(w, kaynakGenislik);
}

/** Hedef boyut, bu süre ve ses için ulaşılabilir mi (en düşük kalitede bile sığar mı)? */
export const hedefUlasilabilir = (
  hedefMb: number,
  sureSn: number,
  sesBps: number,
) =>
  (hedefMb * 1_000_000 * 8 * PAY) / Math.max(sureSn, 0.001) - sesBps >=
  MIN_VIDEO_BPS;

/** Kalite düzeyine göre bit hızı (piksel başına bit yaklaşımı, 30 fps varsayımı). */
export function kaliteBitHizi(
  genislik: number,
  yukseklik: number,
  duzey: "yuksek" | "orta" | "dusuk",
) {
  const bpp = { yuksek: 0.1, orta: 0.06, dusuk: 0.035 }[duzey];
  return Math.max(MIN_VIDEO_BPS, Math.round(genislik * yukseklik * 30 * bpp));
}

/** Genişliği verilen oranda yüksekliği çift sayıya yuvarlar (kodlayıcılar çift boyut ister). */
export const ciftYukseklik = (w: number, kw: number, kh: number) =>
  Math.max(2, Math.round((w * kh) / kw / 2) * 2);
