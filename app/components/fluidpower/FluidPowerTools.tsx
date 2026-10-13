"use client";

import { useState } from "react";
import { formatTr, parseTr } from "../../converter/metal/metalWeight";
import {
  annulusArea,
  cylinderForce,
  freeAirVolume,
  HYDRAULIC_BORES,
  pistonArea,
  pistonSpeed,
  PNEUMATIC_BORES,
  requiredFlow,
  requiredPressure,
  strokeVolume,
} from "../../converter/fluidpower/cylinder";

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

function Field({ label, value, onChange, list }: { label: string; value: string; onChange: (v: string) => void; list?: string }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input type="text" inputMode="decimal" value={value} list={list} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

const kN = (n: number) => (n >= 1000 ? `${f(n / 1000, 2)} kN` : `${f(n, 0)} N`);

/* ---------------- Hidrolik ---------------- */

export function HydraulicTool() {
  const [bore, setBore] = useState("100");
  const [rod, setRod] = useState("56");
  const [pressure, setPressure] = useState("160");
  const [flow, setFlow] = useState("40");
  const [stroke, setStroke] = useState("500");
  const [force, setForce] = useState("100");
  const D = parseTr(bore);
  const d = parseTr(rod);
  const p = parseTr(pressure);
  const Q = parseTr(flow);
  const s = parseTr(stroke);
  const F = parseTr(force);
  const ok = D !== null && d !== null && d < D;
  const Ap = ok ? pistonArea(D) : 0;
  const Aa = ok ? annulusArea(D, d) : 0;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <datalist id="hyd-bores">
          {HYDRAULIC_BORES.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
        <div className="date-calc-fields">
          <Field label="Piston çapı D (mm)" value={bore} onChange={setBore} list="hyd-bores" />
          <Field label="Rot çapı d (mm)" value={rod} onChange={setRod} />
          <Field label="Basınç (bar)" value={pressure} onChange={setPressure} />
          <Field label="Pompa debisi (L/dk)" value={flow} onChange={setFlow} />
          <Field label="Strok (mm)" value={stroke} onChange={setStroke} />
          <Field label="İstenen kuvvet (kN)" value={force} onChange={setForce} />
        </div>
        {ok ? (
          <div className="date-calc-results">
            {p !== null ? <Stat main label="İtme kuvveti" value={kN(cylinderForce(p, Ap))} note={`Piston alanı ${f(Ap / 100, 2)} cm²`} /> : null}
            {p !== null ? <Stat label="Çekme kuvveti" value={kN(cylinderForce(p, Aa))} note={`Halka alanı ${f(Aa / 100, 2)} cm²`} /> : null}
            {Q !== null ? <Stat label="Çıkış / dönüş hızı" value={`${f(pistonSpeed(Q, Ap) * 1000, 0)} / ${f(pistonSpeed(Q, Aa) * 1000, 0)} mm/s`} /> : null}
            {s !== null ? <Stat label="Strok başına yağ" value={`${f(strokeVolume(Ap, s), 2)} L itme · ${f(strokeVolume(Aa, s), 2)} L çekme`} /> : null}
            {s !== null && Q !== null ? <Stat label="Strok süresi (itme / çekme)" value={`${f((s / 1000 / pistonSpeed(Q, Ap)), 2)} / ${f((s / 1000 / pistonSpeed(Q, Aa)), 2)} s`} /> : null}
            {F !== null ? <Stat label={`${f(F, 1)} kN itme için basınç`} value={`${f(requiredPressure(F * 1000, Ap), 1)} bar`} /> : null}
            {Q !== null && p !== null ? <Stat label="Hidrolik güç" value={`${f((p * 1e5 * (Q / 60000)) / 1000, 2)} kW`} note="p · Q (kayıpsız)" /> : null}
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Rot çapı piston çapından küçük olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Pnömatik ---------------- */

export function PneumaticTool() {
  const [bore, setBore] = useState("50");
  const [rod, setRod] = useState("20");
  const [pressure, setPressure] = useState("6");
  const [eff, setEff] = useState("85");
  const [stroke, setStroke] = useState("100");
  const [cycles, setCycles] = useState("10");
  const [speed, setSpeed] = useState("0,3");
  const D = parseTr(bore);
  const d = parseTr(rod);
  const p = parseTr(pressure);
  const e = parseTr(eff);
  const s = parseTr(stroke);
  const n = parseTr(cycles);
  const ok = D !== null && d !== null && d < D && p !== null && e !== null && e <= 100;
  const Ap = ok ? pistonArea(D!) : 0;
  const Aa = ok ? annulusArea(D!, d!) : 0;
  // Çift etkili: itme + dönüş strokunda tüketilen serbest hava (NL)
  const perCycle = ok && s !== null ? freeAirVolume(strokeVolume(Ap, s) + strokeVolume(Aa, s), p!) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <datalist id="pn-bores">
          {PNEUMATIC_BORES.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
        <div className="date-calc-fields">
          <Field label="Piston çapı D (mm)" value={bore} onChange={setBore} list="pn-bores" />
          <Field label="Rot çapı d (mm)" value={rod} onChange={setRod} />
          <Field label="Çalışma basıncı (bar)" value={pressure} onChange={setPressure} />
          <Field label="Verim (%)" value={eff} onChange={setEff} />
          <Field label="Strok (mm)" value={stroke} onChange={setStroke} />
          <Field label="Çevrim / dakika" value={cycles} onChange={setCycles} />
          <Field label="İstenen hız (m/s)" value={speed} onChange={setSpeed} />
        </div>
        {ok ? (
          <div className="date-calc-results">
            <Stat main label="İtme kuvveti (verimle)" value={kN(cylinderForce(p!, Ap, e! / 100))} note={`Teorik ${kN(cylinderForce(p!, Ap))}`} />
            <Stat label="Çekme kuvveti (verimle)" value={kN(cylinderForce(p!, Aa, e! / 100))} />
            {perCycle !== null ? <Stat label="Çevrim başına serbest hava" value={`${f(perCycle, 2)} NL`} note="Çift etkili, itme + dönüş" /> : null}
            {perCycle !== null && n !== null ? <Stat label="Hava tüketimi" value={`${f(perCycle * n, 1)} NL/dk`} note={`${f((perCycle * n * 60) / 1000, 2)} Nm³/h`} /> : null}
            {parseTr(speed) !== null ? <Stat label="İstenen hız için silindir debisi" value={`${f(freeAirVolume(requiredFlow(parseTr(speed)!, Ap), p!), 0)} NL/dk`} note="İtme yönü, serbest hava" /> : null}
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Rot çapı piston çapından küçük, verim 0–100 arasında olmalı.</p>
        )}
      </div>
    </div>
  );
}
