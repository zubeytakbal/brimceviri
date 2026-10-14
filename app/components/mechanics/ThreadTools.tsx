"use client";

import { useState } from "react";
import { formatTr } from "../../converter/metal/metalWeight";
import {
  ALL_THREADS,
  boltLoads,
  classById,
  decodeClass,
  identifyPipeThread,
  identifyThread,
  PIPE_THREADS,
  PROPERTY_CLASSES,
  threadById,
} from "../../converter/mechanics/threads";

const f = formatTr;
const num = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
};
const mm = (v: number, digits = 3) => `${f(v, digits)} mm`;
const kN = (n: number) => `${f(n / 1000, 1)} kN`;

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

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<{ id: string; label: string }> }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const threadOptions = ALL_THREADS.map((t) => ({ id: t.id, label: t.fine ? `${t.id.replace("x", " × ")} (ince)` : `${t.id} × ${f(t.P, 2)}` }));

/* ---------------- Metrik vida ---------------- */

export function MetricThreadTool() {
  const [id, setId] = useState("M8");
  const [measured, setMeasured] = useState("7,9");
  const [pitch, setPitch] = useState("");
  const t = threadById(id)!;
  const md = num(measured);
  const mp = num(pitch);
  const found = md ? identifyThread(md, mp ?? undefined).slice(0, 3) : [];
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Select label="Vida ölçüsü" value={id} onChange={setId} options={threadOptions} />
        </div>
        <div className="date-calc-results">
          <Stat main label="Kılavuz matkap çapı" value={mm(t.tapDrill, 2)} note={t.fine ? "İnce diş: anma çapı − adım" : "DIN 336"} />
          <Stat label="Diş adımı" value={mm(t.P, 2)} note={t.fine ? "İnce diş" : "Kaba (normal) diş"} />
          {t.clearance ? <Stat label="Geçiş deliği (ince / orta / kaba)" value={`${t.clearance.map((v) => f(v, 1)).join(" / ")} mm`} note="ISO 273" /> : null}
          {t.hex ? <Stat label="Anahtar ağzı" value={`${f(t.hex[0], 1)} mm`} note={t.hex[1] ? `Eski DIN cıvatalarda ${f(t.hex[1], 0)} mm` : "Altıgen başlı cıvata ve somun"} /> : null}
          {t.socket ? <Stat label="Alyan (imbus) anahtarı" value={`${f(t.socket, 1)} mm`} note="ISO 4762 imbus başlı cıvata" /> : null}
          <Stat label="Böğür çapı d2" value={mm(t.d2)} />
          <Stat label="Diş dibi çapı d3 / D1" value={`${f(t.d3, 3)} / ${f(t.D1, 3)} mm`} note="Cıvata / somun" />
          <Stat label="Gerilme kesit alanı" value={`${f(t.As, 1)} mm²`} note="Mukavemet hesabında kullanılır" />
        </div>
        <p className="date-calc-note">Vidanızın ölçüsünü bilmiyor musunuz? Dış çapını kumpasla ölçün; adım tarağınız varsa adımı da girin.</p>
        <div className="date-calc-fields">
          <Field label="Ölçülen dış çap (mm)" value={measured} onChange={setMeasured} />
          <Field label="Adım (mm), isteğe bağlı" value={pitch} onChange={setPitch} />
        </div>
        {md ? (
          <div className="date-calc-results">
            {found.length ? (
              found.map((x, i) => <Stat key={x.id} main={i === 0} label={i === 0 ? "En olası vida" : "Diğer olasılık"} value={x.id.replace("x", " × ")} note={`Adım ${f(x.P, 2)} mm`} />)
            ) : (
              <Stat label="Sonuç" value="Metrik vida bulunamadı" note="İnç (UNC/UNF, BSW) ya da boru dişi olabilir" />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Cıvata mukavemet sınıfı ---------------- */

const coarseOptions = ALL_THREADS.filter((t) => !t.fine && t.d >= 3).map((t) => ({ id: t.id, label: t.id }));

export function BoltClassTool() {
  const [id, setId] = useState("M12");
  const [cls, setCls] = useState("8.8");
  const [code, setCode] = useState("10.9");
  const t = threadById(id)!;
  const c = classById(cls)!;
  const l = boltLoads(t, c);
  const dec = decodeClass(code);
  const limited = c.id === "9.8" && t.d > 16;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Select label="Cıvata ölçüsü" value={id} onChange={setId} options={coarseOptions} />
          <Select label="Mukavemet sınıfı" value={cls} onChange={setCls} options={PROPERTY_CLASSES.map((p) => ({ id: p.id, label: p.id }))} />
        </div>
        {limited ? (
          <p className="date-calc-note">9.8 sınıfı yalnız M16&apos;ya kadar tanımlıdır.</p>
        ) : (
          <div className="date-calc-results">
            <Stat main label="En az kopma yükü" value={kN(l.breaking)} note={`≈ ${f(l.breaking / 9.80665 / 1000, 2)} ton-kuvvet · Rm ${l.rmMin} MPa`} />
            <Stat label="En az akma yükü" value={kN(l.yield)} note={`Re ${l.reMin} MPa`} />
            <Stat label="Deneme (proof) yükü" value={kN(l.proof)} note={`Sp ${l.sp} MPa; kalıcı uzama olmamalı`} />
            <Stat label="Gerilme kesit alanı" value={`${f(t.As, 1)} mm²`} />
          </div>
        )}
        <p className="date-calc-note">Bu değerler cıvatanın kendisinin dayanımıdır; güvenli çalışma yükü değildir. Taşıma ve kaldırma için güvenlik katsayısı ve bağlantı hesabı gerekir.</p>
        <div className="date-calc-fields">
          <Field label="Başındaki kodu çöz (örn. 8.8)" value={code} onChange={setCode} />
        </div>
        {dec ? (
          <div className="date-calc-results">
            <Stat label="Çekme dayanımı (anma)" value={`${dec.rm} MPa`} note={`İlk sayı ${dec.rm / 100} × 100`} />
            <Stat label="Akma dayanımı (anma)" value={`${f(dec.re, 0)} MPa`} note={`Çekme dayanımının %${f(dec.ratio * 100, 0)}'ı`} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Boru dişi ---------------- */

export function PipeThreadTool() {
  const [size, setSize] = useState("1/2");
  const [measured, setMeasured] = useState("20,8");
  const p = PIPE_THREADS.find((x) => x.size === size)!;
  const md = num(measured);
  const found = md ? identifyPipeThread(md) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Select label="Anma ölçüsü (inç)" value={size} onChange={setSize} options={PIPE_THREADS.map((x) => ({ id: x.size, label: `${x.size}″ (DN${x.dn})` }))} />
        </div>
        <div className="date-calc-results">
          <Stat main label="BSP (G / R) dış çap" value={mm(p.bspMajor)} note={`${p.bspTpi} diş/inç · adım ${f(25.4 / p.bspTpi, 3)} mm`} />
          <Stat label="BSP diş dibi çapı" value={mm(p.bspMinor)} />
          <Stat label="NPT dış çap" value={mm(p.npOd)} note={`${f(p.npTpi, 1)} diş/inç · adım ${f(25.4 / p.npTpi, 3)} mm`} />
          <Stat label="Boru anma çapı" value={`DN${p.dn}`} note={`${p.size} inç ≠ ${f(inchValue(p.size) * 25.4, 1)} mm`} />
        </div>
        <p className="date-calc-note">Elinizdeki dişi tanımak için dış dişin tepeden tepeye çapını kumpasla ölçün.</p>
        <div className="date-calc-fields">
          <Field label="Ölçülen dış çap (mm)" value={measured} onChange={setMeasured} />
        </div>
        {found ? (
          <div className="date-calc-results">
            <Stat main label="BSP (Avrupa, Türkiye)" value={`${found.bsp.size}″`} note={`Dış çap ${f(found.bsp.bspMajor, 2)} mm, ${found.bsp.bspTpi} diş/inç`} />
            <Stat label="NPT (Amerikan)" value={`${found.npt.size}″`} note={`Dış çap ${f(found.npt.npOd, 2)} mm, ${f(found.npt.npTpi, 1)} diş/inç`} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** "1 1/4" → 1,25 */
function inchValue(size: string) {
  return size.split(" ").reduce((s, part) => {
    const [a, b] = part.split("/").map(Number);
    return s + (b ? a / b : a);
  }, 0);
}
