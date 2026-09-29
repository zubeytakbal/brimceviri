import Link from "@/app/components/SiteLink";
import { countryBbox, WORLD_MAP_OTHER, WORLD_MAP_PATHS, WORLD_MAP_SIZE } from "../../converter/geo/worldGeo";
import { worldCountries, type WorldCountry } from "../../converter/geo/worldCountries";
import { worldCountriesDe } from "../../converter/geo/worldCountriesDe";

/** Secili ulke vurgulari (data-a) icin CSS kurallari. */
function selectionCss() {
  return worldCountries
    .map((c) => `.tr-map-frame[data-a="${c.iso3}"] .world-map-svg [data-iso="${c.iso3}"]{fill:var(--tr-map-selected)}`)
    .join("");
}

// Sunucuda cizilen dunya haritasi. Haritada gorunmeyecek kadar kucuk ulkeler baskent noktasi olarak cizilir.
export default function WorldMap({
  ariaLabel,
  fills,
  layers,
  hrefFor,
  titleFor,
  viewBox,
  selectable,
  capitalDots,
  labels,
  lang = "tr",
}: {
  ariaLabel: string;
  fills?: Record<string, string>;
  layers?: Record<string, Record<string, string>>;
  hrefFor?: (c: WorldCountry) => string | null;
  titleFor?: (c: WorldCountry) => string;
  viewBox?: string;
  selectable?: boolean;
  /** Bu ISO3 kodlarinin baskentleri noktayla isaretlenir */
  capitalDots?: string[];
  /** Bu ulkelerin adi baskent noktasinin yaninda yazilir */
  labels?: string[];
  lang?: "tr" | "en" | "de";
}) {
  const nameOf = (c: WorldCountry) => (lang === "en" ? c.nameEn : lang === "de" ? (worldCountriesDe[c.iso3]?.name ?? c.nameEn) : c.nameTr);
  const vb = viewBox ?? `0 0 ${WORLD_MAP_SIZE.width} ${WORLD_MAP_SIZE.height}`;
  const scale = Number(vb.split(" ")[2]) / WORLD_MAP_SIZE.width;
  const styleFor = (c: WorldCountry) => {
    const style: Record<string, string> = fills?.[c.iso3] ? { fill: fills[c.iso3] } : {};
    if (layers) for (const [k, v] of Object.entries(layers)) if (v[c.iso3]) style[`--f-${k}`] = v[c.iso3];
    return style;
  };
  const wrap = (c: WorldCountry, node: React.ReactNode) => {
    const href = hrefFor?.(c);
    return href ? (
      <Link key={c.iso3} href={href} prefetch={false} aria-label={nameOf(c)}>
        {node}
      </Link>
    ) : (
      <g key={c.iso3}>{node}</g>
    );
  };
  return (
    <>
      {selectable ? <style>{selectionCss()}</style> : null}
      <svg viewBox={vb} className="tr-map-svg world-map-svg" role="img" aria-label={ariaLabel} style={{ ["--map-scale" as string]: String(scale) }}>
        {WORLD_MAP_OTHER.map((o) => (
          <path key={o.name} d={o.d} className="world-map-other">
            <title>{o.name}</title>
          </path>
        ))}
        {worldCountries
          .filter((c) => WORLD_MAP_PATHS[c.iso3])
          .map((c) =>
            wrap(
              c,
              <path d={WORLD_MAP_PATHS[c.iso3]} data-iso={c.iso3} style={styleFor(c)}>
                <title>{titleFor ? titleFor(c) : nameOf(c)}</title>
              </path>
            )
          )}
        {/* Haritada cizimi olmayan kucuk ulkeler */}
        {worldCountries
          .filter((c) => !c.onMap)
          .map((c) =>
            wrap(
              c,
              <circle cx={c.capX} cy={c.capY} r={2.6 * Math.max(scale, 0.35)} data-iso={c.iso3} className="world-map-small" style={styleFor(c)}>
                <title>{titleFor ? titleFor(c) : nameOf(c)}</title>
              </circle>
            )
          )}
        {capitalDots?.map((iso) => {
          const c = worldCountries.find((x) => x.iso3 === iso);
          return c ? <circle key={`cap-${iso}`} cx={c.capX} cy={c.capY} r={2.2 * Math.max(scale, 0.3)} className="world-map-capital" /> : null;
        })}
        {labels?.map((iso) => {
          const c = worldCountries.find((x) => x.iso3 === iso);
          // Harita olceginde cok kucuk kalan ulkelerin adi yazilmaz (ustuste binmesin); liste sayfada.
          const box = c ? countryBbox(c) : null;
          const vbWidth = Number(vb.split(" ")[2]);
          if (!c || !box || Math.max(box[2] - box[0], (box[3] - box[1]) * 1.4) < vbWidth * 0.09) return null;
          return c ? (
            <text key={`lbl-${iso}`} x={c.capX} y={c.capY - 4 * scale} className="world-map-label" style={{ fontSize: `${11 * scale}px` }}>
              {nameOf(c)}
            </text>
          ) : null;
        })}
      </svg>
    </>
  );
}
