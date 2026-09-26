"use client";

import { useMemo, useState } from "react";
import { cmToFeetInches, feetInchesToCm } from "../converter/englishEverydayFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

type Mode = "cm-to-ft" | "ft-to-cm";

const referenceHeights = Array.from({ length: 13 }, (_, index) => 150 + index * 5);

function formatFeetInches(cm: number) {
  const result = cmToFeetInches(cm);
  if (!result) return "–";
  return `${result.feet} ft ${formatNumber(result.inches, 1)} in (${result.feet}′${Math.round(result.inches)}″)`;
}

export default function EnglishHeightConverter() {
  const [mode, setMode] = useState<Mode>("cm-to-ft");
  const [cm, setCm] = useState("175");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("9");

  const result = useMemo(() => {
    if (mode === "cm-to-ft") {
      const value = parseInput(cm);
      const converted = value === null ? null : cmToFeetInches(value);
      return converted ? { heading: `${formatNumber(value!, 1)} cm`, main: `${converted.feet} ft ${formatNumber(converted.inches, 1)} in`, extra: `${formatNumber(converted.totalInches, 2)} inches in total` } : null;
    }
    const cmValue = feetInchesToCm(parseInput(feet) ?? 0, parseInput(inches) ?? 0);
    return cmValue ? { heading: `${feet || 0} ft ${inches || 0} in`, main: `${formatNumber(cmValue, 1)} cm`, extra: `${formatNumber(cmValue / 100, 3)} m` } : null;
  }, [mode, cm, feet, inches]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<Mode>
          label="Convert"
          value={mode}
          onChange={setMode}
          options={[
            { value: "cm-to-ft", label: "cm → feet and inches" },
            { value: "ft-to-cm", label: "feet and inches → cm" },
          ]}
        />

        {mode === "cm-to-ft" ? (
          <label className="category-general-converter-field">
            <span>Height in centimeters</span>
            <input inputMode="decimal" type="text" value={cm} onChange={(event) => setCm(event.target.value)} />
          </label>
        ) : (
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Feet</span>
              <input inputMode="numeric" type="text" value={feet} onChange={(event) => setFeet(event.target.value)} />
            </label>
            <label className="category-general-converter-field">
              <span>Inches</span>
              <input inputMode="decimal" type="text" value={inches} onChange={(event) => setInches(event.target.value)} />
            </label>
          </div>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{result.heading} is</span>
              <strong>{result.main}</strong>
            </div>
            <div>
              <span>Also</span>
              <strong>{result.extra}</strong>
            </div>
          </div>
        ) : (
          <strong>Enter a valid height to see the result.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Common heights in centimeters and feet</caption>
          <thead>
            <tr>
              <th scope="col">Centimeters</th>
              <th scope="col">Feet and inches</th>
            </tr>
          </thead>
          <tbody>
            {referenceHeights.map((value) => (
              <tr key={value}>
                <td>{value} cm</td>
                <td>{formatFeetInches(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
