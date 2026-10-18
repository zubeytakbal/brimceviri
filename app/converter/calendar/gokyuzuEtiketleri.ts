// Takvim ızgarası için gökyüzü olayları: meteor yağmuru zirveleri, tutulmalar, yılın süper ve mikro ayı ile gezegenlerin
// karşı konumu ve en büyük uzanımı. Mevsim başlangıçları özel günler listesinde, ay evreleri gunEtiketleri.ts'de olduğu için
// burada eklenmez. astronomy-engine kullandığı için yalnızca sunucuda derlenen sayfalarda çağrılır.
import { skyEvents } from "../time/skyEvents";
import { ayEtiketleri, trGunu, type Etiket } from "./gunEtiketleri";

/** Ayın günlerine göre gökyüzü olayları (anahtar: ayın günü). */
export function ayGokyuzuEtiketleri(year: number, month: number): Map<number, Etiket[]> {
  const out = new Map<number, Etiket[]>();
  const from = new Date(Date.UTC(year, month - 1, 1, -3));
  const to = new Date(Date.UTC(year, month, 1, -3));
  for (const e of skyEvents(from, to)) {
    if (e.kind === "season") continue;
    if (e.kind === "moon" && e.title === "Dolunay") continue;
    if (e.kind === "planet" && e.title.includes("yan yana")) continue;
    const d = trGunu(e.at);
    if (d.year !== year || d.month !== month) continue;
    const list = out.get(d.day) ?? [];
    list.push({ tur: "gokyuzu", ad: e.title.replace(/ zirvesi$/, ""), href: "/gokyuzu-olaylari-takvimi" });
    out.set(d.day, list);
  }
  return out;
}

/** İki etiket haritasını birleştirir; süper ya da mikro ay olan günde ayrıca "Dolunay" yazılmaz. */
export function etiketBirlestir(a: Map<number, Etiket[]>, b: Map<number, Etiket[]>) {
  const out = new Map(a);
  for (const [day, list] of b) {
    const ozelDolunay = list.some((e) => /^(Süper|Mikro) ay/.test(e.ad));
    const once = (out.get(day) ?? []).filter((e) => !(ozelDolunay && e.ad === "Dolunay"));
    out.set(day, [...once, ...list]);
  }
  return out;
}

/** Ayın tüm etiketleri: takvim, halk takvimi, okul, ay evreleri ve gökyüzü olayları. */
export const ayTumEtiketleri = (year: number, month: number) => etiketBirlestir(ayEtiketleri(year, month), ayGokyuzuEtiketleri(year, month));

/** Yılların gökyüzü olayları "YYYY-MM-DD" anahtarıyla (istemci takvimine aktarmak için). */
export function yilGokyuzuEtiketleri(years: number[]): Record<string, Etiket[]> {
  const out: Record<string, Etiket[]> = {};
  for (const y of years)
    for (let m = 1; m <= 12; m += 1)
      for (const [day, list] of ayGokyuzuEtiketleri(y, m)) out[`${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`] = list;
  return out;
}
