// Tarayıcıda video işleme: Mediabunny (MPL-2.0) + WebCodecs. Kütüphane yalnızca gerektiğinde CDN'den yüklenir;
// videolar hiçbir sunucuya gönderilmez.
/* eslint-disable @typescript-eslint/no-explicit-any -- CDN'den yüklenen modülün yalnızca kullanılan kısmı */

const MB_URL =
  "https://cdn.jsdelivr.net/npm/mediabunny@1.61.0/dist/bundles/mediabunny.min.mjs";

type Mb = Record<string, any>;
let modul: Promise<Mb> | null = null;

export function mbYukle(): Promise<Mb> {
  modul ??= import(
    /* webpackIgnore: true */ /* turbopackIgnore: true */ MB_URL
  ) as Promise<Mb>;
  modul.catch(() => {
    modul = null;
  });
  return modul;
}

async function yukle() {
  try {
    return await mbYukle();
  } catch {
    throw new Error(
      "Video motoru yüklenemedi. İnternet bağlantınızı kontrol edin.",
    );
  }
}

export type VideoBilgi = {
  sure: number;
  genislik: number;
  yukseklik: number;
  kodek: string | null;
  sesKodek: string | null;
  cozulebilir: boolean;
};

export const KODEK_AD: Record<string, string> = {
  avc: "H.264",
  hevc: "H.265 (HEVC)",
  vp8: "VP8",
  vp9: "VP9",
  av1: "AV1",
  aac: "AAC",
  opus: "Opus",
  mp3: "MP3",
  vorbis: "Vorbis",
  flac: "FLAC",
};

function girdi(M: Mb, dosya: Blob) {
  return new M.Input({
    source: new M.BlobSource(dosya),
    formats: M.ALL_FORMATS,
  });
}

export async function videoBilgi(dosya: Blob): Promise<VideoBilgi> {
  const M = await yukle();
  try {
    const g = girdi(M, dosya);
    const v = await g.getPrimaryVideoTrack();
    const a = await g.getPrimaryAudioTrack();
    if (!v) throw new Error("video yok");
    return {
      sure: await g.computeDuration(),
      genislik: v.displayWidth,
      yukseklik: v.displayHeight,
      kodek: v.codec,
      sesKodek: a?.codec ?? null,
      cozulebilir: await v.canDecode(),
    };
  } catch {
    throw new Error(
      "Bu dosya video olarak okunamadı. MP4, MOV, WebM veya MKV bir video seçin.",
    );
  }
}

/** Kodlama için kullanılacak video kodeki: H.264 (her yerde açılır), yoksa VP9. */
export async function hedefKodek(): Promise<"avc" | "vp9"> {
  const M = await yukle();
  if (await M.canEncodeVideo("avc")) return "avc";
  if (await M.canEncodeVideo("vp9")) return "vp9";
  throw new Error(
    "Tarayıcınız video kodlamayı desteklemiyor. Chrome, Edge veya Safari'nin güncel sürümünü kullanın.",
  );
}

export type VideoAyar = {
  genislik?: number;
  bitHizi?: number;
  kirp?: { bas: number; son: number };
  hassasKesim?: boolean;
  dondur?: 0 | 90 | 180 | 270;
  aynala?: boolean;
  goruntuyeIsle?: boolean;
  sesiSil?: boolean;
  /** Video her durumda yeniden kodlansın (ör. HEVC → H.264). */
  yenidenKodla?: boolean;
  sesBitHizi?: number;
};

const MP4_KODEKLER = ["avc", "hevc", "vp9", "av1"];

export type VideoSonuc = { blob: Blob; kodek: string | null };

/** Videoyu verilen ayarlarla MP4 olarak yeniden yazar; gerekirse yeniden kodlar. */
export async function videoIsle(
  dosya: Blob,
  a: VideoAyar,
  ilerleme?: (o: number) => void,
): Promise<VideoSonuc> {
  const M = await yukle();
  // MP4'te standart olmayan kodekler (ör. WebM'den gelen VP8) her durumda yeniden kodlanır.
  const kaynakKodek = (await girdi(M, dosya).getPrimaryVideoTrack())?.codec;
  if (kaynakKodek && !MP4_KODEKLER.includes(kaynakKodek))
    a = { ...a, yenidenKodla: true };
  const kodlanacak = !!(a.genislik || a.bitHizi || a.yenidenKodla);
  const kodek = kodlanacak || a.goruntuyeIsle ? await hedefKodek() : undefined;
  const cikti = new M.Output({
    format: new M.Mp4OutputFormat({ fastStart: "in-memory" }),
    target: new M.BufferTarget(),
  });
  const video: Record<string, unknown> = {};
  if (a.genislik) video.width = a.genislik;
  if (a.bitHizi) video.bitrate = a.bitHizi;
  if (kodek) video.codec = kodek;
  if (a.yenidenKodla) video.forceTranscode = true;
  if (a.dondur) video.rotate = a.dondur;
  if (a.aynala) video.flip = true;
  if (a.goruntuyeIsle) {
    video.allowTransformationMetadata = false;
    video.forceTranscode = true;
  }
  const ses: Record<string, unknown> = a.sesiSil
    ? { discard: true }
    : a.sesBitHizi
      ? { bitrate: a.sesBitHizi }
      : {};
  let donusum: any;
  try {
    donusum = await M.Conversion.init({
      input: girdi(M, dosya),
      output: cikti,
      tracks: "primary",
      video,
      audio: ses,
      trim: a.kirp ? { start: a.kirp.bas, end: a.kirp.son } : undefined,
      copy: a.hassasKesim ? false : {},
    });
  } catch {
    throw new Error("Video açılamadı ya da bu biçim desteklenmiyor.");
  }
  const videoAtildi = donusum.discardedTracks.some(
    (d: any) => d.track.type === "video" && d.reason !== "discarded_by_user",
  );
  if (!donusum.isValid || videoAtildi)
    throw new Error(
      "Bu videonun kodeki tarayıcınızda çözülemiyor (ör. HEVC/H.265 bazı tarayıcılarda). Chrome, Edge veya Safari'de deneyin.",
    );
  if (ilerleme) donusum.onProgress = (o: number) => ilerleme(o);
  await donusum.execute();
  const cikis = new M.Input({
    source: new M.BufferSource(cikti.target.buffer),
    formats: M.ALL_FORMATS,
  });
  const v = await cikis.getPrimaryVideoTrack();
  return {
    blob: new Blob([cikti.target.buffer], { type: "video/mp4" }),
    kodek: v?.codec ?? null,
  };
}

export const videoAdi = (ad: string, ek: string) =>
  `${ad.replace(/\.[^./\\]+$/, "") || "video"}${ek}.mp4`;
