"use client";

import { useMemo, useState } from "react";
import {
  calculateWellsScore,
  type WellsProbability,
} from "../../converter/wellsScoreCalculator";

const probabilityLabelsUz: Record<WellsProbability, string> = {
  dusuk: "Past Ehtimol",
  orta: "O'rtacha Ehtimol",
  yuksek: "Yuqori Ehtimol",
};

function CheckField({
  label,
  points,
  checked,
  onChange,
}: {
  label: string;
  points: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="category-general-converter-field paint-calculator-checkbox-field">
      <span>{label}</span>
      <span className="paint-calculator-checkbox-row">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        Bor ({points})
      </span>
    </label>
  );
}

export default function WellsScoreCalculatorUz() {
  const [dvtSigns, setDvtSigns] = useState(false);
  const [peIsTopDiagnosis, setPeIsTopDiagnosis] = useState(false);
  const [heartRateOver100, setHeartRateOver100] = useState(false);
  const [immobilizationOrSurgery, setImmobilizationOrSurgery] =
    useState(false);
  const [previousDvtOrPe, setPreviousDvtOrPe] = useState(false);
  const [hemoptysis, setHemoptysis] = useState(false);
  const [malignancy, setMalignancy] = useState(false);

  const result = useMemo(
    () =>
      calculateWellsScore({
        dvtSigns,
        peIsTopDiagnosis,
        heartRateOver100,
        immobilizationOrSurgery,
        previousDvtOrPe,
        hemoptysis,
        malignancy,
      }),
    [
      dvtSigns,
      peIsTopDiagnosis,
      heartRateOver100,
      immobilizationOrSurgery,
      previousDvtOrPe,
      hemoptysis,
      malignancy,
    ]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <CheckField label="ChVT belgi/topilmalari" points="+3" checked={dvtSigns} onChange={setDvtSigns} />
        <CheckField label="PE eng ehtimolli tashxis" points="+3" checked={peIsTopDiagnosis} onChange={setPeIsTopDiagnosis} />
        <CheckField label="Yurak urishi >100/daq" points="+1,5" checked={heartRateOver100} onChange={setHeartRateOver100} />
        <CheckField label="So'nggi 4 haftada operatsiya/immobilizatsiya" points="+1,5" checked={immobilizationOrSurgery} onChange={setImmobilizationOrSurgery} />
        <CheckField label="Oldingi ChVT/PE tarixi" points="+1,5" checked={previousDvtOrPe} onChange={setPreviousDvtOrPe} />
        <CheckField label="Qon tupurish (gemoptizi)" points="+1" checked={hemoptysis} onChange={setHemoptysis} />
        <CheckField label="Malignlik (faol/so'nggi 6 oy)" points="+1" checked={malignancy} onChange={setMalignancy} />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Wells Balli</span>
            <strong>{result.total}</strong>
          </div>
          <div>
            <span>Klassik (3 Darajali) Talqin</span>
            <strong>{probabilityLabelsUz[result.threeTierProbability]}</strong>
          </div>
          <div>
            <span>Soddalashtirilgan (2 Darajali) Talqin</span>
            <strong>
              {result.twoTierLikely ? "PE Ehtimoli Bor" : "PE Ehtimoli Yo'q"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
