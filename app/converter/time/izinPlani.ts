// Türkiye için izin planı: resmî tatiller tam gün boş, arefeler (13.00'e kadar çalışılan) yarım gün izin sayılır.
// Planlama algoritması Brückentage planlayıcısıyla ortaktır (brueckentage.ts).
import { planFuerTage, type Tag } from "./brueckentage";
import { addDaysYmd, weekdayOf, ymdKey } from "./dateMath";
import { turkeyHolidays } from "./holidays";

const PAD = 14;

export function turkiyeTatilGunleri(
  year: number,
  cumartesiCalisilir: boolean,
): Tag[] {
  const tam = new Map<string, string>();
  const yarim = new Map<string, string>();
  for (const y of [year - 1, year, year + 1]) {
    for (const h of turkeyHolidays(y))
      (h.kind === "full" ? tam : yarim).set(ymdKey(h.date), h.name);
  }
  const out: Tag[] = [];
  const end = ymdKey(addDaysYmd({ year, month: 12, day: 31 }, PAD));
  for (
    let d = addDaysYmd({ year, month: 1, day: 1 }, -PAD);
    ;
    d = addDaysYmd(d, 1)
  ) {
    const key = ymdKey(d);
    const wd = weekdayOf(d);
    const isGunu = wd !== 0 && (wd !== 6 || cumartesiCalisilir);
    const feiertag = tam.get(key) ?? null;
    out.push({
      date: d,
      key,
      frei: !isGunu || feiertag !== null,
      feiertag: isGunu ? feiertag : null,
      imJahr: d.year === year,
      halb: isGunu && !feiertag && yarim.has(key),
    });
    if (key === end) break;
  }
  return out;
}

export function izinPlani(
  year: number,
  izinGunu: number,
  cumartesiCalisilir = false,
) {
  return planFuerTage(
    turkiyeTatilGunleri(year, cumartesiCalisilir),
    izinGunu,
    10,
  );
}
