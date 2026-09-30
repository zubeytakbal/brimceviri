// Tarayıcıda ses çözme (Web Audio) ve MP3 kodlama (LAME, WebAssembly). Dosyalar hiçbir yere gönderilmez.
import { wavKodla, type Kanallar } from "../../converter/ses/sesIslem";

/** MP3 kodlayıcı: wasm-media-encoders (MIT) içindeki LAME (LGPL). Yalnızca gerektiğinde CDN'den (~140 KB) yüklenir. */
const WME = "https://cdn.jsdelivr.net/npm/wasm-media-encoders@0.7.0";
export const ORNEK_HIZI = 44100;

type Kodlayici = {
  configure: (p: {
    sampleRate: number;
    channels: 1 | 2;
    bitrate: number;
  }) => void;
  encode: (s: readonly Float32Array[]) => Uint8Array;
  finalize: () => Uint8Array;
};
type Wme = {
  createEncoder: (tur: "audio/mpeg", wasm: string) => Promise<Kodlayici>;
};
let wme: Promise<Wme> | null = null;

function wmeYukle(): Promise<Wme> {
  wme ??= new Promise<Wme>((tamam, hata) => {
    const s = document.createElement("script");
    s.src = `${WME}/dist/umd/WasmMediaEncoder.min.js`;
    s.onload = () =>
      tamam((self as unknown as { WasmMediaEncoder: Wme }).WasmMediaEncoder);
    s.onerror = () => hata(new Error("yüklenemedi"));
    document.head.appendChild(s);
  });
  wme.catch(() => {
    wme = null;
  });
  return wme;
}

export type Ses = { kanallar: Kanallar; ornekHizi: number; sure: number };

/** Ses veya video dosyasındaki sesi çözer (44,1 kHz'e dönüştürülür). */
export async function sesCoz(dosya: Blob): Promise<Ses> {
  const veri = await dosya.arrayBuffer();
  const ctx = new OfflineAudioContext(2, 1, ORNEK_HIZI);
  let b: AudioBuffer;
  try {
    b = await ctx.decodeAudioData(veri);
  } catch {
    throw new Error(
      "Bu dosyadaki ses tarayıcınızda çözülemedi. Dosyada ses olmayabilir ya da biçim (ör. WMA, AMR) desteklenmiyor olabilir; Chrome veya Firefox'ta deneyin.",
    );
  }
  const kanallar = Array.from(
    { length: Math.min(2, b.numberOfChannels) },
    (_, i) => b.getChannelData(i),
  );
  return { kanallar, ornekHizi: b.sampleRate, sure: b.duration };
}

/** Kanalları MP3'e kodlar. `ilerleme` 0–1 arası çağrılır. */
export async function mp3Kodla(
  kanallar: Kanallar,
  ornekHizi: number,
  kbps: number,
  ilerleme?: (o: number) => void,
): Promise<Uint8Array> {
  let m: Wme;
  try {
    m = await wmeYukle();
  } catch {
    throw new Error(
      "MP3 kodlayıcı yüklenemedi. İnternet bağlantınızı kontrol edin.",
    );
  }
  const k = await m.createEncoder("audio/mpeg", `${WME}/wasm/mp3.wasm`);
  k.configure({
    sampleRate: ornekHizi,
    channels: kanallar.length === 1 ? 1 : 2,
    bitrate: kbps,
  });
  const parcalar: Uint8Array[] = [];
  const n = kanallar[0].length;
  const adim = 1152 * 64;
  for (let i = 0; i < n; i += adim) {
    parcalar.push(
      k.encode(kanallar.map((c) => c.subarray(i, i + adim))).slice(),
    );
    if ((i / adim) % 8 === 0) {
      ilerleme?.(i / n);
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  parcalar.push(k.finalize().slice());
  ilerleme?.(1);
  const out = new Uint8Array(parcalar.reduce((t, p) => t + p.length, 0));
  let o = 0;
  for (const p of parcalar) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export type SesBicim = "mp3" | "wav";

export async function sesKodla(
  kanallar: Kanallar,
  ornekHizi: number,
  bicim: SesBicim,
  kbps: number,
  ilerleme?: (o: number) => void,
): Promise<Blob> {
  if (bicim === "wav")
    return new Blob([wavKodla(kanallar, ornekHizi) as BlobPart], {
      type: "audio/wav",
    });
  return new Blob(
    [(await mp3Kodla(kanallar, ornekHizi, kbps, ilerleme)) as BlobPart],
    {
      type: "audio/mpeg",
    },
  );
}

export const sesAdi = (ad: string, bicim: SesBicim) =>
  `${ad.replace(/\.[^./\\]+$/, "") || "ses"}.${bicim}`;
