"use client";

import { useState } from "react";
import { formatTr } from "../../converter/metal/metalWeight";
import { boilingPointC, interpolateRow, interpolateSat, isaPressureKpa } from "../../converter/thermal/fluidProps";
import { AIR_1ATM, SAT_STEAM_P, SAT_STEAM_T, WATER_1ATM } from "../../converter/thermal/fluidTables";

const f = formatTr;
const num = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() !== "" && Number.isFinite(n) ? n : null;
};
/** Anlamlı basamakla biçimlendirir: 0,00104 ve 1.694 aynı hassasiyette görünür. */
const sig = (v: number, digits = 4) => (v === 0 ? "0" : f(v, Math.max(0, digits - 1 - Math.floor(Math.log10(Math.abs(v))))));
const ATM_KPA = 101.325;

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
    <div className="date-converter-modes is-light" role="tablist">
      {options.map((o) => (
        <button key={o.id} type="button" role="tab" aria-selected={value === o.id} className={value === o.id ? "is-active" : undefined} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Su özellikleri ---------------- */

export function WaterPropsTool() {
  const [temp, setTemp] = useState("20");
  const [volume, setVolume] = useState("1000");
  const t = num(temp);
  const v = num(volume);
  const r = t !== null ? interpolateRow(WATER_1ATM, "t", t) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Su sıcaklığı (°C)" value={temp} onChange={setTemp} />
          <Field label="Hacim (L), isteğe bağlı" value={volume} onChange={setVolume} />
        </div>
        {r ? (
          <div className="date-calc-results">
            <Stat main label="Yoğunluk ρ" value={`${f(r.rho, 2)} kg/m³`} note={`1 litre ${f(r.rho / 1000, 4)} kg`} />
            {v !== null && v > 0 ? <Stat label={`${f(v, 0)} L suyun kütlesi`} value={`${f((v * r.rho) / 1000, 1)} kg`} /> : null}
            <Stat label="Dinamik viskozite μ" value={`${sig(r.mu / 1000)} mPa·s`} note={`${sig(r.mu / 1e6)} Pa·s`} />
            <Stat label="Kinematik viskozite ν" value={`${sig(r.nu)} mm²/s`} note="1 mm²/s = 1 cSt" />
            <Stat label="Özgül ısı cp" value={`${f(r.cp, 4)} kJ/(kg·K)`} />
            <Stat label="Isıl iletkenlik k" value={`${f(r.k, 4)} W/(m·K)`} />
            <Stat label="Prandtl sayısı" value={sig(r.pr, 3)} />
            <Stat label="Buhar basıncı" value={`${sig(r.psat)} kPa`} note="Bu sıcaklıkta suyun doyma basıncı" />
          </div>
        ) : (
          <p className="date-calc-note">0,01 ile 100 °C arasında bir sıcaklık girin. Tablo 1 atm basınçta sıvı su içindir.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Doymuş buhar ---------------- */

export function SteamTableTool() {
  const [mode, setMode] = useState<"p" | "t">("p");
  const [temp, setTemp] = useState("150");
  const [pressure, setPressure] = useState("6");
  const [gauge, setGauge] = useState<"abs" | "gauge">("gauge");
  const [steam, setSteam] = useState("500");
  const t = num(temp);
  const p = num(pressure);
  const pAbs = p !== null ? (gauge === "gauge" ? p + ATM_KPA / 100 : p) : null;
  const r = mode === "t" ? (t !== null ? interpolateSat(SAT_STEAM_T, "t", t) : null) : pAbs !== null ? interpolateSat(SAT_STEAM_P, "p", pAbs) : null;
  const m = num(steam);
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <Tabs
          value={mode}
          onChange={setMode}
          options={[
            { id: "p", label: "Basınçtan" },
            { id: "t", label: "Sıcaklıktan" },
          ]}
        />
        <div className="date-calc-fields">
          {mode === "t" ? (
            <Field label="Doyma sıcaklığı (°C)" value={temp} onChange={setTemp} />
          ) : (
            <>
              <Field label="Basınç (bar)" value={pressure} onChange={setPressure} />
              <label className="date-calc-field">
                <span>Basınç türü</span>
                <select value={gauge} onChange={(e) => setGauge(e.target.value as "abs" | "gauge")}>
                  <option value="gauge">Manometre (gösterge)</option>
                  <option value="abs">Mutlak</option>
                </select>
              </label>
            </>
          )}
          <Field label="Buhar debisi (kg/h), isteğe bağlı" value={steam} onChange={setSteam} />
        </div>
        {r ? (
          <div className="date-calc-results">
            {mode === "p" ? (
              <Stat main label="Doyma sıcaklığı" value={`${f(r.t, 2)} °C`} note={`Mutlak basınç ${sig(r.p)} bar`} />
            ) : (
              <Stat main label="Doyma basıncı (mutlak)" value={`${sig(r.p)} bar`} note={r.p > ATM_KPA / 100 ? `Manometrede ${sig(r.p - ATM_KPA / 100)} bar` : `${sig(r.p * 100)} kPa, atmosfer altı`} />
            )}
            <Stat label="Buharlaşma ısısı hfg" value={`${f(r.hfg, 1)} kJ/kg`} />
            <Stat label="Doymuş buhar entalpisi hg" value={`${f(r.hg, 1)} kJ/kg`} note={`Sıvı hf ${f(r.hf, 1)} kJ/kg`} />
            <Stat label="Buhar özgül hacmi vg" value={`${sig(r.vg)} m³/kg`} note={`Yoğunluk ${sig(1 / r.vg)} kg/m³`} />
            <Stat label="Sıvı özgül hacmi vf" value={`${sig(r.vf)} m³/kg`} note={`Yoğunluk ${f(1 / r.vf, 1)} kg/m³`} />
            <Stat label="Entropi sf / sg" value={`${f(r.sf, 4)} / ${f(r.sg, 4)} kJ/(kg·K)`} />
            {m !== null && m > 0 ? <Stat label={`${f(m, 0)} kg/h buharın yoğuşma ısısı`} value={`${f((m * r.hfg) / 3600, 1)} kW`} note={`Buhar hacmi ${f(m * r.vg, 1)} m³/h`} /> : null}
          </div>
        ) : (
          <p className="date-calc-note">
            {mode === "t" ? "0,01 ile 372 °C arasında bir sıcaklık girin." : "Mutlak basınç 0,01 ile 220 bar arasında olmalı (kritik nokta 220,64 bar)."}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Kaynama noktası ---------------- */

export function BoilingPointTool() {
  const [mode, setMode] = useState<"alt" | "press">("alt");
  const [alt, setAlt] = useState("1000");
  const [press, setPress] = useState("1013,25");
  const h = num(alt);
  const hp = num(press);
  const pKpa = mode === "alt" ? (h !== null && h >= -500 && h <= 10000 ? isaPressureKpa(h) : null) : hp !== null ? hp / 10 : null;
  const tb = pKpa !== null ? boilingPointC(pKpa) : null;
  const sea = boilingPointC(ATM_KPA)!;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <Tabs
          value={mode}
          onChange={setMode}
          options={[
            { id: "alt", label: "Rakımdan" },
            { id: "press", label: "Hava basıncından" },
          ]}
        />
        <div className="date-calc-fields">
          {mode === "alt" ? <Field label="Rakım (m)" value={alt} onChange={setAlt} /> : <Field label="Mutlak basınç (hPa = mbar)" value={press} onChange={setPress} />}
        </div>
        {tb !== null && pKpa !== null ? (
          <div className="date-calc-results">
            <Stat main label="Suyun kaynama noktası" value={`${f(tb, 1)} °C`} note={`Deniz seviyesinden ${f(sea - tb, 1)} °C ${tb <= sea ? "düşük" : "yüksek"}`} />
            <Stat label="Hava basıncı" value={`${f(pKpa * 10, 0)} hPa`} note={`${f(pKpa, 1)} kPa · deniz seviyesinin %${f((pKpa / ATM_KPA) * 100, 0)}'i`} />
          </div>
        ) : (
          <p className="date-calc-note">{mode === "alt" ? "Rakım −500 ile 10.000 m arasında olmalı." : "Basınç 250 ile 1.100 hPa arasında olmalı."}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Hava özellikleri ---------------- */

export function AirPropsTool() {
  const [temp, setTemp] = useState("20");
  const [alt, setAlt] = useState("0");
  const t = num(temp);
  const h = num(alt);
  const r = t !== null ? interpolateRow(AIR_1ATM, "t", t) : null;
  const p = h !== null && h >= -500 && h <= 11000 ? isaPressureKpa(h) : null;
  const ratio = p !== null ? p / ATM_KPA : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Hava sıcaklığı (°C)" value={temp} onChange={setTemp} />
          <Field label="Rakım (m)" value={alt} onChange={setAlt} />
        </div>
        {r && ratio !== null ? (
          <div className="date-calc-results">
            <Stat main label="Yoğunluk ρ" value={`${f(r.rho * ratio, 4)} kg/m³`} note={`Basınç ${f(p! * 10, 0)} hPa (standart atmosfer)`} />
            <Stat label="Dinamik viskozite μ" value={`${sig(r.mu)} µPa·s`} note="Basınçtan pratikte bağımsız" />
            <Stat label="Kinematik viskozite ν" value={`${sig(r.nu / ratio)} mm²/s`} />
            <Stat label="Özgül ısı cp" value={`${f(r.cp, 4)} kJ/(kg·K)`} />
            <Stat label="Isıl iletkenlik k" value={`${sig(r.k)} W/(m·K)`} />
            <Stat label="Prandtl sayısı" value={sig(r.pr, 3)} />
          </div>
        ) : (
          <p className="date-calc-note">Sıcaklık −50 ile 200 °C, rakım −500 ile 11.000 m arasında olmalı.</p>
        )}
      </div>
    </div>
  );
}
