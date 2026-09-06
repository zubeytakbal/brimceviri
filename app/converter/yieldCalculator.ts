// Yuzde verim hesaplama -- bir tepkimeden gercekte elde edilen urun
// miktarinin, stokiyometrik olarak hesaplanan teorik miktara oranini
// verir. % verim = (gercek verim / teorik verim) x 100.

export type YieldTarget = "yuzdeVerim" | "gercekVerim" | "teorikVerim";

export type YieldCalculationInput = {
  target: YieldTarget;
  yuzdeVerim: number;
  gercekVerim: number;
  teorikVerim: number;
};

export type YieldCalculationResult = {
  yuzdeVerim: number;
  gercekVerim: number;
  teorikVerim: number;
};

export function calculateYield(
  input: YieldCalculationInput
): YieldCalculationResult | null {
  const { target, yuzdeVerim, gercekVerim, teorikVerim } = input;

  if (target === "yuzdeVerim") {
    if (!Number.isFinite(gercekVerim) || gercekVerim < 0) {
      return null;
    }

    if (!Number.isFinite(teorikVerim) || teorikVerim <= 0) {
      return null;
    }

    return {
      yuzdeVerim: (gercekVerim / teorikVerim) * 100,
      gercekVerim,
      teorikVerim,
    };
  }

  if (target === "gercekVerim") {
    if (!Number.isFinite(yuzdeVerim) || yuzdeVerim < 0) {
      return null;
    }

    if (!Number.isFinite(teorikVerim) || teorikVerim < 0) {
      return null;
    }

    return {
      yuzdeVerim,
      gercekVerim: (yuzdeVerim * teorikVerim) / 100,
      teorikVerim,
    };
  }

  if (!Number.isFinite(yuzdeVerim) || yuzdeVerim <= 0) {
    return null;
  }

  if (!Number.isFinite(gercekVerim) || gercekVerim < 0) {
    return null;
  }

  return {
    yuzdeVerim,
    gercekVerim,
    teorikVerim: (gercekVerim * 100) / yuzdeVerim,
  };
}
