"use client";

import { useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";

export type ExplorerCountry = {
  iso3: string;
  id: string;
  /** Gosterilen ulke adi (Ingilizce sayfada Ingilizce ad) */
  nameTr: string;
  flag: string;
  capital: string;
  area: number;
  region: string;
  timeDiff: string;
  distance: number;
};

type Metric = "kita" | "alan" | "saat";

// Dunya haritasi katman secici ve tiklanan ulkenin bilgi karti.
export default function WorldMapExplorer({
  map,
  legend,
  countries,
  lang = "tr",
}: {
  map: ReactNode;
  legend: Record<Metric, ReactNode>;
  countries: Record<string, ExplorerCountry>;
  lang?: "tr" | "en";
}) {
  const en = lang === "en";
  const [metric, setMetric] = useState<Metric>("kita");
  const [selected, setSelected] = useState<string | null>(null);
  const c = selected ? countries[selected] : null;

  return (
    <div className="province-explorer">
      <div className="province-explorer-bar">
        <div className="date-converter-modes is-light" role="tablist">
          {[
            { id: "kita" as const, label: en ? "Continents" : "Kıtalar" },
            { id: "alan" as const, label: en ? "Area" : "Yüzölçümü" },
            { id: "saat" as const, label: en ? "UTC offset" : "Türkiye ile saat farkı" },
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={metric === m.id} className={metric === m.id ? "is-active" : undefined} onClick={() => setMetric(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="tr-map-frame is-clickable world-map-frame"
        data-wmetric={metric}
        data-a={selected ?? undefined}
        onClick={(event) => {
          const iso = (event.target as Element).closest("[data-iso]")?.getAttribute("data-iso");
          if (iso && countries[iso]) setSelected(iso);
        }}
      >
        {map}
      </div>
      <div className="tr-map-legend">{legend[metric]}</div>
      {c ? (
        <div className="province-card">
          <div>
            <span className="country-card-flag" aria-hidden="true">
              {c.flag}
            </span>
            <strong>{c.nameTr}</strong>
            <em>{c.region}</em>
          </div>
          {en ? (
            <ul>
              <li>Capital: {c.capital}</li>
              <li>
                Area: {c.area.toLocaleString("en-US")} km² ({Math.round(c.area * 0.386102).toLocaleString("en-US")} sq mi)
              </li>
              <li>Time: {c.timeDiff}</li>
            </ul>
          ) : (
            <ul>
              <li>Başkent: {c.capital}</li>
              <li>Yüzölçümü: {c.area.toLocaleString("tr-TR")} km²</li>
              <li>Saat: {c.timeDiff}</li>
              {c.iso3 !== "TUR" && <li>Ankara&apos;ya uzaklık (kuş uçuşu): {c.distance.toLocaleString("tr-TR")} km</li>}
            </ul>
          )}
          <p className="date-calc-links">
            <Link href={en ? `/en/countries/${c.id}` : `/ulkeler/${c.id}`} prefetch={false}>
              {en ? `${c.nameTr}: capital, time zone and facts →` : `${c.nameTr} hakkında her şey →`}
            </Link>
          </p>
        </div>
      ) : (
        <p className="tr-map-hint">
          {en ? "Click a country on the map to see its details. Small countries are shown as dots." : "Ayrıntılarını görmek için haritada bir ülkeye tıklayın. Küçük ülkeler nokta ile gösterilir."}
        </p>
      )}
    </div>
  );
}
