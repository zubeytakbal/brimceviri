"use client";

// Hindistan'a ozel Ingilizce araclar: arazi birimleri (eyalete gore bigha),
// altin mucevher fiyati (iscilik + %3 GST) ve lakh / crore sayi birimleri.

import { useMemo, useState } from "react";
import {
  BIGHA_REGIONS,
  convertNumberUnits,
  FIXED_LAND_UNITS,
  formatIndianGrouping,
  formatInternationalGrouping,
  goldJewelleryPrice,
  GOLD_FINENESS,
  GRAMS_PER_TOLA,
  landFromSqFt,
  landToSqFt,
  NUMBER_UNITS,
  rateFromFineness,
  type FixedLandUnit,
  type GoldKarat,
  type LandUnitChoice,
  type NumberUnit,
} from "../converter/indiaFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { parseInput } from "./englishFormHelpers";

const fmt = (value: number, digits = 4) => formatIndianGrouping(value, digits);
const rupees = (value: number) => `₹${new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} />
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

// ---------------- Land ----------------
export function IndiaLandConverter() {
  const [regionId, setRegionId] = useState("west-bengal");
  const [unitKey, setUnitKey] = useState("bigha");
  const [value, setValue] = useState("1");
  const region = BIGHA_REGIONS.find((entry) => entry.id === regionId)!;
  const subunitName = region.subunit?.name;

  const choice: LandUnitChoice =
    unitKey === "bigha" ? { kind: "bigha" } : unitKey === "subunit" ? { kind: "subunit" } : { kind: "fixed", unit: unitKey as FixedLandUnit };
  const effectiveChoice: LandUnitChoice = choice.kind === "subunit" && !region.subunit ? { kind: "bigha" } : choice;

  // Hesap ucuz; her cizimde yeniden yapilir.
  const sqFtValue = landToSqFt(parseInput(value) ?? NaN, effectiveChoice, region);
  const result = sqFtValue === null ? null : landFromSqFt(sqFtValue, region);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>State (sets the bigha size)</span>
            <select value={regionId} onChange={(event) => setRegionId(event.target.value)}>
              {BIGHA_REGIONS.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Area" value={value} onChange={setValue} />
          <label className="category-general-converter-field">
            <span>Unit</span>
            <select value={effectiveChoice.kind === "bigha" ? "bigha" : unitKey} onChange={(event) => setUnitKey(event.target.value)}>
              <option value="bigha">Bigha ({region.label})</option>
              {subunitName && subunitName !== "guntha" && (
                <option value="subunit">
                  {subunitName[0].toUpperCase() + subunitName.slice(1)} ({region.label})
                </option>
              )}
              {Object.entries(FIXED_LAND_UNITS).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label={`Bigha (${region.label})`} value={fmt(result.bigha)} />
            {result.subunit && result.subunit.name !== "guntha" && (
              <Stat label={`${result.subunit.name[0].toUpperCase() + result.subunit.name.slice(1)} (${region.label})`} value={fmt(result.subunit.value)} />
            )}
            {(Object.keys(FIXED_LAND_UNITS) as FixedLandUnit[]).map((key) => (
              <Stat key={key} label={FIXED_LAND_UNITS[key].label} value={fmt(result.fixed[key])} />
            ))}
          </div>
        ) : (
          <strong>Enter an area of 0 or more.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Common bigha sizes by state</caption>
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">1 bigha</th>
              <th scope="col">In acres</th>
              <th scope="col">Sub-unit</th>
            </tr>
          </thead>
          <tbody>
            {BIGHA_REGIONS.map((entry) => (
              <tr key={entry.id} className={entry.id === regionId ? "is-active" : undefined}>
                <td>{entry.label}</td>
                <td>{formatIndianGrouping(entry.bighaSqFt, 0)} sq ft</td>
                <td>{formatIndianGrouping(entry.bighaSqFt / 43560, 3)}</td>
                <td>{entry.subunit ? `${entry.subunit.perBigha} ${entry.subunit.name}` : "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="calculator-usage-hint">
        {region.note ? `${region.label}: ${region.note}. ` : ""}Bigha, katha and biswa sizes vary between states and sometimes between
        districts. These are commonly used reference values — for a sale deed, registration or loan, check the size used in your local
        land records.
      </p>
    </div>
  );
}

// ---------------- Gold ----------------
export function GoldPriceCalculatorIndia() {
  const [karat, setKarat] = useState<GoldKarat>("22");
  const [rateMode, setRateMode] = useState<"karat" | "from24">("karat");
  const [rate, setRate] = useState("6900");
  const [rate24, setRate24] = useState("7500");
  const [weightUnit, setWeightUnit] = useState<"gram" | "tola">("gram");
  const [weight, setWeight] = useState("10");
  const [makingMode, setMakingMode] = useState<"percent" | "perGram">("percent");
  const [making, setMaking] = useState("12");
  const [gst, setGst] = useState("3");

  const ratePerGram = rateMode === "karat" ? parseInput(rate) ?? NaN : rateFromFineness(parseInput(rate24) ?? NaN, karat);
  const weightGrams = (parseInput(weight) ?? NaN) * (weightUnit === "tola" ? GRAMS_PER_TOLA : 1);
  const result = useMemo(
    () => goldJewelleryPrice({ ratePerGram, weightGrams, makingMode, makingValue: parseInput(making) ?? NaN, gstPercent: parseInput(gst) ?? NaN }),
    [ratePerGram, weightGrams, makingMode, making, gst]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<GoldKarat>
          label="Purity"
          value={karat}
          onChange={setKarat}
          options={(Object.keys(GOLD_FINENESS) as GoldKarat[]).reverse().map((key) => ({ value: key, label: `${key}K (${GOLD_FINENESS[key]})` }))}
        />
        <EnglishModeToggle<"karat" | "from24">
          label="Gold rate"
          value={rateMode}
          onChange={setRateMode}
          options={[
            { value: "karat", label: `I know the ${karat}K rate` },
            { value: "from24", label: "Estimate from 24K rate" },
          ]}
        />
        <div className="paint-calculator-grid">
          {rateMode === "karat" ? (
            <Field label={`${karat}K rate per gram (₹)`} value={rate} onChange={setRate} />
          ) : (
            <Field label="24K (999) rate per gram (₹)" value={rate24} onChange={setRate24} />
          )}
          <Field label={weightUnit === "gram" ? "Weight (grams)" : "Weight (tola)"} value={weight} onChange={setWeight} />
          <Field label={makingMode === "percent" ? "Making charges (% of gold value)" : "Making charges (₹ per gram)"} value={making} onChange={setMaking} />
          <Field label="GST (%)" value={gst} onChange={setGst} />
        </div>
        <EnglishModeToggle<"gram" | "tola">
          label="Weight in"
          value={weightUnit}
          onChange={setWeightUnit}
          options={[
            { value: "gram", label: "Grams" },
            { value: "tola", label: "Tola (11.66 g)" },
          ]}
        />
        <EnglishModeToggle<"percent" | "perGram">
          label="Making charges as"
          value={makingMode}
          onChange={setMakingMode}
          options={[
            { value: "percent", label: "% of gold value" },
            { value: "perGram", label: "₹ per gram" },
          ]}
        />
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="Total price" value={rupees(result.total)} />
            <Stat label={`Gold value (${fmt(weightGrams, 3)} g × ${rupees(ratePerGram)})`} value={rupees(result.goldValue)} />
            <Stat label="Making charges" value={rupees(result.making)} />
            <Stat label={`GST (${gst}%)`} value={rupees(result.gst)} />
            <Stat label="Effective price per gram" value={rupees(result.effectivePerGram)} />
          </div>
        ) : (
          <strong>Enter the gold rate and the weight.</strong>
        )}
      </div>
      <p className="calculator-usage-hint">
        Estimate only. Use the rate your jeweller quotes for the day. Rates estimated from 24K use the hallmark fineness (22K = 916/999 of
        the 24K rate); jewellers&apos; own 22K quotes are usually close to this. Stone and bead weight should not be charged at the gold
        rate — ask for the net gold weight on the bill.
      </p>
    </div>
  );
}

// ---------------- Lakh / crore ----------------
const NUMBER_UNIT_ORDER: NumberUnit[] = ["one", "thousand", "lakh", "million", "crore", "billion", "arab", "kharab", "trillion"];

export function LakhCroreConverter() {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState<NumberUnit>("crore");
  const result = useMemo(() => convertNumberUnits(parseInput(value) ?? NaN, unit), [value, unit]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <Field label="Value" value={value} onChange={setValue} />
          <label className="category-general-converter-field">
            <span>Unit</span>
            <select value={unit} onChange={(event) => setUnit(event.target.value as NumberUnit)}>
              {NUMBER_UNIT_ORDER.map((key) => (
                <option key={key} value={key}>
                  {NUMBER_UNITS[key].label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="Indian format" value={formatIndianGrouping(result.raw)} />
            <Stat label="International format" value={formatInternationalGrouping(result.raw)} />
            {NUMBER_UNIT_ORDER.filter((key) => key !== "one" && key !== unit && key !== "arab").map((key) => (
              <Stat key={key} label={NUMBER_UNITS[key].label} value={formatInternationalGrouping(result.inUnits[key], 6)} />
            ))}
          </div>
        ) : (
          <strong>Enter a number.</strong>
        )}
      </div>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Indian and international number units</caption>
          <thead>
            <tr>
              <th scope="col">Indian</th>
              <th scope="col">Digits</th>
              <th scope="col">International</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1 lakh</td><td>1,00,000</td><td>100 thousand</td></tr>
            <tr><td>10 lakh</td><td>10,00,000</td><td>1 million</td></tr>
            <tr><td>1 crore</td><td>1,00,00,000</td><td>10 million</td></tr>
            <tr><td>100 crore (1 arab)</td><td>1,00,00,00,000</td><td>1 billion</td></tr>
            <tr><td>1 lakh crore</td><td>10,00,00,00,00,000</td><td>1 trillion</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
