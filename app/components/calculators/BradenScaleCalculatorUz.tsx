"use client";

import { useMemo, useState } from "react";
import {
  calculateBradenScale,
  type BradenRiskCategory,
  type BradenSubScore1to4,
  type FrictionShearScore,
} from "../../converter/bradenScaleCalculator";

const categoryLabelsUz: Record<BradenRiskCategory, string> = {
  "cok-yuksek": "Juda Yuqori Xavf (≤9)",
  yuksek: "Yuqori Xavf (10-12)",
  orta: "O'rtacha Xavf (13-14)",
  hafif: "Yengil Xavf (15-18)",
  "risk-yok": "Xavf Yo'q (≥19)",
};

function SubScoreField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: { value: number; label: string }[];
}) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function BradenScaleCalculatorUz() {
  const [sensoryPerception, setSensoryPerception] =
    useState<BradenSubScore1to4>(4);
  const [moisture, setMoisture] = useState<BradenSubScore1to4>(4);
  const [activity, setActivity] = useState<BradenSubScore1to4>(4);
  const [mobility, setMobility] = useState<BradenSubScore1to4>(4);
  const [nutrition, setNutrition] = useState<BradenSubScore1to4>(4);
  const [frictionShear, setFrictionShear] = useState<FrictionShearScore>(3);

  const result = useMemo(
    () =>
      calculateBradenScale({
        sensoryPerception,
        moisture,
        activity,
        mobility,
        nutrition,
        frictionShear,
      }),
    [sensoryPerception, moisture, activity, mobility, nutrition, frictionShear]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <SubScoreField
          label="Sezgi Idroki"
          value={sensoryPerception}
          onChange={(value) =>
            setSensoryPerception(value as BradenSubScore1to4)
          }
          options={[
            { value: 1, label: "1 - Butunlay cheklangan" },
            { value: 2, label: "2 - Juda cheklangan" },
            { value: 3, label: "3 - Yengil cheklangan" },
            { value: 4, label: "4 - Buzilish yo'q" },
          ]}
        />
        <SubScoreField
          label="Namlik"
          value={moisture}
          onChange={(value) => setMoisture(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Doimiy nam" },
            { value: 2, label: "2 - Ko'pincha nam" },
            { value: 3, label: "3 - Vaqti-vaqti bilan nam" },
            { value: 4, label: "4 - Kamdan-kam nam" },
          ]}
        />
        <SubScoreField
          label="Faollik"
          value={activity}
          onChange={(value) => setActivity(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - To'shakka bog'liq" },
            { value: 2, label: "2 - Stulga bog'liq" },
            { value: 3, label: "3 - Vaqti-vaqti bilan yuradi" },
            { value: 4, label: "4 - Tez-tez yuradi" },
          ]}
        />
        <SubScoreField
          label="Harakatchanlik"
          value={mobility}
          onChange={(value) => setMobility(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Butunlay harakatsiz" },
            { value: 2, label: "2 - Juda cheklangan" },
            { value: 3, label: "3 - Yengil cheklangan" },
            { value: 4, label: "4 - Cheklov yo'q" },
          ]}
        />
        <SubScoreField
          label="Ovqatlanish"
          value={nutrition}
          onChange={(value) => setNutrition(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Juda yetarsiz" },
            { value: 2, label: "2 - Ehtimol yetarsiz" },
            { value: 3, label: "3 - Yetarli" },
            { value: 4, label: "4 - Juda yaxshi" },
          ]}
        />
        <SubScoreField
          label="Ishqalanish va Sirpanish"
          value={frictionShear}
          onChange={(value) =>
            setFrictionShear(value as FrictionShearScore)
          }
          options={[
            { value: 1, label: "1 - Muammoli" },
            { value: 2, label: "2 - Potensial muammo" },
            { value: 3, label: "3 - Sezilarli muammo yo'q" },
          ]}
        />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Braden Jami Ball</span>
            <strong>{result.total} / 23</strong>
          </div>
          <div>
            <span>Xavf Kategoriyasi</span>
            <strong>{categoryLabelsUz[result.category]}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
