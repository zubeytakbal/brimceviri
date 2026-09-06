// Yan ruzgar bileseni (crosswind component) hesaplama -- ruzgar yonu
// ile pist/rota yonu arasindaki aciya gore ruzgarin yan ve
// bas/kuyruk bilesenlerini bulur. Standart trigonometrik navigasyon
// formulu: Yan Ruzgar = Ruzgar Hizi x sin(Ruzgar Yonu - Pist Yonu),
// Bas/Kuyruk Ruzgari = Ruzgar Hizi x cos(Ruzgar Yonu - Pist Yonu).

export type CrosswindInput = {
  windDirectionDeg: number;
  windSpeedKnot: number;
  runwayHeadingDeg: number;
};

export type CrosswindSide = "sag" | "sol" | "yok";
export type HeadwindType = "bas" | "kuyruk" | "yok";

export type CrosswindResult = {
  crosswindKnot: number;
  crosswindSide: CrosswindSide;
  headwindKnot: number;
  headwindType: HeadwindType;
};

function normalizeAngle(deg: number) {
  const normalized = deg % 360;

  return normalized < 0 ? normalized + 360 : normalized;
}

export function calculateCrosswind(
  input: CrosswindInput
): CrosswindResult | null {
  const { windDirectionDeg, windSpeedKnot, runwayHeadingDeg } = input;

  if (
    !Number.isFinite(windDirectionDeg) ||
    !Number.isFinite(windSpeedKnot) ||
    windSpeedKnot < 0 ||
    !Number.isFinite(runwayHeadingDeg)
  ) {
    return null;
  }

  const angleDiffDeg = normalizeAngle(windDirectionDeg - runwayHeadingDeg);
  const angleDiffRad = (angleDiffDeg * Math.PI) / 180;

  const crosswindRaw = windSpeedKnot * Math.sin(angleDiffRad);
  const headwindRaw = windSpeedKnot * Math.cos(angleDiffRad);

  const crosswindKnot = Math.abs(crosswindRaw);
  const headwindKnot = Math.abs(headwindRaw);

  let crosswindSide: CrosswindSide = "yok";
  if (crosswindRaw > 0.05) {
    crosswindSide = "sag";
  } else if (crosswindRaw < -0.05) {
    crosswindSide = "sol";
  }

  let headwindType: HeadwindType = "yok";
  if (headwindRaw > 0.05) {
    headwindType = "bas";
  } else if (headwindRaw < -0.05) {
    headwindType = "kuyruk";
  }

  return { crosswindKnot, crosswindSide, headwindKnot, headwindType };
}
