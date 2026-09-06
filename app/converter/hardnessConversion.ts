export type HardnessRow = {
  id: string;
  hb: number;
  hv: number;
  hrc: number | null;
  hrb: number | null;
};

// ASTM E140 standardina dayali, sadece isil islem gormus/gormemis
// (ostenitik olmayan) celikler icin gecerli yaklasik sertlik denklik
// tablosu. Iki bagimsiz kaynaktan (RivCut hesaplama araci, ASTM E140
// ozet referanslari) capraz dogrulanmistir (60 HRC->654 HB, 50 HRC->481
// HB, 40 HRC->371 HB noktalari birebir ortustu). ASTM E140'in kendisi
// bu donusumlerin yaklasik oldugunu ve celik disi malzemeler (paslanmaz,
// aluminyum, bakir alasimlari, dokme demir) icin gecerli olmadigini
// belirtir.
export const hardnessTable: HardnessRow[] = [
  { id: "hrc65", hb: 739, hv: 832, hrc: 65, hrb: null },
  { id: "hrc60", hb: 654, hv: 697, hrc: 60, hrb: null },
  { id: "hrc55", hb: 560, hv: 595, hrc: 55, hrb: null },
  { id: "hrc50", hb: 481, hv: 513, hrc: 50, hrb: null },
  { id: "hrc45", hb: 421, hv: 446, hrc: 45, hrb: null },
  { id: "hrc40", hb: 371, hv: 392, hrc: 40, hrb: null },
  { id: "hrc35", hb: 327, hv: 345, hrc: 35, hrb: null },
  { id: "hrc30", hb: 286, hv: 301, hrc: 30, hrb: null },
  { id: "hrc25", hb: 253, hv: 266, hrc: 25, hrb: 100 },
  { id: "hrc20", hb: 226, hv: 238, hrc: 20, hrb: 96 },
  { id: "hrb90", hb: 197, hv: 207, hrc: null, hrb: 90 },
  { id: "hrb80", hb: 150, hv: 157, hrc: null, hrb: 80 },
  { id: "hrb70", hb: 126, hv: 132, hrc: null, hrb: 70 },
  { id: "hrb60", hb: 106, hv: 111, hrc: null, hrb: 60 },
];

export function findClosestHardnessRow(
  scale: "hb" | "hv" | "hrc" | "hrb",
  value: number
): HardnessRow | null {
  const candidates = hardnessTable.filter((row) => row[scale] !== null);
  if (candidates.length === 0) return null;
  return candidates.reduce((closest, row) => {
    const rowValue = row[scale] as number;
    const closestValue = closest[scale] as number;
    return Math.abs(rowValue - value) < Math.abs(closestValue - value)
      ? row
      : closest;
  });
}
