// Bisiklet jant ölçüleri: inç ve Fransız (700c, 650b) adlandırmalarının ETRTO / ISO 5775 jant oturma çapı (BSD, mm) karşılıkları.
// Aynı inç adı farklı jantlara karşılık gelebilir (ör. 20" BMX 406 mm, 20" eski şehir bisikleti 451 mm); belirleyici olan BSD'dir.

export type BikeRim = { bsd: number; names: string[]; use: string };

export const BIKE_RIMS: BikeRim[] = [
  { bsd: 203, names: ['12"', '12 1/2"'], use: "Çocuk bisikleti" },
  { bsd: 254, names: ['14"'], use: "Çocuk bisikleti" },
  { bsd: 305, names: ['16"'], use: "Çocuk ve katlanır bisiklet" },
  { bsd: 349, names: ['16" x 1 3/8"'], use: "Brompton tipi katlanır" },
  { bsd: 355, names: ['18"'], use: "Çocuk ve katlanır bisiklet" },
  { bsd: 406, names: ['20"'], use: "BMX, katlanır, çocuk bisikleti" },
  { bsd: 451, names: ['20" x 1 1/8"', '20" x 1 3/8"'], use: "Eski tip şehir ve yarış çocuk bisikleti" },
  { bsd: 507, names: ['24"'], use: "Genç dağ bisikleti" },
  { bsd: 559, names: ['26"'], use: "Klasik dağ bisikleti" },
  { bsd: 571, names: ["650c", '26" x 1"'], use: "Triatlon ve küçük kadro yol bisikleti" },
  { bsd: 584, names: ["650b", '27,5"'], use: "Dağ bisikleti, gravel" },
  { bsd: 590, names: ['26" x 1 3/8"', "650a"], use: "Eski şehir bisikleti" },
  { bsd: 622, names: ["700c", '28"', '29"'], use: "Yol, şehir, trekking, 29er dağ bisikleti" },
  { bsd: 630, names: ['27"'], use: "Eski yol bisikleti" },
];

/** ETRTO lastik ölçüsü "genişlik-BSD" (ör. 37-622) ayrıştırılır. */
export function parseEtrto(text: string): { width: number; bsd: number } | null {
  const m = text.trim().match(/^(\d{2})\s*[-x×]\s*(\d{3})$/i);
  if (!m) return null;
  return { width: Number(m[1]), bsd: Number(m[2]) };
}

export const rimByBsd = (bsd: number) => BIKE_RIMS.find((r) => r.bsd === bsd) ?? null;

/** Lastik takılı tekerin yaklaşık dış çapı (mm): BSD + 2 × lastik genişliği (lastik yüksekliği genişliğe yakın kabul edilir). */
export const outerDiameter = (width: number, bsd: number) => bsd + 2 * width;
