// Tarayıcıda görsel açma ve yeniden kodlama (canvas). Dosya hiçbir yere gönderilmez.
import { FORMATLAR, type GorselFormat } from "../../converter/gorsel/formatlar";
import { kaliteAra } from "../../converter/gorsel/sikistirma";
import { zipOlustur } from "../../converter/gorsel/zip";

/**
 * iPhone fotoğraflarının HEIC/HEIF biçimini çözmek için libheif tabanlı heic-to (LGPL-3.0).
 * Sitenin paketine gömülmez; yalnızca HEIC dosyası seçildiğinde tarayıcı bir kez CDN'den indirir.
 */
const HEIC_KUTUPHANE =
  "https://cdn.jsdelivr.net/npm/heic-to@1.5.2/dist/csp/heic-to.js";
type HeicModul = {
  heicTo: (a: { blob: Blob; type: "bitmap" }) => Promise<ImageBitmap>;
};
let heicModul: Promise<HeicModul> | null = null;

/** Dosyanın ISO BMFF "ftyp" markasına bakarak HEIC/HEIF olup olmadığını anlar. */
export async function heicMi(dosya: Blob): Promise<boolean> {
  const b = new Uint8Array(await dosya.slice(0, 12).arrayBuffer());
  if (String.fromCharCode(...b.subarray(4, 8)) !== "ftyp") return false;
  return [
    "heic",
    "heix",
    "hevc",
    "hevx",
    "heim",
    "heis",
    "mif1",
    "msf1",
  ].includes(String.fromCharCode(...b.subarray(8, 12)));
}

/** SVG kısa kenarı bundan küçükse çizim bu uzun kenara büyütülür (vektör, netlik kaybı olmaz). */
const SVG_UZUN_KENAR = 2048;

/** TIFF çözücü UTIF.js (MIT) ve sıkıştırılmış TIFF'ler için pako (MIT); yalnızca TIFF seçilince yüklenir. */
const TIFF_KUTUPHANELER = [
  "https://cdn.jsdelivr.net/npm/pako@1.0.11/dist/pako_inflate.min.js",
  "https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.js",
];
type Utif = {
  decode: (b: ArrayBuffer) => Array<Record<string, number[] | undefined>>;
  decodeImage: (b: ArrayBuffer, ifd: object) => void;
  toRGBA8: (ifd: object) => Uint8Array;
};
let tiffModul: Promise<Utif> | null = null;

function betikYukle(src: string) {
  return new Promise<void>((tamam, hata) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => tamam();
    s.onerror = () => hata(new Error(src));
    document.head.appendChild(s);
  });
}

async function basBaytlar(d: Blob, n: number) {
  return new Uint8Array(await d.slice(0, n).arrayBuffer());
}

async function svgMi(d: Blob) {
  if (d.type === "image/svg+xml") return true;
  if (d instanceof File && /\.svg$/i.test(d.name)) return true;
  const bas = new TextDecoder().decode(await basBaytlar(d, 512));
  return /<svg[\s>]/i.test(bas);
}

async function tiffMi(d: Blob) {
  const b = await basBaytlar(d, 4);
  return (
    (b[0] === 0x49 && b[1] === 0x49 && b[2] === 42 && b[3] === 0) ||
    (b[0] === 0x4d && b[1] === 0x4d && b[2] === 0 && b[3] === 42)
  );
}

/** SVG'yi vektör olarak, gerekirse büyütülmüş boyutta tuvale çizer. */
async function svgAc(d: Blob): Promise<ImageBitmap> {
  const metin = await d.text();
  const url = URL.createObjectURL(new Blob([metin], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    // Genişlik/yükseklik yazılmamış SVG'lerde oran viewBox'tan alınır.
    const kok = new DOMParser()
      .parseFromString(metin, "image/svg+xml")
      .querySelector("svg");
    const vb = kok
      ?.getAttribute("viewBox")
      ?.split(/[\s,]+/)
      .map(Number);
    const olculu = /^[\d.]+(px)?$/.test(kok?.getAttribute("width") ?? "");
    if (vb?.length === 4 && vb[2] > 0 && vb[3] > 0 && (!olculu || !w || !h)) {
      w = vb[2];
      h = vb[3];
    }
    if (!w || !h) [w, h] = [300, 150];
    const k = Math.max(1, SVG_UZUN_KENAR / Math.max(w, h));
    const c = document.createElement("canvas");
    c.width = Math.round(w * k);
    c.height = Math.round(h * k);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return await createImageBitmap(c);
  } catch {
    throw new Error("SVG dosyası çizilemedi. Dosya bozuk olabilir.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** TIFF'in en büyük sayfasını (çoğunlukla ilk sayfa) açar. */
async function tiffAc(d: Blob): Promise<ImageBitmap> {
  let U: Utif;
  try {
    tiffModul ??= (async () => {
      for (const src of TIFF_KUTUPHANELER) await betikYukle(src);
      return (self as unknown as { UTIF: Utif }).UTIF;
    })();
    U = await tiffModul;
  } catch {
    tiffModul = null;
    throw new Error(
      "TIFF okuyucu yüklenemedi. İnternet bağlantınızı kontrol edip tekrar deneyin.",
    );
  }
  try {
    const buf = await d.arrayBuffer();
    const ifdler = U.decode(buf);
    const alan = (i: Record<string, number[] | undefined>) =>
      (i.t256?.[0] ?? 0) * (i.t257?.[0] ?? 0);
    const ifd = ifdler.reduce((a, b) => (alan(b) > alan(a) ? b : a));
    U.decodeImage(buf, ifd);
    const w = ifd.width as unknown as number;
    const h = ifd.height as unknown as number;
    const rgba = U.toRGBA8(ifd);
    return await createImageBitmap(
      new ImageData(
        new Uint8ClampedArray(
          rgba.buffer as ArrayBuffer,
          rgba.byteOffset,
          w * h * 4,
        ),
        w,
        h,
      ),
    );
  } catch {
    throw new Error(
      "TIFF dosyası çözülemedi. Desteklenmeyen bir TIFF türü olabilir.",
    );
  }
}

export async function bitmapAc(dosya: Blob): Promise<ImageBitmap> {
  if (await svgMi(dosya)) return svgAc(dosya);
  if (await tiffMi(dosya)) return tiffAc(dosya);
  try {
    return await createImageBitmap(dosya);
  } catch {
    if (await heicMi(dosya)) {
      try {
        heicModul ??= import(
          /* webpackIgnore: true */ /* turbopackIgnore: true */ HEIC_KUTUPHANE
        );
        return await (await heicModul).heicTo({ blob: dosya, type: "bitmap" });
      } catch {
        heicModul = null;
        throw new Error(
          "HEIC dosyası açılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.",
        );
      }
    }
    throw new Error(
      "Bu dosya tarayıcınızda açılamadı. JPG, PNG, WebP, HEIC, AVIF, GIF, BMP, TIFF veya SVG bir görsel seçin.",
    );
  }
}

export type KodlaAyar = {
  genislik: number;
  yukseklik: number;
  format: GorselFormat;
  kalite?: number;
  arkaPlan?: string;
  /** Kaynaktan kırpılacak bölge (piksel). Verilmezse tüm görsel kullanılır. */
  bolge?: { x: number; y: number; w: number; h: number };
  /** Çıktıda görselin yerleşeceği alan; verilirse kalan kısım arka plan rengiyle dolar. */
  yerlesim?: { x: number; y: number; w: number; h: number };
};

export async function kodla(bitmap: ImageBitmap, a: KodlaAyar): Promise<Blob> {
  const tuval = document.createElement("canvas");
  tuval.width = a.genislik;
  tuval.height = a.yukseklik;
  const ctx = tuval.getContext("2d")!;
  const f = FORMATLAR[a.format];
  if (!f.seffaflik || (a.yerlesim && a.arkaPlan !== "saydam")) {
    ctx.fillStyle =
      a.arkaPlan && a.arkaPlan !== "saydam" ? a.arkaPlan : "#ffffff";
    ctx.fillRect(0, 0, a.genislik, a.yukseklik);
  }
  ctx.imageSmoothingQuality = "high";
  const b = a.bolge ?? { x: 0, y: 0, w: bitmap.width, h: bitmap.height };
  const y = a.yerlesim ?? { x: 0, y: 0, w: a.genislik, h: a.yukseklik };
  ctx.drawImage(bitmap, b.x, b.y, b.w, b.h, y.x, y.y, y.w, y.h);
  const blob = await new Promise<Blob | null>((res) =>
    tuval.toBlob(res, f.mime, f.kaliteli ? (a.kalite ?? 0.9) : undefined),
  );
  if (!blob) throw new Error("Görsel kaydedilemedi.");
  if (blob.type !== f.mime)
    throw new Error(
      `Tarayıcınız ${f.ad} olarak kaydetmeyi desteklemiyor. Chrome, Edge veya Firefox'un güncel sürümünü deneyin.`,
    );
  return blob;
}

/** Kısa süreli indirme bağlantısı. */
export function indir(url: string, ad: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = ad;
  a.click();
}

/** Blob listesinden ZIP oluşturup indirme adresini döndürür (çağıran revoke eder). */
export async function zipUrlOlustur(
  dosyalar: Array<{ ad: string; blob: Blob }>,
) {
  const veri = await Promise.all(
    dosyalar.map(async (d) => ({
      ad: d.ad,
      veri: new Uint8Array(await d.blob.arrayBuffer()),
    })),
  );
  return URL.createObjectURL(
    new Blob([zipOlustur(veri) as BlobPart], { type: "application/zip" }),
  );
}

export type HedefSonuc = {
  blob: Blob;
  genislik: number;
  yukseklik: number;
  kalite: number;
  kucultuldu: boolean;
};

/**
 * Görseli hedef bayt boyutunun altına indirir. Önce kaliteyi düşürür (en az %40);
 * yetmezse piksel ölçüsünü küçültür. Görüntü hiçbir zaman büyütülmez.
 */
export async function hedefBoyutaKodla(
  bitmap: ImageBitmap,
  hedefBayt: number,
  format: GorselFormat,
  arkaPlan = "#ffffff",
): Promise<HedefSonuc> {
  let genislik = bitmap.width;
  let yukseklik = bitmap.height;
  for (let tur = 0; tur < 14; tur++) {
    const onbellek = new Map<number, Blob>();
    const boyut = async (q: number) => {
      const b = await kodla(bitmap, {
        genislik,
        yukseklik,
        format,
        kalite: q,
        arkaPlan,
      });
      onbellek.set(q, b);
      return b.size;
    };
    const son = genislik <= 48 || yukseklik <= 48;
    const r = await kaliteAra(boyut, hedefBayt, {
      min: son ? 0.05 : 0.4,
      max: 0.92,
      adim: 6,
    });
    if (r)
      return {
        blob: onbellek.get(r.kalite)!,
        genislik,
        yukseklik,
        kalite: r.kalite,
        kucultuldu: genislik < bitmap.width,
      };
    if (son) break;
    const enKucuk = onbellek.get(0.4)!.size;
    const k = Math.min(0.9, Math.sqrt(hedefBayt / enKucuk) * 0.95);
    genislik = Math.max(1, Math.round(genislik * k));
    yukseklik = Math.max(1, Math.round(yukseklik * k));
  }
  throw new Error(
    "Bu hedef boyut bu görsel için çok küçük. Daha büyük bir hedef seçin.",
  );
}
