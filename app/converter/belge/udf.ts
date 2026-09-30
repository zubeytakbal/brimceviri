// UYAP Doküman Editörü (.udf) dosyasını okur: ZIP içindeki content.xml'i paragraf, tablo ve
// görsellerden oluşan bir modele çevirir; HTML ve düz metin üretir.
// Biçim: Java Swing StyledDocument benzeri. Tüm metin <content> içindeki CDATA'dadır;
// her parça startOffset/length ile bu metnin bir dilimini gösterir.
import { zipOku } from "../arsiv/zipOku";
import { altlar, bul, metin, xmlAyristir, type XmlDugum } from "./xml";

export type Parca =
  | {
      tur: "metin";
      metin: string;
      font?: string;
      boyut?: number;
      kalin?: boolean;
      italik?: boolean;
      alti?: boolean;
      ustuCizili?: boolean;
      renk?: string;
      vurgu?: string;
    }
  | { tur: "sekme" }
  | {
      tur: "gorsel";
      /** base64 (önek olmadan) */
      veri: string;
      mime: string;
      genislik?: number;
      yukseklik?: number;
    };

export type Paragraf = {
  tur: "paragraf";
  /** 0 sol, 1 orta, 2 sağ, 3 iki yana */
  hiza: 0 | 1 | 2 | 3;
  solGirinti: number;
  sagGirinti: number;
  ilkSatir: number;
  ustBosluk: number;
  altBosluk: number;
  satirAraligi: number;
  /** Numaralı veya madde işaretli liste öğesi */
  liste?: { isaret: string; seviye: number };
  parcalar: Parca[];
};

export type Hucre = {
  birlesik: number;
  satirBirlesik: number;
  /** Kenar bitleri: 1 üst, 2 sağ, 4 alt, 8 sol */
  kenar: number;
  zemin?: string;
  dikey: "top" | "middle" | "bottom";
  bloklar: Array<Paragraf | Tablo>;
};
export type Tablo = {
  tur: "tablo";
  kenarlik: boolean;
  genislikler: number[];
  satirlar: Hucre[][];
};
export type Blok = Paragraf | Tablo | { tur: "sayfaSonu" };

export type UdfBelge = {
  sayfa: {
    genislik: number;
    yukseklik: number;
    sol: number;
    ust: number;
    sag: number;
    alt: number;
  };
  font: string;
  boyut: number;
  ustBilgi: Paragraf[];
  altBilgi: Paragraf[];
  govde: Blok[];
  /** documentproperties.xml içindeki UYAP doğrulama kodu */
  dogrulamaKodu?: string;
  imzali: boolean;
  surum?: string;
};

type Stil = {
  font?: string;
  boyut?: number;
  kalin?: boolean;
  italik?: boolean;
  alti?: boolean;
  ustuCizili?: boolean;
  renk?: string;
  vurgu?: string;
};

// javax.print MediaSizeName sırası (UYAP editörü): 1 A4, 5 Letter, 6 Legal, 11 A5 — pt cinsinden
const SAYFA: Record<string, [number, number]> = {
  "1": [595.28, 841.89],
  "5": [612, 792],
  "6": [612, 1008],
  "11": [419.53, 595.28],
};

const sayi = (v: string | undefined, vars = 0) => {
  const n = v === undefined ? NaN : parseFloat(v);
  return Number.isFinite(n) ? n : vars;
};
const dogru = (v: string | undefined) =>
  v === undefined ? undefined : v === "true" || v === "1";

/** Java ARGB tam sayısını (işaretli olabilir) #rrggbb'ye çevirir. */
export function renkCoz(v: string | undefined) {
  if (!v) return undefined;
  if (v.startsWith("#")) return v;
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return undefined;
  const hex = ((n >>> 0) & 0xffffff).toString(16).padStart(6, "0");
  return hex === "000000" ? undefined : `#${hex}`;
}

function stilOku(d: XmlDugum): Stil {
  const o = d.oz;
  const s: Stil = {};
  if (o.family) s.font = o.family;
  if (o.size) s.boyut = sayi(o.size, 12);
  const k = dogru(o.bold);
  if (k !== undefined) s.kalin = k;
  const i = dogru(o.italic);
  if (i !== undefined) s.italik = i;
  const a = dogru(o.underline);
  if (a !== undefined) s.alti = a;
  const c = dogru(o.strikethrough);
  if (c !== undefined) s.ustuCizili = c;
  const r = renkCoz(o.foreground);
  if (r) s.renk = r;
  const v = renkCoz(o.background);
  if (v && v !== "#ffffff") s.vurgu = v;
  return s;
}

function mimeBul(b64: string) {
  if (b64.startsWith("iVBOR")) return "image/png";
  if (b64.startsWith("/9j/")) return "image/jpeg";
  if (b64.startsWith("R0lG")) return "image/gif";
  if (b64.startsWith("Qk")) return "image/bmp";
  return "image/png";
}

function roma(n: number) {
  const d: Array<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, h] of d)
    while (n >= v) {
      out += h;
      n -= v;
    }
  return out;
}

/** content.xml metninden belge modelini kurar. */
export function udfIcerikCoz(xml: string): Omit<UdfBelge, "imzali"> {
  const kok = xmlAyristir(xml);
  const tumMetin = metin(bul(kok, "content"));
  const stiller = new Map<string, Stil>();
  for (const s of altlar(bul(kok, "styles") ?? kok).filter(
    (x) => x.yerel === "style",
  ))
    stiller.set(s.oz.name ?? "", stilOku(s));
  const varsayilan = stiller.get("hvl-default") ?? stiller.get("default") ?? {};
  const font = varsayilan.font ?? "Times New Roman";
  const boyut = varsayilan.boyut ?? 12;

  const dilim = (d: XmlDugum) => {
    const b = sayi(d.oz.startOffset, -1);
    const u = sayi(d.oz.length, 0);
    return b < 0 ? "" : tumMetin.slice(b, b + u);
  };

  // liste numaraları: ListId + düzey başına sayaç
  const sayac = new Map<string, number[]>();
  const listeIsareti = (o: Record<string, string>) => {
    const numarali = dogru(o.Numbered);
    if (!numarali && !dogru(o.Bulleted)) return undefined;
    const seviye = Math.max(0, sayi(o.ListLevel, 0));
    if (!numarali) return { isaret: ["•", "◦", "▪"][seviye % 3], seviye };
    const k = o.ListId ?? "";
    const dizi = sayac.get(k) ?? [];
    dizi.length = seviye + 1;
    dizi[seviye] = (dizi[seviye] ?? 0) + 1;
    sayac.set(k, dizi);
    const n = dizi[seviye];
    const t = o.NumberType ?? "";
    const isaret = /LETTER_SMALL|LOWER/i.test(t)
      ? `${String.fromCharCode(96 + (((n - 1) % 26) + 1))})`
      : /LETTER|UPPER/i.test(t)
        ? `${String.fromCharCode(64 + (((n - 1) % 26) + 1))})`
        : /ROMAN/i.test(t)
          ? `${roma(n)}.`
          : /PARENTHESIS|PAREN/i.test(t)
            ? `${n})`
            : `${n}.`;
    return { isaret, seviye };
  };

  const paragraf = (p: XmlDugum): Paragraf => {
    const o = p.oz;
    const pStil = stiller.get(o.resolver ?? "") ?? {};
    const parcalar: Parca[] = [];
    for (const c of altlar(p)) {
      if (c.yerel === "tab") {
        parcalar.push({ tur: "sekme" });
        continue;
      }
      if (c.yerel === "image") {
        const veri = (c.oz.imageData ?? "").replace(/\s+/g, "");
        if (veri)
          parcalar.push({
            tur: "gorsel",
            veri,
            mime: mimeBul(veri),
            genislik: sayi(c.oz.width) || undefined,
            yukseklik: sayi(c.oz.height) || undefined,
          });
        continue;
      }
      if (c.oz.startOffset === undefined) continue;
      let m = dilim(c).replace(/\r/g, "");
      if (!m) continue;
      const cStil = {
        ...pStil,
        ...(stiller.get(c.oz.resolver ?? "") ?? {}),
        ...stilOku(c),
      };
      // metin içindeki sekmeleri ayrı parça yap; paragraf sonundaki satır sonunu at
      m = m.replace(/\n+$/, "");
      const bol = m.split(/(\t|\n)/);
      for (const x of bol) {
        if (x === "\t") parcalar.push({ tur: "sekme" });
        else if (x === "\n") parcalar.push({ tur: "metin", metin: "\n" });
        else if (x) parcalar.push({ tur: "metin", metin: x, ...cStil });
      }
    }
    const h = sayi(o.Alignment, 0);
    return {
      tur: "paragraf",
      hiza: (h >= 0 && h <= 3 ? h : 0) as Paragraf["hiza"],
      solGirinti: sayi(o.LeftIndent),
      sagGirinti: sayi(o.RightIndent),
      ilkSatir: sayi(o.FirstLineIndent),
      ustBosluk: sayi(o.SpaceAbove),
      altBosluk: sayi(o.SpaceBelow),
      satirAraligi: sayi(o.LineSpacing),
      liste: listeIsareti(o),
      parcalar,
    };
  };

  const paragraflar = (d: XmlDugum | undefined) =>
    d
      ? altlar(d)
          .filter((x) => x.yerel === "paragraph")
          .map(paragraf)
      : [];

  const kenarsiz = (o: Record<string, string>) =>
    /none/i.test(`${o.border ?? ""} ${o.borderStyle ?? ""}`);

  const tablo = (t: XmlDugum): Tablo => {
    const tabloKenarsiz = kenarsiz(t.oz);
    const satirlar = altlar(t)
      .filter((r) => r.yerel === "row")
      .map((r) =>
        altlar(r)
          .filter((c) => c.yerel === "cell")
          .map((c): Hucre => {
            const zemin = renkCoz(c.oz.fillColor);
            const a = c.oz.align ?? c.oz.verticalAlign ?? "";
            return {
              birlesik: Math.max(1, sayi(c.oz.colspan, 1)),
              satirBirlesik: Math.max(1, sayi(c.oz.rowspan, 1)),
              kenar:
                tabloKenarsiz || kenarsiz(c.oz)
                  ? 0
                  : sayi(c.oz.borderSpec, 15) & 15,
              zemin: zemin && zemin !== "#ffffff" ? zemin : undefined,
              dikey: /center|middle/i.test(a)
                ? "middle"
                : /bottom/i.test(a)
                  ? "bottom"
                  : "top",
              bloklar: altlar(c).flatMap(
                (x): Array<Paragraf | Tablo> =>
                  x.yerel === "paragraph"
                    ? [paragraf(x)]
                    : x.yerel === "table"
                      ? [tablo(x)]
                      : [],
              ),
            };
          }),
      );
    return {
      tur: "tablo",
      kenarlik: !tabloKenarsiz,
      genislikler: (t.oz.columnSpans ?? "")
        .split(",")
        .map((x) => parseFloat(x))
        .filter((x) => Number.isFinite(x) && x > 0),
      satirlar,
    };
  };

  const el = bul(kok, "elements");
  const govde: Blok[] = [];
  let ustBilgi: Paragraf[] = [];
  let altBilgi: Paragraf[] = [];
  for (const d of el ? altlar(el) : []) {
    if (d.yerel === "paragraph") govde.push(paragraf(d));
    else if (d.yerel === "table") govde.push(tablo(d));
    else if (d.yerel === "page-break" || d.yerel === "pageBreak")
      govde.push({ tur: "sayfaSonu" });
    else if (d.yerel === "header") ustBilgi = paragraflar(d);
    else if (d.yerel === "footer") altBilgi = paragraflar(d);
  }
  // <elements> yoksa ama metin varsa en azından düz metni göster
  if (!govde.length && tumMetin.trim())
    for (const satir of tumMetin.replace(/\n$/, "").split("\n"))
      govde.push({
        tur: "paragraf",
        hiza: 0,
        solGirinti: 0,
        sagGirinti: 0,
        ilkSatir: 0,
        ustBosluk: 0,
        altBosluk: 0,
        satirAraligi: 0,
        parcalar: satir ? [{ tur: "metin", metin: satir }] : [],
      });

  const pf = bul(bul(kok, "properties"), "pageFormat")?.oz ?? {};
  let [g, y] = SAYFA[pf.mediaSizeName ?? "1"] ?? SAYFA["1"];
  if (pf.paperOrientation === "0") [g, y] = [y, g];
  return {
    sayfa: {
      genislik: g,
      yukseklik: y,
      sol: sayi(pf.leftMargin, 70.87),
      ust: sayi(pf.topMargin, 56.69),
      sag: sayi(pf.rightMargin, 70.87),
      alt: sayi(pf.bottomMargin, 56.69),
    },
    font,
    boyut,
    ustBilgi,
    altBilgi,
    govde,
    surum: kok.oz.format_id,
  };
}

/** .udf dosyasını (ZIP) veya doğrudan content.xml metnini okur. */
export async function udfOku(veri: Uint8Array): Promise<UdfBelge> {
  const ilk = String.fromCharCode(...veri.subarray(0, 4));
  if (!ilk.startsWith("PK")) {
    const x = new TextDecoder().decode(veri);
    if (!x.includes("<template") && !x.includes("<content"))
      throw new Error("Bu dosya bir UDF belgesi değil.");
    return { ...udfIcerikCoz(x), imzali: false };
  }
  const girdiler = zipOku(veri);
  const al = (ad: string) =>
    girdiler.find((g) => g.ad.toLowerCase().split("/").pop() === ad);
  const icerik = al("content.xml");
  if (!icerik)
    throw new Error(
      "Dosyada content.xml bulunamadı; bu bir UYAP UDF belgesi değil.",
    );
  const belge = udfIcerikCoz(new TextDecoder().decode(await icerik.ac()));
  let dogrulamaKodu: string | undefined;
  const ozellik = al("documentproperties.xml");
  if (ozellik) {
    try {
      const k = xmlAyristir(new TextDecoder().decode(await ozellik.ac()));
      // <entry key="uyapdogrulamakodu">…</entry>
      const e = altlar(k).find(
        (x) => (x.oz.key ?? "").toLowerCase() === "uyapdogrulamakodu",
      );
      dogrulamaKodu = metin(e).trim() || undefined;
    } catch {
      /* özellikler isteğe bağlı */
    }
  }
  return {
    ...belge,
    dogrulamaKodu,
    imzali: girdiler.some((g) => /\.sgn$/i.test(g.ad) && g.boyut > 0),
  };
}

const kacis = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const HIZA = ["left", "center", "right", "justify"];

/** Liste öğesinin girintisi (pt) */
export const LISTE_GIRINTI = 18;

function paragrafHtml(p: Paragraf, b: Pick<UdfBelge, "font" | "boyut">) {
  const st: string[] = [`text-align:${HIZA[p.hiza]}`];
  const sol =
    p.solGirinti + (p.liste ? (p.liste.seviye + 1) * LISTE_GIRINTI : 0);
  if (sol) st.push(`margin-left:${sol}pt`);
  if (p.sagGirinti) st.push(`margin-right:${p.sagGirinti}pt`);
  if (p.liste) st.push(`text-indent:-${LISTE_GIRINTI}pt`);
  else if (p.ilkSatir) st.push(`text-indent:${p.ilkSatir}pt`);
  if (p.ustBosluk) st.push(`margin-top:${p.ustBosluk}pt`);
  if (p.altBosluk) st.push(`margin-bottom:${p.altBosluk}pt`);
  if (p.satirAraligi)
    st.push(`line-height:${(1.15 * (1 + p.satirAraligi)).toFixed(3)}`);
  const ic = p.parcalar
    .map((x) => {
      if (x.tur === "sekme") return "\t";
      if (x.tur === "gorsel")
        return `<img src="data:${x.mime};base64,${x.veri}" alt=""${
          x.genislik ? ` style="width:${x.genislik}px;max-width:100%"` : ""
        }>`;
      if (x.metin === "\n") return "<br>";
      const s: string[] = [];
      if (x.font && x.font !== b.font)
        s.push(`font-family:${kacis(`"${x.font}"`)},serif`);
      if (x.boyut && x.boyut !== b.boyut) s.push(`font-size:${x.boyut}pt`);
      if (x.kalin) s.push("font-weight:bold");
      if (x.italik) s.push("font-style:italic");
      const dekor = [x.alti && "underline", x.ustuCizili && "line-through"]
        .filter(Boolean)
        .join(" ");
      if (dekor) s.push(`text-decoration:${dekor}`);
      if (x.renk) s.push(`color:${x.renk}`);
      if (x.vurgu) s.push(`background:${x.vurgu}`);
      const t = kacis(x.metin);
      return s.length ? `<span style="${s.join(";")}">${t}</span>` : t;
    })
    .join("");
  const isaret = p.liste
    ? `<span class="liste-isaret">${kacis(p.liste.isaret)}</span>`
    : "";
  return `<p style="${st.join(";")}">${isaret}${ic || (isaret ? "" : "<br>")}</p>`;
}

function tabloHtml(x: Tablo, b: Pick<UdfBelge, "font" | "boyut">): string {
  // columnSpans oransal genişliklerdir (UYAP piksel, bazı araçlar 1,1,1 yazar)
  const top = x.genislikler.reduce((t, v) => t + v, 0);
  const colgroup = x.genislikler.length
    ? `<colgroup>${x.genislikler.map((w) => `<col style="width:${((w / top) * 100).toFixed(2)}%">`).join("")}</colgroup>`
    : "";
  const satirlar = x.satirlar
    .map(
      (r) =>
        `<tr>${r
          .map((c) => {
            const oz: string[] = [];
            if (c.birlesik > 1) oz.push(`colspan="${c.birlesik}"`);
            if (c.satirBirlesik > 1) oz.push(`rowspan="${c.satirBirlesik}"`);
            const st: string[] = [];
            const k = (bit: number) =>
              c.kenar & bit ? "0.75pt solid #000" : "none";
            if (c.kenar !== 0)
              st.push(
                c.kenar === 15
                  ? "border:0.75pt solid #000"
                  : `border-top:${k(1)};border-right:${k(2)};border-bottom:${k(4)};border-left:${k(8)}`,
              );
            if (c.zemin) st.push(`background:${c.zemin}`);
            if (c.dikey !== "top") st.push(`vertical-align:${c.dikey}`);
            if (st.length) oz.push(`style="${st.join(";")}"`);
            const ic = c.bloklar
              .map((y) =>
                y.tur === "tablo" ? tabloHtml(y, b) : paragrafHtml(y, b),
              )
              .join("");
            return `<td${oz.length ? ` ${oz.join(" ")}` : ""}>${ic}</td>`;
          })
          .join("")}</tr>`,
    )
    .join("");
  return `<table>${colgroup}${satirlar}</table>`;
}

/** Yazdırmaya ve önizlemeye hazır tam HTML belgesi üretir. */
export function udfHtml(b: UdfBelge, baslik = "UDF belgesi") {
  const s = b.sayfa;
  const govde = b.govde
    .map((x) =>
      x.tur === "sayfaSonu"
        ? '<div class="sayfa-sonu"></div>'
        : x.tur === "paragraf"
          ? paragrafHtml(x, b)
          : tabloHtml(x, b),
    )
    .join("\n");
  const bilgi = (ps: Paragraf[], sinif: string) =>
    ps.some((p) => p.parcalar.length)
      ? `<div class="${sinif}">${ps.map((p) => paragrafHtml(p, b)).join("")}</div>`
      : "";
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>${kacis(baslik)}</title><style>
@page{size:${s.genislik}pt ${s.yukseklik}pt;margin:${s.ust}pt ${s.sag}pt ${s.alt}pt ${s.sol}pt}
html{background:#e9ecef}
body{margin:0;font-family:"${kacis(b.font)}","Times New Roman",Tinos,"Liberation Serif",serif;font-size:${b.boyut}pt;color:#000;line-height:1.15}
.sayfa{background:#fff;width:${s.genislik}pt;max-width:100%;box-sizing:border-box;min-height:${s.yukseklik}pt;margin:16px auto;padding:${s.ust}pt ${s.sag}pt ${s.alt}pt ${s.sol}pt;box-shadow:0 1px 6px rgba(0,0,0,.18)}
p{margin:0;white-space:pre-wrap;tab-size:72pt;overflow-wrap:break-word}
.liste-isaret{display:inline-block;width:${LISTE_GIRINTI}pt;text-indent:0}
table{border-collapse:collapse;width:100%;table-layout:fixed}
td{vertical-align:top;padding:1pt 3pt}
img{max-width:100%}
.sayfa-sonu{break-after:page;height:0}
.ust-bilgi{margin-bottom:12pt}.alt-bilgi{margin-top:12pt}
@media (max-width:640px){.sayfa{padding:24px 16px;margin:0;min-height:0;box-shadow:none}}
@media print{html{background:#fff}.sayfa{width:auto;min-height:0;margin:0;padding:0;box-shadow:none}}
</style></head><body><div class="sayfa">${bilgi(b.ustBilgi, "ust-bilgi")}${govde}${bilgi(b.altBilgi, "alt-bilgi")}</div></body></html>`;
}

const paragrafMetni = (p: Paragraf) =>
  (p.liste ? `${"  ".repeat(p.liste.seviye)}${p.liste.isaret} ` : "") +
  p.parcalar
    .map((x) => (x.tur === "metin" ? x.metin : x.tur === "sekme" ? "\t" : ""))
    .join("");

function tabloMetni(t: Tablo, satirlar: string[]) {
  for (const r of t.satirlar)
    satirlar.push(
      r
        .map((c) =>
          c.bloklar
            .map((y) => {
              if (y.tur === "paragraf") return paragrafMetni(y);
              const ic: string[] = [];
              tabloMetni(y, ic);
              return ic.join(" / ");
            })
            .join(" "),
        )
        .join("\t"),
    );
}

/** Belgenin düz metni (tablolarda hücreler sekmeyle ayrılır). */
export function udfMetin(b: UdfBelge) {
  const satirlar: string[] = [];
  const ekle = (ps: Paragraf[]) =>
    ps.forEach((p) => satirlar.push(paragrafMetni(p)));
  ekle(b.ustBilgi);
  for (const x of b.govde) {
    if (x.tur === "paragraf") satirlar.push(paragrafMetni(x));
    else if (x.tur === "tablo") tabloMetni(x, satirlar);
    else satirlar.push("\f");
  }
  ekle(b.altBilgi);
  return satirlar.join("\r\n").replace(/(\r\n)+$/, "") + "\r\n";
}
