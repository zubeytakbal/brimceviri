// İçerik kalite raporu: `npm run build` sonrasında `npm run quality` ile çalışır. Dillere göre
// özet ve iyileştirilecek sayfaların öncelik listesini yazar.
//   npm run quality              özet + en zayıf 40 sayfa
//   npm run quality -- de 100    yalnızca Almanca, en zayıf 100 sayfa
//   npm run quality -- --csv r.csv   bütün sayfaları CSV olarak yazar
import { writeFileSync } from "node:fs";
import { measureQuality, OZGUN_HEDEF } from "./qualityGuard";

const args = process.argv.slice(2);
const csvIndex = args.indexOf("--csv");
const csvPath = csvIndex >= 0 ? args.splice(csvIndex, 2)[1] : null;
const locale = args.find((a) => /^[a-z]{2}$/.test(a));
const limit = Number(args.find((a) => /^\d+$/.test(a)) ?? 40);

const all = measureQuality("out");
const pages = locale ? all.filter((p) => p.locale === locale) : all;

const byLocale = new Map<string, typeof pages>();
for (const p of pages) byLocale.set(p.locale, [...(byLocale.get(p.locale) ?? []), p]);
const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] ?? 0;
console.table(
  Object.fromEntries(
    [...byLocale].map(([loc, list]) => [
      loc,
      {
        sayfa: list.length,
        "kusursuz %": Math.round((100 * list.filter((p) => !p.kusurlar.length).length) / list.length),
        "özgün metin (medyan)": median(list.map((p) => p.uniqueChars)),
        [`özgün < ${OZGUN_HEDEF}`]: list.filter((p) => p.kusurlar.includes("ozgun-metin")).length,
        "link yığını": list.filter((p) => p.kusurlar.includes("link-yigini")).length,
        yapı: list.filter((p) => p.kusurlar.includes("yapi")).length,
        meta: list.filter((p) => p.kusurlar.includes("meta")).length,
      },
    ]),
  ),
);

const worst = pages
  .filter((p) => p.kusurlar.length)
  .sort((a, b) => b.kusurlar.length - a.kusurlar.length || a.uniqueChars - b.uniqueChars)
  .slice(0, limit);
console.log(`\nÖncelikli ${worst.length} sayfa (önce en çok kusurlu, sonra en az özgün metinli):`);
for (const p of worst) {
  console.log(`${p.url}  özgün ${p.uniqueChars}/${p.chars}  link %${Math.round(p.linkRatio * 100)}  [${p.kusurlar.join(", ")}]`);
}

if (csvPath) {
  const rows = [
    "url,dil,metin,ozgun_metin,link_orani,h1,h2,kusurlar",
    ...all.map((p) =>
      [p.url, p.locale, p.chars, p.uniqueChars, p.linkRatio.toFixed(2), p.h1, p.h2, p.kusurlar.join(" ")].join(","),
    ),
  ];
  writeFileSync(csvPath, rows.join("\n") + "\n");
  console.log(`\n${all.length} sayfa ${csvPath} dosyasına yazıldı`);
}
