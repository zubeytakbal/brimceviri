// Hafriyat/kazi hesaplama -- temel veya bodrum kazisinin yerinde (bank)
// hacmini, gevseme/sisme payi eklenmis gevsek hacmini ve gereken kamyon
// yuku sayisini hesaplar. Kazilan toprak, dogal yapisindan cikarilinca
// hacimce genisler (gevseme/sisme payi); bu yuzden tasima planlamasi
// yerinde hacim yerine gevsek hacme gore yapilmalidir.

export type ExcavationInput = {
  length: number;
  width: number;
  depth: number;
  swellPercent: number;
  truckCapacityM3: number;
};

export type ExcavationResult = {
  bankVolumeM3: number;
  looseVolumeM3: number;
  truckLoadCount: number;
};

export function calculateExcavation(
  input: ExcavationInput
): ExcavationResult | null {
  const { length, width, depth, swellPercent, truckCapacityM3 } = input;

  const dimensionsValid = [length, width, depth].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const swellValid = Number.isFinite(swellPercent) && swellPercent >= 0;
  const truckValid =
    Number.isFinite(truckCapacityM3) && truckCapacityM3 > 0;

  if (!dimensionsValid || !swellValid || !truckValid) {
    return null;
  }

  const bankVolumeM3 = length * width * depth;
  const looseVolumeM3 = bankVolumeM3 * (1 + swellPercent / 100);
  const truckLoadCount = Math.ceil(looseVolumeM3 / truckCapacityM3);

  return { bankVolumeM3, looseVolumeM3, truckLoadCount };
}

// Kullanıcı zaten tasinacak (gevsek) hacmi biliyorsa -- ör. hafriyatçının
// verdigi "150 m3" rakami -- olcu girmeden dogrudan kamyon sayisina gitmek
// icin. "150 m3 toprak kac kamyon eder" gibi aramalar dogrudan hacim/ton
// bilgisiyle gelir, uzunluk/genislik/derinlik ile degil.
export type DirectVolumeTruckInput = {
  looseVolumeM3: number;
  truckCapacityM3: number;
};

export function calculateTruckCountFromVolume(
  input: DirectVolumeTruckInput
): number | null {
  const { looseVolumeM3, truckCapacityM3 } = input;

  if (
    !Number.isFinite(looseVolumeM3) ||
    !Number.isFinite(truckCapacityM3) ||
    looseVolumeM3 <= 0 ||
    truckCapacityM3 <= 0
  ) {
    return null;
  }

  return Math.ceil(looseVolumeM3 / truckCapacityM3);
}
