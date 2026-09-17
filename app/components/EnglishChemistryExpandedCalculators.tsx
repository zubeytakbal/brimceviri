"use client";

import { useMemo, useState } from "react";
import { calculateCellPotential } from "../converter/cellPotentialCalculator";
import { calculateKc } from "../converter/equilibriumConstantCalculator";
import { calculateEquationStoichiometry } from "../converter/equationStoichiometryCalculator";
import { calculateHalfLife, type HalfLifeTarget } from "../converter/halfLifeCalculator";
import { calculateMol, type MolTarget } from "../converter/molCalculator";
import { calculateMolality, type MolalityTarget } from "../converter/molalityCalculator";
import { calculatePpm, type PpmTarget } from "../converter/ppmCalculator";
import { calculateTitration, type TitrationTarget } from "../converter/titrationCalculator";
import { calculateYield, type YieldTarget } from "../converter/yieldCalculator";

function parseNumber(value: string) {
  const trimmed = value.trim();
  const normalized = /^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(trimmed)
    ? trimmed.replace(/,/g, "")
    : trimmed.replace(/,/g, ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 4) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function scientific(value: number) {
  return value === 0 ? "0" : value.toExponential(4);
}

function Field({ label, value, onChange, disabled = false }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean }) {
  return <label className="category-general-converter-field"><span>{label}</span><input disabled={disabled} inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function TargetButtons<T extends string>({ label, target, labels, onChange }: { label: string; target: T; labels: Record<T, string>; onChange: (target: T) => void }) {
  return <div className="engineering-targets"><span>{label}</span><div className="engineering-target-grid hydrostatic-target-grid">{(Object.keys(labels) as T[]).map((key) => <button className={`engineering-target-button${target === key ? " is-active" : ""}`} key={key} onClick={() => onChange(key)} type="button">{labels[key]}</button>)}</div></div>;
}

export function MoleCalculator() {
  const [target, setTarget] = useState<MolTarget>("moles");
  const [values, setValues] = useState({ massGrams: "18.015", molarMass: "18.015", moles: "1" });
  const result = useMemo(() => calculateMol({ target, massGrams: parseNumber(values.massGrams), molarMass: parseNumber(values.molarMass), moles: parseNumber(values.moles) }), [target, values]);
  const labels: Record<MolTarget, string> = { moles: "Amount (mol)", mass: "Mass (g)" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Use n = m / M. Enter a molar mass in g/mol.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "mass"} label="Mass (g)" value={values.massGrams} onChange={update("massGrams")} /><Field label="Molar mass (g/mol)" value={values.molarMass} onChange={update("molarMass")} /><Field disabled={target === "moles"} label="Amount (mol)" value={values.moles} onChange={update("moles")} /></div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result ? <div className="paint-calculator-result-grid"><div><span>Amount</span><strong>{format(result.moles)} mol</strong></div><div><span>Mass</span><strong>{format(result.massGrams)} g</strong></div><div><span>Particles</span><strong>{scientific(result.particleCount)}</strong></div></div> : <strong>Enter a positive molar mass and valid non-negative values.</strong>}</div></div>;
}

export function MolalityCalculator() {
  const [target, setTarget] = useState<MolalityTarget>("molalite");
  const [values, setValues] = useState({ molalite: "1", molSayisi: "0.5", cozucuKutlesiKg: "0.5" });
  const result = useMemo(() => calculateMolality({ target, molalite: parseNumber(values.molalite), molSayisi: parseNumber(values.molSayisi), cozucuKutlesiKg: parseNumber(values.cozucuKutlesiKg) }), [target, values]);
  const labels: Record<MolalityTarget, string> = { molalite: "Molality (mol/kg)", molSayisi: "Solute amount (mol)", cozucuKutlesi: "Solvent mass (kg)" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Molality uses the mass of solvent, not total solution volume: m = n / kg solvent.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "molalite"} label="Molality (mol/kg)" value={values.molalite} onChange={update("molalite")} /><Field disabled={target === "molSayisi"} label="Solute amount (mol)" value={values.molSayisi} onChange={update("molSayisi")} /><Field disabled={target === "cozucuKutlesi"} label="Solvent mass (kg)" value={values.cozucuKutlesiKg} onChange={update("cozucuKutlesiKg")} /></div></div><Result values={result ? [["Molality", `${format(result.molalite)} mol/kg`], ["Solute amount", `${format(result.molSayisi)} mol`], ["Solvent mass", `${format(result.cozucuKutlesiKg)} kg`]] : null} error="Enter valid non-negative values; solvent mass must be greater than zero when calculating molality." /></div>;
}

export function PpmCalculator() {
  const [target, setTarget] = useState<PpmTarget>("ppm");
  const [values, setValues] = useState({ ppm: "1000", cozunenKutlesi: "1", cozucuKutlesi: "999" });
  const result = useMemo(() => calculatePpm({ target, ppm: parseNumber(values.ppm), cozunenKutlesi: parseNumber(values.cozunenKutlesi), cozucuKutlesi: parseNumber(values.cozucuKutlesi) }), [target, values]);
  const labels: Record<PpmTarget, string> = { ppm: "Concentration (ppm)", cozunen: "Solute mass", cozucu: "Solvent mass" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">This mass-based tool uses ppm = (solute mass / total solution mass) × 1,000,000. Use the same mass unit for both masses.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "ppm"} label="Concentration (ppm)" value={values.ppm} onChange={update("ppm")} /><Field disabled={target === "cozunen"} label="Solute mass (any shared unit)" value={values.cozunenKutlesi} onChange={update("cozunenKutlesi")} /><Field disabled={target === "cozucu"} label="Solvent mass (same unit)" value={values.cozucuKutlesi} onChange={update("cozucuKutlesi")} /></div></div><Result values={result ? [["Concentration", `${format(result.ppm)} ppm`], ["Solute mass", format(result.cozunenKutlesi)], ["Solvent mass", format(result.cozucuKutlesi)], ["Solution mass", format(result.cozeltiKutlesi)]] : null} error="Enter valid non-negative values. A concentration used to calculate solute must be below 1,000,000 ppm." /></div>;
}

export function StoichiometryCalculator() {
  const [values, setValues] = useState({ knownMoles: "2", knownCoefficient: "2", knownMolarMass: "2.016", targetCoefficient: "1", targetMolarMass: "18.015" });
  const result = useMemo(() => calculateEquationStoichiometry([{ id: 1, coefficient: parseNumber(values.knownCoefficient), molarMass: parseNumber(values.knownMolarMass) }, { id: 2, coefficient: parseNumber(values.targetCoefficient), molarMass: parseNumber(values.targetMolarMass) }], 1, parseNumber(values.knownMoles)), [values]);
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const target = result?.find((item) => item.id === 2);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Use coefficients from a balanced equation. This finds the theoretical amount of one selected species from a known species; identify the limiting reagent separately.</p><div className="paint-calculator-grid"><Field label="Known amount (mol)" value={values.knownMoles} onChange={update("knownMoles")} /><Field label="Known coefficient" value={values.knownCoefficient} onChange={update("knownCoefficient")} /><Field label="Known molar mass (g/mol)" value={values.knownMolarMass} onChange={update("knownMolarMass")} /><Field label="Target coefficient" value={values.targetCoefficient} onChange={update("targetCoefficient")} /><Field label="Target molar mass (g/mol)" value={values.targetMolarMass} onChange={update("targetMolarMass")} /></div></div><Result values={target ? [["Target amount", `${format(target.moles)} mol`], ["Target mass", `${format(target.massGrams)} g`]] : null} error="Enter a non-negative known amount and positive coefficients and molar masses." /></div>;
}

export function PercentYieldCalculator() {
  const [target, setTarget] = useState<YieldTarget>("yuzdeVerim");
  const [values, setValues] = useState({ yuzdeVerim: "80", gercekVerim: "8", teorikVerim: "10" });
  const result = useMemo(() => calculateYield({ target, yuzdeVerim: parseNumber(values.yuzdeVerim), gercekVerim: parseNumber(values.gercekVerim), teorikVerim: parseNumber(values.teorikVerim) }), [target, values]);
  const labels: Record<YieldTarget, string> = { yuzdeVerim: "Percent yield", gercekVerim: "Actual yield", teorikVerim: "Theoretical yield" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Percent yield = (actual yield / theoretical yield) × 100. Keep actual and theoretical yields in the same unit.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "yuzdeVerim"} label="Percent yield (%)" value={values.yuzdeVerim} onChange={update("yuzdeVerim")} /><Field disabled={target === "gercekVerim"} label="Actual yield (any unit)" value={values.gercekVerim} onChange={update("gercekVerim")} /><Field disabled={target === "teorikVerim"} label="Theoretical yield (same unit)" value={values.teorikVerim} onChange={update("teorikVerim")} /></div></div><Result values={result ? [["Percent yield", `${format(result.yuzdeVerim)}%`], ["Actual yield", format(result.gercekVerim)], ["Theoretical yield", format(result.teorikVerim)]] : null} error="Enter valid non-negative values; theoretical yield must be greater than zero when calculating percent yield." /></div>;
}

export function TitrationCalculator() {
  const [target, setTarget] = useState<TitrationTarget>("ca");
  const [values, setValues] = useState({ ca: "0.1", va: "25", cb: "0.1", vb: "25", acid: "1", base: "1" });
  const result = useMemo(() => calculateTitration({ target, ca: parseNumber(values.ca), va: parseNumber(values.va), cb: parseNumber(values.cb), vb: parseNumber(values.vb), asitDegerlik: parseNumber(values.acid), bazDegerlik: parseNumber(values.base) }), [target, values]);
  const labels: Record<TitrationTarget, string> = { ca: "Acid concentration", va: "Acid volume", cb: "Base concentration", vb: "Base volume" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">At equivalence: CₐVₐ × acid equivalents = CᵦVᵦ × base equivalents. Use matching concentration and volume units.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "ca"} label="Acid concentration" value={values.ca} onChange={update("ca")} /><Field disabled={target === "va"} label="Acid volume" value={values.va} onChange={update("va")} /><Field disabled={target === "cb"} label="Base concentration" value={values.cb} onChange={update("cb")} /><Field disabled={target === "vb"} label="Base volume" value={values.vb} onChange={update("vb")} /><Field label="Acid equivalents per mole" value={values.acid} onChange={update("acid")} /><Field label="Base equivalents per mole" value={values.base} onChange={update("base")} /></div></div><Result values={result ? [["Acid concentration", format(result.ca)], ["Acid volume", format(result.va)], ["Base concentration", format(result.cb)], ["Base volume", format(result.vb)]] : null} error="Enter valid values. Equivalents per mole and the denominator of the selected calculation must be greater than zero." /></div>;
}

export function HalfLifeCalculator() {
  const [target, setTarget] = useState<HalfLifeTarget>("kalan");
  const [values, setValues] = useState({ kalanMiktar: "25", baslangicMiktar: "100", gecenSureSaniye: "2", yariOmurSaniye: "1" });
  const result = useMemo(() => calculateHalfLife({ target, kalanMiktar: parseNumber(values.kalanMiktar), baslangicMiktar: parseNumber(values.baslangicMiktar), gecenSureSaniye: parseNumber(values.gecenSureSaniye), yariOmurSaniye: parseNumber(values.yariOmurSaniye) }), [target, values]);
  const labels: Record<HalfLifeTarget, string> = { kalan: "Remaining amount", baslangic: "Initial amount", sure: "Elapsed time", yariOmur: "Half-life" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Use N = N₀ × (1/2)^(t/t½). Time and half-life must use the same unit; the default values are unitless.</p><TargetButtons label="Calculate" target={target} labels={labels} onChange={setTarget} /><div className="paint-calculator-grid"><Field disabled={target === "kalan"} label="Remaining amount" value={values.kalanMiktar} onChange={update("kalanMiktar")} /><Field disabled={target === "baslangic"} label="Initial amount" value={values.baslangicMiktar} onChange={update("baslangicMiktar")} /><Field disabled={target === "sure"} label="Elapsed time" value={values.gecenSureSaniye} onChange={update("gecenSureSaniye")} /><Field disabled={target === "yariOmur"} label="Half-life" value={values.yariOmurSaniye} onChange={update("yariOmurSaniye")} /></div></div><Result values={result ? [["Remaining amount", format(result.kalanMiktar)], ["Initial amount", format(result.baslangicMiktar)], ["Elapsed time", format(result.gecenSureSaniye)], ["Half-lives elapsed", format(result.gecenYariOmurSayisi)], ["Remaining", `${format(result.kalanYuzde)}%`]] : null} error="Enter valid positive amounts and half-life. Remaining amount cannot exceed the initial amount when solving for time or half-life." /></div>;
}

export function EquilibriumConstantCalculator() {
  const [values, setValues] = useState({ reactantOne: "1", reactantOneCoefficient: "1", reactantTwo: "1", reactantTwoCoefficient: "1", productOne: "2", productOneCoefficient: "1", productTwo: "1", productTwoCoefficient: "1" });
  const result = useMemo(() => calculateKc([{ concentration: parseNumber(values.reactantOne), coefficient: parseNumber(values.reactantOneCoefficient) }, { concentration: parseNumber(values.reactantTwo), coefficient: parseNumber(values.reactantTwoCoefficient) }], [{ concentration: parseNumber(values.productOne), coefficient: parseNumber(values.productOneCoefficient) }, { concentration: parseNumber(values.productTwo), coefficient: parseNumber(values.productTwoCoefficient) }]), [values]);
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">For aA + bB ⇌ cC + dD, enter equilibrium concentrations and coefficients to calculate Kc = [C]^c[D]^d / [A]^a[B]^b.</p><div className="paint-calculator-grid"><Field label="[A] reactant concentration" value={values.reactantOne} onChange={update("reactantOne")} /><Field label="A coefficient" value={values.reactantOneCoefficient} onChange={update("reactantOneCoefficient")} /><Field label="[B] reactant concentration" value={values.reactantTwo} onChange={update("reactantTwo")} /><Field label="B coefficient" value={values.reactantTwoCoefficient} onChange={update("reactantTwoCoefficient")} /><Field label="[C] product concentration" value={values.productOne} onChange={update("productOne")} /><Field label="C coefficient" value={values.productOneCoefficient} onChange={update("productOneCoefficient")} /><Field label="[D] product concentration" value={values.productTwo} onChange={update("productTwo")} /><Field label="D coefficient" value={values.productTwoCoefficient} onChange={update("productTwoCoefficient")} /></div></div><Result values={result ? [["Kc", scientific(result.kc)]] : null} error="Enter positive concentrations and positive stoichiometric coefficients for each term." /></div>;
}

export function CellPotentialCalculator() {
  const [values, setValues] = useState({ cathode: "0.34", anode: "-0.76" });
  const result = useMemo(() => calculateCellPotential(parseNumber(values.cathode), parseNumber(values.anode)), [values]);
  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Use standard reduction potentials: E°cell = E°cathode − E°anode. Do not multiply a tabulated potential by its balanced-equation coefficient.</p><div className="paint-calculator-grid"><Field label="Cathode reduction potential (V)" value={values.cathode} onChange={(value) => setValues((current) => ({ ...current, cathode: value }))} /><Field label="Anode reduction potential (V)" value={values.anode} onChange={(value) => setValues((current) => ({ ...current, anode: value }))} /></div></div><Result values={result ? [["E°cell", `${format(result.eHucre)} V`], ["Direction under standard conditions", result.kendiliginden ? "Spontaneous as written" : "Not spontaneous as written"]] : null} error="Enter valid numeric standard reduction potentials." /></div>;
}

function Result({ values, error }: { values: [string, string][] | null; error: string }) {
  return <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{values ? <div className="paint-calculator-result-grid">{values.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div> : <strong>{error}</strong>}</div>;
}
