"use client";

import { useMemo, useState } from "react";

type ForceUnit = "n" | "kn" | "lbf";
type AreaUnit = "mm2" | "in2";
type LengthUnit = "mm" | "in";

const forceFactors: Record<ForceUnit, number> = { n: 1, kn: 1000, lbf: 4.448221615 };

function readNumber(value: string) { const parsed = Number(value.trim().replace(",", ".")); return Number.isFinite(parsed) ? parsed : null; }
function format(value: number, digits = 3) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value); }

export default function EnglishStressStrainCalculator() {
  const [force, setForce] = useState("10"); const [forceUnit, setForceUnit] = useState<ForceUnit>("kn");
  const [area, setArea] = useState("100"); const [areaUnit, setAreaUnit] = useState<AreaUnit>("mm2");
  const [originalLength, setOriginalLength] = useState("1000"); const [extension, setExtension] = useState("0.5"); const [lengthUnit, setLengthUnit] = useState<LengthUnit>("mm");
  const result = useMemo(() => {
    const values = [force, area, originalLength, extension].map(readNumber);
    if (values.some((value) => value === null)) return null;
    const [forceInput, areaInput, originalInput, extensionInput] = values as number[];
    if (forceInput < 0 || areaInput <= 0 || originalInput <= 0 || extensionInput < 0) return null;
    const stressMpa = forceInput * forceFactors[forceUnit] / (areaUnit === "in2" ? areaInput * 645.16 : areaInput);
    const strain = (lengthUnit === "in" ? extensionInput * 25.4 : extensionInput) / (lengthUnit === "in" ? originalInput * 25.4 : originalInput);
    return { stressMpa, strain, modulusGpa: strain === 0 ? null : stressMpa / strain / 1000 };
  }, [area, areaUnit, extension, force, forceUnit, lengthUnit, originalLength]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Use consistent measurements from one uniform tensile or compressive member. The modulus result is meaningful only in the linear-elastic range.</p><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>Axial force (F)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={force} onChange={(event) => setForce(event.target.value)} /><select value={forceUnit} onChange={(event) => setForceUnit(event.target.value as ForceUnit)}><option value="n">N</option><option value="kn">kN</option><option value="lbf">lbf</option></select></div></label><label className="category-general-converter-field"><span>Cross-sectional area (A)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}><option value="mm2">mm²</option><option value="in2">in²</option></select></div></label><label className="category-general-converter-field"><span>Original gauge length (L₀)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={originalLength} onChange={(event) => setOriginalLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as LengthUnit)}><option value="mm">mm</option><option value="in">in</option></select></div></label><label className="category-general-converter-field"><span>Extension (ΔL)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={extension} onChange={(event) => setExtension(event.target.value)} /><span>{lengthUnit}</span></div></label></div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter non-negative force and extension values, plus positive area and original length.</strong> : <div className="paint-calculator-result-grid"><div><span>Engineering stress (σ)</span><strong>{format(result.stressMpa)} MPa</strong><small>{format(result.stressMpa * 0.145038)} ksi</small></div><div><span>Engineering strain (ε)</span><strong>{format(result.strain, 6)}</strong><small>{format(result.strain * 100, 4)}%</small></div><div><span>Secant modulus (σ / ε)</span><strong>{result.modulusGpa === null ? "—" : `${format(result.modulusGpa)} GPa`}</strong><small>{result.modulusGpa === null ? "Enter non-zero extension" : `${format(result.modulusGpa * 145.038)} ksi`}</small></div></div>}</div><p className="calculator-usage-hint"><strong>Important:</strong> this reports engineering stress and strain only. It does not check yield, ultimate strength, buckling, fatigue, stress concentration, bending, shear, connections or material nonlinearity.</p></div>;
}
