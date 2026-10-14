"use client";

import { useState } from "react";
import {
  apparentFromCurrent,
  capacitancePerPhase,
  COLORS,
  compensationVar,
  currentFromApparent,
  decodeBands,
  encodeValue,
  formatOhms,
  powerTriangle,
  slipPercent,
  synchronousSpeed,
  type ColorId,
  type Phase,
} from "../../converter/electrical/power";
import { formatTr, parseTr } from "../../converter/metal/metalWeight";

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

function PhaseSelect({ value, onChange }: { value: Phase; onChange: (v: Phase) => void }) {
  return (
    <label className="date-calc-field">
      <span>Sistem</span>
      <select value={value} onChange={(e) => onChange(e.target.value as Phase)}>
        <option value="three">Üç faz</option>
        <option value="single">Tek faz</option>
      </select>
    </label>
  );
}

/* ---------------- kVA / kW ---------------- */

export function KvaTool() {
  const [mode, setMode] = useState<"kva" | "kw" | "amp">("kw");
  const [value, setValue] = useState("100");
  const [cos, setCos] = useState("0,8");
  const [phase, setPhase] = useState<Phase>("three");
  const [voltage, setVoltage] = useState("400");
  const v = parseTr(value);
  const c = parseTr(cos);
  const V = parseTr(voltage);
  const ok = v !== null && c !== null && c <= 1 && V !== null;
  let S = 0;
  if (ok) S = mode === "kva" ? v! * 1000 : mode === "kw" ? (v! * 1000) / c! : apparentFromCurrent(v!, V!, phase);
  const t = ok ? powerTriangle(S, c!) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Bilinen değer</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
              <option value="kw">Aktif güç (kW)</option>
              <option value="kva">Görünür güç (kVA)</option>
              <option value="amp">Akım (A)</option>
            </select>
          </label>
          <Field label={mode === "kw" ? "kW" : mode === "kva" ? "kVA" : "Akım (A)"} value={value} onChange={setValue} />
          <Field label="Güç faktörü cos φ" value={cos} onChange={setCos} />
          <PhaseSelect value={phase} onChange={setPhase} />
          <Field label={phase === "three" ? "Fazlar arası gerilim (V)" : "Gerilim (V)"} value={voltage} onChange={setVoltage} />
        </div>
        {t && V !== null ? (
          <div className="date-calc-results">
            <Stat main label="Görünür güç S" value={`${f(t.S / 1000, 2)} kVA`} />
            <Stat label="Aktif güç P" value={`${f(t.P / 1000, 2)} kW`} />
            <Stat label="Reaktif güç Q" value={`${f(t.Q / 1000, 2)} kVAr`} />
            <Stat label="Hat akımı" value={`${f(currentFromApparent(t.S, V, phase), 1)} A`} note={phase === "three" ? "I = S / (√3 · V)" : "I = S / V"} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Güç faktörü 0 ile 1 arasında olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Kompanzasyon ---------------- */

export function CompensationTool() {
  const [power, setPower] = useState("100");
  const [cos1, setCos1] = useState("0,8");
  const [cos2, setCos2] = useState("0,95");
  const [voltage, setVoltage] = useState("400");
  const [freq, setFreq] = useState("50");
  const [conn, setConn] = useState<"delta" | "star">("delta");
  const P = parseTr(power);
  const c1 = parseTr(cos1);
  const c2 = parseTr(cos2);
  const V = parseTr(voltage);
  const fr = parseTr(freq);
  const ok = P !== null && c1 !== null && c2 !== null && c1 <= 1 && c2 <= 1 && c2 > c1 && V !== null && fr !== null;
  const Qc = ok ? compensationVar(P! * 1000, c1!, c2!) : 0;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Aktif güç P (kW)" value={power} onChange={setPower} />
          <Field label="Mevcut cos φ1" value={cos1} onChange={setCos1} />
          <Field label="Hedef cos φ2" value={cos2} onChange={setCos2} />
          <Field label="Fazlar arası gerilim (V)" value={voltage} onChange={setVoltage} />
          <Field label="Frekans (Hz)" value={freq} onChange={setFreq} />
          <label className="date-calc-field">
            <span>Kondansatör bağlantısı</span>
            <select value={conn} onChange={(e) => setConn(e.target.value as "delta" | "star")}>
              <option value="delta">Üçgen</option>
              <option value="star">Yıldız</option>
            </select>
          </label>
        </div>
        {ok ? (
          <div className="date-calc-results">
            <Stat main label="Gerekli kondansatör gücü" value={`${f(Qc / 1000, 2)} kVAr`} note="Qc = P · (tan φ1 − tan φ2)" />
            <Stat label="Faz başına kapasite" value={`${f(capacitancePerPhase(Qc, V!, fr!, conn) * 1e6, 1)} µF`} note={conn === "delta" ? "Her kondansatör fazlar arası gerilimde" : "Her kondansatör faz-nötr geriliminde"} />
            <Stat label="Görünür güç (önce / sonra)" value={`${f(P! / c1!, 1)} / ${f(P! / c2!, 1)} kVA`} note={`Akım yaklaşık %${f((1 - c1! / c2!) * 100, 0)} azalır`} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Hedef güç faktörü mevcut değerden büyük ve en fazla 1 olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Motor devri ---------------- */

export function MotorSpeedTool() {
  const [freq, setFreq] = useState("50");
  const [poles, setPoles] = useState("4");
  const [rated, setRated] = useState("1450");
  const fr = parseTr(freq);
  const p = parseTr(poles);
  const n = parseTr(rated);
  const ok = fr !== null && p !== null && p % 2 === 0;
  const ns = ok ? synchronousSpeed(fr!, p!) : 0;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Şebeke frekansı (Hz)" value={freq} onChange={setFreq} />
          <label className="date-calc-field">
            <span>Kutup sayısı</span>
            <select value={poles} onChange={(e) => setPoles(e.target.value)}>
              {[2, 4, 6, 8, 10, 12].map((x) => (
                <option key={x} value={String(x)}>
                  {x} kutup ({x / 2} çift)
                </option>
              ))}
            </select>
          </label>
          <Field label="Etiket devri (dev/dk, isteğe bağlı)" value={rated} onChange={setRated} />
        </div>
        {ok ? (
          <div className="date-calc-results">
            <Stat main label="Senkron devir" value={`${f(ns, 0)} dev/dk`} note="ns = 120 · f / p" />
            {n !== null && n < ns ? <Stat label="Kayma" value={`%${f(slipPercent(ns, n), 2)}`} note={`${f(ns - n, 0)} dev/dk`} /> : null}
            {n !== null && n < ns ? <Stat label="Rotor frekansı" value={`${f((fr! * (ns - n)) / ns, 2)} Hz`} /> : null}
          </div>
        ) : (
          <p className="date-calc-note">{INVALID}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Direnç renk kodu ---------------- */

const DIGITS = COLORS.filter((c) => c.digit !== null);
const MULTS = COLORS;
const TOLS = COLORS.filter((c) => c.tolerance !== null);
const TEMPCOS = COLORS.filter((c) => c.tempco !== null);

function BandSelect({ label, value, options, onChange }: { label: string; value: ColorId; options: typeof COLORS; onChange: (v: ColorId) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as ColorId)}>
        {options.map((c) => (
          <option key={c.id} value={c.id}>
            {c.tr}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResistorDrawing({ bands }: { bands: ColorId[] }) {
  const hex = (id: ColorId) => COLORS.find((c) => c.id === id)!.hex;
  const n = bands.length;
  const x0 = 70;
  const step = n <= 4 ? 34 : 26;
  return (
    <svg viewBox="0 0 360 80" className="resistor-drawing" role="img" aria-label={`Direnç: ${bands.map((b) => COLORS.find((c) => c.id === b)!.tr).join(", ")}`}>
      <line x1="0" y1="40" x2="360" y2="40" stroke="#9aa9b6" strokeWidth="4" />
      <rect x="50" y="14" width="260" height="52" rx="22" fill="#e8d3a7" stroke="#b79c68" />
      {bands.map((b, i) => {
        const isLast = i === n - 1;
        const x = isLast ? 262 : x0 + i * step;
        return <rect key={i} x={x} y="14" width="14" height="52" fill={hex(b)} stroke="#00000022" />;
      })}
    </svg>
  );
}

export function ColorCodeTool() {
  const [count, setCount] = useState<4 | 5 | 6>(4);
  const [b, setB] = useState<ColorId[]>(["yellow", "violet", "black", "red", "gold", "brown"]);
  const [target, setTarget] = useState("4,7k");
  const set = (i: number) => (v: ColorId) => setB((prev) => prev.map((x, j) => (j === i ? v : x)));
  const sig = count === 4 ? 2 : 3;
  const bands = [...b.slice(0, sig), b[3], b[4], ...(count === 6 ? [b[5]] : [])] as ColorId[];
  const res = decodeBands(bands);
  // "4,7k", "220", "1M" gibi girişleri çöz.
  const parsed = (() => {
    const m = target.trim().replace(",", ".").match(/^(\d+(?:\.\d+)?)\s*([kKmMgG]?)/);
    if (!m) return null;
    const mult = { "": 1, k: 1e3, K: 1e3, m: 1e6, M: 1e6, g: 1e9, G: 1e9 }[m[2]] ?? 1;
    return Number(m[1]) * mult;
  })();
  const enc4 = parsed !== null ? encodeValue(parsed, 4) : null;
  const enc5 = parsed !== null ? encodeValue(parsed, 5) : null;
  const name = (id: ColorId) => COLORS.find((c) => c.id === id)!.tr;
  return (
    <div className="date-calc metal-calc">
      <div className="date-converter-modes" role="tablist">
        {([4, 5, 6] as const).map((c) => (
          <button key={c} type="button" role="tab" aria-selected={count === c} className={count === c ? "is-active" : undefined} onClick={() => setCount(c)}>
            {c} bant
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <ResistorDrawing bands={bands} />
        <div className="date-calc-fields">
          {Array.from({ length: sig }, (_, i) => (
            <BandSelect key={i} label={`${i + 1}. hane`} value={b[i]} options={DIGITS} onChange={set(i)} />
          ))}
          <BandSelect label="Çarpan" value={b[3]} options={MULTS} onChange={set(3)} />
          <BandSelect label="Tolerans" value={b[4]} options={TOLS} onChange={set(4)} />
          {count === 6 ? <BandSelect label="Sıcaklık katsayısı" value={b[5]} options={TEMPCOS} onChange={set(5)} /> : null}
        </div>
        {res ? (
          <div className="date-calc-results">
            <Stat main label="Direnç değeri" value={`${formatOhms(res.ohms)}${res.tolerance ? ` ±%${f(res.tolerance, 2)}` : ""}`} />
            {res.min !== null && res.max !== null ? <Stat label="Aralık" value={`${formatOhms(res.min)} – ${formatOhms(res.max)}`} /> : null}
            {res.tempco !== null ? <Stat label="Sıcaklık katsayısı" value={`${res.tempco} ppm/K`} /> : null}
          </div>
        ) : (
          <p className="date-calc-note">{INVALID}</p>
        )}
        <div className="date-calc-fields">
          <Field label="Değerden renk bul (ör. 4,7k, 220, 1M)" value={target} onChange={setTarget} />
        </div>
        {parsed !== null ? (
          <div className="date-calc-results">
            <Stat label="4 bant (+ tolerans)" value={enc4 ? enc4.map(name).join(" – ") : "2 haneyle yazılamıyor"} />
            <Stat label="5 bant (+ tolerans)" value={enc5 ? enc5.map(name).join(" – ") : "3 haneyle yazılamıyor"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
