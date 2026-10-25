// "Hesap" bölümü: hesaplama araçları saat bölümünün düzeniyle (kendi üst menüsü, alt bilgisi, telefonda açılır
// bölümler) ama kendi adı ve rengiyle çizilir. Gruplar /hesaplayicilar sayfasının araç listesinden gelir; saat
// bölümünde olan araçlar orada kalır. Adresler değişmez.
import { turkishToolGroups } from "../../i18n/turkishToolDirectory";
import { SAAT_MENUSU } from "../saat/saatBolumu";

export type HesapGrubu = { id: string; baslik: string; linkler: Array<{ href: string; label: string }> };

const GRUP_IDLERI = ["para-ve-is", "saglik-ve-spor", "klinik", "ev-ve-yapi", "enerji-ve-arac", "tarim", "olcu-ve-gunluk", "dosya-ve-gorsel", "matematik", "kimya", "gokcisimleri"];

const saatte = new Set(SAAT_MENUSU.map((l) => l.href));

export const HESAP_GRUPLARI: HesapGrubu[] = GRUP_IDLERI.map((id) => turkishToolGroups.find((g) => g.id === id)!).map((g) => ({
  id: g.id,
  baslik: g.title,
  linkler: g.links.filter((l) => !saatte.has(l.href)),
}));

export const HESAP_MENUSU = HESAP_GRUPLARI.flatMap((g) => g.linkler);

const YOLLAR = new Set(["/hesaplayicilar", ...HESAP_MENUSU.map((l) => l.href)]);

/** Aramada: araç adı ve grubu. */
export const HESAP_ARAMA = HESAP_GRUPLARI.flatMap((g) => g.linkler.map((l) => ({ href: l.href, ad: l.label, ulke: g.baslik })));

// Eski Bilim bölümünün bütün sayfaları (element, bileşik, gökcismi ve karşılaştırma sayfaları dahil) 25 Ekim 2026'dan
// beri Hesap bölümünde.
const BILIM_YOLU = /^\/(bilim-hesaplayicilari|gokcisimleri-ozellikleri|gokcisimleri-karsilastirma)\//;

/** Hesap bölümünün menüsü ve alt bilgisiyle çizilen sayfalar. */
export function isHesapAraci(pathname: string) {
  const p = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return YOLLAR.has(p) || BILIM_YOLU.test(p);
}
