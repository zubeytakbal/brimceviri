"use client";

import { useMemo, useState } from "react";
import {
  formatNumber,
  fromKwh100,
  fromL100,
  NORDIC_FUEL_COPY,
  toKwh100,
  toL100,
  type EnergyUnit,
  type FuelUnit,
} from "../../converter/fuel/nordicFuel";
import type { NordicLocale } from "../../converter/time/nordicWeek";

// Danimarka'da mil kullanılmaz; sv/no "mil" birimleri Danca listede sona alınır.
const FUEL_UNITS: Record<NordicLocale, FuelUnit[]> = {
  sv: ["lmil", "l100", "kml", "mpgUs", "mpgUk"],
  no: ["lmil", "l100", "kml", "mpgUs", "mpgUk"],
  da: ["kml", "l100", "mpgUs", "mpgUk", "lmil"],
};
const ENERGY_UNITS: Record<NordicLocale, EnergyUnit[]> = {
  sv: ["kwhMil", "kwh100", "whKm"],
  no: ["kwhMil", "kwh100", "whKm"],
  da: ["kwh100", "whKm", "kwhMil"],
};

function parse(value: string) {
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Yakıt tüketimi çevirici, yolculuk maliyeti ve elektrikli araç tüketimi (sv/no/da). */
export default function NordicFuelTool({ locale }: { locale: NordicLocale }) {
  const t = NORDIC_FUEL_COPY[locale];
  const num = (n: number, digits = 2) => formatNumber(locale, n, digits);
  const perMil = t.distanceUnit === "mil";
  const [mode, setMode] = useState<"convert" | "trip" | "ev">("convert");
  const [value, setValue] = useState(perMil ? "0,6" : "20");
  const [unit, setUnit] = useState<FuelUnit>(t.defaultFuelUnit);
  const [distance, setDistance] = useState(perMil ? "30" : "300");
  const [consumption, setConsumption] = useState(perMil ? "0,6" : "20");
  const [fuelPrice, setFuelPrice] = useState("");
  const [energyValue, setEnergyValue] = useState(perMil ? "1,8" : "16");
  const [energyUnit, setEnergyUnit] = useState<EnergyUnit>(t.defaultEnergyUnit);
  const [electricityPrice, setElectricityPrice] = useState("");

  const converted = useMemo(() => {
    const n = parse(value);
    if (n === null) return null;
    const l100 = toL100(n, unit);
    return FUEL_UNITS[locale].filter((u) => u !== unit).map((u) => ({ unit: u, value: fromL100(l100, u) }));
  }, [value, unit, locale]);

  const trip = useMemo(() => {
    const d = parse(distance);
    const c = parse(consumption);
    if (d === null || c === null) return null;
    // sv/no: mil × liter/mil; da: km ÷ km/l.
    const litres = perMil ? d * c : d / c;
    const price = parse(fuelPrice);
    return { litres, cost: price === null ? null : litres * price, perDistance: price === null ? null : (litres / d) * price };
  }, [distance, consumption, fuelPrice, perMil]);

  const ev = useMemo(() => {
    const n = parse(energyValue);
    if (n === null) return null;
    const kwh100 = toKwh100(n, energyUnit);
    const price = parse(electricityPrice);
    // Mesafe birimi başına enerji: sv/no mil (10 km), da km.
    const perDistance = perMil ? kwh100 / 10 : kwh100 / 100;
    return {
      others: ENERGY_UNITS[locale].filter((u) => u !== energyUnit).map((u) => ({ unit: u, value: fromKwh100(kwh100, u) })),
      kmPerKwh: 100 / kwh100,
      cost: price === null ? null : perDistance * price,
    };
  }, [energyValue, energyUnit, electricityPrice, perMil, locale]);

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {[
          { id: "convert" as const, label: t.modeConvert },
          { id: "trip" as const, label: t.modeTrip },
          { id: "ev" as const, label: t.modeEv },
        ].map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === "convert" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>{t.value}</span>
                <input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.unit}</span>
                <select value={unit} onChange={(event) => setUnit(event.target.value as FuelUnit)}>
                  {FUEL_UNITS[locale].map((u) => (
                    <option key={u} value={u}>
                      {t.unitLabels[u]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {converted ? (
            <div className="date-calc-results">
              {converted.map((row, index) => (
                <div className={index === 0 ? "date-calc-stat is-main" : "date-calc-stat"} key={row.unit}>
                  <span>{t.unitLabels[row.unit]}</span>
                  <strong>{num(row.value, row.unit === "lmil" ? 3 : 2)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="date-calc-note">{t.invalid}</p>
          )}
        </>
      ) : null}

      {mode === "trip" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>{t.distance}</span>
                <input inputMode="decimal" value={distance} onChange={(event) => setDistance(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.consumption}</span>
                <input inputMode="decimal" value={consumption} onChange={(event) => setConsumption(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.fuelPrice}</span>
                <input inputMode="decimal" value={fuelPrice} onChange={(event) => setFuelPrice(event.target.value)} />
              </label>
            </div>
            <p className="date-calc-note">{t.priceNote}</p>
          </div>
          {trip ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>{t.litres}</span>
                <strong>{num(trip.litres, 1)} l</strong>
              </div>
              {trip.cost !== null && trip.perDistance !== null ? (
                <>
                  <div className="date-calc-stat">
                    <span>{t.cost}</span>
                    <strong>
                      {num(trip.cost, 0)} {t.currency}
                    </strong>
                  </div>
                  <div className="date-calc-stat">
                    <span>{t.costPerDistance}</span>
                    <strong>
                      {num(trip.perDistance, 2)} {t.currency}
                    </strong>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <p className="date-calc-note">{t.invalid}</p>
          )}
        </>
      ) : null}

      {mode === "ev" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>{t.value}</span>
                <input inputMode="decimal" value={energyValue} onChange={(event) => setEnergyValue(event.target.value)} />
              </label>
              <label className="date-calc-field">
                <span>{t.unit}</span>
                <select value={energyUnit} onChange={(event) => setEnergyUnit(event.target.value as EnergyUnit)}>
                  {ENERGY_UNITS[locale].map((u) => (
                    <option key={u} value={u}>
                      {t.unitLabels[u]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="date-calc-field">
                <span>{t.electricityPrice}</span>
                <input inputMode="decimal" value={electricityPrice} onChange={(event) => setElectricityPrice(event.target.value)} />
              </label>
            </div>
            <p className="date-calc-note">{t.priceNote}</p>
          </div>
          {ev ? (
            <div className="date-calc-results">
              {ev.others.map((row, index) => (
                <div className={index === 0 ? "date-calc-stat is-main" : "date-calc-stat"} key={row.unit}>
                  <span>{t.unitLabels[row.unit]}</span>
                  <strong>{num(row.value, 2)}</strong>
                </div>
              ))}
              <div className="date-calc-stat">
                <span>km/kWh</span>
                <strong>{num(ev.kmPerKwh, 2)}</strong>
              </div>
              {ev.cost !== null ? (
                <div className="date-calc-stat">
                  <span>{t.costPerDistance}</span>
                  <strong>
                    {num(ev.cost, 2)} {t.currency}
                  </strong>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="date-calc-note">{t.invalid}</p>
          )}
        </>
      ) : null}
    </div>
  );
}
