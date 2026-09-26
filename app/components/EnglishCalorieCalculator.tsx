"use client";

import { useMemo, useState } from "react";
import { calorieTargets, tdeeActivityLevels, type Sex, type TdeeActivityId } from "../converter/englishEverydayFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { CM_PER_INCH_UI, KG_PER_LB, formatNumber, parseInput, type UnitSystem } from "./englishFormHelpers";

export default function EnglishCalorieCalculator() {
  const [units, setUnits] = useState<UnitSystem>("us");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("10");
  const [cm, setCm] = useState("178");
  const [pounds, setPounds] = useState("175");
  const [kg, setKg] = useState("80");
  const [activity, setActivity] = useState<TdeeActivityId>("moderate");

  const result = useMemo(() => {
    const heightCm = units === "us" ? ((parseInput(feet) ?? 0) * 12 + (parseInput(inches) ?? 0)) * CM_PER_INCH_UI : parseInput(cm) ?? 0;
    const weightKg = units === "us" ? (parseInput(pounds) ?? 0) * KG_PER_LB : parseInput(kg) ?? 0;
    const ageValue = parseInput(age) ?? 0;
    if (ageValue < 15 || ageValue > 100) return null;
    return calorieTargets(sex, weightKg, heightCm, ageValue, activity);
  }, [units, sex, age, feet, inches, cm, pounds, kg, activity]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<UnitSystem>
          label="Units"
          value={units}
          onChange={setUnits}
          options={[
            { value: "us", label: "US (ft, lb)" },
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
            <span>Age (15–100)</span>
            <input inputMode="numeric" type="text" value={age} onChange={(event) => setAge(event.target.value)} />
          </label>
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
              <label className="category-general-converter-field">
                <span>Weight (lb)</span>
                <input inputMode="decimal" type="text" value={pounds} onChange={(event) => setPounds(event.target.value)} />
              </label>
            </>
          ) : (
            <>
              <label className="category-general-converter-field">
                <span>Height (cm)</span>
                <input inputMode="decimal" type="text" value={cm} onChange={(event) => setCm(event.target.value)} />
              </label>
              <label className="category-general-converter-field">
                <span>Weight (kg)</span>
                <input inputMode="decimal" type="text" value={kg} onChange={(event) => setKg(event.target.value)} />
              </label>
            </>
          )}
        </div>
          <label className="category-general-converter-field">
          <span>Activity level</span>
          <select value={activity} onChange={(event) => setActivity(event.target.value as TdeeActivityId)}>
            {tdeeActivityLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Maintenance calories (TDEE)</span>
              <strong>{formatNumber(result.tdee, 0)} kcal/day</strong>
            </div>
            <div>
              <span>Basal metabolic rate (BMR)</span>
              <strong>{formatNumber(result.bmr, 0)} kcal/day</strong>
            </div>
          </div>
        ) : (
          <strong>Enter an age between 15 and 100 and a valid height and weight.</strong>
        )}
      </div>

      {result && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Daily calories by goal</caption>
            <thead>
              <tr>
                <th scope="col">Goal</th>
                <th scope="col">Calories per day</th>
              </tr>
            </thead>
            <tbody>
              {result.goals.map((goal) => (
                <tr key={goal.id}>
                  <td>{goal.label}</td>
                  <td>{formatNumber(goal.calories, 0)} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Note:</strong> estimates use the Mifflin-St Jeor equation. Weight-loss targets are not shown below{" "}
        {result ? formatNumber(result.minimumCalories, 0) : "1,200–1,500"} kcal/day. This is general information, not
        medical advice – talk to a doctor or dietitian before a large change in diet, and for pregnancy, medical
        conditions or athletes.
      </p>
    </div>
  );
}
