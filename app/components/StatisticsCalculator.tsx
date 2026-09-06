"use client";

import { useMemo, useState } from "react";
import { calculateStatistics } from "../converter/statisticsCalculator";

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const EXAMPLES = [
  { label: "Sınav notları", values: "65, 70, 70, 80, 85, 90, 95" },
  { label: "Tek sayı (medyan)", values: "12, 5, 8, 20, 3" },
  { label: "Çift sayı (medyan)", values: "4, 8, 15, 16, 23, 42" },
];

export default function StatisticsCalculator() {
  const [valuesInput, setValuesInput] = useState("65, 70, 70, 80, 85, 90, 95");

  const outcome = useMemo(() => calculateStatistics(valuesInput), [valuesInput]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: sayıları virgül, boşluk veya satır satır ayırarak
          gir — ortalama, medyan, mod, standart sapma ve diğer temel
          istatistikler otomatik hesaplansın. Ondalıklı sayı gireceksen
          (örn. 1,5) sayılar arasına boşluk veya yeni satır koy, sadece
          virgülle ayırma — yoksa ondalık mı liste ayracı mı olduğu
          karışabilir.
        </p>

        <label className="category-general-converter-field log-equation-input">
          <span>Veri listesi</span>
          <input
            type="text"
            value={valuesInput}
            onChange={(event) => setValuesInput(event.target.value)}
            placeholder="65, 70, 70, 80, 85, 90, 95"
          />
        </label>

        <div className="log-equation-examples">
          <span>Örnekler:</span>
          {EXAMPLES.map((example) => (
            <button
              key={example.label}
              type="button"
              className="log-equation-example-button"
              onClick={() => setValuesInput(example.values)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!outcome.success ? (
          <strong>{outcome.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Veri sayısı (n)</span>
              <strong>{outcome.result.count}</strong>
            </div>
            <div>
              <span>Toplam</span>
              <strong>{formatNumber(outcome.result.sum)}</strong>
            </div>
            <div>
              <span>Aritmetik ortalama</span>
              <strong>{formatNumber(outcome.result.mean)}</strong>
            </div>
            <div>
              <span>Medyan (ortanca)</span>
              <strong>{formatNumber(outcome.result.median)}</strong>
            </div>
            <div>
              <span>Mod (tepe değer)</span>
              <strong>
                {outcome.result.modes.length === 0
                  ? "Yok"
                  : outcome.result.modes.map((value) => formatNumber(value)).join(", ")}
              </strong>
            </div>
            <div>
              <span>En küçük / En büyük</span>
              <strong>
                {formatNumber(outcome.result.min)} / {formatNumber(outcome.result.max)}
              </strong>
            </div>
            <div>
              <span>Açıklık (range)</span>
              <strong>{formatNumber(outcome.result.range)}</strong>
            </div>
            <div>
              <span>Standart sapma (kütle)</span>
              <strong>{formatNumber(outcome.result.populationStdDev)}</strong>
            </div>
            {outcome.result.sampleStdDev !== null && (
              <div>
                <span>Standart sapma (örneklem)</span>
                <strong>{formatNumber(outcome.result.sampleStdDev)}</strong>
              </div>
            )}
            <div>
              <span>Varyans (kütle)</span>
              <strong>{formatNumber(outcome.result.populationVariance)}</strong>
            </div>
          </div>
        )}
      </div>

      {outcome.success && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
          <div className="calculator-step">
            <p className="calculator-step-title">1. Adım — Ortalama = Toplam / n</p>
            <p className="calculator-step-line">
              {formatNumber(outcome.result.sum, 4)} / {outcome.result.count} ={" "}
              {formatNumber(outcome.result.mean)}
            </p>
          </div>
          <div className="calculator-step">
            <p className="calculator-step-title">2. Adım — Sayılar küçükten büyüğe sıralanır, ortadaki değer(ler) medyanı verir</p>
            <p className="calculator-step-line">
              {[...outcome.result.values]
                .sort((left, right) => left - right)
                .map((value) => formatNumber(value, 4))
                .join(", ")}
            </p>
            <p className="calculator-step-line">
              Medyan = {formatNumber(outcome.result.median)}
            </p>
          </div>
          <div className="calculator-step">
            <p className="calculator-step-title">
              3. Adım — Varyans = Σ(x − ortalama)² / n, Standart sapma = √Varyans
            </p>
            <p className="calculator-step-line">
              Varyans = {formatNumber(outcome.result.populationVariance, 4)}
            </p>
            <p className="calculator-step-line">
              Standart sapma = √{formatNumber(outcome.result.populationVariance, 4)} ={" "}
              {formatNumber(outcome.result.populationStdDev)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
