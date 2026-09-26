"use client";

import { useMemo, useState } from "react";
import { calculateBodyFat, type BodyFatCategory } from "../converter/bodyFatCalculator";
import type { Sex } from "../converter/englishEverydayFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { CM_PER_INCH_UI, KG_PER_LB, formatNumber, parseInput, type UnitSystem } from "./englishFormHelpers";

const categoryLabels: Record<BodyFatCategory, string> = {
  essential: "Essential fat",
  athletes: "Athletes",
  fitness: "Fitness",
  average: "Average",
  obese: "Obese",
};

// American Council on Exercise (ACE) ranges used by the engine.
const categoryTable = [
  { category: "Essential fat", male: "2–5%", female: "10–13%" },
  { category: "Athletes", male: "6–13%", female: "14–20%" },
  { category: "Fitness", male: "14–17%", female: "21–24%" },
  { category: "Average", male: "18–24%", female: "25–31%" },
  { category: "Obese", male: "25% +", female: "32% +" },
];

export default function EnglishBodyFatCalculator() {
  const [units, setUnits] = useState<UnitSystem>("us");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("70");
  const [neck, setNeck] = useState("15");
  const [waist, setWaist] = useState("34");
  const [hip, setHip] = useState("38");
  const [weight, setWeight] = useState("175");

  const lengthUnit = units === "us" ? "in" : "cm";
  const weightUnit = units === "us" ? "lb" : "kg";
  const result = useMemo(() => {
    const toCm = (value: string) => (parseInput(value) ?? 0) * (units === "us" ? CM_PER_INCH_UI : 1);
    return calculateBodyFat({
      gender: sex,
      heightCm: toCm(height),
      neckCm: toCm(neck),
      waistCm: toCm(waist),
      hipCm: toCm(hip),
    });
  }, [units, sex, height, neck, waist, hip]);

  const weightValue = parseInput(weight);
  const validResult = result && result.bodyFatPercent > 0 && result.bodyFatPercent < 75 ? result : null;

  const switchUnits = (next: UnitSystem) => {
    if (next === units) return;
    const factor = next === "metric" ? CM_PER_INCH_UI : 1 / CM_PER_INCH_UI;
    const convert = (value: string) => {
      const parsed = parseInput(value);
      return parsed === null ? value : formatNumber(parsed * factor, 1).replace(/,/g, "");
    };
    setHeight(convert(height));
    setNeck(convert(neck));
    setWaist(convert(waist));
    setHip(convert(hip));
    const parsedWeight = parseInput(weight);
    if (parsedWeight !== null) {
      setWeight(formatNumber(next === "metric" ? parsedWeight * KG_PER_LB : parsedWeight / KG_PER_LB, 1).replace(/,/g, ""));
    }
    setUnits(next);
  };

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<UnitSystem>
          label="Units"
          value={units}
          onChange={switchUnits}
          options={[
            { value: "us", label: "US (inches, lb)" },
            { value: "metric", label: "Metric (cm, kg)" },
          ]}
        />
        <EnglishModeToggle<Sex>
          label="Sex"
          value={sex}
          onChange={setSex}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Height ({lengthUnit})</span>
            <input inputMode="decimal" type="text" value={height} onChange={(event) => setHeight(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Neck ({lengthUnit})</span>
            <input inputMode="decimal" type="text" value={neck} onChange={(event) => setNeck(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Waist ({lengthUnit})</span>
            <input inputMode="decimal" type="text" value={waist} onChange={(event) => setWaist(event.target.value)} />
          </label>
          {sex === "female" && (
            <label className="category-general-converter-field">
              <span>Hip ({lengthUnit})</span>
              <input inputMode="decimal" type="text" value={hip} onChange={(event) => setHip(event.target.value)} />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Weight ({weightUnit}, optional)</span>
            <input inputMode="decimal" type="text" value={weight} onChange={(event) => setWeight(event.target.value)} />
          </label>
        </div>
        <p className="calculator-usage-hint">
          Measure the neck just below the larynx, the waist at the navel for men and at the narrowest point for
          women, and the hips at the widest point. Keep the tape level and snug, not tight.
        </p>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {validResult ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Body fat (US Navy method)</span>
              <strong>{formatNumber(validResult.bodyFatPercent, 1)}%</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{categoryLabels[validResult.category]}</strong>
            </div>
            {weightValue !== null && weightValue > 0 && (
              <>
                <div>
                  <span>Fat mass</span>
                  <strong>
                    {formatNumber((weightValue * validResult.bodyFatPercent) / 100, 1)} {weightUnit}
                  </strong>
                </div>
                <div>
                  <span>Lean mass</span>
                  <strong>
                    {formatNumber(weightValue * (1 - validResult.bodyFatPercent / 100), 1)} {weightUnit}
                  </strong>
                </div>
              </>
            )}
          </div>
        ) : (
          <strong>Enter valid measurements; the waist must be larger than the neck.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Body fat categories (American Council on Exercise)</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Men</th>
              <th scope="col">Women</th>
            </tr>
          </thead>
          <tbody>
            {categoryTable.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.male}</td>
                <td>{row.female}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Note:</strong> the US Navy tape method is an estimate, usually within a few percentage points of
        lab methods such as DEXA. It is not a medical diagnosis.
      </p>
    </div>
  );
}
