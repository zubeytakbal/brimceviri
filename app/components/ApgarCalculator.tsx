"use client";

import { useMemo, useState } from "react";
import {
  calculateApgar,
  type ApgarCategory,
  type CriterionScore,
} from "../converter/apgarCalculator";

const categoryLabels: Record<ApgarCategory, string> = {
  normal: "Normal (7-10)",
  "orta-depresyon": "Orta Düzeyde Depresyon (4-6)",
  "ciddi-depresyon": "Ciddi Depresyon (0-3)",
};

export default function ApgarCalculator() {
  const [appearance, setAppearance] = useState<CriterionScore>(2);
  const [pulse, setPulse] = useState<CriterionScore>(2);
  const [grimace, setGrimace] = useState<CriterionScore>(2);
  const [activity, setActivity] = useState<CriterionScore>(2);
  const [respiration, setRespiration] = useState<CriterionScore>(2);

  const result = useMemo(
    () =>
      calculateApgar({ appearance, pulse, grimace, activity, respiration }),
    [appearance, pulse, grimace, activity, respiration]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Görünüm (Cilt Rengi)</span>
          <select
            value={appearance}
            onChange={(event) =>
              setAppearance(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Tamamen pembe</option>
            <option value={1}>1 - Gövde pembe, ekstremiteler mavi</option>
            <option value={0}>0 - Tamamen mavi/soluk</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Nabız</span>
          <select
            value={pulse}
            onChange={(event) =>
              setPulse(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - ≥100/dk</option>
            <option value={1}>1 - &lt;100/dk</option>
            <option value={0}>0 - Yok</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Refleks (Grimace)</span>
          <select
            value={grimace}
            onChange={(event) =>
              setGrimace(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Öksürük/aksırık/ağlama</option>
            <option value={1}>1 - Yüz buruşturma</option>
            <option value={0}>0 - Yanıt yok</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Aktivite (Kas Tonusu)</span>
          <select
            value={activity}
            onChange={(event) =>
              setActivity(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Aktif hareket</option>
            <option value={1}>1 - Bir miktar fleksiyon</option>
            <option value={0}>0 - Gevşek (flask)</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Solunum</span>
          <select
            value={respiration}
            onChange={(event) =>
              setRespiration(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - İyi, güçlü ağlama</option>
            <option value={1}>1 - Yavaş/düzensiz</option>
            <option value={0}>0 - Yok</option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli seçimler yaparak sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>APGAR Toplam Puan</span>
              <strong>{result.total} / 10</strong>
            </div>
            <div>
              <span>Kategori</span>
              <strong>{categoryLabels[result.category]}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
