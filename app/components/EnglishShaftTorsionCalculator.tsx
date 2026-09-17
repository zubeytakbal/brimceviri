"use client";

import { useMemo, useState } from "react";

type TorqueUnit = "nm" | "knm" | "ftlb";
type LengthUnit = "mm" | "m" | "in" | "ft";
type ModulusUnit = "gpa" | "ksi";

const torqueFactors: Record<TorqueUnit, number> = { nm: 1, knm: 1000, ftlb: 1.355817948 }; const lengthFactors: Record<LengthUnit, number> = { mm: .001, m: 1, in: .0254, ft: .3048 };
function number(value: string) { const parsed = Number(value.trim().replace(",", ".")); return Number.isFinite(parsed) ? parsed : null; }
function format(value: number, digits = 3) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value); }

export default function EnglishShaftTorsionCalculator() {
  const [torque, setTorque] = useState("500"); const [torqueUnit, setTorqueUnit] = useState<TorqueUnit>("nm");
  const [diameter, setDiameter] = useState("40"); const [diameterUnit, setDiameterUnit] = useState<"mm" | "in">("mm");
  const [length, setLength] = useState("1"); const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [modulus, setModulus] = useState("79"); const [modulusUnit, setModulusUnit] = useState<ModulusUnit>("gpa");
  const result = useMemo(() => {
    const values = [torque, diameter, length, modulus].map(number); if (values.some((value) => value === null)) return null;
    const [torqueInput, diameterInput, lengthInput, modulusInput] = values as number[]; if (torqueInput < 0 || diameterInput <= 0 || lengthInput <= 0 || modulusInput <= 0) return null;
    const t = torqueInput * torqueFactors[torqueUnit]; const d = diameterInput * (diameterUnit === "in" ? .0254 : .001); const l = lengthInput * lengthFactors[lengthUnit]; const g = modulusUnit === "ksi" ? modulusInput * 6.894757e6 : modulusInput * 1e9;
    const polarJ = Math.PI * d ** 4 / 32; const shearStressPa = t * (d / 2) / polarJ; const twistRad = t * l / (g * polarJ);
    return { polarJ, shearStressPa, twistRad };
  }, [diameter, diameterUnit, length, lengthUnit, modulus, modulusUnit, torque, torqueUnit]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Model: uniform, solid circular shaft under one applied torque. Enter the actual shear modulus for the material and operating condition.</p><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>Torque (T)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={torque} onChange={(event) => setTorque(event.target.value)} /><select value={torqueUnit} onChange={(event) => setTorqueUnit(event.target.value as TorqueUnit)}><option value="nm">N·m</option><option value="knm">kN·m</option><option value="ftlb">ft·lbf</option></select></div></label><label className="category-general-converter-field"><span>Shaft diameter (d)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={diameter} onChange={(event) => setDiameter(event.target.value)} /><select value={diameterUnit} onChange={(event) => setDiameterUnit(event.target.value as "mm" | "in")}><option value="mm">mm</option><option value="in">in</option></select></div></label><label className="category-general-converter-field"><span>Shaft length (L)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as LengthUnit)}><option value="mm">mm</option><option value="m">m</option><option value="in">in</option><option value="ft">ft</option></select></div></label><label className="category-general-converter-field"><span>Shear modulus (G)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={modulus} onChange={(event) => setModulus(event.target.value)} /><select value={modulusUnit} onChange={(event) => setModulusUnit(event.target.value as ModulusUnit)}><option value="gpa">GPa</option><option value="ksi">ksi</option></select></div></label></div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter non-negative torque and positive diameter, length and shear modulus values.</strong> : <div className="paint-calculator-result-grid"><div><span>Maximum shear stress</span><strong>{format(result.shearStressPa / 1e6)} MPa</strong><small>{format(result.shearStressPa / 6.894757e6)} ksi</small></div><div><span>Angle of twist</span><strong>{format(result.twistRad * 180 / Math.PI, 3)}°</strong><small>{format(result.twistRad, 5)} rad</small></div><div><span>Polar moment (J)</span><strong>{format(result.polarJ * 1e12)} mm⁴</strong><small>Solid circular section</small></div></div>}</div><p className="calculator-usage-hint"><strong>Important:</strong> this is a linear-elastic, Saint-Venant torsion estimate. It does not check keyways, splines, hollow sections, stress concentration, fatigue, yield, critical speed, connections or combined loading.</p></div>;
}
