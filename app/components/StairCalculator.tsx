"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { calculateStairs } from "../converter/stairCalculator";

type SupportedLocale = "tr" | "en";
type UnitSystem = "metric" | "us";

const CENTIMETERS_PER_FOOT = 30.48;
const CENTIMETERS_PER_INCH = 2.54;

const copyByLocale = {
  tr: {
    totalHeight: "Toplam yükseklik (cm)",
    desiredRiser: "İstenen rıht yüksekliği (cm)",
    availableRun: "Kullanılabilir yatay uzunluk (cm, opsiyonel)",
    invalid: "Toplam yükseklik ve rıht yüksekliği 0'dan büyük olmalı.",
    steps: "Basamak (rıht) sayısı",
    riser: "Rıht yüksekliği",
    tread: "Basamak derinliği (Blondel)",
    totalRun: "Toplam yatay uzunluk",
    riserComfort: "Rıht konforu",
    treadComfort: "Basamak konforu",
    withinRange: "Uygun",
    outsideRange: "Aralık dışı",
    runWarning: "Yatay uzunluk, belirttiğin alanı aşıyor.",
    note: "Not: basamak derinliği, mimarlıkta yaygın kullanılan Blondel formülüyle (2 × rıht + basamak derinliği ≈ 63 cm) hesaplanır. Bu erken planlama hesabıdır; nihai ölçüleri yerel yönetmelik ve proje gereksinimleriyle doğrula.",
  },
  en: {
    totalHeight: "Total rise (ft)",
    desiredRiser: "Target riser height (in)",
    availableRun: "Available horizontal run (ft, optional)",
    invalid: "Enter a total rise and target riser height greater than zero.",
    steps: "Number of risers",
    riser: "Actual riser height",
    tread: "Tread depth (Blondel estimate)",
    totalRun: "Total horizontal run",
    riserComfort: "Riser range",
    treadComfort: "Tread range",
    withinRange: "Within planning range",
    outsideRange: "Outside planning range",
    runWarning: "The calculated horizontal run exceeds the available run you entered.",
    note: "Planning estimate only. This tool uses the Blondel relationship to suggest a proportion; it does not verify local building-code, structural, guardrail, headroom or accessibility requirements.",
  },
} as const;

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");
  if (!normalizedValue) return Number.NaN;
  const numericValue = Number(normalizedValue);
  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function convertInput(rawValue: string, factor: number) {
  const value = parseNumericValue(rawValue);
  return Number.isFinite(value)
    ? String(Number((value * factor).toPrecision(12)))
    : rawValue;
}

function formatUsInches(valueCm: number) {
  return `${formatLocalizedNumber(valueCm / CENTIMETERS_PER_INCH, "en", {
    maximumFractionDigits: 2,
  })} in`;
}

function formatUsFeet(valueCm: number) {
  const totalInches = valueCm / CENTIMETERS_PER_INCH;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches - feet * 12;
  return `${feet} ft ${formatLocalizedNumber(inches, "en", {
    maximumFractionDigits: 1,
  })} in`;
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function ResultCard({ label, value }: { label: string; value: string | number }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

export default function StairCalculator({ locale = "tr" }: { locale?: SupportedLocale }) {
  const copy = copyByLocale[locale];
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(locale === "en" ? "us" : "metric");
  const [totalHeight, setTotalHeight] = useState(locale === "en" ? "9" : "280");
  const [desiredRiser, setDesiredRiser] = useState(locale === "en" ? "7" : "17.5");
  const [availableRun, setAvailableRun] = useState("");
  const usesUsCustomaryUnits = locale === "en" && unitSystem === "us";

  const result = useMemo(() => {
    const totalHeightCm = parseNumericValue(totalHeight) * (usesUsCustomaryUnits ? CENTIMETERS_PER_FOOT : 1);
    const desiredRiserCm = parseNumericValue(desiredRiser) * (usesUsCustomaryUnits ? CENTIMETERS_PER_INCH : 1);
    const availableRunCm = parseNumericValue(availableRun) * (usesUsCustomaryUnits ? CENTIMETERS_PER_FOOT : 1);
    return calculateStairs({ totalHeightCm, desiredRiserCm, availableRunCm });
  }, [totalHeight, desiredRiser, availableRun, usesUsCustomaryUnits]);

  const changeUnitSystem = (nextUnitSystem: UnitSystem) => {
    if (nextUnitSystem === unitSystem) return;
    if (unitSystem === "us") {
      setTotalHeight((value) => convertInput(value, CENTIMETERS_PER_FOOT));
      setDesiredRiser((value) => convertInput(value, CENTIMETERS_PER_INCH));
      setAvailableRun((value) => convertInput(value, CENTIMETERS_PER_FOOT));
    } else {
      setTotalHeight((value) => convertInput(value, 1 / CENTIMETERS_PER_FOOT));
      setDesiredRiser((value) => convertInput(value, 1 / CENTIMETERS_PER_INCH));
      setAvailableRun((value) => convertInput(value, 1 / CENTIMETERS_PER_FOOT));
    }
    setUnitSystem(nextUnitSystem);
  };

  const inputLabels = usesUsCustomaryUnits ? copyByLocale.en : copy;
  const formatLength = (valueCm: number) => usesUsCustomaryUnits ? formatUsFeet(valueCm) : `${formatLocalizedNumber(valueCm, locale, { maximumFractionDigits: 1 })} cm`;
  const formatRiser = (valueCm: number) => usesUsCustomaryUnits ? formatUsInches(valueCm) : `${formatLocalizedNumber(valueCm, locale, { maximumFractionDigits: 2 })} cm`;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        {locale === "en" && (
          <div className="engineering-targets">
            <span>Unit system</span>
            <div className="engineering-target-grid">
              <button type="button" className={`engineering-target-button${unitSystem === "us" ? " is-active" : ""}`} onClick={() => changeUnitSystem("us")}>US customary (ft, in)</button>
              <button type="button" className={`engineering-target-button${unitSystem === "metric" ? " is-active" : ""}`} onClick={() => changeUnitSystem("metric")}>Metric (cm)</button>
            </div>
          </div>
        )}
        <div className="paint-calculator-grid">
          <InputField label={inputLabels.totalHeight} value={totalHeight} onChange={setTotalHeight} />
          <InputField label={inputLabels.desiredRiser} value={desiredRiser} onChange={setDesiredRiser} />
          <InputField label={inputLabels.availableRun} value={availableRun} onChange={setAvailableRun} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result.success ? <strong>{copy.invalid}</strong> : (
          <div className="paint-calculator-result-grid">
            <ResultCard label={copy.steps} value={result.result.stepCount} />
            <ResultCard label={copy.riser} value={formatRiser(result.result.riserCm)} />
            <ResultCard label={copy.tread} value={formatRiser(result.result.treadCm)} />
            <ResultCard label={copy.totalRun} value={formatLength(result.result.totalRunCm)} />
            <ResultCard label={copy.riserComfort} value={result.result.isRiserComfortable ? copy.withinRange : copy.outsideRange} />
            <ResultCard label={copy.treadComfort} value={result.result.isTreadComfortable ? copy.withinRange : copy.outsideRange} />
            {result.result.exceedsAvailableRun && <ResultCard label={locale === "en" ? "Planning warning" : "Uyarı"} value={copy.runWarning} />}
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">{copy.note}</p>
    </div>
  );
}
