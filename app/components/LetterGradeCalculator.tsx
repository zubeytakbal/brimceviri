"use client";

import { useState } from "react";
import { getLetterGrade, letterGradeScale } from "../converter/letterGradeCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function LetterGradeCalculator() {
  const [scoreInput, setScoreInput] = useState("87");

  const score = parseNumericValue(scoreInput);
  const grade = score !== null ? getLetterGrade(score) : null;
  const invalid = scoreInput.trim().length > 0 && !grade;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>100&apos;lük Puan</span>
          <input
            type="text"
            inputMode="decimal"
            value={scoreInput}
            onChange={(event) => setScoreInput(event.target.value)}
            placeholder="0-100 arası"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli bir puan gir (0-100 arası).</strong>
        ) : !grade ? (
          <strong>Bir puan girerek harf notunu görebilirsin.</strong>
        ) : (
          <strong>
            Harf Notu: {grade.letter} (4&apos;lük sistemde {grade.gpa.toLocaleString("tr-TR", { maximumFractionDigits: 1 })})
          </strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Yaygın kullanılan referans tablo — kurumunun kendi ölçütünü kontrol et</caption>
          <thead>
            <tr>
              <th scope="col">Puan Aralığı</th>
              <th scope="col">Harf Notu</th>
              <th scope="col">4&apos;lük Sistem</th>
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
                  <td>{row.gpa.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
