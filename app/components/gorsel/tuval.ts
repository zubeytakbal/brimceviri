// Tarayıcıda görsel açma ve yeniden kodlama (canvas). Dosya hiçbir yere gönderilmez.
import { FORMATLAR, type GorselFormat } from "../../converter/gorsel/formatlar";
import { kaliteAra } from "../../converter/gorsel/sikistirma";
import { zipOlustur } from "../../converter/gorsel/zip";

export async function bitmapAc(dosya: Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(dosya);
  } catch {
    throw new Error(
      "Bu dosya tarayıcınızda açılamadı. JPG, PNG veya WebP bir görsel seçin.",
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
};

export async function kodla(bitmap: ImageBitmap, a: KodlaAyar): Promise<Blob> {
  const tuval = document.createElement("canvas");
  tuval.width = a.genislik;
  tuval.height = a.yukseklik;
  const ctx = tuval.getContext("2d")!;
  const f = FORMATLAR[a.format];
  if (!f.seffaflik) {
    ctx.fillStyle = a.arkaPlan ?? "#ffffff";
    ctx.fillRect(0, 0, a.genislik, a.yukseklik);
  }
  ctx.imageSmoothingQuality = "high";
  const b = a.bolge ?? { x: 0, y: 0, w: bitmap.width, h: bitmap.height };
  ctx.drawImage(bitmap, b.x, b.y, b.w, b.h, 0, 0, a.genislik, a.yukseklik);
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
