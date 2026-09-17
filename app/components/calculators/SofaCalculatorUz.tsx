"use client";

import { useMemo, useState } from "react";
import { calculateSofa, type SofaSubScore } from "../../converter/sofaCalculator";

function SubScoreField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: SofaSubScore;
  onChange: (value: SofaSubScore) => void;
  options: { value: SofaSubScore; label: string }[];
}) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value) as SofaSubScore)
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SofaCalculatorUz() {
  const [respiratory, setRespiratory] = useState<SofaSubScore>(0);
  const [coagulation, setCoagulation] = useState<SofaSubScore>(0);
  const [liver, setLiver] = useState<SofaSubScore>(0);
  const [cardiovascular, setCardiovascular] = useState<SofaSubScore>(0);
  const [cns, setCns] = useState<SofaSubScore>(0);
  const [renal, setRenal] = useState<SofaSubScore>(0);

  const total = useMemo(
    () =>
      calculateSofa({
        respiratory,
        coagulation,
        liver,
        cardiovascular,
        cns,
        renal,
      }),
    [respiratory, coagulation, liver, cardiovascular, cns, renal]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <SubScoreField
          label="Nafas Olish (PaO₂/FiO₂)"
          value={respiratory}
          onChange={setRespiratory}
          options={[
            { value: 0, label: "0 - ≥400" },
            { value: 1, label: "1 - <400" },
            { value: 2, label: "2 - <300" },
            { value: 3, label: "3 - <200 (nafas yordami bilan)" },
            { value: 4, label: "4 - <100 (nafas yordami bilan)" },
          ]}
        />
        <SubScoreField
          label="Koagulyatsiya (Trombotsit, ×10³/µL)"
          value={coagulation}
          onChange={setCoagulation}
          options={[
            { value: 0, label: "0 - ≥150" },
            { value: 1, label: "1 - <150" },
            { value: 2, label: "2 - <100" },
            { value: 3, label: "3 - <50" },
            { value: 4, label: "4 - <20" },
          ]}
        />
        <SubScoreField
          label="Jigar (Bilirubin, mg/dL)"
          value={liver}
          onChange={setLiver}
          options={[
            { value: 0, label: "0 - <1,2" },
            { value: 1, label: "1 - 1,2-1,9" },
            { value: 2, label: "2 - 2,0-5,9" },
            { value: 3, label: "3 - 6,0-11,9" },
            { value: 4, label: "4 - ≥12,0" },
          ]}
        />
        <SubScoreField
          label="Yurak-Qon Tomir (O'rtacha Arterial Bosim / Vazopressor)"
          value={cardiovascular}
          onChange={setCardiovascular}
          options={[
            { value: 0, label: "0 - MAP ≥70 mmHg" },
            { value: 1, label: "1 - MAP <70 mmHg" },
            { value: 2, label: "2 - Past doza vazopressor" },
            { value: 3, label: "3 - O'rtacha doza vazopressor" },
            { value: 4, label: "4 - Yuqori doza vazopressor" },
          ]}
        />
        <SubScoreField
          label="Markaziy Asab Tizimi (GKS)"
          value={cns}
          onChange={setCns}
          options={[
            { value: 0, label: "0 - 15" },
            { value: 1, label: "1 - 13-14" },
            { value: 2, label: "2 - 10-12" },
            { value: 3, label: "3 - 6-9" },
            { value: 4, label: "4 - <6" },
          ]}
        />
        <SubScoreField
          label="Buyrak (Kreatinin mg/dL / Siydik Chiqishi)"
          value={renal}
          onChange={setRenal}
          options={[
            { value: 0, label: "0 - <1,2" },
            { value: 1, label: "1 - 1,2-1,9" },
            { value: 2, label: "2 - 2,0-3,4" },
            { value: 3, label: "3 - 3,5-4,9 yoki siydik <500 mL/kun" },
            { value: 4, label: "4 - ≥5,0 yoki siydik <200 mL/kun" },
          ]}
        />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>SOFA Jami Ball</span>
            <strong>{total} / 24</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
