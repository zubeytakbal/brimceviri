"use client";

import { useState } from "react";
import { formatTr, parseTr } from "../../converter/metal/metalWeight";
import { radiusOfGyrationCm } from "../../converter/metal/steelSectionMath";
import { SERIES_LABELS, sectionName } from "../../converter/metal/steelNames";
import { STEEL_SECTIONS, type SteelSeriesId } from "../../converter/metal/steelSections";

function Stat({ label, value, main }: { label: string; value: string; main?: boolean }) {
  return (
    <div className={main ? "date-calc-stat is-main" : "date-calc-stat"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/**
 * Profil seç, boy ve adet gir: toplam ağırlık, boya/galvaniz yüzeyi ve kesit değerleri.
 * `series` verilirse seri sabittir; verilmezse seri seçilebilir (genel tablo sayfası).
 */
export default function SteelSectionTool({ series: fixedSeries, defaultSize }: { series?: SteelSeriesId; defaultSize: number }) {
  const [series, setSeries] = useState<SteelSeriesId>(fixedSeries ?? "IPE");
  const list = STEEL_SECTIONS[series];
  const [size, setSize] = useState(String(defaultSize));
  const [length, setLength] = useState("12");
  const [count, setCount] = useState("1");

  const section = list.find((s) => String(s.size) === size) ?? list[0];
  const L = parseTr(length);
  const n = parseTr(count) ?? 1;
  const totalM = L !== null ? L * n : null;

  return (
    <div className="date-calc metal-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          {fixedSeries ? null : (
            <label className="date-calc-field">
              <span>Profil serisi</span>
              <select
                value={series}
                onChange={(e) => {
                  const next = e.target.value as SteelSeriesId;
                  setSeries(next);
                  const sizes = STEEL_SECTIONS[next].map((s) => s.size);
                  if (!sizes.includes(Number(size))) setSize(String(sizes.includes(200) ? 200 : sizes[0]));
                }}
              >
                {(Object.keys(SERIES_LABELS) as SteelSeriesId[]).map((id) => (
                  <option key={id} value={id}>
                    {SERIES_LABELS[id]}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="date-calc-field">
            <span>Profil</span>
            <select value={String(section.size)} onChange={(e) => setSize(e.target.value)}>
              {list.map((s) => (
                <option key={s.size} value={String(s.size)}>
                  {sectionName(series, s.size)} – {formatTr(s.G, 1)} kg/m
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Boy (m)</span>
            <input type="text" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Adet</span>
            <input type="text" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} />
          </label>
        </div>
        <div className="date-calc-results">
          {totalM !== null ? (
            <>
              <Stat main label={`Toplam ağırlık (${formatTr(totalM, 2)} m)`} value={`${formatTr(section.G * totalM, 1)} kg`} />
              <Stat label="Ton" value={`${formatTr((section.G * totalM) / 1000, 3)} ton`} />
              <Stat label="Boya / galvaniz yüzeyi" value={`${formatTr(section.AL * totalM, 2)} m²`} />
            </>
          ) : null}
          <Stat label="Metre ağırlığı" value={`${formatTr(section.G, 1)} kg/m`} />
          <Stat label="Yükseklik × genişlik" value={`${formatTr(section.h, 1)} × ${formatTr(section.b, 1)} mm`} />
          <Stat label="Gövde / başlık kalınlığı" value={`${formatTr(section.tw, 1)} / ${formatTr(section.tf, 1)} mm`} />
          <Stat label="Kesit alanı" value={`${formatTr(section.A, 1)} cm²`} />
          <Stat label="Iy / Wel,y" value={`${formatTr(section.Iy, 0)} cm⁴ / ${formatTr(section.Wely, 1)} cm³`} />
          <Stat label="Iz / Wel,z" value={`${formatTr(section.Iz, 1)} cm⁴ / ${formatTr(section.Welz, 1)} cm³`} />
          <Stat label="iy / iz" value={`${formatTr(radiusOfGyrationCm(section.Iy, section.A), 2)} / ${formatTr(radiusOfGyrationCm(section.Iz, section.A), 2)} cm`} />
        </div>
        {totalM === null ? <p className="date-calc-note">Toplam ağırlık için geçerli bir boy girin.</p> : null}
      </div>
    </div>
  );
}
