"use client";

// Ingilizce (ABD) klima kapasitesi, dogalgaz faturasi ve tasinma araclari.

import { useMemo, useState } from "react";
import {
  AC_MAX_SQ_FT,
  CU_FT_PER_M3,
  ENERGY_STAR_AC_CHART,
  gasBill,
  roomAcSize,
  sqMetersToSqFt,
  suggestTruck,
  TRUCK_SIZES,
  type GasUnit,
  type SunExposure,
} from "../converter/englishEnergyHomeFormulas";
import { getMovingBoxEstimate, homeTypeOrder, type HomeType } from "../converter/movingBoxCalculator";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const usd = (value: number, digits = 2) => `$${new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)}`;
const btu = (value: number) => `${formatNumber(Math.round(value), 0)} BTU`;
const signedBtu = (value: number) => `${value >= 0 ? "+" : "−"}${formatNumber(Math.abs(Math.round(value)), 0)} BTU`;

// ---------------- Room AC BTU ----------------
export function EnglishAcBtuCalculator() {
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [area, setArea] = useState("300");
  const [sun, setSun] = useState<SunExposure>("normal");
  const [people, setPeople] = useState("2");
  const [kitchen, setKitchen] = useState(false);

  const sqFt = areaUnit === "sqft" ? parseInput(area) ?? NaN : sqMetersToSqFt(parseInput(area) ?? NaN);
  const result = useMemo(() => roomAcSize({ sqFt, sun, people: parseInput(people) ?? 0, isKitchen: kitchen }), [sqFt, sun, people, kitchen]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<"sqft" | "sqm">
          label="Room area in"
          value={areaUnit}
          onChange={(next) => {
            setAreaUnit(next);
            setArea(next === "sqft" ? "300" : "28");
          }}
          options={[
            { value: "sqft", label: "Square feet" },
            { value: "sqm", label: "Square meters" },
          ]}
        />
        <div className="paint-calculator-grid">
          <Field label={areaUnit === "sqft" ? "Room area (sq ft)" : "Room area (m²)"} value={area} onChange={setArea} />
          <Field label="People who regularly use the room" value={people} onChange={setPeople} />
        </div>
        <EnglishModeToggle<SunExposure>
          label="Sun exposure"
          value={sun}
          onChange={setSun}
          options={[
            { value: "shaded", label: "Heavily shaded" },
            { value: "normal", label: "Normal" },
            { value: "sunny", label: "Very sunny" },
          ]}
        />
        <EnglishModeToggle<"no" | "yes">
          label="Is the unit for a kitchen?"
          value={kitchen ? "yes" : "no"}
          onChange={(value) => setKitchen(value === "yes")}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes, kitchen" },
          ]}
        />
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Enter the room area.</strong>
        ) : result.outOfRange ? (
          <strong>
            {formatNumber(result.sqFt, 0)} sq ft is beyond the {formatNumber(AC_MAX_SQ_FT, 0)} sq ft room-AC chart. For large open areas or
            central air, ask an HVAC contractor for a Manual J load calculation.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <Stat label="Recommended capacity" value={btu(result.total)} />
            <Stat label={`Chart value for ${formatNumber(result.sqFt, 0)} sq ft`} value={btu(result.base)} />
            {result.sunAdjustment !== 0 && <Stat label="Sun adjustment" value={signedBtu(result.sunAdjustment)} />}
            {result.peopleAdjustment > 0 && <Stat label="Extra people" value={signedBtu(result.peopleAdjustment)} />}
            {result.kitchenAdjustment > 0 && <Stat label="Kitchen" value={signedBtu(result.kitchenAdjustment)} />}
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>ENERGY STAR room air conditioner sizing chart</caption>
          <thead>
            <tr>
              <th scope="col">Area to be cooled</th>
              <th scope="col">Capacity needed</th>
            </tr>
          </thead>
          <tbody>
            {ENERGY_STAR_AC_CHART.map((row, index) => (
              <tr key={row.maxSqFt}>
                <td>
                  {index === 0 ? 100 : ENERGY_STAR_AC_CHART[index - 1].maxSqFt} – {formatNumber(row.maxSqFt, 0)} sq ft
                </td>
                <td>{btu(row.btu)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Natural gas bill ----------------
const GAS_UNITS: Array<{ value: GasUnit; label: string; price: string }> = [
  { value: "therm", label: "Therms", price: "$ per therm" },
  { value: "ccf", label: "CCF", price: "$ per CCF" },
  { value: "m3", label: "Cubic meters", price: "$ per m³" },
  { value: "kwh", label: "kWh", price: "$ per kWh" },
];

export function EnglishNaturalGasCalculator() {
  const [unit, setUnit] = useState<GasUnit>("therm");
  const [usage, setUsage] = useState("60");
  const [price, setPrice] = useState("1.40");
  const [factor, setFactor] = useState("1.037");

  const result = useMemo(
    () => gasBill({ usage: parseInput(usage) ?? NaN, unit, pricePerUnit: parseInput(price) ?? NaN, thermsPerCcf: parseInput(factor) ?? NaN }),
    [usage, unit, price, factor]
  );
  const unitMeta = GAS_UNITS.find((entry) => entry.value === unit)!;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<GasUnit> label="Your bill measures gas in" value={unit} onChange={setUnit} options={GAS_UNITS.map(({ value, label }) => ({ value, label }))} />
        <div className="paint-calculator-grid">
          <Field label={`Gas used (${unitMeta.label.toLowerCase()})`} value={usage} onChange={setUsage} />
          <Field label={`Price (${unitMeta.price}, optional)`} value={price} onChange={setPrice} />
          {(unit === "ccf" || unit === "m3") && <Field label="Therms per CCF (from your bill)" value={factor} onChange={setFactor} />}
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            {result.cost !== null && <Stat label="Gas cost" value={usd(result.cost)} />}
            <Stat label="Therms" value={formatNumber(result.therms, 2)} />
            <Stat label="Energy in kWh" value={`${formatNumber(result.kwh, 0)} kWh`} />
            <Stat label="Energy in BTU" value={formatNumber(result.btu, 0)} />
            {unit !== "ccf" && <Stat label="CCF" value={formatNumber(result.ccf, 2)} />}
            {result.costPerTherm !== null && unit !== "therm" && <Stat label="Price per therm" value={usd(result.costPerTherm, 3)} />}
          </div>
        ) : (
          <strong>Enter the amount of gas used.</strong>
        )}
      </div>
      <p className="calculator-usage-hint">
        This is the gas supply charge only. Your bill also has a fixed customer charge, delivery charges and taxes — add those for the full
        total. The therms-per-CCF factor (heat content) is printed on most bills and changes slightly from month to month.
      </p>
    </div>
  );
}

// ---------------- Moving boxes & truck ----------------
const HOME_LABELS: Record<HomeType, string> = {
  studio: "Studio",
  "1+1": "1 bedroom",
  "2+1": "2 bedrooms",
  "3+1": "3 bedrooms",
  "4+1": "4 bedrooms",
  "5+1": "5+ bedrooms",
};

export function EnglishMovingBoxCalculator() {
  const [home, setHome] = useState<HomeType>("2+1");
  const estimate = getMovingBoxEstimate(home);
  const cuFt = estimate.truckVolumeM3 * CU_FT_PER_M3;
  const truck = suggestTruck(cuFt);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <label className="category-general-converter-field">
          <span>Home size</span>
          <select value={home} onChange={(event) => setHome(event.target.value as HomeType)}>
            {homeTypeOrder.map((type) => (
              <option key={type} value={type}>
                {HOME_LABELS[type]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        <div className="paint-calculator-result-grid">
          <Stat label="Small boxes (books, kitchen)" value={`${estimate.smallBoxCount}`} />
          <Stat label="Large boxes (linens, light items)" value={`${estimate.largeBoxCount}`} />
          <Stat label="Total boxes" value={`${estimate.smallBoxCount + estimate.largeBoxCount}`} />
          <Stat label="Estimated load volume" value={`${formatNumber(cuFt, 0)} cu ft (${formatNumber(estimate.truckVolumeM3, 0)} m³)`} />
          {truck && <Stat label="Suggested rental truck" value={truck.label} />}
        </div>
      </div>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Approximate cargo space of rental trucks</caption>
          <thead>
            <tr>
              <th scope="col">Truck</th>
              <th scope="col">Cargo space</th>
            </tr>
          </thead>
          <tbody>
            {TRUCK_SIZES.map((size) => (
              <tr key={size.label}>
                <td>{size.label}</td>
                <td>about {formatNumber(size.cuFt, 0)} cu ft</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="calculator-usage-hint">
        These are typical averages. Add boxes for a home office, garage, basement or a large book or kitchen collection, and check the exact
        cargo space with your rental company.
      </p>
    </div>
  );
}
