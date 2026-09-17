"use client";

import { useMemo, useState } from "react";
import { calculateDilution, type DilutionTarget } from "../converter/dilutionCalculator";
import { calculateMolarite, type MolariteTarget } from "../converter/molariteCalculator";
import { calculatePh, type PhInputMode } from "../converter/phCalculator";

function number(value: string) {
  const parsed = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 4) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function Field({ label, value, onChange, disabled = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return <label className="category-general-converter-field"><span>{label}</span><input disabled={disabled} inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

export function MolarityCalculator() {
  const [target, setTarget] = useState<MolariteTarget>("molarite");
  const [values, setValues] = useState({ molarite: "1", molSayisi: "0.5", hacimLitre: "0.5" });
  const result = useMemo(() => calculateMolarite({ target, molarite: number(values.molarite), molSayisi: number(values.molSayisi), hacimLitre: number(values.hacimLitre) }), [target, values]);
  const labels: Record<MolariteTarget, string> = { molarite: "Molarity (mol/L)", molSayisi: "Amount of solute (mol)", hacim: "Solution volume (L)" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  return <div className="category-general-converter">
    <div className="engineering-calculator-card">
      <p className="calculator-usage-hint">Choose the value to calculate, then enter the other two values. M = n / V.</p>
      <div className="engineering-targets"><span>Calculate</span><div className="engineering-target-grid hydrostatic-target-grid">{(Object.keys(labels) as MolariteTarget[]).map((key) => <button className={`engineering-target-button${target === key ? " is-active" : ""}`} key={key} onClick={() => setTarget(key)} type="button">{labels[key]}</button>)}</div></div>
      <div className="paint-calculator-grid">
        <Field disabled={target === "molarite"} label="Molarity (mol/L)" value={values.molarite} onChange={update("molarite")} />
        <Field disabled={target === "molSayisi"} label="Amount of solute (mol)" value={values.molSayisi} onChange={update("molSayisi")} />
        <Field disabled={target === "hacim"} label="Solution volume (L)" value={values.hacimLitre} onChange={update("hacimLitre")} />
      </div>
    </div>
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result ? <div className="paint-calculator-result-grid"><div><span>Molarity</span><strong>{format(result.molarite)} mol/L</strong></div><div><span>Amount</span><strong>{format(result.molSayisi)} mol</strong></div><div><span>Volume</span><strong>{format(result.hacimLitre)} L</strong></div></div> : <strong>Enter valid non-negative values; volume must be greater than zero when calculating molarity.</strong>}</div>
  </div>;
}

export function DilutionCalculator() {
  const [target, setTarget] = useState<DilutionTarget>("v1");
  const [values, setValues] = useState({ c1: "2", v1: "100", c2: "0.5", v2: "400" });
  const result = useMemo(() => calculateDilution({ target, c1: number(values.c1), v1: number(values.v1), c2: number(values.c2), v2: number(values.v2) }), [target, values]);
  const labels: Record<DilutionTarget, string> = { c1: "Stock concentration", v1: "Stock volume", c2: "Target concentration", v2: "Final volume" };
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  return <div className="category-general-converter">
    <div className="engineering-calculator-card">
      <p className="calculator-usage-hint">Use C₁V₁ = C₂V₂. Keep both concentration values in the same unit and both volume values in the same unit.</p>
      <div className="engineering-targets"><span>Calculate</span><div className="engineering-target-grid hydrostatic-target-grid">{(Object.keys(labels) as DilutionTarget[]).map((key) => <button className={`engineering-target-button${target === key ? " is-active" : ""}`} key={key} onClick={() => setTarget(key)} type="button">{labels[key]}</button>)}</div></div>
      <div className="paint-calculator-grid">
        <Field disabled={target === "c1"} label="C₁ stock concentration" value={values.c1} onChange={update("c1")} /><Field disabled={target === "v1"} label="V₁ stock volume" value={values.v1} onChange={update("v1")} /><Field disabled={target === "c2"} label="C₂ target concentration" value={values.c2} onChange={update("c2")} /><Field disabled={target === "v2"} label="V₂ final volume" value={values.v2} onChange={update("v2")} />
      </div>
    </div>
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result ? <div className="paint-calculator-result-grid"><div><span>C₁</span><strong>{format(result.c1)}</strong></div><div><span>V₁</span><strong>{format(result.v1)}</strong></div><div><span>C₂</span><strong>{format(result.c2)}</strong></div><div><span>V₂</span><strong>{format(result.v2)}</strong></div></div> : <strong>Enter valid values. The value being solved is calculated from the other three.</strong>}</div>
  </div>;
}

export function PhCalculator() {
  const [mode, setMode] = useState<PhInputMode>("ph");
  const [values, setValues] = useState<Record<PhInputMode, string>>({ ph: "7", hConcentration: "0.0000001", poh: "7", ohConcentration: "0.0000001" });
  const result = useMemo(() => calculatePh({ mode, value: number(values[mode]) }), [mode, values]);
  const labels: Record<PhInputMode, string> = { ph: "pH", hConcentration: "[H⁺] (mol/L)", poh: "pOH", ohConcentration: "[OH⁻] (mol/L)" };
  const classification = result?.classification === "asidik" ? "Acidic" : result?.classification === "bazik" ? "Basic" : "Neutral";
  return <div className="category-general-converter">
    <div className="engineering-calculator-card"><p className="calculator-usage-hint">Choose one known value. This educational tool uses pH + pOH = 14 at 25 °C.</p><div className="engineering-targets"><span>Known value</span><div className="engineering-target-grid hydrostatic-target-grid">{(Object.keys(labels) as PhInputMode[]).map((key) => <button className={`engineering-target-button${mode === key ? " is-active" : ""}`} key={key} onClick={() => setMode(key)} type="button">{labels[key]}</button>)}</div></div><div className="paint-calculator-grid"><Field label={labels[mode]} value={values[mode]} onChange={(value) => setValues((current) => ({ ...current, [mode]: value }))} /></div></div>
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">{result ? <><div className="paint-calculator-result-grid"><div><span>pH</span><strong>{format(result.ph, 2)}</strong></div><div><span>pOH</span><strong>{format(result.poh, 2)}</strong></div><div><span>[H⁺]</span><strong>{result.hConcentration.toExponential(3)} mol/L</strong></div><div><span>[OH⁻]</span><strong>{result.ohConcentration.toExponential(3)} mol/L</strong></div></div><p className="ph-classification">{classification}</p></> : <strong>Enter a valid number. Ion concentrations must be greater than zero.</strong>}</div>
  </div>;
}
