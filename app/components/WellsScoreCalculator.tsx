"use client";

import { useMemo, useState } from "react";
import {
  calculateWellsScore,
  type WellsProbability,
} from "../converter/wellsScoreCalculator";

const probabilityLabels: Record<WellsProbability, string> = {
  dusuk: "Düşük Olasılık",
  orta: "Orta Olasılık",
  yuksek: "Yüksek Olasılık",
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
        Var ({points})
      </span>
    </label>
  );
}

export default function WellsScoreCalculator() {
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
        <CheckField label="DVT belirti/bulguları" points="+3" checked={dvtSigns} onChange={setDvtSigns} />
        <CheckField label="PE en olası tanı" points="+3" checked={peIsTopDiagnosis} onChange={setPeIsTopDiagnosis} />
        <CheckField label="Kalp hızı >100/dk" points="+1,5" checked={heartRateOver100} onChange={setHeartRateOver100} />
        <CheckField label="Son 4 haftada ameliyat/immobilizasyon" points="+1,5" checked={immobilizationOrSurgery} onChange={setImmobilizationOrSurgery} />
        <CheckField label="Önceki DVT/PE öyküsü" points="+1,5" checked={previousDvtOrPe} onChange={setPreviousDvtOrPe} />
        <CheckField label="Hemoptizi" points="+1" checked={hemoptysis} onChange={setHemoptysis} />
        <CheckField label="Malignite (aktif/son 6 ay)" points="+1" checked={malignancy} onChange={setMalignancy} />
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Wells Skoru</span>
            <strong>{result.total}</strong>
          </div>
          <div>
            <span>Klasik (3 Seviyeli) Yorum</span>
            <strong>{probabilityLabels[result.threeTierProbability]}</strong>
          </div>
          <div>
            <span>Basitleştirilmiş (2 Seviyeli) Yorum</span>
            <strong>
              {result.twoTierLikely ? "PE Olası" : "PE Olası Değil"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
