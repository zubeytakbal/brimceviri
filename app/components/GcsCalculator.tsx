"use client";

import { useMemo, useState } from "react";
import {
  calculateGcs,
  type EyeOpeningScore,
  type GcsCategory,
  type MotorResponseScore,
  type VerbalResponseScore,
} from "../converter/gcsCalculator";

const categoryLabels: Record<GcsCategory, string> = {
  hafif: "Hafif (14-15)",
  orta: "Orta (9-13)",
  siddetli: "Şiddetli (3-8)",
};

export default function GcsCalculator() {
  const [eyeOpening, setEyeOpening] = useState<EyeOpeningScore>(4);
  const [verbalResponse, setVerbalResponse] =
    useState<VerbalResponseScore>(5);
  const [motorResponse, setMotorResponse] = useState<MotorResponseScore>(6);

  const result = useMemo(
    () => calculateGcs(eyeOpening, verbalResponse, motorResponse),
    [eyeOpening, verbalResponse, motorResponse]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Göz Açma Yanıtı</span>
          <select
            value={eyeOpening}
            onChange={(event) =>
              setEyeOpening(Number(event.target.value) as EyeOpeningScore)
            }
          >
            <option value={4}>4 - Spontan</option>
            <option value={3}>3 - Sesle</option>
            <option value={2}>2 - Ağrılı uyaranla</option>
            <option value={1}>1 - Yanıt yok</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Sözel Yanıt</span>
          <select
            value={verbalResponse}
            onChange={(event) =>
              setVerbalResponse(
                Number(event.target.value) as VerbalResponseScore
              )
            }
          >
            <option value={5}>5 - Oryante, uygun konuşma</option>
            <option value={4}>4 - Konfüze konuşma</option>
            <option value={3}>3 - Uygunsuz kelimeler</option>
            <option value={2}>2 - Anlaşılmaz sesler</option>
            <option value={1}>1 - Yanıt yok</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Motor Yanıt</span>
          <select
            value={motorResponse}
            onChange={(event) =>
              setMotorResponse(
                Number(event.target.value) as MotorResponseScore
              )
            }
          >
            <option value={6}>6 - Emirlere uyar</option>
            <option value={5}>5 - Ağrılı uyaranı lokalize eder</option>
            <option value={4}>4 - Ağrıdan çeker (fleksiyon)</option>
            <option value={3}>3 - Anormal fleksiyon (dekortike)</option>
            <option value={2}>2 - Ekstansiyon (deserebre)</option>
            <option value={1}>1 - Yanıt yok</option>
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
              <span>GKS Toplam Puan</span>
              <strong>{result.total} / 15</strong>
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
