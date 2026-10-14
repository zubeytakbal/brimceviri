"use client";

import { useMemo, useState } from "react";
import { pipeNominalSizeTable } from "../../converter/pipeNominalSize";
import {
  boxAreaRoundedMm2,
  boxAreaSharpMm2,
  boxOuterCornerRadius,
  formatTr,
  isValidBox,
  isValidPipe,
  kgPerMeter,
  metalById,
  METALS,
  parseTr,
  pipeKgPerMeter,
  pipeWaterKgPerMeter,
  plateKgPerM2,
  plateMassKg,
  REBAR_BAR_LENGTH_M,
  REBAR_DIAMETERS_MM,
  rebarKgPerMeter,
} from "../../converter/metal/metalWeight";

export type MetalWeightKind = "rebar" | "plate" | "pipe" | "box";

const INVALID = "Geçerli ölçüler girerek sonucu görebilirsiniz.";

function Stat({ label, value, main }: { label: string; value: string; main?: boolean }) {
  return (
    <div className={main ? "date-calc-stat is-main" : "date-calc-stat"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, value, onChange, inputMode = "decimal" }: { label: string; value: string; onChange: (v: string) => void; inputMode?: "decimal" | "numeric" }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input type="text" inputMode={inputMode} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function MetalSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>Malzeme</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {METALS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label} ({formatTr(m.density, 0)} kg/m³)
          </option>
        ))}
      </select>
    </label>
  );
}

function DiameterSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>Demir çapı</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {REBAR_DIAMETERS_MM.map((d) => (
          <option key={d} value={String(d)}>
            Ø{d} mm
          </option>
        ))}
      </select>
    </label>
  );
}

const kg = (n: number) => `${formatTr(n, n < 10 ? 3 : 2)} kg`;
const tons = (n: number) => `${formatTr(n / 1000, 3)} ton`;

/* ---------------- İnşaat demiri ---------------- */

type RebarRow = { id: number; diameter: string; count: string; length: string };

function RebarTool() {
  const [mode, setMode] = useState<"weight" | "length" | "list">("weight");
  const [diameter, setDiameter] = useState("12");
  const [length, setLength] = useState("12");
  const [count, setCount] = useState("10");
  const [mass, setMass] = useState("1");
  const [massUnit, setMassUnit] = useState<"ton" | "kg">("ton");
  const [rows, setRows] = useState<RebarRow[]>([
    { id: 1, diameter: "8", count: "120", length: "3,4" },
    { id: 2, diameter: "12", count: "48", length: "12" },
    { id: 3, diameter: "16", count: "20", length: "6,5" },
  ]);
  const [nextId, setNextId] = useState(4);

  const d = Number(diameter);
  const perMeter = rebarKgPerMeter(d);
  const L = parseTr(length);
  const n = parseTr(count);
  const total = L !== null && n !== null ? perMeter * L * n : null;

  const m = parseTr(mass);
  const massKg = m === null ? null : massUnit === "ton" ? m * 1000 : m;
  const meters = massKg === null ? null : massKg / perMeter;

  const list = useMemo(() => {
    const byDiameter = new Map<number, { meters: number; kg: number }>();
    for (const row of rows) {
      const rd = Number(row.diameter);
      const rc = parseTr(row.count);
      const rl = parseTr(row.length);
      if (rc === null || rl === null) continue;
      const meters = rc * rl;
      const prev = byDiameter.get(rd) ?? { meters: 0, kg: 0 };
      byDiameter.set(rd, { meters: prev.meters + meters, kg: prev.kg + meters * rebarKgPerMeter(rd) });
    }
    const groups = [...byDiameter.entries()].sort((a, b) => a[0] - b[0]);
    const totalKg = groups.reduce((sum, [, g]) => sum + g.kg, 0);
    return { groups, totalKg };
  }, [rows]);

  const updateRow = (id: number, patch: Partial<RebarRow>) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div className="date-calc metal-calc">
      <div className="date-converter-modes" role="tablist">
        {[
          { id: "weight" as const, label: "Ağırlık hesapla" },
          { id: "length" as const, label: "Tonajdan metre" },
          { id: "list" as const, label: "Metraj listesi" },
        ].map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={mode === t.id} className={mode === t.id ? "is-active" : undefined} onClick={() => setMode(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {mode === "weight" && (
        <div className="date-calc-input">
          <div className="date-calc-fields">
            <DiameterSelect value={diameter} onChange={setDiameter} />
            <Field label="Bir parçanın boyu (m)" value={length} onChange={setLength} />
            <Field label="Adet" value={count} onChange={setCount} inputMode="numeric" />
          </div>
          {total !== null && L !== null && n !== null ? (
            <div className="date-calc-results">
              <Stat main label="Toplam ağırlık" value={kg(total)} />
              <Stat label="Ton" value={tons(total)} />
              <Stat label={`Ø${d} metre ağırlığı`} value={`${formatTr(perMeter, 3)} kg/m`} />
              <Stat label="Toplam uzunluk" value={`${formatTr(L * n, 2)} m`} />
              <Stat label={`${REBAR_BAR_LENGTH_M} m boy karşılığı`} value={`${formatTr((L * n) / REBAR_BAR_LENGTH_M, 1)} boy`} />
            </div>
          ) : (
            <p className="date-calc-note">{INVALID}</p>
          )}
        </div>
      )}

      {mode === "length" && (
        <div className="date-calc-input">
          <div className="date-calc-fields">
            <DiameterSelect value={diameter} onChange={setDiameter} />
            <Field label="Ağırlık" value={mass} onChange={setMass} />
            <label className="date-calc-field">
              <span>Birim</span>
              <select value={massUnit} onChange={(e) => setMassUnit(e.target.value as "ton" | "kg")}>
                <option value="ton">ton</option>
                <option value="kg">kg</option>
              </select>
            </label>
          </div>
          {meters !== null && massKg !== null ? (
            <div className="date-calc-results">
              <Stat main label="Toplam uzunluk" value={`${formatTr(meters, 1)} m`} />
              <Stat label={`${REBAR_BAR_LENGTH_M} m boy sayısı`} value={`${formatTr(meters / REBAR_BAR_LENGTH_M, 1)} boy`} />
              <Stat label={`Bir boy (${REBAR_BAR_LENGTH_M} m) ağırlığı`} value={kg(perMeter * REBAR_BAR_LENGTH_M)} />
              <Stat label={`Ø${d} metre ağırlığı`} value={`${formatTr(perMeter, 3)} kg/m`} />
            </div>
          ) : (
            <p className="date-calc-note">{INVALID}</p>
          )}
        </div>
      )}

      {mode === "list" && (
        <div className="date-calc-input">
          <p className="date-calc-note">Projedeki her poz için çapı, adedi ve bir parçanın kesim boyunu girin. Aynı çaptaki pozlar toplanır.</p>
          {rows.map((row, index) => (
            <div className="date-calc-fields" key={row.id}>
              <label className="date-calc-field">
                <span>Poz {index + 1} çapı</span>
                <select value={row.diameter} onChange={(e) => updateRow(row.id, { diameter: e.target.value })}>
                  {REBAR_DIAMETERS_MM.map((dd) => (
                    <option key={dd} value={String(dd)}>
                      Ø{dd}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Adet" value={row.count} onChange={(v) => updateRow(row.id, { count: v })} inputMode="numeric" />
              <Field label="Boy (m)" value={row.length} onChange={(v) => updateRow(row.id, { length: v })} />
              <button type="button" className="metal-row-remove" onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))} disabled={rows.length === 1} aria-label={`Poz ${index + 1} satırını sil`}>
                Sil
              </button>
            </div>
          ))}
          <button
            type="button"
            className="metal-row-add"
            onClick={() => {
              setRows((prev) => [...prev, { id: nextId, diameter: "10", count: "", length: "" }]);
              setNextId((v) => v + 1);
            }}
          >
            + Poz ekle
          </button>
          {list.groups.length > 0 ? (
            <>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Çap</th>
                      <th scope="col">Toplam boy (m)</th>
                      <th scope="col">Ağırlık (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.groups.map(([dd, g]) => (
                      <tr key={dd}>
                        <td>Ø{dd}</td>
                        <td>{formatTr(g.meters, 2)}</td>
                        <td>{formatTr(g.kg, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="date-calc-results">
                <Stat main label="Toplam demir" value={kg(list.totalKg)} />
                <Stat label="Ton" value={tons(list.totalKg)} />
              </div>
            </>
          ) : (
            <p className="date-calc-note">{INVALID}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Sac / levha ---------------- */

function PlateTool() {
  const [metal, setMetal] = useState("steel");
  const [length, setLength] = useState("2000");
  const [width, setWidth] = useState("1000");
  const [thickness, setThickness] = useState("2");
  const [count, setCount] = useState("1");
  const density = metalById(metal).density;
  const L = parseTr(length);
  const W = parseTr(width);
  const t = parseTr(thickness);
  const n = parseTr(count);
  const one = L !== null && W !== null && t !== null ? plateMassKg(L, W, t, density) : null;

  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <MetalSelect value={metal} onChange={setMetal} />
          <Field label="Uzunluk (mm)" value={length} onChange={setLength} />
          <Field label="Genişlik (mm)" value={width} onChange={setWidth} />
          <Field label="Kalınlık (mm)" value={thickness} onChange={setThickness} />
          <Field label="Adet" value={count} onChange={setCount} inputMode="numeric" />
        </div>
        {one !== null && t !== null && L !== null && W !== null ? (
          <div className="date-calc-results">
            <Stat main label={n !== null && n > 1 ? `Toplam (${formatTr(n, 0)} adet)` : "Levha ağırlığı"} value={kg(one * (n ?? 1))} />
            {n !== null && n > 1 ? <Stat label="Bir levha" value={kg(one)} /> : null}
            <Stat label="Metrekare ağırlığı" value={`${formatTr(plateKgPerM2(t, density), 3)} kg/m²`} />
            <Stat label="Levha alanı" value={`${formatTr((L * W) / 1e6, 3)} m²`} />
          </div>
        ) : (
          <p className="date-calc-note">{INVALID}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Boru ---------------- */

function PipeTool() {
  const [metal, setMetal] = useState("steel");
  const [dn, setDn] = useState("dn50");
  const [outer, setOuter] = useState("60,3");
  const [wall, setWall] = useState("3,2");
  const [length, setLength] = useState("6");
  const [count, setCount] = useState("1");
  const density = metalById(metal).density;
  const D = parseTr(outer);
  const t = parseTr(wall);
  const L = parseTr(length);
  const n = parseTr(count);
  const valid = D !== null && t !== null && isValidPipe(D, t);
  const perMeter = valid ? pipeKgPerMeter(D, t, density) : null;

  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <MetalSelect value={metal} onChange={setMetal} />
          <label className="date-calc-field">
            <span>Nominal çap (DN)</span>
            <select
              value={dn}
              onChange={(e) => {
                setDn(e.target.value);
                const row = pipeNominalSizeTable.find((r) => r.id === e.target.value);
                if (row) setOuter(formatTr(row.outerDiameterMm, 1));
              }}
            >
              <option value="">Elle gir</option>
              {pipeNominalSizeTable.map((r) => (
                <option key={r.id} value={r.id}>
                  DN{r.dn} ({r.nps}) – {formatTr(r.outerDiameterMm, 1)} mm
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Dış çap (mm)"
            value={outer}
            onChange={(v) => {
              setOuter(v);
              setDn("");
            }}
          />
          <Field label="Et kalınlığı (mm)" value={wall} onChange={setWall} />
          <Field label="Boy (m)" value={length} onChange={setLength} />
          <Field label="Adet" value={count} onChange={setCount} inputMode="numeric" />
        </div>
        {perMeter !== null && D !== null && t !== null ? (
          <div className="date-calc-results">
            <Stat main label="Metre ağırlığı" value={`${formatTr(perMeter, 3)} kg/m`} />
            {L !== null ? <Stat label={`Toplam (${formatTr(L * (n ?? 1), 2)} m)`} value={kg(perMeter * L * (n ?? 1))} /> : null}
            <Stat label="İç çap" value={`${formatTr(D - 2 * t, 2)} mm`} />
            <Stat label="Su dolu metre ağırlığı" value={`${formatTr(perMeter + pipeWaterKgPerMeter(D, t), 3)} kg/m`} />
          </div>
        ) : (
          <p className="date-calc-note">{D !== null && t !== null ? "Et kalınlığı dış çapın yarısından küçük olmalı." : INVALID}</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Kutu profil ---------------- */

function BoxTool() {
  const [metal, setMetal] = useState("steel");
  const [height, setHeight] = useState("40");
  const [width, setWidth] = useState("40");
  const [wall, setWall] = useState("3");
  const [length, setLength] = useState("6");
  const [count, setCount] = useState("1");
  const density = metalById(metal).density;
  const H = parseTr(height);
  const B = parseTr(width);
  const t = parseTr(wall);
  const L = parseTr(length);
  const n = parseTr(count);
  const valid = H !== null && B !== null && t !== null && isValidBox(H, B, t);
  const rounded = valid ? kgPerMeter(boxAreaRoundedMm2(H, B, t), density) : null;
  const sharp = valid ? kgPerMeter(boxAreaSharpMm2(H, B, t), density) : null;

  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <MetalSelect value={metal} onChange={setMetal} />
          <Field label="Yükseklik (mm)" value={height} onChange={setHeight} />
          <Field label="Genişlik (mm)" value={width} onChange={setWidth} />
          <Field label="Et kalınlığı (mm)" value={wall} onChange={setWall} />
          <Field label="Boy (m)" value={length} onChange={setLength} />
          <Field label="Adet" value={count} onChange={setCount} inputMode="numeric" />
        </div>
        {rounded !== null && sharp !== null && t !== null ? (
          <>
            <div className="date-calc-results">
              <Stat main label="Metre ağırlığı (yuvarlak köşe)" value={`${formatTr(rounded, 3)} kg/m`} />
              <Stat label="Keskin köşe hesabı" value={`${formatTr(sharp, 3)} kg/m`} />
              {L !== null ? <Stat label={`Toplam (${formatTr(L * (n ?? 1), 2)} m)`} value={kg(rounded * L * (n ?? 1))} /> : null}
            </div>
            <p className="date-calc-note">
              Yuvarlak köşe hesabında dış köşe yarıçapı {formatTr(boxOuterCornerRadius(t), 1)} mm alındı. Keskin köşe hesabı üst sınırdır; gerçek profil ikisinin arasında, çoğunlukla yuvarlak köşe değerine yakındır.
            </p>
          </>
        ) : (
          <p className="date-calc-note">{H !== null && B !== null && t !== null ? "Et kalınlığı kenarların yarısından küçük olmalı." : INVALID}</p>
        )}
      </div>
    </div>
  );
}

export default function MetalWeightTool({ kind }: { kind: MetalWeightKind }) {
  if (kind === "rebar") return <RebarTool />;
  if (kind === "plate") return <PlateTool />;
  if (kind === "pipe") return <PipeTool />;
  return <BoxTool />;
}
