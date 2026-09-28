"use client";

import { useState } from "react";

type Mode = "real" | "map" | "scale" | "area" | "convert";
type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "mi";
type AreaUnit = "cm2" | "m2" | "km2" | "ha" | "donum" | "in2" | "acre" | "mi2";
export type MapScaleLang = "tr" | "en";

const T = {
  tr: {
    modes: { real: "Haritadan gerçeğe", map: "Gerçekten haritaya", scale: "Ölçeği bul", area: "Alan hesabı", convert: "Ölçek değiştir" },
    scale: "Ölçek",
    firstScale: "İlk ölçek",
    newScale: "Yeni ölçek",
    denominator: "paydası",
    presets: "Hazır ölçekler",
    preset: "Hazır",
    mapLength: "Haritadaki uzunluk",
    realLength: "Gerçek uzunluk",
    unitOf: "birimi",
    direction: "Yön",
    toReal: "Harita alanından gerçek alana",
    toMap: "Gerçek alandan harita alanına",
    mapArea: "Haritadaki alan",
    realArea: "Gerçek alan",
    areaUnit: "Alan birimi",
    invalid: "Geçerli değerler girin. Ondalık için virgül (2,5), binlik için nokta (25.000) kullanabilirsiniz.",
    barLabel: "Çizgi ölçek",
    barCaption: (s: string, per: string) => `Çizgi ölçek (${s}): her bölme haritada 1 cm, gerçekte ${per}.`,
    lengthAt: (s: string) => `${s} ölçekte uzunluk`,
    lengthRatio: "Uzunluk oranı",
    areaRatio: "Alan oranı",
    times: "kat",
    realSteps: (hu: string, d: string, gu: string, km: string) => [
      "Formül: Gerçek uzunluk (GU) = Harita uzunluğu (HU) × Ölçek paydası (ÖP)",
      `HU = ${hu} cm, ÖP = ${d}`,
      `GU = ${hu} × ${d} = ${gu} cm`,
      `${gu} cm ÷ 100.000 = ${km} km (1 km = 100.000 cm)`,
    ],
    mapSteps: (raw: string, gu: string, d: string, hu: string) => [
      "Formül: HU = GU ÷ ÖP (gerçek uzunluk önce cm'ye çevrilir)",
      `GU = ${raw} = ${gu} cm`,
      `HU = ${gu} ÷ ${d} = ${hu} cm`,
    ],
    scaleSteps: (gu: string, hu: string, op: string, s: string) => [
      "Formül: ÖP = GU ÷ HU (iki uzunluk da aynı birimde, cm)",
      `GU = ${gu} cm, HU = ${hu} cm`,
      `ÖP = ${gu} ÷ ${hu} = ${op}`,
      `Ölçek = ${s}`,
    ],
    areaRealSteps: (ha: string, d: string, d2: string, ga: string, km2: string) => [
      "Formül: Gerçek alan (GA) = Harita alanı (HA) × ÖP²",
      `HA = ${ha} cm², ÖP² = ${d}² = ${d2}`,
      `GA = ${ha} × ${d2} = ${ga} cm²`,
      `${ga} cm² ÷ 10.000.000.000 = ${km2} km² (1 km² = 10¹⁰ cm²)`,
    ],
    areaMapSteps: (raw: string, ga: string, d2: string, ha: string) => ["Formül: HA = GA ÷ ÖP²", `GA = ${raw} = ${ga} cm²`, `HA = ${ga} ÷ ${d2} = ${ha} cm²`],
    convertSteps: (hu: string, d: string, d2: string, prod: string, hu2: string) => [
      "Gerçek uzunluk değişmez: HU₁ × ÖP₁ = HU₂ × ÖP₂",
      `${hu} × ${d} = HU₂ × ${d2}`,
      `HU₂ = ${prod} ÷ ${d2} = ${hu2} cm`,
    ],
    grew: (r: string, a: string) => `Ölçek ${r} kat büyüdü: uzunluklar ${r} kat, alanlar ${a} kat büyür.`,
    shrank: (r: string, a: string) => `Ölçek ${r} kat küçüldü: uzunluklar ${r} kat, alanlar ${a} kat küçülür.`,
  },
  en: {
    modes: { real: "Map to ground", map: "Ground to map", scale: "Find the scale", area: "Area", convert: "Change scale" },
    scale: "Scale",
    firstScale: "Original scale",
    newScale: "New scale",
    denominator: "denominator",
    presets: "Common scales",
    preset: "Presets",
    mapLength: "Map distance",
    realLength: "Ground distance",
    unitOf: "unit",
    direction: "Direction",
    toReal: "Map area to real area",
    toMap: "Real area to map area",
    mapArea: "Area on the map",
    realArea: "Real area",
    areaUnit: "Area unit",
    invalid: "Enter valid values. Use a dot for decimals (2.5) and commas for thousands (24,000).",
    barLabel: "Scale bar",
    barCaption: (s: string, per: string) => `Scale bar (${s}): each division is 1 cm on the map and ${per} on the ground.`,
    lengthAt: (s: string) => `Length at ${s}`,
    lengthRatio: "Length ratio",
    areaRatio: "Area ratio",
    times: "×",
    realSteps: (hu: string, d: string, gu: string, km: string) => [
      "Formula: ground distance = map distance × scale denominator",
      `Map distance = ${hu} cm, denominator = ${d}`,
      `Ground distance = ${hu} × ${d} = ${gu} cm`,
      `${gu} cm ÷ 100,000 = ${km} km (1 km = 100,000 cm)`,
    ],
    mapSteps: (raw: string, gu: string, d: string, hu: string) => [
      "Formula: map distance = ground distance ÷ scale denominator (convert the ground distance to cm first)",
      `Ground distance = ${raw} = ${gu} cm`,
      `Map distance = ${gu} ÷ ${d} = ${hu} cm`,
    ],
    scaleSteps: (gu: string, hu: string, op: string, s: string) => [
      "Formula: denominator = ground distance ÷ map distance (both in the same unit)",
      `Ground = ${gu} cm, map = ${hu} cm`,
      `Denominator = ${gu} ÷ ${hu} = ${op}`,
      `Scale = ${s}`,
    ],
    areaRealSteps: (ha: string, d: string, d2: string, ga: string, km2: string) => [
      "Formula: real area = map area × denominator²",
      `Map area = ${ha} cm², denominator² = ${d}² = ${d2}`,
      `Real area = ${ha} × ${d2} = ${ga} cm²`,
      `${ga} cm² ÷ 10,000,000,000 = ${km2} km² (1 km² = 10¹⁰ cm²)`,
    ],
    areaMapSteps: (raw: string, ga: string, d2: string, ha: string) => [
      "Formula: map area = real area ÷ denominator²",
      `Real area = ${raw} = ${ga} cm²`,
      `Map area = ${ga} ÷ ${d2} = ${ha} cm²`,
    ],
    convertSteps: (hu: string, d: string, d2: string, prod: string, hu2: string) => [
      "The ground distance does not change: map₁ × denominator₁ = map₂ × denominator₂",
      `${hu} × ${d} = map₂ × ${d2}`,
      `map₂ = ${prod} ÷ ${d2} = ${hu2} cm`,
    ],
    grew: (r: string, a: string) => `The scale is ${r} times larger: lengths grow ${r}× and areas ${a}×.`,
    shrank: (r: string, a: string) => `The scale is ${r} times smaller: lengths shrink ${r}× and areas ${a}×.`,
  },
};

const SCALE_PRESETS: Record<MapScaleLang, number[]> = {
  tr: [1000, 5000, 10000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000, 5000000, 10000000],
  // 1:24.000 USGS 7,5' topo; 1:63.360 = 1 inc 1 mil
  en: [1000, 2400, 10000, 24000, 25000, 50000, 62500, 63360, 100000, 250000, 500000, 1000000, 5000000],
};

const LENGTH_UNITS: Record<MapScaleLang, { map: LengthUnit[]; real: LengthUnit[] }> = {
  tr: { map: ["mm", "cm", "m", "km"], real: ["mm", "cm", "m", "km"] },
  en: { map: ["mm", "cm", "in"], real: ["m", "km", "ft", "mi"] },
};

/** cm cinsinden katsayi */
const LENGTH_CM: Record<LengthUnit, number> = { mm: 0.1, cm: 1, m: 100, km: 100000, in: 2.54, ft: 30.48, mi: 160934.4 };
/** cm² cinsinden katsayi */
const AREA_CM2: Record<AreaUnit, number> = { cm2: 1, m2: 1e4, km2: 1e10, ha: 1e8, donum: 1e7, in2: 6.4516, acre: 4046.8564224e4, mi2: 2.589988110336e10 };
const AREA_LABEL: Record<MapScaleLang, Record<AreaUnit, string>> = {
  tr: { cm2: "cm²", m2: "m²", km2: "km²", ha: "hektar", donum: "dönüm", in2: "in²", acre: "akre", mi2: "mil²" },
  en: { cm2: "cm²", m2: "m²", km2: "km²", ha: "hectares", donum: "dönüm", in2: "sq in", acre: "acres", mi2: "sq mi" },
};
const AREA_UNITS: Record<MapScaleLang, { map: AreaUnit[]; real: AreaUnit[]; results: AreaUnit[] }> = {
  tr: { map: ["cm2", "m2"], real: ["km2", "ha", "donum", "m2"], results: ["km2", "ha", "donum", "m2"] },
  en: { map: ["cm2", "in2"], real: ["km2", "mi2", "acre", "ha", "m2"], results: ["km2", "mi2", "acre", "ha"] },
};

/** "25.000", "25000", "2,5", "1.250,75" gibi Turkce yazimlari okur. */
export function parseTrNumber(input: string): number {
  let s = input.replace(/\s/g, "").replace(/^1[/:]/, "");
  if (!s) return NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return Number(s);
}

/** "24,000", "2.5", "1,250.75" gibi Ingilizce yazimlari okur. */
export function parseEnNumber(input: string): number {
  const s = input.replace(/\s/g, "").replace(/^1[/:]/, "").replace(/,/g, "");
  return s ? Number(s) : NaN;
}

function makeFormat(lang: MapScaleLang) {
  const locale = lang === "en" ? "en-US" : "tr-TR";
  const fmt = (n: number, max = 4) => {
    if (!Number.isFinite(n)) return "—";
    const abs = Math.abs(n);
    const digits = abs >= 1000 ? 2 : abs >= 1 ? max : 6;
    return n.toLocaleString(locale, { maximumFractionDigits: digits });
  };
  const scaleText = (d: number) => `1${lang === "en" ? ":" : "/"}${fmt(d, 0)}`;
  /** 1 cm'nin gosterdigi uzunluk icin okunur birim. */
  const perCm = (cm: number) => (cm >= 1e5 ? `${fmt(cm / 1e5)} km` : cm >= 100 ? `${fmt(cm / 100)} m` : `${fmt(cm)} cm`);
  const parse = lang === "en" ? parseEnNumber : parseTrNumber;
  return { locale, fmt, scaleText, perCm, parse };
}
type Format = ReturnType<typeof makeFormat>;

function ScaleBar({ denominator, lang, f }: { denominator: number; lang: MapScaleLang; f: Format }) {
  if (!Number.isFinite(denominator) || denominator <= 0) return null;
  // Her bolme 1 cm. Etiketler km ya da m.
  const useKm = denominator >= 100000;
  const unitValue = useKm ? denominator / 1e5 : denominator / 100;
  const unit = useKm ? "km" : "m";
  const t = T[lang];
  return (
    <figure className="map-scale-bar" aria-label={`${t.barLabel}: 1 cm = ${f.perCm(denominator)}`}>
      <svg viewBox="0 0 540 56" role="img">
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={20 + i * 100} y={10} width={100} height={12} className={i % 2 ? "is-light" : "is-dark"} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <text key={i} x={20 + i * 100} y={42} textAnchor="middle">
            {f.fmt(unitValue * i, 2)}
          </text>
        ))}
        <text x={530} y={20} textAnchor="end" className="map-scale-bar-unit">
          {unit}
        </text>
      </svg>
      <figcaption>{t.barCaption(f.scaleText(denominator), f.perCm(denominator))}</figcaption>
    </figure>
  );
}

function ScaleInput({ value, onChange, label, lang, f }: { value: string; onChange: (v: string) => void; label: string; lang: MapScaleLang; f: Format }) {
  const t = T[lang];
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <span className="map-scale-prefix">{lang === "en" ? "1 :" : "1 /"}</span>
        <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-label={`${label} ${t.denominator}`} />
        <select value="" onChange={(event) => event.target.value && onChange(Number(event.target.value).toLocaleString(f.locale))} aria-label={t.presets}>
          <option value="">{t.preset}</option>
          {SCALE_PRESETS[lang].map((p) => (
            <option key={p} value={p}>
              {f.scaleText(p)}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

function LengthInput({
  label,
  value,
  unit,
  units,
  unitLabel,
  onValue,
  onUnit,
}: {
  label: string;
  value: string;
  unit: LengthUnit;
  units: LengthUnit[];
  unitLabel: string;
  onValue: (v: string) => void;
  onUnit: (u: LengthUnit) => void;
}) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <input inputMode="decimal" value={value} onChange={(event) => onValue(event.target.value)} />
        <select value={unit} onChange={(event) => onUnit(event.target.value as LengthUnit)} aria-label={`${label} ${unitLabel}`}>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

const MODE_IDS: Mode[] = ["real", "map", "scale", "area", "convert"];

export default function MapScaleCalculator({ lang = "tr" }: { lang?: MapScaleLang }) {
  const t = T[lang];
  const f = makeFormat(lang);
  const { fmt, scaleText, perCm, parse } = f;
  const en = lang === "en";
  const [mode, setMode] = useState<Mode>("real");
  const [scale, setScale] = useState(en ? "24,000" : "25.000");
  const [scale2, setScale2] = useState(en ? "63,360" : "50.000");
  const [mapLen, setMapLen] = useState(en ? "2" : "4");
  const [mapUnit, setMapUnit] = useState<LengthUnit>(en ? "in" : "cm");
  const [realLen, setRealLen] = useState(en ? "5" : "10");
  const [realUnit, setRealUnit] = useState<LengthUnit>(en ? "mi" : "km");
  const [areaValue, setAreaValue] = useState("6");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(en ? "in2" : "cm2");
  const [areaDirection, setAreaDirection] = useState<"toReal" | "toMap">("toReal");

  const d = parse(scale);
  const d2 = parse(scale2);
  const mapCm = parse(mapLen) * LENGTH_CM[mapUnit];
  const realCm = parse(realLen) * LENGTH_CM[realUnit];
  const validScale = Number.isFinite(d) && d > 0;
  const areaLabel = AREA_LABEL[lang];

  let main: { label: string; value: string } | null = null;
  let extra: Array<{ label: string; value: string }> = [];
  let steps: string[] = [];

  if (mode === "real" && validScale && mapCm > 0) {
    const gu = mapCm * d;
    main = { label: t.realLength, value: gu >= 1e5 ? `${fmt(gu / 1e5)} km` : `${fmt(gu / 100)} m` };
    extra = en
      ? [
          { label: "mi", value: fmt(gu / LENGTH_CM.mi) },
          { label: "ft", value: fmt(gu / LENGTH_CM.ft) },
          { label: "km", value: fmt(gu / 1e5) },
          { label: "m", value: fmt(gu / 100) },
        ]
      : [
          { label: "km", value: fmt(gu / 1e5) },
          { label: "m", value: fmt(gu / 100) },
          { label: "cm", value: fmt(gu) },
        ];
    steps = t.realSteps(fmt(mapCm), fmt(d, 0), fmt(gu), fmt(gu / 1e5));
    if (en) steps.push(`${fmt(gu / 1e5)} km ÷ 1.609344 = ${fmt(gu / LENGTH_CM.mi)} mi`);
  }
  if (mode === "map" && validScale && realCm > 0) {
    const hu = realCm / d;
    main = { label: t.mapLength, value: hu >= 1 ? `${fmt(hu)} cm` : `${fmt(hu * 10)} mm` };
    extra = [
      { label: "cm", value: fmt(hu) },
      { label: "mm", value: fmt(hu * 10) },
      ...(en ? [{ label: "in", value: fmt(hu / 2.54) }] : []),
    ];
    steps = t.mapSteps(`${fmt(parse(realLen))} ${realUnit}`, fmt(realCm), fmt(d, 0), fmt(hu));
  }
  if (mode === "scale" && mapCm > 0 && realCm > 0) {
    const op = realCm / mapCm;
    main = { label: t.scale, value: scaleText(Math.round(op)) };
    extra = [{ label: "1 cm", value: perCm(op) }, ...(en ? [{ label: "1 in", value: `${fmt((op * 2.54) / LENGTH_CM.ft)} ft` }] : [])];
    steps = t.scaleSteps(fmt(realCm), fmt(mapCm), fmt(op), scaleText(Math.round(op)));
  }
  if (mode === "area" && validScale) {
    const v = parse(areaValue);
    if (v > 0) {
      if (areaDirection === "toReal") {
        const mapCm2 = v * AREA_CM2[areaUnit];
        const real = mapCm2 * d * d;
        main = { label: t.realArea, value: real >= 1e10 ? `${fmt(real / 1e10)} km²` : `${fmt(real / 1e4)} m²` };
        extra = AREA_UNITS[lang].results.map((u) => ({ label: areaLabel[u], value: fmt(real / AREA_CM2[u]) }));
        steps = t.areaRealSteps(fmt(mapCm2), fmt(d, 0), fmt(d * d), fmt(real), fmt(real / 1e10));
      } else {
        const realCm2 = v * AREA_CM2[areaUnit];
        const mapA = realCm2 / (d * d);
        main = { label: t.mapArea, value: `${fmt(mapA)} cm²` };
        extra = [
          { label: "cm²", value: fmt(mapA) },
          { label: "mm²", value: fmt(mapA * 100) },
          ...(en ? [{ label: "sq in", value: fmt(mapA / AREA_CM2.in2) }] : []),
        ];
        steps = t.areaMapSteps(`${fmt(v)} ${areaLabel[areaUnit]}`, fmt(realCm2), fmt(d * d), fmt(mapA));
      }
    }
  }
  if (mode === "convert" && validScale && Number.isFinite(d2) && d2 > 0 && mapCm > 0) {
    const hu2 = (mapCm * d) / d2;
    const lengthRatio = d / d2;
    main = { label: t.lengthAt(scaleText(d2)), value: en ? `${fmt(hu2)} cm (${fmt(hu2 / 2.54)} in)` : `${fmt(hu2)} cm` };
    extra = [
      { label: t.lengthRatio, value: `${fmt(lengthRatio)} ${t.times}` },
      { label: t.areaRatio, value: `${fmt(lengthRatio * lengthRatio)} ${t.times}` },
      { label: t.realLength, value: en ? `${fmt((mapCm * d) / LENGTH_CM.mi)} mi` : `${fmt((mapCm * d) / 1e5)} km` },
    ];
    steps = [
      ...t.convertSteps(fmt(mapCm), fmt(d, 0), fmt(d2, 0), fmt(mapCm * d), fmt(hu2)),
      lengthRatio > 1 ? t.grew(fmt(lengthRatio), fmt(lengthRatio * lengthRatio)) : t.shrank(fmt(1 / lengthRatio), fmt(1 / (lengthRatio * lengthRatio))),
    ];
  }

  const units = LENGTH_UNITS[lang];
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {MODE_IDS.map((id) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} className={mode === id ? "is-active" : undefined} onClick={() => setMode(id)}>
              {t.modes[id]}
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          {mode !== "scale" && <ScaleInput value={scale} onChange={setScale} label={mode === "convert" ? t.firstScale : t.scale} lang={lang} f={f} />}
          {mode === "convert" && <ScaleInput value={scale2} onChange={setScale2} label={t.newScale} lang={lang} f={f} />}
          {(mode === "real" || mode === "scale" || mode === "convert") && (
            <LengthInput label={t.mapLength} value={mapLen} unit={mapUnit} units={units.map} unitLabel={t.unitOf} onValue={setMapLen} onUnit={setMapUnit} />
          )}
          {(mode === "map" || mode === "scale") && (
            <LengthInput label={t.realLength} value={realLen} unit={realUnit} units={units.real} unitLabel={t.unitOf} onValue={setRealLen} onUnit={setRealUnit} />
          )}
          {mode === "area" && (
            <>
              <label className="date-calc-field">
                <span>{t.direction}</span>
                <select
                  value={areaDirection}
                  onChange={(event) => {
                    const next = event.target.value as "toReal" | "toMap";
                    setAreaDirection(next);
                    setAreaUnit(next === "toReal" ? AREA_UNITS[lang].map[0] : AREA_UNITS[lang].real[0]);
                  }}
                >
                  <option value="toReal">{t.toReal}</option>
                  <option value="toMap">{t.toMap}</option>
                </select>
              </label>
              <label className="date-calc-field">
                <span>{areaDirection === "toReal" ? t.mapArea : t.realArea}</span>
                <span className="date-calc-field-row">
                  <input inputMode="decimal" value={areaValue} onChange={(event) => setAreaValue(event.target.value)} />
                  <select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)} aria-label={t.areaUnit}>
                    {(areaDirection === "toReal" ? AREA_UNITS[lang].map : AREA_UNITS[lang].real).map((u) => (
                      <option key={u} value={u}>
                        {areaLabel[u]}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </>
          )}
        </div>
      </div>

      {main ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{main.label}</span>
              <strong>{main.value}</strong>
            </div>
            {extra.map((x) => (
              <div className="date-calc-stat" key={x.label}>
                <span>{x.label}</span>
                <strong>{x.value}</strong>
              </div>
            ))}
          </div>
          <ol className="calc-steps">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </>
      ) : (
        <p className="date-calc-note">{t.invalid}</p>
      )}

      {validScale && mode !== "scale" && <ScaleBar denominator={d} lang={lang} f={f} />}
    </div>
  );
}
