// UDF modelinden Word (.docx, Office Open XML) belgesi üretir. Kütüphanesiz; ZIP yazıcıyı kullanır.
import { zipSikistir, type ZipDosya } from "../gorsel/zip";
import {
  LISTE_GIRINTI,
  type Hucre,
  type Paragraf,
  type Tablo,
  type UdfBelge,
} from "./udf";

const x = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // XML 1.0'da geçersiz denetim karakterleri
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "");

/** pt → twip (1/20 pt) */
const tw = (pt: number) => Math.round(pt * 20);
const JC = ["left", "center", "right", "both"];
const UZANTI: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
  "image/bmp": "bmp",
};

function b64Coz(b64: string) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

/** PNG/JPEG/GIF başlığından piksel boyutunu okur. */
export function gorselBoyutu(v: Uint8Array): [number, number] | null {
  const d = new DataView(v.buffer, v.byteOffset, v.byteLength);
  if (v.length > 24 && v[0] === 0x89 && v[1] === 0x50)
    return [d.getUint32(16), d.getUint32(20)];
  if (v.length > 10 && v[0] === 0x47 && v[1] === 0x49)
    return [d.getUint16(6, true), d.getUint16(8, true)];
  if (v[0] === 0xff && v[1] === 0xd8) {
    let i = 2;
    while (i + 9 < v.length) {
      if (v[i] !== 0xff) return null;
      const m = v[i + 1];
      const boy = d.getUint16(i + 2);
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc)
        return [d.getUint16(i + 7), d.getUint16(i + 5)];
      i += 2 + boy;
    }
  }
  return null;
}

export async function udfDocx(b: UdfBelge): Promise<Uint8Array> {
  const medya: ZipDosya[] = [];
  const iliskiler: string[] = [];
  let rid = 1;
  const yeniRid = (tur: string, hedef: string) => {
    const id = `rId${++rid}`;
    iliskiler.push(
      `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/${tur}" Target="${hedef}"/>`,
    );
    return id;
  };

  const paragraf = (p: Paragraf) => {
    const ppr: string[] = [];
    if (p.ustBosluk || p.altBosluk || p.satirAraligi)
      ppr.push(
        `<w:spacing w:before="${tw(p.ustBosluk)}" w:after="${tw(p.altBosluk)}"${
          p.satirAraligi
            ? ` w:line="${Math.round(240 * (1 + p.satirAraligi))}" w:lineRule="auto"`
            : ""
        }/>`,
      );
    else ppr.push('<w:spacing w:before="0" w:after="0"/>');
    const sol =
      p.solGirinti + (p.liste ? (p.liste.seviye + 1) * LISTE_GIRINTI : 0);
    const ilk = p.liste ? -LISTE_GIRINTI : p.ilkSatir;
    if (sol || p.sagGirinti || ilk)
      ppr.push(
        `<w:ind w:left="${tw(sol)}" w:right="${tw(p.sagGirinti)}"${
          ilk < 0
            ? ` w:hanging="${tw(-ilk)}"`
            : ilk
              ? ` w:firstLine="${tw(ilk)}"`
              : ""
        }/>`,
      );
    ppr.push(`<w:jc w:val="${JC[p.hiza]}"/>`);
    const runlar = p.parcalar.map((r) => {
      if (r.tur === "sekme") return "<w:r><w:tab/></w:r>";
      if (r.tur === "metin" && r.metin === "\n") return "<w:r><w:br/></w:r>";
      if (r.tur === "gorsel") {
        const veri = b64Coz(r.veri);
        const uz = UZANTI[r.mime] ?? "png";
        const ad = `image${medya.length + 1}.${uz}`;
        medya.push({ ad: `word/media/${ad}`, veri });
        const id = yeniRid("image", `media/${ad}`);
        const px = gorselBoyutu(veri) ?? [
          r.genislik ?? 100,
          r.yukseklik ?? 100,
        ];
        let [w, h] = [r.genislik ?? px[0], r.yukseklik ?? px[1]];
        const enFazla =
          (b.sayfa.genislik - b.sayfa.sol - b.sayfa.sag) * (96 / 72);
        if (w > enFazla) [w, h] = [enFazla, (h * enFazla) / w];
        const cx = Math.round(w * 9525);
        const cy = Math.round(h * 9525);
        const n = medya.length;
        return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${n}" name="Resim ${n}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${n}" name="${ad}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
      }
      const rpr: string[] = [];
      if (r.font && r.font !== b.font)
        rpr.push(
          `<w:rFonts w:ascii="${x(r.font)}" w:hAnsi="${x(r.font)}" w:cs="${x(r.font)}"/>`,
        );
      if (r.kalin) rpr.push("<w:b/>");
      if (r.italik) rpr.push("<w:i/>");
      if (r.ustuCizili) rpr.push("<w:strike/>");
      if (r.renk) rpr.push(`<w:color w:val="${r.renk.slice(1)}"/>`);
      if (r.boyut && r.boyut !== b.boyut)
        rpr.push(`<w:sz w:val="${Math.round(r.boyut * 2)}"/>`);
      if (r.alti) rpr.push('<w:u w:val="single"/>');
      if (r.vurgu)
        rpr.push(
          `<w:shd w:val="clear" w:color="auto" w:fill="${r.vurgu.slice(1)}"/>`,
        );
      return `<w:r>${rpr.length ? `<w:rPr>${rpr.join("")}</w:rPr>` : ""}<w:t xml:space="preserve">${x(r.metin)}</w:t></w:r>`;
    });
    const isaret = p.liste
      ? `<w:r><w:t xml:space="preserve">${x(p.liste.isaret)}</w:t></w:r><w:r><w:tab/></w:r>`
      : "";
    return `<w:p><w:pPr>${ppr.join("")}</w:pPr>${isaret}${runlar.join("")}</w:p>`;
  };

  const CIZGI = 'w:val="single" w:sz="4" w:space="0" w:color="000000"';
  const tablo = (t: Tablo, genislik: number): string => {
    // Satır birleştirmeleri (rowspan) için ızgara benzetimi: sütun sayısını bul
    const doluluk: number[] = [];
    let sutun = 1;
    for (const r of t.satirlar) {
      let k = 0;
      for (const c of r) {
        while ((doluluk[k] ?? 0) > 0) k++;
        for (let j = 0; j < c.birlesik; j++) doluluk[k + j] = c.satirBirlesik;
        k += c.birlesik;
      }
      sutun = Math.max(sutun, k, doluluk.length);
      for (let j = 0; j < doluluk.length; j++)
        doluluk[j] = Math.max(0, (doluluk[j] ?? 0) - 1);
    }
    const toplam = t.genislikler.reduce((a, v) => a + v, 0);
    const gen =
      t.genislikler.length === sutun
        ? t.genislikler.map((w) => Math.round((w / toplam) * genislik))
        : Array.from({ length: sutun }, () => Math.round(genislik / sutun));
    const hucrePr = (c: Hucre, w: number, devam: boolean) => {
      const kenar =
        c.kenar === 0
          ? ""
          : `<w:tcBorders>${[
              ["top", 1],
              ["left", 8],
              ["bottom", 4],
              ["right", 2],
            ]
              .map(([ad, bit]) =>
                c.kenar & (bit as number)
                  ? `<w:${ad} ${CIZGI}/>`
                  : `<w:${ad} w:val="nil"/>`,
              )
              .join("")}</w:tcBorders>`;
      return `<w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${
        c.birlesik > 1 ? `<w:gridSpan w:val="${c.birlesik}"/>` : ""
      }${
        c.satirBirlesik > 1 || devam
          ? `<w:vMerge${devam ? "" : ' w:val="restart"'}/>`
          : ""
      }${kenar}${
        c.zemin
          ? `<w:shd w:val="clear" w:color="auto" w:fill="${c.zemin.slice(1)}"/>`
          : ""
      }${c.dikey === "top" ? "" : `<w:vAlign w:val="${c.dikey === "middle" ? "center" : "bottom"}"/>`}</w:tcPr>`;
    };
    const suren: Array<{ kalan: number; c: Hucre } | undefined> = [];
    const satirlar = t.satirlar
      .map((r) => {
        const out: string[] = [];
        let k = 0;
        const bosDoldur = () => {
          while (suren[k] && suren[k]!.kalan > 0) {
            const { c } = suren[k]!;
            const w = gen.slice(k, k + c.birlesik).reduce((a, v) => a + v, 0);
            out.push(`<w:tc>${hucrePr(c, w, true)}<w:p/></w:tc>`);
            for (let j = 0; j < c.birlesik; j++) suren[k + j]!.kalan--;
            k += c.birlesik;
          }
        };
        for (const c of r) {
          bosDoldur();
          const w = gen.slice(k, k + c.birlesik).reduce((a, v) => a + v, 0);
          const ic = c.bloklar
            .map((y) => (y.tur === "tablo" ? tablo(y, w - 216) : paragraf(y)))
            .join("");
          const sonP = c.bloklar[c.bloklar.length - 1]?.tur === "paragraf";
          out.push(
            `<w:tc>${hucrePr(c, w, false)}${ic}${sonP ? "" : "<w:p/>"}</w:tc>`,
          );
          for (let j = 0; j < c.birlesik; j++)
            suren[k + j] = { kalan: c.satirBirlesik - 1, c };
          k += c.birlesik;
        }
        bosDoldur();
        return `<w:tr>${out.join("")}</w:tr>`;
      })
      .join("");
    return `<w:tbl><w:tblPr><w:tblW w:w="${genislik}" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${gen
      .map((w) => `<w:gridCol w:w="${w}"/>`)
      .join("")}</w:tblGrid>${satirlar}</w:tbl>`;
  };

  const icerikGenislik = tw(b.sayfa.genislik - b.sayfa.sol - b.sayfa.sag);
  const govde = b.govde
    .map((blok, i) => {
      if (blok.tur === "paragraf") return paragraf(blok);
      if (blok.tur === "sayfaSonu")
        return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      // Word ardışık iki tabloyu birleştirir; araya boş paragraf koy
      const sonra = b.govde[i + 1]?.tur === "tablo" ? "<w:p/>" : "";
      return tablo(blok, icerikGenislik) + sonra;
    })
    .join("");

  const NS =
    'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
  const bilgiDosyalari: ZipDosya[] = [];
  const enc = new TextEncoder();
  const bilgi = (ps: Paragraf[], tur: "header" | "footer") => {
    if (!ps.some((p) => p.parcalar.length)) return "";
    // üst/alt bilgideki görseller ayrı ilişki dosyası ister; metin korunur
    ps = ps.map((p) => ({
      ...p,
      parcalar: p.parcalar.filter((r) => r.tur !== "gorsel"),
    }));
    const ad = `${tur}1.xml`;
    const kok = tur === "header" ? "w:hdr" : "w:ftr";
    bilgiDosyalari.push({
      ad: `word/${ad}`,
      veri: enc.encode(
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><${kok} ${NS}>${ps.map(paragraf).join("")}</${kok}>`,
      ),
    });
    const id = yeniRid(tur, ad);
    return `<w:${tur}Reference w:type="default" r:id="${id}"/>`;
  };
  const ust = bilgi(b.ustBilgi, "header");
  const alt = bilgi(b.altBilgi, "footer");
  const s = b.sayfa;
  const yatay = s.genislik > s.yukseklik;
  const sectPr = `<w:sectPr>${ust}${alt}<w:pgSz w:w="${tw(s.genislik)}" w:h="${tw(s.yukseklik)}"${yatay ? ' w:orient="landscape"' : ""}/><w:pgMar w:top="${tw(s.ust)}" w:right="${tw(s.sag)}" w:bottom="${tw(s.alt)}" w:left="${tw(s.sol)}" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>`;

  const belge = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${govde}${sectPr}</w:body></w:document>`;
  const stiller = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${x(b.font)}" w:hAnsi="${x(b.font)}" w:eastAsia="${x(b.font)}" w:cs="${x(b.font)}"/><w:sz w:val="${Math.round(b.boyut * 2)}"/><w:szCs w:val="${Math.round(b.boyut * 2)}"/><w:lang w:val="tr-TR"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`;
  const tipler = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/><Default Extension="bmp" ContentType="image/bmp"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>${ust ? '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ""}${alt ? '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ""}</Types>`;
  const kokIliski = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const belgeIliski = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${iliskiler.join("")}</Relationships>`;

  return zipSikistir([
    { ad: "[Content_Types].xml", veri: enc.encode(tipler) },
    { ad: "_rels/.rels", veri: enc.encode(kokIliski) },
    { ad: "word/document.xml", veri: enc.encode(belge) },
    { ad: "word/styles.xml", veri: enc.encode(stiller) },
    { ad: "word/_rels/document.xml.rels", veri: enc.encode(belgeIliski) },
    ...bilgiDosyalari,
    ...medya,
  ]);
}
