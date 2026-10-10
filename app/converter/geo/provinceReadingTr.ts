// Il mesafe sayfasi: en yakin, en uzak ve ortalama karayolu. Sayilar KGM
// cetveli ve kus ucusu hesabindan gelir.
import { KGM_DISTANCE_DATE } from "./kgmDistances";
import { airKm, DEFAULT_AVG_KMH, distancesFrom, driveMinutes, durationText, roadKm, routeStops } from "./provinceDistances";
import type { TurkeyProvince } from "./turkeyProvinces";

const tr = (value: number, digits = 0) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export function provinceReadingParagraphs(province: TurkeyProvince) {
  const rows = distancesFrom(province);
  const nearest = rows.slice(0, 3);
  const farthest = rows[rows.length - 1];
  const within300 = rows.filter((row) => row.road <= 300).length;
  const average = rows.reduce((sum, row) => sum + row.road, 0) / rows.length;
  const ratio = farthest.road / farthest.air;
  const solar = Math.round((45 - province.lon) * 4);
  const plate = String(province.plate).padStart(2, "0");
  const nearText = nearest
    .map((row) => `${row.province.name} ${tr(row.road)} km (${tr(driveMinutes(row.road, DEFAULT_AVG_KMH))} dk)`)
    .join(", ");
  const date = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(KGM_DISTANCE_DATE),
  );

  return [
    `${province.name} plakası ${plate}, ${province.name} rakımı ${tr(province.elevationM)} m, ${province.name} bölgesi ${province.region}. ${province.name} koordinatı ${tr(province.lat, 2)}° K ve ${tr(province.lon, 2)}° D. ${plate} plakalı ${province.name} yerel saati 45° D'den ${tr(Math.abs(solar))} dakika ${solar >= 0 ? "geridedir" : "ileridedir"}.`,
    `${province.name} en yakın üç il: ${nearText}. ${province.name} en uzak ili ${farthest.province.name} ${tr(farthest.road)} km, kuş uçuşu ${tr(farthest.air)} km, oran ${tr(ratio, 2)}. ${province.name} için ${farthest.province.name} yolu ${DEFAULT_AVG_KMH} km/sa ile ${durationText(driveMinutes(farthest.road, DEFAULT_AVG_KMH))}.`,
    `${province.name} 300 km çevresinde ${tr(within300)} il var. ${province.name} ortalama karayolu ${tr(average)} km. ${plate} plakası ${province.name} cetveli ${date} KGM verisidir, süreler ${DEFAULT_AVG_KMH} km/sa tahmini.`,
  ];
}

export function provinceReadingPlain(province: TurkeyProvince) {
  return provinceReadingParagraphs(province).join(" ");
}

/** Iki ilin kendi karayolu, kus ucusu, rakim ve koordinat farki. */
export function routeReadingParagraph(from: TurkeyProvince, to: TurkeyProvince) {
  const road = roadKm(from, to);
  const air = airKm(from, to);
  const ratio = air > 0 ? road / air : 0;
  const solar = Math.round((to.lon - from.lon) * 4);
  const minutes = Math.round(driveMinutes(road, DEFAULT_AVG_KMH));
  const breaks = Math.floor(minutes / 150);
  const plate = String(to.plate).padStart(2, "0");
  const extra = Math.round(Math.abs(road - air));
  const climb = to.elevationM - from.elevationM;
  const stops = routeStops(from, to).map((stop) => stop.province.name);
  const via = stops.length > 1 ? `${stops.slice(0, -1).join(", ")} ve ${stops[stops.length - 1]}` : stops[0];
  const clock = durationText(minutes);
  const duration = clock.includes("sa") ? `${clock} (${tr(minutes)} dakika)` : `${tr(minutes)} dakika`;
  const height =
    climb === 0
      ? `${to.name} ${tr(to.elevationM)} m rakımda, ${from.name} ile aynı`
      : `${to.name} ${tr(to.elevationM)} m rakımda, ${from.name} rakımından ${tr(Math.abs(climb))} m ${climb > 0 ? "yüksek" : "alçak"}`;
  const sentences = [
    `${from.name} çıkışından ${to.name} ${tr(road)} km, kuş uçuşu ${tr(air)} km. ${to.name} yolu kuş uçuşunun ${tr(ratio, 2)} katı ve ${tr(extra)} km daha uzun.`,
    `${height}. Plakası ${plate}, bölgesi ${to.region}, koordinatı ${tr(to.lat, 2)}° K ${tr(to.lon, 2)}° D; enlem farkı ${tr(Math.abs(to.lat - from.lat), 2)}°, boylam farkı ${tr(Math.abs(to.lon - from.lon), 2)}°.`,
    `${duration} molasız sürer${breaks > 0 ? `; mola ${tr(breaks)}` : ""}. ${to.name} yerel saati ${from.name} saatinden ${tr(Math.abs(solar))} dakika ${solar >= 0 ? "ileride" : "geride"}.`,
  ];
  if (stops.length) sentences.push(`${to.name} üzerinden ${via} geçilir.`);
  return sentences.join(" ");
}
