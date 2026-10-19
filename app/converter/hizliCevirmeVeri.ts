// Ana sayfadaki hızlı çeviri kartlarının verisi (sunucuda derlenir, istemciye küçük bir JSON olarak gider):
// Türkçe kategori sayfası olan birim kategorileri, her birimin adı, simgesi ve katsayısı; döviz için günlük referans kur.
import { categoryPages } from "./categoryPages";
import type { FxLatest } from "./fx/fxData";
import { fxCurrenciesTr } from "./fx/fxPairsTr";
import { unitRegistry } from "./unitRegistry";

/** s: birim anahtarı, d: farklıysa gösterilen simge, n: Türkçe adı, f: SI katsayısı, inv: ters orantılı birim. */
export type HizliBirim = { s: string; d?: string; n: string; f: number; inv?: true };
export type HizliKategori = { key: string; ad: string; href: string; birimler: HizliBirim[]; sicaklik?: true };
export type HizliDoviz = { kurlar: Record<string, number>; adlar: Record<string, string>; tarih: number };
export type HizliVeri = { kategoriler: HizliKategori[]; doviz: HizliDoviz | null };

// Gerilim ve akımı aynı listede tutan eski "elektrik" kategorisi birbirine çevrilemez; kartlarda yer almaz.
const DISARIDA = new Set(["elektrik", "debi"]);

export function hizliCevirmeVerisi(fx: FxLatest | null): HizliVeri {
  const kategoriler: HizliKategori[] = [];
  for (const c of categoryPages) {
    if (DISARIDA.has(c.category)) continue;
    const birimler = unitRegistry
      .filter((u) => u.category === c.category && (u.siFactor !== undefined || c.category === "sicaklik"))
      .map((u) => ({ s: u.symbol, ...(u.displaySymbol && u.displaySymbol !== u.symbol ? { d: u.displaySymbol } : {}), n: u.tr?.name ?? u.symbol, f: u.siFactor ?? 1, ...(u.inverse ? { inv: true as const } : {}) }));
    if (birimler.length < 2) continue;
    kategoriler.push({
      key: c.category,
      ad: c.title.replace(/ Dönüşümleri.*$/, ""),
      href: `/kategoriler/${c.slug}`,
      birimler,
      ...(c.category === "sicaklik" ? { sicaklik: true as const } : {}),
    });
  }
  const doviz =
    fx && Object.keys(fxCurrenciesTr).every((code) => fx.rates[code])
      ? {
          kurlar: Object.fromEntries(Object.keys(fxCurrenciesTr).map((code) => [code, fx.rates[code]])),
          adlar: Object.fromEntries(Object.values(fxCurrenciesTr).map((c) => [c.code, c.long])),
          tarih: fx.lastUpdateUnix,
        }
      : null;
  return { kategoriler, doviz };
}
