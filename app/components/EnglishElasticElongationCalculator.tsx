"use client";

import { useMemo, useState } from "react";
import { calculateElongation, elasticModulusTable } from "../converter/elasticModulus";

const materialNames: Record<string, string> = {
  steel: "Structural steel", "stainless-steel": "Stainless steel", titanium: "Titanium", copper: "Copper", brass: "Brass", aluminum: "Aluminum", glass: "Glass", concrete: "Concrete", zinc: "Zinc", nickel: "Nickel", tin: "Tin", gold: "Gold", silver: "Silver", platinum: "Platinum", iron: "Iron", "cast-iron": "Cast iron", chromium: "Chromium", magnesium: "Magnesium", tungsten: "Tungsten", molybdenum: "Molybdenum", niobium: "Niobium", palladium: "Palladium", vanadium: "Vanadium", antimony: "Antimony", bismuth: "Bismuth", cadmium: "Cadmium", bronze: "Bronze", mahogany: "Mahogany", walnut: "Walnut", teak: "Teak", birch: "Birch", beech: "Beech", ldpe: "LDPE", polystyrene: "Polystyrene",
};

function readNumber(value: string) {
  const result = Number(value.trim().replace(",", "."));
  return Number.isFinite(result) ? result : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function EnglishElasticElongationCalculator() {
  const [materialId, setMaterialId] = useState("steel");
  const [force, setForce] = useState("10");
  const [forceUnit, setForceUnit] = useState<"kn" | "n" | "lbf">("kn");
  const [area, setArea] = useState("100");
  const [areaUnit, setAreaUnit] = useState<"mm2" | "in2">("mm2");
  const [length, setLength] = useState("1");
  const [lengthUnit, setLengthUnit] = useState<"m" | "mm" | "in">("m");

  const material = elasticModulusTable.find((item) => item.id === materialId) ?? elasticModulusTable[0];
  const result = useMemo(() => {
    const forceValue = readNumber(force);
    const areaValue = readNumber(area);
    const lengthValue = readNumber(length);
    if (forceValue === null || areaValue === null || lengthValue === null) return null;

    const forceInNewtons = forceUnit === "kn" ? forceValue * 1000 : forceUnit === "lbf" ? forceValue * 4.448221615 : forceValue;
    const areaInMm2 = areaUnit === "in2" ? areaValue * 645.16 : areaValue;
    const lengthInMm = lengthUnit === "m" ? lengthValue * 1000 : lengthUnit === "in" ? lengthValue * 25.4 : lengthValue;
    return calculateElongation(forceInNewtons, areaInMm2, lengthInMm, material.modulusGPa);
  }, [area, areaUnit, force, forceUnit, length, lengthUnit, material.modulusGPa]);

  return <div className="category-general-converter"><div className="paint-calculator-grid">
    <label className="category-general-converter-field"><span>Material</span><select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>{elasticModulusTable.map((item) => <option key={item.id} value={item.id}>{materialNames[item.id] ?? item.id}{item.isVariable ? " (variable reference)" : ""}</option>)}</select></label>
    <label className="category-general-converter-field"><span>Axial force</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={force} onChange={(event) => setForce(event.target.value)} /><select value={forceUnit} onChange={(event) => setForceUnit(event.target.value as "kn" | "n" | "lbf")}><option value="kn">kN</option><option value="n">N</option><option value="lbf">lbf</option></select></div></label>
    <label className="category-general-converter-field"><span>Cross-sectional area</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={area} onChange={(event) => setArea(event.target.value)} /><select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as "mm2" | "in2")}><option value="mm2">mm²</option><option value="in2">in²</option></select></div></label>
    <label className="category-general-converter-field"><span>Original length</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /><select value={lengthUnit} onChange={(event) => setLengthUnit(event.target.value as "m" | "mm" | "in")}><option value="m">m</option><option value="mm">mm</option><option value="in">in</option></select></div></label>
  </div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result === null ? <strong>Enter positive force, area and length values.</strong> : <div className="paint-calculator-result-grid"><div><span>Axial stress (σ)</span><strong>{format(result.stressMPa)} MPa</strong><small>{format(result.stressMPa * 0.145037738, 3)} ksi</small></div><div><span>Elastic elongation (ΔL)</span><strong>{format(result.elongationMm, 4)} mm</strong><small>{format(result.elongationMm / 25.4, 5)} in</small></div></div>}</div><div className="conversion-table-wrap"><table className="conversion-table"><caption>Young's modulus reference values</caption><thead><tr><th scope="col">Material</th><th scope="col">E (GPa)</th></tr></thead><tbody>{elasticModulusTable.map((item) => <tr key={item.id} className={item.id === materialId ? "is-active" : undefined}><td>{materialNames[item.id] ?? item.id}{item.isVariable ? " *" : ""}</td><td>{item.modulusGPa}</td></tr>)}</tbody></table></div><p className="calculator-usage-hint"><strong>Important:</strong> the formula assumes a uniform member in the linear-elastic range. Values marked * vary substantially by grade, orientation, mix or processing. Check yield strength, buckling, connection details and the applicable design standard separately.</p></div>;
}
