// Kendi sayfası olan altın türleri ("... kaç gram"). Ekim 2026'da hepsi geri getirildi; altın hesaplama sayfasındaki
// tablo her birine bağlanır.
import {
  findSikke,
  hasGram,
  SIKKELER,
  ZIYNET_MILYEM,
  type Sikke,
} from "./turkishAltin";

export const ALTIN_SAYFALARI = [
  "ceyrek-altin",
  "yarim-altin",
  "tam-altin",
  "gremse-altin",
  "besli-altin",
  "cumhuriyet-altini",
];

/** Kendi sayfası olan altın türleri. */
export const AYRI_ALTIN_SAYFALARI = ALTIN_SAYFALARI;

export const altinSayfaPath = (id: string) => `/altin-hesaplama/${id}`;

export function altinSayfasi(id: string) {
  return ALTIN_SAYFALARI.includes(id) ? findSikke(id) : null;
}

const gr = (n: number) =>
  n.toLocaleString("tr-TR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

/** Ayni degerdeki diger seri (ziynet ↔ ata) */
export function esdeger(s: Sikke) {
  return SIKKELER.find((x) => x.seri !== s.seri && x.deger === s.deger) ?? null;
}

export function altinOzet(s: Sikke) {
  const has = hasGram(s.gram, ZIYNET_MILYEM);
  const karsi = esdeger(s);
  return {
    has,
    ceyrek: s.deger * 4,
    cumle: `${s.ad} ${gr(s.gram)} gramdır ve 22 ayar (${ZIYNET_MILYEM.toLocaleString("tr-TR")} milyem) basılır; içindeki saf (has) altın ${gr(has)} gramdır.${
      karsi ? ` ${karsi.ad} ise ${gr(karsi.gram)} gramdır.` : ""
    }`,
  };
}
