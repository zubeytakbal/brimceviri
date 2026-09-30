// PDF sıkıştırma: gömülü görselleri yeniden kodlar, metin ve vektörlere dokunmaz.
// Görsel kodlama tarayıcıda (canvas) yapılır; bu dosya yalnız PDF yapısını dolaşır.
import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
} from "pdf-lib";

/** Kodlayıcıya verilen görsel: JPEG baytları ya da çözülmüş ham pikseller. */
export type KaynakGorsel =
  | { tur: "jpeg"; veri: Uint8Array; w: number; h: number }
  | { tur: "ham"; veri: Uint8Array; w: number; h: number; kanal: 1 | 3 };

/** Yeni JPEG ve boyutları; null dönerse görsel olduğu gibi kalır. */
export type Kodlayici = (
  g: KaynakGorsel,
) => Promise<{ veri: Uint8Array; w: number; h: number } | null>;

export type SikistirmaRaporu = {
  gorsel: number;
  kucultulen: number;
  once: number;
  sonra: number;
};

const ad = (d: PDFDict, k: string) => {
  const v = d.get(PDFName.of(k));
  return v instanceof PDFName ? v.asString() : undefined;
};

const sayi = (d: PDFDict, k: string, ctx: PDFDocument["context"]) => {
  const v = ctx.lookup(d.get(PDFName.of(k)));
  return v instanceof PDFNumber ? v.asNumber() : undefined;
};

/** Tek filtreyi ad olarak döndürür; filtre dizisi (zincir) desteklenmez. */
function filtre(d: PDFDict, ctx: PDFDocument["context"]) {
  const f = ctx.lookup(d.get(PDFName.of("Filter")));
  if (f instanceof PDFName) return f.asString();
  if (f instanceof PDFArray && f.size() === 1) {
    const x = f.get(0);
    return x instanceof PDFName ? x.asString() : "?";
  }
  return f ? "?" : "";
}

/** Renk uzayındaki kanal sayısı (1 gri, 3 RGB); desteklenmeyenlerde 0. */
function kanalSayisi(d: PDFDict, ctx: PDFDocument["context"]): 0 | 1 | 3 {
  const cs = ctx.lookup(d.get(PDFName.of("ColorSpace")));
  if (cs instanceof PDFName) {
    const a = cs.asString();
    return a === "/DeviceRGB" ? 3 : a === "/DeviceGray" ? 1 : 0;
  }
  if (cs instanceof PDFArray && cs.size() === 2) {
    const tur = cs.get(0);
    const akis = ctx.lookup(cs.get(1));
    if (
      tur instanceof PDFName &&
      tur.asString() === "/ICCBased" &&
      akis instanceof PDFRawStream
    ) {
      const n = sayi(akis.dict, "N", ctx);
      return n === 3 ? 3 : n === 1 ? 1 : 0;
    }
  }
  return 0;
}

async function inflate(veri: Uint8Array): Promise<Uint8Array> {
  const akis = new Blob([veri as BlobPart])
    .stream()
    .pipeThrough(new DecompressionStream("deflate"));
  return new Uint8Array(await new Response(akis).arrayBuffer());
}

/** PNG öngörücülerini (Predictor ≥ 10) geri alır. */
export function pngOngoruCoz(
  veri: Uint8Array,
  w: number,
  h: number,
  bpp: number,
): Uint8Array {
  const satir = w * bpp;
  const out = new Uint8Array(satir * h);
  for (let y = 0; y < h; y++) {
    const tip = veri[y * (satir + 1)];
    const giris = y * (satir + 1) + 1;
    const o = y * satir;
    for (let x = 0; x < satir; x++) {
      const r = veri[giris + x];
      const a = x >= bpp ? out[o + x - bpp] : 0;
      const b = y ? out[o - satir + x] : 0;
      const c = y && x >= bpp ? out[o - satir + x - bpp] : 0;
      let v: number;
      if (tip === 0) v = r;
      else if (tip === 1) v = r + a;
      else if (tip === 2) v = r + b;
      else if (tip === 3) v = r + ((a + b) >> 1);
      else if (tip === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v = r + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      } else throw new Error("PNG öngörü türü desteklenmiyor");
      out[o + x] = v & 255;
    }
  }
  return out;
}

/**
 * Görselleri yeniden kodlayarak PDF'i küçültür. Yeni görsel eskisinden
 * büyükse eskisi korunur. Maske (SMask), CMYK ve özel renk uzaylı görsellere dokunulmaz.
 */
export async function pdfSikistir(
  veri: Uint8Array,
  kodla: Kodlayici,
  ilerleme?: (i: number, toplam: number) => void,
): Promise<{ pdf: Uint8Array; rapor: SikistirmaRaporu }> {
  let pdf: PDFDocument;
  try {
    pdf = await PDFDocument.load(veri);
  } catch (e) {
    if (e instanceof Error && /encrypt/i.test(e.message))
      throw new Error("Bu PDF şifreli; önce şifresini kaldırın.");
    throw new Error("PDF dosyası okunamadı.");
  }
  const ctx = pdf.context;
  const nesneler = ctx.enumerateIndirectObjects();

  // Maske olarak kullanılan akışlar atlanır (boyutları ana görsele bağlı olabilir).
  const maskeler = new Set<string>();
  for (const [, o] of nesneler) {
    if (!(o instanceof PDFRawStream)) continue;
    for (const k of ["SMask", "Mask"]) {
      const m = o.dict.get(PDFName.of(k));
      if (m instanceof PDFRef) maskeler.add(m.toString());
    }
  }

  const gorseller = nesneler.filter(
    ([ref, o]) =>
      o instanceof PDFRawStream &&
      ad(o.dict, "Subtype") === "/Image" &&
      !maskeler.has(ref.toString()),
  ) as Array<[PDFRef, PDFRawStream]>;

  const rapor: SikistirmaRaporu = {
    gorsel: gorseller.length,
    kucultulen: 0,
    once: veri.length,
    sonra: 0,
  };

  for (const [i, [ref, akis]] of gorseller.entries()) {
    ilerleme?.(i, gorseller.length);
    const d = akis.dict;
    const w = sayi(d, "Width", ctx);
    const h = sayi(d, "Height", ctx);
    if (!w || !h || w * h < 64 * 64) continue;
    if (d.get(PDFName.of("ImageMask")) || d.get(PDFName.of("Decode"))) continue;
    if ((sayi(d, "BitsPerComponent", ctx) ?? 8) !== 8) continue;
    const kanal = kanalSayisi(d, ctx);
    if (!kanal) continue;
    const f = filtre(d, ctx);
    let kaynak: KaynakGorsel;
    try {
      if (f === "/DCTDecode") {
        kaynak = { tur: "jpeg", veri: akis.contents, w, h };
      } else if (f === "/FlateDecode" || f === "") {
        let ham = f ? await inflate(akis.contents) : akis.contents;
        const parms = ctx.lookup(d.get(PDFName.of("DecodeParms")));
        const ongoru =
          parms instanceof PDFDict ? (sayi(parms, "Predictor", ctx) ?? 1) : 1;
        if (ongoru >= 10) ham = pngOngoruCoz(ham, w, h, kanal);
        else if (ongoru !== 1) continue;
        if (ham.length < w * h * kanal) continue;
        kaynak = { tur: "ham", veri: ham, w, h, kanal };
      } else continue;
    } catch {
      continue;
    }
    const yeni = await kodla(kaynak);
    if (!yeni || yeni.veri.length >= akis.contents.length * 0.95) continue;

    const nd = d.clone(ctx);
    nd.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
    nd.delete(PDFName.of("DecodeParms"));
    nd.set(PDFName.of("Width"), PDFNumber.of(yeni.w));
    nd.set(PDFName.of("Height"), PDFNumber.of(yeni.h));
    nd.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
    nd.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
    ctx.assign(ref, PDFRawStream.of(nd, yeni.veri));
    rapor.kucultulen++;
  }
  ilerleme?.(gorseller.length, gorseller.length);

  const cikti = await pdf.save({ useObjectStreams: true });
  // Sonuç büyüdüyse (ör. görselsiz PDF) orijinal döndürülür.
  if (cikti.length >= veri.length) {
    rapor.sonra = veri.length;
    return { pdf: veri, rapor };
  }
  rapor.sonra = cikti.length;
  return { pdf: cikti, rapor };
}
