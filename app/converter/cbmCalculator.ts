// CBM (metrekup/hacim) ve hacimsel agirlik hesaplama -- nakliye ve
// lojistik sektorunde koli/palet olculerinden toplam hacmi ve
// "ucrete esas agirligi" (gercek agirlik ile hacimsel agirligin
// buyugu) bulmak icin kullanilir. Hacimsel agirlik katsayisi tasima
// moduna (deniz/kara/hava) ve tasiyiciya gore degisir; bu yuzden
// standart katsayilar varsayilan olarak sunulur, kullanici isterse
// kendi tasiyicisinin katsayisini da girebilir.

export type FreightMode = "deniz" | "kara" | "hava" | "ozel";

export type CbmPackageInput = {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  quantity: number;
  actualWeightKg: number;
};

export type CbmResult = {
  totalCbm: number;
  totalActualWeight: number;
  totalVolumetricWeight: number;
  chargeableWeight: number;
};

export const freightModeDivisors: Record<Exclude<FreightMode, "ozel">, number> = {
  deniz: 1000,
  kara: 3000,
  hava: 6000,
};

export function calculateCbm(
  packages: CbmPackageInput[],
  mode: FreightMode,
  customDivisor: number
): CbmResult | null {
  const validPackages = packages.filter(
    (item) =>
      Number.isFinite(item.lengthCm) &&
      item.lengthCm > 0 &&
      Number.isFinite(item.widthCm) &&
      item.widthCm > 0 &&
      Number.isFinite(item.heightCm) &&
      item.heightCm > 0 &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0
  );

  if (validPackages.length === 0) {
    return null;
  }

  const divisor = mode === "ozel" ? customDivisor : freightModeDivisors[mode];

  if (!Number.isFinite(divisor) || divisor <= 0) {
    return null;
  }

  let totalCbm = 0;
  let totalActualWeight = 0;
  let totalVolumetricWeight = 0;

  for (const item of validPackages) {
    const unitVolumeCm3 = item.lengthCm * item.widthCm * item.heightCm;
    totalCbm += (unitVolumeCm3 / 1_000_000) * item.quantity;
    totalVolumetricWeight += (unitVolumeCm3 / divisor) * item.quantity;

    if (Number.isFinite(item.actualWeightKg) && item.actualWeightKg > 0) {
      totalActualWeight += item.actualWeightKg * item.quantity;
    }
  }

  return {
    totalCbm,
    totalActualWeight,
    totalVolumetricWeight,
    chargeableWeight: Math.max(totalActualWeight, totalVolumetricWeight),
  };
}
