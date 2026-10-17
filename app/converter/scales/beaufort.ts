// Beaufort (bofor) rüzgar ölçeği, WMO tanımı: her derecenin hız aralığı (m/s, knot, km/h) ve açık denizde olası dalga yüksekliği.
// Kaynak: WMO No. 306 / No. 558 tabloları. Tablonun km/h ve knot sütunları yuvarlanmış olduğundan her birim kendi sütunuyla sınıflandırılır:
// m/s 0,1'e, km/h ve knot tam sayıya yuvarlanır; mph önce knota çevrilir.

export type BeaufortLevel = {
  force: number;
  name: string;
  /** m/s alt sınır (dahil) ve üst sınır (dahil, 12 için yok). */
  ms: [number, number | null];
  kn: [number, number | null];
  kmh: [number, number | null];
  /** Açık denizde olası dalga yüksekliği (m). */
  wave: number;
  sea: string;
  land: string;
};

export const BEAUFORT: BeaufortLevel[] = [
  { force: 0, name: "Sakin", ms: [0, 0.2], kn: [0, 0], kmh: [0, 0], wave: 0, sea: "Deniz ayna gibi düz.", land: "Duman dimdik yükselir." },
  { force: 1, name: "Hafif esinti", ms: [0.3, 1.5], kn: [1, 3], kmh: [1, 5], wave: 0.1, sea: "Pul pul dalgacıklar, köpük yok.", land: "Duman yön gösterir, rüzgâr gülü dönmez." },
  { force: 2, name: "Hafif rüzgâr", ms: [1.6, 3.3], kn: [4, 6], kmh: [6, 11], wave: 0.2, sea: "Kısa, belirgin dalgacıklar; tepeler kırılmaz.", land: "Rüzgâr yüzde hissedilir, yapraklar hışırdar." },
  { force: 3, name: "Tatlı rüzgâr", ms: [3.4, 5.4], kn: [7, 10], kmh: [12, 19], wave: 0.6, sea: "Büyük dalgacıklar, yer yer beyaz köpük.", land: "Yapraklar ve ince dallar sürekli kıpırdar, bayrak açılır." },
  { force: 4, name: "Orta rüzgâr", ms: [5.5, 7.9], kn: [11, 16], kmh: [20, 28], wave: 1, sea: "Küçük dalgalar uzar, beyaz köpük sıklaşır.", land: "Toz ve kâğıt havalanır, küçük dallar sallanır." },
  { force: 5, name: "Sert rüzgâr", ms: [8, 10.7], kn: [17, 21], kmh: [29, 38], wave: 2, sea: "Orta boy, uzun dalgalar; çok sayıda köpük, serpinti olabilir.", land: "Yapraklı küçük ağaçlar sallanır." },
  { force: 6, name: "Kuvvetli rüzgâr", ms: [10.8, 13.8], kn: [22, 27], kmh: [39, 49], wave: 3, sea: "Büyük dalgalar oluşur, köpüklü tepeler yaygınlaşır.", land: "Büyük dallar sallanır, şemsiye zor tutulur." },
  { force: 7, name: "Fırtınamsı rüzgâr", ms: [13.9, 17.1], kn: [28, 33], kmh: [50, 61], wave: 4, sea: "Deniz kabarır, kırılan dalgaların köpüğü şeritler hâlinde uçar.", land: "Ağaçların tamamı sallanır, rüzgâra karşı yürümek zorlaşır." },
  { force: 8, name: "Fırtına", ms: [17.2, 20.7], kn: [34, 40], kmh: [62, 74], wave: 5.5, sea: "Orta yükseklikte uzun dalgalar, tepelerden serpinti kopar.", land: "Ağaç dalları kırılır, yürümek çok zorlaşır." },
  { force: 9, name: "Kuvvetli fırtına", ms: [20.8, 24.4], kn: [41, 47], kmh: [75, 88], wave: 7, sea: "Yüksek dalgalar, yoğun köpük şeritleri; serpinti görüşü azaltır.", land: "Çatı kiremitleri uçar, hafif yapılar zarar görür." },
  { force: 10, name: "Tam fırtına", ms: [24.5, 28.4], kn: [48, 55], kmh: [89, 102], wave: 9, sea: "Çok yüksek dalgalar, deniz yüzeyi beyaz görünür.", land: "Ağaçlar kökünden sökülür, yapılarda ciddi hasar." },
  { force: 11, name: "Şiddetli fırtına", ms: [28.5, 32.6], kn: [56, 63], kmh: [103, 117], wave: 11.5, sea: "Olağanüstü yüksek dalgalar, görüş ciddi azalır.", land: "Geniş alanda yaygın hasar." },
  { force: 12, name: "Kasırga (orkan)", ms: [32.7, null], kn: [64, null], kmh: [118, null], wave: 14, sea: "Hava köpük ve serpintiyle dolu, deniz tamamen beyaz.", land: "Yıkıcı hasar." },
];

export type SpeedUnit = "kmh" | "ms" | "kn" | "mph";
export const SPEED_TO_MS: Record<SpeedUnit, number> = { kmh: 1 / 3.6, ms: 1, kn: 1852 / 3600, mph: 0.44704 };

/** Verilen hızın bofor derecesi; negatif ya da geçersizse null. */
export function beaufortOf(value: number, unit: SpeedUnit): BeaufortLevel | null {
  if (!Number.isFinite(value) || value < 0) return null;
  const key = unit === "mph" ? "kn" : unit;
  const v = unit === "mph" ? Math.round((value * SPEED_TO_MS.mph) / SPEED_TO_MS.kn) : unit === "ms" ? Math.round(value * 10) / 10 : Math.round(value);
  let level = BEAUFORT[0];
  for (const l of BEAUFORT) if (v >= l[key][0]) level = l;
  return level;
}
