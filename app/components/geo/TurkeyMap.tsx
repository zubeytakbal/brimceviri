import Link from "@/app/components/SiteLink";
import { TURKEY_MAP_PATHS, TURKEY_MAP_VIEWBOX } from "../../converter/geo/turkeyMapPaths";
import { turkeyProvinces, type TurkeyProvince } from "../../converter/geo/turkeyProvinces";

let centers: Record<number, { x: number; y: number }> | null = null;

/** Her ilin harita uzerindeki etiket noktasi (yol sinir kutusunun merkezi). */
export function provinceMapCenters() {
  if (centers) return centers;
  const out: Record<number, { x: number; y: number }> = {};
  for (const p of turkeyProvinces) {
    const nums = [...TURKEY_MAP_PATHS[p.plate].matchAll(/(-?\d+(?:\.\d+)?)[ ,](-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    const xs = nums.map((n) => n[0]);
    const ys = nums.map((n) => n[1]);
    out[p.plate] = { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 };
  }
  centers = out;
  return out;
}

/** Secili il vurgulari (data-a / data-b) icin CSS kurallari. */
function selectionCss() {
  return turkeyProvinces
    .map((p) => `.tr-map-frame[data-a="${p.plate}"] .tr-map-svg path[data-plate="${p.plate}"],.tr-map-frame[data-b="${p.plate}"] .tr-map-svg path[data-plate="${p.plate}"]{fill:var(--tr-map-selected)}`)
    .join("");
}

// Sunucuda cizilen Turkiye il haritasi. Renkler "fills" ile, cok katmanli gosterim "layers" (CSS degiskenleri) ile verilir.
export default function TurkeyMap({
  ariaLabel,
  fills,
  layers,
  hrefFor,
  titleFor,
  labels,
  selectable,
  className,
}: {
  ariaLabel: string;
  fills?: Record<number, string>;
  /** { rakim: {34: "#..."} } -> style="--f-rakim: ..." */
  layers?: Record<string, Record<number, string>>;
  hrefFor?: (p: TurkeyProvince) => string | null;
  titleFor?: (p: TurkeyProvince) => string;
  labels?: "plate" | "none";
  selectable?: boolean;
  className?: string;
}) {
  const c = provinceMapCenters();
  return (
    <>
      {selectable ? <style>{selectionCss()}</style> : null}
      <svg viewBox={TURKEY_MAP_VIEWBOX} className={`tr-map-svg${className ? ` ${className}` : ""}`} role="img" aria-label={ariaLabel}>
        {turkeyProvinces.map((p) => {
          const style: Record<string, string> = fills?.[p.plate] ? { fill: fills[p.plate] } : {};
          if (layers) for (const [k, v] of Object.entries(layers)) style[`--f-${k}`] = v[p.plate];
          const path = (
            <path d={TURKEY_MAP_PATHS[p.plate]} data-plate={p.plate} style={style}>
              <title>{titleFor ? titleFor(p) : p.name}</title>
            </path>
          );
          const href = hrefFor?.(p);
          return href ? (
            <Link key={p.plate} href={href} prefetch={false} aria-label={p.name}>
              {path}
            </Link>
          ) : (
            <g key={p.plate}>{path}</g>
          );
        })}
        {labels === "plate" &&
          turkeyProvinces.map((p) => (
            <text key={`l${p.plate}`} x={c[p.plate].x} y={c[p.plate].y} className="tr-map-label">
              {p.plate}
            </text>
          ))}
      </svg>
    </>
  );
}

/** Sayisal degeri acik -> koyu teal renk skalasina cevirir. */
export function scaleColor(value: number, min: number, max: number) {
  const t = max === min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min)));
  const from = [224, 243, 241];
  const to = [15, 86, 96];
  const mix = from.map((f, i) => Math.round(f + (to[i] - f) * t));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}

export const REGION_COLORS: Record<string, string> = {
  Marmara: "#7fb3d5",
  Ege: "#76c7b7",
  Akdeniz: "#f6c26b",
  "İç Anadolu": "#e8a87c",
  Karadeniz: "#8fc98a",
  "Doğu Anadolu": "#b8a1d9",
  "Güneydoğu Anadolu": "#e59aa6",
};
