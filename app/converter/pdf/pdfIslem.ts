// PDF işlemleri (pdf-lib, MIT). Tarayıcıda ve Node'da çalışır; dosyalar hiçbir yere gönderilmez.
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

/** A4 boyutu (PDF noktası, 1 pt = 1/72 inç). */
export const A4 = { w: 595.28, h: 841.89 };

async function ac(veri: Uint8Array) {
  try {
    return await PDFDocument.load(veri, { ignoreEncryption: false });
  } catch (e) {
    if (e instanceof Error && /encrypt/i.test(e.message))
      throw new Error("Bu PDF şifreli; önce şifresini kaldırın.");
    throw new Error("PDF dosyası okunamadı.");
  }
}

export async function sayfaSayisi(veri: Uint8Array) {
  return (await ac(veri)).getPageCount();
}

/** Birden çok PDF'i verilen sırayla tek dosyada birleştirir. */
export async function birlestir(pdfler: Uint8Array[]): Promise<Uint8Array> {
  const hedef = await PDFDocument.create();
  for (const v of pdfler) {
    const kaynak = await ac(v);
    const sayfalar = await hedef.copyPages(kaynak, kaynak.getPageIndices());
    for (const s of sayfalar) hedef.addPage(s);
  }
  return hedef.save();
}

/**
 * "1-3, 5, 8-" gibi sayfa aralığını 0 tabanlı sayfa dizinlerine çevirir.
 * Sıra korunur, tekrarlar atılır; aralık dışı değerler hata verir.
 */
export function aralikCoz(metin: string, toplam: number): number[] {
  const sonuc: number[] = [];
  const parcalar = metin
    .split(/[,;]/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parcalar.length) throw new Error("Sayfa aralığı boş.");
  for (const p of parcalar) {
    const m = p.match(/^(\d+)?\s*(?:-\s*(\d+)?)?$/);
    if (!m || (!m[1] && !m[2])) throw new Error(`Geçersiz aralık: "${p}"`);
    const tire = p.includes("-");
    const bas = m[1] ? Number(m[1]) : 1;
    const son = tire ? (m[2] ? Number(m[2]) : toplam) : bas;
    if (bas < 1 || son > toplam || bas > son)
      throw new Error(`"${p}" aralığı 1–${toplam} dışında.`);
    for (let i = bas; i <= son; i++)
      if (!sonuc.includes(i - 1)) sonuc.push(i - 1);
  }
  return sonuc;
}

/** Seçilen sayfaları (verilen sırada, isteğe bağlı döndürmeyle) yeni bir PDF'e kopyalar. */
export async function sayfalariAl(
  veri: Uint8Array,
  dizinler: number[],
  donme: Record<number, number> = {},
): Promise<Uint8Array> {
  const kaynak = await ac(veri);
  const hedef = await PDFDocument.create();
  const sayfalar = await hedef.copyPages(kaynak, dizinler);
  sayfalar.forEach((s, i) => {
    const ek = donme[dizinler[i]] ?? 0;
    if (ek) s.setRotation(degrees((s.getRotation().angle + ek + 360) % 360));
    hedef.addPage(s);
  });
  return hedef.save();
}

/** PDF'i gruplara böler; her grup ayrı bir PDF olur. */
export async function bol(
  veri: Uint8Array,
  gruplar: number[][],
): Promise<Uint8Array[]> {
  const out: Uint8Array[] = [];
  for (const g of gruplar) out.push(await sayfalariAl(veri, g));
  return out;
}

/** Her N sayfada bir bölme grupları. */
export const esitGruplar = (toplam: number, n: number) =>
  Array.from({ length: Math.ceil(toplam / n) }, (_, i) =>
    Array.from({ length: Math.min(n, toplam - i * n) }, (_, j) => i * n + j),
  );

export type GorselSayfa = {
  veri: Uint8Array;
  tur: "jpg" | "png";
  genislik: number;
  yukseklik: number;
};
export type GorselPdfAyar = {
  sayfa: "a4" | "gorsel";
  yon: "otomatik" | "dikey" | "yatay";
  /** Kenar boşluğu (pt), yalnız A4'te. */
  kenar: number;
};

/** Görselleri PDF sayfalarına yerleştirir (A4'e ortalanmış veya görsel boyutunda). */
export async function gorsellerdenPdf(
  gorseller: GorselSayfa[],
  a: GorselPdfAyar,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  for (const g of gorseller) {
    const img =
      g.tur === "jpg" ? await pdf.embedJpg(g.veri) : await pdf.embedPng(g.veri);
    if (a.sayfa === "gorsel") {
      // 96 DPI kabulüyle piksel → pt (72/96)
      const w = (g.genislik * 72) / 96;
      const h = (g.yukseklik * 72) / 96;
      pdf.addPage([w, h]).drawImage(img, { x: 0, y: 0, width: w, height: h });
      continue;
    }
    const yatay =
      a.yon === "yatay" || (a.yon === "otomatik" && g.genislik > g.yukseklik);
    const [pw, ph] = yatay ? [A4.h, A4.w] : [A4.w, A4.h];
    const k = Math.min(
      (pw - 2 * a.kenar) / g.genislik,
      (ph - 2 * a.kenar) / g.yukseklik,
    );
    const w = g.genislik * k;
    const h = g.yukseklik * k;
    pdf.addPage([pw, ph]).drawImage(img, {
      x: (pw - w) / 2,
      y: (ph - h) / 2,
      width: w,
      height: h,
    });
  }
  return pdf.save();
}

export type NumaraAyar = {
  konum:
    | "alt-orta"
    | "alt-sag"
    | "alt-sol"
    | "ust-orta"
    | "ust-sag"
    | "ust-sol";
  bicim: "n" | "n / toplam" | "Sayfa n";
  baslangic: number;
  boyut: number;
  ilkSayfaAtla: boolean;
};

/** Sayfalara numara yazar. */
export async function sayfaNumarasiEkle(
  veri: Uint8Array,
  a: NumaraAyar,
): Promise<Uint8Array> {
  const pdf = await ac(veri);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const sayfalar = pdf.getPages();
  const toplam = sayfalar.length;
  sayfalar.forEach((s, i) => {
    if (a.ilkSayfaAtla && i === 0) return;
    const n = a.baslangic + i - (a.ilkSayfaAtla ? 1 : 0);
    const son = a.baslangic + toplam - 1 - (a.ilkSayfaAtla ? 1 : 0);
    const metin =
      a.bicim === "n"
        ? `${n}`
        : a.bicim === "n / toplam"
          ? `${n} / ${son}`
          : `Sayfa ${n}`;
    const { width, height } = s.getSize();
    const w = font.widthOfTextAtSize(metin, a.boyut);
    const pay = 28;
    const x = a.konum.endsWith("orta")
      ? (width - w) / 2
      : a.konum.endsWith("sag")
        ? width - pay - w
        : pay;
    const y = a.konum.startsWith("alt") ? pay : height - pay - a.boyut;
    s.drawText(metin, { x, y, size: a.boyut, font, color: rgb(0.2, 0.2, 0.2) });
  });
  return pdf.save();
}

/**
 * Sayfaların üstüne tam sayfa saydam PNG katmanı (filigran, imza) ekler.
 * `uret` görünen sayfa boyutu (pt) için PNG döndürür; aynı boyuttaki sayfalar tek görseli paylaşır.
 * Döndürülmüş sayfalarda katman, sayfa ekranda göründüğü yönde dik durur.
 */
export async function katmanEkle(
  veri: Uint8Array,
  uret: (w: number, h: number, dizin: number) => Promise<Uint8Array | null>,
  dizinler?: number[],
  paylas = true,
): Promise<Uint8Array> {
  const pdf = await ac(veri);
  const sayfalar = pdf.getPages();
  const onbellek = new Map<string, Awaited<ReturnType<typeof pdf.embedPng>>>();
  for (const i of dizinler ?? sayfalar.map((_, k) => k)) {
    const s = sayfalar[i];
    if (!s) continue;
    const kutu = s.getMediaBox();
    const donme = ((s.getRotation().angle % 360) + 360) % 360;
    const [gw, gh] =
      donme % 180 ? [kutu.height, kutu.width] : [kutu.width, kutu.height];
    const anahtar = `${Math.round(gw)}x${Math.round(gh)}`;
    let img = paylas ? onbellek.get(anahtar) : undefined;
    if (!img) {
      const png = await uret(gw, gh, i);
      if (!png) continue;
      img = await pdf.embedPng(png);
      if (paylas) onbellek.set(anahtar, img);
    }
    const [x, y] =
      donme === 90
        ? [kutu.x + kutu.width, kutu.y]
        : donme === 180
          ? [kutu.x + kutu.width, kutu.y + kutu.height]
          : donme === 270
            ? [kutu.x, kutu.y + kutu.height]
            : [kutu.x, kutu.y];
    s.drawImage(img, { x, y, width: gw, height: gh, rotate: degrees(donme) });
  }
  return pdf.save();
}
