"use client";

import { useMemo, useState } from "react";

type ForceUnit = "n" | "kn" | "lbf";
type LengthUnit = "mm" | "m" | "in" | "ft";
type ModulusUnit = "gpa" | "ksi";

const forceFactors: Record<ForceUnit, number> = { n: 1, kn: 1000, lbf: 4.448221615 };
const lengthFactors: Record<LengthUnit, number> = { mm: 0.001, m: 1, in: 0.0254, ft: 0.3048 };

function readNumber(value: string) { const parsed = Number(value.trim().replace(",", ".")); return Number.isFinite(parsed) ? parsed : null; }
function format(value: number, digits = 3) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value); }

export default function EnglishCantileverBeamCalculator() {
  const [load, setLoad] = useState("1"); const [forceUnit, setForceUnit] = useState<ForceUnit>("kn");
  const [length, setLength] = useState("1"); const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [width, setWidth] = useState("50"); const [height, setHeight] = useState("100"); const [sectionUnit, setSectionUnit] = useState<"mm" | "in">("mm");
  const [modulus, setModulus] = useState("200"); const [modulusUnit, setModulusUnit] = useState<ModulusUnit>("gpa");
  const result = useMemo(() => {
    const values = [load, length, width, height, modulus].map(readNumber);
    if (values.some((value) => value === null)) return null;
    const [loadInput, lengthInput, widthInput, heightInput, modulusInput] = values as number[];
    if (loadInput < 0 || lengthInput <= 0 || widthInput <= 0 || heightInput <= 0 || modulusInput <= 0) return null;
    const p = loadInput * forceFactors[forceUnit]; const l = lengthInput * lengthFactors[lengthUnit]; const sectionFactor = sectionUnit === "in" ? 0.0254 : 0.001;
    const b = widthInput * sectionFactor; const h = heightInput * sectionFactor; const e = modulusUnit === "ksi" ? modulusInput * 6.894757e6 : modulusInput * 1e9;
    const inertia = b * h ** 3 / 12; const deflectionM = p * l ** 3 / (3 * e * inertia); const stressPa = p * l * (h / 2) / inertia; const rotationRad = p * l ** 2 / (2 * e * inertia);
    return { inertia, deflectionM, stressPa, rotationRad };
  }, [forceUnit, height, length, lengthUnit, load, modulus, modulusUnit, sectionUnit, width]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Model: prismatic rectangular cantilever, fixed at one end, with one transverse point load at the free end.</p><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>Tip load (P)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={load} onChange={(event) => setLoad(event.target.value)} /><select value={forceUnit} onChange={(event) => setForceUnit(event.target.value as ForceUnit)}><option value="n">N</option><option value="kn">kN</option><option value="lbf">lbf</option></select></div></label><label className="category-general-converter-field"><span>Beam length (L)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as LengthUnit)}><option value="mm">mm</option><option value="m">m</option><option value="in">in</option><option value="ft">ft</option></select></div></label><label className="category-general-converter-field"><span>Section width (b)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={width} onChange={(event) => setWidth(event.target.value)} /><select value={sectionUnit} onChange={(event) => setSectionUnit(event.target.value as "mm" | "in")}><option value="mm">mm</option><option value="in">in</option></select></div></label><label className="category-general-converter-field"><span>Section depth (h)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={height} onChange={(event) => setHeight(event.target.value)} /><span>{sectionUnit}</span></div></label><label className="category-general-converter-field"><span>Young&apos;s modulus (E)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={modulus} onChange={(event) => setModulus(event.target.value)} /><select value={modulusUnit} onChange={(event) => setModulusUnit(event.target.value as ModulusUnit)}><option value="gpa">GPa</option><option value="ksi">ksi</option></select></div></label></div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter a non-negative load and positive geometric and modulus values.</strong> : <div className="paint-calculator-result-grid"><div><span>Tip deflection</span><strong>{format(result.deflectionM * 1000)} mm</strong><small>{format(result.deflectionM / 0.0254, 4)} in</small></div><div><span>Maximum bending stress</span><strong>{format(result.stressPa / 1e6)} MPa</strong><small>{format(result.stressPa / 6.894757e6)} ksi</small></div><div><span>Free-end rotation</span><strong>{format(result.rotationRad * 180 / Math.PI, 3)}°</strong><small>{format(result.rotationRad, 5)} rad</small></div><div><span>Second moment of area (I)</span><strong>{format(result.inertia * 1e12)} mm⁴</strong><small>Rectangular section about strong axis</small></div></div>}</div><p className="calculator-usage-hint"><strong>Important:</strong> this is a small-deflection, linear-elastic beam estimate. It excludes self-weight, distributed loads, shear deflection, large-deflection effects, local buckling, lateral-torsional buckling, stress concentrations and connection flexibility.</p></div>;
}
