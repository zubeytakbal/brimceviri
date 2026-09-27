"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { airKm, DEFAULT_AVG_KMH, driveMinutes, durationText, roadKm } from "../../converter/geo/provinceDistances";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { TURKEY_MAP_VIEWBOX } from "../../converter/geo/turkeyMapPaths";

const sorted = [...turkeyProvinces].sort((a, b) => a.name.localeCompare(b.name, "tr"));
const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });

// Iki il arasi karayolu (KGM), kus ucusu, surus suresi ve yakit maliyeti; secilen iller haritada vurgulanir.
export default function ProvinceDistanceCalculator({
  map,
  centers,
  fuelPrice,
  initialA = 34,
  initialB = 6,
}: {
  map: ReactNode;
  centers: Record<number, { x: number; y: number }>;
  fuelPrice: number | null;
  initialA?: number;
  initialB?: number;
}) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [speed, setSpeed] = useState(DEFAULT_AVG_KMH);
  const [consumption, setConsumption] = useState("7");
  const [price, setPrice] = useState(fuelPrice ? fuelPrice.toFixed(2).replace(".", ",") : "");
  const [roundTrip, setRoundTrip] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const find = (id: string | null) => turkeyProvinces.find((p) => p.id === id)?.plate;
      const pa = find(params.get("a"));
      const pb = find(params.get("b"));
      if (pa) setA(pa);
      if (pb) setB(pb);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const A = turkeyProvinces[a - 1];
  const B = turkeyProvinces[b - 1];
  const same = a === b;

  const result = useMemo(() => {
    if (same) return null;
    const road = roadKm(A, B);
    const air = airKm(A, B);
    const factor = roundTrip ? 2 : 1;
    const minutes = driveMinutes(road * factor, speed);
    const cons = Number(consumption.replace(",", "."));
    const p = Number(price.replace(",", "."));
    const liters = cons > 0 ? (road * factor * cons) / 100 : null;
    const cost = liters !== null && p > 0 ? liters * p : null;
    return { road, air, factor, minutes, liters, cost };
  }, [A, B, same, roundTrip, speed, consumption, price]);

  const share = async () => {
    const url = `${window.location.origin}/iller-arasi-mesafe?a=${A.id}&b=${B.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Bağlantı", url);
    }
  };

  const ca = centers[a];
  const cb = centers[b];

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Nereden</span>
            <select value={a} onChange={(event) => setA(Number(event.target.value))}>
              {sorted.map((p) => (
                <option key={p.plate} value={p.plate}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="date-calc-swap"
            aria-label="İlleri değiştir"
            title="İlleri değiştir"
            onClick={() => {
              setA(b);
              setB(a);
            }}
          >
            ⇄
          </button>
          <label className="date-calc-field">
            <span>Nereye</span>
            <select value={b} onChange={(event) => setB(Number(event.target.value))}>
              {sorted.map((p) => (
                <option key={p.plate} value={p.plate}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Ortalama hız: {speed} km/sa</span>
            <input type="range" min={50} max={120} step={5} value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
          </label>
          <label className="date-calc-field">
            <span>Tüketim (L/100 km)</span>
            <input inputMode="decimal" value={consumption} onChange={(event) => setConsumption(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Yakıt fiyatı (TL/L)</span>
            <input inputMode="decimal" value={price} placeholder="ör. 48,50" onChange={(event) => setPrice(event.target.value)} />
          </label>
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={roundTrip} onChange={(event) => setRoundTrip(event.target.checked)} /> Gidiş-dönüş
        </label>
      </div>

      {same ? (
        <p className="date-calc-note">İki farklı il seçin.</p>
      ) : (
        result && (
          <>
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>
                  {A.name} – {B.name} karayolu mesafesi{roundTrip ? " (gidiş-dönüş)" : ""}
                </span>
                <strong>{fmt(result.road * result.factor)} km</strong>
                <em>Karayolları Genel Müdürlüğü il merkezleri arası mesafe</em>
              </div>
              <div className="date-calc-stat">
                <span>Kuş uçuşu</span>
                <strong>{fmt(result.air * result.factor)} km</strong>
                <em>Karayolu, kuş uçuşunun {fmt(result.road / result.air, 2)} katı</em>
              </div>
              <div className="date-calc-stat">
                <span>Tahmini sürüş süresi</span>
                <strong>{durationText(result.minutes)}</strong>
                <em>Molasız, {speed} km/sa ortalamayla</em>
              </div>
              <div className="date-calc-stat">
                <span>Yakıt</span>
                <strong>{result.liters !== null ? `${fmt(result.liters, 1)} L` : "—"}</strong>
                <em>{result.cost !== null ? `≈ ${fmt(result.cost)} TL` : "Fiyat girin"}</em>
              </div>
            </div>
            <p className="date-calc-links">
              <button type="button" className="time-tool-button is-secondary" onClick={() => void share()}>
                {copied ? "Bağlantı kopyalandı" : "Bağlantıyı paylaş"}
              </button>
              <Link href={`/iller-arasi-mesafe/${A.id}`} prefetch={false}>
                {A.name} çıkışlı tüm mesafeler →
              </Link>
              <Link href={`/iller-arasi-mesafe/${B.id}`} prefetch={false}>
                {B.name} çıkışlı tüm mesafeler →
              </Link>
            </p>
          </>
        )
      )}

      <p className="tr-map-hint">Haritada bir ile tıklayarak varış noktasını seçebilirsiniz.</p>
      <div
        className="tr-map-frame is-clickable"
        data-a={a}
        data-b={same ? undefined : b}
        onClick={(event) => {
          const plate = (event.target as Element).closest("[data-plate]")?.getAttribute("data-plate");
          if (plate) setB(Number(plate));
        }}
      >
        {map}
        {ca && cb && !same && (
          <svg viewBox={TURKEY_MAP_VIEWBOX} className="tr-map-overlay" aria-hidden="true">
            <line x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y} className="tr-map-line" />
            {[ca, cb].map((c, i) => (
              <circle key={i} cx={c.x} cy={c.y} r={7} className="tr-map-dot" />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
