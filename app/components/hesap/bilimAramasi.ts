// Hesap bölümünün üst menü aramasında eski Bilim bölümünün başvuru sayfaları: sayfası olan elementler, bileşikler,
// gökcisimleri ve karşılaştırmalar (araçların kendisi hesap gruplarında). Yalnızca hesap menüsüyle yüklenir.
import { getAllCelestialBodies } from "../../converter/celestialBodiesHub";
import { getAllCelestialBodyComparisons } from "../../converter/celestialBodyComparisons";
import { compoundsDatabase } from "../../converter/compoundsDatabase";
import { periodicTable, slugifyElementName } from "../../converter/periodicTableData";
import { bilimSayfasiKalkti } from "../../kaldirilanBilimSayfalari";

const P = "/bilim-hesaplayicilari/kimya";
const varsa = <T extends { href: string }>(liste: T[]) => liste.filter((o) => !bilimSayfasiKalkti(o.href));

export const BILIM_ARAMASI = [
  ...varsa(periodicTable.map((e) => ({ href: `${P}/periyodik-tablo/${slugifyElementName(e.nameTr)}`, ad: `${e.nameTr} (${e.symbol})`, ulke: "Element" }))),
  ...varsa(compoundsDatabase.map((c) => ({ href: `${P}/bilesikler/${c.id}`, ad: `${c.nameTr} (${c.formula})`, ulke: "Bileşik" }))),
  ...varsa(getAllCelestialBodies().map((b) => ({ href: `/gokcisimleri-ozellikleri/${b.id}`, ad: b.nameTr, ulke: "Gökcismi" }))),
  ...varsa(
    getAllCelestialBodyComparisons().map((k) => ({ href: `/gokcisimleri-karsilastirma/${k.slug}`, ad: `${k.first.nameTr} – ${k.second.nameTr}`, ulke: "Karşılaştırma" })),
  ),
];
