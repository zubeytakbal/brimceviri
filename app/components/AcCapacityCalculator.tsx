"use client";

import { useMemo, useState } from "react";
import {
  calculateAcCapacity,
  type AcCapacityInput,
} from "../converter/acCapacityCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatBtu(value: number) {
  return `${Math.round(value).toLocaleString("tr-TR")} BTU`;
}

export default function AcCapacityCalculator() {
  const [areaM2, setAreaM2] = useState("20");
  const [occupantCount, setOccupantCount] = useState("1");
  const [isSunny, setIsSunny] = useState(false);
  const [isTopFloor, setIsTopFloor] = useState(false);

  const input: AcCapacityInput = useMemo(
    () => ({
      areaM2: parseNumericValue(areaM2),
      occupantCount: parseNumericValue(occupantCount),
      isSunny,
      isTopFloor,
    }),
    [areaM2, occupantCount, isSunny, isTopFloor]
  );

  const result = useMemo(() => calculateAcCapacity(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Oda Alanı (m²)</span>
          <input
            inputMode="decimal"
            type="text"
            value={areaM2}
            onChange={(event) => setAreaM2(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Odada Bulunan Kişi Sayısı</span>
          <input
            inputMode="numeric"
            type="text"
            value={occupantCount}
            onChange={(event) => setOccupantCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Oda gün boyu güneş alıyor mu?</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isSunny}
              onChange={(event) => setIsSunny(event.target.checked)}
            />
            Evet, doğrudan güneş alıyor
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Üst kat / çatı katı mı?</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isTopFloor}
              onChange={(event) => setIsTopFloor(event.target.checked)}
            />
            Evet, en üst kat veya çatı katı
          </span>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              Önerilen klima kapasitesi:{" "}
              <strong>{formatBtu(result.suggestedCapacity)}</strong>
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Alan bazlı ihtiyaç</span>
                <strong>{formatBtu(result.baseBtu)}</strong>
              </div>
              <div>
                <span>Kişi bazlı ek yük</span>
                <strong>{formatBtu(result.occupantBtu)}</strong>
              </div>
              <div>
                <span>Toplam hesaplanan ihtiyaç</span>
                <strong>{formatBtu(result.totalBtu)}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
