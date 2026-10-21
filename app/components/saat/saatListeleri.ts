// Saat bölümünün üst menüsündeki arama ve alt bilgideki listeler. Yalnızca saat bölümü sayfalarında yüklenir
// (sitenin genel üst menüsü bu dosyayı dinamik olarak, sadece o sayfalarda alır).
import { trSaatSehirleri } from "../../converter/time/worldCities";
import { ulkeSaatleri } from "../../converter/time/ulkeSaatDilimleri";
import { SAAT_MENUSU } from "./saatBolumu";

export type AramaOgesi = { href: string; ad: string; ulke: string };

/** Aramada şehirler, ülke saat dilimleri ve bölümün araçları. */
export const SAAT_ARAMA: AramaOgesi[] = [
  ...trSaatSehirleri.map((c) => ({ href: `/dunya-saatleri/${c.tr}`, ad: c.nameTr, ulke: c.countryTr })),
  ...ulkeSaatleri.map((u) => ({ href: `/dunya-saatleri/${u.slug}`, ad: u.ad, ulke: `${u.dilimler.length} saat dilimi` })),
  ...SAAT_MENUSU.map((m) => ({ href: m.href, ad: m.label.charAt(0).toLocaleUpperCase("tr") + m.label.slice(1), ulke: "Araç" })),
].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

export const POPULER_SEHIRLER = ["istanbul", "londra", "new-york", "berlin", "paris", "amsterdam", "dubai", "mekke", "moskova", "tokyo", "toronto", "los-angeles"]
  .map((slug) => trSaatSehirleri.find((c) => c.tr === slug))
  .filter((c) => c !== undefined)
  .map((c) => ({ href: `/dunya-saatleri/${c.tr}`, ad: c.nameTr }));

export const ULKE_LINKLERI = ulkeSaatleri.map((u) => ({ href: `/dunya-saatleri/${u.slug}`, ad: u.ad, dilim: u.dilimler.length }));

export const SEHIR_SAYISI = trSaatSehirleri.length;
