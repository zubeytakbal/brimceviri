// Ust menu ve alt bilgi verisini derleme oncesi kucuk bir modüle yazar. SiteHeader ve
// SiteFooter istemci bilesenleri oldugu icin siteNavigation'i dogrudan iceri aktarirlarsa
// butun dillerin sayfa veritabani (birkac MB) her sayfanin JavaScript'ine girer.
// Calistirma: `npm run build` oncesi otomatik (prebuild); elle: npx tsx scripts/generateSiteNav.ts
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSiteNavData } from "../app/i18n/siteNavBuild";

const out = join(__dirname, "..", "app", "i18n", "siteNavData.generated.ts");
const body =
  "// Bu dosya scripts/generateSiteNav.ts tarafindan uretilir; elle duzenlemeyin.\n" +
  'import type { SiteNavData } from "./siteNavBuild";\n\n' +
  `export const SITE_NAV_DATA: SiteNavData = ${JSON.stringify(buildSiteNavData(), null, 1)};\n`;
writeFileSync(out, body);
console.log("siteNavData.generated.ts yazildi");

// Yeni yapiya tasinan Turkce cift sayfalari: slug -> kategori slug'i. SiteLink eski
// "/santimetre-inc" linklerini bu haritayla "/uzunluk/santimetre-inc" adresine cevirir.
// conversionPages buyuk oldugu icin istemciye yalnizca bu kucuk harita gider.
import { categoryPages } from "../app/converter/categoryPages";
import { conversionPages } from "../app/converter/conversionPages";
import { isMergedAway } from "../app/converter/mergedPairs";
import { yeniYapiKategorileri } from "../app/converter/siteYapisi";

const kategoriSlugu = new Map(categoryPages.map((c) => [c.category, c.slug]));
const tasinan: Record<string, string> = {};
for (const p of conversionPages) {
  const k = kategoriSlugu.get(p.category);
  if (k && yeniYapiKategorileri.has(k) && !isMergedAway(p.slug)) tasinan[p.slug] = k;
}
writeFileSync(
  join(__dirname, "..", "app", "converter", "tasinanCiftler.generated.ts"),
  "// Bu dosya scripts/generateSiteNav.ts tarafindan uretilir; elle duzenlemeyin.\n" +
    `export const TASINAN_CIFTLER: Readonly<Record<string, string>> = ${JSON.stringify(tasinan, null, 1)};\n`
);
console.log(`tasinanCiftler.generated.ts yazildi (${Object.keys(tasinan).length} cift)`);
