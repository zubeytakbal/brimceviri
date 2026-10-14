"use client";

import { useMemo, useState } from "react";
import { formatTr, parseTr } from "../../converter/metal/metalWeight";
import {
  AIR,
  exchangerArea,
  headFromPressure,
  heatLoss,
  hydraulicPower,
  lmtd,
  sensibleHeat,
  SURFACE_RESISTANCE,
  terminalDifferences,
  uValue,
  WATER,
  type FlowArrangement,
  type HeatFlowDirection,
} from "../../converter/thermal/thermal";
import { LAYER_PRESETS } from "../../converter/thermal/layerPresets";

export type ThermalKind = "uvalue" | "pump" | "lmtd" | "flowheat";

const f = formatTr;
const INVALID = "Geçerli değerler girerek sonucu görebilirsiniz.";
const num = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

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

/* ---------------- U değeri ---------------- */

type Row = { id: number; preset: string; thickness: string; lambda: string };

function UValueTool() {
  const [direction, setDirection] = useState<HeatFlowDirection>("horizontal");
  const [rows, setRows] = useState<Row[]>([
    { id: 1, preset: "concrete", thickness: "20", lambda: "1,4" },
    { id: 2, preset: "eps", thickness: "5", lambda: "0,038" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [area, setArea] = useState("20");
  const [tin, setTin] = useState("20");
  const [tout, setTout] = useState("0");

  const update = (id: number, patch: Partial<Row>) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const res = useMemo(() => {
    const layers = rows.map((r) => ({ thicknessM: (parseTr(r.thickness) ?? NaN) / 100, lambda: parseTr(r.lambda) ?? NaN }));
    if (layers.some((l) => !Number.isFinite(l.thicknessM) || !Number.isFinite(l.lambda))) return null;
    return { ...uValue(layers, direction), layers };
  }, [rows, direction]);
  const A = parseTr(area);
  const dT = (num(tin) ?? NaN) - (num(tout) ?? NaN);

  return (
    <div className="date-calc metal-calc">
      <Tabs
        value={direction}
        options={(Object.keys(SURFACE_RESISTANCE) as HeatFlowDirection[]).map((id) => ({ id, label: SURFACE_RESISTANCE[id].label }))}
        onChange={setDirection}
      />
      <div className="date-calc-input">
        <p className="date-calc-note">Katmanları içten dışa doğru girin. λ için ürünün etiketindeki beyan değerini (λD) kullanın; hazır seçenekler tipik değerdir.</p>
        {rows.map((row, i) => (
          <div className="date-calc-fields" key={row.id}>
            <label className="date-calc-field">
              <span>Katman {i + 1}</span>
              <select
                value={row.preset}
                onChange={(e) => {
                  const p = LAYER_PRESETS.find((x) => x.id === e.target.value);
                  update(row.id, { preset: e.target.value, ...(p && p.lambda ? { lambda: f(p.lambda, 3) } : {}) });
                }}
              >
                {LAYER_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Kalınlık (cm)" value={row.thickness} onChange={(v) => update(row.id, { thickness: v })} />
            <Field label="λ (W/mK)" value={row.lambda} onChange={(v) => update(row.id, { lambda: v, preset: "custom" })} />
            <button type="button" className="metal-row-remove" disabled={rows.length === 1} onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))} aria-label={`Katman ${i + 1} satırını sil`}>
              Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="metal-row-add"
          onClick={() => {
            setRows((prev) => [...prev, { id: nextId, preset: "custom", thickness: "2", lambda: "" }]);
            setNextId((v) => v + 1);
          }}
        >
          + Katman ekle
        </button>
        <div className="date-calc-fields">
          <Field label="Alan (m²)" value={area} onChange={setArea} />
          <Field label="İç sıcaklık (°C)" value={tin} onChange={setTin} />
          <Field label="Dış sıcaklık (°C)" value={tout} onChange={setTout} />
        </div>
        {res ? (
          <>
            <div className="date-calc-results">
              <Stat main label="U değeri" value={`${f(res.U, 3)} W/m²K`} />
              <Stat label="Toplam ısıl direnç R" value={`${f(res.R, 3)} m²K/W`} note={`Rsi ${f(res.Rsi, 2)} + katmanlar + Rse ${f(res.Rse, 2)}`} />
              {A !== null && Number.isFinite(dT) ? <Stat label="Isı kaybı" value={`${f(heatLoss(res.U, A, dT), 0)} W`} note={`${f(A, 1)} m² × ${f(dT, 1)} K`} /> : null}
            </div>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Katman</th>
                    <th scope="col">d (m)</th>
                    <th scope="col">λ (W/mK)</th>
                    <th scope="col">R = d/λ (m²K/W)</th>
                    <th scope="col">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {res.layers.map((l, i) => (
                    <tr key={rows[i].id}>
                      <th scope="row">{LAYER_PRESETS.find((p) => p.id === rows[i].preset)?.label ?? `Katman ${i + 1}`}</th>
                      <td>{f(l.thicknessM, 3)}</td>
                      <td>{f(l.lambda, 3)}</td>
                      <td>{f(l.thicknessM / l.lambda, 3)}</td>
                      <td>%{f(((l.thicknessM / l.lambda) / res.R) * 100, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="date-calc-note">{INVALID} Her katman için kalınlık ve λ girin.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Pompa ---------------- */

function PumpTool() {
  const [flow, setFlow] = useState("10");
  const [flowUnit, setFlowUnit] = useState<"m3h" | "ls">("m3h");
  const [headMode, setHeadMode] = useState<"m" | "bar">("m");
  const [head, setHead] = useState("30");
  const [rho, setRho] = useState("1000");
  const [eta, setEta] = useState("65");
  const [etaMotor, setEtaMotor] = useState("90");
  const Qin = parseTr(flow);
  const Q = Qin === null ? null : flowUnit === "m3h" ? Qin / 3600 : Qin / 1000;
  const r = parseTr(rho);
  const Hin = parseTr(head);
  const H = Hin === null || r === null ? null : headMode === "m" ? Hin : headFromPressure(Hin * 1e5, r);
  const e = parseTr(eta);
  const em = parseTr(etaMotor);
  const valid = Q !== null && H !== null && r !== null && e !== null && e <= 100 && em !== null && em <= 100;
  const Ph = valid ? hydraulicPower(r, Q, H) : 0;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Debi" value={flow} onChange={setFlow} />
          <label className="date-calc-field">
            <span>Debi birimi</span>
            <select value={flowUnit} onChange={(ev) => setFlowUnit(ev.target.value as "m3h" | "ls")}>
              <option value="m3h">m³/h</option>
              <option value="ls">L/s</option>
            </select>
          </label>
          <Field label={headMode === "m" ? "Basma yüksekliği (m)" : "Basınç farkı (bar)"} value={head} onChange={setHead} />
          <label className="date-calc-field">
            <span>Yükseklik birimi</span>
            <select value={headMode} onChange={(ev) => setHeadMode(ev.target.value as "m" | "bar")}>
              <option value="m">metre (mSS)</option>
              <option value="bar">bar</option>
            </select>
          </label>
        </div>
        <div className="date-calc-fields">
          <Field label="Yoğunluk (kg/m³)" value={rho} onChange={setRho} />
          <Field label="Pompa verimi (%)" value={eta} onChange={setEta} />
          <Field label="Motor verimi (%)" value={etaMotor} onChange={setEtaMotor} />
        </div>
        {valid && H !== null && e !== null && em !== null ? (
          <div className="date-calc-results">
            <Stat main label="Pompa mil gücü" value={`${f(Ph / (e / 100) / 1000, 2)} kW`} note={`Hidrolik güç / %${f(e, 0)}`} />
            <Stat label="Hidrolik güç" value={`${f(Ph / 1000, 2)} kW`} note="ρ · g · Q · H" />
            <Stat label="Şebekeden çekilen güç" value={`${f(Ph / (e / 100) / (em / 100) / 1000, 2)} kW`} note={`Motor verimi %${f(em, 0)}`} />
            <Stat label="Basma yüksekliği" value={`${f(H, 2)} m`} note={`${f((H * (r ?? 1000) * 9.80665) / 1e5, 2)} bar`} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID} Verimler 0–100 arasında olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- LMTD ---------------- */

function LmtdTool() {
  const [arr, setArr] = useState<FlowArrangement>("counter");
  const [hi, setHi] = useState("90");
  const [ho, setHo] = useState("70");
  const [ci, setCi] = useState("10");
  const [co, setCo] = useState("50");
  const [power, setPower] = useState("50");
  const [U, setU] = useState("1500");
  const v = [hi, ho, ci, co].map(num);
  const ok = v.every((x) => x !== null);
  const [dT1, dT2] = ok ? terminalDifferences(v[0]!, v[1]!, v[2]!, v[3]!, arr) : [NaN, NaN];
  const L = ok ? lmtd(dT1, dT2) : null;
  const Q = parseTr(power);
  const u = parseTr(U);
  return (
    <div className="date-calc metal-calc">
      <Tabs
        value={arr}
        options={[
          { id: "counter", label: "Karşı akış" },
          { id: "parallel", label: "Paralel akış" },
        ]}
        onChange={setArr}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Sıcak giriş (°C)" value={hi} onChange={setHi} />
          <Field label="Sıcak çıkış (°C)" value={ho} onChange={setHo} />
          <Field label="Soğuk giriş (°C)" value={ci} onChange={setCi} />
          <Field label="Soğuk çıkış (°C)" value={co} onChange={setCo} />
        </div>
        <div className="date-calc-fields">
          <Field label="Isı yükü Q (kW)" value={power} onChange={setPower} />
          <Field label="Toplam ısı transfer katsayısı U (W/m²K)" value={U} onChange={setU} />
        </div>
        {L !== null ? (
          <div className="date-calc-results">
            <Stat main label="LMTD" value={`${f(L, 2)} K`} note={`ΔT1 = ${f(dT1, 1)} K, ΔT2 = ${f(dT2, 1)} K`} />
            {Q !== null && u !== null ? <Stat label="Gerekli ısı transfer alanı" value={`${f(exchangerArea(Q * 1000, u, L), 2)} m²`} note="A = Q / (U · LMTD)" /> : null}
            <Stat label="Aritmetik ortalama fark" value={`${f((dT1 + dT2) / 2, 2)} K`} note="Karşılaştırma için" />
          </div>
        ) : (
          <p className="date-calc-note">{ok ? "Uçlardaki sıcaklık farklarından biri sıfır veya negatif. Paralel akışta soğuk akışkan sıcak çıkış sıcaklığını geçemez; akış düzenini ve sıcaklıkları kontrol edin." : INVALID}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Debiden ısı yükü ---------------- */

function FlowHeatTool() {
  const [fluid, setFluid] = useState<"air" | "water">("air");
  const [mode, setMode] = useState<"power" | "flow">("power");
  const [flow, setFlow] = useState("1000");
  const [power, setPower] = useState("10");
  const [dT, setDT] = useState("10");
  const props = fluid === "air" ? AIR : WATER;
  // Hava m³/h, su L/h girilir.
  const toMass = (v: number) => (fluid === "air" ? (v / 3600) * props.rho : (v / 3600 / 1000) * props.rho);
  const fromMass = (m: number) => (fluid === "air" ? (m / props.rho) * 3600 : (m / props.rho) * 3600 * 1000);
  const unit = fluid === "air" ? "m³/h" : "L/h";
  const d = parseTr(dT);
  const V = parseTr(flow);
  const P = parseTr(power);
  return (
    <div className="date-calc metal-calc">
      <Tabs
        value={fluid}
        options={[
          { id: "air", label: "Hava" },
          { id: "water", label: "Su" },
        ]}
        onChange={(v) => {
          setFluid(v);
          setFlow(v === "air" ? "1000" : "860");
        }}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Ne hesaplanacak?</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as "power" | "flow")}>
              <option value="power">Debiden ısı yükü</option>
              <option value="flow">Isı yükünden gereken debi</option>
            </select>
          </label>
          {mode === "power" ? <Field label={`Debi (${unit})`} value={flow} onChange={setFlow} /> : <Field label="Isı yükü (kW)" value={power} onChange={setPower} />}
          <Field label="Sıcaklık farkı ΔT (K)" value={dT} onChange={setDT} />
        </div>
        {d !== null && (mode === "power" ? V !== null : P !== null) ? (
          <div className="date-calc-results">
            {mode === "power" ? (
              <Stat main label="Isı yükü" value={`${f(sensibleHeat(toMass(V!), props.cp, d) / 1000, 2)} kW`} note={`${f(sensibleHeat(toMass(V!), props.cp, d) * 3.41214, 0)} BTU/h`} />
            ) : (
              <Stat main label="Gereken debi" value={`${f(fromMass((P! * 1000) / (props.cp * d)), fluid === "air" ? 0 : 0)} ${unit}`} note={fluid === "water" ? `${f(fromMass((P! * 1000) / (props.cp * d)) / 1000, 3)} m³/h` : undefined} />
            )}
            <Stat label="Kabul edilen özellikler" value={`ρ ${f(props.rho, 1)} kg/m³ · cp ${f(props.cp, 0)} J/kgK`} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID}</p>
        )}
      </div>
    </div>
  );
}

export default function ThermalTool({ kind }: { kind: ThermalKind }) {
  if (kind === "uvalue") return <UValueTool />;
  if (kind === "pump") return <PumpTool />;
  if (kind === "lmtd") return <LmtdTool />;
  return <FlowHeatTool />;
}
