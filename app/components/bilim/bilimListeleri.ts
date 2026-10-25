// Bilim bölümünün üst menüsündeki gruplar, arama ve alt bilgideki listeler. Yalnızca bilim bölümü sayfalarında yüklenir
// (sitenin genel üst menüsü ve alt bilgisi bu dosyayı dinamik olarak, sadece o sayfalarda alır).
import { getAllCelestialBodies } from "../../converter/celestialBodiesHub";
import { getAllCelestialBodyComparisons } from "../../converter/celestialBodyComparisons";
import { compoundsDatabase } from "../../converter/compoundsDatabase";
import { periodicTable, slugifyElementName } from "../../converter/periodicTableData";
import { scienceHubs } from "../../converter/scienceHubs";
import { bilimSayfasiKalkti } from "../../kaldirilanBilimSayfalari";
import { isBilimAraci } from "./bilimBolumu";

export type BilimGrubu = { id: string; baslik: string; linkler: Array<{ href: string; label: string }> };

const hubAraclari = (slug: "kimya" | "matematik") =>
  scienceHubs
    .find((h) => h.slug === slug)!
    .groups.flatMap((g) => g.tools)
    .filter((t) => isBilimAraci(t.href))
    .map((t) => ({ href: t.href, label: t.title }));

export const BILIM_GRUPLARI: BilimGrubu[] = [
  { id: "matematik", baslik: "Matematik", linkler: hubAraclari("matematik") },
  { id: "kimya", baslik: "Kimya", linkler: hubAraclari("kimya") },
  {
    id: "gokcisimleri",
    baslik: "Gökcisimleri",
    linkler: [
      { href: "/gokcisimleri-ozellikleri", label: "Gökcisimleri ve Gezegenler" },
      { href: "/gezegenlerde-kac-kilo-gelirim", label: "Gezegenlerde Kaç Kilo Gelirim?" },
    ],
  },
];

export const BILIM_MENUSU = BILIM_GRUPLARI.flatMap((g) => g.linkler);

const P = "/bilim-hesaplayicilari/kimya";
const varsa = <T extends { href: string }>(liste: T[]) => liste.filter((o) => !bilimSayfasiKalkti(o.href));

/** Aramada: araçlar, sayfası olan elementler, bileşikler, gökcisimleri ve karşılaştırmalar. */
export const BILIM_ARAMA = [
  ...BILIM_GRUPLARI.flatMap((g) => g.linkler.map((l) => ({ href: l.href, ad: l.label, ulke: g.baslik }))),
  ...varsa(periodicTable.map((e) => ({ href: `${P}/periyodik-tablo/${slugifyElementName(e.nameTr)}`, ad: `${e.nameTr} (${e.symbol})`, ulke: "Element" }))),
  ...varsa(compoundsDatabase.map((c) => ({ href: `${P}/bilesikler/${c.id}`, ad: `${c.nameTr} (${c.formula})`, ulke: "Bileşik" }))),
  ...varsa(getAllCelestialBodies().map((b) => ({ href: `/gokcisimleri-ozellikleri/${b.id}`, ad: b.nameTr, ulke: "Gökcismi" }))),
  ...varsa(
    getAllCelestialBodyComparisons().map((k) => ({ href: `/gokcisimleri-karsilastirma/${k.slug}`, ad: `${k.first.nameTr} – ${k.second.nameTr}`, ulke: "Karşılaştırma" })),
  ),
]
  .filter((o, i, hepsi) => hepsi.findIndex((x) => x.href === o.href) === i)
  .sort((a, b) => a.ad.localeCompare(b.ad, "tr"));
