// pdf.js (Apache-2.0): PDF sayfalarını tarayıcıda çizmek ve metnini okumak için.
// Sitenin paketine gömülmez; yalnızca gerektiğinde jsDelivr'den bir kez yüklenir.

const SURUM = "6.3.289";
const TABAN = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${SURUM}`;

type Viewport = { width: number; height: number };
type MetinOgesi = { str?: string; hasEOL?: boolean };
export type PdfSayfa = {
  getViewport: (a: { scale: number; rotation?: number }) => Viewport;
  render: (a: {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    viewport: Viewport;
  }) => { promise: Promise<void> };
  getTextContent: () => Promise<{ items: MetinOgesi[] }>;
  rotate: number;
  cleanup: () => void;
};
export type PdfBelge = {
  numPages: number;
  getPage: (n: number) => Promise<PdfSayfa>;
  destroy: () => Promise<void>;
};
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (a: Record<string, unknown>) => {
    promise: Promise<PdfBelge>;
    destroy: () => Promise<void>;
  };
};

let modul: Promise<PdfJs> | null = null;

function yukle(): Promise<PdfJs> {
  modul ??= (
    import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ `${TABAN}/legacy/build/pdf.min.mjs`
    ) as Promise<PdfJs>
  ).then((m) => {
    m.GlobalWorkerOptions.workerSrc = `${TABAN}/legacy/build/pdf.worker.min.mjs`;
    return m;
  });
  modul.catch(() => {
    modul = null;
  });
  return modul;
}

/** PDF'i açar. Veri kopyalanarak verilir (pdf.js aktardığı tamponu boşaltır). */
export async function pdfAc(veri: Uint8Array): Promise<PdfBelge> {
  let m: PdfJs;
  try {
    m = await yukle();
  } catch {
    throw new Error(
      "PDF görüntüleyici yüklenemedi. İnternet bağlantınızı kontrol edin.",
    );
  }
  try {
    const gorev = m.getDocument({
      data: veri.slice(),
      cMapUrl: `${TABAN}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${TABAN}/standard_fonts/`,
      wasmUrl: `${TABAN}/wasm/`,
      isEvalSupported: false,
    });
    const belge = await gorev.promise;
    // Belge nesnesinde destroy yok; yükleme görevi kapatılınca worker da serbest kalır.
    belge.destroy = () => gorev.destroy();
    return belge;
  } catch (e) {
    if (e instanceof Error && /password/i.test(e.name + e.message))
      throw new Error("Bu PDF şifreli; önce şifresini kaldırın.");
    throw new Error("PDF dosyası okunamadı.");
  }
}

/**
 * Sayfayı tuvale çizer. `olcek` 1 = 72 DPI; `ekDonme` sayfanın kendi döndürmesine eklenir.
 * Beyaz zemin üzerine çizilir (JPG çıktısında saydam alan kalmasın diye).
 */
export async function sayfaCiz(
  belge: PdfBelge,
  no: number,
  olcek: number,
  ekDonme = 0,
): Promise<HTMLCanvasElement> {
  const sayfa = await belge.getPage(no);
  const viewport = sayfa.getViewport({
    scale: olcek,
    rotation: (sayfa.rotate + ekDonme + 360) % 360,
  });
  const c = document.createElement("canvas");
  c.width = Math.ceil(viewport.width);
  c.height = Math.ceil(viewport.height);
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, c.width, c.height);
  await sayfa.render({ canvas: c, canvasContext: ctx, viewport }).promise;
  sayfa.cleanup();
  return c;
}

/** Sayfanın metin katmanını satırlarıyla okur (taranmış sayfalarda boş döner). */
export async function sayfaMetni(belge: PdfBelge, no: number): Promise<string> {
  const sayfa = await belge.getPage(no);
  const { items } = await sayfa.getTextContent();
  let metin = "";
  for (const o of items) {
    metin += o.str ?? "";
    if (o.hasEOL) metin += "\n";
  }
  sayfa.cleanup();
  return metin
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
