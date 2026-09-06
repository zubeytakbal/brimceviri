// Boru capi / debi / akis hizi hesaplama -- suredekilik (continuity)
// denklemine dayanan genel bir akiskanlar mekanigi hesabidir:
// Q = A * v, burada A = pi * D^2 / 4. Kullanici uc degerden ikisini
// girer, uculcusu hesaplanir. Bu formul basincli sivi/su hatlari
// icin gecerlidir; dogalgaz ic tesisati gibi basinc dususu ve gaz
// yogunlugu tablolarina bagli hesaplar TS 7363 gibi ayri
// standartlara tabidir ve bu araç bunu kapsamaz.

export type PipeFlowSolveFor = "diameter" | "flow" | "velocity";
export type FlowUnit = "lps" | "m3h" | "lpm";

export type PipeFlowInput = {
  solveFor: PipeFlowSolveFor;
  flowValue: number;
  flowUnit: FlowUnit;
  velocityMs: number;
  diameterMm: number;
};

export type PipeFlowResult = {
  diameterMm: number;
  flowLps: number;
  flowM3h: number;
  velocityMs: number;
};

function flowToM3PerSecond(value: number, unit: FlowUnit): number {
  switch (unit) {
    case "lps":
      return value / 1000;
    case "lpm":
      return value / 1000 / 60;
    case "m3h":
      return value / 3600;
    default:
      return Number.NaN;
  }
}

function buildResult(
  diameterMm: number,
  flowM3s: number,
  velocityMs: number
): PipeFlowResult {
  return {
    diameterMm,
    flowLps: flowM3s * 1000,
    flowM3h: flowM3s * 3600,
    velocityMs,
  };
}

export function calculatePipeFlow(input: PipeFlowInput): PipeFlowResult | null {
  const { solveFor, flowValue, flowUnit, velocityMs, diameterMm } = input;

  if (solveFor === "diameter") {
    const flowM3s = flowToM3PerSecond(flowValue, flowUnit);
    if (!(flowM3s > 0) || !(velocityMs > 0)) {
      return null;
    }
    const diameterM = Math.sqrt((4 * flowM3s) / (Math.PI * velocityMs));
    return buildResult(diameterM * 1000, flowM3s, velocityMs);
  }

  if (solveFor === "flow") {
    if (!(diameterMm > 0) || !(velocityMs > 0)) {
      return null;
    }
    const diameterM = diameterMm / 1000;
    const areaM2 = (Math.PI * diameterM * diameterM) / 4;
    const flowM3s = areaM2 * velocityMs;
    return buildResult(diameterMm, flowM3s, velocityMs);
  }

  if (solveFor === "velocity") {
    const flowM3s = flowToM3PerSecond(flowValue, flowUnit);
    if (!(flowM3s > 0) || !(diameterMm > 0)) {
      return null;
    }
    const diameterM = diameterMm / 1000;
    const areaM2 = (Math.PI * diameterM * diameterM) / 4;
    const velocity = flowM3s / areaM2;
    return buildResult(diameterMm, flowM3s, velocity);
  }

  return null;
}
