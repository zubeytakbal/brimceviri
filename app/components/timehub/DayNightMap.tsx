// Canlı gece-gündüz dünya haritası: ülkeler sunucuda çizilir, gece tarafı ve
// şehir noktaları tarayıcıda her dakika güncellenir.
import { naturalEarthOutline } from "../../converter/geo/naturalEarth";
import WorldMap from "../geo/WorldMap";
import DayNightOverlay, { type DayNightCity } from "./DayNightOverlay";

export default function DayNightMap({
  ariaLabel,
  lang,
  intlLocale,
  cities,
  dayLabel,
  nightLabel,
}: {
  ariaLabel: string;
  lang: "tr" | "en" | "de";
  intlLocale: string;
  cities: DayNightCity[];
  dayLabel: string;
  nightLabel: string;
}) {
  return (
    <div className="daynight-map">
      <svg className="daynight-sphere" viewBox="0 0 1000 520" aria-hidden="true">
        <path d={naturalEarthOutline()} />
      </svg>
      <WorldMap ariaLabel={ariaLabel} lang={lang} />
      <DayNightOverlay cities={cities} intlLocale={intlLocale} dayLabel={dayLabel} nightLabel={nightLabel} />
    </div>
  );
}
