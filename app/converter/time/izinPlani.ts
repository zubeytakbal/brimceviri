// Türkiye için izin planı: resmî tatiller tam gün boş, arefeler (13.00'e kadar çalışılan) yarım gün izin sayılır.
// Planlama algoritması Brückentage planlayıcısıyla ortaktır (brueckentage.ts).
import { planFuerTage, type Tag, type Zeitraum } from "./brueckentage";
import { addDaysYmd, weekdayOf, ymdKey, parseYmd } from "./dateMath";
import { turkeyHolidays } from "./holidays";

const PAD = 14;

export function turkiyeTatilGunleri(
  year: number,
  cumartesiCalisilir: boolean,
  workdays?: boolean[],
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
    const isGunu = workdays ? workdays[wd] : wd !== 0 && (wd !== 6 || cumartesiCalisilir);
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


/** All proposed time off stays inside the selected range, including weekends. */
export function kisiselIzinPlani(year: number, budget: number, workdays: boolean[], start: string, end: string) {
  const empty = { enUzun: null as Zeitraum | null, enVerimli: null as Zeitraum | null };
  if (!parseYmd(start) || !parseYmd(end) || start > end ||
      !start.startsWith(`${year}-`) || !end.startsWith(`${year}-`) ||
      workdays.length !== 7 || !workdays.some(Boolean) ||
      !Number.isFinite(budget) || budget < 0.5 || budget > 30) return empty;
  const days = turkiyeTatilGunleri(year, false, workdays).filter(t => t.key >= start && t.key <= end);
  let enUzun: Zeitraum | null = null;
  let enVerimli: Zeitraum | null = null;
  for (let i = 0; i < days.length; i++) {
    let cost = 0;
    const leave: Zeitraum['urlaubstage'] = [];
    const holidays = new Set<string>();
    for (let j = i; j < days.length; j++) {
      const t = days[j];
      if (!t.frei) { cost += t.halb ? 0.5 : 1; leave.push(t.date); }
      if (cost > budget) break;
      if (t.feiertag) holidays.add(t.feiertag);
      if (cost === 0) continue;
      const length = j - i + 1;
      const longest = !enUzun || length > enUzun.tage || (length === enUzun.tage && cost < enUzun.urlaub);
      const efficient = !enVerimli || length / cost > enVerimli.tage / enVerimli.urlaub ||
        (length / cost === enVerimli.tage / enVerimli.urlaub && cost < enVerimli.urlaub);
      if (longest || efficient) {
        const z: Zeitraum = { von: days[i].date, bis: t.date, tage: length, urlaub: cost, urlaubstage: [...leave], feiertage: [...holidays] };
        if (longest) enUzun = z;
        if (efficient) enVerimli = z;
      }
    }
  }
  return { enUzun, enVerimli };
}
