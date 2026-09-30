// Excel (.xlsx) okuma ve yazma. XLSX, XML dosyalarından oluşan bir ZIP'tir; burada yalnızca
// hücre değerleri (metin, sayı, tarih, mantıksal) işlenir, biçimlendirme ve formüller aktarılmaz.
import { zipOku } from "../arsiv/zipOku";
import { zipSikistir } from "../gorsel/zip";
import type { Hucre, Tablo } from "./csv";

export type Sayfa = { ad: string; satirlar: Tablo };

const VARLIK: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

export const xmlCoz = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, k: string) =>
    k[0] === "#"
      ? String.fromCodePoint(
          k[1] === "x" || k[1] === "X"
            ? parseInt(k.slice(2), 16)
            : Number(k.slice(1)),
        )
      : VARLIK[k.toLowerCase()],
  );

export const xmlKac = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // XML 1.0'da izin verilmeyen denetim karakterleri
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");

const oznitelik = (etiket: string, ad: string) =>
  etiket.match(new RegExp(`\\s${ad}="([^"]*)"`))?.[1];

/** <si> veya <is> içindeki tüm <t> metinlerini birleştirir (zengin metin parçaları dahil). */
const metinler = (xml: string) =>
  [
    ...xml.matchAll(
      /<(?:\w+:)?t(?:\s[^>]*)?>([\s\S]*?)<\/(?:\w+:)?t>|<(?:\w+:)?t\s*\/>/g,
    ),
  ]
    .map((m) => xmlCoz(m[1] ?? ""))
    .join("");

/** "B3" → [1, 2]: sütun ve satır, 0 tabanlı. */
export function hucreKonumu(ref: string): [number, number] {
  const m = ref.match(/^([A-Z]+)(\d+)$/)!;
  let s = 0;
  for (const c of m[1]) s = s * 26 + (c.charCodeAt(0) - 64);
  return [s - 1, Number(m[2]) - 1];
}

export function sutunAdi(i: number) {
  let s = "";
  for (let n = i + 1; n > 0; n = Math.floor((n - 1) / 26))
    s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

const TARIH_KODLARI = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 45, 46, 47]);

function tarihBicimiMi(kod: string) {
  const temiz = kod.replace(/"[^"]*"|\[[^\]]*\]|\\./g, "");
  return /[dmyhs]/i.test(temiz) && !/^[#0.,%\s]*$/.test(temiz);
}

/** Excel seri tarihini ISO metnine çevirir (1900 veya 1904 sistemi). */
export function seriTarih(seri: number, sistem1904 = false) {
  // 1900 sisteminde 25569 = 1970-01-01; Excel'in var saydığı 29.02.1900 nedeniyle 60'tan küçükler bir gün kayar.
  const gun = sistem1904
    ? seri + 1462 - 25569
    : seri - 25569 + (seri < 60 ? 1 : 0);
  const ms = Math.round(gun * 86400000);
  const d = new Date(ms);
  const iso = d.toISOString();
  const saatVar = Math.abs(seri % 1) > 1e-9;
  if (seri < 1) return iso.slice(11, 19);
  return saatVar
    ? `${iso.slice(0, 10)} ${iso.slice(11, 19)}`
    : iso.slice(0, 10);
}

const yolCoz = (taban: string, hedef: string) => {
  if (hedef.startsWith("/")) return hedef.slice(1);
  const p = taban.split("/").slice(0, -1);
  for (const s of hedef.split("/")) {
    if (s === "..") p.pop();
    else if (s !== ".") p.push(s);
  }
  return p.join("/");
};

/** XLSX dosyasındaki tüm sayfaları okur. */
export async function xlsxOku(veri: Uint8Array): Promise<Sayfa[]> {
  let girdiler;
  try {
    girdiler = zipOku(veri);
  } catch {
    throw new Error(
      "Bu dosya .xlsx biçiminde değil. Eski .xls dosyalarını Excel'de 'Farklı Kaydet > Excel Çalışma Kitabı (.xlsx)' ile kaydedip tekrar deneyin.",
    );
  }
  const dosyalar = new Map(girdiler.map((g) => [g.ad.replace(/^\//, ""), g]));
  const oku = async (ad: string) => {
    const g = dosyalar.get(ad);
    return g ? new TextDecoder().decode(await g.ac()) : "";
  };
  const kitap = await oku("xl/workbook.xml");
  if (!kitap)
    throw new Error("Excel çalışma kitabı bulunamadı; dosya bozuk olabilir.");
  const sistem1904 = /<(?:\w+:)?workbookPr[^>]*date1904="(1|true)"/.test(kitap);
  const iliskiler = await oku("xl/_rels/workbook.xml.rels");
  const hedefler = new Map(
    [...iliskiler.matchAll(/<(?:\w+:)?Relationship\s[^>]*>/g)].map((m) => [
      oznitelik(m[0], "Id")!,
      yolCoz("xl/workbook.xml", oznitelik(m[0], "Target")!),
    ]),
  );
  const paylasilan = [
    ...(await oku("xl/sharedStrings.xml")).matchAll(
      /<(?:\w+:)?si>([\s\S]*?)<\/(?:\w+:)?si>/g,
    ),
  ].map((m) => metinler(m[1]));
  // Biçimler: hangi stil dizinleri tarih?
  const stiller = await oku("xl/styles.xml");
  const ozelKodlar = new Map(
    [...stiller.matchAll(/<(?:\w+:)?numFmt\s[^>]*>/g)].map((m) => [
      Number(oznitelik(m[0], "numFmtId")),
      xmlCoz(oznitelik(m[0], "formatCode") ?? ""),
    ]),
  );
  const xfBlok =
    stiller.match(
      /<(?:\w+:)?cellXfs[^>]*>([\s\S]*?)<\/(?:\w+:)?cellXfs>/,
    )?.[1] ?? "";
  const tarihStili = [...xfBlok.matchAll(/<(?:\w+:)?xf\s[^>]*?\/?>/g)].map(
    (m) => {
      const id = Number(oznitelik(m[0], "numFmtId") ?? 0);
      return (
        TARIH_KODLARI.has(id) ||
        (ozelKodlar.has(id) && tarihBicimiMi(ozelKodlar.get(id)!))
      );
    },
  );

  const sayfalar: Sayfa[] = [];
  for (const m of kitap.matchAll(/<(?:\w+:)?sheet\s[^>]*>/g)) {
    const ad = xmlCoz(oznitelik(m[0], "name") ?? `Sayfa${sayfalar.length + 1}`);
    const rid =
      oznitelik(m[0], "r:id") ?? m[0].match(/\s\w+:id="([^"]*)"/)?.[1];
    const yol = rid ? hedefler.get(rid) : undefined;
    const xml = yol ? await oku(yol) : "";
    const satirlar: Tablo = [];
    let sonSatir = -1;
    for (const r of xml.matchAll(
      /<(?:\w+:)?row\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?row>)/g,
    )) {
      const rNo = oznitelik(r[1], "r");
      const y = rNo ? Number(rNo) - 1 : sonSatir + 1;
      sonSatir = y;
      let sonSutun = -1;
      for (const c of (r[2] ?? "").matchAll(
        /<(?:\w+:)?c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?c>)/g,
      )) {
        const ref = oznitelik(c[1], "r");
        const x = ref ? hucreKonumu(ref)[0] : sonSutun + 1;
        sonSutun = x;
        const t = oznitelik(c[1], "t") ?? "n";
        const s = Number(oznitelik(c[1], "s") ?? 0);
        const ic = c[2] ?? "";
        const v = ic.match(/<(?:\w+:)?v>([\s\S]*?)<\/(?:\w+:)?v>/)?.[1];
        let deger: Hucre = null;
        if (t === "s")
          deger = v !== undefined ? (paylasilan[Number(v)] ?? "") : null;
        else if (t === "inlineStr") deger = metinler(ic);
        else if (t === "str" || t === "e")
          deger = v !== undefined ? xmlCoz(v) : null;
        else if (t === "b") deger = v === "1";
        else if (v !== undefined) {
          const n = Number(v);
          deger = tarihStili[s] ? seriTarih(n, sistem1904) : n;
        }
        if (deger === null) continue;
        while (satirlar.length <= y) satirlar.push([]);
        const satir = satirlar[y];
        while (satir.length < x) satir.push(null);
        satir[x] = deger;
      }
    }
    const genislik = Math.max(0, ...satirlar.map((s) => s.length));
    for (const s of satirlar) while (s.length < genislik) s.push(null);
    sayfalar.push({ ad, satirlar });
  }
  return sayfalar;
}

const kitapAdi = (ad: string, i: number) =>
  xmlKac(
    (ad.replace(/[\\/?*[\]:]/g, " ").trim() || `Sayfa${i + 1}`).slice(0, 31),
  );

/** Sayfaları .xlsx dosyasına yazar. İlk satır kalın değil; sayılar sayı, metinler metin olarak saklanır. */
export async function xlsxYaz(sayfalar: Sayfa[]): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const bas = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
  const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  const rns =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  const dosyalar: Array<{ ad: string; veri: Uint8Array }> = [];
  const ekle = (ad: string, xml: string) =>
    dosyalar.push({ ad, veri: enc.encode(bas + xml) });

  ekle(
    "[Content_Types].xml",
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sayfalar
      .map(
        (_, i) =>
          `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`,
      )
      .join("")}</Types>`,
  );
  ekle(
    "_rels/.rels",
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${rns}/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  );
  ekle(
    "xl/workbook.xml",
    `<workbook xmlns="${ns}" xmlns:r="${rns}"><sheets>${sayfalar
      .map(
        (s, i) =>
          `<sheet name="${kitapAdi(s.ad, i)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`,
      )
      .join("")}</sheets></workbook>`,
  );
  ekle(
    "xl/_rels/workbook.xml.rels",
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sayfalar
      .map(
        (_, i) =>
          `<Relationship Id="rId${i + 1}" Type="${rns}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`,
      )
      .join(
        "",
      )}<Relationship Id="rId${sayfalar.length + 1}" Type="${rns}/styles" Target="styles.xml"/></Relationships>`,
  );
  ekle(
    "xl/styles.xml",
    `<styleSheet xmlns="${ns}"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>`,
  );
  sayfalar.forEach((s, i) => {
    const satirlar = s.satirlar
      .map((r, y) => {
        const hucreler = r
          .map((h, x) => {
            if (h === null || h === "") return "";
            const ref = `${sutunAdi(x)}${y + 1}`;
            if (typeof h === "number" && Number.isFinite(h))
              return `<c r="${ref}"><v>${h}</v></c>`;
            if (typeof h === "boolean")
              return `<c r="${ref}" t="b"><v>${h ? 1 : 0}</v></c>`;
            const m = xmlKac(String(h)).slice(0, 32767);
            return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${m}</t></is></c>`;
          })
          .join("");
        return hucreler ? `<row r="${y + 1}">${hucreler}</row>` : "";
      })
      .join("");
    ekle(
      `xl/worksheets/sheet${i + 1}.xml`,
      `<worksheet xmlns="${ns}"><sheetData>${satirlar}</sheetData></worksheet>`,
    );
  });
  return zipSikistir(dosyalar.map((d) => ({ ...d, tarih: new Date() })));
}
