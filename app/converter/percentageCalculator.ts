export type PercentageTarget = "sonuc" | "sayi" | "yuzde";

export interface PercentageInput {
  target: PercentageTarget;
  yuzde: number;
  sayi: number;
  sonuc: number;
}

export interface PercentageResult {
  target: PercentageTarget;
  yuzde: number;
  sayi: number;
  sonuc: number;
}

/** Y = (P/100) × X — verilen ikisinden üçüncüsünü çözer. */
export function calculatePercentage(input: PercentageInput): PercentageResult | null {
  const { target, yuzde, sayi, sonuc } = input;

  if (target === "sonuc") {
    if (!Number.isFinite(yuzde) || !Number.isFinite(sayi)) {
      return null;
    }
    return { target, yuzde, sayi, sonuc: (yuzde / 100) * sayi };
  }

  if (target === "sayi") {
    if (!Number.isFinite(yuzde) || !Number.isFinite(sonuc) || yuzde === 0) {
      return null;
    }
    return { target, yuzde, sayi: sonuc / (yuzde / 100), sonuc };
  }

  if (!Number.isFinite(sayi) || !Number.isFinite(sonuc) || sayi === 0) {
    return null;
  }
  return { target, yuzde: (sonuc / sayi) * 100, sayi, sonuc };
}

export interface PercentageChangeResult {
  eski: number;
  yeni: number;
  fark: number;
  changePercent: number;
}

/** Eski değerden yeniye geçişteki yüzde değişimi (artış pozitif, azalış negatif). */
export function calculatePercentageChange(
  eski: number,
  yeni: number
): PercentageChangeResult | null {
  if (!Number.isFinite(eski) || !Number.isFinite(yeni) || eski === 0) {
    return null;
  }
  const fark = yeni - eski;
  return { eski, yeni, fark, changePercent: (fark / eski) * 100 };
}
