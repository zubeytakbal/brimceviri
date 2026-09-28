"use client";

import { useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";

type Metric = "bolge" | "rakim";

// Il haritasi katman secici ve tiklanan ilin bilgi karti. Harita sunucuda cizilir (children).
export default function ProvinceMapExplorer({ map, legend }: { map: ReactNode; legend: Record<Metric, ReactNode> }) {
  const [metric, setMetric] = useState<Metric>("bolge");
  const [labels, setLabels] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const p = selected ? turkeyProvinces[selected - 1] : null;

  return (
    <div className="province-explorer">
      <div className="province-explorer-bar">
        <div className="date-converter-modes is-light" role="tablist">
          {[
            { id: "bolge" as const, label: "Coğrafi bölgeler" },
            { id: "rakim" as const, label: "Rakım" },
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={metric === m.id} className={metric === m.id ? "is-active" : undefined} onClick={() => setMetric(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={labels} onChange={(event) => setLabels(event.target.checked)} /> Plaka numaraları
        </label>
      </div>
      <div
        className={`tr-map-frame is-clickable${labels ? "" : " hide-labels"}`}
        data-metric={metric}
        data-a={selected ?? undefined}
        onClick={(event) => {
          const plate = (event.target as Element).closest("[data-plate]")?.getAttribute("data-plate");
          if (plate) setSelected(Number(plate));
        }}
      >
        {map}
      </div>
      <div className="tr-map-legend">{legend[metric]}</div>
      {p ? (
        <div className="province-card">
          <div>
            <span className="province-card-plate">{String(p.plate).padStart(2, "0")}</span>
            <strong>{p.name}</strong>
            <em>{p.region} Bölgesi</em>
          </div>
          <ul>
            {p.center && <li>İl merkezi: {p.center}</li>}
            <li>Rakım: {p.elevationM.toLocaleString("tr-TR")} m</li>
            <li>
              Koordinat: {p.lat.toLocaleString("tr-TR")}° K, {p.lon.toLocaleString("tr-TR")}° D
            </li>
          </ul>
          <p className="date-calc-links">
            <Link href={`/iller-arasi-mesafe/${p.id}`} prefetch={false}>
              İllere mesafe →
            </Link>
            <Link href={`/il-rakimlari/${p.id}`} prefetch={false}>
              Rakım ve kaynama noktası →
            </Link>
          </p>
        </div>
      ) : (
        <p className="tr-map-hint">Ayrıntılarını görmek için haritada bir ile tıklayın.</p>
      )}
    </div>
  );
}
