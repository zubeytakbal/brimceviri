"use client";

import { useMemo, useState } from "react";
import { idealWeights, type Sex } from "../converter/englishEverydayFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { CM_PER_INCH_UI, KG_PER_LB, formatNumber, parseInput, type UnitSystem } from "./englishFormHelpers";

export default function EnglishIdealWeightCalculator() {
  const [units, setUnits] = useState<UnitSystem>("us");
  const [sex, setSex] = useState<Sex>("female");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("6");
  const [cm, setCm] = useState("168");

  const heightCm =
    units === "us" ? ((parseInput(feet) ?? 0) * 12 + (parseInput(inches) ?? 0)) * CM_PER_INCH_UI : parseInput(cm) ?? 0;
  const result = useMemo(() => (heightCm >= 120 && heightCm <= 230 ? idealWeights(sex, heightCm) : null), [sex, heightCm]);

  const show = (kg: number) =>
    units === "us" ? `${formatNumber(kg / KG_PER_LB, 0)} lb` : `${formatNumber(kg, 1)} kg`;
  const secondary = (kg: number) =>
    units === "us" ? `${formatNumber(kg, 1)} kg` : `${formatNumber(kg / KG_PER_LB, 0)} lb`;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<UnitSystem>
          label="Units"
          value={units}
          onChange={setUnits}
          options={[
            { value: "us", label: "US (ft, in)" },
            { value: "metric", label: "Metric (cm)" },
          ]}
        />
        <EnglishModeToggle<Sex>
          label="Sex"
          value={sex}
          onChange={setSex}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        />
        <div className="paint-calculator-grid">
          {units === "us" ? (
            <>
              <label className="category-general-converter-field">
                <span>Height (ft)</span>
                <input inputMode="numeric" type="text" value={feet} onChange={(event) => setFeet(event.target.value)} />
              </label>
              <label className="category-general-converter-field">
                <span>Height (in)</span>
                <input inputMode="decimal" type="text" value={inches} onChange={(event) => setInches(event.target.value)} />
              </label>
            </>
          ) : (
            <label className="category-general-converter-field">
              <span>Height (cm)</span>
              <input inputMode="decimal" type="text" value={cm} onChange={(event) => setCm(event.target.value)} />
            </label>
          )}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Healthy weight range (BMI 18.5–24.9)</span>
              <strong>
                {show(result.healthyBmiRangeKg[0])} – {show(result.healthyBmiRangeKg[1])}
              </strong>
            </div>
            <div>
              <span>Average of the four formulas</span>
              <strong>{show(result.formulas.reduce((sum, formula) => sum + formula.kg, 0) / result.formulas.length)}</strong>
            </div>
          </div>
        ) : (
          <strong>Enter a height between 4 ft (120 cm) and 7 ft 6 in (230 cm).</strong>
        )}
      </div>

      {result && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Ideal body weight by formula</caption>
            <thead>
              <tr>
                <th scope="col">Formula</th>
                <th scope="col">Ideal weight</th>
                <th scope="col">{units === "us" ? "In kilograms" : "In pounds"}</th>
              </tr>
            </thead>
            <tbody>
              {result.formulas.map((formula) => (
                <tr key={formula.id}>
                  <td>{formula.name}</td>
                  <td>{show(formula.kg)}</td>
                  <td>{secondary(formula.kg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        {result?.belowFiveFeet && (
          <>
            <strong>Below 5 ft:</strong> the formulas were built for heights above 5 ft, so the results use the 5 ft
            base value. Rely on the BMI range instead.{" "}
          </>
        )}
        <strong>Note:</strong> ideal weight formulas were designed for medication dosing and do not account for
        muscle mass, frame size or age. Use them as a rough reference, not a target.
      </p>
    </div>
  );
}
