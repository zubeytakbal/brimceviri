"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateEvChargingTime,
  calculateEvRange,
} from "../converter/evChargingCalculator";

type Mode = "charging-time" | "range";
type SupportedLocale = "tr" | "en";

type EvChargingCopy = {
  whatToCalculate: string;
  chargingTimeMode: string;
  rangeMode: string;
  fieldBatteryCapacity: string;
  fieldCurrentPercent: string;
  fieldTargetPercent: string;
  fieldChargerPower: string;
  fieldEfficiency: string;
  fieldConsumption: string;
  emptyState: string;
  resultEnergyNeeded: string;
  resultChargingTime: string;
  resultRange: string;
  hoursShort: string;
  minutesShort: string;
};

const copyByLocale: Record<SupportedLocale, EvChargingCopy> = {
  tr: {
    whatToCalculate: "Ne hesaplamak istiyorsun?",
    chargingTimeMode: "Şarj Süresi",
    rangeMode: "Menzil",
    fieldBatteryCapacity: "Batarya Kapasitesi (kWh)",
    fieldCurrentPercent: "Mevcut Şarj (%)",
    fieldTargetPercent: "Hedef Şarj (%)",
    fieldChargerPower: "Şarj Cihazı Gücü (kW)",
    fieldEfficiency: "Şarj Verimliliği (%)",
    fieldConsumption: "Tüketim (kWh/100km)",
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultEnergyNeeded: "Gereken Enerji",
    resultChargingTime: "Tahmini Şarj Süresi",
    resultRange: "Tahmini Menzil",
    hoursShort: "sa",
    minutesShort: "dk",
  },
  en: {
    whatToCalculate: "What do you want to calculate?",
    chargingTimeMode: "Charging Time",
    rangeMode: "Range",
    fieldBatteryCapacity: "Battery Capacity (kWh)",
    fieldCurrentPercent: "Current Charge (%)",
    fieldTargetPercent: "Target Charge (%)",
    fieldChargerPower: "Charger Power (kW)",
    fieldEfficiency: "Charging Efficiency (%)",
    fieldConsumption: "Consumption (kWh/100km)",
    emptyState: "Enter valid values to see the result.",
    resultEnergyNeeded: "Energy Needed",
    resultChargingTime: "Estimated Charging Time",
    resultRange: "Estimated Range",
    hoursShort: "h",
    minutesShort: "min",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatHours(hours: number, copy: EvChargingCopy) {
  const totalMinutes = Math.round(hours * 60);
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (wholeHours > 0) {
    return `${wholeHours} ${copy.hoursShort} ${minutes} ${copy.minutesShort}`;
  }

  return `${minutes} ${copy.minutesShort}`;
}

export default function EvChargingCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

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
          <span>{copy.whatToCalculate}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "charging-time" ? " is-active" : ""}`}
              onClick={() => setMode("charging-time")}
            >
              {copy.chargingTimeMode}
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "range" ? " is-active" : ""}`}
              onClick={() => setMode("range")}
            >
              {copy.rangeMode}
            </button>
          </div>
        </div>

        {mode === "charging-time" ? (
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>{copy.fieldBatteryCapacity}</span>
              <input
                inputMode="decimal"
                type="text"
                value={batteryCapacity}
                onChange={(event) => setBatteryCapacity(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>{copy.fieldCurrentPercent}</span>
              <input
                inputMode="decimal"
                type="text"
                value={currentPercent}
                onChange={(event) => setCurrentPercent(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>{copy.fieldTargetPercent}</span>
              <input
                inputMode="decimal"
                type="text"
                value={targetPercent}
                onChange={(event) => setTargetPercent(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>{copy.fieldChargerPower}</span>
              <input
                inputMode="decimal"
                type="text"
                value={chargerPower}
                onChange={(event) => setChargerPower(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>{copy.fieldEfficiency}</span>
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
              <span>{copy.fieldBatteryCapacity}</span>
              <input
                inputMode="decimal"
                type="text"
                value={rangeBatteryCapacity}
                onChange={(event) => setRangeBatteryCapacity(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>{copy.fieldConsumption}</span>
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
            <strong>{copy.emptyState}</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultEnergyNeeded}</span>
                <strong>
                  {formatLocalizedNumber(
                    chargingResult.energyNeededKwh,
                    locale,
                    { maximumFractionDigits: 1 }
                  )}{" "}
                  kWh
                </strong>
              </div>
              <div>
                <span>{copy.resultChargingTime}</span>
                <strong>{formatHours(chargingResult.chargingHours, copy)}</strong>
              </div>
            </div>
          )
        ) : !rangeResult ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultRange}</span>
              <strong>
                {formatLocalizedNumber(rangeResult.rangeKm, locale, {
                  maximumFractionDigits: 0,
                })}{" "}
                km
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
