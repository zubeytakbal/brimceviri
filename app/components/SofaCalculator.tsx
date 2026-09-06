"use client";

import { useMemo, useState } from "react";
import { calculateSofa, type SofaSubScore } from "../converter/sofaCalculator";

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

export default function SofaCalculator() {
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
          label="Solunum (PaO₂/FiO₂)"
          value={respiratory}
          onChange={setRespiratory}
          options={[
            { value: 0, label: "0 - ≥400" },
            { value: 1, label: "1 - <400" },
            { value: 2, label: "2 - <300" },
            { value: 3, label: "3 - <200 (solunum desteğiyle)" },
            { value: 4, label: "4 - <100 (solunum desteğiyle)" },
          ]}
        />
        <SubScoreField
          label="Koagülasyon (Trombosit, ×10³/µL)"
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
          label="Karaciğer (Bilirubin, mg/dL)"
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
          label="Kardiyovasküler (Ortalama Arter Basıncı / Vazopressör)"
          value={cardiovascular}
          onChange={setCardiovascular}
          options={[
            { value: 0, label: "0 - MAP ≥70 mmHg" },
            { value: 1, label: "1 - MAP <70 mmHg" },
            { value: 2, label: "2 - Düşük doz vazopressör" },
            { value: 3, label: "3 - Orta doz vazopressör" },
            { value: 4, label: "4 - Yüksek doz vazopressör" },
          ]}
        />
        <SubScoreField
          label="Santral Sinir Sistemi (GKS)"
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
          label="Böbrek (Kreatinin mg/dL / İdrar Çıkışı)"
          value={renal}
          onChange={setRenal}
          options={[
            { value: 0, label: "0 - <1,2" },
            { value: 1, label: "1 - 1,2-1,9" },
            { value: 2, label: "2 - 2,0-3,4" },
            { value: 3, label: "3 - 3,5-4,9 veya idrar <500 mL/gün" },
            { value: 4, label: "4 - ≥5,0 veya idrar <200 mL/gün" },
          ]}
        />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>SOFA Toplam Puan</span>
            <strong>{total} / 24</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
