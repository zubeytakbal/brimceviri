import { create, all } from "mathjs";
import type { MathNode } from "mathjs";

// A dedicated instance (rather than the package's shared default) so that
// d()/integral()/lim() can be registered as real, evaluable functions on
// it — this lets them compose with ordinary arithmetic in mathjs's own
// evaluator (e.g. "integral(x,x,0,5) + log(40,10)"), instead of only ever
// working as the entire input. Registration happens further down, right
// after these 3 functions are defined.
const mathInstance = create(all);
const parse = mathInstance.parse;
const derivative = mathInstance.derivative;

export interface LogEquationStep {
  title: string;
  lines: string[];
}

export interface LogEquationSolveResult {
  roots: number[];
  excludedRoots: number[];
  base: number;
  steps: LogEquationStep[];
  numeric: boolean;
  isEvaluation: boolean;
  varName: string;
}

export type LogEquationSolveOutcome =
  | { success: true; result: LogEquationSolveResult }
  | { success: false; message: string };

export type InequalityOperator = "<" | ">" | "<=" | ">=";

export interface SolutionInterval {
  /** null means unbounded (-Infinity or +Infinity) */
  start: number | null;
  end: number | null;
  startIncluded: boolean;
  endIncluded: boolean;
}

export interface LogInequalitySolveResult {
  intervals: SolutionInterval[];
  varName: string;
  steps: LogEquationStep[];
}

export type LogInequalitySolveOutcome =
  | { success: true; result: LogInequalitySolveResult }
  | { success: false; message: string };

/** Polynomial coefficients in ascending degree order: [c0, c1, c2, ...] represents c0 + c1*x + c2*x^2 + ... */
export type Polynomial = number[];

export interface LogTermMatch {
  coefficient: number;
  base: number;
  argument: Polynomial;
}

export interface DecomposedSide {
  terms: LogTermMatch[];
  constant: number;
}

const MAX_ARGUMENT_DEGREE = 8;
const MAX_COMBINED_DEGREE = 12;

function evaluateConstant(node: MathNode): number | null {
  try {
    const value = node.evaluate();
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function containsSymbol(node: MathNode, name: string): boolean {
  let found = false;
  node.traverse((current) => {
    if (
      current.type === "SymbolNode" &&
      (current as unknown as { name: string }).name === name
    ) {
      found = true;
    }
  });
  return found;
}

const KNOWN_CONSTANT_SYMBOL_NAMES = new Set(["pi", "e", "tau", "phi", "i", "Infinity", "NaN"]);
const PREFERRED_VARIABLE_ORDER = ["x", "y", "t", "a", "n", "z"];

/** Auto-detects the single unknown letter in an equation (defaults to "x" if
 * none found or if "x" itself is present) — lets a user write "y" or "t" as
 * their unknown instead of always having to use "x". */
function detectVariableName(leftNode: MathNode, rightNode: MathNode): string {
  const found = new Set<string>();
  const collect = (node: MathNode) => {
    node.traverse((current) => {
      if (current.type === "SymbolNode") {
        const name = (current as unknown as { name: string }).name;
        if (name.length === 1 && /[a-zA-Z]/.test(name) && !KNOWN_CONSTANT_SYMBOL_NAMES.has(name)) {
          found.add(name);
        }
      }
    });
  };
  collect(leftNode);
  collect(rightNode);

  for (const candidate of PREFERRED_VARIABLE_ORDER) {
    if (found.has(candidate)) {
      return candidate;
    }
  }

  if (found.size > 0) {
    return [...found][0];
  }

  return "x";
}

function unwrapParenthesis(node: MathNode): MathNode {
  if (node.type === "ParenthesisNode") {
    return unwrapParenthesis((node as unknown as { content: MathNode }).content);
  }
  return node;
}

function trimPoly(p: Polynomial): Polynomial {
  const trimmed = [...p];
  while (trimmed.length > 1 && trimmed[trimmed.length - 1] === 0) {
    trimmed.pop();
  }
  return trimmed;
}

function constPoly(value: number): Polynomial {
  return [value];
}

function degreeOf(p: Polynomial): number {
  const trimmed = trimPoly(p);
  return trimmed.length - 1;
}

function addPoly(a: Polynomial, b: Polynomial): Polynomial {
  const length = Math.max(a.length, b.length);
  const result: Polynomial = [];
  for (let i = 0; i < length; i += 1) {
    result.push((a[i] ?? 0) + (b[i] ?? 0));
  }
  return trimPoly(result);
}

function subPoly(a: Polynomial, b: Polynomial): Polynomial {
  const length = Math.max(a.length, b.length);
  const result: Polynomial = [];
  for (let i = 0; i < length; i += 1) {
    result.push((a[i] ?? 0) - (b[i] ?? 0));
  }
  return trimPoly(result);
}

function scalePoly(a: Polynomial, k: number): Polynomial {
  return trimPoly(a.map((c) => c * k));
}

function multiplyPoly(a: Polynomial, b: Polynomial): Polynomial | null {
  const resultDegree = degreeOf(a) + degreeOf(b);
  if (resultDegree > MAX_COMBINED_DEGREE) {
    return null;
  }
  const result: number[] = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b.length; j += 1) {
      result[i + j] += a[i] * b[j];
    }
  }
  return trimPoly(result);
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return Number(value.toFixed(6)).toString();
}

function evaluatePoly(p: Polynomial, x: number): number {
  let result = 0;
  let power = 1;
  for (let i = 0; i < p.length; i += 1) {
    result += p[i] * power;
    power *= x;
  }
  return result;
}

function derivativePoly(p: Polynomial): Polynomial {
  if (p.length <= 1) {
    return [0];
  }
  const result: number[] = [];
  for (let i = 1; i < p.length; i += 1) {
    result.push(p[i] * i);
  }
  return trimPoly(result);
}

function formatPolynomial(p: Polynomial, varName: string): string {
  const trimmed = trimPoly(p);
  const parts: string[] = [];

  for (let degree = trimmed.length - 1; degree >= 0; degree -= 1) {
    const coeff = trimmed[degree];
    if (coeff === 0) {
      continue;
    }

    let term: string;
    if (degree === 0) {
      term = `${Math.abs(coeff)}`;
    } else {
      const coeffLabel = Math.abs(coeff) === 1 ? "" : `${Math.abs(coeff)}`;
      const varLabel = degree === 1 ? varName : `${varName}^${degree}`;
      term = `${coeffLabel}${varLabel}`;
    }

    if (parts.length === 0) {
      parts.push(coeff < 0 ? `-${term}` : term);
    } else {
      parts.push(coeff < 0 ? ` - ${term}` : ` + ${term}`);
    }
  }

  return parts.length > 0 ? parts.join("") : "0";
}

function extractPolynomial(rawNode: MathNode, varName: string): Polynomial | null {
  const node = unwrapParenthesis(rawNode);

  if (!containsSymbol(node, varName)) {
    const value = evaluateConstant(node);
    return value !== null ? constPoly(value) : null;
  }

  if (node.type === "SymbolNode") {
    return [0, 1];
  }

  if (node.type === "OperatorNode") {
    const opNode = node as unknown as { fn: string; args: MathNode[] };
    const { fn, args } = opNode;

    if (fn === "add") {
      const left = extractPolynomial(args[0], varName);
      const right = extractPolynomial(args[1], varName);
      return left && right ? addPoly(left, right) : null;
    }

    if (fn === "subtract") {
      const left = extractPolynomial(args[0], varName);
      const right = extractPolynomial(args[1], varName);
      return left && right ? subPoly(left, right) : null;
    }

    if (fn === "multiply") {
      const left = extractPolynomial(args[0], varName);
      const right = extractPolynomial(args[1], varName);
      return left && right ? multiplyPoly(left, right) : null;
    }

    if (fn === "divide") {
      const denomValue = evaluateConstant(args[1]);
      if (denomValue === null || denomValue === 0) {
        return null;
      }
      const numerator = extractPolynomial(args[0], varName);
      return numerator ? scalePoly(numerator, 1 / denomValue) : null;
    }

    if (fn === "unaryMinus") {
      const inner = extractPolynomial(args[0], varName);
      return inner ? scalePoly(inner, -1) : null;
    }

    if (fn === "pow") {
      const base = extractPolynomial(args[0], varName);
      const exponentValue = evaluateConstant(args[1]);
      if (
        !base ||
        exponentValue === null ||
        !Number.isInteger(exponentValue) ||
        exponentValue < 0 ||
        exponentValue > MAX_ARGUMENT_DEGREE
      ) {
        return null;
      }
      let result: Polynomial = constPoly(1);
      for (let i = 0; i < exponentValue; i += 1) {
        const next = multiplyPoly(result, base);
        if (!next) {
          return null;
        }
        result = next;
      }
      return result;
    }
  }

  return null;
}

function matchLogTerm(rawNode: MathNode, varName: string): LogTermMatch | null {
  const node = unwrapParenthesis(rawNode);

  if (node.type === "FunctionNode") {
    const fnNode = node as unknown as { fn: { name: string }; args: MathNode[] };
    if (fnNode.fn.name === "log" || fnNode.fn.name === "ln") {
      const argument = extractPolynomial(fnNode.args[0], varName);
      if (!argument) {
        return null;
      }

      let base = Math.E;
      if (fnNode.fn.name === "log" && fnNode.args.length === 2) {
        const baseValue = evaluateConstant(fnNode.args[1]);
        if (baseValue === null) {
          return null;
        }
        base = baseValue;
      }

      return { coefficient: 1, base, argument };
    }
    return null;
  }

  if (node.type === "OperatorNode") {
    const opNode = node as unknown as { fn: string; args: MathNode[] };

    if (opNode.fn === "multiply") {
      const [left, right] = opNode.args;

      const leftConst = evaluateConstant(left);
      if (leftConst !== null) {
        const inner = matchLogTerm(right, varName);
        if (inner) {
          return { ...inner, coefficient: inner.coefficient * leftConst };
        }
      }

      const rightConst = evaluateConstant(right);
      if (rightConst !== null) {
        const inner = matchLogTerm(left, varName);
        if (inner) {
          return { ...inner, coefficient: inner.coefficient * rightConst };
        }
      }

      return null;
    }

    if (opNode.fn === "divide") {
      const [left, right] = opNode.args;
      const rightConst = evaluateConstant(right);
      if (rightConst !== null && rightConst !== 0) {
        const inner = matchLogTerm(left, varName);
        if (inner) {
          return { ...inner, coefficient: inner.coefficient / rightConst };
        }
      }
      return null;
    }

    if (opNode.fn === "unaryMinus") {
      const inner = matchLogTerm(opNode.args[0], varName);
      return inner ? { ...inner, coefficient: -inner.coefficient } : null;
    }
  }

  return null;
}

function decomposeSide(rawNode: MathNode, varName: string): DecomposedSide | null {
  const node = unwrapParenthesis(rawNode);

  const asLogTerm = matchLogTerm(node, varName);
  if (asLogTerm) {
    return { terms: [asLogTerm], constant: 0 };
  }

  if (!containsSymbol(node, varName)) {
    const value = evaluateConstant(node);
    if (value !== null) {
      return { terms: [], constant: value };
    }
  }

  if (node.type === "OperatorNode") {
    const opNode = node as unknown as { fn: string; args: MathNode[] };
    if (opNode.fn === "add" || opNode.fn === "subtract") {
      const left = decomposeSide(opNode.args[0], varName);
      const right = decomposeSide(opNode.args[1], varName);
      if (left && right) {
        const sign = opNode.fn === "add" ? 1 : -1;
        return {
          terms: [
            ...left.terms,
            ...right.terms.map((term) => ({ ...term, coefficient: term.coefficient * sign })),
          ],
          constant: left.constant + sign * right.constant,
        };
      }
    }
  }

  return null;
}

function polyEquals(a: Polynomial, b: Polynomial): boolean {
  const ta = trimPoly(a);
  const tb = trimPoly(b);
  if (ta.length !== tb.length) {
    return false;
  }
  return ta.every((value, index) => Math.abs(value - tb[index]) < 1e-9);
}

/** Combines terms that share the exact same argument (e.g. after base normalization produces two log(x,...) terms) by summing their coefficients — lets fractional coefficients from change-of-base cancel back into a single clean term. */
function mergeSameArgumentTerms(terms: LogTermMatch[]): LogTermMatch[] {
  const merged: LogTermMatch[] = [];
  for (const term of terms) {
    const existing = merged.find((candidate) => polyEquals(candidate.argument, term.argument));
    if (existing) {
      existing.coefficient += term.coefficient;
    } else {
      merged.push({ ...term });
    }
  }
  return merged.filter((term) => Math.abs(term.coefficient) > 1e-9);
}

const NATURAL_LOG_TOLERANCE = 1e-9;

function isNaturalBase(base: number) {
  return Math.abs(base - Math.E) < NATURAL_LOG_TOLERANCE;
}

function formatLogLabel(argExpr: string, base: number) {
  return isNaturalBase(base) ? `ln(${argExpr})` : `log_${base}(${argExpr})`;
}

function formatBaseLabel(base: number) {
  return isNaturalBase(base) ? "e" : `${base}`;
}

function solvePolynomialClosedForm(p: Polynomial): number[] | null {
  const trimmed = trimPoly(p);
  const degree = trimmed.length - 1;

  if (degree === 0) {
    return [];
  }

  if (degree === 1) {
    return [-trimmed[0] / trimmed[1]];
  }

  if (degree === 2) {
    const [c, b, a] = trimmed;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return [];
    }
    if (discriminant === 0) {
      return [-b / (2 * a)];
    }
    const sqrtD = Math.sqrt(discriminant);
    return [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)];
  }

  return null;
}

const NUMERIC_SCAN_MIN = -2000;
const NUMERIC_SCAN_MAX = 2000;
const NUMERIC_SCAN_STEPS = 8000;
const NEWTON_ITERATIONS = 50;

function refineRootNewton(p: Polynomial, dp: Polynomial, guess: number): number {
  let x = guess;
  for (let i = 0; i < NEWTON_ITERATIONS; i += 1) {
    const derivativeValue = evaluatePoly(dp, x);
    if (Math.abs(derivativeValue) < 1e-14) {
      break;
    }
    const nextX = x - evaluatePoly(p, x) / derivativeValue;
    if (!Number.isFinite(nextX)) {
      break;
    }
    if (Math.abs(nextX - x) < 1e-12) {
      x = nextX;
      break;
    }
    x = nextX;
  }
  return x;
}

function solvePolynomialNumerically(p: Polynomial): number[] {
  const trimmed = trimPoly(p);
  if (trimmed.length <= 1) {
    return [];
  }

  const dp = derivativePoly(trimmed);
  const stepSize = (NUMERIC_SCAN_MAX - NUMERIC_SCAN_MIN) / NUMERIC_SCAN_STEPS;
  const roots: number[] = [];

  let previousX = NUMERIC_SCAN_MIN;
  let previousValue = evaluatePoly(trimmed, previousX);

  for (let i = 1; i <= NUMERIC_SCAN_STEPS; i += 1) {
    const currentX = NUMERIC_SCAN_MIN + i * stepSize;
    const currentValue = evaluatePoly(trimmed, currentX);

    if (currentValue === 0) {
      roots.push(currentX);
    } else if (previousValue !== 0 && Math.sign(previousValue) !== Math.sign(currentValue)) {
      const midpoint = refineRootNewton(trimmed, dp, (previousX + currentX) / 2);
      roots.push(midpoint);
    }

    previousX = currentX;
    previousValue = currentValue;
  }

  const uniqueRoots: number[] = [];
  for (const root of roots) {
    if (!uniqueRoots.some((existing) => Math.abs(existing - root) < 1e-6)) {
      uniqueRoots.push(root);
    }
  }

  return uniqueRoots;
}

function solvePolynomialEqualsZero(p: Polynomial): { roots: number[]; numeric: boolean } {
  const closedForm = solvePolynomialClosedForm(p);
  if (closedForm !== null) {
    return { roots: closedForm, numeric: false };
  }
  return { roots: solvePolynomialNumerically(p), numeric: true };
}

const SUBSCRIPT_DIGIT_MAP: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

function normalizeSubscriptDigits(text: string): string {
  return text.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (digit) => SUBSCRIPT_DIGIT_MAP[digit] ?? digit);
}

function normalizeLogBaseNotation(text: string): string {
  // Taban bir sayı olabileceği gibi (log_2), bilinmeyenin kendisi de olabilir
  // (log_x — tabanda x olan denklemler, gerçek bir müfredat sorusu tipi).
  const pattern = /log_?(\d+(?:\.\d+)?|[a-zA-Z])\s*\(/gi;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const base = match[1];
    const openParenIndex = match.index + match[0].length - 1;

    let depth = 0;
    let closeIndex = -1;
    for (let i = openParenIndex; i < text.length; i += 1) {
      if (text[i] === "(") {
        depth += 1;
      } else if (text[i] === ")") {
        depth -= 1;
        if (depth === 0) {
          closeIndex = i;
          break;
        }
      }
    }

    if (closeIndex === -1) {
      break;
    }

    result += text.slice(lastIndex, match.index);
    result += "log(";
    result += text.slice(openParenIndex + 1, closeIndex);
    result += `,${base})`;
    lastIndex = closeIndex + 1;
    pattern.lastIndex = closeIndex + 1;
  }

  result += text.slice(lastIndex);
  return result;
}

// mathjs parses bare "sin x" (no parens — standard textbook trig notation,
// also what MathLive's built-in "sin"/"cos"/... inline shortcuts produce when a
// user types the plain letters and then a variable with no parens) as an
// IMPLICIT MULTIPLICATION of two separate symbols "sin" and "x" — NOT as a
// function call — and throws when evaluated. Confirmed directly via
// `parse("sin x")` → OperatorNode "multiply" of SymbolNode("sin") and
// SymbolNode("x"), not a FunctionNode. Every one of these names must be
// explicitly wrapped in parens before reaching mathjs's parser.
// The log-base digit run is unbounded (not capped at 1-2 digits like an
// earlier version of this pattern) — a real, reported bug: "log_128(2)"
// (a 3-digit base) had its base truncated to "12" by a 2-digit cap, leaving
// the stray "8" misread as a separate bare argument, producing
// "log_12(8)(2)" i.e. log_12(8)*2 ≈ 1.67 instead of the correct log_128(2)
// = 1/7 ≈ 0.143. Confirmed via direct testing that unbounded digits stay
// safe here: this whole pattern only fires when NO "(" immediately follows
// (the escape hatch below returns already-parenthesized input unchanged),
// so a longer greedy base match never eats into a real argument.
const KNOWN_FUNCTION_NAMES =
  "sin|cos|tan|cot|sec|csc|asin|acos|atan|sinh|cosh|tanh|sqrt|exp|ln|log(?:_\\d+(?:\\.\\d+)?)?";

function normalizeImplicitFunctionCall(text: string): string {
  // The bare-argument capture accepts: digits optionally followed by a single
  // letter (e.g. "43", "2x"), or a single letter alone (e.g. "x"). If the
  // function name is immediately followed by "(" instead, this capture group
  // simply fails to match (none of "(" is a digit/letter) and the callback
  // returns the original text UNCHANGED — critical, since without this escape
  // hatch an always-replace regex corrupts already-correct "sin(x)" input.
  return text.replace(
    new RegExp(`\\b(${KNOWN_FUNCTION_NAMES})([ \\t]*)((?:[0-9]+(?:\\.[0-9]+)?[a-zA-Z]?)|[a-zA-Z])?`, "gi"),
    (fullMatch: string, keyword: string, _spacing: string, argument: string | undefined) =>
      argument ? `${keyword}(${argument})` : fullMatch
  );
}

function normalizeLnFunction(text: string): string {
  return text.replace(/\bln\(/gi, "log(");
}

function normalizeInequalitySymbols(text: string): string {
  return text.replace(/≤/g, "<=").replace(/≥/g, ">=");
}

function normalizeEquationText(text: string): string {
  return normalizeLnFunction(
    normalizeLogBaseNotation(
      normalizeImplicitFunctionCall(normalizeSubscriptDigits(normalizeInequalitySymbols(text)))
    )
  );
}

function evaluatePlainExpression(
  rawText: string,
  varName: string
): LogEquationSolveOutcome | null {
  let node: MathNode;
  try {
    node = parse(rawText.trim());
  } catch {
    return null;
  }

  // No containsSymbol(node, varName) pre-check here (deliberately removed) —
  // it used to reject anything syntactically containing the letter "x"
  // before even trying to evaluate, which wrongly rejected expressions like
  // "integral(x,x,4,2)+log(40,10)" where "x" is entirely a BOUND variable
  // inside the integral, not a free unknown. evaluateConstant's own
  // no-scope evaluate() already fails cleanly (mathjs throws "Undefined
  // symbol x") for a genuinely free variable, so it's a strictly more
  // accurate check on its own — no separate pre-check needed.
  const value = evaluateConstant(node);
  if (value === null) {
    return null;
  }

  let displayLabel = rawText.trim();
  const unwrapped = unwrapParenthesis(node);
  if (unwrapped.type === "FunctionNode") {
    const fnNode = unwrapped as unknown as { fn: { name: string }; args: MathNode[] };
    if (fnNode.fn.name === "log" || fnNode.fn.name === "ln") {
      const argValue = evaluateConstant(fnNode.args[0]);
      let base = Math.E;
      if (fnNode.fn.name === "log" && fnNode.args.length === 2) {
        const baseValue = evaluateConstant(fnNode.args[1]);
        if (baseValue !== null) {
          base = baseValue;
        }
      }
      if (argValue !== null) {
        displayLabel = formatLogLabel(`${argValue}`, base);
      }
    }
  }

  return {
    success: true,
    result: {
      roots: [value],
      excludedRoots: [],
      base: Number.NaN,
      steps: [
        {
          title: "1. Adım — Değeri hesapla",
          lines: [`${displayLabel} = ${value}`],
        },
      ],
      numeric: false,
      isEvaluation: true,
      varName,
    },
  };
}

function evaluateNodeAt(node: MathNode, varName: string, x: number): number | null {
  try {
    const value = node.evaluate({ [varName]: x });
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

const GENERAL_SCAN_RANGES: Array<{ min: number; max: number; steps: number }> = [
  { min: -200, max: 200, steps: 20000 },
  { min: -100000, max: 100000, steps: 200000 },
];
const GENERAL_BISECTION_ITERATIONS = 60;
const MAX_DISPLAYED_ROOTS = 8;

function scanForRoots(
  evaluateDifference: (x: number) => number | null,
  min: number,
  max: number,
  steps: number
): number[] {
  const stepSize = (max - min) / steps;
  const roots: number[] = [];
  let previousX = min;
  let previousValue = evaluateDifference(previousX);

  for (let i = 1; i <= steps; i += 1) {
    const currentX = min + i * stepSize;
    const currentValue = evaluateDifference(currentX);

    if (previousValue !== null && currentValue !== null) {
      if (currentValue === 0) {
        roots.push(currentX);
      } else if (Math.sign(previousValue) !== Math.sign(currentValue)) {
        let lo = previousX;
        let hi = currentX;
        let loValue = previousValue;
        for (let iter = 0; iter < GENERAL_BISECTION_ITERATIONS; iter += 1) {
          const mid = (lo + hi) / 2;
          const midValue = evaluateDifference(mid);
          if (midValue === null) {
            break;
          }
          if (midValue === 0 || hi - lo < 1e-12) {
            lo = mid;
            hi = mid;
            break;
          }
          if (Math.sign(midValue) === Math.sign(loValue)) {
            lo = mid;
            loValue = midValue;
          } else {
            hi = mid;
          }
        }
        roots.push((lo + hi) / 2);
      }
    }

    previousX = currentX;
    previousValue = currentValue;
  }

  const uniqueRoots: number[] = [];
  for (const root of roots) {
    if (!uniqueRoots.some((existing) => Math.abs(existing - root) < 1e-6)) {
      uniqueRoots.push(root);
    }
  }
  return uniqueRoots;
}

function solveGeneralNumerically(
  leftNode: MathNode,
  rightNode: MathNode,
  varName: string
): LogEquationSolveOutcome {
  const evaluateDifference = (x: number): number | null => {
    const left = evaluateNodeAt(leftNode, varName, x);
    const right = evaluateNodeAt(rightNode, varName, x);
    return left === null || right === null ? null : left - right;
  };

  // Try a narrow, fast, precise range first (covers virtually every real
  // curriculum question); only fall back to a much wider — coarser — scan if
  // nothing was found nearby, so a genuinely far-away root isn't silently
  // missed just because the fast path didn't cover it.
  let uniqueRoots: number[] = [];
  let usedRange = GENERAL_SCAN_RANGES[0];
  for (const range of GENERAL_SCAN_RANGES) {
    uniqueRoots = scanForRoots(evaluateDifference, range.min, range.max, range.steps);
    usedRange = range;
    if (uniqueRoots.length > 0) {
      break;
    }
  }

  if (uniqueRoots.length === 0) {
    return {
      success: false,
      message: `Taranan aralıkta (${GENERAL_SCAN_RANGES[GENERAL_SCAN_RANGES.length - 1].min}, ${GENERAL_SCAN_RANGES[GENERAL_SCAN_RANGES.length - 1].max}) gerçek bir çözüm bulunamadı.`,
    };
  }

  uniqueRoots.sort((a, b) => Math.abs(a) - Math.abs(b));
  const truncated = uniqueRoots.length > MAX_DISPLAYED_ROOTS;
  const displayedRoots = uniqueRoots.slice(0, MAX_DISPLAYED_ROOTS);

  return {
    success: true,
    result: {
      roots: displayedRoots,
      excludedRoots: [],
      base: Number.NaN,
      steps: [
        {
          title: "1. Adım — Sayısal kök bulma",
          lines: [
            "Bu denklem tanınan bir kalıba uymadığı için sayısal yöntemle (Newton-Raphson) çözüldü.",
            ...displayedRoots.map((root) => `${varName} ≈ ${root}`),
            ...(truncated
              ? [
                  `(Taranan (${usedRange.min}, ${usedRange.max}) aralığında ${uniqueRoots.length} çözüm bulundu — muhtemelen periyodik bir denklem, en küçük mutlak değerli ${MAX_DISPLAYED_ROOTS} tanesi gösteriliyor.)`,
                ]
              : []),
          ],
        },
      ],
      numeric: true,
      isEvaluation: false,
      varName,
    },
  };
}

function formatIntervalEndpoint(value: number | null, unbounded: string): string {
  return value === null ? unbounded : formatNumber(value);
}

function formatInterval(interval: SolutionInterval, varName: string): string {
  const openBracket = interval.start === null ? "(" : interval.startIncluded ? "[" : "(";
  const closeBracket = interval.end === null ? ")" : interval.endIncluded ? "]" : ")";
  const startStr = formatIntervalEndpoint(interval.start, "-∞");
  const endStr = formatIntervalEndpoint(interval.end, "∞");
  return `${varName} ∈ ${openBracket}${startStr}, ${endStr}${closeBracket}`;
}

/** Solves an inequality (LHS <op> RHS) via numerical sign-analysis — the same
 * "işaret tablosu" (sign table) method taught in the Turkish curriculum: find
 * every root and every domain-boundary point (where the expression becomes
 * undefined, e.g. a log argument turning non-positive), sort them, test the
 * sign in each resulting interval, and report which intervals satisfy the
 * inequality. Domain-boundary points are NEVER included in the solution
 * (function undefined there) regardless of strict/non-strict operator; root
 * points are included only for the non-strict operators (<=, >=). */
function solveInequality(
  leftNode: MathNode,
  rightNode: MathNode,
  operator: InequalityOperator,
  varName: string
): LogInequalitySolveOutcome {
  const evaluateDifference = (x: number): number | null => {
    const left = evaluateNodeAt(leftNode, varName, x);
    const right = evaluateNodeAt(rightNode, varName, x);
    return left === null || right === null ? null : left - right;
  };

  const { min, max, steps } = GENERAL_SCAN_RANGES[0];
  const stepSize = (max - min) / steps;

  type CriticalPoint = { x: number; isDomainBoundary: boolean };
  const criticalPoints: CriticalPoint[] = [];

  let previousX = min;
  let previousValue = evaluateDifference(previousX);

  for (let i = 1; i <= steps; i += 1) {
    const currentX = min + i * stepSize;
    const currentValue = evaluateDifference(currentX);
    const previousDefined = previousValue !== null;
    const currentDefined = currentValue !== null;

    if (previousDefined && currentDefined) {
      if (currentValue === 0) {
        criticalPoints.push({ x: currentX, isDomainBoundary: false });
      } else if (previousValue !== 0 && Math.sign(previousValue as number) !== Math.sign(currentValue as number)) {
        let lo = previousX;
        let hi = currentX;
        let loValue = previousValue as number;
        for (let iter = 0; iter < GENERAL_BISECTION_ITERATIONS; iter += 1) {
          const mid = (lo + hi) / 2;
          const midValue = evaluateDifference(mid);
          if (midValue === null) {
            break;
          }
          if (midValue === 0 || hi - lo < 1e-12) {
            lo = mid;
            hi = mid;
            break;
          }
          if (Math.sign(midValue) === Math.sign(loValue)) {
            lo = mid;
            loValue = midValue;
          } else {
            hi = mid;
          }
        }
        criticalPoints.push({ x: (lo + hi) / 2, isDomainBoundary: false });
      }
    } else if (previousDefined !== currentDefined) {
      let lo = previousX;
      let hi = currentX;
      for (let iter = 0; iter < GENERAL_BISECTION_ITERATIONS; iter += 1) {
        const mid = (lo + hi) / 2;
        const midDefined = evaluateDifference(mid) !== null;
        if (midDefined === previousDefined) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      criticalPoints.push({ x: (lo + hi) / 2, isDomainBoundary: true });
    }

    previousX = currentX;
    previousValue = currentValue;
  }

  criticalPoints.sort((a, b) => a.x - b.x);
  const dedupedPoints: CriticalPoint[] = [];
  for (const point of criticalPoints) {
    const last = dedupedPoints[dedupedPoints.length - 1];
    if (!last || Math.abs(last.x - point.x) > 1e-6) {
      dedupedPoints.push(point);
    } else if (point.isDomainBoundary) {
      last.isDomainBoundary = true;
    }
  }

  const boundaryXs = [min, ...dedupedPoints.map((p) => p.x), max];
  const satisfiesOperator = (value: number): boolean => {
    switch (operator) {
      case "<":
        return value < 0;
      case ">":
        return value > 0;
      case "<=":
        return value <= 0;
      case ">=":
        return value >= 0;
    }
  };

  const rawIntervals: SolutionInterval[] = [];
  for (let i = 0; i < boundaryXs.length - 1; i += 1) {
    const testX = (boundaryXs[i] + boundaryXs[i + 1]) / 2;
    const testValue = evaluateDifference(testX);
    if (testValue === null || !satisfiesOperator(testValue)) {
      continue;
    }

    const leftPoint = i === 0 ? null : dedupedPoints[i - 1];
    const rightPoint = i === boundaryXs.length - 2 ? null : dedupedPoints[i];
    const strict = operator === "<" || operator === ">";

    rawIntervals.push({
      start: i === 0 ? null : leftPoint!.x,
      end: i === boundaryXs.length - 2 ? null : rightPoint!.x,
      startIncluded: i === 0 ? false : !strict && !leftPoint!.isDomainBoundary,
      endIncluded: i === boundaryXs.length - 2 ? false : !strict && !rightPoint!.isDomainBoundary,
    });
  }

  // Merge adjacent intervals that touch at an included point (e.g. x<=2 and x>2
  // never merge since 2 belongs to only one side, but two intervals meeting at
  // a point excluded from both never need merging either — kept simple/explicit
  // rather than attempting interval-merging, since each interval already came
  // from a distinct sign-region test).

  if (rawIntervals.length === 0) {
    return {
      success: false,
      message: `Taranan aralıkta (${min}, ${max}) eşitsizliği sağlayan bir çözüm bulunamadı.`,
    };
  }

  const intervalLines = rawIntervals.map((interval) => formatInterval(interval, varName));

  return {
    success: true,
    result: {
      intervals: rawIntervals,
      varName,
      steps: [
        {
          title: "1. Adım — İşaret analizi",
          lines: [
            "Denklem f(x) = (sol taraf) - (sağ taraf) haline getirilip kökleri ve tanım kümesi sınırları bulundu, her aralıkta işaret test edildi.",
            ...intervalLines,
          ],
        },
      ],
    },
  };
}

const BARE_ARGUMENT_PATTERN = "[0-9]+(?:\\.[0-9]+)?|[a-zA-Z]";

export function convertLatexToPlainText(latex: string): string {
  let text = latex;

  // Türkçe ondalık virgülü: MathLive'da decimalSeparator="," ayarlandığında
  // "0,5" gibi bir girdi LaTeX'te "0{,}5" olarak saklanır — mathjs nokta
  // beklediği için burada gerçek bir ondalık noktaya çeviriyoruz.
  text = text.replace(/(\d)\s*\{,\}\s*(\d)/g, "$1.$2");

  // Mutlak değer: \left|...\right| -> abs(...). mathjs pipe sözdizimini (|x|)
  // desteklemiyor, sadece abs(x) fonksiyonunu destekliyor — doğrudan test edilip
  // doğrulandı. Genel \left/\right temizliğinden ÖNCE çalışmalı, yoksa "|...|"
  // olarak kalır ve ayrıştırma başarısız olur.
  text = text.replace(/\\left\|([\s\S]*?)\\right\|/g, "abs($1)");

  // Eşitsizlik işaretleri: LaTeX \leq/\geq/\le/\ge (ve Unicode ≤/≥) -> <=/>=.
  text = text.replace(/\\(leq|le)\b/g, "<=");
  text = text.replace(/\\(geq|ge)\b/g, ">=");
  text = text.replace(/≤/g, "<=");
  text = text.replace(/≥/g, ">=");

  text = text.replace(/\\left/g, "").replace(/\\right/g, "");
  text = text.replace(/\\cdot/g, "*").replace(/\\times/g, "*");

  // \log_{base} or \log_N immediately followed by a bare (unparenthesized) argument,
  // e.g. MathLive's "\log_{2}12" for "log base 2 of 12" — must wrap the argument in
  // parens WHILE the base is still unambiguously delimited by braces/single-digit,
  // otherwise a later digit-eating regex can't tell where the base ends and the
  // argument begins (this was a real, reported bug: "log_212" got parsed as one
  // undefined symbol instead of log base 2 of 12).
  text = text.replace(
    new RegExp(`\\\\log_\\{([^{}]+)\\}\\s*(${BARE_ARGUMENT_PATTERN})(?!\\w)`, "g"),
    "log_$1($2)"
  );
  text = text.replace(
    new RegExp(`\\\\log_([a-zA-Z0-9])\\s*(${BARE_ARGUMENT_PATTERN})(?!\\w)`, "g"),
    "log_$1($2)"
  );
  text = text.replace(
    new RegExp(`\\\\ln\\s*(${BARE_ARGUMENT_PATTERN})(?!\\w)`, "g"),
    "log($1)"
  );

  text = text.replace(/\\log_\{([^{}]+)\}/g, "log_$1");
  text = text.replace(/\\log_([a-zA-Z0-9])/g, "log_$1");
  text = text.replace(/\\ln/g, "ln");
  text = text.replace(/\\log(?!_)/g, "log");
  // Ekstra dış parantez şart: "(1)/(2)x" mathjs'te 1/(2x) olarak ayrıştırılır
  // (bölme, sonrasındaki örtük çarpımdan daha sıkı bağlanır) — "((1)/(2))x" ise
  // doğru şekilde (1/2)·x olarak ayrıştırılır. Doğrudan test edilip doğrulandı.
  text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "(($1)/($2))");
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)");
  text = text.replace(/\^\{([^{}]+)\}/g, (_, inner: string) => `^(${inner})`);

  // Inverse trig: LaTeX's \arcsin/\arccos/\arctan map to mathjs's asin/acos/atan
  // (mathjs has no "arcsin" etc. — confirmed directly, "Undefined function arcsin").
  text = text.replace(/\\arcsin/g, "asin");
  text = text.replace(/\\arccos/g, "acos");
  text = text.replace(/\\arctan/g, "atan");

  // Any other remaining LaTeX command (\sin, \cos, \tan, \pi, \exp, \sqrt without
  // braces, etc.) — strip only the backslash, keep the name, since mathjs uses the
  // same plain-English names for nearly all of these. Previously this deleted the
  // whole command (e.g. "\sin(x)=0.5" silently became "(x)=0.5", i.e. "x=0.5" — a
  // real, reported bug that produced a wrong answer without any error).
  text = text.replace(/\\([a-zA-Z]+)/g, "$1");
  text = text.replace(/[{}]/g, "");

  return text.trim();
}

export function solveLogEquationFromLatex(
  latex: string,
  explicitVarName?: string
): LogEquationSolveOutcome {
  const plainText = convertLatexToPlainText(latex);
  if (!plainText) {
    return { success: false, message: "Denklem alanı boş." };
  }
  return solveLogEquation(plainText, explicitVarName);
}

export function solveLogEquation(
  rawEquationText: string,
  explicitVarName?: string
): LogEquationSolveOutcome {
  const equationText = normalizeEquationText(rawEquationText);

  if (!equationText.includes("=")) {
    const evaluated = evaluatePlainExpression(equationText, explicitVarName ?? "x");
    if (evaluated) {
      return evaluated;
    }
    return {
      success: false,
      message:
        "Bir '=' işareti içeren bir denklem yaz, veya bilinmeyen içermeyen düz bir ifade yaz (örn. log(43)).",
    };
  }

  const parts = equationText.split("=");
  if (parts.length !== 2) {
    return { success: false, message: "Denklem tam olarak bir '=' işareti içermeli." };
  }

  let leftNode: MathNode;
  let rightNode: MathNode;
  try {
    leftNode = parse(parts[0].trim());
    rightNode = parse(parts[1].trim());
  } catch {
    return {
      success: false,
      message: "Denklem ayrıştırılamadı — yazım şeklini kontrol et (örn. log(2*x+1,3)=4).",
    };
  }

  // Bilinmeyen otomatik algılanır (x, y, t gibi tek harfli herhangi bir
  // sembol) — kullanıcı mutlaka "x" yazmak zorunda değil, denklemde
  // kullandığı harfi otomatik tanıyoruz.
  const varName = explicitVarName ?? detectVariableName(leftNode, rightNode);

  const leftDecomposed = decomposeSide(leftNode, varName);
  const rightDecomposed = decomposeSide(rightNode, varName);

  if (leftDecomposed && rightDecomposed) {
    const structured = solveFromDecomposedSides(leftDecomposed, rightDecomposed, varName);
    if (structured.success) {
      return structured;
    }
  }

  return solveGeneralNumerically(leftNode, rightNode, varName);
}

export interface DerivativeSolveResult {
  varName: string;
  atPoint: number | null;
  expression: string;
  value: number | null;
  steps: LogEquationStep[];
}

export interface IntegralSolveResult {
  varName: string;
  lower: number;
  upper: number;
  value: number;
  steps: LogEquationStep[];
}

export interface LimitSolveResult {
  varName: string;
  targetDisplay: string;
  exists: boolean;
  value: number | null;
  leftValue: number | null;
  rightValue: number | null;
  diverges: "positive" | "negative" | null;
  steps: LogEquationStep[];
}

export type MathSolveOutcome =
  | { success: true; kind: "equation"; result: LogEquationSolveResult }
  | { success: true; kind: "inequality"; result: LogInequalitySolveResult }
  | { success: true; kind: "derivative"; result: DerivativeSolveResult }
  | { success: true; kind: "integral"; result: IntegralSolveResult }
  | { success: true; kind: "limit"; result: LimitSolveResult }
  | { success: false; message: string };

/** Like evaluateConstant, but allows ±Infinity through — needed for limit
 * targets (x → ∞) where a finite-only check would wrongly reject valid input. */
function evaluateConstantAllowInfinite(node: MathNode): number | null {
  try {
    const value = node.evaluate();
    return typeof value === "number" && !Number.isNaN(value) ? value : null;
  } catch {
    return null;
  }
}

function formatCalculusNumber(value: number): string {
  if (value === Infinity) {
    return "∞";
  }
  if (value === -Infinity) {
    return "-∞";
  }
  if (!Number.isFinite(value)) {
    return "—";
  }
  return Number(value.toFixed(6)).toString();
}

/** Symbolic derivative via mathjs's own built-in `derivative()` (real
 * differentiation rules, not a numeric approximation) — optionally evaluated
 * at a specific point if a 3rd argument is given, e.g. d(x^2+log(x),x,2). */
function solveDerivativeCall(
  args: MathNode[]
): { success: true; kind: "derivative"; result: DerivativeSolveResult } | { success: false; message: string } {
  if (args.length < 2 || args.length > 3) {
    return { success: false, message: "Türev için d(ifade, değişken) veya d(ifade, değişken, nokta) yazımını kullan." };
  }
  const [exprNode, varNode, atNode] = args;
  if (varNode.type !== "SymbolNode") {
    return { success: false, message: "Türev alınacak değişkeni belirt, örn. d(x^2, x)." };
  }
  const varName = (varNode as unknown as { name: string }).name;

  let derivativeNode: MathNode;
  try {
    derivativeNode = derivative(exprNode, varName);
  } catch {
    return {
      success: false,
      message: "Bu ifadenin türevi bu araçla alınamadı — desteklenmeyen bir fonksiyon içeriyor olabilir.",
    };
  }

  const expression = derivativeNode.toString();
  let atPoint: number | null = null;
  let value: number | null = null;

  if (atNode) {
    atPoint = evaluateConstant(atNode);
    if (atPoint === null) {
      return { success: false, message: "Türevin hesaplanacağı nokta geçerli bir sayı olmalı." };
    }
    value = evaluateNodeAtScope(derivativeNode, { [varName]: atPoint });
    if (value === null) {
      return {
        success: false,
        message: `Türev, ${varName} = ${formatCalculusNumber(atPoint)} noktasında tanımlı değil (tanım kümesi dışında).`,
      };
    }
  }

  const steps: LogEquationStep[] = [
    {
      title: "1. Adım — Türev kuralları uygulanır",
      lines: [
        `d/d${varName} [ ${exprNode.toString()} ] = ${expression}`,
        ...(atPoint !== null && value !== null
          ? [`${varName} = ${formatCalculusNumber(atPoint)} noktasında değeri: ${formatCalculusNumber(value)}`]
          : []),
      ],
    },
  ];

  return {
    success: true,
    kind: "derivative",
    result: { varName, atPoint, expression, value, steps },
  };
}

const INTEGRAL_SIMPSON_INTERVALS = 4000;

/** Numeric definite integral via Simpson's rule — there's no general
 * closed-form (symbolic) integration available (mathjs has no integral
 * function, and building a real symbolic integrator is CAS-level work far
 * beyond this tool's scope), so this computes the definite value directly.
 * Returns null if the integrand is undefined anywhere on [a,b] (e.g. a
 * singularity) rather than silently producing a wrong number. */
function simpsonIntegrate(
  evaluate: (x: number) => number | null,
  a: number,
  b: number,
  intervals: number
): number | null {
  const n = intervals % 2 === 0 ? intervals : intervals + 1;
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i <= n; i += 1) {
    const x = a + i * h;
    const y = evaluate(x);
    if (y === null || !Number.isFinite(y)) {
      return null;
    }
    const coefficient = i === 0 || i === n ? 1 : i % 2 === 0 ? 2 : 4;
    sum += coefficient * y;
  }
  return (sum * h) / 3;
}

/** Definite integral: integral(ifade, alt, üst) with the variable
 * auto-detected, or integral(ifade, değişken, alt, üst) with it explicit. */
function solveIntegralCall(
  args: MathNode[]
): { success: true; kind: "integral"; result: IntegralSolveResult } | { success: false; message: string } {
  if (args.length !== 3 && args.length !== 4) {
    return {
      success: false,
      message: "Belirli integral için integral(ifade, alt, üst) veya integral(ifade, değişken, alt, üst) yazımını kullan.",
    };
  }

  const exprNode = args[0];
  let varName: string;
  let lowerNode: MathNode;
  let upperNode: MathNode;

  if (args.length === 4) {
    if (args[1].type !== "SymbolNode") {
      return { success: false, message: "İntegral değişkenini belirt, örn. integral(x^2, x, 0, 5)." };
    }
    varName = (args[1] as unknown as { name: string }).name;
    lowerNode = args[2];
    upperNode = args[3];
  } else {
    varName = detectVariableName(exprNode, exprNode);
    lowerNode = args[1];
    upperNode = args[2];
  }

  const lower = evaluateConstantAllowInfinite(lowerNode);
  const upper = evaluateConstantAllowInfinite(upperNode);
  if (lower === null || upper === null) {
    return { success: false, message: "İntegralin alt ve üst sınırları geçerli birer sayı olmalı." };
  }
  if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
    return {
      success: false,
      message: "Sınırlarından biri sonsuz olan (has) integraller bu araçta desteklenmiyor.",
    };
  }
  if (lower === upper) {
    return {
      success: true,
      kind: "integral",
      result: {
        varName,
        lower,
        upper,
        value: 0,
        steps: [
          {
            title: "1. Adım — Alt ve üst sınır eşit",
            lines: ["Alt sınır üst sınıra eşit olduğundan integralin değeri 0'dır."],
          },
        ],
      },
    };
  }

  const evaluateAt = (x: number) => evaluateNodeAtScope(exprNode, { [varName]: x });
  const rawValue = simpsonIntegrate(evaluateAt, Math.min(lower, upper), Math.max(lower, upper), INTEGRAL_SIMPSON_INTERVALS);
  if (rawValue === null) {
    return {
      success: false,
      message: "İfade, [alt, üst] aralığının bir noktasında tanımsız olduğundan integral hesaplanamadı (örn. paydası sıfır olan veya negatif sayının logaritması gibi bir durum).",
    };
  }
  const value = lower > upper ? -rawValue : rawValue;

  return {
    success: true,
    kind: "integral",
    result: {
      varName,
      lower,
      upper,
      value,
      steps: [
        {
          title: "1. Adım — Sayısal integral (Simpson yöntemi)",
          lines: [
            `∫ [${formatCalculusNumber(lower)}, ${formatCalculusNumber(upper)}] ${exprNode.toString()} d${varName}`,
            `≈ ${formatCalculusNumber(value)}`,
          ],
        },
      ],
    },
  };
}

const LIMIT_FINITE_STEPS = [0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001];
const LIMIT_INFINITE_STEPS = [1e2, 1e3, 1e4, 1e5, 1e6, 1e7];
const LIMIT_CONVERGENCE_TOLERANCE = 1e-4;
const LIMIT_DIVERGENCE_MAGNITUDE = 1e3;

/** Numeric one-sided sequences approaching a target — used for both finite
 * targets (approaching from target±h) and infinite targets (large finite x
 * moving toward +∞ or -∞). Returns the trend: converges to a value,
 * diverges to ±∞, or doesn't settle (oscillates / no evaluable samples). */
function probeLimitDirection(
  evaluate: (x: number) => number | null,
  samplePoints: number[]
): { kind: "value"; value: number } | { kind: "diverges"; sign: "positive" | "negative" } | { kind: "unknown" } {
  const samples: number[] = [];
  for (const x of samplePoints) {
    const y = evaluate(x);
    if (y !== null && Number.isFinite(y)) {
      samples.push(y);
    }
  }
  if (samples.length < 2) {
    return { kind: "unknown" };
  }
  const last = samples[samples.length - 1];
  const secondLast = samples[samples.length - 2];

  // A genuine blow-up (like 1/x near 0) keeps growing in magnitude, same
  // sign, across the whole shrinking-h sequence — not just the last step —
  // which distinguishes it from a merely large-but-settling value. Checking
  // only the last two samples against a fixed threshold missed cases where
  // the probed range never got close enough to hit that fixed threshold
  // (e.g. 1/x only reaches ~1e6 by h=1e-6, well under a 1e8 cutoff).
  const growingRun = samples.length >= 3 ? samples.slice(-3) : null;
  const isMonotonicBlowup =
    growingRun !== null &&
    Math.sign(growingRun[0]) === Math.sign(growingRun[1]) &&
    Math.sign(growingRun[1]) === Math.sign(growingRun[2]) &&
    Math.abs(growingRun[0]) < Math.abs(growingRun[1]) &&
    Math.abs(growingRun[1]) < Math.abs(growingRun[2]);
  if (isMonotonicBlowup && Math.abs(last) > LIMIT_DIVERGENCE_MAGNITUDE) {
    return { kind: "diverges", sign: last > 0 ? "positive" : "negative" };
  }
  const scale = Math.max(1, Math.abs(last));
  if (Math.abs(last - secondLast) < LIMIT_CONVERGENCE_TOLERANCE * scale) {
    return { kind: "value", value: last };
  }
  return { kind: "unknown" };
}

/** Limit: lim(ifade, değişken, hedef) — hedef sonlu bir sayı ya da
 * Infinity/-Infinity olabilir. Kapalı-form (sembolik) bir limit çözücü genel
 * durumda mümkün olmadığından, hedefe sayısal olarak yaklaşarak (finite
 * hedeflerde iki yönden, sonsuzda tek yönden) eğilim tespit edilir —
 * yakınsamıyorsa veya iki yön farklı sonuç veriyorsa dürüstçe "limit yok"
 * denir, uydurma bir sayı üretilmez. */
function solveLimitCall(
  args: MathNode[]
): { success: true; kind: "limit"; result: LimitSolveResult } | { success: false; message: string } {
  if (args.length !== 3) {
    return { success: false, message: "Limit için lim(ifade, değişken, hedef) yazımını kullan, örn. lim(sin(x)/x, x, 0)." };
  }
  const [exprNode, varNode, targetNode] = args;
  if (varNode.type !== "SymbolNode") {
    return { success: false, message: "Limit değişkenini belirt, örn. lim(sin(x)/x, x, 0)." };
  }
  const varName = (varNode as unknown as { name: string }).name;
  const target = evaluateConstantAllowInfinite(targetNode);
  if (target === null) {
    return { success: false, message: "Limitin hedef değeri geçerli bir sayı ya da sonsuz (Infinity/-Infinity) olmalı." };
  }

  const evaluateAt = (x: number) => evaluateNodeAtScope(exprNode, { [varName]: x });
  const targetDisplay = formatCalculusNumber(target);

  if (target === Infinity || target === -Infinity) {
    const points = LIMIT_INFINITE_STEPS.map((step) => (target === Infinity ? step : -step));
    const trend = probeLimitDirection(evaluateAt, points);
    if (trend.kind === "value") {
      return {
        success: true,
        kind: "limit",
        result: {
          varName,
          targetDisplay,
          exists: true,
          value: trend.value,
          leftValue: null,
          rightValue: null,
          diverges: null,
          steps: [
            {
              title: "1. Adım — Büyük değerlere yaklaşarak eğilim incelenir",
              lines: [`${varName} → ${targetDisplay} iken ifade ${formatCalculusNumber(trend.value)} değerine yakınsıyor.`],
            },
          ],
        },
      };
    }
    if (trend.kind === "diverges") {
      return {
        success: true,
        kind: "limit",
        result: {
          varName,
          targetDisplay,
          exists: false,
          value: null,
          leftValue: null,
          rightValue: null,
          diverges: trend.sign,
          steps: [
            {
              title: "1. Adım — Büyük değerlere yaklaşarak eğilim incelenir",
              lines: [`${varName} → ${targetDisplay} iken ifade ${trend.sign === "positive" ? "+∞" : "-∞"}'a ıraksıyor.`],
            },
          ],
        },
      };
    }
    return {
      success: false,
      message: `${varName} → ${targetDisplay} iken ifade sayısal olarak kararlı bir değere yakınsamıyor (muhtemelen salınımlı ya da tanım dışı).`,
    };
  }

  const leftPoints = LIMIT_FINITE_STEPS.map((h) => target - h);
  const rightPoints = LIMIT_FINITE_STEPS.map((h) => target + h);
  const leftTrend = probeLimitDirection(evaluateAt, leftPoints);
  const rightTrend = probeLimitDirection(evaluateAt, rightPoints);

  const leftValue = leftTrend.kind === "value" ? leftTrend.value : null;
  const rightValue = rightTrend.kind === "value" ? rightTrend.value : null;

  if (leftTrend.kind === "value" && rightTrend.kind === "value") {
    const scale = Math.max(1, Math.abs(leftTrend.value), Math.abs(rightTrend.value));
    if (Math.abs(leftTrend.value - rightTrend.value) < LIMIT_CONVERGENCE_TOLERANCE * scale) {
      const value = (leftTrend.value + rightTrend.value) / 2;
      return {
        success: true,
        kind: "limit",
        result: {
          varName,
          targetDisplay,
          exists: true,
          value,
          leftValue,
          rightValue,
          diverges: null,
          steps: [
            {
              title: "1. Adım — Sağdan ve soldan yaklaşarak eğilim incelenir",
              lines: [
                `${varName} → ${targetDisplay}⁻: ${formatCalculusNumber(leftTrend.value)}`,
                `${varName} → ${targetDisplay}⁺: ${formatCalculusNumber(rightTrend.value)}`,
                `İki yön de aynı değere yakınsadığından limit vardır: ${formatCalculusNumber(value)}`,
              ],
            },
          ],
        },
      };
    }
    return {
      success: true,
      kind: "limit",
      result: {
        varName,
        targetDisplay,
        exists: false,
        value: null,
        leftValue,
        rightValue,
        diverges: null,
        steps: [
          {
            title: "1. Adım — Sağdan ve soldan yaklaşarak eğilim incelenir",
            lines: [
              `${varName} → ${targetDisplay}⁻: ${formatCalculusNumber(leftTrend.value)}`,
              `${varName} → ${targetDisplay}⁺: ${formatCalculusNumber(rightTrend.value)}`,
              "Sağdan ve soldan limitler farklı olduğundan bu noktada limit yoktur.",
            ],
          },
        ],
      },
    };
  }

  if (leftTrend.kind === "diverges" || rightTrend.kind === "diverges") {
    const leftSign = leftTrend.kind === "diverges" ? leftTrend.sign : null;
    const rightSign = rightTrend.kind === "diverges" ? rightTrend.sign : null;
    const sign = leftSign ?? rightSign ?? "positive";
    const sameSign = leftSign !== null && rightSign !== null && leftSign === rightSign;
    return {
      success: true,
      kind: "limit",
      result: {
        varName,
        targetDisplay,
        exists: false,
        value: null,
        leftValue,
        rightValue,
        diverges: sameSign ? sign : null,
        steps: [
          {
            title: "1. Adım — Sağdan ve soldan yaklaşarak eğilim incelenir",
            lines: [
              sameSign
                ? `${varName} → ${targetDisplay} iken ifade ${sign === "positive" ? "+∞" : "-∞"}'a ıraksıyor.`
                : "Sağdan ve soldan yaklaşım farklı yönlerde ıraksadığından bu noktada limit yoktur.",
            ],
          },
        ],
      },
    };
  }

  return {
    success: false,
    message: `${varName} → ${targetDisplay} civarında ifade sayısal olarak kararlı bir eğilim göstermiyor (tanım dışı ya da salınımlı olabilir).`,
  };
}

/** Registers d()/integral()/lim() as real, evaluable mathjs functions (on
 * `mathInstance`, not the package's shared default) so they compose with
 * ordinary arithmetic through mathjs's own evaluator — e.g.
 * "integral(x,x,4,2) + log(40,10)" now evaluates as ONE expression instead
 * of only working when the calculus call is the entire input. Each wrapper
 * reuses the existing rich solve*Call handler (so there's exactly one
 * implementation of the actual math, not two copies that could drift) and
 * collapses its result to a plain number, throwing a clear Error — which
 * mathjs's evaluate() propagates normally — when the result can't be
 * expressed as one (e.g. a symbolic derivative with no evaluation point, or
 * a limit that doesn't exist). `rawArgs = true` is required so mathjs hands
 * these the unevaluated argument nodes (needed since e.g. integral's 2nd
 * argument is a bound variable name, not a value to evaluate) — confirmed
 * via direct testing that mathjs supports this and that a bound variable
 * inside a raw-args call's arguments does NOT trip an "undefined symbol"
 * error during a no-scope evaluate() of the surrounding expression. */
function rawDerivativeFunction(args: MathNode[]): number {
  const outcome = solveDerivativeCall(args);
  if (!outcome.success) {
    throw new Error(outcome.message);
  }
  if (outcome.result.value === null) {
    throw new Error(
      "Türev sembolik kaldı — bir ifadenin içinde sayısal olarak kullanmak için 3. parametre olarak bir nokta belirt, örn. d(x^2,x,3)."
    );
  }
  return outcome.result.value;
}
rawDerivativeFunction.rawArgs = true;

function rawIntegralFunction(args: MathNode[]): number {
  const outcome = solveIntegralCall(args);
  if (!outcome.success) {
    throw new Error(outcome.message);
  }
  return outcome.result.value;
}
rawIntegralFunction.rawArgs = true;

function rawLimitFunction(args: MathNode[]): number {
  const outcome = solveLimitCall(args);
  if (!outcome.success) {
    throw new Error(outcome.message);
  }
  if (!outcome.result.exists || outcome.result.value === null) {
    throw new Error("Limit yok ya da sonsuza ıraksıyor, bu yüzden bir ifadenin içinde sayısal olarak kullanılamaz.");
  }
  return outcome.result.value;
}
rawLimitFunction.rawArgs = true;

mathInstance.import(
  {
    d: rawDerivativeFunction,
    turev: rawDerivativeFunction,
    integral: rawIntegralFunction,
    lim: rawLimitFunction,
    limit: rawLimitFunction,
  },
  { override: true }
);

/** Detects a top-level d(...)/integral(...)/lim(...) call and dispatches to
 * the matching handler — returns null (not an error) when the text isn't
 * one of these, so the caller falls through to the normal equation path. */
function tryCalculusOperation(normalizedText: string): MathSolveOutcome | null {
  let node: MathNode;
  try {
    node = parse(normalizedText);
  } catch {
    return null;
  }
  if (node.type !== "FunctionNode") {
    return null;
  }
  const fnNode = node as unknown as { fn: { name: string }; args: MathNode[] };
  const name = fnNode.fn?.name;
  if (name === "d" || name === "turev") {
    return solveDerivativeCall(fnNode.args);
  }
  if (name === "integral") {
    return solveIntegralCall(fnNode.args);
  }
  if (name === "lim" || name === "limit") {
    return solveLimitCall(fnNode.args);
  }
  return null;
}

function detectInequalityOperator(
  text: string
): { operator: InequalityOperator; index: number; length: number } | null {
  const twoCharMatch = text.match(/<=|>=/);
  if (twoCharMatch && twoCharMatch.index !== undefined) {
    return { operator: twoCharMatch[0] as InequalityOperator, index: twoCharMatch.index, length: 2 };
  }
  const oneCharMatch = text.match(/[<>]/);
  if (oneCharMatch && oneCharMatch.index !== undefined) {
    return { operator: oneCharMatch[0] as InequalityOperator, index: oneCharMatch.index, length: 1 };
  }
  return null;
}

/** Unified entry point: auto-detects whether the input is an equation (=), an
 * inequality (<, >, <=, >=), or a plain expression to evaluate, and routes to
 * the appropriate solver — this is what the UI should call instead of
 * `solveLogEquation` directly, since that one only ever handled "=" and plain
 * expressions. */
export function solveMathInput(
  rawText: string,
  explicitVarName?: string
): MathSolveOutcome {
  const normalized = normalizeEquationText(rawText);

  const calculusOutcome = tryCalculusOperation(normalized);
  if (calculusOutcome) {
    return calculusOutcome;
  }

  const inequality = detectInequalityOperator(normalized);

  if (!inequality) {
    const outcome = solveLogEquation(rawText, explicitVarName);
    return outcome.success
      ? { success: true, kind: "equation", result: outcome.result }
      : { success: false, message: outcome.message };
  }

  const leftText = normalized.slice(0, inequality.index).trim();
  const rightText = normalized.slice(inequality.index + inequality.length).trim();

  let leftNode: MathNode;
  let rightNode: MathNode;
  try {
    leftNode = parse(leftText);
    rightNode = parse(rightText);
  } catch {
    return {
      success: false,
      message: "Eşitsizlik ayrıştırılamadı — yazım şeklini kontrol et (örn. log(x,2)>3).",
    };
  }

  const varName = explicitVarName ?? detectVariableName(leftNode, rightNode);
  const outcome = solveInequality(leftNode, rightNode, inequality.operator, varName);
  return outcome.success
    ? { success: true, kind: "inequality", result: outcome.result }
    : { success: false, message: outcome.message };
}

/** Reads one LaTeX "token" starting at `index` — either a full `{...}`
 * balanced group, a single backslash command (`\infty`), or a bare
 * number/letter run — used to pull the content out of `_{...}`/`^{...}`
 * without assuming braces are always present (MathLive sometimes serializes
 * single-character sub/superscripts unbraced, e.g. `\int_0^5`). */
function readLatexToken(text: string, index: number): { token: string; nextIndex: number } | null {
  if (index >= text.length) {
    return null;
  }
  if (text[index] === "-" && text[index + 1] === "\\") {
    const inner = readLatexToken(text, index + 1);
    if (!inner) {
      return null;
    }
    return { token: `-${inner.token}`, nextIndex: inner.nextIndex };
  }
  if (text[index] === "{") {
    let depth = 0;
    let i = index;
    for (; i < text.length; i += 1) {
      if (text[i] === "{") {
        depth += 1;
      } else if (text[i] === "}") {
        depth -= 1;
        if (depth === 0) {
          i += 1;
          break;
        }
      }
    }
    if (depth !== 0) {
      return null;
    }
    return { token: text.slice(index + 1, i - 1), nextIndex: i };
  }
  if (text[index] === "\\") {
    const match = text.slice(index).match(/^\\[a-zA-Z]+/);
    if (!match) {
      return null;
    }
    return { token: match[0], nextIndex: index + match[0].length };
  }
  const match = text.slice(index).match(/^-?[0-9]+(?:\.[0-9]+)?|^[a-zA-Z]/);
  if (!match) {
    return null;
  }
  return { token: match[0], nextIndex: index + match[0].length };
}

function latexBoundToPlainText(token: string): string {
  if (token === "\\infty") {
    return "Infinity";
  }
  if (token === "-\\infty") {
    return "-Infinity";
  }
  return convertLatexToPlainText(token);
}

/** Matches MathLive's real integral templates (read directly from its
 * installed source: `\int_{#?}^{#?}` from the "int"/keyboard shortcuts,
 * `\int^{\infty}_{0}...` from the 0-to-∞ preset button), in either sub/sup
 * order, ending in a differential marker (`\differentialD x` from the "dx"
 * inline shortcut, or `\mathrm{d}x` from the menu template). Returns both
 * the canonical `integral(...)` text AND whatever LaTeX came after the
 * differential marker (`remainderLatex`) — the differential is naturally
 * self-terminating (it always marks exactly where the integrand ends), so
 * a compound input like `\int_4^2 x\,dx + \log_{10}40` can have its
 * trailing "+ ..." part recovered and combined by the caller, instead of
 * only ever working when the integral is the entire input. */
function tryExtractIntegral(latex: string): { canonical: string; remainderLatex: string } | null {
  const introMatch = latex.match(/^\\int\s*/);
  if (!introMatch) {
    return null;
  }
  let i = introMatch[0].length;
  let lowerToken: string | null = null;
  let upperToken: string | null = null;

  for (let count = 0; count < 2; count += 1) {
    while (latex[i] === " ") {
      i += 1;
    }
    if (latex[i] === "_") {
      const r = readLatexToken(latex, i + 1);
      if (!r) {
        return null;
      }
      lowerToken = r.token;
      i = r.nextIndex;
    } else if (latex[i] === "^") {
      const r = readLatexToken(latex, i + 1);
      if (!r) {
        return null;
      }
      upperToken = r.token;
      i = r.nextIndex;
    } else {
      break;
    }
  }
  if (lowerToken === null || upperToken === null) {
    return null;
  }

  const rest = latex.slice(i).trim();
  // The differential marker is usually `\differentialD x` (from MathLive's
  // "dx" inline shortcut) or `\mathrm{d}x` (from the menu template) — but
  // the shortcut only expands when the character typed right before "d" is
  // in MathLive's own allow-list (space/operator/etc.), NOT a plain symbol
  // like the "x" a user would naturally type right before it with no space
  // (confirmed by reading the shortcut's `after:` condition in MathLive's
  // source). When that happens the field is left with literal, un-expanded
  // "dx" — a real, reported case (an integral typed with the keyboard's own
  // ∫ button produced no result) — so bare `d<letter>` is accepted too
  // (the `(?<!\\)` guard keeps it from matching the "d" inside an unrelated
  // command like `\det`/`\dim`). Not anchored to end-of-string: the FIRST
  // differential marker found always caps the integrand, so anything after
  // it belongs to the outer expression, not the integral.
  const diffMatch = rest.match(/^([\s\S]*?)(?:\\,|\\!)*(?:\\(?:differentialD|mathrm\{d\})|(?<!\\)d)\s*([a-zA-Z])/);
  if (!diffMatch) {
    return null;
  }
  const exprLatex = diffMatch[1].trim();
  const varName = diffMatch[2];
  if (!exprLatex) {
    return null;
  }

  const exprPlain = convertLatexToPlainText(exprLatex);
  const lowerPlain = latexBoundToPlainText(lowerToken);
  const upperPlain = latexBoundToPlainText(upperToken);
  if (!exprPlain || !lowerPlain || !upperPlain) {
    return null;
  }

  const remainderLatex = rest.slice(diffMatch[0].length);
  return {
    canonical: `integral(${exprPlain},${varName},${lowerPlain},${upperPlain})`,
    remainderLatex,
  };
}

/** Matches MathLive's derivative templates (read from source: keyboard
 * button `\dfrac{\mathrm{d}}{\mathrm{d} x}`, menu template
 * `\dfrac{\mathrm{d}}{\mathrm{d}x}f(x)\bigm|_{x=a}` for the value at a
 * point). The n-th-derivative template (`\mathrm{d}^n`) is deliberately
 * NOT parsed as an ordinary derivative here — it would otherwise silently
 * parse as nonsense algebra and produce a wrong answer with no error, so
 * it's caught and declined explicitly by the caller instead. */
function tryExtractDerivative(latex: string): string | null {
  const m = latex.match(/^\\(?:dfrac|frac)\{\\mathrm\{d\}\}\{\\mathrm\{d\}\s*([a-zA-Z])\}\s*([\s\S]+)$/);
  if (!m) {
    return null;
  }
  const varName = m[1];
  let rest = m[2].trim();

  let atValue: string | null = null;
  const atMatch = rest.match(/\\bigm\|_\{[a-zA-Z]\s*=\s*([\s\S]+)\}\s*$/);
  if (atMatch) {
    atValue = atMatch[1].trim();
    rest = rest.slice(0, rest.length - atMatch[0].length).trim();
  }

  const exprPlain = convertLatexToPlainText(rest);
  if (!exprPlain) {
    return null;
  }

  if (atValue !== null) {
    const atPlain = convertLatexToPlainText(atValue);
    if (!atPlain) {
      return null;
    }
    return `d(${exprPlain},${varName},${atPlain})`;
  }
  return `d(${exprPlain},${varName})`;
}

/** Matches MathLive's real "lim" inline shortcut, `\lim_{#?\to#?}` — both
 * the variable and the target live inside ONE subscript brace group
 * (e.g. `\lim_{x\to0}` or `\lim_{x\to\infty}`), unlike the integral's two
 * separate sub/sup groups. */
function tryExtractLimit(latex: string): string | null {
  const introMatch = latex.match(/^\\lim\s*/);
  if (!introMatch) {
    return null;
  }
  let i = introMatch[0].length;
  if (latex[i] !== "_") {
    return null;
  }
  const sub = readLatexToken(latex, i + 1);
  if (!sub) {
    return null;
  }
  i = sub.nextIndex;

  const toMatch = sub.token.match(/^([a-zA-Z])\\to\s*(.+)$/);
  if (!toMatch) {
    return null;
  }
  const varName = toMatch[1];
  const targetRaw = toMatch[2].trim();
  const target = /^-?\\infty$/.test(targetRaw)
    ? targetRaw.startsWith("-") ? "-Infinity" : "Infinity"
    : convertLatexToPlainText(targetRaw);

  const exprLatex = latex.slice(i).trim();
  if (!exprLatex || !target) {
    return null;
  }
  const exprPlain = convertLatexToPlainText(exprLatex);
  if (!exprPlain) {
    return null;
  }

  return `lim(${exprPlain},${varName},${target})`;
}

/** Detects one of the 3 calculus operation templates in raw (pre-conversion)
 * LaTeX and converts it into this module's canonical plain-text call syntax
 * (`d(...)`, `integral(...)`, `lim(...)`) — these use backslash commands
 * (`\int`, `\lim`, `\dfrac`, `\mathrm{d}`, `\bigm|`) the general
 * `convertLatexToPlainText` pipeline was never designed for, so they must be
 * peeled off first, before that pipeline would otherwise mangle them. */
function extractCalculusCallFromLatex(
  latex: string
): { canonical: string } | { unsupported: string } | null {
  // A trailing bare "=" (nothing after it) is dropped before matching —
  // real users habitually type one at the end (out of habit from typing
  // equations like "log_2(x)=5") expecting the answer to appear after it,
  // even though d(...)/integral(...)/lim(...) aren't equations and never
  // need one. A real, reported case: "\int_3^7 xdx=" was rejected outright
  // because the trailing "=" broke the integral's "must end in dx" match.
  const trimmed = latex.trim().replace(/=\s*$/, "").trim();
  if (/\\mathrm\{d\}\^/.test(trimmed)) {
    return { unsupported: "n'inci mertebeden türev şu an desteklenmiyor — sadece birinci türev alınabilir." };
  }
  const integral = tryExtractIntegral(trimmed);
  if (integral) {
    const remainder = integral.remainderLatex.trim();
    if (!remainder) {
      return { canonical: integral.canonical };
    }
    // Compound input, e.g. "\int_4^2 x\,dx + \log_{10}40" — the integral is
    // self-delimiting (the differential marks exactly where it ends), so
    // whatever LaTeX comes after it is an ordinary trailing expression, run
    // through the normal conversion and appended as-is (it already starts
    // with its own +/- operator from the source LaTeX).
    const remainderPlain = convertLatexToPlainText(remainder);
    if (!remainderPlain) {
      return { canonical: integral.canonical };
    }
    return { canonical: `(${integral.canonical})${remainderPlain}` };
  }
  const limit = tryExtractLimit(trimmed);
  if (limit) {
    return { canonical: limit };
  }
  const deriv = tryExtractDerivative(trimmed);
  if (deriv) {
    return { canonical: deriv };
  }

  // The LaTeX clearly starts with a recognized calculus command but didn't
  // match any of the 3 extractors above — a specific, debuggable message
  // beats silently falling through to the generic "write an equation"
  // decline, which would wrongly suggest the input wasn't recognized at all
  // when it actually was, just in a shape this bridge doesn't handle yet.
  if (trimmed.startsWith("\\int")) {
    return { unsupported: "İntegral tanındı ama ayrıştırılamadı — sınırları ve d(değişken) kısmını (örn. dx) doldurduğundan emin ol." };
  }
  if (trimmed.startsWith("\\lim")) {
    return { unsupported: "Limit tanındı ama ayrıştırılamadı — limit hedefini doldurduğundan emin ol." };
  }
  if (/\\mathrm\{d\}\}\{\\mathrm\{d\}/.test(trimmed)) {
    return { unsupported: "Türev tanındı ama ayrıştırılamadı — türev alınacak ifadeyi doldurduğundan emin ol." };
  }

  return null;
}

export function solveMathInputFromLatex(
  latex: string,
  explicitVarName?: string
): MathSolveOutcome {
  const calculusExtraction = extractCalculusCallFromLatex(latex);
  if (calculusExtraction) {
    if ("unsupported" in calculusExtraction) {
      return { success: false, message: calculusExtraction.unsupported };
    }
    return solveMathInput(calculusExtraction.canonical, explicitVarName);
  }

  const plainText = convertLatexToPlainText(latex);
  if (!plainText) {
    return { success: false, message: "Denklem alanı boş." };
  }
  return solveMathInput(plainText, explicitVarName);
}

export interface SystemSolveResult {
  solutions: Array<Record<string, number>>;
  varNames: string[];
  steps: LogEquationStep[];
}

export type SystemSolveOutcome =
  | { success: true; result: SystemSolveResult }
  | { success: false; message: string };

function evaluateNodeAtScope(node: MathNode, scope: Record<string, number>): number | null {
  try {
    const value = node.evaluate(scope);
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/** Detects the distinct single-letter unknowns used across all equations
 * combined — an N-equation system should use exactly N of them. */
function detectSystemVariableNames(nodes: MathNode[]): string[] {
  const found = new Set<string>();
  for (const node of nodes) {
    node.traverse((current) => {
      if (current.type === "SymbolNode") {
        const name = (current as unknown as { name: string }).name;
        if (name.length === 1 && /[a-zA-Z]/.test(name) && !KNOWN_CONSTANT_SYMBOL_NAMES.has(name)) {
          found.add(name);
        }
      }
    });
  }
  return [...found].sort();
}

const SYSTEM_SEARCH_RADIUS = 25;
// Seed density drops as the variable count grows (the seed grid is
// radius^varCount, so a 2-var system can afford far more points per axis
// than a 3-var one for the same total seed budget) — Gauss-Newton
// refinement below converges from any seed in the right basin, so the seed
// grid only needs to be dense enough to land at least one seed in every
// basin, not to pinpoint the root itself.
const SYSTEM_SEEDS_PER_AXIS: Record<number, number> = { 2: 40, 3: 12 };
const SYSTEM_GN_MAX_ITERATIONS = 40;
const SYSTEM_GN_CONVERGENCE_TOLERANCE = 1e-14;
const SYSTEM_SOLUTION_TOLERANCE = 1e-6;
const SYSTEM_DEDUP_DISTANCE = 1e-3;
const MAX_SYSTEM_SEEDS = 60;
const MAX_SYSTEM_SOLUTIONS = 6;

function sumOfSquares(values: number[]): number {
  return values.reduce((total, value) => total + value * value, 0);
}

/** Central-difference Jacobian of `residual` at `point` — central (not
 * forward) differencing is worth the extra evaluation because the
 * Gauss-Newton step below is only as accurate as this gradient estimate,
 * and forward differencing's error is an order of magnitude larger. */
function computeJacobian(
  residual: (point: number[]) => number[] | null,
  point: number[]
): number[][] | null {
  const varCount = point.length;
  const jacobianRows: number[][] = [];
  const h = 1e-6;

  const columns: number[][] = [];
  for (let j = 0; j < varCount; j += 1) {
    const step = Math.max(Math.abs(point[j]), 1) * h;
    const forward = [...point];
    forward[j] += step;
    const backward = [...point];
    backward[j] -= step;
    const rForward = residual(forward);
    const rBackward = residual(backward);
    if (!rForward || !rBackward) {
      return null;
    }
    columns.push(rForward.map((value, i) => (value - rBackward[i]) / (2 * step)));
  }

  for (let i = 0; i < varCount; i += 1) {
    jacobianRows.push(columns.map((column) => column[i]));
  }
  return jacobianRows;
}

/** Refines one seed point toward the nearest root of `residual` with
 * damped Gauss-Newton (Levenberg-Marquardt style): each step solves the
 * damped normal equations (JᵀJ + λI)Δ = -Jᵀr for the update Δ, growing λ
 * (falling back toward plain gradient descent) whenever a step fails to
 * reduce the cost, shrinking it (toward the fast quadratic Gauss-Newton
 * step) whenever it succeeds. This converges in a handful of iterations
 * once a seed is in the right basin, unlike a grid search whose cost grows
 * exponentially with the number of variables. */
function refineSeedWithGaussNewton(
  residual: (point: number[]) => number[] | null,
  seed: number[]
): { point: number[]; value: number } {
  let point = [...seed];
  let r = residual(point);
  if (!r) {
    return { point, value: Infinity };
  }
  let cost = sumOfSquares(r);
  let lambda = 1e-2;

  for (let iteration = 0; iteration < SYSTEM_GN_MAX_ITERATIONS; iteration += 1) {
    if (cost < SYSTEM_GN_CONVERGENCE_TOLERANCE) {
      break;
    }
    const jacobian = computeJacobian(residual, point);
    if (!jacobian) {
      break;
    }

    let stepTaken = false;
    // Up to a few damping increases per iteration — a single failed step
    // shouldn't give up on an otherwise-promising seed, since the right λ
    // for a sharply curved region can be several orders of magnitude
    // above the previous iteration's.
    for (let attempt = 0; attempt < 6; attempt += 1) {
      try {
        const jacobianT = mathInstance.transpose(jacobian) as number[][];
        const normalMatrix = mathInstance.multiply(jacobianT, jacobian) as number[][];
        for (let i = 0; i < normalMatrix.length; i += 1) {
          normalMatrix[i][i] += lambda;
        }
        const rhs = (mathInstance.multiply(jacobianT, r) as number[]).map((value) => -value);
        const deltaRaw = mathInstance.lusolve(normalMatrix, rhs) as unknown as number[][];
        const delta = deltaRaw.map((row) => (Array.isArray(row) ? row[0] : row));
        const candidate = point.map((value, i) => value + delta[i]);
        const rCandidate = residual(candidate);
        if (!rCandidate) {
          lambda *= 10;
          continue;
        }
        const candidateCost = sumOfSquares(rCandidate);
        if (candidateCost < cost) {
          point = candidate;
          r = rCandidate;
          cost = candidateCost;
          lambda = Math.max(lambda / 10, 1e-10);
          stepTaken = true;
          break;
        }
        lambda *= 10;
      } catch {
        lambda *= 10;
      }
    }
    if (!stepTaken) {
      break;
    }
  }

  return { point, value: cost };
}

/** Cartesian-product grid of seed points spanning `[-radius, radius]` on
 * every one of `varCount` axes, `pointsPerAxis` apart — built recursively
 * so the same code serves any variable count instead of hardcoding nested
 * loops per N. */
function generateSeedGrid(varCount: number, radius: number, pointsPerAxis: number): number[][] {
  const axisValues: number[] = [];
  for (let i = 0; i <= pointsPerAxis; i += 1) {
    axisValues.push(-radius + (i * (radius * 2)) / pointsPerAxis);
  }

  let seeds: number[][] = [[]];
  for (let axis = 0; axis < varCount; axis += 1) {
    const next: number[][] = [];
    for (const partial of seeds) {
      for (const value of axisValues) {
        next.push([...partial, value]);
      }
    }
    seeds = next;
  }
  return seeds;
}

/** Solves a system of N equations in N unknowns (N = 2 or 3) numerically —
 * there's no general closed-form method for nonlinear systems (unlike a
 * single equation, "substitute and solve" doesn't generalize cleanly when
 * the equations mix logs/trig/polynomials arbitrarily), so this minimizes
 * F(vars) = Σ(equation's left − right)² — F is always ≥0 and touches
 * exactly 0 at real solutions, since a sum of squares is zero only when
 * every term is zero. A grid of seed points across the search area is each
 * refined toward the nearest root with damped Gauss-Newton, so multiple
 * genuine solutions are all reported (e.g. a line crossing a circle
 * twice) instead of only the first one found. */
export function solveEquationSystem(equationTexts: string[]): SystemSolveOutcome {
  const varCount = equationTexts.length;
  const normalizedTexts = equationTexts.map(normalizeEquationText);

  if (normalizedTexts.some((text) => !text.includes("="))) {
    return {
      success: false,
      message: `Her ${varCount} alan da bir '=' işareti içeren birer denklem olmalı.`,
    };
  }

  const parseEquationSides = (text: string): [MathNode, MathNode] | null => {
    const parts = text.split("=");
    if (parts.length !== 2) {
      return null;
    }
    try {
      return [parse(parts[0].trim()), parse(parts[1].trim())];
    } catch {
      return null;
    }
  };

  const equationSides = normalizedTexts.map(parseEquationSides);
  if (equationSides.some((sides) => !sides)) {
    return { success: false, message: "Denklemlerden biri ayrıştırılamadı — yazım şeklini kontrol et." };
  }
  const sides = equationSides as Array<[MathNode, MathNode]>;

  const varNames = detectSystemVariableNames(sides.flat());
  if (varNames.length !== varCount) {
    return {
      success: false,
      message:
        varNames.length < varCount
          ? `${varCount} denklemde toplam ${varCount} farklı bilinmeyen (örn. ${["x", "y", "z"].slice(0, varCount).join(", ")}) bulunmalı.`
          : `Bu araç sadece ${varCount} bilinmeyenli sistemleri çözer, ${varNames.length} farklı bilinmeyen bulundu (${varNames.join(", ")}).`,
    };
  }

  const residual = (point: number[]): number[] | null => {
    const scope: Record<string, number> = {};
    varNames.forEach((name, i) => {
      scope[name] = point[i];
    });
    const values: number[] = [];
    for (const [left, right] of sides) {
      const leftValue = evaluateNodeAtScope(left, scope);
      const rightValue = evaluateNodeAtScope(right, scope);
      if (leftValue === null || rightValue === null) {
        return null;
      }
      values.push(leftValue - rightValue);
    }
    return values;
  };

  const pointsPerAxis = SYSTEM_SEEDS_PER_AXIS[varCount] ?? 10;
  const seeds = generateSeedGrid(varCount, SYSTEM_SEARCH_RADIUS, pointsPerAxis);

  // Coarsely rank every seed by its residual cost first, and only run the
  // (much more expensive) Gauss-Newton refinement on the most promising
  // ones — with a 3-variable grid in the thousands of seeds, refining
  // every single one would be wasteful when most start far from any root.
  const rankedSeeds = seeds
    .map((seed) => {
      const r = residual(seed);
      return r ? { seed, value: sumOfSquares(r) } : null;
    })
    .filter((entry): entry is { seed: number[]; value: number } => entry !== null)
    .sort((left, right) => left.value - right.value)
    .slice(0, MAX_SYSTEM_SEEDS);

  const refined = rankedSeeds.map((entry) => refineSeedWithGaussNewton(residual, entry.seed));
  const genuine = refined.filter((point) => point.value < SYSTEM_SOLUTION_TOLERANCE);

  const deduped: number[][] = [];
  for (const point of genuine) {
    const isDuplicate = deduped.some(
      (existing) =>
        Math.hypot(...existing.map((value, i) => value - point.point[i])) < SYSTEM_DEDUP_DISTANCE
    );
    if (!isDuplicate) {
      deduped.push(point.point);
    }
  }

  if (deduped.length === 0) {
    return {
      success: false,
      message: "Bu sistemin (taranan bölgede) gerçek sayılarda ortak bir çözümü bulunamadı.",
    };
  }

  const finalSolutions = deduped.slice(0, MAX_SYSTEM_SOLUTIONS);
  const describeSolution = (point: number[]) =>
    varNames.map((name, i) => `${name} ≈ ${formatNumber(point[i])}`).join(", ");

  return {
    success: true,
    result: {
      solutions: finalSolutions.map((point) => {
        const solution: Record<string, number> = {};
        varNames.forEach((name, i) => {
          solution[name] = point[i];
        });
        return solution;
      }),
      varNames,
      steps: [
        {
          title: "1. Adım — Sayısal ortak çözüm arama",
          lines: [
            `F(${varNames.join(",")}) = ${varNames.map((_, i) => `(${i + 1}. denklemin farkı)²`).join(" + ")} tanımlanır — bu her zaman ≥0'dır ve tam olarak ortak çözümde 0 olur.`,
            "Arama bölgesine yayılan çok sayıda başlangıç noktasından, sayısal olarak F'nin en yakın kökü aranır — bulunan tüm farklı çözümler raporlanır.",
            finalSolutions.length > 1
              ? `${finalSolutions.length} farklı ortak çözüm bulundu.`
              : "Tek bir ortak çözüm bulundu.",
            ...finalSolutions.map(
              (point, index) =>
                `${finalSolutions.length > 1 ? `${index + 1}. çözüm: ` : ""}${describeSolution(point)}`
            ),
          ],
        },
      ],
    },
  };
}

/** Converts every term to a single common base (the first term's base) via the change-of-base identity log_b(A) = log_target(A) * ln(target)/ln(b). */
function normalizeToCommonBase(
  terms: LogTermMatch[]
): { terms: LogTermMatch[]; base: number; conversionSteps: LogEquationStep[] } | null {
  const targetBase = terms[0].base;
  const conversionSteps: LogEquationStep[] = [];
  const lines: string[] = [];

  const normalized = terms.map((term) => {
    if (Math.abs(term.base - targetBase) < NATURAL_LOG_TOLERANCE) {
      return term;
    }
    const conversionFactor = Math.log(targetBase) / Math.log(term.base);
    lines.push(
      `log_${formatBaseLabel(term.base)}(...) = log_${formatBaseLabel(targetBase)}(...) × ln(${formatBaseLabel(targetBase)})/ln(${formatBaseLabel(term.base)}) = log_${formatBaseLabel(targetBase)}(...) × ${conversionFactor}`
    );
    return { ...term, coefficient: term.coefficient * conversionFactor, base: targetBase };
  });

  if (lines.length > 0) {
    conversionSteps.push({
      title: "1. Adım — Farklı tabanları ortak tabana çevir (taban değiştirme formülü)",
      lines,
    });
  }

  return { terms: normalized, base: targetBase, conversionSteps };
}

export function solveFromDecomposedSides(
  leftDecomposed: DecomposedSide,
  rightDecomposed: DecomposedSide,
  varName = "x"
): LogEquationSolveOutcome {
  const combinedTermsRaw: LogTermMatch[] = [
    ...leftDecomposed.terms,
    ...rightDecomposed.terms.map((term) => ({ ...term, coefficient: -term.coefficient })),
  ];
  const combinedConstant = rightDecomposed.constant - leftDecomposed.constant;

  if (combinedTermsRaw.length === 0) {
    return { success: false, message: "Denklemde logaritma terimi bulunamadı." };
  }

  if (combinedTermsRaw.some((term) => !(term.base > 0) || term.base === 1)) {
    return { success: false, message: "Geçersiz logaritma tabanı (0'dan büyük, 1'e eşit olmamalı)." };
  }

  const baseSet = new Set(combinedTermsRaw.map((term) => Math.round(term.base * 1e9)));
  const baseNormalization =
    baseSet.size > 1 ? normalizeToCommonBase(combinedTermsRaw) : null;

  if (baseSet.size > 1 && !baseNormalization) {
    return { success: false, message: "Farklı tabanlı logaritma terimleri ortak tabana çevrilemedi." };
  }

  const combinedTermsBeforeMerge = baseNormalization ? baseNormalization.terms : combinedTermsRaw;
  const combinedTerms = mergeSameArgumentTerms(combinedTermsBeforeMerge);

  if (combinedTerms.length === 0) {
    return { success: false, message: "Denklemde logaritma terimi bulunamadı (terimler birbirini götürdü)." };
  }

  const base = combinedTerms[0].base;

  const allArguments = combinedTerms.map((term) => term.argument);
  const steps: LogEquationStep[] = baseNormalization ? [...baseNormalization.conversionSteps] : [];
  const baseLabel = formatBaseLabel(base);
  let finalPoly: Polynomial;

  if (combinedTerms.length === 1) {
    const term = combinedTerms[0];
    if (term.coefficient === 0) {
      return { success: false, message: "Geçersiz katsayı." };
    }

    const isolatedLog = combinedConstant / term.coefficient;
    const argExpr = formatPolynomial(term.argument, varName);
    const logLabel = formatLogLabel(argExpr, base);
    const targetValue = Math.pow(base, isolatedLog);

    if (term.coefficient !== 1) {
      steps.push({
        title: `${steps.length + 1}. Adım — Logaritma terimini yalnız bırak`,
        lines: [
          `${term.coefficient}·${logLabel} = ${combinedConstant}`,
          `${logLabel} = ${combinedConstant} / ${term.coefficient} = ${isolatedLog}`,
        ],
      });
    }

    steps.push({
      title: `${steps.length + 1}. Adım — Üstel forma geç`,
      lines: [
        `${logLabel} = ${isolatedLog} ⟹ ${argExpr} = ${baseLabel}^${isolatedLog}`,
        `${argExpr} = ${targetValue}`,
      ],
    });

    finalPoly = subPoly(term.argument, constPoly(targetValue));
  } else {
    const nonIntegerCoefficient = combinedTerms.find(
      (term) => !Number.isInteger(term.coefficient)
    );
    if (nonIntegerCoefficient) {
      return {
        success: false,
        message:
          "Birden fazla logaritma terimi olduğunda tüm katsayılar tam sayı olmalı (örn. 2log(x,2)+log(x+1,2)=... gibi).",
      };
    }

    let numerator: Polynomial = constPoly(1);
    let denominator: Polynomial = constPoly(1);
    const numeratorLabels: string[] = [];
    const denominatorLabels: string[] = [];

    for (const term of combinedTerms) {
      const power = Math.abs(term.coefficient);
      let termPower: Polynomial = constPoly(1);
      for (let i = 0; i < power; i += 1) {
        const next = multiplyPoly(termPower, term.argument);
        if (!next) {
          return {
            success: false,
            message: "Bu denklem şeklini şu an çözemiyoruz (argümanların birleşik derecesi çok yüksek).",
          };
        }
        termPower = next;
      }

      const argExpr = formatPolynomial(term.argument, varName);
      const needsParens = argExpr.includes(" + ") || argExpr.includes(" - ");
      const wrappedArgExpr = needsParens ? `(${argExpr})` : argExpr;
      const label = power === 1 ? wrappedArgExpr : `${wrappedArgExpr}^${power}`;

      if (term.coefficient > 0) {
        const next = multiplyPoly(numerator, termPower);
        if (!next) {
          return {
            success: false,
            message: "Bu denklem şeklini şu an çözemiyoruz (argümanların birleşik derecesi çok yüksek).",
          };
        }
        numerator = next;
        numeratorLabels.push(label);
      } else {
        const next = multiplyPoly(denominator, termPower);
        if (!next) {
          return {
            success: false,
            message: "Bu denklem şeklini şu an çözemiyoruz (argümanların birleşik derecesi çok yüksek).",
          };
        }
        denominator = next;
        denominatorLabels.push(label);
      }
    }

    const combinedArgExpr =
      denominatorLabels.length > 0
        ? `(${numeratorLabels.join("·") || "1"})/(${denominatorLabels.join("·")})`
        : numeratorLabels.join("·");
    const combinedLabel = formatLogLabel(combinedArgExpr, base);
    const targetValue = Math.pow(base, combinedConstant);

    const lhsDescription = combinedTerms
      .map((term, index) => {
        const argExpr = formatPolynomial(term.argument, varName);
        const coeffLabel = Math.abs(term.coefficient) === 1 ? "" : `${Math.abs(term.coefficient)}·`;
        const sign = term.coefficient >= 0 ? (index === 0 ? "" : "+ ") : "- ";
        return `${sign}${coeffLabel}${formatLogLabel(argExpr, base)}`;
      })
      .join(" ");

    steps.push({
      title: `${steps.length + 1}. Adım — Logaritmaları birleştir (k·log_b(A) = log_b(A^k), log_b(A)+log_b(B)=log_b(A·B))`,
      lines: [
        `${lhsDescription} = ${combinedConstant}`,
        `${combinedLabel} = ${combinedConstant}`,
      ],
    });
    steps.push({
      title: `${steps.length + 1}. Adım — Üstel forma geç`,
      lines: [
        `${combinedLabel} = ${combinedConstant} ⟹ ${combinedArgExpr} = ${baseLabel}^${combinedConstant}`,
        `${combinedArgExpr} = ${targetValue}`,
      ],
    });

    const denominatorScaled = scalePoly(denominator, targetValue);
    const cross = subPoly(numerator, denominatorScaled);
    if (!cross) {
      return {
        success: false,
        message: "Bu denklem şeklini şu an çözemiyoruz.",
      };
    }
    finalPoly = cross;
  }

  const { roots, numeric } = solvePolynomialEqualsZero(finalPoly);
  if (roots.length === 0) {
    const trimmedFinal = trimPoly(finalPoly);
    if (trimmedFinal.length - 1 === 2) {
      const [c0, c1, c2] = trimmedFinal;
      const discriminant = c1 * c1 - 4 * c2 * c0;
      if (discriminant < 0) {
        const realPart = -c1 / (2 * c2);
        const imagPart = Math.sqrt(-discriminant) / (2 * c2);
        return {
          success: false,
          message: `Gerçek sayılarda çözüm bulunamadı (bu ikinci dereceden denklemin diskriminantı negatif). Bilgi amaçlı: karmaşık kökleri ${varName} = ${formatNumber(realPart)} ± ${formatNumber(imagPart)}i — ancak karmaşık sayılarda logaritma bu aracın kapsamı dışındadır, bu kökler orijinal denklemi gerçek sayılarda sağlamaz.`,
        };
      }
    }
    return { success: false, message: "Gerçek sayılarda çözüm bulunamadı." };
  }

  const validRoots = roots.filter((x) =>
    allArguments.every((argument) => evaluatePoly(argument, x) > 1e-9)
  );
  const excludedRoots = roots.filter((x) => !validRoots.includes(x));

  if (validRoots.length === 0) {
    return {
      success: false,
      message:
        "Bulunan kök(ler) logaritmanın tanım kümesini sağlamıyor (negatif veya sıfır argüman üretiyor).",
    };
  }

  const degree = degreeOf(finalPoly);
  const equationLabel = numeric
    ? "Sayısal Olarak Çöz"
    : degree === 2
      ? "İkinci Dereceden Denklemi Çöz"
      : "Doğrusal Denklemi Çöz";
  steps.push({
    title: `${steps.length + 1}. Adım — ${equationLabel}`,
    lines: [
      `${formatPolynomial(finalPoly, varName)} = 0`,
      ...(numeric ? ["(sayısal kök bulma yöntemiyle çözüldü)"] : []),
      ...validRoots.map((root) => `${varName} = ${root}`),
      ...(excludedRoots.length > 0
        ? [
            `(${excludedRoots.join(", ")} kökü/kökleri tanım kümesi dışında olduğundan elenmiştir)`,
          ]
        : []),
    ],
  });

  return {
    success: true,
    result: { roots: validRoots, excludedRoots, base, steps, numeric, isEvaluation: false, varName },
  };
}
