import { TURKEY_MAP_PATHS, TURKEY_MAP_VIEWBOX } from "../../converter/geo/turkeyMapPaths";
import { turkeyProvinces, type TurkeyProvince } from "../../converter/geo/turkeyProvinces";
import { provinceMapCenters } from "../geo/TurkeyMap";

/** Türkiye haritasında güzergâh: çıkış ve varış ili koyu, yol üstündeki iller açık; iller arası yol çizgisi ve duraklar. */
export default function RotaHaritasi({ from, to, duraklar }: { from: TurkeyProvince; to: TurkeyProvince; duraklar: TurkeyProvince[] }) {
  const c = provinceMapCenters();
  const yol = [from, ...duraklar, to];
  const uclar = new Set([from.plate, to.plate]);
  const ara = new Set(duraklar.map((p) => p.plate));
  // Görünüm rotaya yakınlaşır: güzergâhın sınır kutusu + pay, en az 300 birim ve yaklaşık 2:1 oran.
  const xs = yol.map((p) => c[p.plate].x);
  const ys = yol.map((p) => c[p.plate].y);
  const [vx0, vy0, vw0, vh0] = TURKEY_MAP_VIEWBOX.split(" ").map(Number);
  let w = Math.max(300, Math.max(...xs) - Math.min(...xs) + 160);
  let h = Math.max(150, Math.max(...ys) - Math.min(...ys) + 120);
  if (w < h * 1.6) w = h * 1.6;
  else h = Math.max(h, w / 2.2);
  w = Math.min(w, vw0);
  h = Math.min(h, vh0);
  const x = Math.min(Math.max((Math.min(...xs) + Math.max(...xs)) / 2 - w / 2, vx0), vx0 + vw0 - w);
  const y = Math.min(Math.max((Math.min(...ys) + Math.max(...ys)) / 2 - h / 2, vy0), vy0 + vh0 - h);
  const olcek = w / vw0;
  const nokta = yol.map((p) => `${c[p.plate].x.toFixed(1)},${c[p.plate].y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`${x.toFixed(0)} ${y.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}`} className="rota-harita" style={{ ["--olcek" as string]: olcek.toFixed(3) }} role="img" aria-label={`${from.name} – ${to.name} güzergâh haritası`}>
      {turkeyProvinces.map((p) => (
        <path key={p.plate} d={TURKEY_MAP_PATHS[p.plate]} className={uclar.has(p.plate) ? "is-uc" : ara.has(p.plate) ? "is-ara" : undefined}>
          <title>{p.name}</title>
        </path>
      ))}
      <polyline points={nokta} className="rota-yol-kenar" />
      <polyline points={nokta} className="rota-yol" />
      {yol.map((p, i) => {
        const uc = i === 0 || i === yol.length - 1;
        return (
          <g key={p.plate} className={uc ? "rota-durak is-uc" : "rota-durak"}>
            <circle cx={c[p.plate].x} cy={c[p.plate].y} r={(uc ? 9 : 5) * olcek} strokeWidth={(uc ? 3.5 : 3) * olcek} />
            {(uc || duraklar.length <= 6) && (
              <text x={c[p.plate].x} y={c[p.plate].y - (uc ? 15 : 10) * olcek}>
                {p.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
