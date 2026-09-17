// Boru capi / debi / akis hizi hesaplama -- suredekilik (continuity)
// denklemine dayanan genel bir akiskanlar mekanigi hesabidir:
// Q = A * v, burada A = pi * D^2 / 4. Kullanici uc degerden ikisini
// girer, uculcusu hesaplanir. Bu formul basincli sivi/su hatlari
// icin gecerlidir; dogalgaz ic tesisati gibi basinc dususu ve gaz
// yogunlugu tablolarina bagli hesaplar TS 7363 gibi ayri
// standartlara tabidir ve bu araç bunu kapsamaz.

export type PipeFlowSolveFor = "diameter" | "flow" | "velocity";
export type FlowUnit = "lps" | "m3h" | "lpm" | "gpm" | "cfm";
export type PipeVelocityUnit = "ms" | "fps";
export type PipeDiameterUnit = "mm" | "in";

export type PipeFlowInput = {
  solveFor: PipeFlowSolveFor;
  flowValue: number;
  flowUnit: FlowUnit;
  velocityMs: number;
  diameterMm: number;
  velocityUnit?: PipeVelocityUnit;
  diameterUnit?: PipeDiameterUnit;
};

export type PipeFlowResult = {
  diameterMm: number;
  flowLps: number;
  flowM3h: number;
  flowGpm: number;
  flowCfm: number;
  velocityMs: number;
  velocityFps: number;
  diameterIn: number;
};

function flowToM3PerSecond(value: number, unit: FlowUnit): number {
  switch (unit) {
    case "lps":
      return value / 1000;
    case "lpm":
      return value / 1000 / 60;
    case "m3h":
      return value / 3600;
    case "gpm":
      return (value * 0.003785411784) / 60;
    case "cfm":
      return (value * 0.028316846592) / 60;
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
    flowGpm: (flowM3s * 60) / 0.003785411784,
    flowCfm: (flowM3s * 60) / 0.028316846592,
    velocityMs,
    velocityFps: velocityMs / 0.3048,
    diameterIn: diameterMm / 25.4,
  };
}

export function calculatePipeFlow(input: PipeFlowInput): PipeFlowResult | null {
  const {
    solveFor,
    flowValue,
    flowUnit,
    velocityMs: rawVelocity,
    diameterMm: rawDiameter,
    velocityUnit = "ms",
    diameterUnit = "mm",
  } = input;
  const velocityMs = velocityUnit === "fps" ? rawVelocity * 0.3048 : rawVelocity;
  const diameterMm = diameterUnit === "in" ? rawDiameter * 25.4 : rawDiameter;

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
