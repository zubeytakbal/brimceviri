// Tarla / arsa alani: kenar uzunluklarindan m2 ve dönüm, eski dönüm, ar,
// hektar karsiliklari. Duzensiz dortgen tarla, bir kosegenle iki ucgene
// bolunur (sahada kullanilan yontem); her ucgen Heron formuluyle hesaplanir.

export const DONUM_M2 = 1000; // 1 dönüm (yeni dönüm) = 1 dekar = 1000 m2
// Eski (Osmanli) dönüm: 40 x 40 = 1600 arşın kare; 1 arşın = 0,758 m
// -> 1600 x 0,758^2 = 919,30 m2 (yaygin kullanilan deger 919,3 m2).
export const ESKI_DONUM_M2 = 1600 * 0.758 * 0.758;
export const AR_M2 = 100;
export const HEKTAR_M2 = 10000;

const positive = (value: number) => Number.isFinite(value) && value > 0;

export function rectangleArea(width: number, length: number) {
  return positive(width) && positive(length) ? width * length : null;
}

// Heron: uc kenar ucgen olusturmuyorsa null.
export function triangleArea(a: number, b: number, c: number) {
  if (![a, b, c].every(positive)) return null;
  if (a + b <= c || a + c <= b || b + c <= a) return null;
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Dortgen ABCD: AB=a, BC=b, CD=c, DA=d, kosegen AC=diagonal.
export function quadrilateralArea(a: number, b: number, c: number, d: number, diagonal: number) {
  const first = triangleArea(a, b, diagonal);
  const second = triangleArea(c, d, diagonal);
  return first === null || second === null ? null : first + second;
}

export function areaBreakdown(squareMeters: number) {
  return {
    m2: squareMeters,
    donum: squareMeters / DONUM_M2,
    eskiDonum: squareMeters / ESKI_DONUM_M2,
    ar: squareMeters / AR_M2,
    hektar: squareMeters / HEKTAR_M2,
  };
}
