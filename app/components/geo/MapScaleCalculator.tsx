"use client";

import { useState } from "react";

type Mode = "real" | "map" | "scale" | "area" | "convert";
type LengthUnit = "mm" | "cm" | "m" | "km";
type AreaUnit = "cm2" | "m2" | "km2" | "ha" | "donum";

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "real", label: "Haritadan gerçeğe" },
  { id: "map", label: "Gerçekten haritaya" },
  { id: "scale", label: "Ölçeği bul" },
  { id: "area", label: "Alan hesabı" },
  { id: "convert", label: "Ölçek değiştir" },
];

const SCALE_PRESETS = [1000, 5000, 10000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000, 2000000, 5000000, 10000000];

/** cm cinsinden katsayi */
const LENGTH_CM: Record<LengthUnit, number> = { mm: 0.1, cm: 1, m: 100, km: 100000 };
/** cm² cinsinden katsayi */
const AREA_CM2: Record<AreaUnit, number> = { cm2: 1, m2: 1e4, km2: 1e10, ha: 1e8, donum: 1e7 };
const AREA_LABEL: Record<AreaUnit, string> = { cm2: "cm²", m2: "m²", km2: "km²", ha: "hektar", donum: "dönüm" };

/** "25.000", "25000", "2,5", "1.250,75" gibi Turkce yazimlari okur. */
export function parseTrNumber(input: string): number {
  let s = input.replace(/\s/g, "").replace(/^1[/:]/, "");
  if (!s) return NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return Number(s);
}

function fmt(n: number, max = 4) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? max : 6;
  return n.toLocaleString("tr-TR", { maximumFractionDigits: digits });
}

function scaleText(d: number) {
  return `1/${fmt(d, 0)}`;
}

function lengthSummary(cm: number) {
  return [
    { label: "km", value: cm / 1e5 },
    { label: "m", value: cm / 100 },
    { label: "cm", value: cm },
  ];
}

/** 1 cm'nin gosterdigi uzunluk icin okunur birim. */
function perCm(d: number) {
  const cm = d;
  if (cm >= 1e5) return `${fmt(cm / 1e5)} km`;
  if (cm >= 100) return `${fmt(cm / 100)} m`;
  return `${fmt(cm)} cm`;
}

function ScaleBar({ denominator }: { denominator: number }) {
  if (!Number.isFinite(denominator) || denominator <= 0) return null;
  // Her bolme 1 cm. Etiketler km ya da m.
  const useKm = denominator >= 100000;
  const unitValue = useKm ? denominator / 1e5 : denominator / 100;
  const unit = useKm ? "km" : "m";
  return (
    <figure className="map-scale-bar" aria-label={`Çizgi ölçek: 1 cm = ${perCm(denominator)}`}>
      <svg viewBox="0 0 540 56" role="img">
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={20 + i * 100} y={10} width={100} height={12} className={i % 2 ? "is-light" : "is-dark"} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <text key={i} x={20 + i * 100} y={42} textAnchor="middle">
            {fmt(unitValue * i, 2)}
          </text>
        ))}
        <text x={530} y={20} textAnchor="end" className="map-scale-bar-unit">
          {unit}
        </text>
      </svg>
      <figcaption>
        Çizgi ölçek ({scaleText(denominator)}): her bölme haritada 1 cm, gerçekte {perCm(denominator)}.
      </figcaption>
    </figure>
  );
}

function ScaleInput({ value, onChange, label = "Ölçek" }: { value: string; onChange: (v: string) => void; label?: string }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <span className="map-scale-prefix">1 /</span>
        <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-label={`${label} paydası`} />
        <select value="" onChange={(event) => event.target.value && onChange(Number(event.target.value).toLocaleString("tr-TR"))} aria-label="Hazır ölçekler">
          <option value="">Hazır</option>
          {SCALE_PRESETS.map((p) => (
            <option key={p} value={p}>
              {scaleText(p)}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

function LengthInput({ label, value, unit, onValue, onUnit }: { label: string; value: string; unit: LengthUnit; onValue: (v: string) => void; onUnit: (u: LengthUnit) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <input inputMode="decimal" value={value} onChange={(event) => onValue(event.target.value)} />
        <select value={unit} onChange={(event) => onUnit(event.target.value as LengthUnit)} aria-label={`${label} birimi`}>
          {(Object.keys(LENGTH_CM) as LengthUnit[]).map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export default function MapScaleCalculator() {
  const [mode, setMode] = useState<Mode>("real");
  const [scale, setScale] = useState("25.000");
  const [scale2, setScale2] = useState("50.000");
  const [mapLen, setMapLen] = useState("4");
  const [mapUnit, setMapUnit] = useState<LengthUnit>("cm");
  const [realLen, setRealLen] = useState("10");
  const [realUnit, setRealUnit] = useState<LengthUnit>("km");
  const [areaValue, setAreaValue] = useState("6");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("cm2");
  const [areaDirection, setAreaDirection] = useState<"toReal" | "toMap">("toReal");

  const d = parseTrNumber(scale);
  const d2 = parseTrNumber(scale2);
  const mapCm = parseTrNumber(mapLen) * LENGTH_CM[mapUnit];
  const realCm = parseTrNumber(realLen) * LENGTH_CM[realUnit];
  const validScale = Number.isFinite(d) && d > 0;

  let main: { label: string; value: string } | null = null;
  let extra: Array<{ label: string; value: string }> = [];
  let steps: string[] = [];

  if (mode === "real" && validScale && mapCm > 0) {
    const gu = mapCm * d;
    main = { label: "Gerçek uzunluk", value: gu >= 1e5 ? `${fmt(gu / 1e5)} km` : `${fmt(gu / 100)} m` };
    extra = lengthSummary(gu).map((x) => ({ label: x.label, value: fmt(x.value) }));
    steps = [
      "Formül: Gerçek uzunluk (GU) = Harita uzunluğu (HU) × Ölçek paydası (ÖP)",
      `HU = ${fmt(mapCm)} cm, ÖP = ${fmt(d, 0)}`,
      `GU = ${fmt(mapCm)} × ${fmt(d, 0)} = ${fmt(gu)} cm`,
      `${fmt(gu)} cm ÷ 100.000 = ${fmt(gu / 1e5)} km (1 km = 100.000 cm)`,
    ];
  }
  if (mode === "map" && validScale && realCm > 0) {
    const hu = realCm / d;
    main = { label: "Haritadaki uzunluk", value: hu >= 1 ? `${fmt(hu)} cm` : `${fmt(hu * 10)} mm` };
    extra = [
      { label: "cm", value: fmt(hu) },
      { label: "mm", value: fmt(hu * 10) },
    ];
    steps = [
      "Formül: HU = GU ÷ ÖP (gerçek uzunluk önce cm'ye çevrilir)",
      `GU = ${fmt(parseTrNumber(realLen))} ${realUnit} = ${fmt(realCm)} cm`,
      `HU = ${fmt(realCm)} ÷ ${fmt(d, 0)} = ${fmt(hu)} cm`,
    ];
  }
  if (mode === "scale" && mapCm > 0 && realCm > 0) {
    const op = realCm / mapCm;
    main = { label: "Ölçek", value: scaleText(Math.round(op)) };
    extra = [{ label: "1 cm", value: perCm(op) }];
    steps = [
      "Formül: ÖP = GU ÷ HU (iki uzunluk da aynı birimde, cm)",
      `GU = ${fmt(realCm)} cm, HU = ${fmt(mapCm)} cm`,
      `ÖP = ${fmt(realCm)} ÷ ${fmt(mapCm)} = ${fmt(op)}`,
      `Ölçek = ${scaleText(Math.round(op))}`,
    ];
  }
  if (mode === "area" && validScale) {
    const v = parseTrNumber(areaValue);
    if (v > 0) {
      if (areaDirection === "toReal") {
        const mapCm2 = v * AREA_CM2[areaUnit];
        const real = mapCm2 * d * d;
        main = { label: "Gerçek alan", value: real >= 1e10 ? `${fmt(real / 1e10)} km²` : `${fmt(real / 1e4)} m²` };
        extra = (["km2", "ha", "donum", "m2"] as AreaUnit[]).map((u) => ({ label: AREA_LABEL[u], value: fmt(real / AREA_CM2[u]) }));
        steps = [
          "Formül: Gerçek alan (GA) = Harita alanı (HA) × ÖP²",
          `HA = ${fmt(mapCm2)} cm², ÖP² = ${fmt(d, 0)}² = ${fmt(d * d)}`,
          `GA = ${fmt(mapCm2)} × ${fmt(d * d)} = ${fmt(real)} cm²`,
          `${fmt(real)} cm² ÷ 10.000.000.000 = ${fmt(real / 1e10)} km² (1 km² = 10¹⁰ cm²)`,
        ];
      } else {
        const realCm2 = v * AREA_CM2[areaUnit];
        const mapA = realCm2 / (d * d);
        main = { label: "Haritadaki alan", value: `${fmt(mapA)} cm²` };
        extra = [
          { label: "cm²", value: fmt(mapA) },
          { label: "mm²", value: fmt(mapA * 100) },
        ];
        steps = [
          "Formül: HA = GA ÷ ÖP²",
          `GA = ${fmt(v)} ${AREA_LABEL[areaUnit]} = ${fmt(realCm2)} cm²`,
          `HA = ${fmt(realCm2)} ÷ ${fmt(d * d)} = ${fmt(mapA)} cm²`,
        ];
      }
    }
  }
  if (mode === "convert" && validScale && Number.isFinite(d2) && d2 > 0 && mapCm > 0) {
    const hu2 = (mapCm * d) / d2;
    const lengthRatio = d / d2;
    main = { label: `${scaleText(d2)} ölçekte uzunluk`, value: `${fmt(hu2)} cm` };
    extra = [
      { label: "Uzunluk oranı", value: `${fmt(lengthRatio)} kat` },
      { label: "Alan oranı", value: `${fmt(lengthRatio * lengthRatio)} kat` },
      { label: "Gerçek uzunluk", value: `${fmt((mapCm * d) / 1e5)} km` },
    ];
    steps = [
      "Gerçek uzunluk değişmez: HU₁ × ÖP₁ = HU₂ × ÖP₂",
      `${fmt(mapCm)} × ${fmt(d, 0)} = HU₂ × ${fmt(d2, 0)}`,
      `HU₂ = ${fmt(mapCm * d)} ÷ ${fmt(d2, 0)} = ${fmt(hu2)} cm`,
      lengthRatio > 1
        ? `Ölçek ${fmt(lengthRatio)} kat büyüdü: uzunluklar ${fmt(lengthRatio)} kat, alanlar ${fmt(lengthRatio * lengthRatio)} kat büyür.`
        : `Ölçek ${fmt(1 / lengthRatio)} kat küçüldü: uzunluklar ${fmt(1 / lengthRatio)} kat, alanlar ${fmt(1 / (lengthRatio * lengthRatio))} kat küçülür.`,
    ];
  }

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {MODES.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          {mode !== "scale" && <ScaleInput value={scale} onChange={setScale} label={mode === "convert" ? "İlk ölçek" : "Ölçek"} />}
          {mode === "convert" && <ScaleInput value={scale2} onChange={setScale2} label="Yeni ölçek" />}
          {(mode === "real" || mode === "scale" || mode === "convert") && (
            <LengthInput label="Haritadaki uzunluk" value={mapLen} unit={mapUnit} onValue={setMapLen} onUnit={setMapUnit} />
          )}
          {(mode === "map" || mode === "scale") && (
            <LengthInput label="Gerçek uzunluk" value={realLen} unit={realUnit} onValue={setRealLen} onUnit={setRealUnit} />
          )}
          {mode === "area" && (
            <>
              <label className="date-calc-field">
                <span>Yön</span>
                <select value={areaDirection} onChange={(event) => {
                    const next = event.target.value as "toReal" | "toMap";
                    setAreaDirection(next);
                    setAreaUnit(next === "toReal" ? "cm2" : "km2");
                  }}>
                  <option value="toReal">Harita alanından gerçek alana</option>
                  <option value="toMap">Gerçek alandan harita alanına</option>
                </select>
              </label>
              <label className="date-calc-field">
                <span>{areaDirection === "toReal" ? "Haritadaki alan" : "Gerçek alan"}</span>
                <span className="date-calc-field-row">
                  <input inputMode="decimal" value={areaValue} onChange={(event) => setAreaValue(event.target.value)} />
                  <select value={areaUnit} onChange={(event) => setAreaUnit(event.target.value as AreaUnit)} aria-label="Alan birimi">
                    {(areaDirection === "toReal" ? (["cm2", "m2"] as AreaUnit[]) : (["km2", "ha", "donum", "m2"] as AreaUnit[])).map((u) => (
                      <option key={u} value={u}>
                        {AREA_LABEL[u]}
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
        <p className="date-calc-note">Geçerli değerler girin. Ondalık için virgül (2,5), binlik için nokta (25.000) kullanabilirsiniz.</p>
      )}

      {validScale && mode !== "scale" && <ScaleBar denominator={d} />}
    </div>
  );
}
