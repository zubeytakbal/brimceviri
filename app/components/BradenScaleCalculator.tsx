"use client";

import { useMemo, useState } from "react";
import {
  calculateBradenScale,
  type BradenRiskCategory,
  type BradenSubScore1to4,
  type FrictionShearScore,
} from "../converter/bradenScaleCalculator";

const categoryLabels: Record<BradenRiskCategory, string> = {
  "cok-yuksek": "Çok Yüksek Risk (≤9)",
  yuksek: "Yüksek Risk (10-12)",
  orta: "Orta Risk (13-14)",
  hafif: "Hafif Risk (15-18)",
  "risk-yok": "Risk Yok (≥19)",
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

export default function BradenScaleCalculator() {
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
          label="Duyusal Algı"
          value={sensoryPerception}
          onChange={(value) =>
            setSensoryPerception(value as BradenSubScore1to4)
          }
          options={[
            { value: 1, label: "1 - Tamamen kısıtlı" },
            { value: 2, label: "2 - Çok sınırlı" },
            { value: 3, label: "3 - Hafif sınırlı" },
            { value: 4, label: "4 - Bozukluk yok" },
          ]}
        />
        <SubScoreField
          label="Nem"
          value={moisture}
          onChange={(value) => setMoisture(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Sürekli nemli" },
            { value: 2, label: "2 - Çoğunlukla nemli" },
            { value: 3, label: "3 - Ara sıra nemli" },
            { value: 4, label: "4 - Nadiren nemli" },
          ]}
        />
        <SubScoreField
          label="Aktivite"
          value={activity}
          onChange={(value) => setActivity(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Yatağa bağımlı" },
            { value: 2, label: "2 - Sandalyeye bağımlı" },
            { value: 3, label: "3 - Ara sıra yürüyor" },
            { value: 4, label: "4 - Sık sık yürüyor" },
          ]}
        />
        <SubScoreField
          label="Hareketlilik"
          value={mobility}
          onChange={(value) => setMobility(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Tamamen hareketsiz" },
            { value: 2, label: "2 - Çok sınırlı" },
            { value: 3, label: "3 - Hafif sınırlı" },
            { value: 4, label: "4 - Kısıtlama yok" },
          ]}
        />
        <SubScoreField
          label="Beslenme"
          value={nutrition}
          onChange={(value) => setNutrition(value as BradenSubScore1to4)}
          options={[
            { value: 1, label: "1 - Çok yetersiz" },
            { value: 2, label: "2 - Muhtemelen yetersiz" },
            { value: 3, label: "3 - Yeterli" },
            { value: 4, label: "4 - Çok iyi" },
          ]}
        />
        <SubScoreField
          label="Sürtünme ve Kayma"
          value={frictionShear}
          onChange={(value) =>
            setFrictionShear(value as FrictionShearScore)
          }
          options={[
            { value: 1, label: "1 - Sorunlu" },
            { value: 2, label: "2 - Potansiyel sorun" },
            { value: 3, label: "3 - Belirgin sorun yok" },
          ]}
        />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Braden Toplam Puan</span>
            <strong>{result.total} / 23</strong>
          </div>
          <div>
            <span>Risk Kategorisi</span>
            <strong>{categoryLabels[result.category]}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
