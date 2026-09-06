import type { LogEquationStep } from "./logEquationSolver";
import { formatNumber } from "./mathDisplay";

export interface LinearEquationResult {
  x: number;
  steps: LogEquationStep[];
}

export type LinearEquationOutcome =
  | { success: true; result: LinearEquationResult }
  | { success: false; message: string };

/** ax + b = c kalıbını çözer. */
export function solveLinearEquation(a: number, b: number, c: number): LinearEquationOutcome {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    return { success: false, message: "Geçerli sayılar gir." };
  }
  if (a === 0) {
    return {
      success: false,
      message: "a katsayısı 0 olamaz (a=0 olursa denklem doğrusal olmaktan çıkar).",
    };
  }

  const difference = c - b;
  const x = difference / a;

  return {
    success: true,
    result: {
      x,
      steps: [
        {
          title: "1. Adım — b'yi karşı tarafa geçir",
          lines: [
            `${formatNumber(a)}x + ${formatNumber(b)} = ${formatNumber(c)}`,
            `${formatNumber(a)}x = ${formatNumber(c)} − ${formatNumber(b)} = ${formatNumber(difference)}`,
          ],
        },
        {
          title: "2. Adım — a'ya böl",
          lines: [`x = ${formatNumber(difference)} / ${formatNumber(a)} = ${formatNumber(x)}`],
        },
      ],
    },
  };
}

export type QuadraticRootKind = "iki-farkli" | "cift-kok" | "reel-yok";

export interface QuadraticEquationResult {
  delta: number;
  rootKind: QuadraticRootKind;
  roots: number[];
  complexRoots: { realPart: number; imagPart: number } | null;
  steps: LogEquationStep[];
}

export type QuadraticEquationOutcome =
  | { success: true; result: QuadraticEquationResult }
  | { success: false; message: string };

/** ax² + bx + c = 0 kalıbını delta (diskriminant) analiziyle çözer. */
export function solveQuadraticEquation(a: number, b: number, c: number): QuadraticEquationOutcome {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    return { success: false, message: "Geçerli sayılar gir." };
  }
  if (a === 0) {
    return {
      success: false,
      message:
        "a katsayısı 0 olamaz (a=0 olursa denklem ikinci dereceden olmaktan çıkar — Doğrusal kalıbını kullan).",
    };
  }

  const delta = b * b - 4 * a * c;
  const deltaStep: LogEquationStep = {
    title: "1. Adım — Diskriminantı (Δ) hesapla",
    lines: [
      `Δ = b² − 4ac = (${formatNumber(b)})² − 4×${formatNumber(a)}×${formatNumber(c)}`,
      `Δ = ${formatNumber(b * b)} − ${formatNumber(4 * a * c)} = ${formatNumber(delta)}`,
    ],
  };

  if (delta > 0) {
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);
    const roots = [x1, x2].sort((p, q) => p - q);
    return {
      success: true,
      result: {
        delta,
        rootKind: "iki-farkli",
        roots,
        complexRoots: null,
        steps: [
          deltaStep,
          {
            title: "2. Adım — Δ > 0 ⟹ iki farklı gerçek kök var",
            lines: [
              `x = (−b ± √Δ) / 2a = (${formatNumber(-b)} ± √${formatNumber(delta)}) / (2×${formatNumber(a)})`,
              `x₁ = ${formatNumber(roots[0])}, x₂ = ${formatNumber(roots[1])}`,
            ],
          },
        ],
      },
    };
  }

  if (delta === 0) {
    const x = -b / (2 * a);
    return {
      success: true,
      result: {
        delta,
        rootKind: "cift-kok",
        roots: [x],
        complexRoots: null,
        steps: [
          deltaStep,
          {
            title: "2. Adım — Δ = 0 ⟹ tek (çift) gerçek kök var",
            lines: [`x = −b / 2a = ${formatNumber(-b)} / (2×${formatNumber(a)}) = ${formatNumber(x)}`],
          },
        ],
      },
    };
  }

  const realPart = -b / (2 * a) || 0;
  const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));
  return {
    success: true,
    result: {
      delta,
      rootKind: "reel-yok",
      roots: [],
      complexRoots: { realPart, imagPart },
      steps: [
        deltaStep,
        {
          title: "2. Adım — Δ < 0 ⟹ gerçek kök yok",
          lines: [
            "Negatif diskriminantın karekökü gerçek sayılarda tanımsız olduğundan, bu denklemin gerçek sayılarda kökü yoktur.",
            `Bilgi amaçlı, karmaşık kökler: x = ${formatNumber(realPart)} ± ${formatNumber(imagPart)}i`,
          ],
        },
      ],
    },
  };
}
