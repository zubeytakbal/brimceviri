// Yari omur (radyoaktif bozunma) hesaplama -- N = N0 x (1/2)^(t/t_yarim).

export type HalfLifeTarget = "kalan" | "baslangic" | "sure" | "yariOmur";

export type HalfLifeCalculationInput = {
  target: HalfLifeTarget;
  kalanMiktar: number;
  baslangicMiktar: number;
  gecenSureSaniye: number;
  yariOmurSaniye: number;
};

export type HalfLifeCalculationResult = {
  kalanMiktar: number;
  baslangicMiktar: number;
  gecenSureSaniye: number;
  yariOmurSaniye: number;
  gecenYariOmurSayisi: number;
  kalanYuzde: number;
};

function finalizeResult(
  kalanMiktar: number,
  baslangicMiktar: number,
  gecenSureSaniye: number,
  yariOmurSaniye: number
): HalfLifeCalculationResult {
  return {
    kalanMiktar,
    baslangicMiktar,
    gecenSureSaniye,
    yariOmurSaniye,
    gecenYariOmurSayisi: gecenSureSaniye / yariOmurSaniye,
    kalanYuzde: (kalanMiktar / baslangicMiktar) * 100,
  };
}

export function calculateHalfLife(
  input: HalfLifeCalculationInput
): HalfLifeCalculationResult | null {
  const { target, kalanMiktar, baslangicMiktar, gecenSureSaniye, yariOmurSaniye } =
    input;

  if (target === "kalan") {
    if (!Number.isFinite(baslangicMiktar) || baslangicMiktar <= 0) {
      return null;
    }

    if (!Number.isFinite(gecenSureSaniye) || gecenSureSaniye < 0) {
      return null;
    }

    if (!Number.isFinite(yariOmurSaniye) || yariOmurSaniye <= 0) {
      return null;
    }

    const remaining =
      baslangicMiktar * Math.pow(0.5, gecenSureSaniye / yariOmurSaniye);

    return finalizeResult(
      remaining,
      baslangicMiktar,
      gecenSureSaniye,
      yariOmurSaniye
    );
  }

  if (target === "baslangic") {
    if (!Number.isFinite(kalanMiktar) || kalanMiktar <= 0) {
      return null;
    }

    if (!Number.isFinite(gecenSureSaniye) || gecenSureSaniye < 0) {
      return null;
    }

    if (!Number.isFinite(yariOmurSaniye) || yariOmurSaniye <= 0) {
      return null;
    }

    const initial =
      kalanMiktar * Math.pow(2, gecenSureSaniye / yariOmurSaniye);

    return finalizeResult(
      kalanMiktar,
      initial,
      gecenSureSaniye,
      yariOmurSaniye
    );
  }

  if (target === "sure") {
    if (
      !Number.isFinite(kalanMiktar) ||
      kalanMiktar <= 0 ||
      !Number.isFinite(baslangicMiktar) ||
      baslangicMiktar <= 0 ||
      kalanMiktar > baslangicMiktar
    ) {
      return null;
    }

    if (!Number.isFinite(yariOmurSaniye) || yariOmurSaniye <= 0) {
      return null;
    }

    const elapsed =
      yariOmurSaniye * Math.log2(baslangicMiktar / kalanMiktar);

    return finalizeResult(
      kalanMiktar,
      baslangicMiktar,
      elapsed,
      yariOmurSaniye
    );
  }

  if (
    !Number.isFinite(kalanMiktar) ||
    kalanMiktar <= 0 ||
    !Number.isFinite(baslangicMiktar) ||
    baslangicMiktar <= 0 ||
    kalanMiktar > baslangicMiktar
  ) {
    return null;
  }

  if (!Number.isFinite(gecenSureSaniye) || gecenSureSaniye <= 0) {
    return null;
  }

  const halfLife =
    gecenSureSaniye / Math.log2(baslangicMiktar / kalanMiktar);

  return finalizeResult(
    kalanMiktar,
    baslangicMiktar,
    gecenSureSaniye,
    halfLife
  );
}
