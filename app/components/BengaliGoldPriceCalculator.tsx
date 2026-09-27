"use client";

// Bangladesh sonar gohonar dam: ভরি-আনা-রতি-পয়েন্ট ওজন, BAJUS ভরি দাম,
// মজুরি ও ভ্যাট.

import { useState } from "react";
import {
  bdGoldJewelleryPrice,
  BD_GOLD_PURITY,
  gramsToVoriWeight,
  parseBengaliNumber,
  VORI_GRAMS,
  voriWeightToVori,
  type BdGoldKarat,
} from "../converter/bengaliGoldFormulas";
import EnglishModeToggle from "./EnglishModeToggle";

const bn = (value: number, digits = 2) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: digits }).format(value);
const taka = (value: number) =>
  `৳${new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(Math.round(value))}`;

const karatLabels: Record<BdGoldKarat, string> = {
  "22K": "২২ ক্যারেট",
  "21K": "২১ ক্যারেট",
  "18K": "১৮ ক্যারেট",
  traditional: "সনাতন",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input
        inputMode="decimal"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
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

// Bos alan 0 sayilir (yalnizca আনা yazan kullanici icin); gecersiz metin NaN.
const partValue = (raw: string) =>
  raw.trim() === "" ? 0 : (parseBengaliNumber(raw) ?? Number.NaN);

export default function BengaliGoldPriceCalculator() {
  const [karat, setKarat] = useState<BdGoldKarat>("22K");
  const [priceMode, setPriceMode] = useState<"vori" | "gram">("vori");
  const [price, setPrice] = useState("");
  const [weightMode, setWeightMode] = useState<"vori" | "gram">("vori");
  const [vori, setVori] = useState("1");
  const [ana, setAna] = useState("");
  const [rati, setRati] = useState("");
  const [point, setPoint] = useState("");
  const [grams, setGrams] = useState("10");
  const [making, setMaking] = useState("6");
  const [vat, setVat] = useState("5");

  const weightVori =
    weightMode === "vori"
      ? voriWeightToVori({
          vori: partValue(vori),
          ana: partValue(ana),
          rati: partValue(rati),
          point: partValue(point),
        })
      : (parseBengaliNumber(grams) ?? Number.NaN) / VORI_GRAMS;
  const enteredPrice = parseBengaliNumber(price);
  const pricePerVori =
    enteredPrice === null
      ? Number.NaN
      : priceMode === "vori"
        ? enteredPrice
        : enteredPrice * VORI_GRAMS;
  const makingPercent = parseBengaliNumber(making) ?? Number.NaN;
  const vatPercent = parseBengaliNumber(vat) ?? Number.NaN;
  const weightValid = Number.isFinite(weightVori) && weightVori > 0;
  const result =
    weightValid &&
    Number.isFinite(pricePerVori) &&
    Number.isFinite(makingPercent) &&
    Number.isFinite(vatPercent)
      ? bdGoldJewelleryPrice({ weightVori, pricePerVori, makingPercent, vatPercent, karat })
      : null;
  const split = weightValid ? gramsToVoriWeight(weightVori * VORI_GRAMS) : null;
  const purity = BD_GOLD_PURITY[karat];

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<BdGoldKarat>
          label="সোনার মান"
          value={karat}
          onChange={setKarat}
          options={(Object.keys(karatLabels) as BdGoldKarat[]).map((key) => ({
            value: key,
            label: karatLabels[key],
          }))}
        />
        <EnglishModeToggle<"vori" | "gram">
          label="দাম কীসের হিসাবে"
          value={priceMode}
          onChange={setPriceMode}
          options={[
            { value: "vori", label: "প্রতি ভরি" },
            { value: "gram", label: "প্রতি গ্রাম" },
          ]}
        />
        <div className="paint-calculator-grid">
          <Field
            label={`আজকের ${karatLabels[karat]} দাম (৳ ${priceMode === "vori" ? "প্রতি ভরি" : "প্রতি গ্রাম"})`}
            value={price}
            onChange={setPrice}
            placeholder="দোকান বা বাজুসের দাম লিখুন"
          />
          <Field label="মজুরি (সোনার দামের %)" value={making} onChange={setMaking} />
          <Field label="ভ্যাট (%)" value={vat} onChange={setVat} />
        </div>
        <EnglishModeToggle<"vori" | "gram">
          label="ওজন লিখুন"
          value={weightMode}
          onChange={setWeightMode}
          options={[
            { value: "vori", label: "ভরি-আনা-রতি-পয়েন্ট" },
            { value: "gram", label: "গ্রাম" },
          ]}
        />
        {weightMode === "vori" ? (
          <div className="paint-calculator-grid">
            <Field label="ভরি" value={vori} onChange={setVori} />
            <Field label="আনা" value={ana} onChange={setAna} />
            <Field label="রতি" value={rati} onChange={setRati} />
            <Field label="পয়েন্ট" value={point} onChange={setPoint} />
          </div>
        ) : (
          <div className="paint-calculator-grid">
            <Field label="ওজন (গ্রাম)" value={grams} onChange={setGrams} />
          </div>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="মোট দাম" value={taka(result.total)} />
            <Stat
              label={`সোনার দাম (${bn(weightVori, 4)} ভরি)`}
              value={taka(result.goldValue)}
            />
            <Stat label={`মজুরি (${bn(makingPercent)}%)`} value={taka(result.making)} />
            <Stat label={`ভ্যাট (${bn(vatPercent)}%)`} value={taka(result.vat)} />
            <Stat label="মোট ওজন" value={`${bn(result.grams, 3)} গ্রাম`} />
            {result.pureGoldGrams !== null && (
              <Stat label="এর মধ্যে খাঁটি সোনা" value={`${bn(result.pureGoldGrams, 3)} গ্রাম`} />
            )}
          </div>
        ) : weightValid ? (
          <>
            <strong>দাম লিখলে মোট খরচ দেখাবে।</strong>
            <span className="category-general-converter-equality">
              ওজন: {bn(weightVori * VORI_GRAMS, 3)} গ্রাম
              {split &&
                ` = ${bn(split.vori, 0)} ভরি ${bn(split.ana, 0)} আনা ${bn(split.rati, 0)} রতি ${bn(split.point, 1)} পয়েন্ট`}
            </span>
          </>
        ) : (
          <strong>সঠিক ওজন লিখুন।</strong>
        )}
      </div>

      {result && split && (
        <p className="calculator-usage-hint">
          ওজন: {bn(split.vori, 0)} ভরি {bn(split.ana, 0)} আনা {bn(split.rati, 0)} রতি{" "}
          {bn(split.point, 1)} পয়েন্ট।{" "}
          {purity === null
            ? "সনাতন পদ্ধতির সোনার বিশুদ্ধতা নির্দিষ্ট নয়, তাই খাঁটি সোনার পরিমাণ দেখানো হয়নি।"
            : `${karatLabels[karat]} সোনায় প্রায় ${bn(purity * 100, 1)}% খাঁটি সোনা থাকে।`}
        </p>
      )}

      <p className="calculator-usage-hint">
        এটি একটি আনুমানিক হিসাব। দাম দোকান ও দিনভেদে বদলায়; কেনার আগে দোকানের রসিদে সোনার নিট ওজন,
        মজুরি ও ভ্যাট মিলিয়ে নিন। পাথর বা পুঁতির ওজন সোনার দামে ধরা উচিত নয়।
      </p>
    </div>
  );
}
