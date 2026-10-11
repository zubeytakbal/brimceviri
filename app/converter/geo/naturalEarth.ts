// Dünya haritası (worldMapPaths) Natural Earth 1 projeksiyonuyla 1000×520 alana çizilmiş.
// Ölçek ve kaydırma başkent noktalarından en küçük kareler ile bulundu (hata < 0,1 px);
// harita üstüne enlem-boylamdan nokta ve çizgi koymak için kullanılır.
const K = 183.532;
const TX = 500.003;
const TY = 297.22;

export function projectNaturalEarth(lon: number, lat: number): [number, number] {
  const l = (lon * Math.PI) / 180;
  const p = (lat * Math.PI) / 180;
  const p2 = p * p;
  const p4 = p2 * p2;
  const x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
  const y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
  return [TX + K * x, TY - K * y];
}

const toPath = (pts: Array<[number, number]>) => `M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")}Z`;

/** Haritanın dış çerçevesi (küre sınırı). */
export function naturalEarthOutline() {
  const pts: Array<[number, number]> = [];
  for (let lat = -90; lat <= 90; lat += 3) pts.push(projectNaturalEarth(180, lat));
  for (let lat = 90; lat >= -90; lat -= 3) pts.push(projectNaturalEarth(-180, lat));
  return toPath(pts);
}

export { toPath as naturalEarthPath };
