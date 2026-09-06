"use client";

import { useMemo, useState } from "react";
import {
  calculateMorseFallScale,
  type AmbulatoryAid,
  type Gait,
  type MorseRiskCategory,
} from "../converter/morseFallScaleCalculator";

const categoryLabels: Record<MorseRiskCategory, string> = {
  dusuk: "Düşük Risk (0-24)",
  orta: "Orta Risk (25-44)",
  yuksek: "Yüksek Risk (≥45)",
};

export default function MorseFallScaleCalculator() {
  const [historyOfFalling, setHistoryOfFalling] = useState(false);
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState(false);
  const [ambulatoryAid, setAmbulatoryAid] = useState<AmbulatoryAid>("none");
  const [ivOrHeparinLock, setIvOrHeparinLock] = useState(false);
  const [gait, setGait] = useState<Gait>("normal");
  const [forgetsLimitations, setForgetsLimitations] = useState(false);

  const result = useMemo(
    () =>
      calculateMorseFallScale({
        historyOfFalling,
        secondaryDiagnosis,
        ambulatoryAid,
        ivOrHeparinLock,
        gait,
        forgetsLimitations,
      }),
    [
      historyOfFalling,
      secondaryDiagnosis,
      ambulatoryAid,
      ivOrHeparinLock,
      gait,
      forgetsLimitations,
    ]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Düşme öyküsü (şimdiki başvuru/son 3 ay)</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={historyOfFalling}
              onChange={(event) => setHistoryOfFalling(event.target.checked)}
            />
            Var (+25)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>İkincil tanı var mı</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={secondaryDiagnosis}
              onChange={(event) =>
                setSecondaryDiagnosis(event.target.checked)
              }
            />
            Var (+15)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yürüme Yardımcısı</span>
          <select
            value={ambulatoryAid}
            onChange={(event) =>
              setAmbulatoryAid(event.target.value as AmbulatoryAid)
            }
          >
            <option value="none">Yok / yatak istirahati / hemşire yardımı (+0)</option>
            <option value="crutchesCaneWalker">Koltuk değneği / baston / walker (+15)</option>
            <option value="furniture">Eşyalara tutunarak (+30)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>IV / Heparin kilidi takılı mı</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={ivOrHeparinLock}
              onChange={(event) => setIvOrHeparinLock(event.target.checked)}
            />
            Var (+20)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yürüyüş (Gait)</span>
          <select
            value={gait}
            onChange={(event) => setGait(event.target.value as Gait)}
          >
            <option value="normal">Normal / yatak istirahati / tekerlekli sandalye (+0)</option>
            <option value="weak">Zayıf (+10)</option>
            <option value="impaired">Bozuk (+20)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Kendi kısıtlılığını unutuyor mu</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={forgetsLimitations}
              onChange={(event) =>
                setForgetsLimitations(event.target.checked)
              }
            />
            Evet (+15)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Morse Düşme Skoru</span>
            <strong>{result.total} / 125</strong>
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
