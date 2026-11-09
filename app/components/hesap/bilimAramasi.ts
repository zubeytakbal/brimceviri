// Hesap bölümünün üst menü aramasında eski Bilim bölümünün başvuru sayfaları: sayfası olan elementler ve
// bileşikler (araçların kendisi hesap gruplarında). Yalnızca hesap menüsüyle yüklenir.
import { compoundsDatabase } from "../../converter/compoundsDatabase";
import { periodicTable, slugifyElementName } from "../../converter/periodicTableData";
import { bilimSayfasiKalkti } from "../../kaldirilanBilimSayfalari";

const P = "/bilim-hesaplayicilari/kimya";
const varsa = <T extends { href: string }>(liste: T[]) => liste.filter((o) => !bilimSayfasiKalkti(o.href));

export const BILIM_ARAMASI = [
  ...varsa(periodicTable.map((e) => ({ href: `${P}/periyodik-tablo/${slugifyElementName(e.nameTr)}`, ad: `${e.nameTr} (${e.symbol})`, ulke: "Element" }))),
  ...varsa(compoundsDatabase.map((c) => ({ href: `${P}/bilesikler/${c.id}`, ad: `${c.nameTr} (${c.formula})`, ulke: "Bileşik" }))),
];
