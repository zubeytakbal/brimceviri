"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { calculateConcrete, type ConcreteShape } from "../converter/concreteCalculator";

type SupportedLocale = "tr" | "en" | "uz";
type UnitSystem = "metric" | "us";

const METERS_PER_FOOT = 0.3048;
const CUBIC_METERS_PER_CUBIC_YARD = 0.764554857984;
const POUNDS_PER_KILOGRAM = 2.20462262185;
const LITERS_PER_US_GALLON = 3.785411784;

type ConcreteCopy = {
  shapeLabel: string;
  shapes: Record<ConcreteShape, string>;
  length: string;
  width: string;
  thickness: string;
  diameter: string;
  height: string;
  waste: string;
  emptyState: string;
  resultVolume: string;
  resultVolumeWithWaste: string;
  resultBagCount: string;
  resultCement: string;
  resultSand: string;
  resultGravel: string;
  resultWater: string;
  note: string;
};

const copyByLocale: Record<SupportedLocale, ConcreteCopy> = {
  tr: {
    shapeLabel: "Şekil",
    shapes: { dikdortgen: "Dikdörtgen (temel/döşeme)", silindir: "Silindir (kolon)" },
    length: "Uzunluk (m)", width: "Genişlik (m)", thickness: "Kalınlık (m)", diameter: "Çap (m)", height: "Yükseklik (m)", waste: "Fire Payı (%)",
    emptyState: "Geçerli ölçüler girerek sonucu görebilirsin.", resultVolume: "Beton hacmi", resultVolumeWithWaste: "Fire dahil hacim", resultBagCount: "25 kg torba çimento", resultCement: "Çimento", resultSand: "Kum", resultGravel: "Çakıl (agrega)", resultWater: "Su",
    note: "Not: standart C25 beton karışım oranına (yaklaşık 350 kg/m³ çimento) dayanan bir tahmindir; gerçek oran beton sınıfına ve hazır beton santraline göre değişebilir.",
  },
  en: {
    shapeLabel: "Shape",
    shapes: { dikdortgen: "Rectangle (footing/slab)", silindir: "Cylinder (column)" },
    length: "Length (m)", width: "Width (m)", thickness: "Thickness (m)", diameter: "Diameter (m)", height: "Height (m)", waste: "Waste allowance (%)",
    emptyState: "Enter valid dimensions to see the result.", resultVolume: "Concrete volume", resultVolumeWithWaste: "Required volume with waste", resultBagCount: "25 kg cement bags", resultCement: "Cement estimate", resultSand: "Sand estimate", resultGravel: "Gravel estimate", resultWater: "Water estimate",
    note: "Planning estimate only.",
  },
  uz: {
    shapeLabel: "Shakl",
    shapes: { dikdortgen: "To'g'ri to'rtburchak (poydevor/plita)", silindir: "Silindr (ustun)" },
    length: "Uzunlik (m)", width: "Kenglik (m)", thickness: "Qalinlik (m)", diameter: "Diametr (m)", height: "Balandlik (m)", waste: "Zaxira ulushi (%)",
    emptyState: "To'g'ri o'lchamlarni kiritib natijani ko'rishingiz mumkin.", resultVolume: "Beton hajmi", resultVolumeWithWaste: "Zaxira dahil hajm", resultBagCount: "25 kg tsement qopi", resultCement: "Tsement", resultSand: "Qum", resultGravel: "Shag'al (agregat)", resultWater: "Suv",
    note: "Eslatma: bu standart C25 beton aralashmasi nisbatiga (taxminan 350 kg/m³ tsement) asoslangan taxmindir; haqiqiy nisbat beton sinfi va tayyor beton zavodiga qarab farq qilishi mumkin.",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");
  if (!normalizedValue) return Number.NaN;
  const numericValue = Number(normalizedValue);
  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatVolume(value: number, locale: SupportedLocale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 3 })} m³`;
}

function formatEnglishConstructionVolume(valueM3: number, unitSystem: UnitSystem) {
  return unitSystem === "us"
    ? `${formatLocalizedNumber(valueM3 / CUBIC_METERS_PER_CUBIC_YARD, "en", { maximumFractionDigits: 3 })} yd³`
    : formatVolume(valueM3, "en");
}

function formatEnglishConstructionMass(valueKg: number, unitSystem: UnitSystem) {
  const value = unitSystem === "us" ? valueKg * POUNDS_PER_KILOGRAM : valueKg;
  const unit = unitSystem === "us" ? "lb" : "kg";
  return `${formatLocalizedNumber(value, "en", { maximumFractionDigits: 0 })} ${unit}`;
}

function formatEnglishConstructionWater(valueL: number, unitSystem: UnitSystem) {
  const value = unitSystem === "us" ? valueL / LITERS_PER_US_GALLON : valueL;
  const unit = unitSystem === "us" ? "US gal" : "L";
  return `${formatLocalizedNumber(value, "en", { maximumFractionDigits: 0 })} ${unit}`;
}

function convertDimensionInput(rawValue: string, factor: number) {
  const numericValue = parseNumericValue(rawValue);
  return Number.isFinite(numericValue)
    ? String(Number((numericValue * factor).toPrecision(12)))
    : rawValue;
}

export default function ConcreteCalculator({ locale = "tr" }: { locale?: SupportedLocale }) {
  const copy = copyByLocale[locale];
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(locale === "en" ? "us" : "metric");
  const [shape, setShape] = useState<ConcreteShape>("dikdortgen");
  const [length, setLength] = useState(locale === "en" ? "16" : "5");
  const [width, setWidth] = useState(locale === "en" ? "13" : "4");
  const [thickness, setThickness] = useState(locale === "en" ? "0.5" : "0.15");
  const [diameter, setDiameter] = useState(locale === "en" ? "1" : "0.3");
  const [height, setHeight] = useState(locale === "en" ? "10" : "3");
  const [wasteFactor, setWasteFactor] = useState("5");
  const usesUsCustomaryUnits = locale === "en" && unitSystem === "us";
  const dimensionUnit = usesUsCustomaryUnits ? "ft" : "m";
  const dimensionToMeters = usesUsCustomaryUnits ? METERS_PER_FOOT : 1;

  const changeUnitSystem = (nextUnitSystem: UnitSystem) => {
    if (nextUnitSystem === unitSystem) return;
    const factor = unitSystem === "us" ? METERS_PER_FOOT : 1 / METERS_PER_FOOT;
    setLength((value) => convertDimensionInput(value, factor));
    setWidth((value) => convertDimensionInput(value, factor));
    setThickness((value) => convertDimensionInput(value, factor));
    setDiameter((value) => convertDimensionInput(value, factor));
    setHeight((value) => convertDimensionInput(value, factor));
    setUnitSystem(nextUnitSystem);
  };

  const result = useMemo(
    () => calculateConcrete({
      shape,
      length: parseNumericValue(length) * dimensionToMeters,
      width: parseNumericValue(width) * dimensionToMeters,
      thickness: parseNumericValue(thickness) * dimensionToMeters,
      diameter: parseNumericValue(diameter) * dimensionToMeters,
      height: parseNumericValue(height) * dimensionToMeters,
      wasteFactor: parseNumericValue(wasteFactor),
    }),
    [shape, length, width, thickness, diameter, height, wasteFactor, dimensionToMeters]
  );

  const dimensionLabel = (label: string) => locale === "en" ? label.replace("(m)", `(${dimensionUnit})`) : label;
  const formatResultVolume = (value: number) => locale === "en" ? formatEnglishConstructionVolume(value, unitSystem) : formatVolume(value, locale);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        {locale === "en" && (
          <div className="engineering-targets">
            <span>Unit system</span>
            <div className="engineering-target-grid">
              <button type="button" className={`engineering-target-button${unitSystem === "us" ? " is-active" : ""}`} onClick={() => changeUnitSystem("us")}>US customary (ft, yd³)</button>
              <button type="button" className={`engineering-target-button${unitSystem === "metric" ? " is-active" : ""}`} onClick={() => changeUnitSystem("metric")}>Metric (m, m³)</button>
            </div>
          </div>
        )}
        <div className="engineering-targets">
          <span>{copy.shapeLabel}</span>
          <div className="engineering-target-grid">
            {(Object.keys(copy.shapes) as ConcreteShape[]).map((key) => (
              <button key={key} type="button" className={`engineering-target-button${shape === key ? " is-active" : ""}`} onClick={() => setShape(key)}>{copy.shapes[key]}</button>
            ))}
          </div>
        </div>
        <div className="paint-calculator-grid">
          {shape === "dikdortgen" ? <>
            <DimensionInput label={dimensionLabel(copy.length)} value={length} onChange={setLength} />
            <DimensionInput label={dimensionLabel(copy.width)} value={width} onChange={setWidth} />
            <DimensionInput label={dimensionLabel(copy.thickness)} value={thickness} onChange={setThickness} />
          </> : <>
            <DimensionInput label={dimensionLabel(copy.diameter)} value={diameter} onChange={setDiameter} />
            <DimensionInput label={dimensionLabel(copy.height)} value={height} onChange={setHeight} />
          </>}
          <DimensionInput label={copy.waste} value={wasteFactor} onChange={setWasteFactor} />
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result.success ? <strong>{copy.emptyState}</strong> : (
          <div className="paint-calculator-result-grid">
            <ResultCard label={copy.resultVolume} value={formatResultVolume(result.result.volumeM3)} />
            <ResultCard label={copy.resultVolumeWithWaste} value={formatResultVolume(result.result.volumeWithWasteM3)} />
            {locale !== "en" && <ResultCard label={copy.resultBagCount} value={formatLocalizedNumber(result.result.bagCount25kg, locale, { maximumFractionDigits: 0 })} />}
            <ResultCard label={copy.resultCement} value={locale === "en" ? formatEnglishConstructionMass(result.result.cementKg, unitSystem) : `${formatLocalizedNumber(result.result.cementKg, locale, { maximumFractionDigits: 0 })} kg`} />
            <ResultCard label={copy.resultSand} value={formatResultVolume(result.result.sandM3)} />
            <ResultCard label={copy.resultGravel} value={formatResultVolume(result.result.gravelM3)} />
            <ResultCard label={copy.resultWater} value={locale === "en" ? formatEnglishConstructionWater(result.result.waterL, unitSystem) : `${formatLocalizedNumber(result.result.waterL, locale, { maximumFractionDigits: 0 })} L`} />
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">
        {locale === "en" ? "Planning estimate only. Order ready-mix by the required volume and confirm the actual mix, bag yield and placement allowance with the supplier or project specification." : copy.note}
      </p>
    </div>
  );
}

function DimensionInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}
