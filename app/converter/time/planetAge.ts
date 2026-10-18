// Diğer gezegenlerde yaş: Dünya'da geçen sürenin gezegenin Güneş çevresindeki bir turuna (yıldızıl yörünge dönemi) bölümü.
// Kaynak: NASA NSSDCA gezegen bilgi sayfaları, "sidereal orbit period" ve "length of day" (Güneş günü, saat).

export const PLANET_YEARS = [
  { id: "merkur", name: "Merkür", orbitDays: 87.969, solarDayHours: 4222.6 },
  { id: "venus", name: "Venüs", orbitDays: 224.701, solarDayHours: 2802.0 },
  { id: "dunya", name: "Dünya", orbitDays: 365.256, solarDayHours: 24.0 },
  { id: "mars", name: "Mars", orbitDays: 686.98, solarDayHours: 24.6597 },
  { id: "jupiter", name: "Jüpiter", orbitDays: 4332.589, solarDayHours: 9.925 },
  { id: "saturn", name: "Satürn", orbitDays: 10759.22, solarDayHours: 10.656 },
  { id: "uranus", name: "Uranüs", orbitDays: 30685.4, solarDayHours: 17.24 },
  { id: "neptun", name: "Neptün", orbitDays: 60189, solarDayHours: 16.11 },
  { id: "pluton", name: "Plüton (cüce gezegen)", orbitDays: 90560, solarDayHours: 153.3 },
] as const;

const DAY = 86400000;
/** Dünya'da bir yıl: 365,25 gün (Jülyen yılı); "25 yaşındayım" girdisi bu yıl uzunluğuyla güne çevrilir. */
export const EARTH_YEAR_DAYS = 365.25;

export type PlanetAge = {
  id: string;
  name: string;
  orbitDays: number;
  age: number;
  /** O gezegende yaşanan Güneş günü sayısı (Güneş'in bir doğuşundan ötekine). */
  localDays: number;
  /** Doğum tarihi biliniyorsa o gezegendeki bir sonraki doğum günü. */
  next: { age: number; date: Date } | null;
};

/** Dünya'daki doğum günü takvime göre: aynı ay ve gün (29 Şubat doğumlular artık olmayan yıllarda 1 Mart). */
function anniversary(birth: Date, age: number) {
  const d = new Date(birth);
  d.setUTCFullYear(birth.getUTCFullYear() + age);
  return d;
}

/** days: Dünya'da yaşanan gün sayısı; birth verilirse sonraki doğum günleri de hesaplanır. */
export function planetAges(days: number, birth?: Date): PlanetAge[] {
  return PLANET_YEARS.map((p) => {
    // Dünya yaşı takvim yılıyla (365,25 gün) sayılır; yoksa "25 yaş" girdisi 24,9996 olup 24'e yuvarlanırdı.
    const age = days / (p.id === "dunya" ? EARTH_YEAR_DAYS : p.orbitDays);
    const nextAge = Math.floor(age) + 1;
    return {
      id: p.id,
      name: p.name,
      orbitDays: p.orbitDays,
      age,
      localDays: (days * 24) / p.solarDayHours,
      next: birth ? { age: nextAge, date: p.id === "dunya" ? anniversary(birth, nextAge) : new Date(birth.getTime() + nextAge * p.orbitDays * DAY) } : null,
    };
  });
}

export const daysFromYears = (years: number) => years * EARTH_YEAR_DAYS;
export const daysBetween = (birth: Date, now: Date) => (now.getTime() - birth.getTime()) / DAY;
