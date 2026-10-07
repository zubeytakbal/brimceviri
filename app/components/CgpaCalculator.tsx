"use client";

// CGPA -> yuzde (kuruma ozel resmi formul), yuzde -> CGPA ve SGPA -> CGPA.

import { useEffect, useMemo, useState } from "react";
import {
  cgpaToPercentage,
  formulaText,
  percentageToCgpa,
  sgpaToCgpa,
} from "../converter/india/cgpaUniversities";
import EnglishModeToggle from "./EnglishModeToggle";
import { parseInput } from "./englishFormHelpers";

export type CgpaFormulaOption = {
  slug: string;
  label: string;
  multiplier: number;
  offset: number;
  scale: number;
};

// Kurumu listede olmayanlar icin genel secenekler.
export const GENERIC_FORMULAS: CgpaFormulaOption[] = [
  { slug: "generic-9-5", label: "Other: CGPA × 9.5", multiplier: 9.5, offset: 0, scale: 10 },
  { slug: "generic-10", label: "Other: CGPA × 10", multiplier: 10, offset: 0, scale: 10 },
];

const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits }).format(value);

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

type Semester = { sgpa: string; credits: string };

export default function CgpaCalculator({
  options,
  initialSlug,
  readQuery = false,
}: {
  options: CgpaFormulaOption[];
  initialSlug?: string;
  /** Adresteki ?university= değerini başlangıç kurumu olarak okur. */
  readQuery?: boolean;
}) {
  const allOptions = useMemo(() => [...options, ...GENERIC_FORMULAS], [options]);
  const [slug, setSlug] = useState(initialSlug ?? allOptions[0].slug);
  useEffect(() => {
    if (!readQuery) return;
    const frame = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search).get("university");
      if (q && allOptions.some((o) => o.slug === q)) setSlug(q);
    });
    return () => cancelAnimationFrame(frame);
  }, [readQuery, allOptions]);
  const [mode, setMode] = useState<"toPercent" | "toCgpa" | "sgpa">("toPercent");
  const [cgpa, setCgpa] = useState("8");
  const [percentage, setPercentage] = useState("75");
  const [semesters, setSemesters] = useState<Semester[]>([
    { sgpa: "8.2", credits: "20" },
    { sgpa: "7.9", credits: "22" },
  ]);

  const formula = allOptions.find((option) => option.slug === slug) ?? allOptions[0];
  const cgpaValue = parseInput(cgpa) ?? Number.NaN;
  const percentResult = cgpaToPercentage(cgpaValue, formula);
  const cgpaResult = percentageToCgpa(parseInput(percentage) ?? Number.NaN, formula);
  const sgpaCgpa = sgpaToCgpa(
    semesters.map((semester) => ({
      sgpa: parseInput(semester.sgpa) ?? Number.NaN,
      credits: parseInput(semester.credits) ?? Number.NaN,
    }))
  );
  const sgpaPercent = sgpaCgpa === null ? null : cgpaToPercentage(sgpaCgpa, formula);

  const updateSemester = (index: number, key: keyof Semester, value: string) =>
    setSemesters((current) => current.map((semester, i) => (i === index ? { ...semester, [key]: value } : semester)));

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>University or board</span>
            <select value={slug} onChange={(event) => setSlug(event.target.value)}>
              {allOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <EnglishModeToggle<"toPercent" | "toCgpa" | "sgpa">
          label="Calculate"
          value={mode}
          onChange={setMode}
          options={[
            { value: "toPercent", label: "CGPA → percentage" },
            { value: "toCgpa", label: "Percentage → CGPA" },
            { value: "sgpa", label: "SGPA → CGPA & %" },
          ]}
        />
        {mode === "toPercent" && (
          <div className="paint-calculator-grid">
            <Field label={`CGPA (out of ${formula.scale})`} value={cgpa} onChange={setCgpa} />
          </div>
        )}
        {mode === "toCgpa" && (
          <div className="paint-calculator-grid">
            <Field label="Percentage (%)" value={percentage} onChange={setPercentage} />
          </div>
        )}
        {mode === "sgpa" && (
          <>
            {semesters.map((semester, index) => (
              <div className="paint-calculator-grid" key={index}>
                <Field label={`Semester ${index + 1} SGPA`} value={semester.sgpa} onChange={(value) => updateSemester(index, "sgpa", value)} />
                <Field label={`Semester ${index + 1} credits`} value={semester.credits} onChange={(value) => updateSemester(index, "credits", value)} />
              </div>
            ))}
            <div className="engineering-target-grid hydrostatic-target-grid">
              {semesters.length < 10 && (
                <button
                  type="button"
                  className="engineering-target-button"
                  onClick={() => setSemesters((current) => [...current, { sgpa: "", credits: "20" }])}
                >
                  + Add semester
                </button>
              )}
              {semesters.length > 1 && (
                <button
                  type="button"
                  className="engineering-target-button"
                  onClick={() => setSemesters((current) => current.slice(0, -1))}
                >
                  − Remove last
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {mode === "toPercent" &&
          (percentResult === null ? (
            <strong>Enter a CGPA between 0 and {formula.scale}.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Percentage</span>
                <strong>{fmt(percentResult)}%</strong>
              </div>
              <div>
                <span>Formula</span>
                <strong>{formulaText(formula)}</strong>
              </div>
            </div>
          ))}
        {mode === "toCgpa" &&
          (cgpaResult === null ? (
            <strong>Enter a percentage this formula can produce (0–100).</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>CGPA</span>
                <strong>{fmt(cgpaResult)}</strong>
              </div>
              <div>
                <span>Formula</span>
                <strong>{formulaText(formula)}</strong>
              </div>
            </div>
          ))}
        {mode === "sgpa" &&
          (sgpaCgpa === null ? (
            <strong>Enter at least one SGPA with its credits.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>CGPA (credit-weighted)</span>
                <strong>{fmt(sgpaCgpa)}</strong>
              </div>
              {sgpaPercent !== null && (
                <div>
                  <span>Percentage</span>
                  <strong>{fmt(sgpaPercent)}%</strong>
                </div>
              )}
            </div>
          ))}
      </div>

      <p className="calculator-usage-hint">
        {formula.slug.startsWith("generic")
          ? "Your university is not listed: this uses a common rule, not an official formula. Check your university's regulations or the conversion note on your marksheet, and request your university at the bottom of the CGPA to percentage page."
          : "Uses the formula from the official source listed on this page. The percentage on an official conversion certificate from your university always takes precedence."}
        {mode === "sgpa" && " CGPA here is the credit-weighted average of your SGPAs; some universities publish the CGPA directly on the final marksheet."}
      </p>
    </div>
  );
}
