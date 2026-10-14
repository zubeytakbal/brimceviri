"use client";

import { useMemo, useState } from "react";
import { E_ALUMINIUM, E_STEEL, G_STEEL, GRAVITY, solveBeam, type BeamLoad, type Support } from "../../converter/mechanics/beam";
import {
  BUCKLING_K,
  eulerLoad,
  isValidShape,
  requiredSolidDiameter,
  sectionProps,
  shaftShearStress,
  shaftTwist,
  torqueFromPower,
  type EndCondition,
  type SectionShape,
} from "../../converter/mechanics/section";
import { formatTr, parseTr } from "../../converter/metal/metalWeight";
import { SERIES_LABELS, sectionName } from "../../converter/metal/steelNames";
import { STEEL_SECTIONS, type SteelSeriesId } from "../../converter/metal/steelSections";

export type MechanicsKind = "beam" | "section" | "buckling" | "shaft";

const f = formatTr;
const INVALID = "Geçerli değerler girerek sonucu görebilirsiniz.";

function Stat({ label, value, main, note }: { label: string; value: string; main?: boolean; note?: string }) {
  return (
    <div className={main ? "date-calc-stat is-main" : "date-calc-stat"}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <em>{note}</em> : null}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Tabs<T extends string>({ value, options, onChange }: { value: T; options: Array<{ id: T; label: string }>; onChange: (v: T) => void }) {
  return (
    <div className="date-converter-modes" role="tablist">
      {options.map((o) => (
        <button key={o.id} type="button" role="tab" aria-selected={value === o.id} className={value === o.id ? "is-active" : undefined} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Kesit seçici ---------------- */

type ShapeKind = SectionShape["kind"];
type Source = "profile" | ShapeKind;

/** Kesitin mühendislik değerleri (mm tabanlı) ve metre ağırlığı. */
type PickedSection = { name: string; A: number; Iy: number; Iz: number; Wy: number; Wz: number; iy: number; iz: number; J?: number; kgPerM: number; fromCatalog: boolean };

const SOURCE_OPTIONS: Array<{ id: Source; label: string }> = [
  { id: "profile", label: "Çelik profil" },
  { id: "rectangle", label: "Dikdörtgen" },
  { id: "circle", label: "Dolu daire" },
  { id: "tube", label: "Boru" },
  { id: "box", label: "Kutu" },
  { id: "i", label: "I kesit" },
];

function useSectionPicker(defaultSource: Source = "profile") {
  const [source, setSource] = useState<Source>(defaultSource);
  const [series, setSeries] = useState<SteelSeriesId>("IPE");
  const [size, setSize] = useState("200");
  const [dims, setDims] = useState<Record<string, string>>({ b: "100", h: "200", d: "50", D: "60,3", t: "4", B: "100", H: "200", tw: "6", tf: "10" });
  const set = (k: string) => (v: string) => setDims((prev) => ({ ...prev, [k]: v }));

  const picked: PickedSection | null = useMemo(() => {
    const n = (k: string) => parseTr(dims[k]) ?? NaN;
    if (source === "profile") {
      const s = STEEL_SECTIONS[series].find((x) => String(x.size) === size) ?? STEEL_SECTIONS[series][0];
      // Katalog: cm → mm
      return { name: sectionName(series, s.size), A: s.A * 100, Iy: s.Iy * 1e4, Iz: s.Iz * 1e4, Wy: s.Wely * 1e3, Wz: s.Welz * 1e3, iy: Math.sqrt((s.Iy * 1e4) / (s.A * 100)), iz: Math.sqrt((s.Iz * 1e4) / (s.A * 100)), kgPerM: s.G, fromCatalog: true };
    }
    const shape: SectionShape =
      source === "rectangle"
        ? { kind: "rectangle", b: n("b"), h: n("h") }
        : source === "circle"
          ? { kind: "circle", d: n("d") }
          : source === "tube"
            ? { kind: "tube", D: n("D"), t: n("t") }
            : source === "box"
              ? { kind: "box", B: n("B"), H: n("H"), t: n("t") }
              : { kind: "i", b: n("b"), h: n("h"), tw: n("tw"), tf: n("tf") };
    if (!isValidShape(shape)) return null;
    const p = sectionProps(shape);
    return { name: SOURCE_OPTIONS.find((o) => o.id === source)?.label ?? "", ...p, kgPerM: (p.A * 7850) / 1e6, fromCatalog: false };
  }, [source, series, size, dims]);

  const ui = (
    <>
      <div className="date-calc-fields">
        <label className="date-calc-field">
          <span>Kesit</span>
          <select value={source} onChange={(e) => setSource(e.target.value as Source)}>
            {SOURCE_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {source === "profile" ? (
          <>
            <label className="date-calc-field">
              <span>Seri</span>
              <select
                value={series}
                onChange={(e) => {
                  const next = e.target.value as SteelSeriesId;
                  setSeries(next);
                  if (!STEEL_SECTIONS[next].some((s) => String(s.size) === size)) setSize(String(STEEL_SECTIONS[next][0].size));
                }}
              >
                {(Object.keys(SERIES_LABELS) as SteelSeriesId[]).map((id) => (
                  <option key={id} value={id}>
                    {SERIES_LABELS[id]}
                  </option>
                ))}
              </select>
            </label>
            <label className="date-calc-field">
              <span>Profil</span>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                {STEEL_SECTIONS[series].map((s) => (
                  <option key={s.size} value={String(s.size)}>
                    {sectionName(series, s.size)}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}
        {source === "rectangle" ? (
          <>
            <Field label="Genişlik b (mm)" value={dims.b} onChange={set("b")} />
            <Field label="Yükseklik h (mm)" value={dims.h} onChange={set("h")} />
          </>
        ) : null}
        {source === "circle" ? <Field label="Çap d (mm)" value={dims.d} onChange={set("d")} /> : null}
        {source === "tube" ? (
          <>
            <Field label="Dış çap D (mm)" value={dims.D} onChange={set("D")} />
            <Field label="Et kalınlığı t (mm)" value={dims.t} onChange={set("t")} />
          </>
        ) : null}
        {source === "box" ? (
          <>
            <Field label="Yükseklik H (mm)" value={dims.H} onChange={set("H")} />
            <Field label="Genişlik B (mm)" value={dims.B} onChange={set("B")} />
            <Field label="Et kalınlığı t (mm)" value={dims.t} onChange={set("t")} />
          </>
        ) : null}
        {source === "i" ? (
          <>
            <Field label="Yükseklik h (mm)" value={dims.h} onChange={set("h")} />
            <Field label="Başlık genişliği b (mm)" value={dims.b} onChange={set("b")} />
            <Field label="Gövde kalınlığı tw (mm)" value={dims.tw} onChange={set("tw")} />
            <Field label="Başlık kalınlığı tf (mm)" value={dims.tf} onChange={set("tf")} />
          </>
        ) : null}
      </div>
    </>
  );
  return { picked, ui };
}

function useModulus() {
  const [mat, setMat] = useState<"steel" | "aluminium" | "custom">("steel");
  const [custom, setCustom] = useState("200");
  const E = mat === "steel" ? E_STEEL : mat === "aluminium" ? E_ALUMINIUM : (parseTr(custom) ?? NaN) * 1e9;
  const ui = (
    <>
      <label className="date-calc-field">
        <span>Malzeme (E)</span>
        <select value={mat} onChange={(e) => setMat(e.target.value as typeof mat)}>
          <option value="steel">Yapı çeliği – 210 GPa</option>
          <option value="aluminium">Alüminyum – 70 GPa</option>
          <option value="custom">Başka değer gir</option>
        </select>
      </label>
      {mat === "custom" ? <Field label="E (GPa)" value={custom} onChange={setCustom} /> : null}
    </>
  );
  return { E, ui };
}

/* ---------------- Diyagram ---------------- */

function Diagram({ values, label, unit, invert }: { values: number[]; label: string; unit: string; invert?: boolean }) {
  const W = 600;
  const H = 120;
  const max = Math.max(...values.map(Math.abs), 1e-12);
  const shown = values.map((v) => (invert ? -v : v));
  // Tek işaretli diyagramda eksen kenara alınır, tüm yükseklik kullanılır.
  const allDown = shown.every((v) => v <= 1e-12 * max);
  const allUp = shown.every((v) => v >= -1e-12 * max);
  const base = allDown ? 8 : allUp ? H - 8 : H / 2;
  const scale = allDown || allUp ? H - 16 : H / 2 - 8;
  const pts = shown.map((v, i) => `${(i / (values.length - 1)) * W},${base - (v / max) * scale}`);
  return (
    <figure className="beam-diagram">
      <figcaption>
        {label} (en büyük {f(max, 3)} {unit})
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="none">
        <line x1="0" y1={base} x2={W} y2={base} className="beam-diagram-axis" />
        <polygon points={`0,${base} ${pts.join(" ")} ${W},${base}`} className="beam-diagram-fill" />
        <polyline points={pts.join(" ")} className="beam-diagram-line" />
      </svg>
    </figure>
  );
}

/* ---------------- Kiriş ---------------- */

const SUPPORTS: Array<{ id: Support; label: string }> = [
  { id: "simple", label: "Basit mesnetli" },
  { id: "cantilever", label: "Konsol" },
  { id: "fixed", label: "İki ucu ankastre" },
];

function BeamTool() {
  const [support, setSupport] = useState<Support>("simple");
  const [length, setLength] = useState("6");
  const [point, setPoint] = useState("10");
  const [pos, setPos] = useState("3");
  const [udl, setUdl] = useState("5");
  const [selfWeight, setSelfWeight] = useState(true);
  const [axis, setAxis] = useState<"y" | "z">("y");
  const [limit, setLimit] = useState("300");
  const { picked, ui: sectionUi } = useSectionPicker();
  const { E, ui: modulusUi } = useModulus();

  const L = parseTr(length);
  const P = Number((point || "0").replace(",", "."));
  const a = parseTr(pos) ?? (support === "cantilever" ? L ?? 0 : (L ?? 0) / 2);
  const w = Number((udl || "0").replace(",", "."));
  const lim = parseTr(limit);

  const result = useMemo(() => {
    if (!picked || L === null || !Number.isFinite(E) || E <= 0 || !Number.isFinite(P) || !Number.isFinite(w) || P < 0 || w < 0) return null;
    if (a < 0 || a > L) return null;
    const I = (axis === "y" ? picked.Iy : picked.Iz) * 1e-12;
    const W = (axis === "y" ? picked.Wy : picked.Wz) * 1e-9;
    const g = selfWeight ? picked.kgPerM * GRAVITY : 0;
    const loads: BeamLoad[] = [];
    if (P > 0) loads.push({ kind: "point", P: P * 1000, a });
    if (w > 0 || g > 0) loads.push({ kind: "udl", w: w * 1000 + g });
    if (loads.length === 0) return null;
    const r = solveBeam({ support, L, EI: E * I, loads });
    const N = 120;
    const xs = Array.from({ length: N + 1 }, (_, i) => (L * i) / N);
    return { r, W, g, Ms: xs.map((x) => r.M(x) / 1000), vs: xs.map((x) => r.v(x) * 1000) };
  }, [picked, L, E, P, w, a, axis, selfWeight, support]);

  return (
    <div className="date-calc metal-calc">
      <Tabs value={support} options={SUPPORTS} onChange={setSupport} />
      <div className="date-calc-input">
        {sectionUi}
        <div className="date-calc-fields">
          {modulusUi}
          <label className="date-calc-field">
            <span>Eğilme ekseni</span>
            <select value={axis} onChange={(e) => setAxis(e.target.value as "y" | "z")}>
              <option value="y">Güçlü eksen (y)</option>
              <option value="z">Zayıf eksen (z)</option>
            </select>
          </label>
        </div>
        <div className="date-calc-fields">
          <Field label="Açıklık L (m)" value={length} onChange={setLength} />
          <Field label="Tekil yük P (kN)" value={point} onChange={setPoint} />
          <Field label={support === "cantilever" ? "P'nin ankastreden uzaklığı (m)" : "P'nin sol mesnetten uzaklığı (m)"} value={pos} onChange={setPos} />
          <Field label="Yayılı yük w (kN/m)" value={udl} onChange={setUdl} />
          <Field label="Sehim sınırı L /" value={limit} onChange={setLimit} />
        </div>
        <label className="metal-check">
          <input type="checkbox" checked={selfWeight} onChange={(e) => setSelfWeight(e.target.checked)} /> Kesitin öz ağırlığını yayılı yüke ekle
          {picked ? ` (${f(picked.kgPerM, 1)} kg/m)` : ""}
        </label>
        {result && L !== null ? (
          <>
            <div className="date-calc-results">
              <Stat main label="En büyük sehim" value={`${f(Math.abs(result.r.maxDeflection) * 1000, 2)} mm`} note={`x = ${f(result.r.maxDeflectionAt, 2)} m · L/${f(L / Math.abs(result.r.maxDeflection), 0)}`} />
              <Stat label="En büyük moment" value={`${f(Math.abs(result.r.maxMoment) / 1000, 2)} kN·m`} note={`x = ${f(result.r.maxMomentAt, 2)} m`} />
              <Stat label="En büyük eğilme gerilmesi" value={`${f(Math.abs(result.r.maxMoment) / result.W / 1e6, 1)} MPa`} note="σ = M / W" />
              <Stat label="Mesnet tepkileri" value={support === "cantilever" ? `${f(result.r.R1 / 1000, 2)} kN` : `${f(result.r.R1 / 1000, 2)} / ${f(result.r.R2 / 1000, 2)} kN`} note={support === "cantilever" ? "Ankastre uç" : "Sol / sağ"} />
              {support !== "simple" ? <Stat label="Ankastre uç momenti" value={support === "cantilever" ? `${f(Math.abs(result.r.M1) / 1000, 2)} kN·m` : `${f(Math.abs(result.r.M1) / 1000, 2)} / ${f(Math.abs(result.r.M2) / 1000, 2)} kN·m`} /> : null}
              {lim !== null ? (
                <Stat
                  label={`Sehim sınırı (L/${f(lim, 0)})`}
                  value={`${f((L / lim) * 1000, 1)} mm`}
                  note={Math.abs(result.r.maxDeflection) <= L / lim ? "Hesaplanan sehim bu sınırın içinde" : "Hesaplanan sehim bu sınırı aşıyor"}
                />
              ) : null}
            </div>
            <Diagram values={result.Ms} label="Moment diyagramı (kN·m)" unit="kN·m" invert />
            <Diagram values={result.vs} label="Sehim eğrisi (mm)" unit="mm" invert />
          </>
        ) : (
          <p className="date-calc-note">{INVALID} Yükün yeri 0 ile L arasında olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Kesit özellikleri ---------------- */

function SectionTool() {
  const { picked, ui } = useSectionPicker("rectangle");
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        {ui}
        {picked ? (
          <div className="date-calc-results">
            <Stat main label="Atalet momenti Iy (güçlü eksen)" value={`${f(picked.Iy / 1e4, 2)} cm⁴`} note={`${f(picked.Iy, 0)} mm⁴`} />
            <Stat label="Atalet momenti Iz (zayıf eksen)" value={`${f(picked.Iz / 1e4, 2)} cm⁴`} />
            <Stat label="Kesit modülü Wy / Wz" value={`${f(picked.Wy / 1e3, 2)} / ${f(picked.Wz / 1e3, 2)} cm³`} />
            <Stat label="Kesit alanı A" value={`${f(picked.A / 100, 2)} cm²`} />
            <Stat label="Atalet yarıçapı iy / iz" value={`${f(picked.iy / 10, 2)} / ${f(picked.iz / 10, 2)} cm`} />
            {picked.J ? <Stat label="Polar atalet momenti J" value={`${f(picked.J / 1e4, 2)} cm⁴`} /> : null}
            <Stat label="Çelik metre ağırlığı" value={`${f(picked.kgPerM, 2)} kg/m`} note={picked.fromCatalog ? "Katalog değeri" : "A × 7850 kg/m³"} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Et kalınlığı kenarların yarısından küçük olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Burkulma ---------------- */

const END_OPTIONS: Array<{ id: EndCondition; label: string }> = [
  { id: "pinned-pinned", label: "İki ucu mafsallı (K = 1)" },
  { id: "fixed-free", label: "Bir ucu ankastre, diğeri serbest (K = 2)" },
  { id: "fixed-pinned", label: "Ankastre – mafsallı (K = 0,7)" },
  { id: "fixed-fixed", label: "İki ucu ankastre (K = 0,5)" },
];

function BucklingTool() {
  const { picked, ui } = useSectionPicker();
  const { E, ui: modulusUi } = useModulus();
  const [end, setEnd] = useState<EndCondition>("pinned-pinned");
  const [length, setLength] = useState("3");
  const L = parseTr(length);
  const res = useMemo(() => {
    if (!picked || L === null || !Number.isFinite(E) || E <= 0) return null;
    const K = BUCKLING_K[end];
    const weakI = Math.min(picked.Iy, picked.Iz);
    const iMin = Math.min(picked.iy, picked.iz);
    const Pcr = eulerLoad(E, weakI * 1e-12, L, K);
    const lambda = (K * L * 1000) / iMin;
    const lambda1 = (fy: number) => Math.PI * Math.sqrt(E / (fy * 1e6));
    return { K, Pcr, lambda, sigma: Pcr / (picked.A * 1e-6), l235: lambda / lambda1(235), l355: lambda / lambda1(355) };
  }, [picked, L, E, end]);
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        {ui}
        <div className="date-calc-fields">
          {modulusUi}
          <label className="date-calc-field">
            <span>Uç koşulu</span>
            <select value={end} onChange={(e) => setEnd(e.target.value as EndCondition)}>
              {END_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Eleman boyu L (m)" value={length} onChange={setLength} />
        </div>
        {res && L !== null ? (
          <div className="date-calc-results">
            <Stat main label="Euler kritik yükü Pcr" value={`${f(res.Pcr / 1000, 1)} kN`} note="Zayıf eksen için" />
            <Stat label="Burkulma boyu K·L" value={`${f(res.K * L, 2)} m`} />
            <Stat label="Narinlik λ = K·L / i" value={f(res.lambda, 1)} />
            <Stat label="Kritik gerilme σcr" value={`${f(res.sigma / 1e6, 1)} MPa`} />
            <Stat label="Bağıl narinlik λ̄ (S235 / S355)" value={`${f(res.l235, 2)} / ${f(res.l355, 2)}`} note="λ̄ = λ / (π√(E/fy))" />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Mil burulması ---------------- */

function ShaftTool() {
  const [mode, setMode] = useState<"power" | "torque">("power");
  const [power, setPower] = useState("7,5");
  const [rpm, setRpm] = useState("1450");
  const [torque, setTorque] = useState("50");
  const [D, setD] = useState("30");
  const [d, setDi] = useState("0");
  const [len, setLen] = useState("1");
  const [tauAllow, setTauAllow] = useState("40");
  const T = mode === "power" ? (parseTr(power) !== null && parseTr(rpm) !== null ? torqueFromPower(parseTr(power)! * 1000, parseTr(rpm)!) : null) : parseTr(torque);
  const Dm = parseTr(D);
  const dm = Number((d || "0").replace(",", "."));
  const Lm = parseTr(len);
  const ta = parseTr(tauAllow);
  const valid = T !== null && Dm !== null && Number.isFinite(dm) && dm >= 0 && dm < Dm;
  return (
    <div className="date-calc metal-calc">
      <Tabs
        value={mode}
        options={[
          { id: "power", label: "Güç ve devirden" },
          { id: "torque", label: "Torktan" },
        ]}
        onChange={setMode}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          {mode === "power" ? (
            <>
              <Field label="Güç (kW)" value={power} onChange={setPower} />
              <Field label="Devir (dev/dk)" value={rpm} onChange={setRpm} />
            </>
          ) : (
            <Field label="Tork (N·m)" value={torque} onChange={setTorque} />
          )}
          <Field label="Mil dış çapı D (mm)" value={D} onChange={setD} />
          <Field label="İç çap d (mm, dolu mil 0)" value={d} onChange={setDi} />
          <Field label="Mil boyu L (m)" value={len} onChange={setLen} />
          <Field label="İzin verilen τ (MPa)" value={tauAllow} onChange={setTauAllow} />
        </div>
        {valid && T !== null && Dm !== null ? (
          <div className="date-calc-results">
            <Stat main label="En büyük kayma gerilmesi τ" value={`${f(shaftShearStress(T, Dm / 1000, dm / 1000) / 1e6, 1)} MPa`} />
            <Stat label="Tork T" value={`${f(T, 1)} N·m`} />
            {Lm !== null ? (
              <Stat label="Burulma açısı (çelik, G = 81 GPa)" value={`${f((shaftTwist(T, Lm, G_STEEL, Dm / 1000, dm / 1000) * 180) / Math.PI, 3)}°`} note={`${f((shaftTwist(T, 1, G_STEEL, Dm / 1000, dm / 1000) * 180) / Math.PI, 3)}°/m`} />
            ) : null}
            {ta !== null ? <Stat label="Gereken dolu mil çapı" value={`${f(requiredSolidDiameter(T, ta * 1e6) * 1000, 1)} mm`} note={`τ = ${f(ta, 0)} MPa için`} /> : null}
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} İç çap dış çaptan küçük olmalı.</p>
        )}
      </div>
    </div>
  );
}

export default function MechanicsTool({ kind }: { kind: MechanicsKind }) {
  if (kind === "beam") return <BeamTool />;
  if (kind === "section") return <SectionTool />;
  if (kind === "buckling") return <BucklingTool />;
  return <ShaftTool />;
}
