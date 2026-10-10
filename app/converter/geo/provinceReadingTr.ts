// Il mesafe sayfasi: en yakin, en uzak ve ortalama karayolu. Sayilar KGM
// cetveli ve kus ucusu hesabindan gelir.
import { KGM_DISTANCE_DATE } from "./kgmDistances";
import { DEFAULT_AVG_KMH, distancesFrom, driveMinutes, durationText } from "./provinceDistances";
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
