export type PsuInput = {
  cpuWatt: number;
  gpuWatt: number;
  otherWatt: number;
  headroomPercent: number;
};

// Toplam bilesen gucune, gecici yuk sivrilmelerini, PSU verimlilik
// egrisini ve ileride yukseltme payini karsilamak icin bir guvenlik
// payi (genelde %20-30) eklenir.
export function calculatePsuWattage(input: PsuInput): number | null {
  const { cpuWatt, gpuWatt, otherWatt, headroomPercent } = input;

  if (!Number.isFinite(cpuWatt) || cpuWatt <= 0) {
    return null;
  }

  if (!Number.isFinite(gpuWatt) || gpuWatt < 0) {
    return null;
  }

  if (!Number.isFinite(otherWatt) || otherWatt < 0) {
    return null;
  }

  if (!Number.isFinite(headroomPercent) || headroomPercent < 0) {
    return null;
  }

  const totalWatt = cpuWatt + gpuWatt + otherWatt;

  return totalWatt * (1 + headroomPercent / 100);
}
