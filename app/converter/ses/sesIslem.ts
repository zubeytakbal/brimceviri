// Ses verisi üzerinde saf işlemler (tarayıcı ve Node): WAV kodlama, kesme, yumuşak giriş/çıkış, dalga özeti.

export type Kanallar = Float32Array[];

/** 16 bit PCM WAV dosyası üretir. */
export function wavKodla(kanallar: Kanallar, ornekHizi: number): Uint8Array {
  const kanal = kanallar.length;
  const uzunluk = kanallar[0]?.length ?? 0;
  const veriBoyu = uzunluk * kanal * 2;
  const out = new Uint8Array(44 + veriBoyu);
  const v = new DataView(out.buffer);
  const yaz = (o: number, s: string) =>
    [...s].forEach((c, i) => (out[o + i] = c.charCodeAt(0)));
  yaz(0, "RIFF");
  v.setUint32(4, 36 + veriBoyu, true);
  yaz(8, "WAVE");
  yaz(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, kanal, true);
  v.setUint32(24, ornekHizi, true);
  v.setUint32(28, ornekHizi * kanal * 2, true);
  v.setUint16(32, kanal * 2, true);
  v.setUint16(34, 16, true);
  yaz(36, "data");
  v.setUint32(40, veriBoyu, true);
  let o = 44;
  for (let i = 0; i < uzunluk; i++)
    for (let k = 0; k < kanal; k++) {
      const s = Math.max(-1, Math.min(1, kanallar[k][i]));
      v.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      o += 2;
    }
  return out;
}

/** [bas, son) saniye aralığını keser; giriş/çıkış saniyeleri kadar ses doğrusal olarak açılır/kısılır. */
export function kes(
  kanallar: Kanallar,
  ornekHizi: number,
  bas: number,
  son: number,
  girisSn = 0,
  cikisSn = 0,
): Kanallar {
  const uzunluk = kanallar[0]?.length ?? 0;
  const i0 = Math.max(0, Math.min(uzunluk, Math.round(bas * ornekHizi)));
  const i1 = Math.max(i0, Math.min(uzunluk, Math.round(son * ornekHizi)));
  const n = i1 - i0;
  const g = Math.min(n, Math.round(girisSn * ornekHizi));
  const c = Math.min(n, Math.round(cikisSn * ornekHizi));
  return kanallar.map((k) => {
    const p = k.slice(i0, i1);
    for (let i = 0; i < g; i++) p[i] *= i / g;
    for (let i = 0; i < c; i++) p[n - 1 - i] *= i / c;
    return p;
  });
}

/** Kanalları tek kanala (mono) indirir. */
export function monoYap(kanallar: Kanallar): Kanallar {
  if (kanallar.length < 2) return kanallar;
  const n = kanallar[0].length;
  const m = new Float32Array(n);
  for (const k of kanallar) for (let i = 0; i < n; i++) m[i] += k[i];
  for (let i = 0; i < n; i++) m[i] /= kanallar.length;
  return [m];
}

/** Dalga formu çizimi için her dilimin en büyük genliği (0–1). */
export function dalgaOzeti(kanallar: Kanallar, dilim: number): number[] {
  const n = kanallar[0]?.length ?? 0;
  const adim = Math.max(1, Math.floor(n / dilim));
  const out: number[] = [];
  for (let d = 0; d < dilim; d++) {
    let m = 0;
    const s = Math.min(n, (d + 1) * adim);
    for (let i = d * adim; i < s; i += 4)
      for (const k of kanallar) m = Math.max(m, Math.abs(k[i]));
    out.push(Math.min(1, m));
  }
  return out;
}

/** Saniyeyi "d:ss,s" biçiminde yazar. */
export function sureMetni(sn: number, ondalik = true) {
  const d = Math.floor(sn / 60);
  const s = sn - d * 60;
  const ss = ondalik
    ? s.toFixed(1).padStart(4, "0").replace(".", ",")
    : String(Math.floor(s)).padStart(2, "0");
  return `${d}:${ss}`;
}

/** Yaklaşık MP3 boyutu (bayt). */
export const mp3Boyut = (sn: number, kbps: number) => (sn * kbps * 1000) / 8;
