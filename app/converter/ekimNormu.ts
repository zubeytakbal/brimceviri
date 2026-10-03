// Ürünlere göre tipik ekim normu ve verim. Değerler aralıktır; çeşit, bölge, ekim
// zamanı ve sulamaya göre değişir. "destek" sütunu sertifikalı tohum kullanım
// desteğinde dekar başına esas alınan en yüksek tohum miktarıdır (Resmî Gazete).

export type Urun = {
  id: string;
  ad: string;
  /** Dekara tohum (kg) tipik aralık. */
  tohum: [number, number];
  /** Sertifikalı tohum desteğinde dekara tavan (kg); yoksa null. */
  destek: number | null;
  /** Hedef bitki/m² ve bin dane ağırlığı (g): hesaplayıcıyı doldurmak için. */
  bitki: number | null;
  bdA: number | null;
  /** Dekara verim (kg) tipik aralık ve not. */
  verim: [number, number];
  verimNot?: string;
};

export const URUNLER: Urun[] = [
  { id: "bugday", ad: "Buğday", tohum: [18, 23], destek: 23, bitki: 500, bdA: 40, verim: [250, 700], verimNot: "kuru 250–400, sulu 500–700" },
  { id: "arpa", ad: "Arpa", tohum: [16, 20], destek: 23, bitki: 400, bdA: 40, verim: [250, 600], verimNot: "kuru 250–400, sulu 450–600" },
  { id: "yulaf", ad: "Yulaf", tohum: [14, 18], destek: 22, bitki: 450, bdA: 30, verim: [200, 350] },
  { id: "cavdar", ad: "Çavdar", tohum: [14, 18], destek: 23, bitki: 420, bdA: 30, verim: [200, 300] },
  { id: "misir", ad: "Mısır (dane)", tohum: [2, 3], destek: null, bitki: 8, bdA: 320, verim: [900, 1300], verimNot: "sulu" },
  { id: "aycicegi", ad: "Ayçiçeği", tohum: [0.4, 0.9], destek: null, bitki: 5.5, bdA: 65, verim: [150, 450], verimNot: "kuru 150–250, sulu 300–450" },
  { id: "pamuk", ad: "Pamuk", tohum: [2.5, 4], destek: null, bitki: null, bdA: null, verim: [450, 650], verimNot: "kütlü" },
  { id: "nohut", ad: "Nohut", tohum: [10, 14], destek: 14, bitki: 30, bdA: 400, verim: [100, 200] },
  { id: "mercimek", ad: "Kırmızı mercimek", tohum: [9, 12], destek: 14, bitki: 250, bdA: 40, verim: [100, 180] },
  { id: "fasulye", ad: "Kuru fasulye", tohum: [8, 10], destek: 10, bitki: 25, bdA: 350, verim: [200, 300], verimNot: "sulu" },
  { id: "fig", ad: "Fiğ", tohum: [8, 10], destek: 10, bitki: 160, bdA: 50, verim: [250, 500], verimNot: "kuru ot" },
  { id: "yonca", ad: "Yonca", tohum: [2, 3.5], destek: 3, bitki: null, bdA: null, verim: [1000, 2000], verimNot: "yıllık kuru ot, sulu, 3–5 biçim" },
  { id: "aspir", ad: "Aspir", tohum: [3, 4], destek: 4, bitki: 60, bdA: 45, verim: [100, 200] },
  { id: "kanola", ad: "Kanola (kolza)", tohum: [0.4, 0.6], destek: 0.4, bitki: 80, bdA: 4.5, verim: [250, 350] },
  { id: "susam", ad: "Susam", tohum: [0.5, 1.5], destek: 1.5, bitki: null, bdA: null, verim: [60, 120] },
  { id: "patates", ad: "Patates (tohumluk yumru)", tohum: [250, 350], destek: 350, bitki: null, bdA: null, verim: [3000, 5000] },
];

/** Hesaplayıcıyı doldurabilen ürünler (bitki/m² ve bin dane ağırlığı belli olanlar). */
export const ON_AYARLI = URUNLER.filter((u) => u.bitki !== null && u.bdA !== null);

/** Hasat: dekara verimden toplam ürün ve 50 kg'lık çuval sayısı. */
export function hasat(dekaraVerim: number, alanDekar: number, cuvalKg = 50) {
  if (!(dekaraVerim > 0) || !(alanDekar > 0) || !(cuvalKg > 0)) return null;
  const toplam = dekaraVerim * alanDekar;
  return { toplam, ton: toplam / 1000, cuval: Math.ceil(toplam / cuvalKg) };
}
