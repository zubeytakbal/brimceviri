// Agirlik ve denge (weight and balance) hesaplama -- ucagin (veya
// herhangi bir aracin) her bir yuk kaleminin agirligini ve referans
// noktasina olan mesafesini (kol/arm) girerek toplam agirlik merkezini
// (CG) bulur. Formul: Moment = Agirlik x Kol, CG = Toplam Moment /
// Toplam Agirlik. Bu genel bir moment/agirlikli-ortalama hesabidir --
// aracin kendi bos agirlik/kol degerlerini ve guvenli CG araligini
// (envelope) kullanici kendi POH/AFM belgesinden girer, bu araç bunu
// varsaymaz.

export type WeightBalanceItem = {
  weight: number;
  arm: number;
};

export type WeightBalanceResult = {
  totalWeight: number;
  totalMoment: number;
  centerOfGravity: number;
};

export function calculateWeightBalance(
  items: WeightBalanceItem[]
): WeightBalanceResult | null {
  const validItems = items.filter(
    (item) =>
      Number.isFinite(item.weight) &&
      item.weight > 0 &&
      Number.isFinite(item.arm)
  );

  if (validItems.length === 0) {
    return null;
  }

  const totalWeight = validItems.reduce((sum, item) => sum + item.weight, 0);
  const totalMoment = validItems.reduce(
    (sum, item) => sum + item.weight * item.arm,
    0
  );

  return {
    totalWeight,
    totalMoment,
    centerOfGravity: totalMoment / totalWeight,
  };
}
