// Inis/alcalma orani (rate of descent / VVI) hesaplama -- yer hizi ve
// istenen inis acisindan, dakikadaki fit cinsinden gereken dusey hizi
// bulur. Tam trigonometrik formul kullanilir (yaygin "yer hizi x 5"
// kisayolunun 3 derece icin yaklasik karsiligidir, ama burada herhangi
// bir aci icin kesin sonuc verilir).

const NAUTICAL_MILE_IN_FEET = 6076.12;

export type DescentRateInput = {
  groundSpeedKnot: number;
  descentAngleDeg: number;
};

export type DescentRateResult = {
  descentGradientFtPerNm: number;
  rateOfDescentFtPerMin: number;
};

export function calculateDescentRate(
  input: DescentRateInput
): DescentRateResult | null {
  const { groundSpeedKnot, descentAngleDeg } = input;

  if (
    !Number.isFinite(groundSpeedKnot) ||
    groundSpeedKnot <= 0 ||
    !Number.isFinite(descentAngleDeg) ||
    descentAngleDeg <= 0 ||
    descentAngleDeg >= 90
  ) {
    return null;
  }

  const descentAngleRad = (descentAngleDeg * Math.PI) / 180;
  const descentGradientFtPerNm =
    Math.tan(descentAngleRad) * NAUTICAL_MILE_IN_FEET;
  const rateOfDescentFtPerMin =
    (groundSpeedKnot * descentGradientFtPerNm) / 60;

  return { descentGradientFtPerNm, rateOfDescentFtPerMin };
}
