// 7-Zip (LGPL + unRAR kısıtı) WebAssembly sürümüyle RAR, 7Z, TAR, GZ, XZ, BZ2, ISO, CAB vb. açma.
// Kütüphane (~1,7 MB) yalnızca gerektiğinde CDN'den yüklenir; arşivler hiçbir sunucuya gönderilmez.
/* eslint-disable @typescript-eslint/no-explicit-any -- Emscripten modülü */

const TABAN = "https://cdn.jsdelivr.net/npm/7z-wasm@1.2.0";

let fabrika: Promise<{
  olustur: (o: object) => Promise<any>;
  wasm: WebAssembly.Module;
}> | null = null;

function yukle() {
  fabrika ??= (async () => {
    const [m, wasm] = await Promise.all([
      import(
        /* webpackIgnore: true */ /* turbopackIgnore: true */ `${TABAN}/7zz.es6.js`
      ),
      WebAssembly.compileStreaming(fetch(`${TABAN}/7zz.wasm`)),
    ]);
    return { olustur: m.default, wasm };
  })();
  fabrika.catch(() => {
    fabrika = null;
  });
  return fabrika;
}

/** Her işlem için yeni örnek (7-Zip hata sonrası yeniden kullanılamaz); derlenmiş wasm paylaşılır. */
async function ornek(cikti: string[]) {
  let f;
  try {
    f = await yukle();
  } catch {
    throw new Error(
      "Arşiv açıcı yüklenemedi. İnternet bağlantınızı kontrol edin.",
    );
  }
  return f.olustur({
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
}

export type ArsivDosya = { yol: string; veri: Uint8Array; tarih?: Date };

export class SifreGerekli extends Error {}

const IC_ARSIV = /\.(tar)$/i;

function dolas(z: any, kok: string, onek = ""): ArsivDosya[] {
  const out: ArsivDosya[] = [];
  for (const ad of z.FS.readdir(kok) as string[]) {
    if (ad === "." || ad === "..") continue;
    const tam = `${kok}/${ad}`;
    const st = z.FS.stat(tam);
    if (z.FS.isDir(st.mode)) out.push(...dolas(z, tam, `${onek}${ad}/`));
    else
      out.push({
        yol: `${onek}${ad}`,
        veri: z.FS.readFile(tam) as Uint8Array,
        tarih: st.mtime instanceof Date ? st.mtime : undefined,
      });
  }
  return out;
}

/** Arşivi açar. Şifreliyse ve şifre yoksa/yanlışsa SifreGerekli fırlatır. */
export async function arsivAc(
  veri: Uint8Array,
  ad: string,
  sifre = "",
): Promise<ArsivDosya[]> {
  const cikti: string[] = [];
  const z = await ornek(cikti);
  const giris = `/g/${ad.replace(/[/\\]/g, "_") || "arsiv"}`;
  z.FS.mkdir("/g");
  z.FS.mkdir("/c");
  z.FS.writeFile(giris, veri);
  let kod: number;
  try {
    // Şifre boş verilirse 7-Zip terminalden sormaya çalışır; bu yüzden olmayan bir şifre geçilir.
    kod = z.callMain([
      "x",
      "-o/c",
      "-y",
      "-bsp0",
      "-bso0",
      `-p${sifre || "\u0001yok"}`,
      giris,
    ]);
  } catch {
    throw new SifreGerekli(sifre ? "Şifre yanlış." : "Bu arşiv şifreli.");
  }
  const dosyalar = dolas(z, "/c");
  if (kod !== 0 && !dosyalar.length) {
    if (cikti.some((s) => /password|encrypted/i.test(s)))
      throw new SifreGerekli(sifre ? "Şifre yanlış." : "Bu arşiv şifreli.");
    throw new Error(
      "Arşiv açılamadı; dosya bozuk ya da desteklenmeyen bir biçimde olabilir.",
    );
  }
  // .tar.gz / .tgz: içteki tek .tar dosyası da açılır.
  if (dosyalar.length === 1 && IC_ARSIV.test(dosyalar[0].yol))
    return arsivAc(dosyalar[0].veri, dosyalar[0].yol);
  return dosyalar;
}
