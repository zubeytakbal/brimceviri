"use client";

import { useMemo, useState } from "react";
import { finalExamScoreNeeded, usLetterGrade, usLetterGradeScale, weightedGrade } from "../converter/englishEverydayFormulas";
import { formatNumber, parseInput } from "./englishFormHelpers";

type Row = { id: number; name: string; score: string; weight: string };

const initialRows: Row[] = [
  { id: 1, name: "Homework", score: "92", weight: "20" },
  { id: 2, name: "Quizzes", score: "85", weight: "20" },
  { id: 3, name: "Midterm exam", score: "78", weight: "30" },
];

export default function EnglishGradeCalculator() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [target, setTarget] = useState("90");
  const [finalWeight, setFinalWeight] = useState("30");

  const current = useMemo(
    () =>
      weightedGrade(
        rows.map((row) => ({ score: parseInput(row.score) ?? NaN, weight: parseInput(row.weight) ?? NaN }))
      ),
    [rows]
  );

  const needed = useMemo(() => {
    const targetValue = parseInput(target);
    const weightValue = parseInput(finalWeight);
    if (!current || targetValue === null || weightValue === null) return null;
    return finalExamScoreNeeded(current.percent, targetValue, weightValue);
  }, [current, target, finalWeight]);

  const updateRow = (id: number, field: keyof Omit<Row, "id">, value: string) =>
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Enter each assignment or category with its grade (%) and weight (%). Weights do not need to add up to
          100 – the calculator uses the weights you have entered so far.
        </p>

        {rows.map((row, index) => (
          <div className="paint-calculator-grid" key={row.id}>
            <label className="category-general-converter-field">
              <span>Assignment {index + 1}</span>
              <input type="text" value={row.name} onChange={(event) => updateRow(row.id, "name", event.target.value)} />
            </label>
            <label className="category-general-converter-field">
              <span>Grade (%)</span>
              <input inputMode="decimal" type="text" value={row.score} onChange={(event) => updateRow(row.id, "score", event.target.value)} />
            </label>
            <label className="category-general-converter-field">
              <span>Weight (%)</span>
              <input inputMode="decimal" type="text" value={row.weight} onChange={(event) => updateRow(row.id, "weight", event.target.value)} />
            </label>
          </div>
        ))}

        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className="engineering-target-button"
            onClick={() => setRows((previous) => [...previous, { id: Date.now(), name: "", score: "", weight: "" }])}
          >
            + Add assignment
          </button>
          {rows.length > 1 && (
            <button type="button" className="engineering-target-button" onClick={() => setRows((previous) => previous.slice(0, -1))}>
              Remove last
            </button>
          )}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {current ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Current grade</span>
              <strong>{formatNumber(current.percent, 2)}%</strong>
            </div>
            <div>
              <span>Letter grade</span>
              <strong>{current.letter}</strong>
            </div>
            <div>
              <span>Weight entered</span>
              <strong>{formatNumber(current.totalWeight, 1)}%</strong>
            </div>
          </div>
        ) : (
          <strong>Enter at least one grade with a weight above 0.</strong>
        )}
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>What do I need on the final exam?</span>
        </div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Target course grade (%)</span>
            <input inputMode="decimal" type="text" value={target} onChange={(event) => setTarget(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Final exam weight (%)</span>
            <input inputMode="decimal" type="text" value={finalWeight} onChange={(event) => setFinalWeight(event.target.value)} />
          </label>
        </div>
        <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
          {needed === null || !current ? (
            <strong>Enter your grades above, a target grade and a final exam weight between 1 and 99.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Score needed on the final</span>
                <strong>{formatNumber(Math.max(needed, 0), 1)}%</strong>
              </div>
              <div>
                <span>What it means</span>
                <strong>
                  {needed > 100
                    ? "Not reachable without extra credit"
                    : needed <= 0
                      ? "Already secured"
                      : `A final grade of ${usLetterGrade(needed)} or better`}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Common US letter grade scale (your school may differ)</caption>
          <thead>
            <tr>
              <th scope="col">Letter</th>
              <th scope="col">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {usLetterGradeScale.map((row, index) => {
              const upper = index === 0 ? 100 : usLetterGradeScale[index - 1].min - 1;
              return (
                <tr key={row.letter}>
                  <td>{row.letter}</td>
                  <td>{row.min === 0 ? `Below ${usLetterGradeScale[index - 1].min}` : `${row.min}–${upper}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
