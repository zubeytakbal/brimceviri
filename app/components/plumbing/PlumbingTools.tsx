"use client";

import { useState } from "react";
import { formatTr } from "../../converter/metal/metalWeight";
import { DRAIN_PIPES, drainCapacity, slopeForFlow } from "../../converter/plumbing/drainage";
import { dhwFlowLpm, dhwPowerKw, panelLength, radiatorFactor, roomHeatLoss, sectionsNeeded } from "../../converter/plumbing/heating";
import { dipChart, filledVolume, heightForVolume, LIQUIDS, tankHeight, tankVolume, type TankShape } from "../../converter/plumbing/tank";

const f = formatTr;
const num = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
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

type Kind = "horizontal" | "hemi" | "vertical" | "box";
const KINDS: Array<{ id: Kind; label: string }> = [
  { id: "horizontal", label: "Yatay silindir" },
  { id: "hemi", label: "Yatay, yuvarlak başlı" },
  { id: "vertical", label: "Dikey silindir" },
  { id: "box", label: "Dikdörtgen" },
];

export function TankTool() {
  const [kind, setKind] = useState<Kind>("horizontal");
  const [d, setD] = useState("100");
  const [len, setLen] = useState("200");
  const [w, setW] = useState("100");
  const [h, setH] = useState("150");
  const [mode, setMode] = useState<"level" | "liters">("level");
  const [level, setLevel] = useState("35");
  const [liters, setLiters] = useState("500");
  const [liquid, setLiquid] = useState("motorin");
  const [step, setStep] = useState("5");

  const cm = (v: string) => {
    const n = num(v);
    return n !== null && n > 0 ? n / 100 : null;
  };
  const D = cm(d);
  const L = cm(len);
  const W = cm(w);
  const Hh = cm(h);
  const shape: TankShape | null =
    kind === "horizontal" || kind === "hemi"
      ? D !== null && L !== null
        ? { kind: "horizontal", D, L, heads: kind === "hemi" ? "hemi" : "flat" }
        : null
      : kind === "vertical"
        ? D !== null && Hh !== null
          ? { kind: "vertical", D, H: Hh }
          : null
        : W !== null && L !== null && Hh !== null
          ? { kind: "box", W, L, H: Hh }
          : null;

  const total = shape ? tankVolume(shape) * 1000 : null;
  const top = shape ? tankHeight(shape) : 0;
  const lv = num(level);
  const lt = num(liters);
  let fillH: number | null = null;
  let fillL: number | null = null;
  if (shape && total !== null) {
    if (mode === "level" && lv !== null) {
      fillH = Math.min(lv / 100, top);
      fillL = filledVolume(shape, fillH) * 1000;
    } else if (mode === "liters" && lt !== null) {
      fillL = Math.min(lt, total);
      fillH = heightForVolume(shape, fillL / 1000);
    }
  }
  const rho = LIQUIDS.find((x) => x.id === liquid)!.rho;
  const st = num(step);
  const chart = shape && st !== null && st >= 1 ? dipChart(shape, st / 100) : [];

  return (
    <div className="date-calc metal-calc">
      <div className="date-converter-modes" role="tablist">
        {KINDS.map((o) => (
          <button key={o.id} type="button" role="tab" aria-selected={kind === o.id} className={kind === o.id ? "is-active" : undefined} onClick={() => setKind(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          {kind === "box" ? <Field label="Genişlik (cm)" value={w} onChange={setW} /> : <Field label="İç çap (cm)" value={d} onChange={setD} />}
          {kind !== "vertical" ? <Field label={kind === "hemi" ? "Düz gövde boyu, başlar hariç (cm)" : "Boy (cm)"} value={len} onChange={setLen} /> : null}
          {kind === "vertical" || kind === "box" ? <Field label="Yükseklik (cm)" value={h} onChange={setH} /> : null}
          <label className="date-calc-field">
            <span>Sıvı</span>
            <select value={liquid} onChange={(e) => setLiquid(e.target.value)}>
              {LIQUIDS.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Doluluğu neye göre gireceksiniz?</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as "level" | "liters")}>
              <option value="level">Sıvı seviyesi (cm)</option>
              <option value="liters">Litre</option>
            </select>
          </label>
          {mode === "level" ? <Field label="Tabandan sıvı seviyesi (cm)" value={level} onChange={setLevel} /> : <Field label="İçindeki sıvı (L)" value={liters} onChange={setLiters} />}
        </div>
        {shape && total !== null ? (
          <div className="date-calc-results">
            <Stat main label="Toplam hacim" value={`${f(total, 0)} L`} note={`${f(total / 1000, 3)} m³ · dolu ${f((total * rho) / 1e6, 2)} ton`} />
            {fillL !== null && fillH !== null ? (
              <>
                <Stat main label="İçindeki sıvı" value={`${f(fillL, 0)} L`} note={`Doluluk %${f((fillL / total) * 100, 1)}`} />
                <Stat label={mode === "level" ? "Sıvının ağırlığı" : "Sıvı seviyesi"} value={mode === "level" ? `${f((fillL * rho) / 1000, 0)} kg` : `${f(fillH * 100, 1)} cm`} note={mode === "level" ? undefined : `Tabandan, ${f((fillL * rho) / 1000, 0)} kg`} />
                <Stat label="Boş kalan" value={`${f(total - fillL, 0)} L`} />
              </>
            ) : null}
          </div>
        ) : (
          <p className="date-calc-note">Ölçüleri santimetre olarak girin. Çap ve boy tankın iç ölçüleri olmalıdır.</p>
        )}
        {chart.length ? (
          <details className="calc-details">
            <summary>Ölçü çubuğu tablosu (tank cetveli)</summary>
            <div className="date-calc-fields">
              <Field label="Aralık (cm)" value={step} onChange={setStep} />
            </div>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <caption>Sıvı seviyesine göre litre</caption>
                <thead>
                  <tr>
                    <th scope="col">Seviye (cm)</th>
                    <th scope="col">Litre</th>
                    <th scope="col">Doluluk</th>
                  </tr>
                </thead>
                <tbody>
                  {chart.map((r) => (
                    <tr key={r.h}>
                      <th scope="row">{f(r.h * 100, 1)}</th>
                      <td>{f(r.liters, 0)}</td>
                      <td>%{f((r.liters / total!) * 100, 1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Petek (radyatör) ---------------- */

export function RadiatorTool() {
  const [mode, setMode] = useState<"calc" | "known">("calc");
  const [known, setKnown] = useState("1200");
  const [wallLen, setWallLen] = useState("4");
  const [height, setHeight] = useState("2,7");
  const [area, setArea] = useState("16");
  const [winArea, setWinArea] = useState("2");
  const [wallU, setWallU] = useState("0,6");
  const [winU, setWinU] = useState("2,8");
  const [n, setN] = useState("0,5");
  const [tIn, setTIn] = useState("20");
  const [tOut, setTOut] = useState("-5");
  const [kind, setKind] = useState<"section" | "panel">("section");
  const [w50, setW50] = useState("150");
  const [supply, setSupply] = useState("70");
  const [ret, setRet] = useState("55");
  const [exp, setExp] = useState("1,3");

  const v = (s: string) => {
    const x = Number(s.replace(/\s/g, "").replace(",", "."));
    return s.trim() !== "" && Number.isFinite(x) ? x : null;
  };
  const room = { wl: v(wallLen), h: v(height), a: v(area), wa: v(winArea), wu: v(wallU), gu: v(winU), n: v(n), ti: v(tIn), to: v(tOut) };
  const calcOk = Object.values(room).every((x) => x !== null) && room.ti! > room.to!;
  const loss =
    mode === "known"
      ? v(known) !== null
        ? { total: v(known)!, wall: 0, window: 0, roof: 0, ventilation: 0, dT: 0 }
        : null
      : calcOk
        ? roomHeatLoss({ wallArea: room.wl! * room.h!, wallU: room.wu!, windowArea: room.wa!, windowU: room.gu!, volume: room.a! * room.h!, airChange: room.n!, tIn: room.ti!, tOut: room.to! })
        : null;
  const roomT = mode === "calc" && room.ti !== null ? room.ti : 20;
  const fac = v(supply) !== null && v(ret) !== null && v(exp) !== null ? radiatorFactor(v(supply)!, v(ret)!, roomT, v(exp)!) : null;
  const unit = v(w50);

  return (
    <div className="date-calc metal-calc">
      <div className="date-converter-modes" role="tablist">
        {[
          { id: "calc" as const, label: "Odanın ısı kaybını hesapla" },
          { id: "known" as const, label: "Isı ihtiyacını biliyorum" },
        ].map((o) => (
          <button key={o.id} type="button" role="tab" aria-selected={mode === o.id} className={mode === o.id ? "is-active" : undefined} onClick={() => setMode(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        {mode === "known" ? (
          <div className="date-calc-fields">
            <Field label="Odanın ısı ihtiyacı (W)" value={known} onChange={setKnown} />
          </div>
        ) : (
          <>
            <div className="date-calc-fields">
              <Field label="Oda alanı (m²)" value={area} onChange={setArea} />
              <Field label="Tavan yüksekliği (m)" value={height} onChange={setHeight} />
              <Field label="Dış duvar uzunluğu (m)" value={wallLen} onChange={setWallLen} />
              <Field label="Pencere alanı (m²)" value={winArea} onChange={setWinArea} />
            </div>
            <div className="date-calc-fields">
              <Field label="Duvar U değeri (W/m²K)" value={wallU} onChange={setWallU} />
              <Field label="Pencere U değeri (W/m²K)" value={winU} onChange={setWinU} />
              <Field label="Hava değişimi (1/saat)" value={n} onChange={setN} />
              <Field label="İç sıcaklık (°C)" value={tIn} onChange={setTIn} />
              <Field label="Dış tasarım sıcaklığı (°C)" value={tOut} onChange={setTOut} />
            </div>
            <p className="date-calc-note">U değerleri örnektir. Duvarınızın gerçek değeri için U değeri aracını, pencere için üretici etiketini kullanın. Dış tasarım sıcaklığı ilinizin en soğuk günlerine göre seçilir.</p>
          </>
        )}
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Radyatör tipi</span>
            <select value={kind} onChange={(e) => setKind(e.target.value as "section" | "panel")}>
              <option value="section">Dilimli (alüminyum, döküm)</option>
              <option value="panel">Panel radyatör</option>
            </select>
          </label>
          <Field label={kind === "section" ? "Katalogdaki dilim gücü, ΔT50 (W)" : "Katalogdaki metre gücü, ΔT50 (W/m)"} value={w50} onChange={setW50} />
          <Field label="Gidiş suyu (°C)" value={supply} onChange={setSupply} />
          <Field label="Dönüş suyu (°C)" value={ret} onChange={setRet} />
          <Field label="Radyatör üssü n" value={exp} onChange={setExp} />
        </div>
        {loss && fac && unit !== null && unit > 0 ? (
          <div className="date-calc-results">
            <Stat main label="Odanın ısı ihtiyacı" value={`${f(loss.total, 0)} W`} note={mode === "calc" ? `Duvar ${f(loss.wall, 0)} · pencere ${f(loss.window, 0)} · hava ${f(loss.ventilation, 0)} W` : undefined} />
            {kind === "section" ? (
              <Stat main label="Gereken dilim sayısı" value={`${sectionsNeeded(loss.total, unit, fac.factor)} dilim`} note={`Bir dilim bu sıcaklıklarda ${f(unit * fac.factor, 0)} W verir`} />
            ) : (
              <Stat main label="Gereken panel boyu" value={`${f(panelLength(loss.total, unit, fac.factor).standard * 100, 0)} cm`} note={`Hesaplanan ${f(panelLength(loss.total, unit, fac.factor).L * 100, 0)} cm; bir üst ölçü`} />
            )}
            <Stat label="Sıcaklık düzeltme çarpanı" value={`× ${f(fac.factor, 3)}`} note={`Radyatör-oda farkı ${f(fac.dT, 1)} K (anma 49,83 K)`} />
          </div>
        ) : (
          <p className="date-calc-note">Geçerli değerler girin. Dönüş suyu gidişten düşük, ikisi de oda sıcaklığından yüksek olmalı.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Kombi gücü ---------------- */

export function BoilerTool() {
  const [heat, setHeat] = useState("8");
  const [flow, setFlow] = useState("10");
  const [cold, setCold] = useState("10");
  const [hot, setHot] = useState("40");
  const [power, setPower] = useState("24");
  const v = (s: string) => {
    const x = Number(s.replace(/\s/g, "").replace(",", "."));
    return s.trim() !== "" && Number.isFinite(x) && x >= 0 ? x : null;
  };
  const H = v(heat);
  const Q = v(flow);
  const c = v(cold);
  const t = v(hot);
  const P = v(power);
  const dT = c !== null && t !== null ? t - c : null;
  const dhw = Q !== null && dT !== null && dT > 0 ? dhwPowerKw(Q, dT) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Evin ısı kaybı (kW)" value={heat} onChange={setHeat} />
          <Field label="İstenen sıcak su debisi (L/dk)" value={flow} onChange={setFlow} />
          <Field label="Şebeke suyu sıcaklığı (°C)" value={cold} onChange={setCold} />
          <Field label="Musluktan istenen sıcaklık (°C)" value={hot} onChange={setHot} />
        </div>
        {dhw !== null && H !== null ? (
          <div className="date-calc-results">
            <Stat main label="Gereken kombi gücü" value={`${f(Math.max(H, dhw), 1)} kW`} note={dhw > H ? "Sıcak su ihtiyacı belirliyor" : "Isıtma ihtiyacı belirliyor"} />
            <Stat label="Sıcak su için gereken güç" value={`${f(dhw, 1)} kW`} note={`${f(Q!, 1)} L/dk suyu ${f(dT!, 0)} °C ısıtmak`} />
            <Stat label="Isıtma için gereken güç" value={`${f(H, 1)} kW`} note="Evin en soğuk gündeki ısı kaybı" />
          </div>
        ) : (
          <p className="date-calc-note">Geçerli değerler girin; istenen sıcaklık şebeke suyundan yüksek olmalı.</p>
        )}
        <p className="date-calc-note">Elinizdeki kombinin ne kadar sıcak su verdiğini görmek için gücünü girin.</p>
        <div className="date-calc-fields">
          <Field label="Kombi gücü (kW)" value={power} onChange={setPower} />
        </div>
        {P !== null && dT !== null && dT > 0 ? (
          <div className="date-calc-results">
            <Stat main label="Verebileceği sıcak su" value={`${f(dhwFlowLpm(P, dT), 1)} L/dk`} note={`${f(dT, 0)} °C sıcaklık artışında`} />
            <Stat label="ΔT 25 K'de (katalog değeri)" value={`${f(dhwFlowLpm(P, 25), 1)} L/dk`} />
            <Stat label="ΔT 30 K'de" value={`${f(dhwFlowLpm(P, 30), 1)} L/dk`} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Pis su borusu ---------------- */

export function DrainTool() {
  const [pipe, setPipe] = useState("110");
  const [wall, setWall] = useState("2,2");
  const [slope, setSlope] = useState("2");
  const [fill, setFill] = useState("0.5");
  const [flow, setFlow] = useState("2");
  const p = DRAIN_PIPES.find((x) => x.id === pipe)!;
  const w = num(wall);
  const s = num(slope);
  const q = num(flow);
  const di = w !== null && w * 2 < p.od ? (p.od - 2 * w) / 1000 : null;
  const hd = Number(fill);
  const cap = di !== null && s !== null && s > 0 ? drainCapacity(di, s / 100, hd) : null;
  const need = di !== null && q !== null && q > 0 ? slopeForFlow(di, q / 1000, hd) : null;
  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Boru (dış çap)</span>
            <select
              value={pipe}
              onChange={(e) => {
                setPipe(e.target.value);
                setWall(String(DRAIN_PIPES.find((x) => x.id === e.target.value)!.wall).replace(".", ","));
              }}
            >
              {DRAIN_PIPES.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Et kalınlığı (mm)" value={wall} onChange={setWall} />
          <Field label="Eğim (%), metrede cm" value={slope} onChange={setSlope} />
          <label className="date-calc-field">
            <span>Doluluk oranı</span>
            <select value={fill} onChange={(e) => setFill(e.target.value)}>
              <option value="0.5">Yarı dolu (h/d = 0,5)</option>
              <option value="0.7">%70 dolu (h/d = 0,7)</option>
            </select>
          </label>
        </div>
        {cap && di !== null ? (
          <div className="date-calc-results">
            <Stat main label="Taşıma kapasitesi" value={`${f(cap.Q * 1000, 2)} L/s`} note={`${f(cap.Q * 60000, 0)} L/dk · iç çap ${f(di * 1000, 1)} mm`} />
            <Stat label="Akış hızı" value={`${f(cap.v, 2)} m/s`} />
            <Stat label="Eğim" value={`%${f(s!, 2)}`} note={`10 m boruda ${f(s! * 10, 0)} cm kot farkı`} />
          </div>
        ) : (
          <p className="date-calc-note">Geçerli bir et kalınlığı ve eğim girin.</p>
        )}
        <p className="date-calc-note">Belirli bir debi için gereken eğimi bulmak isterseniz debiyi girin.</p>
        <div className="date-calc-fields">
          <Field label="Taşınacak debi (L/s)" value={flow} onChange={setFlow} />
        </div>
        {need !== null ? (
          <div className="date-calc-results">
            <Stat main label="Gereken en az eğim" value={`%${f(need * 100, 2)}`} note={`Metrede ${f(need * 100, 2)} cm`} />
          </div>
        ) : di !== null && q !== null ? (
          <p className="date-calc-note">Bu debi seçilen boruda makul bir eğimle taşınamıyor; daha büyük çap seçin.</p>
        ) : null}
      </div>
    </div>
  );
}
