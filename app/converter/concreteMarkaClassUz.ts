// Beton markasi (M, GOST 26633 bo'yicha o'rtacha mustahkamlik, kgf/sm²) va
// sinfi (B, kafolatlangan mustahkamlik, MPa) orasidagi mos kelish jadvali.
// O'zbekiston qurilish bozorida "marka" atamasi (Sovet davridan qolgan
// GOST tizimi) hozirgacha "sinf" bilan bir qatorda, ko'pincha undan ham
// ko'proq ishlatiladi. Bu jadval GOST 26633 standartida keng
// qo'llaniladigan, sohada barqaror qiymatlarga asoslangan; ikkita
// qiymat mustaqil manbalardan (savdo e'loni: "M100 (B7,5)", "M250
// (V20)") tasdiqlangan.

export type ConcreteMarkaClassRow = {
  marka: string;
  markaValue: number;
  className: string;
};

export const concreteMarkaClassTable: ConcreteMarkaClassRow[] = [
  { marka: "M50", markaValue: 50, className: "B3.5" },
  { marka: "M75", markaValue: 75, className: "B5" },
  { marka: "M100", markaValue: 100, className: "B7.5" },
  { marka: "M150", markaValue: 150, className: "B10" },
  { marka: "M200", markaValue: 200, className: "B15" },
  { marka: "M250", markaValue: 250, className: "B20" },
  { marka: "M300", markaValue: 300, className: "B22.5" },
  { marka: "M350", markaValue: 350, className: "B25" },
  { marka: "M400", markaValue: 400, className: "B30" },
  { marka: "M450", markaValue: 450, className: "B35" },
  { marka: "M500", markaValue: 500, className: "B40" },
  { marka: "M550", markaValue: 550, className: "B40" },
  { marka: "M600", markaValue: 600, className: "B45" },
  { marka: "M700", markaValue: 700, className: "B50" },
  { marka: "M800", markaValue: 800, className: "B60" },
];

export function findByMarka(marka: string): ConcreteMarkaClassRow | null {
  return (
    concreteMarkaClassTable.find(
      (row) => row.marka.toLowerCase() === marka.trim().toLowerCase()
    ) ?? null
  );
}

export function findByClassName(className: string): ConcreteMarkaClassRow | null {
  return (
    concreteMarkaClassTable.find(
      (row) => row.className.toLowerCase() === className.trim().toLowerCase()
    ) ?? null
  );
}
