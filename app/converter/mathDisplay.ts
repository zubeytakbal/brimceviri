import type { SolutionInterval } from "./logEquationSolver";

export function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export function formatIntervalDisplay(interval: SolutionInterval, varName: string) {
  const open = interval.start === null ? "(" : interval.startIncluded ? "[" : "(";
  const close = interval.end === null ? ")" : interval.endIncluded ? "]" : ")";
  const start = interval.start === null ? "-∞" : formatNumber(interval.start);
  const end = interval.end === null ? "∞" : formatNumber(interval.end);
  return `${varName} ∈ ${open}${start}, ${end}${close}`;
}
