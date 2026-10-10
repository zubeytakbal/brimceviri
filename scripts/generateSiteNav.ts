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
