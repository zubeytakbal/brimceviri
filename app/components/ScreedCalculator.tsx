"use client";

import { useMemo, useState } from "react";
import { calculateScreedVolume } from "../converter/screedCalculator";

function parseNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ScreedCalculator() {
  const [area, setArea] = useState("40");
  const [thickness, setThickness] = useState("50");
  const [waste, setWaste] = useState("5");

  const result = useMemo(
    () =>
      calculateScreedVolume({
        areaM2: parseNumber(area),
        thicknessMm: parseNumber(thickness),
        wastePercent: parseNumber(waste),
      }),
    [area, thickness, waste]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Şap Uygulanacak Alan (m²)</span>
            <input inputMode="decimal" type="text" value={area} onChange={(event) => setArea(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Ortalama Şap Kalınlığı (mm)</span>
            <input inputMode="decimal" type="text" value={thickness} onChange={(event) => setThickness(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>Fire Payı (%)</span>
            <input inputMode="decimal" type="text" value={waste} onChange={(event) => setWaste(event.target.value)} />
          </label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli alan, kalınlık ve sıfır veya daha büyük fire oranı gir.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Net Şap Hacmi</span>
              <strong>{formatNumber(result.netVolumeM3, 3)} m³</strong>
            </div>
            <div>
              <span>Fire Dahil Hacim</span>
              <strong>{formatNumber(result.volumeWithWasteM3, 3)} m³</strong>
            </div>
            <div>
              <span>Fire Dahil Yaklaşık Hacim</span>
              <strong>{formatNumber(result.volumeWithWasteL, 0)} L</strong>
            </div>
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">
        Hesap, alan × ortalama kalınlık geometrisine dayanır. Zemin eğimi veya kot farkı varsa ortalama kalınlığı kullan; ürün/karışım tüketimi ve uygulama uygunluğunu üretici bilgisi ve proje üzerinden ayrıca kontrol et.
      </p>
    </div>
  );
}
