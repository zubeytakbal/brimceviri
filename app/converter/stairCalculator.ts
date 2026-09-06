export interface StairInput {
  totalHeightCm: number;
  desiredRiserCm: number;
  availableRunCm: number;
}

export interface StairResult {
  stepCount: number;
  riserCm: number;
  treadCm: number;
  totalRunCm: number;
  isRiserComfortable: boolean;
  isTreadComfortable: boolean;
  exceedsAvailableRun: boolean;
}

export type StairOutcome =
  | { success: true; result: StairResult }
  | { success: false; message: string };

// Blondel formulu: 2 x riht (riser) + basamak derinligi (tread) = 63 cm
// yaklasik olarak rahat/guvenli bir merdiven adimi verir (60-65 cm araligi
// mimarlikta kabul edilebilir kabul edilir).
const BLONDEL_CONSTANT_CM = 63;
const MIN_COMFORTABLE_RISER_CM = 16;
const MAX_COMFORTABLE_RISER_CM = 20;
const MIN_COMFORTABLE_TREAD_CM = 24;
const MAX_COMFORTABLE_TREAD_CM = 33;

export function calculateStairs(input: StairInput): StairOutcome {
  const { totalHeightCm, desiredRiserCm, availableRunCm } = input;

  if (!(totalHeightCm > 0)) {
    return { success: false, message: "Toplam yükseklik 0'dan büyük olmalı." };
  }
  if (!(desiredRiserCm > 0)) {
    return { success: false, message: "İstenen rıht yüksekliği 0'dan büyük olmalı." };
  }

  const stepCount = Math.max(1, Math.round(totalHeightCm / desiredRiserCm));
  const riserCm = totalHeightCm / stepCount;
  const treadCm = BLONDEL_CONSTANT_CM - 2 * riserCm;
  const treadCount = Math.max(0, stepCount - 1);
  const totalRunCm = treadCount * treadCm;

  const isRiserComfortable =
    riserCm >= MIN_COMFORTABLE_RISER_CM && riserCm <= MAX_COMFORTABLE_RISER_CM;
  const isTreadComfortable =
    treadCm >= MIN_COMFORTABLE_TREAD_CM && treadCm <= MAX_COMFORTABLE_TREAD_CM;
  const exceedsAvailableRun =
    Number.isFinite(availableRunCm) && availableRunCm > 0
      ? totalRunCm > availableRunCm
      : false;

  return {
    success: true,
    result: {
      stepCount,
      riserCm,
      treadCm,
      totalRunCm,
      isRiserComfortable,
      isTreadComfortable,
      exceedsAvailableRun,
    },
  };
}
