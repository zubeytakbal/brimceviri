// QR kod matrisi ve SVG çıktısı (qrcode-generator, MIT). Türkçe karakterler için UTF-8 kullanılır.
import qrcode from "qrcode-generator";

export type Duzeltme = "L" | "M" | "Q" | "H";
export type QrMatris = {
  boyut: number;
  koyu: (satir: number, sutun: number) => boolean;
};

const utf8 = (s: string) => Array.from(new TextEncoder().encode(s));

export function qrMatris(metin: string, duzeltme: Duzeltme = "M"): QrMatris {
  if (!metin) throw new Error("QR içeriği boş.");
  // Kütüphane varsayılan olarak Latin-1 kullanır; ğ, ş, İ için UTF-8 bayt dizisi verilir.
  qrcode.stringToBytes = utf8;
  const q = qrcode(0, duzeltme);
  try {
    q.addData(metin, "Byte");
    q.make();
  } catch {
    throw new Error(
      "Metin QR koda sığmayacak kadar uzun (en fazla yaklaşık 2.900 karakter).",
    );
  }
  return { boyut: q.getModuleCount(), koyu: (r, c) => q.isDark(r, c) };
}

/** Matrisi tek bir <path> ile SVG'ye çevirir (kenar = sessiz bölge, modül cinsinden). */
export function qrSvg(
  m: QrMatris,
  { renk = "#000000", zemin = "#ffffff", kenar = 4 } = {},
) {
  const t = m.boyut + kenar * 2;
  let yol = "";
  for (let r = 0; r < m.boyut; r++)
    for (let c = 0; c < m.boyut; c++)
      if (m.koyu(r, c)) yol += `M${c + kenar} ${r + kenar}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}" shape-rendering="crispEdges">${
    zemin === "transparent"
      ? ""
      : `<rect width="${t}" height="${t}" fill="${zemin}"/>`
  }<path fill="${renk}" d="${yol}"/></svg>`;
}

/** Göreli parlaklık farkı (WCAG): QR okunabilirliği için koyu/açık kontrastı. */
export function kontrast(a: string, b: string) {
  const l = (h: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const v = parseInt(h.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [x, y] = [l(a), l(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
