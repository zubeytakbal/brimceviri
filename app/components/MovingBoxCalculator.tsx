"use client";

import { useMemo, useState } from "react";
import {
  getMovingBoxEstimate,
  homeTypeOrder,
  type HomeType,
} from "../converter/movingBoxCalculator";

export default function MovingBoxCalculator() {
  const [homeType, setHomeType] = useState<HomeType>("2+1");

  const result = useMemo(() => getMovingBoxEstimate(homeType), [homeType]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Ev Tipini Seç</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {homeTypeOrder.map((type) => (
              <button
                key={type}
                type="button"
                className={`engineering-target-button${homeType === type ? " is-active" : ""}`}
                onClick={() => setHomeType(type)}
              >
                {getMovingBoxEstimate(type).label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        <div className="paint-calculator-result-grid">
          <div>
            <span>Küçük Koli</span>
            <strong>{result.smallBoxCount} adet</strong>
          </div>
          <div>
            <span>Büyük Koli</span>
            <strong>{result.largeBoxCount} adet</strong>
          </div>
          <div>
            <span>Tahmini Kamyon Hacmi</span>
            <strong>{result.truckVolumeM3} m³</strong>
          </div>
        </div>

        <p className="paint-calculator-liters">
          Bu rakamlar nakliye sektöründe {result.label} tipi evler için
          kullanılan ortalama tahminlerdir; eşya miktarınıza göre değişebilir.
        </p>
      </div>
    </div>
  );
}
