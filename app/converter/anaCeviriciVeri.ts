// Türkçe ana sayfanın en üstündeki çeviricinin verisi (sunucuda derlenir, istemciye küçük bir JSON gider).
// Her sekmede yalnızca sık kullanılan birimler listelenir; kategorinin bütün birimleri kategori sayfasındadır.
// Seçilen iki birimin kendi dönüşüm sayfası varsa çevirici o sayfaya bağlantı verir.
import { conversionPages } from "./conversionPages";
import type { HizliBirim, HizliKategori, HizliVeri } from "./hizliCevirmeVeri";

/** Sekmedeki birimler sırayla; ilk ikisi sekme açıldığında seçili gelir. */
const SEKMELER: Array<{ key: string; ad: string; birimler: string[] }> = [
  { key: "uzunluk", ad: "Uzunluk", birimler: ["m", "km", "cm", "mm", "µm", "in", "ft", "yd", "mi", "nmi", "arşın"] },
  { key: "alan", ad: "Alan", birimler: ["m²", "dönüm", "dekar", "ha", "km²", "cm²", "ft²", "ac", "mi²", "a"] },
  { key: "kutle", ad: "Ağırlık", birimler: ["kg", "g", "mg", "ton", "lb", "oz", "ozt", "ct", "okka", "st"] },
  { key: "hacim", ad: "Hacim", birimler: ["L", "m³", "mL", "cm³", "gal", "imp gal", "bbl", "fl oz", "sb", "yk"] },
  { key: "sicaklik", ad: "Sıcaklık", birimler: ["C", "F", "K", "R", "Re"] },
];

export type AnaSekme = Pick<HizliKategori, "key" | "ad" | "href" | "sicaklik"> & { birimler: HizliBirim[] };
export type AnaCeviriciVeri = {
  sekmeler: AnaSekme[];
  doviz: HizliVeri["doviz"];
  /** "kategori|kimden|kime" → dönüşüm sayfasının adresi. */
  sayfalar: Record<string, string>;
};

export function anaCeviriciVerisi(hizli: HizliVeri): AnaCeviriciVeri {
  const sekmeler: AnaSekme[] = [];
  for (const tanim of SEKMELER) {
    const kat = hizli.kategoriler.find((c) => c.key === tanim.key);
    if (!kat) continue;
    const birimler = tanim.birimler.flatMap((s) => kat.birimler.filter((b) => b.s === s));
    if (birimler.length < 2) continue;
    sekmeler.push({ key: kat.key, ad: tanim.ad, href: kat.href, birimler, ...(kat.sicaklik ? { sicaklik: true as const } : {}) });
  }

  const sayfalar: Record<string, string> = {};
  for (const p of conversionPages) {
    const sekme = sekmeler.find((s) => s.key === p.category);
    if (!sekme) continue;
    if (sekme.birimler.some((b) => b.s === p.fromUnit) && sekme.birimler.some((b) => b.s === p.toUnit)) {
      sayfalar[`${p.category}|${p.fromUnit}|${p.toUnit}`] = `/${p.slug}`;
    }
  }

  return { sekmeler, doviz: hizli.doviz, sayfalar };
}
