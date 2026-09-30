// ICO dosyası üretimi: her boyut için PNG gömülü girişler (Windows Vista+ ve tüm tarayıcılar destekler).

export type IcoGiris = { boyut: number; png: Uint8Array };

/** PNG'lerden çok boyutlu .ico dosyası oluşturur (boyut ≤ 256). */
export function icoOlustur(girisler: IcoGiris[]): Uint8Array {
  const n = girisler.length;
  const basBoyut = 6 + 16 * n;
  const toplam = basBoyut + girisler.reduce((t, g) => t + g.png.length, 0);
  const out = new Uint8Array(toplam);
  const v = new DataView(out.buffer);
  v.setUint16(0, 0, true); // ayrılmış
  v.setUint16(2, 1, true); // tür: simge
  v.setUint16(4, n, true);
  let konum = basBoyut;
  girisler.forEach((g, i) => {
    if (g.boyut < 1 || g.boyut > 256)
      throw new Error("ICO boyutu 1–256 olmalı");
    const o = 6 + 16 * i;
    out[o] = g.boyut === 256 ? 0 : g.boyut;
    out[o + 1] = g.boyut === 256 ? 0 : g.boyut;
    out[o + 2] = 0; // palet
    out[o + 3] = 0;
    v.setUint16(o + 4, 1, true); // renk düzlemi
    v.setUint16(o + 6, 32, true); // bit derinliği
    v.setUint32(o + 8, g.png.length, true);
    v.setUint32(o + 12, konum, true);
    out.set(g.png, konum);
    konum += g.png.length;
  });
  return out;
}

/** Web uygulaması bildirimi (site.webmanifest). */
export function webManifest(ad: string, renk: string) {
  return JSON.stringify(
    {
      name: ad,
      short_name: ad,
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: renk,
      background_color: renk,
      display: "standalone",
    },
    null,
    2,
  );
}

export const FAVICON_HTML = `<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;
