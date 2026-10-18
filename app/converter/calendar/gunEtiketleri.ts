// Türkiye takviminde bir günün bütün etiketleri tek yerde: resmî tatiller, bayramlar, kandiller ve dini günler,
// milli ve özel günler, halk takvimi (cemre, fırtınalar), MEB okul takvimi ve ay evreleri. Gökyüzü olayları
// (meteor yağmuru, tutulma, süper ay) astronomy-engine gerektirdiği için ayrı dosyadadır (gokyuzuEtiketleri.ts) ve
// yalnızca sunucuda derlenen sayfalarda eklenir.
import type { YMD } from "../time/calendars";
import { addDaysYmd, daysInMonth, diffDays } from "../time/dateMath";
import { moonPhasesBetween, type PhaseKind } from "../time/moon";
import { ayFirtinalari } from "./firtinaTakvimi";
import { OKUL_YILLARI, okulOlaylari } from "./okulTakvimi";
import { gunHaritasi, ozelGunPath, tarihliAd, type Kategori } from "./trTakvim";

/** Filtre grupları: ızgaradaki çipler bu adlarla açılıp kapanır. */
export type EtiketTur = "tatil" | "dini" | "milli" | "ozel" | "halk" | "okul" | "gokyuzu";

/** devam: birkaç gün süren olayın ilk günden sonraki günleri (ızgarada etiket yalnızca ilk günde yazılır). */
export type Etiket = { tur: EtiketTur; ad: string; href: string; tahmini?: boolean; devam?: boolean };

export const ETIKET_TURLERI: Array<{ tur: EtiketTur; ad: string }> = [
  { tur: "tatil", ad: "Tatil ve bayramlar" },
  { tur: "dini", ad: "Dini günler" },
  { tur: "milli", ad: "Milli günler" },
  { tur: "ozel", ad: "Özel günler" },
  { tur: "halk", ad: "Halk takvimi" },
  { tur: "okul", ad: "Okul" },
  { tur: "gokyuzu", ad: "Ay ve gökyüzü" },
];

const KATEGORI_TUR: Record<Kategori, EtiketTur> = {
  resmi: "tatil",
  bayram: "tatil",
  dini: "dini",
  milli: "milli",
  ozel: "ozel",
  halk: "halk",
  mevsim: "gokyuzu",
};

export const EVRE_ADI: Record<PhaseKind, string> = { new: "Yeni ay", first: "İlk dördün", full: "Dolunay", last: "Son dördün" };

/** Türkiye saatine (UTC+3) göre bir anın takvim günü. */
export function trGunu(d: Date): YMD {
  const t = new Date(d.getTime() + 3 * 3600000);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

// Halk takvimindeki Hamsin ve Kocakarı soğukları özel günler listesinde zaten var; fırtına listesinden eklenmez.
const ETKINLIKTE_OLAN_FIRTINA = /^(Hamsin|Kocakarı)/;

/** Ayın her günü için etiketler (anahtar: ayın günü). Gökyüzü olayları hariç. */
export function ayEtiketleri(year: number, month: number): Map<number, Etiket[]> {
  const out = new Map<number, Etiket[]>();
  const ekle = (day: number, e: Etiket) => {
    const list = out.get(day) ?? [];
    if (!list.some((x) => x.ad === e.ad)) list.push(e);
    out.set(day, list);
  };
  const ayIcinde = (d: YMD) => d.year === year && d.month === month;

  const harita = gunHaritasi(year);
  for (let day = 1; day <= daysInMonth(year, month); day += 1) {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    for (const t of harita.get(key) ?? []) {
      const k = t.etkinlik.kategori;
      ekle(day, { tur: KATEGORI_TUR[k], ad: tarihliAd(t), href: t.etkinlik.geriSayim ? `/geri-sayim/${t.etkinlik.geriSayim}` : ozelGunPath(t.etkinlik.id), tahmini: t.tahmini });
    }
  }

  for (const f of ayFirtinalari(month)) {
    if (ETKINLIKTE_OLAN_FIRTINA.test(f.ad)) continue;
    ekle(f.gun, { tur: "halk", ad: f.ad, href: "/firtina-takvimi" });
  }

  for (const y of OKUL_YILLARI) {
    for (const o of okulOlaylari(y)) {
      const bit = o.bit ?? o.bas;
      for (let d = o.bas; diffDays(d, bit) >= 0; d = addDaysYmd(d, 1)) {
        if (ayIcinde(d)) ekle(d.day, { tur: "okul", ad: o.ad, href: "/okul-takvimi", devam: d.day !== 1 && diffDays(o.bas, d) > 0 });
      }
    }
  }

  for (const e of moonPhasesBetween(new Date(Date.UTC(year, month - 1, 1, -3)), new Date(Date.UTC(year, month, 1, -3)))) {
    const d = trGunu(e.date);
    if (ayIcinde(d)) ekle(d.day, { tur: "gokyuzu", ad: EVRE_ADI[e.kind], href: "/ay-evreleri" });
  }

  return out;
}
