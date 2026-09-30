// qpdf (Apache-2.0) WebAssembly sürümüyle PDF şifreleme (AES-256) ve şifre kaldırma.
// Yalnızca gerektiğinde CDN'den (~1,4 MB) yüklenir; PDF hiçbir sunucuya gönderilmez.
/* eslint-disable @typescript-eslint/no-explicit-any -- Emscripten modülü */

const TABAN = "https://cdn.jsdelivr.net/npm/@neslinesli93/qpdf-wasm@0.3.0/dist";

let fabrika: Promise<{
  olustur: (o: object) => Promise<any>;
  wasm: WebAssembly.Module;
}> | null = null;

function yukle() {
  fabrika ??= (async () => {
    const wasm = WebAssembly.compileStreaming(fetch(`${TABAN}/qpdf.wasm`));
    // qpdf.js modül sistemi yoksa fabrikayı genel "Module" değişkenine yazar.
    await new Promise<void>((tamam, hata) => {
      const s = document.createElement("script");
      s.src = `${TABAN}/qpdf.js`;
      s.onload = () => tamam();
      s.onerror = () => hata(new Error("yüklenemedi"));
      document.head.appendChild(s);
    });
    const g = globalThis as any;
    const olustur = g.Module;
    delete g.Module;
    if (typeof olustur !== "function") throw new Error("qpdf yüklenemedi");
    return { olustur, wasm: await wasm };
  })();
  fabrika.catch(() => {
    fabrika = null;
  });
  return fabrika;
}

async function calistir(
  veri: Uint8Array,
  argumanlar: (g: string, c: string) => string[],
) {
  let f;
  try {
    f = await yukle();
  } catch {
    throw new Error(
      "PDF şifreleme motoru yüklenemedi. İnternet bağlantınızı kontrol edin.",
    );
  }
  const cikti: string[] = [];
  const q = await f.olustur({
    noInitialRun: true,
    print: (s: string) => cikti.push(s),
    printErr: (s: string) => cikti.push(s),
    instantiateWasm: (
      imports: WebAssembly.Imports,
      tamam: (i: WebAssembly.Instance) => void,
    ) => {
      void WebAssembly.instantiate(f.wasm, imports).then(tamam);
      return {};
    },
  });
  q.FS.writeFile("/g.pdf", veri);
  let kod: number;
  try {
    kod = q.callMain(argumanlar("/g.pdf", "/c.pdf"));
  } catch {
    kod = 2;
  }
  // 3: uyarılarla başarılı
  if (kod !== 0 && kod !== 3) return { kod, cikti, veri: null };
  return { kod, cikti, veri: q.FS.readFile("/c.pdf") as Uint8Array };
}

/** PDF şifreli mi? (/Encrypt sözlüğü) */
export function sifreliMi(veri: Uint8Array) {
  const bas = new TextDecoder("latin1").decode(
    veri.subarray(Math.max(0, veri.length - 65536)),
  );
  if (/\/Encrypt\s/.test(bas)) return true;
  return /\/Encrypt\s/.test(
    new TextDecoder("latin1").decode(veri.subarray(0, 65536)),
  );
}

export type Izinler = { yazdir: boolean; kopyala: boolean; duzenle: boolean };

export async function pdfSifrele(
  veri: Uint8Array,
  sifre: string,
  izin: Izinler,
  sahipSifre?: string,
): Promise<Uint8Array> {
  if (sifreliMi(veri))
    throw new Error("Bu PDF zaten şifreli; önce şifresini kaldırın.");
  const sahip =
    sahipSifre ||
    `${sifre}\u0001${crypto.getRandomValues(new Uint32Array(2)).join("")}`;
  const r = await calistir(veri, (g, c) => [
    "--encrypt",
    `--user-password=${sifre}`,
    `--owner-password=${sahip}`,
    "--bits=256",
    `--print=${izin.yazdir ? "full" : "none"}`,
    `--extract=${izin.kopyala ? "y" : "n"}`,
    `--modify=${izin.duzenle ? "all" : "none"}`,
    "--",
    g,
    c,
  ]);
  if (!r.veri) throw new Error("PDF şifrelenemedi; dosya bozuk olabilir.");
  return r.veri;
}

export class YanlisSifre extends Error {}

export async function pdfSifreKaldir(
  veri: Uint8Array,
  sifre: string,
): Promise<Uint8Array> {
  const r = await calistir(veri, (g, c) => [
    "--decrypt",
    `--password=${sifre}`,
    g,
    c,
  ]);
  if (!r.veri) {
    if (r.cikti.some((s) => /password/i.test(s)) || r.kod === 2)
      throw new YanlisSifre(
        sifre ? "Şifre yanlış." : "Bu PDF'i açmak için şifre gerekiyor.",
      );
    throw new Error("PDF işlenemedi; dosya bozuk olabilir.");
  }
  return r.veri;
}
