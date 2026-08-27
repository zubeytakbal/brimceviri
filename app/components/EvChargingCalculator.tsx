"use client";

import { useMemo, useState } from "react";
import {
  calculateEvChargingTime,
  calculateEvRange,
} from "../converter/evChargingCalculator";

type Mode = "charging-time" | "range";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatHours(hours: number) {
  const totalMinutes = Math.round(hours * 60);
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (wholeHours > 0) {
    return `${wholeHours} sa ${minutes} dk`;
  }

  return `${minutes} dk`;
}

export default function EvChargingCalculator() {
  const [mode, setMode] = useState<Mode>("charging-time");

  const [batteryCapacity, setBatteryCapacity] = useState("60");
  const [currentPercent, setCurrentPercent] = useState("20");
  const [targetPercent, setTargetPercent] = useState("80");
  const [chargerPower, setChargerPower] = useState("11");
  const [efficiencyPercent, setEfficiencyPercent] = useState("90");

  const [rangeBatteryCapacity, setRangeBatteryCapacity] = useState("60");
  const [consumption, setConsumption] = useState("16");

  const chargingResult = useMemo(
    () =>
      calculateEvChargingTime({
        batteryCapacityKwh: parseNumericValue(batteryCapacity),
        currentPercent: parseNumericValue(currentPercent),
        targetPercent: parseNumericValue(targetPercent),
        chargerPowerKw: parseNumericValue(chargerPower),
        efficiencyPercent: parseNumericValue(efficiencyPercent),
      }),
    [batteryCapacity, currentPercent, targetPercent, chargerPower, efficiencyPercent]
  );

  const rangeResult = useMemo(
    () =>
      calculateEvRange({
        batteryCapacityKwh: parseNumericValue(rangeBatteryCapacity),
        consumptionKwhPer100Km: parseNumericValue(consumption),
      }),
    [rangeBatteryCapacity, consumption]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Ne hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "charging-time" ? " is-active" : ""}`}
              onClick={() => setMode("charging-time")}
            >
              Şarj Süresi
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "range" ? " is-active" : ""}`}
              onClick={() => setMode("range")}
            >
              Menzil
            </button>
          </div>
        </div>

        {mode === "charging-time" ? (
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Batarya Kapasitesi (kWh)</span>
              <input
                inputMode="decimal"
                type="text"
                value={batteryCapacity}
                onChange={(event) => setBatteryCapacity(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Mevcut Şarj (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={currentPercent}
                onChange={(event) => setCurrentPercent(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Hedef Şarj (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={targetPercent}
                onChange={(event) => setTargetPercent(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Şarj Cihazı Gücü (kW)</span>
              <input
                inputMode="decimal"
                type="text"
                value={chargerPower}
                onChange={(event) => setChargerPower(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Şarj Verimliliği (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={efficiencyPercent}
                onChange={(event) => setEfficiencyPercent(event.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Batarya Kapasitesi (kWh)</span>
              <input
                inputMode="decimal"
                type="text"
                value={rangeBatteryCapacity}
                onChange={(event) => setRangeBatteryCapacity(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Tüketim (kWh/100km)</span>
              <input
                inputMode="decimal"
                type="text"
                value={consumption}
                onChange={(event) => setConsumption(event.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {mode === "charging-time" ? (
          !chargingResult ? (
            <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Gereken Enerji</span>
                <strong>
                  {chargingResult.energyNeededKwh.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kWh
                </strong>
              </div>
              <div>
                <span>Tahmini Şarj Süresi</span>
                <strong>{formatHours(chargingResult.chargingHours)}</strong>
              </div>
            </div>
          )
        ) : !rangeResult ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Tahmini Menzil</span>
              <strong>
                {rangeResult.rangeKm.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} km
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
