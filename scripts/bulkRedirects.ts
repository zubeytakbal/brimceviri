// Yeni yapiya tasinan Turkce sayfalarin eski adreslerinden yenisine 301 listesi.
// Cloudflare Pages _redirects dosyasi 2000 sabit kural sinirinda dolu oldugu icin bu liste
// Cloudflare panelindeki Bulk Redirects'e (Rules > Redirect Rules > Bulk Redirects) CSV olarak yuklenir.
// Calistirma: npx tsx scripts/bulkRedirects.ts  ->  docs/cloudflare-bulk-redirects.csv
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { TASINAN_CIFTLER } from "../app/converter/tasinanCiftler.generated";
import { yeniYapiKategorileri } from "../app/converter/siteYapisi";

const HOST = "www.birimceviri.app";
const satirlar: [string, string][] = [];
for (const k of yeniYapiKategorileri) satirlar.push([`/kategoriler/${k}`, `/${k}`]);
for (const [cift, k] of Object.entries(TASINAN_CIFTLER)) satirlar.push([`/${cift}`, `/${k}/${cift}`]);

const csv = [
  "source_url,target_url,status_code,preserve_query_string,include_subdomains,subpath_matching,preserve_path_suffix",
  ...satirlar.map(([a, b]) => `${HOST}${a},https://${HOST}${b},301,true,false,false,false`),
].join("\n");
const out = join(__dirname, "..", "docs", "cloudflare-bulk-redirects.csv");
writeFileSync(out, csv + "\n");
console.log(`${satirlar.length} yonlendirme yazildi: ${out}`);
