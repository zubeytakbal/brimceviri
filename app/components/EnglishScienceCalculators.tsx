"use client";

import { useMemo, useState } from "react";

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function number(value: string) {
  const normalized = value.trim().replace(/,/g, ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 4) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export function MathematicsCoreCalculator() {
  const [mode, setMode] = useState<"percentage" | "mean" | "quadratic">("percentage");
  const [values, setValues] = useState({ part: "15", whole: "60", data: "4, 7, 9, 10", a: "1", b: "-5", c: "6" });
  const result = useMemo(() => {
    if (mode === "percentage") {
      const part = number(values.part); const whole = number(values.whole);
      return Number.isFinite(part) && Number.isFinite(whole) && whole !== 0 ? { title: "Percentage", values: [["Result", `${format((part / whole) * 100)}%`]] } : null;
    }
    if (mode === "mean") {
      const data = values.data.split(/[\s,]+/).filter(Boolean).map(number);
      return data.length && data.every(Number.isFinite) ? { title: "Arithmetic mean", values: [["Values", String(data.length)], ["Mean", format(data.reduce((sum, item) => sum + item, 0) / data.length)]] } : null;
    }
    const a = number(values.a); const b = number(values.b); const c = number(values.c); const discriminant = b * b - 4 * a * c;
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || a === 0) return null;
    if (discriminant < 0) return { title: "Quadratic roots", values: [["Discriminant", format(discriminant)], ["Real roots", "None"]] };
    const root = Math.sqrt(discriminant);
    return { title: "Quadratic roots", values: [["Discriminant", format(discriminant)], ["x₁", format((-b + root) / (2 * a))], ["x₂", format((-b - root) / (2 * a))]] };
  }, [mode, values]);
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="engineering-targets"><span>Choose a calculation</span><div className="engineering-target-grid hydrostatic-target-grid">{(["percentage", "mean", "quadratic"] as const).map((item) => <button className={`engineering-target-button${mode === item ? " is-active" : ""}`} key={item} onClick={() => setMode(item)} type="button">{item === "percentage" ? "Percentage" : item === "mean" ? "Mean" : "Quadratic roots"}</button>)}</div></div>{mode === "percentage" ? <div className="paint-calculator-grid"><Field label="Part" value={values.part} onChange={set("part")} /><Field label="Whole" value={values.whole} onChange={set("whole")} /></div> : mode === "mean" ? <div className="paint-calculator-grid"><Field label="Values, separated by commas or spaces" value={values.data} onChange={set("data")} /></div> : <div className="paint-calculator-grid"><Field label="a" value={values.a} onChange={set("a")} /><Field label="b" value={values.b} onChange={set("b")} /><Field label="c" value={values.c} onChange={set("c")} /></div>}</div><ScienceResult result={result} error="Enter valid values. For a quadratic equation, a cannot be zero." /></div>;
}

export function PhysicsCoreCalculator() {
  const [mode, setMode] = useState<"speed" | "force" | "energy">("speed");
  const [values, setValues] = useState({ distance: "100", time: "9.58", mass: "10", acceleration: "9.81", velocity: "5" });
  const result = useMemo(() => {
    const distance = number(values.distance); const time = number(values.time); const mass = number(values.mass); const acceleration = number(values.acceleration); const velocity = number(values.velocity);
    if (mode === "speed") return Number.isFinite(distance) && Number.isFinite(time) && time > 0 ? { title: "Speed", values: [["Speed (m/s)", `${format(distance / time)} m/s`], ["Speed (km/h)", `${format((distance / time) * 3.6)} km/h`]] } : null;
    if (mode === "force") return Number.isFinite(mass) && Number.isFinite(acceleration) ? { title: "Force", values: [["Force", `${format(mass * acceleration)} N`]] } : null;
    return Number.isFinite(mass) && Number.isFinite(velocity) ? { title: "Kinetic energy", values: [["Kinetic energy", `${format(0.5 * mass * velocity * velocity)} J`]] } : null;
  }, [mode, values]);
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="engineering-targets"><span>Choose a calculation</span><div className="engineering-target-grid hydrostatic-target-grid">{(["speed", "force", "energy"] as const).map((item) => <button className={`engineering-target-button${mode === item ? " is-active" : ""}`} key={item} onClick={() => setMode(item)} type="button">{item === "speed" ? "Speed" : item === "force" ? "Force" : "Kinetic energy"}</button>)}</div></div>{mode === "speed" ? <div className="paint-calculator-grid"><Field label="Distance (m)" value={values.distance} onChange={set("distance")} /><Field label="Time (s)" value={values.time} onChange={set("time")} /></div> : mode === "force" ? <div className="paint-calculator-grid"><Field label="Mass (kg)" value={values.mass} onChange={set("mass")} /><Field label="Acceleration (m/s²)" value={values.acceleration} onChange={set("acceleration")} /></div> : <div className="paint-calculator-grid"><Field label="Mass (kg)" value={values.mass} onChange={set("mass")} /><Field label="Velocity (m/s)" value={values.velocity} onChange={set("velocity")} /></div>}</div><ScienceResult result={result} error="Enter valid values; time must be greater than zero for speed." /></div>;
}

export function BiologyCoreCalculator() {
  const [sequence, setSequence] = useState("ATGCGTAC");
  const result = useMemo(() => {
    const dna = sequence.toUpperCase().replace(/\s/g, "");
    if (!dna || /[^ACGT]/.test(dna)) return null;
    const complement = dna.replace(/[ACGT]/g, (base) => ({ A: "T", T: "A", C: "G", G: "C" }[base] ?? base));
    const reverseComplement = complement.split("").reverse().join("");
    const rna = complement.replace(/T/g, "U");
    const gc = ((dna.match(/[GC]/g)?.length ?? 0) / dna.length) * 100;
    return { title: "DNA sequence", values: [["Length", `${dna.length} bases`], ["Complementary DNA (3′→5′)", complement], ["Reverse complement (5′→3′)", reverseComplement], ["Complementary RNA (3′→5′)", rna], ["GC content", `${format(gc, 2)}%`]] };
  }, [sequence]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Enter a DNA sequence using only A, C, G and T. This learning tool returns the complementary strand in antiparallel orientation and a reverse complement in 5′→3′ orientation.</p><label className="category-general-converter-field"><span>DNA sequence (5′ to 3′)</span><textarea rows={4} value={sequence} onChange={(event) => setSequence(event.target.value)} /></label></div><ScienceResult result={result} error="Enter a DNA sequence containing only A, C, G and T." /></div>;
}

function ScienceResult({ result, error }: { result: { title: string; values: string[][] } | null; error: string }) {
  return <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result ? <div className="paint-calculator-result-grid">{result.values.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div> : <strong>{error}</strong>}</div>;
}

export function SpeedCalculator() {
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("9.58");
  const result = useMemo(() => {
    const d = number(distance); const t = number(time);
    return Number.isFinite(d) && Number.isFinite(t) && t > 0 ? { title: "Speed", values: [["Speed (m/s)", `${format(d / t)} m/s`], ["Speed (km/h)", `${format((d / t) * 3.6)} km/h`]] } : null;
  }, [distance, time]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="Distance (m)" value={distance} onChange={setDistance} /><Field label="Time (s)" value={time} onChange={setTime} /></div></div><ScienceResult result={result} error="Enter a valid distance and a time greater than zero." /></div>;
}

export function ForceCalculator() {
  const [mass, setMass] = useState("10");
  const [acceleration, setAcceleration] = useState("9.81");
  const result = useMemo(() => {
    const m = number(mass); const a = number(acceleration);
    return Number.isFinite(m) && Number.isFinite(a) ? { title: "Force", values: [["Net force", `${format(m * a)} N`]] } : null;
  }, [mass, acceleration]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="Mass (kg)" value={mass} onChange={setMass} /><Field label="Acceleration (m/s²)" value={acceleration} onChange={setAcceleration} /></div></div><ScienceResult result={result} error="Enter valid mass and acceleration values." /></div>;
}

export function KineticEnergyCalculator() {
  const [mass, setMass] = useState("10");
  const [velocity, setVelocity] = useState("5");
  const result = useMemo(() => {
    const m = number(mass); const v = number(velocity);
    return Number.isFinite(m) && Number.isFinite(v) ? { title: "Kinetic energy", values: [["Kinetic energy", `${format(0.5 * m * v * v)} J`]] } : null;
  }, [mass, velocity]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="Mass (kg)" value={mass} onChange={setMass} /><Field label="Velocity (m/s)" value={velocity} onChange={setVelocity} /></div></div><ScienceResult result={result} error="Enter valid mass and velocity values." /></div>;
}

export function PercentageCalculator() {
  const [part, setPart] = useState("15");
  const [whole, setWhole] = useState("60");
  const result = useMemo(() => { const p = number(part); const w = number(whole); return Number.isFinite(p) && Number.isFinite(w) && w !== 0 ? { title: "Percentage", values: [["Result", `${format((p / w) * 100)}%`]] } : null; }, [part, whole]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="Part" value={part} onChange={setPart} /><Field label="Whole" value={whole} onChange={setWhole} /></div></div><ScienceResult result={result} error="Enter valid values; the whole cannot be zero." /></div>;
}

export function MeanCalculator() {
  const [values, setValues] = useState("4, 7, 9, 10");
  const result = useMemo(() => { const data = values.split(/[\s,]+/).filter(Boolean).map(number); return data.length && data.every(Number.isFinite) ? { title: "Arithmetic mean", values: [["Values", String(data.length)], ["Mean", format(data.reduce((sum, item) => sum + item, 0) / data.length)]] } : null; }, [values]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="Values, separated by commas or spaces" value={values} onChange={setValues} /></div></div><ScienceResult result={result} error="Enter one or more valid numbers." /></div>;
}

export function QuadraticRootsCalculator() {
  const [a, setA] = useState("1"); const [b, setB] = useState("-5"); const [c, setC] = useState("6");
  const result = useMemo(() => { const coefficientA = number(a); const coefficientB = number(b); const coefficientC = number(c); if (!Number.isFinite(coefficientA) || !Number.isFinite(coefficientB) || !Number.isFinite(coefficientC) || coefficientA === 0) return null; const discriminant = coefficientB * coefficientB - 4 * coefficientA * coefficientC; if (discriminant < 0) return { title: "Quadratic roots", values: [["Discriminant", format(discriminant)], ["Real roots", "None"]] }; const root = Math.sqrt(discriminant); return { title: "Quadratic roots", values: [["Discriminant", format(discriminant)], ["x1", format((-coefficientB + root) / (2 * coefficientA))], ["x2", format((-coefficientB - root) / (2 * coefficientA))]] }; }, [a, b, c]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><div className="paint-calculator-grid"><Field label="a" value={a} onChange={setA} /><Field label="b" value={b} onChange={setB} /><Field label="c" value={c} onChange={setC} /></div></div><ScienceResult result={result} error="Enter valid coefficients; a cannot be zero." /></div>;
}
