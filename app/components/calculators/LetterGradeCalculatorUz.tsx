"use client";

import { useState } from "react";
import { getLetterGrade, letterGradeScale } from "../../converter/letterGradeCalculatorUz";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function LetterGradeCalculatorUz() {
  const [scoreInput, setScoreInput] = useState("87");

  const score = parseNumericValue(scoreInput);
  const grade = score !== null ? getLetterGrade(score) : null;
  const invalid = scoreInput.trim().length > 0 && !grade;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>100 Balli Baho</span>
          <input
            type="text"
            inputMode="decimal"
            value={scoreInput}
            onChange={(event) => setScoreInput(event.target.value)}
            placeholder="0-100 oralig'ida"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>To&apos;g&apos;ri baho kiriting (0-100 oralig&apos;ida).</strong>
        ) : !grade ? (
          <strong>Bahoni kiritib harf bahosini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>
            Harf Bahosi: {grade.letter} (4,0 balli tizimda {grade.gpa.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })})
          </strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Xalqaro miqyosda GPA hisob-kitobida ishlatiladigan mos yozuv jadvali — o&apos;z ta&apos;lim muassasangizning aniq mezonlarini tekshiring</caption>
          <thead>
            <tr>
              <th scope="col">Baho Oralig&apos;i</th>
              <th scope="col">Harf Bahosi</th>
              <th scope="col">4,0 Balli Tizim</th>
            </tr>
          </thead>
          <tbody>
            {letterGradeScale.map((row, index) => {
              const upperBound = index === 0 ? 100 : letterGradeScale[index - 1].minScore - 1;
              const isActive = grade?.letter === row.letter;
              return (
                <tr key={row.letter} className={isActive ? "is-active" : undefined}>
                  <td>
                    {row.minScore}-{upperBound}
                  </td>
                  <td>{row.letter}</td>
                  <td>{row.gpa.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
